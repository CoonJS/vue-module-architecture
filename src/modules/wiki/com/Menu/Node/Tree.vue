<script>
export default {
  name: 'Node',
  props: {
    node: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      access: {
        canCreate: this.api.hasAccess('ADD_WIKI'),
        canEdit: this.api.hasAccess('EDIT_WIKI'),
        canRemove: this.api.hasAccess('REMOVE_WIKI')
      }
    };
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
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
  <el-submenu 
    v-if="node.children && node.children.length" 
    :index="String(node.id)"
  >
    <div 
      slot="title" 
      class="submenu-content"
    >
      <div class="folder-name">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          xmlns:xlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 26 26" 
          version="1.1" 
          width="16px" 
          height="16px"
        >
          <g 
            id="surface1" 
            fill="#909399"
          >
            <path d="M 3 2 C 1.34375 2 0 3.34375 0 5 L 0 22 C 0 23.65625 1.34375 25 3 25 L 23 25 C 24.65625 25 26 23.65625 26 22 L 26 8 C 26 6.34375 24.65625 5 23 5 L 11 5 C 11 3.34375 9.65625 2 8 2 Z M 3 7 L 23 7 C 23.550781 7 24 7.449219 24 8 L 24 22 C 24 22.550781 23.550781 23 23 23 L 3 23 C 2.449219 23 2 22.550781 2 22 L 2 8 C 2 7.449219 2.449219 7 3 7 Z" />
          </g>
        </svg>
        <span>{{ node.title }}</span>
      </div>
      <div class="actions">
        <el-tooltip 
          v-if="access.canCreate" 
          effect="dark" 
          content="Создать" 
          placement="top"
        >
          <i 
            class="icon el-icon-plus" 
            @click.prevent.stop="create(node.id)"
          />
        </el-tooltip>
        <el-tooltip 
          v-if="access.canEdit" 
          effect="dark" 
          content="Редактировать" 
          placement="top"
        >
          <i 
            class="icon el-icon-edit" 
            @click.prevent.stop="edit(node.id)"
          />
        </el-tooltip>
        <el-tooltip 
          v-if="access.canRemove" 
          effect="dark" 
          content="Удалить" 
          placement="top"
        >
          <i 
            class="icon el-icon-delete" 
            @click.prevent.stop="remove(node.id)"
          />
        </el-tooltip>
      </div>
    </div>

    <node
      v-for="child in node.children"
      :key="child.id"
      :node="child"
      @edit="handleEdit"
      @remove="handleRemove"
      @create="handleCreate"
    />

  </el-submenu>
  <el-menu-item 
    v-else-if="node.type === 'ARTICLE'" 
    :index="`/wiki/${String(node.id)}`"
  >
    <i class="el-icon-document" />
    <span class="menu-item">{{ node.title }}</span>
  </el-menu-item>
  <el-submenu 
    v-else 
    :index="String(node.id)"
  >
    <div 
      slot="title" 
      class="submenu-content"
    >
      <div class="folder-name">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          xmlns:xlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 26 26" 
          version="1.1" 
          width="16px" 
          height="16px"
        >
          <g 
            id="surface1" 
            fill="#909399"
          >
            <path d="M 3 2 C 1.34375 2 0 3.34375 0 5 L 0 22 C 0 23.65625 1.34375 25 3 25 L 23 25 C 24.65625 25 26 23.65625 26 22 L 26 8 C 26 6.34375 24.65625 5 23 5 L 11 5 C 11 3.34375 9.65625 2 8 2 Z M 3 7 L 23 7 C 23.550781 7 24 7.449219 24 8 L 24 22 C 24 22.550781 23.550781 23 23 23 L 3 23 C 2.449219 23 2 22.550781 2 22 L 2 8 C 2 7.449219 2.449219 7 3 7 Z" />
          </g>
        </svg>
        <span>{{ node.title }}</span>
      </div>
      <div>
        <el-tooltip 
          v-if="access.canCreate" 
          effect="dark" 
          content="Создать" 
          placement="top"
        >
          <i 
            class="icon el-icon-plus" 
            @click.prevent.stop="create(node.id)"
          />
        </el-tooltip>
        <el-tooltip 
          v-if="access.canEdit" 
          effect="dark" 
          content="Редактировать" 
          placement="top"
        >
          <i 
            class="icon el-icon-edit" 
            @click.prevent.stop="edit(node.id)"
          />
        </el-tooltip>
        <el-tooltip 
          v-if="access.canRemove" 
          effect="dark" 
          content="Удалить" 
          placement="top"
        >
          <i 
            class="icon el-icon-delete" 
            @click.prevent.stop="remove(node.id)"
          />
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

    .folder-name {
        display: flex;
        align-items: center;
        padding-left: 3px;
    }

    .folder-name span {
        font-weight: 100;
        margin-left: 12px;
    }
</style>