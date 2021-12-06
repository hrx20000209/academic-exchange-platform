<template>
  <div id="usrHomePane">
    <nav_with_search-box></nav_with_search-box>
    <div id="topPane">
      <div id="topPicAndAddButton">
        <div id="leftPic">
          <div id="leftPicDetail">
            <el-avatar :size="85" :src=this.get_pic_url v-if="needUpdate" >
<!--              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>-->
            </el-avatar>
          </div>
        </div>
        <div id="middleDetail">
          <div id="usrName">{{ this.user.name }}</div>
          <div id="editInfoRow">
            <div id="usrDegree">{{ this.user.degree }}</div>
            <div id="editYourInfo" @click="editSimpleInfo">编辑信息</div>
          </div>
          <div id="usrAbility">{{ this.user.field }}</div>
        </div>
        <div id="rightButton" style="display: block;">
          <!--          <div style="margin-top: 5%">-->
          <!--            <el-button type="primary" icon="el-icon-chat-round" @click="openLetter">私信</el-button>-->
          <!--          </div>-->
          <!--          <div style="margin-top: 5%" v-if="this.user.user_type">-->
          <!--            <el-button type="primary" icon="el-icon-circle-plus">进入认证门户</el-button>-->
          <!--          </div>-->
          <div style="margin-top: 5%">
            <el-button type="primary" icon="el-icon-circle-plus" @click="toAuthorPage">进入认证门户</el-button>
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
          <div class="usrTabsChosen" v-if="activeMode ==6">你的关注</div>
          <div class="usrTabsUnChosen" v-else @click="selectActiveMode(6)">你的关注</div>
          <div class="usrTabsChosen" v-if="activeMode ==7">你的收藏</div>
          <div class="usrTabsUnChosen" v-else @click="selectActiveMode(7)">你的收藏</div>
        </div>
      </div>
    </div>
    <div class="mainPane">
      <div v-if="activeMode === 1" class="mainPane">
        <div id="leftMainPane">
          <div id="editUsrInfoPane">
            <edit-usr-info :user="user" :imgsrc="this.get_pic_url" :subindex="subNum" :rankindex="rankNum"></edit-usr-info>
            <about-me :user="this.user"></about-me>
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
            <research-detail-item v-for="(item, index) in research" :key='index'
                                  :research='item'></research-detail-item>
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
      <div v-else-if="activeMode ===  6" class="mainPane">
        <my-like-author :user="user" :follow-list="followList"></my-like-author>
      </div>
      <div v-else-if="activeMode ===  7">
        <my-collection :user="user" :collection-list="collectionList"></my-collection>
        <div style="display: block">
          <div style="height: 300px;width: 800px;display: block"></div>
        </div>
      </div>
    </div>
    <div id="footer"></div>
    <el-dialog title="修改简介" :visible.sync="dialogFormVisible" id="infoDialog" :show-close="false">
      <el-form :model="form">
        <div id="topImagePane">
          <div id="topImageWrapper" v-if="ifImageUploadVisible==false">
            <el-avatar :size="80" v-if="needUpdate" :src=this.get_pic_url @error="errorHandler" id="tmpImage">
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
            </el-avatar>
            <div id="changeImageName" @click="toUploadImage">修改头像</div>
          </div>
          <div v-else>
            <div id="uploadButton" v-if="this.ifImageUploadVisible==true">
              <el-upload
                v-loading="loading"
                class="upload-demo"
                ref="upload"
                action=""
                drag
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="form.fileList"
                :on-success="handleSuccess"
                :on-change="test"
                :before-upload="beforeAvatarUpload"
                :http-request="submitUpload"
                 :show-file-list="false"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </div>

            <!--              <el-dialog :visible.sync="dialogVisible" append-to-body>-->
            <!--                <img width="100%" :src="dialogImageUrl" alt="">-->
            <!--              </el-dialog>-->
          </div>
        </div>
        <div>
          <div id="directionInfo">领域</div>
          <div id="myInput">
            <el-input v-model="form.field" autocomplete="off" type="textarea"></el-input>
          </div>
          <div id="degreeInfo">学位</div>
          <div id="degreeDetail">
            <div id="selectfirst">
              <el-select  placeholder="请选择学科" v-model="subNum">
                <el-option v-for="(item,index) in subject" :label=item :value="index" :key="index"></el-option>
              </el-select>
            </div>
            <div id="selectsecond">
              <el-select  placeholder="请选择学历" v-model="rankNum">
                <el-option v-for="(item,index) in rank" :label=item :value="index" :key="index"></el-option>
              </el-select>
            </div>

          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div id="twoButton">
          <button @click="dialogFormVisible = false;ifImageUploadVisible = false" class="cancel">取 消</button>
          <button @click="submitForm" class="confirm">确 定</button>
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
import {getFollow, getUsrInfo, updateInfo, uploadImage} from "../../request/api";
import MyLikeAuthor from "../../components/homeComp/myLikeAuthor";
import MyCollection from "../../components/homeComp/myCollection";
import axios from "axios";

export default {
  name: "userHome",
  components: {
    MyCollection,
    MyLikeAuthor,
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
      ifNUll: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      user: {},
      needUpdate: 1,
      subject: ['哲学', '经济学', '法学', '教育学', '文学', '历史学', '理学', '工学', '农学', '医学', '军事学', '管理学', '艺术学'],
      rank: ['本科生', '研究生', '学士', '硕士', '博士', '博士后'],
      subNum:'',
      rankNum:'',
      previewsrc: '',
      imgRaw: '',
      dialogFormVisible: false,
      dialogLetterVisible: false,
      haveUpload: false,
      loading:false,
      collectionList: [{
        name: '默认收藏夹',
        detail: [
          {
            paper_id: 12345,
            paper_name: '数据挖掘中的聚类算法综述'
          },
          {
            paper_id: 12345,
            paper_name: '数据挖掘中聚类算法研究进展'
          },
          {
            paper_id: 12345,
            paper_name: '大数据时代下数据挖掘技术的应用'
          },
          {
            paper_id: 12345,
            paper_name: '研究'
          }
        ]
      }, {
        name: '数据挖掘',
        detail: [
          {
            paper_id: 12345,
            paper_name: '可靠性研究'
          },
          {
            paper_id: 12345,
            paper_name: '可靠研究'
          },
          {
            paper_id: 12345,
            paper_name: '可靠性'
          },
          {
            paper_id: 12345,
            paper_name: '研究'
          }
        ]
      }, {
        name: '毕业课题',
        detail: [
          {
            paper_id: 12345,
            paper_name: '数据挖掘中的聚类算法综述'
          },
          {
            paper_id: 12345,
            paper_name: '数据挖掘中聚类算法研究进展'
          },
          {
            paper_id: 12345,
            paper_name: '大数据时代下数据挖掘技术的应用'
          },
          {
            paper_id: 12345,
            paper_name: '研究'
          }
        ]
      }],
      form: {
        field: '',
        degree: ''
      },
      add_pic_url: 'http://139.9.132.83:8000/user/postImage?user_id='+localStorage.getItem('user_id'),
      get_pic_url: 'http://139.9.132.83:8000/user/getImage?user_id='+localStorage.getItem('user_id'),
      formLabelWidth: '100px',
      activeMode: 1,
      text: '',
      research: [
        {
          title: '数据挖掘中的聚类算法综述',
          type: '会议文献',
          publishDate: 'Oct 2021',
          Author: [
            {name: 'whdwywd'},
            {name: 'whdjwdjw'}
          ],
          hasFull: false,
          abstract: '聚类分析是数据挖掘中重要的研究内容之一,对聚类准则进行了总结,对五类传统的聚类算法的研究现状和进展进行了较为全面的总结,就一些新的聚类算法进行了梳理,根据样本归属关系、样本数据预处理、样本的相似性度量、样本的更新策略、样本的高维性和与其他学科的融合等六个方面对聚类中近20多个新算法,如粒度聚类、不确定聚类、量子聚类、核聚类、谱聚类、聚类集成、概念聚类、球壳聚类、仿射聚类、数据流聚类等,分别进行了详细的概括。这对聚类是一个很好的总结,对聚类的发展具有积极意义。 '
        }, {
          title: '数据挖掘中的分类算法综述',
          type: '会议文献',
          publishDate: 'Oct 2021',
          Author: [
            {name: 'whdwywd'},
            {name: 'whdjwdjw'}
          ],
          hasFull: true,
          abstract: '分类是数据挖掘、机器学习和模式识别中一个重要的研究领域。通过对当前数据挖掘中具有代表性的优秀分类算法进行分析和比较,总结出了各种算法的特性,为使用者选择算法或研究者改进算法提供了依据。此外,提出了评价分类器的5条标准,以便于研究者提出新的有效算法。 '
        },
        {
          title: '数据挖掘中的分类算法综述',
          type: '会议文献',
          publishDate: 'Oct 2021',
          Author: [
            {name: 'whdwywd'},
            {name: 'whdjwdjw'}
          ],
          hasFull: true,
          abstract: '分类是数据挖掘、机器学习和模式识别中一个重要的研究领域。通过对当前数据挖掘中具有代表性的优秀分类算法进行分析和比较,总结出了各种算法的特性,为使用者选择算法或研究者改进算法提供了依据。此外,提出了评价分类器的5条标准,以便于研究者提出新的有效算法。 '
        },
        {
          title: '数据挖掘中的分类算法综述',
          type: '会议文献',
          publishDate: 'Oct 2021',
          Author: [
            {name: 'whdwywd'},
            {name: 'whdjwdjw'}
          ],
          hasFull: true,
          abstract: '分类是数据挖掘、机器学习和模式识别中一个重要的研究领域。通过对当前数据挖掘中具有代表性的优秀分类算法进行分析和比较,总结出了各种算法的特性,为使用者选择算法或研究者改进算法提供了依据。此外,提出了评价分类器的5条标准,以便于研究者提出新的有效算法。 '
        }
      ],
      // id:this.localStorage.getItem('token'),
      id: '',
      ifImageUploadVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      followList: [{
        scholar_id: '95EDFSW',
        name: "谭火彬",
        summary: "(没有就返回null)",
        n_pubs: 3,
        n_citation: 5
      }, {
        scholar_id: '95qsDFSW',
        summary: "(没有就返回null)",
        name: "谭火彬",
        n_pubs: 3,
        n_citation: 80
      }, {
        scholar_id: 'wdwSW',
        summary: "猜猜我是谁",
        name: "谭火彬",
        n_pubs: 80,
        n_citation: 980
      }, {
        scholar_id: '95qsDFSW',
        summary: "(没有就返回null)",
        name: "谭火彬",
        n_pubs: 3,
        n_citation: 80
      }, {
        scholar_id: 'wdwSW',
        summary: "猜猜我是谁",
        name: "谭火彬",
        n_pubs: 80,
        n_citation: 980
      }],
      str:[]
    }
  },
  mounted() {
    this.getUserInformation(localStorage.getItem('user_id'))
    // this.getFollowList()
  },
  methods: {
    getFollowList() {
      getFollow({
        user_id: this.user.user_id
      }).then(res => {
        console.log("getfollow:" + res)
        this.followList = res.followList
      })
    },
    updateInfor() {
      // console.log(1)
      // console.log(this.user)
      updateInfo({
        user_id: this.user.user_id,
        field: this.user.field,
        skill: this.user.skill,
        degree: this.user.degree,
        summary: this.user.summary
      }).then(res => {
        console.log(res)
        this.getUserInformation()
      })
    },
    submitForm(file) {
      this.dialogFormVisible = false;
      this.ifImageUploadVisible = false;
      this.user.field = this.form.field
      this.user.degree = this.subject[this.subNum]+' '+this.rank[this.rankNum]
      this.updateInfor()
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(this.add_pic_url);
      // this.success = response.data.message;
      // this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    test(file) {
      console.log(file)
      this.ifNUll = true
      console.log(this.ifNUll);
      console.log(this.previewsrc)
      this.imgRaw = file.raw
    },
    errorHandler() {
      return true
    },
    editSimpleInfo() {
      this.dialogFormVisible = true
    },
    openLetter() {
      this.dialogLetterVisible = true
    },
          beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size  / 1024 < 500;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 500kB!');
        }
        return isJPG && isLt2M;
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
        .catch(_ => {
        });
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
    },
    submitUpload() {
      this.loading = true
      console.log(this.user.user_id)
      console.log(this.add_pic_url);
      let formDatas = new FormData()
      formDatas.append('user_id', this.user.user_id)
      formDatas.append('pic', this.imgRaw)
      console.log(this.imgRaw)
      // axios.post('http://139.9.132.83:8000/user/postImage',formDatas).then(res=>(console.log(res)))
      uploadImage(formDatas).then(res => {
        console.log(res)
        this.needUpdate++
        this.loading =false
        this.ifImageUploadVisible = false
         this.$message({
          message: '上传成功',
          type: 'success'
        });
        this.$router.go(0)
      })
    },
    getUserInformation(id) {
      getUsrInfo({
        user_id: localStorage.getItem('user_id')
      }).then(res => {
        console.log(res)
        this.user = res.user
        // this.add_pic_url = this.add_pic_url + this.user.user_id
        // this.get_pic_url = this.get_pic_url + this.user.user_id
        this.str = this.user.degree.split(' ')
        console.log(this.str)
        this.subNum = this.subject.indexOf(this.str[0])
        this.rankNum = this.rank.indexOf(this.str[1])
        this.form.field = this.user.field
      })
    },
    toAuthorPage() {
      this.$router.push({
        path: '/authorPage',
        query: {
          // id:this.user.scholarID
        }
      })
    },
    toUploadImage() {
      this.ifImageUploadVisible = true;
    },
  }
}
</script>

<style scoped>
#topPane {
}

#usrHomePane {
  background-color: whitesmoke;

}
/deep/ .el-select > .el-input {
  width: 250px;
  display: block;
}
#uploadButton {
  justify-content: center;
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
  font-size: 16px;
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
  font-size: 17px;
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
  font-size: 24px;
  font-family: "siyuan";
  font-weight: bold;
  letter-spacing: 3px;
  color: #343434;
}

#usrDegree {
    margin-top: 10px;
    font-size: 15px;
    border-bottom: 1px transparent;
    font-family: "Microsoft YaHei";
    letter-spacing: 1px;
    color: #606266;
}
#editInfoRow {
  display: inline-flex;
}

#usrAbility {
  margin-top: 2px;
  font-size: 17px;
  font-family: "Microsoft YaHei";
  letter-spacing: 2px;
  color: #343434;
}

#editYourInfo{
    margin-top: 11px;
    font-size: 13px;
    font-family: "Microsoft YaHei";
    letter-spacing: 2px;
    border-bottom: #606266 1px solid;
    color: #606266;
    margin-left: 6px;
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
  font-size: 17px;
  margin-top: 10px;
}

#myInput {
  margin-top: 10px;
}

#degreeInfo {
  margin-top: 10px;
  font-size: 16px;
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
  box-shadow: 0 5px 10px -5px #a7a7a7;
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
  font-size: 18px;
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
  font-family: "Microsoft YaHei";
  padding-bottom: 2px;
  font-size: 18px;
  padding-bottom: 20px;
  margin-left: 15px;
}

#editUsrInfoPane {
  width: 625px;
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
  margin-left: 40px;
  width: 425px;
}

#researchLine {
  display: flex;
  margin-top: 10px;
}

#researchInfo {
  width: 100px;
  padding: 15px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 18px;
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
  box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
  width: 875px;
  margin-top: 20px;
  border-radius: 1px;
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

#topImagePane {
  display: flex;
  justify-content: center;
  /* width: max-content; */
}

#tmpImage {
  justify-content: center;
}

#changeImageName {
  justify-content: center;
  font-family: "Microsoft YaHei UI";
  color: #0080ff;
  font-size: 15px;
  margin-top: 10px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

#changeImageName:hover {
  cursor: pointer;
  color: #005abb;
}

#topImageWrapper {
  justify-content: center;
}

#uploadDetail {
  margin-top: 10px;
  justify-content: center;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

/deep/ .el-upload__tip {
  font-size: 13px;
  color: #606266;
  margin-top: 7px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
#selectsecond{
  margin-top: 20px;
}
</style>
