"use strict";

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

class GoodsItem {
    constructor({ title = 'значение', price = 'значение' }) {
        this.title = title;
        this.price = price;

    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}


class GoodsList {
    constructor(list = []) {
        this.list = list;
    }
    render() {
        const goodsList = this.list.map((item) => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
    }
    getPrice() {
        const allPrice = this.list.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.price;
        }, 0);
        document.querySelector('.goods-list-allPrice').innerHTML = `Цена всех товаров: ${allPrice}ед.`;
    }

}



const goodsList = new GoodsList(goods);
goodsList.render();
goodsList.getPrice();