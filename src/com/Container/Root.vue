<script>
export default {
  name: 'RootContainer'
};
</script>

<template>
  <div class="root-container">
    <slot />
  </div>
</template>

<style scoped>
    .root-container {
        flex: 1;
        display: flex;
        align-items: stretch;
        margin-top: 46px;
    }
</style>