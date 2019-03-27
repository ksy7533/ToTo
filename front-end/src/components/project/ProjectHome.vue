<template>
  <v-content v-if="project">
    <v-container grid-list-md fluid>
      <v-layout row wrap align-start justify-start>
        <v-flex
          pa-2
          xs12
          sm12
          md4
        >
          <v-card hover>
            <v-card-title class="blue white--text">
              <span class="title">할일</span>
            </v-card-title>
            <v-card-text>
              <v-layout align-center>
                <v-flex xs7>
                  <v-progress-circular
                    :rotate="-90"
                    :size="150"
                    :width="15"
                    :value="calcRate(calcCompleteCount(project.todos), project.todos.length)"
                    color="blue"
                  >
                    {{calcRate(calcCompleteCount(project.todos), project.todos.length)}}%
                  </v-progress-circular>
                </v-flex>
                <v-flex xs5>
                  <p>합계 : {{project.todos.length}}</p>
                  <p>완료 : {{calcCompleteCount(project.todos)}}</p>
                  <p style="margin-bottom:0">미완료 : {{project.todos.length - calcCompleteCount(project.todos)}}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat :to="`/project/${project.id}/task/todo`">더보기</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex
          pa-2
          xs12
          sm12
          md4
        >
          <v-card hover>
            <v-card-title class="pink white--text">
              <span class="title">문제점</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-layout align-center>
                <v-flex xs7>
                  <v-progress-circular
                    :rotate="-90"
                    :size="150"
                    :width="15"
                    :value="calcRate(calcCompleteCount(project.problems), project.problems.length)"
                    color="pink"
                  >
                    {{calcRate(calcCompleteCount(project.problems), project.problems.length)}}%
                  </v-progress-circular>
                </v-flex>
                <v-flex xs5>
                  <p>합계 : {{project.problems.length}}</p>
                  <p>완료 : {{calcCompleteCount(project.problems)}}</p>
                  <p style="margin-bottom:0">미완료 : {{project.problems.length - calcCompleteCount(project.problems)}}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat :to="`/project/${project.id}/task/problem`">더보기</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex
          pa-2
          xs12
          sm12
          md4
        >
          <v-card hover>
            <v-card-title class="purple white--text">
              <span class="title">고민사항</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-layout align-center>
                <v-flex xs7>
                  <v-progress-circular
                    :rotate="-90"
                    :size="150"
                    :width="15"
                    :value="calcRate(calcCompleteCount(project.concerns), project.concerns.length)"
                    color="purple"
                  >
                    {{calcRate(calcCompleteCount(project.concerns), project.concerns.length)}}%
                  </v-progress-circular>
                </v-flex>
                <v-flex xs5>
                  <p>합계 : {{project.concerns.length}}</p>
                  <p>완료 : {{calcCompleteCount(project.concerns)}}</p>
                  <p style="margin-bottom:0">미완료 : {{project.concerns.length - calcCompleteCount(project.concerns)}}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat :to="`/project/${project.id}/task/concern`">더보기</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex
          pa-2
          xs12
          sm12
          md4
        >
          <v-card hover>
            <v-card-title class="red white--text">
              <span class="title">미완료된 오늘 할일</span>
            </v-card-title>
            <v-data-table
              no-data-text="등록된 할일이 없습니다"
              :rows-per-page-items="rowsPerPageItems"
              :items="todayIncompletedItems"
              hide-headers
            >
              <template v-slot:items="props">
                <td>
                  <v-chip color="red" text-color="white" v-if="props.item.priority">급함</v-chip>
                  <v-chip color="blue" text-color="white" v-else>보통</v-chip>
                </td>
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.regDate }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>

        <v-flex
          pa-2
          xs12
          sm12
          md4
        >
          <v-card hover>
            <v-card-title class="grey white--text">
              <span class="title">미완료된 지난 할일</span>
            </v-card-title>
            <v-data-table
              :rows-per-page-items="rowsPerPageItems"
              :items="pastIncompletedItems"
              hide-headers
            >
              <template v-slot:items="props">
                <td width="20%">
                  <v-chip color="red" text-color="white" v-if="props.item.priority">급함</v-chip>
                  <v-chip color="blue" text-color="white" v-else>보통</v-chip>
                </td>
                <td width="40%">{{ props.item.title }}</td>
                <td width="25%">{{ props.item.regDate }}</td>
                <td width="15%"><v-btn color="orange" flat icon @click="onRegTodayTodo(props.item.id)"><v-icon>add_alert</v-icon></v-btn></td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <confirm ref="confirm"></confirm>

  </v-content>
</template>

<script>
import Confirm from '../common/Confirm';
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  components: {
    Confirm,
  },

  computed: {
    ...mapState({
      project: 'project',
    }),

    pastIncompletedItems() {
      const today = moment().format("YYYY-MM-DD");
      return this.incompletedItems.filter(item => item.regDate !== today);
    },

    todayIncompletedItems() {
      const today = moment().format("YYYY-MM-DD");
      return this.incompletedItems.filter(item => item.regDate === today);
    }
  },

  data() {
    return {
      isLoading: false,
      incompletedItems: [], // 미완료된 할일
      rowsPerPageItems: [5],
    }
  },

  methods: {
    ...mapActions([
      'FETCH_PROJECT',
      'FETCH_TODO_INCOMPLETE',
      'UPDATE_TODO',
    ]),

    getProject() {
      this.isLoading = true;
      this.FETCH_PROJECT({
        id: this.$route.params.pid,
      })
        .then(() => {
          console.log('getProject 성공!');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    getTodoIncomplete() {
      this.FETCH_TODO_INCOMPLETE({
        pid: this.$route.params.pid,
      })
        .then((result) => {
          this.incompletedItems = result;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          
        });
    },

    updateTask(id, payload) {
      this.UPDATE_TODO({
        id,
        payload,
      })
        .then((data) => {
          this.getTodoIncomplete();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isUpdating = false;
        });
    },

    onRegTodayTodo(id) {
      this.$refs.confirm.open('할일 등록', '오늘 할일로 등록 하시겠습니까?', { color: 'orange' })
        .then((confirm) => {
          const today = moment().format("YYYY-MM-DD");
          if(confirm) this.updateTask(id, {regDate: today});
          else return;
        });
    },

    calcCompleteCount(arr) {
      return (arr.filter((item) => item.completed)).length;
    },

    calcRate(num, total) {
      if(num === 0) return 0;
      return parseInt((num / total) * 100);
    },
  },

  created() {
    this.getProject();
    this.getTodoIncomplete();
  },
};
</script>

<style lang="scss" scoped>
</style>

