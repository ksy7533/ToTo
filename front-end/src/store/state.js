const state = {
  drawer: true, // drawer 열림여부
  isLoading: false, // loading 여부
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
      icon: 'view_list',
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
    {
      name: 'calendar',
      title: '일정',
      depth: 1,
      icon: 'calendar_today',
      items: [],
    },
    {
      name: 'statistic',
      title: '통계',
      depth: 1,
      icon: 'bar_chart',
      items: [],
    },
  ],
};

export default state;
