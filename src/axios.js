import axios from 'axios'
import router from './router/index'
import store from './store/index'
import * as types from './store/types'

//
axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
	if(localStorage.getItem('access_token')) {
		config.headers.Authorization = `token ${localStorage.getItem('access_token')}`
			.replace(/(^\")|(\"$)/g, '')
	}
	return config
}, err => {
	return Promise.reject(err)
})
// axios拦截响应
instance.interceptors.response.use(response => {
	return response
}, err => {
	return Promise.reject(err)
})

export default {
	// 用户注册
	userRegister(data) {
		return instance.post('/api/user/register', data)
	},
	// 用户登录
	UserLogin(data) {
		return instance.post('/api/user/login', data)
	},
	// 获取用户
	getUser() {
		return instance.get('/api/user/getusers')
	},
	getUserInfo(username){
		return instance.get(`/api/user/getuserinfo/${username}`)
	},

	
	getServicePrinciples(username){
		return instance.get(`/api/user/${username}/listServicePrinciples`)
	},
	addServicePrinciple(username,data){
		return instance.post(`/api/user/${username}/addServicePrinciple`,data)
	},
	getCurrentService(username,data){
		return instance.post(`/api/user/${username}/getcurrentservice`,data)
	},
	setServicePrinciple(username,tenantId,clientId){
		return instance.get(`/api/user/${username}/setServicePrinciple/${tenantId}/${clientId}`)
	},
	deleteServicePrinciple(username,tenantId,clientId){
		return instance.delete(`/api/user/${username}/deleteServicePrinciple/${tenantId}/${clientId}`)
	},


	updateClientSecret(username,data){
		return instance.post(`/api/user/${username}/updateClientSecret`,data)
	},
	getClientSecret(username,tenantId,clientId){
		return instance.get(`/api/user/${username}/getClientSecret/${tenantId}/${clientId}`)
	},
	// 删除用户
	delUser(data) {
		return instance.post('/api/delUser', data)
	}
}
