<template>
  <span class="jsonapi-table-label">
    {{label}}
  </span>
  <span class="jsonapi-table-value">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    props: ['format', 'label', 'record', 'sort']
  };
</script>
