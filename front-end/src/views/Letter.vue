<template>
  <div class="background">
    <nav_with_search-box></nav_with_search-box>
    <div class="body">
      <div class="middle-box">
        <h2>私信</h2>
        <el-divider></el-divider>
        <div class="main">
          <div class="message-list">
            <div style="height: 95%">
              <div class="new-message-btn-box">
                <el-button
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  @click="newMessage">
                  发送私信
                </el-button>
              </div>
              <div v-for="item in items" :key="item.id">
                <message
                  :name="item.name"
                  :head="item.head"
                  :text="item.text"
                />
              </div>
            </div>
            <div class="page">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="5">
              </el-pagination>
            </div>
          </div>
          <div class="message-details">
            <el-scrollbar style="height: 100%">
              <div v-for="item in messages" :key="item.id">
                <div class="message-details-item-you" v-if="item.name==='你'">
                  <div class="name-box-you"> {{ item.name }} </div>
                  <div class="text-box"> {{ item.text }} </div>
                </div>
                <div class="message-details-item" v-else>
                  <div class="name-box"> {{ item.name }} </div>
                  <div class="text-box"> {{ item.text }} </div>
                </div>
              </div>
            </el-scrollbar>
            <div class="btn-box">
              <el-button type="primary" @click="openLetter">回 复</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="私信"
      :visible.sync="replyLetterVisible"
      width="35%"
      :before-close="handleClose">
      <div class="letter-body">
        <div>
          <div class="letter-send-box">发送给：</div>
          <el-input v-model="receiver.name" disabled></el-input>
          <div class="letter-send-box">私信内容：</div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="text"
            maxlength="250"
            rows="10"
            resize="none"
            show-word-limit
          >
          </el-input>
        </div>
        <div class="letter-btn-box">
          <el-button type="primary" @click="sendLetter">发 送</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="私信"
      :visible.sync="newLetterVisible"
      width="35%"
      :before-close="handleClose">
      <div class="letter-body">
        <div>
          <div class="letter-send-box">发送给：</div>
          <el-input v-model="receiver.name"></el-input>
          <div class="letter-send-box">私信内容：</div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="text"
            maxlength="250"
            rows="10"
            resize="none"
            show-word-limit
          >
          </el-input>
        </div>
        <div class="letter-btn-box">
          <el-button type="primary" @click="sendLetter">发 送</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import nav_with_searchBox from "../components/nav_with_searchBox"
import message from "../components/message"
import { getMessageList } from "../request/api"

export default {
  name: "Letter",
  components: { nav_with_searchBox, message },
  data() {
    return {
      userId: 4,
      replyLetterVisible: false,
      newLetterVisible: false,
      editable: false,
      text: '',
      receiver: {
        name: '谭火彬'
      },
      items: [
        {
          name: '谭火彬',
          head: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          text: [],
        },
        {
          name: '猜猜我是谁',
          head: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          text: [],
        },
        {
          name: '我是你哥哥',
          head: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          text: [],
        }
      ],
      messages: [
        {
          name: '谭火彬',
          text: 'hello'
        },
        {
          name: '你',
          text: 'hello'
        },
        {
          name: '谭火彬',
          text: '你们的组长是谁？'
        },
        {
          name: '你',
          text: '是梁灏然'
        },
        {
          name: '谭火彬',
          text: '好的。你们组的大作业写完了吗？'
        },
        {
          name: '你',
          text: '还没有'
        }
      ]
    }
  },
  mounted() {
    this.LoadMessageList()
  },
  methods: {
    LoadMessageList() {
      getMessageList({
        userId: this.userId
      }).then(response => {
        console.log(response)
      })
    },
    openLetter() {
      this.replyLetterVisible = true
    },
    sendLetter() {
      if (this.text === '') {
        this.$message({
          type: 'warning',
          message: '私信内容不能为空'
        })
      } else {
        this.replyLetterVisible = false
        this.$message({
          type: 'success',
          message: '发送成功'
        })
      }
    },
    newMessage() {
      this.newLetterVisible = true
    },
    handleClose(done) {
      if (this.text !== '') {
        this.$confirm('确认关闭？正在编辑的私信不会保存哦！')
          .then(_ => {
            done();
            this.text = ''
          })
          .catch(_ => {});
      } else {
        done()
      }
    }
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
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
}

.middle-box {
  box-shadow: 0px 0px 50px 20px lightgrey;
  background-color: white;
  width: 60%;
  height: 600px;
  padding: 2%;
}

.message-list {
  width: 30%;
  height: 500px;
}

.message-details {
  padding: 2%;
  box-shadow: 0px 0px 10px 10px #f6f3f3;
  width: 65%;
  height: 425px;
  margin-left: 5%;
}

.main {
  display: flex;
}

.page {
  text-align: center;
  float: bottom;
}

.message-details-item {
  border-radius: 0px 30px 30px 30px;
  margin: 5%;
  border: solid 1px #ededed;
  box-shadow: 10px 10px 10px 5px rgba(232, 232, 231, 0.98);
}

.message-details-item-you {
  border-radius: 30px 0px 30px 30px;
  margin: 5%;
  border: solid 1px #ededed;
  box-shadow: -10px 10px 10px 5px rgba(232, 232, 231, 0.98);
}

.name-box {
  border-radius: 0px 30px 0px 0px;
  font-weight: bolder;
  padding: 2%;
  background-color: lightgrey;
}

.name-box-you {
  border-radius: 30px 0px 0px 0px;
  text-align: right;
  font-weight: bolder;
  padding: 2%;
  background-color: #00ccbb;
  color: whitesmoke;
}

.text-box {
  padding: 5%;
}

.btn-box {
  margin-top: 8%;
  float: right;
}

.letter-body {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%;
}

.letter-send-box {
  margin-top: 3%;
  margin-bottom: 3%;
  font-weight: bolder;
  font-size: larger;
}

.letter-btn-box {
  text-align: right;
  margin-top: 5%;
}

.new-message-btn-box {
  margin-bottom: 5%;
  text-align: center;
}
</style>
