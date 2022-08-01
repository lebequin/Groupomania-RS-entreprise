<template>
    <form class="form-comment" @submit.prevent="commentMeme(memeId)">
        <input id="answerContent" v-model="message" class="input-field" placeholder="Commenter" type="text"/>
        <button class="btn btn-primary" type="submit">Commenter</button>
    </form>
    <ErrorMessageComponent v-if="error" :error="error"/>
</template>

<script>

import ErrorMessageComponent from "@/components/ErrorMessageComponent";

export default {
    name: "ReplyMemeComponent",
    data() {
        return {
            userId: localStorage.getItem('userId'),
            pseudo: '',
            message: '',
            error: null,
        }
    },
    props: ['memeId'],
    components: {ErrorMessageComponent},
    mounted() {
        //Appel à API pour affichage des infos utilisateur
        let token = localStorage.getItem("token");

        const url = `http://localhost:3000/api/users/${this.userId}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.pseudo = data.pseudo;
            })
            .catch(error => console.log(error,));
    },
    methods: {
        commentMeme(memeId) {
            const url = "http://127.0.0.1:3000/api/post/comment/" + memeId;
            const options = {
                method: "POST",
                body: JSON.stringify({
                    userId: this.userId,
                    message: this.message,
                    memeId: memeId,
                    pseudo: this.pseudo,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            };
            if (this.message == null || this.message == '') {
                this.error = 'Le commentaire ne peut pas être vide'

            } else {
                fetch(url, options)
                    .then(response => {
                        response.json()
                        window.location.reload()
                    })
                    .catch(error => console.log(error));
            }
        }
    }

}
</script>

<style>
#answerContent {
    padding: 11px;
    width: calc(100% - 21px);
    margin-right: 6px;
}

.form-comment {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

</style>