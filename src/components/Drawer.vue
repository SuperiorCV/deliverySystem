<template>
    <div class="drawer">
        <el-form :model="dishInfo" :rules="rules" ref="ruleForm"  class="ruleForm">
                <h1 class="title1">----菜品图片----</h1>
                <el-upload class="upload-demo"
                drag 
                action="a" 
                multiple
                :before-upload="beforeUpload"
                :limit="1"
                :http-request="hr"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>

                <h1 class="title1">----菜品信息----</h1>
                <el-form-item prop="name" class="item">
                    <el-input type="text" placeholder="请输入内容" v-model="dishInfo.name" maxlength="10" show-word-limit class="form">
                        <template slot="prepend">菜品名称</template>
                    </el-input>
                </el-form-item>

                <h3 class="title2">请输入菜品简介</h3>
                <el-form-item prop="descr" class="item" >
                    <el-input type="textarea" placeholder="请输入内容" v-model="dishInfo.descr" maxlength="150" show-word-limit class="form"></el-input>
                </el-form-item>

                <h3 class="title2">请选择菜品定价</h3>
                <el-slider v-model="dishInfo.price" show-input class="form"></el-slider>
                
                <el-button type="primary" @click="submit" class="submit">添加菜品</el-button>
            </el-form>
    </div>
</template>

<script>
export default {
  name: 'drawer',
  data () {
    return {
        dishInfo: {
        name:'',
        descr:'',
        price: 0,
        image: '',
      },
      addbool1: true,
      addbool2: true,
        rules: {
          name: [
              { required: true, message: '请输入菜品名称', trigger: 'blur'}
          ],
          descr: [
              { required: true, message: '请输入菜品描述', trigger: 'blur'}
          ]
      },
    }
  },

  methods: {
      hr(param) {
            this.dishInfo.image = param.file;
        },
        beforeUpload(file){
            let types = ['image/jpeg', 'image/jpg', 'image/png'];
            const isImage = types.includes(file.type);
            if (!isImage) {
                this.$message.error('上传图片只能是 JPG、JPEG、PNG 格式!');
                this.addbool1 = false;
            }else{
                this.addbool1 = true;
            }
 
            const isLtSize = file.size/1024/1024 < 1;
            if(!isLtSize){
                this.$message.erroe('上传图片大小不能超过1MB!');
                this.addbool2 = false;
            }else{
                this.addbool2 = true;
            }
        },
        addsuccess:function(){
            const h = this.$createElement;
            this.$notify({
                title: '添加成功',
                message: h('i',{style: 'color: teal'},'已成功添加:' + ' ' + this.dishInfo.name) 
            })
        },
        addfail:function(){
            const h = this.$createElement;
            this.$notify({
                title: '添加失败',
                message: h('i',{style: 'color: teal'},'菜品信息有误') 
            })
        },
        submit(){
            if(this.addbool1 && this.addbool2){
            console.log(this.dishInfo);
            this.apis.addDish(this.dishInfo.name,this.dishInfo.descr,this.dishInfo.price,this.dishInfo.image).then((res) => {
                
                const data = res.data;
                console.log(data);
                if(data.status === 200){
                    // data.result.imgPath = this.host + data.result.imgPath;
                    // this.dishes.push(data.result);
                    const resObj = data.result;
                    this.$emit('uploadMenu',resObj);
                    this.addsuccess();
                }
            })
            }else{
                this.addfail();
            }
            
        }
  }
}
</script>
<style scoped>
.title1{
    margin-left: 100px;
}
.title2 {
    margin-left: 130px;
}
.title1,.title2 {
    margin-top: 8px;
    margin-bottom: 8px;
}
.form {
    width: 300px;
    margin-left: 45px;
}
.upload-demo {
    margin-left: 15px;
}
.submit {
    margin-left: 40px;
    margin-top: 10px;
}

.item >>> .el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 45px;
}
</style>