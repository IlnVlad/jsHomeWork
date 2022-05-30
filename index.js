"use strict";

const url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';

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
    }
    async getData() {
        const response = await fetch(url);
        const data = await response.json();
        return this.list = await data;
    }
    async render() {
        await this.list;
        const goodsList = await this.list.map((item) => {
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


const goodsList = new GoodsList();
goodsList.render();
goodsList.getPrice();


