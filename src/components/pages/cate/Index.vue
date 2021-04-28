<template>
  <div class='k-menu'>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" style="margin-top:10px;margin-bottom:10px;"
      @click="$router.push('/cate/add')"
    >添加</el-button>

    <el-table
      stripe
      border
      :data="cateList"
      row-key="id"
      style="width: 100%"
      :tree-props="{children:'children'}"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="catename"
        label="名称"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="img"
        label="图标"
        width="120"
      >
        <template slot-scope="scope">
            <div>
                <img class="cate-img" :src="scope.row.img"/>
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
          @click="deleteCate"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "k-menu",
  data() {
    return {
      dialogVisible: false, //控制对话框是否显示
      cateList: [],
      delId:''
    };
  },
  mounted() {
      this.getCateList()
  },
  methods: {
    getCateList(){
        this.$axios.get('/api/catelist',{params:{istree:1}})
        .then((result) => {
            console.log(result)
            this.cateList = result.data.list
        }).catch((err) => {
            console.log(err)
        });
    },
    // 编辑菜案
    edit(id) {
      console.log(id);
      this.$router.push("/cate/" + id)
    },
    // 删除菜单
    deleteCate() {
      this.dialogVisible = false;

      this.$axios.post('/api/catedelete',{id: this.delId})
      .then((result) => {
        console.log(result)
        if(result.data.code === 200){
          this.menuList = result.data.list
        }
      }).catch((err) => {
        console.log(err)
      });
    }
  }
};
</script>
<style scoped>

.cate-img{
    height: 80px;
}
</style>
