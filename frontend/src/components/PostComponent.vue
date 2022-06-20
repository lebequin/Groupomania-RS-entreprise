<template>
    <div v-for="meme in memes.data" :key="meme.memeId" class="meme__container">
        <div class="header__meme">
            <div class="header_user">
                <img :src="avatarUrl" alt="avatar utilisateur" class="user__avatar">
                <p class="user__pseudo">{{ pseudo }}</p>
            </div>
            <div v-if="meme.userId == userId || this.isAdmin == 'true'" class="params__meme">
                <div class="params__button" @click="updateMeme(meme.id)">
                    <i aria-hidden="true" class="fa fa-pencil"></i>
                </div>
                <div class="params__button" @click="deleteMeme(meme.id)">
                    <i aria-hidden="true" class="fa fa-trash"></i>
                </div>
            </div>
        </div>
        <div class="body__meme">
            <h2 class="meme__title">{{ meme.title }}</h2>
            <img :src="meme.fileUrl" alt="image" class="meme__img">
        </div>
        <div class="footer__meme">
            <p v-if="meme.updatedAt > meme.createdAt">Publié :{{ meme.createdAt }}</p>
            <p v-else>Mis à jour :{{ meme.updatedAt }}</p>
            <div class="like-container">
                <a @click="likeMeme(meme.id)">
                    <i v-if="isLike = false" aria-hidden="true" class="fa fa-heart"></i>
                    <i v-else aria-hidden="true" class="fa fa-heart" style="color:red"></i>
                </a>
                <p>{{ meme.likes.length }}</p>
            </div>
            <div class="comment-container">
                <a v-on:click="isHidden = !isHidden"><i class="fa fa-comment"></i></a>
                <p>{{ meme.comments.length }}</p>
            </div>
        </div>
        <div v-if="!isHidden" class="answer-container">
            <ReplyMemeComponent :memeId="meme.id" />
        </div>
    </div>
</template>

<script>
import ReplyMemeComponent from './ReplyMemeComponent.vue';
export default {
    name: "PostComponent",
    components: {
        ReplyMemeComponent,
    },
    data() {
        return {
            userId: localStorage.getItem('userId'),
            isAdmin: localStorage.getItem('isAdmin'),
            isLike: false,
            isHidden: true,
            pseudo: "",
            avatarUrl: "",
            memes: [],
        }
    },
    mounted() {
        const url = "http://localhost:3000/api/post";
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
                this.memes = data;
                console.log(data)
            })
            .catch(error => console.log(error));
    },
    methods: {
        deleteMeme(memeId) {
            const url = "http://localhost:3000/api/post/" + memeId;
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.memes = data;
                    window.location.reload();
                })
                .catch(error => console.log(error));
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
        max-width: 100%;
    }
}

.user__avatar {
    border-radius: 20px;
    max-width: 50px;
    margin-right: 20px;
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
</style>