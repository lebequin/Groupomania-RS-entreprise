<template>
    <div class="form--card">
        <div class="post--form">
            <div class="card-container">
                <h2>Modification</h2>
                <form class="form" @submit-prevent="updateUser">
                    <div class="form-group">
                        <input v-model="input.email" :autocomplete="email" :placeholder="email" aria-label="Email"
                               class="input-field" type="email"/>
                    </div>
                    <div class="form-group">
                        <input v-model="input.pseudo" :autocomplete="pseudo" :placeholder="pseudo" aria-label="Pseudo"
                               class="input-field" type="text"/>
                    </div>
                    <div class="form-group upload-image">
                        <img :src="avatarUrl" alt="Avatar utilisateur">
                        <button class="btn btn--upload" @click="onPickFile">Changer mon avatar</button>
                        <input
                            ref="fileInput"
                            accept="image/*"
                            style="display: none"
                            type="file"
                            @change="onFilePicked"/>
                    </div>
                    <div class="form-group">
                        <input v-model="input.password" aria-label="mot de passe" class="input-field"
                               placeholder="Saisir un nouveau mot de passe" type="password"/>
                    </div>
                </form>
            </div>
            <div>
                <button class="btn" type="submit">Modifier</button>
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
            pseudo: "",
            email: "",
            avatarUrl: "",
            input: {
                pseudo: "",
                email: "",
                avatarUrl: "",
                password: "",
                userId: "",
            },
        }
    },
    mounted() { //Récuperation des infos utilisateurs
        const url = "http://127.0.0.1:3000/api/users/" + this.userId;
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
            })
            .catch(error => console.error(error));
    },
    methods: {
        updateUser() { //Fonction de mise à jour de l'utilisateur
            const url = "http://127.0.0.1:3000/api/users/" + localStorage.getItem('userId');
            const options = {
                method: 'PUT',
                body: JSON.stringify({
                    pseudo: this.pseudo,
                    email: this.email,
                    avatarUrl: this.avatarUrl,
                    password: this.password,
                }),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.input.push(data);
                    window.location.reload();
                    alert("Modification(s) enregistrée(s)")

                })
                .catch(error => console.error(error));
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

</style>