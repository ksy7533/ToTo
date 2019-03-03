<template>
  <div class="aside-menu" v-if="this.items.length">
    좌측메뉴<br>

    <ul>
      <li v-for="(item, index) in this.items" :key="index">
        <router-link tag="a" :to="`/project/${project.id}/${category}/${item.name}`">{{item.title}}</router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      routes: 'routes',
      project: 'project',
    }),
  },

  data() {
    return {
      items: [],
      category: '',
    };
  },

  watch: {
    '$route'(to) {
      this.setItems(to.name);
    },
  },

  methods: {
    setItems(lnb) {
      this.routes.map((item) => {
        if (item.name === lnb) {
          this.items = item.items;
          this.category = this.$route.matched[1].name;
          return;
        }
      });
    },
  },

  created() {
    this.setItems(this.$route.matched[1].name);
  },
};
</script>

<style lang="scss" scoped>

</style>

