<template>
  <div id="editPane">
    <div v-if="ifEdit == false">
      <div>
        <div id="editButton" @click="toEditMode">
          <div>编辑</div>
          <i class="el-icon-edit"></i>
        </div>
        <div id="editMainPane">
          <div class="mainPaneTitle">名片</div>
          <div class="mainPaneTitleDescribe">您的名片是您个人资料的简短摘要，可以向整个平台的其他人显示。确保它是最新的，以便其他人在发现您的卡片时可以轻松了解您。</div>
          <div id="card">
            <div id="cardLeftPart">
              <div id="usrName">{{ this.user.userName }}</div>
              <div id="userDegree">{{ this.user.userDegree }}</div>
              <div id="userAbility">{{ this.user.ability }}</div>
              <div class="userInInfo">机构</div>
              <div class="userInDetail">{{ this.user.inti }}</div>
              <div class="userInInfo">技能</div>
              <div class="userInDetail">{{ this.user.ability }}</div>
            </div>
            <div id="cardrightPic">
              <el-avatar :size="75"
                         src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div id="editDescribe">
        <div class="mainPaneTitle">编辑你的名片</div>
        <div class="mainPaneTitleDescribe">确保您的名片信息准确且最新。</div>
      </div>
      <div id="editModeMain">
        <div id="editDesDetail">当您更改以下信息时，您的个人资料将更新为相同的信息。</div>
        <div id="usrNameEdit">{{ this.user.userName }}</div>
        <el-form :model="form">
          <div class="editInfo">学位</div>
          <div id="degreeDetail">
            <el-select v-model="form.region" placeholder="请选择学位">
              <el-option label="计算机科学与技术 博士" value="master"></el-option>
              <el-option label="计算机科学与技术 硕士" value="doctor"></el-option>
              <el-option label="计算机科学与技术 学士" value="bachelor"></el-option>
            </el-select>
          </div>
          <div class="editInfo">当前的方向</div>
          <div class="myInput">
            <el-input v-model="form.name" autocomplete="off" type="textarea">{{ this.user.ability }}</el-input>
          </div>
          <div class="editInfo">所属机构</div>
          <div class="myInput">
            <el-input placeholder="请输入内容"></el-input>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div id="twoButton">
            <button id="confirm" @click="confirmEdit">确 定</button>
            <button id="cancel" @click="cancelEdit">取 消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "editUsrInfo",
  props: ['user'],
  data() {
    return {
      ifEdit: false,
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
    }
  },
  methods: {
    toEditMode() {
      this.ifEdit = true;
    },
    cancelEdit(){
      this.ifEdit = false;
    },
    confirmEdit(){
      this.ifEdit=false;
    }
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
  margin-top: 10px;
}

#editMainPane {
  width: inherit;
  border-top: 1px solid #e2e2e2;
  padding: 10px;
}

.mainPaneTitle {
  margin-top: 10px;
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
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 15px;
  color: black;
}

#userDegree {
  font-family: "Microsoft YaHei";
  margin-top: 3px;
  font-size: 17px;
  color: #606266;
}

#userAbility {
  margin-top: 15px;
  font-family: "Microsoft YaHei";
  font-style: italic;
  color: black;
  font-size: 17px;

}

.userInInfo {
  margin-top: 15px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 17px;
  color: #a1a1a1;
}

.userInDetail {
  font-family: "Microsoft YaHei";
  color: black;
  font-size: 17px;
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
}

#twoButton {
  margin-top: 30px;
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
  font-size: 18px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  margin-left: 10px;
  padding: 10px 20px 10px 20px;
  border: none;
}
#confirm:hover{
  color: white;
  background: #005abb;
}
#cancel{
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
#cancel:hover{
  background-color: whitesmoke;
}
</style>
