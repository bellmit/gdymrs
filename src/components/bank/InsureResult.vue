<template>
	<div>
		<div v-show="!show" class="position">
		<Headerbtns :title="'订单详情'">
			<router-link to="/" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
			<img src="../../assets/1515379021(1).jpg">
			<p class="font-size">恭喜您，</p>
			<p>投保单{{num}}承保成功！</p>
			<div class="pos-bottom">
				<button @click="go('/Home')" class="btn">返回首页</button>
				<button  @click="go('/Backlog')" class="btn">待办事项</button>
			</div>
		</div>
		<div v-show="show" class="position">
			<img src="../../assets/1515376568(1).jpg">
			<p>保单支付失败，请选择放弃支付还是继续支付！</p>
			<div class="pos-bottom">
				<button @click="go('/Home')" class="btn">返回首页</button>
				<button @click="go('/BankChange')" class="btn">继续支付</button>
			</div>
		</div>
		<div v-show="!paying" class="position">
			<img src="../../assets/1515139852(1).jpg">
			<p>您的保单正在支付中，请稍后到待办事项中查询最新状态！</p>
			<div class="pos-bottom">
				<button @click="go('/Home')" class="btn">返回首页</button>
				<button @click="go('/Backlog')" class="btn">待办事项</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '../common/Header.vue'
	export default {
	  name: 'insureResult',
	  components: {Headerbtns},
	  data(){
	  	return{
	  		num:123121212,
	  		show:false,
	  		paying:true
	  	}
	  }
	}
</script>

<style lang='scss' scoped type="text/css">
	@import 'src/assets/css/page';
	.position{
		margin: 25% auto;
		text-align: center;
		/* line-height: 50px; */
		padding: 0 10px;
	}
	.pos-bottom{
		margin-top: 50%;
	}
	.btn{
		padding:8px 10px;
		border-radius:3px;border: 0;
		background:#FEB101;color: #fff;
	}
	.font-size{
		font-size: 20px;line-height: 40px
	}
</style>