<template>
  <div id="app">
    <router-view :key="$route.path"/>
  </div>

</template>

<script>
export default {
  name: 'App',
  watch: {
   '$route':function(to,from){
     if (to.path === '/search' && this.$store.state.searchInput.length === 0 && localStorage.searchInput.length === 0) {
       this.$store.commit('setAdvancedSearchInput', [])
       localStorage.removeItem('advancedSearchInput')
     }
      window.scrollTo(0,0)
   }
  }

}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
