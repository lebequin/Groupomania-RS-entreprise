<template>
    <div class="container">
        <div class="card-container">
            <h1 class="m-2">Publier un Meme</h1>
            <form class="form">
                <div class="form-group">
                    <label class="text-left" for="title">Titre</label>
                    <input id="title" v-model="title" class="input-field" placeholder="Entrer un titre" type="text"/>
                </div>
                <div class="form-group upload-image">
                    <img :src="fileUrl" alt="" class="meme-preview">
                    <button class="btn btn--upload" @click.prevent="onPickFile">Choisir mon meme</button>
                    <input id="fileUrl" ref="fileInput" accept="image/*" style="display: none" type="file"
                           @change="onFilePicked"/>
                </div>
                <ErrorMessageComponent v-if="error" :error="error"/>
                <button class="btn btn-primary m-3" type="submit" @click.prevent="post">Publier</button>
            </form>
        </div>
    </div>
</template>

<script>
import ErrorMessageComponent from "@/components/ErrorMessageComponent";

export default {
    name: 'PostView',
    components: {ErrorMessageComponent},
    data() {
        return {
            title: null,
            fileUrl: null,
            error: null,
        };
    },
    methods: {
        post() {
            let input = document.getElementById('fileUrl');
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('image', input.files[0]);
            if (this.title == null || this.fileUrl == null) {
                this.error = 'Un champ obligatoire est vide'
            } else {
                
                fetch('http://127.0.0.1:3000/api/post', {
                    // Adding method type
                    method: "POST",
                    // Adding body or contents to send
                    body: formData,
                    // Adding headers to the request
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
                })

                    // Converting to JSON
                    .then(response => response.json())

                    // Displaying results to console
                    .then(json => {
                        this.error = json.error;
                        if (!json.error) {
                            this.$router.push("/")
                        }
                    })
                    .catch((err) => console.log(err));
            }
        },

        onPickFile() {
            this.$refs.fileInput.click()
        },
        onFilePicked(event) {
            const files = event.target.files
            //let filename = files[0].name
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.fileUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },

    }
};
</script>

<style lang="scss">
@import "../assets/css/general";

.card-container {
    max-width: 400px;
    margin: 2em auto;
    box-shadow: 0px 0px 31px -10px #aaa;
    border-radius: 24px;
    padding: 40px;
}

.form-group.upload-image img.meme-preview {
    max-width: 100%;
}
</style>