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
            <div id="editYourInfo" @click="editSimpleInfo">编辑信息</div>
          </div>
          <div id="usrAbility">{{ this.user.ability }}</div>
        </div>
        <div id="rightButton" style="display: block;">
          <div style="margin-top: 5%">
            <el-button type="primary" icon="el-icon-chat-round" @click="openLetter">私信</el-button>
          </div>
          <div style="margin-top: 5%">
            <el-button type="primary" icon="el-icon-circle-plus">关注</el-button>
          </div>
        </div>
      </div>
      <div id="bottomTab">
        <div id="centerSomeTabs">
          <div class="usrTabsChosen" v-if="activeMode === 1">概述</div>
          <div class="usrTabsUnChosen" v-else @click="selectActiveMode(1)">概述</div>
          <div class="usrTabsChosen" v-if="activeMode === 2">研究</div>
          <div class="usrTabsUnChosen" v-else @click="selectActiveMode(2)">研究</div>
<!--          <div class="usrTabsChosen" v-if="activeMode ==3">学术经历</div>-->
<!--          <div class="usrTabsUnChosen" v-else @click="selectActiveMode(3)">学术经历</div>-->
          <div class="usrTabsChosen" v-if="activeMode === 4">统计数据</div>
          <div class="usrTabsUnChosen" v-else @click="selectActiveMode(4)">统计数据</div>
<!--          <div class="usrTabsChosen" v-if="activeMode ==5">学术指数</div>-->
<!--          <div class="usrTabsUnChosen" v-else @click="selectActiveMode(5)">学术指数</div>-->
<!--          <div class="usrTabsChosen" v-if="activeMode ==6">你的关注</div>-->
<!--          <div class="usrTabsUnChosen" v-else @click="selectActiveMode(6)">你的关注</div>-->
<!--          <div class="usrTabsChosen" v-if="activeMode ==7">你的收藏</div>-->
<!--          <div class="usrTabsUnChosen" v-else @click="selectActiveMode(7)">你的收藏</div>-->
        </div>
      </div>
    </div>
    <div class="mainPane">
      <div v-if="activeMode === 1" class="mainPane">
        <div id="leftMainPane">
          <div id="editUsrInfoPane">
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
        <div id="rightMainPane">
          <div v-if="activeMode === 1">
            <institute-belong-to></institute-belong-to>
            <follow-same></follow-same>
          </div>
        </div>
      </div>
      <div v-else-if="activeMode ===  2" class="mainPane">
        <div id="researchPane">
          <div id="researchItem">
            <research-detail-item v-for="(item, index) in research" :key = 'index' :research = 'item'></research-detail-item>
          </div>
        </div>
      </div>
      <div v-else-if="activeMode ===  4" class="mainPane">
        <div id="statsMainPane">
          <stats-digit-total :user="user"></stats-digit-total>
          <cite-and-publish></cite-and-publish>
          <author-relationship></author-relationship>
          <cooperator-pie-chart></cooperator-pie-chart>
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
    <!-- 发送私信弹窗 -->
    <el-dialog
      title="私信"
      :visible.sync="dialogLetterVisible"
      width="35%"
      :before-close="handleClose">
      <div class="letter-body">
        <div>
          <div class="letter-send-box">发送给：</div>
          <el-input v-model="user.userName" disabled></el-input>
          <div class="letter-send-box">私信内容：</div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="text"
            maxlength="250"
            rows="10"
            resize="none"
            show-word-limit
          >
          </el-input>
        </div>
        <div class="letter-btn-box">
          <el-button type="primary" @click="sendLetter">发 送</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Nav_with_searchBox from "../../components/nav_with_searchBox";
import editUsrInfo from "../../components/editUsrInfo";
import AboutMe from "../../components/aboutMe";
import StatsOverview from "../../components/statsOverview";
import ResearchOverview from "../../components/researchOverview";
import InstituteBelongTo from "../../components/instituteBelongTo";
import FollowSame from "../../components/followSame";
import ResearchDetailItem from "../../components/researchDetailItem";
import StatsDigitTotal from "../../components/statsDigitTotal";
import CiteAndPublish from "../../components/stats/citeAndPublish";
import AuthorRelationship from "../../components/stats/authorRelaitionship";
import CooperatorPieChart from "../../components/stats/cooperatorPieChart";

export default {
  name: "userHome",
  components: {
    CooperatorPieChart,
    AuthorRelationship,
    CiteAndPublish,
    StatsDigitTotal,
    ResearchDetailItem,
    FollowSame,
    InstituteBelongTo,
    ResearchOverview,
    StatsOverview,
    AboutMe,
    editUsrInfo,
    Nav_with_searchBox
  },
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
        tech: 'java编程 SQL C++'
      },
      dialogFormVisible: false,
      dialogLetterVisible: false,
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
      text: '',
      research:[
        {
          title: '数据挖掘中的聚类算法综述',
          type:'会议文献',
          publishDate: 'Oct 2021',
          Author: [
            {name:'whdwywd'},
            {name:'whdjwdjw'}
          ],
          hasFull:false,
          abstract:'聚类分析是数据挖掘中重要的研究内容之一,对聚类准则进行了总结,对五类传统的聚类算法的研究现状和进展进行了较为全面的总结,就一些新的聚类算法进行了梳理,根据样本归属关系、样本数据预处理、样本的相似性度量、样本的更新策略、样本的高维性和与其他学科的融合等六个方面对聚类中近20多个新算法,如粒度聚类、不确定聚类、量子聚类、核聚类、谱聚类、聚类集成、概念聚类、球壳聚类、仿射聚类、数据流聚类等,分别进行了详细的概括。这对聚类是一个很好的总结,对聚类的发展具有积极意义。 '
        },{
          title: '数据挖掘中的分类算法综述',
          type:'会议文献',
          publishDate: 'Oct 2021',
          Author: [
            {name:'whdwywd'},
            {name:'whdjwdjw'}
          ],
          hasFull:true,
          abstract:'分类是数据挖掘、机器学习和模式识别中一个重要的研究领域。通过对当前数据挖掘中具有代表性的优秀分类算法进行分析和比较,总结出了各种算法的特性,为使用者选择算法或研究者改进算法提供了依据。此外,提出了评价分类器的5条标准,以便于研究者提出新的有效算法。 '
        },
        {
          title: '数据挖掘中的分类算法综述',
          type:'会议文献',
          publishDate: 'Oct 2021',
          Author: [
            {name:'whdwywd'},
            {name:'whdjwdjw'}
          ],
          hasFull:true,
          abstract:'分类是数据挖掘、机器学习和模式识别中一个重要的研究领域。通过对当前数据挖掘中具有代表性的优秀分类算法进行分析和比较,总结出了各种算法的特性,为使用者选择算法或研究者改进算法提供了依据。此外,提出了评价分类器的5条标准,以便于研究者提出新的有效算法。 '
        },
        {
          title: '数据挖掘中的分类算法综述',
          type:'会议文献',
          publishDate: 'Oct 2021',
          Author: [
            {name:'whdwywd'},
            {name:'whdjwdjw'}
          ],
          hasFull:true,
          abstract:'分类是数据挖掘、机器学习和模式识别中一个重要的研究领域。通过对当前数据挖掘中具有代表性的优秀分类算法进行分析和比较,总结出了各种算法的特性,为使用者选择算法或研究者改进算法提供了依据。此外,提出了评价分类器的5条标准,以便于研究者提出新的有效算法。 '
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    editSimpleInfo() {
      this.dialogFormVisible = true
    },
    openLetter() {
      this.dialogLetterVisible = true
    },
    sendLetter() {
      if (this.text === '') {
        this.$message({
          type: 'warning',
          message: '私信内容不能为空'
        })
      } else {
        this.dialogLetterVisible = false
        this.$message({
          type: 'success',
          message: '发送成功'
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    selectActiveMode(flag) {
      if (flag === 1) {
        this.activeMode = 1;
      } else if (flag === 2) {
        this.activeMode = 2;
      } else if (flag === 3) {
        this.activeMode = 3;
      } else if (flag === 4) {
        this.activeMode = 4;
      } else if (flag === 5) {
        this.activeMode = 5;
      } else if (flag === 6) {
        this.activeMode = 6;
      } else if (flag === 7) {
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
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  padding: 10px 20px 10px 20px;
  border: none;
}

.cancel:hover {
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

.usrTabsUnChosen {
  border-bottom: transparent 2px solid;
  color: darkgray;
  font-family: "Microsoft YaHei UI Light";
  font-size: 14px;
  padding-bottom: 20px;
  margin-left: 15px;
}

.usrTabsUnChosen:hover {
  color: #005abb;
}

.usrTabsChosen {
  color: #005abb;
  border-bottom: #005abb 2px solid;
  margin-left: 15px;
  font-family: "Microsoft YaHei UI Light";
  padding-bottom: 2px;
  font-size: 14px;
  padding-bottom: 20 hpx;
  margin-left: 15px;
}

#editUsrInfoPane {
  width: 550px;
  margin-top: 20px;
}

.mainPane {
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

#researchLine {
  display: flex;
}

#researchInfo {
  width: 100px;
  padding: 10px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  color: #606266;
}

#footer {
  background-color: whitesmoke;
  height: 50px;
  width: 100%;
}

#researchPane {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#researchItem {
  background-color: white;
  border: 1px solid #dedede;
  width: 875px;
  margin-top: 15px;
  border-radius: 1px;
}
#statsMainPane{
  display: block;
}

.letter-body {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%;
}

.letter-send-box {
  margin-top: 3%;
  margin-bottom: 3%;
  font-weight: bolder;
  font-size: larger;
}

.letter-btn-box {
  text-align: right;
  margin-top: 5%;
}
</style>
