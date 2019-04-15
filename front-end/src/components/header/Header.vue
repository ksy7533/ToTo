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
      <v-toolbar-side-icon @click.stop="onDrawer" v-if="pathName === 'project'"></v-toolbar-side-icon>
      <v-toolbar-side-icon v-else>
        <v-icon>web</v-icon>
      </v-toolbar-side-icon>
      <span>Today TodoList</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="pathName !== 'auth'">
      <v-btn flat @click="onLogout">로그아웃</v-btn>
      <v-btn
        icon
        to="/"
      >
        <v-icon>dashboard</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      drawer: 'drawer',
      projectId: 'projectId',
    }),
  },

  watch: {
    '$route' (to, from) {
      this.pathName = to.matched[0].name;
    }
  },

  data() {
    return {
      pathName: '',
    }
  },

  methods: {
    ...mapMutations([
      'LOGOUT',
      'SET_DRAWER',
    ]),

    onLogout() {
      this.LOGOUT();
      this.$router.push('/auth/login');
    },

    onDrawer(){
      this.SET_DRAWER();
    }
  },

  created() {
    this.pathName = this.$route.matched[0].name;
  }
};
</script>

<style lang="scss" scoped>
</style>
