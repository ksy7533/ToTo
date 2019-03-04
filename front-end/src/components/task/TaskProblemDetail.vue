<template>
  <div v-if="this.$route.params.pbid">
    Project Problem Detail 영역
    
    <div>
      {{this.task}}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      task: null,
    };
  },

  watch: {
    '$route'(to) {
      this.getTask(to.params.pbid);
    },
  },

  methods: {
    ...mapActions([
      'FETCH_PROBLEM',
    ]),

    getTask(pbid) {
      this.FETCH_PROBLEM({
        id: pbid,
      })
        .then((data) => {
          this.task = data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.getTask(this.$route.params.pbid);
  },
};
</script>

<style>

</style>
