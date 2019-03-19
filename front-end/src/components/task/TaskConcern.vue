<template>
  <v-layout fill-height v-if="tasks">
    <v-flex>
      <v-card>
        <v-list two-line style="padding:0">
          <template v-for="(item, index) in this.tasks">
            <v-divider
              v-if="index !== 0"
              :key="`${item.title}-${index}`"
            ></v-divider>
            <v-list-tile
              :key="item.createdAt"
              :class="{completed: item.completed}"
            >
              <v-list-tile-action>
                <v-checkbox :disabled="isUpdating" :input-value="item.completed" @change="onCheckBox(item.id, $event)"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title>{{item.createdAt}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon ripple v-on="on" :to="{name: 'concernDetail', params: {cid: item.id}}">
                      <v-icon color="grey lighten-1">add</v-icon>
                    </v-btn>
                  </template>
                  <span>상세보기</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon ripple v-on="on" @click="onDelete(item.id)">
                      <v-icon color="grey lighten-1">delete</v-icon>
                    </v-btn>
                  </template>
                  <span>삭제하기</span>
                </v-tooltip>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>

    <v-btn
      fab
      bottom
      right
      color="purple"
      dark
      fixed
      @click="showModalAdd = true"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <modal-task-concern-add
      v-model="showModalAdd"
    ></modal-task-concern-add>

    <confirm ref="confirm"></confirm>

    <!-- ModalTaskConcernDetail -->
    <router-view></router-view>
    <!--// ModalTaskConcernDetail -->
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModalTaskConcernAdd from '../modal/ModalTaskConcernAdd';
import Confirm from '../common/Confirm';

export default {
  components: {
    ModalTaskConcernAdd,
    Confirm,
  },

  data() {
    return {
      isLoading: false,
      isUpdating: false,
      showModalAdd: false,
      showModalConfirm: false,
    };
  },

  computed: {
    ...mapState({
      tasks: 'tasks',
    }),
  },

  methods: {
    ...mapActions([
      'FETCH_CONCERNS',
      'UPDATE_CONCERN',
      'DELETE_CONCERN',
    ]),
    
    getTasks() {
      this.isLoading = true;
      this.FETCH_CONCERNS({
        pid: this.$route.params.pid,
      })
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    updateTask(id, payload) {
      this.isUpdating = true;
      this.UPDATE_CONCERN({
        id,
        payload,
      })
        .then((data) => {
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isUpdating = false;
        });
    },

    onCheckBox(id, isChecked) {
      this.updateTask(id, {completed: isChecked})
    },

    deleteTask(id) {
      this.DELETE_CONCERN({
        id,
      })
        .then((data) => {
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onDelete(id) {
      this.$refs.confirm.open('고민사항 삭제', '정말 삭제 하시겠습니까?', { color: 'orange' })
        .then((confirm) => {
          if(confirm) this.deleteTask(id);
          else return;
        });
    },
  },

  created() {
    this.getTasks();
  },
}
</script>

<style lang="scss" scoped>
.v-list {
  .completed {
    .v-list__tile__title, .v-list__tile__sub-title {
      text-decoration: line-through;
      color: grey;
    }
  }
}
</style>

