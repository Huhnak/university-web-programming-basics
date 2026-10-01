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

// Функция отображения блюд в секции
function renderDishesInSection(dishesArray, category, sectionId) {
    const section = document.getElementById(sectionId);
    const dishesGrid = section.querySelector('.dishes-grid');
    
    // Очищаем сетку
    dishesGrid.innerHTML = '';
    
    // Фильтруем блюда по категории и сортируем
    const categoryDishes = sortDishes(
        dishesArray.filter(dish => dish.category === category)
    );
    
    // Создаем и добавляем карточки
    categoryDishes.forEach(dish => {
        const dishCard = createDishCard(dish);
        dishesGrid.appendChild(dishCard);
    });
}

// Основная функция отображения всех блюд
function renderAllDishes() {
    renderDishesInSection(dishes, 'soup', 'soups-section');
    renderDishesInSection(dishes, 'main', 'main-section');
    renderDishesInSection(dishes, 'drink', 'drinks-section');
}

// Запускаем отображение после загрузки DOM
document.addEventListener('DOMContentLoaded', renderAllDishes);