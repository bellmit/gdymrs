<!-- 客户查询 -->
<template>
	<div id="">
		<Headerbtns :title=page_title>
				<i class="fa fa-angle-left" @click="cancel" slot="left"></i>
		</Headerbtns>
		<div class="manage-main-contents">
			<div class="userInput">
				<div class="userInput_box">
					<div class="user_input"><input class="uName" v-model="search_parameter.customerName" type="text" placeholder="姓名"></div>
					<div class="phone_input"><input class="phoneNum" v-model="search_parameter.phoneNumber" type="text" placeholder="手机号码"></div>
					<div class="query_btn" @click="search">查询</div>
				</div>
			</div>
			<div class="userInfo" id="customerItem" v-for="itm in customerInfo.customerInfoList" @click='selectedItem(itm)'>
	    		<ul class="user_info"  >
	    			<li style="width: 20%;">
							<img class="avator_img" v-if="itm.sex == 1"  src="../../../static/img/common/touxiang_nan.png">
	    				<img class="avator_img" v-if="itm.sex == 2"  src="../../../static/img/common/touxiang_nv.png">
	    			</li>
	    			<li style="width: 20%;"><span>
							{{itm.customerName}}
							</span></li>
	    			<li style="width: 25%;">{{itm.birthday|ageFilter}}岁</li>
	    			<li style="width: 45%;">{{itm.phoneNumber}}</li>
	    		</ul>
      </div>
		</div>
		<alert ref="alert"></alert>
	</div>
</template>

<!--js-->
<script>
  import { MessageBox } from 'mint-ui'
	import Headerbtns from '../../../src/components/policy/common/Header'
	import alert from '../../../src/components/policy/common/alert.vue'
  import global_constant from '../../../src/assets/data/global_constant.json'

	export default{
		name:'customer_search',
    components: {Headerbtns,alert},
    props: ['value'],
		data () {
	    return {
        page_title:'客户查询',
	      search_tag:'',
        search_parameter:{
          customerName:'',
          phoneNumber:''
        },
        customerInfo:{},
        global_constant:global_constant
	    }
	  },
	  beforeMount(){

	  },
	  mounted(){
      this.search_tag = this.$route.params.tags
	  },
	  methods:{
			showMsg:function(msg){
				if(msg!=undefined && msg!=""){
					this.$refs.alert.showMOdal(msg)
				}
			},
      selectedItem:function (item) {
        this.value.isopen = !this.value.isopen
        this.value.cusItem = item
        this.customerInfo={}
        // console.log("选中客户===>",this.value)
      },
      cancel:function () {
        this.value.isopen = !this.value.isopen
        this.value.cusItem = undefined
        console.log("取消选中客户===>",this.value)
      },
      search:function () {
        let requ = {
          "cus": {
            "agentCode": utils.cache.get('personsal').agentCode,
            "clientName": this.search_parameter.customerName,
            "phoneNumber": this.search_parameter.phoneNumber,
            "clientType": "I",
            "endIndex": "2147483648",
            "startIndex": "1"
          }
        }
        utils.http.postFast("MOHQCUSTOMER",requ,(body)=> {
					if(body.customerInfo.resultCode == 0){
						this.customerInfo = body.customerInfo
					}else{
						this.showMsg(body.customerInfo.resultMessage)
					}
        })
      }
	  }
	}
</script>

<style lang="scss" scoped type="text/css">
.manage-main-contents{
  width: 100%;
  position: absolute;
  left: 0;right: 0;top: 48px;bottom: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #FFF;
}

.fa{
  color: #03345C;
}

.fa-angle-left{
  display: inline-block;
  width: 100%;height: 100%;
  line-height: 48px;
  text-align: center;
  font-size: 30px;
}
.userInput{
	width: 100%;
	height:52px;
	background:#E8E7E4;
	text-align: center;
	line-height: 52px;
}

.userInput_box{
	width: 95%;
	height: 52px;
	display: flex;
	margin: 0 auto;
	justify-content: space-between;
}

.user_input{
	width: 25%;
	height:36px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin: 7px 5px 0px  5px;
	line-height: 36px;
	background: #fff;
}

.phone_input{
	width: 40%;
	height:36px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin: 7px 5px 0px  5px;
	line-height: 36px;
	background: #fff;
}

.uName{
	width: 85%;
}

.phoneNum{
	width: 85%;
}

.query_btn{
	width: 22%;
	height:38px;
	color: #fff;
	background:#FEB101 ;
	border-radius: 5px;
	margin: 7px 5px 0px  5px;
	line-height: 38px;
}

.userInfo{
	width: 100%;
	height:65px;
	border-bottom: 2px dashed #ccc;
	text-align: center;
	line-height: 65px;
}

.user_info{
	width: 95%;
	display: flex;
	margin: 0 auto;
	justify-content: space-between;
}

.avator_img{
	width: 35px;
	vertical-align: middle;
}
li{
	color:#746E69;
	font-size: 16px;
}
li span{
	color: #746E69;
	font-size: 16px;
	font-weight: bold;
	text-align: left;
	display: block;
	width: 80px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
