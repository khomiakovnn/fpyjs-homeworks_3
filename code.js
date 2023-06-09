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
    }
    #goods = []
    get list () {
        return this.#goods
            .filter(good => good.available === true) // фильтр по наличию
            .filter(good => this.filter.test(good.name)) // фильтр по наименованию
            .sort((a, b) => (a.price - b.price)*(this.sortDir-0.5)*2) // сортировка по цене со сменой направления
    }
    add (good) {
        this.#goods.push(good)
    }
    remove (id) {
        this.#goods.splice(id-1,1)
    }
}

// Создание 10 объектов good
const goodsList = new GoodsList(/Name/, true, true,)

for (let index = 1; index < 11; index++) {
    const good = new Good (
        index,
        'GoodName'+index,
        'GoodDescription'+index,
        ['s', 'm', 'l',],
        Math.round(Math.random()*100), // рандомная цена
        );
    good.setAvailable(Boolean(Math.round(Math.random()))) // рандомное наличие товара
    goodsList.add(good);
}

class BasketGood extends Good {
    constructor (Good, amount) {
        super (Good.id, Good.name, Good.description, Good.sizes, Good.price, Good.available)
        this.amount = amount;
    }
}

class Basket {
    constructor () {
        this.goods = [];
    }
    get totalAmount () {
        return this.goods.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0,)
    }
    get totalSum () {
        return this.goods.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.amount), 0,)
    }
    data () { // Тест геттеров
        console.log("Total amount: ", this.totalAmount)
        console.log("Total sum: ", this.totalSum)
    }
    add (good, amount) {
        let goodId = this.findId(good)
        if (goodId != -1) {
            this.goods[goodId].amount += amount
        } else {
            const element = new BasketGood (good, amount);
            this.goods.push(element);  
        }
    }
    remove (good, amount) {
        let goodId = this.findId(good)
        if (this.goods[goodId].amount > amount) {
            this.goods[goodId].amount -= amount
        } else {
            this.goods.splice(goodId,1)
        }
    }
    clear () {
        basket.goods.splice(0, basket.goods.length)
    }
    removeUnavailable () {
        let idDelete = []
        for (let index = 0; index < basket.goods.length; index++) {
            if (basket.goods[index].available == false) {
                idDelete.push(index)
            };
        }
        for (let index = 0; index < idDelete.length; index++) {
            this.goods.splice(idDelete[index],1);   
            }
    }
    findId (good) {
        let goodId = -1
        for (let index = 0; index < this.goods.length; index++) {
            if (good.id === this.goods[index].id) {
                goodId = index;
                break;
            }   
        }
        return goodId
    }
}

// TEST Корзины (все доступные объекты goods)
const basket = new Basket()
for (let index = 0; index < goodsList.list.length; index++) {
    const element = new BasketGood (goodsList.list[index], index+1);
    basket.goods.push(element);  
}
