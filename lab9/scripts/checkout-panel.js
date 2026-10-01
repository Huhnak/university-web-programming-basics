// ===== CHECKOUT PANEL MANAGER =====


function isValidCombo(order) {
    const combo = {
        soup: order.soup !== null,
        main: order.main !== null,
        salad: order.salad !== null,
        drink: order.drink !== null
    };

    return validCombos.some(valid =>
        valid.soup === combo.soup &&
        valid.main === combo.main &&
        valid.salad === combo.salad &&
        valid.drink === combo.drink
    );
}

function updateCheckoutPanel() {
    const panel = document.getElementById('checkout-panel');
    const totalElement = document.getElementById('panel-total');
    const link = document.getElementById('checkout-link');

    if (!panel || !totalElement || !link) return;

    // Получаем заказ из StorageManager или из currentOrder
    let order;
    if (typeof StorageManager !== 'undefined' && typeof StorageManager.getOrder === 'function') {
        order = StorageManager.getOrder();
    } else {
        order = currentOrder || { soup: null, main: null, salad: null, drink: null, dessert: null };
    }

    // Считаем общую стоимость
    let total = 0;
    if (typeof StorageManager !== 'undefined' && typeof StorageManager.calculateTotal === 'function' && typeof dishes !== 'undefined') {
        total = StorageManager.calculateTotal(dishes);
    } else {
        // Считаем вручную
        Object.values(order).forEach(item => {
            if (item && item.price) {
                total += item.price;
            }
        });
    }

    // Проверяем, есть ли выбранные блюда
    const hasItems = Object.values(order).some(item => item !== null);

    if (!hasItems) {
        panel.style.display = 'none';
        return;
    }

    panel.style.display = 'block';
    totalElement.textContent = total;

    // Проверяем валидность комбо
    if (isValidCombo(order)) {
        link.classList.remove('disabled');
    } else {
        link.classList.add('disabled');
    }

    // Обновляем выделение карточек
    highlightSelectedDishes(order);
}

function highlightSelectedDishes(order) {
    // Убираем все выделения
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Выделяем выбранные
    Object.keys(order).forEach(category => {
        if (order[category] && order[category].keyword) {
            const card = document.querySelector(`[data-dish="${order[category].keyword}"]`);
            if (card) {
                card.classList.add('selected');
            }
        }
    });
}

// Модифицируем функцию добавления блюда
function addDishToOrderWithSave(keyword) {
    // Ищем блюдо в массиве dishes
    const dish = dishes.find(d => d.keyword === keyword);
    if (!dish) return;

    // Сохраняем через StorageManager если доступен
    if (typeof StorageManager !== 'undefined' && typeof StorageManager.addDish === 'function') {
        StorageManager.addDish(dish);
    }

    // Обновляем currentOrder
    if (typeof currentOrder !== 'undefined') {
        currentOrder[dish.category] = dish;
    }

    updateCheckoutPanel();

    // Если мы на странице order.html, обновляем отображение
    if (window.location.pathname.includes('order.html')) {
        if (typeof renderOrderPage === 'function') {
            renderOrderPage();
        }
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function () {
    // Ждем немного чтобы dishes успел загрузиться
    setTimeout(function () {
        updateCheckoutPanel();
    }, 100);

    // Добавляем обработчик на кнопки "Добавить"
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-btn')) {
            const card = e.target.closest('.dish-card');
            if (card) {
                const keyword = card.getAttribute('data-dish');
                addDishToOrderWithSave(keyword);
            }
        }
    });
});