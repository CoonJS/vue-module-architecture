<script>
export default {
  name: 'UiModelViewCard',
  props: {
    model: {
      type: Object,
      default() {
        return {};
      }
    },
    groups: {
      type: Array,
      default() {
        return [];
      }
    },
    titleWidth: {
      type: String,
      default() {
        return '120px';
      }
    }
  },
  beforeCreate() {
    /** @type {ObjectUtils}*/
    this.objectUtils = this.$locator.ObjectUtils;
  },
  methods: {
    getValueByPath(obj, path) {
      return this.objectUtils.deepFindByPath(obj, path);
    }
  }
};
</script>

<template>
  <div>
    <div 
      v-for="group in groups" 
      :key="group.id" 
      class="group"
    >
      <h4 
        v-if="group.title" 
        class="group-title"
      >
        {{ group.title }}
      </h4>
      <div 
        v-for="field in group.fields" 
        :key="field.key" 
        class="field"
      >
        <div 
          :style="{ 'width': titleWidth }" 
          class="title"
        >
          {{ field.title }}
        </div>
        <div class="value">{{ getValueByPath(model, field.key) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

    .group {
        margin-bottom: 16px;
    }

    .group:last-child {
        margin-bottom: 0;
    }

    .group-title {
        margin-bottom: 8px;
    }

    .field {
        padding: 4px 0;
        display: flex;
        align-items: center;
    }

    .title {
        font-size: 14px;
        color: #888;
    }

    .value {
        font-size: 14px;
    }
</style>