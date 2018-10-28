<template>
  <router-link :to="link">
    <div class="menu-item">
      <i :class="`el-icon-${icon}`" />
      <slot />
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'MenuItemIcon',
  props: {
    link: {
      type: String,
      default() {
        return '/';
      }
    },
    icon: {
      type: String,
      default() {
        return null;
      }
    }
  }
};
</script>

<style scoped>
    .menu-item {
        display: flex;
        cursor: pointer;
        padding: 0 16px;
        align-items: center;
        color: #fff;
        font-size: 12px;
    }

    .menu-item:hover {
        background-color: #214367a3;
    }

    .router-link-exact-active.router-link-active {
        background-color: #214367a3;
    }

    a {
        display: flex;
        align-items: stretch;
        height: 100%;
        color: #fff;
        text-decoration: none;
    }

    i {
        font-size: 24px;
    }
</style>