<template>
    <div>
        <!-- header component -->
        <Header></Header>
        <!--// header component -->
        <div class="container" v-if="!isLoding">
            <div class="add-project">
                <input type="text" id="title" placeholder="프로젝트명을 입력해주세요.">
                <button @click="addProject">Add Project</button>
            </div>
            <ul>
                <li v-for="(item, index) in this.projects" :key="index">
                    <a>{{item}}</a>
                </li>
            </ul>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>
import Header from './Header';
import { mapState, mapActions } from 'vuex';

export default {
    components: { Header },

    data() {
        return {
            isLoding: false,
        }
    },

    computed: {
        ...mapState({
            projects: 'projects',
        }),
    },

    methods: {
        ...mapActions([
            'FETCH_PROJECTS'
        ]),

        addProject() {

        },

        getProjects(){
            this.isLoding = true;
            this.FETCH_PROJECTS()
            .then(() => {
                console.log(this.projects)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                this.isLoding = false;
            });
        }
    },

    created() {
        this.getProjects();
    },
};
</script>

<style lang="scss" scoped>

</style>

