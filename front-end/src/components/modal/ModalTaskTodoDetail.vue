<template>
  <v-dialog v-model="showModal" width="500px" v-if="this.form">
    <v-card>
      <v-card-title
        class="grey lighten-4 py-4 title"
      >
        할일 상세정보
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
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
const projectNamespace = createNamespacedHelpers('projectStore');
const taskNamespace = createNamespacedHelpers('taskStore');

export default {
  computed: {
    ...projectNamespace.mapState({
      project: 'project',
    }),

    invalidForm() {
      return !this.form.title;
    },
  },

  watch: {
    showModal (val) {
      if(!val) {
        this.$router.push({ name: this.prevRouteName });
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

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRouteName = from.name;
    });
  },

  methods: {
    ...taskNamespace.mapActions([
      'FETCH_TODO',
      'UPDATE_TODO',
    ]),

    onSubmit() {
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

    getTask() {
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

    close() {
      this.showModal = false;
      return this.$router.push({ name: this.prevRouteName });
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
