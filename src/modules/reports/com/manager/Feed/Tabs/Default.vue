<script>
export default {
  props: {
    value: {
      type: String,
      default() {
        return 'activity';
      }
    }
  },
  data() {
    return {
      tabPosition: this.value
    };
  },
  watch: {
    tabPosition(val) {
      this.$emit('input', val);
    }
  }
};
</script>

<template>
  <el-radio-group 
    v-model="tabPosition" 
    size="mini">
    <el-radio-button label="activity">Активность</el-radio-button>
    <el-radio-button label="sales">Сделки</el-radio-button>
  </el-radio-group>
</template>
