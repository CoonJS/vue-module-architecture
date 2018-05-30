<script>
  import ChangePasswordForm from './com/Form/ChangePassword.vue';

  export default {
    components: {
      ChangePasswordForm
    },
    mounted() {
      this.loadUser();
    },
    data () {
      return {
        user: null,
        isUserLoading: false,
        isShowChangePasswordForm: false,
        password: {
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        },
        showPasswordHint: false
      }
    },
    computed: {
      hasUser() {
        return this.user !== null;
      },
      isEmptyFields() {
        const { oldPassword, newPassword, newPasswordConfirm } = this.password;
        return oldPassword.trim() === '' || newPassword.trim() === '' || newPasswordConfirm.trim() === '';
      },
      isUnsafe() {
        const { newPassword } = this.password;
        return newPassword.length < 8;
      },
      isNotMatch() {
        const { newPassword, newPasswordConfirm } = this.password;
        return newPassword !== newPasswordConfirm;
      },
      hasInputError() {
        return this.isEmptyFields || this.isUnsafe || this.isNotMatch;
      }
    },
    watch: {
      password: {
        deep: true,
        handler() {
          this.showPasswordHint = false;
        }
      }
    },
    methods: {
      async loadUser() {
        this.isUserLoading = true;
        const { data: user } = await this.$locator.Api.get('currentUserUsingGET');
        this.user = user;
        this.isUserLoading = false;
      },
      async changePassword() {
        if (this.hasInputError) {
          this.showPasswordHint = true;
          return;
        }

        await {};
        // this.closeChangePasswordForm();
      },
      showChangePasswordForm() {
        this.isShowChangePasswordForm = true;
      },
      closeChangePasswordForm() {
        this.isShowChangePasswordForm = false;
      }
    }
  }
</script>

<template>
    <page-container v-loading.body="isUserLoading">
        <div slot="header" class="title">
            <h3>Профиль</h3>
        </div>
        <div class="form-wrapper">
            <el-form v-if="hasUser" label-width="100px" style="width: 500px;">
                <el-form-item label="Имя">
                    <el-input v-model="user.firstName" />
                </el-form-item>
                <el-form-item label="Фамилия">
                    <el-input v-model="user.lastName" />
                </el-form-item>
                <el-form-item label="Почта">
                    <el-input v-model="user.email" disabled/>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="showChangePasswordForm">Сменить пароль</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-dialog :visible.sync="isShowChangePasswordForm" title="Смена пароля" width="480px">
            <change-password-form v-model="password"/>
            <el-tag v-if="showPasswordHint && isEmptyFields" type="danger" class="hint">Заполните пустые поля</el-tag>
            <el-tag v-if="showPasswordHint && isUnsafe" type="danger" class="hint">Длина нового пароля должна быть не менее 8 символов</el-tag>
            <el-tag v-if="showPasswordHint && isNotMatch" type="danger" class="hint">Пароли не совпадают</el-tag>
            <div slot="footer">
                <el-button type="success" @click="changePassword">Сохранить</el-button>
                <el-button @click="closeChangePasswordForm">Отмена</el-button>
            </div>
        </el-dialog>
    </page-container>
</template>

<style scoped>
    .title {
        display: flex;
        align-items: center;
    }

    .form-wrapper {
        margin-top: 16px;
    }

    .hint {
        margin: 4px 0;
    }
</style>