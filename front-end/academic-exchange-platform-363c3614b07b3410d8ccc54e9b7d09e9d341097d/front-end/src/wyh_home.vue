<template>
  <div id="background">
    <nav_with_search-box></nav_with_search-box>
  </div>
</template>

<script>
import Nav_with_searchBox from "./components/nav_with_searchBox";
export default {
  name: "wyh_home",
  components: {Nav_with_searchBox},
  mounted() {
    localStorage.setItem('ifLogin',0)
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
#background{
}
</style>
