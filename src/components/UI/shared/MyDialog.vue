<template>
  <div
      class="dialog"
      v-if="show"
      @click.stop="hideDialog"
  >
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-dialog",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false);
    }
  }
}
</script>

<style scoped>
.dialog {
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  color: rgba(255, 255, 255, .87);
  background-color: #1A1A1A;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>
