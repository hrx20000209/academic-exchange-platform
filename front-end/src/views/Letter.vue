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
                <div class="message-item-box"
                     @mouseover="changeActive($event)"
                     @mouseleave="removeActive($event)"
                     @click="read(item.user_id)">
                  <div>
                    <el-avatar shape="circle" :size="size" :src="item.head"></el-avatar>
                  </div>
                  <div class="item-name-box">
                    {{ item.name }}
                  </div>
                  <div v-if="item.unread" class="new-box">
                    <img :src="require('../assets/new.png')" width="50%" />
                  </div>
                </div>
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
                <div class="message-details-item-you" v-if="item.sender_name==='你'">
                  <div class="name-box-you"> {{ item.sender_name }} </div>
                  <div class="text-box"> {{ item.text }} </div>
                </div>
                <div class="message-details-item" v-else>
                  <div class="name-box"> {{ item.sender_name }} </div>
                  <div class="text-box"> {{ item.text }} </div>
                </div>
              </div>
            </el-scrollbar>
            <div class="btn-box" v-if="this.receiver.name!==''">
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
import { getMessageList, sendMessage, readMessage } from "../request/api"

export default {
  name: "Letter",
  components: { nav_with_searchBox, message },
  data() {
    return {
      userId: '',
      size: 40,
      replyLetterVisible: false,
      newLetterVisible: false,
      editable: false,
      text: '',
      receiver: {
        name: '',
        user_id: ''
      },
      items: [],
      messages: []
    }
  },
  mounted() {
    this.userId = localStorage.getItem('userId')
    this.LoadMessageList()
  },
  methods: {
    messageItem() {
      return {
        name: '',
        user_id: '',
        unread: true,
        head: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      }
    },
    message() {
      return {
        receiver_id: '',
        receiver_name: '',
        sender_id: '',
        sender_name: '',
        text: ''
      }
    },
    LoadMessageList() {
      getMessageList({
        user_id: this.userId
      }).then(response => {
        for(let i = 0; i < response.list.length; i++) {
          let obj = this.messageItem()
          obj.name = response.list[i].user_name
          obj.unread = response.list[i].unread
          obj.user_id = response.list[i].user_id
          this.items.push(obj)
        }
      })
    },
    read(id) {
      readMessage({
        user_id: this.userId,
        the_other_id: id
      }).then(response => {
        if (this.messages.length !== 0) {
          this.messages = []
        }
        for(let i = 0; i < response.list.length; i++) {
          let obj = this.message()
          obj.sender_id = response.list[i].sender_id
          if (this.receiver.name === '' && obj.receiver_id !== this.userId) {
            this.receiver.name = response.list[i].receiver_name
          }
          if (obj.sender_id == this.userId) {
            obj.sender_name = '你'
          } else {
            obj.sender_name = response.list[i].sender_name
            if (this.receiver.name === '' || this.receiver.user_id === '') {
              this.receiver.user_id = response.list[i].sender_id
              this.receiver.name = response.list[i].sender_name
            }
          }
          obj.text = response.list[i].text
          this.messages.push(obj)
        }
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
        sendMessage({
          sender_id: this.userId,
          receiver_name: this.receiver.name,
          text: this.text
        }).then(response => {
          if (response.message === '不能向自己发送信息') {
            this.$message({
              type: 'warning',
              message: '不能向自己发送信息'
            })
          } else if (response.message === 'no this user') {
            this.$message({
              type: 'warning',
              message: '该用户不存在'
            })
          } else {
            this.$message({
              type: 'success',
              message: '发送成功'
            })
            this.newLetterVisible = false
            this.read(this.receiver.user_id)
            this.items = []
            this.LoadMessageList()
          }
        })
        this.text = ''
      }
    },
    newMessage() {
      this.receiver.name = ''
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
    },
    changeActive($event){
      $event.currentTarget.className="message-item-box-move";
    },
    removeActive($event){
      $event.currentTarget.className="message-item-box";
    },
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
  box-shadow: 0 0 50px 20px lightgrey;
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
  box-shadow: 0 0 10px 10px #f6f3f3;
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
  border-radius: 0 30px 30px 30px;
  margin: 5%;
  border: solid 1px #ededed;
  box-shadow: 10px 10px 10px 5px rgba(232, 232, 231, 0.98);
}

.message-details-item-you {
  border-radius: 30px 0 30px 30px;
  margin: 5%;
  border: solid 1px #ededed;
  box-shadow: -10px 10px 10px 5px rgba(232, 232, 231, 0.98);
}

.name-box {
  border-radius: 0 30px 0 0;
  font-weight: bolder;
  padding: 2%;
  background-color: lightgrey;
}

.name-box-you {
  border-radius: 30px 0 0 0;
  text-align: right;
  font-weight: bolder;
  padding: 2%;
  background-color: #00ccbb;
  color: whitesmoke;
}

.text-box {
  padding: 5%;
  background-color: whitesmoke;
  border-radius: 0 0 30px 30px;
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

.message-item-box {
  margin-bottom: 10px;
  display: flex;
  padding: 5%;
  margin-right: 1%;
  box-shadow: 0 0 15px 8px rgba(232, 232, 231, 0.98);
}

.message-item-box-move {
  background-color: #00ccbb;
  margin-bottom: 10px;
  display: flex;
  padding: 5%;
  margin-right: 1%;
  color: whitesmoke;
  box-shadow: 0 0 8px 8px rgba(232, 232, 231, 0.98);
}

.item-name-box {
  width: 120%;
  margin-left: 5%;
  font-size: medium;
}

.new-box {
  margin-right: 0;
  padding-right: 0;
  width: 50%;
}
</style>
