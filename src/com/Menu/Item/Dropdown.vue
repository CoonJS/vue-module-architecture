<script>
  export default {
    name: "MenuItemDropdown",
    props: {
      title: {
        type: String
      }
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data() {
      return {
        access: {
          canViewUsers: this.api.hasAccess('VIEW_USERS'),
          canViewRoles: this.api.hasAccess('VIEW_ROLES')
        }
      };
    },
    methods: {
      async logout() {
        await this.$locator.Api.logout();
      }
    }
  }
</script>

<template>
    <el-dropdown trigger="click">
        <div class="menu-item">
            <div class="menu-item-content">
                <slot></slot>
                <div class="avatar">{{title}}</div>
                <i class="el-icon-arrow-down"/>
            </div>
        </div>
        <el-dropdown-menu slot="dropdown">
            <router-link to="/profile">
                <el-dropdown-item>Профиль</el-dropdown-item>
            </router-link>
            <router-link to="/organizations">
                <el-dropdown-item>Организации</el-dropdown-item>
            </router-link>
            <router-link to="/users" v-if="access.canViewUsers">
                <el-dropdown-item>Пользователи</el-dropdown-item>
            </router-link>
            <router-link to="/roles" v-if="access.canViewRoles">
                <el-dropdown-item>Роли</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">Выйти</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<style scoped>
    .menu-item {
        cursor: pointer;
        padding: 0 16px;
        height: 100%;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 12px;
    }

    .menu-item:hover {
        background-color: #214367a3;
    }

    .menu-item-content {
        display: flex;
        align-items: center;
    }

    .profile-icon {
        margin-left: 8px;
    }

    .avatar {
        border-radius: 25px;
        background-color: #a1a3a582;
        margin-left: 8px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    a {
        color: #000;
        text-decoration: none;
    }

    i {
        margin-left: 8px;
    }
</style>