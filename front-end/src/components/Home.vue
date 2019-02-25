<template>
    <div>
        Home
        <button class="btn-logout" @click="onLogout">로그아웃</button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {

        }
    },

    methods: {
        ...mapMutations([
            'LOGOUT'
        ]),

        onLogout(){
            this.LOGOUT()
            this.$router.push('/login');
        },
    }
};
</script>

<style>

</style>
