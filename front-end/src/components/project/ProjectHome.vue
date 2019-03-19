<template>
  <v-content>
    <v-container grid-list-md fluid>
      <v-layout row wrap align-start justify-start>
        <v-flex
          pa-2
          xs12
          sm12
          md4
        >
          <v-card class="text-xs-center" hover>
            <v-card-title class="blue white--text">
              <span class="title">할일</span>
            </v-card-title>
            <v-card-text>
              <v-progress-circular
                :rotate="-90"
                :size="150"
                :width="15"
                :value="10"
                color="blue"
              >
                {{ 10 }}
              </v-progress-circular>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat>더보기</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex
          pa-2
          xs12
          sm12
          md4
        >
          <v-card class="text-xs-center" hover>
            <v-card-title class="pink white--text">
              <span class="title">문제점</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-progress-circular
                :rotate="-90"
                :size="150"
                :width="15"
                :value="10"
                color="pink"
              >
                {{ 10 }}
              </v-progress-circular>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat>더보기</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex
          pa-2
          xs12
          sm12
          md4
        >
          <v-card class="text-xs-center" hover>
            <v-card-title class="purple white--text">
              <span class="title">고민사항</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-progress-circular
                :rotate="-90"
                :size="150"
                :width="15"
                :value="10"
                color="purple"
              >
                {{ 10 }}
              </v-progress-circular>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat>더보기</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {

  created(){

  }
};
</script>

<style lang="scss" scoped>
</style>

