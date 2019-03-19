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
                    :value="10"
                    color="purple"
                  >
                    {{ 10 }}
                  </v-progress-circular>
                </v-flex>
                <v-flex xs5>
                  <p>합계 : 10</p>
                  <p>완료 : 5</p>
                  <p style="margin-bottom:0">미완료 : 5</p>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat>더보기</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {

  computed: {
    ...mapState({
      project: 'project',
    }),
  },

  data() {
    return {
      isLoading: false,
    }
  },

  methods: {
    ...mapActions([
      'FETCH_PROJECT',
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
  },
};
</script>

<style lang="scss" scoped>
</style>

