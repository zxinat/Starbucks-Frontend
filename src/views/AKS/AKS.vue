<template>
  <div class="router-container">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/AKSDashboard' }">AKS</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.params.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 class="page-title">{{$route.params.name}} - AKS</h3>

    <el-row>
      <el-col :span="10">
        <div class="entry-container">
          <span>
            <p class="entry-title">资源组:</p>
            {{this.$route.params.resourceGroup}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="$route.params.resourceGroup"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">状态:</p>
            {{basicinfo.properties.provisioningState}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo"
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
            {{basicinfo.subscrib}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.subscribe"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">订阅ID:</p>
            {{subscriptionId}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.subscribeID"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">AKS连接证书:</p>
            {{basicinfo.connectionCertificate}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.connectionCertificate"
            />
          </span>
          <br />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="entry-container">
          <span>
            <p class="entry-title">Kubernetes版本:</p>
            {{basicinfo.properties.kubernetesVersion}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.hostname"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">API服务器地址:</p>
            {{basicinfo.properties.fqdn}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.skuname"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">HTTP应用程序路由域:</p>
            {{basicinfo.http}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.skucapacity"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">总内核数:</p>
            {{basicinfo.properties.agentPoolProfiles[0].count}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo.skucapacity"
            />
          </span>
          <br />
          <span>
            <p class="entry-title">内存总量:</p>
            {{basicinfo.properties.agentPoolProfiles[0].vmSize}}
            <img
              src="../../assets/img/copy.png"
              alt="copy"
              v-clipboard:copy="basicinfo"
            />
          </span>
          <br />
        </div>
      </el-col>
    </el-row>

    <el-tabs tab-position="left" v-model="activeName">
      <el-tab-pane label="见解">
        <el-select v-model="value" placeholder="请选择" @change="reload()">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- v-if 根据选择现实button-group-->
        <el-button-group v-if="value=='节点 CPU 利用率百分比' || value=='节点内存利用率百分比'">
          <el-button>平均</el-button>
          <el-button>最小</el-button>
          <el-button>50%</el-button>
          <el-button>90%</el-button>
          <el-button>95%</el-button>
          <el-button>最大</el-button>
        </el-button-group>
        <el-button-group v-if="value=='节点计数'">
          <el-button>总计</el-button>
          <el-button>就绪</el-button>
          <el-button>未就绪</el-button>
        </el-button-group>
        <el-button-group v-if="value=='活动 pod 计数'">
          <el-button>总计</el-button>
          <el-button>挂起</el-button>
          <el-button>正在运行</el-button>
          <el-button>未知</el-button>
          <el-button>成功</el-button>
          <el-button>失败</el-button>
        </el-button-group>
        <AKSChart v-bind:title="value" v-if="update"></AKSChart>
      </el-tab-pane>
      <el-tab-pane label="日志">
        <!-- 添加日志的部分 -->
      </el-tab-pane>
      <el-tab-pane label="布置容器">
        <DeployContainer></DeployContainer>
      </el-tab-pane>
      <el-tab-pane label="仪表盘">
        <!-- 有链接的话吧src给替换掉 -->
        <iframe src="https://www.baidu.com"></iframe>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AKSChart from "./AKSChart.vue";
import DeployContainer from "./DeployContainer.vue";
import {getAKSInfo} from "@/api/api.js";
export default {
  components: { AKSChart, DeployContainer },
  data() {
    this.chartSettings = {
      metrics: ["访问用户", "下单用户"],
      dimension: ["日期"]
    };
    return {
      update: true,
      load: false,
      activeName: "",
      changeCountFormVisible: false,
      changeSkuFormVisible: false,
      tableData: "",
      subscriptionId:localStorage.subscriptionId,
      username:localStorage.username,
      basicinfo: {
        //resourcegroup: $route.params.resourceGroup,
        //state: "",
        //location: "",
        //properties:
        //subscribe: "",
        //subscribeID: "",
        //hostname: "",
        //sku: "",
        //connectionCertificate: ""
      },
      changeSKU: {
        name: "",
        tier: "",
        count: 1
      },

      options: [
        {
          value: "节点 CPU 利用率百分比",
          label: "节点 CPU 利用率百分比"
        },
        {
          value: "节点内存利用率百分比",
          label: "节点内存利用率百分比"
        },
        {
          value: "节点计数",
          label: "节点计数"
        },
        {
          value: "活动 pod 计数",
          label: "活动 pod 计数"
        }
      ],
      value: ""
    };
  },
  methods: {
    reload() {
      this.update = false;
      this.$nextTick(() => {
        this.update = true;
      });
    }
  },

  async mounted() {
    await getAKSInfo(this.username,this.subscriptionId,this.$route.params.resourceGroup,this.$route.params.name).then(result=>{
      console.log(result);
      this.basicinfo=result.data;

    });
    console.log(this.basicinfo);
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
  width: 160px;
  height: 10px;
}

.el-input {
  display: inline-block;
  width: 320px;
}

img {
  width: 14px;
}

iframe {
  width: 100%;
  height: 600px;
}

.el-select {
  margin: 20px;
}
</style>
