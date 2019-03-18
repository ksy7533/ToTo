<template>
  <v-dialog v-model="show" width="500px">
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
        <v-btn flat color="primary" @click="show = false">취소</v-btn>
        <v-btn flat @click="addProject">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    value: Boolean,
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
  },

  data() {
    return {
      title: '',
    };
  },

  methods: {
    ...mapActions([
      'ADD_PROJECT',
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
  },
}
</script>

<style>

</style>
