<template>
  <div class="container">
    <div id="register" class="col-md-12">
      <div class="card-container">
        <h1 class="m-2">Créer votre compte</h1>
        <form class="form" @submit.prevent="register">
          <div class="form-group m-2">
            <label for="pseudo" class="text-left">Pseudo: </label>
            <input
                type="text"
                placeholder="Entrer votre pseudo"
                id="pseudo"
                class="form-control"
                v-model="pseudo"
            />
          </div>

          <div class="form-group m-2">
            <label for="firstname" class="text-left">email: </label>
            <input
                type="email"
                placeholder="Entrer votre email"
                id="firstname"
                class="form-control"
                v-model="email"
            />
          </div>

          <div class="form-group m-2">
            <button class="btn btn-info" @click="onPickFile">Choisir mon avatar</button>
            <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"/>
          </div>

          <div class="form-group m-2">
            <label for="password" class="text-left">Password: </label>
            <input
                type="password"
                placeholder="Entrer votre mot de passe"
                id="password"
                class="form-control"
                v-model="password"
            />
          </div>
          <button type="submit" class="btn btn-primary m-3">
            Créez votre compte
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RegisterForm",
  data() {
    return {
      pseudo: "",
      email: "",
      avatarUrl: "",
      password: "",
      is_admin: ""
    };
  },
  methods: {
    register() {
      fetch('http://127.0.0.1:3000/api/users/signup', {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
              pseudo: this.pseudo,
              email: this.email,
              password: this.password,
        }),
        // Adding headers to the request
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })

      // Converting to JSON
          .then(response => response.json())

                // Displaying results to console
                .then(json => console.log(json))
                .then(() => this.$router.push("/users"))

          .catch((err) => console.log(err));
          },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      //let filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.avatarUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
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
</style>