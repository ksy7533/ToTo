<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    fixed
    clipped-left
    height="64"
  >
    <v-toolbar-side-icon @click.stop="onDrawer" v-if="pathName === 'project'"></v-toolbar-side-icon>
    <v-toolbar-side-icon v-else>
      <v-icon>web</v-icon>
    </v-toolbar-side-icon>
    <v-toolbar-title style="margin-left:10px">
      Today TodoList
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      color="primary"
      @click="onLogout"
      v-if="user"
    >
      <span class="font-weight-bold" style="margin-right:5px">{{ user.nick }}</span>님
    </v-btn>
    <v-btn color="primary" ripple to="/">
      대시보드
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations, createNamespacedHelpers } from 'vuex';
const userNamespace = createNamespacedHelpers('userStore');

export default {
  computed: {
    ...mapState({
      drawer: 'drawer',
    }),

    ...userNamespace.mapState({
      user: 'user',
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
    },
  },

  created() {
    this.pathName = this.$route.matched[0].name;
  },
};
</script>

<style lang="scss" scoped>
</style>
