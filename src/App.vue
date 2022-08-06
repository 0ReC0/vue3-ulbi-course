<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/UI/Navbar";

export default {
  components: {
    Navbar
  }
}
</script>

<style>
html{
  color: rgba(255, 255, 255, .87);
  background-color: #1A1A1A;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
