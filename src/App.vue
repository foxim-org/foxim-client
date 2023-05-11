<template>
    <div class="container">

        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" :key="route.name" v-if="route.meta.keepAlive"></component>
            </keep-alive>
            <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive"></component>
        </router-view>
    </div>
    <div class="zml-tabbar" v-if="route.meta.show">
        <van-tabbar route placeholder inactive-color="#ccc" active-color="#0ABCE2FF"
       
        >
            <van-tabbar-item 
            v-for="item in list" :key="item.id"
             :to="item.routing">
                <template #icon="props">
                    <img :src="props.active ? item.imgBright :item.img"  />
                </template>
                {{ item.name }}</van-tabbar-item>
                
            <!-- <van-tabbar-item icon="friends-o" to="/contact" @click="kong">联络人
                <template #icon="props">
                    <van-badge :content="infoList.length" v-if="infoList.length"/>
                    <img :src="props.active ? utils.get_img_url('67328 (5).png') : utils.get_img_url('67328 (1).png')"  />
                </template>
            </van-tabbar-item> -->
            <!-- <van-tabbar-item icon="search" to="/my" :replace="true">发现
           
        </van-tabbar-item> -->
            <!-- <van-tabbar-item icon="user-circle-o" to="/circle">发现</van-tabbar-item> -->
            <!-- <van-tabbar-item icon="setting-o" to="/set">设定
                <template #icon="props">
                    <img :src="props.active ? utils.get_img_url('67328 (6).png') : utils.get_img_url('67328 (3).png')"  />
                </template>
            </van-tabbar-item> -->
         
        </van-tabbar>
        
    </div>
</template>

<script lang="ts" setup>
import { onMounted ,watch,ref} from "vue";
import { useRoute } from 'vue-router';
import appStore from "@/store/index";
import utils from "@/utils";
import { storeToRefs } from "pinia";
import {Room} from 'livekit-client'
import {lookNavigation} from '@/request/http.api'
const store = appStore();
const { abc } = storeToRefs(store);
const route = useRoute()
const { connect } = store
const room = new Room()
const token = localStorage.getItem("token")
const list = ref([])
const nabBar = async ()=>{
    const res:any = await lookNavigation()
     list.value = res.data
}
// const refresh = async()=>{
//     const res = await loginWithToken()
//     console.log(res);
    
// }

onMounted(() => {
    console.log();
    nabBar()
    room.prepareConnection('wss://foxim-live.lvyanhui.com')
    // refresh
    connect()
 
})
let infoList=ref([])
watch(
  ()=>abc.value,
  (val)=>{
    console.log(val,1111);
    infoList.value.push(val)
    console.log(infoList.value);
  }
)
const kong=function(){
    infoList.value=[]
}
</script>

<style lang="scss">
.van-badge{
    position: absolute;
    top: -10px;
}
</style>
