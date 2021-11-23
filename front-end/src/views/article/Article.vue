<template>
  <!--  总体-->
  <div class="main">
    <!--  包含下面那栏-->
    <div>
      <!--    上下两块-->
      <!--    白色-->
      <div class="white">
        <!--      白内容-->
        <div class="whitePart">
          <!--      内容-->
          <div class="whiteContent">
            <div class="leftPart">
              <div class="articleType">Article</div>
              <div class="articleTitle">{{this.title}}</div>
              <div class="articleDate">{{this.year}}</div>
              <div class="articleDOI">DOI: 10.52554/kjcl.2021.96.3</div>
              <div style="height: 20px"></div>
<!--              作者这里 应该是需要改点什么-->
              <div class="articleActhor">
                {{this.author}}
              </div>
            </div>
<!--        这里大概率不需要    -->
<!--            <div class="rightPart" style="overflow:hidden;">-->
<!--              <div class="rightPartContent">-->
<!--                Research Interest  <span>—————————————</span>  0.3-->
<!--              </div>-->
<!--              <div class="rightPartContent">-->
<!--                Citations  <span>—————————————————</span>  0.3-->
<!--              </div>-->
<!--              <div class="rightPartContent">-->
<!--                Recommendations <span>————————————</span>0.3-->
<!--              </div>-->
<!--              <div class="rightPartContent">-->
<!--                Reads  <span>——————————————————</span>  0.3-->
<!--              </div>-->
<!--              <div class="rightPartContent">-->
<!--                <div>Saved to your list-->
<!--                </div>-->
<!--              </div>-->
<!--              <div>-->
<!--                <div style="float: right;font-size: 14px;color:grey;">-->
<!--                  更多细节-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
          </div>
          <!--      分界线-->
          <div class="dividingLine"></div>
          <!--      导航栏-->
          <div>
            <el-menu class="el-menu-demo" mode="horizontal" router>
              <el-menu-item index="/article/overviews">Overviews</el-menu-item>
              <el-menu-item index="/article/stats">Stats</el-menu-item>
              <el-menu-item index="/article/comments">Comments</el-menu-item>
<!--              <el-menu-item index="/article/citations">Citations</el-menu-item>-->
              <el-menu-item index="/article/references">References</el-menu-item>
              <el-menu-item index="6" @click="gotoReferences"><el-button type="primary" @click="gotoTotalContent">下载全文</el-button></el-menu-item>
              <el-menu-item index="7">分享文献</el-menu-item>
            </el-menu>
          </div>
        </div>
      </div>
      <!--      线-->
      <div style="height: 1px;background: lightgrey">
      </div>
      <!--    显示子路由页面-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import ESApi from '../../api/elastic search'
export default {
  name: "Article",
  data(){
    return{
      flag: 1,
      
        id: "",
        title: "",
        authors: [],
        author:'',
        abstract: "",
        year: "",
        reference:[],
        venue: {},
        url: "",
        citation_by_year:{},
      
      length:'',
    }
  },
  mounted() {
    this.search();
    console.log('333')
  },
  methods: {
    search() {
      console.log('111')
      ESApi.getMsg('808411C2').then(response =>{
        console.log(response.data)
        this.length = response.data.hits.total.value
        console.log(this.length)
        for(var i = 0; i < this.length; i++){
          let article = response.data.hits.hits[i]
          this.title = article._source.title
          console.log(this.title)
          this.year = article._source.year
          if(article._source.url === undefined){
            this.flag = 0
            console.log('aaaa')
          }else{
            this.url = article._source.url
          }
          for(var j = 0; j < article._source.authors.length-1;j++){
            this.authors[j] = article._source.authors[j]
            console.log(this.authors[j])
            this.author += this.authors[j].name
            this.author += ' 、'
          }
          this.authors[j] = article._source.authors[j]
            console.log(this.authors[j])
            this.author += this.authors[j].name
          console.log(this.author)
        }
      })
    },
    gotoTotalContent(){
      if(this.flag === 0){
        console.log('错误')
      }
      else{
        console.log('成功')
      }
    }
  }
}
</script>

<style scoped>
.main{
  width: 100%;
}
.white{
  height: 212px;
}
.whitePart{
  width: 80%;
  margin: 0 auto;
  height: 130px;
}
.whiteContent{
  height: 150px;
}
.leftPart{
  width: 62%;
  float: left;
}
.articleType{
  width: 60px;
  background: lightblue;
  border-radius: 2px;
  text-align: center;
}
.articleTitle{
  font-size: 24px;
}
.articleDate{
  color: darkgray;
}
.articleDOI{
  color: darkgray;
}
.articleActhor{

}
.rightPart{
  float: right;
  width:300px;
  background: lightcyan;
  height: 120px;
}
.dividingLine{
  width: 100%;
  height: 1px;
  background: lightgrey;
}
.grey{
  background: rgba(221,221,221,0.3);
  /*height: 400px;*/
  /*height: 1000px;*/
  /*width: 100%;*/
}
.bigFrame{
  /*height: 300px;*/
  width: 50%;
  background: white;
  border-radius: 2px;
  /*margin: auto;*/
  margin-left: 10%;
  /*margin-bottom: 30px;*/
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.upFrame{
  height: 50px;
  border-bottom: rgba(0, 0, 0, .12) solid 1px;
}
.upFrameContent{
  padding: 15px;
  margin-left: 15px;
}
.downFrame{
  border-bottom: lightgrey solid 1px;
}
.downFrameContent{
  padding: 30px;
}
.textFrame{
  width: 80%;
  margin-left: 10%;
}
.textFrameContent{
  padding: 20px;
  margin: auto;
  width: 90%;

}
.textFrameContentButton{
  margin: auto;
  text-align: center;
}
.textFrameContentMain{
  text-align: right;
  color: darkgray;
  margin-bottom: 20px;
}
.textBigFrame{
  width: 100%;
  background: white;
  border-radius: 2px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.textUpFrameContent{
  /*padding: 15px;*/
  /*margin-left: 15px;*/
  background: rgba(221,221,221,0.3);
  border-bottom: rgba(0, 0, 0, .12) solid 1px;
  height: 50px;
}
.statsFrame{
  width: 80%;
  margin: auto;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.statsContent{
  float: left;
  width: 21.5%;
  /*border: lightgrey solid 1px;*/
  height: 80px;
  padding: 10px;
}
.statsFrameContent{
  padding: 25px;
}
.rightFrame{
  width: 25%;
  float: right;
  margin-right: 10%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.rightPartContent{
  font-size: 13px;
  margin-bottom: 2px;
}
</style>
