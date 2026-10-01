// Конфигурация доступных комбинаций
const validCombos = [
    { soup: true, main: true, salad: true, drink: true },
    { soup: true, main: true, salad: false, drink: true },
    { soup: true, main: false, salad: true, drink: true },
    { soup: false, main: true, salad: true, drink: true },
    { soup: false, main: true, salad: false, drink: true }
];

// ===== ФУНКЦИЯ СОЗДАНИЯ УВЕДОМЛЕНИЯ =====
function showNotification(message) {
    // Проверяем, нет ли уже открытого уведомления
    const existingOverlay = document.querySelector('.notification-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';

    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = 'notification';

    const text = document.createElement('p');
    text.className = 'notification-text';
    text.textContent = message;

    const button = document.createElement('button');
    button.className = 'notification-btn';
    button.textContent = 'Окей';

    notification.appendChild(text);
    notification.appendChild(button);

    document.body.appendChild(overlay);
    document.body.appendChild(notification);

    const closeNotification = () => {
        notification.remove();
        overlay.remove();
    };

    button.addEventListener('click', closeNotification);
    overlay.addEventListener('click', closeNotification);
}

// ===== ФУНКЦИЯ ПРОВЕРКИ ЗАКАЗА =====
function validateOrder() {
    const order = currentOrder;

    // Проверяем, выбрано ли хоть что-то
    const hasItems = Object.values(order).some(item => item !== null);

    if (!hasItems) {
        showNotification('Ничего не выбрано. Выберите блюда для заказа');
        return false;
    }

    // Проверяем наличие напитка
    if (!order.drink) {
        showNotification('Выберите напиток');
        return false;
    }

    // Формируем объект комбинации
    const combo = {
        soup: order.soup !== null,
        main: order.main !== null,
        salad: order.salad !== null,
        drink: order.drink !== null
    };

    // Проверяем, соответствует ли заказ одной из допустимых комбинаций
    const isValidCombo = validCombos.some(valid => {
        return valid.soup === combo.soup &&
            valid.main === combo.main &&
            valid.salad === combo.salad &&
            valid.drink === combo.drink;
    });

    if (!isValidCombo) {
        if (combo.soup && !combo.main && !combo.salad) {
            showNotification('Выберите главное блюдо/салат/стартер');
            return false;
        }

        if (combo.salad && !combo.soup && !combo.main) {
            showNotification('Выберите суп или главное блюдо');
            return false;
        }

        if (!combo.soup && !combo.main && !combo.salad && combo.drink) {
            showNotification('Выберите главное блюдо');
            return false;
        }

        showNotification('Выберите главное блюдо/салат/стартер');
        return false;
    }

    return true;
}

// ===== ИНИЦИАЛИЗАЦИЯ ВАЛИДАЦИИ =====
function initValidation() {
    const form = document.querySelector('.order-form');

    if (form) {
        form.addEventListener('submit', function (event) {
            if (!validateOrder()) {
                event.preventDefault();
            }
        });
    }
}