<template>
  <div class='edit'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户{{type}}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加/修改表单 -->
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="margin-top:20px;"
    >
      <el-form-item
        label="名称"
        style="width:400px;"
      >
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item
        label="所属角色"
        prop="roleid"
      >
        <el-select
          v-model="form.roleid"
          placeholder="请选择角色"
        >

          <el-option
            v-for="r in roleList"
            :key="r.id"
            :label="r.rolename"
            :value="r.id"
          ></el-option>

        </el-select>
      </el-form-item>

      <el-form-item
        label="密码"
        style="width:400px;"
      >
        <el-input
          show-password
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
          active-color="green"
          inactive-color="red"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >立即创建</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "edit",
  data() {
    return {
      type: "添加",
      form: {
        roleid: "", //角色id
        username: "",
        passsword: "",
        status: "" //状态
      },
      roleList: []
    };
  },
  computed: {
    ...mapState(["menuList"])
  },
  mounted() {
    let id = this.$route.params.id;
    if (id) {
      this.type = "编辑";
      this.getMenuInfo(id);
    }

    this.getRoleList();
    
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    getRoleList() {
      this.$axios
        .get("/api/rolelist")
        .then(result => {
       
          this.roleList = result.data.list;
             console.log(this.roleList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMenuInfo(id) {
      this.$axios
        .get("/api/userinfo", { params: { 'uid':id } })
        .then(result => {
          this.form = result.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },

    onSubmit() {
      //获得form表单，然后进行验证
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 深拷贝
          let str = JSON.stringify(this.form);
          let data = JSON.parse(str);

          // 如果type是编辑，则把接口地址改为编辑的接口
          let url = "/api/useradd";
          if (this.type === "编辑") {
            data.id = this.$route.params.id;
            url = "/api/useredit";
          }

          this.$axios
            .post(url, data)
            .then(result => {
              console.log(result);
              if (result.data.code === 200) {
                this.$router.push("/admin");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
