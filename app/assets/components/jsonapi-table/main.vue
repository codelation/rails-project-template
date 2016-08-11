<template>
  <div class="jsonapi-table-errors" v-if="errors">
    <div class="jsonapi-table-error" v-for="error in errors">
      <strong>{{error.title}}:</strong>
      {{error.detail}}
    </div>
  </div>

  <div :class="['jsonapi-table-body', { loading: loading }]">
    JSONAPITABLEBODY
  </div>

  <div class="jsonapi-table-pager">
    <div class="jsonapi-table-previous-page button" v-on:click="previousPage" v-if="links.prev">
      Previous Page
    </div>

    <div class="jsonapi-table-next-page button" v-on:click="nextPage" v-if="links.next">
      Next Page
    </div>
  </div>
</template>

<script>
  import { JsonApiClient } from 'jsonapi';
  import Vue from 'vue';

  export default {
    computed: {
      client() {
        return new JsonApiClient(this.endpoint);
      },

      findAllOptions() {
        let options = {
          filter:  this.filter,
          include: this.include,
          sort:    this.sort,

          page: {
            number: this.page,
            size:   this.pageSize
          },
        };

        if (this.sortDirection === 'desc') {
          options.sort = `-${this.sort}`;
        }

        return options;
      }
    },

    data() {
      return {
        errors:  false,
        loading: true,
        links:   {},
        records: []
      };
    },

    init() {
      let columnPattern = /<jsonapi-column[\s\S]*<\/jsonapi-column>/g;
      let columnSection = this.$options.el.innerHTML.match(columnPattern);
      let tableBody = '';

      if (columnSection) {
        let tableBodyContent = columnSection[0].replace(/<jsonapi-column/g, '<jsonapi-column :sort-attribute="sort" :sort-direction="sortDirection" :sort-function="sortBy"');

        // Build out the table body in the template based on the inner HTML
        tableBody += '<div class="jsonapi-table-row" v-for="record in records" v-el:row>\n';
        tableBody += tableBodyContent;
        tableBody += '\n</div>';
      }

      tableBody = this.$options.el.innerHTML.replace(/<jsonapi-column[\s\S]*<\/jsonapi-column>/g, tableBody);

      this.$options.template = this.$options.template.replace('JSONAPITABLEBODY', tableBody);
    },

    methods: {
      getRecords() {
        let self = this;
        this.errors = false;
        this.loading = true;

        this.client.findAll(this.type, this.findAllOptions).then(function(result) {
          self.links = result.links;
          self.records = result.records;
          self.loading = false;
        }).catch(function(result) {
          self.loading = false;
          self.errors = result.errors;
        });
      },

      nextPage() {
        if (this.loading) { return; }
        this.page = this.page + 1;
        this.getRecords();
      },

      previousPage() {
        if (this.loading) { return; }
        this.page = this.page - 1;
        this.getRecords();
      },

      sortBy(attribute) {
        if (this.sort === attribute) {
          if (this.sortDirection == 'asc') {
            this.sortDirection = 'desc';
          } else {
            this.sortDirection = 'asc';
          }
        } else {
          this.sort = attribute;
          this.sortDirection = 'asc';
        }

        this.page = 1;
        this.getRecords();
      }
    },

    props: {
      endpoint: {
        default: '/',
        type:    String
      },

      filter: {
        default: function() {
          return {};
        },

        type: Object
      },

      include: {
        default: function() {
          return [];
        },

        type: Array
      },

      page: {
        default: 1,
        type:    Number
      },

      pageSize: {
        default: 10,
        type:    Number
      },

      sort: {
        default: 'id',
        type:    String
      },

      sortDirection: {
        default: 'desc',
        type:    String
      },

      type: {
        required: true,
        type:     String
      }
    },

    ready() {
      this.getRecords();
    }
  };
</script>

<style lang="sass">
  @import "codelation";

  jsonapi-table {
    display: block;
    margin-top: 2em;
  }

  .jsonapi-table-error {
    background-color: color($red, 100);
    border: 1px solid color($red, 400);
    border-radius: 4px;
    padding: 0.8em 1em;
    margin-bottom: 1em;
  }

  .jsonapi-table-body {
    @include transition(color 300ms ease-out);
    color: color($grey, 800);

    &.loading {
      color: $grey;
    }
  }

  .jsonapi-table-row {
    @include has-columns(2);
  }

  jsonapi-column {
    @include has-columns($column-class: "jsonapi-table-value");
    @include flex-direction(column);
    margin-right: 1em;

    &:last-of-type {
      margin-right: 0;
    }
  }

  .jsonapi-table-header {
    border-bottom: 2px solid $blue-grey;
    color: color($blue-grey, 800);
    display: none;
    font-family: $helvetica;
    font-weight: 500;
    padding-left: 0.5em;
    position: relative;

    &.sortable {
      cursor: pointer;
    }

    svg {
      bottom: 0.5em;
      opacity: 0.7;
      position: absolute;
      right: 0.5em;
    }
  }

  .jsonapi-table-value {
    border-bottom: 1px solid color($blue-grey, 100);
    margin-right: 1em;
    opacity: 1;
    padding: 0.5em;

    &:last-of-type {
      margin-right: 0;
    }
  }

  .jsonapi-table-row:first-of-type .jsonapi-table-header {
    display: block;
  }

  .jsonapi-table-pager {
    @include clearfix;
    padding: 1em 0;
  }

  .jsonapi-table-previous-page {
    float: left;
  }

  .jsonapi-table-next-page {
    float: right;
  }

  @media (min-width: $mobile-breakpoint + 1px) {
    .jsonapi-table-header {
      height: 2.2em;
      line-height: 2em;
    }
  }

  @media (max-width: $mobile-breakpoint) {
    .jsonapi-table-row {
      border-bottom: 4px solid color($blue-grey, 100);
      border-top: 4px solid color($blue-grey, 100);
      margin-bottom: 2em;
    }

    jsonapi-column {
      @include has-columns(2, $mobile: true);
    }

    .jsonapi-table-header {
      border-bottom: 1px solid color($blue-grey, 100);
      display: block;
      padding: 0.5em;
      width: 40%;

      svg {
        display: none;
      }
    }

    .jsonapi-table-value {
      width: 60%;
    }
  }
</style>
