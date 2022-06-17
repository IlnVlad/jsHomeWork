window.onload = () => {

    Vue.component('custom-search', {
        template: `
        <input type="text" @input= "$emit('input', $event.target.value)" placeholder="Вы ищите...">
        `
    })

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
            fetch('http://localhost:8000/goods.json').then(res => res.json()).then(
                data => {
                    this.items = data;
                    this.empty = '';
                    console.log(data)
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
                fetch('http://localhost:8000/basket').then(res => res.json()).then(
                    data => {
                        this.basketGoodsItems = data;
                    }
                )
            }
        }
    })
}