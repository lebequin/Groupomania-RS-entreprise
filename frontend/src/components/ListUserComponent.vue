<template>
    <div class="user-container">
        <h3>Utilisateurs</h3>
        <div v-for="user in users" :key="user.id">

            <div class="user-info">
                <img :src="user.avatarUrl" alt="avatar utilisateur" class="user__avatar">
                <div class="user__pseudo">
                    <p>{{ user.pseudo }} - {{ user.email }}</p>
                </div>
                <div class="params__user">
                    <div class="params__button" @click="updateUser(user.id)">
                        <i aria-hidden="true" class="fa fa-pencil"></i>
                    </div>
                    <div class="params__button" @click="deleteUser(user.id)">
                        <i aria-hidden="true" class="fa fa-trash"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ListUserComponent",
    data() {
        return {
            token: localStorage.getItem("token"),
            users: [],
        }
    },
    mounted() {
        const url = `http://localhost:3000/api/users/`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token,
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.users = data;
                console.log(this.users)
            })
            .catch(error => console.log(error,));
    },
    methods: {
        deleteUser: function () { //Fonction permettant à utilisateur de supprimer son compte
            let userId = localStorage.getItem("userId");

            if (window.confirm('Voulez-vous vraiment supprimer le compte ?')) {
                const url = 'http://localhost:3000/api/users/' + userId;
                const options = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + this.token,
                    }
                };
                fetch(url, options)
                    .then(() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        alert("Le compte a bien été supprimé.")
                        window.location.reload()
                    })
                    .catch(error => console.log(error,));
            }
        },

        updateUser: function (userId) {
            this.$router.push('/edit-account/' + userId)
        }
    }
}
</script>

<style scoped>
.user-container {
    max-width: 400px;
    margin: 2em auto;
    box-shadow: 0px 0px 31px -10px #aaa;
    border-radius: 24px;
    padding: 40px;
}

.user-info {
    display: flex;
    justify-content: space-between;

}

.params__user {
    display: flex;
}

.params__user i {
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

.user-info {
    display: flex;
}
</style>