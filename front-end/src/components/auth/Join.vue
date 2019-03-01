<template>
  <div class="login">
    <h1>ToTo<br>(Today TodoList)</h1>
    <h2>회원가입</h2>
    <div class="wrap-box">
      <form @submit.prevent="onSubmit">
        <div class="row">
          <p class="title">
            <label for="email">EMAIL</label>
          </p>
          <p class="wrap-input">
            <input type="text" id="email" v-model.trim="email" autofocus placeholder="이메일을 입력 해주세요.">
          </p>
        </div>
        <div class="row">
          <p class="title">
            <label for="password">PASSWORD</label>
          </p>
          <p class="wrap-input">
            <input type="password" id="password" v-model.trim="password" placeholder="암호를 입력 해주세요.">
          </p>
        </div>
        <div class="row">
          <p class="title">
            <label for="password">닉네임</label>
          </p>
          <p class="wrap-input">
            <input type="text" id="nick" v-model.trim="nick" placeholder="닉네임을 입력 해주세요.">
          </p>
        </div>
        <div class="util">
          <button @click="onBack">뒤로</button>
          <button type="submit" :class="{'success': !invalidForm}" :disabled="invalidForm">회원가입</button>
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
      nick: '',
      error: '',
    };
  },

  computed: {
    invalidForm() {
      return !this.email || !this.password || !this.nick;
    },
  },

  methods: {
    ...mapActions([
      'JOIN',
    ]),

    onSubmit() {
      this.JOIN({ email: this.email, password: this.password, nick: this.nick })
        .then(() => {
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onBack() {
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin: 120px auto 0;
  padding-bottom: 40px;
  width: 400px;
  background-color: #dbdbdb;
  border-radius: 4px;

  h1 {
    text-align: center;
    padding: 50px 0 20px 0;
    font-size: 30px;
    font-weight: bold;
  }

  h2 {
    text-align: center;
    font-size: 25px;
  }

  .wrap-box {
    padding: 20px;

    .row {
      margin-top: 20px;

      &:first-child {
        margin-top: 0;
      }

      .title {
        margin-bottom: 10px;
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

        background-color: #fff;
        border-bottom: 2px solid #666;
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
          color: #fff;
          background-color: #333;
        }
      }
    }

    .info {
      text-align: center;
      margin-top: 20px;
      color: red;
    }
  }
}
</style>
