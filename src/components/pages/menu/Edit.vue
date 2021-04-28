<template>
  <div class='edit'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单{{type}}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加/修改表单 -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      style="margin-top:20px;"
    >
      <el-form-item
        label="菜单名称"
        prop="title"
        style="width:400px;"
      >
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item
        label="上级菜单"
        prop="pid"
      >
        <el-select
          v-model="form.pid"
          placeholder="请选择上级菜单"
        >
          <el-option
            label="顶级菜单"
            :value="0"
          ></el-option>
          <el-option
            v-for="m in menuList"
            :key="m.id"
            :label="m.title"
            :value="m.id"
          ></el-option>

        </el-select>
      </el-form-item>

      <el-form-item label="菜单类型">
        <el-radio-group v-model="form.type">
          <el-radio label="1">目录</el-radio>
          <el-radio label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-if="form.type == 1"
        label="目录图标"
        style="width:400px;"
      >
        <el-input v-model="form.icon"></el-input>
      </el-form-item>

      <el-form-item
        v-if="form.type == 2"
        label="菜单地址"
        style="width:400px;"
      >
        <el-input v-model="form.url"></el-input>
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
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "edit",
  data() {
    return {
      type:"添加",
      form: {
        pid: "", //上级菜单的id
        title: "", //菜单名称
        type: "", //菜单类型  1：目录  2：菜单
        icon: "",
        url: "",
        status: "" //状态
      },
      rules: {
        title: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "菜单名称不符合规则", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }]
      },
    };
  },
  computed:{
    ...mapState(["menuList"])
  },
  mounted() {
    let id = this.$route.params.id;
    if (id) {
      this.type = "编辑"
      this.getMenuInfo(id)
    }
  },
  methods: {

    getMenuInfo(id){
        this.$axios.get('/api/menuinfo',{params:{id}})
        .then((result) => {
          this.form = result.data.list
        }).catch((err) => {
          console.log(err)
        });
    },
    // getMenuList() {
    //   this.$axios
    //     .get("/api/menulist", { params: { istree: 1 } })
    //     .then(result => {
    //       console.log(result);
    //       this.menuList = result.data.list;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    onSubmit() {
      //获得form表单，然后进行验证
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 深拷贝
          let str = JSON.stringify(this.form);
          let data = JSON.parse(str);

          // 如果type是编辑，则把接口地址改为编辑的接口
          let url = "/api/menuadd";
          if(this.type === "编辑"){
            data.id = this.$route.params.id
            url = "/api/menuedit"
          }
          
          this.$axios
            .post(url, data)
            .then(result => {
              console.log(result);
              if (result.data.code === 200) {
                this.$router.push("/menu");
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
