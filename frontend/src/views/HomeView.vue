<template>
    <div class="main">
        <div v-if="token">
            <p class="">voici les derniers articles parus: </p>
            <PostComponent/>
        </div>
    </div>
</template>

<script>

import PostComponent from "@/components/PostComponent";

export default {
    name: "HomeView",
    components: {
        PostComponent,
    },
    data() {
        return {
            token: localStorage.getItem('token'),
        };
    },


}
</script>

<style scoped>

</style>