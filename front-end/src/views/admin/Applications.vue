<template>
  <div>
    <el-card style="height: 747px;">
      <h1>诉求列表</h1>
      <el-divider></el-divider>
      <div class="list-box">
        <el-table
          :data="appealList"
          stripe
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            type="index"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="user_id"
            label="用户ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="scolar_id"
            label="申诉门户ID">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="large"
                type="primary"
                @click="openDetails(scope.row)">查看详情
              </el-button>
              <el-button
                size="large"
                type="success"
                @click="handle(scope.row)">处理
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-box">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalPage">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog title="详细信息"  :visible.sync="detailsVisible" width="50%" append-to-body>
      <div style="height: 550px">
        <el-descriptions direction="horizontal" :column="8" border>
          <el-descriptions-item label="用户名" :span="4">
            {{ appealDetail.userName }}
          </el-descriptions-item>
          <el-descriptions-item label="申诉门户" :span="4">
            {{ appealDetail.author_name }}
            <el-button type="primary" plain @click="visitAuthor" class="check-btn">查看门户</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="描述" :span="8"> {{ appealDetail.describe }} </el-descriptions-item>
        </el-descriptions>
        <div class="pic-box">
          <el-radio-group v-model="picID">
            <el-radio-button label="1">图片一</el-radio-button>
            <el-radio-button label="2">图片二</el-radio-button>
          </el-radio-group>
        </div>
        <div class="picture">
          <el-image :src=this.appealDetail.pic0 v-if="picID=='1'"></el-image>
          <div v-else-if="picID=='2'">
            <el-image :src=this.appealDetail.pic1 v-if="appealDetail.picNum===2"></el-image>
            <el-empty v-else></el-empty>
          </div>
          <div class="btn-box">
            <el-button type="primary" @click="closeDetail">确定</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="处理申诉"  :visible.sync="handleVisible" width="40%" append-to-body>
      <div class="handle-body">
        <div class="handle-text">请选择处理方式：</div>
        <el-radio-group v-model="handleMethod">
          <div class="choice-box">
            <div class="choice-item">
              <el-radio :label="1" border>申诉通过（被申诉的门户将被解除认证）</el-radio>
            </div>
            <div class="choice-item">
              <el-radio :label="0" border>驳回申诉</el-radio>
            </div>
          </div>
        </el-radio-group>
        <div class="input-box">
          附加信息：
        </div>
        <el-input
          type="textarea"
          placeholder="选填，会以私信的形式通知用户"
          v-model="text"
          maxlength="250"
          rows="8"
          resize="none"
          show-word-limit
        >
        </el-input>
        <div class="confirm-btn-box">
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAppealList, getScolarUserInfo, getUsrInfo, handleAppeal, sendMessage} from "../../request/api"
import ESApi from "../../api/elastic search";
export default {
  name: "Applications",
  data() {
    return {
      detailsVisible: false,
      handleVisible: false,
      handleMethod: 0,
      currentPage: 0,
      totalPage: 5,
      text: '',
      appealList: [{
        issue_id: 0,
        user_id: 0,
        scolar_id: '',
        describe: '',
      }],
      appealDetail: {
        author_name: '',
        describe: '',
        issue_id: '',
        pic0: '',
        scolar_id: '',
        userName: '',
        user_id: ''
      },
      scholar: {
        userName: '',
        user_id: ''
      },
      authors: [],
      picID: 1,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getAppealList({
      }).then(response => {
        this.appealList = response.favorites
        this.getListUserName()
        this.getListAuthorNameAndPic()
      })
    },
    getAnotherUser() {
      getScolarUserInfo({
        author_id: this.appealDetail.scolar_id,
      }).then(response => {
        this.scholar.userName = response.user.name
        this.scholar.user_id = response.user.user_id
      })
    },
    getListUserName() {
      for (let i = 0; i < this.appealList.length; i++) {
        getUsrInfo({
          user_id: this.appealList[i].user_id
        }).then(response => {
          this.appealList[i].userName = response.data.name
        })
      }
    },
    getListAuthorNameAndPic() {
      for (let i = 0; i < this.appealList.length; i++) {
        ESApi.getAuthorInfo(this.appealList[i].scolar_id).then(response => {
          this.appealList[i].author_name = response.data.hits.hits[0]._source.name
        })
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 == 1) {
        return 'row-one';
      } else {
        return 'row-two';
      }
    },
    indexMethod(index) {
      return index + 1
    },
    openDetails(user) {
      this.appealDetail = user
      this.getAnotherUser()
      this.appealDetail.pic0 = 'http://139.9.132.83:8000/user/getAppealPic?issue_id='
                                + this.appealDetail.issue_id + '&number=1'
      if (this.appealDetail.picNum === 2) {
        this.appealDetail.pic1 = 'http://139.9.132.83:8000/user/getAppealPic?issue_id='
          + this.appealDetail.issue_id + '&number=2'
      }
      this.detailsVisible = true
    },
    visitAuthor() {
      const route = this.$router.resolve({
        name: 'authorPage',
        query: {
          id: this.appealDetail.scolar_id
        }
      })
      window.open(route.href, '_blank')
    },
    closeDetail() {
      this.detailsVisible = false
    },
    handle(user) {
      this.appealDetail = user
      this.handleVisible = true
    },
    handleConfirm() {
      handleAppeal({
        issue_id: this.appealDetail.issue_id,
        handle: this.handleMethod
      }).then(response => {
        if (response.message == 'handle success: not remove bounding') {
          this.$message({
            type: 'success',
            message: '处理成功，申诉被驳回'
          })
          if (this.text.length === 0) {
            this.text = '您的申诉已被驳回，请修改后重新提交！'
          }
          sendMessage({
            sender_id: 16,
            receiver_name: this.appealDetail.userName,
            text: this.text
          }).then()
        } else {
          this.$message({
            type: 'success',
            message: '处理成功，已解除该门户的绑定'
          })
          if (this.text.length === 0) {
            this.text = '您的申诉成功了，该门户的认证已被撤销！'
          }
          sendMessage({
            sender_id: 16,
            receiver_name: this.appealDetail.userName,
            text: this.text
          }).then()
          sendMessage({
            sender_id: 16,
            receiver_name: this.scholar.userName,
            text: '非常抱歉的通知您，您的认证门户被其他用户申诉成功，该门户已经与您解除绑定。'
          }).then()
        }
      })
      this.handleVisible = false
      this.getList()
    }
  }
}
</script>

<style scoped>
.btn-box {
  margin-top: 5%;
  text-align: center;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-left: 5%;
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.text-box {
  color: grey;
  margin: 1%;
}

.el-table .row-one {
  background: oldlace;
}

.el-table .row-two {
  background: cornflowerblue;
}

.pagination-box {
  margin-top: 10%;
  text-align: center;
}

.list-box {
  box-shadow: 0 0 20px 5px lightgrey;
  padding: 2%;
  height: 580px;
}

.pic-box {
  margin-top: 2%;
}

.picture {
  margin: 2%;
}

.check-btn {
  margin-left: 30%;
  border-radius: 10px;
}

.handle-text {
  font-size: larger;
}

.choice-box {
  margin-top: 5%;
  margin-left: 10%;
}

.choice-item {
  margin-top: 3%;
}

.input-box {
  margin-top: 5%;
  font-size: larger;
}

.handle-body {
  margin-left: 5%;
  margin-right: 5%;
}

.confirm-btn-box {
  text-align: center;
  margin-top: 3%;
}

.el-image {
  height: 40%;
  width: 40%;
}
</style>
