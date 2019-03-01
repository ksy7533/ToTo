<template>
  <div>
    project Total detail<br>
    <div v-if="!isLoading">
      {{this.project}}
    </div>
    <div v-else>
      isLoading...
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    ...mapState({
      project: 'project',
    }),
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
          console.log('성공!');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  mounted() {
    this.getProject();
  },
};
</script>

<style>

</style>
