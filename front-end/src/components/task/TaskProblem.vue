<template>
  <v-layout fill-height v-if="tasks">
    <v-flex>
      <v-card hover>
        <v-toolbar dense dark flat color="pink">
          <v-toolbar-title>문제점</v-toolbar-title>
        </v-toolbar>
        <v-list two-line style="padding:0" v-if="this.tasks.length">
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
                <v-list-tile-sub-title>{{item.regDate}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-layout>
                  <v-flex ml-3>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn color="pink" fab small dark v-on="on" :to="{name: 'problemDetail', params: {pbid: item.id}}">
                          <v-icon>edit</v-icon>
                        </v-btn>
                      </template>
                      <span>상세보기</span>
                    </v-tooltip>
                  </v-flex>
                  <v-flex ml-3>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn fab small v-on="on" @click="onDelete(item.id)">
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </template>
                      <span>삭제하기</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
        <v-list v-else>
          <v-list-tile>
            <v-list-tile-title style="text-align:center">등록된 문제점이 없습니다.</v-list-tile-title>
          </v-list-tile>
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

    <confirm ref="confirm"></confirm>

    <!-- ModalTaskProblemDetail -->
    <router-view></router-view>
    <!--// ModalTaskProblemDetail -->
  </v-layout>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ModalTaskProblemAdd from '../modal/ModalTaskProblemAdd';
import Confirm from '../common/Confirm';
const taskNamespace = createNamespacedHelpers('taskStore');

export default {
  components: {
    ModalTaskProblemAdd,
    Confirm,
  },

  data() {
    return {
      isLoading: false,
      isUpdating: false,
      showModalAdd: false,
      showModalConfirm: false,
    };
  },

  computed: {
    ...taskNamespace.mapState({
      tasks: 'tasks',
    }),
  },

  methods: {
    ...taskNamespace.mapActions([
      'FETCH_PROBLEMS',
      'UPDATE_PROBLEM',
      'DELETE_PROBLEM',
    ]),
    
    getTasks() {
      this.isLoading = true;
      this.FETCH_PROBLEMS({
        pid: this.$route.params.pid,
      })
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
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

    deleteTask(id) {
      this.DELETE_PROBLEM({
        id,
      })
        .then((data) => {
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onDelete(id) {
      this.$refs.confirm.open('문제점 삭제', '정말 삭제 하시겠습니까?', { color: 'orange' })
        .then((confirm) => {
          if(confirm) this.deleteTask(id);
          else return;
        });
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

