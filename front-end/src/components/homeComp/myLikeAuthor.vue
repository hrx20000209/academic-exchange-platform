<template>
  <div id="myLikeAuthor">
    <div id="topHead">
      <div id="leftCharacter">关注列表</div>
    </div>
    <div id="followPane">
      <div v-for="(item,index) in followList" :key="index">
        <div class="eachFollowAuthorPane">
          <div class="leftPic">
            <el-avatar :size="65" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
              <!--              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>-->
            </el-avatar>
          </div>
          <div class="rightPart">
            <div class="authorName" @click="toPage(index)">{{ item.name }}</div>
            <div class="authorData">
              <div class="pub">
                发表:{{ item.n_pubs }}
              </div>
              <div class="citation">被引:{{ item.n_citation }}</div>
            </div>
            <div class="intro">简介:{{ item.summary }}</div>
          </div>
          <div class="rightButton">
            <button class="cancelFollow" @click="cancelFollow(index)">已关注</button>
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

.authorData {
  display: flex;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 14px;
  color: #606266;
  margin-top: 5px;
}

.intro {
  font-family: "Roboto", Arial, sans-serif;
  font-size: 16px;
  color: #343434;
  margin-top: 6px;
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
  border:1px solid #005abb;
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
