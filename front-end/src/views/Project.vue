<template>
  <div class="project" v-if="project">
    <!-- header component -->
    <Header></Header>
    <!--// header component -->

    <!-- AsideMenu component -->
    <aside-menu></aside-menu>
    <!--// AsideMenu component -->

    <router-view></router-view>
  </div>
</template>

<script>
/**
 * Project에 관련된 이벤트는 해당 콤포넌트에서 작업합니다.
 */
import { mapState, mapActions } from 'vuex';
import Header from '../components/header/Header';
import AsideMenu from '../components/asideMenu/AsideMenu';

export default {
  components: { 
    Header,
    AsideMenu,
  },

  computed: {
    ...mapState({
      project: 'project',
    })
  },

  methods: {
    ...mapActions([
      'FETCH_PROJECT',
    ]),

    getProject() {
      this.isLoading = true;
      this.FETCH_PROJECT({
        id: this.$route.params.pid,
      })
        .then(() => {
          console.log('getProject 성공!');
        })
        .catch((err) => {
          console.log(err);
        })
    },
  },

  created() {
    this.getProject();
  },
};

</script>

<style lang="scss" scoped>
.project {
  @extend %float-clear;
  height: 100%;
}
</style>
