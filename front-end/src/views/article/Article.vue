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
            <div class="rightPart">
              <div style="height: 43px;width: 100%;display: flex">
                <div style="float:left;">
                  <div style="margin-bottom: 6px;margin-top: 9px">
                    <svg t="1639884746131" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11300" width="28" height="28"><path d="M743.168 85.333333c-24.618667-24.661333-68.010667-42.666667-102.826667-42.666666H238.933333C176.810667 42.666667 128 95.744 128 159.573333v704.853334C128 928.213333 176.896 981.333333 238.933333 981.333333h546.133334c62.08 0 110.933333-53.162667 110.933333-116.864V298.965333c0-34.986667-17.877333-78.336-42.538667-103.082666l-110.293333-110.506667z m-60.416 60.288l110.293333 110.506667c8.661333 8.746667 17.621333 30.421333 17.621334 42.837333V864.426667c0 18.090667-12.373333 31.530667-25.6 31.530666H238.933333c-13.226667 0-25.6-13.397333-25.6-31.573333V159.573333c0-18.218667 12.288-31.573333 25.6-31.573333h401.365334c12.16 0 33.834667 8.96 42.453333 17.621333z" p-id="11301" fill="#515151"></path><path d="M341.333333 554.666667h170.666667a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM341.333333 682.666667h341.333334a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM341.333333 810.666667h341.333334a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM853.333333 256h-127.786666A42.794667 42.794667 0 0 1 682.666667 213.12V85.333333a42.666667 42.666667 0 0 0-85.333334 0v127.786667A128.128 128.128 0 0 0 725.546667 341.333333H853.333333a42.666667 42.666667 0 0 0 0-85.333333z" p-id="11302" fill="#515151"></path><path d="M298.666667 256.426667C298.666667 232.576 317.568 213.333333 341.76 213.333333h84.48c23.808 0 43.093333 18.901333 43.093333 43.093334v84.48C469.333333 364.757333 450.432 384 426.24 384H341.76C317.909333 384 298.666667 365.098667 298.666667 340.906667V256.426667z" p-id="11303" fill="#515151"></path></svg>
                  </div>
                </div>
                <div style="float: left;margin-left: 3px">
                  <span style="font-size: 2em;font-family: Segoe UI;margin-bottom: 3px">{{ this.recommends }} </span><span style="font-size: 1em">推荐</span>
                </div>
              </div>
              <div style="height: 43px;width: 100%;display: flex">
                <div style="float: left;">
                  <div style="margin-bottom: 7.5px;margin-top: 7.5px">
                    <svg t="1639884282485" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5432" width="28" height="28"><path d="M800.384 240c-125.568 0-221.76 97.664-221.76 223.168v299.904c0 11.136 9.728 20.928 20.928 20.928h237.12a21.44 21.44 0 0 0 20.928-20.928V525.952a21.44 21.44 0 0 0-20.928-20.928h-174.4v-41.856c0-69.76 68.352-139.52 138.112-139.52h36.288a21.44 21.44 0 0 0 20.928-20.864v-41.856a21.44 21.44 0 0 0-20.928-20.928h-36.288z m-412.16 0C262.656 240 166.4 337.664 166.4 463.168v299.904c0 11.136 9.792 20.928 20.928 20.928h237.12a21.44 21.44 0 0 0 20.928-20.928V525.952a21.44 21.44 0 0 0-20.928-20.928H250.112v-41.856c0-69.76 68.352-139.52 138.112-139.52h36.224a21.44 21.44 0 0 0 20.928-20.864v-41.856a21.44 21.44 0 0 0-20.928-20.928h-36.224z" fill="#515151" p-id="5433"></path></svg>
                  </div>
                </div>
                <div style="float: left;margin-left: 3px">
                  <span style="font-size: 2em;font-family: Segoe UI;margin-bottom: 3px">{{ this.n_citation }}</span> <span style="font-size: 1em">引用</span>
                  <svg t="1639828192687" class="icon" style="margin-bottom: 8px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8378" width="12" height="12"><path d="M876.8 659.2 620.8 512l256-147.2c25.6-12.8 38.4-51.2 19.2-76.8-12.8-25.6-51.2-38.4-76.8-19.2l-256 147.2L563.2 121.6C569.6 89.6 544 64 512 64S454.4 89.6 454.4 121.6l0 294.4-256-147.2C179.2 249.6 140.8 262.4 128 288c-12.8 25.6-6.4 64 19.2 76.8l256 147.2-256 147.2c-25.6 12.8-38.4 51.2-19.2 76.8 12.8 19.2 32 25.6 51.2 25.6 6.4 0 19.2 0 25.6-6.4l256-147.2 0 294.4C454.4 934.4 480 960 512 960s57.6-25.6 57.6-57.6L569.6 608l256 147.2c6.4 6.4 19.2 6.4 25.6 6.4 19.2 0 38.4-12.8 51.2-25.6C908.8 710.4 902.4 672 876.8 659.2z" p-id="8379"></path></svg>
                </div>
              </div>
              <div style="height: 35px;width: 100%;display: flex">
                <div style="float: left">
                  <div style="margin-top: 9px">
                    <svg t="1639884184785" class="icon" viewBox="0 0 1536 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4562" width="28" height="28"><path d="M768 0C345.6 0 0 383.99999999 0 512c0 170.6625 345.6 512 768 512s768-384.00000001 768-512S1190.4 0 768 0z m0 938.6625C392.49999998 938.6625 85.3375 597.3375 85.3375 512S392.49999998 85.3375 768 85.3375s682.6625 341.325 682.6625 426.6625S1143.4625 938.6625 768 938.6625z" fill="#515151" p-id="4563"></path><path d="M768 789.3375A277.3375 277.3375 0 1 1 1045.3375 512 276.7875 276.7875 0 0 1 768 789.3375z m0-469.3375A192 192 0 1 0 960 512 191.25 191.25 0 0 0 768 320z" fill="#515151" p-id="4564"></path></svg>
                  </div>
                </div>
                <div style="float: left;margin-left: 3px">
                  <span style="font-size: 2em;font-family: Segoe UI;margin-bottom: 3px">{{ this.visNumber }}</span> <span style="font-size: 1em">访问</span>
                </div>
                <!--              <div style="float:left;width: 32px">-->
                <!--                <div style="height: 43px;">-->
                <!--                  <div style="margin-top: 9px">-->
                <!--                    <svg t="1639884746131" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11300" width="28" height="28"><path d="M743.168 85.333333c-24.618667-24.661333-68.010667-42.666667-102.826667-42.666666H238.933333C176.810667 42.666667 128 95.744 128 159.573333v704.853334C128 928.213333 176.896 981.333333 238.933333 981.333333h546.133334c62.08 0 110.933333-53.162667 110.933333-116.864V298.965333c0-34.986667-17.877333-78.336-42.538667-103.082666l-110.293333-110.506667z m-60.416 60.288l110.293333 110.506667c8.661333 8.746667 17.621333 30.421333 17.621334 42.837333V864.426667c0 18.090667-12.373333 31.530667-25.6 31.530666H238.933333c-13.226667 0-25.6-13.397333-25.6-31.573333V159.573333c0-18.218667 12.288-31.573333 25.6-31.573333h401.365334c12.16 0 33.834667 8.96 42.453333 17.621333z" p-id="11301" fill="#515151"></path><path d="M341.333333 554.666667h170.666667a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM341.333333 682.666667h341.333334a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM341.333333 810.666667h341.333334a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM853.333333 256h-127.786666A42.794667 42.794667 0 0 1 682.666667 213.12V85.333333a42.666667 42.666667 0 0 0-85.333334 0v127.786667A128.128 128.128 0 0 0 725.546667 341.333333H853.333333a42.666667 42.666667 0 0 0 0-85.333333z" p-id="11302" fill="#515151"></path><path d="M298.666667 256.426667C298.666667 232.576 317.568 213.333333 341.76 213.333333h84.48c23.808 0 43.093333 18.901333 43.093333 43.093334v84.48C469.333333 364.757333 450.432 384 426.24 384H341.76C317.909333 384 298.666667 365.098667 298.666667 340.906667V256.426667z" p-id="11303" fill="#515151"></path></svg>-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--                <div style="height: 43px">-->
                <!--                  <div style="margin-top: 5px">-->
                <!--                  <svg t="1639884282485" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5432" width="28" height="28"><path d="M800.384 240c-125.568 0-221.76 97.664-221.76 223.168v299.904c0 11.136 9.728 20.928 20.928 20.928h237.12a21.44 21.44 0 0 0 20.928-20.928V525.952a21.44 21.44 0 0 0-20.928-20.928h-174.4v-41.856c0-69.76 68.352-139.52 138.112-139.52h36.288a21.44 21.44 0 0 0 20.928-20.864v-41.856a21.44 21.44 0 0 0-20.928-20.928h-36.288z m-412.16 0C262.656 240 166.4 337.664 166.4 463.168v299.904c0 11.136 9.792 20.928 20.928 20.928h237.12a21.44 21.44 0 0 0 20.928-20.928V525.952a21.44 21.44 0 0 0-20.928-20.928H250.112v-41.856c0-69.76 68.352-139.52 138.112-139.52h36.224a21.44 21.44 0 0 0 20.928-20.864v-41.856a21.44 21.44 0 0 0-20.928-20.928h-36.224z" fill="#515151" p-id="5433"></path></svg>-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--                <div style="height: 30px">-->
                <!--                  <div style="margin-top: 5px">-->
                <!--                  <svg t="1639884184785" class="icon" viewBox="0 0 1536 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4562" width="28" height="28"><path d="M768 0C345.6 0 0 383.99999999 0 512c0 170.6625 345.6 512 768 512s768-384.00000001 768-512S1190.4 0 768 0z m0 938.6625C392.49999998 938.6625 85.3375 597.3375 85.3375 512S392.49999998 85.3375 768 85.3375s682.6625 341.325 682.6625 426.6625S1143.4625 938.6625 768 938.6625z" fill="#515151" p-id="4563"></path><path d="M768 789.3375A277.3375 277.3375 0 1 1 1045.3375 512 276.7875 276.7875 0 0 1 768 789.3375z m0-469.3375A192 192 0 1 0 960 512 191.25 191.25 0 0 0 768 320z" fill="#515151" p-id="4564"></path></svg>-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--              </div>-->
                <!--              -->
                <!--              <div style="float: left;">-->
                <!--                <div>-->
                <!--                  <span style="font-size: 2em;font-family: Segoe UI;margin-bottom: 3px">{{ this.recommends }} </span><span style="font-size: 1em">推荐</span>-->
                <!--                </div>-->
                <!--                <div>-->
                <!--                  <span style="font-size: 2em;font-family: Segoe UI;margin-bottom: 3px">{{ this.n_citation }}</span> <span style="font-size: 1em">引用</span>-->
                <!--                  <svg t="1639828192687" class="icon" style="margin-bottom: 8px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8378" width="12" height="12"><path d="M876.8 659.2 620.8 512l256-147.2c25.6-12.8 38.4-51.2 19.2-76.8-12.8-25.6-51.2-38.4-76.8-19.2l-256 147.2L563.2 121.6C569.6 89.6 544 64 512 64S454.4 89.6 454.4 121.6l0 294.4-256-147.2C179.2 249.6 140.8 262.4 128 288c-12.8 25.6-6.4 64 19.2 76.8l256 147.2-256 147.2c-25.6 12.8-38.4 51.2-19.2 76.8 12.8 19.2 32 25.6 51.2 25.6 6.4 0 19.2 0 25.6-6.4l256-147.2 0 294.4C454.4 934.4 480 960 512 960s57.6-25.6 57.6-57.6L569.6 608l256 147.2c6.4 6.4 19.2 6.4 25.6 6.4 19.2 0 38.4-12.8 51.2-25.6C908.8 710.4 902.4 672 876.8 659.2z" p-id="8379"></path></svg>-->
                <!--                </div>-->
                <!--                <div>-->
                <!--                  <span style="font-size: 2em;font-family: Segoe UI;margin-bottom: 3px">{{ this.visNumber }}</span> <span style="font-size: 1em">访问</span>-->
                <!--                </div>-->
                <!--              </div>-->
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
                <!--                {{localStorage.getItem('user_id')}}-->
                <div v-if="isLogin === null || isLogin === -1 || isLogin === (-1+'')">
                  <!--                  <el-button type="warning" v-if="!this.isFavorite" @click="getFavoriteBag">收藏文献</el-button>-->
                  <el-popover
                    placement="bottom"
                    width="200"
                    trigger="click"
                    content="请先登录">
                    <el-button type="warning" slot="reference">收藏文献</el-button>
                  </el-popover>
                </div>
                <div v-else>
                  <el-button type="warning" v-if="!this.isFavorite" @click="getFavoriteBag">收藏文献</el-button>
                  <el-button type="warning" plain v-else @click="deleteFavorite">取消收藏</el-button>
                </div>
              </el-menu-item>
              <el-menu-item>
                <div v-if="isLogin === null || isLogin === -1 || isLogin === (-1+'')">
                  <el-popover
                    placement="bottom"
                    width="200"
                    trigger="click"
                    content="请先登录">
                    <el-button type="warning" slot="reference">推荐文献</el-button>
                  </el-popover>
                </div>
                <div v-else>
                  <el-button type="warning" v-if="!this.isRecommend" @click="recommend">推荐文献</el-button>
                  <el-button type="warning" plain v-else @click="cancelRecommend">取消推荐</el-button>
                </div>

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
      n_citation:'',
      isLogin:'',
      recommends:'',
      visNumber:'',

    }
  },
  mounted() {
    this.isLogin = localStorage.getItem('user_id')
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
    this.getRecommends();
  },
  methods: {
    toAuthor(id){
      ESApi.getAuthorInfo(id).then(response => {
        console.log(response);
        if (response.data.hits.hits.length > 0) {
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
    // isLog(){
    //   console.log('是否登录')
    //   this.isLogin = localStorage.getItem('isLogin')
    //   console.log(this.isLogin)
    // },
    //获取是否收藏
    getRecommends(){
      console.log('获取是否推荐')
      this.axios({
        method:"get",
        // url:"http://139.9.132.83:8000/user/IsFavoritePaper",
        url:"http://139.9.132.83:8000/search/getRecommend?paper_id="+ this.paper_id,
        data:{
          paper_id: this.paper_id
        }
      })
        .then(response=>{
          console.log(response.data)
          this.recommends = response.data.RecNumber
          this.visNumber = response.data.VisNumber
          console.log(this.recommends)
          console.log(this.visNumber)
        })
    },
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
          // if(response.data.hits.hits[i]._source.id === paper_id){
          let article = response.data.hits.hits[0]
          this.title = article._source.title
          this.n_citation = article._source.n_citation
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
        // }
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
.author:hover{
  cursor: pointer;
}
.main{
  width: 100%;
}
.white{
  /*height: 222px;*/
}
.whitePart{
  width: 80%;
  margin: 0 auto;
  /*height: 160px;*/
}
.whiteContent{
  /*height: 160px;*/
  /*line-height: 160px;*/
  overflow: hidden;
  position:relative;
}
.leftPart{
  margin-top: 20px;
  width: 70%;
  float: left;
  margin-bottom: 20px;
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
  /*margin-top: 20px;*/
  float: right;
  width: 20%;
  position: absolute;
  bottom:0;
  right: 0;
  margin-bottom: 20px;
  margin-top: 60px;
  /*display: flex;*/
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
