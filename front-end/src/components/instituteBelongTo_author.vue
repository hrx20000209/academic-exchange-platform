<template>
  <div id="instituteBelongTo">
    <div id="topHead">
      <div id="leftCharacter" style="display: flex">
                        <div style="margin-top: 1px">
          <svg style="margin-right: 5px" t="1639837762413" class="icon" viewBox="0 0 1061 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13572" width="20" height="20"><path d="M288.174863 456.043716v326.411657c0 7.460838 6.528233 13.989071 13.989071 13.989071h1.86521c7.460838 0 13.989071-6.528233 13.989071-13.989071v-326.411657c0-7.460838-6.528233-13.989071-13.989071-13.989071h-1.86521c-8.393443 0-13.989071 5.595628-13.989071 13.989071zM396.357013 456.043716v326.411657c0 7.460838 6.528233 13.989071 13.989071 13.989071h1.865209c7.460838 0 13.989071-6.528233 13.989071-13.989071v-326.411657c0-7.460838-6.528233-13.989071-13.989071-13.989071H410.346084c-7.460838 0-13.989071 5.595628-13.989071 13.989071zM505.471767 456.043716v326.411657c0 7.460838 6.528233 13.989071 13.989071 13.989071h1.865209c7.460838 0 13.989071-6.528233 13.989071-13.989071v-326.411657c0-7.460838-6.528233-13.989071-13.989071-13.989071h-1.865209c-8.393443 0-13.989071 5.595628-13.989071 13.989071zM613.653916 456.043716v326.411657c0 7.460838 6.528233 13.989071 13.989071 13.989071h1.86521c7.460838 0 13.989071-6.528233 13.989071-13.989071v-326.411657c0-7.460838-6.528233-13.989071-13.989071-13.989071h-1.86521c-7.460838 0-13.989071 5.595628-13.989071 13.989071zM722.76867 456.043716v326.411657c0 7.460838 6.528233 13.989071 13.989071 13.989071h1.86521c7.460838 0 13.989071-6.528233 13.989071-13.989071v-326.411657c0-7.460838-6.528233-13.989071-13.989071-13.989071H736.757741c-8.393443 0-13.989071 5.595628-13.989071 13.989071z" fill="#D53124" p-id="13573"></path><path d="M860.794171 398.222222L527.854281 194.91439s-0.932605 0-0.932605-0.932605h-0.932605c-0.932605 0-0.932605-0.932605-1.865209-0.932605H521.326047h-0.932604H517.595628h-0.932604c-0.932605 0-0.932605 0-1.86521 0.932605h-0.932605s-0.932605 0-0.932604 0.932605L179.992714 398.222222c-6.528233 3.730419-9.326047 12.123862-6.528233 18.652095 3.730419 9.326047 13.989071 12.123862 21.449909 7.460838L456.976321 263.92714c39.169399-24.247723 88.59745-24.247723 127.766848 0l262.061931 160.408015c7.460838 4.663024 18.652095 1.865209 21.449909-7.460838 2.797814-6.528233-0.932605-14.921676-7.460838-18.652095z" fill="#2C2F35" p-id="13574"></path><path d="M217.296903 456.976321h607.125684c9.326047 0 16.786885-7.460838 16.786885-16.786886s-7.460838-16.786885-16.786885-16.786885H217.296903c-9.326047 0-16.786885 7.460838-16.786885 16.786885-0.932605 8.393443 6.528233 16.786885 16.786885 16.786886zM217.296903 813.23133h607.125684c9.326047 0 16.786885-7.460838 16.786885-16.786886s-7.460838-16.786885-16.786885-16.786885H217.296903c-9.326047 0-16.786885 7.460838-16.786885 16.786885-0.932605 9.326047 6.528233 16.786885 16.786885 16.786886z" fill="#2C2F35" p-id="13575"></path></svg></div>
        所在机构</div>
<!--      <div id="rightButton" @click="showDialog">-->
<!--        <div>编辑</div>-->
<!--        <i class="el-icon-edit"></i>-->
<!--      </div>-->
    </div>
    <div id="mainPane">
      <div v-if="user.orgs.length>0">
        <div id="someIns" v-for="(item,index) in user.orgs" :key='index'>
          <div id="insName" >{{ titleCase2(item.name) }}</div>
          <div id="intoButton">
            <el-button size="mini" plain @click="toAffli(item.id)">查看</el-button>
          </div>
        </div>
      </div>
      <el-empty description="暂无机构信息" :image-size="55" style="padding: 10px" v-else></el-empty>
<!--      <div id="leftDescription">-->
<!--       -->
<!--&lt;!&ndash;        <div class="desInfo">地点</div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="desDetail">中国北京</div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="desInfo">部门</div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="desDetail">软件工程学院(SEI)</div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="desInfo">职位</div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="desDetail">待补充</div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="desInfo">时间段</div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="desDetail">2011年8月-至今</div>&ndash;&gt;-->
<!--      </div>-->
<!--      <div id="rightPic">-->
<!--        <el-avatar :size="60" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"></el-avatar>-->
<!--      </div>-->
    </div>
<!--    <div id="bottomLab">-->
<!--      <div id="LabName">软件工程实验室</div>-->
<!--      <div class="labInfo">实验室负责人</div>-->
<!--      <div class="labDetail">-->
<!--        <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>-->
<!--        <div id="managerName">谭火彬</div>-->
<!--      </div>-->
<!--      <div class="labInfo">实验室成员(2)</div>-->
<!--      <div class="labDetail">-->
<!--        <div class="labPeople">-->
<!--          <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>-->
<!--          <div class="labPersonName">谭火彬</div>-->
<!--        </div>-->
<!--        <div class="labPeople">-->
<!--          <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>-->
<!--          <div class="labPersonName">梁灏然</div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <el-dialog title="更新您当前的所属机构" :visible.sync="instituteDialog" class="infoDialog">
      <div class="dialogMainPane">
        <div class="introInfo">机构</div>
        <div class="myInput">
          <el-input></el-input>
        </div>
        <div class="introInfo">部门</div>
        <div class="myInput">
          <el-input></el-input>
        </div>
        <div class="introInfo">职位</div>
        <div class="myInput">
          <el-input></el-input>
        </div>
        <div class="introInfo">开始日期</div>
        <div class="myInput">
          <el-input></el-input>
        </div>
        <div class="introInfo">描述</div>
        <div class="myInput">
          <div class="myInput">
            <el-input autocomplete="off" type="textarea" rows="2"></el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="twoButton">
          <el-button @click="DialogCancel" class="cancel">取 消</el-button>
          <el-button type="primary" @click="DialogConfirm" class="confirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ESApi from "../api/elastic search"
export default {
  name: "instituteBelongTo_author",
  props:["user"],
  data() {
    return {
      instituteDialog: false,
      institute:[],
    }
  },
  methods: {
    titleCase2(s) {
      return s.toLowerCase().replace(/\b([\w|‘]+)\b/g, function (word) {
        //return word.slice(0, 1).toUpperCase() + word.slice(1);
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
      });
    },
    showDialog() {
      this.instituteDialog = true;
    },
    DialogCancel() {
      this.instituteDialog = false;
    },
    DialogConfirm() {
      this.instituteDialog = false;
    },
    prepareDate(id){
      ESApi.getInstituteInfo(id).then(response=>
      {
        console.log(response)
        this.institute = response.data.hits.hits[0]._source
      })
    },
    toAffli(id){
      this.$router.push({
        path:'/Institution',
        query:{
          id:id,
        }
        }
      )
    }
  },
  mounted() {
    console.log(this.user)
    // this.prepareDate(this.user.orgs[0].id)
  }
}
</script>

<style scoped>
#instituteBelongTo {
  background-color: white;
  border: 1px solid #dedede;
  border-radius: 2px;
  margin-top: 30px;
  box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
  height: 160px;
}
#intoButton{
  margin-left: auto;
  margin-right: 10px;
  /*margin-right: 10px;*/
}
#someIns{
  display: flex;
  margin-top: 8px;
}
#leftCharacter {
  width: 250px;
  padding: 10px;
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  color: #525252;
}

#topHead {
  display: flex;
  justify-content: flex-start;
}

#mainPane {
  /*display: flex;*/
  border-top: 1px solid #dedede;
}

#leftDescription {
  width: 250px;
}

#insName {
  font-family: "Roboto",Arial,sans-serif;
  width: 300px;
  font-weight: bold;
  font-size: 16px;
  color: black;
  margin-top: 5px;
  margin-left: 10px;
  overflow:hidden;

text-overflow:ellipsis;

white-space:nowrap;
}

.desInfo {
  margin-top: 15px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 17px;
  color: #7f7f7f;
}

.desDetail {
  margin-top: 3px;
  font-family: "Microsoft YaHei";
  font-size: 17px;
  color: black;
}

#rightPic {
  margin-top: 10px;
}

.infoDialog {
  color: #343434;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/deep/ .el-dialog__header {
  padding: 20px 20px 10px;
  background-color: #00a39e;
  height: 30px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: white !important;
}

/deep/ .el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: white !important;
}

/deep/ .el-icon-close:before {
  content: "\E6DB";
  color: white;
}

.dialogMainPane {
  padding: 10px 20px 5px 20px;
}

.dialogInfo {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 18px;
  color: black;
}

.twoButton {
  border-top: 1px solid #dedede;
  padding: 10px;
}

.confirm {
  font-family: "Microsoft YaHei UI";
  display: inline;
  background-color: transparent;
  background-color: #0080ff;
  font-family: "Roboto", Arial, sans-serif;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  margin-left: 10px;
  padding: 10px 20px 10px 20px;
  border: none;
}

.confirm:hover {
  color: white;
  background: #005abb;
}

.cancel {
  font-family: "Microsoft YaHei UI";
  display: inline;
  background-color: transparent;
  color: #0080ff;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 18px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  padding: 10px 20px 10px 20px;
  border: none;
}

.cancel:hover {
  background-color: whitesmoke;
}

/deep/ .el-dialog__body {
  padding: 16px 8px;
  color: #606266;
  font-size: 18px;
  word-break: break-all;
}

.introInfo {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  color: black;
}

.myInput {
  margin-top: 10px;
  height: 50px;
}
#bottomLab{
  border-top: 1px solid #dedede;
  padding: 20px;
}
#LabName{
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 18px;
  color: black;
}
.labInfo{
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: #8e8e8e;
  font-size: 18px;
  margin-top: 10px;
}
.labDetail{
  display: flex;
  margin-top: 5px;
}
.labPersonName{
  font-family: "Microsoft YaHei";
  font-size: 18px;
}
#managerName{
  font-family: "Microsoft YaHei";
  font-size: 18px;
  margin-left: 10px;
  margin-top: 5px;
}
.labPeople{
  margin-left: 5px;
}
#mainPane{

}
</style>
