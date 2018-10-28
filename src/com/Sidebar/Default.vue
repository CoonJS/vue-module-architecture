<script>
export default {
  name: 'Sidebar',
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      }
    },
    position: {
      type: String,
      default() {
        return 'right';
      }
    }
  }
};
</script>

<template>
  <transition name="slide-fade">
    <div 
      v-show="value" 
      class="sidebar"
    >
      <div class="sidebar-container">
        <div 
          v-if="$slots.header" 
          class="header"
        >
          <slot name="header" />
        </div>
        <div class="content">
          <slot />
        </div>
        <div class="footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
    .sidebar {
        display: flex;
        z-index: 1000;
        width: 420px;
        height: 100%;
        position: absolute;
        background-color: #fff;
        right: 0;
        transform: translateX(0);
        top: 0;
        box-shadow: 0 0 4px 0 #aaaaaa;
    }

    .sidebar-container {
        display: flex;
        flex-direction: column;
        position: relative;
        flex: 1;
    }

    .header {
        padding: 18px 16px;
        border-bottom: 1px solid #eee;
    }

    .content {
        padding: 16px;
        flex: 1;
        overflow: auto;
    }

    .footer {
        border-top: 1px solid #eee;
        padding: 18px 16px;
    }

    .slide-fade-enter-to {
        transition: all .5s;
    }

    .slide-fade-leave-active {
        transition: all .5s;
    }

    .slide-fade-enter {
        transform: translateX(100%);
    }

    .slide-fade-enter-to {
        transform: translateX(0);
    }

    .slide-fade-leave-to {
        transform: translateX(100%);
    }
</style>