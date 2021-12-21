<template>
  <div id="myCollection">
    <div id="topHead">
      <div id="leftCharacter" style="display: flex">
        <div style="margin-top: 1px">
          <svg style="margin-right: 5px" t="1639836412388" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="10752" width="18" height="18">
            <path
              d="M757.248 974.848c-13.312 0-28.672-4.096-43.008-10.752l-200.704-100.352-202.24 100.352c-12.8 6.656-27.648 10.24-42.496 10.24-19.456 0-38.912-6.144-53.76-17.408-28.16-20.992-43.008-57.856-36.352-91.648l41.472-215.04-158.72-147.456c-24.576-24.576-33.792-61.44-24.576-94.208l0.512-1.024c11.264-34.304 39.936-58.88 74.752-63.488l220.16-39.936 98.816-200.704C446.976 71.68 479.232 51.2 513.536 51.2c35.84 0 68.608 20.992 82.432 52.736l98.304 200.192 220.16 38.4c34.816 5.12 64 30.72 73.216 64 10.752 33.28 2.048 69.632-23.04 94.72l-0.512 0.512-157.184 148.48 39.936 215.04c6.656 34.304-7.168 69.12-35.84 90.624-14.848 12.288-33.792 18.944-53.76 18.944z m-243.712-169.984l224.256 112.128c6.656 3.072 14.336 5.632 19.456 5.632 8.192 0 15.36-2.56 20.992-7.168l1.024-1.024c12.8-9.728 18.944-24.576 16.384-39.424l-45.056-243.2 178.688-167.936c10.752-11.264 14.848-27.136 9.728-41.472l-0.512-1.536c-3.584-13.824-15.872-24.576-30.72-26.624h-1.024l-246.784-43.008-111.104-225.792c-5.632-12.8-19.968-21.504-34.816-21.504-14.336 0-28.672 9.216-35.328 23.04L367.616 350.72l-248.32 45.056c-14.848 2.048-26.624 11.776-32.256 27.648-4.096 14.336 0.512 31.232 11.264 41.984l178.688 166.4-46.592 243.2c-3.072 14.336 4.096 30.208 16.384 39.424 6.144 4.608 14.336 7.168 22.528 7.168 6.656 0 12.8-1.536 17.92-4.608l1.024-0.512 225.28-111.616z"
              p-id="10753"></path>
            <path
              d="M756.736 477.184h-2.048l-162.816-28.672-72.704-147.968c-3.072-6.144-0.512-13.312 5.632-15.872 6.144-3.072 13.312-0.512 15.872 5.632l67.584 137.216 151.04 26.624c6.656 1.024 10.752 7.168 9.728 13.824-1.536 5.12-6.144 9.216-12.288 9.216z"
              fill="#00B65F" p-id="10754"></path>
          </svg>
        </div>
        收藏列表
      </div>
      <button class="rightButton" v-if="editMode == false&&ifVisitor==false" id="beginEdit" @click="toEdit">整理</button>
      <button class="rightButton" v-else-if="ifVisitor==false" id="endEdit" @click="endEdit">完成</button>
    </div>
    <div id="mainPane">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item,index) in CollectionList" :key=index :name=index
                          id="collectionTitle">
          <template slot="title">

            <svg style="margin-right: 5px;margin-top: 1px" t="1640087674252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4472" width="16" height="16"><path d="M523.636364 344.669091V279.272727a368.64 368.64 0 0 0-267.636364-3.258182h181.061818zM244.363636 279.272727a372.363636 372.363636 0 1 0 484.770909 485.469091H244.363636zM570.181818 302.545455v66.094545h83.781818A372.363636 372.363636 0 0 0 570.181818 302.545455z" fill="#FFEFDB" p-id="4473"></path><path d="M691.898182 415.650909h-153.134546l-118.458181-93.090909H290.909091v395.636364H744.727273a368.872727 368.872727 0 0 0-52.363637-302.545455z" fill="#FFEFDB" p-id="4474"></path><path d="M640 159.418182h232.727273v46.545454h-232.727273zM640 252.741818h232.727273v46.545455h-232.727273z" fill="#FF9E1F" p-id="4475"></path><path d="M523.636364 19.549091v325.818182l-87.272728-68.654546H244.363636v488.727273h605.090909v-209.454545h139.636364V19.549091z m279.272727 488.727273v209.454545h-512v-395.636364h129.396364l118.458181 93.09091H802.909091z m139.636364 0h-93.09091v-139.636364h-279.272727v-302.545455h372.363637z" fill="#040405" p-id="4476"></path></svg>
            <div>{{ item.name }}</div>
          </template>
          <div v-for="(paper,i) in item.detail" :key=i class="eachPaper">
            <svg t="1640091619097" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3625" width="17" height="17"><path d="M630.272 701.952c0 20.992-16.896 37.888-37.888 37.888h-497.152c-20.992 0-37.888-16.896-37.888-37.888v-442.368l193.024-178.688h342.528c20.992 0 37.888 16.896 37.888 37.888V701.952z" fill="#1C767E" p-id="3626"></path><path d="M245.76 75.776v178.176h-192.512z" fill="#55C1CB" p-id="3627"></path><path d="M539.136 660.992H194.56c-4.608 0-8.192-3.584-8.192-8.192V358.4c0-4.608 3.584-8.192 8.192-8.192h344.576c4.608 0 8.192 3.584 8.192 8.192v294.4c0 4.608-3.584 8.192-8.192 8.192z m-336.384-16.384h328.192v-278.016h-328.192v278.016z" fill="#15595F" p-id="3628"></path><path d="M277.504 660.992c-4.608 0-8.192-3.584-8.192-8.192V358.4c0-4.608 3.584-8.192 8.192-8.192 4.608 0 8.192 3.584 8.192 8.192v294.4c0 4.608-3.584 8.192-8.192 8.192z" fill="#15595F" p-id="3629"></path><path d="M539.136 441.344H194.56c-4.608 0-8.192-3.584-8.192-8.192 0-4.608 3.584-8.192 8.192-8.192h344.576c4.608 0 8.192 3.584 8.192 8.192 0 4.608-3.584 8.192-8.192 8.192zM539.136 513.536H194.56c-4.608 0-8.192-3.584-8.192-8.192 0-4.608 3.584-8.192 8.192-8.192h344.576c4.608 0 8.192 3.584 8.192 8.192 0 4.608-3.584 8.192-8.192 8.192zM539.136 583.68H194.56c-4.608 0-8.192-3.584-8.192-8.192 0-4.608 3.584-8.192 8.192-8.192h344.576c4.608 0 8.192 3.584 8.192 8.192 0 4.608-3.584 8.192-8.192 8.192z" fill="#15595F" p-id="3630"></path><path d="M970.752 908.288c0 22.016-17.92 39.936-39.936 39.936H413.184c-22.016 0-39.936-17.92-39.936-39.936v-460.8L574.464 261.12h356.864c22.016 0 39.936 17.92 39.936 39.936V908.288z" fill="#F2F2F2" p-id="3631"></path><path d="M573.952 261.12v185.856h-200.704z" fill="#CCCCCC" p-id="3632"></path><path d="M842.752 647.68h-303.104c-5.12 0-9.216-5.12-9.216-11.264 0-6.144 4.096-11.264 9.216-11.264h303.104c5.12 0 9.216 5.12 9.216 11.264 0 6.144-4.096 11.264-9.216 11.264zM842.752 737.28h-303.104c-5.12 0-9.216-5.12-9.216-11.264s4.096-11.264 9.216-11.264h303.104c5.12 0 9.216 5.12 9.216 11.264s-4.096 11.264-9.216 11.264zM691.2 826.88h-151.552c-5.12 0-9.216-5.12-9.216-11.264s4.096-11.264 9.216-11.264H691.2c5.12 0 9.216 5.12 9.216 11.264s-4.096 11.264-9.216 11.264z" fill="#B3B3B3" p-id="3633"></path><path d="M845.312 554.496h-303.104c-5.12 0-9.216-5.12-9.216-11.264 0-6.144 4.096-11.264 9.216-11.264h303.104c5.12 0 9.216 5.12 9.216 11.264 0 6.144-4.096 11.264-9.216 11.264z" fill="#B3B3B3" p-id="3634"></path></svg>
            <div class="paperName" @click="toPaper(paper.paper_id)">{{ paper.paper_name }}</div>
            <div class="threeButton" v-if="editMode == true">
              <button class="delete" @click="deletePaperInFavo(index,i)">移出收藏夹</button>
              <button class="move" @click="movePaper(paper.paper_id,index,i)">移动到</button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div v-if="CollectionList.length == 0">
        <el-empty description="还没有收藏夹噢"></el-empty>
      </div>
      <!--      <div id="empty"></div>-->
      <div id="bottomButton">
        <div id="twoButton" v-if="editMode == true">
          <button id="addNew" @click="createCollection">新建收藏夹</button>
          <button id="deleCollection" @click="deletefav">删除收藏夹</button>
        </div>

      </div>
    </div>
    <el-dialog title="新建文件夹" :visible.sync="create" class="infoDialog">
      <div class="dialogMainPane">
        <div class="DetailInfo">新建一个收藏夹，使你感兴趣的文献井井有序</div>
        <div class="introInfo">收藏夹的名字</div>
        <div class="myInput">
          <el-input autocomplete="off" type="textarea" rows="1" v-model="newName"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="twoButton">
          <el-button @click="createCancel" class="cancel">取 消</el-button>
          <el-button type="primary" @click="createConfirm" class="confirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="删除文件夹" :visible.sync="deleteCollection" class="infoDialog">
      <div class="dialogMainPane">
        <div class="DetailInfo">删除一个或多个收藏夹，所收藏的文献也会被删除</div>
        <div class="introInfo">选中需要删除的收藏夹</div>
        <div id="multi">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(item,index) in CollectionList" :key=index :label=index class="eachFav">
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <div class="twoButton">
          <el-button @click="deleteColCancel" class="cancel">取 消</el-button>
          <el-button type="primary" @click="deleteColConfirm" class="confirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="移动文献" :visible.sync="move" class="infoDialog">
      <div class="dialogMainPane">
        <div class="DetailInfo">将文献移动到另一个更合适的收藏夹中</div>
        <div class="introInfo">选择目标收藏夹</div>
        <div id="single">
          <el-radio-group v-model="radio">
            <el-radio v-for="(item,index) in CollectionList" :label=index :key=index class="singleRadio">
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <div class="twoButton">
          <el-button @click="moveCancel" class="cancel">取 消</el-button>
          <el-button type="primary" @click="moveConfirm" class="confirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {deleFavo, delePaperInFavo, moveFavo, uploadNewFavo} from "../../request/api";

export default {
  name: "myCollection",
  props: ['user', 'CollectionList', 'ifVisitor', 'imgSrcList'],
  data() {
    return {
      activeName: '1',
      create: false,
      deleteCollection: false,
      checkList: [],
      move: false,
      radio: '',
      newName: '',
      editMode: false,
      curpreFavoIdx: '',
      curpreInFavoIdx: '',
    };
  },
  methods: {
    // titleCase2(s) {
    //   return s.toLowerCase().replace(/\b([\w|‘]+)\b/g, function (word) {
    //     //return word.slice(0, 1).toUpperCase() + word.slice(1);
    //     return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    //   });
    // },
    toPaper(id) {
      console.log(id)
      this.getVisit(id)
      this.$router.push({
        path: '/article/' + id + '/overviews'
      })
    },
    getVisit(id){
      console.log('获取')
      this.axios({
        method:"post",
        // url:"http://139.9.132.83:8000/user/IsFavoritePaper",
        url:"http://139.9.132.83:8000/search/visitpaper",
        data:{
          paper_id: id
        }
      })
        .then(response=>{
          console.log(response.data)
        })
    },
    deletePaperInFavo(favo, idx) {
      console.log(this.$props.CollectionList[favo].name)
      this.$confirm('此操作将永久删除该收藏项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delePaperInFavo({
          user_id: localStorage.getItem('user_id'),
          favorite_name: this.$props.CollectionList[favo].name,
          paper_id: this.$props.CollectionList[favo].detail[idx].paper_id,
        }).then(res => {
          this.$props.CollectionList[favo].detail.splice(idx, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          console.log(res)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    createCollection() {
      this.create = true;
    },
    deletefav() {
      this.deleteCollection = true;
    },
    movePaper(id, pre, pos) {
      this.move = true;
      this.curpreFavoIdx = pre;
      this.curpreInFavoIdx = pos;
    },
    createCancel() {
      this.create = false;
    },
    createConfirm() {
      console.log(this.newName)
      uploadNewFavo({
        user_id: localStorage.getItem('user_id'),
        favorite_name: this.newName
      }).then(res => {
        console.log(res)
        // this.$router.go(0)
        var obj = {name: this.newName, detail: []}
        var tmp = Object.create(obj)
        this.$props.CollectionList.push(tmp)
        console.log(this.CollectionList)
        this.create = false;
        this.$message({
          message: '添加成功',
          type: 'success'
        });
      })
    },
    deleteColCancel() {
      this.deleteCollection = false;
    },
    deleteColConfirm() {
      this.$confirm('此操作将永久删除选中的收藏夹, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.checkList)
        console.log(this.$props.CollectionList)
        for (var i = 0; i < this.checkList.length; i++) {
          console.log(this.$props.CollectionList[this.checkList[i]])
          deleFavo({
            user_id: localStorage.getItem('user_id'),
            favorite_name: this.$props.CollectionList[this.checkList[i]].name
          }).then(res => {
            console.log(res)
            this.deleteCollection = false;
          })
          this.$props.CollectionList.splice(this.checkList[i], 1);
        }
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      this.deleteCollection = false
    },
    moveCancel() {
      this.move = false;
    },
    moveConfirm() {
      console.log(this.$props.CollectionList[this.curpreFavoIdx].detail[this.curpreInFavoIdx].paper_name)
      console.log(this.$props.CollectionList[this.radio].name)
      console.log(this.$props.CollectionList[this.curpreFavoIdx].name)
      moveFavo({
        user_id: localStorage.getItem('user_id'),
        paper_id: this.$props.CollectionList[this.curpreFavoIdx].detail[this.curpreInFavoIdx].paper_id,
        paper_name: this.$props.CollectionList[this.curpreFavoIdx].detail[this.curpreInFavoIdx].paper_name,
        favoName: this.$props.CollectionList[this.radio].name,
        preName: this.$props.CollectionList[this.curpreFavoIdx].name,
      }).then(res => {
        this.$props.CollectionList[this.radio].detail.push(this.$props.CollectionList[this.curpreFavoIdx].detail[this.curpreInFavoIdx])
        this.$props.CollectionList[this.curpreFavoIdx].detail.splice(this.curpreInFavoIdx, 1)
        this.$message({
          message: '移动成功',
          type: 'success'
        });
      })

      this.move = false;
    },
    toEdit() {
      this.editMode = true
    },
    endEdit() {
      this.editMode = false
    }
  }
}
</script>

<style scoped>
#myCollection {
  margin-top: 30px;
  background-color: white;
  box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
  padding-bottom: 10px;
  border-radius: 2px;
  width: 900px;
}

#leftCharacter {
  width: 250px;
  padding: 10px;
  margin-left: 10px;
  justify-content: flex-start;
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  color: #525252;
}

#multi {
  margin-top: 10px;
}

#topHead {
  display: flex;
  justify-content: flex-start;
  /*border-bottom: 1px solid #dedede;*/
}

/deep/ [data-v-d25ff02a] .el-collapse-item__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: #FFF;
  color: black;
  cursor: pointer;
  border-bottom: 1px solid #EBEEF5;
  font-size: 16px;
  font-weight: bold;
  /* font-weight: 500; */
  font-family: "Roboto", Arial, sans-serif;
  padding-left: 20px;
  -webkit-transition: border-bottom-color .3s;
  transition: border-bottom-color .3s;
  outline: 0;
}

#collectionTitle {
  font-family: "Roboto", Arial, sans-serif;
  color: black;
  font-weight: bold;
  font-size: 17px;
}

.eachFav {
  display: block;
  margin-top: 5px;
}

.paperName {
  margin-left: 10px;
  color: #2a2a2a;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
}

.paperName:hover {
  cursor: pointer;
  color: #005abb;
}

.threeButton {
  margin-left: auto;
  margin-right: 20px;
}

/deep/ .el-collapse-item__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: #FFF;
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #EBEEF5;
  font-size: 18px;
  /* font-weight: 500; */
  padding-left: 20px;
  -webkit-transition: border-bottom-color .3s;
  transition: border-bottom-color .3s;
  outline: 0;
}

/deep/ .el-collapse-item__content {
  /* padding-bottom: 25px; */
  font-size: 17px;
  color: #303133;
  line-height: 1.769230769230769;
}

.eachPaper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-bottom: 1px #e8e8e8 solid;
  height: 30px;
}

.threeButton button {
  font-family: "Roboto", Arial, sans-serif;
  display: inline;
  /* background-color: transparent; */
  /* background-color: #1f86fd; */
  font-weight: 600;
  /* color: #ffffff; */
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  margin-left: 15px;
  /* padding: 3px 10px 3px 10px; */
  border: none;
}

.threeButton button:hover {
  cursor: pointer;
}

.gotoPaper {
  background-color: #d2ecff;
  color: blue;
}

.delete {
  background-color: transparent;
  color: #e13939;
}

.move {
  background-color: transparent;
  color: #458957;
}

#bottomButton {
  display: flex;
}

#twoButton {
  margin-left: auto;
  margin-right: 10px;
  margin-top: 10px;
}

#empty {
  height: 200px;
}

#twoButton button {
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  display: inline;
  /*background-color: transparent;*/
  /*background-color: #1f86fd;*/
  /*color: #ffffff;*/
  font-size: 15px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  margin-left: 10px;
  padding: 8px;
  border: none;
}

#twoButton button:hover {
  cursor: pointer;
}

#addNew {
  background-color: #d2ecff;
  color: #151515;
}

#addNew:hover {
  background-color: #adc5ea;
}

#deleCollection {
  border: 1px solid red;
  background-color: #ffe6e6;
  color: #920000;
}

#deleCollection:hover {
  background-color: #d9bcbc;
}

.infoDialog {
  color: #343434;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.dialogMainPane {
  padding: 10px 20px 15px 20px;
}

.dialogInfo {
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  font-size: 18px;
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
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  display: inline;
  background-color: #0080ff;
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

.introInfo {
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  font-size: 17px;
  margin-top: 20px;
  color: black;
}

.cancel {
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  display: inline;
  background-color: transparent;
  color: #0080ff;
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

#single {
  margin-top: 10px;
}

.singleRadio {
  display: block;
  margin-top: 5px;
}

.rightButton {
  font-family: "Roboto", Arial, sans-serif;
  display: inline;
  color: #525252;
  border: none;
  /*background-color: transparent;*/
  /*background-color: #1f86fd;*/
  /*color: #ffffff;*/
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  margin-left: auto;
  margin-right: 20px;
  background-color: transparent;

}

.rightButton:hover {
  color: black;
}
</style>
