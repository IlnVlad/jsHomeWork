"use strict";

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = 'значение', price = 'значение') => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list =[]) => {
    let goodsList = list.map((item) => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
}

renderGoodsList(goods);

//3*
// так как результат map заменяет собой элементы объекта, в котором был вызван, то в объекте goodList разделитель ",". А innerHTML вставит весь объект, в том числе и разделитель. Разделитель можно заменить с помощью goodsList.join(" ")
