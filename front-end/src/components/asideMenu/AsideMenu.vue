<template>
  <v-navigation-drawer
    v-model="onDrawer"
    clipped
    fixed
    app
  >
    <v-toolbar flat>
      <v-toolbar-title v-if="project">
        {{project.title}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list style="padding:0">
      <template v-for="(depth1, indexDepth1) in this.routes">
        <v-list-tile
          v-if="!depth1.items.length"
          :key="`${depth1.name}-${indexDepth1}`"
          :to="`/project/${project.id}/${depth1.name}`"
        >
          <v-list-tile-action>
            <v-icon>{{depth1.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{depth1.title}}</v-list-tile-title>
        </v-list-tile>
        <v-list-group
          v-else
          :key="`group-${depth1.name}-${indexDepth1}`"
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
            :key="`${depth2.name}-${index}`"
            :to="`/project/${project.id}/${depth1.name}/${depth2.name}`"
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
      project: 'project',
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

