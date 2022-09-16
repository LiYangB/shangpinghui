<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        <span class="error-msg" v-show="isTrue[0]">手机号格式不正确</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <button style="width: 100px; height: 38px" @click="getCode">
          获取验证码
        </button>
        <span class="error-msg" v-show="isTrue[1]">验证码错误</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
        />
        <span class="error-msg" v-show="isTrue[2]">密码格式不正确</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="password1"
        />
        <span class="error-msg" v-show="isTrue[3]">密码输入不一致</span>
      </div>
      <div class="controls">
        <input
          name="m1"
          type="checkbox"
          :checked="agree"
          @click="agree = !agree"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg" v-show="isTrue[4]">您需同意</span>
      </div>
      <div class="btn">
        <button @click="userRegister" :disabled="isable">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "registerIndex",
  data() {
    return {
      // 手机号
      phone: "",
      // 验证码
      code: "",
      // 密码
      password: "",
      password1: "",
      // 同意
      agree: true,
      // 验证
      isTrue: [false, false, false, false, false],
      // 允许
      isable:true
    };
  },
  methods: {
    // 获取验证码
    async getCode() {
      try {
        // 简单判断手机号不能为空
        let { phone } = this;
        phone && this.$store.dispatch("getCode", phone);
        // 渲染验证码
        setTimeout(() => {
          this.code = this.$store.state.User.code;
        }, 500);
      } catch (error) {
        alert(error.message);
      }
    },
    // 完成注册
    async userRegister() {
      try {
        const { phone, code, password} = this;
          (await this.$store.dispatch("userRegister", {
            phone,
            code,
            password,
          }));
        this.$router.push("/login");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  watch: {
    phone(now) {
      if (now.length == 11) {
        this.isTrue[0] = false;
        if(!this.isTrue[0]&&!this.isTrue[1]&&!this.isTrue[2]&&!this.isTrue[3]&&!this.isTrue[4]){
          this.isable=false
        }
      } else {
        this.isTrue[0] = true;
      }
    },
    code(now) {
      if (now.length == 6) {
        this.isTrue[1] = false;
        if(!this.isTrue[0]&&!this.isTrue[1]&&!this.isTrue[2]&&!this.isTrue[3]&&!this.isTrue[4]){
          this.isable=false
        }
      } else {
        this.isTrue[1] = true;
      }
    },
    password(now) {
      if (now.length >= 6) {
        this.isTrue[2] = false;
        if(!this.isTrue[0]&&!this.isTrue[1]&&!this.isTrue[2]&&!this.isTrue[3]&&!this.isTrue[4]){
          this.isable=false
        }
      } else {
        this.isTrue[2] = true;
      }
    },
    password1(now) {
      if (now == this.password) {
        this.isTrue[3] = false;
        if(!this.isTrue[0]&&!this.isTrue[1]&&!this.isTrue[2]&&!this.isTrue[3]&&!this.isTrue[4]){
          this.isable=false
        }
      } else {
        this.isTrue[3] = true;
      }
    },
    agree(now) {
      if (now) {
        this.isTrue[4] = false;
        if(!this.isTrue[0]&&!this.isTrue[1]&&!this.isTrue[2]&&!this.isTrue[3]&&!this.isTrue[4]){
          this.isable=false
        }
      } else {
        this.isTrue[4] = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>