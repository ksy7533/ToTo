<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Login from '../components/auth/Login';
import Join from '../components/auth/Join';

export default {
  components: { 
    Login,
    Join,
  },
}
</script>

<style lang="scss" scoped>
</style>
