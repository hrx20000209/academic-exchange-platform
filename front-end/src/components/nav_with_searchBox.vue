<template>
  <div id="navBar">
    <div id="navLogoPlace">
      <div id="navLogo"></div>
    </div>
    <div id="jumpRouterPlace">
      <div class="myBox">
        <router-link tag="div" to="/" class="jumpRouterDetail" replace active-class="myActiveClass">
          <i to="/" class="el-icon-s-home">首页</i>
        </router-link>
      </div>

      <div class="jumpRouterDetail">
        论坛
      </div>
      <div class="jumpRouterDetail">
        广场
      </div>
    </div>
    <div id="searchWrapper">
      <div id="searchBar">
        <el-input placeholder="请输入内容" v-model="input2" id="mySearchInput">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div id="otherWrapper">
      <div v-if="this.ifLogin === 1" id="alreadyLogin">
        <div class="infoBox">
          <i class="el-icon-message-solid"></i>
        </div>
        <div class="infoBox">
          <i class="el-icon-s-promotion"></i>
        </div>
        <div class="infoBox">
          <i class="el-icon-chat-round"></i>
        </div>
        <div class="infoBox">
          <i class="el-icon-user-solid" @click="toUsrHome"></i>
          <el-dropdown @command="handleDropDown">
  <span class="el-dropdown-link">
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="myDropdown">个人信息</el-dropdown-item>
              <el-dropdown-item class="myDropdown">系统设置</el-dropdown-item>
              <el-dropdown-item class="myDropdown">系统反馈</el-dropdown-item>
              <el-dropdown-item class="myDropdown" command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div id="createNewBox">
          <el-button id="createNew" @click="createNew" icon="el-icon-plus">发布</el-button>
        </div>
      </div>
      <div v-else id="LoginPane">
        <button id="Login" @click="toLogin">登录</button>
        <button id="register" @click="toRegister">注册</button>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: "nav_with_searchBox",
  data() {
    return {
      ifLogin: '',
      input2: ''
    }
  },
  methods: {
    createNew() {
    },
    toRegister() {
      this.$router.push('/register')
    },
    toLogin() {
      this.$router.push('/login')
      localStorage.setItem('ifLogin', 1)
      this.ifLogin = localStorage.getItem('ifLogin')
    },
    handleDropDown(command) {
      if (command === "exit") {
        localStorage.setItem('ifLogin', 0)
        this.ifLogin = localStorage.getItem('ifLogin')
        console.log(localStorage.getItem('ifLogin'))
        console.log(this.ifLogin)
      }
    },
    toUsrHome() {
      this.$router.push('/userHome')
    }
  },
  mounted() {
    this.ifLogin = localStorage.getItem('ifLogin')
  }
}
</script>

<style scoped>
#navBar {
  z-index: 100;
  background-color: white !important;
  height: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: #e5e5e5 solid 1px;
}

#navLogoPlace {
  margin-right: 30px;
}

#navLogo {
  background-color: #00CCBB;
  width: 60px;
  height: 60px;
}

#jumpRouterPlace {
  display: inline-flex;
  margin-top: auto;
  margin-bottom: auto;
  height: 60px;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
}

.jumpRouterDetail {
  font-size: 14px;
  color: #616161;
  letter-spacing: 3px;
  margin-right: 30px;
  height: 40px;
  border: black;
  padding-top: 20px;
  -ms-flex-direction: column;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  border-bottom: #dcdcdc solid 2px;
}

.jumpRouterDetail:hover {
  font-size: 14px;
  color: black;
  letter-spacing: 3px;
  border-bottom: #0080ff solid 2px;
  margin-right: 30px;
  cursor: pointer;
}

.myActiveClass {
  color: black;
  border-bottom: #0080ff solid 2px;
}

.myLine {
  color: black;
  height: 3px;

}

#searchBar {
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
}

#searchWrapper {
  margin: auto;
  color: black;
}

#mySearchInput {
  width: 300px;
  height: 20px;
}

#otherWrapper {
  width: 400px;
  font-size: 20px;
  margin-top: 18px;
  display: inline-flex;
  justify-content: center;
}

#infoBar {
  margin-top: auto;
  margin-bottom: auto;
  height: auto;
  width: auto;
}

.infoBox {
  margin-left: 20px;
  height: auto;
  width: auto;
  color: #616161;
}

.infoBox:hover {
  color: #343434;
  cursor: pointer;
}

.myDropdown {
  border-left: transparent solid 2px;
}

.myDropdown:hover {
  background-color: whitesmoke;
  color: black;
  border-left: grey solid 2px;
}

#createNew {
  font-family: "Microsoft YaHei UI";
  display: inline;
  background-color: transparent;
  background-color: #0080ff;
  font-family: "Roboto", Arial, sans-serif;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  margin-left: 30px;
  padding: 10px;
  border: none;
}

#createNew:hover {
  background-color: #005abb;
}

/deep/ .el-input__inner {
  -webkit-appearance: none;
  background-color: #FFF;
  background-image: none;
  /*border-radius: 4px;*/
  border: 1px solid #DCDFE6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 35px;
  /* width: 400px; */
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  /* -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1); */
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
}

#Login {
  border: none;
  border-bottom: transparent solid 2px;
  background: transparent;
  color: #343434;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 3px;
  padding: 5px 0 5px 0;
}

#Login:hover {
  border-bottom: #343434 solid 2px;
  cursor: pointer;
}

#register {
  border: none;
  border-bottom: transparent solid 2px;
  background: transparent;
  color: #00CCBB;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 3px;
  margin-left: 20px;
  padding: 5px 0 5px 0;
}

#register:hover {
  border-bottom: #00ccbb solid 2px;
  cursor: pointer;
}

#alreadyLogin {
  display: inline-flex;
}
</style>
