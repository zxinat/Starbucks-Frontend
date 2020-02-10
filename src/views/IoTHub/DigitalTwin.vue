<template>
  <div class="router-container">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/IoTHubDashboard' }">IoT中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/IoTHub/${$route.params.name}`">{{$route.params.name}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/IoTHub/${$route.params.name}/IoTDevice/${$route.params.deviceID}`" >{{$route.params.deviceID}}</el-breadcrumb-item>
      <el-breadcrumb-item >设备孪生</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 class="page-title">{{$route.params.deviceID}} - 设备孪生</h3>
    <el-button type="primary" @click="updateDeviceTwin(this.username,this.$props.resourcegroup,this.$route.params.name,this.$route.params.deviceID,this.content)">保存</el-button>
    <br />
    <br />
    <textarea type="textarea" :rows="25" v-model="content"></textarea>
  </div>
</template>

<script>
import {getDeviceTwin,updateDeviceTwin} from  "@/api/api.js";
export default {
  components: {},
  data() {
    return {
      deviceId:this.$route.params.deviceID,
      username:localStorage.username,
      subscriptionId:localStorage.username,
      content: ""
    };
  },
  methods: {
    updateDeviceTwin(username,subscriptionId,resourceGroupName,resourceName,deviceID,data){
      updateDeviceTwin(username,subscriptionId,resourceGroupName,resourceName,data).then(result=>{
        this.content=result.data;
      })
    }
  },

  watch: {},

  async mounted() {
    this.content = JSON.stringify((await getDeviceTwin(localStorage.username,this.deviceId, {
        hostName: this.$store.state.hostName,
        sharedAccessKeyName: this.$store.state.accessKey.keyName,
        sharedAccessKey: this.$store.state.accessKey.primaryKey
      })).data, null, "\t")
  },
  computed: {
    accessKey() {
      return this.$store.state.accessKey;
    },
    hostName() {
      return this.$store.state.hostName;
    }
  }
};
</script>

<style scoped>
.router-container {
  margin-left: 40px;
}

.page-title {
  color: #48576a;
  margin-top: 20px;
}

textarea {
  width: 1000px;
  font-size: 16px;
  color: #48576a;
}

p {
  color: #48576a;
}
</style>
