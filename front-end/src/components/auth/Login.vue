<template>
  <v-card class="elevation-12" >
    <v-toolbar dark color="primary">
      <v-toolbar-title>로그인</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="email" name="Email" label="Email" type="text" v-model.trim="email"></v-text-field>
        <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model.trim="password"></v-text-field>
      </v-form>
    </v-card-text>
    
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onSubmit" :disabled="invalidForm">로그인</v-btn>
      <v-btn color="secondary" @click="onJoin">회원가입</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      rPath: '',
    };
  },

  computed: {
    invalidForm() {
      return !this.email || !this.password;
    },
  },

  methods: {
    ...mapActions([
      'LOGIN',
    ]),

    onSubmit() {
      this.LOGIN({ email: this.email, password: this.password })
        .then(() => {
          this.$router.push(this.rPath);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onJoin() {
      this.$router.push('/auth/join');
    },
  },

  created() {
    this.rPath = this.$route.query.rPath || '/';
  },
};
</script>

<style lang="scss" scoped>
</style>

