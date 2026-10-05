// ===== CHECKOUT PAGE LOGIC =====

const API_BASE_URL = 'https://edu.std-900.ist.mospolytech.ru';
// Для хостинга Московского Политеха:
// const API_BASE_URL = 'http://lab8-api.std-900.ist.mospolytech.ru';

// Получаем API ключ (нужно получить из СДО)
const API_KEY = '019c2353-d76f-4eaa-b9f6-ec8231dcddb5'; // Замените на ваш ключ

let orderDishes = {};
let allDishes = []; // Храним все блюда (с сервера или моковые)

// Загрузка данных о блюдах и отображение заказа
async function renderOrderPage() {
    try {
        // Загружаем блюда с сервера
        const response = await fetch(`${API_BASE_URL}/labs/api/dishes`);
        if (!response.ok) throw new Error('Ошибка загрузки данных');

        allDishes = await response.json();
        console.log('Данные загружены с сервера. Количество блюд:', allDishes.length);

        loadOrderData();

    } catch (error) {
        console.warn('Не удалось загрузить данные с сервера. Используются моковые данные.', error);

        // Проверяем, доступны ли моковые данные
        if (typeof mockDishes !== 'undefined' && Array.isArray(mockDishes)) {
            allDishes = mockDishes;
            console.log('Загружены моковые данные. Количество блюд:', allDishes.length);
            loadOrderData();
        } else {
            console.error('Моковые данные недоступны');
            showError('Не удалось загрузить данные. Убедитесь, что подключён файл mock-dishes.js');
        }
    }
}

// Загрузка данных заказа после получения блюд
function loadOrderData() {
    orderDishes = StorageManager.getOrderDishes(allDishes);
    displayOrderContents();
    updateOrderSummary();
}

// Отображение состава заказа
function displayOrderContents() {
    const container = document.getElementById('order-dishes-list');

    if (Object.keys(orderDishes).length === 0) {
        container.innerHTML = `
            <p class="no-order">
                Ничего не выбрано. Чтобы добавить блюда в заказ, 
                <a href="lunch.html">перейдите на страницу Собрать ланч</a>.
            </p>
        `;
        return;
    }

    container.innerHTML = '';

    Object.values(orderDishes).forEach(dish => {
        const dishCard = createOrderDishCard(dish);
        container.appendChild(dishCard);
    });
}

// Создание карточки блюда для страницы заказа
function createOrderDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);

    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price}₽</p>
        <p class="dish-name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button class="remove-btn" data-category="${dish.category}">Удалить</button>
    `;

    // Обработчик удаления
    const removeBtn = card.querySelector('.remove-btn');
    removeBtn.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        removeDishFromOrder(category);
    });

    return card;
}

// Удаление блюда из заказа
function removeDishFromOrder(category) {
    StorageManager.removeDish(category);
    delete orderDishes[category];

    displayOrderContents();
    updateOrderSummary();

    // Обновляем панель на lunch.html если она есть
    if (window.opener) {
        window.opener.postMessage({ type: 'orderUpdated' }, '*');
    }
}

// Обновление сводки заказа
function updateOrderSummary() {
    const categories = {
        soup: 'Суп',
        main: 'Главное блюдо',
        salad: 'Салат или стартер',
        drink: 'Напиток',
        dessert: 'Десерт'
    };

    let total = 0;

    Object.keys(categories).forEach(category => {
        const item = document.getElementById(`summary-${category}`);
        if (!item) return;

        const valueEl = item.querySelector('.summary-value');
        const priceEl = item.querySelector('.summary-price');

        if (orderDishes[category]) {
            const dish = orderDishes[category];
            valueEl.textContent = dish.name;
            priceEl.textContent = `${dish.price}₽`;
            total += dish.price;
        } else {
            const notSelectedText = category === 'main' ? 'Не выбрано' : 'Не выбран';
            valueEl.textContent = notSelectedText;
            priceEl.textContent = '';
        }
    });

    document.getElementById('order-total-price').textContent = `${total}₽`;
}

// Показ ошибки
function showError(message) {
    alert(message); // Можно заменить на кастомное модальное окно
}

// Отправка заказа на сервер
async function submitOrder(formData) {
    const order = StorageManager.getOrder();

    // Проверяем валидность комбо
    if (!isValidComboForSubmit(order)) {
        showError('Пожалуйста, выберите корректный набор блюд');
        return;
    }

    // Формируем данные для отправки
    const orderData = {
        full_name: formData.full_name,
        email: formData.email,
        subscribe: formData.subscribe ? 1 : 0,
        phone: formData.phone,
        delivery_address: formData.delivery_address,
        delivery_type: formData.delivery_type,
        delivery_time: formData.delivery_time || null,
        comment: formData.comment || '',
        soup_id: orderDishes.soup ? getDishId(orderDishes.soup.keyword) : null,
        main_course_id: orderDishes.main ? getDishId(orderDishes.main.keyword) : null,
        salad_id: orderDishes.salad ? getDishId(orderDishes.salad.keyword) : null,
        drink_id: orderDishes.drink ? getDishId(orderDishes.drink.keyword) : null,
        dessert_id: orderDishes.dessert ? getDishId(orderDishes.dessert.keyword) : null
    };

    try {
        const response = await fetch(`${API_BASE_URL}/labs/api/orders?api_key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Ошибка при оформлении заказа');
        }

        // Успешно! Очищаем localStorage
        StorageManager.clearOrder();

        // Показываем уведомление об успехе
        alert('Заказ успешно оформлен!');

        // Перенаправляем на главную или lunch страницу
        window.location.href = 'lunch.html';

    } catch (error) {
        console.error('Ошибка отправки заказа:', error);
        showError(error.message);
    }
}

// Получение ID блюда по keyword
function getDishId(keyword) {
    // Ищем блюдо в загруженных данных (с сервера или моковых)
    const dish = allDishes.find(d => d.keyword === keyword);
    return dish ? dish.id : null;
}

// Проверка валидности комбо для отправки
function isValidComboForSubmit(order) {
    return isValidCombo(order);
}

// Инициализация
document.addEventListener('DOMContentLoaded', function () {
    renderOrderPage();

    // Управление полем времени
    const radioNow = document.getElementById('delivery_now');
    const radioByTime = document.getElementById('delivery_by_time');
    const timeInput = document.getElementById('delivery_time');

    radioNow.addEventListener('change', () => {
        timeInput.disabled = true;
        timeInput.required = false;
    });

    radioByTime.addEventListener('change', () => {
        timeInput.disabled = false;
        timeInput.required = true;
    });

    // Обработка отправки формы
    const form = document.getElementById('order-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            full_name: document.getElementById('full_name').value,
            email: document.getElementById('email').value,
            subscribe: document.getElementById('subscribe').checked,
            phone: document.getElementById('phone').value,
            delivery_address: document.getElementById('delivery_address').value,
            delivery_type: document.querySelector('input[name="delivery_type"]:checked').value,
            delivery_time: timeInput.value,
            comment: document.getElementById('comment').value
        };

        submitOrder(formData);
    });

    // Обработка сброса
    form.addEventListener('reset', function () {
        setTimeout(() => {
            timeInput.disabled = true;
            timeInput.required = false;
        }, 10);
    });
});