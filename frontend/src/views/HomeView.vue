<template>
    <div class="main">
        <!-- Si Connecté -->
        <div v-if="token!=null">
            <!-- Si pas d'articles' -->
            <div v-if="posts.length === 0" >
                <div class="text">Aucun contenu  </div>
            </div>
            <!-- Si il y a des articles -->
            <div v-else class="login-box">
                <!-- Personnalisation du message de bienvenu-->
                <h2 class="cardTitle textShadow">Bienvenu {{ name }}</h2>
                <p class="infoBienvenu textShadow">voici les derniers articles parus: </p>
                <!-- Boucle permettant l'affichage de tous les articles valider de la BDD -->
                <div  @click="showButton(post.id)" class="articles" v-for="post in posts" :key="post.postId">
                    <div class="titleArticle">
                        <h2 class="postTitle">{{ post.title }}</h2>
                        <p class="auteur">par: {{ post.User.firstName }}</p>
                    </div>
                    <p class="postContent ">{{ post.content.split(" ", 10).join(" ") }}... </p>
                    <div class="diplayAttribute">
                        <p class="dateStamp">Derniere modification: {{ post.updatedAt.split("-")[2].split("T")[0] }}/{{ post.updatedAt.split("-")[1] }}/{{ post.updatedAt.split("-")[0] }}</p>
                        <a class="showButton" @click="showButton(post.id)">Voir Article</a>
                    </div>
                </div>
                <img class="logoProfile" src="../assets/logos/icon-left-font-monochrome-black.svg" alt="">
            </div>
        </div>
</template>

<script>
export default {
    name: "HomeView"
    data() {
        return {
            token: localStorage.getItem('token'),
            posts: '',
            connexion: false,
            name : localStorage.getItem("name")
        };
    },
}
</script>

<style scoped>

</style>