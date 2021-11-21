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
          <div>
            {{ text }}
          </div>
          <el-divider></el-divider>
          <div class="bottom">
            <div class="bottom-btn"
                 @click="like"
                 @mouseover="btnMouseOn($event)"
                 @mouseleave="btnMouseOut($event)">
              <img src="@/assets/已点赞.png" width="10%" v-if="done"/>
              <img src="@/assets/点赞.png" width="10%" v-else alt=""/>
              点赞
            </div>
          </div>
        </div>
      </div>
    </el-card>
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
    btnMouseOn(e) {
      e.currentTarget.className = 'bottom-btn-mouse-on'
    },
    btnMouseOut(e) {
      e.currentTarget.className = 'bottom-btn'
    },
    like() {
      // 这里还有问题，用子组件修改了父组件里的值，控制台报错了，但是实际上可以运行
      this.done = !this.done
      this.$emit('like', this.done)
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 1%;
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
  padding: 20px;
}

.bottom {
  display: flex;
  height: 20%;
}

.bottom-btn {
  font-weight: bold;
}

.bottom-btn-mouse-on {
  font-weight: bold;
  text-decoration: underline;
}
</style>
