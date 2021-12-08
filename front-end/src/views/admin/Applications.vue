<template>
  <div>
    <el-card style="height: 100%;">
      <h1>认证申请列表</h1>
      <el-divider></el-divider>
      <el-card>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓名">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="学历">
                  <span>{{ props.row.background }}</span>
                </el-form-item>
                <el-form-item label="电话">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="研究领域">
                  <span>{{ props.row.fields }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="institution"
            label="机构">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="confirm(scope.row.name)">认证
              </el-button>
              <el-button
                size="small"
                type="primary"
                @click="handleDelete(scope.$index, scope.row)">同意
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">拒绝
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>

    <el-dialog title="认证" :visible.sync="detailsVisible" width="80%" append-to-body>
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
import ESApi from "../../api/elastic search";
export default {
  name: "Applications",
  data() {
    return {
      detailsVisible: false,
      tableData: [{
        date: '2016-05-02',
        name: 'Tom',
        userName: '谭火彬',
        phone: '12345678910',
        fields: '软件工程 计算机科学',
        background: '博士',
        institution: '北京航空航天大学软件学院'
      }, {
        date: '2016-05-04',
        name: '👓🐸',
        userName: '谭火彬',
        phone: '12345678910',
        fields: '软件工程 计算机科学',
        background: '博士',
        institution: '上海交通大学'
      }, {
        date: '2016-05-01',
        name: '勒布朗·詹姆斯',
        userName: '谭火彬',
        phone: '12345678910',
        fields: '软件工程 计算机科学',
        background: '博士',
        institution: '洛杉矶湖人队'
      }, {
        date: '2016-05-03',
        name: '随便起一个名字',
        userName: '谭火彬',
        phone: '12345678910',
        fields: '软件工程 计算机科学',
        background: '博士',
        institution: '没有机构能通过认证吗'
      }],
      authors: []
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    confirm(name){
      this.detailsVisible = true
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
      this.detailsVisible = false
    },
    associate(id) {
      console.log(id)
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
</style>
