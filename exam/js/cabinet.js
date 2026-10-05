/* eslint-disable no-unused-vars */

let allOrders = [];
let ordersPage = 1;

const coursesCache = {};
const tutorsCache = {};

async function loadCacheData() {
    try {
        const [coursesRes, tutorsRes] = await Promise.all([
            fetch(apiUrl('/api/courses')),
            fetch(apiUrl('/api/tutors')),
        ]);
        (await coursesRes.json()).forEach(c => { coursesCache[c.id] = c; });
        (await tutorsRes.json()).forEach(t => { tutorsCache[t.id] = t; });
    } catch { /* продолжаем без кэша */ }
}

function getOrderTitle(order) {
    if (order.course_id && coursesCache[order.course_id]) return coursesCache[order.course_id].name;
    if (order.tutor_id && tutorsCache[order.tutor_id]) return `Репетитор: ${tutorsCache[order.tutor_id].name}`;
    return order.course_id ? `Курс #${order.course_id}` : `Репетитор #${order.tutor_id}`;
}

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

async function loadOrders() {
    const tbody = document.getElementById('orders-tbody');
    tbody.innerHTML = '<tr><td colspan="5" class="text-center py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted">Загрузка заявок...</p></td></tr>';

    try {
        await loadCacheData();
        const response = await fetch(apiUrl('/api/orders'));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        allOrders = await response.json();
        ordersPage = 1;
        renderOrders();
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4"><div class="alert alert-danger mb-0"><i class="bi bi-exclamation-triangle me-2"></i>Ошибка: ${err.message}</div></td></tr>`;
    }
}

function renderOrders() {
    const tbody = document.getElementById('orders-tbody');
    const paginationNav = document.getElementById('orders-pagination-nav');
    const pagination = document.getElementById('orders-pagination');

    if (allOrders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state py-5"><i class="bi bi-clipboard-x d-block fs-1 mb-3 opacity-25"></i><h5>Заявок пока нет</h5><p class="text-muted">Оформите заявку на <a href="index.html">главной странице</a>.</p></div></td></tr>';
        paginationNav.classList.add('d-none');
        return;
    }

    const totalPages = Math.ceil(allOrders.length / PAGE_SIZE);
    if (ordersPage > totalPages) ordersPage = totalPages;

    const start = (ordersPage - 1) * PAGE_SIZE;
    const pageOrders = allOrders.slice(start, start + PAGE_SIZE);

    tbody.innerHTML = pageOrders.map((order, idx) => {
        const num = start + idx + 1;
        const dateStr = order.date_start ? new Date(order.date_start).toLocaleDateString('ru-RU') : '—';
        const price = order.price ? `${Number(order.price).toLocaleString('ru-RU')} руб.` : '—';
        return `
            <tr>
                <td class="fw-semibold text-muted">${num}</td>
                <td>${getOrderTitle(order)}</td>
                <td>${dateStr}</td>
                <td class="fw-semibold text-primary">${price}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-info" title="Подробнее" onclick="openDetailModal(${order.id})"><i class="bi bi-info-circle"></i></button>
                        <button class="btn btn-outline-warning" title="Изменить" onclick="openEditModal(${order.id})"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-outline-danger" title="Удалить" onclick="openDeleteModal(${order.id})"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    if (totalPages > 1) {
        paginationNav.classList.remove('d-none');
        renderCabinetPagination(pagination, ordersPage, totalPages);
    } else {
        paginationNav.classList.add('d-none');
    }
}

function renderCabinetPagination(container, current, total) {
    const prev = `<li class="page-item ${current === 1 ? 'disabled' : ''}"><button class="page-link" onclick="goOrdersPage(${current - 1})"><i class="bi bi-chevron-left"></i></button></li>`;
    const pages = Array.from({ length: total }, (_, i) => i + 1)
        .map(i => `<li class="page-item ${i === current ? 'active' : ''}"><button class="page-link" onclick="goOrdersPage(${i})">${i}</button></li>`)
        .join('');
    const next = `<li class="page-item ${current === total ? 'disabled' : ''}"><button class="page-link" onclick="goOrdersPage(${current + 1})"><i class="bi bi-chevron-right"></i></button></li>`;
    container.innerHTML = prev + pages + next;
}

function goOrdersPage(page) {
    ordersPage = page;
    renderOrders();
}

async function openDetailModal(orderId) {
    const body = document.getElementById('detail-modal-body');
    body.innerHTML = '<div class="text-center py-3"><div class="spinner-border"></div></div>';
    new bootstrap.Modal(document.getElementById('detailModal')).show();

    try {
        const order = await (await fetch(apiUrl(`/api/orders/${orderId}`))).json();
        const title = getOrderTitle(order);
        const dateStr = order.date_start
            ? new Date(order.date_start).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
            : '—';

        const flag = (val, label, color) => val ? `<span class="badge bg-${color} me-1">${label}</span>` : '';

        body.innerHTML = `
            <div class="row g-3">
                <div class="col-md-6"><h6 class="text-muted text-uppercase small fw-semibold">Курс / Репетитор</h6><p class="fw-semibold">${title}</p></div>
                <div class="col-md-6"><h6 class="text-muted text-uppercase small fw-semibold">Дата занятия</h6><p class="fw-semibold">${dateStr}, ${order.time_start || '—'}</p></div>
                <div class="col-md-6"><h6 class="text-muted text-uppercase small fw-semibold">Кол-во студентов</h6><p class="fw-semibold">${order.persons}</p></div>
                <div class="col-md-6"><h6 class="text-muted text-uppercase small fw-semibold">Продолжительность</h6><p class="fw-semibold">${order.duration} ч.</p></div>
                <div class="col-12">
                    <h6 class="text-muted text-uppercase small fw-semibold">Опции</h6>
                    <div>
                        ${flag(order.early_registration, 'Ранняя запись (-10%)', 'success')}
                        ${flag(order.group_enrollment, 'Групповая скидка (-15%)', 'success')}
                        ${flag(order.intensive_course, 'Интенсивный (+20%)', 'warning')}
                        ${flag(order.supplementary, 'Доп. материалы (+2000)', 'info')}
                        ${flag(order.personalized, 'Инд. занятия (+1500/нед)', 'info')}
                        ${flag(order.excursions, 'Экскурсии (+25%)', 'info')}
                        ${flag(order.assessment, 'Оценка уровня (+300)', 'info')}
                        ${flag(order.interactive, 'Онлайн-платформа (+50%)', 'info')}
                    </div>
                </div>
                <div class="col-12">
                    <div class="card bg-primary text-white p-3">
                        <div class="d-flex justify-content-between">
                            <span class="fw-semibold fs-5">Итоговая стоимость:</span>
                            <span class="fw-bold fs-4">${Number(order.price).toLocaleString('ru-RU')} руб.</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (err) {
        body.innerHTML = `<div class="alert alert-danger">Ошибка загрузки: ${err.message}</div>`;
    }
}

async function openEditModal(orderId) {
    try {
        const order = await (await fetch(apiUrl(`/api/orders/${orderId}`))).json();
        const courseData = order.course_id ? coursesCache[order.course_id] : null;
        const title = getOrderTitle(order);

        document.getElementById('edit-order-id').value = order.id;
        document.getElementById('edit-course-id').value = order.course_id || 0;
        document.getElementById('edit-tutor-id').value = order.tutor_id || 0;
        document.getElementById('edit-course-name').value = title;
        document.getElementById('edit-teacher').value = courseData ? courseData.teacher : '—';
        document.getElementById('edit-duration').value = order.duration;
        document.getElementById('edit-persons').value = order.persons;
        document.getElementById('edit-supplementary').checked = order.supplementary;
        document.getElementById('edit-personalized').checked = order.personalized;
        document.getElementById('edit-excursions').checked = order.excursions;
        document.getElementById('edit-assessment').checked = order.assessment;
        document.getElementById('edit-interactive').checked = order.interactive;

        const dateSelect = document.getElementById('edit-date');
        dateSelect.innerHTML = '<option value="">Выберите дату...</option>';

        if (courseData && courseData.start_dates) {
            const groups = groupDatesByDay(courseData.start_dates);
            Object.keys(groups).sort().forEach(dateKey => {
                const label = new Date(dateKey).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'short' });
                const opt = new Option(label, dateKey);
                if (dateKey === order.date_start) opt.selected = true;
                dateSelect.appendChild(opt);
            });
            fillEditTimes(order.date_start, courseData, order.time_start);
        } else {
            dateSelect.appendChild(Object.assign(new Option(order.date_start, order.date_start), { selected: true }));
            const timeSelect = document.getElementById('edit-time');
            timeSelect.innerHTML = `<option value="${order.time_start}" selected>${order.time_start}</option>`;
            timeSelect.disabled = false;
        }

        if (courseData) {
            document.getElementById('edit-duration-info').value =
                `${courseData.total_length} нед. (${order.duration} ч.) | Окончание: ${calcEndDate(order.date_start, courseData.total_length)}`;
        } else {
            document.getElementById('edit-duration-info').value = `${order.duration} ч.`;
        }

        updateEditPrice(courseData);
        new bootstrap.Modal(document.getElementById('editModal')).show();
    } catch (err) {
        showNotification(`Ошибка загрузки заявки: ${err.message}`, 'danger');
    }
}

function fillEditTimes(dateKey, courseData, selectedTime) {
    const timeSelect = document.getElementById('edit-time');
    if (!dateKey || !courseData) { timeSelect.disabled = true; return; }

    const times = (groupDatesByDay(courseData.start_dates)[dateKey]) || [];
    timeSelect.innerHTML = '<option value="">Выберите время...</option>';
    times.forEach(t => {
        const [h, m] = t.split(':').map(Number);
        const endTime = new Date(0, 0, 0, h + courseData.week_length, m).toTimeString().slice(0, 5);
        const opt = new Option(`${t} — ${endTime}`, t);
        if (t === selectedTime) opt.selected = true;
        timeSelect.appendChild(opt);
    });
    timeSelect.disabled = false;
}

function updateEditPrice(courseData) {
    if (!courseData) return;

    const dateStart = document.getElementById('edit-date').value;
    const timeStart = document.getElementById('edit-time').value;
    const persons = parseInt(document.getElementById('edit-persons').value) || 1;
    const autoOpts = getAutoOptions(dateStart, persons, courseData.week_length);

    document.getElementById('edit-early-badge').style.setProperty('display', autoOpts.earlyRegistration ? 'inline-block' : 'none', 'important');
    document.getElementById('edit-group-badge').style.setProperty('display', autoOpts.groupEnrollment ? 'inline-block' : 'none', 'important');
    document.getElementById('edit-intensive-badge').style.setProperty('display', autoOpts.intensiveCourse ? 'inline-block' : 'none', 'important');

    const result = calculatePrice({
        courseFeePerHour: courseData.course_fee_per_hour,
        totalWeeks: courseData.total_length,
        weekLength: courseData.week_length,
        dateStart, timeStart, persons,
        ...autoOpts,
        supplementary: document.getElementById('edit-supplementary').checked,
        personalized: document.getElementById('edit-personalized').checked,
        excursions: document.getElementById('edit-excursions').checked,
        assessment: document.getElementById('edit-assessment').checked,
        interactive: document.getElementById('edit-interactive').checked,
    });

    document.getElementById('edit-total-price').textContent = `${result.total.toLocaleString('ru-RU')} руб.`;
}

async function saveEditOrder() {
    const orderId = document.getElementById('edit-order-id').value;
    const courseId = parseInt(document.getElementById('edit-course-id').value);
    const dateStart = document.getElementById('edit-date').value;
    const timeStart = document.getElementById('edit-time').value;
    const persons = parseInt(document.getElementById('edit-persons').value);
    const duration = parseInt(document.getElementById('edit-duration').value);

    if (!dateStart || !timeStart) {
        showNotification('Выберите дату и время.', 'warning');
        return;
    }

    const courseData = courseId ? coursesCache[courseId] : null;
    let price = 0;

    if (courseData) {
        const autoOpts = getAutoOptions(dateStart, persons, courseData.week_length);
        price = calculatePrice({
            courseFeePerHour: courseData.course_fee_per_hour,
            totalWeeks: courseData.total_length,
            weekLength: courseData.week_length,
            dateStart, timeStart, persons,
            ...autoOpts,
            supplementary: document.getElementById('edit-supplementary').checked,
            personalized: document.getElementById('edit-personalized').checked,
            excursions: document.getElementById('edit-excursions').checked,
            assessment: document.getElementById('edit-assessment').checked,
            interactive: document.getElementById('edit-interactive').checked,
        }).total;
    }

    const payload = {
        date_start: dateStart, time_start: timeStart, persons, duration, price,
        supplementary: document.getElementById('edit-supplementary').checked,
        personalized: document.getElementById('edit-personalized').checked,
        excursions: document.getElementById('edit-excursions').checked,
        assessment: document.getElementById('edit-assessment').checked,
        interactive: document.getElementById('edit-interactive').checked,
    };

    const btn = document.getElementById('save-edit-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Сохранение...';

    try {
        const response = await fetch(apiUrl(`/api/orders/${orderId}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json();

        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
            showNotification('Заявка успешно обновлена!', 'success');
            loadOrders();
        } else {
            showNotification(`Ошибка: ${data.error || 'Не удалось обновить заявку.'}`, 'danger');
        }
    } catch {
        showNotification('Ошибка сети при сохранении.', 'danger');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-floppy me-1"></i>Сохранить';
    }
}

function openDeleteModal(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    document.getElementById('delete-order-id').value = orderId;
    document.getElementById('delete-order-info').textContent =
        order ? `${getOrderTitle(order)} — ${order.date_start || ''}` : `Заявка #${orderId}`;
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

async function confirmDelete() {
    const orderId = document.getElementById('delete-order-id').value;
    const btn = document.getElementById('confirm-delete-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Удаление...';

    try {
        const response = await fetch(apiUrl(`/api/orders/${orderId}`), { method: 'DELETE' });
        const data = await response.json();

        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
            showNotification('Заявка успешно удалена.', 'success');
            allOrders = allOrders.filter(o => o.id !== parseInt(orderId));
            renderOrders();
        } else {
            showNotification(`Ошибка: ${data.error || 'Не удалось удалить заявку.'}`, 'danger');
        }
    } catch {
        showNotification('Ошибка сети при удалении.', 'danger');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-trash me-1"></i>Да, удалить';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadOrders();

    document.getElementById('edit-date').addEventListener('change', () => {
        const courseId = parseInt(document.getElementById('edit-course-id').value);
        const courseData = courseId ? coursesCache[courseId] : null;
        const dateKey = document.getElementById('edit-date').value;
        fillEditTimes(dateKey, courseData, null);

        if (courseData && dateKey) {
            document.getElementById('edit-duration-info').value =
                `${courseData.total_length} нед. (${courseData.total_length * courseData.week_length} ч.) | Окончание: ${calcEndDate(dateKey, courseData.total_length)}`;
        }
        updateEditPrice(courseData);
    });

    document.getElementById('edit-time').addEventListener('change', () => {
        const courseId = parseInt(document.getElementById('edit-course-id').value);
        updateEditPrice(courseId ? coursesCache[courseId] : null);
    });

    document.getElementById('edit-persons').addEventListener('input', () => {
        const courseId = parseInt(document.getElementById('edit-course-id').value);
        updateEditPrice(courseId ? coursesCache[courseId] : null);
    });

    ['edit-supplementary', 'edit-personalized', 'edit-excursions', 'edit-assessment', 'edit-interactive'].forEach(id => {
        document.getElementById(id).addEventListener('change', () => {
            const courseId = parseInt(document.getElementById('edit-course-id').value);
            updateEditPrice(courseId ? coursesCache[courseId] : null);
        });
    });

    document.getElementById('save-edit-btn').addEventListener('click', saveEditOrder);
    document.getElementById('confirm-delete-btn').addEventListener('click', confirmDelete);
});
