const cartObj = {};
const cartIconWrap = document.querySelector('.cartIconWrap');
const cartSpan = document.querySelector(`.cartIconWrap > span`);
const spanValue = document.querySelector('.basketTotalValue');
const cartDiv = document.querySelector('.basketCount');

function addToCart(id, name, price) {
    if (!cartObj[id]) {
        const objToAdd = {};
        objToAdd.id = id;
        objToAdd.name = name;
        objToAdd.price = price;
        objToAdd.count = 1;
        objToAdd.totalPrice = price;
        return cartObj[id] = objToAdd;
    } else {
        cartObj[id].count++;
        cartObj[id].totalPrice = cartObj[id].count * cartObj[id].price;
        return cartObj;
    }
}
function updateHTML() {
    let spanCount = 0;
    let totalPrice = 0;
    const keys = Object.keys(cartObj);
    keys.forEach(el => {
        spanCount = spanCount + cartObj[el].count;
        totalPrice = totalPrice + cartObj[el].count * cartObj[el].price;
    });
    spanValue.textContent = totalPrice;
    cartSpan.textContent = spanCount;
}
function checkCartDiv(cartObj, id) {
    if (!document.querySelector(`.basketCount > div[name="${id}"]`)) {
        const newItemDiv = document.createElement('div');
        const newSpanName = document.createElement('span');
        newSpanName.textContent = `${cartObj[id].name}`;
        const newSpanCount = document.createElement('span');
        newSpanCount.textContent = `${cartObj[id].count}`;
        newSpanCount.setAttribute('name', 'count');
        const newSpanPrice = document.createElement('span');
        newSpanPrice.textContent = `${cartObj[id].price}$`;
        const newSpanTotalPrice = document.createElement('span');
        newSpanTotalPrice.textContent = `${cartObj[id].totalPrice}`;
        newSpanTotalPrice.setAttribute('name', 'totalPrice');
        newItemDiv.appendChild(newSpanName);
        newItemDiv.appendChild(newSpanCount);
        newItemDiv.appendChild(newSpanPrice);
        newItemDiv.appendChild(newSpanTotalPrice);
        newItemDiv.setAttribute('name', id);
        cartDiv.appendChild(newItemDiv);
    } else {
        document.querySelector(`.basketCount > div[name="${id}"] > span[name="count"]`)
            .textContent = cartObj[id].count;
        document.querySelector(`.basketCount > div[name="${id}"] > span[name="totalPrice"]`)
            .textContent = cartObj[id].totalPrice;
    }
}

cartIconWrap.addEventListener('click', (event) => {
    document.querySelector('.basket').classList.toggle('hidden');
});
document.querySelector('.featuredItems').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const name = event.target.closest('.featuredItem').querySelector(
            '.featuredName').textContent.trim();
        const price = Number(event.target.closest('.featuredItem').querySelector(
            '.featuredPrice').textContent.replace('$', '').trim());
        const id = event.target.closest('.featuredItem').dataset.id;
        addToCart(id, name, price);
        updateHTML();
        checkCartDiv(cartObj, id);
    } else return;
});