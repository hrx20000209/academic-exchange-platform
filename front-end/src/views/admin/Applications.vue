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
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="institution"
            label="机构">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mediate"
                @click="detailsVisible=true">详情
              </el-button>
              <el-button
                size="mediate"
                type="primary"
                @click="handleDelete(scope.$index, scope.row)">同意
              </el-button>
              <el-button
                size="mediate"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">拒绝
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>

   <!-- 以下内容为点击"查看详情后"弹出的信息框 -->
    <el-dialog title="详细信息" :visible.sync="detailsVisible">
      <el-descriptions title="用户名" direction="vertical" :column="4" border>
        <el-descriptions-item label="姓名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="邮箱" :span="2">12345678@qq.com</el-descriptions-item>
        <el-descriptions-item label="机构" >北京航空航天大学软件学院</el-descriptions-item>
        <el-descriptions-item label="学历" >博士</el-descriptions-item>
        <el-descriptions-item label="研究方向" :span="2">计算机科学 软件工程</el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag>学校</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <div class="btn-box">
        <el-button type="primary" @click="detailsVisible=false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Applications",
  data() {
    return {
      detailsVisible: false,
      tableData: [{
        date: '2016-05-02',
        name: '谭火彬',
        institution: '北京航空航天大学软件学院'
      }, {
        date: '2016-05-04',
        name: '👓🐸',
        institution: '上海交通大学'
      }, {
        date: '2016-05-01',
        name: '勒布朗·詹姆斯',
        institution: '洛杉矶湖人队'
      }, {
        date: '2016-05-03',
        name: '随便起一个名字',
        institution: '没有机构能通过认证吗'
      }]
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    }
  }
}
</script>

<style scoped>
.btn-box {
  margin-top: 5%;
  text-align: center;
}
</style>
