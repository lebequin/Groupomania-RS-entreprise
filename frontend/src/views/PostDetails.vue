<template>
    <div class="meme__container">
        <div class="header__meme">
            <div class="header_user">
                <img :src="user.avatarUrl" alt="avatar utilisateur" class="user__avatar">
                <div class="user__pseudo">
                    <p>{{ user.pseudo }}</p>
                    <i v-if="user.isAdmin == 1" aria-hidden="true" class="fa fa-id-badge admin-badge"></i>
                </div>
            </div>
            <div v-if="user.userId == userId || isAdmin == true" class="params__meme">
                <div v-if="user.userId == userId" class="params__button" @click="updateMeme(id)">
                    <i aria-hidden="true" class="fa fa-pencil"></i>
                </div>
                <div v-if="isAdmin == true" class="params__button" @click="deleteMeme(id)">
                    <i aria-hidden="true" class="fa fa-trash"></i>
                </div>
            </div>
        </div>
        <div class="body__meme">
            <h2 class="meme__title">{{ title }}</h2>
            <img :src="fileUrl" alt="image" class="meme__img">
        </div>
        <div class="footer__meme">
            <p>Publié :{{ createdAt }}</p>
            <div class="interact">
                <div class="like-container">
                    <a @click="likeMeme(id)">
                        <i v-if="likes.isLike == false" aria-hidden="true" class="fa fa-heart"></i>
                        <i v-else aria-hidden="true" class="fa fa-heart" style="color:red"></i>
                    </a>
                    <p>{{ likes.length }}</p>
                </div>
                <div class="comment-container">
                    <i class="fa fa-comment"></i>
                    <p>{{ comments.length }}</p>
                </div>
            </div>
        </div>
        <ListCommentComponent :comments="comments"/>
        <div v-if="!isHidden" class="answer-container">
            <ReplyMemeComponent :memeId="id"/>
        </div>
    </div>
</template>

<script>
import ReplyMemeComponent from '../components/ReplyMemeComponent.vue';
import ListCommentComponent from "@/components/ListCommentComponent";

export default {
    name: "PostDetails",
    components: {
        ReplyMemeComponent,
        ListCommentComponent,
    },
    data() {
        return {
            userId: localStorage.getItem('userId'),
            id: window.location.href.split("/").slice(-1)[0],
            isAdmin: 0,
            title: "",
            fileUrl: "",
            createdAt: "",
            updatedAt: "",
            user: [],
            likes: [],
            comments: []
        }
    },
    mounted() {
        const url = "http://localhost:3000/api/post/" + this.id;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.title = data.title;
                this.fileUrl = data.fileUrl;
                this.createdAt = data.createdAt;
                this.updatedAt = data.updatedAt;
                this.user = data.user;
                this.likes = data.likes;
                this.comments = data.comments;
            })
            .catch(error => console.log(error));
    },
    methods: {
        deleteMeme(memeId) {
            if (window.confirm('Voulez-vous vraiment supprimer le meme ?')) {
                const url = "http://localhost:3000/api/post/" + memeId;
                const options = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                };
                fetch(url, options)
                    .then(() => {
                        alert("Le meme a bien été supprimé.")
                        window.location.replace("/")
                    })
                    .catch(error => console.log(error,));
            }
        },
        updateMeme(memeId) {
            this.$router.push({
                path: "/edit-post/" + memeId
            });
        },
        likeMeme(memeId) {
            const url = "http://127.0.0.1:3000/api/post/like/" + memeId;
            const options = {
                method: "POST",
                body: JSON.stringify({
                    userId: this.userId,
                    isLike: !this.isLike,
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
                })
                .catch(error => console.log(error));
        }
    },
    created: function () {
        const url = "http://localhost:3000/api/users/" + this.userId;
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.pseudo = data.pseudo;
                this.avatarUrl = data.avatarUrl;
                this.isAdmin = data.isAdmin;
                console.log('currentUser', this.isAdmin)
            })
            .catch(error => console.log(error,));
    },
}
</script>

<style lang="scss">
@import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

.meme {
    &__container {
        max-width: 600px;
        margin: 1em auto;
        box-shadow: 0px 0px 18px #ddd;
        border-radius: 20px;
        padding: 15px 20px 5px;
    }

    &__img {
        width: 100%;
        object-fit: cover;

    }
}

.interact {
    display: flex;
}

.header__meme {
    display: flex;
}

.footer__meme {
    text-align: left;
}

.header_user {
    display: flex;
}

.header_user {
    display: flex;
}

.params__meme {
    display: flex;
}

.params__meme i {
    font-size: 24px;
    margin: 13px;
    cursor: pointer;
}

.fa.fa-trash {
    color: #fd2d01;
}

.fa-pencil {
    color: #00b06b;
}

.header__meme {
    justify-content: space-between;
}

.footer__meme {
    display: flex;
    justify-content: space-between;
}

.like-container {
    display: flex;
}

.comment-container {
    display: flex;
}

.user__pseudo {
    text-align: left;
}

.admin-badge {
    color: #00b06b;
    padding: 3px 14px;
    font-size: 25px;
    margin-bottom: 2px;
}

.user__pseudo {
    text-align: left;
    display: flex;
    align-items: center;

    p {
        margin: 8px 0;
    }
}

.user__avatar {
    max-width: 65px;
    object-fit: cover;
    height: 65px;
    border-radius: 20px;
    margin-right: 20px;
}

.like-container {
    align-items: center;
}

.comment-container {
    align-items: center;
}

.like-container a {
    margin: 0 10px;
}

.comment-container i {
    margin: 0 10px;
}

</style>