<template scope='scope'>
  <div class="hello">
    <h3 class="page-title">{{ msg }} {{ username }} </h3>

    <!--el-card class="box-card">
      <div class="text item">{{'tenantID: ' + tenantID }}</div>
      <div class="text item">{{'clientID: ' + clientID }}</div>
      <el-button @click="dialogFormVisible = true">查看权限</el-button>
    </el-card-->

    <el-card class="box-card">
      <h4 class="page-title">当前服务主体</h4>
      <div class="text item">{{'TenantID: ' + this.$store.state.tenantId }}</div>
      <div class="text item">{{'ClientID: ' + this.$store.state.clientId }}</div>
      <el-button @click="RightdialogFormVisible = true">权限</el-button>
    </el-card>
    <el-table
      ref="multipleTable"
      :data="displayData"
      tooltip-effect="dark"
      :default-sort="{prop: 'tenantID', order: 'descending'}"
      @selection-change="handleSelectionChange()"
    >
      <el-table-column prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="tenantId" label="TenantID" width="350"></el-table-column>
      <el-table-column prop="clientId" label="ClientID" width="350"></el-table-column>
      <el-table-column label="操作" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link
            class="hide-underline"
            :to="`${$route.params.name}/IoTEdge/${scope.row.deviceId}`"
          >
            <el-button size="mini">修改</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="deleteServicePrinciple(scope.row.tenantId,scope.row.clientId)">删除</el-button>
          <el-button size="mini" @click="RightdialogFormVisible = true">权限</el-button>
          <el-button size="mini" @click="updateCurrentService(scope.row.tenantId,scope.row.clientId)">应用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="权限" :visible.sync="RightdialogFormVisible">
      <el-form :model="form" label-width="120px">
        <el-form-item label="IoT中心">
          <el-checkbox-group v-model="form.iothub">
            <el-checkbox label="查看" name="iothub"></el-checkbox>
            <el-checkbox label="修改" name="iothub"></el-checkbox>
            <el-checkbox label="删除" name="iothub"></el-checkbox>
            <el-checkbox label="新增" name="iothub"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="AKS">
          <el-checkbox-group v-model="form.aks">
            <el-checkbox label="查看" name="aks"></el-checkbox>
            <el-checkbox label="修改" name="aks"></el-checkbox>
            <el-checkbox label="删除" name="aks"></el-checkbox>
            <el-checkbox label="新增" name="aks"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="资源组">
          <el-checkbox-group v-model="form.resource">
            <el-checkbox label="查看" name="resource"></el-checkbox>
            <el-checkbox label="修改" name="resource"></el-checkbox>
            <el-checkbox label="删除" name="resource"></el-checkbox>
            <el-checkbox label="新增" name="resource"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">保存</el-button>
          <el-button @click="RightdialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- v-for在进行过度时，使用 transition-group 标签，使用后内层标签需要有独有的 key 值 这段可以列出所有的user-->
    <!-- <transition-group name="list-complete" tag="ul">
        <li v-for="(item, index) in user" :key="item._id" class="list-complete-item">
            {{ index+1 }}. {{ item.email }}
            <el-button type="" @click="del_user(index)">删除</el-button>
        </li>
    </transition-group>
    <br>
    <el-button type="primary" @click="logout()">登出</el-button>-->

    <el-button type="primary" @click="AddServicedialogFormVisible = true">添加服务主体</el-button>
    <el-dialog title="添加服务主体" :visible.sync="AddServicedialogFormVisible" label-width="100px">
      <el-form :model="serviceValidateForm" ref="serviceValidateForm" :rules="rules">
        <el-form-item label="TenantId" prop="tenantId" >
          <el-input v-model="serviceValidateForm.tenantId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ClientId" prop="clientId"  :required="true">
          <el-input v-model="serviceValidateForm.clientId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ClientSecret" prop="clientSecret"  :required="true">
          <el-input v-model="serviceValidateForm.clientSecret" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('serviceValidateForm')">取 消</el-button>
        <el-button type="primary" @click="addServicePrinciple('serviceValidateForm')">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as types from "../store/types";
import api from "../axios";
import {getsubscriptions} from "@/api/api.js";
export default {
  name: "personalInformation",
  inject:['reload'],
  data() {
    return {
      msg: "Welcome!",
      user: "",
      username: "",
      subscriptionID:"",
      serviceValidateForm:{
        flag:false,
        tenantID:"",
        clientID:"",
        clientSecret:"",
      },
      RightdialogFormVisible: false,
      AddServicedialogFormVisible:false,
      userinfo:{},
      subscriptions:[],
      displayData:[],
      form: {
        iothub: [],
        aks: [],
        resource: []
      },
      rules:{
        tenantId:[
          {
            required:true,
            message:"必填",
          }
        ],
        clientId:[
          {
            required:true,
            message:"必填",
          }
        ],
        clientSecret:[
          {
            required:true,
            message:"必填",
          }
        ],
      }
    };
  },
  async mounted() {
    // this.get_User();
    this.username = localStorage.getItem("username");
    /*api.getUserInfo(this.username).then(response=>{
      this.userinfo=response.data;
    });*/
    await api.getServicePrinciples(this.username).then(result=>{
      this.userinfo=result;
      this.displayData=this.userinfo.data;
      console.log(result.data);
    });
    await api.getCurrentService(this.username).then(result=>{
      this.$store.dispatch('TenantId',result.data.tenantId);
      this.$store.dispatch('ClientId',result.data.clientId);
    })
    await getsubscriptions(this.username).then(result=>{
      this.subscriptions=result.data;
      this.$store.state.subscriptionId=this.subscriptions[0].subscriptionId;
      localStorage.subscriptionId=this.subscriptions[0].subscriptionId;
    })
    //this.tenantID=this.userinfo;
    //this.clientID=this.userinfo;
    //this.subscriptionID=this.userinfo;
  },
  methods: {
    onSubmit() {

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.AddServicedialogFormVisible=false;
    },
    async addServicePrinciple(formName){
      console.log("准备认证");
      this.$refs[formName].validate((valid)=>{
        console.log("开始认证");
        if(valid){
          console.log("认证通过");
          let opt =this.serviceValidateForm;
          api.addServicePrinciple(this.username,opt).then(res=>{
            console.log(res);
            if(res.data=="success")
            {
              this.$message({
                  type:"success",
                  message:"添 加 成 功 ！"
               });
               this.$refs[formName].resetFields();
               this.AddServicedialogFormVisible=false;
               this.reload();
            }
            else
            {
               this.$message({
                    type:"error",
                    message:"添 加 失 败 ！"
                  })
            }
          });
        } 
        else{
          console.log("Error Submit!!");
          return false;
        }
      })
      console.log(formName);
    },
    updateCurrentService(tenantId,clientId){
      api.setServicePrinciple(this.username,tenantId,clientId).then(result=>{
        if(result.data=="success"){
          this.$store.state.tenantId=tenantId;
          this.$store.state.clientId=clientId;
          this.$message({
                    type:"success",
                    message:"Success ！"
                  });
          localStorage.subscriptionId=null;
          this.reload();
        }
        else
        {
          this.$message({
                    type:"error",
                    message:"Error ！"
                  });
          this.reload();

        }
      })
      
      //localStorage.tenantId=tenantId;
      //localStorage.clientId=clientId;
    },
    deleteServicePrinciple(tenantId,clientId){
      console.log(tenantId,clientId);
      api.deleteServicePrinciple(this.username,tenantId,clientId).then(res=>{
        console.log(res);
        if(res.data){
          this.$message({
            type:"success",
            message:"删 除 成 功 ！"
          });
          this.reload()
        }
        else
        {
          this.$message({
            type:"error",
            message:"删 除 失 败 ！"
          })
        }
      })
    },
    get_User() {
      setTimeout(() => {
        api.getUser().then(({ data }) => {
          if (data.code == 401) {
            console.log("token");
            this.$router.push("/login");
            this.$store.dispatch("UserLogout");
            console.log(localStorage.token);
          } else {
            this.user = data;
          }
        });
      }, 100);
    },
    logout() {
      this.$store.dispatch("UserLogout");
      if (!this.$store.state.token) {
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "登出成功"
        });
      } else {
        this.$message({
          type: "info",
          message: "登出失败"
        });
      }
    },
    del_user(id) {
      let opt = {
        id: this.user[id]._id
      };
      api
        .delUser(opt)
        .then(response => {
          console.log(response);
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.get_User();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.page-title {
  color: #48576a;
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /*display: inline-block;*/
  margin: 10px 0;
}

a {
  color: #42b983;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

.hello {
  margin-left: 40px;
}

.text {
  font-size: 16px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 600px;
  margin: 20px;
}
</style>
