<template>
    <div class="card">
        <div class="img">
            <img :src="link" alt="sd" class="dishimg">
        </div>
        <div class="info">
            <span class="nameinfo">{{ dish.name }}</span>
            <div class="main">
                <p class="descr">{{ dish.descr }}</p>
                <strong class="price">
                    {{ dish.price }}<br/>
                    <img src="../../static/banknote.png" alt="" class="bk">
                </strong>
            </div>  
        </div>
    </div>   
</template>

<script>
export default {
  name: 'card',
  props: {
      displayDish: Object,
  },
  data () {
    return {
        dish: this.displayDish,
    }
  },
  computed: {
      link() {
          return 'http://static.cheeseburgerim.space' + this.dish.imgPath;
      }
  },
  watch: {
      displayDish(n){
          this.dish = n;
      },
  },
}
</script>
<style scoped>
.card {
  transition-duration: 0.4s;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 220px;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card:nth-child(2n) {
  padding-right: 40px;
}
.card:nth-child(2n - 1) {
  padding-left: 130px;
}
.card:hover {
  transform: translateX(-10px);
}
.card .img {
  display: flex;
  align-items: center;
  position: absolute;
  width: 140px;
  height: 105%;
  z-index: 999;
}
.card:nth-child(2n) .img {
  right: 0;
}
.card:nth-child(2n + 1) .img {
  left: 0;
}
.card:nth-child(4) .img {
  height: 80%;
}
.card .img img {
  height: 100%;
  object-fit: cover;
}
.card .info {
  position: relative;
  border: 1px solid #e3e8f7;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  border-radius: 8px;
  height: 90%;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card .info .main {
  display: flex;
  align-items: center;
  width: 90%;
  height: 90%;
}
.card .info .main .price {
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  color: #596275;
  padding: 10px;
  font-size: 40px;
}
.card:nth-child(2n + 1) .info .main {
  flex-direction: row;
}
.card:nth-child(2n) .info .main{
  flex-direction: row-reverse;
}
.card .info .main .descr {
  font-family: SimSun;
  width: 75%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-align: justify;
  -webkit-line-clamp: 10;
  text-overflow: ellipsis;
  overflow: hidden;
}
.card:nth-child(2n + 1) .info .main .descr {
  padding-right: 20px;
  border-right: 6px dashed rgba(255, 195, 18, 0.6);
}
.card:nth-child(2n) .info .main .descr {
  padding-left: 20px;
  border-left: 6px dashed rgba(253, 167, 223, 0.4);
}
.card .info .nameinfo {
  z-index: 0;
  position: absolute;
  width: 500px;
  font-size: 220px;
  font-family: PMingLiU;
  font-weight: 800;
  color: #dcdde1;
  letter-spacing: 30px;
  opacity: 0.2;
}
.card:nth-child(2n + 1) .info {
  padding-left: 100px;
}
.card:nth-child(2n) .info {
  padding-right: 100px;
}
.card:nth-child(2n + 1) .info .nameinfo {
  transform: rotate(-10deg);
}
.card:nth-child(2n) .info .nameinfo {
  right: 150px;
  transform: rotate(10deg) translateY(-20px);
}
.bk {
    width: 50px;
    height: 50px;
}
</style>