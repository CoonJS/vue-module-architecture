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
    mounted() {
      this.focusInput();
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
    methods: {
      focusInput() {
        this.$refs.input.$el.querySelector('input').focus();
      }
    }
  }
</script>

<template>
    <el-input ref="input" placeholder="Название" v-model="name"/>
</template>

<style scoped>

</style>