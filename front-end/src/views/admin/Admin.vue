<template>
  <div class="background">
    <div v-if="admin_id.length===0" class="body-error">
      <h1>对不起，您无权访问改页面</h1>
    </div>
    <el-row class="body" v-else>
      <el-col class="side-bar">
        <div class="id">
          <div class="head-box">
            <el-avatar shape="circle" :size="size" :src="require('../../assets/admin.png')"></el-avatar>
          </div>
          <div class="name-box">
            管理员
          </div>
        </div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          text-color="black"
          active-text-color="blue"
          router>
          <el-divider></el-divider>
          <el-menu-item index="/admin/applications" class="list-item">
            <i class="el-icon-menu"></i>
            <span slot="title">诉求列表</span>
          </el-menu-item>
          <el-menu-item index="/admin" class="list-item">
            <i class="el-icon-document"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/" class="list-item" @click="logOut">
            <i class="el-icon-setting"></i>
            <span slot="title">退出</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <div class="main">
        <router-view></router-view>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      size: 100,
      admin_id: ''
    }
  },
  mounted() {
    this.admin_id = localStorage.getItem('admin_id')
  },
  methods: {
    logOut() {
      localStorage.setItem("admin_id", '')
    }
  }
}
</script>

<style scoped>
.background {
  position: fixed;
  height: 100vh;
  width: 100%;
  background-image: url(../../assets/background2.png);
}

.body {
  box-shadow: 0 0 30px 10px lightgrey;
  background-color: white;
  position: center;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%;
  height: 95%;
}

.body-error {
  box-shadow: 0 0 30px 10px lightgrey;
  background-color: white;
  text-align: center;
  position: center;
  width: 90%;
  padding-top: 20%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%;
  height: 95%;
}

.side-bar {
  width: 20%;
  height: 100%;
  border-right: solid grey 1px;
}

.id {
  box-shadow: 0 0 10px 10px #f6f3f3;
  background-color: white;
  margin: 10%;
  padding-top: 5%;
  padding-bottom: 5%;
  text-align: center;
  position: center;
}

.head-box {
  margin: 10%;
}

.name-box {
  position: center;
  margin-top: 5%;
  margin-bottom: 10%;
  font-size: larger;
}

.main {
}

.list-item {
  background-color: white;
  box-shadow: 0 0 10px 10px #f6f3f3;
  margin: 10%;
}
</style>
