<template>
  <div id="instituteBelongTo">
    <div id="topHead">
      <div id="leftCharacter">所在机构</div>
      <div id="rightButton" @click="showDialog">
        <div>编辑</div>
        <i class="el-icon-edit"></i>
      </div>
    </div>
    <div id="mainPane">
      <div id="leftDescription">
        <div id="insName">北京航空航天大学(BUAA)</div>
        <div class="desInfo">地点</div>
        <div class="desDetail">中国北京</div>
        <div class="desInfo">部门</div>
        <div class="desDetail">软件工程学院(SEI)</div>
        <div class="desInfo">职位</div>
        <div class="desDetail">待补充</div>
        <div class="desInfo">时间段</div>
        <div class="desDetail">2011年8月-至今</div>
      </div>
      <div id="rightPic">
        <el-avatar :size="60" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"></el-avatar>
      </div>
    </div>
    <div id="bottomLab">
      <div id="LabName">软件工程实验室</div>
      <div class="labInfo">实验室负责人</div>
      <div class="labDetail">
        <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        <div id="managerName">谭火彬</div>
      </div>
      <div class="labInfo">实验室成员(2)</div>
      <div class="labDetail">
        <div class="labPeople">
          <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          <div class="labPersonName">谭火彬</div>
        </div>
        <div class="labPeople">
          <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          <div class="labPersonName">梁灏然</div>
        </div>
      </div>
    </div>
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
export default {
  name: "instituteBelongTo",
  data() {
    return {
      instituteDialog: false
    }
  },
  methods: {
    showDialog() {
      this.instituteDialog = true;
    },
    DialogCancel() {
      this.instituteDialog = false;
    },
    DialogConfirm() {
      this.instituteDialog = false;
    }
  }
}
</script>

<style scoped>
#instituteBelongTo {
  background-color: white;
  border: 1px solid #dedede;
  border-radius: 2px;
  margin-top: 20px;
}

#leftCharacter {
  width: 250px;
  padding: 10px;
  font-family: "Microsoft YaHe";
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  color: #8e8e8e;
}

#rightButton {
  display: flex;
  width: 250px;
  justify-content: flex-end;
  margin-top: 10px;
  color: #8e8e8e;
  font-family: "Microsoft YaHe";
  font-size: 14px;
  letter-spacing: 1px;
  margin-right: 10px;
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
  justify-content: center;
}

#mainPane {
  display: flex;
  border-top: 1px solid #dedede;
}

#leftDescription {
  width: 200px;
  padding: 20px;
}

#insName {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 15px;
  color: black;
}

.desInfo {
  margin-top: 15px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 13px;
  color: #7f7f7f;
}

.desDetail {
  margin-top: 3px;
  font-family: "Microsoft YaHei";
  font-size: 13px;
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
  font-size: 15px;
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

/deep/ .el-dialog__body {
  padding: 16px 8px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

.introInfo {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 13px;
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
  font-size: 15px;
  color: black;
}
.labInfo{
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: #8e8e8e;
  font-size: 13px;
  margin-top: 10px;
}
.labDetail{
  display: flex;
  margin-top: 5px;
}
.labPersonName{
  font-family: "Microsoft YaHei";
  font-size: 13px;
}
#managerName{
  font-family: "Microsoft YaHei";
  font-size: 13px;
  margin-left: 10px;
  margin-top: 5px;
}
.labPeople{
  margin-left: 5px;
}
#mainPane{

}
</style>
