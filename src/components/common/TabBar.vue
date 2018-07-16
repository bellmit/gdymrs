<template>
    <div id="footer-content">
        <div class="footer-tab">
           <div class="footer-item" @click="goto(1)">
               <div>
                 <img src="../../assets/home.jpg" alt="" width="30" height="30" v-if="isHome">
                 <img src="../../assets/home_blue.png" alt="" width="30" height="30" v-if="!isHome">
               </div >
               <span class="footer-text" :class="{active: isHome}">首页</span>
           </div>
            <div class="footer-item" @click="goto(2)">
               <div>
                 <img src="../../assets/nan.jpg" alt="" width="30" height="30" v-if="serviceInfo">
                  <img src="../../assets/nan_blue.png" alt="" width="30" height="30" v-if="!serviceInfo">
               </div>
               <span class="footer-text" :class="{active:!serviceInfo}">展业工具</span>
           </div>
            <div class="footer-item" @click="goto(3)">
               <div>
                 <img src="../../assets/shouche.jpg" alt="" width="30" height="30" v-if="productManualInfo">
                  <img src="../../assets/shouche_blue.png" alt="" width="30" height="30" v-if="!productManualInfo">
               </div>
               <span class="footer-text" :class="{active:!productManualInfo}">产品手册</span>
           </div>
            <div class="footer-item" @click="goto(4)">
               <div>
                 <img src="../../assets/u.png" alt="" width="30" height="30" v-if="me">
                  <img src="../../assets/u_blue.png" alt="" width="30" height="30" v-if="!me">
               </div>
               <span class="footer-text" :class="{active:!me}">我</span>
           </div>
    </div>
     </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    name: 'tabBar',
   props:{
			isHome:{
				type:Boolean,
				default:true
      },
      serviceInfo:{
        type:Boolean,
				default:true
      },
      productManualInfo:{
        type:Boolean,
				default:true
      },
      me:{
        type:Boolean,
				default:true
      }
		},
    data(){
      return{
      }
    },
    created(){
       
    },
    methods:{
      show(msg){
        Toast({
            message: msg,
            duration: 1000
          });
      },
      goto(index){
        if(index ==1){
            this.$router.push({
            name: 'home',
            params: {}
          })
        }else if(index == 2){
          this.$router.push({
            name: 'serviceInfo',
            params: {}
          })
        }else if(index == 3){
          this.$router.push({
            name: 'productManualInfo',
            params: {}
          })
        }else if(index == 4){
          this.$router.push({
            name: 'personalInfo',
            params: {}
          })
          console.log('接下来就开发这里咯')
        }
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
  #footer-content{
    height: 53px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFFFFF;
   }
   .fa-angle-double-right{
     font-size: 18px;
   }
.footer-tab{
 display:flex;
 height: 48px;
 justify-content: space-around;
 text-align: center;
 padding-bottom:5px; 
}
.footer-texts{
   color: #0D3074;
  font-size:12px;
  padding-bottom: 30px;
}
.footer-text{
  color: #0D3074;
  font-size:14px;
}
.active{
  color: #FFB600;
}
</style>
