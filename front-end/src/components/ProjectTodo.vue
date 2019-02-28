<template>
  <div>
    prorject todo
    <div>
      <div class="add-todo">
          <input type="text" v-model="title" placeholder="업무명을 입력해주세요.">
          <button @click="addTodo">Add Todo</button>
      </div>
      <ul>
          <li v-for="(item, index) in this.todos" :key="index">
              <router-link tag="a" :to="{ params: { tid: item.id }}">{{item.title}}</router-link>
          </li>
      </ul>
    </div>

    <!-- project-todo-detail component -->
    <project-todo-detail></project-todo-detail>
    <!--// project-todo-detail component -->
  </div>
</template>

<script>
import ProjectTodoDetail from './ProjectTodoDetail';
import { mapState, mapActions } from 'vuex';

/**
 * 1. 해당 todos를 불러와서 첫번째 todo의 id 값을 가져온뒤 state todo에 저장한다.
 * 2. 저장한 todo의 id값을 route params에저장한다.
 */

export default {
  components: {
    ProjectTodoDetail,
  },

  data() {
    return {
      title: '',
    }
  },

  computed: {
    ...mapState({
      todos: 'todos',
    }),
  },

  methods: {
    ...mapActions([
      'ADD_TODO',
      'FETCH_TODOS',
    ]),

    addTodo() {
      this.ADD_TODO({
        title: this.title,
        pid: this.$route.params.pid,
      })
      .then(() => {
        this.title = '';
      })
      .catch((error) => {
        console.log(error);
      });
    },
    
    getTodos() {
      this.FETCH_TODOS({
        pid: this.$route.params.pid,
      })
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },

  created() {
    this.getTodos();
  }
}
</script>

<style>

</style>
