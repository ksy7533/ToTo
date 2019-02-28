<template>
  <div v-if="this.$route.params.tid">
    Project Todo Detail 영역
    
    <div>
      {{this.todo}}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      todo: null,
    }
  },

  watch: {
    '$route' (to, from) {
      this.getTodo(to.params.tid);
    }
  },

  methods: {
    ...mapActions([
      'FETCH_TODO',
    ]),

    getTodo(tid) {
      this.FETCH_TODO({
        id: tid,
      })
      .then((data) => {
        this.todo = data.result;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },

  created() {
    this.getTodo(this.$route.params.tid);
  }
}
</script>

<style>

</style>
