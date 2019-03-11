<template>
  <v-layout fill-height>
    <v-flex>
      <v-card>
        <v-list two-line style="padding:0">
          <template v-for="(item, index) in this.tasks">
            <v-divider
              v-if="index !== 0"
              :key="`${item.title}-${index}`"
            ></v-divider>
            <v-list-tile
              :key="item.createdAt"
              :to="{ params: { pbid: item.id }}"
            >
              <v-list-tile-action>
                <v-checkbox></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title>{{item.createdAt}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>

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
          문제점 생성
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex>
              <v-text-field
                v-model="title"
                prepend-icon="notes"
                placeholder="문제점 이름을 입력해주세요"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">취소</v-btn>
          <v-btn flat @click="addTask">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      title: '',
      dialog: false,
    };
  },

  computed: {
    ...mapState({
      tasks: 'tasks',
      project: 'project',
    }),
  },

  methods: {
    ...mapActions([
      'ADD_PROBLEM',
      'FETCH_PROBLEMS',
    ]),

    addTask() {
      this.ADD_PROBLEM({
        title: this.title,
        pid: this.project.id,
      })
        .then((data) => {
          this.title = '';
          this.$router.push({ params: { pbid: data.result.id } });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    getTasks() {
      this.FETCH_PROBLEMS({
        pid: this.project.id,
      })
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.getTasks();
  },
}
</script>

<style>

</style>
