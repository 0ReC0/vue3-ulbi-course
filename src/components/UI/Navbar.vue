<template>
  <div class="navbar">
    <div
        @click="$router.push('/')"
    >Vue 3
    </div>
    <div class="navbar__btns">
      <my-button
          @click="$router.push('/posts')"
      >Посты
      </my-button>
      <my-button
          @click="$router.push('/about')"
          style="margin-left: 20px"
      >О сайте
      </my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",

}
</script>

<style scoped>
.navbar {
  color: rgba(255, 255, 255, .87);
  background-color: #1A1A1A;
  height: 50px;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>
