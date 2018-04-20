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
            <el-dropdown-item>
                <router-link to="profile">Профиль</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
                <router-link to="settings">Настройки</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">Выйти</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
  const profileIcon = require('../../../assets/img/user-profile.png');

  export default {
    name: "MenuItemDropdown",
    data() {
      return {
        profileIconLink: profileIcon
      };
    },
    methods: {
      async logout() {
        await this.$locator.Api.logout();
      }
    }
  }
</script>

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