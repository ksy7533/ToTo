const state = {
  toekn: null, // 유저 토큰 정보
  projects: [], // 모든 project
  project: null, // 현재 선택된 project
  projectId: '', // 현재 선택된 project id
  tasks: [], // 현재 선택된 tasks
  drawer: true, // drawer 열림여부
  routes: [ // route 목록, depth : 1(gnb), depth: 2(lnb)
    {
      name: 'home',
      title: '홈',
      depth: 1,
      icon: 'home',
      items: [],
    },
    {
      name: 'task',
      title: '업무',
      depth: 1,
      icon: 'list',
      items: [
        {
          name: 'todo',
          title: '할일',
          depth: 2,
          icon: 'list',
        },
        {
          name: 'problem',
          title: '문제점',
          depth: 2,
          icon: 'list',
        },
        {
          name: 'concern',
          title: '고민사항',
          depth: 2,
          icon: 'list',
        },
      ],
    },
  ],
};

export default state;
