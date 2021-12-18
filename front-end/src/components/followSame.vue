<template>
  <div id="followSame">
    <div id="topHead">
      <div id="leftCharacter" style="display: flex">
        <div style="margin-top: 1px">
          <svg style="margin-right: 5px" t="1639836033339" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8205" width="20" height="20"><path d="M640 619.52m-281.6 0a281.6 281.6 0 1 0 563.2 0 281.6 281.6 0 1 0-563.2 0Z" fill="#FED847" p-id="8206"></path><path d="M489.78944 962.56C272.25088 961.78176 96.53248 784.7936 97.32096 567.25504A393.89184 393.89184 0 0 1 358.99392 197.632a20.71552 20.71552 0 0 1 13.76256 39.08608c-182.82496 64.62464-278.6304 265.216-214.00576 448.04096s265.216 278.6304 448.04096 214.00576c182.82496-64.63488 278.6304-265.216 214.00576-448.04096a351.10912 351.10912 0 0 0-213.84192-213.94432 20.72576 20.72576 0 0 1 13.80352-39.07584c204.88192 73.1136 311.69536 298.47552 238.592 503.36768A393.90208 393.90208 0 0 1 489.78944 962.56z m0-600.832a20.6848 20.6848 0 0 1-20.65408-20.71552V92.39552a20.66432 20.66432 0 0 1 41.30816-0.06144V340.992a20.6848 20.6848 0 0 1-20.6336 20.736h-0.02048z m0 455.80288c-137.02144-0.37888-247.86944-111.60576-247.808-248.60672a20.65408 20.65408 0 0 1 41.3184-0.06144v0.06144c0.3584 114.05312 93.11232 206.22336 207.17568 205.86496 114.05312-0.3584 206.22336-93.12256 205.86496-207.17568-0.36864-113.79712-92.7232-205.86496-206.52032-205.86496a20.72576 20.72576 0 0 1 0-41.43104c137.30816 0 248.60672 111.3088 248.60672 248.61696S627.0976 817.54112 489.78944 817.53088z m0-455.80288a20.48 20.48 0 1 1 14.67392-6.00064 21.8112 21.8112 0 0 1-14.67392 6.00064z m0 269.312a82.88256 82.88256 0 1 1 82.60608-83.13856v0.26624a82.82112 82.82112 0 0 1-82.60608 82.90304v-0.03072z m0-124.3136a41.45152 41.45152 0 1 0 41.29792 41.59488v-0.14336a41.4208 41.4208 0 0 0-41.29792-41.41056v-0.04096z" fill="" p-id="8207"></path></svg>
        </div>
        关注概览</div>
    </div>
    <div class="mainPane" v-if="followList.length>0">
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
    <div v-else class="mainPane">
      <el-empty description="暂时没有关注噢"></el-empty>
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
  font-size: 16px;
  letter-spacing: 1px;
  color: #8e8e8e;
}

.mainPane {
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
