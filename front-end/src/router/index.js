import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@/views/Auth';
import Main from '@/views/Main';
import Project from '@/views/Project';
import ProjectHome from '@/components/project/ProjectHome';
import ProjectTask from '@/components/project/ProjectTask';
import ProjectCalendar from '@/components/project/ProjectCalendar';
import ProjectStatistic from '@/components/project/ProjectStatistic';
import Login from '@/components/auth/Login';
import Join from '@/components/auth/Join';
import TaskTodo from '@/components/task/TaskTodo';
import TaskProblem from '@/components/task/TaskProblem';
import TaskConcern from '@/components/task/TaskConcern';
import ModalTaskTodoDetail from '@/components/modal/ModalTaskTodoDetail';
import ModalTaskProblemDetail from '@/components/modal/ModalTaskProblemDetail';
import ModalTaskConcernDetail from '@/components/modal/ModalTaskConcernDetail';
import NotFound from '@/components/common/NotFound';
import store from '../store';

Vue.use(Router);

const requireAuth = (to, from, next) => {
  const loginPath = `/auth/login?returnPath=${encodeURIComponent(to.path)}`; // login페이지로가서 로그인 한뒤 다시 리다이렉트할 경로를 rPath 쿼리 스트링에 넣어준다. encodeURIComponent는 모든문자를 인코딩해주는 함수이다.
  store.state.token ? next() : next(loginPath);
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      beforeEnter: requireAuth,
    },
    {
      path: '/project/:pid',
      name: 'project',
      component: Project,
      beforeEnter: requireAuth,
      children: [
        {
          path: 'home',
          name: 'home',
          component: ProjectHome,
          beforeEnter: requireAuth,
        },
        {
          path: 'task',
          name: 'task',
          component: ProjectTask,
          beforeEnter: requireAuth,
          children: [
            {
              path: 'todo',
              name: 'todo',
              component: TaskTodo,
              beforeEnter: requireAuth,
              children: [
                {
                  path: ':tid',
                  name: 'todoDetail',
                  component: ModalTaskTodoDetail,
                  beforeEnter: requireAuth,
                },
              ],
            },
            {
              path: 'problem',
              name: 'problem',
              component: TaskProblem,
              beforeEnter: requireAuth,
              children: [
                {
                  path: ':pbid',
                  name: 'problemDetail',
                  component: ModalTaskProblemDetail,
                  beforeEnter: requireAuth,
                },
              ],
            },
            {
              path: 'concern',
              name: 'concern',
              component: TaskConcern,
              beforeEnter: requireAuth,
              children: [
                {
                  path: ':cid',
                  name: 'concernDetail',
                  component: ModalTaskConcernDetail,
                  beforeEnter: requireAuth,
                },
              ],
            },
          ],
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: ProjectCalendar,
          beforeEnter: requireAuth,
        },
        {
          path: 'statistic',
          name: 'statistic',
          component: ProjectStatistic,
          beforeEnter: requireAuth,
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
        {
          path: 'join',
          name: 'join',
          component: Join,
        },
      ],
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
});
