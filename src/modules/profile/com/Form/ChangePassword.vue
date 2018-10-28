<script>
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        };
      }
    }
  },
  data () {
    return {
      password: this.value
    };
  },
  watch: {
    value: {
      deep: true,
      handler(password) {
        this.password = password;
      }
    },
    password: {
      deep: true,
      handler(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<template>
  <el-form>
    <el-form-item label="Старый пароль">
      <el-input 
        v-model="password.oldPassword" 
        type="password"
      >
        <i 
          slot="prefix" 
          class="el-input__icon el-icon-edit"
        />
      </el-input>
    </el-form-item>
    <el-form-item label="Новый пароль">
      <el-input 
        v-model="password.newPassword" 
        type="password"
      >
        <i 
          slot="prefix" 
          class="el-input__icon el-icon-edit"
        />
      </el-input>
    </el-form-item>
    <el-form-item label="Подтверждение">
      <el-input 
        v-model="password.newPasswordConfirm" 
        type="password"
      >
        <i 
          slot="prefix" 
          class="el-input__icon el-icon-edit"
        />
      </el-input>
    </el-form-item>
  </el-form>
</template>