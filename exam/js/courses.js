/* eslint-disable no-unused-vars */

let allCourses = [];
let filteredCourses = [];
let coursesPage = 1;

function getLevelBadge(level) {
    const map = {
        Beginner: '<span class="badge level-badge-Beginner">Начальный</span>',
        Intermediate: '<span class="badge level-badge-Intermediate">Средний</span>',
        Advanced: '<span class="badge level-badge-Advanced text-white">Продвинутый</span>',
    };
    return map[level] || `<span class="badge bg-secondary">${level}</span>`;
}

async function loadCourses() {
    const list = document.getElementById('courses-list');
    list.innerHTML = '<div class="col-12 loading-spinner"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted">Загрузка курсов...</p></div>';

    try {
        const response = await fetch(apiUrl('/api/courses'));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        allCourses = await response.json();
        filteredCourses = [...allCourses];
        coursesPage = 1;
        renderCourses();
    } catch (err) {
        list.innerHTML = `<div class="col-12"><div class="alert alert-danger"><i class="bi bi-exclamation-triangle me-2"></i>Ошибка загрузки курсов: ${err.message}</div></div>`;
    }
}

function renderCourses() {
    const list = document.getElementById('courses-list');
    const paginationNav = document.getElementById('courses-pagination-nav');
    const pagination = document.getElementById('courses-pagination');

    if (filteredCourses.length === 0) {
        list.innerHTML = '<div class="col-12"><div class="empty-state"><i class="bi bi-search"></i><h5>Курсы не найдены</h5><p>Попробуйте изменить параметры поиска.</p></div></div>';
        paginationNav.classList.add('d-none');
        return;
    }

    const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE);
    if (coursesPage > totalPages) coursesPage = totalPages;

    const pageCourses = filteredCourses.slice((coursesPage - 1) * PAGE_SIZE, coursesPage * PAGE_SIZE);

    list.innerHTML = pageCourses.map(course => {
        const minDate = course.start_dates.length > 0
            ? new Date(course.start_dates[0]).toLocaleDateString('ru-RU') : '—';
        const shortDesc = course.description.length > 120
            ? course.description.slice(0, 120) + '...' : course.description;
        const courseJson = JSON.stringify(course).replace(/"/g, '&quot;');

        return `
            <div class="col-md-6 col-lg-4">
                <div class="card course-card h-100 border-0 shadow-sm">
                    <div class="card-header bg-primary text-white py-3">
                        <div class="d-flex justify-content-between align-items-start gap-2">
                            <h5 class="card-title mb-0 fs-6">${course.name}</h5>
                            ${getLevelBadge(course.level)}
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <p class="card-text text-muted small mb-3" title="${course.description}">${shortDesc}</p>
                        <ul class="list-unstyled small mb-3">
                            <li class="mb-1"><i class="bi bi-person-fill text-primary me-1"></i><strong>Преподаватель:</strong> ${course.teacher}</li>
                            <li class="mb-1"><i class="bi bi-clock text-primary me-1"></i><strong>Длительность:</strong> ${course.total_length} нед. (${course.week_length} ч/нед.)</li>
                            <li class="mb-1"><i class="bi bi-calendar-event text-primary me-1"></i><strong>Ближайшая дата:</strong> ${minDate}</li>
                            <li><i class="bi bi-currency-ruble text-primary me-1"></i><strong>Стоимость:</strong> ${course.course_fee_per_hour} руб./час</li>
                        </ul>
                        <div class="mt-auto">
                            <button class="btn btn-primary w-100" onclick="openOrderModal(${courseJson})">
                                <i class="bi bi-clipboard-check me-1"></i>Подать заявку
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (totalPages > 1) {
        paginationNav.classList.remove('d-none');
        renderPagination(pagination, coursesPage, totalPages);
    } else {
        paginationNav.classList.add('d-none');
    }
}

function goCoursesPage(page) {
    coursesPage = page;
    renderCourses();
    document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
}

function renderPagination(container, current, total) {
    const prev = `<li class="page-item ${current === 1 ? 'disabled' : ''}"><button class="page-link" onclick="goCoursesPage(${current - 1})"><i class="bi bi-chevron-left"></i></button></li>`;
    const pages = Array.from({ length: total }, (_, i) => i + 1)
        .map(i => `<li class="page-item ${i === current ? 'active' : ''}"><button class="page-link" onclick="goCoursesPage(${i})">${i}</button></li>`)
        .join('');
    const next = `<li class="page-item ${current === total ? 'disabled' : ''}"><button class="page-link" onclick="goCoursesPage(${current + 1})"><i class="bi bi-chevron-right"></i></button></li>`;
    container.innerHTML = prev + pages + next;
}

function filterCourses() {
    const nameQuery = document.getElementById('search-course-name').value.toLowerCase().trim();
    const levelQuery = document.getElementById('search-course-level').value;

    filteredCourses = allCourses.filter(c => {
        return (!nameQuery || c.name.toLowerCase().includes(nameQuery))
            && (!levelQuery || c.level === levelQuery);
    });

    coursesPage = 1;
    renderCourses();
}

document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    document.getElementById('search-course-name').addEventListener('input', filterCourses);
    document.getElementById('search-course-level').addEventListener('change', filterCourses);
});
