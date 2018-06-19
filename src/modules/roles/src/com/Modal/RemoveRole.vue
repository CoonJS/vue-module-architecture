<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default() {
          return false;
        }
      },
      roleId: {
        type: Number
      },
      roles: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data () {
      return {
        name: '',
        removing: false,
        selectedRole: null,
        show: this.value
      };
    },
    computed: {
      filteredRoles() {
        return this.roles.filter(role => (role.editable && role.id !== this.roleId));
      },
      canRemoveRole() {
        return this.filteredRoles.length > 0;
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.$emit('input', val);
      },
      filteredRoles(val) {
        if (val.length > 0) {
          this.selectedRole = val[0].id;
        }
      }
    },
    methods: {
      async removeRole() {
        this.removing = true;
        const id = this.roleId;

        try {
          await this.api.delete('deleteRoleUsingDELETE', { id }, {}, { newRoleId: this.selectedRole });
          this.$emit('remove', id);
        } catch (e) {
          this.removing = false;
        }

        this.removing = false;
      },
      closeModal() {
        this.show = false;
      }
    }
  }
</script>

<template>
    <el-dialog :visible.sync="show" title="Удаление роли" width="500px">
        <div v-if="canRemoveRole">
            <div class="message">Укажите новую роль для пользователей</div>
            <div>
                <el-select v-model="selectedRole" size="medium">
                    <el-option
                        v-for="role in filteredRoles"
                        :key="role.id"
                        :label="role.name"
                        :value="role.id"
                    >
                        {{role.name}}
                    </el-option>
                </el-select>
            </div>
        </div>
        <div v-else>
            <div class="message error">Вы не можете удалить роль не назначив другую роль для пользователей</div>
        </div>
        <div slot="footer" class="footer">
            <el-button
                v-if="canRemoveRole"
                type="danger"
                size="medium"
                :loading="removing"
                @click="removeRole"
            >
                Удалить
            </el-button>
            <el-button @click="closeModal" size="medium">Отмена</el-button>
        </div>
    </el-dialog>
</template>

<style scoped>
    .message {
        font-size: 12px;
        margin-bottom: 16px;
    }
    
    .message.error {
        color: #f56c6c;
    }

    .el-select {
        width: 100%;
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
</style>