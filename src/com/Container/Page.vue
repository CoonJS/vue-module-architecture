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
        flex: 1;
        padding: 16px;
        overflow: auto;
        margin-top: 48px;
    }
</style>