<template>
	<div class="navbar">
		<!-- <div class="barName">
			<mt-button>按险种类型</mt-button>
		</div> -->
		
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">寿险</mt-tab-item>
		  <mt-tab-item id="2">健康险</mt-tab-item>
		  <mt-tab-item id="3">意外险</mt-tab-item>
		  <mt-tab-item id="4">年金保险</mt-tab-item>
		</mt-navbar>
		<!-- tab-container -->
		<slot name="header"></slot>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		  	<div class="policyContent" v-if="productDef.productList_1.length == '0'">
		    	<div class="productCon" style="text-align: center;line-height: 100px;">
		    		<p style="margin: auto;font-size: 16px;color: #CCC;">当前类别没有险种</p>
		    	</div>
		    </div>
		  	<div class="policyContent policyContent_1" v-for="item in productDef.productList_1" v-if="productDef.productList_1.length != '0'">
		    	<div class="productCon" v-on:click="chooseProduct_1(item)">
		    		<div class="img">
		    			<img src="../../../static/img/common/product.jpg" width="120" height="90" v-if="item.productCode != 'LBT028'&&item.productCode != 'LBT029'&&item.productCode != 'LWT002'&&item.productCode != 'LBP017'&&item.productCode != 'LBT024'"> 
						<img src="../../../static/img/common/LBT028_list.jpg" width="120" height="90" v-if="item.productCode == 'LBT028'">
						<img src="../../../static/img/common/LBT029.jpg" width="120" height="90" v-if="item.productCode == 'LBT029'">  
						<img src="../../../static/img/common/LWT002.jpg" width="120" height="90" v-if="item.productCode == 'LWT002'">
						<img src="../../../static/img/common/LBP017_list.jpg" width="120" height="90" v-if="item.productCode == 'LBP017'">
						<img src="../../../static/img/common/LBT024_list.jpg" width="120" height="90" v-if="item.productCode == 'LBT024'">
		    		</div>
		    		<div class="productTit">
		    			<p>{{item.productName}}</p>
			    		<p>{{item.introduction}}</p>
			    		<p>
			    			<span>{{item.minMsg}}元</span>
			    			<span>起</span>
			    		</p>
		    		</div>
		    	</div>

		    </div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		  	<div class="policyContent" v-if="productDef.productList_2.length == '0'">
		    	<div class="productCon" style="text-align: center;line-height: 100px;">
		    		<p style="margin: auto;font-size: 16px;color: #CCC;">当前类别没有险种</p>
		    	</div>
		    </div>
		    <div class="policyContent policyContent_1" v-for="item in productDef.productList_2" v-if="productDef.productList_2.length != '0'">
		    	<div class="productCon" v-on:click="chooseProduct_2(item)">
		    		<div class="img">
		    			<img src="../../../static/img/common/product.jpg" width="120" height="90" v-if="item.productCode != 'HDT037'">
						<img src="../../../static/img/common/HDT037_list.jpg" width="120" height="90" v-if="item.productCode == 'HDT037'">    
		    		</div>
		    		<div class="productTit">
		    			<p>{{item.productName}}</p>
			    		<p>{{item.introduction}}</p>
			    		<p>
			    			<span>{{item.minMsg}}元</span>
			    			<span>起</span>
			    		</p>
		    		</div>
		    	</div>
		    </div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		  	<div class="policyContent">
		    	<div class="productCon" style="text-align: center;line-height: 100px;">
		    		<p style="margin: auto;font-size: 16px;color: #CCC;">当前类别没有险种</p>
		    	</div>
		    </div>
		    <div class="policyContent policyContent_1" v-for="item in productDef.productList_3" v-if="productDef.productList_3.length != '0'">
		    	<div class="productCon" v-on:click="chooseProduct_3(item)">
		    		<div class="img">
		    			<img src="../../../static/img/common/product.jpg" width="120" height="90">
		    		</div>
		    		<div class="productTit">
		    			<p>{{item.productName}}</p>
			    		<p>{{item.introduction}}</p>
			    		<p>
			    			<span>{{item.minMsg}}元</span>
			    			<span>起</span>
			    		</p>
		    		</div>
		    	</div>
		    </div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="4">
		  	<div class="policyContent" v-if="productDef.productList_4.length == '0'">
		    	<div class="productCon" style="text-align: center;line-height: 100px;">
		    		<p style="margin: auto;font-size: 16px;color: #CCC;">当前类别没有险种</p>
		    	</div>
		    </div>
		    <div class="policyContent policyContent_1" v-for="item in productDef.productList_4" v-if="productDef.productList_4.length != '0'">
		    	<div class="productCon" v-on:click="chooseProduct_4(item)" >
		    		<div class="img">
		    			<img src="../../../static/img/common/product.jpg" width="120" height="90"v-if="item.productCode != 'NPT011'&&item.productCode != 'NPP016'&&item.productCode != 'NPT006'&&item.productCode != 'NPP014'">
						<img src="../../../static/img/common/NPT011_s.jpg" width="120" height="90"v-if="item.productCode == 'NPT011'">
						<img src="../../../static/img/common/NPP016_list.jpg" width="120" height="90"v-if="item.productCode == 'NPP016'">
						<img src="../../../static/img/common/NPT006_list.jpg" width="120" height="90"v-if="item.productCode == 'NPT006'">
						<img src="../../../static/img/common/NPP014_list.jpg" width="120" height="90" v-if="item.productCode == 'NPP014'">    
		    		</div>
		    		<div class="productTit">
		    			<p>{{item.productName}}</p>
			    		<p>{{item.introduction}}</p>
			    		<p>
			    			<span>{{item.minMsg}}元</span>
			    			<span>起</span>
			    		</p>
		    		</div>
		    	</div>
		    </div>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	export default{
		name:"product",
		data(){
			return{
				selected:'1',
				productDef:{
					productList_1:'',
					productList_2:'',
					productList_3:'',
					productList_4:''
				}
			}
		},
		methods:{
				chooseProduct_1(item){
					this.$emit("productCode",item.productCode)
				},
				chooseProduct_2(item){
					this.$emit("productCode",item.productCode)
				},
				chooseProduct_3(item){
					this.$emit("productCode",item.productCode)
				},
				chooseProduct_4(item){
					this.$emit("productCode",item.productCode)
				},
				productList(){
					let requ = {
						"personsal": {
            			"agentCode": utils.cache.get('personsal').agentCode,
            			"channel": utils.cache.get('personsal').channel
          			}
       			}
	        	utils.http.post('MOPRODUCTLIST',requ).then(response => {
		          	console.log("产品列表返回",response)
					let productAyyay = []
					this.productDef.productList_1 = response.data.response.personsal.productList1
					this.productDef.productList_2 = response.data.response.personsal.productList2
		          	this.productDef.productList_3 = response.data.response.personsal.productList3
					this.productDef.productList_4 = response.data.response.personsal.productList4
		         	productAyyay = productAyyay.concat(this.productDef.productList_1,this.productDef.productList_2,this.productDef.productList_3,this.productDef.productList_4)
		          	 console.log(productAyyay)
		          	this.$emit('productList', productAyyay)
	        	})
			  }
   		},
		mounted(){
			this.productList()
			var _header = $(".mint-navbar")
			var u = navigator.userAgent;
		  	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		  	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		  	console.log('是否是Android：'+isAndroid);
		  	console.log('是否是iOS：'+isiOS);
		  	if(isAndroid){
		  		_header.css({"top":"48px"})
		  	}else if(isiOS){
		  		_header.css({"top":"68px"})
		  		
		  	}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
     .mint-navbar{
		 height: 50px;
		 position: relative;
		 top:0!important;
		 left: 0;
		 right: 0;
		 z-index: 100;
		 
	 }
	.navbar{
		width: 100%;height: 100%;
		background: #F1F1F1;
		.barName{
			width: 100%;
			height: 60px;
			text-align: right;
			line-height: 60px;
			button{
				width: 120px;height: 30px;
				background: #F0B23B;
				border-radius: 20px;
				color: #FFF;
				margin-right: 30px;
			}
		}
		.mint-tab-item{
			color:#555354;
			padding: 7px 0;
		}
		.mint-navbar .mint-tab-item.is-selected{
			border-bottom: none;
			margin-bottom: 0;
			color: #F0B23B;
		}
		.mint-tab-container{
			margin-top:0!important; 
			height: auto;
			background: #F1F1F1;
		}
		/*.mint-tab-container-item{
			margin-top:50px!important;
		}*/
		.policyContent{
			width: 100%;height: 125px;
			background: #FFF;
			margin-top: 5px;
			.productCon{
				padding: 15px 10px 0 10px;
				overflow: hidden;
				display: flex;
				.img{
					width: 150px;
					img{
						display: block;
						
					}
				}
				.productTit{
					/*padding-left:10px;*/
					width: 60%;
					p:nth-child(1){
					flex: 0 0 160px;	
					font-size: 10px; 
					color: #3C3A3B;
					font-weight: bold;
					padding-bottom: 10px;
					padding-top:10px;}
					p:nth-child(2){color: #979797;font-size: 10px;padding-bottom: 10px;}
					p span:nth-child(1){color: #C4393C;font-size: 12px;font-weight: bold;padding-right: 10px;}
					p span:nth-child(2){display: inline-block;width: 20px;height: 20px;border-radius: 50%;
						background: #C4393C;color: #FFF;line-height: 20px;text-align: center;font-size: 12px;
						font-weight: bold;}
				}
			}
		}
	}
	.navbar .mint-tab-item{
		color: #3D3938;
	}
</style>