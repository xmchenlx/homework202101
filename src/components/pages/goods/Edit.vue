<template>
    <div class='edit'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品{{type}}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 添加/修改表单 -->
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            style="margin-top:20px;"
        >
            <el-form-item
                label="商品名称"
                style="width:400px;"
            >
            <el-input v-model="form.id" style="display:none"/>
                <el-input v-model="form.goodsname"></el-input>
            </el-form-item>

            <el-form-item
                label="一级分类"
            >
                <el-select
                    v-model="form.first_cateid"
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
                label="二级分类"
            >
                <el-select
                    v-model="form.second_cateid"
                    placeholder="请选择分类"
                >

                    <el-option
                        v-for="c in sec_cateList"
                        :key="c.id"
                        :label="c.catename"
                        :value="c.id"
                    ></el-option>

                </el-select>
            </el-form-item>

            <el-form-item
                label="价格"
                style="width:400px;"
            >
                <el-input type="number"  v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item
                label="市场价格"
                style="width:400px;"
            >
                <el-input type="number" v-model="form.market_price"></el-input>
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
                    :file-list="imgList"
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

            <el-form-item
                label="商品规格"
                prop="roleid"
            >
                <el-select
                    v-model="form.specsid"
                    @change="specsChange(form.specsid)"
                    placeholder="请选择规格"
                >

                    <el-option
                        v-for="s in specsList"
                        :key="s.id"
                        :label="s.specsname"
                        :value="s.id"
                    ></el-option>

                </el-select>
            </el-form-item>

            <el-form-item
                label="规格是属性"
                prop="roleid"
            >
                <el-select
                    v-model="form.specsattr"
                    placeholder="请选择规格属性"  multiple
                >

                    <el-option
                        v-for="attr in attrsList"
                        :key="attr"
                        :label="attr"
                        :value="attr"
                    ></el-option>

                </el-select>
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

            <el-form-item label="商品描述">
                <div id="editor"></div>
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
import E from 'wangeditor'
export default {
  name: "edit",
  data() {
    return {
      type: "添加",
      form: {
          id:'',
          first_cateid: '',//一级分类id
          second_cateid:"",//二级分类id
          goodsname:"",//商品名称
          price:"",
          market_price:"",
          description:"", //商品描述
          specsid:'',
          specsattr:"",
          isnew:1,
          ishot:1,
          status:'',
          img:''
      },
      img: "", //分类图标
      cateList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      specsList:[],
      attrsList:[],
      imgList:[],
      editor:null
    };
  },
  computed:{
      sec_cateList(){
          if(this.cateList.length > 0){
              let arr = this.cateList.filter( item => item.id == this.form.first_cateid)
              if(arr[0]){
                return arr[0].children
              }else{
                  return []
              }
              
          }else{
              return []
          }
          
      }
  },
  mounted() {
    let id = this.$route.params.id;
    if (id) {
      this.type = "编辑";
      this.getGoodsInfo(id)
    }

    this.getCateList();
    // 获取商品规格
    this.getSpecsList()

    // 初始化 富文本编辑器
    this.editor = new E("#editor")
    this.editor.create()
  },
  methods: {
      getGoodsInfo(id){
          this.$axios.get('/api/goodsinfo',{params:{'id':id}}).then(res=>{
           this.form = res.data.list;
           console.log(res)
           this.form.id = id
           this.dialogImageUrl = res.data.list.img
            this.imgList.push({name:'pic',url:res.data.list.img})
            this.form.specsattr = this.form.specsattr.split(',')
        })
        .catch(err => {
          console.log(err);
        });
      },
      back(){
          this.$router.go(-1)
      },
    getCateList() {
      this.$axios
        .get("/api/catelist",{params:{istree:1}})
        .then(result => {
          this.cateList = result.data.list;
        //   console.log(this.cateList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSpecsList(){
        this.$axios.get('/api/specslist')
        .then((result) => {
            console.log('商品规格：',result.data.list)
            this.specsList = result.data.list
        }).catch((err) => {
            console.log(err)
        });
    },
    specsChange(id){
        this.$axios.get("/api/specsinfo",{params:{id}})
        .then((result) => {
            this.attrsList = result.data.list[0].attrs
        }).catch((err) => {
            console.log(err)
        });
    },
    onSubmit() {
      //获得form表单，然后进行验证
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 深拷贝
          let str = JSON.stringify(this.form);
          let data = JSON.parse(str);

        //   获取商品描述
        data.description = this.editor.txt.html()

          // 如果type是编辑，则把接口地址改为编辑的接口
          let url = "/api/goodsadd";
          if(this.type==='编辑')url='/api/goodsedit'

          // 把要上传的数据转成formDate
          let formData = new FormData();
          for (let key in data) {
            formData.append(key, data[key]);
          }
          formData.append("img", this.img);

          this.$axios
            .post(url, formData)
            .then(result => {
              console.log(result);
              if (result.data.code === 200) {
                this.$router.push("/goods");
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
        console.log(this.dialogImageUrl)

},
    handleChange(file) {
        console.log(file,this.imgList)
      this.img = file.raw;
    }
  }
};
</script>
<style scoped>

#editor{
    width: 100%;
    height: 500px;
}
</style>
