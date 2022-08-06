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
          @click="showDialog"
      >Создать пост
      </my-button>

      <my-select
          :options="sortOptions"
          v-model="selectedSort"
      ></my-select>
    </div>


    <my-dialog v-model:show="dialogVisible">
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
import axios from 'axios';

export default {
  name: 'posts-page',
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
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions,
      searchQuery: ''
    }
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert('Ошибка');
      } finally {
        this.isPostsLoading = false;
      }
    },

    async loadMorePosts() {
      try {
        this.page++;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Ошибка');
      }
    },
  },

  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      });
    },
    sortedAndSearchedPosts() {
      if (!this.searchQuery) {
        return this.sortedPosts;
      }
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
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
