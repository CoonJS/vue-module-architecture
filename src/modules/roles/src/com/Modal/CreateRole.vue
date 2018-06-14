<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
      /** @type {ArrayUtils}*/
      this.array = this.$locator.ArrayUtils;
    },
    data () {
      return {
        name: '',
        show: this.value,
        authorityGroups: [],
        groupedAuthorities: {},
        saving: false,
        isMetaLoading: false,
        error: {
          invalidNameError: false,
          emptyAuthorities: false
        }
      };
    },
    watch: {
      value(val) {
        this.show = val;

        if (val === true) {
          this.loadMeta();
        }
      },
      show(val) {
        this.$emit('input', val);
      },
      name() {
        this.error.invalidNameError = false;
      }
    },
    computed: {
      groupKeys() {
        return Object.keys(this.groupedAuthorities);
      }
    },
    methods: {
      async loadMeta() {
        this.isMetaLoading = true;

        const { data: meta } = await this.api.get('metadataUsingGET');
        const { authorities, authorityGroups } = meta;
        const preparedAuthorities = authorities.map(authority => {
          return Object.assign({}, authority, { checked: false });
        });
        this.groupedAuthorities = this.array.groupBy(preparedAuthorities, 'group');
        this.authorityGroups = this.array.indexBy(authorityGroups, 'name');
        this.isMetaLoading = false;
      },
      async createRole() {
        const name = this.name;
        if (name.trim() === '') {
          this.error.invalidNameError = true;
          return;
        }

        const authorities = this.getSelectedAuthorities();
        if (authorities.length === 0) {
          this.error.emptyAuthorities = true;
          return;
        }

        this.saving = true;
        await this.api.post('createdRoleUsingPOST', {}, { name, authorities });
        this.saving = false;

        this.closeModal();
        this.$emit('save');
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
      closeModal() {
        this.show = false;
      }
    }
  }
</script>

<template>
    <el-dialog :visible.sync="show" title="Создание роли" width="500px">
        <div class="roles" v-loading.body="isMetaLoading">
            <div class="name">
                <div class="title">Название</div>
                <el-input v-model="name" placeholder="Название" size="medium"/>
            </div>
            <div class="title">Группы доступов</div>
            <div class="group" v-for="key in groupKeys" :key="key">
                <h4>{{authorityGroups[key].displayName}}</h4>
                <div v-for="authority in groupedAuthorities[key]" :key="authority.name">
                    <el-checkbox v-model="authority.checked" @change="error.emptyAuthorities = false">{{authority.displayName}}</el-checkbox>
                </div>
            </div>
        </div>
        <div slot="footer" class="footer">
            <el-tag v-if="error.invalidNameError" type="danger">Заполните название роли</el-tag>
            <el-tag v-if="error.emptyAuthorities" type="danger">Укажите полномочия</el-tag>
            <el-button type="success" size="medium" :loading="saving" @click="createRole">Создать</el-button>
            <el-button @click="closeModal" size="medium">Отмена</el-button>
        </div>
    </el-dialog>
</template>

<style scoped>
    .roles {

    }

    .group {
        padding: 8px;
        margin: 8px 0;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
    }

    .name {
        margin-bottom: 16px;
    }

    .title {
        font-size: 12px;
        margin-bottom: 8px;
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .el-tag {
        margin-right: 16px;
    }
</style>