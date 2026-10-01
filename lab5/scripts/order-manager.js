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

// Функция поиска блюда по keyword
function findDishByKeyword(keyword) {
    return dishes.find(dish => dish.keyword === keyword);
}

// Функция обновления отображения заказа
function updateOrderDisplay() {
    const orderSection = document.querySelector('.order-summary');
    const totalBlock = document.querySelector('.order-total');
    
    // Проверяем, есть ли хоть один выбранный элемент
    const hasItems = Object.values(currentOrder).some(item => item !== null);
    
    if (!hasItems) {
        orderSection.style.display = 'none';
        return;
    }
    
    orderSection.style.display = 'block';
    
    // Очищаем и обновляем каждую категорию
    Object.keys(currentOrder).forEach(category => {
        const categoryBlock = document.getElementById(`order-${category}`);
        const itemDiv = categoryBlock.querySelector('.order-item');
        
        if (currentOrder[category]) {
            categoryBlock.style.display = 'block';
            itemDiv.textContent = `${currentOrder[category].name} ${currentOrder[category].price}₽`;
        } else {
            categoryBlock.style.display = 'block';
            
            // Формируем текст "не выбрано" в зависимости от категории
            let notSelectedText = 'Блюдо не выбрано';
            if (category === 'drink') {
                notSelectedText = 'Напиток не выбран';
            } else if (category === 'salad') {
                notSelectedText = 'Салат не выбран';
            } else if (category === 'dessert') {
                notSelectedText = 'Десерт не выбран';
            }
            
            itemDiv.textContent = notSelectedText;
        }
    });
    
    // Считаем и отображаем общую стоимость
    const totalPrice = calculateTotalPrice();
    totalBlock.style.display = 'block';
    totalBlock.querySelector('.total-price').textContent = `${totalPrice}₽`;
}

// Функция подсчета общей стоимости
function calculateTotalPrice() {
    let total = 0;
    
    Object.values(currentOrder).forEach(item => {
        if (item) {
            total += item.price;
        }
    });
    
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
    const orderSection = document.querySelector('.order-summary');
    if (orderSection) {
        orderSection.style.display = 'none';
    }
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', initOrderManager);