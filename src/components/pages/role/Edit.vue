<template>
  <div class='edit'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色{{type}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="margin-top:20px;"
    >
      <el-form-item
        label="角色名称"
        style="width:400px;"
      >
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>

      <el-form-item  label="角色权限">
        <el-tree
          ref="menu-tree"
          :data="menuList"
          :props="defaultProps"
          show-checkbox
          default-expand-all
          highlight-current
          node-key="id"
          check-strictly
          :default-checked-keys="defaultChecked"
        ></el-tree>
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
import {mapActions} from 'vuex'
export default {
  name: "edit",
  data() {
    return {
      type: "添加",
      menuList:[],
      defaultProps:{
        label:"title",
        children:"children"
      },
      form: {
        rolename: "",
        menus:"",
        status:''
      },
      defaultChecked:[]
    };
  },
  mounted() {
    this.getMenuList({istree:1})
    .then((result) => {
        console.log(result)
        this.menuList = result.data.list
    }).catch((err) => {
        console.log(err)
    });

    let id = this.$route.params.id;
    if(id){
      this.getRoleInfo(id)
    }
  },
  methods: {
    ...mapActions(["getMenuList"]),
    getRoleInfo(id){
      this.$axios.get('/api/roleinfo',{params:{id}})
      .then((result) => {
        this.form = result.data.list

        this.defaultChecked = this.form.menus.split(',')
        console.log(this.form)
      }).catch((err) => {
        console.log(err)
      });
    },
    back(){
      this.$router.go(-1)
    },
    onSubmit(){
       let nodes =  this.$refs['menu-tree'].getCheckedNodes()
       console.log(nodes)
       let menus = []
       nodes.forEach(node =>{
         menus.push(node.id)
       })
       this.form.menus = menus.toString()

      let url = "/api/roleadd"
      let id = this.$route.params.id
      if(id){
        this.form.id = id
        url = "/api/roleedit"
      }

      this.$axios.post(url,this.form)
      .then((result) => {
        console.log(result)
        if(result.data.code === 200){
          this.$router.push('/role')
        }
      }).catch((err) => {
        console.log(err)
      });

    }
  }
};
</script>
<style scoped>
</style>
