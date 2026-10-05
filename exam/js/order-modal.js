/* eslint-disable no-unused-vars */

let selectedCourseData = null;

function groupDatesByDay(dates) {
    const groups = {};
    dates.forEach(dt => {
        const d = new Date(dt);
        const dateKey = d.toISOString().slice(0, 10);
        const timeKey = d.toTimeString().slice(0, 5);
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(timeKey);
    });
    return groups;
}

function openOrderModal(course) {
    selectedCourseData = course;

    document.getElementById('order-course-name').value = course.name;
    document.getElementById('order-course-id').value = course.id;
    document.getElementById('order-tutor-id').value = 0;
    document.getElementById('order-teacher').value = course.teacher;

    const dateSelect = document.getElementById('order-date');
    const timeSelect = document.getElementById('order-time');
    dateSelect.innerHTML = '<option value="">Выберите дату...</option>';
    timeSelect.innerHTML = '<option value="">Сначала выберите дату</option>';
    timeSelect.disabled = true;

    const dateGroups = groupDatesByDay(course.start_dates);
    Object.keys(dateGroups).sort().forEach(dateKey => {
        const label = new Date(dateKey).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'short' });
        const opt = new Option(label, dateKey);
        dateSelect.appendChild(opt);
    });

    document.getElementById('order-persons').value = 1;
    document.getElementById('order-duration').value = course.total_length * course.week_length;
    document.getElementById('order-duration-info').value = '';
    ['opt-supplementary', 'opt-personalized', 'opt-excursions', 'opt-assessment', 'opt-interactive']
        .forEach(id => { document.getElementById(id).checked = false; });

    updateOrderPrice();
    new bootstrap.Modal(document.getElementById('orderModal')).show();
}

function onOrderDateChange() {
    const course = selectedCourseData;
    if (!course) return;

    const dateKey = document.getElementById('order-date').value;
    const timeSelect = document.getElementById('order-time');

    if (!dateKey) {
        timeSelect.innerHTML = '<option value="">Сначала выберите дату</option>';
        timeSelect.disabled = true;
        updateOrderPrice();
        return;
    }

    const times = groupDatesByDay(course.start_dates)[dateKey] || [];
    timeSelect.innerHTML = '<option value="">Выберите время...</option>';
    times.forEach(t => {
        const [h, m] = t.split(':').map(Number);
        const endDate = new Date(0, 0, 0, h + course.week_length, m);
        const endTime = endDate.toTimeString().slice(0, 5);
        timeSelect.appendChild(new Option(`${t} — ${endTime}`, t));
    });
    timeSelect.disabled = false;

    const endDateStr = calcEndDate(dateKey, course.total_length);
    document.getElementById('order-duration-info').value =
        `${course.total_length} нед. (${course.total_length * course.week_length} ч.) | Окончание: ${endDateStr}`;

    updateOrderPrice();
}

function updateOrderPrice() {
    const course = selectedCourseData;
    if (!course) return;

    const dateStart = document.getElementById('order-date').value;
    const timeStart = document.getElementById('order-time').value;
    const persons = parseInt(document.getElementById('order-persons').value) || 1;
    const autoOpts = getAutoOptions(dateStart, persons, course.week_length);

    document.getElementById('early-reg-badge').style.setProperty('display', autoOpts.earlyRegistration ? 'inline-block' : 'none', 'important');
    document.getElementById('group-badge').style.setProperty('display', autoOpts.groupEnrollment ? 'inline-block' : 'none', 'important');
    document.getElementById('intensive-badge').style.setProperty('display', autoOpts.intensiveCourse ? 'inline-block' : 'none', 'important');

    const result = calculatePrice({
        courseFeePerHour: course.course_fee_per_hour,
        totalWeeks: course.total_length,
        weekLength: course.week_length,
        dateStart, timeStart, persons,
        ...autoOpts,
        supplementary: document.getElementById('opt-supplementary').checked,
        personalized: document.getElementById('opt-personalized').checked,
        excursions: document.getElementById('opt-excursions').checked,
        assessment: document.getElementById('opt-assessment').checked,
        interactive: document.getElementById('opt-interactive').checked,
    });

    document.getElementById('order-total-price').textContent = `${result.total.toLocaleString('ru-RU')} руб.`;
    const bd = result.breakdown;
    document.getElementById('price-breakdown').innerHTML =
        `База: ${bd.courseFeePerHour} × ${bd.durationInHours} ч. × ${bd.weekendMultiplier}` +
        (bd.morningSurcharge ? ` + ${bd.morningSurcharge} (утро)` : '') +
        (bd.eveningSurcharge ? ` + ${bd.eveningSurcharge} (вечер)` : '') +
        ` × ${persons} чел.`;
}

async function submitOrder() {
    const course = selectedCourseData;
    if (!course) return;

    const dateStart = document.getElementById('order-date').value;
    const timeStart = document.getElementById('order-time').value;
    const persons = parseInt(document.getElementById('order-persons').value);

    if (!dateStart || !timeStart) {
        showNotification('Выберите дату и время занятия.', 'warning');
        return;
    }
    if (!persons || persons < 1 || persons > 20) {
        showNotification('Укажите количество студентов от 1 до 20.', 'warning');
        return;
    }

    const autoOpts = getAutoOptions(dateStart, persons, course.week_length);
    const result = calculatePrice({
        courseFeePerHour: course.course_fee_per_hour,
        totalWeeks: course.total_length,
        weekLength: course.week_length,
        dateStart, timeStart, persons,
        ...autoOpts,
        supplementary: document.getElementById('opt-supplementary').checked,
        personalized: document.getElementById('opt-personalized').checked,
        excursions: document.getElementById('opt-excursions').checked,
        assessment: document.getElementById('opt-assessment').checked,
        interactive: document.getElementById('opt-interactive').checked,
    });

    const payload = {
        course_id: course.id,
        tutor_id: 0,
        date_start: dateStart,
        time_start: timeStart,
        duration: course.total_length * course.week_length,
        persons,
        price: result.total,
        early_registration: autoOpts.earlyRegistration,
        group_enrollment: autoOpts.groupEnrollment,
        intensive_course: autoOpts.intensiveCourse,
        supplementary: document.getElementById('opt-supplementary').checked,
        personalized: document.getElementById('opt-personalized').checked,
        excursions: document.getElementById('opt-excursions').checked,
        assessment: document.getElementById('opt-assessment').checked,
        interactive: document.getElementById('opt-interactive').checked,
    };

    const btn = document.getElementById('submit-order-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Отправка...';

    try {
        const response = await fetch(apiUrl('/api/orders'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json();

        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('orderModal')).hide();
            showNotification('Заявка успешно оформлена!', 'success');
        } else {
            showNotification(`Ошибка: ${data.error || 'Не удалось создать заявку.'}`, 'danger');
        }
    } catch {
        showNotification('Ошибка сети. Проверьте подключение.', 'danger');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-send me-1"></i>Отправить заявку';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('order-date').addEventListener('change', onOrderDateChange);
    document.getElementById('order-time').addEventListener('change', updateOrderPrice);
    document.getElementById('order-persons').addEventListener('input', updateOrderPrice);
    ['opt-supplementary', 'opt-personalized', 'opt-excursions', 'opt-assessment', 'opt-interactive']
        .forEach(id => document.getElementById(id).addEventListener('change', updateOrderPrice));
    document.getElementById('submit-order-btn').addEventListener('click', submitOrder);
});
