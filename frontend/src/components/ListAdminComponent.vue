<template>
    <div class="admin-container">
        <h3>Admins</h3>
        <div v-for="admin in admins" :key="admin.id">

            <div class="admin-info">
                <img :src="admin.avatarUrl" alt="avatar utilisateur" class="user__avatar">
                <div class="user__pseudo">
                    <p>{{ admin.pseudo }} - {{ admin.email }}</p>
                </div>
                <div class="params__admin">
                    <div class="params__button" @click="updateUser(admin.id)">
                        <i aria-hidden="true" class="fa fa-pencil"></i>
                    </div>
                    <div class="params__button" @click="deleteUser(admin.id)">
                        <i aria-hidden="true" class="fa fa-trash"></i>
                    </div>
                </div>
                <!--p>{{ admin.createdAt.toString() }}</p-->
            </div>
        </div>
        <p>admin</p>
    </div>
</template>

<script>
import router from "@/router";
import EditAccount from "@/views/EditAccount";

export default {
    name: 'ListAdminComponent',
    data() {
        return {
            token: localStorage.getItem("token"),
            admins: [],
        }
    },
    mounted() {
        const url = `http://localhost:3000/api/users/admin`;
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
                this.admins = data;
                console.log(this.admins)
            })
            .catch(error => console.log(error,));
    },
    methods: {
        deleteUser: function () { //Fonction permettant à utilisateur de supprimer son compte
            let userId = localStorage.getItem("userId");

            if (window.confirm('Voulez-vous vraiment supprimer le compte ?')) {
                const url = 'http://localhost:3000/api/users/' + userId;
                console.log(url);
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

        updateUser: function () {
            router.push(EditAccount)
        }
    }
}
</script>

<style lang="scss">
@import url("../assets/css/general.scss");

.admin-container {
    max-width: 400px;
    margin: 2em auto;
    box-shadow: 0px 0px 31px -10px #aaa;
    border-radius: 24px;
    padding: 40px;
}

.admin-info {
    display: flex;
    justify-content: space-between;

}

.params__admin {
    display: flex;
}

.params__admin i {
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

.admin-info {
    display: flex;
}

</style>