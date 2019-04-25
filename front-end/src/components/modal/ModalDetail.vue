<template>
  <v-dialog v-model="showModal" width="500px" v-if="this.form">
    <v-card>
      <v-card-title class="grey lighten-4 py-4 title">
        할일 상세정보
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <template v-if="workType === 'todo'">
            <v-flex xs6>
              <v-checkbox
                v-model="form.completed"
                :label="`완료여부`"
              ></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-checkbox
                v-model="form.priority"
                :label="`우선선위`"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="form.title"
                label="제목"
                type="text"
                prepend-inner-icon="short_text"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="form.content"
                auto-grow
                label="내용"
                rows="1"
                prepend-inner-icon="notes"
              ></v-textarea>
            </v-flex>
          </template>

          <template v-else-if="workType === 'problem'">
            <v-flex xs12>
              <v-checkbox
                v-model="form.completed"
                :label="`완료여부`"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="form.title"
                label="제목"
                type="text"
                prepend-inner-icon="short_text"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="form.situation"
                auto-grow
                label="상황"
                rows="1"
                prepend-inner-icon="notes"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="form.cause"
                auto-grow
                label="원인"
                rows="1"
                prepend-inner-icon="notes"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="form.solution"
                auto-grow
                label="해결방안"
                rows="1"
                prepend-inner-icon="notes"
              ></v-textarea>
            </v-flex>
          </template>

          <template v-else-if="workType === 'concern'">
            <v-flex xs12>
              <v-checkbox
                v-model="form.completed"
                :label="`완료여부`"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="form.title"
                label="제목"
                type="text"
                prepend-inner-icon="short_text"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="form.situation"
                auto-grow
                label="상황"
                rows="1"
                prepend-inner-icon="notes"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="form.solution"
                auto-grow
                label="해결방안"
                rows="1"
                prepend-inner-icon="notes"
              ></v-textarea>
            </v-flex>
          </template>

        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="close">취소</v-btn>
        <v-btn flat @click="onSubmit" :disabled="invalidForm">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const taskNamespace = createNamespacedHelpers('taskStore');

const WORK_TITLE = {
  'todo': '할일',
  'problem': '문제',
  'concern': '고민사항',
}

export default {
  props: {
    workType: String,
  },

  computed: {
    invalidForm() {
      return !this.form.title;
    },
  },

  watch: {
    showModal (val) {
      if(!val) {
        this.$router.push({ name: this.workType });
      }
    }
  },

  data() {
    return {
      showModal: false,
      form: null,
      prevRouteName: '',
    };
  },

  methods: {
    ...taskNamespace.mapActions([
      'FETCH_TODO',
      'UPDATE_TODO',
      'FETCH_PROBLEM',
      'UPDATE_PROBLEM',
      'FETCH_CONCERN',
      'UPDATE_CONCERN',
    ]),

    updateTodo() {
      this.UPDATE_TODO({
        id: this.$route.params.tid,
        payload: this.form,
      })
        .then((data) => {
          this.close();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateProblem() {
      this.UPDATE_PROBLEM({
        id: this.$route.params.pbid,
        payload: this.form,
      })
        .then((data) => {
          this.close();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateConcern() {
      this.UPDATE_CONCERN({
        id: this.$route.params.cid,
        payload: this.form,
      })
        .then((data) => {
          this.close();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    fetchTodo() {
      this.FETCH_TODO({
        id: this.$route.params.tid,
      })
        .then((data) => {
          this.form = data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchProblem() {
      this.FETCH_PROBLEM({
        id: this.$route.params.pbid,
      })
        .then((data) => {
          this.form = data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchConcern() {
      this.FETCH_CONCERN({
        id: this.$route.params.cid,
      })
        .then((data) => {
          this.form = data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onSubmit() {
      if(this.workType === 'todo') {
        this.updateTodo();
      } else if(this.workType === 'problem') {
        this.updateProblem();
      } else if(this.workType === 'concern') {
        this.updateConcern();
      }
    },

    getTask() {
      if(this.workType === 'todo') {
        this.fetchTodo();
      } else if(this.workType === 'problem') {
        this.fetchProblem();
      } else if(this.workType === 'concern') {
        this.fetchConcern();
      }
    },

    close() {
      this.showModal = false;
      this.$router.push({ name: this.workType });
    }
  },

  created() {
    this.getTask();
  },

  mounted() {
    this.showModal = true;
  }
}
</script>

<style>

</style>
