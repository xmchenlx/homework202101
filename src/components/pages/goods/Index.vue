<template>
  <div class='k-menu'>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" style="margin-top:10px;margin-bottom:10px;"
      @click="$router.push('/goods/add')"
    >添加</el-button>

    <el-table
      stripe
      border
      :data="goodsList"
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
        prop="goodsname"
        label="名称"
        width="120"
      >
      </el-table-column>
       <el-table-column
        prop="price"
        label="价格"
        width="120"
      >
      </el-table-column>
       <el-table-column
        prop="market_price"
        label="市场价格"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="img"
        label="封面"
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
        label="是否新品"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.isnew == '1' ? 'primary' : 'danger'">
            {{ scope.row.isnew == '1' ? '新品' : '否' }}
          </el-tag>
        </template>
      </el-table-column>

        <el-table-column
        prop="status"
        label="是否热卖"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.ishot == '1' ? 'primary' : 'danger'">
            {{ scope.row.ishot == '1' ? '热卖' : '否' }}
          </el-tag>
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
      goodsList: [],
      delId:''
    };
  },
  mounted() {
      this.getGoodsList()
  },
  methods: {
    getGoodsList(){
        this.$axios.get('/api/goodslist')
        .then((result) => {
            console.log(result)
            this.goodsList = result.data.list
        }).catch((err) => {
            console.log(err)
        });
    },
    // 编辑菜案
    edit(id) {
      console.log(id);
      this.$router.push("/goods/" + id)
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
