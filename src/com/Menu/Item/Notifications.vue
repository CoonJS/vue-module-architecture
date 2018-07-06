<script>
  import Notification from './Notification.vue';

  export default {
    name: "MenuItemNotifications",
    components: {
      Notification
    },
    created() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data() {
      return {
        show: false,
        value: 18,
        count: 18
      };
    },
    methods: {
      handleVisibleChange(isVisible) {
        this.show = isVisible;
      }
    }
  }
</script>

<template>
    <el-dropdown trigger="click" @visible-change="handleVisibleChange" placement="bottom-start">
        <div class="menu-item">
            <el-badge :value="value" :max="99" :hidden="value === 0" class="item">
                <i class="el-icon-bell" :class="{ active: show }"/>
            </el-badge>
        </div>
        <el-dropdown-menu slot="dropdown">
            <div class="header">
                <span>Уведомления</span>
                <el-button type="text">Прочитать все</el-button>
            </div>
            <div class="body">

                    <notification v-for="i in count" :key="i" :active="i % 2 === 0">
                        Майкл Джей Фокс больше не снимается в кино из-за болезни Паркинсона, но след в истории он уже оставил.
                    </notification>
            </div>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<style scoped>
    .menu-item {
        height: 100%;
        display: flex;
        cursor: pointer;
        padding: 0 16px;
        align-items: center;
        color: #fff;
        font-size: 12px;
    }

    .el-dropdown {
        justify-content: center;
        display: flex;
        align-items: center;
    }

    i {
        font-size: 24px;
        color: #ccc;
    }

    i.active {
        color: #fff;
    }

    .header {
        background-color: #fbfbfb;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        height: 40px;
        border-bottom: 1px solid #ddd;
    }

    .header span {
        font-size: 14px;
    }

    .body {
        width: 400px;
        height: 500px;
        overflow-y: auto;
    }



    .el-dropdown-menu {
        padding: 0;
    }
</style>