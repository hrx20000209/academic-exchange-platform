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
                type="success">处理
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
          <el-descriptions-item label="用户名" :span="4"> {{ appealDetail.userName }} </el-descriptions-item>
          <el-descriptions-item label="申诉门户" :span="4"> {{ appealDetail.author_name }} </el-descriptions-item>
          <el-descriptions-item label="描述" :span="8"> {{ appealDetail.describe }} </el-descriptions-item>
        </el-descriptions>
        <div class="pic-box">
          <el-radio-group v-model="picID">
            <el-radio-button label="1">图片一</el-radio-button>
            <el-radio-button label="2">图片二</el-radio-button>
          </el-radio-group>
        </div>
        <el-image :src=this.appealDetail.pic0 v-if="picID=='1'"></el-image>
        <div v-else-if="picID=='2'">
          <el-image :src=this.appealDetail.pic1 v-if="appealDetail.picNum===2"></el-image>
          <el-empty v-else></el-empty>
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="closeDetail">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAppealList, getUsrInfo, getAppealPic } from "../../request/api"
import ESApi from "../../api/elastic search";
export default {
  name: "Applications",
  data() {
    return {
      detailsVisible: false,
      relatedVisible: false,
      currentPage: 0,
      totalPage: 5,
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
    confirm(name){
      this.relatedVisible = true
    },
    confirmApplication() {
      this.relatedVisible = false
    },
    openDetails(user) {
      this.appealDetail = user
      this.appealDetail.pic0 = 'http://139.9.132.83:8000/user/getAppealPic?issue_id='
                                + this.appealDetail.issue_id + '&number=1'
      if (this.appealDetail.picNum === 2) {
        this.appealDetail.pic1 = 'http://139.9.132.83:8000/user/getAppealPic?issue_id='
          + this.appealDetail.issue_id + '&number=2'
      }
      this.detailsVisible = true
    },
    visitUser() {
      const route = this.$router.resolve({
        name: 'authorPage',
        query: {
          id: this.userDetail.user_id
        }
      })
      window.open(route.href, '_blank')
    },
    closeDetail() {
      this.detailsVisible = false
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
</style>
