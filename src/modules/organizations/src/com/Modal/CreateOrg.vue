<script>
export default {
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data () {
    return {
      name: '',
      show: this.value
    };
  },
  watch: {
    value(val) {
      this.show = val;

    },
    show(val) {
      this.$emit('input', val);
    }
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
    /** @type {ArrayUtils}*/
    this.array = this.$locator.ArrayUtils;
  },
  methods: {
    closeModal() {
      this.show = false;
    }
  }
};
</script>

<template>
  <el-dialog 
    :visible.sync="show" 
    title="Создание организации" 
    width="500px"
  >
    <div class="form">
      <div class="name">
        <div class="title">Название организации</div>
        <el-input 
          v-model="name" 
          placeholder="Название организации" 
          size="medium"
        />
      </div>
      <div class="name">
        <div class="title">Сокращенное название</div>
        <el-input 
          v-model="name" 
          placeholder="Сокращенное название" 
          size="medium"
        />
      </div>
      <div class="name">
        <div class="title">Название организации</div>
        <el-input 
          v-model="name" 
          placeholder="Название организации" 
          size="medium"
        />
      </div>
    </div>
    <div 
      slot="footer" 
      class="footer"
    >
      <el-button 
        type="success" 
        size="medium"
      >
        Создать
      </el-button>
      <el-button 
        size="medium" 
        @click="closeModal"
      >
        Отмена
      </el-button>
    </div>
  </el-dialog>
</template>

<style scoped>
    .name {
        margin-bottom: 16px;
    }

    .title {
        font-size: 12px;
        margin-bottom: 8px;
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
</style>