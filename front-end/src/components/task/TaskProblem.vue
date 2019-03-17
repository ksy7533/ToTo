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
              :class="{completed: item.completed}"
            >
              <v-list-tile-action>
                <v-checkbox :disabled="isUpdating" :input-value="item.completed" @change="onCheckBox(item.id, $event)"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title>{{item.createdAt}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon ripple v-on="on" :to="{name: 'problemDetail', params: {pbid: item.id}}">
                      <v-icon color="grey lighten-1">add</v-icon>
                    </v-btn>
                  </template>
                  <span>상세보기</span>
                </v-tooltip>

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

    <!-- ModalTaskProblemDetail -->
    <router-view></router-view>
    <!--// ModalTaskProblemDetail -->
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
      isUpdating: false,
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
      'UPDATE_PROBLEM',
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

    updateTask(id, payload) {
      this.isUpdating = true;
      this.UPDATE_PROBLEM({
        id,
        payload,
      })
        .then((data) => {
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isUpdating = false;
        });
    },

    onCheckBox(id, isChecked) {
      this.updateTask(id, {completed: isChecked})
    },
  },

  created() {
    this.getTasks();
  },
}
</script>

<style lang="scss" scoped>
.v-list {
  .completed {
    .v-list__tile__title, .v-list__tile__sub-title {
      text-decoration: line-through;
      color: grey;
    }
  }
}
</style>

