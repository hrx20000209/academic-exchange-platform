<template>
  <div class="grey">
    <div style="height: 20px">
      <!--      {{this.id }}-->
    </div>
    <div style="overflow: hidden;margin-bottom: 5px">
      <div style="float:left;margin-bottom: 20px" class="bigFrame">
        <div class="upFrame">
          <!--          <div style="height: 15px"></div>-->
          <div class="upFrameContent">参考文献</div>
        </div>
        <div v-if="this.references.length === 0">
          <div class="downFrame">
            <div class="downFrameContent">
              <div class="notAbstract">
                <div style="height:30px"></div>
                <div style="text-align:center">
                  <img src="@/assets/无参考文献.png">
                </div>
                <div style="text-align:center">
                  无参考文献
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="downFrame" v-for="(item,index) in references" :key="item">
            <div class="downFrameContent">
              <div class="title" style="margin-bottom: 10px;font-size: 18px" @click="toOtherPaper(item.id)">
                {{item.title}}
              </div>
              <div style="margin-bottom: 10px;font-size: 15px;color: dimgrey">
                <a class="articleType">Article</a>
                {{item.year}}
              </div>
              <div style="margin-bottom: 10px;font-size: 16.5px;overflow: hidden">
                <div class="author" v-for="(item2) in references[index].authors" :key="item2" @click="toAuthor(item2.id)">{{item2.name}}</div>
              </div>
              <div style="color: dimgrey;font-size: 15px;margin-bottom: 10px">{{item.n_citation}} Citations</div>
              <div style="height: 30px">
                <div style="float: left">
                  <el-button plain v-if="item.url === undefined" disabled>访问全文</el-button>
                  <el-button plain v-else @click="toWebsite(item.url)">访问全文</el-button>
                </div>
                <div style="float: right;margin-top: 12px;text-align: right">
                  <el-popover
                    popper-class="qrcodePopover"
                    placement="top-start"
                    trigger="click"
                    :key="item.url"
                    @show="loadQRCode(item)">
                    <el-link
                      class="textInQRCodePopover"
                      @click="copyUrl(item.id)"
                      :underline="false">点击此处复制链接
                    </el-link>
                    <!-- TODO 保存图片按钮-->
                    <h4 class="textInQRCodePopover">或分享二维码</h4>
                    <div id="qrcode" ref="qrcode"></div>
                    <!--                    <canvas :id="item.url"></canvas>-->
                    <el-button
                      slot="reference"
                      class="shareBtn"
                      @click="getQrcode(item.id)">
                      分享
                    </el-button>
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    <div style="height: 20px"></div>
  </div>
</template>

<script>
import ESApi from "../../api/elastic search";
import AC from '../article/Article.vue'
// import QRCode from "qrcode";
let Clipboard = window.navigator.clipboard;
import QRCode from 'qrcodejs2'
import {changeViewTime} from "../../request/api";
export default {
  name: "References",
  data(){
    return{
      index:'',
      key:'',
      references:[],
      references_year:[],
      reference:[],
      re:[],
      length:'',
      url:'',
      id:this.$route.params.paper_id,
    }
  },
  mounted(){
    // this.searchRe();
    this.search(this.id);
    // this.bianli();
    this.getQrcode();
    // this.a();
  },
  created() {
    // this.a();
  },
  methods:{
    a(){
      console.log(this.id)
    },
    toWebsite(url){
      window.open(url,"_blank")
    },
    qrcode (id) {
      console.log(id)
      var url1 = 'http://139.9.132.83//article/'+ id + '/overviews';
      this.url = 'http://139.9.132.83//article/'+ id + '/overviews';
      console.log(this.url)
      let qrcode = new QRCode('qrcode',{
        width: 120, // 设置宽度，单位像素
        height: 120, // 设置高度，单位像素
        text: url1 // 设置二维码内容或跳转地址
      })
    },
    getQrcode(id){
      document.getElementById("qrcode").innerHTML=''  //先清空之前生成的二维码
      this.$nextTick(()=>{
        this.qrcode(id)
      })
    },
    toOtherPaper(id){
      let router = '/article/'+ id + '/overviews'
      this.$route.params.paper_id = id
      this.getVisit(id)
      console.log(this.$route.params.paper_id)
      this.$router.push(router)
      this.$router.go(0);
    },
    getVisit(id){
      console.log('获取')
      this.axios({
        method:"post",
        // url:"http://139.9.132.83:8000/user/IsFavoritePaper",
        url:"http://139.9.132.83:8000/search/visitpaper",
        data:{
          paper_id: id
        }
      })
        .then(response=>{
          console.log(response.data)
        })
    },
    search(paper_id) {
      // console.log('111')
      ESApi.getMsg(paper_id).then(response => {
        console.log(response.data)
        this.length = response.data.hits.total.value
        // console.log(this.length)
        // this.$store.state.abstract = ''
        this.$store.state.references = []
        this.re = []
        // this.citation_by_year = []
        for (var i = 0; i < this.length; i++) {
          // if (response.data.hits.hits[i]._source.id === paper_id) {
          let article = response.data.hits.hits[0]

          for (var l = 0; l < article._source.reference.length; l++) {
            // console.log(article._source.reference[l])
            this.re.push(article._source.reference[l])
            this.$store.commit('setReferences', article._source.reference[l])
            // console.log(this.$store.state.references[l])
          }
          console.log(this.re)
          console.log(this.$store.state.references)
          this.bianli();
        }
      })
    },
    bianli(){
      this.reference = []
      for(var i = 0; i < this.re.length;i++) {
        // console.log(this.$store.state.references[i])
        this.reference.push(this.re[i])
      }
      this.references = []
      console.log(this.reference)
      for(var j = 0; j < this.reference.length;j++){
        // console.log('1.1')
        // console.log(this.reference[j])
        ESApi.getRe(this.reference[j]).then(response =>{
          // console.log(response.data.hits.hits[0])
          // console.log(response.data.hits.total.value)
          // console.log('1.2')
          let article = response.data.hits.hits[0]
          this.references.push(article._source)
          // console.log(this.references)
          // console.log(this.references.length)
        })
      }
    },
    toAuthor(id){
      ESApi.getAuthorInfo(id).then(response => {
        console.log(response);
        if (response.data.hits.hits.length > 0) {
          changeViewTime({
        author_id: id
      }).then(res => {
        console.log(res)
      })
          this.$router.push({
            path: '/authorPage',
            query: {
              id: id
            }
          })
          // this.$router.go(0)
        }
      })
    },
    copyUrl(id){
      let url1 = 'http://139.9.132.83//article/'+ id + '/overviews';
      Clipboard.writeText(url1).then(function () {
        // console.log(url1)
      }, function () {

      });
    },
    // copyUrl(url) {
    //   let that = this;
    //   Clipboard.writeText(url).then(function () {
    //     console.log(this);
    //     that.notifyInfo("已复制原文链接");
    //   }, function () {
    //     that.notifyInfo("复制链接失败，请手动复制：\n" + url);
    //   });
    // },
    loadQRCode(result) {
      // console.log(result.url);
      // let elem = document.getElementById(result.url);
      // console.log(elem);
      // try {
      //   QRCode.toCanvas(elem, result.url, {
      //     margin: 0,
      //   }, function (error) {
      //     if (error) console.error(error);
      //   });
      // } catch (e) {
      //   console.log(e);
      // }
      // result.hasLoadedQRCode = true;
      // console.log("LOAD END");
    }
  }
}
</script>

<style scoped>
.title{

}
.title:hover{
  cursor: pointer;
}
.author{
  text-align: center;
  padding: 4px;
  border: #00a39e solid 2px;
  float: left;
  margin-right: 8px;
  border-radius: 6px;
}
.author:hover{
  cursor: pointer;
}
.articleType{
  width: 60px;
  background: #C5E8E5;
  color: #007478;
  border-radius: 2px;
  text-align: center;
}
.grey{
  background: rgba(221,221,221,0.3);
  background-size: cover;
  /*height: 400px;*/
  /*height: 1000px;*/
  /*width: 100%;*/
}
.bigFrame{
  /*height: 300px;*/
  width: 66%;
  background: white;
  border-radius: 2px;
  /*margin: auto;*/
  margin-left: 10%;
  /*margin-bottom: 30px;*/
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2)
}
.upFrame{
  height: 50px;
  border-bottom: rgba(0, 0, 0, .12) solid 1px;
}
.upFrameContent{
  padding: 13px;
  margin-left: 15px;
  font-size: 18px;
}
.downFrame{
  border-bottom: lightgrey solid 1px;
}
.downFrameContent{
  padding: 30px;
}
.rightFrame{
  width: 25%;
  float: right;
  margin-right: 10%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.notAbstract{
  width: 100%;
  height: 200px;
  border: lightgray solid 1px;
}
</style>
