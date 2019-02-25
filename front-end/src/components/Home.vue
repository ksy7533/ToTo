<template>
    <div>
        Home
        <button class="btn-logout" @click="onLogout">로그아웃</button>
    </div>
</template>

<script>
import { auth } from '../api';

export default {
    data() {
        return {

        }
    },

    methods: {
        onLogout(){
            auth.logout()
            .then((result) => {
                if(result === 'OK'){
                    this.$router.push('/login');
                }else {
                    this.error = result.data.error;
                }
            });
        }
    }
};
</script>

<style>

</style>
