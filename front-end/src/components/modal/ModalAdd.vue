<template>
  <v-dialog v-model="show" width="500px">
    <v-card>
      <v-card-title
        class="grey lighten-4 py-4 title"
      >
        {{this.translateTitle}} 생성
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-flex>
            <v-text-field
              v-model="title"
              prepend-icon="notes"
              placeholder="제목을 입력해주세요"
              @keyup.enter="addWork"
              ref="inputTit"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="show = false">취소</v-btn>
        <v-btn flat @click="addWork">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const projectNamespace = createNamespacedHelpers('projectStore');
const taskNamespace = createNamespacedHelpers('taskStore');

const WORK_TITLE = {
  'project': '프로젝트',
  'todo': '할일',
  'problem': '문제',
  'concern': '고민사항',
}

export default {
  props: {
    value: Boolean,
    workType: String,
  },

  computed: {
    show: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      }
    },

    invalidForm() {
      return !this.title;
    },

    translateTitle() {
      return WORK_TITLE[this.workType];
    },
  },

  data() {
    return {
      title: '',
    };
  },

  watch: {
    show: function(val) {
      if(!val) return;
      this.$nextTick(this.$refs.inputTit.focus);
    },
  },

  methods: {
    ...projectNamespace.mapActions([
      'ADD_PROJECT',
    ]),

    ...taskNamespace.mapActions([
      'ADD_TODO',
      'ADD_PROBLEM',
      'ADD_CONCERN',
    ]),

    addProject() {
      this.ADD_PROJECT({
          title: this.title,
        })
        .then(() => {
          this.title = '';
          this.show = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addTodo() {
      this.ADD_TODO({
          title: this.title,
          pid: this.$route.params.pid,
        })
        .then(() => {
          this.title = '';
          this.show = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addProblem() {
      this.ADD_PROBLEM({
          title: this.title,
          pid: this.$route.params.pid,
        })
        .then(() => {
          this.title = '';
          this.show = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addConcern() {
      this.ADD_CONCERN({
          title: this.title,
          pid: this.$route.params.pid,
        })
        .then(() => {
          this.title = '';
          this.show = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addWork() {
      if(!this.title.length) return;
      this.title = this.title.trim();
      if(this.workType === 'project') {
        this.addProject();
      }else if(this.workType === 'todo') {
        this.addTodo();
      }else if(this.workType === 'problem') {
        this.addProblem();
      }else if(this.workType === 'concern') {
        this.addConcern();
      }
    }
  },
}
</script>

<style>

</style>