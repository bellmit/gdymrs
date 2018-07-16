<template>
	<div id="v-header">
		<ul>
			<li class="header-btn">
				<slot name="left"></slot>
			</li>
			<li class="header-title">
				{{title}}
				<slot name="title"></slot>
			</li>
			<li class="header-btn">
				<slot name="right"></slot>
			</li>
		</ul>
		<div class='border-bottom'>
			<div class="border-bottom-left"></div>
			<div class="border-bottom-right"></div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"v-header",
		props:{
			title:{
				type:String,
				default:''
			}
		},
		data(){
			return{

			}
		},
		mounted(){
			var _header = document.getElementById('v-header')
			var _managemaincontents = $(".manage-main-contents")
			var _showmanagcontents = $(".show-content")
			var _enjoycontent = $(".enjoy-content")
			var u = navigator.userAgent;
		  	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		  	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		  	console.log('是否是Android：'+isAndroid);
		  	console.log('是否是iOS：'+isiOS);
		  	if(isAndroid){
		  		_header.style.setProperty("padding-top","0px")
		  	}else if(isiOS){
		  		_header.style.setProperty("padding-top","20px")
		  		_managemaincontents.css({
		  			"position":"absolute",
		  			"top":"70px"
		  		})
		  		_showmanagcontents.css({
		  			"position":"absolute",
		  			"top":"68px"
		  		})
		  		_enjoycontent.css({
		  			"position":"absolute",
		  			"top":"68px"
		  		})
		  	}
		}
	}
</script>
	
<style type="text/css" lang="scss" scoped>
	#v-header{
		position: fixed;top: 0;
		z-index: 333;
		width: 100%;line-height: 45px;
		background-color: #FFF;
		font-size: 16px;
		font-weight: bold;
		ul{
			height: 45px;
			overflow: hidden;
			display: flex;
			.header-btn{
				width: 40px;height: 100%;
				line-height: 45px;
				overflow: hidden;
			}
			.header-title{
				flex:1;
				line-height: 45px;
				font-weight:bold;
				font-size: 18px;
				color: #03345C;
				text-align: center;
			}
		}
	}
	.border-bottom{
		display: flex;
	}
	.border-bottom-left {
		height: 3px;
		width: 35%;
		background: #003756;
	}
	
	.border-bottom-right {
		height: 3px;
		width: 65%;
		background: #FFAC00;
		left: 35%;
	}
</style>