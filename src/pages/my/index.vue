<template>
    <div class="my">
        <van-nav-bar title="发现" />
  <div v-for="item in url" class="url">
    <van-cell :title="item.name" is-link  @click="sendIframe(item.url)" />
  </div>
  
    </div>




</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {searchUrl} from '@/request/http.api'
import { useRouter } from "vue-router";
const router = useRouter();
const url = ref([])
const searchAdd = async()=>{
const res =await searchUrl()
    url.value = res.data
   console.log(url.value);
   
  
}
const sendIframe = (url:string)=>{
  router.push({name:'iframe',params:{url}})
  
}
onMounted(() => {
    console.log("我是my页面,我做了缓存")
    searchAdd()
})
</script>

<style  lang="scss">
.my{
    background: #f7f8fa;
    height: 100vh;
  .van-cell{
    margin-top: 10px;
  }
 
    
}
</style>