<script>
export default {
  data () {
    return {
      role: null,
      meta: null,
      isDirty: false,
      isRemoving: false,
      isLoading: false,
      isSaving: false,
      roleId: this.$route.params.roleId,
      authorityGroups: [],
      groupedAuthorities: {},
      access: {
        canEditRoles: this.api.hasAccess('EDIT_ROLES'),
        canViewRoles: this.api.hasAccess('VIEW_ROLES'),
        canRemoveRoles: this.api.hasAccess('REMOVE_ROLES')
      }
    };
  },
  computed: {
    hasRole() {
      return this.role !== null;
    },
    groupKeys() {
      return Object.keys(this.groupedAuthorities);
    }
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
    /** @type {ArrayUtils}*/
    this.array = this.$locator.ArrayUtils;
  },
  mounted() {
    if (this.access.canViewRoles) {
      this.loadRole();
    }
  },
  methods: {
    async loadRole() {
      this.isLoading = true;
      try {
        const { data: role } = await this.api.get('roleUsingGET', { id: this.roleId });
        const { data: meta } = await this.api.get('metadataUsingGET');

        const { authorities, authorityGroups } = meta;
        const preparedAuthorities = authorities.map(authority => {
          return { ...authority, checked: role.authorities.includes(authority.name) };
        });
        this.groupedAuthorities = this.array.groupBy(preparedAuthorities, 'group');
        this.authorityGroups = this.array.indexBy(authorityGroups, 'name');

        this.role = role;
      } catch(e) {
        this.isLoading = false;
        throw e;
      }

      this.isLoading = false;
    },
    async deleteRole() {
      this.isRemoving = true;

      try {
        await this.api.delete('deleteRoleUsingDELETE', { id: this.roleId });
      } catch(e) {
        this.isRemoving = false;
      }

      this.isRemoving = false;
      this.redirectToRolesPage();
    },
    async saveChanges() {
      const name = this.role.name;
      const authorities = this.getSelectedAuthorities();

      this.isSaving = true;

      try {
        await this.api.put('updatedRoleUsingPUT', { id: this.roleId }, {
          name,
          authorities
        });
      } catch(e) {
        this.isSaving = false;
        throw e;
      }

      this.isSaving = false;
      this.redirectToRolesPage();
    },
    getSelectedAuthorities() {
      let authorities = [];
      const groupedAuthorities = this.groupedAuthorities;

      Object.keys(groupedAuthorities).forEach(groupKey => {
        groupedAuthorities[groupKey].forEach(authority => {
          if (authority.checked === true) {
            authorities.push(authority.name);
          }
        });
      });

      return authorities;
    },
    showConfirmModal() {
      this.$confirm('Вы действительно хотите удалить роль?', {
        title: 'Удаление роли',
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'error'
      }).then(() => {
        this.deleteRole();
      });
    },
    redirectToRolesPage() {
      this.$router.push('/roles');
    }
  }
};
</script>

<template>
  <page-container
    v-if="access.canViewRoles"
    v-loading.body="isLoading"
    flex-content 
    center
  >
    <div 
      slot="header" 
      class="header"
    >
      <template v-if="hasRole">
        <h3>{{ role.name }}</h3>
        <div class="actions">
          <el-button
            v-if="isDirty"
            :loading="isSaving"
            size="medium"
            type="success"
            icon="el-icon-check"
            @click="saveChanges"
          >
            Сохранить изменения
          </el-button>
          <el-button
            v-if="access.canRemoveRoles"
            :loading="isRemoving"
            size="medium"
            type="danger"
            icon="el-icon-delete"
            @click="showConfirmModal"
          >
            Удалить
          </el-button>
        </div>
      </template>
    </div>
    <div 
      v-if="hasRole" 
      class="role-card"
    >
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
          <el-checkbox
            v-model="authority.checked"
            :disabled="!access.canEditRoles"
            @change="isDirty = true"
          >
            {{ authority.displayName }}
          </el-checkbox>
        </div>
      </div>
    </div>
    <div class="page-actions" />
  </page-container>
  <access-denied v-else />
</template>

<style scoped>
    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .actions {
        display: flex;
        justify-content: space-between;
    }

    .role-card {
        padding: 16px;
        overflow: auto;
        background-color: #fdfdfd;
        border: 1px solid rgba(0,0,0, .1);
        width: 900px;
    }

    .group {
        padding: 8px;
        margin: 16px 0;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
    }

    h4 {
        margin-bottom: 8px;
    }

</style>