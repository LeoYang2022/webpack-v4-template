<template>
    <div>
        <h1 class="bs">{{name}} -- {{age}} -- by 工程化</h1>
        <Header></Header>
    </div>
</template>
<script>
import Header from './Header.vue';
export default {
    components: {
        Header
    },
    data() {
        return {
            name: "Leo",
            age: 29
        }
    }
}
</script>
<style scoped>
.bs {
    color: greenyellow;
    font-size: 28px;
    margin: 15px;
}
</style>
