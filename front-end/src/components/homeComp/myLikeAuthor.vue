<template>
  <div id="myLikeAuthor">
    <div id="topHead">
      <div id="leftCharacter" style="display: flex">
                <div style="margin-top: 1px">
          <svg style="margin-right: 5px" t="1639836033339" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8205" width="20" height="20"><path d="M640 619.52m-281.6 0a281.6 281.6 0 1 0 563.2 0 281.6 281.6 0 1 0-563.2 0Z" fill="#FED847" p-id="8206"></path><path d="M489.78944 962.56C272.25088 961.78176 96.53248 784.7936 97.32096 567.25504A393.89184 393.89184 0 0 1 358.99392 197.632a20.71552 20.71552 0 0 1 13.76256 39.08608c-182.82496 64.62464-278.6304 265.216-214.00576 448.04096s265.216 278.6304 448.04096 214.00576c182.82496-64.63488 278.6304-265.216 214.00576-448.04096a351.10912 351.10912 0 0 0-213.84192-213.94432 20.72576 20.72576 0 0 1 13.80352-39.07584c204.88192 73.1136 311.69536 298.47552 238.592 503.36768A393.90208 393.90208 0 0 1 489.78944 962.56z m0-600.832a20.6848 20.6848 0 0 1-20.65408-20.71552V92.39552a20.66432 20.66432 0 0 1 41.30816-0.06144V340.992a20.6848 20.6848 0 0 1-20.6336 20.736h-0.02048z m0 455.80288c-137.02144-0.37888-247.86944-111.60576-247.808-248.60672a20.65408 20.65408 0 0 1 41.3184-0.06144v0.06144c0.3584 114.05312 93.11232 206.22336 207.17568 205.86496 114.05312-0.3584 206.22336-93.12256 205.86496-207.17568-0.36864-113.79712-92.7232-205.86496-206.52032-205.86496a20.72576 20.72576 0 0 1 0-41.43104c137.30816 0 248.60672 111.3088 248.60672 248.61696S627.0976 817.54112 489.78944 817.53088z m0-455.80288a20.48 20.48 0 1 1 14.67392-6.00064 21.8112 21.8112 0 0 1-14.67392 6.00064z m0 269.312a82.88256 82.88256 0 1 1 82.60608-83.13856v0.26624a82.82112 82.82112 0 0 1-82.60608 82.90304v-0.03072z m0-124.3136a41.45152 41.45152 0 1 0 41.29792 41.59488v-0.14336a41.4208 41.4208 0 0 0-41.29792-41.41056v-0.04096z" fill="" p-id="8207"></path></svg>
        </div>
        关注列表</div>
    </div>
    <div id="followPane">
      <div v-if="this.$props.followList.length>0">
        <div v-for="(item,index) in followList" :key="index">
          <div class="eachFollowAuthorPane">
            <div class="leftPic">
              <el-avatar :size="65" :src="oriSrc+item.scholar_id">
                <!--              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>-->
              </el-avatar>
            </div>
            <div class="rightPart">
              <div class="authorName" @click="toPage(index)">{{ titleCase2(item.name) }}</div>
              <div class="authorData">
                <div class="pub">
                  发表:{{ item.n_pubs }}
                </div>
                <div class="citation">被引:{{ item.n_citation }}</div>
              </div>
              <div class="intro">简介:{{ item.summary }}</div>
            </div>
            <div class="rightButton" v-if="ifVisitor == false">
              <button class="cancelFollow" @click="cancelFollow(index)" v-if="stateList[index] == 1" :key="update">已关注</button>
              <button class="cancelFollow" @click="Follow(index)" v-else :key="update">关注</button>
            </div>
          </div>
        </div>
      </div>
      <el-empty v-else description="还没有关注学者哦"></el-empty>
    </div>
  </div>
</template>

<script>
import {cancelFollow, changeViewTime, followAuthor} from "../../request/api";

export default {
  name: "myLikeAuthor",
  props: ['user', 'followList','stateList','ifVisitor'],
  data(){
    return{
      update:1,
      oriSrc:"http://139.9.132.83:8000/user/getImage?author_id=",
    }
  },
  methods: {
    titleCase2(s) {
      return s.toLowerCase().replace(/\b([\w|‘]+)\b/g, function (word) {
        //return word.slice(0, 1).toUpperCase() + word.slice(1);
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
      });
    },
    toPage(index) {
      changeViewTime({
        author_id: this.followList[index].scholar_id
      }).then(res => {
        console.log(res)
      })
      this.$router.push({
        path: '/authorPage',
        query: {
          id:this.followList[index].scholar_id
        }
      })
    },
    cancelFollow(index) {
      this.$props.stateList[index]=0;
            this.update++;
      console.log(this.$props.stateList[index] == 1)
      cancelFollow({
        follow_id: this.followList[index].scholar_id,
        follower_id: localStorage.getItem('user_id')
      }).then(res => {
        console.log(this.$props.stateList)
        console.log(res)
        this.$message({
              message: '取消关注成功',
              type: 'success'
            });
      })
    },
    Follow(index){
      this.$props.stateList[index]=1;
            this.update++;
      followAuthor({
          follow_id: this.followList[index].scholar_id,
          follower_id: localStorage.getItem('user_id')
        }).then(res => {
          console.log(res)
          if (res.message == 'Follow success') {
            this.$message({
              message: '关注成功',
              type: 'success'
            });
          }
        })
    }
  }
}
</script>

<style scoped>
#myLikeAuthor {
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

#topHead {
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #dedede;
}

#followPane {
  padding-left: 10px;
  padding-right: 10px;
}

.eachFollowAuthorPane {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #dedede;
}

.rightPart {
  margin-left: 20px;
}

.authorName {
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  font-size: 18px;
  color: black;
}
.authorName:hover{
  cursor: pointer;
}
.authorData {
  display: flex;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 14px;
  color: #606266;
  margin-top: 5px;
}

.intro {
  font-family: "Roboto", Arial, sans-serif;
  font-size: 15px;
  color: #343434;
  margin-top: 6px;
  letter-spacing: 1px;
}

.citation {
  margin-left: 10px;
}

.rightButton {
  margin-left: auto;
  margin-right: 20px;
}

.toAuthor {
  font-family: "Roboto", Arial, sans-serif;
  display: inline;
  background-color: #1f86fd;
  color: #ffffff;
  font-size: 17px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  margin-left: 30px;
  padding: 8px;
  border: none;
}

.toAuthor:hover {
  cursor: pointer;
  background-color: #005abb;
}

.cancelFollow {
  display: inline;
  background-color: #ffffff;
  border: 1px solid #005abb;
  font-family: "Roboto", Arial, sans-serif;
  color: #0d49dc;
  font-size: 15px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  margin-left: 30px;
  padding: 4px 20px 4px 20px;
  margin-top: 20px;
}

.cancelFollow:hover {
  background-color: #eeefff;
}
</style>
