"use strict";

const url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
const basketUrl = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json`;

class GoodsItem {
    constructor({ product_name = 'значение', price = 'значение' }) {
        this.product_name = product_name;
        this.price = price;

    }
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}


class GoodsList {
    constructor(list = []) {
        this.list = this.getData();
        this.filteredItems = this.getData();
    }
    async getData() {
        const response = await fetch(url);
        const data = await response.json();
        return (this.list = await data, this.filteredItems = data);
    }
    async filter(str) {
        await this.filteredItems;
        this.filteredItems = this.list.filter(({ product_name }) => {
            return (new RegExp(str, 'i')).test(product_name)
        });
    }
    async render() {
        await this.filteredItems;
        const goodsList = await this.filteredItems.map((item) => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
    }
    async getPrice() {
        await this.list;
        const allPrice = this.list.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.price;
        }, 0);
        document.querySelector('.goods-list-allPrice').innerHTML = `Цена всех товаров: ${allPrice}ед.`;
    }

}

class BasketItems {
    constructor(items = []) {
        this.items = this.getBasket();
    }
    async getBasket() {
        const response = await fetch(basketUrl);
        const data = await response.json();
        return this.items = await data.contents;
    }
}


const goodsList = new GoodsList();
goodsList.render();
goodsList.getPrice();

const basket = new BasketItems();
basket.getBasket();
console.log(basket);

document.querySelector('.search-button').addEventListener('click', () => {
    const input = document.querySelector('.search');
    goodsList.filter(input.value);
    goodsList.render();
});


