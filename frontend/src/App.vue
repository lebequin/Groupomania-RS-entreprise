<template>
    <div class="container">
        <div class="menu-container">
            <img alt="Logo du réseau social d'entreprise Groupomania" height="100"
                 src="../src/assets/logo/icon-left-font.svg">
            <nav id="menu">
                <router-link v-show="token != 'undefined' && token" to="/">Accueil</router-link>
                <router-link v-show="token != 'undefined' && token" to="/post">Publier</router-link>
                <router-link v-show="token != 'undefined' && token" to="/account">Mon compte</router-link>
                <router-link v-show="token != 'undefined' && token" to="/login" @click="deconnexion">Déconnexion
                </router-link>
            </nav>

        </div>
        <router-view/>
    </div>
    <footer>©{{ getCurrentYear }} - Groupomania - Réalisé par Léo Béquin</footer>
</template>

<script>
export default {
    data() {
        return {
            token: localStorage.getItem('token')
        };
    },
    computed: {
        getCurrentYear() {
            return new Date().getFullYear()
        }
    },
    methods: {
        deconnexion() {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('isAdmin');
            alert('Vous êtes déconnecté. Merci de votre visite.');
            location.replace("/")
        }
    },
    created() {
        document.documentElement.setAttribute('lang', 'fr')
    }
}
</script>

<style lang="scss">
@import url("assets/css/general.scss");

.menu-container {
    display: flex;
    justify-content: space-between;

    img {
        width: 20vw;
        object-fit: cover;
    }
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
    display: flex;
    align-items: center;

    a {
        font-weight: bold;
        color: #2c3e50;
        font-size: 1.5em;
        margin: 0 20px;

        &.router-link-exact-active {
            color: #00975b;
        }
    }
}


</style>
