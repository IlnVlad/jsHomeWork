import { PROD } from '../../constants'
export default function startApp() {
    const app = new Vue({
        el: "#root",
        data: {
            empty: 'Нет данных',
            items: [],
            basketGoodsItems: [],
            searchValue: '',
            isVisible: false
        },
        mounted() {
            fetch(PROD).then(res => res.json()).then(
                data => {
                    this.items = data;
                    this.empty = '';
                }
            )
        },
        computed: {
            filteredItems() {
                return this.items.filter(({ product_name }) => {
                    return product_name.match(new RegExp(this.searchValue, 'gui'))
                })
            }
        },
        methods: {
            cartButtonClick() {
                this.isVisible = !this.isVisible;
            }
        }
    })
}
