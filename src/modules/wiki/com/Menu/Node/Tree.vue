<script>
  export default {
    name: 'node',
    props: {
      node: Object
    },
    methods: {
      handlePlusIconClick() {
        this.$emit('create');
      },
      handleRemove(id) {
        this.remove(id);
      },
      remove(id) {
        this.$emit('remove', id);
      }
    }
  };
</script>

<template>
    <el-submenu v-if="node.children && node.children.length" :index="String(node.id)">
        <div slot="title" class="submenu-content">
            <span>{{node.title}}</span>
            <div>
                <el-tooltip class="item" effect="dark" content="Удалить" placement="top">
                    <i class="el-icon-delete" @click.prevent.stop="remove(node.id)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Создать" placement="top">
                    <i class="el-icon-plus" @click.prevent.stop="handlePlusIconClick"></i>
                </el-tooltip>
            </div>
        </div>

        <node
            v-for="child in node.children"
            :node="child"
            :key="child.id"
            @remove="handleRemove"
            @create="handlePlusIconClick"
        />

    </el-submenu>
    <el-menu-item v-else-if="node.type === 'ARTICLE'" :index="String(node.id)">
        <span class="menu-item">{{ node.title }}</span>
        <i class="el-icon-tickets"></i>
    </el-menu-item>
    <el-submenu v-else :index="String(node.id)">
        <div slot="title" class="submenu-content">
            <span>{{node.title}}</span>
            <div>
                <el-tooltip class="item" effect="dark" content="Удалить" placement="top">
                    <i class="el-icon-delete" @click.prevent.stop="remove(node.id)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Создать" placement="top">
                    <i class="el-icon-plus" @click.prevent.stop="handlePlusIconClick"></i>
                </el-tooltip>
            </div>
        </div>
    </el-submenu>
</template>

<style scoped>

    i.el-icon-tickets {
        font-size: 12px;
    }

    i.el-icon-plus, i.el-icon-delete {
        margin-bottom: 4px;
        color: #909399;
        font-size: 12px;
        margin-right: 22px;
    }

    i.el-icon-delete {
        margin-right: 0;
    }

    .submenu-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }


    .menu-item {
        font-style: italic;
        font-size: 12px;
    }
</style>