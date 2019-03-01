<template>
  <div>
    <!-- header component -->
    <Header></Header>
    <!--// header component -->

    <!-- AsideMenu component -->
    <aside-menu
      :pid="this.$route.params.pid"
    ></aside-menu>
    <!--// AsideMenu component -->

    <router-view></router-view>

  </div>
</template>

<script>
/**
 * Project에 관련된 이벤트는 해당 콤포넌트에서 작업합니다.
 */
import Header from '../header/Header';
import AsideMenu from '../asideMenu/AsideMenu';

export default {
  components: { 
    Header,
    AsideMenu,
  },
};

</script>

<style lang="scss" scoped>
</style>
