<script>
  import { JsonApiClient } from 'jsonapi';
  import Vue from 'vue';

  export default Vue.extend({
    init() {
      let template = '';
      template += '<div class="jsonapi-table-row" v-for="record in records">';



      var pattern = /<jsonapi-column(?!<\/jsonapi-column>).*/g;
      console.log(this.$options.el.innerHTML.match(pattern));

      template += this.$options.el.innerHTML.replace('<jsonapi-column', '<jsonapi-column :record="record"');
      template += '</div>';
      this.$options.template = template;
    },

    data() {
      return {
        records: [
          { id: 1, firstName: 'Brian', lastName: 'Pattison' },
          { id: 2, firstName: 'Kirsten', lastName: 'Pattison' },
        ]
      };
    }
  });
</script>
