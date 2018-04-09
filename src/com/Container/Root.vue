<template>
    <div class="root-container">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "RootContainer"
  }
</script>

<style scoped>
    .root-container {
        flex: 1;
        display: flex;
        align-items: stretch;
        margin-top: 46px;
    }
</style>