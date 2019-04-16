<template>
  <v-navigation-drawer
    v-model="onDrawer"
    clipped
    fixed
    app
  >
    <v-list>
      <template v-for="(depth1, indexDepth1) in this.routes">
        <v-list-tile
          v-if="!depth1.items.length"
          :key="indexDepth1"
          :to="`/project/${projectId}/${depth1.name}`"
        >
          <v-list-tile-action>
            <v-icon>{{depth1.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{depth1.title}}</v-list-tile-title>
        </v-list-tile>
        <v-list-group
          v-else
          :key="indexDepth1"
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>{{depth1.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>{{depth1.title}}</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(depth2, index) in depth1.items"
            :key="index"
            :to="`/project/${projectId}/${depth1.name}/${depth2.name}`"
          >
            <v-list-tile-action>
              <v-icon>{{depth2.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{depth2.title}}</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, createNamespacedHelpers } from 'vuex';
const projectNamespace = createNamespacedHelpers('projectStore');

export default {
  computed: {
    ...mapState({
      routes: 'routes',
      drawer: 'drawer',
    }),

    ...projectNamespace.mapState({
      projectId: 'projectId',
    }),
  },

  watch: {
    drawer: function (val) {
      this.onDrawer = val;
    },
  },

  data() {
    return {
      onDrawer: this.drawer,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>

