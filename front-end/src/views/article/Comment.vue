<template>
  <el-card>
    <h1>评论</h1>
    <div class="input-box">
      <el-input
        type="textarea"
        :rows="10"
        :resize="false"
        placeholder="请输入内容"
        v-model="text">
      </el-input>
      <div class="btn-box">
        <el-button type="primary">提交</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      text: ''
    }
  }
}
</script>

<style scoped>
.input-box {
  margin-left: 1%;
  width: 50%;
  height: 300px;
}

.btn-box {
  margin-top: 5%;
  float: right;
}
</style>
