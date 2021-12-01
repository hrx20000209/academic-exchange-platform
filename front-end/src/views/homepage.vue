<template>
    <div>
        <el-container style="display: flex; justify-content: center; flex-direction: column">
            <div>
        <Nav_with_searchBox></Nav_with_searchBox>
            </div>
            <el-main class="MainArea">
                <el-col>
                <el-collapse accordion style="margin-top: 5px">
                    <el-collapse-item class="myCollapse">
                        <template slot="title">
                            <div @click.stop="">
                                <el-col :offset=2 style="margin-bottom: 5px"  @click.stop="">
                                    <el-row style="
                                        letter-spacing: 4px;
                                        font-weight: bold;
                                        background-image:-webkit-linear-gradient(#0b4B8B,#F2EDE6);
                                        -webkit-background-clip:text;
                                        -webkit-text-fill-color:transparent;
                                        font-size: 15px;
                                        font-family: siyuan;
                                    ">
                                        在这里检索您想要的文献：
                                    </el-row>
                                    <el-row>
                                        <el-col :span=5>
                                            <el-input class="input1" v-model="keywords"  placeholder="关键词"></el-input>
                                        </el-col>
                                        <el-col :span=5 style="margin-left: 45px">
                                            <el-input class="input1" v-model="author" placeholder="作者"></el-input>
                                        </el-col>
                                        <el-col :span=5 style="margin-left: 45px">
                                            <el-input class="input1" v-model="book" placeholder="发表处"></el-input>
                                        </el-col>
                                        <el-col :span=2 style="margin-left: 45px;margin-top: 1px">
                                            <el-button class="simpleSearch" icon="el-icon-search"></el-button>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </div>
                        </template>
                    </el-collapse-item>
                    <el-row style="margin-top: -20px">
                        <div class="sky">
                            <el-col :span=9 :offset=2 style="margin-top: 70px">
                                <div class="introduction">
                                    <div class="intro_text">
                                        学术星球——一款好用的学术文献检索与交流网站
                                    </div>
                                    <div class="intro_text">
                                        您可以在这里检索您需要的文献，和与您有相同研究方向的同行交流
                                    </div>
                                </div>
                            </el-col>
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
                                              <el-avatar style="margin-left: 10px;margin-top: 10px; background-color: #81DAF5">
                                                {{item.pic}}
                                              </el-avatar>
                                              <div style="text-align: center; margin-top: 5px; margin-bottom: 5px; color: #A4A4A4">
                                                {{item.name}}
                                              </div>
                                            </div>
                                        </div>
                                        <div style="width: 420px; display: flex; flex-direction: column;">
                                            <div class="titleFont">最热文章</div>
                                            <div v-for="(item, index) in this.engine_popular" :key="index"
                                                 style="display: flex; justify-content: space-between; margin-bottom: 10px; padding: 10px;box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                              <div style="width: 350px; display: flex; ">
                                                <div style="
                                                width: 20px;
                                                display: flex;
                                                justify-content: center;margin-right: 10px">
                                                  <div style="font-size: 10px;border-radius: 10px;margin-top: 5px;width:20px;height: 20px;color: #FFF; background-color: #81BEF7;text-align: center">{{index+1}}</div>
                                                </div>
                                                <div style="width: 300px">
                                                  <el-link :underline="false">
                                                    {{item['title']}}
                                                  </el-link>
                                                </div>
                                              </div>
                                              <div style="display: flex; flex-direction: column; justify-content: center">
                                                <div style="font-size: 10px; color: white; background-color: #01DFD7;margin-left: 10px;width: 60px;text-align: center; border-radius: 5px">
                                                  {{item['cites']}}次
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                        <div style="width: 420px; display: flex; flex-direction: column;">
                                            <div class="titleFont">最新文章</div>
                                            <div v-for="(item, index) in this.engine_latest" :key="index"
                                                 style="display: flex; justify-content: space-between; margin-bottom: 10px; padding: 10px;box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                              <div style="width: 350px; display: flex; ">
                                                <div style="
                                                width: 20px;
                                                display: flex;
                                                justify-content: center;margin-right: 10px">
                                                  <div style="font-size: 10px;border-radius: 10px;margin-top: 5px;width:20px;height: 20px;color: #FFF; background-color: #81BEF7;text-align: center">{{index+1}}</div>
                                                </div>
                                                <div style="width: 300px">
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
                </el-collapse>
                </el-col>
            </el-main>
        </el-container>
        <!--<el-button @click="t">test</el-button>-->
    </div>
</template>

<script>
    import Vue from "vue";
    import VueScrollTo from "vue-scrollto";
    import ESApi from '../api/elastic search'
    import Nav_with_searchBox from "../components/nav_with_searchBox";

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
    };

    export default {
        name: "homepage",
        components: {Nav_with_searchBox},
        data(){
            return {
                active: 0,
                keywords: '',
                author: '',
                book: '',
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
        },
        destroyed(){
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods:{
            changeTitle(index) {
                this.active = index;
                this.setUnderLine();
            },
            // 设置下划线
            setUnderLine() {
                // 屏幕宽
                let width = document.documentElement.clientWidth;
                // let width = 600
                // 每个菜单所占宽度 = 屏宽 / 菜单个数
                let slidingWidth = (width / this.navList.length).toFixed(2);
                // this.navSlidingWidth = slidingWidth
                // 半个菜单宽度 （为了将下划线与菜单对齐）
                let halfSlidingWidth = (slidingWidth / 2).toFixed(2);
                // 水平位移目的坐标 = 半个菜单宽度 + (菜单宽 x 当前所在的index)
                if(!this.fixed){
                if (this.active === 0)
                    this.translateX = Number(halfSlidingWidth) + Number(slidingWidth * this.active)-20;
                else if (this.active === 1)
                    this.translateX = Number(halfSlidingWidth) + Number(slidingWidth * this.active)-60;
                else if (this.active === 2)
                    this.translateX = Number(halfSlidingWidth) + Number(slidingWidth * this.active)-80;
                else if (this.active === 3)
                    this.translateX = Number(halfSlidingWidth) + Number(slidingWidth * this.active)-90;
                } else {
                if (this.active === 0)
                    this.translateX = Number(halfSlidingWidth) + Number(slidingWidth * this.active)-5;
                else if (this.active === 1)
                    this.translateX = Number(halfSlidingWidth) + Number(slidingWidth * this.active)-20;
                else if (this.active === 2)
                    this.translateX = Number(halfSlidingWidth) + Number(slidingWidth * this.active)-15;
                else if (this.active === 3)
                    this.translateX = Number(halfSlidingWidth) + Number(slidingWidth * this.active)-2;
                }
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
                      //console.log(item)
                      let temp = {}
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
                      temp['pic'] = that.getPic(item.name, item.id)
                      that.authors.push(temp)
                    }
                  }
                )
            },
            getPic(name, id) {
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
            fixedActiveBtn() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                let offsetTop = 700
                scrollTop >=offsetTop ? this.fixed = true : this.fixed = false

                if(this.beforeFixed !== this.fixed) {
                    this.setUnderLine()
                    this.beforeFixed = this.fixed
                }
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
.myCollapse /deep/ .el-collapse-item__header {
    background-color: #F2F2F2;
    width: 103%;
    margin-top: -25px;
    margin-left: -20px;
    height: 130px;
}
.myCollapse /deep/ .el-collapse-item__content{
    background-color: #F2F2F2;
    min-height: 600px;
    margin-left: -20px;
    width: 103%;
    z-index: 999;
}
/deep/ .el-collapse-item__wrap{
    z-index: 999;
    margin-left: -20px;
    width: 103%;
}
.input1 /deep/ .el-input__inner{
    height: 32px;
    width: 200px;
    border: 1px solid #b9b9b9;
    border-radius: 0;
}
.simpleSearch {
    color: #fff;
    height: 32px;
    width: 35px;
    max-height: 32px;
    max-width: 35px;
    border-radius: 0;
    background-color: #007398;
    padding-left: 9px;
    padding-top: 10px;
}
.simpleSearch:hover {
    color: #fff;
    background-color:#ff751a;
}
.sky {
    background-image: url(https://sdfestaticassets-us-east-1.sciencedirectassets.com/prod/fd5e957d4806b73bf1da2932ca5aace362f078e6/images/climate-banner.jpg);
    height: 380px;
    width: 103%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 55%;
    margin-left: -20px;
    margin-top: 20px;
    z-index: 0;
}
.introduction {
    min-width: 90px;
    min-height: 230px;
    background-color: rgba(0,0,0,.7);
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
.nav {
    width: 100%;
    z-index: 999;
    background: #fff;
    margin-top: 20px;
    margin-left: -43px;
}
.nav_fixed {
    width: 100%;
    z-index: 999;
    background: #fff;
    margin-left: -43px;
    position: fixed;
    top: -20px;
    left: 0;
}
.nav .nav-list {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
}
.nav .nav-list /deep/ div {
    font-size: 17px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: #666;
    line-height: 16px;
    cursor: pointer;
    text-align: center;
}
.nav-line {
    margin: 0 auto;
}
.nav-line /deep/ div {
    width: 90px;
    height: 4px;
    background-color: #4158D0;
    border-radius: 2px;
    transition-duration: 0.3s;
    position: relative;
    top: -7px;
}
/* 新增激活状态样式 */
.nav .nav-list .nav-list--active {
    font-family: PingFangSC-Semibold, PingFang SC, sans-serif;
    font-weight: bold;
    color: #333333;
    transition: all 0.3s;
}
.science {
    text-align: center;
    width: 120px;
    font-size: 26px;
    color: #2e5cb8;
    border-bottom: 2px solid transparent;
    margin-left: -25px;
}
.science:hover {
    text-align: center;
    width: 120px;
    color: #ff751a;
    cursor: pointer;
    text-decoration: none;
    border-bottom: 2px solid;
}
.social {
    text-align: center;
    width: 100px;
    font-size: 26px;
    color: #2e5cb8;
    border-bottom: 2px solid transparent;
    margin-left: -15px;
}
.social:hover {
    text-align: center;
    width: 100px;
    color: #ff751a;
    cursor: pointer;
    text-decoration: none;
    border-bottom: 2px solid;
}
.engine {
    text-align: center;
    width: 60px;
    font-size: 26px;
    margin-top: 30px;
    color: #2e5cb8;
    border-bottom: 2px solid transparent;
}
.engine:hover {
    text-align: center;
    width: 60px;
    color: #ff751a;
    cursor: pointer;
    text-decoration: none;
    border-bottom: 2px solid;
}
.maths {
    text-align: center;
    width: 60px;
    font-size: 26px;
    color: #2e5cb8;
    border-bottom: 2px solid transparent;
}
.maths:hover {
    text-align: center;
    width: 60px;
    color: #ff751a;
    cursor: pointer;
    text-decoration: none;
    border-bottom: 2px solid;
}
.titleFont{
    background-image:-webkit-linear-gradient(#2E9AFE,#01DFA5);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    margin-bottom: 10px;
    text-align: left
}
</style>
