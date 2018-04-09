<template>
    <div class="page-container">
        <div class="page-header" v-if="hasHeader">
            <slot name="header"></slot>
        </div>
        <div class="page-content" :class="hasHeader && 'offset'">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "PageContainer",
    data() {
      return {
        hasHeader: this.$slots.header !== undefined
      }
    }
  }
</script>

<style scoped>
    .page-container {
        display: flex;
        flex: 1;
        width: 100%;
        position: relative;
        background: #fff;
    }

    .page-header {
        padding: 12px;
        position: absolute;
        top: 0;
        left: 0;
        height: 64px;
        background: #fbfbfb;
        width: 100%;
        box-shadow: 1px 0 1px #cecece;
    }

    .page-content {
        flex: 1;
        overflow: auto;
        padding: 12px;
        width: 100%;
    }

    .page-content.offset {
        margin-top: 64px;
    }
</style>