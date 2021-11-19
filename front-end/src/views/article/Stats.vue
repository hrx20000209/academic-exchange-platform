<template>
  <div class="grey">
    <div style="height: 20px"></div>
    <div class="statsFrame">
      <div class="upFrame">
        <div class="upFrameContent">Stats overview</div>
      </div>
      <div class="downFrame">
        <div class="statsFrameContent">
          <div style="height: 100px;width: 100%;">
            <div class="statsContent">
              <div style="border: lightgrey solid 1px;padding: 10px">
                <div style="font-size: 20px;margin-bottom: 5px">
                  0.7
                </div>
                <div style="font-size: 12px;margin-bottom: 10px">
                  Research Interest
                </div>
                <div style="color: darkgrey;font-size: 12px;">
                  More details
                </div>
              </div>
            </div>
            <div class="statsContent">
              <div style="border: lightgrey solid 1px;padding: 10px">
                <div style="font-size: 20px;margin-bottom: 5px">
                  0.7
                </div>
                <div style="font-size: 12px;margin-bottom: 10px">
                  Research Interest
                </div>
                <div style="color: darkgrey;font-size: 12px;">
                  More details
                </div>
              </div>
            </div>
            <div class="statsContent">
              <div style="border: lightgrey solid 1px;padding: 10px">
                <div style="font-size: 20px;margin-bottom: 5px">
                  0.7
                </div>
                <div style="font-size: 12px;margin-bottom: 10px">
                  Research Interest
                </div>
                <div style="color: darkgrey;font-size: 12px;">
                  More details
                </div>
              </div>
            </div>
            <div class="statsContent">
              <div style="border: lightgrey solid 1px;padding: 10px">
                <div style="font-size: 20px;margin-bottom: 5px">
                  0.7
                </div>
                <div style="font-size: 12px;margin-bottom: 10px">
                  Research Interest
                </div>
                <div style="color: darkgrey;font-size: 12px;">
                  More details
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div style="height: 20px"></div>
  </div>
</template>

<script>
export default {
  name: "Stats"
}
</script>

<style scoped>

.grey{
  background: rgba(221,221,221,0.3);
  /*height: 400px;*/
  /*height: 1000px;*/
  /*width: 100%;*/
}
.upFrame{
  height: 50px;
  border-bottom: rgba(0, 0, 0, .12) solid 1px;
}
.upFrameContent{
  padding: 15px;
  margin-left: 15px;
}
.downFrame{
  border-bottom: lightgrey solid 1px;
}
.statsFrame{
  width: 80%;
  margin: auto;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.statsContent{
  float: left;
  width: 21.5%;
  /*border: lightgrey solid 1px;*/
  height: 80px;
  padding: 10px;
}
.statsFrameContent{
  padding: 25px;
}
</style>
