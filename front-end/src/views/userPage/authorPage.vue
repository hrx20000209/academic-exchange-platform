<template>
  <div id="authorPage">
    <nav_with_search-box></nav_with_search-box>
    <div style="background: white">
      <div id="topPane">
        <div id="topPicAndAddButton">
          <div id="leftPic">
            <div id="leftPicDetail">
              <el-avatar :size="85" :src="circleUrl"></el-avatar>
            </div>
          </div>
          <div id="middleDetail">
            <div id="usrName">{{ titleCase2(this.user.name) }}</div>
            <div id="editInfoRow">
              <div id="usrDegree">{{ titleCase2(this.user.orgs[0].name) }}</div>
            </div>
            <div id="acountInfo" v-if="ifHaveAccount == true">该门户已被用户
              <div id="account" @click="toAccountPage">@{{ this.usrName }}</div>
              认领
              <div id="editYourInfo" @click="showAppeal">点此申诉</div>
            </div>
            <div id="usrAbility">{{ this.user.ability }}</div>
          </div>
          <div id="rightButton" style="display: block;">
            <div style="margin-top: 5%">
              <el-button type="primary" icon="el-icon-circle-plus" v-if="ifFollow == false" @click="follow">关注
              </el-button>
              <el-button type="primary" v-else @click="unfollow" icon="el-icon-remove-outline">取关</el-button>
            </div>
            <div style="margin-top: 5%" v-if="canSendMessage">
              <el-button type="primary" icon="el-icon-chat-round" @click="openLetter">私信</el-button>
            </div>
          </div>
        </div>
        <div id="bottomTab">
          <div id="centerSomeTabs">
            <div class="usrTabsChosen" v-if="activeMode ==1">概述</div>
            <div class="usrTabsUnchosen" v-else @click="selectActiveMode(1)">概述</div>
            <div class="usrTabsChosen" v-if="activeMode ==2">研究</div>
            <div class="usrTabsUnchosen" v-else @click="selectActiveMode(2)">研究</div>
            <!--          <div class="usrTabsChosen" v-if="activeMode ==3">学术经历</div>-->
            <!--          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(3)">学术经历</div>-->
            <!--          <div class="usrTabsChosen" v-if="activeMode ==4">统计数据</div>-->
            <!--          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(4)">统计数据</div>-->
            <!--          <div class="usrTabsChosen" v-if="activeMode ==5">学术指数</div>-->
            <!--          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(5)">学术指数</div>-->
            <!--          <div class="usrTabsChosen" v-if="activeMode ==6">你的关注</div>-->
            <!--          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(6)">你的关注</div>-->
            <!--          <div class="usrTabsChosen" v-if="activeMode ==7">你的收藏</div>-->
            <!--          <div class="usrTabsUnchosen" v-else @click="selectActiveMode(7)">你的收藏</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="mainPane">
      <div v-if="activeMode ==1" id="OnePane">
        <div id="topOnePane">
          <div id="leftMainPane">
            <div id="editusrInfoPane">
              <author-card v-if="ifHaveAccount == true" :user="userInfo" :imgsrc="circleUrl"></author-card>
              <stats-overview :user="user"></stats-overview>
              <!--              <div id="researchLine">-->
              <!--                <div id="researchInfo">研究项目</div>-->
              <!--                <el-divider></el-divider>-->
              <!--              </div>-->
              <!--              <research-overview></research-overview>-->
            </div>
          </div>
          <div id="rightMainPane">
            <div v-if="activeMode ==1">
              <about-me_author v-if="ifHaveAccount == true" :user="userInfo"></about-me_author>
              <institute-belong-to_author :user="user"></institute-belong-to_author>
              <!--              <follow-same-author></follow-same-author>-->
            </div>
          </div>
        </div>

        <div id="statsMainPane">
          <!--          <stats-digit-total :user="user"></stats-digit-total>-->
          <div style="display: flex;justify-content: center;margin-top: 10px">
            <cite-and-publish></cite-and-publish>
            <cooperator-pie-chart></cooperator-pie-chart>
          </div>

          <author-relationship></author-relationship>

        </div>
      </div>
      <div v-else-if="activeMode == 2" class="mainPane">
        <div id="researchPane">
          <div id="researchItem">
            <research-detail-item v-for="(item, index) in research" :key='index'
                                  :research='item'></research-detail-item>
          </div>
          <el-pagination
            :total="cutTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
          >
          </el-pagination>
        </div>
      </div>
      <div v-else-if="activeMode == 4" class="mainPane">

      </div>

    </div>
    <div id="footer"></div>
    <el-dialog
      title="门户申诉"
      id="infoDialog"
      :visible.sync="appealDialog" :show-close="false">
      <div class="describe">任何普通用户都可以认领一个未被认领的学者门户。</div>
      <div class="describe">如果您的门户被人冒领，可以在此上传您的证件信息。</div>
      <div class="describe">管理员将在三个工作日内对您的申诉进行审核，请耐心等待。</div>
      <div class="appealInfo">申诉描述</div>
      <div id="appealDetail">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="appealDetail" maxlength="100"

          show-word-limit>
        </el-input>
      </div>
      <div class="appealInfo">上传身份证明</div>
      <el-upload
        ref="appealUpload"
        action="#"
        list-type="picture-card"
        :http-request="submitUpload"
        :auto-upload="false" id="appealUpload"
        :limit="2"
        :on-remove="handleRemove"
        :file-list="this.AppealfileList"
        :on-change="appealChange"
        :on-exceed="whenExceed">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="previewRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img style="justify-content: center" :src="dialogImageUrl" alt="">
      </el-dialog>

      <div slot="footer" class="dialog-footer">

        <div id="twoButton">
          <button @click="appealDialog=false" class="cancel">取 消</button>
          <button @click="submitUpload" class="confirm">确 定</button>
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
          <el-input v-model="usrName" disabled></el-input>
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
import EditUsrInfo from "../../components/editUsrInfo";
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
import AboutMe_author from "../../components/stats/aboutMe_author";
import AuthorCard from "../../components/AuthorCard";
import InstituteBelongTo_author from "../../components/instituteBelongTo_author";
import FollowSameAuthor from "../../components/followSame_author";
import axios from "axios";
import ESApi from "../../api/elastic search"
import {
  checkAuthor,
  checkIfFollow,
  followAuthor,
  getdata,
  getScolarUserInfo, sendMessage,
  undoFollow,
  uploadAppealImage,
  uploadImage,
} from "../../request/api";

export default {
  name: "authorPage",
  components: {
    FollowSameAuthor,
    InstituteBelongTo_author,
    AuthorCard,
    AboutMe_author,
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
    EditUsrInfo,
    Nav_with_searchBox
  },
  data() {
    return {
      user_id: '',
      text: '',
      AppealfileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      appealDetail: '',
      imgRaw: '',
      usrName: '',
      ifHaveAccount: false,
      ifFollow: false,
      cutTotal: 0,
      currentPage3: 1,
      oriResearch: [],
      id: "7F5944CA",
      userInfo: [],
      datas: [],
      linkmes: [],
      ELres: [],
      circleUrl: "http://139.9.132.83:8000/user/getImage?author_id=" + this.$route.query.id,
      add_pic_url: 'http://139.9.132.83:8000/user/submitApeal?user_id=',
      appealDialog: false,
      user: {
        // name: '谭火彬',
        // userDegree: '计算机科学与技术 博士学位',
        // ability: 'css,UML,html,Java,python',
        // inti: '北京航空航天大学(BUAA)',
        // language: 'Python,Java',
        // Intro: '计算机视觉 神经网络',
        // area: '软件工程',
        // tech: 'java编程 SQL C++'
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
      fileList: [],
      formLabelWidth: '100px',
      activeMode: 1,
      canSendMessage: false,
      research: [
        // {
        //   title: '数据挖掘中的聚类算法综述',
        //   type: '会议文献',
        //   publishDate: 'Oct 2021',
        //   Author: [
        //     {name: 'whdwywd'},
        //     {name: 'whdjwdjw'}
        //   ],
        //   hasFull: false,
        //   abstract: '聚类分析是数据挖掘中重要的研究内容之一,对聚类准则进行了总结,对五类传统的聚类算法的研究现状和进展进行了较为全面的总结,就一些新的聚类算法进行了梳理,根据样本归属关系、样本数据预处理、样本的相似性度量、样本的更新策略、样本的高维性和与其他学科的融合等六个方面对聚类中近20多个新算法,如粒度聚类、不确定聚类、量子聚类、核聚类、谱聚类、聚类集成、概念聚类、球壳聚类、仿射聚类、数据流聚类等,分别进行了详细的概括。这对聚类是一个很好的总结,对聚类的发展具有积极意义。 '
        // }, {
        //   title: '数据挖掘中的分类算法综述',
        //   type: '会议文献',
        //   publishDate: 'Oct 2021',
        //   Author: [
        //     {name: 'whdwywd'},
        //     {name: 'whdjwdjw'}
        //   ],
        //   hasFull: true,
        //   abstract: '分类是数据挖掘、机器学习和模式识别中一个重要的研究领域。通过对当前数据挖掘中具有代表性的优秀分类算法进行分析和比较,总结出了各种算法的特性,为使用者选择算法或研究者改进算法提供了依据。此外,提出了评价分类器的5条标准,以便于研究者提出新的有效算法。 '
        // },
        // {
        //   title: '数据挖掘中的分类算法综述',
        //   type: '会议文献',
        //   publishDate: 'Oct 2021',
        //   Author: [
        //     {name: 'whdwywd'},
        //     {name: 'whdjwdjw'}
        //   ],
        //   hasFull: true,
        //   abstract: '分类是数据挖掘、机器学习和模式识别中一个重要的研究领域。通过对当前数据挖掘中具有代表性的优秀分类算法进行分析和比较,总结出了各种算法的特性,为使用者选择算法或研究者改进算法提供了依据。此外,提出了评价分类器的5条标准,以便于研究者提出新的有效算法。 '
        // },
        // {
        //   title: '数据挖掘中的分类算法综述',
        //   type: '会议文献',
        //   publishDate: 'Oct 2021',
        //   Author: [
        //     {name: 'whdwywd'},
        //     {name: 'whdjwdjw'}
        //   ],
        //   hasFull: true,
        //   abstract: '分类是数据挖掘、机器学习和模式识别中一个重要的研究领域。通过对当前数据挖掘中具有代表性的优秀分类算法进行分析和比较,总结出了各种算法的特性,为使用者选择算法或研究者改进算法提供了依据。此外,提出了评价分类器的5条标准,以便于研究者提出新的有效算法。 '
        // }
      ]
    }
  },
  mounted() {
    // this.id=this.$route.query.id
    this.user_id = localStorage.getItem("user_id")
    this.id = this.$route.query.id
    this.getAuthorInfo(this.id)
    this.getAuthorsPaper(this.id)
    this.checkFollow()
    this.getAccountInfo()
    this.checkMessage()
    // this.getdataSource(this.id)
  },
  methods: {
    checkMessage() {
      checkAuthor({
        author_id: this.$route.query.id
      }).then(response => {
        if (response.ifHaveAccount) {
          this.canSendMessage = true
        } else {
          this.canSendMessage = false
        }
      })
    },
    appealChange(file,fileList){
      console.log(file)
      console.log(fileList)
      this.AppealfileList = fileList
    },
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList)
      this.AppealfileList = fileList
    },
    previewRemove(file) {
      this.$refs.appealUpload.handleRemove(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 < 500;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 500kB!');
      }
      return isJPG && isLt2M;
    },
    submitUpload() {
      let formDatas = new FormData()
      formDatas.append('user_id', localStorage.getItem('user_id'))
      formDatas.append('scolar_id', this.$route.query.id)
      if (this.AppealfileList.length < 1) {
        this.$message.error('至少上传一张图片');
      } else {
        formDatas.append('pic0', this.AppealfileList[0].raw)
        if (this.AppealfileList.length > 1) {
          formDatas.append('pic1', this.AppealfileList[1].raw)
        } else {
          formDatas.append('pic1', 'kong')
        }
        formDatas.append('describe', this.appealDetail)
        console.log(formDatas)
        uploadAppealImage(formDatas).then(res => {
          console.log(res)
          this.$message({
            message: '上传成功',
            type: 'success'
          });
        })
      }

    },
    handlePreview(file) {
      console.log(file);
    },
    test(file) {
      console.log(file)
      this.imgRaw = file.raw
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(this.add_pic_url);
      // this.success = response.data.message;
      // this.dialogVisible = true;
    },
    showAppeal() {
      if (localStorage.getItem('user_id') && localStorage.getItem('user_id') != -1) {
        this.appealDialog = true
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning'
        });
      }

    },
    closeAppeal() {
      this.appealDialog = false
    },
    confirmAppeal() {
      this.appealDialog = false
    },
    toAccountPage() {
      this.$router.push({
        path: '/userHome',
        query: {
          id: this.userInfo.user_id
        }
      })
    },
    getAccountInfo() {
      getScolarUserInfo({
        author_id: this.$route.query.id,
      }).then(res => {
        console.log('scolar')
        console.log(res)
        this.ifHaveAccount = res.ifHaveAccount
        this.userInfo = res.user
        this.usrName = this.userInfo.name
        this.userInfo.name = this.user.name
      })
    },
    follow() {
      if (localStorage.getItem('user_id')) {
        followAuthor({
          follow_id: this.$route.query.id,
          follower_id: localStorage.getItem('user_id')
        }).then(res => {
          console.log(res)
          this.checkFollow()
          if (res.message == 'Follow success') {
            this.$message({
              message: '关注成功',
              type: 'success'
            });
          }
        })
      } else {
        this.$alert('请先登录', '提示', {
          confirmButtonText: '确定',
        });
      }
    },
    checkFollow() {
      if (localStorage.getItem('user_id')) {
        checkIfFollow({
          follow_id: this.$route.query.id,
          follower_id: localStorage.getItem('user_id')
        }).then(res => {
          console.log('check')
          console.log(res)
          if (res.message == 'false') {
            this.ifFollow = false
          } else if (res.message == 'true') {
            this.ifFollow = true
          } else {
            this.ifFollow = false
          }
        })
      }
    },
    unfollow() {
      if (localStorage.getItem('user_id')) {
        undoFollow({
          follow_id: this.$route.query.id,
          follower_id: localStorage.getItem('user_id')
        }).then(res => {
          console.log(res)
          this.$message({
            message: '取消关注成功',
            type: 'success'
          });
          this.ifFollow = false
        })
      }
    },
    titleCase2(s) {
      return s.toLowerCase().replace(/\b([\w|‘]+)\b/g, function (word) {
        //return word.slice(0, 1).toUpperCase() + word.slice(1);
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
      });
    },
    getAuthorInfo(id) {
      console.log('this.id')
      ESApi.getAuthorInfo(id).then(response => {
        console.log(response);
        this.ELres = response.data.hits.hits[0]._source;
        this.user = this.ELres;
        if (this.user.orgs.length > 3) {
          this.user.orgs = this.user.orgs.slice(0, 3)
        }
        console.log('this.user')

      })
    },
    getAuthorsPaper(id) {
      ESApi.getAuthorPaper(id).then(res => {
        console.log('ssss')
        console.log(res)
        this.oriResearch = res.data.hits.hits
        for (var i = 0; i < this.oriResearch.length; i++) {
          // console.log(this.research[i]._source.authors)
          if (this.oriResearch[i]._source.authors.length > 4) {
            console.log('22323')
            this.oriResearch[i]._source.authors = this.oriResearch[i]._source.authors.slice(0, 4)
          }
        }
        this.research = this.oriResearch.slice(0, 10);
        console.log(this.research.length)
        this.cutTotal = this.oriResearch.length
        console.log(this.research)
      })
    },
    editSympleInfo() {
      this.dialogFormVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.research = this.oriResearch.slice((val - 1) * 10, val * 10)
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
    },
    getdataSource(id) {
      getdata({
        author_id: id
      }).then(res => {
        console.log(res)
        this.datas = res.datas
        this.linkmes = res.linkmes
      })
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
        sendMessage({
          sender_id: this.user_id,
          receiver_name: this.usrName,
          text: this.text
        }).then(response => {
          if (this.usrName === localStorage.getItem('user_name')) {
            this.$message({
              type: 'warning',
              message: '不能向自己发送信息'
            })
            return
          }
          this.$message({
            type: 'success',
            message: '发送成功'
          })
          this.dialogLetterVisible = false
          this.text = ''
        })
      }
    },
    whenExceed() {
      this.$message.error('最多只能上传两张图片');
    },
    handleClose(done) {
      if (this.text !== '') {
        this.$confirm('确认关闭？正在编辑的私信不会保存哦！')
          .then(_ => {
            done();
            this.text = ''
          })
          .catch(_ => {
          });
      } else {
        done()
      }
    },
  }
}
</script>

<style scoped>
#topPane {
  /*background-size: contain;*/
  /*background: url("../../assets/bg.png");*/
  background: url("../../assets/home-promo-bg.png");
  background-repeat: no-repeat;
  width: 100%;
  /*height: 100%;*/
}

#authorPage {
  background-color: whitesmoke;
  /*background: url("../../assets/v2-bbe20658413deace374c6222356637a8_r.jpg");*/
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

#topPicAndAddButton {
  /*background: #ffffff;*/
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

/deep/ .el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 360px;
  height: 130px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/deep/ .el-upload__tip {
  font-size: 13px;
  color: #606266;
  margin-top: 7px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.confirm {
  display: inline;
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
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  letter-spacing: 2px;
  color: #343434;
  margin-top: 10px;
}

#usrDegree {
  margin-top: 10px;
  font-size: 15px;
  font-family: "Roboto", Arial, sans-serif;
  letter-spacing: 1px;
  color: #3d3d3d;
  font-style: italic
}

#editInfoRow {
  display: inline-flex;
}

#usrAbility {
  margin-top: 2px;
  font-size: 17px;
  font-family: "Roboto", Arial, sans-serif;
  letter-spacing: 2px;
  color: #343434;
}

#editYourInfo {
  margin-top: 1px;
  font-size: 14px;
  font-family: "Roboto", Arial, sans-serif;
  letter-spacing: 2px;
  border-bottom: #606266 1px solid;
  color: #606266;
  margin-left: 10px;
  width: fit-content;
}

#editYourInfo {
  cursor: pointer;
}

#infoDialog {
  color: #343434;
  margin-left: auto;
  margin-right: auto;

}

.upload-demo {
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

#directionInfo {
  font-family: "Roboto", Arial, sans-serif;
  font-size: 18px;
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
  font-family: "Roboto", Arial, sans-serif;
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
  /*background-color: white;*/
  display: flex;
  justify-content: center;
  flex-direction: row;
  box-shadow: 0 5px 10px -5px #a7a7a7;
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
  font-family: "Roboto", Arial, sans-serif;
  font-size: 18px;
  padding-bottom: 20px;
  margin-left: 15px;
}

.usrTabsUnchosen:hover {
  color: #005abb;
}

.usrTabsChosen {
  color: #005abb;
  border-bottom: #005abb 2px solid;
  margin-left: 15px;
  font-family: "Roboto", Arial, sans-serif;
  padding-bottom: 2px;
  font-size: 18px;
  padding-bottom: 20 hpx;
  margin-left: 15px;
}

#editusrInfoPane {
  width: 600px;
  /*margin-top: 30px;*/
}

.mainPane {
  display: flex;
  justify-content: center;
}

#OnePane {
  display: block;
}

#topOnePane {
  display: flex;
}

#leftMainPane {
  display: flex;
}

#rightMainPane {
  margin-left: 40px;
  width: 400px;
  /*margin-top: 10px;*/
}

#researchLine {
  display: flex;
  margin-top: 10px;
}

#researchInfo {
  width: 100px;
  padding: 10px;
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  color: #606266;
}

#footer {
  /*background-color: whitesmoke;*/
  height: 50px;
  width: 100%;
}

#researchPane {
  /*display: flex;*/
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  /*background-color: whitesmoke;*/
  margin-top: 30px;
  background-color: white;
  border: 1px solid #dedede;
  box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
}

#researchItem {
  background-color: white;

  width: 875px;
  border-radius: 1px;
  margin-bottom: 20px;
}

#statsMainPane {
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

/deep/ .el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  width: fit-content;
  font-weight: 700;
  margin-right: auto;
  margin-left: auto;
}

#acountInfo {
  display: flex;
  margin-top: 10px;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 15px;
  letter-spacing: 1px;
}

#account {
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 2px;
  font-style: italic;
  color: #005abb;
}

#account:hover {
  cursor: pointer;
}

#infoDialog {
  color: #343434;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;

}

.describe {
  color: #282828;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 15px;
  line-height: 25px;
  font-weight: bold;
}

.appealInfo {
  font-family: "Roboto", Arial, sans-serif;
  font-size: 15px;
  font-weight: bold;
  margin-top: 15px;
  color: black;
}

#appealDetail {
  margin-top: 15px;
}

#appealUpload {
  margin-top: 15px;
}

/deep/ .el-button--primary {
  color: #FFF;
  background-color: #409EFF;
  border-color: #409EFF;
  padding: 12px 30px;
  margin-top: 5px;
}

/deep/ .el-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
}
</style>
