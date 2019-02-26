<template>
  <div class="main-header">
    <header>
      <h1>ToTo</h1>
      <div class="util">
        <button class="btn-logout" @click="onLogout">로그아웃</button>
      </div>
    </header>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
        'LOGOUT'
    ]),

    onLogout(){
        this.LOGOUT()
        this.$router.push('/login');
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
