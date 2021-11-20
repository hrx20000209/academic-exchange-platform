<template>
  <div class="background">
    <nav_with_search-box></nav_with_search-box>
    <div class="body">
      <div class="middle-box">
        <h1 class="title-box">新用户注册</h1>
        <el-divider>学术交流平台</el-divider>
        <el-form :model="user" status-icon :rules="rules" ref="user" class="demo-ruleForm">
          <el-form-item class="account-box">
            <h3 class="text-box">用户名</h3>
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item class="account-box">
            <h3 class="text-box">邮箱</h3>
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item class="account-box" prop="password">
            <h3 class="text-box">密码</h3>
            <el-input v-model="user.password" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item class="account-box" prop="checkPass">
            <h3 class="text-box">确认密码</h3>
            <el-input v-model="user.checkPass" autocomplete="off" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary" style="font-size: large">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nav_with_searchBox from "../../components/nav_with_searchBox";
export default {
  name: "Register",
  components: { nav_with_searchBox },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.user.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      user: {
        name: '',
        password: '',
        checkPass: '',
        email: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
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
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
}

.middle-box {
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
  margin-bottom: 5%;
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
