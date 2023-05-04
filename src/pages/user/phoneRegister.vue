<template>
    <div class="login">
        <div class="bgc">
            <div class="top">
                <van-icon name="arrow-left" @click="back" />
            </div>

            <div class="center">
                <p>注册狐狸并绑定手机号</p>

                <div class="inpu">
                    <span class="label">+86</span> <input type="text" v-model="value" placeholder="请输入手机号">
                </div>
                <div class="line"
                    style="width: 100%;
                                                                                                                    height: 0px;
                                                                                                                    opacity: 1;
                                                                                                                    border: .5px solid #F5F6FA;
                                                                                                                    margin-top: 7px;
                                                                                                                    margin-bottom: 10px;">
                </div>
                <!--    <van-cell-group inset>
                    <van-field v-model="value" label="+86" placeholder="请输入手机号" />
                </van-cell-group> -->
                <!--    <div class="line"
                    style="width: 100%;
                                                                                                    height: 0px;
                                                                                                    opacity: 1;
                                                                                                    border: 1px solid #F5F6FA;">
                </div> -->

                <van-radio-group @click="checkedinfo">
                    <van-radio :checked="checked"><span style="color: #303030 ;">已阅读并同意</span> 服务协议<span
                            style="color: #303030 ;">和</span>狐狸隐私保护指引</van-radio>
                </van-radio-group>
                <div class="btn" :style="{ opacity: checked == '1' ? 1 : 0.5 }" @click="checkedinfopush">同意并继续</div>
            </div>

        </div>
    </div>
</template>
<script setup>
import {
    login, regist, codes
} from "../../request/http.api";
import { ref } from "vue"
import { Notify, Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
const back = function () {
    router.go(-1)
}
let checked = ref(false);
const value = ref("")

const checkedinfo = function () {
    console.log(111);
    checked.value = !checked.value
}
const checkedinfopush = function () {

    if (checked.value) {
        console.log(1111);
        codes(value.value).then(res => {
            console.log(res);
            router.push({ path: "/verification", query: { phone: value.value } })
        }).catch(err => {
            Toast(err.response.data)
        })

    } else {
        Toast("请先同意狐狸隐私保护指引")
    }
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

        .van-icon-arrow-left:before {
            color: #000000;
            font-weight: bold;
        }
    }

    .center {
        padding: 0 36px;

        .inpu {
            display: flex;

            .label {
                font-size: 32px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #898D96;
                width: 20%;
            }

            input {
                border: none;
                height: 5.66667vw;
                width: 80%;
                font-size: 32px;
                color: #000000;
            }
        }

        p {
            margin-bottom: 96px;
            font-size: 44px;
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: #000000;
        }



        ::v-deep .van-field__label {

            width: 42px;
            font-size: 16px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #898D96;
            line-height: 24px;
            position: relative;
        }

        ::v-deep .van-radio__icon {
            margin-left: 10px;
            margin-top: 5px;

            i {
                width: 15px;
                height: 15px;
                border: 1px solid #4A8AFF;
                margin-top: 5px;
            }
        }

        ::v-deep .van-radio__icon--checked {
            i {
                width: 15px;
                height: 15px;
                margin-top: 5px;
                font-size: 12px;
            }

            margin-top: 5px;

        }

        ::v-deep .van-radio__label {

            font-size: 12px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #4A8AFF;
            line-height: 0px;
            margin-top: 7px;
        }

        .btn {
            width: 100%;
            height: 80px;
            background: #4A8AFF;
            border-radius: 20px 20px 20px 20px;
            opacity: 0.5;
            color: #fff;
            font-size: 20px;
            text-align: center;
            line-height: 80px;
            text-align: center;
            margin: 0 auto;
            margin-top: 84px;
            font-size: 28px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #FFFFFF;



        }
    }
}
</style>