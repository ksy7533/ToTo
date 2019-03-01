<template>
  <div class="aside-menu">
    좌측메뉴<br>

    <ul v-if="this.items.length">
      <li v-for="(item, index) in this.items" :key="index">
        <router-link tag="a" :to="`/project/${pid}/${item.name}`">{{item.title}}</router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: [
    'pid',
  ],

  computed: {
    ...mapState({
      lnbRoutes: 'lnbRoutes',
    }),
  },

  data() {
    return {
      items: [],
    };
  },

  watch: {
    '$route'(to) {
      this.setItems(to.name);
    },
  },

  methods: {
    setItems(lnb) {
      this.lnbRoutes.map((item) => {
        if (item.name === lnb) {
          this.items = item.items;
          return;
        }
      });
    },
  },

  created() {
    this.setItems(this.$route.name);
  },
};
</script>

<style lang="scss" scoped>

</style>

