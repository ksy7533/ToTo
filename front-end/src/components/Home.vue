<template>
    <div>
        <!-- header component -->
        <Header></Header>
        <!--// header component -->
        <div class="container" v-if="!isLoding">
            <div class="add-project">
                <input type="text" v-model="title" placeholder="프로젝트명을 입력해주세요.">
                <button @click="addProject">Add Project</button>
            </div>
            <ul>
                <li v-for="(item, index) in projects" :key="index">
                    <a :data-id="item.id">{{item.title}}</a>
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
            title : '',
        }
    },

    computed: {
        ...mapState({
            projects: 'projects',
        }),
    },

    methods: {
        ...mapActions([
            'FETCH_PROJECTS',
            'ADD_PROJECT',
        ]),

        addProject() {
            this.ADD_PROJECT({
                title: this.title,
            })
            .then(() => {
                this.title = '';
            })
            .catch((err) => {
                console.log(err);
            })
        },

        getProjects(){
            this.isLoding = true;
            this.FETCH_PROJECTS()
            .then((data) => {
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

