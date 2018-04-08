<template>
    <router-link :to="link">
        <div class="menu-item">
            <slot></slot>
        </div>
    </router-link>
</template>

<script>
  export default {
    name: "MenuItemLink",
    props: {
      link: {
        type: String,
        default() {
          return '/';
        }
      }
    }
  }
</script>

<style scoped>
    .menu-item {
        cursor: pointer;
        padding: 16px;
        align-items: center;
        color: #fff;
        font-size: 12px;
    }

    .menu-item:hover {
        background-color: #0eb0fd;
    }

    .router-link-exact-active.router-link-active {
        background-color: #0eb0fd;
    }

    a {
        display: flex;
        align-items: center;
        height: 100%;
        color: #fff;
        text-decoration: none;
    }
</style>