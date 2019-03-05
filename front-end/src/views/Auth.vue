<template>
  <div class="auth-wrap">
    <div class="auth-box">
      <h1>TOTO</h1>
      <div class="auth">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '../components/auth/Login';
import Join from '../components/auth/Join';

export default {
  components: { 
    Login,
    Join,
  },
}
</script>

<style lang="scss" scoped>
.auth-wrap {
  &:after {
    content: '';
    z-index: 1;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background-color: $primary-color;
  }

  .auth-box {
    z-index: 10;
    position: relative;
    top: 100px;
    margin: 0 auto;
    width: 450px;

    h1 {
      text-align: center;
      margin-bottom: 40px;
      color: $primary-font-color;
      font-size: 32px;
      font-weight: bold;
    }

    .auth {
      background-color: $suface-color;
      box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
    }
  }
}
</style>
