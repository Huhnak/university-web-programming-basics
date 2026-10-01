// ===== LOCAL STORAGE MANAGER =====

const StorageManager = {
    STORAGE_KEY: 'foodConstructOrder',

    // Получить выбранные блюда из localStorage
    getOrder() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : {
            soup: null,
            main: null,
            salad: null,
            drink: null,
            dessert: null
        };
    },

    // Сохранить заказ в localStorage
    saveOrder(order) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(order));
    },

    // Добавить блюдо в заказ
    addDish(dish) {
        const order = this.getOrder();
        order[dish.category] = dish;
        this.saveOrder(order);
    },

    // Удалить блюдо из заказа
    removeDish(category) {
        const order = this.getOrder();
        order[category] = null;
        this.saveOrder(order);
    },

    // Очистить заказ
    clearOrder() {
        localStorage.removeItem(this.STORAGE_KEY);
    },

    // Получить блюда из заказа (полные данные)
    getOrderDishes(allDishes) {
        const order = this.getOrder();
        const orderDishes = {};

        Object.keys(order).forEach(category => {
            if (order[category]) {
                const dish = allDishes.find(d => d.keyword === order[category].keyword || d.keyword === order[category]);
                if (dish) {
                    orderDishes[category] = dish;
                }
            }
        });

        return orderDishes;
    },

    // Подсчитать общую стоимость
    calculateTotal(allDishes) {
        const orderDishes = this.getOrderDishes(allDishes);
        return Object.values(orderDishes).reduce((total, dish) => total + dish.price, 0);
    }
};