<template>
  <div class="form-container">
    <!-- <h3 class="page-title">{{$route.params.name}} - IoT设备</h3> -->
    <div class="search-container">
    <el-input  class='input-box' placeholder="请输入内容" v-model="input" clearable></el-input>
    <el-button>搜索</el-button>
    </div>
    <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :default-sort="{prop: 'name', order: 'descending'}"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="150"></el-table-column> 
          <el-table-column label="类型" width="150">部署</el-table-column>
          <el-table-column prop="priority" label="优先级" width="150"></el-table-column>
          <el-table-column prop="systemMetrics.results.appliedCount" label="已应用" width="150"></el-table-column>
          <el-table-column prop="createdTimeUtc" label="创建时间"  show-overflow-tooltip ></el-table-column>
        </el-table>
    <div class="button-container">
      <router-link to="/IoTHubDashboard">
        <el-button type="primary">创建部署</el-button>
      </router-link>
      <el-button type="danger">删除</el-button>
    </div>
  </div>
</template>

<script>
import {getIoTEdgeDeviceDeployment} from "@/api/api.js";
export default {
  name: "IoTEdgeDashboard",
  props:["name","resourcegroup"],
  data() {
    return {
      displayData:[],
      type:"部署",
      tableData: [
        /*{
          id: "Starbucks",
          status: "406",
          priority: "3",
          type: "部署",
          deployCount: "2"
        },*/
      ],
      input: '',
      multipleSelection: []
    };
  },

  methods: {},

  async mounted(){
    this.displayData=(
      await getIoTEdgeDeviceDeployment(
        localStorage.username,
        localStorage.subscriptionId,
        this.$props.resourcegroup,
        this.$props.name
      )
    ).data.body;
    this.tableData=this.displayData;
    /*axios.post("https://localhost:44350/api/iothubresource/Starbucks/Starbucks/getiotedgedevicedeployment")
    .then(response=>{this.tableData=response.data.body})*/
  }
};
</script>


<style scoped>
.el-table {
  margin-top: 20px;
  display: inline-block;
  width: 90%;
}

.page-title {
  color: #48576a;
}

.input-box {
  margin-top: 10px;
  color: #48576a;
  width: 300px;
}

.button-container {
  margin-top: 20px;
}

.hide-underline {
  text-decoration: none;
}
</style>