<template>
    <div>
        <el-container>
            <el-header>
                <my-header></my-header>
            </el-header>
            <el-main class="MainArea">
                <el-col>
                <el-collapse accordion style="margin-top: 15px">
                    <el-collapse-item>
                        <template slot="title">
                            <div @click.stop="">
                                <el-col :offset=2 style="margin-bottom: 5px"  @click.stop="">
                                    <el-row style="
                                        letter-spacing: 4px;
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
                                        Elsevier journals offer the latest peer-reviewed research papers on climate change, biodiversity, renewable energy and other topics addressing our planet’s climate emergency.
Join us in working towards a sustainable future with our editorially independent report on creating a Net Zero future.
                                    </div>
                                </div>
                            </el-col>
                        </div>
                    </el-row>
                    <el-row>
                        <el-col :offset=0 :span=23 style="margin-left: 50px">
                            <el-row class="welcome">
                                探索科学、技术和医学研究的科学指导
                            </el-row>
                            <el-row style="height: 70px">
                                <div id='menu' class='nav' :class="fixed ? 'nav_fixed' :''">
                                    <!-- 标题列表 -->
                                    <div class="nav-list">
                                        <div v-for="(item, index) in navList" :key="item"
                                        @click="changeTitle(index)"
                                         v-scroll-to="'#'+test[index]"
                                        :class="{ 'nav-list--active': index === active}"
                                        >
                                            {{ item }}
                                        </div>
                                    </div>
                                    <!-- 下划线 -->
                                    <div class="nav-line">
                                        <div :style="{transform: 'translateX(' + translateX + 'px) translateX(-50%)',}"></div>
                                    </div>
                                </div>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-row>
                                        <el-col :span=2 style="margin-left: 340px">
                                            <div class="engine" id="engine" @click="jump2engine">工学</div>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top: 30px; min-height: 150px">
                                        <el-col :span=6 style="margin-left: -30px;margin-top: -120px;margin-right: 70px;margin-bottom: -50px">
                                            <mycloud :data="k_engine"></mycloud>
                                        </el-col>
                                        <el-col :span=8 :offset=1>
                                            <div style="margin-bottom: 10px; text-align: left">最热文章</div>
                                            <el-link v-for="(item, index) in this.engine_popular" :key="index"
                                            style="font-size: 12px">
                                                {{item}}
                                            </el-link>
                                        </el-col>
                                        <el-col :span=7 :offset=0>
                                            <div style="margin-bottom: 10px; text-align: left">最新文章</div>
                                            <el-link v-for="(item, index) in this.engine_latest" :key="index"
                                            style="font-size: 12px">
                                                {{item}}
                                            </el-link>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row>
                                        <el-col :span=2 style="margin-left: 340px">
                                            <div class="maths" id="maths" @click="jump2engine">理学</div>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top: 30px; min-height: 150px">
                                        <el-col :span=6 style="margin-left: -30px;margin-top: -120px;margin-right: 70px;margin-bottom: -50px">
                                            <mycloud :data="k_science"></mycloud>
                                        </el-col>
                                        <el-col :span=8 :offset=1>
                                            <div style="margin-bottom: 10px; text-align: left">最热文章</div>
                                            <el-link v-for="(item, index) in this.engine_popular" :key="index"
                                            style="font-size: 12px">
                                                {{item}}
                                            </el-link>
                                        </el-col>
                                        <el-col :span=7 :offset=0>
                                            <div style="margin-bottom: 10px; text-align: left">最新文章</div>
                                            <el-link v-for="(item, index) in this.engine_latest" :key="index"
                                            style="font-size: 12px">
                                                {{item}}
                                            </el-link>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row>
                                        <el-col :span=2 style="margin-left: 360px">
                                            <div class="science" id="science" @click="jump2engine">自然科学</div>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top: 30px; min-height: 150px">
                                        <el-col :span=6 style="margin-left: -30px;margin-top: -120px;margin-right: 70px;margin-bottom: -50px">
                                            <mycloud :data="k_maths"></mycloud>
                                        </el-col>
                                        <el-col :span=8 :offset=1>
                                            <div style="margin-bottom: 10px; text-align: left">最热文章</div>
                                            <el-link v-for="(item, index) in this.engine_popular" :key="index"
                                            style="font-size: 12px">
                                                {{item}}
                                            </el-link>
                                        </el-col>
                                        <el-col :span=7 :offset=0>
                                            <div style="margin-bottom: 10px; text-align: left">最新文章</div>
                                            <el-link v-for="(item, index) in this.engine_latest" :key="index"
                                            style="font-size: 12px">
                                                {{item}}
                                            </el-link>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row>
                                        <el-col :span=2 style="margin-left: 350px">
                                            <div class="social" id="social" @click="jump2engine">社会学</div>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top: 30px; min-height: 150px">
                                        <el-col :span=6 style="margin-left: -30px;margin-top: -120px;margin-right: 70px;margin-bottom: -50px">
                                            <mycloud></mycloud>
                                        </el-col>
                                        <el-col :span=8 :offset=1>
                                            <div style="margin-bottom: 10px; text-align: left">最热文章</div>
                                            <el-link v-for="(item, index) in this.engine_popular" :key="index"
                                            style="font-size: 12px">
                                                {{item}}
                                            </el-link>
                                        </el-col>
                                        <el-col :span=7 :offset=0>
                                            <div style="margin-bottom: 10px; text-align: left">最新文章</div>
                                            <el-link v-for="(item, index) in this.engine_latest" :key="index"
                                            style="font-size: 12px">
                                                {{item}}
                                            </el-link>
                                        </el-col>
                                    </el-row>
                                </el-col>
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
        data(){
            return {
                active: 0,
                keywords: '',
                author: '',
                book: '',
                fixed: false,
                beforeFixed:false,
                navList: ['工学', '理学', '自然科学', '社会学'],
                test: ['engine', 'maths', 'science', 'social'],
                k_engine:['力学','机械','仪器','材料','电子信息','计算机','土木','化学与制药','兵器','核工程','生物医学工程'],
                k_science:['数学与应用数学','数据计算及应用','应用物理学','量子信息科学','化学','天文学','气象学','海洋科学','军事海洋学','地质学','生物科学','心理学','统计学'],
                k_maths:['数论','代数学','几何学','拓扑学','固体理学','流体理学'],
                translateX: 0,
                navSlidingWidth:0,
                engine_latest:['新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨'],
                engine_popular:['新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨','新型冠状病毒肺炎疫情期间方舱医院护理工作模式探讨']
            }
        },
        mounted() {
            window.addEventListener('scroll', this.fixedActiveBtn);
            this.setUnderLine();
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
                console.log(this.test)
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
/deep/ .el-collapse-item__header{
    background-color: #F2F2F2;
    width: 103%;
    margin-top: -25px;
    margin-left: -20px;
    height: 130px;
}
/deep/ .el-collapse-item__content{
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
    font-size: 22px;
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
    font-size: 22px;
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
    font-size: 22px;
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
    font-size: 22px;
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
</style>
