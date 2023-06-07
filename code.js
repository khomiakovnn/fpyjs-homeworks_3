class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable (setAvailable) {
        this.available = setAvailable;
    }
}

class GoodsList {
    constructor (filter, sortPrice, sortDir) {
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
        this.#goods = [];
    }
    get List () {
        // Вывести список товаров
    }
    add () {
        // добавть экземпляр товара
    }
    remove (id) {
        // удалить экземпляр товара
    }
}

class BasketGood extends Good {
    constructor (id, name, description, sizes, price, available, amount) {
        super (id, name, description, sizes, price, available)
        this.amount = amount;
    }
}

class Basket {
    constructor (goods) {
        this.goods = goods;
    }
    get totalAmount () {

    }
    get totalSum () {

    }
    add (good, amount) {

    }
    remove (good, amount) {

    }
    clear () {

    }
    removeUnavailable () {

    }
}

        