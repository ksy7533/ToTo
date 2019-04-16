const mutations = {
  SET_DRAWER(state) {
    if (state.drawer) {
      state.drawer = false;
    } else {
      state.drawer = true;
    }
  },
};

export default mutations;
