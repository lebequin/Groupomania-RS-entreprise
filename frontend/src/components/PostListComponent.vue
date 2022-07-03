<template>
    <div v-for="meme in memes.data" :key="meme.id" class="meme__container">
        <div class="header__meme">
            <div class="header_user">
                <img :src="meme.user.avatarUrl" alt="avatar utilisateur" class="user__avatar">
                <div class="user__pseudo">
                    <p @click="postDetails(meme.id)">{{ meme.user.pseudo }}</p>
                    <i v-if="meme.user.isAdmin == 1" aria-hidden="true" class="fa fa-id-badge admin-badge"></i>
                </div>
            </div>
        </div>
        <div class="body__meme">
            <h2 class="meme__title">{{ meme.title }}</h2>
            <img :src="meme.fileUrl" alt="image" class="meme__img">
        </div>
        <div class="footer__meme">
            <p v-if="meme.updatedAt > meme.createdAt">Publié
                :{{ new Date(meme.createdAt).toLocaleString("fr-FR") }}</p>
            <p v-else>Mis à jour :{{ new Date(meme.createdAt).toLocaleString("fr-FR") }}</p>
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
    </div>
</template>

<script>

export default {
    name: "PostListComponent",

    data() {
        return {
            userId: localStorage.getItem('userId'),
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
        postDetails(memeId) {
            this.$router.push({
                path: "/view-post/" + memeId
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
</style>