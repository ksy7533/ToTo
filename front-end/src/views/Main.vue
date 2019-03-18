<template>
  <v-app>
    <Header></Header>
    
    <v-content>
      <v-container grid-list-md fluid>
        <v-layout row wrap align-start justify-start>
          <v-flex
              v-for="(item, index) in projects"
              :key="index"
              pa-1
              xs2
            >
            <v-card
              hover
              :to="`/project/${item.id}/home`"
            >
              <v-card-title class="primary lighten-1 white--text title">
                <p class="mb-0">{{item.title}}</p>
              </v-card-title>
              <v-card-text>
                <p>할일 ({{calcCompleteCount(item.todos)}}/{{item.todos.length}})</p>
                <v-progress-linear
                  color="blue"
                  height="10"
                  :value="calcRate(calcCompleteCount(item.todos), item.todos.length)"
                  query
                ></v-progress-linear>
                <p>문제점 ({{calcCompleteCount(item.problems)}}/{{item.problems.length}})</p>
                <v-progress-linear
                  color="pink"
                  height="10"
                  :value="calcRate(calcCompleteCount(item.problems), item.problems.length)"
                ></v-progress-linear>
                <p>고민사항 (4/10)</p>
                <v-progress-linear
                  color="purple"
                  height="10"
                  value="45"
                ></v-progress-linear>
              </v-card-text>
              <v-divider light></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          프로젝트 생성
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex>
              <v-text-field
                v-model="title"
                prepend-icon="notes"
                placeholder="프로젝트 이름을 입력해주세요"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">취소</v-btn>
          <v-btn flat @click="addProject">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '../components/header/Header';

export default {
  components: { Header },

  data() {
    return {
      isLoding: false,
      title: '',

      dialog: false,
    };
  },

  computed: {
    ...mapState({
      projects: 'projects',
    }),
  },

  methods: {
    ...mapActions([
      'FETCH_PROJECTS',
      'ADD_PROJECT',
    ]),

    addProject() {
      this.ADD_PROJECT({
        title: this.title,
      })
        .then(() => {
          this.title = '';
          this.dialog = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getProjects() {
      this.isLoding = true;
      this.FETCH_PROJECTS()
        .then((result) => {
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoding = false;
        });
    },

    calcCompleteCount(arr) {
      const result = arr.filter((item) => item.completed);
      return result.length;
    },

    calcRate(num, total) {
      if(num === 0) return 0;
      return parseInt((num / total) * 100);
    }
  },

  created() {
    this.getProjects();
  },
};
</script>

<style lang="scss" scoped>
</style>

