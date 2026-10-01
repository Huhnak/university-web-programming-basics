/* eslint-disable no-unused-vars */

let allTutors = [];
let selectedTutorId = null;

async function loadTutors() {
    const tbody = document.getElementById('tutors-tbody');
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted">Загрузка...</p></td></tr>';

    try {
        const response = await fetch(apiUrl('/api/tutors'));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        allTutors = await response.json();
        fillLanguageFilter();
        renderTutors(allTutors);
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-3"><div class="alert alert-danger mb-0">Ошибка загрузки: ${err.message}</div></td></tr>`;
    }
}

function fillLanguageFilter() {
    const select = document.getElementById('search-tutor-language');
    const languages = new Set();
    allTutors.forEach(t => t.languages_offered.forEach(lang => languages.add(lang)));
    Array.from(languages).sort().forEach(lang => select.appendChild(new Option(lang, lang)));
}

function getLevelBadgeTutor(level) {
    const map = {
        Beginner: '<span class="badge bg-success">Начальный</span>',
        Intermediate: '<span class="badge bg-warning text-dark">Средний</span>',
        Advanced: '<span class="badge bg-danger">Продвинутый</span>',
    };
    return map[level] || `<span class="badge bg-secondary">${level}</span>`;
}

function renderTutors(tutors) {
    const tbody = document.getElementById('tutors-tbody');

    if (tutors.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted"><i class="bi bi-search fs-2 d-block mb-2 opacity-50"></i>Репетиторы не найдены</td></tr>';
        return;
    }

    tbody.innerHTML = tutors.map(tutor => {
        const isSelected = tutor.id === selectedTutorId;
        return `
            <tr class="${isSelected ? 'tutor-selected' : ''}" id="tutor-row-${tutor.id}">
                <td>
                    <div class="d-flex align-items-center justify-content-center rounded-circle bg-light" style="width:45px;height:45px;">
                        <i class="bi bi-person-fill text-secondary fs-4"></i>
                    </div>
                </td>
                <td class="fw-semibold">${tutor.name}</td>
                <td>${getLevelBadgeTutor(tutor.language_level)}</td>
                <td>${tutor.languages_offered.map(l => `<span class="badge bg-primary me-1">${l}</span>`).join('')}</td>
                <td>${tutor.work_experience} лет</td>
                <td>${tutor.price_per_hour.toLocaleString('ru-RU')} руб.</td>
                <td>
                    <button class="btn btn-sm ${isSelected ? 'btn-success' : 'btn-outline-primary'}" onclick="selectTutor(${tutor.id})">
                        ${isSelected ? '<i class="bi bi-check-circle-fill me-1"></i>Выбран' : '<i class="bi bi-hand-index me-1"></i>Выбрать'}
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function selectTutor(tutorId) {
    selectedTutorId = selectedTutorId === tutorId ? null : tutorId;
    filterTutors();
}

function filterTutors() {
    const langQuery = document.getElementById('search-tutor-language').value;
    const levelQuery = document.getElementById('search-tutor-level').value;

    const result = allTutors.filter(t =>
        (!langQuery || t.languages_offered.includes(langQuery))
        && (!levelQuery || t.language_level === levelQuery)
    );

    renderTutors(result);
}

document.addEventListener('DOMContentLoaded', () => {
    loadTutors();
    document.getElementById('search-tutor-language').addEventListener('change', filterTutors);
    document.getElementById('search-tutor-level').addEventListener('change', filterTutors);
});
