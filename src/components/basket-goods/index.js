import { service, serviceWithBody } from "../../services";
import { BASKET, GOODS } from "../../constants";

export default Vue.component('basket-goods', {
    data() {
        return {
            basketGoodsItems: []
        }
    },

    template: `
          <div class="fixed-area">
             <div class="basket-card">
                <div class="basket-card__header">
                   <h1 class="basket-card__header__title">basket card</h1>
                   <div class="basket-card__header__delete-icon"
                      v-on:click="$emit('closeclick')"
                   ></div>
                </div>
                <div class="basket-card__content">
                   <basket-item v-for="item in basketGoodsItems" :item="item" @add="addGoods" @delete="deleteGoods"></basket-item>
                </div>
             </div>
          </div>
        `,
    mounted() {
        service(BASKET).then((basketGoods) => {
            this.basketGoodsItems = basketGoods
        })
    },
    methods: {
        addGoods(id) {
            serviceWithBody(GOODS, "POST", {
                id
            }).then((data) => {
                this.basketGoodsItems = data;
            })
        },
        deleteGoods(id) {
            serviceWithBody(GOODS, 'DELETE', {
                id
            }).then((data) => {
                this.basketGoodsItems = data;
            })
        }
    }
})