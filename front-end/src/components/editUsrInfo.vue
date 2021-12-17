<template>
  <div id="editPane">
    <div v-if="ifEdit == false">
      <div>
        <div id="editButton" @click="toEditMode">
          <div>编辑</div>
          <i class="el-icon-edit"></i>
        </div>
        <div id="editMainPane">
          <div class="mainPaneTitle">
<svg style="margin-right: 5px" t="1639745279711" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4727" width="32" height="32"><path d="M972.562011 788.890236c-8.884124 3.194292-15.073064 11.080199-15.572172 20.163967L947.80625 956.291087c-0.698751 11.080199-10.680913 19.565037-22.360042 18.866286l-788.590772-43.622047c-11.679129-0.59893-20.563253-10.181805-19.964323-21.262004l8.684481-141.347409-42.024901-109.504314-18.067712 294.274126c-0.698751 11.080199 8.185373 20.563253 19.964323 21.262005l885.817026 49.012413c11.679129 0.59893 21.761112-7.885908 22.360042-18.966107l11.279843-193.354471c0.998216-16.570388-16.171102-28.548982-32.342204-22.759329z" fill="#FFC64B" p-id="4728"></path><path d="M1022.572641 505.895953L832.512283 14.973242C828.519418 4.591794 816.341181-0.798573 805.460625 2.994648L65.882267 256.142268c-13.076632 4.491973-19.565037 18.566821-14.17467 30.745058 4.991081 11.279843 18.466999 16.869853 30.545415 12.777167l693.760236-237.475626c10.980378-3.793221 23.058793 1.597146 27.051658 11.978594l156.420473 404.177726c4.092686 10.48127-1.696967 22.060577-12.677345 25.753977L198.744839 760.141611c-10.980378 3.793221-23.058793-1.597146-27.051658-11.978594L49.212057 431.62867c-4.791438-12.477702-19.664858-18.666642-32.541847-13.475918-12.078416 4.891259-17.967891 17.868069-13.475918 29.547199l139.151333 359.557463c3.992865 10.381448 16.171102 15.771815 27.051658 11.978594l840.398191-287.685899c11.080199-3.593578 16.770032-15.172886 12.777167-25.654156z" fill="#222222" p-id="4729"></path><path d="M498.90844 316.234881L144.441879 437.617967c-9.383232 3.194292-15.671994 12.078416-15.671994 21.960756 0 15.971459 15.671994 27.15148 30.745058 21.960756l354.466561-121.283265c9.383232-3.194292 15.671994-12.078416 15.671994-21.960755 0.099822-15.971459-15.572172-27.15148-30.745058-22.060578zM219.507735 638.059773L634.266552 496.113435c9.383232-3.194292 15.671994-12.078416 15.671994-21.960756 0-15.971459-15.671994-27.15148-30.745058-21.960756L203.13699 594.537549c-13.076632 4.491973-19.565037 18.566821-14.17467 30.745058 4.991081 11.279843 18.466999 16.869853 30.545415 12.777166z" fill="#222222" p-id="4730"></path></svg>
            名片</div>
          <div class="mainPaneTitleDescribe">您的名片是您个人资料的简短摘要，可以向整个平台的其他人显示。确保它是最新的，以便其他人在发现您的卡片时可以轻松了解您。</div>
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
              <el-avatar :size="75" :src=imgsrc>
              </el-avatar>
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
          <div class="editInfo">当前的方向</div>
          <div class="myInput">
            <el-input v-model="form.curField" autocomplete="off" type="textarea"></el-input>
          </div>
<!--          <div class="editInfo">所属机构</div>-->
<!--          <div class="myInput">-->
<!--            <el-input placeholder="请输入内容"></el-input>-->
<!--          </div>-->
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
import {updateInfo} from "../request/api";

export default {
  name: "editUsrInfo",
  props: ['user', 'imgsrc','subindex','rankindex'],
  data() {
    return {
      ifEdit: false,
      form: {
        sub:'',
        rank:'',
        curField:this.$props.user.field
      },
      subject: ['哲学', '经济学', '法学', '教育学', '文学', '历史学', '理学', '工学', '农学', '医学', '军事学', '管理学', '艺术学'],
      rank: ['本科生', '研究生', '学士', '硕士', '博士', '博士后'],
      value:'',
      subNum:this.$props.subindex,
      rankNum:this.$props.rankindex
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
        this.form.curField= this.user.field
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
        degree: this.subject[this.subNum]+' '+this.rank[this.rankNum],
        summary: this.user.summary
      }).then(res => {
        console.log(res.Message)
        if(res.Message == 'change user information success'){
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
  margin-top: 10px;
  margin-left: 10px;
  font-family: "Microsoft YaHei";
  font-size: 18px;
  color: #606266;
}

.mainPaneTitleDescribe {
  padding: 10px;
  font-family: "Microsoft YaHei UI";
  line-height: 25px;
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
#selectsecond{
  margin-left: 80px;
}
</style>
