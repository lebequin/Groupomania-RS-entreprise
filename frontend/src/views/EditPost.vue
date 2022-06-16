<template>
    <div class="form--card">
        <div class="card-container">
            <h2>Modification</h2>
            <form class="form" @submit.prevent="updateMeme">
                <div class="form-group">
                    <input v-model="input.email" :autocomplete="email" :placeholder="email" aria-label="Email"
                           class="input-field" type="email"/>
                </div>
                <div class="form-group">
                    <input v-model="input.pseudo" :autocomplete="pseudo" :placeholder="pseudo" aria-label="Pseudo"
                           class="input-field" type="text"/>
                </div>
                <div class="form-group upload-image">
                    <img :src="fileUrl" alt="Meme">
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
                <div>
                    <button class="btn" type="submit">Modifier</button>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
export default {
    name: 'EditPost',
    components: {},
    data() {
        return {
            userId: localStorage.getItem('userId'),
            title: "",
            fileUrl: "",
            input: {
                title: "",
                fileUrl: "",
            },
        }
    },
    mounted() { //Récuperation des infos utilisateurs
        const url = "http://127.0.0.1:3000/api/posts/" + $route.params.id;
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        console.log(this.avatarUrl.files)
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.email = data.email;
                this.pseudo = data.pseudo;
                this.avatarUrl = data.avatarUrl;
            })
            .catch(error => console.error(error));
    },
    methods: {
        updateMeme() { //Fonction de mise à jour de l'utilisateur
            let input = document.getElementById('fileUrl');
            console.log(input.files[0])
            let formData = new FormData();
            formData.append('pseudo', this.input.pseudo || this.pseudo);
            formData.append('email', this.input.email || this.email);
            formData.append('image', input.files[0]);
            const url = "http://127.0.0.1:3000/api/users/" + localStorage.getItem('userId');
            const options = {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),

                },
                body: formData
            };
            console.log(this.input.avatarUrl.files)
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
<style scoped>

</style>