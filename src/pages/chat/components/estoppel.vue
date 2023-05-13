<template>
    <div class="editor">
        <div class="top">
            <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
            <span>设置禁言</span>
        </div>
        <div class="center">
            <div class="group">
                <van-collapse  @change = 'changeCheck'>
                    <van-collapse-item title="全员禁言" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <van-switch v-model="checked1" active-color="#4A8AFF"
                                inactive-color="#dcdee0" />
                        </template>
                    </van-collapse-item>

                </van-collapse>
            </div>
            <!-- <div class="group" v-if="!checked1">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="禁言成员" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <span class="btn">全选</span>
                            <span class="btn">添加</span>
                        </template>
                    </van-collapse-item>

                </van-collapse>
            </div> -->
            <div class="group" v-if="!checked1">
                <van-collapse >
                    <van-collapse-item title="成员列表" name="1" style="font-size: 16px;">
                        <template #right-icon>
                        </template>
                    </van-collapse-item>
                    <div class="list_user">
                        <div class="item" v-for="item in list " :key="item.id">
                            <van-image width="35" height="35" :src='item.avatarUrl?item.avatarUrl:info.avatarUrl'
                                round />
                            <p style="margin-left: 20px; flex: 1;">{{ item.username }}</p>
                            <van-image
                                
                                    width="24"
                                    height="24"
                                    @click="change(item)"
                                    :src="item.isSilencedTo?utils.get_img_url('66680.png'):utils.get_img_url('21974.png')"
                                  />
                            <!-- <img width="24" height="24" :src="item.isSilencedTo?imgsrc1:imgsrc" @click="change(item)"  /> -->
                        </div>
                    </div>
                </van-collapse>
            </div>
        </div>
        <!-- <div class="footer" v-if="!checked1">
            <span>
                解除禁言
            </span>
            <span style="background-color: #fff; border: 2px solid #44B5FF; color: #44B5FF;">
                取消禁言
            </span>
        </div> -->
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue"
import { findGroupMember,silentAll,lookGroup,viewSilent,silent,
 notSilent 
} from "@/request/http.api";
import { Toast } from "vant";
const onClickLeft = () => history.back();
const checked1 = ref(false);
const  id = { groupId: localStorage.getItem("groupId")}
const list = ref([])
import utils from '@/utils'
const info = JSON.parse(localStorage.getItem("info"))
const imgsrc = ref('../../../assets/image/21974.png')
const imgsrc1 = ref('../../../assets/image/66680.png')
const change = function (item) {
     if(  item.isSilencedTo){
        item.isSilencedTo = false
        noLient(item)
     }else{
        item.isSilencedTo = true
        lient(item)
     }
   
    // if (imgSrc.value == "/src/assets/image/21974.png") {
    //     imgSrc.value = "/src/assets/image/66680.png"
     
    // } else {
    //     imgSrc.value = "/src/assets/image/21974.png"
        
    // }
}
const lient = async(user)=>{
  let params = {
    groupId:user.groupId,
    toId:user.userId
  }
  try {
    const res = await silent(params)
    Toast.success(res.data)
  } catch (error) {
    Toast.fail(error.response.data)
  }
  
}
const noLient = async(user)=>{
    let params = {
    groupId:user.groupId,
    toId:user.userId
  }
  try {
    const res = await notSilent(params)
    Toast.success(res.data)
  } catch (error) {
    Toast.fail(error.response.data)
  }
  
}
const groupLook = async()=>{
     const res = await lookGroup(id)
     checked1.value = res.data.isSilencedToAll 
}
const userList = async()=>{
  const res = await viewSilent(id)
      list.value = res.data
    
}

const allSilent = async () => {
    
    const res = await silentAll(id)
    console.log(res,222);
    Toast.success(res.data)
}
const changeCheck = ()=>{
  console.log(checked1.value);
  if(checked1.value){
    allSilent()
  }else{
    allSilent()
  }
}
onMounted(()=>{
     userList()
    groupLook()
})
</script>

<style lang="scss" scoped>
.editor {
    background-color: #F6F6F6;
    width: 100vw;
    height: 100vh;

    .top {
        width: 750px;
        height: 178px;
        display: flex;
        padding: 102px 36px 28px 36px;
        background-color: #fff;

        span {
            width: 92%;
            text-align: center;
            font-size: 32px;
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: #000000;
        }
    }



    .center {
        padding: 24px 36px 0;

        .group {
            border-radius: 24px;
            overflow: hidden;
            margin-bottom: 24px;

            .van-switch--on {
          
                background: #4A8AFF;
            }

            ::v-deep .van-cell__title {
                margin-top: 5px;
            }

            .btn {
                width: 144px;
                height: 56px;
                border-radius: 32px 32px 32px 32px;
                opacity: 1;
                border: 2px solid #D6D6D6;
                text-align: center;
                line-height: 56px;
                margin-right: 12px;

                background: #FFFFFF;
            }

            .list_user {
                padding: 15px 36px;
                background-color: #fff;

                .item {
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                     margin-top: 20px;
                    p {
                        flex: 1;
                    }
                }
            }

        }
    }

    .footer {
        position: absolute;
        bottom: 10px;
        display: flex;
        padding: 0 36px;

        span {
            width: 50%;
            width: 320px;
            height: 80px;
            background: #4A8AFF;
            border-radius: 20px 20px 20px 20px;
            opacity: 1;
            text-align: center;
            color: white;
            line-height: 80px;
            margin-right: 38px;
        }
    }
}
</style>
