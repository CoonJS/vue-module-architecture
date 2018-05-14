<script>
  export default {
    mounted() {
      this.loadUser();
    },
    data () {
      return {
        user: null,
        isUserLoading: false
      }
    },
    computed: {
      hasUser() {
        return this.user !== null;
      }
    },
    methods: {
        async loadUser() {
            this.isUserLoading = true;
            const { data: user } = await this.$locator.Api.get('currentUserUsingGET');
            this.user = user;
            this.isUserLoading = false;
        }
    }
  }
</script>

<template>
    <page-container v-loading.body="isUserLoading">
        <div slot="header" class="title">
            <h3>Профиль</h3>
        </div>
        <div class="form-wrapper">
            <el-form v-if="hasUser" label-width="100px" style="width: 500px;">
                <el-form-item label="Имя">
                    <el-input v-model="user.firstName" />
                </el-form-item>
                <el-form-item label="Фамилия">
                    <el-input v-model="user.lastName" />
                </el-form-item>
                <el-form-item label="Почта">
                    <el-input v-model="user.email" disabled/>
                </el-form-item>
            </el-form>
        </div>
    </page-container>
</template>

<style scoped>
    .title {
        display: flex;
        align-items: center;
    }

    .form-wrapper {
        margin-top: 16px;
    }
</style>