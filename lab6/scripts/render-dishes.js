// Объект для хранения активных фильтров
const activeFilters = {};

// Функция сортировки блюд по алфавиту
function sortDishes(dishesArray) {
    return dishesArray.sort((a, b) => a.name.localeCompare(b.name));
}

// Функция создания HTML-элемента для блюда
function createDishCard(dish) {
    const dishCard = document.createElement('div');
    dishCard.className = 'dish-card';
    dishCard.setAttribute('data-dish', dish.keyword);

    dishCard.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price}₽</p>
        <p class="dish-name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button class="add-btn">Добавить</button>
    `;

    return dishCard;
}

// Функция фильтрации блюд
function filterDishes(dishesArray, category, filterKind) {
    if (!filterKind) {
        // Если фильтр не выбран, возвращаем все блюда категории
        return dishesArray.filter(dish => dish.category === category);
    }

    // Возвращаем только блюда с соответствующим kind
    return dishesArray.filter(dish =>
        dish.category === category && dish.kind === filterKind
    );
}

// Функция отображения блюд в секции
function renderDishesInSection(dishesArray, category, sectionId, currentFilter = null) {
    const section = document.getElementById(sectionId);
    const dishesGrid = section.querySelector('.dishes-grid');

    // Очищаем сетку
    dishesGrid.innerHTML = '';
    // Фильтруем и сортируем блюда
    const filteredDishes = sortDishes(
        filterDishes(dishesArray, category, currentFilter)
    );

    // Создаем и добавляем карточки
    filteredDishes.forEach(dish => {
        const dishCard = createDishCard(dish);
        dishesGrid.appendChild(dishCard);
    });
}

// Функция отображения всех блюд с учетом фильтров
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

// Функция установки фильтра
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

// Функция обновления состояния кнопок фильтров
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

// Инициализация обработчиков фильтров
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

// Запускаем отображение после загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    renderAllDishes();
    initFilters();
});