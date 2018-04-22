<script>
  export default {
    props: {
      value: {
        type: Object
      }
    },
    data() {
      return {
        form: this.value || {
          login: '',
          subdomain: '',
          token: ''
        }
      };
    }
  }
</script>

<template>
    <div class="settings-form">
        <h4 class="title">Настройка интеграции с AmoCRM</h4>
        <div class="form">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item
                    label="Логин"
                    prop="login"
                    :rules="[{
                        required: true,
                        message: 'Требуется логин'
                    }]"
                >
                    <el-input v-model="form.login"/>
                </el-form-item>
                <el-form-item
                    label="Субдомен"
                    prop="subdomain"
                    :rules="[{
                        required: true,
                        message: 'Требуется заполнить субдомен'
                    }]"
                >
                    <el-input v-model="form.subdomain"/>
                </el-form-item>
                <el-form-item
                    label="Токен"
                    prop="token"
                    :rules="[{
                        required: true,
                        message: 'Требуется заполнить токен'
                    }]"
                >
                    <el-input v-model="form.token"/>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
    .form {
        margin-top: 16px;
    }

    .settings-form {

    }

    .title {
        color: #333;
    }
</style>