<template>
  <div>
    <el-card class="card">
      <div class="top" slot="header">
        <div>
          <el-avatar shape="circle" :size="size" :src="head"></el-avatar>
        </div>
        <div style="width: 100%">
          <div class="author-name">
            {{ author }}
          </div>
          <div class="description-box">
            {{ description }}
          </div>
        </div>
        <div class="time-box">
          {{ time }}
        </div>
      </div>
      <div>
        <div class="body">
          <div class="title-box">
            {{ title }}
          </div>
          <div>
            {{ text }}
          </div>
          <div class="ans-btn-box">
            <el-button type="primary" plain>回答</el-button>
          </div>
          <el-divider></el-divider>
          <div class="bottom">
            <div class="bottom-btn" style="margin-right: 6%">
              <i class="el-icon-star-off"/>
              推荐
            </div>
            <div class="bottom-btn" style="margin-left: 6%">
              <i class="el-icon-collection-tag"/>
              关注
            </div>
            <div class="bottom-btn" style="margin-left: 60%">
              <i class="el-icon-top"/>
              分享
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: ['key', 'title', 'author', 'head', 'answerCnt', 'text', 'description', 'time'],
  data: function() {
    return {
      size: 50
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 1%;
  width: 50%;
}

.top {
  display: flex;
}

.author-name {
  margin-left: 3%;
  margin-top: 1%;
  color: dodgerblue;
}

.description-box {
  margin-left: 3%;
}

.time-box {
  font-size: small;
  width: 10%;
  color: #cecece;
  margin-top: 3%;
}

.body {
  border: solid #b6b6b6 1px;
  padding: 20px;
}

.title-box {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.ans-btn-box {
  margin-top: 10px;
}

.bottom {
  display: flex;
  height: 20%;
}

.bottom-btn {
  font-weight: bold;
}
</style>
