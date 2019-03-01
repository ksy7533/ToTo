<template>
  <div>
    <router-view></router-view>
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

<style>

</style>
