<template>
  <div id="myCollection">
    <div id="topHead">
      <div id="leftCharacter">我的收藏</div>
    </div>
    <div id="mainPane">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item,index) in CollectionList" :key=index :title=item.name :name=index
                          id="collectionTitle">
          <div v-for="(paper,i) in item.detail" :key=i class="eachPaper">
            <div class="paperName">{{ paper.paper_name }}</div>
            <div class="threeButton">
              <button class="gotoPaper">查看文献</button>
              <button class="delete">移出收藏夹</button>
              <button class="move" @click="movePaper(paper.paper_id)">移动到</button>
            </div>


          </div>
        </el-collapse-item>
      </el-collapse>
      <div v-if="CollectionList.length == 0">
        <el-empty description="你还没有收藏夹噢，新建一个试试吧"></el-empty>
      </div>
      <!--      <div id="empty"></div>-->
      <div id="bottomButton">
        <div id="twoButton">
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
import {uploadNewFavo} from "../../request/api";

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
      curMovePaperId: '',
      radio: '',
      newName: ''
    };
  },
  methods: {
    createCollection() {
      this.create = true;
    },
    deletefav() {
      this.deleteCollection = true;
    },
    movePaper(id) {
      this.move = true;
      this.curMovePaperId = id
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
        this.create = false;
      })
    },
    deleteColCancel() {
      this.deleteCollection = false;
    },
    deleteColConfirm() {
      this.deleteCollection = false;
    },
    moveCancel() {
      this.move = false;
    },
    moveConfirm() {
      this.move = false;
    },
  }
}
</script>

<style scoped>
#myCollection {
  margin-top: 20px;
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

#collectionTitle {
  font-family: "Roboto", Arial, sans-serif;
  color: black;
  font-weight: bold;
}

.eachFav {
  display: block;
  margin-top: 5px;
}

.paperName {
  margin-left: 20px;
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  font-size: 18px;
  width: 500px;
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
  display: flex;
  padding: 10px;
  border-bottom: 1px whitesmoke solid;
}

.threeButton button {
  font-family: "Roboto", Arial, sans-serif;
  display: inline;
  /*background-color: transparent;*/
  /*background-color: #1f86fd;*/
  font-weight: bold;
  /*color: #ffffff;*/
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  margin-left: 5px;
  padding: 5px;
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
  border: 1px solid red;
  background-color: #ffe6e6;
  color: red;
}

.move {
  background-color: #cffffa;
  color: green;
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
</style>
