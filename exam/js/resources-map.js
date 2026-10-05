/* eslint-disable no-unused-vars */

// Данные учебных ресурсов для изучения иностранных языков (Москва)
const educationalResources = [
    {
        id: 1,
        name: 'Библиотека иностранной литературы им. М. И. Рудомино',
        category: 'library',
        categoryName: 'Публичные библиотеки',
        badgeClass: 'bg-success',
        badgeColor: '#198754',
        iconPreset: 'islands#darkGreenBookIcon',
        address: 'г. Москва, ул. Николоямская, д. 1',
        coordinates: [55.748256, 37.649514],
        hours: 'Вт–Пт: 11:00 – 21:00, Сб–Вс: 11:00 – 19:00, Пн: выходной',
        contact: '+7 (495) 915-36-21 | info@libfl.ru | libfl.ru',
        services: 'Крупнейшее собрание литературы на 140+ языках мира, языковые клубы, разговорные встречи с носителями, электронные базы периодики, лекции и киноклуб.',
        keywords: ['библиотеки с ресурсами на иностранных языках', 'языковой клуб', 'учебные материалы', 'разговорная практика', 'библиотека', 'иностранка', 'рудомино']
    },
    {
        id: 2,
        name: 'Библиотека им. Н. А. Некрасова (Отдел литературы на иностранных языках)',
        category: 'library',
        categoryName: 'Публичные библиотеки',
        badgeClass: 'bg-success',
        badgeColor: '#198754',
        iconPreset: 'islands#darkGreenBookIcon',
        address: 'г. Москва, ул. Бауманская, д. 58/25, стр. 14',
        coordinates: [55.772583, 37.679192],
        hours: 'Пн–Сб: 10:00 – 22:00, Вс: 10:00 – 20:00',
        contact: '+7 (495) 916-93-86 | nekrasovka.ru',
        services: 'Коллекция художественной и учебной литературы на иностранных языках, бесплатные разговорные клубы (английский, испанский), коворкинг и аудиоматериалы.',
        keywords: ['библиотеки с ресурсами на иностранных языках', 'языковой клуб', 'учебные материалы', 'библиотека', 'некрасовка']
    },
    {
        id: 3,
        name: 'Российская государственная библиотека для молодёжи (РГБМ)',
        category: 'library',
        categoryName: 'Публичные библиотеки',
        badgeClass: 'bg-success',
        badgeColor: '#198754',
        iconPreset: 'islands#darkGreenBookIcon',
        address: 'г. Москва, ул. Большая Черкизовская, д. 4, корп. 1',
        coordinates: [55.795847, 37.716945],
        hours: 'Пн–Пт: 11:00 – 22:00, Сб–Вс: 11:00 – 20:00',
        contact: '+7 (499) 670-80-01 | rgbm.ru',
        services: 'Фонд книг на 70 языках, молодежный английский дискуссионный клуб, периодика и комиксы в оригинале, разговорная практика.',
        keywords: ['библиотеки с ресурсами на иностранных языках', 'языковой клуб', 'разговорная практика', 'библиотека']
    },
    {
        id: 4,
        name: 'Гёте-Институт в Москве (Goethe-Institut)',
        category: 'educational',
        categoryName: 'Образовательные учреждения',
        badgeClass: 'bg-primary',
        badgeColor: '#0d6efd',
        iconPreset: 'islands#darkBlueEducationIcon',
        address: 'г. Москва, Ленинский проспект, д. 95А',
        coordinates: [55.679932, 37.519845],
        hours: 'Пн–Пт: 09:00 – 19:00, Сб: 10:00 – 16:00',
        contact: '+7 (495) 936-24-57 | info-moskau@goethe.de | goethe.de',
        services: 'Курсы немецкого языка для всех уровней, международные сертификационные экзамены, медиатека с немецкой литературой, языковой клуб и лектории.',
        keywords: ['образовательные учреждения', 'курсы иностранного языка', 'языковой клуб', 'учебные материалы', 'немецкий', 'гёте']
    },
    {
        id: 5,
        name: 'Французский институт в России (Institut Français)',
        category: 'educational',
        categoryName: 'Образовательные учреждения',
        badgeClass: 'bg-primary',
        badgeColor: '#0d6efd',
        iconPreset: 'islands#darkBlueEducationIcon',
        address: 'г. Москва, ул. Воронцово Поле, д. 16, стр. 1',
        coordinates: [55.752312, 37.653498],
        hours: 'Пн–Пт: 09:30 – 20:00, Сб: 10:00 – 17:00',
        contact: '+7 (495) 797-66-38 | contact@institutfrancais.ru',
        services: 'Профессиональные курсы французского языка, подготовка к DELF/DALF, богатая медиатека, разговорные клубы и кинопоказы на языке оригинала.',
        keywords: ['образовательные учреждения', 'курсы иностранного языка', 'языковой клуб', 'французский']
    },
    {
        id: 6,
        name: 'Институт Сервантеса (Instituto Cervantes)',
        category: 'educational',
        categoryName: 'Образовательные учреждения',
        badgeClass: 'bg-primary',
        badgeColor: '#0d6efd',
        iconPreset: 'islands#darkBlueEducationIcon',
        address: 'г. Москва, Новинский бульвар, д. 20А, стр. 1-2',
        coordinates: [55.756208, 37.584732],
        hours: 'Пн–Пт: 10:00 – 20:00, Сб: 10:00 – 15:00',
        contact: '+7 (495) 609-90-22 | cenmos@cervantes.es | moscu.cervantes.es',
        services: 'Официальные курсы испанского языка, библиотека им. Мигеля Делибеса, разговорная практика, сертификационные экзамены DELE и культурные вечера.',
        keywords: ['образовательные учреждения', 'курсы иностранного языка', 'учебные материалы', 'разговорная практика', 'испанский', 'сервантес']
    },
    {
        id: 7,
        name: 'Культурный центр «ЗИЛ» (Языковой лекторий)',
        category: 'community',
        categoryName: 'Общественные центры',
        badgeClass: 'bg-warning text-dark',
        badgeColor: '#ffc107',
        iconPreset: 'islands#orangeCultureIcon',
        address: 'г. Москва, ул. Восточная, д. 4, корп. 1',
        coordinates: [55.713628, 37.658264],
        hours: 'Пн–Вс: 10:00 – 22:00',
        contact: '+7 (495) 675-16-36 | zilcc.ru',
        services: 'Открытые общественные лекции на иностранных языках, разговорный клуб выходного дня, воркшопы по межкультурной коммуникации.',
        keywords: ['общественные центры', 'культурные центры', 'языковой клуб', 'разговорная практика', 'зил']
    },
    {
        id: 8,
        name: 'Американский культурный центр (American Center)',
        category: 'community',
        categoryName: 'Общественные центры',
        badgeClass: 'bg-warning text-dark',
        badgeColor: '#ffc107',
        iconPreset: 'islands#orangeCultureIcon',
        address: 'г. Москва, Николоямский переулок, д. 1',
        coordinates: [55.748530, 37.649980],
        hours: 'Пн–Пт: 12:00 – 20:00, Сб: 12:00 – 18:00',
        contact: '+7 (495) 777-65-30 | amcenter.ru',
        services: 'Бесплатные разговорные клубы с носителями языка, лекции, кинопоказы в оригинале, обширная ресурсная база учебных пособий.',
        keywords: ['общественные центры', 'культурные центры', 'языковой клуб', 'разговорная практика', 'учебные материалы', 'английский']
    },
    {
        id: 9,
        name: 'Центр славянских культур',
        category: 'community',
        categoryName: 'Общественные центры',
        badgeClass: 'bg-warning text-dark',
        badgeColor: '#ffc107',
        iconPreset: 'islands#orangeCultureIcon',
        address: 'г. Москва, ул. Николоямская, д. 1',
        coordinates: [55.748050, 37.649100],
        hours: 'Вт–Пт: 11:00 – 20:00, Сб: 11:00 – 18:00',
        contact: '+7 (495) 915-77-33 | slavic@libfl.ru',
        services: 'Изучение славянских языков (польский, сербский, чешский, болгарский), языковые лектории, культурные вечера и разговорные кружки.',
        keywords: ['общественные центры', 'культурные центры', 'языковой клуб', 'курсы иностранного языка']
    },
    {
        id: 10,
        name: 'Языковой центр LinguaWorld Prime',
        category: 'private_courses',
        categoryName: 'Частные языковые курсы',
        badgeClass: 'bg-info text-dark',
        badgeColor: '#0dcaf0',
        iconPreset: 'islands#violetEducationIcon',
        address: 'г. Москва, ул. Тверская, д. 12, стр. 2',
        coordinates: [55.762950, 37.607420],
        hours: 'Пн–Сб: 08:30 – 21:30, Вс: 10:00 – 18:00',
        contact: '+7 (495) 123-45-67 | info@linguaworld.ru | linguaworld.ru',
        services: 'Интенсивные курсы английского, немецкого, испанского и китайского языков, подготовка к IELTS/TOEFL, мини-группы и персональные тьюторы.',
        keywords: ['частные языковые курсы', 'курсы иностранного языка', 'занятия', 'учебные материалы', 'linguaworld']
    },
    {
        id: 11,
        name: 'Международная языковая школа BKC-International House',
        category: 'private_courses',
        categoryName: 'Частные языковые курсы',
        badgeClass: 'bg-info text-dark',
        badgeColor: '#0dcaf0',
        iconPreset: 'islands#violetEducationIcon',
        address: 'г. Москва, Газетный переулок, д. 3-5, стр. 1',
        coordinates: [55.758380, 37.609950],
        hours: 'Пн–Пт: 09:00 – 21:00, Сб–Вс: 10:00 – 18:00',
        contact: '+7 (495) 737-52-25 | bkc.ru',
        services: 'Обучение с сертифицированными преподавателями CELTA/DELTA, разговорная практика, бизнес-курсы, подготовка к международным экзаменам.',
        keywords: ['частные языковые курсы', 'курсы иностранного языка', 'занятия', 'разговорная практика', 'bkc']
    },
    {
        id: 12,
        name: 'Школа восточных языков «Восток»',
        category: 'private_courses',
        categoryName: 'Частные языковые курсы',
        badgeClass: 'bg-info text-dark',
        badgeColor: '#0dcaf0',
        iconPreset: 'islands#violetEducationIcon',
        address: 'г. Москва, ул. Мясницкая, д. 24/7, стр. 1',
        coordinates: [55.762740, 37.636680],
        hours: 'Пн–Сб: 10:00 – 21:00',
        contact: '+7 (495) 410-88-92 | vostok-school.ru',
        services: 'Курсы китайского, японского, корейского и арабского языков, мастер-классы каллиграфии, учебные материалы, подготовка к HSK и JLPT.',
        keywords: ['частные языковые курсы', 'курсы иностранного языка', 'занятия', 'учебные материалы', 'китайский', 'японский']
    },
    {
        id: 13,
        name: 'Антикафе и языковой клуб «Циферблат на Покровке»',
        category: 'cafe_clubs',
        categoryName: 'Языковые кафе или клубы',
        badgeClass: 'bg-danger',
        badgeColor: '#dc3545',
        iconPreset: 'islands#redCafeIcon',
        address: 'г. Москва, ул. Покровка, д. 12',
        coordinates: [55.758950, 37.645120],
        hours: 'Пн–Вс: 10:00 – 00:00 (ежедневно)',
        contact: '+7 (965) 446-44-66 | ziferblat.net',
        services: 'Регулярные разговорные встречи клубов English, Español и Français, настольные игры на иностранных языках, чай/кофе, свободное общение с носителями.',
        keywords: ['языковые кафе или клубы', 'кафе языкового обмена', 'языковой клуб', 'разговорная практика', 'кафе', 'циферблат']
    },
    {
        id: 14,
        name: 'Кафе языкового обмена «Polyglot Cafe & Meeting Point»',
        category: 'cafe_clubs',
        categoryName: 'Языковые кафе или клубы',
        badgeClass: 'bg-danger',
        badgeColor: '#dc3545',
        iconPreset: 'islands#redCafeIcon',
        address: 'г. Москва, ул. Арбат, д. 22',
        coordinates: [55.749780, 37.591240],
        hours: 'Пн–Вс: 11:00 – 23:00',
        contact: '+7 (903) 712-33-44 | polyglot-cafe.ru',
        services: 'Вечера Speed-Speaking языкового обмена (Language Exchange), интернациональные встречи, разговорная практика в непринужденной обстановке.',
        keywords: ['языковые кафе или клубы', 'кафе языкового обмена', 'языковой клуб', 'разговорная практика', 'кафе', 'polyglot']
    },
    {
        id: 15,
        name: 'Разговорный клуб «English Speaking Corner» в кафе Ex:Libris',
        category: 'cafe_clubs',
        categoryName: 'Языковые кафе или клубы',
        badgeClass: 'bg-danger',
        badgeColor: '#dc3545',
        iconPreset: 'islands#redCafeIcon',
        address: 'г. Москва, Бобров переулок, д. 6, стр. 1',
        coordinates: [55.764510, 37.635890],
        hours: 'Вт, Чт: 18:30 – 22:00, Сб: 14:00 – 18:00',
        contact: '+7 (495) 625-58-55 | exlibris-cafe.ru',
        services: 'Тематические дебаты, просмотр TED-видео с разбором лексики, разговорные сессии за чашкой кофе, языковой клуб для уровней Intermediate и Advanced.',
        keywords: ['языковые кафе или клубы', 'кафе языкового обмена', 'языковой клуб', 'разговорная практика', 'кафе', 'english']
    }
];

// Глобальные переменные состояния
let currentFilteredResources = [...educationalResources];
let yandexMap = null;
let geoCollection = null;
const placemarkRegistry = {};
let selectedResourceId = null;

// Инициализация при готовности DOM
document.addEventListener('DOMContentLoaded', () => {
    initFiltersAndSearch();
    renderResourcesList(currentFilteredResources);
    initYandexMap();
});

// Инициализация фильтров, поиска и быстрых тегов
function initFiltersAndSearch() {
    const searchInput = document.getElementById('map-search-input');
    const categorySelect = document.getElementById('map-category-filter');
    const resetBtn = document.getElementById('map-reset-btn');
    const quickChips = document.querySelectorAll('.quick-tag-chip');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const currentVal = searchInput.value.trim().toLowerCase();
            quickChips.forEach(chip => {
                const term = (chip.getAttribute('data-term') || '').toLowerCase();
                if (term === '') {
                    chip.classList.toggle('active', currentVal === '');
                } else {
                    chip.classList.toggle('active', currentVal === term);
                }
            });
            applyFilters();
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', applyFilters);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (categorySelect) categorySelect.value = '';
            quickChips.forEach(chip => chip.classList.remove('active'));
            const allChip = document.querySelector('.quick-tag-chip[data-term=""]');
            if (allChip) allChip.classList.add('active');
            applyFilters();
        });
    }

    quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const term = chip.getAttribute('data-term') || '';
            quickChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            if (searchInput) {
                searchInput.value = term;
            }
            applyFilters();
        });
    });
}

// Применение фильтрации и поиска
function applyFilters() {
    const searchInput = document.getElementById('map-search-input');
    const categorySelect = document.getElementById('map-category-filter');

    const query = (searchInput ? searchInput.value.trim().toLowerCase() : '');
    const category = (categorySelect ? categorySelect.value : '');

    currentFilteredResources = educationalResources.filter(item => {
        // Фильтрация по категории
        if (category && item.category !== category) {
            return false;
        }

        // Полнотекстовый поиск по названию, адресу, услугам, категории и ключевым словам
        if (query) {
            const inName = item.name.toLowerCase().includes(query);
            const inAddress = item.address.toLowerCase().includes(query);
            const inServices = item.services.toLowerCase().includes(query);
            const inCategory = item.categoryName.toLowerCase().includes(query);
            const inKeywords = item.keywords.some(k => k.toLowerCase().includes(query));

            if (!inName && !inAddress && !inServices && !inCategory && !inKeywords) {
                return false;
            }
        }

        return true;
    });

    renderResourcesList(currentFilteredResources);
    updateMapPlacemarks(currentFilteredResources);
}

// Отрисовка списка карточек ресурсов (правая колонка — Рисунок 7)
function renderResourcesList(resources) {
    const container = document.getElementById('resources-list-container');
    const countBadge = document.getElementById('map-resources-count');

    if (countBadge) {
        countBadge.textContent = `${resources.length} из ${educationalResources.length}`;
    }

    if (!container) return;

    if (resources.length === 0) {
        container.innerHTML = `
            <div class="empty-state py-4 text-center">
                <i class="bi bi-search text-muted fs-1 mb-2 d-block"></i>
                <h6 class="fw-bold">Ресурсы не найдены</h6>
                <p class="text-muted small">Попробуйте изменить поисковый запрос или сбросить фильтры.</p>
                <button class="btn btn-sm btn-outline-primary" onclick="resetMapSearch()">Сбросить фильтры</button>
            </div>
        `;
        return;
    }

    container.innerHTML = resources.map(item => `
        <div class="card resource-card mb-3 border-0 shadow-sm ${selectedResourceId === item.id ? 'active-resource' : ''}"
             data-id="${item.id}"
             id="resource-item-${item.id}">
            <div class="card-body p-3">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <h6 class="fw-bold mb-0 text-primary">${item.name}</h6>
                    <span class="badge ${item.badgeClass} flex-shrink-0">${item.categoryName}</span>
                </div>
                <div class="small text-secondary mb-1">
                    <i class="bi bi-geo-alt-fill text-danger me-1"></i><strong>Адрес:</strong> ${item.address}
                </div>
                <div class="small text-secondary mb-1">
                    <i class="bi bi-clock-fill text-primary me-1"></i><strong>Часы работы:</strong> ${item.hours}
                </div>
                <div class="small text-secondary mb-1">
                    <i class="bi bi-telephone-fill text-success me-1"></i><strong>Контакты:</strong> ${item.contact}
                </div>
                <div class="small text-muted mb-2">
                    <i class="bi bi-info-circle-fill text-info me-1"></i><strong>Услуги:</strong> ${item.services}
                </div>
                <div class="text-end">
                    <button type="button" class="btn btn-sm btn-outline-primary resource-show-btn" data-id="${item.id}">
                        <i class="bi bi-geo-alt me-1"></i>Показать на карте
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Привязываем обработчики кликов к карточкам и кнопкам
    container.querySelectorAll('.resource-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.getAttribute('data-id'), 10);
            focusResourceOnMap(id);
        });
    });

    container.querySelectorAll('.resource-show-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'), 10);
            focusResourceOnMap(id);
        });
    });
}

// Глобальная функция сброса поиска
window.resetMapSearch = function() {
    const searchInput = document.getElementById('map-search-input');
    const categorySelect = document.getElementById('map-category-filter');
    if (searchInput) searchInput.value = '';
    if (categorySelect) categorySelect.value = '';
    const quickChips = document.querySelectorAll('.quick-tag-chip');
    quickChips.forEach(chip => chip.classList.remove('active'));
    const allChip = document.querySelector('.quick-tag-chip[data-term=""]');
    if (allChip) allChip.classList.add('active');
    applyFilters();
};

// Создание HTML для балуна метки на карте
function createBalloonContent(item) {
    return `
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px; max-width: 280px;">
            <div style="margin-bottom: 8px;">
                <span style="display:inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; color: #fff; background-color: ${item.badgeColor || '#0d6efd'};">${item.categoryName}</span>
            </div>
            <div style="font-weight: bold; font-size: 15px; color: #0d6efd; margin-bottom: 8px; line-height: 1.25;">${item.name}</div>
            <div style="font-size: 13px; margin-bottom: 5px; color: #333;"><strong>Адрес:</strong> ${item.address}</div>
            <div style="font-size: 13px; margin-bottom: 5px; color: #333;"><strong>Часы работы:</strong> ${item.hours}</div>
            <div style="font-size: 13px; margin-bottom: 5px; color: #333;"><strong>Контакты:</strong> ${item.contact}</div>
            <div style="font-size: 12px; color: #666; margin-top: 6px; padding-top: 6px; border-top: 1px solid #e9ecef;"><strong>Услуги:</strong> ${item.services}</div>
        </div>
    `;
}

// Инициализация Яндекс.Карт с безопасным ожиданием загрузки внешнего скрипта
function initYandexMap() {
    const mapContainer = document.getElementById('resources-map-container');
    if (!mapContainer) return;

    let attempts = 0;
    const maxAttempts = 60; // До 6 секунд ожидания загрузки скрипта API

    function tryInit() {
        if (typeof ymaps !== 'undefined') {
            ymaps.ready(() => {
                try {
                    mapContainer.innerHTML = '';
                    yandexMap = new ymaps.Map('resources-map-container', {
                        center: [55.753215, 37.622504],
                        zoom: 11,
                        controls: ['zoomControl', 'fullscreenControl', 'typeSelector', 'geolocationControl']
                    }, {
                        searchControlProvider: 'yandex#search'
                    });

                    // Адаптация геометрии карты под размеры контейнера
                    yandexMap.container.fitToViewport();
                    window.addEventListener('resize', () => {
                        if (yandexMap) {
                            yandexMap.container.fitToViewport();
                        }
                    });

                    geoCollection = new ymaps.GeoObjectCollection();
                    yandexMap.geoObjects.add(geoCollection);

                    // Создаем метки для всех ресурсов
                    educationalResources.forEach(item => {
                        const placemark = new ymaps.Placemark(item.coordinates, {
                            hintContent: item.name,
                            balloonContent: createBalloonContent(item)
                        }, {
                            preset: item.iconPreset || 'islands#blueDotIcon'
                        });

                        // Клик по метке на карте подсвечивает карточку в списке
                        placemark.events.add('click', () => {
                            highlightResourceCard(item.id);
                        });

                        placemarkRegistry[item.id] = placemark;
                    });

                    // Размещаем метки текущей выборки
                    updateMapPlacemarks(currentFilteredResources);

                } catch (err) {
                    console.error('Ошибка создания Яндекс.Карт:', err);
                    renderMapFallbackNotice(mapContainer, err.message);
                }
            });
            return;
        }

        attempts++;
        if (attempts < maxAttempts) {
            setTimeout(tryInit, 100);
        } else {
            renderMapFallbackNotice(mapContainer);
        }
    }

    tryInit();
}

// Обновление меток на карте при фильтрации
function updateMapPlacemarks(resources) {
    if (!yandexMap || !geoCollection) return;

    geoCollection.removeAll();

    resources.forEach(item => {
        const placemark = placemarkRegistry[item.id];
        if (placemark) {
            geoCollection.add(placemark);
        }
    });

    // Автоматическое масштабирование и центрирование карты
    if (resources.length === 1) {
        yandexMap.setCenter(resources[0].coordinates, 15, {
            checkZoomRange: true,
            duration: 300
        });
    } else if (resources.length > 1) {
        const bounds = geoCollection.getBounds();
        if (bounds) {
            yandexMap.setBounds(bounds, {
                checkZoomRange: true,
                zoomMargin: 40,
                duration: 300
            });
        }
    }
}

// Фокусировка на выбранном ресурсе: плавный сдвиг карты и открытие балуна
function focusResourceOnMap(id) {
    selectedResourceId = id;
    highlightResourceCard(id);

    const resource = educationalResources.find(item => item.id === id);
    const placemark = placemarkRegistry[id];

    if (yandexMap && resource && placemark) {
        yandexMap.setCenter(resource.coordinates, 15, {
            checkZoomRange: true,
            duration: 350
        }).then(() => {
            placemark.balloon.open();
        });
    }
}

// Подсветка карточки ресурса в списке
function highlightResourceCard(id) {
    selectedResourceId = id;

    document.querySelectorAll('.resource-card').forEach(card => {
        card.classList.remove('active-resource');
    });

    const activeCard = document.getElementById(`resource-item-${id}`);
    if (activeCard) {
        activeCard.classList.add('active-resource');
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Заглушка, если API Яндекс.Карт недоступен
function renderMapFallbackNotice(container, errorDetails = '') {
    container.innerHTML = `
        <div class="h-100 d-flex flex-column align-items-center justify-content-center p-4 text-center bg-light border rounded">
            <i class="bi bi-map text-primary display-4 mb-3"></i>
            <h5 class="fw-bold mb-2">Интерактивная карта учебных ресурсов</h5>
            <p class="text-muted small mb-3" style="max-width: 460px;">
                Для интерактивного отображения карты используется <strong>Яндекс.Карты API</strong>. 
                Убедитесь в наличии интернет-соединения или укажите действующий API-ключ в файле <code>index.html</code>.
            </p>
            <div class="alert alert-info py-2 px-3 small text-start" style="max-width: 460px;">
                <i class="bi bi-info-circle me-1"></i>
                Поиск, фильтры и подробные карточки учебных ресурсов полностью активны в каталоге справа.
            </div>
            ${errorDetails ? `<div class="text-danger small mt-2">${errorDetails}</div>` : ''}
        </div>
    `;
}

