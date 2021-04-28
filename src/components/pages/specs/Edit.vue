<template>
    <div class='edit'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/menu' }">规格管理</el-breadcrumb-item>
            <el-breadcrumb-item>规格{{type}}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 添加/修改表单 -->
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            style="margin-top:20px;"
        >
            <el-form-item
                label="规格名称"
                style="width:400px;"
            >
                <el-input v-model="form.specsname"></el-input>
            </el-form-item>

            <el-form-item
                label="规格属性"
                style="width:400px;"
            >
                <el-input 
                v-for="(attr,i) in attrs" :key="i"
                v-model="attr.value"></el-input>

            </el-form-item>

            <el-button @click="attrs.push({value:''})"> 添加规格 </el-button>

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
import { mapState } from "vuex";
export default {
  name: "edit",
  data() {
    return {
      type: "添加",
      form: {
        specsname: "",
        status: "" //状态
      },
      attrs: [{value:""}]
    };
  },
  computed: {
    ...mapState(["menuList"])
  },
  mounted() {
    let id = this.$route.params.id;
    if (id) {
      this.type = "编辑";
    }

  },
  methods: {

    onSubmit() {
      //获得form表单，然后进行验证
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 深拷贝
          let str = JSON.stringify(this.form);
          let data = JSON.parse(str);

          data.attrs = this.attrs.map(item => item.value).toString()

          // 如果type是编辑，则把接口地址改为编辑的接口
          let url = "/api/specsadd";
     
          this.$axios
            .post(url, data)
            .then(result => {
              console.log(result);
              if (result.data.code === 200) {
                this.$router.push("/specs");
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
