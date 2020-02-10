import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import { resourcegroup } from '../api/api';

Vue.use(Vuex);

const state = {
	token: null,
	activeName: 'first',
	username: '',
	IoThub: [],
	accessKey: {},
	hostName: '',
	tenantId:'',
	clientId:'',
	subsciptionId:'',
	resourcegroup:'',
	resourcename:'',
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})
