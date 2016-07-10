import { JsonApiClient, JsonApiSerializer } from 'jsonapi';
import ProgressBar from 'progress-bar';

const client = new JsonApiClient();

const state = {};

const mutations = {};

export default new Vuex.Store({
  mutations,
  state
});
