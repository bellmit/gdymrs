<template>
	<div class="footer-content">
		<div class="footer-left" v-show=is_show>
			{{total_premium}}元
		</div>
		<div class="footer-right" v-show=is_show>
			<slot name="right"></slot>
		</div>
		<div class="footer-content" v-show=!is_show>
			<slot name="center"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Footertabs',
		props: {
			total_premium: {
				type: String,
				default: '0.00'
			},
			is_show:{
				type:Boolean,
				default: true
			}
		},
		data() {
			return {
				msg: ''
			}
		},
		methods: {

		}
	}
</script>

<style type="text/css" scoped lang="scss">

	// .btnFoote{
	// 	color: #fff;
	// 	background:#F4A200;
	// 	border-radius: 5px;
	// 	width: 45%;
	// 	height: 40px;
	// 	border:0;display: block;
	// 	margin:auto auto; 
	// }

	.footer-content{
		position: fixed;
		bottom: 0;
		width: 100%;height: 50px;
		z-index: 2;
	}
	
	.footer-center {
		height: 50px;
		width: 100%;
		background: #FFAC00;
		line-height: 50px;
		text-align: center;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 18px;
	}
	
	.footer-left {
		height: 50px;
		width: 50%;
		background: #003756;
		line-height: 50px;
		text-align: center;
		color: #FFFFFF;
		font-weight: bold;
		float: left;
	}
	
	.footer-right {
		height: 50px;
		width: 50%;
		background: #FFAC00;
		line-height: 50px;
		text-align: center;
		color: #FFFFFF;
		font-weight: bold;
		float: left;
	}
</style>