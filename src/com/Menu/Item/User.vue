<template>
    <div class="menu-item">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "UserMenuItem"
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
</style>