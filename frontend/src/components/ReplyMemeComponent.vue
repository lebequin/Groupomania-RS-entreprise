<template>
    <form class="form" @submit.prevent="commentMeme(memeId)">
        <input id="answerContent" v-model="message" class="input-field" placeholder="Commenter" type="text"/>
        <button class="btn btn-primary" type="submit">Commenter</button>
    </form>
</template>

<script>

export default {
    name: "ReplyMemeComponent",
    data() {
        return {
            userId: localStorage.getItem('userId'),
            message: '',
        }
    },
    props: ['memeId'],
    methods: {
        commentMeme(memeId) {
            const url = "http://127.0.0.1:3000/api/post/comment/" + memeId;
            const options = {
                method: "POST",
                body: JSON.stringify({
                    userId: this.userId,
                    message: this.message,
                    memeId: memeId,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            };
            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    console.log('donnée envoyées : ', json)
                    window.location.reload()
                })
                .catch(error => console.log(error));
        }
    }

}
</script>

<style scoped>
</style>