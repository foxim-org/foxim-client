<template>
  <div class="videoCall"  ref='remoteVideoContainer'
  
  :style="isCallAnswered ?{height:'0vh'}:{height:'100vh'}"
  >
    <div>
      <van-nav-bar :border="false">
  <template #left>
    <van-icon @click="leftRouter" name="arrow-left" size="18" color="#fff" />
  </template>
</van-nav-bar>
<div class="content">
    <div class="z-flex-column">
      <van-image  
                            width="60"
                            height="60"
                            src="static/20230407163657.png"
                          />
                          <div class="text">名字</div>
    </div>
</div>
<div class="time">{{ isCallAnswered?'':text }}</div>
<div class="footer">
  <div class="img">
    <van-image
     width="60"
     height="60"
    :src=" utils.get_img_url('video01.png')"
    @click="hangup"
    /> 
    <van-image
     width="60"
     height="60"
    :src=" utils.get_img_url('video02.png')"
    @click="answerCall"
    v-show="isCalls"
    /> 
  </div>
</div>
    </div>
  
  </div>

      
   <div ref='localVideoContainer' class="localVideo"></div>
   <!-- <div ref='remoteVideoContainer'>22</div> -->
  

</template>

<script setup>
import {onMounted,ref,onUnmounted,watch,nextTick} from "vue"
import {getVideoToken} from '@/request/http.api'
import utils from "@/utils";
import appStore from "@/store/index";
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import {Room,RoomEvent} from 'livekit-client'
const info = JSON.parse(localStorage.getItem('info'))
const router = useRouter()
const route = useRoute()
const store = appStore()
const { notice } = storeToRefs(store)
const { send } = store
let str = route.params.isCall
let num = Number(str)
const isCalls = ref(Boolean(num)) 
const text = ref('连接视频通话中...')
const room = new Room()
const localVideoContainer = ref()
const remoteVideoContainer = ref()
const isCallAnswered = ref(false)
const answerCall = async () => {
   text.value = '连接中'
   let msg = {
    $type:'videoNotice',
    notice:1, //0挂断 1是接听
    type:'notice',
    userId:route.params.id,
    contactId:route.params.cid
   }
   console.log(route.params);
   send(`private/${msg.userId}`, JSON.stringify(msg))
  if (!isCallAnswered.value) {
    connection()
    isCalls.value = false
  }
}
const hangup = ()=>{
  let msg = {
    $type:'videoNotice',
    notice:0, //0挂断 1是接听
    type:'notice',
    userId:route.params.id,
    contactId:route.params.cid
   }
  send(`private/${msg.contactId}`, JSON.stringify(msg));
  room.disconnect()
   router.go(-1)
 
   }
const connection = async()=>{
  await readonlyToken()
  isCallAnswered.value = true
}
const leftRouter = ()=>{
  router.go(-1)
 }
  const readonlyToken = async()=>{
    room
    // publish local video and display it to localVideoContainer
    .on(RoomEvent.LocalTrackPublished, function (publication) { 
      console.log(publication,123);
      if(publication.kind == 'audio'){
        const track = publication.track.attach()
        localVideoContainer.value.appendChild(track)
        console.log(track,444);
      }
    
       
     
    })
    // subscribe remote video and display it to remoteVideoContainer
    .on(RoomEvent.TrackSubscribed, function (remoteTrack) {
        if(remoteTrack.kind == 'audio'){
        const track = remoteTrack.attach()
      remoteVideoContainer.value.appendChild(track)
        }
     
    })
    // .on(RoomEvent.TrackUnsubscribed ,function(trackUnsubscribed){
    //   isCallAnswered.value =false
    
      
    //   room.disconnect()
    //   //  router.go(-1)
    // })
    let data=  {
       room:route.params.id,
      // room:'6440f0c6442cb04e4ea031d4',
      identity:info.id
    }
    const res = await getVideoToken(data)
    await room.connect('wss://foxim-live.lvyanhui.com', res.data.token)
 
  }
   watch(
    ()=>notice.value,
    (val)=>{
      nextTick(()=>{
        if(val.notice === 0){
          text.value = '已挂断'
          room.disconnect()
          router.go(-1)
        }else{
          text.value = '连接中'
           connection()
        }
      
      })
    }
   )
  onMounted(()=>{
    console.log(route.params.isCall);
    // readonlyToken()
  })
  onUnmounted(()=>{
   
    room.disconnect()
  })
</script>

<style lang="scss">
.videoCall{
   background-color: black;
    video{
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
    
    }
  

  .van-nav-bar{
    background-color: black;
  }
  .content{
  
    height: 60vh;
    color: #fff;
    margin-top: 20px;
    position: absolute;
    z-index: 88;
    left: 40%;
    top:10%;
    .text{
      font-size: 32px;
      margin-top: 10px;
    }
  }
  .time{
    text-align: center;
    color: #fff;
    font-size: 28px;
    position: absolute;
    top: 60%;
    width: 100%;
  }
  .footer{
    position: absolute;
    z-index: 90;
    bottom: 20%;
    width: 100%;
   .img{
    display: flex;
    justify-content: space-around;
    align-items: center;
   }
  }
}
.localVideo{
    width: 260px;
    height: 300px;
    
    position: absolute;
    top: 100px;
    right: 20px;
    video{
      width: 100%;
      height: 100%;
    }
  }
</style>
