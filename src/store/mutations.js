import * as types from './types'

const mutations = {
	[types.LOGIN]: (state, data) => {
		localStorage.setItem('token', data)
		// localStorage.token = data
		state.token = data
	},
	[types.LOGOUT]: (state) => {
		localStorage.removeItem('token');
		state.token = null
	},
	[types.USERNAME]: (state, data) => {
		localStorage.setItem('username', data)
		state.username = data
	},
	[types.TENANTID]: (state, data) => {
		localStorage.setItem('tenantId', data)
		state.tenantId = data
	},
	[types.CLIENTID]: (state, data) => {
		localStorage.setItem('clientId', data)
		state.clientId = data
	},
	[types.SUBSCRIPTIONID]: (state, data) => {
		localStorage.setItem('subsciptionId', data)
		state.subsciptionId = data
	},
	[types.RESOURCEGROUP]: (state, data) => {
		localStorage.setItem('resourcegroup', data)
		state.resourcegroup = data
	},
	[types.RESOURCENAME]: (state, data) => {
		localStorage.setItem('resourcename', data)
		state.resourcename = data
	}
}
export default mutations
