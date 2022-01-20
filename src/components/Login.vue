<template>
  <div class="bg">
    <h2 id="title">{{ msg }}</h2>
    <img src="../../static/bg.64c1ed4.jpg" alt="" class="bgi">
    
    <el-form :model="userInfo" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      
      <el-form-item label="账号" prop="username" class="item">
        <el-input v-model="userInfo.username" placeholder="请输入用户姓名" class="el-input1"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" class="item">
        <el-input v-model="userInfo.password" placeholder="请输入账号密码" type="password" class="el-input1"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button  type="primary" @click="Login" id="login">登录</el-button>
        <el-button @click="reset()" id="reset">重置</el-button>
      </el-form-item>
      
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: '老八餐厅订单系统',
      token: '',
      userInfo: {
        username: '',
        password: ''
        
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    reset:function () {
      this.userInfo.username='';
      this.userInfo.password='';
    },
    logsuccess:function(){
            const h = this.$createElement;
            this.$notify({
                title: '登陆成功',
                message: h('i',{style: 'color: teal'},'Welcome' + ' ' + this.userInfo.username) 
            })
        },
    logdefeat:function(){
            const h = this.$createElement;
            this.$notify({
                title: '登陆失败',
                message: h('i',{style: 'color: teal'},'账号或密码错误') 
            })
        },
    Login:function () {
        this.apis.login(this.userInfo.username,this.userInfo.password).then((res) => {
         const data = res.data;
         if(data.status === 200){
          
          sessionStorage.setItem("token",data.result);
          console.log(data);
          sessionStorage.setItem("username",this.userInfo.username);
          this.$router.push({name:"Dishes"});
          this.logsuccess();
        }
        else if(data.status === 403){
          this.logdefeat();
        }
      })
      
      
    }

  }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.bg {
  position: relative;
  display: block;
  width: 400px;
  height: 360px;
  box-shadow: 0 0 10px gray;
  border-radius: 10px;
  margin: auto;
  margin-top: 140px;
  text-align: center;
  
}
#title {
  padding-top: 40px;
  font-weight: bolder;
}
#login {
  width: 60px;
  height: 40px;
  border-radius: 4px;
  border-style: none;
  cursor: pointer;
  background-color: #409eff;
  color: #fff;
  /* margin-top: 20px; */
  float: left;
  margin-left: 20px;
  /* margin-top: 10px; */
}
#login:hover {
  background-color: #65b0fc;
}
#reset {
  width: 60px;
  height: 40px;
  border-radius: 4px;
  border-style: none;
  cursor: pointer;
  background-color: #fff;
  color: #000;
  /* margin-top: 20px; */
  float: left;
  margin-left: 15px;
  /* margin-top: 10px; */

}
#reset:hover {
  background-color: rgb(236, 245, 252);
  color: #409eff;
}
/* 账号密码输入框 */
.el-input1 >>> .el-input__inner {
  width: 65%;
  margin-left: -70px;
  
}
/* 整个表单 */
.ruleForm {
  margin-top: 20px;
}
/* 非空提示字 */
.item >>> .el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 20px;
}
.el-button {
  padding: 0;
}
/* 标签名 */
.item >>> .el-form-item__label {
  padding: 0;
  
}
/* 背景图片 */
.bgi {
  
    transform: skew(15deg,-10deg);
    z-index: 0;
    opacity: .3;
    -webkit-filter: blur(0.4px) brightness(110%);
    filter: blur(0.4px) brightness(110%);
    position: absolute;
    height: 100%;
    bottom: 0;
    left: 20px;
    -o-object-fit: cover;
    object-fit: cover;
}

</style>
