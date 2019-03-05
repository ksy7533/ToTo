<template>
  <div class="gnb">
    <nav>
      <ul>
        <li v-for="(item, index) in this.routes" :key="index">
          <router-link tag="a" :to="`/project/${project.id}/${item.name}`">{{item.title}}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  computed: {
    ...mapState({
      routes: 'routes',
      project: 'project',
    })
  },
}
</script>

<style lang="scss" scoped>
.gnb {
  padding: 0 10px;
  background-color: $primary-dark-color;

  nav {
    ul {
      @extend %float-clear;

      li {
        float:left;
        margin-right: 10px;

        a {
          display: block;
          padding: 10px 10px 7px 10px;
          color: rgba($primary-font-color, .5);
          font-size: 16px;
          border-bottom: 3px solid $primary-dark-color;

          &.router-link-active {
            color: $primary-font-color;
            border-bottom: 3px solid #fff;
          }
        }
      }
    }
  }
}
</style>

