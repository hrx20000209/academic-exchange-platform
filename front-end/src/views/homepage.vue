<template>
    <div>
        <div style="display: flex; justify-content: center; flex-direction: column; ">
            <div class="MainArea">
                <div style="margin-top: -20px">
                <div>
                    <div style="margin-top: -20px">
                        <div class="sky">
                            <div>
                              <Nav_with_searchBox_transparent></Nav_with_searchBox_transparent>
                            </div>
                            <div class="myStart">
                                <el-row style="margin-left: 50px;margin-top: 50px">

                                  <el-row style="
                                      letter-spacing: 4px;
                                      font-weight: bold;
                                      color: #585858;
                                      font-size: 40px;
                                      margin-top: 45px;
                                      margin-bottom: 20px;
                                      font-family: siyuan;">
                                      专业的学术成果分享平台
                                  </el-row>
                                  <div style="color: #848484; letter-spacing: 4px; font-size: 17px; margin-bottom: 23px; margin-left: 2px">
                                    论文搜索 · 学术讨论
                                  </div>
                                  <div>
                                     <div class="search-box">
                                       <div style="width: 650px">
                                        <!--<input type="text" class="search-left" placeholder="请输入要搜索的内容"><input type="button" class="search-right" value="搜 索" icon="el-icon-search">-->
                                         <el-input placeholder="搜索你想了解的论文" v-model="keywords" class="SearchInput">
                                           <el-button slot="append" class="searchButton">搜索</el-button>
                                         </el-input>
                                       </div>
                                     </div>
                                  </div>
                                </el-row>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; flex-direction: column">
                            <div style="display: flex; justify-content: center">
                              <div class="welcome">
                                浏览最新，最热的文章和最受欢迎的作者
                              </div>
                            </div>
                            <div style="display: flex; justify-content: center">
                              <div style="display:flex; justify-content:center;background-color: #FFF; width: 1000px; margin-top: 20px;">
                                <div style="background-color: #FFF; width: 900px; margin-top: 15px">
                                <el-tabs v-model="activeName" @tab-click="handleClick">
                                  <el-tab-pane label="最热文章" name="first">
                                    <div style="margin-left: -20px; margin-top:15px; display:flex; flex-direction:column;  align-items: center ">
                                      <div v-for="(item, index) in this.engine_popular" :key="index"
                                         style="width:850px;display: flex; margin-left: 20px;margin-bottom: 25px; padding: 10px;box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                      <div style="
                                        width: 20px;
                                        display: flex;
                                        justify-content: center;margin-right: 10px">
                                          <div class="normal_index" :class="(index=== 0 || index===1 || index===2) ? ('index_'+index):''">{{index+1}}</div>
                                      </div>
                                      <div style="flex-direction: column; width:800px">
                                        <div style="width: 800px; display: flex; justify-content: space-between">
                                          <div style="width: 700px">
                                            <el-link style="font-family: Georgia; font-size: 16px" :underline="false">
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
                                  </el-tab-pane>
                                  <el-tab-pane label="最新文章" name="second">
                                    <div style="margin-left: -10px; margin-top:15px; display:flex; flex-direction:column;  align-items: center ">
                                      <div v-for="(item, index) in this.engine_latest" :key="index"
                                         style="display: flex; justify-content: space-between; margin-bottom: 25px; padding: 10px;box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                      <div style="width:780px; display: flex; ">
                                        <div style="
                                        width: 20px;
                                        display: flex;
                                        justify-content: center;margin-right: 10px">
                                          <div class="normal_index" :class="(index=== 0 || index===1 || index===2) ? ('index_'+index):''">{{index+1}}</div>
                                        </div>
                                        <div style="width: 700px">
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
                                  </el-tab-pane>
                                  <el-tab-pane label="最受欢迎作者" name="third">
                                    <div style="margin-top: 15px">
                                      <div style="margin-bottom:10px;display: flex; justify-content: space-around" v-for="(row, index0) in this.authors" :key="index0">
                                      <el-tooltip v-for="(item, index) in row" :key="index"
                                         style="
                                         margin-bottom: 20px;
                                         width: 150px;
                                         box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                        <div slot="content">姓名：{{item.name}}<br/>被引次数：{{item.cites}}</div>
                                        <div style="display: flex; flex-direction: column; align-items: center" @click="jump2authors(item.id)">
                                          <el-avatar :src="pic[index0*rowPic+index]" style="margin-left: 10px;margin-top: 10px; background-color: #81DAF5"/>
                                          <div style="text-align: center; margin-top: 5px; margin-bottom: 5px; color: #A4A4A4">
                                            {{shortName(item.name)}}
                                          </div>
                                        </div>
                                    </el-tooltip>
                                    </div>
                                    </div>
                                  </el-tab-pane>
                                </el-tabs>
                                </div>
                                    <!--<div style="margin-top: 30px; display: flex;justify-content: space-around">
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
                                    </div>-->
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!--<el-button @click="test">test</el-button>-->
        <!--<el-image :src="pic[0]"></el-image>-->
    </div>
</template>

<script>
  import ESApi from '../api/elastic search'
  import Nav_with_searchBox_transparent from "../components/nav_with_searchBox_transparent";
  import Api from '../api/mysql'

    export default {
        name: "homepage",
        components: {Nav_with_searchBox_transparent},
        data(){
            return {
                activeName: 'first',
                pic:[],
                rowPic: 5,
                maxCites:0,
                maxLen:100,
                maxNameLen:10,
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
            handleClick(tab, event) {
              console.log(tab, event);
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
                    let row = []
                    let j = 0
                    let papers = res.data.hits.hits
                    for (let i=0; i<papers.length; i++) {
                      let item = papers[i]._source
                      //console.log(item)
                      let temp = {}
                      temp['name'] = item.name
                      temp['cites'] = item.n_citation
                      temp['id'] = item.id
                      temp['pic'] = that.getName(item.name, item.id)

                      Api.getRealPic(item.id).then(
                      res => {
                        const imgUrl='data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                        this.pic.push(imgUrl)
                      }
                    )
                      row.push(temp)
                      j++
                      if (j === this.rowPic){
                        that.authors.push(row)
                        row = []
                        j = 0
                      }
                      //that.authors.push(temp)
                    }
                    console.log('authorlist', this.authors)

                  }
                )
            },
            shortName(name) {
              let res
              if (name.length>this.maxNameLen)
                res = name.slice(0, this.maxNameLen) + '...'
              else
                res = name
              return res
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
        }
    }
</script>

<style scoped>
.MainArea{
    background-color: #f2f4f7;
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
    background-image: url(../assets/background.png);
    height: 600px;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    // margin-left: -24px;
    margin-top: 20px;
    z-index: 0;
}
.introduction {
    min-width: 90px;
    min-height: 230px;
    background-color: rgba(0,0,0,.7);
}
.search-box{
     width: auto;
 }
.SearchInput /deep/ .el-input__inner {
  border-right: none;
  height: 45px;
}
.el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
  border-radius: 0 4px 4px 0px;
  color: white;
  width: 80px;
  padding: 0 25px 0 20px;
  font-size: 17px;
  letter-spacing:5px;
  background-color:royalblue;
  height: 45px;
  border-left: none;

}

.welcome {
    font-size: 26px;
    color:#505050;
    margin-top: 30px;
    margin-bottom: 10px;
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

.el-scrollbar__wrap { overflow-x: hidden; }
</style>
