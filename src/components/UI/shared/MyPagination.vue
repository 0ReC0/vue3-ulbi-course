<template>
  <div class="page__wrapper">
    <div
        class="page"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{
            'current-page': modelValue === pageNumber
          }"
        @click="changePage(pageNumber)"
    >{{ pageNumber }}
    </div>
  </div>
</template>

<script>
export default {
  name: "my-pagination",
  props:{
    totalPages: {
      type: Number,
      required: true
    },
    modelValue: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(pageNumber) {
      this.$emit('update:modelValue', pageNumber);
    },
  }
}
</script>

<style scoped>

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}
</style>
