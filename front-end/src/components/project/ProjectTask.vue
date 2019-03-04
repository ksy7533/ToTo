<template>
  <div>
    Project Task
    <router-view
      v-bind="taskProps"
    ></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    taskProps() {
      if(this.$route.name === 'todo') {
        return {
          paramsId: 'tid',
          addCategory: 'ADD_TODO',
          fetchCategory: 'FETCH_TODOS',
        }
      }else if(this.$route.name === 'problem') {
        return {
          paramsId: 'pbid',
          addCategory: 'ADD_PROBLEM',
          fetchCategory: 'FETCH_PROBLEMS',
        }
      }
    }
  }

}
</script>

<style>

</style>
