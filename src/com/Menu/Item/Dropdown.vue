<script>
  const profileIcon = require('../../../assets/img/user-profile.png');

  export default {
    name: "MenuItemDropdown",
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data() {
      return {
        profileIconLink: profileIcon,
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
                <img class="profile-icon" :src="profileIconLink" width="24px" height="24px" alt="profile">
                <i class="el-icon-arrow-down"/>
            </div>
        </div>
        <el-dropdown-menu slot="dropdown">
            <router-link to="/profile">
                <el-dropdown-item>Профиль</el-dropdown-item>
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
        background-color: #0eb0fd;
    }

    .menu-item-content {
        display: flex;
        align-items: center;
    }

    .profile-icon {
        margin-left: 8px;
    }

    a {
        color: #000;
        text-decoration: none;
    }

    i {
        margin-left: 8px;
    }
</style>