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
    }
  }
</script>

<template>
    <el-input placeholder="Название" v-model="name"/>
</template>

<style scoped>

</style>