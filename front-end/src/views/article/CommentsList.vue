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
            <comment
              :head="item.head"
              :author="item.author"
              :likeCnt="item.likeCnt"
              :description="item.description"
              :time="item.time"
              :text="item.text"
              :done="item.done"
            />
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
              <el-button type="primary" @click="getEditorData">提交</el-button>
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
import comment from '@/components/Comment'
export default {
  name: "CommentList",
  components: { comment },
  mounted() {
    const editor = new E('#div1')
    editor.config.menus = [
      'bold',
      'italic',
      'fontSize',
      'list'
    ]
    editor.config.showFullScreen = false
    editor.config.height = 150
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml
    }
    editor.create()
    this.editor = editor
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
      ]
    }
  },
  methods: {
    getEditorData() {
      // 这个函数的作用是获取文本框中的内容，点击提交按钮触发
      const data = this.editor.txt.html()
      alert(data)
    }
  }
}
</script>

<style scoped>
.grey{
  background: rgba(221,221,221,0.3);
}
.bigFrame{
  width: 50%;
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
</style>
