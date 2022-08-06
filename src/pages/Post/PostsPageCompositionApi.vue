<template>
  <div>
    <h1>Страница с постами</h1>

    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
    ></my-input>

    <div class="app__btns">
      <my-button
      >Создать пост
      </my-button>

      <my-select
          :options="sortOptions"
          v-model="selectedSort"
      ></my-select>
    </div>


    <my-dialog v-model:show="dialogVisible">
      <post-form
      ></post-form>
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
    ></post-list>

    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostForm from "@/components/Post/PostForm.vue";
import PostList from "@/components/Post/PostList.vue";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
  name: 'posts-page-composition-api',
  components: {
    PostForm,
    PostList,
  },

  data() {
    const sortOptions = [
      {value: 'title', name: 'По названию'},
      {value: 'body', name: 'По описанию'},
    ];

    return {
      dialogVisible: false,
      sortOptions,
    }
  },
  setup(props){
    const {posts, isPostsLoading, totalPages} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      isPostsLoading,
      totalPages,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    }
  }
};
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;

}
</style>
