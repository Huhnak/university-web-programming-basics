// ===== ORDERS PAGE LOGIC =====

let currentOrders = [];
let orderToDelete = null;

// Загрузка и отображение заказов
async function loadOrders() {
    const container = document.getElementById('orders-list');

    try {
        currentOrders = await MockAPI.getOrders();
        displayOrders();
    } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
        container.innerHTML = '<p class="error">Не удалось загрузить заказы. Попробуйте позже.</p>';
    }
}

// Отображение списка заказов
function displayOrders() {
    const container = document.getElementById('orders-list');

    if (currentOrders.length === 0) {
        container.innerHTML = '<p class="no-orders">У вас пока нет заказов.</p>';
        return;
    }

    container.innerHTML = '';

    currentOrders.forEach((order, index) => {
        const orderCard = createOrderCard(order, index + 1);
        container.appendChild(orderCard);
    });
}

// Создание карточки заказа
function createOrderCard(order, number) {
    const card = document.createElement('div');
    card.className = 'order-card';

    const date = new Date(order.created_at);
    const formattedDate = date.toLocaleDateString('ru-RU');

    const dishes = getOrderDishesNames(order);
    const total = calculateOrderTotal(order);
    const deliveryInfo = getDeliveryInfo(order);

    card.innerHTML = `
        <div class="order-header">
            <h3>Заказ №${number} от ${formattedDate}</h3>
        </div>
        <div class="order-body">
            <div class="order-dishes">
                <strong>Состав заказа:</strong> ${dishes}
            </div>
            <div class="order-total">
                <strong>Стоимость:</strong> ${total}₽
            </div>
            <div class="order-delivery">
                <strong>Доставка:</strong> ${deliveryInfo}
            </div>
        </div>
        <div class="order-actions">
            <button class="btn btn-small btn-info" onclick="viewOrder(${order.id})" title="Подробнее">
                📋 Подробнее
            </button>
            <button class="btn btn-small btn-warning" onclick="editOrder(${order.id})" title="Редактировать">
                ✏️ Редактирование
            </button>
            <button class="btn btn-small btn-danger" onclick="confirmDelete(${order.id})" title="Удалить">
                🗑️ Удалить
            </button>
        </div>
    `;

    return card;
}

// Получение названий блюд из заказа
function getOrderDishesNames(order) {
    const dishes = [];

    if (order.soup_id) {
        const dish = MockAPI.dishes.find(d => d.id === order.soup_id);
        if (dish) dishes.push(dish.name);
    }
    if (order.main_course_id) {
        const dish = MockAPI.dishes.find(d => d.id === order.main_course_id);
        if (dish) dishes.push(dish.name);
    }
    if (order.salad_id) {
        const dish = MockAPI.dishes.find(d => d.id === order.salad_id);
        if (dish) dishes.push(dish.name);
    }
    if (order.drink_id) {
        const dish = MockAPI.dishes.find(d => d.id === order.drink_id);
        if (dish) dishes.push(dish.name);
    }
    if (order.dessert_id) {
        const dish = MockAPI.dishes.find(d => d.id === order.dessert_id);
        if (dish) dishes.push(dish.name);
    }

    return dishes.join(', ') || 'Нет данных';
}

// Подсчет стоимости заказа
function calculateOrderTotal(order) {
    let total = 0;

    const dishIds = [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id];

    dishIds.forEach(id => {
        if (id) {
            const dish = MockAPI.dishes.find(d => d.id === id);
            if (dish) total += dish.price;
        }
    });

    return total;
}

// Информация о доставке
function getDeliveryInfo(order) {
    if (order.delivery_type === 'now') {
        return 'Как можно скорее (с 7:00 до 23:00)';
    } else {
        return `К ${order.delivery_time}`;
    }
}

// Просмотр заказа
async function viewOrder(orderId) {
    try {
        const order = await MockAPI.getOrderByid(orderId);
        const modal = document.getElementById('view-modal');
        const details = document.getElementById('view-order-details');

        const date = new Date(order.created_at);
        const formattedDate = date.toLocaleString('ru-RU');
        const dishes = getOrderDishesNames(order);
        const total = calculateOrderTotal(order);
        const deliveryInfo = getDeliveryInfo(order);

        details.innerHTML = `
            <div class="order-detail-row">
                <span class="label">Номер заказа:</span>
                <span class="value">${order.id}</span>
            </div>
            <div class="order-detail-row">
                <span class="label">Дата оформления:</span>
                <span class="value">${formattedDate}</span>
            </div>
            <div class="order-detail-row">
                <span class="label">Имя:</span>
                <span class="value">${order.full_name}</span>
            </div>
            <div class="order-detail-row">
                <span class="label">Email:</span>
                <span class="value">${order.email}</span>
            </div>
            <div class="order-detail-row">
                <span class="label">Телефон:</span>
                <span class="value">${order.phone}</span>
            </div>
            <div class="order-detail-row">
                <span class="label">Адрес доставки:</span>
                <span class="value">${order.delivery_address}</span>
            </div>
            <div class="order-detail-row">
                <span class="label">Состав заказа:</span>
                <span class="value">${dishes}</span>
            </div>
            <div class="order-detail-row">
                <span class="label">Стоимость:</span>
                <span class="value"><strong>${total}₽</strong></span>
            </div>
            <div class="order-detail-row">
                <span class="label">Доставка:</span>
                <span class="value">${deliveryInfo}</span>
            </div>
            ${order.comment ? `
            <div class="order-detail-row">
                <span class="label">Комментарий:</span>
                <span class="value">${order.comment}</span>
            </div>
            ` : ''}
        `;

        openModal(modal);
    } catch (error) {
        showError('Не удалось загрузить информацию о заказе');
    }
}

// Редактирование заказа
async function editOrder(orderId) {
    try {
        const order = await MockAPI.getOrderByid(orderId);
        const modal = document.getElementById('edit-modal');
        const form = document.getElementById('edit-order-form');

        // Заполняем форму данными заказа
        document.getElementById('edit-order-id').value = order.id;
        document.getElementById('edit-full-name').value = order.full_name;
        document.getElementById('edit-email').value = order.email;
        document.getElementById('edit-phone').value = order.phone;
        document.getElementById('edit-address').value = order.delivery_address;
        document.getElementById('edit-comment').value = order.comment || '';

        // Устанавливаем radio buttons
        if (order.delivery_type === 'now') {
            document.getElementById('edit-delivery-now').checked = true;
            document.getElementById('edit-delivery-time-value').disabled = true;
        } else {
            document.getElementById('edit-delivery-time').checked = true;
            document.getElementById('edit-delivery-time-value').disabled = false;
            document.getElementById('edit-delivery-time-value').value = order.delivery_time || '';
        }

        openModal(modal);

    } catch (error) {
        showError('Не удалось загрузить данные заказа');
    }
}

// Подтверждение удаления
function confirmDelete(orderId) {
    orderToDelete = orderId;
    document.getElementById('delete-order-id').textContent = orderId;
    const modal = document.getElementById('delete-modal');
    openModal(modal);
}

// Удаление заказа
async function deleteOrder(orderId) {
    try {
        await MockAPI.deleteOrder(orderId);
        await loadOrders(); // Перезагружаем список
        closeModal(document.getElementById('delete-modal'));
        showSuccess('Заказ успешно удален');
    } catch (error) {
        showError('Не удалось удалить заказ');
    }
}

// Сохранение изменений
document.getElementById('edit-order-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const orderId = document.getElementById('edit-order-id').value;
    const formData = {
        full_name: document.getElementById('edit-full-name').value,
        email: document.getElementById('edit-email').value,
        phone: document.getElementById('edit-phone').value,
        delivery_address: document.getElementById('edit-address').value,
        delivery_type: document.querySelector('input[name="delivery_type"]:checked').value,
        delivery_time: document.getElementById('edit-delivery-time-value').value || null,
        comment: document.getElementById('edit-comment').value
    };

    try {
        await MockAPI.updateOrder(orderId, formData);
        await loadOrders();
        closeModal(document.getElementById('edit-modal'));
        showSuccess('Заказ успешно обновлен');
    } catch (error) {
        showError('Не удалось обновить заказ');
    }
});

// Управление полем времени в форме редактирования
document.getElementById('edit-delivery-now').addEventListener('change', function () {
    document.getElementById('edit-delivery-time-value').disabled = true;
});

document.getElementById('edit-delivery-time').addEventListener('change', function () {
    document.getElementById('edit-delivery-time-value').disabled = false;
});

// ===== MODAL FUNCTIONS =====

function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Закрытие по крестику
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal');
        closeModal(document.getElementById(modalId));
    });
});

// Закрытие по кнопкам
document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal-close');
        closeModal(document.getElementById(modalId));
    });
});

// Закрытие по клику вне модального окна
window.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Подтверждение удаления
document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (orderToDelete) {
        deleteOrder(orderToDelete);
        orderToDelete = null;
    }
});

// ===== NOTIFICATIONS =====

function showError(message) {
    alert('Ошибка: ' + message);
}

function showSuccess(message) {
    alert(message);
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', loadOrders);