<template>
  <div class="grey">
    <div style="height: 20px"></div>
    <div style="overflow: hidden">
      <div style="float:left;" class="bigFrame">
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
              <div style="margin-bottom: 10px;font-size: 18px">
                {{item.title}}
              </div>
              <div style="margin-bottom: 10px;font-size: 15px;color:darkgrey;">
                <a class="articleType" style="color:black;">Article</a>
                {{item.year}}
              </div>
              <div style="margin-bottom: 10px;font-size: 16.5px;overflow: hidden">
                <div class="author" v-for="(item2) in references[index].authors" :key="item2">{{item2.name}}</div>
              </div>
              <div style="color: darkgray;font-size: 15px;margin-bottom: 10px">{{item.n_citation}} Citations</div>
              <div style="height: 30px">
                <div style="float: left">
                  <el-button plain v-if="item.url === undefined" disabled>访问全文</el-button>
                  <el-button plain v-else>访问全文</el-button>
                </div>
                <div style="float: right;margin-top: 12px;text-align: right">
                  Recommend&emsp;&emsp;
                  Follow&emsp;&emsp;
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
import ESRe from '../../api/es re'
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
    bianli(){
      for(var i = 0; i < this.$store.state.references.length;i++) {
        // console.log(this.$store.state.references[i])
        this.reference.push(this.$store.state.references[i])
      }
      console.log(this.reference)
      for(var j = 0; j < this.reference.length;j++){
        console.log('1.1')
        console.log(this.reference[j])
        ESRe.getRe(this.reference[j]).then(response =>{
          console.log(response.data.hits.hits[0])
          console.log(response.data.hits.total.value)
          console.log('1.2')
          let article = response.data.hits.hits[0]
          this.references.push(article._source)
          console.log(this.references)
          console.log(this.references.length)
          // for(var k = 0; k < response.data.hits.total.value;k++){
          //   console.log('1.3')
          //   console.log(response.data.hits.hits[k])
          //   if(response.data.hits.hits[k]._source.id.trim() === (this.reference[j]+'').trim()){
          //     console.log('1.4')
          //     this.length = response.data.hits.total.value
          //     console.log('asadqw')
          //     console.log(this.length)
          //     let article = response.data.hits.hits[0]
          //     console.log(article)
          //     console.log(article._source.title)
          //     this.references_title.push(article._source.title)
          //     console.log(this.references_title[j])
          //     // this.ryear = article._source.year
          //   }
          // }

        })
      }
    },
    // searchRe() {
    //   console.log('111')
    //   ESApi.getMsg('808411C2').then(response =>{
    //     console.log(response.data)
    //     this.length = response.data.hits.total.value
    //     console.log(this.length)
    //     for(var i = 0; i < this.length; i++){
    //       let article = response.data.hits.hits[i]
    //       for(var j = 0; j < article._source.reference.length; j++){
    //         this.reference[j] = article._source.reference[j]
    //         console.log(this.reference[j])
    //       }
    //     }
    //   })
    // },
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
.articleType{
  width: 60px;
  background: lightblue;
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
