<template>
  <v-content>
    <v-container fluid fill-height style="padding:0" >
      <v-layout wrap>
        <v-flex
          xs2
          class="text-sm-left text-xs-center"
        >
          <v-card>
            <v-btn fab @click="$refs.calendar.prev()">
              <v-icon
                dark
              >
                keyboard_arrow_left
              </v-icon>
            </v-btn>
            <v-btn fab @click="$refs.calendar.next()">
              <v-icon
                dark
              >
                keyboard_arrow_right
              </v-icon>
            </v-btn>
          </v-card>
        </v-flex>
        <v-flex xs10>
          <v-sheet height="100%">
            <v-calendar
              :now="today"
              v-model="today"
              :value="today"
              :type="type"
              color="primary"
              ref="calendar"
            >
              <template v-slot:day="{ date }">
                <template v-for="event in eventsMap[date]">
                  <v-menu
                    :key="event.title"
                    v-model="event.open"
                    full-width
                    offset-x
                  >
                    <template v-slot:activator="{ on }">
                      <div
                        v-if="!event.time"
                        v-ripple
                        class="my-event"
                        v-on="on"
                        v-html="event.title"
                      ></div>
                    </template>
                    <v-card
                      color="grey lighten-4"
                      min-width="350px"
                      flat
                    >
                      <v-toolbar
                        color="primary"
                        dark
                      >
                        <v-btn icon>
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-toolbar-title v-html="event.title"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon>favorite</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon>more_vert</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-card-title primary-title>
                        <span v-html="event.details"></span>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn
                          flat
                          color="secondary"
                        >
                          Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </template>
              </template>
            </v-calendar>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';

export default {
  data: () => ({
    today: '',
    type: 'month',
    events: [
      {
        title: 'Vacation',
        details: 'Going to the beach!',
        date: '2018-12-30',
        open: false
      },
      {
        title: 'Vacation',
        details: 'Going to the beach!',
        date: '2018-12-31',
        open: false
      },
      {
        title: 'Vacation',
        details: 'Going to the beach!',
        date: '2019-01-01',
        open: false
      },
      {
        title: 'Meeting',
        details: 'Spending time on how we do not have enough time',
        date: '2019-01-07',
        open: false
      },
      {
        title: '30th Birthday',
        details: 'Celebrate responsibly',
        date: '2019-01-03',
        open: false
      },
      {
        title: 'New Year',
        details: 'Eat chocolate until you pass out',
        date: '2019-01-01',
        open: false
      },
      {
        title: 'Conference',
        details: 'Mute myself the whole time and wonder why I am on this call',
        date: '2019-01-21',
        open: false
      },
      {
        title: 'Hackathon',
        details: 'Code like there is no tommorrow',
        date: '2019-02-01',
        open: false
      }
    ]
  }),
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  methods: {
    ...mapActions([
      'FETCH_CALENDAR',
    ]),

    open (event) {
      alert(event.title)
    },

    getCalendar() {
      // this.isLoading = true;
      const startDateOfMonth = moment(this.today).startOf('month').format('YYYY-MM-DD');
      const endDateOfMonth = moment(this.today).endOf('month').format('YYYY-MM-DD');

      this.FETCH_CALENDAR({
        startDateOfMonth,
        endDateOfMonth,
      })
        .then(() => {
          // console.log('getProject 성공!');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // this.isLoading = false;
        });
    }
  },

  created() {
    this.today = moment().format("YYYY-MM-DD");
  },

  mounted() {
    this.getCalendar();
  }
}
</script>

<style lang="scss" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
</style>

