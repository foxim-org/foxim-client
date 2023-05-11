<template>
  <div class="bgc">
    <div class="top">
      <div class="img">
        <!-- <img src="../../assets/image/67272@3x.png" alt=""> -->
        <img :src="logoValue.value" alt="">
      </div>
      <div style="text-align: center;font-size: 16px;margin-top: 15px;font-weight: bold;">CTC极乐派对</div>
      <!-- <div class="logohuli">
        <img src="../../assets/image/67110@3x.png" alt="">
      </div> -->
    </div>
    <div class="center">
      <van-form @submit="onSubmit" @getValues="changeValues">
        <!-- 账号密码 -->
        <van-cell-group inset>
          <p>账号</p>
          <van-field v-model="username" name="用户名" placeholder="请输入您的狐狸号或者手机号"
            :rules="[{ required: true, message: '请填写用户名' }]" style="margin-bottom:40px" @focus="focus" @blur="blur"/>
          <p>密码</p>
          <van-field v-model="password" type="password" name="密码" placeholder="请输入您的密码"
            :rules="[{ required: true, message: '请填写密码' }]" @focus="focus" @blur="blur"/>
        </van-cell-group>
        <div style="margin: 16px;" class="btn">
          <van-button type="primary" native-type="submit" round block style="margin:24px auto" size="large">
            登录
          </van-button>
        </div>
        <!-- 手机账号 -->
        <!-- <van-cell-group inset>
          <p>手机账号</p>
          <van-field v-model="username" name="用户名" placeholder="请输入您的狐狸号或者手机号"
            :rules="[{ required: true, message: '请填写用户名' }]" style="margin-bottom:40px" @focus="focus" @blur="blur"/>
          <p>密码</p>
          <van-field v-model="password" type="password" name="密码" placeholder="请输入您的密码"
            :rules="[{ required: true, message: '请填写密码' }]" @focus="focus" @blur="blur"/>
        </van-cell-group>
        <div style="margin: 16px;" class="btn">
          <van-button type="primary" native-type="submit" round block style="margin:24px auto" size="large">
            登录
          </van-button>
        </div> -->
        <!-- 邮箱密码 -->
        <!-- <van-cell-group inset>
          <p>邮箱</p>
          <van-field v-model="username" name="用户名" placeholder="请输入您的狐狸号或者手机号"
            :rules="[{ required: true, message: '请填写用户名' }]" style="margin-bottom:40px" @focus="focus" @blur="blur"/>
          <p>密码</p>
          <van-field v-model="password" type="password" name="密码" placeholder="请输入您的密码"
            :rules="[{ required: true, message: '请填写密码' }]" @focus="focus" @blur="blur"/>
        </van-cell-group>
        <div style="margin: 16px;" class="btn">
          <van-button type="primary" native-type="submit" round block style="margin:24px auto" size="large">
            登录
          </van-button>
        </div> -->
      </van-form>
    </div>
    <div class="footer" v-show="show">
      <p style="border-right: 1px solid black;" @click="router.push('phoneLogin')">验证码登录</p>
      <p @click="router.push('phoneRegister')">新用户注册</p>
      <!-- <p @click="router.push('register')">新用户注册</p> -->
    </div>
  </div>
</template>

<script setup>
import {
  login, regist,logoImg
} from "../../request/http.api";
import { ref, onMounted } from "vue"
import { Notify, Toast } from 'vant';
import appStore from "../../store/index"
import { useRouter, useRoute } from 'vue-router';
import MonitorKeyboard from '@/utils/monitorKeyboard.js'
const router = useRouter()
const route = useRoute()
const store = appStore()
const isLoading = ref(false)
const show = ref(true)
const logoValue = ref({})
const username = ref('')
const password = ref('')
const hasToolbar = ref(false)
const onSubmit = (values) => {
  console.log(username.value);
  console.log(password.value);
  store.login({ account: username.value, password: password.value }).then((res) => {
    
    
    if(route.query.groupID){
      console.log(111111);
      window.location.href=`https://foxim.lvyanhui.com/#/jumpToGroupId?groupId=${route.query.groupID}`
    }else{
      router.push("/")
    }
    Toast('登录成功');
  })
};
const logo  = async()=>{
  const res =await logoImg()
  logoValue.value = res.data
}



const goregiet = function () {
  router.push("/register")
}
const focus = function () {
  show.value = false
}
const blur = function () {
  show.value = true
}
const goregiet1 = function () {
  router.push("/phoneLogin")
}
onMounted(() => {
  //   const isMobile = /Mobile/.test(navigator.userAgent); // 判断是否为移动设备
  // const hasToolbar = isMobile && (window.screen.availHeight - window.innerHeight > 100); // 判断是否有工具栏

  // console.log(window.screen.availHeight); // 输出是否有工具栏
  // console.log(window.innerHeight);
  // console.log(hasToolbar);
  logo()
})

</script>

<style lang="scss" scoped>
.bgc {
  font-size: 12px;
  height: 100vh;

  .top {
    width: 100%;
    padding-top: 190px;
    margin-bottom: 114px;

    .img {
      width: 127.99px;
      height: 128px;
      margin: 0 auto;

      img {
        width: 100%;
      }
    }

    .logohuli {
      width: 76.3px;
      height: 34.68px;
      margin: 38px auto 0;
      position: relative;
      left: 10px;

      img {
        width: 100%;
      }

    }
  }

  .center {
    background-color: #fff;
    border-radius: 3rem 3rem 0 0;
    padding: 1rem;

    p {
      text-indent: 1em;
      position: relative;
      right: .1875rem;
      margin-top: .3125rem;
      margin-bottom: .5rem;
      font-size: 36px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #000000;
    }

    .btn {
      font-size: 2rem !important;
    }
  }

  .van-button {
    margin: 0 auto;
    border: none;
    width: 294px;
    height: 52px;
    background: #4A8AFF;
    border-radius: 48px 48px 48px 48px;
    opacity: 1;
  }

  .footer {
    position: absolute;
    bottom: 100px;
    width: 100%;
    display: flex;
    margin: 0 auto;
    text-align: center;

    P {
      width: 50%;
      line-height: 18px;
      font-size: 28px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #000000;
    }
  }
}
</style>