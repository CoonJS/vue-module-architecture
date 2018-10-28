<script>
export default {
  name: 'PageContainer',
  props: {
    flexContent: {
      type: Boolean,
      default() {
        return false;
      }
    },
    flexColumn: {
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
    };
  }
};
</script>

<template>
  <div class="page-container">
    <div 
      v-if="hasHeader" 
      class="page-header"
    >
      <slot name="header" />
    </div>
    <div
      :style="{width}"
      :class="{ 'offset': hasHeader, 'flex': flexContent, 'fluid': fluid, 'center': center, 'flex-column': flexColumn }"
      class="page-content"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped lang="less">
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

        &.offset {
            margin-top: 64px;
        }

        &.flex {
            display: flex;
        }

        &.flex.center {
            display: flex;
            justify-content: center;
        }

        &.fluid {
            padding: 0;
        }

        &.flex-column {
            display: flex;
            flex-direction: column;
        }
    }

    h3 {
        font-weight: 300;
        text-transform: uppercase;
        font-size: 12px;
    }

</style>