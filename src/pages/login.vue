<template>
  <main class="main">
    <v-card width="600" class="d-flex align-center flex-column pa-5">
      <v-card-title>welcome</v-card-title>
      <v-card-text class="px-12">
        <v-text-field 
        label="邮箱" 
        v-model="userModel.account"
        :error-messages="accountErrors"
        required
        @input="$v.userModel.account.$touch()"
        @blur="$v.userModel.account.$touch()"
        ></v-text-field>
        <v-text-field 
        :type="passState?'text':'password'"
        label="密码" 
        v-model="userModel.password"
        :error-messages="passwordErrors"
        required
        @input="$v.userModel.password.$touch()"
        @blur="$v.userModel.password.$touch()"
        :append-icon="passState?'iconfont-kejian':'iconfont-bukejian'"
        @click:append="passState=!passState"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn width="100" @click="login">登录</v-btn>
      </v-card-actions>
    </v-card>
  </main>
</template>
<script>
import * as api from "@api";
import {required} from 'vuelidate/lib/validators'
export default {
  name: "login",
  validations:{
    userModel:{
      account:{
        required
      },
      password:{
        required
      }
    }
  },
  data: () => ({
    userModel: {
      account: "",
      password: "",
    },
    passState:false
  }),
  mounted() {
   // console.log( this.$hint)
  },
  computed:{
    accountErrors(){
        const errors = []
        if (!this.$v.userModel.account.$dirty) return errors
        !this.$v.userModel.account.required && errors.push('请输入账号')
        return errors
    },
    passwordErrors(){
        const errors = []
        if (!this.$v.userModel.password.$dirty) return errors
        !this.$v.userModel.password.required && errors.push('请输入密码')
        return errors
    }
  },
  methods: {
    async login() {
      let that = this;
      that.$v.userModel.$touch();
      if (that.$v.userModel.$invalid) {
        return console.log("bunengweik");
      }
      that.userModel.pass = this.$md5(that.userModel.password);
      delete that.userModel.password
      try {
        that.$loading({msg:'登录'})
        let result = await api.login(that.userModel,that);
        if(result.data.code==200){
          localStorage.setItem('token',result.data.token)
          that.$hint({msg: result.data.msg,type: 'success'})
          that.$router.replace('/')
        }else{
          // console.log('500')
          console.log(result)
          that.$hint({msg: result.data.msg,type: 'error'}) 
        }
      } catch (e) {
        console.log(e);
        that.userModel.password = '';
        that.$hint({msg: '登陆失败,请检查登录信息',type: 'error'})
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