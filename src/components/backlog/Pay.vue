<template>
	<div  style="position:relative;font-size:12px">
		<Headerbtns :title="'订单详情'">
			<router-link to="/backlog" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<div class="manage-main-contents">
			<ul>
				<li class="f-flex line-bottom">
					<span>支付保费</span>
					<span>{{sumPremL}}</span>
				</li>
				<li class=" f-flex line-bottom">
					<span>投保人</span>
					<span>{{appntName}}</span>
				</li>
				<li class="f-flex line-bottom" v-for="item in insName">
					<span>被保险人</span>
					<span>{{item.name}}</span>
				</li>
				<li class="f-flex line-bottom"  v-if="item.isMaster == 1" v-for="item in rodName">
					<span>投保险种</span>
					<span class="text">{{item.prodName}}</span>
				</li>
				<li class="f-flex line-bottom"  @click="goBankChange()">
					<span>付款银行</span>
					<span style="color:#000">{{bankCode | bankFilter}}</span>
				</li>
				<li class="f-flex line-bottom"  @click="goBankChange()">
					<span>付款卡号</span><i></i>
					<span>{{bankNo}}</span>
				</li>
				<li class="f-flex">
					<button class="btns" @click="payRequest()">立即付款</button>
				</li>
			</ul>
		</div>

		<!-- <div class="foote" @click="pay">立即付款</div> -->
		<!-- <button class="foote" @click="payRequest">立即付款</button> -->
		
		<!-- 弹出框 -->
		<mt-popup position="center" v-model="show" class="phone_valid popup">
		  	<div class="mobileNumber">
		  		<div class="mNumber_text" style="text-align:center">已将向投保人尾号{{mobile.slice(7)}}的手机号发送了验证</div>
		  	</div>
		  	<div class="valid_number" style="align-items: center;text-align:center">
		  		<div class="vNumber_text" style="display:inline-block;line-height:60px"><span>验证码</span></div>
		  		<div class="vNumber_input" style="display:inline-block">
		  			<input type="text" v-model="iptVal" placeholder="请输入验证码" class="btnStyle common iptSty">
		  		</div>
		  		<button @click="downTime" class="btnStyle common">
					<span v-if="sendMsgDisabled">{{count+'秒后获取'}}</span>
					<span v-if="!sendMsgDisabled">{{sendContent}}</span>
				</button>
		  	</div>
		  	<div class="line"></div>
		  	<div class="confirmButton">
		  		<div class="confirm_button">
		  			<button class="btn common" @click="valid_number" >确定</button>
		  		</div>
		  	</div>
		</mt-popup>
		<alert ref="showalert"></alert> 

		
	</div>
</template>

<script>
	import data from "../../assets/data/bank_sunlife.json"
	import { MessageBox } from 'mint-ui'
	import alert from '../policy/common/alert.vue'
	import Headerbtns from '../policy/common/Header.vue'
	export default {
	  name: 'pay',
	  components: {Headerbtns,alert},
	  data(){
	  	return{
	  		count:30,
	  		show:false,
	  		sendMsgDisabled:false,
	  		sendContent:'点击获取验证码',
	  		resMobile:'',
	  		iptVal:'',
	  		testCode:'',//验证码
	  		sumPremL:'',//支付保费
	  		appntName:'',//投保人
	  		insName:'',//被保人
	  		bankCode:'',//付款银行
	  		bankNo:'',//银行卡号
	  		rodName:'',//险种名称
	  		applyCode:this.$route.params.applyCode,//接收code支付请求
	  		orderId:this.$route.params.orderId,//接受id获取支付信息
	  		agentCode:this.$route.params.agentCode,
	  		idCard:this.$route.params.idCard,//传到变更页面人脸识别的请求参数
	  		holderName:this.$route.params.holderName,//传到变更页面人脸识别的请求参数
	  		mobile:''//投保人电话
	  	}
	  },
	  mounted(){
	  	this.getPayInfo();
	  },
	  methods:{
	  	// 显示弹框
	  	pay(){
	  		this.show=true;
	  	},
	  	// 改变银行信息时跳转银行变更页面
	  	goBankChange(){
	  		utils.cache.removeItem("bankinfo")
	  		utils.cache.removeItem("bankImg")
	  		utils.cache.removeItem("bankcaimage")
	  		this.$router.push({name:'bankChange',params:{orderId:this.orderId,applyCode:this.applyCode,agentCode:this.agentCode,holderName:this.holderName,idCard:this.idCard}});
	  	},
	  	// 获取支付信息
	  	getPayInfo(){
	  		let getPayInfo = {
                "policy": {
                    "substepNo": "",
                    "orderCode": this.orderId
                }
            }
            console.log('获取支付信息请求参数',getPayInfo)
            utils.http.post('MOHQPOLICYMSG',getPayInfo).then(response =>{
            	let result = response.data.response.policy;
            	this.sumPremL = result.productInfo.sumPremL;
            	this.appntName = result.custInfo.appnt.appntName;
            	this.mobile = result.custInfo.appnt.mobile;
            	this.insName = result.custInfo.insurants.insurant;
            	this.bankCode = result.productInfo.bankCode
            	this.bankNo = result.productInfo.bankAccNo
            	this.rodName = result.productInfo.products.product
            	console.log('获取支付页面信息',result)
            })
	  	},
	  	// 支付请求
	  	payRequest(){
	  		// this.show = false;
	  		let requ={
                "policy": {
                    "agentCode": this.agentCode,
                    "applyCode": this.applyCode,
					"activityid":"N",
					"bankNo":"",
					"bankCode":""
                }
            }
            console.log('pay请求参数',requ)
            utils.http.postFast('MOPAYACCEPT',requ,(body)=>{
            	let result = body.policy
            	let policyCode = result.policyCode;//传到支付页的保单号
            	console.log('支付请求返回',result)
            	if(result.resultCode == 0){
		    		this.$router.push({name:'insureResult',params:{isShow:true,policyCode:policyCode,holderName:this.holderName,idCard:this.idCard}})
            	}else if(result.resultCode != 0){
		    		this.$refs.showalert.showMOdal(result.resultMessage)
		    		this.$router.push({name:'insureResult',params:{isShow:false,policyCode:policyCode,resultMessage:result.resultMessage}})
            	}
            })
	  	},
	  	// 验证码倒计时
	  	downTime(){
	  		this.sendCode();
	  		//如果定时器已启动 就return
	  		if(this.sendMsgDisabled == true) return;
	  		this.sendMsgDisabled = true;
	  		let timer = setInterval(()=>{
	  			if((this.count--) <= 1){
	  				this.count = 30;
	  				this.sendMsgDisabled = false;
	  				this.sendContent = '重新获取验证码';
	  				this.iptVal = '';
	  				clearInterval(timer);
	  			}
	  		},1000)
	  	},
	  	// 获取短信验证码
	  	sendCode(){
	  		if(this.sendMsgDisabled == true) return;
	  		let requ={
	            "personsal": {
	                "mobile": this.mobile
	            }
	        }
	        utils.http.post('MOSENDCODE',requ).then(response =>{
				let project = response.data.response
	        	let projectHead = response.data.header
	        	console.log('短信请求返回报文',project)
	        	if(projectHead.responseCode != 0){
		          	this.$refs.showalert.showMOdal(projectHead.errorMessage)
	        	}
			}).catch(error=>{
	        })
	  	},
	  	// 验证手机验证码
	  	// 3.20注释
	  	valid_number(){
	  		let requ = {
		    		"personsal": {
		  				"mobile": this.mobile,
		  				"message":this.iptVal
	                }
		  		}
	  		utils.http.post('MOVALICODE',requ).then(response => {
					let personsal = response.data.response
				console.log("验证结果返回",personsal)
		    	if(response.data.header.responseCode != 0){
		    		this.$refs.showalert.showMOdal('验证码有误！')
		    	}else{
		    		this.payRequest();
		    	}
			}).catch(error => {
			})
	  	}
	  }
	}
</script>

<style lang='scss' scoped type="text/css">
	@import 'static/css/backlog/page';
	.manage-main-contents{
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 48px;
		bottom: 0;
	}
	.text{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		/* width: 40%; */
	}
	div.bg{background-color:#000;}
	.btn{width: 30%;height: 35px;color: #fff;background: #F4A200;border: 0;
		display: block;margin: 10px auto;
	}
	.common{
		border-radius: 8px;
		line-height: 30px;
		height: 30px
	}
	.btnStyle{
		display: inline-block;
	}
	.popup{
		width: 90%;height: 180px;border-radius: 10px;
		padding: 10px;
	}
	.select{border:0;}
	.iptSty{padding-left:5px;border:1px solid #BBBBBB;width:105px;}
	.btns{
		width:35%;line-height:50px;background:#F4A200;border:0;color:#fff;margin:55% auto 5%;border-radius:5px;
	}
</style>
