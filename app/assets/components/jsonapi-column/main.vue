<template>
  <div class="jsonapi-table-header sortable" v-on:click="performSort" v-if="sort">
    {{header}}
    <icon name="fa-sort-amount-asc" v-if="sortAttribute === sort && sortDirection === 'asc'">
    </icon>
    <icon name="fa-sort-amount-desc" v-if="sortAttribute === sort && sortDirection === 'desc'">
    </icon>
  </div>
  <div class="jsonapi-table-header" v-else>
    {{header}}
  </div>
  <div class="jsonapi-table-value">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    methods: {
      performSort() {
        this.sortFunction(this.sort);
      }
    },

    props: ['header', 'sort', 'sortAttribute', 'sortDirection', 'sortFunction', 'table']
  };
</script>
