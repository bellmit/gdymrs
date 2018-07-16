<template>
  <div class="loading">
    <div class="loading-box">
      <img src="../../../static/img/common/bolo.gif" height="60" width="60" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    data () {
      return {}
    },
  }
</script>

<style scoped>
  .loading{
    position: fixed;
    top:0;
    left:0;
    z-index:121;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .loading-box{
    width: 110px;
    height: 90px;
    /* background: rgba(0,0,0,0.3); */
    border-radius: 15px;
    text-align: center;
    line-height: 130px;
    position: absolute;
    top: 35%;left: 50%;
    transform: translate(-50%);
  }
  img{
   display: inline-block;
  }
</style>