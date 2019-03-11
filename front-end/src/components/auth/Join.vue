<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>회원가입</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="email" name="Email" label="Email" type="text" v-model.trim="email"></v-text-field>
        <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model.trim="password"></v-text-field>
        <v-text-field prepend-icon="person" name="Nickname" label="Nickname" type="text" v-model.trim="nick"></v-text-field>
      </v-form>
    </v-card-text>
    
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="onBack">뒤로</v-btn>
      <v-btn color="primary" @click="onSubmit" :disabled="invalidForm">회원가입</v-btn>
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
      nick: '',
      error: '',
    };
  },

  computed: {
    invalidForm() {
      return !this.email || !this.password || !this.nick;
    },
  },

  methods: {
    ...mapActions([
      'JOIN',
    ]),

    onSubmit() {
      this.JOIN({ email: this.email, password: this.password, nick: this.nick })
        .then(() => {
          this.$router.push('/auth/login');
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onBack() {
      this.$router.push('/auth/login');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
