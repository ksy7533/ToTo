<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>회원가입</v-toolbar-title>
      <v-toolbar-title class="red--text" v-if="message">{{message}}</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form>
        <v-text-field
          :rules="[rules.required, rules.email]"
          prepend-icon="email"
          name="Email"
          label="Email"
          type="text"
          v-model.trim="email"></v-text-field>
        <v-text-field
          :rules="[rules.required, rules.min]"
          id="password"
          prepend-icon="lock"
          name="password"
          label="Password"
          type="password"
          v-model.trim="password"></v-text-field>
        <v-text-field
          :rules="[rules.required]"
          prepend-icon="person"
          name="Nickname"
          label="Nickname"
          type="text"
          v-model.trim="nick"></v-text-field>
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
import { createNamespacedHelpers } from 'vuex';
const userNamespace = createNamespacedHelpers('userStore');

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
      nick: '',
      rules: {
          required: value => !!value || '필수입니다',
          min: v => v.length >= 8 || '최소 8글자 이상 입력해주세요',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || '이메일 형식이 아닙니다'
          }
        }
    };
  },

  computed: {
    invalidForm() {
      return !this.email || !this.password || !this.nick;
    },
  },

  methods: {
    ...userNamespace.mapActions([
      'JOIN',
    ]),

    onSubmit() {
      this.JOIN({ email: this.email, password: this.password, nick: this.nick })
        .then(() => {
          this.$router.push('/auth/login');
        })
        .catch((error) => {
          this.message = error.data.message;
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
