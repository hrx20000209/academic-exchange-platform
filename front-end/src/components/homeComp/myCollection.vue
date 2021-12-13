<template>
  <div id="myCollection">
    <div id="topHead">
      <div id="leftCharacter">收藏列表</div>
      <button class="rightButton" v-if="editMode == false" id="beginEdit" @click="toEdit">整理</button>
      <button class="rightButton" v-else id="endEdit" @click="endEdit">完成</button>
    </div>
    <div id="mainPane">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item,index) in CollectionList" :key=index :title=item.name :name=index
                          id="collectionTitle">
          <div v-for="(paper,i) in item.detail" :key=i class="eachPaper">
            <div class="paperName" @click="toPaper(paper.paper_id)">{{ titleCase2(paper.paper_name) }}</div>
            <div class="threeButton" v-if="editMode == true">
              <button class="delete" @click="deletePaperInFavo(index,i)">移出收藏夹</button>
              <button class="move" @click="movePaper(paper.paper_id,index,i)">移动到</button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div v-if="CollectionList.length == 0">
        <el-empty description="你还没有收藏夹噢，新建一个试试吧"></el-empty>
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
  props: ['user', 'CollectionList'],
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
    titleCase2(s) {
      return s.toLowerCase().replace(/\b([\w|‘]+)\b/g, function (word) {
        //return word.slice(0, 1).toUpperCase() + word.slice(1);
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
      });
    },
    toPaper(id) {
      console.log(id)
      this.$router.push({
        path: '/article/' + id + '/overviews'
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
        var obj={name: this.newName,detail:[]}
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
