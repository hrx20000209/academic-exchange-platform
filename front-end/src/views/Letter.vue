<template>
  <div class="background">
    <nav_with_search-box></nav_with_search-box>
    <div class="body">
      <div class="middle-box">
        <div>私信</div>
      </div>
    </div>
  </div>
</template>

<script>
import nav_with_searchBox from "../components/nav_with_searchBox";
export default {
  name: "Letter",
  components: { nav_with_searchBox },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.background {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #ededed;
}

.body {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
}

.middle-box {
  background-color: white;
  width: 30%;
  padding: 2%;
}
</style>
