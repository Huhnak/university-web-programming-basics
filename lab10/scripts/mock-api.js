// ===== MOCK API SERVICE =====

const MockAPI = {
    API_KEY: 'mock-api-key',
    BASE_URL: 'mock://api',

    // Хранилище заказов (имитация базы данных)
    orders: [],

    // Хранилище блюд (будет заполнено из mock-dishes.js)
    dishes: [],

    // Инициализация моковых данных
    init() {
        if (typeof mockDishes !== 'undefined') {
            this.dishes = mockDishes.map((dish, index) => ({
                ...dish,
                id: index + 1
            }));
        }

        // Загружаем сохранённые заказы из localStorage
        const saved = localStorage.getItem('submitted_orders');
        if (saved) {
            try {
                this.orders = JSON.parse(saved);
            } catch {
                this.orders = [];
            }
        }

        // Если заказов нет — создаём тестовые
        if (this.orders.length === 0) {
            this.createMockOrders();
            this._save();
        }
    },

    _save() {
        localStorage.setItem('submitted_orders', JSON.stringify(this.orders));
    },

    // Создание тестовых заказов
    createMockOrders() {
        const now = new Date();

        this.orders = [
            {
                id: 1,
                full_name: 'Иванов Иван Иванович',
                email: 'ivanov@example.com',
                subscribe: 1,
                phone: '+7 (999) 123-45-67',
                delivery_address: 'г. Москва, ул. Ленина, д. 10, кв. 5',
                delivery_type: 'now',
                delivery_time: null,
                comment: 'Без лука',
                soup_id: 1,
                main_course_id: 7,
                salad_id: null,
                drink_id: 16,
                dessert_id: 22,
                created_at: new Date(now.getTime() - 86400000 * 2).toISOString(), // 2 дня назад
                updated_at: new Date(now.getTime() - 86400000 * 2).toISOString(),
                student_id: 1
            },
            {
                id: 2,
                full_name: 'Петрова Мария Сергеевна',
                email: 'petrova@example.com',
                subscribe: 0,
                phone: '+7 (999) 765-43-21',
                delivery_address: 'г. Москва, prosp. Mira, d. 25',
                delivery_type: 'by_time',
                delivery_time: '13:00',
                comment: '',
                soup_id: 3,
                main_course_id: 8,
                salad_id: 13,
                drink_id: 19,
                dessert_id: null,
                created_at: new Date(now.getTime() - 86400000 * 5).toISOString(), // 5 дней назад
                updated_at: new Date(now.getTime() - 86400000 * 3).toISOString(),
                student_id: 1
            }
        ];
    },

    // ===== API METHODS =====

    // Получить все блюда
    async getDishes() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.dishes);
            }, 300); // Имитация задержки сети
        });
    },

    // Получить блюдо по ID
    async getDishById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const dish = this.dishes.find(d => d.id === parseInt(id));
                if (dish) {
                    resolve(dish);
                } else {
                    reject({ error: 'Блюдо не найдено' });
                }
            }, 200);
        });
    },

    // Получить все заказы
    async getOrders() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Сортируем по убыванию даты
                const sorted = [...this.orders].sort((a, b) =>
                    new Date(b.created_at) - new Date(a.created_at)
                );
                resolve(sorted);
            }, 300);
        });
    },

    // Получить заказ по ID
    async getOrderByid(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const order = this.orders.find(o => o.id === parseInt(id));
                if (order) {
                    resolve(order);
                } else {
                    reject({ error: 'Заказ не найден' });
                }
            }, 200);
        });
    },

    // Создать новый заказ
    async createOrder(orderData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const now = new Date().toISOString();
                const newOrder = {
                    id: this.orders.length > 0 ? Math.max(...this.orders.map(o => o.id)) + 1 : 1,
                    ...orderData,
                    created_at: now,
                    updated_at: now,
                    student_id: 1
                };
                this.orders.push(newOrder);
                this._save();
                resolve(newOrder);
            }, 400);
        });
    },

    async updateOrder(id, updateData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.orders.findIndex(o => o.id === parseInt(id));
                if (index !== -1) {
                    this.orders[index] = {
                        ...this.orders[index],
                        ...updateData,
                        updated_at: new Date().toISOString()
                    };
                    this._save();
                    resolve(this.orders[index]);
                } else {
                    reject({ error: 'Заказ не найден' });
                }
            }, 300);
        });
    },

    async deleteOrder(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.orders.findIndex(o => o.id === parseInt(id));
                if (index !== -1) {
                    const deleted = this.orders.splice(index, 1)[0];
                    this._save();
                    resolve(deleted);
                } else {
                    reject({ error: 'Заказ не найден' });
                }
            }, 300);
        });
    }
};

// Инициализируем моковый API при загрузке
document.addEventListener('DOMContentLoaded', () => {
    MockAPI.init();
});