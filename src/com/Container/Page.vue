<template>
    <div class="page-container">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "PageContainer"
  }
</script>

<style scoped>
    .page-container {
        margin-top: 48px;
        flex: 1;
        padding: 16px;

    }
</style>