<script>
  export default {
    props: {
      active: {
        type: Boolean,
        default() {
          return true;
        }
      },
      date: {
        type: String
      },
      type: {
        type: String
      }
    },
    methods: {
      handleClick() {
        if (this.type === 'ADD_FIRST_INTEGRATION') {
          this.addFirstIntegrationHandler();
          return;
        }
      },
      addFirstIntegrationHandler() {
        this.$emit('click');
        this.$router.push('/marketplace');
      }
    }
  }
</script>

<template>
    <div class="notification" :class="{'active': active}" @click="handleClick">
        <div class="status">
            <div class="dot" :class="{'active': active}">

            </div>
        </div>
        <div class="content">
            <div class="text">
                <slot></slot>
            </div>
            <div class="date">
                <span>{{date}}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .notification {
        display: flex;
        cursor: pointer;
        background-color: #fff;
        padding: 8px 16px 8px 0;
        min-height: 60px;
        border-bottom: 1px solid #eee;
    }

    .notification.active {
        background-color: #f3f3f3;
    }

    .notification:hover {
        background-color: #f1f1f1;
    }

    .notification.active:hover {
        background-color: #e1e1e1;
    }

    .notification .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        font-size: 12px;
    }

    .text {
        flex: 1;
    }

    .date {
        font-size: 11px;
        display: flex;
        justify-content: flex-end;
        color: rgba(0,0,0, .4);
    }
    .status {
        margin: 0 8px;
        width: 16px;
        height: 16px;
    }

    .dot {
        height: 12px;
        width: 12px;
        border: 1px solid #888;
        background-color: #e8e8e8;
        border-radius: 50%;
        display: inline-block;
    }

    .dot.active {
        background-color: #34bdff;
    }
</style>