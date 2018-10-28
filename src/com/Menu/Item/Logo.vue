<script>
export default {
  name: 'MenuItemLogo'
};
</script>

<template>
  <router-link to="/">
    <div class="menu-item">
      <span class="name">Platform<sup class="beta">&nbsp;beta</sup></span>
    </div>
  </router-link>
</template>

<style scoped>
    .menu-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 14px 16px 14px 0;
        color: #fff;
        font-size: 10px;
        text-transform: uppercase;
    }

    a {
        display: flex;
        align-items: center;
        height: 100%;
        color: #fff;
        text-decoration: none;
    }
</style>