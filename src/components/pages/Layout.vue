<template>
  <div class='layout'>
    <el-container>
      <el-aside width="200px">
        <nav-menu></nav-menu>

      </el-aside>
      <el-main>
        <el-header>
          <div class="user-info">
            <img
              class="avatar"
              src="../../assets/a1.png"
              alt=""
            >
            <!-- <span class="username"></span> -->
            <el-dropdown>
              <span class="el-dropdown-link">
                {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="logout">登出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </el-header>

        <div class="content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "../views/NavMenu";
import { mapState,mapMutations } from "vuex";
export default {
  name: "layout",
  data() {
    return {};
  },
  components: { NavMenu },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {},
  mounted() {},
  methods: {
    logout(){
      this.userLogout()
      this.$router.push('/login')
    },
    ...mapMutations(["userLogout"])
  }
};
</script>
<style scoped>
.layout {
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-main {
  padding: 0;
}
.el-header {
  box-shadow: 0 0 5px #ccc;
}

.content {
  padding: 20px;
}
.user-info {
  float: right;
  margin-right: 20px;
  margin-top: 10px;
}
.avatar {
  width: 30px;
  height: 30px;
}

.el-dropdown {
}
</style>
