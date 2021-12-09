<template>
  <div class="grey">
    <div style="height: 20px"></div>
    <div class="bigFrame">
      <div class="upFrame">
        <div class="upFrameContent">评论</div>
      </div>
      <div class="downFrame">
        <div class="downFrameContent">
          <div v-for="item in items" :key="item.id">
            <div>
              <el-card class="card">
                <div class="top" slot="header">
                  <div>
                    <el-avatar shape="circle" :size="size" :src="head"></el-avatar>
                  </div>
                  <div style="width: 100%">
                    <div class="author-name">
                      {{ item.author }}
                    </div>
                    <div class="description-box">
                      {{ item.description }}
                    </div>
                  </div>
                  <div class="time-box">
                    {{ item.time }}
                  </div>
                </div>
                <div>
                  <div class="body">
                    <div>
                      {{ item.text }}
                    </div>
                    <el-divider></el-divider>
                    <div class="bottom">
                      <div class="bottom-btn"
                           v-if="!item.done"
                           @click="addLike(item.comment_id);item.done =!item.done">
<!--                        评论的id addlike要知道 评论id 文献id 点赞人id 然后在前端把item.done 设置成true-->
                        <img src="@/assets/点赞.png" width="10%"/>
                        点赞
                      </div>
                      <div class="bottom-btn-mouse-on"
                           v-else
                           @click="cancelLike(item.comment_id);item.done =!item.done">
                        <img src="@/assets/已点赞.png" width="10%"/>
                        点赞
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="input-box">
          <div class="top">
            <div>
              <el-avatar shape="circle" :size="50" :src="user.head"></el-avatar>
            </div>
            <div style="width: 100%">
              <div class="author-name">
                {{ user.name }}
              </div>
              <div class="description-box">
                {{ user.description }}

              </div>
            </div>
          </div>
          <div class="input-box">
            <div id="div1"></div>
            <div class="btn-box">
              <el-button type="primary" @click="addComment">提交</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 20px"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: "CommentList",
  mounted() {
    const editor = new E('#div1')
    editor.config.menus = [
      'bold',
      'italic',
      'fontSize',
      'list'
    ]
    editor.config.showFullScreen = false
    editor.config.height = 120
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml
    }
    editor.create()
    this.editor = editor
  },
  created() {
    this.getCommentsList()
  },
  beforeDestroy() {
    this.editor.destroyed()
    this.editor = null
  },
  data() {
    return {
      editor: null,
      editorData: '',
      cnt: 3,
      user: {
        user_id:'',
        name: 'HRX',
        head: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        description: '一个苦逼的前端'
      },
      items: [
        {
          author: '作者1',
          description: 'BUAA软件学院在读',
          time: '1小时前',
          head: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          date: '2021年11月12日',
          likeCnt: '2',
          text: '这里显示的是评论的内容',
          done: false
        },
        {
          author: '作者2',
          description: '一个野鸡大学的研究生',
          time: '1天前',
          head: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          date: '2021年11月12日',
          likeCnt: '2',
          text: '兰州烧饼 啧啧啧',
          done: false
        },
        {
          author: '作者3',
          description: '无业游民',
          time: '1年前',
          head: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          date: '2021年11月12日',
          likeCnt: '2',
          text: '噫！芜！',
          done: false
        }
      ],
      data:''
    }
  },
  methods: {
    getCommentsList(){
      console.log('进入获取评论');
      this.axios({
        method: "get",
        // url:'http://139.9.132.83:8000/communicate/comment_get?commented_id=' + this.$store.state.paper_id,
        url:'http://139.9.132.83:8000/communicate/comment_get?commented_id=' + '7C4C2B3B',
        // url:"http://192.168.206.1:8000/user/GetFavorite",
        data:{
          // commented_id: this.$store.state.paper_id
          commented_id:'7C4C2B3B',
          like_id:'1',
        },
        // timeout:1000,
      })
        .then(response=>{
          console.log('获取评论信息')
          console.log(response.data)

          //这里再赋值
        })
    },
    addComment(){
      const data = this.editor.txt.html()
      this.axios({
        method: "post",
        url:"http://139.9.132.83:8000/communicate/comment_add",
        data:{
          commented_id: '7C4C2B3B',
          commentator_id: '1',
          comment_content:data,
        },
        // timeout:1000,
      })
        .then(response=>{
          console.log('成功？')
          console.log(response.data)
        })
    },
    addLike(){
      this.axios({
        method: "post",
        url: "http://139.9.132.83:8000/communicate/like",
        data:{
          user_id:this.user_id,
          post_id: this.comment_id
        }
      })
        .then(response=>{
          console.log('点赞成功')
        })
    },
    cancelLike(){
      this.axios({
        method: "post",
        url: "http://139.9.132.83:8000/communicate/cancellike",
        data:{
          user_id:this.user_id,
          comment_id: this.comment_id
        }
      })
        .then(response => {
          console.log('取消点赞成功')
        })
    }
  }
}
</script>

<style scoped>
.grey{
  background: rgba(221,221,221,0.3);
}
.bigFrame{
  width: 66%;
  background: white;
  border-radius: 2px;
  margin-left: 10%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.upFrame{
  height: 50px;
  border-bottom: rgba(0, 0, 0, .12) solid 1px;
}
.upFrameContent{
  padding: 15px;
  margin-left: 15px;
}
.downFrame{
  border-bottom: lightgrey solid 1px;
}
.downFrameContent{
  padding: 30px;
}
.top {
  margin-bottom: 2%;
  margin-left: 2%;
  display: flex;
}
.input-box {
  margin-left: 1%;
  height: 300px;
}

.btn-box {
  margin-top: 1%;
  margin-bottom: 1%;
  float: right;
}

.author-name {
  margin-left: 3%;
  margin-top: 1%;
  color: dodgerblue;
}

.description-box {
  margin-left: 3%;
}
.input-box {
  margin: 1%;
}
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
