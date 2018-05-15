<script>
  export default {
    name: "DynamicForm",
    props: {
      fields: {
        type: Array,
        default() {
          return [];
        }
      },
      value: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        form: this.value || {}
      }
    },
    watch: {
      value(val) {
        this.form = val;
        this.$emit('input', val);
      }
    }
  }
</script>

<template>
    <el-form :model="form" label-width="150px">
        <el-form-item
            v-for="field in fields"
            v-if="field.name !== 'type'"
            :key="field.name"
            :label="field.displayName"
            :rules="[{ required: true }]"
        >
            <el-input v-model="form[field.name]" />
        </el-form-item>
    </el-form>
</template>

<style scoped>

</style>