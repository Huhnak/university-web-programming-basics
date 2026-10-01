// Объект для хранения текущего заказа
let currentOrder = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

// Словарь категорий для отображения
const categoryNames = {
    soup: 'Суп',
    main: 'Главное блюдо',
    salad: 'Салат или стартер',
    drink: 'Напиток',
    dessert: 'Десерт'
};

// Словарь сообщений "не выбрано"
const notSelectedMessages = {
    soup: 'Блюдо не выбрано',
    main: 'Блюдо не выбрано',
    salad: 'Салат не выбран',
    drink: 'Напиток не выбран',
    dessert: 'Десерт не выбран'
};

// ===== ФУНКЦИЯ ПОИСКА БЛЮДА ПО KEYWORD =====
function findDishByKeyword(keyword) {
    if (typeof dishes === 'undefined' || !Array.isArray(dishes)) return null;
    return dishes.find(dish => dish.keyword === keyword);
}

// ===== ФУНКЦИЯ ОБНОВЛЕНИЯ ОТОБРАЖЕНИЯ ЗАКАЗА =====
function updateOrderDisplay() {
    const orderSection = document.querySelector('.order-summary');
    const totalBlock = document.querySelector('.order-total');

    if (!orderSection) return;

    // Проверяем, есть ли хоть один выбранный элемент
    const hasItems = Object.values(currentOrder).some(item => item !== null);

    if (!hasItems) {
        orderSection.style.display = 'none';
        return;
    }

    orderSection.style.display = 'block';

    // Обновляем каждую категорию
    Object.keys(currentOrder).forEach(category => {
        const categoryBlock = document.getElementById(`order-${category}`);
        if (!categoryBlock) return;

        const itemDiv = categoryBlock.querySelector('.order-item');

        if (currentOrder[category]) {
            categoryBlock.style.display = 'block';
            itemDiv.textContent = `${currentOrder[category].name} ${currentOrder[category].price}₽`;
        } else {
            categoryBlock.style.display = 'block';
            itemDiv.textContent = notSelectedMessages[category] || 'Блюдо не выбрано';
        }
    });

    // Считаем и отображаем общую стоимость
    const totalPrice = calculateTotalPrice();
    if (totalBlock) {
        totalBlock.style.display = 'block';
        const totalPriceEl = totalBlock.querySelector('.total-price');
        if (totalPriceEl) {
            totalPriceEl.textContent = `${totalPrice}₽`;
        }
    }
}

// ===== ФУНКЦИЯ ПОДСЧЕТА ОБЩЕЙ СТОИМОСТИ =====
function calculateTotalPrice() {
    let total = 0;

    Object.values(currentOrder).forEach(item => {
        if (item) {
            total += item.price;
        }
    });

    return total;
}

// ===== ФУНКЦИЯ ДОБАВЛЕНИЯ БЛЮДА В ЗАКАЗ =====
function addDishToOrder(keyword) {
    const dish = findDishByKeyword(keyword);

    if (!dish) return;

    // Добавляем блюдо в соответствующую категорию
    currentOrder[dish.category] = dish;

    // Сохраняем в localStorage если StorageManager доступен
    if (typeof StorageManager !== 'undefined' && typeof StorageManager.addDish === 'function') {
        StorageManager.addDish(dish);
    }

    // Обновляем отображение
    updateOrderDisplay();
}

// ===== ОБРАБОТЧИК КЛИКОВ ПО КАРТОЧКАМ БЛЮД =====
function handleDishClick(event) {
    const dishCard = event.target.closest('.dish-card');

    if (!dishCard) return;

    const keyword = dishCard.getAttribute('data-dish');
    addDishToOrder(keyword);
}

// ===== ИНИЦИАЛИЗАЦИЯ МЕНЕДЖЕРА ЗАКАЗОВ =====
function initOrderManager() {
    const menuContainer = document.querySelector('main');
    if (menuContainer) {
        menuContainer.addEventListener('click', handleDishClick);
    }

    const orderSection = document.querySelector('.order-summary');
    if (orderSection) {
        orderSection.style.display = 'none';
    }
}