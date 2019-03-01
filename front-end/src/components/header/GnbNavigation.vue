<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link tag="a" :to="`/project/${this.$route.params.pid}/total`">홈</router-link>
        </li>
        <li>
          <router-link tag="a" :to="`/project/${this.$route.params.pid}/todo`">업무</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
