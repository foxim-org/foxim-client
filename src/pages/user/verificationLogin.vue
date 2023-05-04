<template>
    <div class="login">
        <div class="bgc">
            <div class="top">
                <van-icon name="arrow-left" @click="back" />
            </div>

            <div class="center">
                <p>输入短信验证码</p>
                <p style="color: #ccc; font-size: 12px;">已发送验证码</p>
                <van-field v-model="value" readonly clickable @touchstart.stop="show = true" />
                <van-number-keyboard v-model="value" :show="show" :maxlength="6" @blur="show = false" />
                <div class="btn" @click="checkedinfopush">登录</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {
    checkCodes, regist, codesLogin
} from "../../request/http.api";
import { ref } from "vue"
import { Notify, Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router';
import appStore from "../../store/index"
import jwt_decode from "jwt-decode";
const store = appStore()
const router = useRouter()
const route = useRoute()
const show = ref(true);
const value = ref('');
const back = function () {
    router.go(-1)
}
let checked = ref(false)

const checkedinfopush = function () {
    codesLogin(
        {
            code: value.value,
            phone: route.query.phone
        }
    ).then(res => {
        console.log(res);
        store.token = res.data
        localStorage.setItem("token", res.data)
        Toast("登陆成功")
        let decoded  = jwt_decode(res.data )
        JSON.stringify(localStorage.setItem("info", JSON.stringify(decoded)))
        router.push("/")
    
    }).catch(err => {
        Toast(err.response.data)
    })
}

</script>
  
<style lang="scss" scoped>
.bgc {
    box-sizing: border-box;
    font-size: 12px;
    color: #ccc;

    .top {
        width: 100%;
        height: 224px;
        font-size: 5vw;
        line-height: 4rem;
        padding-left: 1rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .center {
        padding: 0 36px;

        p {
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: #000000;
            line-height: 18px;
            font-size: 44px;
            margin-bottom: 96px;
            text-align: center;
        }

        :deep(.van-field__control) {
            color: #000000;
            text-align: center;
            font-size: 20px;
        }

        .btn {
            width: 80%;
            height: 80px;
            background: #27A9FF;
            border-radius: 20px 20px 20px 20px;
            color: #fff;
            font-size: 32px;
            text-align: center;
            line-height: 80px;
            text-align: center;
            margin: 0 auto;
            margin-top: 84px;
        }

    }
}
</style>