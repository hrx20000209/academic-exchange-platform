<template>
  <div>
    <el-card class="card">

    </el-card>
  </div>
</template>

<script>
export default {
  name: "Question",
  data() {
    return {
      author: '',
      head: '',
      title: '',
      date: '',
      answerCnt: '',
      text: '',
    }
  }
}
</script>

<style scoped>
.card {
  width: 500px;
}
</style>
