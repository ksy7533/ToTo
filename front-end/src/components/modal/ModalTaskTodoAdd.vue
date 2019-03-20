<template>
  <v-dialog v-model="show" width="500px">
    <v-card>
      <v-card-title
        class="grey lighten-4 py-4 title"
      >
        할일 생성
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-flex>
            <v-text-field
              v-model="title"
              prepend-icon="notes"
              placeholder="할일 이름을 입력해주세요"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="show = false">취소</v-btn>
        <v-btn flat @click="addTask" :disabled="invalidForm">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    value: Boolean,
  },

  computed: {
    ...mapState({
      project: 'project',
    }),

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
  },

  data() {
    return {
      title: '',
    };
  },

  methods: {
    ...mapActions([
      'ADD_TODO',
    ]),

    addTask() {
      this.ADD_TODO({
        title: this.title,
        pid: this.$route.params.pid,
      })
        .then((data) => {
          this.title = '';
          this.show = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
}
</script>

<style>

</style>
