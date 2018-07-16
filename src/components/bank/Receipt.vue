<template>
	<div class="margin-top">
		<Headerbtns :title="'回执'">
			<router-link to="/" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<p class="text-mar">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis impedit vitae deleniti velit non, numquam explicabo ipsum voluptates. Delectus officia ipsam quia quo quae eveniet minima quam, tempora animi suscipit.</p>
		<img src="../../assets/img/backlog/qianzi.jpg" class="imgs" alt="">
		<div class="footer">提交</div>
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

	  	}
	  }
	}
</script>

<style lang='scss' scoped type="text/css">
	@import 'src/assets/css/page';
	.imgs{
		display: block;
		margin: 20px auto;
	}
	.text-mar{
		margin: 25%  15px 10% 15px;
	}
</style>