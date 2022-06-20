<template>
    <div class="container">
        <div id="register" class="col-md-12">
            <div class="card-container">
                <h1 class="m-2">Créer votre compte</h1>
                <form class="form" @submit.prevent="register">
                    <div class="form-group">
                        <label class="text-left" for="pseudo">Pseudo</label>
                        <input
                            id="pseudo"
                            v-model="pseudo"
                            class="input-field"
                            placeholder="Entrer votre pseudo"
                            type="text"
                        />
                    </div>

                    <div class="form-group">
                        <label class="text-left" for="firstname">Email</label>
                        <input
                            id="firstname"
                            v-model="email"
                            class="input-field"
                            placeholder="Entrer votre email"
                            type="email"
                        />
                    </div>
                    <button class="btn btn--upload" @click="onPickFile">Choisir mon avatar</button>
                    <input
                        id="avatarUrl"
                        ref="fileInput"
                        accept="image/*"
                        style="display: none"
                        type="file"
                        @change="onFilePicked"/>
                    <div class="form-group">
                        <label class="text-left" for="password">Mot de passe</label>
                        <input
                            id="password"
                            v-model="password"
                            class="input-field"
                            placeholder="Entrer votre mot de passe"
                            type="password"
                        />
                    </div>
                    <button class="btn btn-primary m-3" type="submit">
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
            let input = document.getElementById('avatarUrl');
            let formData = new FormData();
            formData.append('pseudo', this.pseudo);
            formData.append('email', this.email);
            formData.append('avatarUrl', input.files[0]);
            formData.append('email', this.password);
            formData.append('email', this.is_admin);

            fetch('http://127.0.0.1:3000/api/users/signup', {
                // Adding method type
                method: "POST",
                // Adding body or contents to send
                body: formData,
                // Adding headers to the request
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })

                // Converting to JSON
                .then(response => response.json())

                // Displaying results to console
                .then(json => {
                    console.log('donnée envoyées : ', json)
                })

                .then(() => this.$router.push("/users"))
                .catch((err) => console.log(err));
        },
        onPickFile() {
            this.$refs.fileInput.click()
        },
        onFilePicked(event) {
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

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.text-left {
    text-align: left;
}


.form > div {
    width: 100%;
}


</style>