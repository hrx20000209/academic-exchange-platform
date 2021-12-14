<template>
  <div id="followSame">
    <div id="topHead">
      <div id="leftCharacter">关注概览</div>
    </div>
    <div id="mainPane">
      <div class="onePossible" v-for="(item,index) in followList" :key="index">
        <el-avatar :size="40" :src=oriSrc+item.scholar_id></el-avatar>
        <div class="idAndNumber">
          <div class="idName">{{ titleCase2(item.name) }}</div>
          <div class="NumberInfor">发表: {{ item.n_pubs }} 被引: {{ item.n_citation }}</div>
        </div>
        <div class="rightButton">
          <button class="followButton" @click="toPaper(index)">查看门户</button>
        </div>
      </div>
    </div>
    <div id="footer">
      <div id="footerCharacter">更多信息请查看关注列表</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "followSame",
  props: ['followList'],
  data() {
    return {
      follows: [],
      oriSrc:'http://139.9.132.83:8000/user/getImage?author_id=',
    }
  },
  methods: {
    titleCase2(s) {
      return s.toLowerCase().replace(/\b([\w|‘]+)\b/g, function (word) {
        //return word.slice(0, 1).toUpperCase() + word.slice(1);
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
      });
    },
    toPaper(index){
      this.$router.push({
        path: '/authorPage',
        query: {
          id:this.$props.followList[index].scholar_id
        }
      })
    }
  },
  mounted() {
    // if(this.$props.followList.length>=5){
    //   this.follows = this.$props.followList.slice(0,5)
    // }else{
    //   this.follows = this.$props.followList
    // }
  }
}
</script>

<style scoped>
#followSame {
  background-color: white;
  border: 1px solid #dedede;
  border-radius: 2px;
  margin-top: 30px;
  box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
}

#topHead {
  display: flex;
  justify-content: flex-start;
}

#leftCharacter {
  padding: 10px;
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1px;
  color: #8e8e8e;
}

#mainPane {
  border-top: 1px solid #dedede;
  padding: 10px 20px 15px 20px;
}

.onePossible {
  display: flex;
  margin-top: 10px;
}

.idAndNumber {
  width: 200px;
  margin-left: 10px;
}

.idName {
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  font-size: 18px;
  color: #343434;
}

.rightButton {
  margin-left: auto;
  margin-right: 10px;
}

.NumberInfor {
  font-family: "Roboto", Arial, sans-serif;
  font-size: 16px;
  color: #8e8e8e;
}

.followButton {
  display: inline;
  background-color: transparent;
  border: #0080ff 1px solid;
  color: #0080ff;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  padding: 5px 10px 5px 10px;
  margin-left: auto;
  margin-right: 5px;
}

.followButton:hover {
  background-color: #0080ff;
  color: white;
}

#footer {
  border-top: 1px solid #dedede;
  padding: 15px;
  display: flex;
  justify-content: center;
}

#footerCharacter {
  font-family: "Roboto", Arial, sans-serif;
  font-size: 18px;
}

#footerCharacter:hover {
  cursor: pointer;
}
</style>
