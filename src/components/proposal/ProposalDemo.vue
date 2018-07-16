<template>
  <div id="show-manag-contents">
    <mt-header title="光大永明人寿保险规划书" fixed>
      <!-- <mt-button @click="go('../config/'+$route.params.planId)" slot="left" v-if="localStorage != null">
        <i class="fa fa-angle-left"></i>
      </mt-button>
      <mt-button @click="go('../share')" slot="right" v-if="localStorage != null">
        <i class="fa fa-share-square-o back"></i>
      </mt-button> -->
      <mt-button @click="go({name:'product_details_page',params:{planId:$route.params.planId}})" slot="left">
        <i class="fa fa-angle-left"></i>
      </mt-button>
      <mt-button @click="go('../share/'+$route.params.planId)" slot="right">
        <i class="fa fa-share-square-o back"></i>
      </mt-button>
    </mt-header>
    <div class="twoContent" style="position: fixed;width: 100%;z-index: 2;top: 48px;">
      <div class="tabs">
        <div class="tab"> 
          <div class="item-list"
          v-for="(item,index) in tabs" 
          v-bind:class="{'active':index == num}" 
          @click="changeIndex(index)">{{item}}</div>
        </div>
      </div>
      <div class="two-title">
        <div>寿险顾问:{{proposalPlan.pdfMsgDTO.sxgw}}</div>
        <div>联系电话:{{proposalPlan.pdfMsgDTO.phone}}</div>
      </div>
    </div>
    <div class="content show-content" style="">
      <!-- 险种解读 -->
      <Insurce v-if="dataReady" v-show="insurceStatus" :proposalPlan="proposalPlan"></Insurce>
      <Read v-show="readStatus"></Read>
      <div class="policy-two-footer" v-if="num == 0">
        <ul>
          <li @click="tiaoKuan"><span>保险条款</span></li>
          <li @click="shuomingshu"><span>产品说明书</span></li>
        </ul>
      </div>
    </div>
    <!-- 保险条款 -->
      <mt-popup v-model="toggle.jobVisible" position="bottom" style="width: 100%;height: 100%;overflow-y:auto;background: #FFF1D4;">
          <mt-header title="保险条款" fixed>
            <mt-button slot="left">
              <i @click="toggle.jobVisible = !toggle.jobVisible" class="fa fa-angle-left"></i>
            </mt-button>
          </mt-header>
          <div class="tk-titleTop">本产品由</div>
          <div class="tk-title">
            <p v-for="(item,index) in make.product" @click="tkStatus(item)">{{item.productName}}</p>
          </div>
          <div class="tk-titleBottom">组合而成</div>
      </mt-popup>
      <mt-popup v-model="toggle.tkStatu" position="right" style="width: 100%;height: 100%;overflow-y:auto;background: #FFF1D4;">
        <div v-for="(item,index) in make.productContent_1">
          <img @click="toggle.tkStatu = !toggle.tkStatu" :src="item.fileurl" style="display: block;width: 100%;">
        </div>
      </mt-popup>
    <!-- 产品说明书 -->
      <mt-popup v-model="toggle.smsStatus" position="bottom" style="width: 100%;height: 100%;overflow-y:auto;background: #FFF1D4;">
        <mt-header title="产品说明书" fixed>
          <mt-button slot="left">
            <i @click="toggle.smsStatus = !toggle.smsStatus" class="fa fa-angle-left"></i>
          </mt-button>
        </mt-header>
        <div class="tk-titleTop">本产品由</div>
        <div class="tk-title">
          <p v-for="(item,index) in make.product" @click="shuomingshuCallback(item)">{{item.productName}}</p>
        </div>
        <div class="tk-titleBottom">组合而成</div>
      </mt-popup>
      <mt-popup v-model="toggle.otherStatus" position="right" style="width: 100%;height: 100%;overflow-y:auto;background: #FFF1D4;">
          <div v-for="(item,index) in make.productContent_2">
            <img @click="toggle.otherStatus = !toggle.otherStatus" :src="item.fileurl" style="display: block;width: 100%;">
          </div>
      </mt-popup>
      <alert ref="showalert"></alert> 
  </div>
</template>
<script>
import Headerbtns from '../common/Header.vue'
import Insurce from './pop/Insurce.vue'
import Read from './pop/Read.vue'
import { MessageBox } from 'mint-ui'
import alert from '../policy/common/alert.vue'
import proposalPlans from '../../assets/data/proposalPlan.json'
export default {
  name: 'proposalDemo',
  components:{
    Headerbtns,
    Insurce,
    Read,
    alert
  },
  data() {
    return {
      planId:'',
      dataReady:false,
      tabs:["险种解读","公司介绍"],
      num:0,
      itemList:proposalPlans,
      insurceStatus:true,
      introStatus:false,
      readStatus:false,
      names:'',//险种名称
      agentInfo:utils.cache.get('agentInfo')||{},
      holderName:'',//被保人姓名
      jobCode:'',
      policyHolderName:'',//投保人姓名
      holderSex:'',//被保人性别
      policyHolderSex:'',//投保人性别
      holderBirthday:'',//被保人生日
      policyHolderBirthday:'',//投保人生日
      amount:'',//基本保险金额
      totalPremium:'',//保费
      productName:'',//险种
      productCode:'',//险种code
      selectedWay_0:'',//交费期间
      selectedWay_1:'',//保险期间
      selectedWay_2:'',//领取年龄或者其他
      term_0:'',
      term_1:'',
      term_2:'',
      attCode_1:'',
      term:'',
      holderBir:'',
      riderList:[],
      planId:null,
      zhuxianMoney:null,
      zhuxianPremium:null,
      showManageData:null,
      itemAttr:[],
      tit:[],
      fujiaExtraList:[],
      proposalPlan:{
        pdfMsgDTO:{}
      },
      localStorage:'',
      toggle:{
        jobVisible:false,
        tkStatu:false,
        smsStatus:false,
        otherStatus:false,
      },
      make:{
        product:"",
        productContent_1:[],
        productContent_2:[]
      }
    }
  },
  methods:{
    tiaoKuan(){
      this.toggle.jobVisible = true
    },
    shuomingshu(){
      this.toggle.smsStatus = true
    },
    tkStatus(item){
      console.log('保险条款.......................',item.productCode)
      this.make.productContent_1 = []
        for(let i in proposalPlans.proposalPlan.item){
          if(item.productCode == proposalPlans.proposalPlan.item[i].productCode){
            if(proposalPlans.proposalPlan.item[i].proposalType == "1"){
              this.make.productContent_1.push(proposalPlans.proposalPlan.item[i])
            }
          }
        }
        this.make.productContent_1.sort((a,b) => {
            const codeA = parseInt(a.code)
            const codeB = parseInt(b.code)
            return codeA -codeB
        })
        if(this.make.productContent_1.length > 0){
          this.toggle.tkStatu = true
          console.log(this.make.productContent_1)
        }else{
          this.toggle.tkStatu = false
          utils.ui.modal.afterOpen()
          this.$refs.showalert.showMOdal('当前险种没有保险条款！')
          // MessageBox({
          //   title: '提示',
          //   message: '当前险种没有保险条款！'
          // }).then(()=>{
          //   utils.ui.modal.beforeClose()
          // })
        }
    },
    shuomingshuCallback(item){
      this.make.productContent_2 = []
        for(let i in proposalPlans.proposalPlan.item){
          if(item.productCode == proposalPlans.proposalPlan.item[i].productCode){
            if(proposalPlans.proposalPlan.item[i].proposalType == "2"){
              this.make.productContent_2.push(proposalPlans.proposalPlan.item[i])
            }
          }
        }
        console.log(this.make.productContent_2)
        this.make.productContent_2.sort((a,b) => {
            const codeA = parseInt(a.code)
            const codeB = parseInt(b.code)
            return codeA -codeB
        })
        if(this.make.productContent_2.length > 0){
          this.toggle.otherStatus = true
        }else{
          this.toggle.otherStatus = false
          utils.ui.modal.afterOpen()
          this.$refs.showalert.showMOdal('当前险种没有产品说明书！')
          // MessageBox({
          //   title: '提示',
          //   message: '当前险种没有产品说明书！'
          // }).then(()=>{
          //   utils.ui.modal.beforeClose()
          // })
        }
    },
  	getDemoData(){
      console.log()
  		utils.http.post('PROPOSALHQMSG',{
  			"proposalPlan": {
  				"planId": this.planId,
  				"agentCode": ""
  			}
  		}).then(response=>{
        if(response.data.header.responseCode == '0'){
           this.proposalPlan = response.data.response.proposalPlan
          console.log('产品信息',this.proposalPlan)
          this.proposalPlan.planId = this.planId
          this.dataReady = true
          console.log(response)
          this.make.product = this.proposalPlan.benifitOutLineDtoList
        }else{
          this.$refs.showalert.showMOdal(response.data.header.errorMessage)
          // MessageBox({
          //   title: '温馨提示',
          //   message: response.data.header.errorMessage
          // })
        }  
  		})
  	},
    imgNone(){
      let timer;
      let ele = $('.cover');
      timer = setInterval(()=>{
        ele.addClass('cover-none');
      },3000000)
    },
    changeIndex:function(index){
      this.num = index;
      console.log(this.num);
      if(index == '0'){
        this.insurceStatus = true;
        this.readStatus = false;
      }else if(index == '1'){
        this.insurceStatus = false;
        this.readStatus = true;
      }
    },
  },
  mounted(){
    this.planId = this.$route.params.planId
    console.log(this.planId)
    this.getDemoData()
    this.localStorage = utils.cache.get('personsal')
    console.log('sasasasasa',this.productCode)
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  .content show-content{
    font-size: 12px!important;
  }
  .mint-header.is-fixed{
    z-index: 120!important;
  }
  .cover{
    width: 100%;height: 100%;
    position: fixed;
    top: 0;right: 0;bottom: 0;left: 0;
    z-index: 3;
    img{
      display: inline-block;
      width: 100%;height: 100%;
    }
  }
  .cover-none{
    display: none;
  }
  .fa-angle-left,.fa-share-square-o{
    display: inline-block;
    width: 100%;height: 100%;
    line-height: 48px;
    text-align: center;
    font-size: 30px;
    color:#03345C;
  }
  .fa-share-square-o{
    font-size: 25px;
    line-height: 55px;
  }
  .tabs{
      width: 100%;height: 40px;
      overflow: hidden;
      background-color: #FFF;
      // background: url("../../../static/img/common/line.jpg")no-repeat bottom center;
      background-size: 100%;
      .tab{
        width: 100%;
        font-size: 15px;
        text-align: center;
        padding: 10px 0;
        background-color: #FFF;
        display:flex;
        .item-list{
          width: 50%;
          font-size: 16px;
          font-weight: bold;
        }
        .item-list:nth-child(2){
          border-left:1px solid rgb(165,165,165);
        }
      }
    }
  .two-title{
      width: 100%;
      height: 30px;
      margin-top: 0.1%;
      background: rgba(0,0,0,0.5);
      color: #FFF;
      text-align: center;
      display: flex;
      justify-content: space-around;
      line-height: 30px;
    }
  .content{
    width: 100%;
    position: absolute;top: 48px;left:0;bottom: 0;
    overflow-y: auto;
    // -webkit-overflow-scrolling: touch;
    background-color: #fff1d4;
  }
  .tab .item-list.active{color: #E9D495;}
  .policy-two-footer{
      width: 100%;height: 40px;
      background: #FFF1D4;
      // border-top: 1px solid #BBB;
      // // position: fixed;bottom: 0;left:0;
      ul{
        width: 100%;height: 100%;
        display:flex;
        li{
          width: 50%;padding: 10px 0;
          text-align: center;
          span{
            display:inline-block;
            width: 100%;height: auto;
            color: #FFF;
          }
        }
        li:nth-child(1){background: #03345C}
        li:nth-child(2){background: #FEB101}
        li:nth-child(1) span{border-right: 1px solid #a5a5a5;}
      }
    }
    .tk-titleTop{
    border-bottom: 1px solid #BBB;
    padding-bottom:10px;
    font-size: 18px;
  }
  .tk-titleTop,.tk-titleBottom,.tk-title{
    width: 100%;
    padding-top:40%;
    text-align: center;
  }
  .tk-titleBottom{
    padding-top:0;
    font-size: 18px;
  }
  .tk-title{
    padding: 15px 0;
    p{
      width: 80%;height: 40px;
      margin: auto;
      line-height: 40px;
      background: #FEB101;
      color: #FFF;
      margin-bottom:15px;
      border-radius: 15px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
  .tk-title p:last-child{margin-bottom:0;}
</style>