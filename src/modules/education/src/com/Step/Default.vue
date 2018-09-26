<script>
  export default {
    props: {
      number: {
        type: Number
      }
    },
    mounted() {
    }
  }
</script>

<template>
    <div class="step">{{number}}</div>
</template>

<style lang="less" scoped>
    .step {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 16px;
        width: 100px;
        background: rgba(0,0,0,.05);
        height: 100px;
        margin: 8px;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
</style>