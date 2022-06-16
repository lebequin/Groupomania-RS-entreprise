<template>
    <div v-for="meme in memes.data" :key="meme.memeId" class="meme__container">
        <div class="header__meme">
            <div class="header_user">
                <img :src="avatarUrl" alt="avatar utilisateur" class="user__avatar">
                <p class="user__pseudo">{{ pseudo }}</p>
            </div>
            <div v-if="meme.userId == userId || this.isAdmin == 'true' " class="params__meme">
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
        </div>
    </div>
</template>

<script>
export default {
    name: "PostComponent",
    data() {
        return {
            userId: localStorage.getItem('userId'),
            isAdmin: localStorage.getItem('isAdmin'),
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
                console.log(data)
                this.memes = data;
                console.log('memes', this.memes)
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
                .then(memes => {
                    this.memes = memes;
                    window.location.reload();
                })
                .catch(error => console.log(error));
        },
        updateMeme(memeId) {
            this.$router.push({
                path: "/edit-post/" + memeId
            });
        },
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
                console.log('curent user : ', data)
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

</style>