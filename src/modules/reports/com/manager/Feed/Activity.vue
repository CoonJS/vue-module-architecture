<script>
import EventCard from './Card/Event.vue';

export default {
  components: {
    EventCard
  },
  props: {
    events: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    todayEvents() {
      return this.events.filter(event => {
        const today = new Date().toDateString();
        const date = new Date(event.createdMoment).toDateString();
        return today === date;
      });
    },
    anotherEvents() {
      return this.events.filter(event => {
        const today = new Date().toDateString();
        const date = new Date(event.createdMoment).toDateString();
        return today !== date;
      });
    }
  }
};
</script>

<template>
  <div class="activity-wrapper">
    <div 
      v-if="todayEvents.length > 0" 
      class="time-label"
    >
      <div class="label">Сегодня</div>
    </div>
    <div 
      v-if="todayEvents.length > 0" 
      class="events-wrap"
    >
      <event-card
        v-for="event in todayEvents"
        :key="event.id"
        :event="event"
      />
    </div>
    <div 
      v-if="anotherEvents.length > 0 && todayEvents.length > 0" 
      class="time-label"
    >
      <div class="label">Остальные</div>
    </div>
    <div class="events-wrap">
      <event-card
        v-for="event in anotherEvents"
        :key="event.id"
        :event="event"
      />
    </div>
  </div>
</template>

<style scoped>
    .activity-wrapper {
        background-color: #eee;
        padding: 16px;
        border: 1px solid rgba(0,0,0, .2);
    }

    .time-label {
        margin-top: 12px;
        display: flex;
        width: 100%;
        justify-content: center;
        position: relative;
        border: 1px solid #eee;
    }

    .label {
        color: #6b6d72;
        position: absolute;
        top: -12px;
        padding: 4px 12px;
        font-size: 12px;
        background-color: #fff;
        border-radius: 12px;
    }

    .events-wrap {
        overflow: auto;
        padding: 8px;
        margin-top: 24px;
    }

    .event {
        margin: 8px 0;
    }

    .event-type {
        font-weight: bold;
    }

    .status {
        font-style: italic;
    }
</style>