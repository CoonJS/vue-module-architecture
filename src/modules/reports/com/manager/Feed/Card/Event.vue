<script>

export default {
  props: {
    event: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    formattedDate() {
      const today = new Date().toDateString();
      const date = new Date(this.event.createdMoment).toDateString();
      const isToday = today === date;
      const format = isToday ? 'H:MM': 'dd.mm.yyyy H:MM';
      const formattedDate = this.dateTime.format(this.date, format);

      return isToday ? `Сегодня ${formattedDate}` : formattedDate;
    },
    isCreateStatus() {
      return this.event.type === 'DEAL_CREATED';
    },
    isUpdateStatus() {
      return this.event.type === 'STATUS_UPDATED';
    },
    isDeleteStatus() {
      return this.event.type === 'DEAL_DELETED';
    }
  },
  created() {
    /** @type {DateTime}*/
    this.dateTime = this.$locator.DateTime;
  },
};
</script>

<template>
  <div class="event">
    <div>{{ formattedDate }}</div>
    <div class="event-type">
      <el-tag 
        v-if="isCreateStatus" 
        type="success" 
        size="mini"
      >
        Создание сделки #{{ event.dealId }}
      </el-tag>
      <el-tag 
        v-if="isUpdateStatus" 
        size="mini"
      >
        Обновление сделки #{{ event.dealId }}
      </el-tag>
      <el-tag 
        v-if="isDeleteStatus" 
        type="danger" 
        size="mini"
      >
        Удаление сделки #{{ event.dealId }}
      </el-tag>
    </div>
    <div class="event-description">
      <span v-if="isCreateStatus">
        <span><i>{{ event.newStatus }}</i></span>
      </span>
      <span v-if="isUpdateStatus">
        <span><i>{{ event.newStatus }}</i></span>
        <span>из</span>
        <span><i>{{ event.oldStatus }}</i></span>
      </span>
      <span v-if="isDeleteStatus">
        <span><i>{{ event.newStatus }}</i></span>
      </span>
    </div>
  </div>
</template>

<style scoped>
    .event {
        display: flex;
        align-items: center;
        font-size: 12px;
        white-space: nowrap;
        color: #979797;
    }

    .event-type {
        margin-left: 8px;
    }

    .event-description {
        margin-left: 8px;
    }

    .cursive {

    }
</style>