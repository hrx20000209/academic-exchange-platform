<template>
  <div class="search" @keyup="keyboardEvent" tabindex="-1">
    <!--    <div class="searchbar">-->
    <!--      <el-autocomplete class="searchInput" v-model="searchInput" placeholder="请输入搜索关键词"-->
    <!--                       :fetch-suggestions="querySearch" @select="search" @keyup.enter="search"></el-autocomplete>-->
    <!--      <el-button class="searchBtn" type="primary" @click="search">搜索</el-button>-->
    <!--    </div>-->
    <div class="searchBar">
      <el-input placeholder="请输入关键词，按回车搜索" v-model="searchInput" id="mySearchInput" ref="searchInput"
                @keyup.enter.native="search"
                @focus="searchInputHasFocus = true"
                @blur="searchInputHasFocus = false">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="below-searchbar">
      <div class="filterAndSort">
        <div class="sort">
          <el-radio-group v-model="sort">
            <el-radio label="relevance">相关性</el-radio>
            <el-radio label="time">发表时间</el-radio>
            <el-radio label="citation">引用量</el-radio>
          </el-radio-group>
        </div>
        <div class="filter">
          <h4 style="padding: 5px 0; font-family: 'PingFang SC',serif">按年份筛选</h4>
          <el-checkbox v-for="year in years" :key="year.value" v-model="year.isSelected"
                       :label="year.value"></el-checkbox>
        </div>
        <div class="filter">
          <h4 style="padding: 5px 0; font-family: 'PingFang SC',serif">按期刊筛选</h4>
          <el-checkbox v-for="venue in venues" :key="venue.value" v-model="venue.isSelected"
                       :label="venue.value"></el-checkbox>
        </div>
      </div>
      <div class="result">
        <template v-for="result in results_to_show">
          <div class="downFrame" :key="result.id">
            <div class="downFrameContent">
              <div style="margin-bottom: 10px;font-size: 18px">{{ result.title }}</div>
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
              </div>
              <div style="margin-bottom: 10px;font-size: 16px">
                {{ result.abstract }}
              </div>
              <div class="articleCitationCnt" style="color: darkgray;font-size: 15px;margin-bottom: 10px">
                {{ result.n_citation }} citations
              </div>
              <div style="height: 30px">
                <div style="float: left">
                  <el-button plain>访问全文</el-button>
                </div>
                <div style="float: right;text-align: right">
                  <el-button>推荐</el-button>
                  <el-button>关注</el-button>
                  <el-button>分享</el-button>
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
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      searchInput: "machine learning",
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
      hits: [],
      // years and venues are watching hits
      // their value may be changed by checkboxes so they are not declared as computed
      years: [],
      venues: [],
      sort: "relevance",
      formatTitle: title => {
        const words = title.trim().toLowerCase().split(' ');
        const ignore_words = ['of', 'with', 'at', 'from', 'into', 'during', 'to', 'in', 'for', 'on', 'by', 'about', 'through',
          "and", "or", "the", "a"];
        for (let i = 0; i < words.length; i++) {
          if (ignore_words.indexOf(words[i]) > -1) {
            continue
          }
          words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
        }
        return words.join(' ');
      },
      formatAuthor: title => {
        const words = title.trim().toLowerCase().split(' ');
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
        }
        return words.join(' ')
      },
      // cmp func for this.results_to_show
      cmpCitation: (a, b) => {
        return b.n_citation - a.n_citation
      },
      cmpRelevance: (a, b) => {
        return b._score - a._score
      },
      cmpTime: (a, b) => {
        return b.year - a.year
      }
    };
  },
  computed: {
    results_to_show: function () {
      let hits = this.hits
      let ret = []
      for (const hit of hits) {
        let y = hit._source.year
        let v = hit._source.venue.raw
        let match_year = false
        let match_venue = false
        for (const year of this.years) {
          if (year.isSelected && (year.value === y)) {
            match_year = true
          }
        }
        for (const venue of this.venues) {
          if (venue.isSelected && (venue.value === v)) {
            match_venue = true
          }
        }
        if (match_venue && match_year) {
          hit._source._score = hit._score
          ret.push(hit._source)
        }
      }
      switch (this.sort) {
        case "relevance":
          ret.sort(this.cmpRelevance);
          break;
        case "time":
          ret.sort(this.cmpTime);
          break;
        default:
          ret.sort(this.cmpCitation)
      }
      return ret
    },
  },
  watch: {
    hits: function () {
      // update this.years
      let ys = new Set()
      for (const hit of this.hits) {
        ys.add(hit._source.year)
      }
      let years = []
      for (const y of ys) {
        years.push({
          value: y,
          isSelected: true,
        })
      }
      this.years = years.sort((a, b) => {
        return b.value - a.value
      })

      // update this.venues
      let vs = new Set()
      for (const hit of this.hits) {
        vs.add(hit._source.venue.raw)
      }
      let venues = []
      for (const v of vs) {
        venues.push({
          value: v,
          isSelected: true,
        })
      }
      this.venues = venues.sort((a, b) => {
        return b.value < a.value ? 1 : -1
      })
    },
  },
  methods: {
    notifySlashWithThrottle: _.throttle(function () {
      console.log("NOTIFYING SLASH SHORTCUT")
      this.notifyInfo("按”/“即可跳到搜索框")
    }, 30000, {
      trailing: false
    }),
    keyboardEvent(e) {
      console.log(e.code)
      if (e.location !== 0 || e.ctrlKey || e.altKey) return // 屏蔽非 DOM_KEY_LOCATION_STANDARD 键盘事件
      if (e.code === "Slash") {
        this.$refs.searchInput.focus()
        console.log('FOCUS')
      } else if (!this.searchInputHasFocus) {
        this.notifySlashWithThrottle()
      }
    },
    notifyInfo(str) {
      this.$notify.info({
        title: "提示",
        message: str,
        duration: 3000,
      })
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
        this.notifyInfo("关键词不能为空")
        return
      }
      console.log("searching: \n\t" + this.searchInput);
      // TODO 高级搜索
      // TODO 分页
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
        this.hits = []
        for (const hit of response.data.hits.hits) {
          for (const author of hit._source.authors) {
            author.name = this.formatAuthor(author.name)
          }
          hit._source.title = this.formatTitle(hit._source.title)
          this.hits.push(hit)
        }
        this.search_response_data = response.data
        // console.log("response: \n\t")
        // console.log(this.search_response_data)
      })
    },
  },
  mounted() {
    this.search()
  },
  created() {
    const component = this;
    this.handler = function (e) {
      component.$emit('keyup', e);
    }
    window.addEventListener('keyup', this.handler);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handler);
  },
};
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
}

.searchBar {
  margin: 30px auto;
  width: 600px;
  box-shadow: 4px 6px 10px rgba(0, 0, 0, .20), 0 0 6px rgba(0, 0, 0, .10)
}

.below-searchbar {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.filterAndSort {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 20px;
  padding: 30px;
  box-shadow: 4px 6px 10px rgba(0, 0, 0, .20), 0 0 6px rgba(0, 0, 0, .10)

}

.filter {
  display: flex;
  flex-direction: column;
  border-bottom: lightgrey solid 1px;
  padding: 3% 0;
}

.sort {
  /*border-bottom: lightgrey solid 1px;*/
  /*padding: 3% 0;*/
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
  width: 50%;
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

/deep/ .el-input__inner {
  height: 60px;
  font-size: 16px;
}
</style>
