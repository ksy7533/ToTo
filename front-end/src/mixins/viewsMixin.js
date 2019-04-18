import { mapState, mapMutations, createNamespacedHelpers } from 'vuex';

const userNamespace = createNamespacedHelpers('userStore');

export default {
  computed: {
    ...mapState({
      isLoading: 'isLoading',
    }),
  },

  methods: {
    ...mapMutations([
      'TOGGLE_IS_LOADING',
    ]),

    ...userNamespace.mapActions([
      'FETCH_USER',
    ]),

    fetchUser() {
      this.FETCH_USER(() => {
      })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  created() {
    this.fetchUser();
  },
};
