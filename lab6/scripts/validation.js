// Конфигурация доступных комбинаций
const validCombos = [
    { soup: true, main: true, salad: true, drink: true },   // Комбо 1
    { soup: true, main: true, salad: false, drink: true },  // Комбо 2
    { soup: true, main: false, salad: true, drink: true },  // Комбо 3
    { soup: false, main: true, salad: true, drink: true },  // Комбо 4
    { soup: false, main: true, salad: false, drink: true }  // Комбо 5
];

// Функция создания уведомления
function showNotification(message) {
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

    // Добавляем кнопку в уведомление
    notification.appendChild(text);
    notification.appendChild(button);

    // Добавляем уведомление и оверлей на страницу
    document.body.appendChild(overlay);
    document.body.appendChild(notification);

    // Обработчик закрытия
    const closeNotification = () => {
        notification.remove();
        overlay.remove();
    };

    button.addEventListener('click', closeNotification);
}

// Функция проверки заказа
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

    // Проверяем комбинации
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
        // Определяем, чего не хватает
        if (combo.salad && !combo.soup && !combo.main) {
            showNotification('Выберите суп или главное блюдо');
            return false;
        }

        if (combo.soup && !combo.main && !combo.salad) {
            showNotification('Выберите главное блюдо/салат/стартер');
            return false;
        }

        if (!combo.soup && !combo.main && combo.drink) {
            showNotification('Выберите главное блюдо');
            return false;
        }

        // Общая ошибка для других случаев
        if (combo.soup && !combo.main && !combo.salad) {
            showNotification('Выберите главное блюдо/салат/стартер');
        } else if (combo.salad && !combo.soup && !combo.main) {
            showNotification('Выберите суп или главное блюдо');
        } else {
            showNotification('Выберите главное блюдо/салат/стартер');
        }

        return false;
    }

    // Если все валидно, позволяем отправить форму
    return true;
}

// Модифицируем обработчик отправки формы
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.order-form');

    form.addEventListener('submit', function (event) {
        // Проверяем заказ
        if (!validateOrder()) {
            event.preventDefault();
        }
    });
});