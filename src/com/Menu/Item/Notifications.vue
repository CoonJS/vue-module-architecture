<script>
import Notification from './Notification.vue';

export default {
  name: 'MenuItemNotifications',
  components: {
    Notification
  },
  data() {
    return {
      page: 0,
      total: 0,
      show: false,
      loading: false,
      notifications: []
    };
  },
  computed: {
    count() {
      return this.notifications.filter(notification => notification.read === false).length;
    },
    isShowLoadButton() {
      return this.notifications.length !== this.total;
    }
  },
  watch: {
    '$route': {
      handler() {
        this.checkNotifications();
      }
    }
  },
  created() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
    /** @type {DateTime}*/
    this.dateTime = this.$locator.DateTime;
  },
  mounted() {
    this.loadNotifications();
  },
  methods: {
    async checkNotifications() {
      const { data: notifications } = await this.api.get('notificationsUsingGET', {}, {
        size: 10,
        page: 0,
        sort: 'createdMoment,desc'
      });

      this.notifications = notifications.content;
    },
    async loadNotifications() {
      this.loading = true;

      const { data: notifications } = await this.api.get('notificationsUsingGET', {}, {
        size: 25,
        page: this.page,
        sort: 'createdMoment,desc'
      });

      this.notifications = [ ...this.notifications, ...notifications.content ];
      this.total = notifications.totalElements;

      this.loading = false;
    },
    async readAll() {
      await this.api.put('readNotificationsUsingPUT');
      this.checkNotifications();
    },
    async readNotification(notification) {
      if (notification.read === true) {
        return;
      }

      await this.api.put('readNotificationUsingPUT', { id: notification.id });
      this.checkNotifications();
    },
    handleClick() {
      this.page = this.page + 1;
      this.loadNotifications();
    },
    handleVisibleChange(isVisible) {
      this.show = isVisible;
    },
    formatDate(date) {
      return this.dateTime.format(date);
    }
  }
};
</script>

<template>
  <el-dropdown 
    trigger="click" 
    placement="bottom-start" 
    @visible-change="handleVisibleChange"
  >
    <div class="menu-item">
      <el-badge 
        :value="count" 
        :max="99" 
        :hidden="count === 0" 
        class="item"
      >
        <i 
          :class="{ active: show }" 
          class="el-icon-bell"
        />
      </el-badge>
    </div>
    <el-dropdown-menu slot="dropdown">
      <div class="header">
        <span>Уведомления</span>
        <el-button 
          type="text" 
          @click="readAll"
        >
          Прочитать все
        </el-button>
      </div>
      <div class="body">
        <notification
          v-for="notification in notifications"
          :key="notification.id"
          :active="!notification.read"
          :type="notification.type"
          :entity-id="notification.entityId"
          :date="formatDate(notification.createdMoment)"
          @click="readNotification(notification)"
        >
          {{ notification.text }}
        </notification>

        <div 
          v-if="isShowLoadButton" 
          class="load-button"
        >
          <el-button
            :loading="loading"
            type="text"
            @click="handleClick"
          >
            Загрузить еще
          </el-button>
        </div>
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

    .load-button {
        display: flex;
        justify-content: center;
    }
</style>