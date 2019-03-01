import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/auth/Login';
import Join from '@/components/auth/Join';
import Home from '@/components/container/Home';
import Project from '@/components/container/Project';
import ProjectTotal from '@/components/project/ProjectTotal';
import ProjectTodo from '@/components/project/ProjectTodo';
import ProjectProblem from '@/components/project/ProjectProblem';
import NotFound from '@/components/common/NotFound';
import store from '../store';

Vue.use(Router);

const requireAuth = (to, from, next) => {
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`; // login페이지로가서 로그인 한뒤 다시 리다이렉트할 경로를 rPath 쿼리 스트링에 넣어준다. encodeURIComponent는 모든문자를 인코딩해주는 함수이다.
  store.getters.isAuth ? next() : next(loginPath);
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: requireAuth,
    },
    {
      path: '/project/:pid',
      name: 'project',
      component: Project,
      beforeEnter: requireAuth,
      children: [
        {
          path: 'total',
          name: 'total',
          component: ProjectTotal,
          beforeEnter: requireAuth,
        },
        {
          path: 'todo/:tid?',
          name: 'todo',
          component: ProjectTodo,
          beforeEnter: requireAuth,
        },
        {
          path: 'problem/:pbid?',
          name: 'problem',
          component: ProjectProblem,
          beforeEnter: requireAuth,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/join',
      name: 'join',
      component: Join,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
});
