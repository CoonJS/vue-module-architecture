<template>
    <div class="nav-layout">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "NavLayout"
  }
</script>

<style scoped>
    .nav-layout {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0 12px;
        display: flex;
        background-color: #171717;
        justify-content: space-between;
        box-shadow: 0 0 1px rgba(0,0,0,0.25);
    }

    .left {
        display: flex;
        justify-content: flex-start;
    }

    .right {
        display: flex;
        justify-content: flex-end;
    }
</style>