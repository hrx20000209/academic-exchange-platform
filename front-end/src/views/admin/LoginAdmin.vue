<template>
  <div class="background">
    <nav_with_search-box></nav_with_search-box>
    <div class="body">
      <div class="middle-box">
        <h1 class="title-box">管理员登陆</h1>
        <el-divider>学术成果分享平台</el-divider>
        <div class="account-box">
          <h3 class="text-box">账号</h3>
          <el-input v-model="account" placeholder="请输入账号"></el-input>
        </div>
        <div class="account-box">
          <h3 class="text-box">密码</h3>
          <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="login" style="font-size: large">登陆</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav_with_searchBox from '../../components/nav_with_searchBox'
import { adminLogin } from "../../request/api"
export default {
  name: "LoginAdmin",
  components: { Nav_with_searchBox },
  data() {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login() {
      adminLogin({
        name: this.account,
        password: this.password
      }).then(response => {
        if (response.message === '用户名或密码错误') {
          this.$message({
            type: 'warning',
            message: '用户名或密码错误'
          })
        } else if (response.message === 'admin not exist') {
          this.$message({
            type: 'warning',
            message: '用户名或密码错误'
          })
        } else {
          localStorage.setItem('admin_id', response.admin_id)
          this.$message({
            type: 'success',
            message: '登陆成功！'
          })
          this.$router.push('/admin')
        }
      })
    },
  }
}
</script>

<style scoped>
.background {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url(../../assets/background2.png);
}

.body {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
}

.middle-box {
  box-shadow: 0 0 30px 10px lightgrey;
  background-color: white;
  width: 30%;
  padding: 2%;
}

.title-box {
  text-align: center;
}

.account-box {
  width: 92%;
  margin-left: 4%;
  margin-bottom: 3%;
}

.btn-box {
  width: 92%;
  margin-top: 8%;
  margin-left: 4%;
  display: flex;
  flex-direction: column;
  align-content: center;
}

.text-box {
  float: left;
  margin-bottom: 1%;
  margin-left: 1%;
}
</style>
