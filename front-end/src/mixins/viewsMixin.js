import { createNamespacedHelpers } from 'vuex';
const userNamespace = createNamespacedHelpers('userStore');

export default {
  methods: {
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
