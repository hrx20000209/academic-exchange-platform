<template>
    <div id="app">
    <router-view />
  </div>

</template>

<script>
export default {
  name: 'App',
  watch: {
   '$route':function(to,from){
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
