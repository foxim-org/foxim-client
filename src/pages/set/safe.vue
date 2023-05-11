<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back" style="float: left; margin-top: 5px;" /> 账号安全
        </div>
        <div class="center">
            <img src="../../assets/image/66921@3x.png" alt="" class="load">
        </div>
        <div class="set" @click="router.push('/passwordSet')">
            <p>修改密码</p>
            <img src="../../assets/image/82075@2x.png" alt="" class="load">

        </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router';
const router = useRouter()
const back = function () {
    router.go(-1)
}


</script>
  
<style lang="scss" scoped>
.bgc {
    height: 100vh;
    background: #F6F6F6;

    .top {
        width: 750px;
        height: 98px;
        background: #FFFFFF;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        text-align: center;
        font-size: 32px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #000000;
        padding: 1.375rem 36px;
    }

    .center {
        width: 147.84px;
        height: 169.16px;
        margin: 0 auto;
        margin-top: 86px;
        margin-bottom: 60px;
        img {
            width: 100%;
        }
    }

    .set {
        width: 678px;
        height: 98px;
        background: #FFFFFF;
        border-radius: 24px 24px 24px 24px;
        opacity: 1;
        margin: 0 auto;
        display: flex;
        padding: 0 34px;

        p {
            flex: 1;
            font-size: 28px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #000000;
            line-height: 98px;
        }

        .load {
            width: 14.42px;
            height: 24.54px;
            margin-top: 35px;
        }
    }
}</style>