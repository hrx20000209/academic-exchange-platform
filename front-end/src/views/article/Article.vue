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
              <div style="height: 10px"></div>
              <!--              作者这里 应该是需要改点什么-->
              <div class="articleActhor">
                <div class="author" v-for="(item2) in authors" :key="item2" @click="toActhor(item2.id)">{{item2.name}}</div>
              </div>
            </div>
          </div>
          <!--      分界线-->
          <div class="dividingLine"></div>
          <!--      导航栏-->
          <div>
            <el-menu class="el-menu-demo" mode="horizontal" router :default-active="overviewIndex">
<!--              <el-menu-item index="/article/overviews">Overviews</el-menu-item>-->
              <el-menu-item :index="overviewIndex">Overviews</el-menu-item>
              <!--              <el-menu-item index="/article/stats">Stats</el-menu-item>-->
              <!--              <el-menu-item index="/article/comments">Comments</el-menu-item>-->
              <el-menu-item index="/article/1/comments">Comments</el-menu-item>
              <!--              <el-menu-item index="/article/citations">Citations</el-menu-item>-->
              <!--              <el-menu-item index="/article/references">References</el-menu-item>-->
              <el-menu-item index="/article/1/references">References</el-menu-item>
              <el-menu-item>
                <el-button type="primary" v-if="this.flagLoad === true"><a :href="toWebsite(this.urlArticle)">下载全文</a></el-button>
                <el-button type="primary"  disabled v-else>下载全文</el-button>
              </el-menu-item>

              <el-menu-item>
                <el-button type="warning" v-if="!this.isFavorite" @click="getFavoriteBag">收藏文献</el-button>
                <el-button type="warning" plain v-else @click="deleteFavorite">取消收藏</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="warning">推荐</el-button>
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
    <el-dialog
      title="收藏"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-dialog
        width="30%"
        title="新建收藏夹"
        :visible.sync="innerVisible"
        append-to-body>
        <span>
          <el-input
            placeholder="请输入收藏夹名称"
            v-model="favorite_name_add"
            clearable>
          </el-input>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false;favorite_name_add = ''">取 消</el-button>
          <el-button type="primary" @click="addFavoriteBag">确 定</el-button>
        </span>
      </el-dialog>
      <span>
        <el-radio-group v-for="(item,index) in favorite_names" :key="index" v-model="ra">
          <el-radio :label="index+1" border class="select">{{item}}</el-radio><br><br>
        </el-radio-group>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = true">新建收藏夹</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFavorite">确 定</el-button>
      </span>
    </el-dialog>
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
      indexActive:1,
      paper_id: "7C4C2B3B",
      overviewIndex:'',
      ra:'3',
      dialogVisible: false,
      innerVisible: false,
      flagShoucang: false,
      flagQingDan: true,
      flagLoad: true,

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
      user_id:'1',
      favorite_name:'',
      favorite_names:[

      ],
      favorite_name_add:'',
      isFavorite:'',
    }
  },
  mounted() {
    let paper_id = this.$route.params.paper_id
    this.overviewIndex = '/article/'+this.paper_id+'/overviews'
    console.log(this.paper_id)
    console.log(this.overviewIndex)
    this.search(paper_id);
    // this.search('7C4C2B3B');
    console.log('333');
    this.getIsFavorite();
    // this.searchRelated();
  },
  methods: {
    //获取收藏夹信息
    get(){
      console.log('11111')
    },
    getFavoriteBag(){
      this.dialogVisible = true
      console.log('进入获取收藏夹信息');
      this.axios({
        method: "get",
        url:'http://139.9.132.83:8000/user/GetFavorite?user_id=' + this.user_id,
        // url:"http://192.168.206.1:8000/user/GetFavorite",
        data:{
          user_id:this.user_id,//这里是user的id 但我这里没有
        },
        // timeout:1000,
      })
        .then(response=>{
          console.log('获取收藏夹信息')
          console.log(response)
          console.log(response.data)
          this.favorite_names = []
          for(var i = 0; i < response.data.favorites.length; i++){
            console.log(response.data.favorites[i].favorite_name)
            this.favorite_names.push(response.data.favorites[i].favorite_name)
            console.log(this.favorite_names[i])
          }
          //这里再赋值
        })
    },
    addFavoriteBag(){
      console.log('关闭')
      this.innerVisible = false;
      this.favorite_names.push(this.favorite_name_add)
      this.axios({
        method: "post",
        url:"http://139.9.132.83:8000/user/AddFavorite",
        // url:"http://192.168.206.1:8000/user/AddFavorite",
        data:{
          user_id:this.user_id,//这里是user的id 但我这里没有
          favorite_name: this.favorite_name_add  //
        },
        // timeout:1000,
      })
        .then(response=>{
          //user_id favorite_name pap
          console.log('加文件夹成功')
        })
    },
    addFavorite(){
      this.isFavorite = true;
      this.dialogVisible = false;
      this.favorite_name = this.favorite_names[this.ra-1];
      console.log(this.ra);
      console.log(this.favorite_name)
      console.log(this.paper_id)
      this.axios({
        method: "post",
        url:"http://139.9.132.83:8000/user/AddPaper",
        // url:"http://192.168.206.1:8000/user/AddPaper",
        data:{
          user_id:this.user_id, //这里是user的id 但我这里没有
          paper_id: this.paper_id,    //文章id
          favorite_name: this.favorite_name,
        },
        // timeout:1000,
      })
        .then(response=>{
          console.log('收藏成功？')
          console.log(response.data)
        })
    },
    deleteFavorite(){
      console.log('进入删除')
      this.isFavorite = false;
      this.axios({
        method: "post",
        // url:"http://192.168.206.1:8000/user/DeletePaper",
        url:"http://139.9.132.83:8000/user/CancelFavorite",
        data:{
          user_id:this.user_id, //这里是user的id 但我这里没有
          paper_id: this.paper_id,    //文章id
        },
        // timeout:1000,
      })
        .then(response=>{
          console.log(response.data)
        })
    },
    getIsFavorite(){
      console.log('获取是否收藏')
      this.axios({
        method:"get",
        // url:"http://139.9.132.83:8000/user/IsFavoritePaper",
        url:"http://139.9.132.83:8000/user/IsFavoritePaper?paper_id="+ this.paper_id + "&user_id="+this.user_id,
        data:{
          user_id: this.user_id,
          paper_id: this.paper_id
        }
      })
        .then(response=>{
          console.log(response.data)
          this.isFavorite = response.data.isFavorite
        })
    },
    toWebsite(){
      return this.urlArticle
    },
    // search1(){
    //   this.$store.commit('setTitle','._source.title')
    //   console.log(this.$store.state.title)
    // },
    search(paper_id) {
      console.log('111')
      ESApi.getMsg(paper_id).then(response =>{
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
  padding: 4px;
  border: #00a39e solid 2px;
  float: left;
  margin-right: 8px;
  border-radius: 6px;
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
  width: 70%;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.rightPartContent{
  font-size: 13px;
  margin-bottom: 2px;
}
</style>
