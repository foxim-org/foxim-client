<!-- <template>
  <div>
    <select v-model="selectedDeviceId">
      <option value="">请选择音频设备</option>
      <option v-for="device in audioInputDevices" :key="device.deviceId" :value="device.deviceId">
        {{ device.label }}
      </option>
    </select>
    <button @click="startRecording" :disabled="!selectedDeviceId">开始录音</button>
    <button @click="stopRecording" :disabled="!mediaRecorder">停止录音</button>
    <button @click="playRecording" :disabled="!mediaRecorder">play</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDeviceId: '',
      audioInputDevices: [],
      mediaRecorder: null,
      recordedChunks: [],
    };
  },
  mounted() {
    this.getAudioInputDevices();
  },
  methods: {
    getAudioInputDevices() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log('该浏览器不支持获取设备列表');
        return;
      }

      navigator.mediaDevices.enumerateDevices().then((devices) => {
        console.log(devices);
        this.audioInputDevices = devices.filter((device) => {
          return device.kind === 'audioinput'
        
        })
      });
    },
    startRecording() {
      navigator.mediaDevices.getUserMedia({ audio: { deviceId: this.selectedDeviceId } }).then((stream) => {
        console.log(stream)
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            console.log(event.data)
            this.recordedChunks.push(event.data);
          }
        });
      
        this.mediaRecorder.start();
      }).catch((error) => {
        console.log('启动录音失败：', error);
      });
    },
    stopRecording() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.mediaRecorder = null;

        const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);

        const audio = new Audio(url)

        audio.play()

        // 在控制台输出录音文件的 URL
        console.log('录音文件 URL：', url);

        this.recordedChunks = [];
      }
    },

    playRecording() {
      new audio()
    },
  },
};
</script> -->

<script setup>
import {
  Room,
  RoomEvent,
} from 'livekit-client'

import { ref, onMounted } from "vue"

const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODMzNDMzNjMsImlzcyI6IkFQSTZSY2czVjRLcXpCQiIsIm5hbWUiOiJ1c2VyMSIsIm5iZiI6MTY4MzI1Njk2Mywic3ViIjoidXNlcjEiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.hu834AUkYujiMbss_i5H-v97XMaP1Cchkh-TxgqAso8'
const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODMzNDM1MDcsImlzcyI6IkFQSTZSY2czVjRLcXpCQiIsIm5hbWUiOiJ1c2VyMiIsIm5iZiI6MTY4MzI1NzEwNywic3ViIjoidXNlcjIiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.hxPRxSIVtYu-VqbXGeWuc9VoDnMlA3PXOJM5zHdmD_8'

const room = new Room()

const localVideoContainer = ref()
const remoteVideoContainer = ref()

onMounted(async () => {

  await room.prepareConnection('wss://foxim-live.lvyanhui.com')

  room
    // publish local video and display it to localVideoContainer
    .on(RoomEvent.LocalTrackPublished, function (publication) { 
      console.log(publication);
      const track = publication.track.attach()
      
      localVideoContainer.value.appendChild(track)
    })
    // subscribe remote video and display it to remoteVideoContainer
    .on(RoomEvent.TrackSubscribed, function (remoteTrack) {
      const track = remoteTrack.attach()
      remoteVideoContainer.value.appendChild(track)
    })

  await room.connect('wss://foxim-live.lvyanhui.com', token1)
  await room.localParticipant.enableCameraAndMicrophone()
})
</script>

<template>
  <div ref='localVideoContainer'></div>
  <div ref='remoteVideoContainer'></div>
</template>
