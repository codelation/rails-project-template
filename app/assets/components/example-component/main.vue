<template>
  {{message}}
</template>

<script>
  export default {
    computed: {
      message() {
        return `Hello ${this.name}!`;
      }
    },

    data() {
      return { name: 'world' };
    }
  };
</script>
