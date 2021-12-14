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
        <el-button type="primary"
                   plain
                   style="margin-left: 10px"
                   @click="jumpToAuthorPage(author._source.id)">
          前往查看</el-button>
        <el-button type="primary" plain @click="openDialog">我要认证</el-button>
      </div>
    </div>
    <el-dialog
      title="邮箱认证"
      :visible.sync="dialogVisible"
      width="35%"
      append-to-body>
      <div class="letter-body">
        <div class="letter-title">
          <p>您是 {{ author._source.name }} ?  </p>
          <p>我们将通过邮箱验证的方式确认您的身份。</p>
        </div>
        <div class="email-box">
          <a style="margin-top: 1%">邮箱：</a>
          <div style="width: 50%;">
            <el-input v-model="email" size="medium"></el-input>
          </div>
          <el-button type="primary" class="send-code-btn">发送验证码</el-button>
        </div>
        <div class="email-box">
          <a style="margin-top: 1%; width: 18%">验证码：</a>
          <div style="width: 45%;">
            <el-input v-model="code" size="medium" ></el-input>
          </div>
        </div>
        <div class="letter-btn-box">
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "authorSearchResult",
  props: ['author'],
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      email: '',
      code: '',
      dialogVisible: false
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
      this.dialogVisible = true
    },
    confirm() {
      this.dialogVisible = false
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

.el-button {
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
}

.email-box {
  display: flex;
  font-size: larger;
}
</style>
