<template>
  <v-content>
    <v-container grid-list-md fluid>
      <v-layout row wrap align-start justify-start>
        <v-flex
          xs12
        >
          <v-card hover>
            <v-card-title class="pink white--text">
              <span class="title">미완료된 오늘 업무</span>
            </v-card-title>
            <v-data-table
              no-data-text="등록된 업무가 없습니다"
              :rows-per-page-items="rowsPerPageItems"
              :items="todayIncompletedItems"
              :headers="todayIncompletedHeaders"
            >
              <template v-slot:items="props">
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.title }}</td>
                <td>
                  <span class="red--text" v-if="props.item.priority">급함</span>
                  <span v-else>보통</span>
                </td>
                <td>{{ props.item.regDate }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>

        <v-flex
          xs12
          style="margin-top:20px"
        >
          <v-card hover>
            <v-card-title class="grey white--text">
              <span class="title">미완료된 지난 업무</span>
            </v-card-title>
            <v-data-table
              no-data-text="등록된 업무가 없습니다"
              :rows-per-page-items="rowsPerPageItems"
              :items="pastIncompletedItems"
              :headers="pastIncompletedHeaders"
            >
              <template v-slot:items="props">
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.title }}</td>
                <td>
                  <span class="red--text" v-if="props.item.priority">급함</span>
                  <span v-else>보통</span>
                </td>
                <td>{{ props.item.regDate }}</td>
                <td class="text-xs-center"><v-btn color="orange" flat icon @click="onRegTodayTodo(props.item.id, props.item.type)"><v-icon>add_circle_outline</v-icon></v-btn></td>
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
import { mapActions, createNamespacedHelpers } from 'vuex';
import moment from 'moment';
const taskNamespace = createNamespacedHelpers('taskStore');
const WORK_TYPE_NAME = [{
    type: 'todo',
    name: '할일',
  }, {
    type: 'problem',
    name: '문제점',
  }, {
    type: 'concern',
    name: '고민사항',
  }];

export default {
  components: {
    Confirm,
  },

  computed: {
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
      incompletedItems: [], // 미완료된 할일
      rowsPerPageItems: [5],

      todayIncompletedHeaders: [
        { text: '타입', align: 'left', value: 'type', sortable: false, },
        { text: '업무제목', align: 'left', value: 'title', sortable: false, },
        { text: '등급', align: 'left', value: 'priority', sortable: false, },
        { text: '등록날짜', align: 'left', value: 'regDate' },
      ],

      pastIncompletedHeaders: [
        { text: '타입', align: 'left', value: 'type', sortable: false, },
        { text: '업무제목', align: 'left', value: 'title', sortable: false, },
        { text: '등급', align: 'left', value: 'priority', sortable: false, },
        { text: '등록날짜', align: 'left', value: 'regDate' },
        { text: '오늘등록', align: 'center', sortable: false, },
      ],
    }
  },

  methods: {
    ...mapActions([
      'FETCH_WORKS_INCOMPLETE',
    ]),

    ...taskNamespace.mapActions([
      'UPDATE_TODO',
      'UPDATE_PROBLEM',
      'UPDATE_CONCERN',
    ]),

    getIncompleteWorks() {
      this.FETCH_WORKS_INCOMPLETE({
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

    updateWork(id, type, payload) {
      if(type === 'todo') {
        this.UPDATE_TODO({
          id,
          payload,
        })
          .then((data) => {
            this.getIncompleteWorks();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isUpdating = false;
          });
      }else if(type === 'problem') {
        this.UPDATE_PROBLEM({
          id,
          payload,
        })
          .then((data) => {
            this.getIncompleteWorks();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isUpdating = false;
          });
      }else if(type === 'concern') {
        this.UPDATE_CONCERN({
          id,
          payload,
        })
          .then((data) => {
            this.getIncompleteWorks();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isUpdating = false;
          });
      }
    },

    onRegTodayTodo(id, type) {
      this.$refs.confirm.open('할일 등록', '오늘 할일로 등록 하시겠습니까?', { color: 'orange' })
        .then((confirm) => {
          const today = moment().format("YYYY-MM-DD");
          if(confirm) this.updateWork(id, type, {regDate: today});
          else return;
        });
    },
  },

  created() {
    this.getIncompleteWorks();
  },
};
</script>

<style lang="scss" scoped>
/deep/ table{
  &.v-table {
    thead {
      th {
        font-size: 16px;
      }
    }

    tbody {
      td {
        font-size: 16px;
      }
    }
  }
}
</style>

