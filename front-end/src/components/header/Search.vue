<template>
  <div class="wrap_search" style="width:400px">
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="search"
      label="검색어를 입력해주세요"
      class="hidden-sm-and-down"
      clearable
      v-model="search"
    ></v-text-field>

    <template v-if="this.search">
      <v-list light class="elevation-4" v-if="items.length > 0">
        <v-list-tile
          v-for="(item, index) in items"
          :key="`${item.title}-${item.id}-${index}`"
          @click="goWork(item)"
        >
          <span v-workType="item.type"></span>
          <v-list-tile-content style="margin-left:15px">
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
            <v-list-tile-sub-title>{{item.regDate}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list light class="elevation-4" v-else>
        <v-list-tile>
          <v-list-tile-title>검색된 결과가 없습니다</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import debounce from 'lodash/debounce';

export default {
  data() {
    return {
      items: [],
      search: '',
    }
  },

  watch: {
    search: debounce(function(e) {
      if(!this.search) {
        this.items = [];
        return;
      };
      this.search = this.search.trim();
      this.SEARCH_KEYWORD({
        keyword: this.search,
      })
        .then((result) => {
          this.items = result;
        })
        .catch((error) => {
          console.error(error);
        });
    }, 200),
  },

  methods: {
    ...mapActions([
      'SEARCH_KEYWORD',
    ]),

    goWork(item) {
      this.search = '';
      this.items= [];
      this.$router.push(`/project/${item.projectId}/task/${item.type}/${item.id}`);
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap_search {
  position: relative;
}

.v-list {
  z-index: 100;
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
}
</style>

