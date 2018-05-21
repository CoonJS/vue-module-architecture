<script>
  export default {
    created() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data () {
      return {
        users: [],
        email: '',
        isShowModal: false,
        isInviting: false
      }
    },
    methods: {
      async inviteUser() {
        this.isInviting = true;
        try {
          await this.api.post('createUserRegistrationRequestUsingPOST', {}, { email: this.email });
          this.closeInviteModal();
        } catch(e) {
          throw e;
        }

        this.isInviting = false;
      },
      showInviteModal() {
        this.isShowModal = true;
      },
      closeInviteModal() {
        this.isShowModal = false;
      }
    }
  }
</script>

<template>
    <page-container>
        <div slot="header" class="header">
            <h3>Пользователи</h3>
            <el-button type="success" @click="showInviteModal">Пригласить</el-button>
        </div>
        <el-dialog :visible.sync="isShowModal" title="Пригласить пользователя" width="400px">
            <div>
                <el-input placeholder="Email" v-model="email"/>
            </div>
            <div slot="footer">
                <el-button type="success" @click="inviteUser" :loading="isInviting">Пригласить</el-button>
                <el-button @click="closeInviteModal">Отмена</el-button>
            </div>
        </el-dialog>
        <div class="users">

        </div>
    </page-container>
</template>

<style scoped>
    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>