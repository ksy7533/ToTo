<template>
  <div id="app">
    <Header></Header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Header from './components/header/Header';
const userNamespace = createNamespacedHelpers('userStore');

export default {
  name: 'App',

  components: {
    Header,
  },

  computed: {
    ...userNamespace.mapState({
      user: 'user',
    })
  },

  methods: {
    ...userNamespace.mapActions([
      'FETCH_USER',
    ]),

    fetchUser() {
      this.FETCH_USER((result) => {
      })
      .catch((error) => {
        console.error(error);
      })
    }
  },

  created() {
    this.fetchUser();
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

