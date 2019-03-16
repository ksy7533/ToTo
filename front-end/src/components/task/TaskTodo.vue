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
              <v-list-tile-avatar>
                <v-icon color="pink lighten-1" v-if="item.priority">priority_high</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-action>
                <v-btn icon ripple :to="{name: 'todoDetail', params: {tid: item.id}}">
                  <v-icon color="grey lighten-1">add</v-icon>
                </v-btn>
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
      @click="showModalUpdate = true"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <modal-task-todo-add
      v-model="showModalUpdate"
    ></modal-task-todo-add>

    <!-- ModalTaskTodoDetail -->
    <router-view></router-view>
    <!--// ModalTaskTodoDetail -->
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModalTaskTodoAdd from '../modal/ModalTaskTodoAdd';

/**
 * 1. 해당 tasks를 불러와서 첫번째 todo의 id 값을 가져온뒤 state todo에 저장한다.
 * 2. 저장한 todo의 id값을 route params에저장한다.
 */

export default {
  components: {
    ModalTaskTodoAdd,
  },

  data() {
    return {
      isUpdating: false,
      showModalUpdate: false,
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
      'ADD_TODO',
      'FETCH_TODOS',
      'UPDATE_TODO',
    ]),
    
    getTasks() {
      this.FETCH_TODOS({
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
      this.UPDATE_TODO({
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
};

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

