<template>
  <div class="router-container">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/IoTHubDashboard' }">IoT中心</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.params.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 class="page-title">{{$route.params.name}} - IoT中心</h3>

    <el-row>
      <el-col :span="12">
        <div class="entry-container">
          <span>
            <p class="entry-title">资源组:</p>
            {{basicinfo.resourcegroup}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.resourcegroup"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">状态:</p>
            {{basicinfo.state}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.state"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">当前位置:</p>
            {{basicinfo.location}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.location"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">订阅:</p>
            {{basicinfo.subscribe}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.subscribe"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">订阅ID:</p>
            {{basicinfo.subscribeID}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.subscribeID"
            />
          </span>
          <br />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="entry-container">
          <span>
            <p class="entry-title">主机名:</p>
            {{basicinfo.hostname}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.hostname"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">定价及缩放级别:</p>
            {{basicinfo.sku.name}}
            <el-button type="text" @click="changeSkuFormVisible = true">(更改)</el-button>
            <el-dialog title="更改定价及缩放级别" :visible.sync="changeSkuFormVisible">
              <el-form label-position="left" ref="changeSKU" :model="changeSKU" label-width="160px">
                <el-form-item label="SKU">
                  <el-select v-model="changeSKU.name" placeholder="请选择缩放层">
                    <el-option label="S1: 标准层" value="S1"></el-option>
                    <el-option label="S2: 标准层" value="S2"></el-option>
                    <el-option label="S3: 标准层" value="S3"></el-option>
                    <el-option label="B1: 基本层" value="B1"></el-option>
                    <el-option label="B2: 基本层" value="B2"></el-option>
                    <el-option label="B3: 基本层" value="B3"></el-option>
                    <el-option label="F1: 免费层" value="F1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleChangeName()">确认更改</el-button>
                  <el-button @click="changeSkuFormVisible = false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <img src="../../assets/img/copy.png" alt="copy" v-clipboard:copy="basicinfo.skuname" />
          </span>
          <br />
          <span>
            <p class="entry-title">IoT中心单元数量:</p>
            {{basicinfo.sku.capacity}}
            <el-button type="text" @click="changeCountFormVisible = true">(更改)</el-button>
            <el-dialog title="更改IoT中心单元数量" :visible.sync="changeCountFormVisible">
              <el-form label-position="left" ref="changeSKU" :model="changeSKU" label-width="160px">
                <el-form-item label="IoT中心单元数量">
                  <el-input v-model="changeSKU.count" placeholder="填写新的数量"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleChangeCount()">确认更改</el-button>
                  <el-button @click="changeCountFormVisible = false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.skucapacity"
            />
          </span>
          <br />
        </div>
      </el-col>
    </el-row>

    <el-tabs tab-position="left" v-model="activeName"  @tab-click="showPane=true">
      <el-tab-pane label="共享访问策略">
        <SharePolicyDashboard
          v-if="load"
          :name="$route.params.name"
          :resourcegroup="basicinfo.resourcegroup"
        ></SharePolicyDashboard>
      </el-tab-pane>
      <el-tab-pane label="IoT设备">
        <IoTDeviceDashboard
         v-if="showPane"
         :resourceGroup="basicinfo.resourcegroup"
         :hostName="$store.state.hostName"
         :sharedAccessKeyName="$store.state.accessKey.keyName"
         :sharedAccessKey ="$store.state.accessKey.primaryKey"
         ></IoTDeviceDashboard>
      </el-tab-pane>
      <el-tab-pane label="IoT Edge设备">
        <IoTEdgeDashboard  
        v-if="showPane" 
        :resourcegroup="basicinfo.resourcegroup"
        ></IoTEdgeDashboard>
      </el-tab-pane>
      <el-tab-pane label="IoT Edge部署">
        <IoTEdgeDeploy 
          v-if="showPane"
          :name="$route.params.name"
          :resourcegroup="basicinfo.resourcegroup"
        ></IoTEdgeDeploy>
      </el-tab-pane>
      <el-tab-pane label="指标">
        <!-- <ve-line width="600px" :data="chartData" :settings="chartSettings" ref="chart"></ve-line> -->
        <IoTHubChart> </IoTHubChart>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import IoTDeviceDashboard from "./IoTDeviceDashboard.vue";
import IoTEdgeDashboard from "./IoTEdgeDashboard.vue";
import IoTEdgeDeploy from "./IoTEdgeDeploy.vue";
import SharePolicyDashboard from "./SharePolicyDashboard.vue";
import { listbysubid, getIoThub, createIoThub, getIoThubKeys } from "@/api/api.js";
import IoTHubChart from './IoTHubChart.vue'

export default {
  components: {
    IoTDeviceDashboard,
    IoTEdgeDashboard,
    IoTEdgeDeploy, 
    SharePolicyDashboard,
    IoTHubChart
  },
  data() {
    return {
      username:localStorage.username,
      subscriptionId:localStorage.subscriptionId,
      load: false,
      showPane:false,
      activeName: "",
      changeCountFormVisible: false,
      changeSkuFormVisible: false,
      tableData: "",
      basicinfo: {
        resourcegroup: "",
        state: "",
        location: "",
        subscribe: "",
        subscribeID: "",
        hostname: "",
        sku: ""
      },
      changeSKU: {
        name: "",
        tier: "",
        count: 1
      },
    };
  },
  methods: {
    async handleChangeCount() {
      var response = await createIoThub(
        this.username,
        this.subscriptionId,
        this.basicinfo.resourcegroup,
        this.$route.params.name,
        {
          name: this.$route.params.name,
          location: this.basicinfo.location,
          sku: {
            name: this.basicinfo.sku.name,
            tier: this.basicinfo.sku.tier,
            capacity: this.changeSKU.count
          }
        }
      );
      if (response.data == "success") {
        this.$message({
          message: "更改成功",
          type: "success"
        });
        this.changeCountFormVisible = false;
        this.basicinfo.sku = (await getIoThub(
          this.username,
          this.subscriptionId,
          this.basicinfo.resourcegroup,
          this.$route.params.name
        )).data.sku;
        this.changeSKU.count = this.basicinfo.sku.capacity;
      } else {
        this.$message.error("更改失败");
      }
    },

    async handleChangeName() {
      if (this.changeSKU.name == "S1" || "S2" || "S3") {
        this.changeSKU.tier = "Standard";
      } else if (this.changeSKU.name == "B1" || "B2" || "B3") {
        this.changeSKU.tier = "Basic";
      } else if (this.changeSKU.name == "F1") {
        this.changeSKU.tier = "Free";
      }
      var response = await createIoThub(
        this.username,
        this.subscriptionId,
        this.basicinfo.resourcegroup,
        this.$route.params.name,
        {
          name: this.$route.params.name,
          location: this.basicinfo.location,
          sku: {
            name: this.changeSKU.name,
            tier: this.changeSKU.tier,
            capacity: this.basicinfo.sku.capacity
          }
        }
      );
      if (response.data == "success") {
        this.$message({
          message: "更改成功",
          type: "success"
        });
        this.changeCountFormVisible = false;
        this.basicinfo.sku = (await getIoThub(
          this.username,
          thsi.subscriptionId,
          this.basicinfo.resourcegroup,
          this.$route.params.name
        )).data.sku;
        this.changeSKU.name = this.basicinfo.sku.name;
      } else {
        this.$message.error("更改失败");
      }
    }
  },

  // watch: {
  //   activeName(v) {
  //     this.$nextTick(_ => {
  //       this.$refs[`chart`].echarts.resize();
  //     });
  //   },
  // },

  async mounted() {
    console.log("123456");
    this.tableData = (await listbysubid(this.username,this.subscriptionId)).data;
    for (var i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i]) {
        if (this.tableData[i].name.indexOf(this.$route.params.name) > -1) {
          this.basicinfo.resourcegroup = this.tableData[i].resourcegroup;
          break;
        }
      }
    }
    var res = await getIoThub(
      this.username,
      this.subscriptionId,
      this.basicinfo.resourcegroup,
      this.$route.params.name
    );
    this.basicinfo.location = res.data.location;
    this.basicinfo.subscribe = res.data.type;
    this.basicinfo.subscribeID = res.data.subscriptionid;
    this.basicinfo.state = res.data.properties.state;
    this.basicinfo.hostname = res.data.properties.hostName;
    this.basicinfo.sku = res.data.sku;
    this.changeSKU.count = this.basicinfo.sku.capacity;
    this.changeSKU.name = this.basicinfo.sku.name;

    this.$store.state.accessKey = (await getIoThubKeys(
      this.username,
      this.subscriptionId,
      this.basicinfo.resourcegroup,
      this.$route.params.name
    )).data.value[0];
    this.$store.state.hostName= this.basicinfo.hostname;

    this.load = true;
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

.entry-container {
  margin-left: 20px;
  margin-bottom: 20px;
}

.button-container {
  margin-top: 20px;
}

.el-tabs {
  width: 90%;
}

.entry-title {
  display: inline-block;
  width: 140px;
  height: 10px;
}

.el-input {
  display: inline-block;
  width: 320px;
}

img {
  width: 14px;
}
</style>
