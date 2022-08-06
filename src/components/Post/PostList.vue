<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <transition-group name="post-list">
      <post-item
          style="margin-top: 15px"
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @remove="$emit('remove', post)"
      ></post-item>
    </transition-group>
  </div>
  <h2 v-else style="color: red">
    Список постов пуст
  </h2>

</template>

<script>
import PostItem from "@/components/Post/PostItem";

export default {
  name: "PostList",
  components: {
    PostItem
  },

  props: {
    posts: {
      type: Array,
      required: true
    }
  },
};
</script>

<style scoped>
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
