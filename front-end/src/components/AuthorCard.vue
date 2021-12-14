<template>
  <div id="editPane">
    <div>
      <div id="editMainPane">
        <div class="mainPaneTitle">名片</div>
<!--        <div class="mainPaneTitleDescribe">您的名片是您个人资料的简短摘要，可以向整个平台的其他人显示。确保它是最新的，以便其他人在发现您的卡片时可以轻松了解您。</div>-->
        <div id="card">
          <div id="cardLeftPart">
            <div id="usrName">{{ this.user.name }}</div>
            <div id="userAbility">{{ this.user.skill }}</div>
            <div class="userInInfo">学位</div>
            <div class="userInDetail" v-if="this.user.degree != null">{{ this.user.degree }}</div>
            <div v-else class="userInDetail">未知</div>
            <div class="userInInfo">邮箱</div>
            <div class="userInDetail">{{ this.user.mailbox }}</div>
            <div class="userInInfo">专业领域</div>
            <div class="userInDetail" v-if="this.user.field!=null">{{ this.user.field }}</div>
            <div v-else class="userInDetail">待完善</div>
          </div>
          <div id="cardrightPic">
            <el-avatar :size="75" :src=imgsrc @error="errorHandler">
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
            </el-avatar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {updateInfo} from "../request/api";

export default {
  name: "AuthorCard",
  props: ['user', 'imgsrc', 'subindex', 'rankindex'],
  data() {
    return {
      ifEdit: false,
      form: {
        sub: '',
        rank: '',
        curField: this.$props.user.field
      },
      subject: ['哲学', '经济学', '法学', '教育学', '文学', '历史学', '理学', '工学', '农学', '医学', '军事学', '管理学', '艺术学'],
      rank: ['本科生', '研究生', '学士', '硕士', '博士', '博士后'],
      value: '',
      subNum: this.$props.subindex,
      rankNum: this.$props.rankindex,
    }
  },
  mounted() {
    console.log(this.subNum)
  },
  methods: {
    toEditMode() {
      this.ifEdit = true;
      let str = this.user.degree.split(' ')
      this.subNum = this.subject.indexOf(str[0])
      this.rankNum = this.rank.indexOf(str[1])
      this.form.curField = this.user.field
    },
    cancelEdit() {
      this.ifEdit = false;
    },
    confirmEdit() {
      this.updateInfor()
      this.ifEdit = false;
    },
    errorHandler() {
      return true
    },
    updateInfor() {
      // console.log(1)
      // console.log(this.user)
      updateInfo({
        user_id: this.user.user_id,
        field: this.form.curField,
        skill: this.user.skill,
        degree: this.subject[this.subNum] + ' ' + this.rank[this.rankNum],
        summary: this.user.summary
      }).then(res => {
        console.log(res.Message)
        if (res.Message == 'change user information success') {
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.$router.go(0)
        }
      })
    },
  }
}
</script>

<style scoped>
#editButton {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  font-family: "Microsoft YaHe";
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  color: #8e8e8e;
}

#editButton:hover {
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

#editPane {
  background-color: white;
  border: 1px solid #dedede;
  border-radius: 2px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  margin-top: 30px;
}

#editMainPane {
  width: inherit;
  border-top: 1px solid #e2e2e2;
  padding: 10px;
}

.mainPaneTitle {
  margin-left: 10px;
  font-family: "Microsoft YaHei";
  font-size: 18px;
  color: #606266;
}

.mainPaneTitleDescribe {
  padding: 10px;
  font-family: "Microsoft YaHei UI";
  font-size: 15px;
  color: #8e8e8e;
}

#card {
  margin: 10px;
  border: 1px solid #dedede;
  display: flex;
}

#cardLeftPart {
  width: 350px;
  padding: 20px;
}

#usrName {
  font-family: "siyuan";
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 18px;
  color: black;
}

.userDegree {
  font-family: "Microsoft YaHei";
  margin-top: 3px;
  font-size: 16px;
  color: #606266;
}

#userAbility {
  margin-top: 15px;
  font-family: "Microsoft YaHei";
  font-style: italic;
  color: black;
  font-size: 16px;

}

.userInInfo {
  margin-top: 15px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 16px;
  color: #4b4b4b;
}

.userInDetail {
  font-family: "Microsoft YaHei";
  color: black;
  font-weight: bold;
  font-size: 16px;
  margin-top: 5px;
}

#cardrightPic {
  margin-left: auto;
  margin-right: 30px;
  margin-top: 20px;
}

#editDescribe {
  padding: 0px 5px 5px 5px;
  border-bottom: #c7c7c7 1px solid;
}

#directionInfo {
  font-family: "Microsoft YaHei";
  font-size: 15px;
}

.myInput {
  margin-top: 10px;
}

#degreeInfo {
  margin-top: 10px;
}

/deep/ .el-select > .el-input {
  width: 505px;
  display: block;
}

#degreeDetail {
  margin-top: 10px;
  display: flex;
}

/deep/ .el-dialog__footer {
  padding: 20px 0px 0px 0px;
  text-align: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.dialog-footer {
  border-top: gainsboro 1px solid;
  background: none;
  margin-top: 50px;
}

#twoButton {
  margin-top: 13px;
  margin-right: 10px;
  display: flex;
  flex-direction: row-reverse;
}

#editModeMain {
  padding: 20px;
}

#editDesDetail {
  font-family: "Microsoft YaHei";
  font-size: 17px;
  margin-top: 10px;
}

#usrNameEdit {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 18px;
  margin-top: 15px;
}

.editInfo {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 17px;
  margin-top: 10px;
}

#confirm {
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

#confirm:hover {
  color: white;
  background: #005abb;
}

#cancel {
  font-family: "Microsoft YaHei UI";
  display: inline;
  background-color: transparent;
  color: #0080ff;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  padding: 10px 20px 10px 20px;
  border: none;
}

#cancel:hover {
  background-color: whitesmoke;
}

/deep/ .el-select > .el-input {
  width: 250px;
  display: block;
}

#selectsecond {
  margin-left: 80px;
}
</style>
