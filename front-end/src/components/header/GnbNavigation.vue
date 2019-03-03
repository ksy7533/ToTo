<template>
  <div>
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

<style>

</style>
