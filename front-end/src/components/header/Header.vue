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
      <v-btn
        flat
        v-if="user"
      >
        <v-icon style="margin-right:10px">account_circle</v-icon>
        {{ user.nick }} 님
      </v-btn>
      <v-btn
        color="secondary"
        @click="onLogout"
      >
        로그아웃
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations, createNamespacedHelpers } from 'vuex';
const projectNamespace = createNamespacedHelpers('projectStore');
const userNamespace = createNamespacedHelpers('userStore');

export default {
  computed: {
    ...mapState({
      drawer: 'drawer',
    }),

    ...userNamespace.mapState({
      user: 'user',
    }),
    
    ...projectNamespace.mapState({
      projectId: 'projectId',
    })
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
      'SET_DRAWER',
    ]),

    ...userNamespace.mapMutations([
      'LOGOUT',
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
    console.log(this.user)
  },

  mounted() {
    console.log(this.user)
  }
};
</script>

<style lang="scss" scoped>
</style>
