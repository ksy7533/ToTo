<template>
  <div>
    <!-- header component -->
    <Header></Header>
    <!--// header component -->

    <!-- AsideMenu component -->
    <aside-menu></aside-menu>
    <!--// AsideMenu component -->

    <router-view></router-view>

  </div>
</template>

<script>
import Header from './Header';
import AsideMenu from './AsideMenu';

export default {
  components: { 
    Header,
    AsideMenu
  },
}
</script>

<style lang="scss" scoped>

</style>
