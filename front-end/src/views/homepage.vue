<template>
    <div>
        <el-container style="display: flex; justify-content: center; flex-direction: column">
            <el-main class="MainArea">
                <el-col style="margin-top: -20px">
                <div>
                    <el-row style="margin-top: -20px">
                        <div class="sky">
                            <div>
                              <Nav_with_searchBox_transparent></Nav_with_searchBox_transparent>
                            </div>
                            <div class="myStart">
                                <!--<template slot="title">-->
                                    <!--<div @click.stop="">-->
                                <el-row style="margin-left: 50px;margin-top: 50px">
                                  <el-row style="
                                      letter-spacing: 4px;
                                      font-weight: bold;
                                      background-image:-webkit-linear-gradient(#FFF,#00ffff);
                                      -webkit-background-clip:text;
                                      -webkit-text-fill-color:transparent;
                                      font-size: 20px;
                                      margin-top: 45px;
                                      margin-bottom: 20px;
                                      font-family: siyuan;
                                      margin-left: 450px;
                                  ">
                                      检索您想要的文献：
                                  </el-row>
                                  <div>
                                     <div class="search-box">

                                       <div style="display: flex; width: 700px">
                                        <!--<input type="text" class="search-left" placeholder="请输入要搜索的内容"><input type="button" class="search-right" value="搜 索" icon="el-icon-search">-->
                                         <el-input placeholder="请输入内容" v-model="keywords" class="SearchInput"></el-input>
                                         <el-button icon="el-icon-search" class="searchIcon"></el-button>
                                       </div>

                                     </div>
                                  </div>
                                </el-row>
                                    <!--</div>-->
                                <!--</template>-->
                            </div>
                        </div>
                    </el-row>
                    <el-row>
                        <el-col :offset=0 :span=24 style="margin-left: 0px">
                            <el-row class="welcome">
                                浏览最新，最热的文章和最受欢迎的作者
                            </el-row>
                            <el-row>
                                    <div style="margin-top: 30px; display: flex;justify-content: space-around">
                                        <div style="width: 150px; display: flex; flex-direction: column">
                                            <div class="titleFont">最受欢迎作者</div>
                                            <div v-for="(item, index) in this.authors" :key="index"
                                                 @click="jump2authors(item.id)"
                                                 style="
                                                 display: flex;
                                                 margin-bottom: 20px;
                                                 align-items: center;
                                                 flex-direction: column;
                                                 cursor:pointer;
                                                 box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                              <el-avatar v-if="true" :src="pic[index]" style="margin-left: 10px;margin-top: 10px; background-color: #81DAF5"/>
                                              <el-avatar v-if="false" style="margin-left: 10px;margin-top: 10px; background-color: #81DAF5">
                                                {{item.pic}}
                                              </el-avatar>
                                              <div style="text-align: center; margin-top: 5px; margin-bottom: 5px; color: #A4A4A4">
                                                {{item.name}}
                                              </div>
                                            </div>
                                        </div>
                                        <div style="width: 350px; display: flex; flex-direction: column;">
                                            <div class="titleFont">最热文章</div>
                                            <div v-for="(item, index) in this.engine_popular" :key="index"
                                                 style="display: flex; margin-bottom: 10px; padding: 10px;box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                              <div style="
                                                width: 20px;
                                                display: flex;
                                                justify-content: center;margin-right: 10px">
                                                  <div class="normal_index" :class="(index=== 0 || index===1 || index===2) ? ('index_'+index):''">{{index+1}}</div>
                                              </div>
                                              <div style="flex-direction: column; width:300px">
                                                <div style="width: 300px; display: flex; justify-content: space-between">
                                                  <div style="width: 200px">
                                                    <el-link :underline="false">
                                                      {{item['title']}}
                                                    </el-link>
                                                  </div>
                                                  <div style="display: flex; justify-content: end">
                                                  <div style="font-size: 10px">
                                                    <a style="font-family: Gabriola; font-size: 20px; color:rgb(65, 105, 225)">{{item['cites']}}</a> 次引用
                                                  </div>
                                                </div>
                                                </div>
                                                <div style="display: flex; flex-direction: column; justify-content: center">
                                                  <el-progress :show-text="false" :percentage="getPercentage(item['cites'])"></el-progress>
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                        <div style="width: 350px; display: flex; flex-direction: column;">
                                            <div class="titleFont">最新文章</div>
                                            <div v-for="(item, index) in this.engine_latest" :key="index"
                                                 style="display: flex; justify-content: space-between; margin-bottom: 10px; padding: 10px;box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                              <div style="width:300px; display: flex; ">
                                                <div style="
                                                width: 20px;
                                                display: flex;
                                                justify-content: center;margin-right: 10px">
                                                  <div class="normal_index" :class="(index=== 0 || index===1 || index===2) ? ('index_'+index):''">{{index+1}}</div>
                                                </div>
                                                <div style="width: 200px">
                                                  <el-link :underline="false">
                                                    {{item['title']}}
                                                  </el-link>
                                                </div>
                                              </div>
                                              <div style="display: flex; flex-direction: column; justify-content: center">
                                                <div style="font-size: 10px; color: white; background-color: #01DFD7;margin-left: 10px;width: 60px;text-align: center; border-radius: 5px">
                                                  {{item['year']}}年
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                </el-col>
            </el-main>
        </el-container>
        <!--<el-button @click="test">test</el-button>-->
        <!--<el-image :src="pic[0]"></el-image>-->
    </div>
</template>

<script>
  import Vue from "vue";
  import VueScrollTo from "vue-scrollto";
  import ESApi from '../api/elastic search'
  import Nav_with_searchBox_transparent from "../components/nav_with_searchBox_transparent";
  import Api from '../api/mysql'

  Vue.use(VueScrollTo, options);


    let options = {
      container: "body", //滚动的容器
      duration: 500, //滚动时间
      easing: "ease", //缓动类型
      offset: 0, //滚动时应应用的偏移量。此选项接受回调函数
      force: true, //是否应执行滚动
      cancelable: true,
      onStart: false,
      onDone: false,
      onCancel: false,
      x: false,
      y: true
    }

    export default {
        name: "homepage",
        components: {Nav_with_searchBox_transparent},
        data(){
            return {
                pic:[],
                maxCites:0,
                maxLen:20,
                active:0,
                keywords: '',
                author: '',
                book: '',
                // imgUrl:'',
                fixed: false,
                beforeFixed:false,
                translateX: 0,
                navSlidingWidth:0,
                engine_latest:[],
                engine_popular:[],
                authors:[],
            }
        },
        mounted() {
            this.t()
            // this.testImage('1')
        },
        destroyed(){
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods:{
            format(cites){

                return cites + '次引用'

            },
            test(){
              Api.getUsrId('05B090CE').then(
                res => {
                  // this.imgUrl='data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                  // console.log('imgurl is is',this.imgUrl)
                  console.log('usr id is', res)
                }
              )
            },
            getPercentage(nub){
              return  Math.floor(nub/this.maxCites * 10000) / 100
            },
            jump2engine() {
                console.log('ok')
            },
            t(){
                let that = this
                ESApi.getRecentPaper().then(
                  res =>{
                    // console.log(res.data.hits.hits)
                    let papers = res.data.hits.hits
                    for (let i=0; i<papers.length; i++) {
                      let item = papers[i]._source
                      //console.log(item)
                      let temp = {}
                      if (item.title.length>this.maxLen)
                        temp['title'] = item.title.slice(0, this.maxLen) + '...'
                      else
                        temp['title'] = item.title
                      temp['year'] = item.year
                      temp['id'] = item.id
                      that.engine_latest.push(temp)
                    }
                  }
                )
                ESApi.getPopularPaper().then(
                  res =>{
                    // console.log(res.data.hits.hits)
                    let papers = res.data.hits.hits
                    for (let i=0; i<papers.length; i++) {
                      let item = papers[i]._source
                      if (i === 0)
                        this.maxCites = item.n_citation
                      //console.log(item)
                      let temp = {}
                      if (item.title.length>this.maxLen)
                        temp['title'] = item.title.slice(0, this.maxLen) + '...'
                      else
                        temp['title'] = item.title
                      temp['cites'] = item.n_citation
                      temp['id'] = item.id
                      that.engine_popular.push(temp)
                    }
                  }
                )
                ESApi.getPopularAuthor().then(
                  res =>{
                    // console.log(res.data.hits.hits)
                    let papers = res.data.hits.hits
                    for (let i=0; i<papers.length; i++) {
                      let item = papers[i]._source
                      //console.log(item)
                      let temp = {}
                      temp['name'] = item.name
                      temp['cites'] = item.n_citation
                      temp['id'] = item.id
                      temp['pic'] = that.getName(item.name, item.id)

                      Api.getRealPic('1').then(
                      res => {
                        const imgUrl='data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                        this.pic.push(imgUrl)
                      }
                    )
                      that.authors.push(temp)
                    }
                    console.log('authorlist', this.authors)

                  }
                )
            },
            getpicfrombase64(base) {
              let file = this.base64ImgtoFile(base)
              return window.webkitURL.createObjectURL(file) || window.URL.createObjectURL(file)
            },
            getName(name, id) {
              //TODO: input id output pic or bool

              let lastname = name.split(' ')
              return lastname[lastname.length-1]
            },
            jump2authors(id){
              console.log('author id is', id)
              this.$router.push({
                path: '/authorPage',
                query: {
                  id: id
                }
              })
            },
            blobToBase64(blob) {
              return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                  resolve(e.target.result)
                }
                fileReader.readAsDataURL(blob);
                fileReader.onerror = () => {
                  reject(new Error('文件流异常'))
                }
              })
            },
            base64ImgtoFile (dataurl, filename = 'file') {
                console.log('dataurl is',dataurl)
                const arr = dataurl.split(',')
                const mime = arr[0].match(/:(.*?);/)[1]
                const suffix = mime.split('/')[1]
                const bstr = atob(arr[1])
                let n = bstr.length
                const u8arr = new Uint8Array(n)
                while (n--) {
                  u8arr[n] = bstr.charCodeAt(n)
                }
                return new File([u8arr], `${filename}.${suffix}`, {
                  type: mime
                })
              },
        }
    }
</script>

<style scoped>
.MainArea{
    background-color: #fff;
    width: 100%;
    min-height: 1000px;
}
.myStart {

  height: 130px;
  margin-top: -5px;
}

.input1 /deep/ .el-input__inner{
    height: 32px;
    width: 200px;
    border: 1px solid #b9b9b9;
    border-radius: 0;
}
.sky {
    background-image: url(http://bpic.588ku.com/back_pic/05/48/20/855abafb634406c.jpg);
    height: 450px;
    width: 103%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 60% 100%;
    margin-left: -20px;
    margin-top: 20px;
    z-index: 0;
}
.introduction {
    min-width: 90px;
    min-height: 230px;
    background-color: rgba(0,0,0,.7);
}
.search-box{
     display: flex;
      justify-content: center;
     width: auto;
 }
.SearchInput /deep/ .el-input__inner {
  border-radius: 25px 0px 0px 25px;
  border:royalblue 2px solid;
  border-right: none;
  height: 40px;
}
.searchIcon{
  border-radius: 0px 25px 25px 0px;
  border:royalblue 2px solid;
  height: 40px;
  border-left: none;

}
.search-left{
  box-shadow: rgb(11, 234, 235) -2px 0px 10px;
    text-indent: 20px;
     width:80%;
    height:50px;
    border:#00ffff 1px solid;
    // float:left;
    margin-top:20px;
    border-bottom-left-radius:25px;
    border-top-left-radius:25px;
    outline:none;
    // text-align:20px ;
}
.search-right{
    box-shadow: rgb(11, 234, 235) 5px 0px 5px;
    width:13%;
    height:53px;
    background:#00cfff;
    color: #fff;
    border:none;
    margin-top:20px;
    border-bottom-right-radius:25px;
    border-top-right-radius:25px;
    outline:none;
}

.intro_text {
    color: #fff;
    font-size: 16px;
    line-height: 25px;
    padding: 20px;
}
.welcome {
    font-size: 26px;
    color:#505050;
    margin-top: 30px;
}

.titleFont{
    background-image:-webkit-linear-gradient(#2E9AFE,#01DFA5);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    margin-bottom: 10px;
    text-align: left
}
.normal_index {
  font-size: 10px;
  border-radius: 10px;
  margin-top: 5px;
  width:20px;
  height: 20px;
  color: #FFF;
  background-color: #81BEF7;
  text-align: center
}
.index_0 {
  font-size: 10px;
  border-radius: 10px;
  margin-top: 5px;
  width:20px;
  height: 20px;
  color: #FFF;
  background-image: linear-gradient(to bottom right, #feff0b, #d1bb10);
  text-align: center
}
.index_1 {
  font-size: 10px;
  border-radius: 10px;
  margin-top: 5px;
  width:20px;
  height: 20px;
  color: #FFF;
  background-image: linear-gradient(to bottom right, #e9e9e9, #8f8f8f);
  text-align: center
}
.index_2 {
  font-size: 10px;
  border-radius: 10px;
  margin-top: 5px;
  width:20px;
  height: 20px;
  color: #FFF;
  background-image: linear-gradient(to bottom right, goldenrod, #996633);
  text-align: center
}
</style>
