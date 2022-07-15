<template>
    <PersonalInfoComponent/>
    <div v-if="isAdmin == 1">
        <ListAdminComponent/>
        <ListUserComponent/>
    </div>
</template>

<script>
import PersonalInfoComponent from "@/components/PersonalInfoComponent";
import ListAdminComponent from "@/components/ListAdminComponent";
import ListUserComponent from "@/components/ListUserComponent";

export default {
    name: 'AccountView',
    components: {
        PersonalInfoComponent,
        ListAdminComponent,
        ListUserComponent,
    },
    data() {
        return {
            userId: localStorage.getItem('userId'),
            isAdmin: 0,
        }
    },
    mounted() {
        //Appel à API pour affichage des infos utilisateur
        let token = localStorage.getItem("token");

        const url = `http://localhost:3000/api/users/${this.userId}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.isAdmin = data.isAdmin;
            })
            .catch(error => console.log(error,));
    },
}
</script>

<style lang="scss">
@import url("../assets/css/general.scss");

</style>
