<template>
  <v-content>
    <v-container grid-list-md fluid>
      <v-layout row wrap align-start justify-start>
        <v-flex
          xs12
        >
          <v-card hover>
            <v-card-title class="red white--text">
              <span class="title">미완료된 오늘 할일</span>
            </v-card-title>
            <v-data-table
              no-data-text="등록된 할일이 없습니다"
              :rows-per-page-items="rowsPerPageItems"
              :items="todayIncompletedItems"
              :headers="todayIncompletedHeaders"
            >
              <template v-slot:items="props">
                <td width="20%">
                  <span class="red--text" v-if="props.item.priority">급함</span>
                  <span v-else>보통</span>
                </td>
                <td width="60%">{{ props.item.title }}</td>
                <td width="20%">{{ props.item.regDate }}</td>
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
              <span class="title">미완료된 지난 할일</span>
            </v-card-title>
            <v-data-table
              no-data-text="등록된 할일이 없습니다"
              :rows-per-page-items="rowsPerPageItems"
              :items="pastIncompletedItems"
              :headers="pastIncompletedHeaders"
            >
              <template v-slot:items="props">
                <td width="20%">
                  <span class="red--text" v-if="props.item.priority">급함</span>
                  <span v-else>보통</span>
                </td>
                <td width="40%">{{ props.item.title }}</td>
                <td width="25%">{{ props.item.regDate }}</td>
                <td width="15%"><v-btn color="orange" flat icon @click="onRegTodayTodo(props.item.id)"><v-icon>add_circle_outline</v-icon></v-btn></td>
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
        { text: '우선순위', value: 'priority', sortable: false, },
        { text: '제목', value: 'title', sortable: false, },
        { text: '등록일', value: 'regDate' },
      ],

      pastIncompletedHeaders: [
        { text: '우선순위', value: 'priority', sortable: false, },
        { text: '제목', value: 'title', sortable: false, },
        { text: '등록일', value: 'regDate' },
        { text: '오늘업무등록', sortable: false, },
      ],
    }
  },

  methods: {
    ...mapActions([
      'FETCH_TODOS_INCOMPLETE',
      'UPDATE_TODO',
    ]),

    getIncompleteTodos() {
      this.FETCH_TODOS_INCOMPLETE({
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
          this.getIncompleteTodos();
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
  },

  created() {
    this.getIncompleteTodos();

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

