<template>
    <div class="bg">
        <div class="top">
            <van-icon name="arrow-left" color="black" size="21" @click="onClickLeft" style="margin-top: 17px;" />
            <van-search v-model="value" show-action :placeholder="route.query.searchValue" title-style="margin-left: 10px;"
              @search="goSeach">
              <template #action>
                <div @click="goSeach">搜索</div>
              </template>
            </van-search>
        </div>
        <p class="text">查找人</p>
        <div class="center" v-if="index==0">
            <div class="item" v-if="show">
                <div class="topItem">
                    <div class="avator">
                        <img :src="fruInfo.avatarUrl? fruInfo.avatarUrl : 'static/20230407163657.png'" alt="">
                    </div>
                    <div class="name">
                        <p>{{ fruInfo.username }}</p>
                        <p class="time">
                            {{fruInfo.foxCode}}
                        </p>
                    </div>
                    <div class="btn" @click="addFri" v-if="status=='添加'">添加</div>
                    <div class="btn" v-if="status=='已是好友'">已是好友</div>
                    <div class="btn" v-if="status=='等待验证'">等待验证</div>
                </div>

            </div>
        </div>
        <div class="center" v-if="index == 1">
            <div class="item" v-if="show" v-for="item in grouoInfo">
                <div class="topItem">
                    <div class="avator">
                        <img :src="item.groupHead? item.avatarUrl : 'static/20230407163657.png'" alt="">
                    </div>
                
                    <div class="name">
                        <p>{{ item.name }}</p>
                        <p class="time">
                            {{item.foxCode}}
                        </p>
                    </div>
                  
                    <div class="btn" @click="addFri(item.id)" v-if="item.isJoin=='INEXISTENCE'">添加</div>
                    <div class="btn" v-else-if="item.isJoin=='ACCEPTED'">已加入</div>
                    <div class="btn" v-else="item.isJoin=='PENDING'">等待验证</div>
                
                </div>

            </div>
        </div>
    </div>
</template>
  
<script setup>
import { reactive, ref, onMounted } from "vue"
import { searchFriend, showInfoBefore, addFriend,searchGroupInfo,addGroup } from "../../../request/http.api"
import { Toast } from 'vant';
import { useRouter, useRoute } from "vue-router";
/* import { findGroupMember, setgroupGuilder, removegroupGuilder, removegroup } from "@/request/http.api.ts"; */

const router = useRouter();
const route = useRoute();
const index = ref(route.query.index)   //0是好友 1是群
console.log(route.query.searchValue);
const tabList = reactive([
    {
        name: 'user-o',
        title: '电子邮件/ID'
    },
    {
        name: 'phone-o',
        title: '电话'
    },
    // {
    //   name: 'qr',
    //   title: 'QR 图码'
    // }
])
const num = ref(0)
const changes = (key) => {
    num.value = key
}
const onClickLeft = () => history.back();
const contactsStatus = ref("")
const value = ref("")
const fruInfo = ref({})
const grouoInfo = ref([])
const show = ref(false)
//查询好友
let status = ref("")
const onClickButton = async ()=> {

    console.log(index.value);
    if(value.value!=route.query.searchValue && value.value!=""){
        route.query.searchValue=value.value
    }
       if(index.value == 0){
        searchFriend(route.query.searchValue).then(res => {
        fruInfo.value = res.data
        if (res.status !== 200) {
            Toast.fail(res.message)
        }
        console.log(res.data);
        show.value = true
        console.log(res,234);
        if (res.data.status == "ACCEPTED") {
            status.value = "已是好友"
        } else if (res.data.status == "PENDING"){
            status.value = "等待验证"
        }else if (res.data.status == "NOTAFRIEND"){
            status.value = "添加"
        }
        console.log(status.value, 2222);
    }).catch(err => {
        Toast.fail(err.response.data)
    })
       }else{
        let params = {
            search:route.query.searchValue,
        }
        const res = await searchGroupInfo(params)
        if (res.status !== 200) {
            Toast.fail(res.message)
        }
        grouoInfo.value = res.data
        show.value = true
       }
   

}
const goSeach = function () {
    searchFriend(value.value).then(res => {
        fruInfo.value = res.data
        if (res.status !== 200) {
            Toast.fail(res.message)
        }
        console.log(res.data);
        show.value = true
        console.log(res,234);
        contactsStatus.value=res.data.contactsStatus
        console.log(contactsStatus.value,123);
        if (res.data.status == 1) {
            status.value = true
        } else {
            status.value = false
        }
        console.log(status.value, 2222);
        onClickButton()
    }).catch(err => {
        Toast.fail(res.message)
    })

}
onClickButton()
//显示好友信息

const showInfo = function () {
    console.log(fruInfo.value.id);
    showInfoBefore(fruInfo.value.id).then(res => {

        Toast.fail(res.message)

    })

}
//添加好友
const addFri = async (groupId)=> {
    if(index.value == 0){
        console.log(fruInfo.value.id);
    addFriend(fruInfo.value.id).then(res => {
        console.log(res);
       
       Toast.success('添加成功,等待对方验证中')
       onClickButton()
        /* router.push("/contact")  */
    }).catch(err => {
        console.log(11111);
        Toast.fail(err.response.data)
        console.log(err.response.data);
    })
    }else{
      console.log(groupId);
      try {
        const res = await  addGroup(groupId)
        Toast.success('添加成功,等待对方验证中')
        onClickButton()
      } catch (error) {
        Toast.fail(error.response.data)
      }
   
    }
   
}
</script>
  
<style lang="scss" scoped>
.bg {
    padding: 36px;

    .top {
        display: flex;

        .van-search {
            width: 95%;

        }
    }

    .text {
        font-size: 24px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #939395;
        border-bottom: 0.5px solid #f7f6f6;
        padding-bottom: 16px;
    }

    .center {
        background-color: #fff;
        height: 100vh;
        border-radius: 1.5rem 1.5rem 0 0;


        .item {
            background-color: #fff;
            padding-left: 36px;
            padding-top: 20px;
            padding-bottom: 34px;
            margin-bottom: 20px;

            .topItem {
                display: flex;

                .avator {
                    width: 88px;
                    height: 88px;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }

                .name {
                    flex: 1;
                    margin-left: 16px;
                    line-height: 36px;
                    margin-top:  4.06667vw;

                    .time {
                        font-size: 24px;
                        color: #A5A8B6;
                        margin-top: 4px;
                    }
                }

                .btn {
                    width: 130px;
                    height: 70px;
                    border-radius: 12px 12px 12px 12px;
                    opacity: 1;
                    border: 0.5px solid #e7e7e7;
                    text-align: center;
                    line-height: 52px;
                    font-size: 24px;
                    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                    font-weight: 400;
                    color: #000000;
                    position: relative;
                    top: 1.66667vw;

                }
            }


        }
    }
}
</style>
  