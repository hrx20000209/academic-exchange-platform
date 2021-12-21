<template>
  <div>
    <div class="main-body" @mouseover="changeActive($event)" @mouseleave="removeActive($event)">
      <div>
        <el-avatar :size="85" :src="circleUrl"></el-avatar>
      </div>
      <div class="right-box">
        <div class="name-box">
          <h2> {{ author._source.name }} </h2>
        </div>
        <div v-for="org in author._source.orgs" :key="org.id" class="orgs-box">
          {{ org.name }}
        </div>
        <div class="detail-box">
          <div class="detail-item-box">
            <a class="title">发表文章：</a>
            {{ author._source.n_pubs }}
          </div>
          <div class="detail-box">
            <a class="title">被引次数：</a>
            {{ author._source.n_citation }}
          </div>
        </div>
      </div>
      <div class="btn-box">
        <el-button
          class="item-btn"
          type="primary"
          plain
          style="margin-left: 10px"
          @click="jumpToAuthorPage(author._source.id)"
        >前往查看
        </el-button>
        <el-button
          class="item-btn"
          type="primary"
          plain
          @click="openDialog"
        >我要认证
        </el-button>
      </div>
    </div>
    <el-dialog
      title="邮箱认证"
      :visible.sync="dialogVisible"
      width="35%"
      @close="close"
      append-to-body>
      <div class="letter-body">
        <div class="letter-title">
          <p>您是 <a class="author-name">{{ author._source.name }}</a>  ?  </p>
          <p>我们将通过邮箱验证的方式确认您的身份。</p>
        </div>
        <div class="email-box">
          <div style="width: 100%;">
            <el-input v-model="email" size="medium" placeholder="请使用您所在机构的邮箱认证"></el-input>
          </div>
        </div>
        <div class="email-box">
          <div style="width: 75%;">
            <el-input v-model="code" size="medium" placeholder="请输入验证码"></el-input>
          </div>
          <el-button type="primary" class="send-code-btn" @click="sendCode">发送验证码</el-button>
        </div>
        <div>
          <el-popover placement="right" width="300" trigger="hover">
            <h3 class="refuse-email-title">不可用邮箱列表</h3>
            <div class="refuse-email-list">
              <p>163邮箱：163.com,vip.163.com</p>
              <p>gmail邮箱：gmail.com</p>
              <p>qq邮箱：qq.com</p>
              <p>126邮箱：126.com,vip.126.com</p>
              <p>搜狐邮箱：sohu.com</p>
              <p>139手机邮箱：139.com</p>
              <p>189邮箱：189.cn,189.com</p>
              <p>新浪邮箱：sina.com</p>
              <p>outlook邮箱：outlook.com</p>
              <p>阿里云邮箱：aliyun.com</p>
              <p>hotmail邮箱：hotmail.com</p>
              <p>TOM邮箱：tom.com</p>
              <p>搜狗邮箱： sogou.com</p>
              <p>2980邮箱：2980.com</p>
              <p>21CN邮箱：21cn.com</p>
              <p>188财富邮箱：188.com</p>
              <p>网易yeah邮箱：yeah.net</p>
            </div>
            <el-button
              type="text"
              class="refuse-email-btn"
              icon="el-icon-question"
              slot="reference"
              @click="judgeEmail"
            >查看不可用邮箱类型
            </el-button>
          </el-popover>
        </div>
        <div class="letter-btn-box">
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { identify, checkAuthor, emailIdentify, emailConfirm } from "../request/api";
export default {
  name: "authorSearchResult",
  props: ['author', 'user_id'],
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      email: '',
      code: '',
      dialogVisible: false,
      refuseEmailList: [
        "qq.com",
        "163.com",
        "vip.163.com",
        "gmail.com",
        "126.com",
        "vip.126.com",
        "sohu.com",
        "139.com",
        "189.cn",
        "189.com",
        "sina.com",
        "outlook.com",
        "aliyun.com",
        "hotmail.com",
        "tom.com",
        "sogou.com",
        "2980.com",
        "21cn.com",
        "188.com",
        "yeah.net"
      ]
    }
  },
  methods: {
    changeActive($event) {
      $event.currentTarget.className="main-body-move";
    },
    removeActive($event) {
      $event.currentTarget.className="main-body";
    },
    jumpToAuthorPage(author_id) {
      const route = this.$router.resolve({
        name: 'authorPage',
        query: {
          id: author_id
        }
      })
      window.open(route.href, '_blank')
    },
    openDialog() {
      checkAuthor({
        author_id: this.author._source.id
      }).then(response => {
        if (response.ifHaveAccount) {
          this.$message({
            type: 'warning',
            message: '该门户已被认证'
          })
        } else {
          this.dialogVisible = true
        }
      })
    },
    sendCode() {
      if (this.email.length === 0) {
        this.$message({
          type: 'warning',
          message: '邮箱不能为空'
        })
      } else if (!this.judgeEmail()) {
        this.$message({
          type: 'warning',
          message: '不可用的邮箱类型，请输入其他邮箱'
        })
      } else {
        emailIdentify({
          to_email: this.email
        }).then(response => {
          if (response.message == 'success') {
            this.$message({
              type: 'success',
              message: '验证码已发送'
            })
          }
        })
      }
    },
    close() {
      this.email = ''
      this.text = ''
    },
    confirm() {
      if (this.email.length === 0) {
        this.$message({
          type: 'warning',
          message: '邮箱不能为空'
        })
      } else if (this.code.length === 0) {
        this.$message({
          type: 'warning',
          message: '验证码不能为空'
        })
      } else {
        emailConfirm({
          to_email: this.email,
          re_yzm: this.code
        }).then(response => {
          if (response.message == 'success') {
            identify({
              user_id: this.user_id,
              author_id: this.author._source.id
            }).then(response => {
              console.log(response)
              if (response.message == 'Identify success') {
                this.$message({
                  type: 'success',
                  message: '认证成功'
                })
                this.$router.push({
                  path: 'userHome',
                  query: {
                    id: this.user_id
                  }
                })
              }
              this.dialogVisible = false
            })
          } else {
            this.$message({
              type: 'warning',
              message: '验证码错误'
            })
          }
        })
      }
    },
    judgeEmail() {
      const str = this.email.split("@")[1]
      for (let i = 0; i < this.refuseEmailList.length; i++) {
        if (this.refuseEmailList[i] === str) return false
      }
      return true
    }
  },
}
</script>

<style scoped>
.main-body {
  width: 58vw;
  padding-top: 1%;
  padding-left: 3%;
  padding-bottom: 1%;
  display: flex;
  margin-bottom: 3%;
}

.main-body-move {
  width: 58vw;
  padding-top: 1%;
  padding-left: 3%;
  padding-bottom: 1%;
  display: flex;
  background-color: lightskyblue;
  margin-bottom: 3%;
}

.name-box {

}

.right-box {
  margin-left: 3%;
}

.detail-box {
  margin-top: 1%;
  width: 20vw;
  display: flex;
}

.orgs-box {
  width: 40vw;
}

.detail-item-box {
  margin-right: 10%;
  width: 100%;
}

.btn-box {
  margin-top: 1%;
  margin-right: 10%;
  display: block;
}

.title {
  color: grey;
}

.item-btn {
  margin-bottom: 5%;
  border-radius: 20px;
}

.send-code-btn {
  margin-left: 5%;
  border-radius: 10px;
}

.letter-body {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%;
}

.letter-title {
  margin-bottom: 5%;
}

.letter-btn-box {
  text-align: center;
  margin-top: 5%;
  border-radius: 20px;
}

.email-box {
  margin-top: 3%;
  display: flex;
  font-size: larger;
}

.refuse-email-btn {
  color: grey;
}

.author-name {
  color: #00BFFF;
  font-weight: bolder;
}

.refuse-email-list {
  margin-left: 5%;
}

.refuse-email-title {
  margin-left: 5%;
  margin-bottom: 2%;
  padding-bottom: 2%;
  border-bottom: solid 2px lightgrey;
}
</style>
