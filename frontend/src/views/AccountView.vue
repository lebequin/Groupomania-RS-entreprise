<template>
    <PersonalInfoComponent/>
    <div v-if="isAdmin == 1">
        <ListAdminComponent/>
    </div>
</template>

<script>
import PersonalInfoComponent from "@/components/PersonalInfoComponent";
import ListAdminComponent from "@/components/ListAdminComponent";

export default {
    name: 'AccountView',
    components: {
        PersonalInfoComponent,
        ListAdminComponent,
    },
    data() {
        return {
            isAdmin: localStorage.getItem('isAdmin'),
        }
    }
}
</script>

<style lang="scss">
@import url("../assets/css/general.scss");

</style>
