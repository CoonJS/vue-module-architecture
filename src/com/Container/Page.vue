<script>
  export default {
    name: "PageContainer",
    props: {
      flexContent: {
        type: Boolean,
        default() {
          return false;
        }
      },
      fluid: {
        type: Boolean,
        default() {
          return false;
        }
      },
      center: {
        type: Boolean,
        default() {
          return false;
        }
      },
      width: {
        type: String,
        default() {
          return '100%';
        }
      }
    },
    data() {
      return {
        hasHeader: this.$slots.header !== undefined
      }
    }
  }
</script>

<template>
    <div class="page-container" >
        <div class="page-header" v-if="hasHeader">
            <slot name="header"></slot>
        </div>
        <div
            class="page-content"
            :style="{width}"
            :class="{ 'offset': hasHeader, 'flex': flexContent, 'fluid': fluid, 'center': center }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .page-container {
        display: flex;
        flex: 1;
        justify-content: center;
        width: 100%;
        position: relative;
        background: #fff;
    }

    .page-header {
        display: flex;
        align-items: center;
        padding: 12px;
        position: absolute;
        top: 0;
        left: 0;
        height: 64px;
        background: #4a84c217;
        width: 100%;
        box-shadow: 1px 0 1px #cecece;
    }

    .page-content {
        width: 100%;
        overflow: auto;
        padding: 12px;
        background: #ced2d517;
    }

    .page-content.offset {
        margin-top: 64px;
    }

    .page-content.flex {
        display: flex;
    }

    .page-content.flex.center {
        display: flex;
        justify-content: center;
    }

    .page-content.fluid {
        padding: 0;
    }
</style>