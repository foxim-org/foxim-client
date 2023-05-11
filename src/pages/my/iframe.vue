<template>
  <div class="frame">
    <van-nav-bar :border="false" title="发现" left-arrow  @click-left="onClickLeft"> 
</van-nav-bar>
    <iframe id="inlineFrameExample"
    frameborder="0" scrolling="no"
    width="100%"
    height="100%"
    :src="route.params.url">
</iframe>

  </div>
</template>

<script setup>
import {} from "vue"
import { useRoute } from 'vue-router';
const route = useRoute()
const onClickLeft = ()=>history.back()
</script>

<style lang="scss">
.frame{
  width: 100vw;
  height: 100vh;
  .van-nav-bar .van-icon{
    color:black
  }
}
</style>
