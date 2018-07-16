<template>
	<div  style="position:relative">
		<Headerbtns :title="'订单详情'">
			<router-link to="/" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<div class="margin-top">
			<ul>
				<li class="line-bottom f-flex">
					<span>支付保费</span>
					<span>3000</span>
				</li>
				<li class="line-bottom f-flex">
					<span>投保人</span>
					<span>张三</span>
				</li>
				<li class="line-bottom f-flex">
					<span>被保险人</span>
					<span>李四</span>
				</li>
				<li class="line-bottom f-flex">
					<span>投保险种</span>
					<span>聚爱一生终身寿险</span>
				</li>
				<li class="line-bottom f-flex">
					<span>付款银行</span>
					<div>
						<span>
							<select @change="textclick"  id="insuredIdType" class="select" style="direction:rtl">
								<option v-for="itm in bankList.relation.item" :value="JSON.stringify(itm)">
									{{itm.text}}
								</option>
							</select>
						</span> <i class="fa fa-chevron-right" aria-hidden="true"  @change="textclick"></i>
					</div>
				</li>
				<li class="line-bottom f-flex">
					<span>付款卡号</span><i></i>
					<input type="text" placeholder="请输入银行卡号" style="text-align:rigth;">
				</li>
			</ul>
		</div>
		<div class="footer" @click="pay">立即付款</div>
		<!-- 弹出框 -->
		<mt-popup position="center" v-model="show" class="phone_valid popup">
		  	<div class="mobileNumber">
		  		<div class="mNumber_text">已将向投保人尾号1234的手机号发送了验证</div>
		  	</div>
		  	<div class="valid_number">
		  		<div class="vNumber_text" style="display:inline-block;line-height:60px">验证码</div>
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
		  			<button class="btn common" @click="valid_number">确定</button> 
		  		</div>
		  	</div>
		</mt-popup>		
	</div>	
</template>

<script>
	import data from "../../assets/data/bank_sunlife.json"
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../common/Header.vue'
	export default {
	  name: 'pay',
	  components: {Headerbtns},
	  data(){
	  	return{
	  		count:30,
	  		show:false,
	  		sendMsgDisabled:false,
	  		sendContent:'点击获取验证码',
	  		resMobile:'',
	  		iptVal:'',
	  		testCode:'',//验证码
	  		bankList:JSON.parse(JSON.stringify(data))
	  	}
	  },
	  methods:{
	  	// 显示弹框
	  	pay(){
	  		this.show=true;
	  		this.payRequest();
	  	},
	  	// 支付请求
	  	payRequest(){
	  		console.log('支付请求');
	  		let requ={
                "policy": {
                    "agentCode": "6100I00455",
                    "applyCode": "M610166789267888",
					"activityid":"N",
					"bankNo":"",
					"bankCode":""
                }
            }
	  		utils.http.post('MOPAYACCEPT',requ).then(response =>{
	  			console.log('PAY返回报文',response)
	  			let project = response.data.response
	          	let projectHead = response.data.header
	          	if(projectHead.responseCode == 1){
	            	MessageBox({
	             	title: '提示',
	             	 message: projectHead.errorMessage
	            	});
	          	}else if(projectHead.responseCode != 1){
	          		let message = project.policy.resultMessage
	          		console.log(project)	            	
	          		MessageBox({
	              		title: '提示',
	              		message: message
	            	});
	            }
	  		}).catch(error=>{
	  			MessageBox({
	  				title:'提示',
	  				message:'系统异常,请联系管理员'
	  			})
	  		})
	  	},
	  	// 验证码倒计时
	  	downTime(){
	  		this.sendCode();
	  		//如果定时器已启动 就return
	  		if(this.sendMsgDisabled == true) return;
	  		this.sendMsgDisabled = true;
	  		let timer=setInterval(()=>{
	  			if((this.count--) <= 1){
	  				this.count = 30;
	  				this.sendMsgDisabled = false;
	  				this.sendContent = '重新获取验证码';
	  				this.iptVal = '';
	  				clearInterval(timer);
	  			}
	  		},1000)
	  	},
	  	textclick(){
			var insuredIdType = $("#insuredIdType ").val();
			console.log(insuredIdType)
	  	 },
	  	// 获取短信验证码
	  	sendCode(){
	  		let requ={
	            "personsal": {
	                "mobile": '13552019453'
	            }
	        }
	        utils.http.post('MOSENDCODE',requ).then(response =>{
	        	console.log('短信请求返回报文',response)
				let project = response.data.response
	        	let projectHead = response.data.header
	        	if(projectHead.responseCode != 0){
		          	MessageBox({
		           	title: '提示',
		           	 message: projectHead.errorMessage
		          	});
	        	}
			}).catch(error=>{
				// MessageBox({
				// 	title:'提示',
				// 	message:'系统异常,请联系管理员'
				// })
	        })
	  	},
	  	// 验证手机验证码
	  	valid_number(){
	  		let requ = {
		    		"personsal": {
		  				"mobile": '13552019453',
		  				"message":this.iptVal
	                }
		  		}
		  		utils.http.post('MOVALICODE',requ).then(response => {
  					let personsal = response.data.response
					console.log("验证结果返回",personsal)
			    	if(response.data.header.responseCode != 0){
			    		MessageBox({
			    			title: '提示',
			    			message: '验证码有误！'
			    		});
			    	}else if(response.data.header.responseCode == 0){
			    		this.$router.push("/InsureResult");
			    	}		
				}).catch(error => {
				})
	  	}
	  }
	}
</script>
	
<style lang='scss' scoped type="text/css">
	@import 'src/assets/css/page';
	div.bg{background-color:#000;}
	.btn{width: 30%;height: 35px;color: #fff;background: #E84E40;border: 0;
		display: block;margin: 20px auto;
	}
	.common{
		border-radius: 8px;font-size: 18px;line-height: 30px;
	}
	.btnStyle{
		display: inline-block;
	}
	.popup{
		width: 90%;height: 150px;border-radius: 10px;
		padding: 10px;
	}
	.select{border:0;}
	.iptSty{padding-left:5px;border:1px solid #BBBBBB;width:120px;}
</style>