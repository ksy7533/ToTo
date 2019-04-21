<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    fixed
    clipped-left
    height="64"
    extended
    :extension-height="4"
  >
    <v-toolbar-side-icon @click.stop="onDrawer" v-if="pathName === 'project'"></v-toolbar-side-icon>
    <v-toolbar-side-icon v-else>
      <v-icon>web</v-icon>
    </v-toolbar-side-icon>
    <v-toolbar-title style="margin-left:10px">
      Today TodoList
    </v-toolbar-title>
    
    <v-spacer></v-spacer>

    <template v-if="pathName !== 'auth'">
      <search></search>

      <v-spacer></v-spacer>
      
      <v-menu offset-y v-model="menu">
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            icon
            v-on="on"
            @click="getProjects"
          >
            <v-icon>dashboard</v-icon>
          </v-btn>
        </template>

        <v-list style="width:200px">
          <v-list-tile to="/">
            <v-icon style="margin-right:7px">view_module</v-icon>
            <v-list-tile-title>대시보드</v-list-tile-title>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile
            v-for="(item, index) in projects"
            :key="`${item.title}-${index}`"
            @click="goProject(item.id)"
            >
            <v-icon style="margin-right:7px">view_list</v-icon>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            icon
            v-on="on"
          >
            <v-icon>person</v-icon>
          </v-btn>
        </template>

        <v-list style="width:200px">
          <v-list-tile @click="onLogout">
            <v-list-tile-title>로그아웃</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </template>

    <v-progress-linear
      slot="extension"
      :indeterminate="isLoading"
      class="ma-0"
      color="accent"
      :height="4"
      >
    </v-progress-linear>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations, mapActions, createNamespacedHelpers } from 'vuex';
import Search from './Search';
const userNamespace = createNamespacedHelpers('userStore');
const projectNamespace = createNamespacedHelpers('projectStore');

export default {
  components: {
    Search,
  },

  computed: {
    ...mapState({
      drawer: 'drawer',
      isLoading: 'isLoading',
    }),

    ...userNamespace.mapState({
      user: 'user',
    }),

    ...projectNamespace.mapState({
      projects: 'projects',
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
      menu: false,
    }
  },

  methods: {
    ...mapMutations([
      'SET_DRAWER',
    ]),

    ...userNamespace.mapMutations([
      'LOGOUT',
    ]),

    ...projectNamespace.mapActions([
      'FETCH_PROJECTS',
      'FETCH_PROJECT',
    ]),

    getProjects() {
      if(this.menu) return;
      this.FETCH_PROJECTS()
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
    },

    goProject(pid) {
      this.FETCH_PROJECT({
        id: pid,
      })
        .then(() => {
          this.$router.push(`/project/${pid}/home`);
        })
        .catch((err) => {
          console.log(err);
        });
    },

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
/deep/ .v-toolbar__extension {
  padding: 0;
}
</style>
