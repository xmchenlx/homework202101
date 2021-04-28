<template>
  <div class='k-menu'>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" style="margin-top:10px;margin-bottom:10px;"
      @click="$router.push('/specs/add')"
    >添加</el-button>

    <el-table
      stripe
      border
      :data="specsList"
      row-key="id"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="80"
      >
      </el-table-column>
    
      <el-table-column
        prop="specsname"
        label="规格"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="规格属性"
        width="300"
      >
        <template slot-scope="scope">
            <div>
                <el-tag v-for="a in scope.row.attrs" :key="a">{{a}}</el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == '1' ? 'primary' : 'danger'">
            {{ scope.row.status == '1' ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="edit(scope.row.id)"
          > 编辑 </el-button>
          <el-button
            type="danger"
            @click="dialogVisible = true;delId = scope.row.id"
          > 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>是否确定删除</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deleteMenu"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// import {mapActions} from 'vuex'
export default {
  name: "k-menu",
  data() {
    return {
      dialogVisible: false, //控制对话框是否显示
      specsList: [],
      delId:''
    };
  },
  mounted() {
    this.getSpecsList()
  },
  methods: {
    getSpecsList(){
      this.$axios.get('/api/specslist',{params:{
        size:10,
        page:1
      }})
      .then((result) => {
        console.log(result)
         this.specsList = result.data.list
      }).catch((err) => {
          console.log(err)
      });
    },
    // 编辑菜案
    edit(id) {
      console.log(id);
      this.$router.push("/specs/" + id)
    },
    // 删除菜单
    deleteMenu() {
      console.log("删除菜单",this.delId);
    }
  }
};
</script>
<style scoped>
</style>
