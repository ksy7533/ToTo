<template>
  <v-layout fill-height>
    <v-flex>
      <v-card hover>
        <v-toolbar dense dark flat color="blue">
          <v-toolbar-title>오늘할일</v-toolbar-title>
        </v-toolbar>
        
        <v-list two-line style="padding:0" v-if="this.todayTasks.length">
          <template v-for="(item, index) in this.todayTasks">
            <v-divider
              v-if="index !== 0"
              :key="`${item.title}-${index}`"
            ></v-divider>
            <v-list-tile
              :key="item.createdAt"
              :class="{completed: item.completed}"
              :to="{name: 'todoDetail', params: {tid: item.id}}"
            >
              <v-list-tile-action>
                <v-icon v-if="item.completed">check_box</v-icon>
                <v-icon v-else>check_box_outline_blank</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title>{{item.regDate}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-avatar v-if="item.priority">
                <v-icon color="pink lighten-1">priority_high</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-action>
                <v-layout>
                  <v-flex ml-3>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn fab small v-on="on" @click.prevent="onDelete(item.id)">
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
            <v-list-tile-title style="text-align:center">등록된 할일이 없습니다.</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-card>

      <v-card hover style="margin-top:20px">
        <v-toolbar dense dark flat color="secondary lighten-2">
          <v-toolbar-title>지난할일</v-toolbar-title>
        </v-toolbar>
        <v-list two-line style="padding:0" v-if="this.notTodayTasks.length">
          <template v-for="(item, index) in this.notTodayTasks">
            <v-divider
              v-if="index !== 0"
              :key="`${item.title}-${index}`"
            ></v-divider>
            <v-list-tile
              :key="item.createdAt"
              :class="{completed: item.completed}"
              :to="{name: 'todoDetail', params: {tid: item.id}}"
            >
              <v-list-tile-action>
                <v-icon v-if="item.completed">check_box</v-icon>
                <v-icon v-else>check_box_outline_blank</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title>{{item.regDate}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-avatar>
                <v-icon color="pink lighten-1" v-if="item.priority">priority_high</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-action>
                <v-layout>
                  <v-flex ml-3>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn fab small v-on="on" @click.prevent="onDelete(item.id)">
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
            <v-list-tile-title style="text-align:center">등록된 할일이 없습니다.</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>

    <v-btn
      fab
      bottom
      right
      color="blue"
      dark
      fixed
      @click="showModalAdd = true"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <modal-add
      v-model="showModalAdd"
      :workType="'todo'"
    ></modal-add>

    <confirm ref="confirm"></confirm>

    <!-- ModalTaskTodoDetail -->
    <router-view :workType="'todo'"></router-view>
    <!--// ModalTaskTodoDetail -->
  </v-layout>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ModalAdd from '../modal/ModalAdd';
import Confirm from '../common/Confirm';
import moment from 'moment';
const taskNamespace = createNamespacedHelpers('taskStore');

/**
 * 1. 해당 tasks를 불러와서 첫번째 todo의 id 값을 가져온뒤 state todo에 저장한다.
 * 2. 저장한 todo의 id값을 route params에저장한다.
 */

export default {
  components: {
    ModalAdd,
    Confirm,
  },

  data() {
    return {
      isLoading: false,
      isUpdating: false,
      showModalAdd: false,
    };
  },

  computed: {
    ...taskNamespace.mapState({
      tasks: 'tasks',
    }),

    todayTasks() {
      const today = moment().format("YYYY-MM-DD");
      return this.tasks.filter(item => item.regDate === today);
    },

    notTodayTasks() {
      const today = moment().format("YYYY-MM-DD");
      return this.tasks.filter(item => item.regDate !== today);
    },
  },

  methods: {
    ...taskNamespace.mapActions([
      'FETCH_TODOS',
      'UPDATE_TODO',
      'DELETE_TODO',
    ]),
    
    getTasks() {
      this.isLoading = true;
      this.FETCH_TODOS({
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
      console.log(isChecked)
      this.updateTask(id, {completed: isChecked});
    },

    deleteTask(id) {
      this.DELETE_TODO({
        id,
      })
        .then((data) => {
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onDelete(id) {
      this.$refs.confirm.open('할일 삭제', '정말 삭제 하시겠습니까?', { color: 'orange' })
        .then((confirm) => {
          if(confirm) this.deleteTask(id);
          else return;
        });
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

