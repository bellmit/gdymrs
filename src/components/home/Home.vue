<template>
  <div id="home">
    <div class="home-content">
      <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
      </mt-actionsheet> 
        <div style="position:relative;min-height:200px">
            <div v-if="bgImg == '' || bgImg == null" style="width:100%;height:260px;background:#fff;"></div>
          	<img  style="width:100%;min-height:200px" :src="bgImg" alt="" id="home-banner">
          	<img :src="pic" alt="" class="position" style="z-index:99">

          	<img v-if="avatar != null && avatar != ''" :src="avatar" alt="" style="width:85px;height:76px;border-radius:50%;position:absolute;top:92px;left:213px;z-index:999;outline:none"  @click="sheetVisible = !sheetVisible"  ref="avatar" id="aaa">
            <img v-show="bgImg != ''" v-if="avatar == null || avatar == ''"  src="../../../static/img/home/bg.jpg" alt="" style="width:90px;height:80px;border-radius:50%;position:absolute;top:92px;left:212px;z-index:999;outline:none"  @click="sheetVisible = !sheetVisible"  ref="avatar" id="aaa">
          <!-- <input type="file"  value="从相册选择"
          class="change position"
          multiple="multiple" 
           @change="getUrl($event)"
          />  -->
        </div>
      <div class="line"></div>
      <div class="nav-lists">
       <ul class="nav-list">
          <!-- <li @click = "go('/proposal/list')" v-show="loginLimit.mopersonal =='1'">
            <p><img src="../../../static/img/home/tab3.jpg" height="47" width="47"></p>
            <p>建议书</p>
          </li> -->
           <li @click = "goToProductList()" v-show="loginLimit.notShow">
            <p>
              <img src="../../../static/img/home/tab1.jpg" height="47" width="47" style="width:45px;height:45px;"></p>
            <p>在线投保</p>
          </li>
          <li @click="message" v-show="loginLimit.mopersonal !=='1'">
            <p><img src="../../../static/img/home/tab1.jpg" height="47" width="47"></p>
            <p>个人信息</p>
          </li>
          <li @click="message" v-show="!loginLimit.notShow">
            <p><img src="../../../static/img/home/tab2.jpg" height="47" width="47"></p>
            <p>客户管理</p>
          </li>
          <li @click = "go('/backlog')" v-show="loginLimit.mobacklog=='1'">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"style="width:45px;height:45px;"></p>
            <p>待办事项</p>
          </li>
          <li @click = "message" v-show="!loginLimit.notShow">
            <p><img src="../../../static/img/home/tab5.jpg" height="47" width="47"></p>
            <p>销售信息</p>
          </li>
          <li @click = "message" v-show="!loginLimit.notShow">
            <p><img src="../../../static/img/home/tab6.jpg" height="47" width="47"></p>
            <p>薪酬查询</p>
          </li>
          <li @click = "message" v-show="loginLimit.mosearch !=='1'">
            <p><img src="../../../static/img/home/tab7.jpg" height="47" width="47"></p>
            <p>渠道查询</p>
          </li>
          <li @click = "message">
            <p><img src="../../../static/img/home/tab2.jpg" height="47" width="47"style="width:45px;height:45px;"></p>
            <p>综合查询</p>
          </li>
          <li @click = "message">
            <p><img src="../../../static/img/home/tab8.jpg" height="47" width="47" style="width:45px;height:45px;"></p>
            <p>更多</p>
          </li>
        </ul>
      </div>
      <div class="split">
      </div>
      <div class="banner-bottom-title">
          <div>
             <span class="bottom-border">|</span>
             <span class="activity">精彩活动</span>
          </div>
          <div class="title-right">
            <span>更多&nbsp;<i class="fa fa-angle-double-right"></i></span>
          </div>
      </div>
     <div class="banner-content">
        <swiper ref="banner"></swiper> 
        <div style="width:38%;height:100%;">
              <div style="height:50%;">
                <img style="width:100%;height:100%" src="../../../static/img/home/950X600xp.jpg" alt="" class="img">
              </div>
              <div style="height:50%;">
                 <img style="width:100%;height:100%" src="../../../static/img/home/950X600xp.jpg" alt="" class="img">
              </div>
        </div>
      </div>
        <div class="split"></div>  
          <div class="banner-bottom-title">
          <div>
             <span class="bottom-border">|</span>
             <span class="activity">热销产品</span>
          </div>
          <div class="title-right" @click="go({name:'product_list_page'})">
            <span>更多&nbsp;<i class="fa fa-angle-double-right"></i></span>
          </div>
      </div>
      <div>
        <ul>
          <li v-for="(item,index) in productList">
            <img :src="item.remoteUrl" alt="" @click="goProduct(item)" style="width:100%;height:150px">
          </li>
        </ul>
      </div>
      <div class="split"></div>
    </div>
     <tabBar></tabBar>
  </div>
</template>
<script>
  import swiper from '../common/Swiper.vue'
  import Footertabs from '../common/Footer.vue'
  import { MessageBox } from 'mint-ui'
  import { Actionsheet } from 'mint-ui'
  import tabBar from '../common/TabBar.vue'
  import camera from '../../../static/js/cordova_camera.js'
  export default {
    name: 'home',
    components:{swiper,Footertabs,tabBar},
    data(){
      return{
        activeList:'',//接收轮播图
        productList:'',//接收热销产品
        agentList:'',//接收背景图和头像
        bgImg:'',
        avatar:'',
        pic:'',
        loginLimit:{
          mounited:"",
          mopersonal:"",
          mosearch:"",
          mobacklog:"",
          notShow:true
        },
        sheetVisible:false,
        actions:[
         
          {
            name:"从相册选择",
            method:this.getNewPhotos
          },
          {
            name:"拍照",
            method:this.capturePhoto
          }
        ]
      }
    },
    methods:{
      goToProductList(){
            //zhangxin,此数据在电子保单页面使用,用于存储是否查看单证信息,及单证数据
            utils.cache.removeItem("documentInfo");
            //liangxin,此数据用于电子投保单页面单证阅读勾选框,判断勾选状态
            utils.cache.removeItem("readStatus");
            this.$router.push("/policy/list");
      },
      getUrl(e){
              var imgs = this.$refs.avatar;
                  var reader=new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  let that = this
                  reader.onload=function(e){
                      var url=e.target.result;
                      imgs.src=url;
                      // utils.cache.set('avatar',url)
                      that.imageUpload(1,url)
              }
      },
      imageUpload:function(context_id,image){
      	let agentCode = utils.cache.get('personsal').agentCode
        if(image != ""){
          let requ = {
            "upload": {
              "agentCode":agentCode,
              "applyCode":'',
              "orderId":'12345',
              "policyCode":"",
            "deviceNo":"",
            "imageList":[{
              "imageType":'agent',
              "imageName":agentCode+".jpg",
              "imageByte":image
            }]
                  }
          }
          if(requ.upload.imageList[0].imageByte!=undefined && requ.upload.imageList[0].imageByte!=""){
            console.log(requ,'上传头像请求参数')
          utils.http.postFast('MOUPLOAD',requ,(body)=>{
            console.log(body,'头像返回')
            if(body.resultMessage == "上传影像成功！"){
	          	if(this.agentList.length == 2){
	          			let pic = document.getElementById('aaa')
                  pic = "data:image/jpeg;base64,"+image
	          	}else{
	          			let pic = document.getElementById('bbb')
                  pic = "data:image/jpeg;base64,"+image
	          	}  
            		
              }
            })
          }
        }
      },
      message(){
        utils.ui.modal.afterOpen()
        MessageBox({
          title: '提示',
          message: '此模块暂未开放！'
        }).then(()=>{
          utils.ui.modal.beforeClose()
        })
      },
      //获取本地相册
      getNewPhotos:function(){
         getNewPhoto(pictureSource.SAVEDPHOTOALBUM,(imageData)=>{
      		let index = 1;
         	if(index == 1){
         			let positive = document.getElementById('aaa');
            	positive.style.display = 'inline-block'
            	positive.src = "data:image/jpeg;base64," + imageData
            	this.imageUpload(1,imageData)
         		}
          },(message)=>{
            // alert(message)
          })
      },
      //调取相机拍照
      capturePhoto:function() {
        let index = 1;
        capturePhotoCallback((imageData)=>{
          if(index == 1){
            let positive = document.getElementById('aaa');
            positive.style.display = 'inline-block'
            positive.src = "data:image/jpeg;base64," + imageData
            // this.avatar = imageData
            this.imageUpload(1,imageData)
          }
        },(message)=>{
          // alert(message)
        })
      },
      // 取缓存里主页面所有图片
      getImg(){
        this.agentList = utils.cache.get('agentList')//代理人背景
        this.productList = utils.cache.get('productList')//热销产品
        this.activeList = utils.cache.get('activeList')//轮播图
        console.log(this.agentList,'touxiang')
        for(let i of this.agentList){
        	if(i.pageCode == 1){
        			this.pic = i.remoteUrl
        	}else if(i.pageCode == 2){
        		this.bgImg = i.remoteUrl
        	}else{
        		this.avatar = i.remoteUrl
        	}
        }
      },
      //热销产品跳转相应页面
      goProduct(item){
        let orgId = utils.cache.get('personsal').orgId
        console.log(item,'code')
        utils.cache.set('productCode',item.pageCode)
        utils.cache.set('productCodeDetail',item.pageCode)
          if (orgId.substring(0,4) == "8661") { //重庆机构
              this.$router.push({
                name: "questionnaire_page",
                params:{
                    planId:"new"
                  }
              })
          }else{
              this.$router.push({
                name: "product_details_page",
                params: {
                  planId: "new"
                }
              })
          }
      }
    },
    created(){
      this.getImg()
    },
    mounted(){
      this.$refs.banner.Carousel(this.activeList)//把接收到的轮播图传到swiper组件 
      //取缓冲中的模块权限返回
       this.loginLimit.mounited=utils.cache.get("loginMedol").mounited;
       this.loginLimit.mopersonal=utils.cache.get("loginMedol").mopersonal;
       this.loginLimit.mosearch=utils.cache.get("loginMedol").mosearch;
       this.loginLimit.mobacklog=utils.cache.get("loginMedol").mobacklog;
      console.log(this.loginLimit.mounited,this.loginLimit.mopersonal,this.loginLimit.mosearch, this.loginLimit.mobacklog);
      //zhangxin,此数据在电子保单页面使用,用于存储是否查看单证信息,及单证数据
      utils.cache.removeItem("documentInfo");
      //zhangxin,此数据在告知页面使用,用于存储成功保存数据后获取的orderId
      utils.cache.removeItem("policy_orderId");
      utils.cache.removeItem("documentInfo");
    //zhangxin,此数据在告知页面使用,用于存储成功保存数据后获取的orderId
    utils.cache.removeItem("policy_orderId");
        utils.cache.removeItem("documentInfo");
        //zhangxin,此数据在告知页面使用,用于存储成功保存数据后获取的orderId
        utils.cache.removeItem("policy_orderId");
        //liangxin,此数据用于电子投保单页面单证阅读勾选框,判断勾选状态
        utils.cache.removeItem("readStatus");
    }
  }
</script>

<style lang='scss' scoped>
  
   #home-banner{
    width: 100%;
    }
    .change{
        opacity: 0;
        position: absolute;
        overflow: hidden;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .position{
      top:50px;left:200px;position:absolute;width:110px;height:130px;
    }

  #home{
    overflow-x: hidden;
    position: relative;
    bottom: 53px;
    margin-top:50px;
  }
  .home-content{
  
  }
  .message{
    width: 100%;
    height: 85px;
    /*background: url(../../assets/img/home/message.jpg)no-repeat center top;*/
    /*background-size: 100%;*/
    position: relative;
    .message-img{
      width: 100%;height: 100%;
      img{
        display: inline-block;
        width: 100%;height: 100%;
      }
    }
    p{
      width: 200px;height: 35px;
      overflow: hidden;
      line-height: 17px;
      font-weight: bold;
      text-align: left;
      position: absolute;top: 32px;left: 65px;
    }
  };
  .line{width:100%;height:2px;background:url("../../../static/img/common/line.jpg")};
  .nav-lists{
    width: 100%;
    .nav-list{
      width: 100%;
      height: 100%;
      overflow: hidden;
      li{
        width: 25%;
        text-align: center;
        p{
          color: #3E3A39;
          font-size: 14px;
          line-height: 20px
        }
      }
      li:nth-child(1){margin: 10px 0;}
      li:nth-child(2){margin: 10px 0;}
      li:nth-child(3){margin: 10px 0;}
      li:nth-child(4){margin: 10px 0;}
    }
  };
  .nav-list{
    display:flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .nav-list>li>p>img{width: 40px;height: 40px;}
  .split{
    height: 10px;
    background-color: #EAEAEA;
    border-bottom:1px solid  #D0D0D1;
  }
  .banner-bottom-title{
    height: 50px;
    padding:0 10px 0 15px; 
    line-height: 50px;
    display: flex;
    font-size:16px;
    justify-content: space-between; 
    .bottom-border{
      color: #FEB83A;
    }
    .activity{
     color:#423E3D;
    }
    .title-right{
      font-size:15px; 
      padding-right: 10px;
      color: #969697;
    }
  }
  .banner-content{
     border-top:1px solid  #C6CDD1;
     border-bottom:1px solid  #C6CDD1;
     height: 260px;
     display: flex;
     justify-content: space-between;
    #swiper-home{
     width:60%;
     height: 100%;
     padding-right:5px;
      position: relative;
   } 
  }
  .img{
    width: 100%;
  }
</style>
