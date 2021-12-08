<template>
  <div class="background">
    <el-row class="body">
      <el-col class="side-bar">
        <el-menu default-active="1" class="el-menu-vertical-demo" router>
          <div class="head-box">
            <el-avatar shape="circle" :size="size" :src="require('../../assets/admin.png')"></el-avatar>
          </div>
          <div class="name-box">
            管理员
          </div>
          <el-divider></el-divider>
          <el-menu-item index="/admin/applications">
            <i class="el-icon-menu"></i>
            <span slot="title">认证申请</span>
          </el-menu-item>
          <el-menu-item index="/admin">
            <i class="el-icon-document"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/">
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
      size: 100
    };
  },
  methods: {
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
  box-shadow: 0 0 30px 10px lightgrey;
  background-color: white;
  position: center;
  width: 90%;
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

.head-box {
  margin-left: 30%;
  margin-top: 10%;
}

.name-box {
  position: center;
  margin-left: 38%;
  margin-top: 5%;
  margin-bottom: 10%;
  font-size: larger;
}

.main {
}
</style>
