<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>

<template>
    <page-container fluid flex>
                <el-menu
                    class="menu"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>Navigator One</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="1-1">item one</el-menu-item>
                            <el-menu-item index="1-2">item one</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group Two">
                            <el-menu-item index="1-3">item three</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">item four</template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span>Navigator Two</span>
                    </el-menu-item>
                </el-menu>
    </page-container>
</template>

<style scoped>
    .menu {
        width: 320px;
        height: 100%;
        flex: 1;
    }
</style>