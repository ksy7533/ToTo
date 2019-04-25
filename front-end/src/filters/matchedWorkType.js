
import Vue from 'vue';

const WORK_TYPE = {
  project: '프로젝트',
  todo: '할일',
  problem: '문제점',
  concern: '고민사항',
};

Vue.filter('matchedWorkType', type => WORK_TYPE[type]);
