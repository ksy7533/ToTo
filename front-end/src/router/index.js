import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Join from '@/components/Join';
import Project from '@/components/Project';
import ProjectTotal from '@/components/ProjectTotal';
import ProjectTodo from '@/components/ProjectTodo';
import NotFound from '@/components/NotFound';
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
          name: 'projectTotal',
          component: ProjectTotal,
          beforeEnter: requireAuth,
        },
        {
          path: 'todo',
          name: 'projectTodo',
          component: ProjectTodo,
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
