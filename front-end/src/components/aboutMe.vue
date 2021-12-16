<template>
  <div id="aboutMe">
    <div id="topHead">
      <div id="leftCharacter">关于我</div>
      <div id="rightButton">
        <el-dropdown @command="handleDropDown">
  <span class="el-dropdown-link" style="color: #8e8e8e">
    编辑
    <i class="el-icon-edit"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="myDropdown" command="editIntro">编辑介绍</el-dropdown-item>
            <el-dropdown-item class="myDropdown" command="editLanguage">编辑技能</el-dropdown-item>
            <!--            <el-dropdown-item class="myDropdown" command="editSub">编辑学科</el-dropdown-item>-->
            <el-dropdown-item class="myDropdown" command="editTech">编辑领域</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div id="mainAboutMePane">
      <div class="AboutMeInfo">介绍</div>
      <div class="AboutMeDetail" v-if="this.user.summary!=null">{{ this.user.summary }}</div>
      <div class="AboutMeDetail" v-else>待完善</div>
      <div class="AboutMeInfo">技能</div>
      <div class="AboutMeDetail" v-if="this.user.skill!=null">{{ this.user.skill }}</div>
      <div class="AboutMeDetail" v-else>待完善</div>
      <div class="AboutMeInfo">学科</div>
      <div class="AboutMeDetail" v-if="this.user.degree!=null">{{ this.user.degree }}</div>
      <div class="AboutMeDetail" v-else>待完善</div>
      <div class="AboutMeInfo">领域</div>
      <div class="AboutMeDetail" v-if="this.user.field!=null">{{ this.user.field }}</div>
      <div class="AboutMeDetail" v-else>待完善</div>
    </div>
    <el-dialog title="更新你的介绍" :visible.sync="IntroDialog" class="infoDialog">
      <div class="dialogMainPane">
        <div class="dialogInfo">使您的介绍保持最新是帮助他人快速了解您的工作的好方法。</div>
        <div class="dialogInfo">以下是其他研究人员补充的内容：</div>
        <div id="otherChoose">
          <div class="oneOther">
            <i class="el-icon-success"></i>
            <div class="otherDetail">目前的研究兴趣</div>
          </div>
          <div class="oneOther">
            <i class="el-icon-success"></i>
            <div class="otherDetail">他们使用的方法和技术</div>
          </div>
          <div class="oneOther">
            <i class="el-icon-success"></i>
            <div class="otherDetail">他们现在在做什么</div>
          </div>
        </div>
        <div class="introInfo">介绍</div>
        <div class="myInput">
          <el-input autocomplete="off" type="textarea" rows="4" v-model="intro"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="twoButton">
          <el-button @click="introDialogCancel" class="cancel">取 消</el-button>
          <el-button type="primary" @click="introDialogConfirm" class="confirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="编辑技能" :visible.sync="LanDialog" class="infoDialog">
      <div class="dialogMainPane">
        <div class="DetailInfo">编辑您的技能以将它们添加到您的个人资料中。</div>
        <div class="introInfo">技能</div>
        <div class="myInput">
          <el-input autocomplete="off" type="textarea" rows="2" v-model="skillContent"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="twoButton">
          <el-button @click="lanDialogCancel" class="cancel">取 消</el-button>
          <el-button type="primary" @click="lanDialogConfirm" class="confirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <!--    <el-dialog title="编辑学科" :visible.sync="SubDialog" class="infoDialog">-->
    <!--      <div class="dialogMainPane">-->
    <!--        <div class="DetailInfo">添加最能描述您的研究的学科。最符合你研究领域的学科有助于其他用户迅速了解你。</div>-->
    <!--        <div class="introInfo">学科</div>-->
    <!--        <div class="myInput">-->
    <!--          <el-input autocomplete="off" type="textarea" rows="2" v-model="fieldContent"></el-input>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <div class="twoButton">-->
    <!--          <el-button @click="SubDialogCancel" class="cancel">取 消</el-button>-->
    <!--          <el-button type="primary" @click="SubDialogConfirm" class="confirm">确 定</el-button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </el-dialog>-->
    <el-dialog title="更新您的领域和专业知识" :visible.sync="TechDialog" class="infoDialog">
      <div class="dialogMainPane">
        <div class="DetailInfo">我们利用您的领域和专业知识向您展示您所在领域的最新研究。</div>
        <div class="myInput">
          <el-input autocomplete="off" type="textarea" rows="3" v-model="fieldContent"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="twoButton">
          <el-button @click="TechDialogCancel" class="cancel">取 消</el-button>
          <el-button type="primary" @click="TechDialogConfirm" class="confirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {updateInfo} from "../request/api";

export default {
  name: "aboutMe",
  props: ['user'],
  data() {
    return {
      ifEdit: false,
      IntroDialog: false,
      LanDialog: false,
      SubDialog: false,
      TechDialog: false,
      intro: this.user.summary,
      skillContent: this.user.skill,
      fieldContent: this.user.field,
    }
  },
  methods: {
    handleDropDown(command) {
      if (command == "editIntro") {
        this.IntroDialog = true;
      } else if (command == "editLanguage") {
        this.LanDialog = true;
      } else if (command == "editSub") {
        this.SubDialog = true;
      } else if (command == "editTech") {
        this.TechDialog = true;
      }
    },
    introDialogCancel() {
      this.IntroDialog = false;
    },
    introDialogConfirm() {
      this.IntroDialog = false;
      console.log(this.$props.user)

      this.user.summary = this.intro;
      this.updateInfor()
    },
    lanDialogCancel() {
      this.LanDialog = false;
    },
    lanDialogConfirm() {
      this.LanDialog = false;
      this.user.skill = this.skillContent
      this.updateInfor()
    },
    SubDialogCancel() {
      this.SubDialog = false;
    },
    SubDialogConfirm() {
      this.SubDialog = false;
    },
    TechDialogCancel() {
      this.TechDialog = false;
    },
    TechDialogConfirm() {
      this.TechDialog = false;
      this.user.field = this.fieldContent
      console.log(this.user.field)
      this.updateInfor()
    },
    updateInfor() {
      // console.log(1)
      console.log(this.user)
      updateInfo({
        user_id: this.user.user_id,
        field: this.user.field,
        skill: this.user.skill,
        degree: this.user.degree,
        summary: this.user.summary
      }).then(res => {
        console.log(this.user.field)
        console.log(res)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        // this.$router.go(0)
      })
    }
  }
}
</script>

<style scoped>
#aboutMe {
  background-color: white;
  border: 1px solid #dedede;
  border-radius: 2px;
  margin-top: 30px;
  box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
}

#editButton {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  font-family: "Microsoft YaHe";
  font-size: 18px;
  letter-spacing: 1px;
  color: #8e8e8e;
}

/deep/ .el-dropdown-link:hover {
  color: #343434;
}

#leftCharacter {
  width: 250px;
  padding: 10px;
  font-family: "Microsoft YaHe";
  font-weight: bold;
  font-size: 16px;
  margin-left: 10px;
  letter-spacing: 1px;
  color: #8e8e8e;
}

.infoDialog {
  color: #343434;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

#rightButton {
  display: flex;
  margin-left: auto;
  margin-right: 20px;
  margin-top: 10px;
  color: #8e8e8e;
}

#rightButton:hover {
  cursor: pointer;
  color: #343434;
}

/deep/ [class*=" el-icon-"], [class^=el-icon-] {
  font-family: element-icons !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  margin-top: 2px;
  margin-left: 5px;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#topHead {
  display: flex;
}

#mainAboutMePane {
  border-top: 1px solid #dedede;
  padding: 10px 20px 15px 20px;
}

.AboutMeInfo {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: black;
  font-size: 17px;
  margin-top: 15px;
}

.AboutMeDetail {
  font-family: "Microsoft YaHei";
  font-size: 17px;
  color: #343434;
  margin-top: 5px;
}

.myDropdown {
  border-left: transparent solid 2px;
}

.myDropdown:hover {
  background-color: whitesmoke;
  color: black;
  border-left: grey solid 2px;
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
  padding: 10px 20px 15px 20px;
}

.dialogInfo {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 17px;
  color: black;
}

#otherChoose {
  display: grid;
}

.oneOther {
  margin-top: 15px;
  display: inline-flex;
  color: #00ccbb;
}

.oneOther .i {
  color: #00ccbb;
}

.otherDetail {
  margin-left: 10px;
  font-family: "Microsoft YaHei";
  color: #575757 !important;
  font-size: 16px;
}

.introInfo {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 17px;
  margin-top: 20px;
  color: black;
}

.myInput {
  margin-top: 10px;
  height: 50px;
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

.DetailInfo {
  font-family: "Microsoft YaHei";
  color: #575757 !important;
  font-size: 18px;
}

/deep/ .el-dropdown {
  display: inline-block;
  position: relative;
  font-size: 16px;
}
</style>
