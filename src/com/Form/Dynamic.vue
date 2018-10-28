<script>
export default {
  name: 'DynamicForm',
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
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      form: this.value || {}
    };
  },
  watch: {
    value(val) {
      this.form = val;
      this.$emit('input', val);
    }
  }
};
</script>

<template>
  <el-form 
    :model="form" 
    :disabled="disabled" 
    size="medium"
  >
    <div 
      v-for="field in fields"
      :key="field.key"
      class="field"
    >
      <div class="label">{{ field.displayName }}</div>
      <el-form-item
        v-if="field.name !== 'type'"
        :key="field.name"
        :rules="[{ required: true }]"
      >
        <el-input v-model="form[field.name]" />
      </el-form-item>
    </div>
  </el-form>
</template>

<style scoped>
    .field {
        margin-bottom: 8px;

    }

    .field:last-child {
        margin-bottom: 0;
    }

    .label {
        font-size: 12px;
        margin-bottom: 8px;
    }
</style>