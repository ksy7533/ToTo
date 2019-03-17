<template>
  <v-layout fill-height>
    <v-flex>
      <v-card>
        <v-list two-line style="padding:0">
          <template v-for="(item, index) in this.tasks">
            <v-divider
              v-if="index !== 0"
              :key="`${item.title}-${index}`"
            ></v-divider>
            <v-list-tile
              :key="item.createdAt"
            >
              <v-list-tile-action>
                <v-checkbox></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title>{{item.createdAt}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>

    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="showModalAdd = true"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <modal-task-problem-add
      v-model="showModalAdd"
    ></modal-task-problem-add>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModalTaskProblemAdd from '../modal/ModalTaskProblemAdd';

export default {
  components: {
    ModalTaskProblemAdd,
  },

  data() {
    return {
      showModalAdd: false,
    };
  },

  computed: {
    ...mapState({
      tasks: 'tasks',
      project: 'project',
    }),
  },

  methods: {
    ...mapActions([
      'FETCH_PROBLEMS',
    ]),
    
    getTasks() {
      this.FETCH_PROBLEMS({
        pid: this.project.id,
      })
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.getTasks();
  },
}
</script>

<style>

</style>
