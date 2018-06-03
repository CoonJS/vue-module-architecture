<script>
  export default {
    name: "MenuItemFeedback",
    data() {
      return {
        isShowSidebar: false
      };
    },
    methods: {
      handleClick() {
        this.$emit('click');
      }
    }
  }
</script>

<template>
    <div class="menu-item">
        <el-button
            type="primary"
            size="mini"
            @click="handleClick"
        >
            Фидбэк
        </el-button>
    </div>
</template>

<style scoped>
    .menu-item {
        display: flex;
        cursor: pointer;
        padding: 16px;
        align-items: center;
        color: #fff;
        font-size: 12px;
    }
</style>