<template>
  <div class="background">
    <nav_with_search-box></nav_with_search-box>
    <div class="main">
      <h2 class="title-box">认证学者申请</h2>
      <div class="description-box">
        请按照要求如实填写以下信息，信息的真实性将提高搜索结果的准确度。
      </div>
      <div class="form-box">
        <el-form ref="form" :model="info" :rules="rules" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="info.name"
              placeholder="请输入真实姓名（必填）"
              @change="checkInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="机构" prop="institution">
            <el-input
              v-model="info.institution"
              placeholder="填写请尽量细化，比如xx大学xx学院xx系，xx医院xx科等"
              @change="checkInput"
            ></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="success">
        <div class="search-result-text">
          为您检索到以下结果：
        </div>
        <div class="search-result">
          <div v-if="authorList.length===0">
            <el-empty description="对不起，没有找到相关学者"></el-empty>
          </div>
          <div v-for="item in authorList" :key="item.id" v-else>
            <author-search-result
              :author="item"
              :user_id="user_id"
            />
          </div>
        </div>
      </div>
      <div class="step-box">
        <el-steps :active="step" finish-status="success">
          <el-step title="第一步 用户填写信息" description="请按照实际情况填写信息"></el-step>
          <el-step title="第二步 搜索门户" description="点击搜索按钮查找是否有您的门户"></el-step>
          <el-step title="第三步 邮箱验证" description="通过邮箱验证码对您的身份进行确认"></el-step>
          <el-step title="认证完成" description="学者门户将与您的账号绑定"></el-step>
        </el-steps>
      </div>
      <div class="bottom-box">
        <div class="result-box" v-if="step===3">
          <el-result icon="warning" title="验证中"></el-result>
        </div>
        <div class="result-box" v-else-if="step===4">
          <el-result icon="success" title="认证完成"></el-result>
        </div>
        <div class="result-box" v-else>
          <el-result icon="info" title="未认证"></el-result>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav_with_searchBox from "../../components/nav_with_searchBox"
import ESApi from "../../api/elastic search"
import AuthorSearchResult from "../../components/authorSearchResult";
export default {
  name: "identification",
  components: {AuthorSearchResult, Nav_with_searchBox },
  data() {
    return {
      user_id: '',
      step: 1,
      success: false,
      info: {
        name: '',
        institution: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
        ],
        institution: [
          { required: true, message: '请输入所属机构', trigger: 'blur' },
        ],
      },
      authorList: []
    }
  },
  mounted() {
    this.user_id = localStorage.getItem('user_id')
  },
  methods: {
    checkInput() {
      if (this.step === 0 && this.info.name !== '' && this.info.institution !== '' && this.info.email !== '') {
        this.step = 1
      } else if (this.step === 1) {
        this.step = 0
      }
    },
    search() {
      if (this.info.name === '') {
        this.$message({
          type: 'warning',
          message: '姓名不能为空'
        });
      }
      else if (this.info.institution === '') {
        this.$message({
          type: 'warning',
          message: '机构不能为空'
        });
      } else {
        ESApi.getAuthor(this.info.name, this.info.institution).then(response => {
          this.authorList = response.data.hits.hits
        })
        this.success = true
        this.step = 2
      }
    }
  }
}
</script>

<style scoped>
.background {
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  width: 100%;
  background-color: #ededed;
}

.main {
  margin-left: 5%;
  margin-right: 5%;
  height: 100vh;
  overflow-y: auto;
  background-color: white;
}

.title-box {
  padding-top: 3%;
  text-align: center;
}

.description-box {
  margin-top: 1%;
  text-align: center;
}

.step-box {
  margin-left: 18%;
  margin-right: 12%;
  margin-top: 3%;
  width: 70%;
}

.form-box {
  position: center;
  margin-left: 26%;
  margin-top: 2%;
  width: 40%;
}

.result-box {
  margin-top: 2%;
  width: 20%;
  text-align: center;
  box-shadow: 0 0 10px 5px lightgrey;
  border-radius: 25px;
}

.bottom-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3%;
  margin-bottom: 5%;
}

.search-result {
  margin-left: 15%;
  margin-right: 15%;
  margin-bottom: 5%;
}

.search-result-text {
  margin-left: 13%;
  margin-bottom: 2%;
}
</style>
