const state = {
  toekn: null, // 유저 토큰 정보
  projects: [], // 모든 project
  project: null, // 현재 선택된 project
  todos: [], // 모든 todo
  problems: [], // 모든 problems
  routes: [ // route 목록, depth : 1(gnb), depth: 2(lnb)
    {
      name: 'home',
      title: '홈',
      depth: 1,
      items: [],
    },
    {
      name: 'task',
      title: '업무',
      depth: 1,
      items: [
        {
          name: 'todo',
          title: '할일',
          depth: 2,
        },
        {
          name: 'problem',
          title: '문제점',
          depth: 2,
        },
      ],
    },
  ],
};

export default state;
