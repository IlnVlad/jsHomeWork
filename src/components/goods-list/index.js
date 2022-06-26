import { serviceWithBody } from "../../services";
import { GOODS } from "../../constants";

export default Vue.component('goods-list', {
    props: [
        "item"
    ],
    template: `
    <div>
        <div class="goods-item">
            <h1>{{ item.product_name }}</h1>
            <h2>{{ item.price }}</h2>
            <custom-button @click="addGoods">Добавить</custom-button>
        </div>
    </div>
    `,
    methods: {
        addGoods() {
            serviceWithBody(GOODS, "POST", { id: this.item.id_product })
        }
    }
})