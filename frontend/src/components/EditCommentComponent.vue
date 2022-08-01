<template>
    <div class="update-comment-container">
        <div class="comment__input">
            <input v-model="commentInput.message" :placeholder="message" class="input-field" type="text">
        </div>
        <div class="params__comment">
            <a class="validate-comment" @click="updateComment(commentId)"><i aria-label="Envoi" class="fa fa-check"></i></a>
            <a class="cancel-comment" @click="cancelUpdate()"><i aria-label="Fermer" class="fa fa-times"></i></a>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditCommentComponent",
    data() {
        return {
            commentInput: {
                message: "",
            },
            message: "",
        }
    },
    props: {
        commentId: Number,
    },
    mounted() {
        const url = "http://localhost:3000/api/post/comment/" + this.commentId
        const options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.message = data.message;
            })
            .catch(error => console.log(error))
    },
    methods: {
        updateComment() {
            console.log(this.commentId)
            const url = "http://localhost:3000/api/post/comment/" + this.commentId
            const options = {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this.commentInput)
            }
            fetch(url, options)
                .then(response => {
                    console.log(response)
                    response.json()
                })

                .then(data => {
                    console.log(data)
                    window.location.reload();
                })
                .catch(error => console.log(error))
        },
        cancelUpdate() {
            window.location.reload()
        },
    },

}
</script>

<style scoped>
.update-comment-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    margin: auto;
}

.params__comment {
    display: flex;
    align-items: center;
    font-size: 20px;
}

.comment__input {
    width: 75%;
}

.validate-comment {
    color: #00b970;
    margin: 0 5px;
}

.cancel-comment {
    color: #fd2d01;
    margin: 0 5px;
}


</style>