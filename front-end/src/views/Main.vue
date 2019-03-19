<template>
  <v-app>
    <Header></Header>
    
    <v-content v-if="projects">
      <v-container grid-list-md fluid>
        <v-layout row wrap align-start justify-start>
          <v-flex
              v-for="(item, index) in projects"
              :key="index"
              pa-2
              xs12
              sm4
              md3
              lg3
              xl2
            >
            <v-card
              hover
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
                <p>고민사항 ({{calcCompleteCount(item.concerns)}}/{{item.concerns.length}})</p>
                <v-progress-linear
                  color="purple"
                  height="10"
                  :value="calcRate(calcCompleteCount(item.concerns), item.concerns.length)"
                ></v-progress-linear>
              </v-card-text>
              <v-divider light></v-divider>
              <v-card-actions>
                <v-btn flat small :to="`/project/${item.id}/home`">더보기</v-btn>
                <v-spacer></v-spacer>
                <v-btn flat small @click="onDelete(item.id)">삭제</v-btn>
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
      @click="showModalAdd = true"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <modal-main-add
      v-model="showModalAdd"
    ></modal-main-add>

    <confirm ref="confirm"></confirm>
    
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '../components/header/Header';
import ModalMainAdd from '../components/modal/ModalMainAdd';
import Confirm from '../components/common/Confirm';

export default {
  components: {
    Header,
    ModalMainAdd,
    Confirm,
  },

  data() {
    return {
      isLoding: false,
      title: '',
      showModalAdd: false,
      showModalConfirm: false,
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
      'DELETE_PROJECT',
    ]),

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

    deleteProject(id) {
      this.DELETE_PROJECT({ id })
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        })
    },

    onDelete(id) {
      this.$refs.confirm.open('프로젝트 삭제', '정말 삭제 하시겠습니까?', { color: 'orange' })
        .then((confirm) => {
          if(confirm) this.deleteProject(id);
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
    this.getProjects();
  },
};
</script>

<style lang="scss" scoped>
</style>

