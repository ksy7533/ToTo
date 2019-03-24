import Vue from 'vue';
import './style.css';

/*
* list에 item이 하나도 없을 경우 대체 콤포넌트
*/
Vue.directive('noneItem', {
  update(el, binding) {
    if (binding.value.items.length) return;
    const elDiv = document.createElement('DIV');
    elDiv.innerHTML = `${binding.value.text}`;
    elDiv.classList.add('no-item');
    el.appendChild(elDiv);
  },
});
