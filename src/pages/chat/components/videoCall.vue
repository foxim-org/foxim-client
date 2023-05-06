<template>
  <div class="videoCall"  ref='remoteVideoContainer'>
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
<div class="time">14.00</div>
<div class="footer">
  <div class="img">
    <van-image
     width="60"
     height="60"
    :src=" utils.get_img_url('video01.png')"
    /> 
    <van-image
     width="60"
     height="60"
    :src=" utils.get_img_url('video02.png')"
    /> 
  </div>
  
</div>
    </div>
  
  </div>

      
   <div ref='localVideoContainer' class="localVideo">22</div>
   <!-- <div ref='remoteVideoContainer'>22</div> -->
  

</template>

<script setup>
import {onMounted,ref,onUnmounted} from "vue"
import {getVideoToken} from '@/request/http.api'
import utils from "@/utils";
import { useRouter, useRoute } from 'vue-router'
import {Room,RoomEvent} from 'livekit-client'
const info = JSON.parse(localStorage.getItem('info'))
const router = useRouter()
const route = useRoute()
const room = new Room()
const localVideoContainer = ref()
const remoteVideoContainer = ref()
const leftRouter = ()=>{
  router.go(-1)
 }
  const readonlyToken = async()=>{
    await room.prepareConnection('wss://foxim-live.lvyanhui.com')
    room
    // publish local video and display it to localVideoContainer
    .on(RoomEvent.LocalTrackPublished, function (publication) { 
      console.log(publication,123);
      const track = publication.track.attach()
      
      localVideoContainer.value.appendChild(track)
    })
    // subscribe remote video and display it to remoteVideoContainer
    .on(RoomEvent.TrackSubscribed, function (remoteTrack) {
      console.log(remoteTrack,456);
      const track = remoteTrack.attach()
      remoteVideoContainer.value.appendChild(track)
    })
    let data=  {
       room:route.params.id,
      // room:'6440f0c6442cb04e4ea031d4',
      identity:info.id
    }
    const res = await getVideoToken(data)
    await room.connect('wss://foxim-live.lvyanhui.com', res.data.token)
    await room.localParticipant.enableCameraAndMicrophone()
    
  }
  onMounted(()=>{
    console.log(route.params.id);
    readonlyToken()
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
    z-index: 999;
    left: 40%;
    top:10%;
    .text{
      font-size: 32px;
      margin-top: 10px;
    }
  }
  .time{
    text-align: center;
    color: #f40;
    font-size: 32px;
    position: absolute;
    top: 60%;
    width: 100%;
  }
  .footer{
    position: absolute;
    z-index: 999;
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
