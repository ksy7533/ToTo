<template>
  <v-content>
    <v-container fluid fill-height style="padding:0" >
      <v-layout wrap>
        <v-flex xs12>
          <v-toolbar flat height="56px" style="border-bottom:1px solid rgba(0,0,0,.12)">
            <v-toolbar-title>오늘 : {{this.now}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="$refs.calendar.prev()">
              <v-icon
                dark
              >
                keyboard_arrow_left
              </v-icon>
            </v-btn>
            <v-btn color="primary" class="white--text" @click="goToday">
              오늘로 이동
            </v-btn>
            <v-btn color="white" @click="$refs.calendar.next()">
              <v-icon
                dark
              >
                keyboard_arrow_right
              </v-icon>
            </v-btn>
          </v-toolbar>

          <v-sheet height="calc(100% - 57px)" v-if="!this.isLoading">
            <v-calendar
              :now="now"
              v-model="today"
              :value="today"
              :type="type"
              color="primary"
              ref="calendar"
            >
              <template v-slot:day="{ date }">
                <template v-if="todoEventsMap[date]">
                  <v-menu
                    full-width
                    offset-x
                  >
                    <template v-slot:activator="{ on }">
                      <div
                        v-ripple
                        class="my-event todo"
                        v-on="on"
                      >할일 +{{todoEventsMap[date].length}}</div>
                    </template>
                    <v-card
                      color="grey lighten-4"
                      min-width="350px"
                      flat
                    >
                      <v-toolbar
                        color="blue"
                        dark
                      >
                        <v-toolbar-title>할일</v-toolbar-title>
                      </v-toolbar>
                      <v-list>
                        <v-list-tile
                          v-for="event in todoEventsMap[date]"
                          :key="event.title"
                          avatar
                          @click=""
                        >
                          <v-list-tile-content>
                            <v-list-tile-title v-text="event.title"></v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-menu>
                </template>

                <template v-if="problemEventsMap[date]">
                  <v-menu
                    full-width
                    offset-x
                  >
                    <template v-slot:activator="{ on }">
                      <div
                        v-ripple
                        class="my-event problem"
                        v-on="on"
                      >문제점 +{{problemEventsMap[date].length}}</div>
                    </template>
                    <v-card
                      color="grey lighten-4"
                      min-width="350px"
                      flat
                    >
                      <v-toolbar
                        color="pink"
                        dark
                      >
                        <v-toolbar-title>문제점</v-toolbar-title>
                      </v-toolbar>
                      <v-list>
                        <v-list-tile
                          v-for="event in problemEventsMap[date]"
                          :key="event.title"
                          avatar
                          @click=""
                        >
                          <v-list-tile-content>
                            <v-list-tile-title v-text="event.title"></v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-menu>
                </template>

                <template v-if="concernEventsMap[date]">
                  <v-menu
                    full-width
                    offset-x
                  >
                    <template v-slot:activator="{ on }">
                      <div
                        v-ripple
                        class="my-event concern"
                        v-on="on"
                      >고민사항 +{{concernEventsMap[date].length}}</div>
                    </template>
                    <v-card
                      color="grey lighten-4"
                      min-width="350px"
                      flat
                    >
                      <v-toolbar
                        color="purple"
                        dark
                      >
                        <v-toolbar-title>고민사항</v-toolbar-title>
                      </v-toolbar>
                      <v-list>
                        <v-list-tile
                          v-for="event in concernEventsMap[date]"
                          :key="event.title"
                          avatar
                          @click=""
                        >
                          <v-list-tile-content>
                            <v-list-tile-title v-text="event.title"></v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-menu>
                </template>

              </template>
            </v-calendar>
          </v-sheet>
          <div v-else>
            loading...
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import moment,{ duration } from 'moment';
import { mapActions } from 'vuex';

export default {
  data(){
    return {
      isLoading: false,
      today: '', // 오늘을 알고 무슨달인지 알기위해
      now: '', // 오늘이 몇일인지를 위해
      type: 'month',
      todoEvents: [],
      problemEvents: [],
      concernEvents: [],
    }
  },
  computed: {
    todoEventsMap () {
      const map = {};
      this.todoEvents.forEach(e => (map[e.regDate] = map[e.regDate] || []).push(e));
      return map;
    },

    problemEventsMap () {
      const map = {};
      this.problemEvents.forEach(e => (map[e.regDate] = map[e.regDate] || []).push(e));
      return map;
    },

    concernEventsMap () {
      const map = {};
      this.concernEvents.forEach(e => (map[e.regDate] = map[e.regDate] || []).push(e));
      return map;
    },
  },

  watch: {
    today(oldVal, newVal) {
      this.getCalendar();
    },
  },

  methods: {
    ...mapActions([
      'FETCH_PROJECT_CALENDAR',
    ]),

    open (event) {
      alert(event.title)
    },

    getCalendar() {
      this.isLoading = true;
      const startDateOfMonth = moment(this.today).startOf('month').format('YYYY-MM-DD');
      const endDateOfMonth = moment(this.today).endOf('month').format('YYYY-MM-DD');

      this.FETCH_PROJECT_CALENDAR({
        pid: this.$route.params.pid,
        duration: {
          startDateOfMonth,
          endDateOfMonth,
        },
      })
        .then((result) => {
          this.todoEvents = result[0].todos || [];
          this.problemEvents = result[0].problems || [];
          this.concernEvents = result[0].concerns || [];
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    goToday() {
      this.today = this.now;
    },
  },

  created() {
    this.now = moment().format("YYYY-MM-DD");
    this.goToday();
  },
}
</script>

<style lang="scss" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    color: #ffffff;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;

    &.todo {
      background-color: #2196f3;
      border: 1px solid #2196f3;
    }

    &.problem {
      background-color: #e91e63;
      border: 1px solid #e91e63;
    }

    &.concern {
      background-color: #9c27b0;
      border: 1px solid #9c27b0;
    }
  }
</style>


