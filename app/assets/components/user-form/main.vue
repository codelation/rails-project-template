<template>
  <form v-on:submit.prevent="submit">
    <div class="input email" v-bind:class="{ invalid: errors.email }">
      <input v-model="record.email" type="email">
      <div class="errors" v-if="errors.email">
        {{errors.email.join(', ')}}
      </div>
    </div>

    <div class="input password" v-bind:class="{ invalid: errors.password }">
      <input v-model="record.password" type="password">
      <div class="errors" v-if="errors.password">
        {{errors.password.join(', ')}}
      </div>
    </div>

    <div class="submit">
      <div class="errors" v-if="errors.base">
          {{errors.base.join(', ')}}
        </div>

      <button type="submit">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
  import JsonApiForm from 'jsonapi-form';

  export default JsonApiForm.extend({
    methods: {
      error() {
        console.error('errors', this.errors);
      },

      success() {
        console.log('record', this.record);
      }
    }
  });
</script>
