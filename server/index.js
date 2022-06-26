import express from "express";
import cors from "cors";
import { writeFile, readFile } from 'fs/promises';
import { send } from "process";

const BASKET = './public/basketGoods.json';
const GOODS = './public/goods.json';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

function getReformBasket() {
    return Promise.all([
        readGoods(),
        readBasket()
    ]).then(([goods, basket]) => {
        const result = basket.map((basketGoods) => {
            const { id_product: _basketId } = basketGoods;
            const good = goods.find(({ id_product: _goodsId }) => _basketId == _goodsId);
            return {
                ...basketGoods,
                ...good
            }
        })
        return result
    })
}

const readBasket = () => readFile(BASKET, 'utf-8').then((data) => {
    return JSON.parse(data);
});
const readGoods = () => readFile(GOODS, 'utf-8').then((data) => {
    return JSON.parse(data);
})
app.post('/goods', (res, req) => {
    readBasket().then((basket) => {
        const basketItem = basket.find(({ id_product: _id }) => { return _id === res.body.id })
        if (!basketItem) {
            basket.push({
                id_product: res.body.id,
                count: 1
            })
        } else {
            basket = basket.map((basketItem) => {
                if (basketItem.id_product === res.body.id) {
                    return {
                        ...basketItem,
                        count: basketItem.count + 1
                    }
                } else {
                    return basketItem
                }
            })
        }
        return writeFile(BASKET, JSON.stringify(basket)).then(() => {
            return getReformBasket()
        }).then((result) => {
            req.send(result)
        })
    })
})
app.delete('/goods', (res, req) => {
    readBasket().then((basket) => {
        const basketItem = basket.find(({ id_product: _id }) => { return (_id === res.body.id) })
        if (basketItem && basketItem.count > 1) {
            basket = basket.map((basketItem) => {
                if (basketItem.id_product === res.body.id) {
                    return {
                        ...basketItem,
                        count: basketItem.count - 1
                    }
                } else {
                    return basketItem
                }
            })
        } else if (basketItem && basketItem.count == 1) {
            const basketItemIndex = basket.findIndex(({ id_product: _id }) => { return (_id === res.body.id) })
            basket.splice(basketItemIndex, 1);
        }
        return writeFile(BASKET, JSON.stringify(basket)).then(() => {
            return getReformBasket()
        }).then((result) => {
            req.send(result)
        })
    })
})
app.get('/basket', (res, req) => {
    getReformBasket().then((result) => {
        req.send(JSON.stringify(result));
    })
});

app.listen('8000', () => {
    console.log('server is starting!');
});