<template>
    <div class="form--card">
        <div class="card-container">
            <h2>Modification</h2>
            <form class="form" @submit.prevent="updateMeme">
                <div class="form-group">
                    <input v-model="input.title" :autocomplete="title" :placeholder="title" aria-label="title"
                        class="input-field" type="text" />
                </div>
                <div class="form-group upload-image">
                    <img :src="fileUrl" alt="Meme">
                    <a class="btn btn--upload" @click="onPickFile">Changer mon meme</a>
                    <input id="fileUrl" ref="fileInput" accept="images/*" style="display: none" type="file"
                        @change="onFilePicked" />
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
    data() {
        return {
            userId: localStorage.getItem('userId'),
            id: window.location.href.split("/").slice(-1)[0],
            title: "",
            fileUrl: "",
            input: {
                title: "",
                fileUrl: "",
            },
        }
    },
    mounted() { //Récuperation des infos utilisateurs
        console.log(this.id)
        const url = "http://localhost:3000/api/post/" + this.id;
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.title = data.title;
                this.fileUrl = data.fileUrl;
            })
            .catch(error => console.log(error));
    },
    methods: {
        updateMeme() { //Fonction de mise à jour de l'utilisateur
            let input = document.getElementById('fileUrl');
            let formData = new FormData();
            formData.append('title', this.input.title || this.title);
            formData.append('image', input.files[0]);
            const url = "http://localhost:3000/api/post/" + this.id;
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
                    this.title = data.title;
                    this.fileUrl = data.fileUrl;
                })
                .then(() => {
                    this.$router.push("/")
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
.form-group.upload-image img {
    max-width: 100%;
    border-radius: 20px;
    justify-content: center;
}
</style>