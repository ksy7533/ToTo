<template>
  <div class="container">
    <div>
      project Home
    </div>
    <project-home-detail></project-home-detail>
  </div>
</template>

<script>
import ProjectHomeDetail from './ProjectHomeDetail';

export default {
  components: {
    ProjectHomeDetail,
  },
};
</script>

<style lang="scss" scoped>
.container {
  float: left;
}
</style>

