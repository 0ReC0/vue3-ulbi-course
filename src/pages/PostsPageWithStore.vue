<template>
  <div>
    <h1>Страница с постами</h1>

    <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
    ></my-input>

    <div class="app__btns">
      <my-button
          @click="showDialog"
      >Создать пост
      </my-button>

      <my-select
          :options="sortOptions"
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
      ></my-select>
    </div>


    <my-dialog
        v-model:show="dialogVisible"
    >
      <post-form
          @create="createPost"
      ></post-form>
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    ></post-list>

    <div v-else>Идет загрузка...</div>

    <div v-intersection="loadMorePosts" class="observer"></div>

    <!--    <my-pagination-->
    <!--        v-model="page"-->
    <!--        :totalPages="totalPages"-->
    <!--    ></my-pagination>-->
  </div>
</template>

<script>
import PostForm from "@/components/Post/PostForm.vue";
import PostList from "@/components/Post/PostList.vue";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: 'posts-page-with-store',
  components: {
    PostForm,
    PostList,
  },

  data() {
    return {
      dialogVisible: false
    }
  },

  methods: {
    ...mapMutations({
      setPosts: 'post/setPosts',
      createPostAction: 'post/createPost',
      removePost: 'post/removePost',
      setSelectedSort: 'post/setSelectedSort',
      setSearchQuery: 'post/setSearchQuery',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
    createPost(post) {
      this.createPostAction(post);
      this.dialogVisible = false;
    },
    showDialog() {
      this.dialogVisible = true;
    },


  },

  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      searchQuery: state => state.post.searchQuery,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  watch: {
  }
};
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;

}

.observer {
  /*height: 30px;*/
  /*background: green;*/
}

</style>
