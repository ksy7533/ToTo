<template>
  <v-app v-if="!isLoading">
    <v-content v-if="projects">
      <v-container grid-list-md fluid style="height:100%;padding-bottom:60px">
        <v-layout row wrap align-start justify-start v-if="projects.length">
          <v-flex
            v-for="(item, index) in projects"
            :key="`${item.title}-${item.id}-${index}`"
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
                <div @click="goWork(item, 'todo')">
                  <p>할일 ({{calcCompleteCount(item.todos)}}/{{item.todos.length}})</p>
                  <v-progress-linear
                    color="blue"
                    height="10"
                    :value="calcRate(calcCompleteCount(item.todos), item.todos.length)"
                    query
                  ></v-progress-linear>
                </div>

                <div @click="goWork(item, 'problem')">
                  <p>문제점 ({{calcCompleteCount(item.problems)}}/{{item.problems.length}})</p>
                  <v-progress-linear
                    color="pink"
                    height="10"
                    :value="calcRate(calcCompleteCount(item.problems), item.problems.length)"
                  ></v-progress-linear>
                </div>

                <div @click="goWork(item, 'concern')">
                  <p>고민사항 ({{calcCompleteCount(item.concerns)}}/{{item.concerns.length}})</p>
                  <v-progress-linear
                    color="purple"
                    height="10"
                    :value="calcRate(calcCompleteCount(item.concerns), item.concerns.length)"
                  ></v-progress-linear>
                </div>
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

        <v-layout align-center justify-center row fill-height v-else class="title">
          등록된 프로젝트가 없습니다. 새로운 프로젝트를 시작하세요!
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

    <modal-add
      v-model="showModalAdd"
      :workType="'project'"
    ></modal-add>

    <confirm ref="confirm"></confirm>
    
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Header from '../components/header/Header';
import ModalAdd from '../components/modal/ModalAdd';
import Confirm from '../components/common/Confirm';
import viewsMixin from '../mixins/viewsMixin.js';
const projectNamespace = createNamespacedHelpers('projectStore');

export default {
  mixins: [viewsMixin],

  components: {
    Header,
    ModalAdd,
    Confirm,
  },

  computed: {
    ...projectNamespace.mapState({
      projects: 'projects',
    })
  },

  data() {
    return {
      title: '',
      showModalAdd: false,
      showModalConfirm: false,
    };
  },

  methods: {
    ...projectNamespace.mapActions([
      'FETCH_PROJECTS',
      'DELETE_PROJECT',
    ]),

    getProjects() {
      this.TOGGLE_IS_LOADING(true);
      this.FETCH_PROJECTS()
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.TOGGLE_IS_LOADING(false);
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

    goWork(item, type) {
      this.$router.push(`/project/${item.id}/task/${type}`);
    }
  },

  created() {
    this.getProjects();
  },
};
</script>

<style lang="scss" scoped>
</style>

