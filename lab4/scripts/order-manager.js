// Объект для хранения текущего заказа
let currentOrder = {
    soup: null,
    main: null,
    drink: null
};

// Функция поиска блюда по keyword
function findDishByKeyword(keyword) {
    return dishes.find(dish => dish.keyword === keyword);
}

// Функция обновления отображения заказа
function updateOrderDisplay() {
    const orderSection = document.querySelector('.order-summary');
    const soupBlock = document.querySelector('.order-soup');
    const mainBlock = document.querySelector('.order-main');
    const drinkBlock = document.querySelector('.order-drink');
    const totalBlock = document.querySelector('.order-total');
    
    // Проверяем, есть ли хоть один выбранный элемент
    const hasItems = currentOrder.soup || currentOrder.main || currentOrder.drink;
    
    const orderEmptiness = document.querySelector('#order-empty');
    if (!hasItems) {
        
        orderEmptiness.style.display = 'block';
        return;
    }
    
    orderEmptiness.style.display = 'none';
    
    // Отображаем суп
    if (currentOrder.soup) {
        soupBlock.style.display = 'block';
        soupBlock.innerHTML = `
            <strong>Суп</strong><br>
            ${currentOrder.soup.name} ${currentOrder.soup.price}₽
        `;
    } else {
        soupBlock.style.display = 'block';
        soupBlock.innerHTML = `
            <strong>Суп</strong><br>
            Блюдо не выбрано
        `;
    }
    
    // Отображаем главное блюдо
    if (currentOrder.main) {
        mainBlock.style.display = 'block';
        mainBlock.innerHTML = `
            <strong>Главное блюдо</strong><br>
            ${currentOrder.main.name} ${currentOrder.main.price}₽
        `;
    } else {
        mainBlock.style.display = 'block';
        mainBlock.innerHTML = `
            <strong>Главное блюдо</strong><br>
            Блюдо не выбрано
        `;
    }
    
    // Отображаем напиток
    if (currentOrder.drink) {
        drinkBlock.style.display = 'block';
        drinkBlock.innerHTML = `
            <strong>Напиток</strong><br>
            ${currentOrder.drink.name} ${currentOrder.drink.price}₽
        `;
    } else {
        drinkBlock.style.display = 'block';
        drinkBlock.innerHTML = `
            <strong>Напиток</strong><br>
            Напиток не выбран
        `;
    }
    
    // Считаем и отображаем общую стоимость
    const totalPrice = calculateTotalPrice();
    totalBlock.style.display = 'block';
    totalBlock.innerHTML = `
        <strong>Стоимость заказа</strong><br>
        ${totalPrice}₽
    `;
}

// Функция подсчета общей стоимости
function calculateTotalPrice() {
    let total = 0;
    
    if (currentOrder.soup) {
        total += currentOrder.soup.price;
    }
    if (currentOrder.main) {
        total += currentOrder.main.price;
    }
    if (currentOrder.drink) {
        total += currentOrder.drink.price;
    }
    
    return total;
}

// Функция добавления блюда в заказ
function addDishToOrder(keyword) {
    const dish = findDishByKeyword(keyword);
    
    if (!dish) return;
    
    // Добавляем блюдо в соответствующую категорию
    currentOrder[dish.category] = dish;
    
    // Обновляем отображение
    updateOrderDisplay();
}

// Обработчик кликов по карточкам блюд
function handleDishClick(event) {
    // Проверяем, был ли клик по карточке или кнопке
    const dishCard = event.target.closest('.dish-card');
    
    if (!dishCard) return;
    
    const keyword = dishCard.getAttribute('data-dish');
    addDishToOrder(keyword);
}

// Инициализация обработчиков событий
function initOrderManager() {
    // Добавляем обработчик на весь контейнер с меню (делегирование событий)
    const menuContainer = document.querySelector('main');
    menuContainer.addEventListener('click', handleDishClick);
    
    // Скрываем секцию заказа при загрузке
    const orderEmptiness = document.querySelector('.order-empty');
    if (orderEmptiness) {
        orderEmptiness.style.display = 'block';
    }
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', initOrderManager);