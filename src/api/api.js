import axios from "axios";
axios.defaults.baseURL = 'https://localhost:5001';
// axios.defaults.withCredentials = true;
axios.defaults.headers =  {
    'Content-Type' : 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
}

export function listbysubid(username,subid) {
    return axios.get(`api/iothubresource/${username}/${subid}/listbysubid`);
  }
export function createIoThub(username,subid,resourceGroupName, resourceName, data) {
    return axios.put(`api/iothubresource/${username}/${subid}/createorupdate/${resourceGroupName}/${resourceName}`, data);
}
export function deleteIoThub(username,subid,resourceGroupName, resourceName) {
  return axios.post(`api/iothubresource/${username}/${subid}/delete/${resourceGroupName}/${resourceName}`);
}
export function getIoThub (username,subid,resourceGroupName, resourceName) {
  return axios.get(`api/iothubresource/${username}/${subid}/getiothubinfo/${resourceGroupName}/${resourceName}`);
}
export function getIoThubKeys (username,subid,resourceGroupName, resourceName) {
  return axios.post(`api/iothubresource/${username}/${subid}/getiothubkeys/${resourceGroupName}/${resourceName}`)
}
export function createIotDevice (deviceId, data) {
  return axios.post(`api/iothubresource/device/createIotdevice/${deviceId}`, data)
}
export function getDevices (username,data) {
  return axios.post(`api/iothubresource/${username}/device/getiotdevices/`, data)
}
export function createEdge (deviceId, data) {
  return axios.post(`api/iothubresource/device/createiotedgedevice/${deviceId}`, data)
}
export function getEdgeDevices (username,data) {
  return axios.post(`api/iothubresource/${username}/device/getiotedgedevices/`, data)
}
export function getDeviceInfo(username,subid,resourceGroupName,resourceName,deviceId){
  return axios.get(`api/iothubresource/${username}/${subid}/${resourceGroupName}/${resourceName}/device/${deviceId}/getdeviceinfo`);
}
export function updateDeviceInfo (username,subid,resourceGroupName,resourceName,deviceId,data) {
  return axios.post(`api/iothubresource/${username}/${subid}/${resourceGroupName}/${resourceName}/device/${deviceId}/updatedeviceinfo`, data)
}
export function deleteDevice (deviceId, data) {
  return axios.post(`api/iothubresource/device/deletedevice/${deviceId}`, data)
}
export function getDeviceKey (deviceId, data) {
  return axios.post(`api/iothubresource/device/getdevicekey/${deviceId}`, data)
}
export function getDeviceTwin (username,deviceId, data) {
  return axios.post(`api/iothubresource/${username}/device/getdevicetwin/${deviceId}`, data)
}
export function updateDeviceTwin (username,subid,resourceGroupName,resourceName,deviceId, data) {
  return axios.post(`api/iothubresource/${username}/${subid}/${resourceGroupName}/${resourceName}/device/updatedevicetwin/${deviceId}`, data)
}
export function getIoTEdgeDeviceDeployment (username,subid,resourceGroupName, resourceName){
  return axios.post(`api/iothubresource/${username}/${subid}/${resourceGroupName}/${resourceName}/device/getiotedgedevicedeployment`)
}
export function getDeviceModules (username,subid,resourceGroupName,resourceName,deviceId) {
  return axios.post(`api/iothubresource/${username}/${subid}/${resourceGroupName}/${resourceName}/device/getDeviceModules/${deviceId}`)
}
export function getIoTHubInsights (username,subid,resourceGroupName,resourceName, data) {
  return axios.post(`api/iothubresource/${username}/${subid}/${resourceGroupName}/${resourceName}/getInsights`, data)
}



export function resourcegroup(username,subid) {  
  return axios.get(`api/resourcegroup/${username}/${subid}/getallresourcegroup`);
}
export function getsubscriptions(username){
  return axios.get(`api/resourcegroup/${username}/getsubscriptions`);
}
export function createRecourceGroup(resourceGroupName, location) {
  return axios.put(`api/resourcegroup/createorupdate/${resourceGroupName}/${location}`);
}
export function listallresource(username,resourceGroupName){
  return axios.get(`api/resourcegroup/${username}/${resourceGroupName}/listallresource`);
}


export function listAllAKS(username,subid){
  return axios.get(`api/AKS/${username}/${subid}/ListAllAKS`);
}
export function getAKSInfo(username,subid,resourcegroup,AKSName){
  return axios.get(`api/AKS/${username}/${subid}/${resourcegroup}/getAKSInfo/${AKSName}`);
}
export function createAKS(username,subid,resourceGroupName,AKSName,data){
  return axios.post(`api/AKS/${username}/${subid}/${resourceGroupName}/createAKS/${AKSName}`,data)
}