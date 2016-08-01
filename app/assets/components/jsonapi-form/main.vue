<template>
  <form v-on:submit.prevent="submit">
    <div class="input example-attribute" v-bind:class="{ invalid: errors.exampleAttribute }">
      <input v-model="record.exampleAttribute" type="text">
      <div class="errors" v-if="errors.exampleAttribute">
        {{errors.email.join(', ')}}
      </div>
    </div>

    <div class="submit">
      <button type="submit">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
  import { JsonApiClient } from 'jsonapi';
  import Vue from 'vue';

  export default Vue.extend({
    computed: {
      client() {
        return new JsonApiClient(this.endpoint);
      },

      saving() {
        return this.creating || this.updating;
      }
    },

    data() {
      return {
        creating: false,
        errors:   {},
        updating: false
      };
    },

    methods: {
      createRecord() {
        let self = this;
        this.creating = true;

        this.client.create(this.type, this.record).then(function(record) {
          self.record = record;
          self.creating = false;
          self.success();
        }).catch(function(errors) {
          self.errors = errors;
          self.creating = false;
          self.error();
        });
      },

      error() {
        console.warn('jsonapi-form: Implement error() to handle form submission errors.');
        console.error('errors', this.errors);
      },

      submit() {
        this.errors = {};

        if (this.record.id) {
          this.updateRecord();
        } else {
          this.createRecord();
        }
      },

      success() {
        console.warn('jsonapi-form: Implement success() to handle successful form submission.');
        console.log('record', this.record);
      },

      updateRecord() {
        let self = this;
        this.updating = true;

        this.client.update(this.type, this.record).then(function(record) {
          self.record = record;
          self.updating = false;
          self.success();
        }).catch(function(errors) {
          self.errors = errors;
          self.updating = false;
          self.error();
        });
      }
    },

    props: {
      endpoint: {
        default: '/',
        type:    String
      },

      record: {
        default() {
          return {};
        },
        type: Object
      },

      type: {
        required: true,
        type:     String
      }
    }
  });
</script>
