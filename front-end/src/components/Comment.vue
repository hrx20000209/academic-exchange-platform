<template>
  <div>
    <div>
      <div class="top" slot="header">
        <div style="margin-left: 2%">
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
          <div class="tags">
            有{{ likeCnt }}人赞同了该评论
          </div>
          <div>
            {{ text }}
          </div>
          <div class="bottom">
            <div style="float: left">
              <el-button type="text" @click="like">
                <img src="@/assets/已点赞.png" width="30px" v-if="done"/>
                <img src="@/assets/点赞.png" width="30px" v-else alt=""/>
              </el-button>
            </div>
            <div class="like-cnt">
              {{ likeCnt }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ['author', 'head', 'likeCnt', 'text', 'description', 'time', 'done'],
  data: function() {
    return {
      size: 50
    }
  },
  methods: {
    like() {
      // 这里还有问题，用子组件修改了父组件里的值，控制台报错了，但是实际上可以运行
      this.done = !this.done
      this.$emit('like', this.done)
    }
  }
}
</script>

<style scoped>
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
  font-size: small;
}

.time-box {
  font-size: small;
  width: 10%;
  color: #cecece;
  margin-top: 3%;
}

.body {
  padding: 20px;
  font-size: large;
}

.bottom {
  width: 100%;
  display: inline-block;
  margin-top: 5%;
}

.like-cnt {
  float: left;
  margin-left: 1%;
  margin-top: 3%;
}

.tags {
  font-size: medium;
  color: #8e8e8e;
  margin-bottom: 3%;
}
</style>
