<template>
  <main class="main">
    <v-card width="600" class="d-flex align-center flex-column pa-5">
      <v-card-title>welcome</v-card-title>
      <v-card-text class="px-12">
        <v-text-field label="邮箱" v-model="userModel.account"></v-text-field>
        <v-text-field label="密码" v-model="userModel.password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn width="100" @click="login">登录</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar top v-model="alert.bool" :color="alert.color" :timeout="3000" elevation="0"> 
      <span :class="alert.fontColor">{{alert.msg}}</span>
    </v-snackbar>
  </main>
</template>
<script>
import * as api from "@api";
export default {
  name: "login",
  data: () => ({
    userModel: {
      account: "",
      password: "",
    },
    alert:{
      bool: false,
      msg:'4544545',
      color: '#e1f3d8',
      fontColor: 'success--text'
    }
  }),
  mounted() {

    //  api.login({name:'dj'}).then(res=>console.log(res),err=>console.log(err))
  },
  methods: {
    async login() {
      let that = this;
      if (that.userModel.account === "" || that.userModel.password === "") {
        
         that.alert = {
            bool:true,
            msg: '账号密码不能为空',
            color: '#fef0f0',
            fontColor: 'red--text'
          }
          return console.log("bunengweik");
      }
      that.userModel.pass = this.$md5(that.userModel.password);
      delete that.userModel.password
      try {
        let result = await api.login(that.userModel);
        if(result.data.code==200){
          localStorage.setItem('token',result.data.token)
          that.alert = {
            bool:true,
            msg: result.data.msg,
            color: '#e1f3d8',
            fontColor: 'success--text'
          }
        }
        that.$router.replace('/')
      } catch (e) {
        console.log(e);
        that.userModel.password = '';
         that.alert = {
            bool:true,
            msg: '登陆失败',
            color: '#fef0f0',
            fontColor: 'red--text'
          }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #222;
}
</style>