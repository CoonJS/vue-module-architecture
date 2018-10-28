<script>
export default {
  props: {
    test: {
      type: Object,
      default() {
        return {};
      }
    },
    active: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data () {
    return {
      loading: false,
      editMode: false,
      name: this.test.name,
      access: {
        isAdmin: this.api.hasAccess('TESTS_ADMIN')
      }
    };
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  methods: {
    async saveTestName() {

      if (this.name === this.test.name) {
        this.disableEditMode();
        return;
      }

      this.loading = true;
      const id = this.test.id;
      const name = this.name;

      try {
        await this.api.put('updatedTestUsingPUT', { id }, { name });
      } catch (e) {
        throw e;
      }

      this.disableEditMode();
      this.loading = false;
    },
    removeTest(testId) {
      this.loading = true;
      this.$emit('remove',testId);
    },
    enableEditMode() {
      this.editMode = true;
      this.focusInput();
    },
    disableEditMode() {
      this.editMode = false;
    },
    focusInput() {
      this.$nextTick(() => {
        this.$refs.input.$el.querySelector('input').focus();
      });
    }
  }
};
</script>

<template>
  <div
    :class="{ active: active }"
    class="test"
  >
    <el-input
      v-if="editMode"
      ref="input"
      v-model="name"
      size="mini"
      @blur="saveTestName"
      @click.native.stop
      @keydown.native.enter="saveTestName"
      @keydown.native.escape="disableEditMode"
    />
    <div 
      v-else 
      class="test-name"
    >
      {{ name }}
    </div>
    <div 
      v-if="access.isAdmin" 
      class="actions"
    >
      <el-tooltip 
        effect="dark" 
        content="Редактировать тест" 
        placement="top-start"
      >
        <div 
          v-if="!editMode" 
          @click.prevent.stop="enableEditMode"
        >
          <i class="el-icon-edit" />
        </div>
      </el-tooltip>
      <el-tooltip 
        effect="dark" 
        content="Удалить тест" 
        placement="top-start"
      >
        <div @click.prevent.stop="removeTest(test.id)">
          <i
            v-if="loading"
            class="el-icon-loading"
          />
          <i
            v-else
            class="el-icon-delete"
          />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped>
    .test {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background: #fff;
        cursor: pointer;
        font-size: 14px;
        border-bottom: 1px solid #eee;
    }

    .test-name {
        width: 200px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .actions {
        display: flex;
    }

    .actions div {
        padding: 6px;
        cursor: pointer;
    }

    .actions div i {
        font-size: 18px;
    }

    .el-icon-edit {
        color: #409EFF;
    }

    .el-icon-check {
        color: #85ce61;
        font-weight: bold;
    }

    .el-icon-delete {
        color: #f56c6c;
    }

    .test.active {
        background: rgba(14, 176, 253, .1);
    }

    .test:hover {
        background: rgba(14, 176, 253, .1);
    }
</style>