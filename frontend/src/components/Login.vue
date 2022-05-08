<template>
  <div class="container">
    <div id="login" class="col-md-12">
      <div class="card-container">
        <h1 class="m-2">J'ai déjà un compte</h1>
        <form class="form" @submit.prevent="login">
          <div class="form-group m-2">
            <label for="email" class="text-left">Email: </label>
            <input
                type="text"
                placeholder="Veuillez saisir un email"
                id="email"
                class="form-control"
                v-model="email"
                required
            />
          </div>
          <div class="form-group m-2">
            <label for="password" class="text-left">Password: </label>
            <input
                type="password"
                id="password"
                class="form-control"
                v-model="password"
                required
            />
          </div>
          <button type="submit" class="btn btn-dark pr-5 pl-5 m-3">
            Connexion
          </button>
          <hr />
          <router-link to="/register">
            <button class="btn btn-primary pr-5 pl-5 m-3">
              Créer votre compte
            </button>
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const email = this.email;
      const password = this.password;
      this.$store
          .dispatch("login", { email, password })
          .then(() => {
            this.$router.push("/");
          })
          .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-group {
  display: flex;
  flex-direction: column;
}
hr {
  border: 0.5px solid rgb(221, 220, 220);
  width: 50%;
}
</style>