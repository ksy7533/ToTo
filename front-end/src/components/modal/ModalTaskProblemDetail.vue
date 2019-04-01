<template>
  <v-dialog v-model="showModal" width="500px" v-if="this.form">
    <v-card>
      <v-card-title
        class="grey lighten-4 py-4 title"
      >
        문제점 상세정보
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
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
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
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
    ...mapActions([
      'FETCH_PROBLEM',
      'UPDATE_PROBLEM',
    ]),

    onSubmit() {
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

    getTask() {
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
