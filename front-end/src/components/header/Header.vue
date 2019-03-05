<template>
  <div class="main-header">
    <header>
      <router-link tag="h1" :to="'/'">ToTo</router-link>
      <div class="util">
        <button class="btn-logout" @click="onLogout">로그아웃</button>
      </div>
    </header>

    <!-- GnbNavigation component -->
    <gnb-navigation v-if="this.$route.params.pid"></gnb-navigation>
    <!--// GnbNavigation component -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import GnbNavigation from './GnbNavigation';

export default {
  components: {
    GnbNavigation,
  },

  methods: {
    ...mapMutations([
      'LOGOUT',
    ]),

    onLogout(){
      this.LOGOUT();
      this.$router.push('/auth/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.main-header {
  header {
    @extend %float-clear;
    padding: 10px;
    background-color: $primary-color;

    h1 {
      float: left;
      color: $primary-font-color;
      font-size: 24px;
      cursor: pointer;
    }

    .util {
      float: right;

      button {
        cursor: pointer;
        display: inline-block;
        padding: 5px 10px;
        font-size: 14px;
        border: 0;
        color: $primary-font-color;
        background-color: $primary-light-color;
      }
    }
  }
}
</style>
