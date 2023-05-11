<template>
  <div class="groupSet">
      <div class="header">
          <div>
              <van-icon name="arrow-left" color="black" @click="onClickLeft" />
            
          </div>
      </div>
      <div class="center">
          <p style="
                                      font-size: 22px;
                                      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                                      font-weight: 400;
                                      color: #000000;
                                      text-align: center;
                                      margin-top: 50px;">
              我在群里的昵称
          </p>
          <p style="
                                  font-size: 14px;
                                  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                                  font-weight: 300;
                                  color: #000000;
                                  text-align: center;
                                  margin-top: 18px;
                                  margin-bottom: 20px;
                                  ">
              昵称修改后,只会在此群内显示,群内成员都可以看见
          </p>
      </div>
    
        <van-cell-group inset>
          
            <div class="avator">
              <van-uploader :after-read="afterRead" :disabled="true">
                  <van-image round
                      :src="avator? avator:'static/group.png'"
                      width="70"
                      height="70"
                      position="right" />
              </van-uploader>
          </div>
          <van-field v-model="value" clearable />
       
     
      </van-cell-group>
 
   
      <div class="btn" @click="updateInfo">确认</div>
  </div>
</template>
<script setup>

import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { updateGroupInfo } from "@/request/http.api";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
const value = ref(route.query.name)
const onClickLeft = ()=>{
  router.go(-1)
}
console.log(route.query);
const updateInfo =async ()=>{
  let params = {
    displayName:value.value,
    groupId:route.query.id

  }
    const res =await updateGroupInfo(params)
    Toast.success(res.data)
    setTimeout(() => {
      router.go(-1)
    }, 600);
   
}


</script>

<style lang="scss" scoped>
.van-switch--on {
  background: linear-gradient(180deg, #14BFFD 0%, #69D29A 100%);
}

.groupSet {

  .header {
      padding: 45px 50px 45px 30px;
      color: #fff;
      font-size: 1.25rem;
  }

  ::v-deep .van-icon__image {
      width: 50px;
      height: 50px;
  }

  ::v-deep .van-field__body {
      margin-top: 15px;
      margin-left: 5px;
  }
  ::v-deep .van-field__control{
      font-size: 20px;
      margin-top: 12px;

  }

  ::v-deep .van-cell-group {
      display: flex;
    
  }

  .btn {
      width: 320px;
      height: 80px;
      background: #44B5FF;
      border-radius: 20px 20px 20px 20px;
      opacity: 1;
      color: #fff;
      text-align: center;
      line-height: 80px;
      margin: 0 auto;
      margin-top: 100px;
  }

  .avator {
 
   margin-left: 30px;
      img {
          width: 100%;
          height: 100%;

      }
  }

}</style>
