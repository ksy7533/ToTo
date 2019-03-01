<template>
  <div>
    <!-- header component -->
    <Header></Header>
    <!--// header component -->
    <div class="container">
      <div v-if="!isLoding">
        <div class="add-project">
          <input type="text" v-model="title" placeholder="프로젝트명을 입력해주세요.">
          <button @click="addProject">Add Project</button>
        </div>
        <ul>
          <li v-for="(item, index) in projects" :key="index">
            <router-link tag="a" :to="`/project/${item.id}/total`">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from './Header';

export default {
  components: { Header },

  data() {
    return {
      isLoding: false,
      title: '',
    };
  },

  computed: {
    ...mapState({
      projects: 'projects',
    }),
  },

  methods: {
    ...mapActions([
      'FETCH_PROJECTS',
      'ADD_PROJECT',
    ]),

    addProject() {
      this.ADD_PROJECT({
        title: this.title,
      })
        .then(() => {
          this.title = '';
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getProjects() {
      this.isLoding = true;
      this.FETCH_PROJECTS()
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoding = false;
        });
    },
  },

  created() {
    this.getProjects();
  },
};
</script>

<style lang="scss" scoped>

</style>

