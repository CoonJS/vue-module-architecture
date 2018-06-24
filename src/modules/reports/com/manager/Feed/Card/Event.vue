<script>

  export default {
    props: {
      date: {
        type: String,
        default() {
          return Date.now();
        }
      }
    },
    created() {
      /** @type {DateTime}*/
      this.dateTime = this.$locator.DateTime;
    },
    computed: {
      formattedDate() {
        const today = new Date().toDateString();
        const date = new Date(this.date).toDateString();
        const isToday = today === date;
        const format = isToday ? `H:MM`: 'dd.mm.yyyy H:MM';
        const formattedDate = this.dateTime.format(this.date, format);

        return isToday ? `Сегодня ${formattedDate}` : formattedDate;
      }
    }
  }
</script>

<template>
    <div class="event">
        {{formattedDate}}
        <slot></slot>
    </div>
</template>

<style scoped>
    .event {
        font-size: 12px;
        color: #979797;
    }
</style>