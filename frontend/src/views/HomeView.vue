<template>
    <div class="main">
        <div v-if="token">
            <h1>Bonjour <span>{{ pseudo }}</span>, voici les derniers articles publiés :</h1>
            <PostComponent/>
        </div>
        <div v-else>
            <Login/>
        </div>
    </div>
</template>

<script>

import PostComponent from "@/components/PostListComponent";
import Login from "@/views/Login";

export default {
    name: "HomeView",
    components: {
        PostComponent,
        Login,
    },
    data() {
        return {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
            pseudo: '',
        };
    },
    mounted() {
        const url = "http://127.0.0.1:3000/api/users/" + this.userId;
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        };
        fetch(url, options)
            // Converting to JSON
            .then(response => response.json())
            .then(data => {
                this.pseudo = data.pseudo;
            })
            .catch((err) => console.log(err));
    }


}
</script>
<style lang="scss">
@import url("../assets/css/general.scss");

h1 {
    span {
        color: #fd2d01;
        text-transform: capitalize;
        font-style: italic;
    }
}
</style>