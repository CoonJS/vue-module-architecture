<script>
export default {
  props: {
    value: {
      type: String,
      default() {
        return '';
      }
    }
  },
  data () {
    return {
      name: this.value
    };
  },
  watch: {
    name(val) {
      this.$emit('input', val);
    }
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    focusInput() {
      this.$refs.input.$el.querySelector('input').focus();
    }
  }
};
</script>

<template>
  <el-input 
    ref="input" 
    v-model="name" 
    placeholder="Название"
  />
</template>

<style scoped>

</style>