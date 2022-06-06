window.onload = () => {
    const app = new Vue({
        el: "#root",
        data: {
            empty: 'Нет данных',
            items: [],
            searchValue: '',
            isVisible: false
        },
        mounted() {
            fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json').then(res => res.json()).then(
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
                this.isVisible = !this.isVisible
            }
        }
    })
}