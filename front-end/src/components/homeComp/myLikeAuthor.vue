<template>
  <div id="myLikeAuthor">
    <div id="topHead">
      <div id="leftCharacter">我的关注</div>
    </div>
    <div id="followPane">
      <div v-for="(item,index) in followList" :key="index">
        <div class="eachFollowAuthorPane">
          <div class="leftPic">
            <el-avatar :size="70" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
              <!--              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>-->
            </el-avatar>
          </div>
          <div class="rightPart">
            <div class="authorName">{{ item.name }}</div>
            <div class="authorData">
              <div class="pub">
                发表:{{ item.n_pubs }}
              </div>
              <div class="citation">被引:{{ item.n_citation }}</div>
            </div>
            <div class="intro">简介:{{ item.summary }}</div>
          </div>
          <div class="rightButton">

            <button class="toAuthor" @click="toPage(index)">进入门户</button>
            <button class="cancelFollow" @click="cancelFollow(index)">取消关注</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {cancelFollow} from "../../request/api";

export default {
  name: "myLikeAuthor",
  props: ['user', 'followList'],
  methods: {
    toPage(index) {
      this.$router.push({
        path: '/authorPage',
        query: {
          // id:this.followList[index].scholar_id
        }
      })
    },
    cancelFollow(index) {
      cancelFollow({
        follow_id: this.user.user_id,
        follower_id: this.followList[index].scholar_id
      }).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
#myLikeAuthor {
  margin-top: 10px;
  background-color: white;
  border: 1px solid #dedede;
  padding-bottom: 10px;
  border-radius: 2px;
  width: 900px;
}

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
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 18px;
  color: black;
}

.authorData {
  display: flex;
  font-family: "Microsoft YaHei";
  font-size: 11px;
  color: #606266;
  margin-top: 5px;
}

.intro {
  font-family: "Microsoft YaHei";
  font-size: 14px;
  color: #343434;
  margin-top: 6px;
}

.citation {
  margin-left: 10px;
}

.rightButton {
  justify-content: flex-end;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.toAuthor {
  font-family: "Microsoft YaHei UI";
  display: inline;
  background-color: transparent;
  background-color: #1f86fd;
  font-family: "Roboto", Arial, sans-serif;
  color: #ffffff;
  font-size: 13px;
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
  font-family: "Microsoft YaHei UI";
  display: inline;
  background-color: transparent;
  background-color: #d0d0d0;
  font-family: "Roboto", Arial, sans-serif;
  color: #5a5a5a;
  font-size: 13px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  margin-left: 30px;
  padding: 8px;
  border: none;
  margin-top: 10px;
}

.cancelFollow:hover {
  background-color: #999999;
  color: white;
}
</style>
