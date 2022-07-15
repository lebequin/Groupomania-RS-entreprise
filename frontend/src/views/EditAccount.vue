<template>
    <div class="form--card">
        <div class="post--form">
            <div class="card-container">
                <h2>Modification</h2>
                <form class="form" @submit.prevent="updateUser">
                    <div v-if="isAdmin == 1 || isCurrentUserAdmin == 'true'">
                        <div class="form-group">
                            <label>Admin :</label>
                            {{ input.isAdmin }}
                            <input v-model="input.isAdmin" aria-label="Admin"
                                   class="input-field" type="checkbox"/>
                        </div>
                    </div>
                    <div v-else>
                        <div class="form-group">
                            <input v-model="input.email" :autocomplete="email" :placeholder="email" aria-label="Email"
                                   class="input-field" type="email"/>
                        </div>
                        <div class="form-group">
                            <input v-model="input.pseudo" :autocomplete="pseudo" :placeholder="pseudo"
                                   aria-label="Pseudo"
                                   class="input-field" type="text"/>
                        </div>
                        <div class="form-group upload-image">
                            <img :src="avatarUrl" alt="Avatar utilisateur">
                            <a class="btn btn--upload" @click="onPickFile">Changer mon avatar</a>
                            <input
                                id="avatarUrl"
                                ref="fileInput"
                                accept="images/*"
                                style="display: none"
                                type="file"
                                @change="onFilePicked"/>
                        </div>
                        <div class="form-group">
                            <input v-model="input.password" aria-label="mot de passe" class="input-field"
                                   placeholder="Saisir un nouveau mot de passe" type="password"/>
                        </div>
                    </div>

                    <div>
                        <button class="btn" type="submit">Modifier</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'EditAccount',
    components: {},
    data() {
        return {
            userId: localStorage.getItem('userId'),
            isCurrentUserAdmin: localStorage.getItem('isAdmin'),
            param_id: '',
            id: '',
            pseudo: "",
            email: "",
            avatarUrl: "",
            isAdmin: false,
            input: {
                pseudo: "",
                email: "",
                avatarUrl: "",
                password: "",
                userId: "",
                isAdmin: false,
            },
        }
    },
    mounted() { //Récuperation des infos utilisateurs
        this.param_id = this.$route.params.id
        if (this.param_id && this.param_id !== 'undefined') {
            this.userId = this.param_id;
        }
        console.log(this.isCurrentUserAdmin)
        const url = "http://127.0.0.1:3000/api/users/" + this.userId;
        console.log(url);
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.email = data.email;
                this.pseudo = data.pseudo;
                this.avatarUrl = data.avatarUrl;
                this.isAdmin = data.isAdmin;
                this.input.isAdmin = this.isAdmin;
            })
            .catch(error => console.error(error));
    },
    methods: {
        updateUser() { //Fonction de mise à jour de l'utilisateur
            let input = document.getElementById('avatarUrl');
            let formData = new FormData();
            formData.append('pseudo', this.input.pseudo || this.pseudo);
            formData.append('email', this.input.email || this.email);
            formData.append('isAdmin', this.input.isAdmin);
            if (input && input.files[0]) {
                formData.append('image', input.files[0]);
            } else {
                formData.append('image', this.avatarUrl);
            }
            const url = "http://127.0.0.1:3000/api/users/" + this.userId;
            const options = {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: formData
            };
            fetch(url, options)
                // Converting to JSON
                .then(response => response.json())
                .then(data => {
                    this.email = data.email;
                    this.pseudo = data.pseudo;
                    this.avatarUrl = data.avatarUrl;
                    this.password = data.password;
                })
                .then(() => {
                    this.$router.push("/users")
                    alert("Modification(s) enregistrée(s)")
                })
                .catch((err) => console.log(err));
        },
        onPickFile() {
            this.$refs.fileInput.click()
        },
        onFilePicked(event) {
            const files = event.target.files
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.avatarUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },
    },

}
</script>

<style lang="scss">
@import "../assets/css/general.scss";

.avatar img {
    width: 35%;
    border-radius: 20px;
}
</style>