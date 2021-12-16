<template>
  <div class="grey">
    <div style="height: 20px"></div>
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
              <div style="margin-bottom: 10px;font-size: 18px" @click="toOtherPaper(item.id)">
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
                  <el-button plain v-else>访问全文</el-button>
                </div>
                <div style="float: right;margin-top: 12px;text-align: right">
                  Share
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      <!--      <div class="rightFrame">-->
      <!--        <div class="upFrame">-->
      <!--          &lt;!&ndash;          <div style="height: 15px"></div>&ndash;&gt;-->
      <!--          <div class="upFrameContent">Top referenced researchers</div>-->
      <!--        </div>-->
      <!--        <div class="downFrame">-->
      <!--          <div class="downFrameContent">-->
      <!--            <div style="font-size: 18px;margin-bottom: 5px">作者名</div>-->
      <!--            <div style="margin-bottom: 5px">-->
      <!--              领域<br>-->
      <!--              bbb<br>-->
      <!--              bbb<br>-->
      <!--              bbb<br>-->
      <!--            </div>-->
      <!--            <div style="margin-bottom: 10px">-->
      <!--              介绍<br>-->
      <!--              bbb<br>-->
      <!--              bbb<br>-->
      <!--            </div>-->
      <!--            <div>-->
      <!--              <el-button plain>去查看</el-button> &emsp;-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div style="height: 20px"></div>
  </div>
</template>

<script>
import ESApi from "../../api/elastic search";
import AC from '../article/Article.vue'
export default {
  name: "References",
  data(){
    return{
      index:'',
      key:'',
      // reference:['808411C2','051EDB3F'],
      // references:[
      //   {
      //     title:'23',
      //     year:'3234'
      //   },
      //   {
      //     title:'sh',
      //     year: '1111'
      //   }
      // ],
      references:[],
      references_year:[],
      reference:[],
      length:''
    }
  },
  mounted(){
    // this.searchRe();
    this.bianli();
  },
  methods:{
    toOtherPaper(id){
      let router = '/article/'+ id + '/overviews'
      this.$route.params.paper_id = id
      console.log(this.$route.params.paper_id)
      this.$router.push(router)
      this.$router.go(0);
    },
    bianli(){
      this.reference = []
      for(var i = 0; i < this.$store.state.references.length;i++) {
        // console.log(this.$store.state.references[i])
        this.reference.push(this.$store.state.references[i])
      }
      this.references = []
      console.log(this.reference)
      for(var j = 0; j < this.reference.length;j++){
        console.log('1.1')
        console.log(this.reference[j])
        ESApi.getRe(this.reference[j]).then(response =>{
          console.log(response.data.hits.hits[0])
          console.log(response.data.hits.total.value)
          console.log('1.2')
          let article = response.data.hits.hits[0]
          this.references.push(article._source)
          console.log(this.references)
          console.log(this.references.length)
        })
      }
    },
    toAuthor(id){
      this.$router.push({
          path: '/authorPage',
          query: {
            id: id
          }
        }
      )
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
.articleType{
  width: 60px;
  background: #C5E8E5;
  color: #007478;
  border-radius: 2px;
  text-align: center;
}
.grey{
  background: rgba(221,221,221,0.3);
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
