<template>
  <v-container fluid class="pa-0">
    <v-sheet
      style="position: relative;z-index:10;"
      color="#fff"
      height="70"
      elevation="2"
      class="d-flex align-center justify-center"
    >
      <v-card flat class="d-inline" light>
        <span class="text-h5">雪中悍刀行</span>
      </v-card>
    </v-sheet>
    <v-sheet color="#f3f7f9" style="position: relative;z-index:9;" height="calc(100vh - 70px)">
      <v-sheet class="d-flex justify-center login_sheet" color="#eee">
        <v-sheet>
          <v-img src="@assets/images/HDJ454548.png"></v-img>
        </v-sheet>
        <v-sheet color="#fff" width="600" style="display:grid;place-items: center;">
          <v-card flat min-width="350" light>
            <v-card-title class="justify-center">
              <span class="text-uppercase text-h4">welcome 登录</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="账号"
                v-model="userModel.account"
                :error-messages="accountErrors"
                required
                @input="$v.userModel.account.$touch()"
                @blur="$v.userModel.account.$touch()"
              ></v-text-field>
              <v-text-field
                label="密码"
                v-model="userModel.password"
                :type="passState?'text':'password'"
                :error-messages="passwordErrors"
                required
                @input="$v.userModel.password.$touch()"
                @blur="$v.userModel.password.$touch()"
                :append-icon="passState?'iconfont-kejian':'iconfont-bukejian'"
                @click:append="passState=!passState"
              ></v-text-field>
              <!-- <div class="d-flex">
                <v-text-field label="请输入验证码"></v-text-field>
                <canvas id="canvas" width="120" height="30"></canvas>
              </div>-->
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                width="350"
                height="50"
                rounded
                v-ripple="{class: '#0094ff'}"
                color="#0094ff"
                class="text-h6 white--text"
                @click="login"
              >登录</v-btn>
            </v-card-actions>
          </v-card>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>
<script>
import * as api from "@api";
import { saveItemObj } from "@/plugins/util.js";
import { required } from "vuelidate/lib/validators";
const IS_DEV = require("@/plugins/cfg").isdev;
export default {
  name: "login",
  validations: {
    userModel: {
      account: {
        required,
      },
      password: {
        required,
      },
    },
  },
  data: () => ({
    userModel: {
      account: IS_DEV ? "root" : "",
      password: IS_DEV ? "123123" : "",
    },
    passState: false,
  }),
  async mounted() {
    // console.log( this.$hint)
    // let res = await api.getRouter();
    // console.log(res);
    // const whiteList = ["/login", "/home", "/register"];
    // let inWhiteList = (s) => whiteList.some((w) => w === s);
    // console.log(inWhiteList("/home"))
  },
  computed: {
    accountErrors() {
      const errors = [];
      if (!this.$v.userModel.account.$dirty) return errors;
      !this.$v.userModel.account.required && errors.push("请输入账号");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.userModel.password.$dirty) return errors;
      !this.$v.userModel.password.required && errors.push("请输入密码");
      return errors;
    },
  },
  methods: {
    async login() {
      let that = this;
      that.$v.userModel.$touch();
      if (that.$v.userModel.$invalid) {
        return;
      }
      that.userModel.pass = this.$md5(that.userModel.password);
      delete that.userModel.password;
      try {
        that.$loading({ msg: "登录" });
        let result = await api.login(that.userModel, that);
        if (result.code === 200) {
          console.log(result);
          localStorage.setItem("token", result.data.token);
          saveItemObj("user", result.data);
          that.userModelReset();
          that.$hint({ msg: result.msg });
          setTimeout(() => {
            that.$router.replace("/");
          }, 500);
        } else {
          that.$hint({ msg: "登录失败请检查账号密码", type: "error" });
          that.userModelReset();
        }
      } catch (e) {
        console.log(e);
        that.userModelReset();
      }
    },
    userModelReset() {
      let that = this;
      that.userModel = {
        account: "",
        password: "",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #222;
}
#canvas {
  border: 1px solid #222;
  margin-left: 15px;
  width: 120px;
  height: 50px;
}

.login_sheet {
  max-width: 1050px;
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
}
</style>