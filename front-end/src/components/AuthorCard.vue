<template>
  <div id="editPane">
    <div>
      <div>
        <div id="topHead">
          <div id="leftCharacter">学者名片</div>
        </div>
        <div id="editMainPane">
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
  </div>
</template>

<script>
export default {
  name: "authorCard",
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
    cancelEdit() {
      this.ifEdit = false;
    },
    confirmEdit() {
      this.ifEdit = false;
    }
  }
}
</script>

<style scoped>
#leftCharacter {
  width: 250px;
  padding: 10px;
  margin-left: 10px;
  justify-content: flex-start;
  font-family: "Microsoft YaHe";
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  color: #8e8e8e;
}

#topHead {
  display: flex;
  justify-content: flex-start;
}
#card {
  margin: 10px;
  border: 1px solid #dedede;
  display: flex;
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
  font-size: 15px;
  color: #606266;
}

.mainPaneTitleDescribe {
  padding: 10px;
  font-family: "Microsoft YaHei UI Light";
  font-size: 11px;
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
  font-size: 13px;
  color: #606266;
}

#userAbility {
  margin-top: 15px;
  font-family: "Microsoft YaHei";
  font-style: italic;
  color: black;
  font-size: 13px;

}

.userInInfo {
  margin-top: 15px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 13px;
  color: #a1a1a1;
}

.userInDetail {
  font-family: "Microsoft YaHei";
  color: black;
  font-size: 13px;
}

#cardrightPic {
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
  font-size: 13px;
  margin-top: 10px;
}

#usrNameEdit {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 15px;
  margin-top: 15px;
}

.editInfo {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 13px;
  margin-top: 10px;
}

#confirm {
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
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  padding: 10px 20px 10px 20px;
  border: none;
}

#cancel:hover {
  background-color: whitesmoke;
}
</style>
