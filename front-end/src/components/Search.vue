<template>
  <div id="search">
    <div class="searchbar">
      <el-autocomplete v-model="searchInput" placeholder="请输入搜索关键词"
                       :fetch-suggestions="querySearch" @select="search"></el-autocomplete>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div class="result" style="margin: auto">
      <ul>
        <template v-for="result in articles">
          <el-card
            shadow="always"
            :body-style="{ padding: '20px' }"
            :key="result.value"
            class="result-card"
          >
            <div slot="header" class="clearfix">
              <span class="card-title"> {{ result.value }} </span>
            </div>
            <div>
              {{ result.abstract }}</div>
          </el-card>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      searchInput: "", // TODO multiple word search
      articles: [],
      hotArticles: [
        {
          value: "HOT1",
          author: "Tom",
          abstract:
            "this article describes HOT",
        },
        {
          value: "HOT AI",
          author: "Tom",
          abstract: "this article describes VERY HOT AI",
        },
        {
          value: "HOT VGG",
          author: "Tom",
          abstract: "this article describes HOT VGG",
        },
      ],
      results: [],
    };
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
          value: "essay1",
          author: "Tom",
          abstract:
            "this article describes blablablablablablablablablablablabla",
        },
        {
          value: "AI is good",
          author: "Tom",
          abstract: "this article describes artificial intelligence",
        },
        {
          value: "AI is bad",
          author: "Tom",
          abstract: "this article describes artificial intelligence",
        },
        {
          value: "VGG",
          author: "Tom",
          abstract: "this article describes VGG",
        },
        {
          value: "HOT1",
          author: "Tom",
          abstract:
            "this article describes HOT",
        },
        {
          value: "HOT AI",
          author: "Tom",
          abstract: "this article describes VERY HOT AI",
        },
        {
          value: "HOT VGG",
          author: "Tom",
          abstract: "this article describes HOT VGG",
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
  margin: 20px auto auto;
}

.card-title {
  font: bold large none;
}

#search {
  margin: auto;
}
</style>
