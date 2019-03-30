<template>
  <v-app>
    <aside-menu></aside-menu>
    <Header></Header>
    <router-view></router-view>
  </v-app>
</template>

<script>
/**
 * Project에 관련된 이벤트는 해당 콤포넌트에서 작업합니다.
 */
import { mapMutations } from 'vuex';
import Header from '../components/header/Header';
import AsideMenu from '../components/asideMenu/AsideMenu';
import Confirm from '../components/common/Confirm';

export default {
  components: { 
    Header,
    AsideMenu,
    Confirm,
  },

  methods: {
    ...mapMutations([
      'SET_PROJECT_ID',
    ]),
  },

  created() {
    this.SET_PROJECT_ID(this.$route.params.pid);
  },
};
</script>

<style lang="scss" scoped>
</style>
