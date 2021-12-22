<template>
  <div id="researchItemDetail">
    <div id="leftPane">
      <div id="title" @click="toPaper(research._source.id)">
        {{ titleCase2(research._source.title) }}
      </div>
      <div id="someInfo">
        <div id="articleInfo">
          Article
        </div>

        <div id="time">
          {{ research._source.year }} {{ research._source.venue.raw }}
        </div>

      </div>
      <div id="authorInfo">
        <div class="authorName" v-for="(item,index) in research._source.authors" :key="index">
<!--          <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>-->
          <div class="authorNameInfo">{{ titleCase2(item.name) }}</div>
          <div v-if="index < research._source.authors.length-1" class="myspace">·</div>
        </div>
        <div id="cite">{{research._source.n_citation}} citations</div>
      </div>
<!--      <div id="abstract">{{research.abstract}}</div>-->
<!--    <div style="display: flex">-->
<!--      -->
<!--    </div>-->
<!--    <div id="rightPane" v-if="research.hasFull == true">-->
<!--      <i class="el-icon-tickets"></i>-->
<!--    </div>-->
    </div>
<!--    <div id="bottomPane">-->
<!--        <div id="leftBottom">-->
<!--          <div v-if="research.hasFull == true" class="myButton">下载</div>-->
<!--          <div v-else class="myButton">申请获得全文</div>-->
<!--        </div>-->
<!--        <div id="rightBottom">-->
<!--          <div class="threeButton">推荐</div>-->
<!--          <div class="threeButton">关注</div>-->
<!--          <div class="threeButton">分享</div>-->
<!--        </div>-->
<!--      </div>-->
  </div>
</template>

<script>
export default {
  name: "researchDetailItem",
  props:['research'],
  methods:{
    toPaper(id){
      this.getVisit(id)
      this.$router.push({
        path:'/article/'+id+'/overviews'
      })
    },
    getVisit(id){
      // console.log('获取')
      this.axios({
        method:"post",
        // url:"http://139.9.132.83:8000/user/IsFavoritePaper",
        url:"http://139.9.132.83:8000/search/visitpaper",
        data:{
          paper_id: id
        }
      })
        .then(response=>{
          // console.log(response.data)
        })
    },
    titleCase2(s) {
      return s.toLowerCase().replace(/\b([\w|‘]+)\b/g, function (word) {
        //return word.slice(0, 1).toUpperCase() + word.slice(1);
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
      });
    },
  }
}
</script>

<style scoped>
#researchItemDetail{
 background-color: white;
 margin: 30px 30px 0px 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #dedede;
}
#leftPane{
  display: block;
}
#title{
  font-family: "Roboto", Arial, sans-serif;
  color: black;
  font-size: 18px;
  font-weight: bold;
}
#title:hover{
  cursor: pointer;
}
#someInfo{
  display: flex;
  margin-top: 10px;
}
.myspace{
  margin-left: 10px;
}
#articleInfo{
  background-color: #c5e8e5;
  color: #007478;
  padding: 5px;
  font-family: "Roboto", Arial, sans-serif;
  border-radius: 2px;
  font-size: 17px;
}
#hasFullText{
  color: #007478;
  padding: 5px;
  border: #007478 1px solid;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 17px;
  margin-left: 10px;
  border-radius: 2px;
}
#time {
    color: #939393;
  background-color: transparent;
  padding: 5px;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 17px;
  margin-left: 10px;
  /*margin-left: auto;*/
  /*margin-right: 10px;*/
}
#authorInfo{
  display: flex;
  /*margin-top: 10px;*/
}
.authorName{
  display: flex;
  margin-right: 10px;
}
.authorNameInfo{
  font-family: "Roboto", Arial, sans-serif;
  font-size: 17px;
  color: black;
  /*margin-right: auto;*/
  /*margin-left: 10px;*/
  margin-top: 6px;
}
#bottomPane{
  margin-top: 15px;
  display: flex;
}
#leftBottom{
  width: 600px;
}
#rightBottom{
  display: flex;
  width: 200px;
  justify-content: flex-end;
}
.myButton{
  border: #0080ff solid 1px;
  padding: 5px 10px 5px 10px;
  background-color: transparent;
  font-family: "Roboto", Arial, sans-serif;
  color: #0080ff;
  font-size: 17px;
  text-align: center;
  width: fit-content;
  border-radius: 2px;
}
.myButton:hover{
  background-color: #0080ff;
  color: white;
  cursor: pointer;
}
.threeButton{
  background-color: transparent;
  border: none;
  padding: 5px 8px 5px 8px;
  margin-left: 6px;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 17px;
  color: #343434;
}
.threeButton:hover{
  background-color: #eaeaea;
  color: black;
  cursor: pointer;
}
#rightPane{
  display: flex;
  justify-content: flex-end;
  font-size:18px;
}
#abstract{
  font-family: "Roboto", Arial, sans-serif;
  font-size: 17px;
  color: #343434;
  margin-top: 10px;
}
#cite{
  margin-left: auto;
  margin-right: 20px;
  font-style: italic;
  color: #727272;
}
</style>
