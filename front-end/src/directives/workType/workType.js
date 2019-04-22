import Vue from 'vue';
import './workType.scss';

Vue.directive('workType', {
  inserted: (el, binding) => {
    const type = binding.value;
    const elSpan = document.createElement('span');
    elSpan.classList.add('type');
    if (type === 'todo') {
      elSpan.classList.add('todo');
    } else if (type === 'problem') {
      elSpan.classList.add('problem');
    } else if (type === 'concern') {
      elSpan.classList.add('concern');
    }
    el.appendChild(elSpan);
  },
});

