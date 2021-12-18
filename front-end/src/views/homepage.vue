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
                                      margin-top: 60px;
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
                                           <el-button @click="SearchInfo" slot="append" class="searchButton">搜索</el-button>
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
                            <div style="display: flex; justify-content: space-around">
                              <div style="margin-right: -40px;;display: flex; justify-content: center">
                                <div style="display:flex; justify-content:center;background-color: #FFF; width: 750px; margin-top: 20px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25)">
                                <div style="background-color: #FFF; width: 700px; margin-top: 15px">
                                <el-tabs v-model="activeName" @tab-click="handleClick">
                                  <el-tab-pane label="最热文章" name="first">
                                    <div style="margin-left: -20px; margin-top:15px; display:flex; flex-direction:column;  align-items: center ">
                                      <div v-for="(item, index) in this.engine_popular" :key="index"
                                         style="display: flex; margin-left: 20px;margin-bottom: 25px; padding: 10px;box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                      <div style="
                                        width: 20px;
                                        display: flex;
                                        justify-content: center;margin-right: 10px">
                                          <div class="normal_index" :class="(index=== 0 || index===1 || index===2) ? ('index_'+index):''">{{index+1}}</div>
                                      </div>
                                      <div style="flex-direction: column; width:620px">
                                        <div style="display: flex; justify-content: space-between">
                                          <div>
                                            <el-link @click="toOtherPaper(item['id'])" style="font-family: Georgia; font-size: 16px" :underline="false">
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
                                          <el-progress color="rgb(24 174 187)" :show-text="false" :percentage="getPercentage(item['cites'], maxCites)"></el-progress>
                                        </div>
                                      </div>
                                    </div>
                                    </div>
                                  </el-tab-pane>
                                  <el-tab-pane label="最新文章" name="second">
                                    <div style="margin-left: -10px; margin-top:15px; display:flex; flex-direction:column;  align-items: center ">
                                      <div v-for="(item, index) in this.engine_latest" :key="index"
                                         style="display: flex; justify-content: space-between; margin-bottom: 25px; padding: 10px;box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                      <div style="width:580px; display: flex; ">
                                        <div style="
                                        width: 20px;
                                        display: flex;
                                        justify-content: center;margin-right: 10px">
                                          <div class="normal_index" :class="(index=== 0 || index===1 || index===2) ? ('index_'+index):''">{{index+1}}</div>
                                        </div>
                                        <div style="width: 500px">
                                          <el-link @click="toOtherPaper(item['id'])" :underline="false">
                                            {{item['title']}}
                                          </el-link>
                                        </div>
                                      </div>
                                      <div style="display: flex; flex-direction: column; justify-content: center">
                                        <div style="font-size: 10px; color: white; background-color: #BDBDBD;margin-left: 10px;width: 60px;text-align: center; border-radius: 5px">
                                          {{item['year']}}年
                                        </div>
                                      </div>
                                    </div>
                                    </div>
                                  </el-tab-pane>
                                  <!--<el-tab-pane label="最受欢迎作者" name="third">
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
                                  </el-tab-pane>-->
                                  <el-tab-pane label="最强机构" name="fourth">
                                    <div style="display: flex; justify-content: center; height: 650px">
                                      <div style="margin-top: -50px;width: 700px; height: 600px" id="chart"></div>
                                    </div>
                                  </el-tab-pane>
                                </el-tabs>
                                <div v-if="activeName === 'fourth'" style="background-color: #f2f4f7; margin-left: -100px;width: 850px; height: 350px"></div>
                                </div>
                            </div>
                              </div>
                              <div style="margin-top: 20px;display: flex;height: 1050px;background-color: #FFF;align-items: center;width: 270px;flex-direction: column; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2)">
                                <div style="border-radius: 20px;height: 35px;width: 150px;box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);display: flex;margin-top: 25px;margin-bottom: 10px;justify-content: center;align-items: center">
                                  <div>
                                    最受欢迎作者
                                  </div>
                                </div>
                                <div v-for="(item, index) in this.authors" :key="index"
                                 style="display: flex;margin-left: -5px;;margin-bottom: 5px; padding: 10px">
                                  <div style="
                                    width: 20px;
                                    display: flex;
                                    justify-content: center;margin-right: 10px">
                                      <div class="normal_index" :class="(index=== 0 || index===1 || index===2) ? ('index_'+index):''">{{index+1}}</div>
                                  </div>
                                  <div style="flex-direction: column; width:190px">
                                    <div style="display: flex; justify-content: space-between">
                                      <div>
                                        <el-link @click="jump2authors(item['id'])" style="font-family: Georgia; font-size: 16px" :underline="false">
                                          {{shortName(item['name'])}}
                                        </el-link>
                                      </div>
                                      <div style="display: flex; justify-content: end">
                                      <div style="font-size: 10px">
                                        <a style="font-family: Gabriola; font-size: 20px; color:rgb(65, 105, 225)">{{item['cites']}}</a> 次引用
                                      </div>
                                    </div>
                                    </div>
                                    <div style="display: flex; flex-direction: column; justify-content: center">
                                      <el-progress :color="'rgb(24 174 187)'" :show-text="false" :percentage="getPercentage(item['cites'], maxAuthorCites)"></el-progress>
                                    </div>
                                  </div>
                                </div>
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
  const echarts = require('echarts/lib/echarts')
  import 'echarts-gl'

    export default {
        name: "homepage",
        components: {Nav_with_searchBox_transparent},
        data(){
            return {
                searchInput:'',
                activeName: 'first',
                Indata:[],
                pic:[],
                rowPic: 5,
                maxCites:0,
                maxAuthorCites:0,
                maxLen:70,
                maxNameLen:10,
                active:0,
                keywords: '',
                author: '',
                book: '',
                Iname: [],
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
            this.load3D()
            // this.testImage('1')
        },
        destroyed(){
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods:{
            handleClick(tab, event) {
              console.log(this.activeName);
            },
            load3D(){
              const that = this
              ESApi.getPopularInstitution().then(
                res => {
                  const Idata = res.data.hits.hits
                  this.getIname(Idata)
                  for (let i=0; i < Idata.length; i++) {
                    const Ins = Idata[i]._source.year_pubs
                    for (let y=0; y<Ins.length; y++){
                      let temp = []
                      let dic = {}
                      temp.push(Ins[y].year)
                      temp.push(Idata[i]._source.name)
                      temp.push(Ins[y].cnt)
                      dic['value'] = temp
                      dic['id'] = Idata[i]._source.id
                      this.Indata.push(dic)
                    }
                  }
                  this.build3D(that)
                }
              )
            },
            toOtherPaper(id){
              let router = '/article/' + id + '/overviews'
              this.$router.push(router)
            },
            getIname(data){
              for (let i=0; i<data.length; i++){
                this.Iname.push(data[i]._source.name)
              }
            },
            build3D(that){
              let pie = echarts.init(document.getElementById('chart'))
              let option = {
                  tooltip: {},
                  visualMap: {
                    max: 250,
                    inRange: {
                      color: [
                        '#313695',
                        '#4575b4',
                        '#74add1',
                        '#abd9e9',
                        '#e0f3f8',
                        '#ffffbf',
                        '#fee090',
                        '#fdae61',
                        '#f46d43',
                        '#d73027',
                        '#a50026'
                      ]
                    }
                  },
                  xAxis3D: {
                    type: 'category',

                  },
                  yAxis3D: {
                    type: 'category',
                    data: this.name
                  },
                  zAxis3D: {
                    type: 'value'
                  },
                  grid3D: {
                    boxWidth: 200,
                    boxDepth: 80,
                    viewControl:{
                      "distance": 250,
                      // "alpha": 3.069606211544383,
                      // "beta": 45.74964692390633,
                    },
                    light: {
                      main: {
                        intensity: 1.2
                      },
                      ambient: {
                        intensity: 0.3
                      }
                    }
                  },
                  series: [
                    {
                      name:'Institution',
                      type: 'bar3D',
                      data: this.Indata,/*.map(function (item) {
                        return {
                          value: [item[1], item[0], item[2]]
                        };
                      }),*/
                      shading: 'color',
                      label: {
                        show: false,
                        fontSize: 16,
                        borderWidth: 1
                      },
                      itemStyle: {
                        opacity: 0.8
                      },
                      emphasis: {
                        label: {
                          fontSize: 20,
                          color: '#900'
                        },
                        itemStyle: {
                          color: '#900'
                        }
                      }
                    }
                  ]
                };
                pie.setOption(option)
                pie.on('click', function(params) {
                  console.log(params.data.id)
                  that.jump2Institution(params.data.id)
                })
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
            SearchInfo(){
              this.$store.state.searchInput = this.keywords
              console.log('search info:', this.keywords)
              this.$router.push('/search')
            },
            getPercentage(nub, max){
              return  Math.floor(nub/max * 10000) / 100
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
                    // let j = 0
                    let papers = res.data.hits.hits
                    for (let i=0; i<papers.length; i++) {
                      let item = papers[i]._source
                      if (i === 0)
                        this.maxAuthorCites = item.n_citation
                      //console.log(item)
                      let temp = {}
                      temp['name'] = item.name
                      temp['cites'] = item.n_citation
                      temp['id'] = item.id
                      temp['pic'] = that.getName(item.name, item.id)

                      /*Api.getRealPic(item.id).then(
                      res => {
                        const imgUrl='data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                        this.pic.push(imgUrl)
                      }
                    )*/
                      //row.push(temp)
                      that.authors.push(temp)
                      //j++
                      /*if (j === this.rowPic){
                        that.authors.push(row)
                        row = []
                        j = 0
                      }*/
                      //that.authors.push(temp)
                    }
                    console.log('authorlist', this.authors)

                  }
                )
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
            jump2Institution(id){
              console.log('author id is', id)
              this.$router.push({
                path: '/Institution',
                query: {
                  id: id
                }
              })
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
        }
    }
</script>

<style scoped>
.MainArea{
    background-color: #f2f4f7;
    width: 100%;
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
    background-image: url(../assets/background2.png);
    height: 100vh;
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
  background-color:#565656;
  height: 45px;
  border-left: none;

}

.welcome {
    font-size: 26px;
    color:#505050;
    margin-top: 30px;
    margin-bottom: 10px;
}

.normal_index {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  border-radius: 10px;
  margin-top: 5px;
  width:20px;
  height: 20px;
  color: #FFF;
  background-color: #D8D8D8;
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
/deep/ .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: rgb(153 153 153);
    position: relative;
}
/deep/ .el-tabs__item:hover {
    color: rgb(38 38 38);
    cursor: pointer;
}
/deep/ .el-tabs__item.is-active {
    color: rgb(38 38 38);
}
/deep/ .el-tabs__active-bar {
  background-color: black;
}
.el-scrollbar__wrap { overflow-x: hidden; }
</style>
