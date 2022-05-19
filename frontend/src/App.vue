<template>
  <div class="container">
    <div class="menu-container">
      <img src="../src/assets/logo/icon-left-font.svg" alt="Logo du réseau social d'entreprise Groupomania" height="100">
      <nav id="menu">
        <router-link to="/">Accueil</router-link>
        <router-link to="/login">Connexion</router-link>
        <router-link to="/signup">Inscription</router-link>
      </nav>
      <router-view/>
    </div>

  </div>

  <footer>Amazing footer</footer>
</template>

<style lang="scss">
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
    margin:0 20px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
