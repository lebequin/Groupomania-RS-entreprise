<template>
    <div class="container">
        <div id="login" class="col-md-12">
            <div class="card-container">
                <h1 class="m-2">J'ai déjà un compte</h1>
                <form class="form" @submit.prevent="login">
                    <div class="form-group m-2">
                        <label class="text-left" for="email">Email: </label>
                        <input
                            id="email"
                            v-model="email"
                            class="input-field"
                            placeholder="Veuillez saisir votre email"
                            required
                            type="text"
                        />
                    </div>
                    <div class="form-group m-2">
                        <label class="text-left" for="password">Mot de passe: </label>
                        <input
                            id="password"
                            v-model="password"
                            class="input-field"
                            placeholder="Veuillez saisir votre mot de passe"
                            required
                            type="password"
                        />
                    </div>
                    <div v-if="error">
                        <p>{{ error }}</p>
                    </div>
                    <button class="btn" type="submit">
                        Connexion
                    </button>
                    <hr/>
                    <router-link to="/signup">
                        <button class="btn btn-primary pr-5 pl-5 m-3">Créer votre compte</button>
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
            error: "",
        };
    },
    methods: {
        login() {
            const url = "http://127.0.0.1:3000/api/users/login";
            const options = {
                method: "POST",
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
                headers: {"Content-Type": "application/json; charset=UTF-8"},
            }
            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    localStorage.setItem('token', json.token)
                    localStorage.setItem('userId', json.userId)
                    localStorage.setItem('isAdmin', json.isAdmin)
                    this.error = json.error;
                    if (!json.error) {
                        location.replace("/")
                    }

                })
                .catch(error => {
                    error.message = error;
                    alert(error)
                });
        }
    }
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