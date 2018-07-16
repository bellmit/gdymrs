<template>
	<div style="font-size:12px">
		<div v-show="show" class="position">
		<Headerbtns :title="'投保成功'">
			<router-link to="/backlog" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
			<img src="../../../static/img/backlog/payresult.png" style="width:60px;height:200px;">
			<p class="font-size">恭喜您！</p>
			<p style="line-height:20px;">保单{{policyCode}}承保成功！<br>
			请在客户阅读电子保险合同后，指导客户进行电子回执签收。
			</p>
			<div class="pos-bottom">
				<button @click="go('/Home')" class="btn">返回首页</button>
				<button  @click="goToReceipt()" class="btn">回执签收</button>
			</div>
		</div>
		<div v-show="!show" class="position">
			<img src="../../../static/img/backlog/1515376568(1).jpg">
			<p>{{resultMessage}}!</p>
			<div class="pos-bottom">
				<button @click="go('/Home')" class="btn">返回首页</button>
				<button @click="goPay()" class="btn">继续支付</button>
			</div>
		</div>
		<div v-show="!paying" class="position">
			<img src="../../../static/img/backlog/1515139852(1).jpg">
			<p>您的保单正在支付中，请稍后到待办事项中查询最新状态！</p>
			<div class="pos-bottom">
				<button @click="go('/Home')" class="btn">返回首页</button>
				<button @click="go('/Backlog')" class="btn">待办事项</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '../policy/common/Header.vue'
	export default {
	  name: 'insureResult',
	  components: {Headerbtns},
	  data(){
	  	return{
	  		resultMessage:this.$route.params.resultMessage,
	  		policyCode: this.$route.params.policyCode,
	  		show: this.$route.params.isShow,
	  		paying:true,
	  		orderId:this.$route.params.orderId,
	  		applyCode:this.$route.params.applyCode,
	  		agentCode:this.$route.params.applyCode,
	  		holderName:this.$route.params.holderName,//人脸识别
	  		idCard:this.$route.params.idCard//人脸识别
	  	}
	  },
	  methods:{
	  	goPay(){
	  		this.$router.push({name:'pay',params:{orderId:this.orderId,applyCode:this.applyCode,agentCode:this.agentCode,holderName:this.holderName,idCard:this.idCard}});
	  	},
	  	goToReceipt(){
	  		this.$router.push({
  				name: 'receipt',
  				params: {
  					orderId: this.orderId,
  					applyCode: this.applyCode
  				}
	  		})
	  	}
	  }
	}
</script>

<style lang='scss' scoped type="text/css">
	@import 'static/css/backlog/page';
	.position{
		margin: 25% auto;
		text-align: center;
		/* line-height: 50px; */
		padding: 0 10px;
	}
	.pos-bottom{
		margin-top: 40%;
	}
	.btn{
		padding:8px 10px;
		border-radius:3px;border: 0;
		background:#FEB101;color: #fff;
		outline: none
	}
	.font-size{
		font-size: 20px;line-height: 40px
	}

</style>