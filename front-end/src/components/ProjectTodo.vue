<template>
  <div>
    prorject todo
    <div>
      <div class="add-todo">
          <input type="text" v-model="title" placeholder="업무명을 입력해주세요.">
          <button @click="addTodo">Add Todo</button>
      </div>
      <!-- <ul>
          <li v-for="(item, index) in todos" :key="index">
              {{item.title}}
          </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      title: '',
    }
  },

  computed: {
    ...mapState({
      project: 'project',
    }),
  },

  methods: {
    ...mapActions([
      'ADD_TODO',
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
  },

  mounted() {
    console.log(this.project)
  }
}
</script>

<style>

</style>
