<template>
  <div id="usrHomePane">
    <nav_with_search-box></nav_with_search-box>
    <div id="topPane">
      <div id="topPicAndAddButton">
        <div id="leftPic">
          <div id="leftPicDetail">
            <el-avatar :size="85" :src="circleUrl"></el-avatar>
          </div>
        </div>
        <div id="middleDetail">
          <div id="usrName">{{ this.user.userName }}</div>
          <div id="editInfoRow">
            <div id="usrDegree">{{ this.user.userDegree }}</div>
            <div id="editYourInfo" @click="editSympleInfo">编辑信息</div>
          </div>
          <div id="usrAbility">{{ this.user.ability }}</div>
        </div>
        <div id="rightButton">
          <el-button type="primary" icon="el-icon-circle-plus">添加成果</el-button>
        </div>
      </div>
      <div id="bottomTab">
        <div id="centerSomeTabs">
          <div class="usrTabsChosen" v-if="activeMode ==1">概述</div>
          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(1)">概述</div>
          <div class="usrTabsChosen" v-if="activeMode ==2">研究</div>
          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(2)">研究</div>
          <div class="usrTabsChosen" v-if="activeMode ==3">学术经历</div>
          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(3)">学术经历</div>
          <div class="usrTabsChosen" v-if="activeMode ==4">统计数据</div>
          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(4)">统计数据</div>
          <div class="usrTabsChosen" v-if="activeMode ==5">学术指数</div>
          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(5)">学术指数</div>
          <div class="usrTabsChosen" v-if="activeMode ==6">你的关注</div>
          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(6)">你的关注</div>
          <div class="usrTabsChosen" v-if="activeMode ==7">你的收藏</div>
          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(7)">你的收藏</div>
        </div>
      </div>
    </div>
    <div id="mainPane">
      <div id="leftMainPane">
        <div v-if="activeMode ==1">
          <div id="editusrInfoPane">
            <edit-usr-info :user="user"></edit-usr-info>
            <about-me :user="user"></about-me>
            <stats-overview :user="user"></stats-overview>
            <div id="researchLine">
              <div id="researchInfo">研究项目</div>
              <el-divider></el-divider>
            </div>
            <research-overview></research-overview>
          </div>
        </div>
        <div v-else-if="activeMode == 2">2</div>
      </div>
      <div id="rightMainPane">
        <div v-if="activeMode ==1">
          <institute-belong-to></institute-belong-to>
          <follow-same></follow-same>
        </div>
      </div>
    </div>
    <div id="footer"></div>
    <el-dialog title="修改简介" :visible.sync="dialogFormVisible" id="infoDialog">
      <el-form :model="form">
        <div id="directionInfo">当前的方向</div>
        <div id="myInput">
          <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
        </div>
        <div id="degreeInfo">学位</div>
        <div id="degreeDetail">
          <el-select v-model="form.region" placeholder="请选择学位">
            <el-option label="计算机科学与技术 博士" value="master"></el-option>
            <el-option label="计算机科学与技术 硕士" value="doctor"></el-option>
            <el-option label="计算机科学与技术 学士" value="bachelor"></el-option>
          </el-select>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div id="twoButton">
          <button @click="dialogFormVisible = false" class="cancel">取 消</button>
          <button @click="dialogFormVisible = false" class="confirm">确 定</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Nav_with_searchBox from "../components/nav_with_searchBox";
import EditUsrInfo from "../components/editUsrInfo";
import AboutMe from "../components/aboutMe";
import StatsOverview from "../components/statsOverview";
import ResearchOverview from "../components/researchOverview";
import InstituteBelongTo from "../components/instituteBelongTo";
import FollowSame from "../components/followSame";

export default {
  name: "userHome",
  components: {FollowSame, InstituteBelongTo, ResearchOverview, StatsOverview, AboutMe, EditUsrInfo, Nav_with_searchBox},
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      user: {
        userName: '谭火彬',
        userDegree: '计算机科学与技术 博士学位',
        ability: 'css,UML,html,Java,python',
        inti: '北京航空航天大学(BUAA)',
        language: 'Python,Java',
        Intro: '计算机视觉 神经网络',
        area: '软件工程',
        tech:'java编程 SQL C++'
      },
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '100px',
      activeMode: 1,
    }
  },
  mounted() {
  },
  methods: {
    editSympleInfo() {
      this.dialogFormVisible = true
    },
    selectActiveMode(flag) {
      if (flag == 1) {
        this.activeMode = 1;
      } else if (flag == 2) {
        this.activeMode = 2;
      } else if (flag == 3) {
        this.activeMode = 3;
      } else if (flag == 4) {
        this.activeMode = 4;
      } else if (flag == 5) {
        this.activeMode = 5;
      } else if (flag == 6) {
        this.activeMode = 6;
      } else if (flag == 7) {
        this.activeMode = 7;
      }
    }
  }
}
</script>

<style scoped>
#topPane {
}

#usrHomePane {
  background-color: whitesmoke;
}

#topPicAndAddButton {
  background: #ffffff;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
}

#leftPic {
  display: inline;
  flex-direction: column;

}

#leftPicDetail {
  display: inline-flex;
}
.confirm {
  font-family: "Microsoft YaHei UI";
  display: inline;
  background-color: transparent;
  background-color: #0080ff;
  font-family: "Roboto", Arial, sans-serif;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  margin-left: 10px;
  padding: 10px 20px 10px 20px;
  border: none;
}
.confirm:hover{
  color: white;
  background: #005abb;
}
.cancel{
    font-family: "Microsoft YaHei UI";
  display: inline;
  background-color: transparent;
  color: #0080ff;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  padding: 10px 20px 10px 20px;
  border: none;
}
.cancel:hover{
  background-color: whitesmoke;
}
#rightButton {
  margin-top: auto;
  margin-bottom: auto;
}

#middleDetail {
  width: 700px;
  padding-left: 30px;
}
/deep/ .el-icon-close:before {
    content: "\E6DB";
    color: white;
}
#usrName {
  font-size: 20px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  letter-spacing: 5px;
  color: #343434;
}

#usrDegree {
  margin-top: 10px;
  font-size: 13px;
  font-family: "Microsoft YaHei";
  letter-spacing: 2px;
  color: #606266;
}

#editInfoRow {
  display: inline-flex;
}

#usrAbility {
  margin-top: 2px;
  font-size: 13px;
  font-family: "Microsoft YaHei";
  letter-spacing: 2px;
  color: #343434;
}

#editYourInfo {
  margin-top: 10px;
  font-size: 10px;
  font-family: "Microsoft YaHei";
  letter-spacing: 2px;
  border-bottom: #606266 1px solid;
  color: #606266;
  margin-left: 10px;
}

#editYourInfo {
  cursor: pointer;
}

#infoDialog {
  color: #343434;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;

}

#directionInfo {
  font-family: "Microsoft YaHei";
  font-size: 15px;
}

#myInput {
  margin-top: 10px;
}

#degreeInfo {
  margin-top: 10px;
}

/deep/ .el-select > .el-input {
  width: 459px;
  display: block;
}
/deep/ .el-dialog__header {
    padding: 20px 20px 10px;
    background-color: #00a39e;
    height: 30px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: white;
}
/deep/ .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
  color: white !important;
}
#degreeDetail {
  margin-top: 10px;
}

/deep/ .el-dialog__footer {
  padding: 20px 0px 0px 0px;
  text-align: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.dialog-footer {
  border-top: gainsboro 1px solid;
  background-color: #f5f5f5;
}

#twoButton {
  margin-top: 10px;
  margin-right: 10px;
  padding-bottom: 10px;
}

#rightButton {
  color: gainsboro;
  width: 100px;
}

#bottomTab {
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: row;
  border-bottom: gainsboro 1px solid;
}

#centerSomeTabs {
  width: 900px;
  display: inline-flex;
  margin-left: auto;
  margin-right: auto;
}

.usrTabsUnchosen {
  border-bottom: transparent 2px solid;
  color: darkgray;
  font-family: "Microsoft YaHei UI Light";
  font-size: 14px;
  padding-bottom: 20px;
  margin-left: 8px;
}

.usrTabsUnchosen:hover {
  color: #005abb;
}

.usrTabsChosen {
  color: #005abb;
  border-bottom: #005abb 2px solid;
  margin-left: 10px;
  font-family: "Microsoft YaHei UI Light";
  padding-bottom: 2px;
  font-size: 14px;
  padding-bottom: 20 hpx;
  margin-left: 8px;
}

#editusrInfoPane {
  width: 550px;
  margin-top: 20px;
}

#mainPane {
  display: flex;
  justify-content: center;
}

#leftMainPane {
  display: flex;
}

#rightMainPane {
  margin-left: 20px;
  width: 350px;
}
#researchLine{
  display: flex;
}
#researchInfo{
  width: 100px;
  padding: 10px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  color: #606266;
}
#footer{
  background-color: whitesmoke;
  height: 50px;
  width: 100%;
}
</style>
