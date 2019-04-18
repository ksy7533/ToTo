const mutations = {
  SET_DRAWER(state) {
    if (state.drawer) {
      state.drawer = false;
    } else {
      state.drawer = true;
    }
  },
  TOGGLE_IS_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
};

export default mutations;
