import express from "express";
import cors from "cors";
import { writeFile, readFile } from 'fs/promises';

const BASKET = './public/basketGoods.json';
const GOODS = './public/goods.json';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const readBasket = () => readFile(BASKET, 'utf-8').then((data) => {
    return JSON.parse(data);
});
const readGoods = () => readFile(GOODS, 'utf-8').then((data) => {
    return JSON.parse(data);
})
app.get('/basket', (req, res) => {
    Promise.all([
        readBasket(),
        readGoods()
    ]).then(([basketList, goodsList]) => {
        return basketList.map((basketItem) => {
            const goodsItem = goodsList.find(({ id: goodsId }) => {
                return goodsId === basketItem.id_product;
            });
            return {
                ...basketItem,
                ...goodsItem
            }
        });
    }).then((result) => {
        res.send(JSON.stringify(result));
    }).catch((err) => {
        console.log(err);
    });
});

app.listen('8000', () => {
    console.log('server is starting!');
});