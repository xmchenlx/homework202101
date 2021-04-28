<template>
    <div class='edit'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/menu' }">分类管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类{{type}}</el-breadcrumb-item>
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
                <el-input v-model="form.catename"></el-input>
            </el-form-item>
            <el-form-item
                label="上级分类"
                prop="roleid"
                    v-if="cateList.length !==0"

            >
                <el-select
                    v-model="form.pid"
                    placeholder="请选择分类"
                >

                    <el-option
                        v-for="c in cateList"
                        :key="c.id"
                        :label="c.catename"
                        :value="c.id"
                        
                    ></el-option>

                </el-select>
            </el-form-item>

            <el-form-item
                label="图片"
                style="width:400px;"
            >
                <el-upload
                    action="#"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                    :on-change="handleChange"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img
                        width="100%"
                        :src="dialogImageUrl"
                        alt=""
                    >
                </el-dialog>
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
export default {
  name: "edit",
  data() {
    return {
      type: "添加",
      form: {
        pid: "", //上级分类的id
        catename: "", //分类名称
        status: "" //状态
      },
      img: "", //分类图标
      cateList: [],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.getCateList();

    if (id) {
      this.type = "编辑";
      this.getCateInfo(id)
    }

  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    getCateInfo(id) {
      this.$axios
        .get("/api/cateinfo", { params: { 'id':id } })
        .then(result => {
          this.form = result.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getCateList() {
      this.$axios
        .get("/api/catelist")
        .then(result => {
          this.cateList = result.data.list;
          console.log(this.cateList);
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
          let url = "/api/cateadd";
          if (this.type === "编辑") {
            data.id = this.$route.params.id;
            url = "/api/cateedit";
          }

            // 把要上传的数据转成formDate
            let formData = new FormData()
            for(let key in data){
                formData.append(key,data[key])
            }
            formData.append('img',this.img)


          this.$axios
            .post(url, formData)
            .then(result => {
              console.log(result);
              if (result.data.code === 200) {
                this.$router.push("/cate");
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file){
        console.log(file)
        this.img = file.raw;
    }
  }
};
</script>
<style scoped>
</style>
