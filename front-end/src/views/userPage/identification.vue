<template>
  <div class="background">
    <nav_with_search-box></nav_with_search-box>
    <div class="main">
      <h2 class="title-box">认证学者申请</h2>
      <div class="description-box">
        请按照要求如实填写以下信息，信息的真实性将影响您的认证申请能否通过。
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
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="info.email"
              placeholder="邮箱是我们与您取得联系的方式，请填写您常用的邮箱"
              @change="checkInput"
            ></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="step-box">
        <el-steps :active="step" finish-status="success">
          <el-step title="第一步 用户填写信息" description="请按照实际情况填写信息"></el-step>
          <el-step title="第二步 用户提交申请" description="点击提交按钮提交申请"></el-step>
          <el-step title="第三步 管理员审核用户申请" description="您的认证申请正在审核，请耐心等待"></el-step>
          <el-step title="第四步 审核完成" description="用户查看申请结果"></el-step>
        </el-steps>
      </div>
      <div class="bottom-box">
        <div class="result-box" v-if="step===3">
          <el-result icon="warning" title="审核中"></el-result>
        </div>
        <div class="result-box" v-else-if="step===4">
          <el-result icon="success" title="认证通过" v-if="success"></el-result>
          <el-result icon="error" title="认证不通过" v-else></el-result>
        </div>
        <div class="result-box" v-else>
          <el-result icon="info" title="未提交"></el-result>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav_with_searchBox from "../../components/nav_with_searchBox";
export default {
  name: "identification",
  components: { Nav_with_searchBox },
  data() {
    return {
      user_id:localStorage.getItem('user_id'),
      step: 1,
      success: true,
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
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    checkInput() {
      if (this.info.name !== '' && this.info.institution !== '' && this.info.email !== '') {
        this.step = 1
      } else {
        this.step = 0
      }
    },
    submit() {
      this.$confirm('请您确认所有信息是否都已经正确填写。是否确认提交认证申请？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
        } else if (this.info.email === '') {
          this.$message({
            type: 'warning',
            message: '邮箱不能为空'
          });
        } else {
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
          this.step = 2
        }
      })
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

.main {
  margin-left: 5%;
  margin-right: 5%;
  height: 100%;
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
}
</style>
