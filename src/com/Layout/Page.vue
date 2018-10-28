<template>
  <div class="page-layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageLayout'
};
</script>

<style scoped>
    .page-layout {
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #fff;
    }
</style>