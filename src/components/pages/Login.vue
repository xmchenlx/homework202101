<template>
  <div class='login'>
      
      <div class="login-content">
        <el-form  :rules="rules"  :model="form" ref="form">
            <h1> 登录 </h1>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">登录</el-button>
            </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'login',
  data(){
    return {
      form:{
        username:'',
        password:''
      },
      rules:{
        username:[
          {required: true,message:"请输入用户名",trigger:"blur"},
          {min:3,max:10,message:"长度在3到10个字符",trigger:"blur"},
        ],
        password:[
          {required: true,message:"请输入密码",trigger:"blur"},
          {min:3,max:10,message:"长度在3到10个字符",trigger:"blur"},
        ]
      }
    }
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
    submitForm(){
      this.$refs['form'].validate( valid =>{
        if(valid){
          this.userLogin(this.form)
          .then((result) => {
            if(result.data.code === 200){

              console.log(this.$route)
              let target = this.$route.query.redirect;
              console.log(target)
              if(!target){
                target = "/home"
              }
              this.$router.push(target)
            }
          }).catch((err) => {
            console.log(err)
          });
        }
      })
    },
    ...mapActions(["userLogin"])
  }
}
</script>
<style scoped>
.login-content{
  width: 500px;
  margin:100px auto;
  padding: 20px;
  box-shadow: 0 0 5px #ccc;
}
</style>
