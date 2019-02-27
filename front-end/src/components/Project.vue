<template>
  <div>
    <!-- header component -->
    <Header/>
    <!--// header component -->

    <!-- AsideMenu component -->
    <AsideMenu/>
    <!--// AsideMenu component -->
    
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
