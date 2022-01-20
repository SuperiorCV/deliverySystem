<template>
    
    <div class="background">
        
        <div class="search">
            <div id="input">
                <el-input placeholder="请输入关键字进行搜索" v-model="msg" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>

         <div class="dishes">
             <card
             v-for="(displayDish,index) in displayDishes"
             :key='index'
             :displayDish="displayDish"
             >
             </card>
         </div>
         <el-drawer title="添加菜品" :visible.sync="drawer" :direction="direction" :size="size">
             <drawer @uploadMenu='addMenu'></drawer>
        </el-drawer>
        <div class="add" @click="drawer = true"></div>
    </div>

    
    
</template>
<script>

import card from '../components/Card.vue';
import drawer from '../components/Drawer.vue';
export default {
    name: 'dishes',
    components: {
        card,
        drawer,
    },
    data () {
    return {
      direction:'rtl',
      drawer:false,
    //   搜索关键字
      msg: '',
      dishes: [],
      size:'400px',     
    }
  },
  created(){
      this.apis.getDishes().then(
      (res) => {
        this.dishes = res.data.result;
      }
    );

  },
  computed: {
      displayDishes(){
      var arr = [];
      var dishes = this.dishes;
      for(let i = 0;i<dishes.length;i++){
        if(dishes[i].name.includes(this.msg)){
          arr.push(dishes[i]);
        }
      }
      return arr;
    },
  },
    methods:{
        addMenu(obj) {
            this.dishes.push(obj);
            this.drawer = false;
        }
        
    }

}
</script>
<style scoped>
.background {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}
/* 搜索框 */
.search {
    width: 480px;
    height: 50px;
    margin-top: 40px;
    margin-bottom: 20px;
}
/* 输入框 */
#input {
    width: 460px;
    height: 80%;
    background-color: #fff;
    margin: 5px 10px;
}
/* 菜品框 */
.dishes {
    width: 53%;
    height: 100%;

}
/* 添加菜品按钮 */
.add {
    position: absolute;
    position: fixed;
    bottom: 40px;
    right: 80px;
    width: 60px;
    height: 60px;
    background-image: url('../../static/add.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 70%;
    border-radius: 60px;
    border-style: solid;
    border-color: green; 
}
.add:hover {
    box-shadow: 0 0 10px rgb(76, 83, 76);
    transform: translate(0,-2px);
    /* cursor: pointer; */
}
</style>