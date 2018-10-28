<script>
export default {
  name: 'UiLink',
  props: {
    to: {
      type: String,
      default() {
        return '#';
      }
    }
  }
};
</script>

<template>
  <router-link :to="to">
    <slot />
  </router-link>
</template>

<style scoped>
    a {
        text-decoration: none;
        font-size: 14px;
        color: #409eff;
    }

    a:hover {
        color: #49BEFF;
    }
</style>