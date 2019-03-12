<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    fixed
    clipped-left
    height="64"
  >
    <v-toolbar-title class="mr-5">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span>Today TodoList</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    
    <v-btn flat @click="onLogout">로그아웃</v-btn>
    <v-btn
      icon
      to="/"
    >
      <v-icon>dashboard</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      drawer: null,
    }
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
</style>
