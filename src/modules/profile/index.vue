<script>
import ChangePasswordForm from './com/Form/ChangePassword.vue';

export default {
  components: {
    ChangePasswordForm
  },
  data () {
    return {
      user: null,
      userRole: null,
      isUserLoading: false,
      isShowChangePasswordForm: false,
      password: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
      showPasswordHint: false,
      authorityGroups: [],
      groupedAuthorities: {}
    };
  },
  computed: {
    hasUser() {
      return this.user !== null;
    },
    hasUserRole() {
      return this.userRole !== null;
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
    },
    groupKeys() {
      return Object.keys(this.groupedAuthorities).filter(key => {
        return this.groupedAuthorities[key].filter(authority => authority.checked === true).length > 0;
      });
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
  created() {
    /**@type {Api}*/
    this.api = this.$locator.Api;
    /** @type {ArrayUtils}*/
    this.array = this.$locator.ArrayUtils;
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      this.isUserLoading = true;
      const { data: user } = await this.api.get('currentUserUsingGET');
      const { data: meta } = await this.api.get('metadataUsingGET');
      const { data: userRole } = await this.api.get('roleUsingGET', { id: user.roleId });

      const { authorities, authorityGroups } = meta;
      const preparedAuthorities = authorities.map(authority => {
        return { ...authority, checked: user.authorities.includes(authority.name) };
      });
      this.groupedAuthorities = this.array.groupBy(preparedAuthorities, 'group');
      this.authorityGroups = this.array.indexBy(authorityGroups, 'name');


      this.user = user;
      this.userRole = userRole;
      this.isUserLoading = false;
    },
    async changePassword() {
      if (this.hasInputError) {
        this.showPasswordHint = true;
        return;
      }

      await this.updateUserData();
      this.closeChangePasswordForm();
    },
    async updateUserData() {
      const password = this.hasInputError ? undefined : this.password.newPassword;
      const newUserData = {
        password,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      };

      return await this.api.put('updatedCurrentUserUsingPUT', {}, newUserData);
    },
    isShowGroup(key) {
      return this.groupedAuthorities[key].filter(authority =>authority.checked === true).length > 0;
    },
    showChangePasswordForm() {
      this.isShowChangePasswordForm = true;
    },
    closeChangePasswordForm() {
      this.isShowChangePasswordForm = false;
    }
  }
};
</script>

<template>
  <page-container v-loading.body="isUserLoading">
    <div 
      slot="header" 
      class="title"
    >
      <h3>Профиль</h3>
    </div>
    <div class="form-wrapper">
      <el-card 
        class="user-info" 
        shadow="hover"
      >
        <div slot="header">
          Персональные данные
        </div>
        <el-form v-if="hasUser">
          <el-form-item>
            <div>Имя</div>
            <el-input 
              v-model="user.firstName" 
              @blur="updateUserData"
            />
          </el-form-item>
          <el-form-item>
            <div>Фамилия</div>
            <el-input 
              v-model="user.lastName" 
              @blur="updateUserData"
            />
          </el-form-item>
          <el-form-item>
            <div>Почта</div>
            <el-input 
              v-model="user.email" 
              disabled
            />
          </el-form-item>
          <el-form-item>
            <el-button 
              type="info" 
              @click="showChangePasswordForm"
            >
              Сменить пароль
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card 
        class="access" 
        shadow="hover"
      >
        <div 
          v-if="hasUserRole" 
          slot="header"
        >
          <span>Роль:</span>
          <ui-link :to="`/roles/${user.roleId}`">{{ userRole.name }}</ui-link>
        </div>
        <div
          v-for="key in groupKeys"
          :key="key"
          class="group"
        >
          <h4>{{ authorityGroups[key].displayName }}</h4>
          <div 
            v-for="authority in groupedAuthorities[key]" 
            :key="authority.name"
          >
            <el-tag 
              v-if="authority.checked" 
              type="info" 
              size="mini"
            >
              {{ authority.displayName }}
            </el-tag>
          </div>
        </div>
      </el-card>
    </div>

    <el-dialog 
      :visible.sync="isShowChangePasswordForm" 
      title="Смена пароля" 
      width="480px"
    >
      <change-password-form v-model="password" />
      <el-tag 
        v-if="showPasswordHint && isEmptyFields" 
        type="danger" 
        class="hint"
      >
        Заполните пустые поля
      </el-tag>
      <el-tag 
        v-if="showPasswordHint && isUnsafe" 
        type="danger" 
        class="hint"
      >
        Длина нового пароля должна быть не менее 8 символов
      </el-tag>
      <el-tag 
        v-if="showPasswordHint && isNotMatch" 
        type="danger" 
        class="hint"
      >
        Пароли не совпадают
      </el-tag>
      <div slot="footer">
        <el-button 
          type="success" 
          @click="changePassword"
        >
          Сохранить
        </el-button>
        <el-button @click="closeChangePasswordForm">Отмена</el-button>
      </div>
    </el-dialog>
  </page-container>
</template>

<style scoped>
    .title {
        display: flex;
        justify-content: center;
        font-size: 14px;
        font-weight: 100;
        text-transform: uppercase;
    }

    .form-wrapper {
        display: flex;
    }

    .user-info {
        margin-right: 16px;
        flex: 2;
    }

    .access {
        flex: 3;
    }

    .hint {
        margin: 4px 0;
    }

    .group {
        margin-bottom: 16px;
    }

    .group h4 {
        margin-bottom: 8px;
    }

    .group:last-child {
        margin-bottom: 0;
    }

    .group .el-tag {
        margin: 4px 0;
    }
</style>