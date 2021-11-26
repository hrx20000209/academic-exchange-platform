<template>
  <div id="search" style="margin: auto">
    <div style="height: 40px"></div>
    <div class="searchbar">
      <el-autocomplete class="searchInput" v-model="searchInput" placeholder="请输入搜索关键词"
                       :fetch-suggestions="querySearch" @select="search" @keyup.enter="search"></el-autocomplete>
      <!--      <el-button class="searchBtn" type="primary" @click="search">搜索</el-button>-->
    </div>
    <span class="yearFilter" style="margin: auto">
      <el-checkbox v-model="year">2009</el-checkbox>
      <el-checkbox>2006</el-checkbox>
    </span>
    <div class="venueFilter" style="margin: 0 auto">
      <el-checkbox>CS</el-checkbox>
      <el-checkbox>AAAI</el-checkbox>
    </div>
    <div class="result" style="margin: auto">
        <template v-for="result in articles">
          <div class="downFrame" :key="result.id">
            <div class="downFrameContent">
              <div style="margin-bottom: 10px;font-size: 18px">{{ result.title }}</div>
              <div style="margin-bottom: 10px;font-size: 15px;color:darkgrey;">
                <span class="articleType">Article</span>
                <span class="articleYear">{{ result.year }}</span>
                <span class="articleVenue">{{ result.venue.raw }}</span>
              </div>
              <div style="margin-bottom: 10px;font-size: 16.5px">
                <span v-for="author in result.authors" :key="author.id">{{ author.name }} </span>
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
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      year: false,
      searchInput: "", // TODO multiple word search
      articles: [],
      hotArticles: [
        {
          value: "HOT1",
          author: "Tom",
          abstract:
            "this article describes HOT",
        }
      ],
      results: [],
    };
  },
  computed: {
    // results: function () {
    //   return this.results.filter((a) => {
    //     return a.year === "2009";
    //   })
    // }
  },
  methods: {
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
      console.log("search: ");
      console.log("\t" + this.searchInput);
      // send request
    },
    loadAll() {
      return [
        {
          id: "0166F4D5",
          title: "nonnegative matrix factorization and probabilistic latent semantic indexing equivalence chi square statistic and a hybrid method",
          year: "2006",
          url: "www.baidu.com",
          abstract: "111nonnegative matrix factorization and probabilistic latent semantic indexing equivalence chi square statistic and a hybrid methodnonnegative matrix factorization and probabilistic latent semantic indexing equivalence chi square statistic and a hybrid method",
          authors: [
            {
              id: "7E56C8FC",
              name: "chris ding"
            },
            {
              id: "86282321",
              name: "wei peng"
            },
            {
              id: "7E24EC84",
              name: "tao li"
            }
          ],
          venue: {
            id: "46A05BB0",
            raw: "AAAI"
          },
          n_citation: 4,
          reference: [
            "80A53AC1",
            "78E20C29",
            "77FC641C"
          ],
          citation_by_year: [
            {
              year: "2006",
              cnt: 2
            },
            {
              year: "2011",
              cnt: 2
            }
          ],
        },
        {
          id: "9166F4D3",
          title: "about AI",
          year: "2009",
          url: "www.baidu.com",
          abstract: "this is abstract",
          authors: [
            {
              id: "7E56C8FC",
              name: "TOM"
            },
            {
              id: "86282321",
              name: "PS"
            },
            {
              id: "7E24EC84",
              name: "JACK"
            }
          ],
          venue: {
            id: "46A05BB0",
            raw: "AAAI"
          },
          n_citation: 4,
          reference: [
            "80A53AC1",
            "78E20C29",
            "77FC641C"
          ],
          citation_by_year: [
            {
              year: "2006",
              cnt: 2
            },
            {
              year: "2011",
              cnt: 2
            }
          ],
        },
        {
          id: "66666",
          title: "Machine learning",
          year: "2009",
          url: "www.baidu.com",
          abstract: "this is abstract",
          authors: [
            {
              id: "7E56C8FC",
              name: "TOM"
            },
            {
              id: "86282321",
              name: "PS"
            },
            {
              id: "7E24EC84",
              name: "JACK"
            }
          ],
          venue: {
            id: "46A05BB0",
            raw: "AAAI"
          },
          n_citation: 4,
          reference: [
            "80A53AC1",
            "78E20C29",
            "77FC641C"
          ],
          citation_by_year: [
            {
              year: "2006",
              cnt: 2
            },
            {
              year: "2011",
              cnt: 2
            }
          ],
        },
      ]
    }
  },
  mounted() {
    this.articles = this.loadAll();
  }
};
</script>

<style scoped>
.filter {
  margin: 0 auto;
}

.searchInput {
  width: 500px;
  margin: auto;
}

.searchBtn {
  margin: 0 auto;
}

.searchbar {
  margin: 0 auto;
  display: flex;
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

#search {
  margin: auto;
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
  /*margin: auto;*/
  margin-left: 10%;
  /*margin-bottom: 30px;*/
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.articleType {
  padding: 5px;
  width: 60px;
  background: #C5E8E5;
  color: #007478;
  border-radius: 2px;
  text-align: center;
}
</style>
