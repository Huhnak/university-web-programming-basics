const mockDishes = [
    // ===== СУПЫ =====
    {
        keyword: 'gaspacho',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        kind: 'veg',
        count: '350 г',
        image: 'images/soups/gazpacho.jpg'
    },
    {
        keyword: 'mushroom',
        name: 'Грибной суп-пюре',
        price: 185,
        category: 'soup',
        kind: 'veg',
        count: '330 г',
        image: 'images/soups/mushroom-soup.jpg'
    },
    {
        keyword: 'norwegian',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        kind: 'fish',
        count: '330 г',
        image: 'images/soups/norwegian-soup.jpg'
    },
    {
        keyword: 'ramen',
        name: 'Рамен',
        price: 375,
        category: 'soup',
        kind: 'meat',
        count: '425 г',
        image: 'images/soups/ramen.jpg'
    },
    {
        keyword: 'tom-yam',
        name: 'Том ям с креветками',
        price: 650,
        category: 'soup',
        kind: 'fish',
        count: '500 г',
        image: 'images/soups/tom-yam.jpg'
    },
    {
        keyword: 'chicken-soup',
        name: 'Куриный суп',
        price: 330,
        category: 'soup',
        kind: 'meat',
        count: '350 г',
        image: 'images/soups/chicken-soup.jpg'
    },

    // ===== ГЛАВНЫЕ БЛЮДА =====
    {
        keyword: 'potatoes',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main',
        kind: 'veg',
        count: '250 г',
        image: 'images/main/potatoes-mushrooms.jpg'
    },
    {
        keyword: 'lasagna',
        name: 'Лазанья',
        price: 385,
        category: 'main',
        kind: 'meat',
        count: '310 г',
        image: 'images/main/lasagna.jpg'
    },
    {
        keyword: 'cutlets',
        name: 'Котлеты из курицы с картофельным пюре',
        price: 225,
        category: 'main',
        kind: 'meat',
        count: '280 г',
        image: 'images/main/chicken-cutlets.jpg'
    },
    {
        keyword: 'fish-cutlet',
        name: 'Рыбная котлета с рисом и спаржей',
        price: 320,
        category: 'main',
        kind: 'fish',
        count: '270 г',
        image: 'images/main/fish-cutlet.jpg'
    },
    {
        keyword: 'pizza-margarita',
        name: 'Пицца Маргарита',
        price: 450,
        category: 'main',
        kind: 'veg',
        count: '470 г',
        image: 'images/main/pizza-margarita.jpg'
    },
    {
        keyword: 'pasta-shrimp',
        name: 'Паста с креветками',
        price: 340,
        category: 'main',
        kind: 'fish',
        count: '280 г',
        image: 'images/main/pasta-shrimp.jpg'
    },

    // ===== САЛАТЫ И СТАРТЕРЫ =====
    {
        keyword: 'korean-salad',
        name: 'Корейский салат с овощами и яйцом',
        price: 330,
        category: 'salad',
        kind: 'veg',
        count: '250 г',
        image: 'images/salads/korean-salad.jpg'
    },
    {
        keyword: 'caesar',
        name: 'Цезарь с цыпленком',
        price: 370,
        category: 'salad',
        kind: 'meat',
        count: '220 г',
        image: 'images/salads/caesar.jpg'
    },
    {
        keyword: 'caprese',
        name: 'Капрезе с моцареллой',
        price: 350,
        category: 'salad',
        kind: 'veg',
        count: '235 г',
        image: 'images/salads/caprese.jpg'
    },
    {
        keyword: 'tuna-salad',
        name: 'Салат с тунцом',
        price: 480,
        category: 'salad',
        kind: 'fish',
        count: '250 г',
        image: 'images/salads/tuna-salad.jpg'
    },
    {
        keyword: 'fries-caesar',
        name: 'Картофель фри с соусом Цезарь',
        price: 280,
        category: 'salad',
        kind: 'veg',
        count: '235 г',
        image: 'images/salads/fries-caesar.jpg'
    },
    {
        keyword: 'fries-ketchup',
        name: 'Картофель фри с кетчупом',
        price: 260,
        category: 'salad',
        kind: 'veg',
        count: '235 г',
        image: 'images/salads/fries-ketchup.jpg'
    },

    // ===== НАПИТКИ =====
    {
        keyword: 'orange-juice',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'drink',
        kind: 'cold',
        count: '300 мл',
        image: 'images/drinks/orange-juice.jpg'
    },
    {
        keyword: 'apple-juice',
        name: 'Яблочный сок',
        price: 90,
        category: 'drink',
        kind: 'cold',
        count: '300 мл',
        image: 'images/drinks/apple-juice.jpg'
    },
    {
        keyword: 'carrot-juice',
        name: 'Морковный сок',
        price: 110,
        category: 'drink',
        kind: 'cold',
        count: '300 мл',
        image: 'images/drinks/carrot-juice.jpg'
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 180,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'images/drinks/cappuccino.jpg'
    },
    {
        keyword: 'green-tea',
        name: 'Зеленый чай',
        price: 100,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'images/drinks/green-tea.jpg'
    },
    {
        keyword: 'black-tea',
        name: 'Черный чай',
        price: 90,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'images/drinks/black-tea.jpg'
    },

    // ===== ДЕСЕРТЫ =====
    {
        keyword: 'baklava',
        name: 'Пахлава',
        price: 220,
        category: 'dessert',
        kind: 'small',
        count: '300 гр',
        image: 'images/desserts/baklava.jpg'
    },
    {
        keyword: 'cheesecake',
        name: 'Чизкейк',
        price: 240,
        category: 'dessert',
        kind: 'medium',
        count: '125 гр',
        image: 'images/desserts/cheesecake.jpg'
    },
    {
        keyword: 'chocolate-cheesecake',
        name: 'Шоколадный чизкейк',
        price: 260,
        category: 'dessert',
        kind: 'medium',
        count: '125 гр',
        image: 'images/desserts/chocolate-cheesecake.jpg'
    },
    {
        keyword: 'chocolate-cake',
        name: 'Шоколадный торт',
        price: 270,
        category: 'dessert',
        kind: 'small',
        count: '140 гр',
        image: 'images/desserts/chocolate-cake.jpg'
    },
    {
        keyword: 'donuts-3',
        name: 'Пончики (3 штуки)',
        price: 410,
        category: 'dessert',
        kind: 'small',
        count: '350 гр',
        image: 'images/desserts/donuts-3.jpg'
    },
    {
        keyword: 'donuts-6',
        name: 'Пончики (6 штук)',
        price: 650,
        category: 'dessert',
        kind: 'large',
        count: '700 гр',
        image: 'images/desserts/donuts-6.jpg'
    }
];