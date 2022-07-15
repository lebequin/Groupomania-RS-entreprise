<template>
    <div class="comments-container">
        <div v-for="comment in comments" :key="comment.id" class="comment__display">
            <div class="reply__list">
                <div>
                    <EditCommentComponent v-if="isHidden == true" :commentId="comment.id"></EditCommentComponent>
                    <p>{{ comment.message }}</p>
                    <i v-if="isAdmin == true" class="fa fa-trash" @click="deleteComment(comment.id)"></i>
                </div>
                <div v-if="comment.userId == this.userId" class="comment-options">
                    <i class="fa fa-trash" @click="deleteComment(comment.id)"></i>
                    <i class="fa fa-pencil" @click="isHidden = !isHidden"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditCommentComponent from "@/components/EditCommentComponent";

export default {
    name: "ListCommentComponent",
    components: {
        EditCommentComponent,
    },
    data() {
        return {
            userId: localStorage.getItem('userId'),
            isAdmin: 0,
            message: '',
            isHidden: false,
        }
    },

    props: {
        memeId: Number,
        comments: Array,
    },
    mounted() {
        const url = `http://localhost:3000/api/users/${this.userId}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.isAdmin = data.isAdmin;
            })
            .catch(error => console.log(error,));
    },
    methods: {
        deleteComment(commentId) {
            const url = "http://localhost:3000/api/post/comment/" + commentId;
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            };
            fetch(url, options)
                .then(response => response.json())
                .then(() => {
                    window.location.reload();
                })
                .catch(error => console.log(error));
        }
    }
}
</script>

<style>

.comment__display {
    background: #ededed;
    border-radius: 10px;
    width: 80%;
    margin: 10px;

}

.comment__display:nth-child(2n+1) {
    float: left;
}

.comment__display:nth-child(2n) {
    float: right;
}

</style>