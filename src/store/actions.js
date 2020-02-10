import api from '../axios'
import Vue from 'vue'
import router from '../router/index'
import * as types from './types'

export default {
	UserLogin({ commit }, data) {
		commit(types.LOGIN, data)
	},

	UserLogout({ commit }) {
		commit(types.LOGOUT)
	},

	UserName({ commit }, data) {
		commit(types.USERNAME, data)
	},
	TenantId({commit},data){
		commit(types.TENANTID,data)
	},
	ClientId({commit},data){
		commit(types.CLIENTID,data)
	},
	SubscriptionId({commit},data){
		commit(types.SUBSCRIPTIONID,data)
	},
	Resourcegroup({commit},data){
		commit(types.RESOURCEGROUP,data)
	},
	Resourcename({commit},data){
		commit(types.RESOURCENAME,data)
	},
}
