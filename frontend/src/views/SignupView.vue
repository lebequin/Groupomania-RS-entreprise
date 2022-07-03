<template>
    <div class="container">
        <div id="register" class="col-md-12">
            <div class="card-container">
                <h1 class="m-2">Créer votre compte</h1>
                <form class="form">
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
                    <img :src="avatarUrl" alt="" class="avatar-preview">
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
                    <button class="btn btn-primary m-3" type="submit" @click.prevent="register">
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
        };
    },
    methods: {
        register() {
            let input = document.getElementById('avatarUrl');
            let formData = new FormData();
            formData.append('email', this.email);
            formData.append('pseudo', this.pseudo);
            formData.append('image', input.files[0]);
            formData.append('password', this.password);
            formData.append('is_admin', false);

            fetch('http://127.0.0.1:3000/api/users/signup', {
                method: "POST",
                body: formData,
            })
                // Converting to JSON
                .then(response => response.json())

                // Displaying results to console
                .then(json => {
                    console.log('donnée envoyées : ', json)
                    this.$router.push("/login")
                })
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

.avatar-preview {
    max-width: 150px;
    object-fit: cover;
    border-radius: 20px;
    margin: 1em 0;
}

.form > div {
    width: 100%;
}


</style>