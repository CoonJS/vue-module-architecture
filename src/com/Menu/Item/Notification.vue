<script>
  export default {
    props: {
      active: {
        type: Boolean,
        default() {
          return true;
        }
      }
    }
  }
</script>

<template>
    <div class="notification" :class="{'active': active}">
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<style scoped>
    .notification {
        cursor: pointer;
        background-color: #fff;
        padding: 8px 16px;
        height: 60px;
        border-bottom: 1px solid #eee;
    }

    .notification.active {
        background-color: #f3f3f3;
    }


    .notification:hover {
        background-color: #fbfbfb;
    }

    .notification.active:hover {
        background-color: #f1f1f1;
    }

    .notification span {
        font-size: 12px;
    }
</style>