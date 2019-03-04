<template>
  <div>
    prorject todo
    <div>
      <div class="add-task">
          <input type="text" v-model="title" placeholder="업무명을 입력해주세요.">
          <button @click="addTask">Add Todo</button>
      </div>
      <ul>
          <li v-for="(item, index) in this.tasks" :key="index">
              <router-link tag="a" :to="{ params: { tid: item.id }}">{{item.title}}</router-link>
          </li>
      </ul>
    </div>

    <!-- project-todo-detail component -->
    <task-todo-detail></task-todo-detail>
    <!--// project-todo-detail component -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TaskTodoDetail from './TaskTodoDetail';

/**
 * 1. 해당 tasks를 불러와서 첫번째 todo의 id 값을 가져온뒤 state todo에 저장한다.
 * 2. 저장한 todo의 id값을 route params에저장한다.
 */

export default {
  components: {
    TaskTodoDetail,
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
      'ADD_TODO',
      'FETCH_TODOS',
    ]),

    addTask() {
      this.ADD_TODO({
        title: this.title,
        pid: this.project.id,
      })
        .then((data) => {
          this.title = '';
          this.$router.push({ params: { tid: data.result.id } });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    getTasks() {
      this.FETCH_TODOS({
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
};

</script>

<style lang="scss" scoped>
.add-task {
  color: $black;
}
</style>

