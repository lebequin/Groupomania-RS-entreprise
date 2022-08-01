<template>
    <p class="error-message">{{ error }}</p>
</template>

<script>
export default {
    name: "ErrorMessageComponent",
    props: ['error'],
}

</script>

<style>
.error-message {
    border: 1px solid #ff4444;
    border-radius: 10px;
    padding: 5px;
    background: #fFdddd;
}
</style>