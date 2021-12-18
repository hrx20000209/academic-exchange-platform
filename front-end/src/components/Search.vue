<template>
  <div id="search" @keyup="keyboardEvent" tabindex="-1">
    <nav_without_search-box></nav_without_search-box>
    <!--    <div class="searchbar">-->
    <!--      <el-autocomplete class="searchInput" v-model="searchInput" placeholder="请输入搜索关键词"-->
    <!--                       :fetch-suggestions="querySearch" @select="search" @keyup.enter="search"></el-autocomplete>-->
    <!--      <el-button class="searchBtn" type="primary" @click="search">搜索</el-button>-->
    <!--    </div>-->
    <div class="searchBar">
      <el-input placeholder="请输入关键词，按回车搜索" v-model="searchInput" ref="searchInput" class="searchInput"
                @keyup.enter.native="search"
                @focus="searchInputHasFocus = true"
                @blur="searchInputHasFocus = false">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <div class="advancedSearch">
        <el-collapse v-model="activeSearchTabs" class="advancedSearchForm">
          <el-collapse-item title="高级搜索" name="1">
            <!--          TODO 高级搜索使用说明-->
            <el-form class="rules">
              <el-form-item
                class="rule"
                v-for="(rule, index) in advancedSearchInput"
                :key="`规则${index}`">
                <el-select v-model="rule.bool" placeholder="布尔">
                  <el-option v-for="bool in BOOLS" :key="bool" :label="bool"
                             :value="bool"></el-option>
                </el-select>
                <el-select v-model="rule.field" placeholder="字段">
                  <el-option v-for="field in Object.keys(FIELD_TYPE)"
                             :key="field"
                             :label="field"
                             :value="field"
                  >
                    <!--                           TODO @change: check if type still fits-->

                  </el-option>
                </el-select>
                <el-select v-model="rule.type" placeholder="规则种类" no-data-text="请先选字段">
                  <el-option v-for="type in FIELD_TYPE[rule.field]" :key="type" :label="type"
                             :value="type"></el-option>
                </el-select>
                <el-input v-model="rule.match" v-if="rule.type === TYPES.MATCH" placeholder="匹配文字"></el-input>
                <div v-if="rule.type === TYPES.RANGE">
                  <el-select v-model="rule.range.op">
                    <el-option v-for="op in OPS" :key="op" :label="op"
                               :value="op"></el-option>
                  </el-select>
                  <el-input-number v-model="rule.range.value"></el-input-number>
                </div>
                <el-button @click="delRule(rule)">删除</el-button>
              </el-form-item>
              <el-form-item class="rule">
                <el-button @click="advancedSearch">提交</el-button>
                <el-button @click="addRule">新增规则</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-popover
          placement="right"
          title="标题"
          width="300px"
          trigger="manual"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          v-model="showAdvancedSearchInfo"
          v-if="isAdvancedSearch"
        >
          <div class="advancedSearchInfo" slot="reference" v-if="isAdvancedSearch">
            <i class="el-icon-info" style="margin: auto"
               @click="showAdvancedSearchInfo = !showAdvancedSearchInfo"></i>
          </div>
        </el-popover>
      </div>
      <!--      <el-switch v-model="searching_paper" class="searchSwitch"-->
      <!--                 active-text="文献"-->
      <!--                 inactive-text="作者">-->
      <!--      </el-switch>-->
    </div>
    <div class="below-searchbar">
      <!--      TODO 改用做好的tab -->
      <el-tabs v-model="activeTab" @tab-click="search">
        <el-tab-pane label="文 献" name="article">
          <div class="tab">
            <div class="filterAndSort">
              <el-collapse v-model="activeFilterAndSortTabsInArticle">
                <el-collapse-item title="排序方式" name="sort">
                  <div>
                    <!--                    <span class="filterAndSortTitle">排序方式</span>-->
                    <el-radio-group class="sort" v-model="sort">
                      <el-radio label="relevance">相关性</el-radio>
                      <el-radio label="time">年份</el-radio>
                      <el-radio label="citation">引用量</el-radio>
                      <el-radio label="citation">浏览量</el-radio>
                      <!--            TODO 新增排序属性-->
                      <!--            TODO 改蓝色字体样式-->
                    </el-radio-group>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="按年份筛选" name="filterByYears">
                  <div>
                    <!--                    <span class="filterAndSortTitle">按年份筛选</span>-->
                    <div class="filter">
                      <el-checkbox v-for="year in years" :key="year.value" v-model="year.isSelected"
                                   :label="year.value"></el-checkbox>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="按期刊筛选" name="filterByVenues">
                  <div>
                    <!--                    <span class="filterAndSortTitle">按期刊筛选</span>-->
                    <div class="filter">
                      <el-checkbox v-for="venue in venues" :key="venue.value" v-model="venue.isSelected"
                                   :label="venue.value"></el-checkbox>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div class="result">
              <template v-for="result in article_results_to_show">
                <div class="downFrame" :key="result.id">
                  <div class="downFrameContent">
                    <div @click="goToArticlePage(result.id)">
                      <el-link class="resultTitle">{{ result.title }}</el-link>
                    </div>

                    <div style="margin-bottom: 10px;font-size: 15px;color:darkgrey;">
                      <span class="articleType">Article</span>
                      <span class="articleYear">{{ result.year }}</span>
                      <span class="articleVenue">{{ result.venue.raw }}</span>
                    </div>
                    <div style="margin-bottom: 10px">
                <span v-for="author in result.authors" :key="author.id">
                  {{ author.name }}
                  <span v-if="result.authors.indexOf(author) !== result.authors.length-1"> · </span>
                </span>
                      <!--                      TODO citation_by_year map-->
                    </div>
                    <div class="abstract" style="margin-bottom: 10px;font-size: 16px">
                      {{ result.abstract }}
                    </div>
                    <div class="articleCitationCnt" style="color: darkgray;font-size: 15px;margin-bottom: 10px">
                      {{ result.n_citation }} citations
                    </div>
                    <div style="height: 30px">
                      <div style="float: left" v-if="result.url !== undefined">
                        <el-button plain @click="goToUrl(result.url)">访问全文</el-button>
                      </div>
                      <div style="float: right;text-align: right">
                        <el-button>推荐</el-button>
                        <el-popover
                          popper-class="qrcodePopover"
                          placement="top-start"
                          trigger="click"
                          :key="result.articlePageUrl+result.hasLoadedQRCode"
                          @show="loadQRCode(result)">
                          <el-link
                            class="textInQRCodePopover"
                            @click="copyUrl(result.articlePageUrl)"
                            :underline="false">点击此处复制链接
                          </el-link>
                          <!-- TODO 保存图片按钮-->
                          <h4 class="textInQRCodePopover">或分享二维码</h4>
                          <canvas :id="result.articlePageUrl"></canvas>
                          <el-button
                            slot="reference"
                            class="shareBtn">
                            分享
                          </el-button>
                        </el-popover>
                        <!--TODO 按钮：推荐、关注、分享-->
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="作 者" name="author">
          <div class="tab">
            <div class="filterAndSort">
              <div>
                <span class="filterAndSortTitle">排序方式</span>
                <!--                TODO change style to article's-->
                <el-radio-group class="sort" v-model="sort">
                  <el-radio label="relevance">相关性</el-radio>
                  <el-radio label="pub">发表量</el-radio>
                  <el-radio label="citation">引用量</el-radio>
                  <el-radio label="citation">浏览量</el-radio>
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
            <div class="result">
              <template v-for="result in author_results_to_show">
                <div class="downFrame" :key="result.id">
                  <div class="downFrameContent">
                    <div style="margin-bottom: 10px;font-size: 18px">{{ result.name }}</div>
                    <!--                    TODO 跳转 学者主页和论文主页-->
                    <div style="margin-bottom: 10px">
                      <span v-for="org in result.orgs" :key="org.id">
                        {{ org.name }}
                      <span v-if="result.orgs.indexOf(org) !== result.orgs.length-1"> · </span>
                      </span>
                    </div>
                    <div class="articleCitationCnt" style="color: darkgray;font-size: 15px;margin-bottom: 10px">
                      {{ result.n_citation }} citations · {{ result.n_pubs }} publications
                    </div>
                    <div class="articleCitationCnt" style="color: darkgray;font-size: 15px;margin-bottom: 10px">

                    </div>
                    <div style="height: 30px">
                      <div style="float: left">
                        <el-button plain>关注</el-button>
                        <el-button plain>私信</el-button>
                        <!--                        TODO author 其他字段-->
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import _ from 'lodash';
import Nav_without_searchBox from "./nav_without_searchBox";

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

export default {
  name: "search",
  components: {Nav_without_searchBox},
  data() {
    return {
      showAdvancedSearchInfo: false,
      TYPES: TYPES,
      // BOOLS: BOOLS,
      activeSearchTabs: [],
      BOOLS: BOOLS,
      FIELD_TYPE: {
        [FIELDS.TITLE]: [TYPES.MATCH, TYPES.EXISTS],
        [FIELDS.AUTHORS]: [TYPES.MATCH, TYPES.EXISTS], // FIXME ARRAY
        [FIELDS.ABSTRACT]: [TYPES.MATCH, TYPES.EXISTS],
        [FIELDS.VENUE]: [TYPES.MATCH, TYPES.EXISTS],
        [FIELDS.URL]: [TYPES.EXISTS], // FIXME TERM query?
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
      articleHits: [],
      authorHits: [],
      // years and venues are watching articleHits
      // their value may be changed by checkboxes so they are not declared as computed
      years: [],
      venues: [],
      orgs: [],
      advancedSearchInput: [{
        bool: BOOLS.MUST, // MUST MUST_NOT SHOULD
        type: TYPES.MATCH, // MATCH(field, match), RANGE(field, range{op, value}), EXISTS(field)
        field: FIELDS.VENUE, // MATCH: title, author, abstract, venue; RANGE: n_citation, year??; EXIST: ALL
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
    isAdvancedSearch: function () {
      return this.activeSearchTabs.indexOf("1") > -1;
    },
    article_results_to_show: function () {
      let hits = this.articleHits;
      let ret = [];
      if (this.activeTab !== "article")
        return ret;

      // filter
      for (const hit of hits) {
        let y = hit._source.year;
        let v = hit._source.venue.raw;
        let match_year = false;
        let match_venue = false;
        for (const year of this.years) {
          if (year.isSelected && (year.value === y)) {
            match_year = true;
          }
        }
        for (const venue of this.venues) {
          if (venue.isSelected && (venue.value === v)) {
            match_venue = true;
          }
        }
        if (match_venue && match_year) {
          hit._source._score = hit._score;
          hit._source.hasLoadedQRCode = false;
          hit._source.articlePageUrl = `http://139.9.132.83/article/${hit._source.id}`;
          ret.push(hit._source);
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
      return ret;
    },
    author_results_to_show: function () {
      let that = this;
      let hits = this.authorHits;
      let ret = [];
      if (this.activeTab !== "author") {
        console.log("author_results_to_show NOT COMPUTED");
        return ret;
      }

      // filter
      let orgsMustHave = [];
      console.log(this.orgs);
      for (const org of this.orgs) {
        orgsMustHave.push(org.value);
      }
      for (const hit of hits) {
        let authorOrgs = [];
        for (const authorOrgObj of hit._source.orgs) {
          authorOrgs.push(authorOrgObj.name);
        }
        let intersection = authorOrgs.filter(function (o) {
          console.log("INDEX OF: " + orgsMustHave.indexOf(o));
          return orgsMustHave.indexOf(o) > -1;
        });
        // TODO some has no org
        console.log(authorOrgs);
        console.log(orgsMustHave);
        console.log(intersection);
        if (intersection.length > 0) {
          hit._source._score = hit._score;
          ret.push(hit._source);
          console.log("RET:");
          console.log(ret);
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
      console.log(ret);
      return ret;
    },
  },
  watch: {
    articleHits: function () {
      if (this.activeTab !== "article")
        return;

      // update this.years
      let ys = new Set();
      for (const hit of this.articleHits) {
        ys.add(hit._source.year);
      }
      let years = [];
      for (const y of ys) {
        years.push({
          value: y,
          isSelected: true,
        });
      }
      this.years = years.sort((a, b) => {
        return b.value - a.value;
      });

      // update this.venues
      let vs = new Set();
      for (const hit of this.articleHits) {
        vs.add(hit._source.venue.raw);
      }
      let venues = [];
      for (const v of vs) {
        venues.push({
          value: v,
          isSelected: true,
        });
      }
      this.venues = venues.sort((a, b) => {
        return b.value < a.value ? 1 : -1;
      });
    },
    authorHits: function () {
      if (this.activeTab !== "author")
        return;

      // update this.orgs
      let os = new Set();
      for (const hit of this.authorHits) {
        for (const org of hit._source.orgs) {
          os.add(org.name);
        }
      }
      let orgs = [];
      for (const o of os) {
        orgs.push({
          value: o,
          isSelected: true,
        });
      }
      this.orgs = orgs.sort((a, b) => {
        return b.value - a.value;
      });
    },
    isAdvancedSearch: function () {
      if (!this.isAdvancedSearch) {
        this.showAdvancedSearchInfo = false;
      }
    }
  },
  methods: {
    goToArticlePage(id) {
      let router = '/article/' + id + '/overviews';
      this.$router.push(router);
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
      console.log("NOTIFYING SLASH SHORTCUT");
      this.notifyInfo("按”/“即可跳到搜索框");
    }, 30000, {
      trailing: false
    }),
    keyboardEvent(e) {
      if (e.location !== 0 || e.ctrlKey || e.altKey) return; // 屏蔽非 DOM_KEY_LOCATION_STANDARD 键盘事件
      if (e.code === "Slash") {
        this.$refs.searchInput.focus();
        console.log('FOCUS');
      } else if (!this.searchInputHasFocus) {
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
      if (this.searchInput.length === 0) {
        this.notifyInfo("关键词不能为空");
        return;
      }
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
          }
        }
      ).then(response => {
        this.authorHits = [];
        for (const hit of response.data.hits.hits) {
          for (const org of hit._source.orgs) {
            org.name = this.formatAuthor(org.name);
          }
          hit._source.name = this.formatTitle(hit._source.name);
          this.authorHits.push(hit);
        }
        this.search_response_data = response.data;
        // console.log("response: \n\t")
        // console.log(this.search_response_data)
        console.log("AUTHORS FETCHED");
      });
    },
    searchArticle() {
      // TODO 分页
      // TODO 未搜索到结果页面
      this.$http.post(
        'http://119.3.223.135:9200/cspaper/_search',
        {
          "query": {
            "match": {
              "title": this.searchInput
            }
          }
        }
      ).then(response => {
        this.articleHits = [];
        for (const hit of response.data.hits.hits) {
          for (const author of hit._source.authors) {
            author.name = this.formatAuthor(author.name);
          }
          hit._source.title = this.formatTitle(hit._source.title);
          this.articleHits.push(hit);
        }
        this.search_response_data = response.data;
        // console.log("response: \n\t")
        // console.log(this.search_response_data)
        console.log("ARTICLES FETCHED");
      });
    },
    advancedSearch() {
      let bools = {
        must: [],
        must_not: [],
        should: [], // TODO implement OR
      };
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
            // TODO rule.field = ....raw?
          }
          typeObj[fieldKey] = rule.match;
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
          }
        }
      ).then(response => {
        this.articleHits = [];
        for (const hit of response.data.hits.hits) {
          for (const author of hit._source.authors) {
            author.name = this.formatAuthor(author.name);
          }
          hit._source.title = this.formatTitle(hit._source.title);
          this.articleHits.push(hit);
        }
        this.search_response_data = response.data;
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
    }
  },
  mounted() {
    let storedSearchInput = this.$store.state.searchInput;
    if (storedSearchInput.length !== 0) {
      this.searchInput = storedSearchInput;
    }
    this.search();
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
.resultTitle {
  margin-bottom: 10px;
  font-size: 18px;
  color: black;
}

.advancedSearchInfo {
  display: flex;
  height: 47px;
  font-size: 20px;
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
  box-shadow: 4px 6px 10px rgba(0, 0, 0, .10), 0 0 6px rgba(0, 0, 0, .05);
  background-color: white;
}

.rules {
  display: flex;
  flex-direction: column;
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
  border: none;
  margin: 0 20px;
  justify-content: left;
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
  width: 740px;
  /*box-shadow: 4px 6px 10px rgba(0, 0, 0, .20), 0 0 6px rgba(0, 0, 0, .10);*/
  /*margin: 20px 20px 0;*/
}

/deep/ .advancedSearchForm .el-collapse-item__wrap {
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
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/deep/ .el-radio {
  color: rgba(0, 0, 0, 0.5);
  width: 40%;
  margin-right: 5px;
  padding: 5px 0;
}

/deep/ .el-checkbox {
  color: rgba(0, 0, 0, 0.5);
  display: inline-flex;
  align-items: center;
  padding: 5px 0;
  margin-right: 5px;
}

.abstract {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
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
  padding: 50px 10% 30px;
  flex-direction: column;
  justify-content: space-between;
  /*border-bottom: 1px solid #ddd;*/
}

.searchInput {
  box-shadow: 4px 6px 10px rgba(0, 0, 0, .20), 0 0 6px rgba(0, 0, 0, .10);
  width: 700px;
  margin: 10px 20px;
}

/deep/ .advancedSearchForm .el-collapse-item__content {
  padding: unset;
}

.searchSwitch {
  width: 200px;
  justify-content: center;
  transform: scale(1.5);
  margin-left: 30px;
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
  box-shadow: 4px 6px 10px rgba(0, 0, 0, .20), 0 0 6px rgba(0, 0, 0, .10);
  background-color: white;
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
  text-align: left;
  margin: auto;
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

.result {
  /*height: 300px;*/
  width: 65%;
  background: white;
  border-radius: 2px;
  margin: 20px;
  box-shadow: 4px 6px 10px rgba(0, 0, 0, .20), 0 0 6px rgba(0, 0, 0, .10)
}

.articleType {
  padding: 5px;
  width: 60px;
  background: #C5E8E5;
  color: #007478;
  border-radius: 2px;
  text-align: center;
}

/deep/ .searchInput .el-input__inner {
  height: 50px;
  font-size: 16px;
}

/deep/ .el-switch__core {
  --switch_bg_color: rgba(0, 0, 0, 0.4);
  background-color: var(--switch_bg_color);
}

/deep/ .el-switch.is-checked .el-switch__core {
  background-color: var(--switch_bg_color);
  border-color: transparent;
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
  margin: auto;
}
</style>
