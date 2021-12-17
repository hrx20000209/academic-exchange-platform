<template>
  <div>
    <el-card style="height: 747px;">
      <h1>诉求列表</h1>
      <el-divider></el-divider>
      <div class="list-box">
        <el-table
          :data="AppealList"
          stripe
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            type="index"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="author_name"
            label="申诉门户">
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
                @click="confirm(scope.row.name)">处理
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
    <el-dialog title="详细信息" :visible.sync="detailsVisible" width="50%" append-to-body>
      <el-descriptions class="margin-top" :title="userDetail.userName" :column="2" border>
        <template slot="extra">
          <el-button type="primary" @click="visitUser" plain>查看用户主页</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ userDetail.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          {{ userDetail.phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-reading"></i>
            学历
          </template>
          {{ userDetail.background }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            机构
          </template>
          {{ userDetail.institution }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-view"></i>
            研究领域
          </template>
          {{ userDetail.fields }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="btn-box">
        <el-button type="primary" @click="closeDetail">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="认证" :visible.sync="relatedVisible" width="80%" append-to-body>
      <h2>系统中存在以下相关学者</h2>
      <div class="text-box">请对该用户的身份进行匹配并完成认证，完成认证后用户即可关联该学者门户</div>
      <el-table
        :data="authors"
        style="width: 100%"
        border
        :default-sort = "{prop: 'name', order: 'ascending'}">
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="n_pubs"
          label="发表数量"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="pub"
          label="代表文献">
        </el-table-column>
        <el-table-column
          prop="n_citation"
          label="被引用量"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="organization_1"
          label="机构">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="success" plain @click="associate(scope.row.id)" size="small">关联</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-box">
        <el-button type="primary" @click="confirmApplication">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAppealList, getUsrInfo } from "../../request/api"
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
        userName: '',
        author_id: '',
        author_name: '',
      }],
      tableData: [{
        name: 'Tom',
        user_id: 1,
      }],
      authors: []
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
      })
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
      this.SearchAuthorByName(name)
    },
    SearchAuthorByName(name) {
      ESApi.getAuthor(name).then(response => {
        const length = response.data.hits.hits.length
        for (let i = 0; i < length; i++) {
          const data = response.data.hits.hits[i]
          let obj = this.default()
          obj.id = data._id
          obj.name = data._source.name
          obj.n_pubs = data._source.n_pubs
          obj.n_citation = data._source.n_citation
          obj.pubs = data._source.pubs
          if (data._source.orgs.length === 0) {
            obj.organization_1 = 'None'
          } else if (data._source.orgs.length === 1) {
            obj.organization_1 = data._source.orgs[0].name
          } else {
            obj.organization_1 = data._source.orgs[0].name
            obj.organization_2 = data._source.orgs[1].name
          }
          if (obj.n_pubs === 0) {
            obj.pub = 'None'
          } else {
            obj.pub = obj.pubs[0].title
          }
          this.authors.push(obj)
        }
      })
    },
    default() {
      return {
        id: '',
        name: '',
        n_pubs: 0,
        n_citation: 0,
        organization_1: '',
        organization_2: '',
        pubs:[],
        pub: ''
      }
    },
    confirmApplication() {
      this.relatedVisible = false
    },
    openDetails(user) {
      this.detailsVisible = true
      this.userDetail = user
    },
    associate(id) {
      console.log(id)
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

</style>
