const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

// const API_URL = 'http://lab7-api.std-900.ist.mospolytech.ru/api/dishes';

// Глобальная переменная для хранения блюд

// Объект для хранения активных фильтров
const activeFilters = {};

// ===== ФУНКЦИЯ ЗАГРУЗКИ ДАННЫХ С СЕРВЕРА =====
async function loadDishes() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Нормализуем данные (приводим к единому формату)
        dishes = data.map(dish => ({
            keyword: dish.keyword,
            name: dish.name,
            price: dish.price,
            category: dish.category,
            kind: dish.kind,
            count: dish.count,
            image: dish.image
        }));

        console.log('Данные загружены с сервера. Количество блюд:', dishes.length);

    } catch (error) {
        console.warn('Не удалось загрузить данные с сервера. Используются моковые данные.', error);

        // Fallback на моковые данные
        dishes = [...mockDishes];

        console.log('Загружены моковые данные. Количество блюд:', dishes.length);
    }

    // После загрузки данных инициализируем приложение
    initApp();
}

// ===== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ПОСЛЕ ЗАГРУЗКИ ДАННЫХ =====
function initApp() {
    renderAllDishes();
    initFilters();
    initOrderManager();
    initValidation();
}
// В конец файла добавьте:

// ===== ИНИЦИАЛИЗАЦИЯ ВАЛИДАЦИИ (заглушка) =====
function initValidation() {
    // Валидация теперь в отдельном файле validation.js
    console.log('Validation initialized');
}

// ===== ФУНКЦИЯ СОРТИРОВКИ БЛЮД ПО АЛФАВИТУ =====
function sortDishes(dishesArray) {
    return dishesArray.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}

// ===== ФУНКЦИЯ СОЗДАНИЯ HTML-ЭЛЕМЕНТА ДЛЯ БЛЮДА =====
function createDishCard(dish) {
    const dishCard = document.createElement('div');
    dishCard.className = 'dish-card';
    dishCard.setAttribute('data-dish', dish.keyword);

    dishCard.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" loading="lazy">
        <p class="price">${dish.price}₽</p>
        <p class="dish-name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button class="add-btn">Добавить</button>
    `;

    return dishCard;
}

// ===== ФУНКЦИЯ ФИЛЬТРАЦИИ БЛЮД =====
function filterDishes(dishesArray, category, filterKind) {
    if (!filterKind) {
        return dishesArray.filter(dish => dish.category === category);
    }

    return dishesArray.filter(dish =>
        dish.category === category && dish.kind === filterKind
    );
}

// ===== ФУНКЦИЯ ОТОБРАЖЕНИЯ БЛЮД В СЕКЦИИ =====
function renderDishesInSection(dishesArray, category, sectionId, currentFilter = null) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const dishesGrid = section.querySelector('.dishes-grid');
    if (!dishesGrid) return;

    // Очищаем сетку
    dishesGrid.innerHTML = '';

    // Фильтруем и сортируем блюда
    const filteredDishes = sortDishes(
        filterDishes(dishesArray, category, currentFilter)
    );

    // Если блюда не найдены
    if (filteredDishes.length === 0) {
        dishesGrid.innerHTML = '<p class="no-dishes">Блюда не найдены</p>';
        return;
    }

    // Создаем и добавляем карточки
    filteredDishes.forEach(dish => {
        const dishCard = createDishCard(dish);
        dishesGrid.appendChild(dishCard);
    });
}

// ===== ФУНКЦИЯ ОТОБРАЖЕНИЯ ВСЕХ БЛЮД С УЧЕТОМ ФИЛЬТРОВ =====
function renderAllDishes() {
    const soupFilter = activeFilters.soup || null;
    const mainFilter = activeFilters.main || null;
    const saladFilter = activeFilters.salad || null;
    const drinkFilter = activeFilters.drink || null;
    const dessertFilter = activeFilters.dessert || null;

    renderDishesInSection(dishes, 'soup', 'soups-section', soupFilter);
    renderDishesInSection(dishes, 'main', 'main-section', mainFilter);
    renderDishesInSection(dishes, 'salad', 'salads-section', saladFilter);
    renderDishesInSection(dishes, 'drink', 'drinks-section', drinkFilter);
    renderDishesInSection(dishes, 'dessert', 'desserts-section', dessertFilter);
}

// ===== ФУНКЦИЯ УСТАНОВКИ ФИЛЬТРА =====
function setFilter(category, filterKind) {
    // Если кликнули на уже активный фильтр - снимаем его
    if (activeFilters[category] === filterKind) {
        delete activeFilters[category];
    } else {
        activeFilters[category] = filterKind;
    }

    // Обновляем отображение кнопок
    updateFilterButtons(category);

    // Перерисовываем блюда
    renderAllDishes();
}

// ===== ФУНКЦИЯ ОБНОВЛЕНИЯ СОСТОЯНИЯ КНОПОК ФИЛЬТРОВ =====
function updateFilterButtons(category) {
    const section = document.querySelector(`[data-category="${category}"]`);
    if (!section) return;

    const filterButtons = section.querySelectorAll('.filter-btn');
    const activeFilter = activeFilters[category];

    filterButtons.forEach(btn => {
        const kind = btn.getAttribute('data-kind');

        if (kind === activeFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ ОБРАБОТЧИКОВ ФИЛЬТРОВ =====
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.closest('.filters-container').getAttribute('data-category');
            const filterKind = this.getAttribute('data-kind');
            setFilter(category, filterKind);
        });
    });
}

// ===== ЗАПУСК ЗАГРУЗКИ ДАННЫХ ПОСЛЕ ЗАГРУЗКИ DOM =====
document.addEventListener('DOMContentLoaded', loadDishes);