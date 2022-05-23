<template>
    <div class="main">
        <!-- Si Connecté -->
        <div v-if="token!=null">
            <!-- Si pas d'articles' -->
            <div v-if="posts.length === 0">
                <div class="text">Aucun contenu</div>
            </div>
            <!-- Si il y a des articles -->
            <div v-else class="login-box">
                <!-- Personnalisation du message de bienvenu-->
                <h2>Bonjour {{ name }}</h2>
                <p class="">voici les derniers articles parus: </p>
                <!-- Boucle permettant l'affichage de tous les articles valider de la BDD -->

            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "HomeView",
    data() {
        return {
            token: localStorage.getItem('token'),
            posts: '',
            connexion: false,
            name: localStorage.getItem("name")
        };
    },
}
</script>

<style scoped>

</style>