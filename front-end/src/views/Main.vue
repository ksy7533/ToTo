<template>
  <div class="wrap">
    <!-- header component -->
    <Header></Header>
    <!--// header component -->
    <div class="container">
      <template v-if="!isLoding">
        <div class="add-project">
          <div class="wrap-input">
            <input type="text" v-model="title" placeholder="프로젝트명을 입력해주세요.">
          </div>
          <button @click="addProject">Add Project</button>
        </div>
        <ul class="list">
          <li v-for="(item, index) in projects" :key="index">
            <router-link tag="a" :to="`/project/${item.id}/home`">
              <p class="title">Project</p>
              <p class="sub-title">{{item.title}}</p>
            </router-link>
          </li>
        </ul>
      </template>
      <template v-else>
        Loading...
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '../components/header/Header';

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
.wrap {
  .container {
    .add-project {
      text-align: center;
      margin: 100px auto;
      width: 400px;

      .wrap-input {
        padding: 10px;
        border-bottom: 2px solid $border-color;

        input {
          text-align: center;
          width: 100%;
          font-size: 24px;
          border: 0;
          outline: 0;
        }
      }

      button {
        cursor: pointer;
        display: inline-block;
        margin-top: 20px;
        padding: 10px 0;
        width: 100px;
        font-size: 14px;
        border: 0;
        color: $primary-font-color;
        background-color: $primary-light-color;
      }
    }

    .list {
      @extend %float-clear;

      li {
        float:left;
        box-sizing: border-box;
        width: 200px;
        margin: 0 10px; 
        box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
        border-radius: 4px;

        a {
          display: block;
          box-sizing: border-box;
          padding: 20px;

          .title {
            padding-bottom: 10px;
            color: rgba(#000, .5);
            font-size: 14px;
            border-bottom: 1px solid $border-color;
          }

          .sub-title {
            text-align: center;
            padding: 10px 0;
          }
        }
      }
    }
  }
}
</style>

