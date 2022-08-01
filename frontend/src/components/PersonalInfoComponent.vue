<template>
    <!--Espace personnel utilisateur-->
    <div id="account">
        <div class="avatar">
            <img :alt="$data.pseudo" :src="$data.avatarUrl"/>
        </div>
        <div class="container-account">
            <h4 id="pseudo">{{ pseudo }}</h4>
            <h4>Identifiant : {{ id }}</h4>
            <h4>email : {{ email }}</h4>
            <div class="action">
                <button class="btn" @click="updateUser">Modifier mes informations</button>
                <button class="btn--secondary" @click="deleteUser">Supprimer mon compte</button>
            </div>
        </div>
    </div>
</template>

<script>
import EditAccount from "@/views/EditAccount";
import router from "@/router";

export default {
    name: 'PersonalInfoComponent',
    data() {
        return {
            token: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
            id: '',
            email: '',
            pseudo: '',
            avatarUrl: '',
        }
    },
    mounted() {
        //Appel à API pour affichage des infos utilisateur

        const url = `http://localhost:3000/api/users/` + this.userId;
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
                this.id = data.id;
                this.email = data.email;
                this.pseudo = data.pseudo;
                this.avatarUrl = data.avatarUrl;
            })
            .catch(error => console.log(error,));
    },
    methods: {
        deleteUser: function () { //Fonction permettant à utilisateur de supprimer son compte

            if (window.confirm('Voulez-vous vraiment supprimer le compte ?')) {
                const url = 'http://localhost:3000/api/users/' + this.userId;
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
                        alert("Votre compte a bien été supprimé.")
                        window.location.replace("/")
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

#account {
    max-width: 400px;
    margin: 2em auto;
    box-shadow: 0px 0px 31px -10px #aaa;
    border-radius: 24px;
    padding: 40px;
}

.action {
    display: flex;
    flex-direction: column;
}

</style>