const state = {
  toekn: null, // 유저 토큰 정보
  projects: [], // 모든 project
  project: null, // 현재 선택된 project
  todos: [], // 모든 todo
  problems: [], // 모든 problems
  lnbRoutes: [ // lnb목록
    {
      name: 'total',
      depth: 1,
      items: [],
    },
    {
      name: 'todo',
      depth: 1,
      items: [
        {
          name: 'todo',
          title: '할일',
          depth: '2',
        }, {
          name: 'problem',
          title: '문제점',
          depth: '2',
        },
      ],
    },
    {
      name: 'problem',
      depth: 1,
      items: [
        {
          name: 'todo',
          title: '할일',
          depth: '2',
        }, {
          name: 'problem',
          title: '문제점',
          depth: '2',
        },
      ],
    },
  ],
};

export default state;
