export default Vue.component('custom-search', {
    template: `
    <input type="text" @input= "$emit('input', $event.target.value)" placeholder="Вы ищите...">
    `
})