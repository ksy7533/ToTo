<template>
  <div class="login">
    <h2>로그인</h2>
    <div class="wrap-box">
      <form @submit.prevent="onSubmit">
        <div class="row">
          <p class="title">
            <label for="email">Email</label>
          </p>
          <p class="wrap-input">
            <input type="text" id="email" v-model.trim="email" autofocus placeholder="이메일을 입력 해주세요.">
          </p>
        </div>
        <div class="row">
          <p class="title">
            <label for="password">Password</label>
          </p>
          <p class="wrap-input">
            <input type="password" id="password" v-model.trim="password" placeholder="암호를 입력 해주세요.">
          </p>
        </div>
        <div class="util">
          <button type="submit" :class="{'success': !invalidForm}" :disabled="invalidForm">로그인</button>
          <button @click="onJoin">회원가입</button>
        </div>
      </form>
      <p class="info" v-if="this.error">{{this.error}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      rPath: '',
    };
  },

  computed: {
    invalidForm() {
      return !this.email || !this.password;
    },
  },

  methods: {
    ...mapActions([
      'LOGIN',
    ]),

    onSubmit() {
      this.LOGIN({ email: this.email, password: this.password })
        .then(() => {
          this.$router.push(this.rPath);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onJoin() {
      this.$router.push('/auth/join');
    },
  },

  created() {
    this.rPath = this.$route.query.rPath || '/';
  },
};
</script>

<style lang="scss" scoped>
.login {
  h2 {
    text-align: center;
    padding: 30px 0;
    color: rgba(#000, .7);
    font-size: 24px;
    font-weight: normal;
  }

  .wrap-box {
    padding: 20px 40px 40px;

    .row {
      margin-top: 20px;

      &:first-child {
        margin-top: 0;
      }

      .title {
        margin-bottom: 10px;
        color: rgba(#000, .3);
        font-size: 22px;
      }

      .wrap-input {
        padding: 10px;

        input {
          width: 100%;
          height: 20px;
          font-size: 18px;
          border: 0;
          outline: 0;
        }

        border-bottom: 2px solid $border-color;
      }
  }

    .util {
      text-align: center;
      margin-top: 40px;

      button {
        cursor: pointer;
        display: inline-block;
        margin: 0 5px;
        padding: 10px 20px;
        font-size: 18px;
        border: 0;

        &.success {
          color: $primary-font-color;
          background-color: $primary-color;
        }
      }
    }

    .info {
      text-align: center;
      margin-top: 20px;
      color: $error-color;
    }
  }
}
</style>

