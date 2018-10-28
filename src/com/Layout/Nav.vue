<script>
export default {
  name: 'NavLayout'
};
</script>

<template>
  <div class="nav-layout">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="center">
      <slot name="center" />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
    .nav-layout {
        height: 46px;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0 12px;
        display: flex;
        background-image: linear-gradient(45deg, #274362, #4a84c2);
        justify-content: space-between;
        box-shadow: 0 0 1px rgba(0,0,0,0.25);
    }

    .left {
        display: flex;
        justify-content: flex-start;
    }

    .center {
        display: flex;
        justify-content: center;
    }

    .right {
        display: flex;
        justify-content: flex-end;
    }
</style>