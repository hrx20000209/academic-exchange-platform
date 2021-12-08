<template>
  <div class="background">
    <nav_with_search-box></nav_with_search-box>
    <div class="body">
      <div class="middle-box">
        <h1 class="title-box">用户登陆</h1>
        <el-divider>学术交流平台</el-divider>
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
        <div class="register-box">
          没有账号？点击此处<el-button type="text" class="register-text" @click="register">注册</el-button>
        </div>
<!--        <div class="manager-box">-->
<!--          <el-button type="success" plain @click="gotoManagerLogin">管理员入口</el-button>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Nav_with_searchBox from '../../components/nav_with_searchBox'
import { register, userLogin } from "../../request/api"

export default {
  name: "Login",
  components: { Nav_with_searchBox },
  data() {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login() {
      userLogin({
        name: this.account,
        password: this.password,
      }).then(response => {
        if (response.message === '用户名或密码错误') {
          this.$message({
            type: 'warning',
            message: '用户名或密码错误'
          })
        } else {
          localStorage.setItem('user_id',response.user_id)
          this.$message({
            type: 'success',
            message: '登陆成功！'
          })
          this.$router.push('/')
        }
      })
    },
    register() {
      this.$router.push('/register')
    },
  }
}
</script>

<style scoped>
.background {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #ededed;
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

.register-box {
  margin-top: 5%;
  text-align: center;
}

.register-text {
  color: deepskyblue;
  font-size: large;
  margin-bottom: 3px;
}

.manager-box {
  margin-top: 5%;
  float: right;
}
</style>
