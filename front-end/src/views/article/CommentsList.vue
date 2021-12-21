<template>
  <div class="grey">
    <div style="height: 20px"></div>
    <div class="bigFrame">
      <div class="upFrame">
        <div class="upFrameContent">评论</div>
      </div>
      <div class="downFrame">
        <div class="downFrameContent" v-if="this.commentsList.length !== 0">
          <div v-for="(item) in commentsList" :key="item.id">
            <div>
              <el-card class="card">
                <div class="top" slot="header">
                  <div>
                    <el-avatar shape="circle" :size="50" :src=urlTouXiang+item.commentator_id></el-avatar>
                  </div>
                  <div style="width: 100%">
                    <div class="author-name" @click="toUser(item.commentator_id)">
                      {{ item.user_name }}
                    </div>
                    <div class="description-box">
                      {{ item.summary }}
                    </div>
                  </div>
                  <div class="time-box">
                    {{ item.comment_time }}
                  </div>
                </div>
                <div>
                  <div class="body">
                    <div v-html="item.comment_content">
                      <!--                      {{ item.comment_content }}-->
                    </div>
                    <el-divider></el-divider>
                    <div class="bottom">
                      <div v-if="isLogin === null || isLogin === -1 || isLogin === (-1+'')">
                        <el-popover
                          placement="bottom"
                          width="200"
                          trigger="click"
                          content="请先登录">
                          <!--                          <el-button type="warning" slot="reference">收藏文献</el-button>-->
                          <div class="bottom-btn"
                               slot="reference">
                            <img src="@/assets/点赞.png" width="6%"/>
                            点赞&emsp;&emsp;已有{{ item.likes_num }}点赞
                          </div>
                        </el-popover>
                      </div>
                      <div v-else>
                        <div class="bottom-btn"
                             v-if="!item.isLike"
                             @click="addLike(item.comment_id);item.isLike =!item.isLike;item.likes_num = item.likes_num +1">
                          <!--                        评论的id addlike要知道 评论id 文献id 点赞人id 然后在前端把item.done 设置成true-->
                          <img src="@/assets/点赞.png" width="6%"/>
                          点赞&emsp;&emsp;已有{{ item.likes_num }}点赞
                        </div>
                        <div class="bottom-btn"
                             v-else
                             @click="cancelLike(item.comment_id);item.isLike =!item.isLike;item.likes_num = item.likes_num -1">
                          <img src="@/assets/已点赞.png" width="6%"/>
                          点赞&emsp;&emsp;
                          已有{{ item.likes_num }}点赞
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <div class="downFrameContent" v-else>
          <div class="notAbstract" style="border: lightgrey solid 1px">
            <div style="height:30px"></div>
            <div style="text-align:center">
              <img src="@/assets/无评论.png">
            </div>
            <div style="text-align:center">
              无评论
            </div>
            <div style="height:30px"></div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="input-box">
          <div class="top">
            <div>
              <el-avatar shape="circle" :size="50" :src="head"></el-avatar>
            </div>
            <div style="width: 100%">
              <div class="author-name">
                {{ name }}
              </div>
              <div class="description-box">
                {{ description }}
              </div>
            </div>
          </div>
          <div class="input-box">
            <div id="div1"></div>
            <div class="btn-box">
              <div v-if="isLogin === null || isLogin === -1 || isLogin === (-1+'')">
                <el-popover
                  placement="bottom"
                  width="200"
                  trigger="click"
                  content="请先登录">
                  <el-button type="primary" slot="reference">提交</el-button>
                </el-popover>
              </div>
              <div v-else>
                <el-button type="primary" @click="addComment">提交</el-button>
              </div>
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
    this.isLogin = localStorage.getItem('user_id')
    this.getCommentsList()
    this.getUserInfor()
    this.getUserTou()
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
      user_id:'',
      name: '',
      head: '',
      description: '',
      isLogin:'',
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
      data:'',
      commentsList:[],
      otherHead:[],
      heads:'',
      urlTouXiang:'http://139.9.132.83:8000/user/getUserImage?user_id=',
    }
  },
  methods: {
    toUser(id){
      this.$router.push({
        path: '/userHome',
        query: {
          id: id  }
      })
    },
    getUserInfor(){
      this.user_id = localStorage.getItem('user_id')
      this.axios({
        method: "get",
        url:'http://139.9.132.83:8000/user/GetUserInfo?user_id=' + this.user_id,
        data:{
          user_id:this.user_id
        }
      })
        .then(response=>{
          console.log(response.data)
          this.name = response.data.data.name
          this.description = response.data.data.summary
        })
    },
    getUserTou(){
      this.user_id = localStorage.getItem('user_id')
      this.head = 'http://139.9.132.83:8000/user/getUserImage?user_id=' + this.user_id
    },
    getCommentsList(){
      this.user_id = localStorage.getItem('user_id')
      console.log(this.user_id)
      console.log('进入获取评论');
      console.log(this.$route.params.paper_id)
      this.axios({
        method: "get",
        // url:'http://139.9.132.83:8000/communicate/comment_get?commented_id=' + this.$store.state.paper_id,
        url:'http://139.9.132.83:8000/communicate/comment_get?commented_id=' + this.$route.params.paper_id + '&&like_id='+ this.user_id,
        data:{
          // commented_id: this.$store.state.paper_id
          commented_id:this.$route.params.paper_id,
          like_id:this.user_id,
        },
        // timeout:1000,
      })
        .then(response=>{
          console.log('获取评论信息')
          console.log(response.data)
          console.log(this.commentsList)
          //这里再赋值
          this.commentsList = []
          this.otherHead = []
          for(var i = 0; i < response.data.list.length; i++){
            this.commentsList.push(response.data.list[i])
            var h = 'http://139.9.132.83:8000/user/getUserImage?user_id=' + response.data.list[i].commentator_id
            this.otherHead.push(h)

          }
          console.log(this.otherHead[0])
          console.log(this.commentsList)
        })
    },
    addComment(){
      this.user_id = localStorage.getItem('user_id')
      console.log(this.user_id)
      const data = this.editor.txt.html()
      console.log(data)
      this.axios({
        method: "post",
        url:"http://139.9.132.83:8000/communicate/comment_add",
        data:{
          commented_id: this.$route.params.paper_id, //论文id
          commentator_id: this.user_id,      //评论人id
          comment_content: data,    //评论内容
        },
        // timeout:1000,
      })
        .then(response=>{
          console.log('成功？')
          console.log(response.data)
          this.getCommentsList()
        })
    },
    addLike(comment_id){
      console.log(comment_id)
      this.user_id = localStorage.getItem('user_id')
      console.log(this.user_id)
      this.axios({
        method: "post",
        url: "http://139.9.132.83:8000/communicate/like",
        data:{
          user_id:this.user_id,                   //用户id
          post_id: this.$route.params.paper_id,   //文献id
          comment_id: comment_id                  //评论id
        }
      })
        .then(response=>{
          console.log('点赞成功')
        })
      // this.getCommentsList()
    },
    cancelLike(comment_id){
      console.log(comment_id)
      this.user_id = localStorage.getItem('user_id')
      console.log(this.user_id)
      this.axios({
        method: "post",
        url: "http://139.9.132.83:8000/communicate/Cancellike",
        data:{
          user_id:this.user_id,
          post_id: this.$route.params.paper_id,
          comment_id: comment_id
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
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
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
  width: 20%;
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

.bottom-btn:hover{
  cursor: pointer;
}

.bottom-btn-mouse-on {
  font-weight: bold;
  text-decoration: underline;
}

.author-name:hover{
  cursor: pointer;
}
</style>
