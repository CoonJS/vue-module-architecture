<script>
  export default {
    name: 'node',
    props: {
      node: Object
    },
    methods: {
      handleCreate(id) {
        this.create(id);
      },
      handleEdit(id) {
        this.edit(id);
      },
      handleRemove(id) {
        this.remove(id);
      },
      create(id) {
        this.$emit('create', id);
      },
      edit(id) {
        this.$emit('edit', id);
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
            <div class="actions">
                <el-tooltip effect="dark" content="Создать" placement="top">
                    <i class="icon el-icon-plus" @click.prevent.stop="create(node.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="Редактировать" placement="top">
                    <i class="icon el-icon-edit" @click.prevent.stop="edit(node.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="Удалить" placement="top">
                    <i class="icon el-icon-delete" @click.prevent.stop="remove(node.id)"></i>
                </el-tooltip>
            </div>
        </div>

        <node
            v-for="child in node.children"
            :node="child"
            :key="child.id"
            @edit="handleEdit"
            @remove="handleRemove"
            @create="handleCreate"
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
                <el-tooltip effect="dark" content="Создать" placement="top">
                    <i class="icon el-icon-plus" @click.prevent.stop="create(node.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="Редактировать" placement="top">
                    <i class="icon el-icon-edit" @click.prevent.stop="edit(node.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="Удалить" placement="top">
                    <i class="icon el-icon-delete" @click.prevent.stop="remove(node.id)"></i>
                </el-tooltip>
            </div>
        </div>
    </el-submenu>
</template>

<style scoped>

    i {
        color: #909399;
        font-size: 12px;
        margin-right: 8px;
        margin-bottom: 3px;
    }

    i:last-child {
        margin-right: 24px;
    }

    .actions {

    }

    .submenu-content {
        font-size: 12px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }


    .menu-item {
        font-style: italic;
        font-size: 12px;
    }
</style>