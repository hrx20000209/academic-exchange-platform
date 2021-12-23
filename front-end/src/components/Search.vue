<template>
  <div id="search"
       tabindex="-1"
       @keyup="keyboardEvent">
    <nav_without_search-box></nav_without_search-box>
    <!--    <div class="searchbar">-->
    <!--      <el-autocomplete class="searchInput" v-model="searchInput" placeholder="请输入搜索关键词"-->
    <!--                       :fetch-suggestions="querySearch" @select="search" @keyup.enter="search"></el-autocomplete>-->
    <!--      <el-button class="searchBtn" type="primary" @click="search">搜索</el-button>-->
    <!--    </div>-->
    <div class="searchBar">
      <el-input ref="searchInput"
                v-model="searchInput"
                class="searchInput"
                placeholder="请输入关键词，按回车搜索"
                @blur="searchInputHasFocus = false"
                @focus="searchInputHasFocus = true"
                @keyup.enter.native="search">
        <el-button slot="append"
                   icon="el-icon-search"
                   @click="search"></el-button>
      </el-input>
      <div class="advancedSearch">
        <el-collapse v-model="activeSearchTabs"
                     class="advancedSearchForm">
          <el-collapse-item name="1"
                            title="高级搜索">
            <el-form class="rules">
              <el-form-item
                v-for="(rule, index) in advancedSearchInput"
                :key="`规则${index}`"
                class="rule">
                <el-select v-model="rule.bool"
                           placeholder="布尔">
                  <el-option v-for="bool in BOOLS"
                             :key="bool"
                             :label="bool"
                             :value="bool"></el-option>
                </el-select>
                <el-select v-model="rule.field"
                           placeholder="字段"
                           @change="handleFieldChange(rule)"
                >
                  <el-option v-for="field in Object.keys(FIELD_TYPE)"
                             :key="field"
                             :label="field"
                             :value="field"
                  >

                  </el-option>
                </el-select>
                <el-select v-model="rule.type"
                           no-data-text="请先选字段"
                           placeholder="规则种类">
                  <el-option v-for="type in FIELD_TYPE[rule.field]"
                             :key="type"
                             :label="type"
                             :value="type"></el-option>
                </el-select>
                <el-input v-if="rule.type === TYPES.MATCH"
                          v-model="rule.match"
                          placeholder="匹配文字"></el-input>
                <div v-if="rule.type === TYPES.RANGE">
                  <el-select v-model="rule.range.op">
                    <el-option v-for="op in OPS"
                               :key="op"
                               :label="op"
                               :value="op"></el-option>
                  </el-select>
                  <el-input-number v-model="rule.range.value"></el-input-number>
                </div>
                <el-button @click="delRule(rule)">删除</el-button>
              </el-form-item>
              <el-form-item class="rule">
                <el-button @click="advancedSearch">搜索</el-button>
                <!--                 TODO 回车搜索 美化按钮和布局-->
                <el-button @click="addRule">新增规则</el-button>
              </el-form-item>
            </el-form>
            <div class="advancedSearchInfo"
                 style="width: 250px">
              <span style="font-size: 16px">高级搜索使用方法<br/></span>
              1. 首先选择布尔运算符，相同运算符将会被归并到一组中。<br/>
              2. 然后选择字段和规则类型，规则类型包括：<br/>
              - 匹配：关键词匹配。<br/>
              - 范围：针对引用量和年份，可以限定数字范围。<br/>
              - 存在：要求搜索到的文章一定存在该字段，或该字段非空。<br/>
            </div>
          </el-collapse-item>
        </el-collapse>
        <!--        <el-popover-->
        <!--          placement="right"-->
        <!--          title="高级搜索使用方法"-->
        <!--          width="300px"-->
        <!--          trigger="manual"-->
        <!--          v-model="showAdvancedSearchInfo"-->
        <!--          v-if="isAdvancedSearch"-->
        <!--        >-->
        <!--          <div style="width: 250px">-->
        <!--            1. 首先选择布尔运算符，相同运算符将会被归并到一组中。<br/>-->
        <!--            2. 然后选择字段和规则类型，规则类型包括：匹配、范围、存在。<br/>-->
        <!--            - 匹配：关键词搜索。<br/>-->
        <!--            - 范围：针对引用量和年份，可以限定数字范围。<br/>-->
        <!--            - 存在：要求搜索到的文章一定存在该字段，或该字段非空。<br/>-->
        <!--          </div>-->
        <!--          <div class="advancedSearchInfo" slot="reference" v-if="isAdvancedSearch">-->
        <!--            <i class="el-icon-info" style="margin: auto"-->
        <!--               @click="showAdvancedSearchInfo = !showAdvancedSearchInfo"></i>-->
        <!--          </div>-->
        <!--        </el-popover>-->
      </div>
      <!--      <el-switch v-model="searching_paper" class="searchSwitch"-->
      <!--                 active-msgText="文献"-->
      <!--                 inactive-msgText="作者">-->
      <!--      </el-switch>-->
    </div>
    <div class="below-searchbar">
      <el-tabs v-model="activeTab"
               @tab-click="search">
        <el-tab-pane label="文 献"
                     name="article">
          <div class="tab">
            <div class="filterAndSort">
              <el-collapse v-model="activeFilterAndSortTabsInArticle">
                <el-collapse-item name="sort"
                                  title="排序方式">
                  <div>
                    <!--                    <span class="filterAndSortTitle">排序方式</span>-->
                    <el-radio-group v-model="sort"
                                    class="sort">
                      <el-radio label="relevance">相关性</el-radio>
                      <el-radio label="time">年份</el-radio>
                      <el-radio label="citation">引用量</el-radio>
                      <!--            TODO 新增排序属性-->
                      <!--            TODO 改蓝色字体样式-->
                    </el-radio-group>
                  </div>
                </el-collapse-item>
                <el-collapse-item name="filterByYears"
                                  title="按年份筛选">
                  <!--                  TODO 全选/全不选 各种筛选都加这个功能-->
                  <div>
                    <!--                    <span class="filterAndSortTitle">按年份筛选</span>-->
                    <div class="filter">
                      <el-checkbox v-for="year in years"
                                   :key="year.value"
                                   v-model="year.isSelected"
                                   :label="year.value"></el-checkbox>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item name="filterByVenues"
                                  title="按期刊筛选">
                  <div>
                    <!--                    <span class="filterAndSortTitle">按期刊筛选</span>-->
                    <div class="filter">
                      <el-checkbox v-for="venue in venues"
                                   :key="venue.value"
                                   v-model="venue.isSelected"
                                   :label="venue.value"></el-checkbox>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div class="results">
              <div v-loading="!hasLoaded"
                   style="min-height: 300px;">
                <div v-if="hasLoaded">
                  <div v-if="totalCount > 0">
                    <template v-for="result in article_results_to_show.slice((currentPage-1)*10,currentPage*10)">
                      <div :key="result.id"
                           class="downFrame">
                        <div class="downFrameContent">
                          <div>
                            <el-link :underline="false"
                                     class="resultTitle"
                                     @click="goToArticlePage(result.id)">
                              {{ result.title }}
                            </el-link>
                          </div>

                          <div style="margin-bottom: 10px;font-size: 15px;color:darkgrey;">
                            <span class="articleType">Article</span>
                            <span class="articleYear">{{ result.year }}</span>
                            <span class="articleVenue">{{ result.venue.raw }}</span>
                          </div>
                          <div style="margin-bottom: 10px">
                <span v-for="author in result.authors"
                      :key="author.id">
<!--                  <el-link style="font: unset"-->
<!--                           @click="goToAuthorPage(author.id)">{{ author.name }}</el-link>-->
                                    <span>{{ author.name }}</span>
                  <span v-if="result.authors.indexOf(author) !== result.authors.length-1"> · </span>
                </span>
                            <!--                      TODO citation_by_year map-->
                          </div>
                          <div class="abstract"
                               style="margin-bottom: 10px;font-size: 16px">
                            {{ result.abstract }}
                          </div>
                          <div class="articleCitationCnt"
                               style="color: darkgray;font-size: 15px;margin-bottom: 10px">
                            {{ result.n_citation }} 引用 · {{ result.n_recommendation }} 推荐
                          </div>
                          <div style="height: 30px">
                            <div v-if="result.url !== undefined"
                                 style="float: left">
                              <el-button @click="goToUrl(result.url)">访问全文</el-button>
                            </div>
                            <div style="float: right;text-align: right">
                              <el-button v-if="!result.isRecommended"
                                         @click="recommend(result.id)">推荐文献
                              </el-button>
                              <el-button v-else
                                         @click="cancelRecommend(result.id)">取消推荐
                              </el-button>
                              <el-popover
                                :key="result.articlePageUrl+result.hasLoadedQRCode"
                                placement="top-start"
                                popper-class="qrcodePopover"
                                trigger="click"
                                @show="loadQRCode(result)">
                                <el-link
                                  :underline="false"
                                  class="textInQRCodePopover"
                                  @click="copyUrl(result.articlePageUrl)">点击此处复制链接
                                </el-link>
                                <h4 class="textInQRCodePopover">或分享二维码</h4>
                                <canvas :id="result.articlePageUrl"></canvas>
                                <el-button
                                  slot="reference"
                                  class="shareBtn">
                                  分享
                                </el-button>
                              </el-popover>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--          <el-card-->
                      <!--            :body-style="{ padding: '20px' }"-->
                      <!--            :key="result.value"-->
                      <!--            class="result-card"-->
                      <!--          >-->
                      <!--            <div slot="header" class="clearfix">-->
                      <!--              <span class="card-title"> {{ result.value }} </span>-->
                      <!--            </div>-->
                      <!--            <div>-->
                      <!--              {{ result.abstract }}</div>-->
                      <!--          </el-card>-->
                    </template>
                  </div>
                  <div v-else>
                    <el-empty description="暂无数据"></el-empty>
                  </div>
                </div>
              </div>
              <div class="pagination">
                <span class="n-result">搜索结果共 {{ n_result }} 条，过滤后 {{ totalCount }}条</span>
                <el-pagination :current-page="currentPage"
                               :total="totalCount"
                               layout="prev, pager, next, jumper"
                               @current-change="handleCurrentChange">
                </el-pagination>
              </div>
              <!--          TODO 回到顶部按钮-->
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="作 者"
                     name="author">
          <div class="tab">
            <div class="filterAndSort">
              <div>
                <span class="filterAndSortTitle">排序方式</span>
                <!--                TODO change style to article's-->
                <el-radio-group v-model="sort"
                                class="sort">
                  <el-radio label="relevance">相关性</el-radio>
                  <el-radio label="pub">发表量</el-radio>
                  <el-radio label="citation">引用量</el-radio>
                  <!--            TODO 新增排序属性-->
                  <!--            TODO 改蓝色字体样式-->
                </el-radio-group>
              </div>
              <div>
                <span class="filterAndSortTitle">按机构筛选</span>
                <div class="filter">
                  <el-checkbox
                    v-for="orgs in orgs"
                    :key="orgs.value"
                    v-model="orgs.isSelected"
                    :label="orgs.value">
                  </el-checkbox>
                </div>
              </div>
            </div>
            <div class="results">
              <div v-loading="!hasLoaded"
                   style="min-height: 300px;">
                <div v-if="hasLoaded">
                  <div v-if="totalCount > 0">
                    <template v-for="result in author_results_to_show.slice((currentPage-1)*10,currentPage*10)">
                      <div :key="result.id"
                           class="downFrame">
                        <div class="downFrameContent">
                          <!--                    <div style="margin-bottom: 10px;font-size: 18px">{{ result.name }}</div>-->
                          <el-link :underline="false"
                                   class="resultTitle"
                                   @click="goToAuthorPage(result.id)">
                            {{ result.name }}
                          </el-link>
                          <div style="margin-bottom: 10px">
                      <span v-for="org in result.orgs"
                            :key="org.id">
                        {{ org.name }}
                      <span v-if="result.orgs.indexOf(org) !== result.orgs.length-1"> · </span>
                      </span>
                          </div>
                          <div class="articleCitationCnt"
                               style="color: darkgray;font-size: 15px;margin-bottom: 10px">
                            {{ result.n_citation }} 引用 · {{ result.n_pubs }} 发表
                          </div>
                          <div class="articleCitationCnt"
                               style="color: darkgray;font-size: 15px;margin-bottom: 10px">

                          </div>
                          <div style="height: 30px">
                            <div style="float: left">
                              <el-button v-if="!result.isFollowed"
                                         @click="follow(result.id)">关注
                              </el-button>
                              <el-button v-else
                                         @click="unfollow(result.id)">取关
                              </el-button>
                              <el-button v-if="result.authorInfo.canSendMessage"
                                         @click="openLetter(result)">私信
                              </el-button>
                              <!--                        TODO result.x 改为 data的变量，省去更新？-->
                              <!--                        TODO author 其他字段-->
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-else>
                    <el-empty description="暂无数据"></el-empty>
                  </div>
                </div>
              </div>
              <div class="pagination">
                <span class="n-result">搜索结果共 {{ n_result }} 条，过滤后 {{ totalCount }}条</span>
                <el-pagination :current-page="currentPage"
                               :total="totalCount"
                               layout="prev, pager, next, jumper"
                               @current-change="handleCurrentChange">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogLetterVisible"
      title="私信"
      width="35%">
      <div class="letter-body">
        <div>
          <div class="letter-send-box">发送给：</div>
          <el-input v-model="usrNameToMsgTo"
                    disabled></el-input>
          <div class="letter-send-box">私信内容：</div>
          <el-input
            v-model="msgText"
            maxlength="250"
            placeholder="请输入内容"
            resize="none"
            rows="10"
            show-word-limit
            type="textarea"
            @blur="msgDialogHasFocus = false"
            @focus="msgDialogHasFocus = true"
          >
          </el-input>
        </div>
        <div class="letter-btn-box">
          <el-button type="primary"
                     @click="sendLetter">发 送
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import _ from 'lodash';
import Nav_without_searchBox from "./nav_without_searchBox";
import {changeViewTime, getScolarUserInfo, checkIfFollow, followAuthor, sendMessage, undoFollow} from "../request/api";

let Clipboard = window.navigator.clipboard;
const TYPES = {
  MATCH: '匹配',
  RANGE: '范围',
  EXISTS: '存在',
};
const BOOLS = {
  MUST: 'AND',
  MUST_NOT: 'NOT',
  SHOULD: 'OR'
};
const FIELDS = {
  TITLE: '标题',
  AUTHORS: '作者',
  ABSTRACT: '摘要',
  VENUE: '期刊',
  URL: '原文链接',
  N_CITATION: '引用量',
  YEAR: '年份',
};
const OPS = {
  GTE: '≥',
  LTE: '≤'
};

// return string used directly in POST
const getKeyNameByKeyValue = (obj, keyValue) => {
  for (const objKey in obj) {
    if (obj[objKey] === keyValue) return objKey.toLowerCase();
  }
  return null;
};

const HIT_SIZE = 1000;

export default {
  name: "search",
  components: {Nav_without_searchBox},
  data() {
    return {
      hasLoaded: false,
      usrNameToMsgTo: '',
      msgText: '',
      dialogLetterVisible: false,
      showAdvancedSearchInfo: false,
      TYPES: TYPES,
      // BOOLS: BOOLS,
      activeSearchTabs: [],
      BOOLS: BOOLS,
      FIELD_TYPE: {
        [FIELDS.TITLE]: [TYPES.MATCH, TYPES.EXISTS],
        [FIELDS.AUTHORS]: [TYPES.MATCH, TYPES.EXISTS],
        [FIELDS.ABSTRACT]: [TYPES.MATCH, TYPES.EXISTS],
        [FIELDS.VENUE]: [TYPES.MATCH, TYPES.EXISTS],
        [FIELDS.URL]: [TYPES.EXISTS],
        [FIELDS.N_CITATION]: [TYPES.RANGE, TYPES.EXISTS],
        [FIELDS.YEAR]: [TYPES.RANGE, TYPES.EXISTS],
      },
      OPS: OPS,
      searchInput: "",
      activeTab: "article",
      activeFilterAndSortTabsInArticle: ['sort', 'filterByYears', 'filterByVenues'],
      articles: [],
      hotArticles: [
        {
          value: "HOT1",
          author: "Tom",
          abstract:
            "this article describes HOT",
        }
      ],
      search_response_data: null,
      searchInputHasFocus: false,
      msgDialogHasFocus: false,
      articleHits: [],
      authorHits: [],
      n_result: 0,
      recommendationInfo: {},
      followInfo: {},
      authorInfo: {},
      currentPage: 1,
      totalCount: 0,
      // years and venues are watching articleHits
      // their value may be changed by checkboxes so they are not declared as computed
      years: [],
      venues: [],
      orgs: [],
      advancedSearchInput: [{
        bool: BOOLS.MUST, // MUST MUST_NOT SHOULD
        type: TYPES.MATCH, // MATCH(field, match), RANGE(field, range{op, value}), EXISTS(field)
        field: FIELDS.TITLE, // MATCH: title, author, abstract, venue; RANGE: n_citation, year??; EXIST: ALL
        match: 'AAAI', // string
        range: {
          op: null, // >= <=
          value: null, // number
        }, //
      }],
      sort: "relevance",
      formatTitle: title => {
        const words = title.trim().toLowerCase().split(' ');
        const ignore_words = ['of', 'with', 'at', 'from', 'into', 'during', 'to', 'in', 'for', 'on', 'by', 'about', 'through',
          "and", "or", "the", "a"];
        for (let i = 0; i < words.length; i++) {
          if (ignore_words.indexOf(words[i]) > -1) {
            continue;
          }
          words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
        }
        words[0] = words[0].charAt(0).toUpperCase() + words[0].substring(1);
        return words.join(' ');
      },
      formatAuthor: title => {
        const words = title.trim().toLowerCase().split(' ');
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
        }
        return words.join(' ');
      },
      // cmp func for this.article_results_to_show
      cmpCitation: (a, b) => {
        return b.n_citation - a.n_citation;
      },
      cmpRelevance: (a, b) => {
        return b._score - a._score;
      },
      cmpTime: (a, b) => {
        return b.year - a.year;
      },
      cmpPub: (a, b) => {
        return b.n_pubs - a.n_pubs;
      }
    };
  },
  computed: {
    userID: function () {
      return localStorage.getItem("user_id");
    },
    isAdvancedSearch: function () {
      return this.activeSearchTabs.indexOf("1") > -1;
    },
    article_results_to_show: { // TODO 可能慢，转换为watch提速
      get: function () {
        // console.log(`article_results_to_show COMPUTING`);
        let hits = [].concat(this.articleHits);
        let ret = [];
        if (this.activeTab !== "article")
          return ret;

        // filter
        for (const hit of hits) {
          let y = hit._source.year.toString();
          let v = hit._source.venue.raw;
          let match_year = false;
          let match_venue = false;
          for (const year of this.years) {
            if (year.isSelected &&
              (
                (year.value === y) ||
                (year.value === '其他' && (parseInt(y) > 2015 || parseInt(y) < 2005))
              )
            ) {
              match_year = true;
            }
          }
          let isAmong10 = false;
          let othersSelected;
          for (const venue of this.venues) {
            if (venue.value === v) {
              isAmong10 = true;
              if (venue.isSelected) {
                match_venue = true;
              }
            }
            if (venue.value === '其他') {
              othersSelected = venue.isSelected;
            }
          }
          if (match_venue === false && !isAmong10 && othersSelected) {
            match_venue = true;
          }
          if (match_venue && match_year) {
            let toPush = hit._source;
            // add more data here
            toPush._score = hit._score;
            toPush.hasLoadedQRCode = false;
            toPush.articlePageUrl = `http://139.9.132.83/article/${toPush.id}`;
            // console.log(this.recommendationInfo);
            // let recommendationInfo = JSON.parse(JSON.stringify(this.recommendationInfo)); // TODO make data read only
            toPush.isRecommended = this.safeUndefined(this.recommendationInfo, toPush.id, 'isRecommended');
            toPush.n_recommendation = this.safeUndefined(this.recommendationInfo, toPush.id, 'n_recommendation'); // infinite loop computing
            // console.log(toPush.isRecommended);
            ret.push(toPush);
          } else {
            // console.log(`hit is not pushed:`);
            // console.log(hit);
            // console.log('by filters:');
            // console.log(this.years)
            // console.log(this.venues);
          }
        }

        // sort
        switch (this.sort) {
          case "relevance":
            ret.sort(this.cmpRelevance);
            break;
          case "time":
            ret.sort(this.cmpTime);
            break;
          default:
            ret.sort(this.cmpCitation);
        }
        // console.log(`author_results_to_show COMPUTED`);
        return ret;
      },
      set: function () {

      }
    },
    author_results_to_show: function () {
      let hits = [].concat(this.authorHits);
      let ret = [];
      if (this.activeTab !== "author") {
        return ret;
      }

      // filter by orgs. 1.先找出每种org（包括其他）能对应的hit集合，即orgs_hits；2.然后把选中的org对应的hit集合取并集
      let othersSelected = false;
      let orgs = []; // this.orgs' names except '其他'
      for (const org of this.orgs) {
        if (org.value === '其他' && org.isSelected) {
          othersSelected = true;
          continue;
        }
        orgs.push(org.value);
      }
      let orgs_hits = {}; // hit._source.ids matched for every org name whether selected or not
      for (const org1 of orgs) { // compute orgs_hits (partial) content, and mark those others
        orgs_hits[org1] = new Set();
        for (let i = 0; i < hits.length; i++) {
          const hit = hits[i];
          console.log(hit._source);
          hit._source.isNotOthers = false;
          const authorOrgs = [];
          for (const authorOrgObj of hit._source.orgs) {
            authorOrgs.push(authorOrgObj.name);
          }
          if (authorOrgs.indexOf(org1) > -1) {
            orgs_hits[org1].add(hit._source.id);
            hit._source.isNotOthers = true;
            hits.splice(i, 1);
          }
        }
      }
      if (othersSelected) { // compute orgs_hits['其他'] if needed
        orgs_hits['其他'] = new Set();
        for (const hit of this.authorHits) {
          if (!hit._source.isNotOthers) {
            orgs_hits['其他'].add(hit._source.id);
          }
        }
      }
      // orgs_hits 计算好了
      let selectedAuthorIDs = othersSelected ? new Set(JSON.parse(JSON.stringify(orgs_hits['其他']))) : new Set();
      for (const o of orgs) { // compute selectedAuthorIDs
        let isSelected = false;
        for (const orgObj of this.orgs) {
          if (orgObj.value === o && orgObj.isSelected) {
            isSelected = true;
          }
        }
        // now i know whether this o is selected
        if (isSelected) {
          orgs_hits[o].forEach(id => {
            selectedAuthorIDs.add(id);
          });
        }
      }
      // selectedAuthorIDs 计算好了

      for (const hit of this.authorHits) {
        const id = hit._source.id;
        if (selectedAuthorIDs.has(id)) {
          let toPush = hit._source;
          toPush._score = hit._score;
          toPush.isFollowed = this.followInfo[toPush.id];
          toPush.authorInfo = this.authorInfo[toPush.id] ? this.authorInfo[toPush.id] : {
            canSendMessage: false,
          };
          ret.push(toPush);
          // console.log("RET:");
          // console.log(ret);
        }
      }

      // sort
      switch (this.sort) {
        case "relevance":
          ret.sort(this.cmpRelevance);
          break;
        case "pub":
          ret.sort(this.cmpPub);
          break;
        default:
          ret.sort(this.cmpCitation);
      }
      // console.log(ret);
      return ret;
    },
  },
  watch: {
    author_results_to_show: function () {
      this.totalCount = this.author_results_to_show.length;
    },
    article_results_to_show: function () {
      this.totalCount = this.article_results_to_show.length;
    },
    userID: function () {
      console.log(`userID changed to ${this.userID}`);
    },
    articleHits: function () {
      if (this.activeTab !== "article")
        return;

      // update this.years
      let ys = new Set();
      for (const hit of this.articleHits) {
        ys.add(`${hit._source.year}`);
      }
      let years = [];
      let otherExists = false;
      for (const y of ys) {
        if (parseInt(y) > 2015 || parseInt(y) < 2005) {
          otherExists = true;
        } else {
          years.push({
            value: y,
            isSelected: true,
          });
        }
      }
      this.years = years.sort((a, b) => {
        return b.value - a.value;
      });
      if (otherExists) {
        this.years.push({
          value: '其他',
          isSelected: true,
        });
      }

      // update this.venues
      let venueCount = {};
      for (const hit of this.articleHits) {
        const v = hit._source.venue.raw;
        if (venueCount[v]) {
          venueCount[v]++;
        } else {
          venueCount[v] = 1;
        }
      }
      let venues = [];
      for (const v of Object.keys(venueCount)) {
        venues.push({
          value: v,
          count: venueCount[v],
          isSelected: true,
        });
      }
      this.venues = venues.sort((a, b) => {
        return a.count < b.count ? 1 : -1;
      });
      let len = this.venues.length;
      this.venues = this.venues.slice(0, 10);
      if (len > 10) {
        this.venues.push({
          value: '其他',
          isSelected: true
        });
      }

      this.n_result = this.articleHits.length;
    },
    authorHits: function () {
      if (this.activeTab !== "author")
        return;

      // update this.orgs
      let orgCount = {};
      for (const hit of this.authorHits) {
        const os = hit._source.orgs;
        for (const o of os) {
          const name = o.name;
          if (orgCount[name]) {
            orgCount[name]++;
          } else {
            orgCount[name] = 1;
          }
        }
      }
      let orgs = [];
      for (const orgName of Object.keys(orgCount)) {
        orgs.push({
          value: orgName,
          count: orgCount[orgName],
          isSelected: true,
        });
      }
      this.orgs = orgs.sort((a, b) => {
        return a.count < b.count ? 1 : -1;
      });
      let len = this.orgs.length;
      this.orgs = this.orgs.slice(0, 10);
      if (len > 10) {
        this.orgs.push({
          value: '其他',
          isSelected: true,
        });
      }

      this.n_result = this.articleHits.length;
    },
    isAdvancedSearch: function () {
      if (!this.isAdvancedSearch) {
        this.showAdvancedSearchInfo = false;
      }
    }
  },
  methods: {
    openLetter(result) {
      this.dialogLetterVisible = true;
      this.usrNameToMsgTo = result.authorInfo.userName;
    },
    sendLetter() {
      if (this.msgText === '') {
        this.$message({
          type: 'warning',
          message: '私信内容不能为空'
        });
      } else {
        sendMessage({
          sender_id: this.userID,
          receiver_name: this.usrNameToMsgTo,
          text: this.msgText
        }).then(response => {
          if (this.usrNameToMsgTo === localStorage.getItem('user_name')) {
            this.$message({
              type: 'warning',
              message: '不能向自己发送信息'
            });
            return;
          }
          this.$message({
            type: 'success',
            message: '发送成功'
          });
          this.dialogLetterVisible = false;
          this.msgText = '';
        });
      }
    },
    handleClose(done) {
      if (this.msgText !== '') {
        this.$confirm('确认关闭？正在编辑的私信不会保存哦！')
          .then(_ => {
            done();
            this.msgText = '';
          })
          .catch(_ => {
          });
      } else {
        done();
      }
    },
    checkIfCanSendMessage(authorID) {
      getScolarUserInfo({
        author_id: authorID
      }).then(response => {
        // console.log('authorInfo response:');
        // console.log(response);
        this.authorInfo[authorID] = {
          canSendMessage: response.ifHaveAccount,
          userName: response.user ? response.user.name : '',
        };
      });
    },
    checkMsgSuccess(msg) {
      msg = msg.toString();
      return Math.max(msg.toLowerCase().indexOf('success'), msg.indexOf('成功')) > -1;
    },
    follow(authorID) {
      if (this.userID) {
        followAuthor({
          follow_id: authorID,
          follower_id: this.userID
        }).then(res => {
          console.log(res);
          if (this.checkMsgSuccess(res.message)) {
            this.notifyInfo('关注成功');
            this.updateIfFollowed(authorID);
          } else {
            this.notifyInfo('关注失败，请再次尝试');
          }
        });
      } else {
        this.notifyInfo('请先登录');
      }
    },
    updateIfFollowed(authorID) {
      if (this.userID) {
        checkIfFollow({
          follow_id: authorID,
          follower_id: this.userID
        }).then(res => {
          // console.log(res);
          let isFollowed = eval(res.message);
          this.$set(this.followInfo, authorID, isFollowed);
        });
      }
    },
    unfollow(authorID) {
      if (this.userID) {
        undoFollow({
          follow_id: authorID,
          follower_id: this.userID
        }).then(res => {
          console.log(res);
          if (this.checkMsgSuccess(res.message)) {
            this.notifyInfo('取关成功');
            this.updateIfFollowed(authorID);
          } else {
            this.notifyInfo('取关失败，请再次尝试');
          }
        });
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleFieldChange(rule) {
      rule.type = null;
      console.log(rule);
    },
    safeUndefined(obj, key, innerKey) {
      if (typeof obj[key] === 'undefined')
        this.$set(obj, key, {});
      else
        // console.log(obj[key][innerKey]);
        return obj[key][innerKey];
    },
    updateRecommendationInfo(paperID) {
      // console.log(`REFRESHING: ${paperID}`);
      this.updateIfRecommended(paperID);
      this.updateNumOfRecommendation(paperID);
    },
    updateNumOfRecommendation(paperID) {
      this.axios({
        method: "get",
        url: "http://139.9.132.83:8000/search/getRecommend?paper_id=" + paperID,
        data: {
          paper_id: paperID
        }
      }).then(response => {
        let n_recommendation = response.data.RecNumber;
        // if ( typeof this.recommendationInfo[paperID] === 'undefined')
        //   this.$set(this.recommendationInfo, paperID, {})
        this.$set(this.recommendationInfo, paperID, {
          isRecommended: this.safeUndefined(this.recommendationInfo, paperID, 'isRecommended'),
          n_recommendation: n_recommendation,
        }); // 为了让数组变化是响应式的
      });
    },
    updateIfRecommended(paperID) {
      // console.log(`REFRESHING: ${paperID}`);
      if (!this.userID) {
        console.log('NOT LOGGED IN. EARLY RETURN');
        return false;
      }
      this.axios({
        method: "get",
        url: "http://139.9.132.83:8000/search/IsRecommend?paper_id=" + paperID + "&user_id=" + this.userID,
        data: {
          user_id: this.userID,
          paper_id: paperID
        }
      }).then(response => {
        let isRecommended = response.data.isRecommend;
        // console.log(`${paperID} : ${isRecommended}`);
        // this.recommendationInfo[paperID] = isRecommended
        // if ( typeof this.recommendationInfo[paperID] === 'undefined')
        //   this.$set(this.recommendationInfo, paperID, {})
        this.$set(this.recommendationInfo, paperID, {
          isRecommended: isRecommended,
          n_recommendation: this.safeUndefined(this.recommendationInfo, paperID, 'n_recommendation'),
        }); // 为了让数组变化是响应式的
      });
    },
    recommend(paperID) {
      if (!this.userID) {
        this.notifyInfo('请先登录');
        return;
      }
      this.axios({
        method: "post",
        url: "http://139.9.132.83:8000/search/Recommend",
        data: {
          user_id: this.userID,
          paper_id: paperID,
        }
      }).then(response => {
        this.updateRecommendationInfo(paperID); // TODO update request needed?
        if (this.checkMsgSuccess(response.data.Message)) {
          this.notifyInfo('推荐成功');
        } else {
          this.notifyInfo('推荐失败，请再次尝试');
          // TODO 其他功能的失败提示
        }
      });
    },
    cancelRecommend(paperID) {
      this.axios({
        method: "post",
        // url:"http://139.9.132.83:8000/user/IsFavoritePaper",
        url: "http://139.9.132.83:8000/search/CancelRecommend",
        data: {
          user_id: this.userID,
          paper_id: paperID,
        }
      }).then(response => {
        this.updateRecommendationInfo(paperID);
        if (this.checkMsgSuccess(response.data.message)) {
          this.notifyInfo('取消推荐成功');
        } else {
          this.notifyInfo('取消推荐失败，请再次尝试');
        }
      });
    },
    goToArticlePage(id) {
      let route = '/article/' + id + '/overviews';
      this.getVisit(id);
      this.$router.push(route);
    },
    goToAuthorPage(id) {
      changeViewTime({
        author_id: id
      }).then(res => {
        console.log(res);
      });
      this.$router.push({
          path: '/authorPage',
          query: {
            id: id
          }
        }
      );
    },
    getVisit(id) {
      console.log('获取');
      this.axios({
        method: "post",
        // url:"http://139.9.132.83:8000/user/IsFavoritePaper",
        url: "http://139.9.132.83:8000/search/visitpaper",
        data: {
          paper_id: id
        }
      })
        .then(response => {
          console.log(response.data);
        });
    },
    copyUrl(url) {
      let that = this;
      Clipboard.writeText(url).then(function () {
        console.log(this);
        that.notifyInfo("已复制原文链接");
      }, function () {
        that.notifyInfo("复制链接失败，请手动复制：\n" + url);
      });
    },
    goToUrl(url) {
      window.open(url, "_blank");
    },
    notifySlashWithThrottle: _.throttle(function () {
      // console.log("NOTIFYING SLASH SHORTCUT");
      this.notifyInfo("按”/“即可跳到搜索框");
    }, 30000, {
      trailing: false
    }),
    keyboardEvent(e) {
      if (document.activeElement.tagName.toLowerCase().indexOf('input') > -1) return; // 屏蔽输入框
      if (e.location !== 0 || e.ctrlKey || e.altKey || this.dialogLetterVisible) return; // 屏蔽非 DOM_KEY_LOCATION_STANDARD 键盘事件 和 对话框
      if (e.code === "Slash") {
        this.$refs.searchInput.focus();
        window.scrollTo(0, 0);
        console.log('FOCUS');
      } else {
        this.notifySlashWithThrottle();
      }
    },
    notifyInfo(str) {
      this.$notify.info({
        title: "提示",
        message: str,
        duration: 3000,
      });
    },
    querySearch(queryString, cb) {
      let articles = this.articles;
      let results = queryString.length !== 0 ? articles.filter(this.createFilter(queryString)) : this.hotArticles;
      cb(results);
    },
    createFilter(queryString) {
      return (article) => {
        return (article.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    search() {
      this.totalCount = 0;
      this.articleHits = [];
      this.authorHits = [];
      this.years = [];
      this.venues = [];
      this.orgs = [];
      this.hasLoaded = false;
      this.currentPage = 1;
      if (this.searchInput.length === 0) {
        this.notifyInfo("关键词不能为空");
        this.hasLoaded = true;
        return;
      }
      this.activeSearchTabs = [];
      this.$store.commit('setAdvancedSearchInput', []);
      localStorage.removeItem('advancedSearchInput');
      this.$store.commit('setSearchInput', this.searchInput);
      localStorage.searchInput = this.searchInput;
      console.log(`saving searchInput: ${this.searchInput}`);
      console.log("searching: \n\t" + this.searchInput);
      if (this.activeTab === "article") {
        console.log("SEARCHING FOR ARTICLES");
        this.searchArticle();
      } else if (this.activeTab === "author") {
        console.log("SEARCHING FOR AUTHORS");
        this.searchAuthor();
      }
    },
    searchAuthor() {
      this.$http.post(
        'http://119.3.223.135:9200/csauthor/_search',
        {
          "query": {
            "match": {
              "name": this.searchInput
            }
          },
          'size': HIT_SIZE
        }
      ).then(response => {
        this.authorHits = [];
        // this.totalCount = Math.min(response.data.hits.total.value, HIT_SIZE);
        this.totalCount = response.data.hits.total.value;
        for (const hit of response.data.hits.hits) {
          for (const org of hit._source.orgs) {
            if (!org.name) continue;
            org.name = this.formatAuthor(org.name);
          }
          hit._source.name = this.formatTitle(hit._source.name);
          this.updateIfFollowed(hit._source.id);
          this.checkIfCanSendMessage(hit._source.id);
          this.authorHits.push(hit);
        }
        this.search_response_data = response.data;
        this.$forceUpdate();
        this.hasLoaded = true;
        // console.log("response: \n\t")
        // console.log(this.search_response_data)
        console.log("AUTHORS FETCHED");
      });
    },
    searchArticle() {
      // TODO 用高级搜索函数重构
      // TODO 未搜索到结果页面、加载等待
      this.$http.post(
        'http://119.3.223.135:9200/cspaper/_search',
        {
          "query": {
            "match": {
              "title": this.searchInput
            }
          },
          'size': HIT_SIZE
        }
      ).then(response => {
        this.articleHits = [];
        // this.totalCount = Math.min(response.data.hits.total.value, HIT_SIZE);
        this.totalCount = response.data.hits.total.value;
        for (const hit of response.data.hits.hits) {
          for (const author of hit._source.authors) {
            if (!author.name) continue;
            author.name = this.formatAuthor(author.name);
          }
          if (!hit._source.title) continue;
          hit._source.title = this.formatTitle(hit._source.title);
          this.updateRecommendationInfo(hit._source.id);
          this.articleHits.push(hit);
        }
        this.search_response_data = response.data;
        this.$forceUpdate();
        this.hasLoaded = true;
        // console.log("response: \n\t")
        // console.log(this.search_response_data)
        console.log("ARTICLES FETCHED");
      });
    },
    advancedSearch() {
      this.totalCount = 0;
      this.hasLoaded = false;
      this.years = [];
      this.venues = [];
      this.orgs = [];
      this.activeTab = 'article';
      let bools = {
        must: [],
        must_not: [],
        should: [], // TODO implement OR
      };
      this.searchInput = '';
      this.$store.commit('setSearchInput', '');
      localStorage.removeItem('searchInput');
      this.$store.commit('setAdvancedSearchInput', this.advancedSearchInput);
      localStorage.advancedSearchInput = JSON.stringify(this.advancedSearchInput);
      console.log(`saving advancedSearchInput: ${this.advancedSearchInput}`);
      for (const rule of this.advancedSearchInput) {
        if (this.hasNull([rule.type, rule.bool, rule.field])) continue;
        const bool = rule.bool;
        const boolKey = getKeyNameByKeyValue(BOOLS, bool);
        const type = rule.type;
        const typeKey = getKeyNameByKeyValue(TYPES, type);
        const fieldKey = getKeyNameByKeyValue(FIELDS, rule.field);
        let toPush = {[typeKey]: {}};
        let typeObj = toPush[typeKey];
        // types: match, range, exists
        if (type === TYPES.MATCH) {
          if (this.hasNull([rule.match]) || rule.match.length === 0) continue;
          if (rule.field === FIELDS.VENUE) {
            toPush = {
              "nested": {
                "path": "venue",
                "query": {
                  "bool": {
                    "must": [{
                      "match": {"venue.raw": rule.match}
                    }]
                  }
                }
              }
            };
          } else if (rule.field === FIELDS.AUTHORS) {
            toPush = {
              "nested": {
                "path": "authors",
                "query": {
                  "bool": {
                    "must": [{
                      "match": {"authors.name": rule.match}
                    }]
                  }
                }
              }

            };
          } else {
            typeObj[fieldKey] = rule.match;
          }
        } else if (type === TYPES.RANGE) {
          if (this.hasNull([rule.range, rule.range.op, rule.range.value]) || rule.range.value === undefined) continue;
          const opKey = getKeyNameByKeyValue(OPS, rule.range.op);
          typeObj[fieldKey] = {};
          typeObj[fieldKey][opKey] = rule.range.value;
        } else if (type === TYPES.EXISTS) {
          typeObj['field'] = fieldKey;
        } else {
          console.warn('unexpected rule type!'.toUpperCase());
        }
        console.log(toPush);
        bools[boolKey].push(toPush);
      }
      console.log(bools);
      this.$http.post(
        'http://119.3.223.135:9200/cspaper/_search',
        {
          "query": {
            'bool': bools
          },
          'size': HIT_SIZE
        }
      ).then(response => {
        this.articleHits = [];
        // this.totalCount = Math.min(response.data.hits.total.value, HIT_SIZE);
        this.totalCount = response.data.hits.total.value;
        for (const hit of response.data.hits.hits) {
          for (const author of hit._source.authors) {
            if (!author.name) continue;
            author.name = this.formatAuthor(author.name);
          }
          hit._source.title = this.formatTitle(hit._source.title);
          this.updateRecommendationInfo(hit._source.id);
          this.articleHits.push(hit);
        }
        this.search_response_data = response.data;
        this.$forceUpdate();
        this.hasLoaded = true;
        console.log("ARTICLES FETCHED");
      });
    },
    addRule() {
      this.advancedSearchInput.push({
        bool: null, // MUST MUST_NOT SHOULD
        type: null, // MATCH(field, match), RANGE(field, range{op, value}), EXISTS(field)
        field: null, // MATCH: title, author, abstract, venue; RANGE: n_citation, year??; EXIST: ALL
        match: null, // string
        range: {
          op: null, // >= <=
          value: null, // number
        }
      });
    },
    delRule(rule) {
      let index = this.advancedSearchInput.indexOf(rule);
      if (index !== -1) {
        this.advancedSearchInput.splice(index, 1);
      }
    },
    hasNull(list) {
      for (const listElement of list) {
        if (listElement === null) {
          return true;
        }
      }
      return false;
    },
    loadQRCode(result) {
      console.log(result.articlePageUrl);
      let elem = document.getElementById(result.articlePageUrl);
      console.log(elem);
      try {
        QRCode.toCanvas(elem, result.articlePageUrl, {
          margin: 0,
        }, function (error) {
          if (error) console.error(error);
        });
      } catch (e) {
        console.log(e);
      }
      result.hasLoadedQRCode = true;
      console.log("LOAD END");
    },
    isArray: (something) => {
      return Object.prototype.toString.call(something) === '[object Array]';
    },
  },
  mounted() {
    let storedSearchInput = this.$store.state.searchInput.length > 0
      ? this.$store.state.searchInput
      : (localStorage.searchInput ? localStorage.searchInput : '');
    let defaultRule = {
      bool: null, // MUST MUST_NOT SHOULD
      type: null, // MATCH(field, match), RANGE(field, range{op, value}), EXISTS(field)
      field: null, // MATCH: title, author, abstract, venue; RANGE: n_citation, year??; EXIST: ALL
      match: null, // string
      range: {
        op: null, // >= <=
        value: null, // number
      }
    };
    let storedAdvancedSearchInput = (localStorage.advancedSearchInput && this.isArray(JSON.parse(localStorage.advancedSearchInput)))
      ? JSON.parse(localStorage.advancedSearchInput)
      : [defaultRule];
    console.log(`STORED: ${storedSearchInput}`);
    console.log(storedAdvancedSearchInput);
    this.searchInput = storedSearchInput;
    this.advancedSearchInput = storedAdvancedSearchInput;
    if (storedAdvancedSearchInput.length !== 0 && JSON.stringify(storedAdvancedSearchInput) !== JSON.stringify([defaultRule])) {
      this.activeSearchTabs = ['1'];
      this.advancedSearch();
    } else {
      this.search();
    }
  },
  created() {
    const component = this;
    this.handler = function (e) {
      component.$emit('keyup', e);
    };
    window.addEventListener('keyup', this.handler);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handler);
  },
};
</script>

<style scoped>
.n-result {
  font-size: 13px;
  font-weight: 400;
  flex: 1 2;
  margin: auto 5px;
}

/deep/ .pagination .el-pagination {
  flex: 2;
}

/deep/ .el-button--primary {
  margin-top: 5px;
  padding: 12px 30px;
  color: #FFF;
  border-color: #409EFF;
  background-color: #409EFF;
}

/deep/ .el-dialog__header {
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  height: 30px;
  padding: 20px 20px 10px;
  color: white;
  background-color: #00a39e;
}

/deep/ .el-dialog__title {
  font-size: 18px;
  line-height: 24px;
  color: white !important;
}

/deep/ .el-dialog__footer {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px 0px 0px 0px;
  text-align: right;
}

/deep/ .el-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
}

.letter-body {
  margin-top: 2%;
  margin-right: 5%;
  margin-left: 5%;
}

.letter-send-box {
  font-size: larger;
  font-weight: bolder;
  margin-top: 3%;
  margin-bottom: 3%;
}

.letter-btn-box {
  margin-top: 5%;
  text-align: right;
}

.pagination {
  display: flex;
  float: bottom;
  justify-content: center;
}

.resultTitle {
  font-size: 18px;
  margin-bottom: 10px;
  color: black;
}

.advancedSearchInfo {
  /*display: flex;*/
  /*height: 47px;*/
  /*font-size: 20px;*/
  /*width: 250px;*/
  flex: 1;
  margin: 10px 20px;
  padding: 10px;
  background-color: white;
  box-shadow: 4px 6px 10px rgba(0, 0, 0, .10), 0 0 6px rgba(0, 0, 0, .05);
}

.advancedSearch {
  display: flex;
}

#search {
  background-color: #f4f4f4;
}

.rule {
  margin: 10px 20px;
  padding: 10px;
  background-color: white;
  box-shadow: 4px 6px 10px rgba(0, 0, 0, .10), 0 0 6px rgba(0, 0, 0, .05);
}

.rules {
  display: flex;
  flex-direction: column;
  width: 740px;
}

/deep/ .rules .el-select {
  width: 100px;
}

/deep/ .rules .el-input {
  /*width: 150px;*/
}

/deep/ .advancedSearchForm.el-collapse {
  border: none;
}

/deep/ .advancedSearchForm .el-collapse-item__header {
  justify-content: left;
  margin: 0 20px;
  border: none;
  background-color: #f4f4f4;
}

/deep/ .advancedSearchForm .el-collapse-item__arrow {
  margin-left: 5px;
}


/deep/ .advancedSearchForm .el-collapse-item__wrap {
  border: none;
  background-color: #f4f4f4;
}

.advancedSearchForm {
  flex: 1;
  /*width: 1100px;*/
  /*box-shadow: 4px 6px 10px rgba(0, 0, 0, .20), 0 0 6px rgba(0, 0, 0, .10);*/
  /*margin: 20px 20px 0;*/
}

/deep/ .advancedSearchForm .el-collapse-item__content {
  display: flex;
  align-items: flex-start;
}

/deep/ .el-tabs__item {
  /*width: ;*/
}

/deep/ .el-tabs__header {
  margin: 0 20px;
}

/deep/ .el-radio__input.is-checked + .el-radio__label {
  color: black;
}

/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: black;
}

/deep/ .el-checkbox__label {
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/deep/ .el-radio {
  width: 40%;
  margin-right: 5px;
  padding: 5px 0;
  color: rgba(0, 0, 0, 0.5);
}

/deep/ .el-checkbox {
  display: inline-flex;
  align-items: center;
  margin-right: 5px;
  padding: 5px 0;
  color: rgba(0, 0, 0, 0.5);
}

.abstract {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.shareBtn {
  margin-left: 10px;
}

/deep/ .el-popover.qrcodePopover {
  display: flex;
  justify-content: center;
}

.search {
  display: flex;
  flex-direction: column;
}

.searchBar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 10% 10px;
  /*border-bottom: 1px solid #ddd;*/
}

.searchInput {
  width: 700px;
  margin: 10px 20px;
  box-shadow: 4px 6px 10px rgba(0, 0, 0, .20), 0 0 6px rgba(0, 0, 0, .10);
}

/deep/ .advancedSearchForm .el-collapse-item__content {
  padding: unset;
}

.searchSwitch {
  justify-content: center;
  width: 200px;
  margin-left: 30px;
  transform: scale(1.5);
}

.below-searchbar {
  padding: 0px 10%;
}

.tab {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
}

.filterAndSort {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 20px;
  padding: 30px;
  background-color: white;
  box-shadow: 4px 6px 10px rgba(0, 0, 0, .20), 0 0 6px rgba(0, 0, 0, .10);
}

.filterAndSortTitle {
  font-size: 20px;
  line-height: 55px;
}

.filter {
  display: flex;
  flex-direction: column;
  /*padding-bottom: 10px;*/
  /*border-bottom: lightgrey solid 1px;*/
}

.sort {
  display: flex;
  flex-wrap: wrap;
  /*padding-bottom: 10px;*/
  /*border-bottom: lightgrey solid 1px;*/
}

/deep/ .el-collapse-item__header {
  font-size: 16px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.result-card {
  width: 900px;
  margin: auto;
  text-align: left;
}

.card-title {
  font: bold large none;
}

.downFrame {
  border-bottom: lightgrey solid 1px;
}

.downFrameContent {
  padding: 30px;
}

.results {
  /*height: 300px;*/
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 65%;
  margin: 20px;
  border-radius: 2px;
  background: white;
  box-shadow: 4px 6px 10px rgba(0, 0, 0, .20), 0 0 6px rgba(0, 0, 0, .10)
}

.articleType {
  width: 60px;
  padding: 5px;
  text-align: center;
  color: #007478;
  border-radius: 2px;
  background: #C5E8E5;
}

/deep/ .searchInput .el-input__inner {
  font-size: 16px;
  height: 50px;
}

/deep/ .el-switch__core {
  background-color: var(--switch_bg_color);
  --switch_bg_color: rgba(0, 0, 0, 0.4);
}

/deep/ .el-switch.is-checked .el-switch__core {
  border-color: transparent;
  background-color: var(--switch_bg_color);
}

/deep/ .el-switch__label.is-active {
  color: black;
}

/deep/ .el-switch__label {
  color: darkgrey;
}
</style>

<style>
.el-popover.qrcodePopover {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.textInQRCodePopover {
  text-align: center;
}

canvas {
  margin: 10px auto;
}
</style>
