<template>
	<div>
		<Headerbtns :title="'银行变更确认'">
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
							<select @change="textclick"  id="insuredIdType" class="select">
								<option v-for="itm in bankList" :value="JSON.stringify(itm)">
									{{itm}}
								</option>
							</select>
						</span> <i class="fa fa-chevron-right" aria-hidden="true"></i>
					</div>
				<li class="line-bottom f-flex">
					<span>付款卡号</span>
					<input type="text" placeholder="请输入银行卡号" style="text-align:rigth;">
				</li>
			</ul>
		</div>
		<div class="footer" @click="payRequest">立即付款</div>
	</div>	
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../common/Header.vue'
	export default {
	  name: 'pay',
	  components: {Headerbtns},
	  data(){
	  	return {
	  		bankList:['中国银行','招商银行','北京银行']
	  	}
	  },
	  methods:{
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
  	  	textclick(){
  			var insuredIdType = $("#insuredIdType ").val();
  			console.log(insuredIdType)
  	  	 }
	  }
	}
</script>
<style lang='scss' scoped type="text/css" >
	@import 'src/assets/css/page';
	.select{border:0;}
</style>