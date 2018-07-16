<template>
	<div style="color:#747271">
		<Headerbtns :title="'投保要约申请书'">
			<router-link to="/" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<form style="margin:25% 5% 10% 5%;">
			<p><i class="fa fa-check-circle"></i>  变更缴费信息</p>
			<p class="pad-lf">变更原因</p>
			<textarea  name="" placeholder="请输入变更原因"></textarea>
			<p class="pad-lf">
				<input type="checkbox">
				变更缴费方式
			</p>
			<p class="pad-lf">
				<input type="checkbox">
				变更投保人银行划账账号，账号信息：
			</p>
			<p class="pad-lf">开户银行：</p>
			<p class="pad-lf">账号：</p>
			<div class="boder">
				<p><i class="fa fa-check-circle"></i>  撤件</p>
				<p class="pad-lf">撤件原因：</p>
				<textarea  name="" placeholder="请输入变更原因"></textarea>
			</div>
			<button class="btn">提 交</button>
		</form>
	</div>
</template>

<script>
	import Headerbtns from '../common/Header.vue'
	export default {
	  name: 'recall',
	  components: {Headerbtns},
	}
</script>

<style lang='scss' scoped type="text/css" >
	@import 'src/assets/css/page';
	textarea{
		width:90%;height:120px;display:block;margin-top:10px;font-size:16px;border: 1px solid #D4D4D4;margin: 0 auto;
	}
	.pad-lf{
		padding-left: 18px;line-height: 28px;
	}
	.boder{
		border-bottom:2px dashed #D4D4D4;border-top:2px dashed #D4D4D4;
		padding: 20px 0;margin-top: 20px;
	}
	.btn{
		background: #FEB101;
		color: #fff;display: block;
		padding: 10px 25px;border: 0;border-radius: 5px;margin: 15px auto;
	}
</style>