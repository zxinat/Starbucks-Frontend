<template>
  <div class="form-container">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/AKSDashboard' }">AKS</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 class="page-title">AKS</h3>
    <div class="search-container">
    <el-input  class='input-box' placeholder="请输入内容" v-model="input" @change="search()" clearable></el-input>
    <el-button @click="search()">搜索</el-button>
    <el-button type="primary">添加</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="displayData"
      tooltip-effect="dark"
      :default-sort="{prop: 'name', order: 'descending'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="名称" width="150">
        <template slot-scope="scope">
          <router-link class="hide-underline" :to="`/AKSDashboard/${scope.row.resourceGroup}/${scope.row.name}`">{{ scope.row.name }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="120" sortable></el-table-column>
      <el-table-column prop="resourceGroup" label="资源组" width="150" sortable></el-table-column>
      <el-table-column prop="location" label="位置" width="120" sortable></el-table-column>
      <el-table-column prop="subscribe" label="订阅" sortable></el-table-column>
      <el-table-column label="操作"  show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link class="hide-underline" :to="`AKSDashboard/${scope.row.name}`"> <el-button size="mini">编辑</el-button> </router-link>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="button-container"></div>
  </div>
</template>

<script>
import {listAllAKS} from "@/api/api.js";
export default {
  name: "IoTHubDashboard",
  data() {
    return {
      username:localStorage.username,
      subscriptionId:localStorage.subscriptionId,
      responses:[],
      displayData: [],
      aksinfo:{
        name:"",
        type:"",
        resourceGroup:"",
        location:"",
        subscribe:""
      },
      tableData: [],
      input: '',
      multipleSelection: []
    };
  },

  methods: {
     search() {
      this.displayData = [];
      var filter = this.input.toUpperCase();
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i]) {
          if (this.tableData[i].name.toUpperCase().indexOf(filter) > -1) {
            this.displayData.push(this.tableData[i]);
          }
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    
  },
  async mounted() {
    await listAllAKS(this.username,this.subscriptionId).then(response=>{
      this.displayData=response.data.responses[0].content.value;
    });
    for(var i=0;i<this.displayData.length;i++){
      var idArray=this.displayData[i].id.split('/');
      var temp={name:this.displayData[i].name,location:this.displayData[i].location,type:this.displayData[i].type,resourceGroup:idArray[4],subscribe:idArray[2]};
      this.displayData[i]=temp;
      console.log(temp);
    }
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
  margin-top: 20px;
}

.input-box {
  color: #48576a;
  width: 300px;
}

.button-container {
  margin-top: 40px;
}

.hide-underline {
  text-decoration: none;
}

.form-container {
  margin-left: 40px;
}
</style>
