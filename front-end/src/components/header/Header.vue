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
import GnbNavigation from './GnbNavigation';
import { mapMutations } from 'vuex';

export default {
  components: {
    GnbNavigation
  },

  methods: {
    ...mapMutations([
        'LOGOUT'
    ]),

    onLogout(){
        this.LOGOUT()
        this.$router.push('/auth/login');
    },
  }
}
</script>

<style lang="scss" scoped>
.main-header {
  background-color: green;

  h1 {
    font-size: 30px;
  }
}
</style>
