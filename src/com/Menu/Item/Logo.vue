<template>
    <router-link to="/">
        <div class="menu-item">
            Platform<sup class="beta">&nbsp;&beta;</sup>
        </div>
    </router-link>
</template>

<script>
  export default {
    name: "MenuItemLogo",
  }
</script>

<style scoped>
    .menu-item {
        cursor: pointer;
        padding: 16px 16px 16px 0;
        align-items: center;
        color: #fff;
        font-size: 12px;
    }

    a {
        display: flex;
        align-items: center;
        height: 100%;
        color: #fff;
        text-decoration: none;
    }
</style>