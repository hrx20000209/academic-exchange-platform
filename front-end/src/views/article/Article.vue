<template>
  <!--  总体-->
  <div class="main">
    <nav_with_search-box></nav_with_search-box>
    <div style="height: 10px"></div>
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
                <div class="author" v-for="(item2) in authors" :key="item2" @click="toAuthor(item2.id)">{{item2.name}}</div>
              </div>
            </div>
          </div>
          <!--      分界线-->
          <div class="dividingLine"></div>
          <!--      导航栏-->
          <div>
            <el-menu class="el-menu-demo" mode="horizontal" router >
<!--              <el-menu-item index="/article/overviews">Overviews</el-menu-item>-->
              <el-menu-item :index="overviewIndex">概述</el-menu-item>
              <!--              <el-menu-item index="/article/stats">Stats</el-menu-item>-->
              <!--              <el-menu-item index="/article/comments">Comments</el-menu-item>-->
              <el-menu-item :index="commentIndex">评论</el-menu-item>
              <!--              <el-menu-item index="/article/citations">Citations</el-menu-item>-->
              <!--              <el-menu-item index="/article/references">References</el-menu-item>-->
              <el-menu-item :index="referenceIndex">参考文献</el-menu-item>
              <el-menu-item>
                <el-button type="primary" v-if="this.flagLoad === true" @click="toWebsite">查看全文</el-button>
                <el-button type="primary"  disabled v-else>查看全文</el-button>
              </el-menu-item>

              <el-menu-item>
                <el-button type="warning" v-if="!this.isFavorite" @click="getFavoriteBag">收藏文献</el-button>
                <el-button type="warning" plain v-else @click="deleteFavorite">取消收藏</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="warning" v-if="!this.isRecommend" @click="recommend">推荐文献</el-button>
                <el-button type="warning" plain v-else @click="cancelRecommend">取消推荐</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="warning" @click="reMessage">获取引用信息</el-button>
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
    <el-dialog
      title="导出引用"
      :visible.sync="isRefer"
      width="50%"
    >
      <span>
        <div style="margin-top: 3px;overflow: hidden">
          <div style="float: left;width: 12%;margin-right: 2%">
            GB
          </div>
          <div style="float: left;width: 70%;margin-right: 2%">
            {{this.referMessages[0]}}
          </div>
          <div style="float: left;width: 10%;">
            <el-button
              v-clipboard:copy="this.referMessages[0]"
              style="
            height: 10px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
          "
            >复制
            </el-button
            >
          </div>
        </div>
        <div style="margin-top: 12px;overflow: hidden">
          <div style="float: left;width: 12%;margin-right: 2%">
            MLA
          </div>
          <div style="float: left;width: 70%;margin-right: 2%">
            {{this.referMessages[1]}}
          </div>
          <div style="float: left;width: 10%;">
            <el-button
              v-clipboard:copy="this.referMessages[1]"
              style="
            height: 10px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
          "
            >复制
            </el-button
            >
          </div>
        </div>
        <div style="margin-top: 12px;overflow: hidden">
          <div style="float: left;width: 12%;margin-right: 2%">
            APA
          </div>
          <div style="float: left;width: 70%;margin-right: 2%">
            {{this.referMessages[2]}}
          </div>
          <div style="float: left;width: 10%;">
            <el-button
              v-clipboard:copy="this.referMessages[2]"
              style="
            height: 10px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
          "
            >复制
            </el-button
            >
          </div>
        </div>
        <div style="margin-top: 12px;overflow: hidden">
          <div style="float: left;width: 12%;margin-right: 2%">
            BibTex
          </div>
          <div style="float: left;width: 70%;margin-right: 2%">
            {{this.referMessages[3]}}
          </div>
          <div style="float: left;width: 10%;">
            <el-button
              v-clipboard:copy="this.referMessages[3]"
              style="
            height: 10px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
          "
            >复制
            </el-button
            >
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isRefer = false">确 定</el-button>
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
  components: {
    Nav_with_searchBox
  },
  data(){
    return{
      indexActive:1,
      paper_id: '',
      overviewIndex:'',
      ra:'',
      dialogVisible: false,
      innerVisible: false,
      flagShoucang: false,
      flagQingDan: true,
      flagLoad: true,
      isRefer: false,
      title: "",
      authors: [],
      author:'',
      abstracts: "",
      year: "",
      reference:[],
      urlArticle: "",
      citation_by_year:{},
      flag:'',
      length:'',
      user_id:'',
      favorite_name:'',
      favorite_names:[],
      favorite_name_add:'',
      isFavorite:'',
      referMessages:[],
      referMessage:'',
      venue:'',
      isRecommend:'',

    }
  },
  mounted() {
    let paper_id = this.$route.params.paper_id
    this.paper_id = paper_id
    this.overviewIndex = '/article/'+paper_id+'/overviews'
    this.commentIndex = '/article/'+paper_id+'/comments'
    this.referenceIndex = '/article/'+paper_id+'/references'
    console.log(this.paper_id)
    console.log(this.overviewIndex)
    this.search(paper_id);
    // this.search('7C4C2B3B');
    console.log('333');
    this.getIsFavorite();
    // this.searchRelated();
    this.isRecommends();
  },
  methods: {
    toAuthor(id){
      this.$router.push({
          path: '/authorPage',
          query: {
            id: id
          }
        }
      )
    },
    //获取是否收藏
    isRecommends(){
      this.user_id = localStorage.getItem('user_id')
      console.log('获取是否推荐')
      this.axios({
        method:"get",
        // url:"http://139.9.132.83:8000/user/IsFavoritePaper",
        url:"http://139.9.132.83:8000/search/IsRecommend?paper_id="+ this.paper_id + "&user_id="+this.user_id,
        data:{
          user_id: this.user_id,
          paper_id: this.paper_id
        }
      })
        .then(response=>{
          console.log(response.data)
          this.isRecommend = response.data.isRecommend
        })
    },
    recommend(){
      this.user_id = localStorage.getItem('user_id')
      console.log('推荐')
      this.axios({
        method:"post",
        // url:"http://139.9.132.83:8000/user/IsFavoritePaper",
        url:"http://139.9.132.83:8000/search/Recommend",
        data:{
          user_id: this.user_id,
          paper_id: this.paper_id
        }
      })
        .then(response=>{
          console.log(response.data)
          this.isRecommend = true
        })
    },
    cancelRecommend(){
      this.user_id = localStorage.getItem('user_id')
      console.log('取消推荐')
      this.axios({
        method:"post",
        // url:"http://139.9.132.83:8000/user/IsFavoritePaper",
        url:"http://139.9.132.83:8000/search/CancelRecommend",
        data:{
          user_id: this.user_id,
          paper_id: this.paper_id
        }
      })
        .then(response=>{
          console.log(response.data)
          this.isRecommend = false
        })
    },
    reMessage(){
      // console.log(this.$store.state.refer)
      // this.referMessages = []
      // for(var i = 0; i < this.$store.state.refer.length; i++){
      //   this.referMessage = ''
      //   this.referMessage = '['+ (i+1) + ']'
      //   for(var j = 0; j < this.$store.state.refer[i].authors.length - 1; j++){
      //     this.referMessage += this.$store.state.refer[i].authors[j].name
      //     this.referMessage += ','
      //   }
      //   this.referMessage += this.$store.state.refer[i].authors[j].name
      //   this.referMessage += '.'
      //   this.referMessage += this.$store.state.refer[i].title
      //   this.referMessage += '[J]'
      //   this.referMessage += this.$store.state.refer[i].venue.raw
      //   this.referMessage += '].cs:['
      //   this.referMessage += this.$store.state.refer[i].year
      //   this.referMessage += '].http://localhost:8081/article/'//这里回头要改前端服务器地址
      //   this.referMessage += this.paper_id
      //   this.referMessage += '/overviews'
      //   this.referMessages.push(this.referMessage)
      // }
      // console.log(this.referMessages)
      this.referMessages = []
      // GB
      this.referMessage = ''
      for(var j = 0; j < this.authors.length - 1; j++){
        this.referMessage += this.authors[j].name
        this.referMessage += ','
      }
      this.referMessage += this.authors[j].name
      this.referMessage += '.'
      this.referMessage += this.title
      this.referMessage += '.'
      this.referMessage += this.venue
      this.referMessage += ','
      this.referMessage += this.year
      this.referMessage += '.'
      this.referMessages.push(this.referMessage)
      // MLA
      this.referMessage = ''
      for(var i = 0; i < this.authors.length - 1; i++){
        this.referMessage += this.authors[i].name
        this.referMessage += ','
      }
      this.referMessage += this.authors[i].name
      this.referMessage += '."'
      this.referMessage += this.title
      this.referMessage += '"'
      this.referMessage += this.venue
      this.referMessage += ',vol,'
      this.referMessage += this.year
      this.referMessage += '.'
      this.referMessages.push(this.referMessage)
      // APA
      this.referMessage = ''
      for(var l = 0; k < this.authors.length - 1; l++){
        this.referMessage += this.authors[l].name
        this.referMessage += ','
      }
      this.referMessage += this.authors[l].name
      this.referMessage += ',('
      this.referMessage += this.year
      this.referMessage += ').'
      this.referMessage += this.title
      this.referMessage += '.'
      this.referMessage += this.venue
      this.referMessage += '.'
      this.referMessages.push(this.referMessage)
      // BibTex
      this.referMessage = ''
      this.referMessage = '@inproceedings{Scholar'
      // this.referMessage += this.$router.params.paper_id
      this.referMessage += ',title="'
      this.referMessage += this.title
      this.referMessage += '",author="'
      for(var k = 0; k < this.authors.length - 1; k++){
        this.referMessage += this.authors[k].name
        this.referMessage += ','
      }
      this.referMessage += this.authors[k].name
      this.referMessage += '.",journal="'
      this.referMessage += this.venue
      this.referMessage += '",volume="'
      this.referMessage += this.year
      this.referMessage += '".'
      this.referMessages.push(this.referMessage)
      this.isRefer = true
    },
    //获取收藏夹信息
    getFavoriteBag(){
      this.user_id = localStorage.getItem('user_id')
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
      this.user_id = localStorage.getItem('user_id')
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
      this.user_id = localStorage.getItem('user_id')
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
          paper_name: this.title
        },
        // timeout:1000,
      })
        .then(response=>{
          console.log('收藏成功？')
          console.log(response.data)
        })
    },
    deleteFavorite(){
      this.user_id = localStorage.getItem('user_id')
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
      this.user_id = localStorage.getItem('user_id')
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
      window.open(this.urlArticle,"_blank");
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
          if(response.data.hits.hits[i]._source.id === paper_id){
            let article = response.data.hits.hits[i]
            this.title = article._source.title
            console.log(this.title)
            this.venue = article._source.venue.raw
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
            // for(var l = 0; l <article._source.reference.length; l++){
            //   console.log(article._source.reference[l])
            //   this.$store.commit('setReferences',article._source.reference[l])
            //   console.log(this.$store.state.references[l])
            // }
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
  background: #C5E8E5;
  color: #007478;
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
