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
                    <button class="btn" type="submit">
                        Connexion
                    </button>
                    <hr/>
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
//Azerty@1
export default {
    name: "LoginForm",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async login() {
            const {email, password} = this;
            const res = await fetch(
                "http://127.0.0.1:3000/api/users/login",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json; charset=UTF-8"},
                    body: JSON.stringify({email, password})
                }
            );
            const data = await res.json();
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.userId)
            console.log(localStorage.getItem('token'))
            console.log(localStorage.getItem('userId'))
            location.replace("/")
        }/*
        async login() {
            await fetch('http://127.0.0.1:3000/api/users/login', {
                // Adding method type
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
                // Adding headers to the request
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })

                // Converting to JSON
                .then(response => {
                    console.log(response)
                    //localStorage.setItem('token', response.data.token)
                    location.replace("/")

                })

                // Displaying results to console
                .then(json => console.log(json))
                .then(() => this.$router.push("/post"))
                .catch(error => {
                    alert("Email ou Mot de Passe incorrect")
                    console.error(error)
                    this.revele = !this.revele
                })
        },*/
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