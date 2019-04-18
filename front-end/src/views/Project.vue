<template>
  <v-app v-if="!isLoading">
    <aside-menu></aside-menu>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
/**
 * Project에 관련된 이벤트는 해당 콤포넌트에서 작업합니다.
 */
import { createNamespacedHelpers } from 'vuex';
import Header from '../components/header/Header';
import AsideMenu from '../components/asideMenu/AsideMenu';
import Confirm from '../components/common/Confirm';
import viewsMixin from '../mixins/viewsMixin.js';
const projectNamespace = createNamespacedHelpers('projectStore');

export default {
  mixins: [viewsMixin],

  components: { 
    Header,
    AsideMenu,
    Confirm,
  },

  methods: {
    ...projectNamespace.mapMutations([
      'SET_PROJECT_ID',
    ]),

    ...projectNamespace.mapActions([
      'FETCH_PROJECT',
    ]),

    getProject() {
      this.TOGGLE_IS_LOADING(true);
      this.FETCH_PROJECT({
        id: this.$route.params.pid,
      })
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.TOGGLE_IS_LOADING(false);
        });
    },
  },

  created() {
    this.SET_PROJECT_ID(this.$route.params.pid);
    this.getProject();
  },
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
