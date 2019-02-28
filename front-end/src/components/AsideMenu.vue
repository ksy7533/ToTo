<template>
  <div class="aside-menu">
    좌측메뉴<br>
    {{this.gnb}}
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      gnb: 'gnb',
    }),
  },
}
</script>

<style lang="scss" scoped>

</style>

