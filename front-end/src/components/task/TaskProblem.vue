<template>
  <div>
    project problem
    <div>
      <div class="add-task">
          <input type="text" v-model="title" placeholder="문제점을 입력해주세요.">
          <button @click="addTask">Add Problem</button>
      </div>
      <ul>
          <li v-for="(item, index) in this.tasks" :key="index">
              <router-link tag="a" :to="{ params: { pbid: item.id }}">{{item.title}}</router-link>
          </li>
      </ul>
    </div>

    <!-- project-todo-detail component -->
    <task-problem-detail></task-problem-detail>
    <!--// project-todo-detail component -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TaskProblemDetail from './TaskProblemDetail';


export default {
components: {
    TaskProblemDetail,
  },

  data() {
    return {
      title: '',
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
