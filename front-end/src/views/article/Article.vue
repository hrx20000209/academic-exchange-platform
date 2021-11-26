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
              <div style="height: 20px"></div>
<!--              作者这里 应该是需要改点什么-->
              <div class="articleActhor">
                <div class="author" v-for="(item2) in authors" :key="item2">{{item2.name}}</div>
              </div>
            </div>
          </div>
          <!--      分界线-->
          <div class="dividingLine"></div>
          <!--      导航栏-->
          <div>
            <el-menu class="el-menu-demo" mode="horizontal" router>
              <el-menu-item index="/article/overviews">Overviews</el-menu-item>
<!--              <el-menu-item index="/article/stats">Stats</el-menu-item>-->
              <el-menu-item index="/article/comments">Comments</el-menu-item>
<!--              <el-menu-item index="/article/citations">Citations</el-menu-item>-->
              <el-menu-item index="/article/references">References</el-menu-item>
              <el-menu-item>
                <el-button type="primary" v-if="this.flagLoad === true"><a :href="toWebsite(this.urlArticle)">下载全文</a></el-button>
                <el-button type="primary"  disabled v-else>下载全文</el-button>
              </el-menu-item>

              <el-menu-item>
                <el-button type="warning" v-if="!this.flagShoucang" @click="shoucang">收藏文献</el-button>
                <el-button type="warning" plain v-else @click="bushoucang">取消收藏</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="success" v-if="!this.flagQingDan" @click="qingdan">加入清单</el-button>
                <el-button type="success" plain v-else @click="buqingdan">已加入清单</el-button>
              </el-menu-item>
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
import Nav_with_searchBox from "../../components/nav_with_searchBox";
export default {
  name: "Article",
  data(){
    return{
      flagShoucang: true,
      flagQingDan: true,
      flagLoad: true,
        id: "",
        title: "",
        authors: [],
        author:'',
        abstracts: "",
        year: "",
        reference:[],
        venue: {},
      urlArticle: "",
      citation_by_year:{},
      flag:'',
      length:'',
    }
  },
  mounted() {
    this.search();
    console.log('333')
    // this.searchRelated();
  },
  methods: {
    shoucang(){
      this.flagShoucang = true;
    },
    bushoucang(){
      this.flagShoucang = false;
    },
    qingdan(){
      this.flagQingDan = true;
    },
    buqingdan(){
      this.flagQingDan = false;
    },
    toWebsite(){
      return this.urlArticle
    },
    // search1(){
    //   this.$store.commit('setTitle','._source.title')
    //   console.log(this.$store.state.title)
    // },
    search() {
      console.log('111')
      ESApi.getMsg('7C4C2B3B').then(response =>{
        // if(response.data.hits.hits._source.id === '7C4C2B3B'){
          console.log(response.data)
          this.length = response.data.hits.total.value
          console.log(this.length)
          this.$store.state.abstract = ''
          for(var i = 0; i < this.length; i++){
            if(response.data.hits.hits[i]._source.id === '7C4C2B3B'){
              let article = response.data.hits.hits[i]
              this.title = article._source.title
              console.log(this.title)
              // this.abstracts = article._source.abstract
              this.$store.commit('setTitle',article._source.title)
              console.log(this.$store.state.title)

              this.year = article._source.year
              if(article._source.url === undefined){
                this.flagLoad = false
                console.log('aaaa')
              }else{
                this.urlArticle = article._source.url
                console.log(this.urlArticle)
              }
              if(article._source.abstract === undefined){
                this.flag = 0
                console.log('flag')
              }else{
                this.$store.commit('setAbstract',article._source.abstract)
                console.log(this.$store.state.abstract)
              }
              for(var k = 0; k < article._source.citation_by_year.length;k++){
                // console.log(article._source.citation_by_year[k])
                this.$store.commit('setCitation',article._source.citation_by_year[k])
                console.log(this.$store.state.citation_by_year[k])
              }
              for(var l = 0; l <article._source.reference.length; l++){
                console.log(article._source.reference[l])
                this.$store.commit('setReferences',article._source.reference[l])
                console.log(this.$store.state.references[l])
              }
              for(var j = 0; j < article._source.authors.length;j++){
                // this.authors[j] = article._source.authors[j]
                this.authors.push(article._source.authors[j])
                // console.log(this.authors[j])
                // this.author += this.authors[j].name
                // this.author += ' 、'
              }
              // this.authors[j] = article._source.authors[j]
              // console.log(this.authors[j])
              // this.author += this.authors[j].name
              console.log(this.authors)
            }
          }
        // }

      })
    },
    // searchRelated(){
    //   console.log('related');
    //   ESTitle.getTitle(this.$store.state.title).then(response =>{
    //     console.log(response.data)
    //     this.length = response.data.hits.total.value
    //     // Vue.set(this.relatedArticle, 1, response.data.hits.hits[1].)//给列表对象新增属性
    //     for(var i = 0; i < this.length - 1; i++){
    //       let re = response.data.hits.hits[i+1]
    //       // this.relatedArticle[i-1].name = re._source.title
    //       // this.relatedArticle[i-1].value = re._score
    //       // console.log(this.relatedArticle[i-1].name)
    //       // console.log(this.relatedArticle[i-1].value)
    //       this.relatedArticle[i] = re
    //       console.log(this.relatedArticle[i])
    //       console.log(this.relatedArticle[i]._source.title)
    //       console.log(this.relatedArticle[i]._score)
    //     }
    //   })
    // },
    gotoTotalContent(){
      if(this.flag === 0){
        console.log('错误')
      }
      else{
        console.log('成功')
      }
    },

  }
}
</script>

<style scoped>
.author{
  text-align: center;
  padding: 2px;
  border: #00a39e solid 1px;
  float: left;
  margin-right: 3px;

}
.main{
  width: 100%;
}
.white{
  height: 222px;
}
.whitePart{
  width: 80%;
  margin: 0 auto;
  height: 160px;
}
.whiteContent{
  height: 160px;
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
