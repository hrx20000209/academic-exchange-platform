<template>

    <div class="box">
         <div class="search-box">

            <input type="text" class="search-left" placeholder="请输入要搜索的内容"><input type="button" class="search-right" value="搜 索" icon="el-icon-search">

         </div>
</div>

</template>

<script>
export default {
  data() {
    return {
    }
  }
};
</script>



<style  scoped>

 .box{
     text-align:center;
    //  font-size: 0;
 }
 .search-box{
     margin:0 auto;
     width: 750px;
 }
.search-left{
    text-indent: 20px;
     width:80%;
    height:50px;
    border:rgb(137, 233, 217) 1px solid;
    // float:left;
    margin-top:20px;
    border-bottom-left-radius:25px;
    border-top-left-radius:25px;
    outline:none;
    // text-align:20px ;
}
.search-right{
    width:19%;
    height:50px;
    background:rgb(137, 233, 217);
    color: #fff;
    border:none;
    margin-top:20px;
    border-bottom-right-radius:25px;
    border-top-right-radius:25px;
    outline:none;
}


</style>

