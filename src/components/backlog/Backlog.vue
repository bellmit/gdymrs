<template>
	<div style="background-color:#F5F5F5;font-size:12px">
		<Headerbtns :title="'待办事项'">
			<router-link to="/home" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
	    <div class="manage-main-contents">
	    	<div style="text-align:right;padding:8px 15px 8px 0;position:relative;overflow-y:hidden">
	    		<button id="d1" class="btn color status-p"  @click="ProductList(1)" style="color:#ffffff">未完成</button>
	    		<!-- <p class="warn warn-position1" v-if="unsuccOrder != undefined">{{unsuccOrder.length}}</p> -->
	    		<p class="warn warn-position1" v-if="unsuccOrder != undefined">{{(unsuccOrder.length > 99 ? '99+':unsuccOrder.length)}}</p>
	    		<button id="d2" class="btn color1 txtColor status-p" @click="ProductList(2)" style="color:#ffffff">已完成</button>
	    		<p class="warn warn-position"  v-if="succOrder != undefined">{{(succOrder.length > 99 ? '99+':succOrder.length)}}</p>
	    	</div>
	    	<!-- 未完成列表 -->
	    	<ul class="mar-btm"id="ul1" v-if="unSucList"   v-infinite-scroll="loadMore"
	    	  infinite-scroll-disabled=""
	    	  infinite-scroll-distance="10">
	    		<li>
			    	<ul style="padding:10px;background-color:#fff">
			    		<li class="line-h f-flex">
			    			<span>投保单号</span>
			    			<input class="ipt-border" style="width:70%" v-model='selectInfo.applyCode' type="text" placeholder="请输入想要查询的投保单号" >
			    		</li>
			    		<li  class="line-h f-flex">
			    			<span>主险名称</span>
			    			<div class="ipt-border" style="display:inline-block;width: 70%;height: 30px;padding:0 5px 0 5px;">
			    			  <picker v-model='selectInfo.productCode' :items="productArray" code="productCode" text="productName"></picker>
			    			  <i class="fa fa-angle-down rt-ft" aria-hidden="true" style="line-height:30px;"></i>
			    			</div>
			    		</li>
			    		<li class="line-h f-flex">
			    			<span>投保人姓名</span>
			    				<input class="ipt-border" v-model="selectInfo.holderName" type="text" style="width:70%">
			    		</li>
			    		<li style="text-align:right;padding-top:5px">
			    			<button class="btn bgcolor txtColor statu-p" @click="selectPolicy(1)">查询</button>
			    			<button class="btn bgcolor txtColor statu-p" @click="clearInput">重置</button>
			    		</li>
			    	</ul>
	    		</li>
	    		<li v-if="unsuccOrder.length == 0">
	    			<div style="line-height:100px;text-align:center">
	    				当前列表为空!
	    			</div>
	    		</li>
	    		<li class="ul-li" v-for="(item,index) in unsuccOrder" :key="index">
	    			<div class="f-flex lh">
		    			<span>{{item.applyCode}}</span>
		    			<span v-if="false">{{item.policyCode}}</span>
		    			<span v-if="false">{{item.idCard}}</span>
		    			<span v-if="false">{{item.orderId}}</span>
		    			<div>
		    				<button class="clear btn status-btn" v-if="item.pkState == '5'">转批扣</button>
			    			<button @click="statusChange(item)" class="clear btn status-btn"  v-if="item.status != -1 && item.status != 6 && item.pkState != '5'">
			    			{{item.status | statusFilter}}
			    			</button>
			    			<button @click="statusChange(item)"  v-if="item.status == -1 && item.problemStatue == 91 || item.status == -1 && item.problemStatue == 92 ||  item.status == -1 && item.problemStatue == 93" class="clear btn status-btn">问题件
			    			</button>
			    			<button  @click="statusChange(item)" v-if="item.status == -1 && item.problemStatue == 90" class="clear btn status-btn">
			    				投保初始化状态
			    			</button>
			    			<button @click="statusChange(item)" v-if="item.status == -1 &&  item.problemStatue == 92 || item.status == -1 && item.problemStatue == 93" class="clear btn status-btn">
			    				{{item.problemStatue | statusFilter}}
			    			</button>
		    			</div>
	    			</div>
	    			<div class=" bx-list dashed">
	    				<!-- <img style="width:30%" src="../../../static/img/home/tab2.jpg" alt=""> -->
	    				<!-- <div style="width:68%;">
	    					<p>投保险种：{{item.riskName}}</p>
		    				<p>投保人：{{item.holderName}}</p>
		    				<p>被保人：{{item.insuredName}}</p>
	    				</div> -->
    					<p>投保险种：{{item.riskName}}</p>
	    				<span>投保人：{{item.holderName}}</span>
	    				<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;被保人：{{item.insuredName}}</span>
	    			</div>
	    			<div style="line-height:25px;">
	    				<i class="fa fa-clock-o" aria-hidden="true"></i>
	    				<span>{{item.orderDate}}</span>
	    				<button v-if="item.problemStatue != 91 && item.status == 80 || item.status == 81 || item.status == 82 || item.status == 84" class="btn bgcolor txtColor rt-ft padd"  @click="goFillout(item)">继续填写</button>
	    				<button v-if="item.status == -1 && item.problemStatue == 90" class="btn bgcolor txtColor rt-ft padd"  @click="goFillout(item)">继续填写</button>
	    				<button v-if="item.status == 80 || item.status == 81 || item.status == 82 || item.status == 84" class="btn bgcolor txtColor rt-ft padd"  @click="goDelete(item,index)">删除</button>
	    				<button v-if="item.status == -1 && item.problemStatue == 90" class="btn bgcolor txtColor rt-ft padd" 
	    				 @click="goDelete(item,index)">删除</button>
	    				<button class="btn bgcolor txtColor rt-ft padd"  @click="getStatusRecall(item)" v-if=" item.status == 1 || item.status == -1 && item.problemStatue == 91 || item.status == -1 && item.problemStatue == 92 || item.status == -1 && item.problemStatue == 93">撤件</button>
	    				<button class="btn bgcolor txtColor rt-ft padd"  @click="getStatausDetail(item)" v-if="item.status != 80 && item.status != 81 && item.status != 82 && item.status != 83 && item.status != 84  && item.status != -1 && item.status != 5 &&  item.status != 7 || item.status == 1 && item.pkState == 5">查看</button>
	    				<span v-for="itm in orderId" style="display:none">{{item.orderId}}</span>
	    				<button class="btn bgcolor txtColor rt-ft padd"  @click="getStatusPay(item)" v-if="item.status == 1">支付</button>
	    				<button v-if="item.status == -1 && item.problemStatue == 92 || item.status == 0 && item.problemStatue == 92" class="btn bgcolor txtColor rt-ft padd"  @click="goProblem(item)">问题件回复</button>
	    			</div>
	    		</li>
	    		<li v-show="allSize1 == unsuccOrder.length && unsuccOrder.length>3">
	    			<p style="text-align:center">我是有底线的！</p>
	    		</li>
	    	</ul>
	    	<!-- 已完成列表 -->
	    	<ul class="mar-btm" v-if="sucList" v-infinite-scroll="loadMore"
	    	  infinite-scroll-disabled="loading"
	    	  infinite-scroll-distance="10"
	    		>
	    		<li>
			    	<ul style="padding:10px;background-color:#fff">
			    		<li class="line-h f-flex">
			    			<span>投保单号</span>
			    			<input class="ipt-border" style="width:70%" v-model='selectInfo.applyCodes' type="text" placeholder="请输入想要查询的投保单号" >
			    		</li>
			    		<li  class="line-h f-flex">
			    			<span>主险名称</span>
			    			<div class="ipt-border" style="display:inline-block;width: 70%;height: 30px;padding:0 5px 0 5px;">
			    			  <picker v-model='selectInfo.productCodes' :items="productArray" code="productCode" text="productName"></picker>
			    			  <i class="fa fa-angle-down rt-ft" aria-hidden="true" style="line-height:30px;"></i>
			    			</div>
			    		</li>
			    		<li class="line-h f-flex">
			    			<span>投保人姓名</span>
		    				<input class="ipt-border" v-model="selectInfo.holderNames" type="text" style="width:70%">

			    		</li>
			    		<li style="text-align:right;padding-top:5px">
			    			<button class="btn bgcolor txtColor statu-p" @click="selectPolicy(2)">查询</button>
			    			<button class="btn bgcolor txtColor statu-p" @click="clearInput">重置</button>
			    		</li>
			    	</ul>
	    		</li>
	    		<li v-if="succOrder.length == 0">
	    			<div style="line-height:100px;text-align:center">
	    				当前列表为空!
	    			</div>
	    		</li>
	    		<li class="ul-li" v-for="(item,index) in  succOrder" :key="index" @click="go(item)">
	    			<div class="f-flex lh">
		    			<span>{{item.applyCode}}</span>
		    			<span v-if="false">{{item.policyCode}}</span>
		    			<span v-if="false">{{item.idCard}}</span>
		    			<div>
			    			<button class="btn clear status-btn">
			    			{{item.status | statusFilter}}
			    			</button>
		    			</div>
	    			</div>
	    			<div class=" bx-list dashed">
	    				<!-- <img src="../../../static/img/home/tab2.jpg" style="width:30%"> -->
	    				<p>投保险种：{{item.riskName}}</p>
	    				<!-- <div class="f-flex"> -->
	    				<span>投保人：{{item.holderName}}</span>
	    				<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;被保人：{{item.insuredName}}</span>
	    				<!-- </div> -->

	    			</div>
	    			<div style="line-height:25px;">
	    				<i class="fa fa-clock-o" aria-hidden="true"></i>
		    			<span>{{item.orderDate}}</span>
		    			<button class="btn bgcolor txtColor rt-ft padd"  @click="getStatusReceipt(item)" v-if="item.status != 4 && item.status != 6 && item.status != 7 && item.status != 5">回执</button>
		    			<button class="btn bgcolor txtColor rt-ft padd"  @click="goDetail(item)" v-if="item.status != 6 || item.status == 6 && item.problemStatue == '' ">查看</button>
	    			</div>
	    			
	    		</li>
	    		<li v-show="allSize2 == succOrder.length && succOrder.length>3">
	    			<p style="text-align:center">我是有底线的！</p>
	    		</li>
	    	</ul>
	    </div>
	    <alert ref="showalert"></alert> 
	    <Modal ref="btns" :title="'温馨提示'" :content="hintContent" 
	    @detonate="detonate" @cancel="cancel"></Modal>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import { InfiniteScroll } from 'mint-ui'
	import picker from '../common/Picker.vue'	
	import Headerbtns from '../policy/common/Header.vue'
	import alert from '../policy/common/alert.vue'
	import Modal from '../policy/common/Modal.vue'
	export default {
	  name: 'backlog',
	  components: {Headerbtns,picker,alert,Modal},
	  data(){
	  	return {
	  		productArray:[],
	  		selectInfo:{
	  			holderName:'',//投保人姓名
	  			applyCode:'',//投保单号
	  			productCode:'',//主险名称
	  			holderNames:'',//投保人姓名
	  			applyCodes:'',//投保单号
	  			productCodes:''//主险名称
	  		},
	  		hintContent:'',
	  		idCard:'',//人脸识别要传身份证
	  		sucList:false,
	  		number:1,
	  		index:1,
	  		number1:1,
	  		unSucList:true,
	  		succOrder:[],
	  		unsuccOrder:[],
	  		allSize1:'',
	  		allSize2:'',
	  		array:"",
	  		array1:"",
	  		orderId:'',//支付传orderId获取信息
	  		resStatus:{},
	  		agentCode:utils.cache.get('personsal').agentCode,//代理人编号
	  		itemOrderId:'',
	  		itemApplyCode:''
	  	}
	  },
	  created(){
	  	this.getOrderList(1,this.number);
	  	this.getOrderList(2,this.number1);
	  	this.productLists()
	  },
	  methods:{
		// 修改
		detonate(){
			this.$router.push({name:'product_details_page',params:{planId:this.itemOrderId}})
		},
		// 不修改
		cancel(){
  			this.$router.push({
				path: '/policy/ElectronicsPolicyPage.vue',
				name: 'electronics_policy_page',
				params: {
					planId: this.itemOrderId,
					applyCode:this.itemApplyCode
				}
			})
		},
	  	loadMore() { 
	  	    if (this.index === 1) {
	  	    	if(this.array.length == 10){
	  	    		this.getOrderList(1,++this.number)
	  	    		return
	  	    	}else{
	  	    		console.log('列表加载完毕')
	  	    	}
	  	    }else if(this.index === 2){
	  	    	if(this.array1.length == 10){
	  	    		this.getOrderList(2,++this.number1);
		  	    	return
	  	    	}
	  	    }
	  	},
	  	// 跳转详情
	  	goDetail(item) {
	  		this.$router.push({name:'orderDetail',params:{applyCode:item.applyCode,agentCode:this.agentCode}});
	  	},
	  	// 跳转支付
	  	goPay(item) {
	  		this.$router.push({name:'pay',params:{orderId:item.orderId,applyCode:item.applyCode,agentCode:this.agentCode,holderName:item.holderName,idCard:item.idCard}});
	  	},
	  	// 跳转回执回销
	  	goReceipt(item){
	  		this.$router.push({name:'receipt',params:{orderId:item.orderId,applyCode:item.applyCode}});
	  	},
	  	//撤单
	  	goRecall(item){
	  		utils.cache.removeItem("recallInfo")
	  		this.$router.push({name:'recall',params:{orderId:item.orderId,applyCode:item.applyCode}})
	  	},
	  	//问题件回复
	  	goProblem(item){
	  		utils.cache.removeItem("content1")
	  		utils.cache.removeItem("content2")
	  		utils.cache.removeItem("content3")
	  		utils.cache.removeItem("content4")
	  		this.$router.push({name:'problem',params:{orderId:item.orderId,applyCode:item.applyCode}})
	  	},
	  	//删除保单
	  	goDelete(item,index){
	  		let requestParam = {
					"policy": {
						"orderCode":item.orderId
					}
				}
			console.log(requestParam,'删除请求参数')
			utils.http.postFast('MODELPOLICY',requestParam,(body)=>{
				console.log(body,'删除返回')
				if(body.policy.resultCode == 0){
					this.$refs.showalert.showMOdal(body.policy.resultMsg)
					this.unsuccOrder.splice(index,1)
					if(this.unsuccOrder.length != --this.allSize1){
						this.getOrderList(1,1);
					}
					console.log(this.allSize1,'alllength')
					console.log(this.unsuccOrder.length,"length")
					if(this.unsuccOrder.length == 0){
						this.$refs.showalert.showMOdal("当前列表为空！")
					}
				}else{
					this.$refs.showalert.showMOdal(body.policy.resultMsg)
				}
			})
	  	},
	  	//保单查询
	  	selectPolicy(num){
	  		let requ = null
	  		if(num == 1){
		  		requ = {
	  				"order": {
		                "agentCode": this.agentCode,
					    "docType": "1",
					    "applyCode": this.selectInfo.applyCode,
					    "productCode": this.selectInfo.productCode,
					    "holderName": this.selectInfo.holderName
		                }
	  			}
	  		}else{
		  		requ = {
	  				"order": {
		                "agentCode": this.agentCode,
					    "docType": "2",
					    "applyCode": this.selectInfo.applyCodes,
					    "productCode": this.selectInfo.productCodes,
					    "holderName": this.selectInfo.holderNames
		                }
	  			}
	  		}
  			console.log('查询请求参数',requ)
  			utils.http.post('MOPOLICYLIST',requ).then(response => {
  				if(num == 1){
  					this.allSize1 = response.data.response.allSize
  					this.array = response.data.response.order
  					this.unsuccOrder = this.array
  					console.log(this.allSize1,'alllength')
	  				console.log('获取查询列表',this.array)
	  				console.log(this.allSize1,'allsize')
	  				if(this.unsuccOrder == undefined || this.unsuccOrder == ""){
	  					this.$refs.showalert.showMOdal('未查到该订单!')
	  				}
  				}else{
  					this.allSize2 = response.data.response.allSize
  					this.array1 = response.data.response.order
  					this.succOrder = this.array1
	  				console.log('获取查询列表',this.array1)
	  				if(this.succOrder == undefined || this.succOrder == ""){
	  					this.$refs.showalert.showMOdal('未查到该订单!')
	  				}
  				}
  			}).catch(error => {
  			})
	  	},
	  	// 获取订单列表
	  	getOrderList(num,value){
	  		console.log(value,'value')
		  	let	requ = {
		  			"order": {
		                "agentCode": this.agentCode,
					    "docType": String(num),
					    "num":String(value)
		                }
	  			}
	  		console.log(requ,'请求保单参数')
  			utils.http.post('MOPOLICYLIST',requ).then(response => {
  				if(num == 1){
  					if(value == 1){
  						this.number = 1;
  						this.allSize1 = response.data.response.allSize
  						console.log(this.allSize1,'未完成')
  						this.array = response.data.response.order
  						this.unsuccOrder = [];
  						this.unsuccOrder = this.unsuccOrder.concat(this.array);
  						this.orderId = this.unsuccOrder;
  						this.getStatusAll();
  						console.log(this.number,'number')
  						console.log(this.array.length,'array')
  						console.log(this.unsuccOrder,'未完成')
  					}else{
  						this.allSize1 = response.data.response.allSize
						console.log(this.allSize1,'未完成')
						this.array = response.data.response.order
						this.unsuccOrder = this.unsuccOrder.concat(this.array);
						this.orderId = this.unsuccOrder;
						console.log('array',this.array.length)
						this.getStatusAll();
  					}
  				}else if(num == 2){
				  	this.allSize2 = response.data.response.allSize
				  	this.array1 = response.data.response.order
					this.succOrder = this.succOrder.concat(this.array1);
				  	console.log(this.array1,'已完成=========')
  				}
  				
  			}).catch(error => {
  			})
	  	},
	  	//获取产品列表
	  	productLists(){
				let requ = {
					"personsal": {
        			"agentCode": this.agentCode,
        			"channel": utils.cache.get('personsal').channel
      				}
         		}
         		utils.http.postFast('MOPRODUCTLIST',requ,(body)=>{
	         		console.log(body.personsal)
					let productList_1 = body.personsal.productList1
					let productList_2 = body.personsal.productList2
		      		let productList_3 = body.personsal.productList3
					let productList_4 = body.personsal.productList4
	         		this.productArray = this.productArray.concat(productList_1,productList_2,productList_3,productList_4)
					console.log(this.productArray,'产品列表')

	         	})
	  	},
	  	// 列表按钮切换
	  	ProductList(num){
	  		console.log(num,'----------')
	  		if(num == 1){
	  			this.unSucList = true
		  		this.sucList = false
		  		// this.clearInput();
		  		$('#d1').css({'background':'#F4A200','color':'#fff'})
		  		$('#d2').css({'background':'#BABABA','color':'#fff'})
	  			// this.unsuccOrder = null;
	  		    this.index = 1
	  			// this.getOrderList(1,this.number);
	  			// console.log(this.number,'number')
	  		}else{
	  			this.index = 2
	  			this.unSucList = false
		  		this.sucList = true
		  		// this.clearInput()
		  		$('#d2').css({'background':'#F4A200'})
		  		$('#d1').css({'background':'#BABABA'})
		  		// else{
		  			// this.succOrder = null;
		  			// this.getOrderList(2,this.number1);
		  			// console.log(this.number1,'number1')
		  		// }
	  		}
	  	},
	  	// 点击重置清空文本框
	  	clearInput(){
	  		this.selectInfo.holderName = ''
	  		this.selectInfo.productCode = ''
	  		this.selectInfo.applyCode = ''
	  	},
	  	//继续填写
	  	goFillout(item){
	  		let requestParam = {
                "policy": {
                    "substepNo": "",
                    "orderCode":item.orderId
                }
            }
            console.log('继续填写请求参数',requestParam)
            utils.http.postFast('MOHQPOLICYMSG',requestParam,(body) =>{
            	console.log('继续填写返回报文',body)
            	let result = body.policy
            	console.log('继续填写substepNo',result.substepNo)
            	console.log('继续填写',result)
            	let orgId = utils.cache.get('personsal').orgId
            	let products = result.productInfo.products.product
            	if(products!=undefined && products.length>0){
            		for (var i = 0; i < products.length; i++) {
            			if(products[i].isMaster == 1){
            				utils.cache.set('productCode',products[i].prodCode)
            				break;
            			}
            		}
            	}
            	utils.cache.set('productCodeDetail',item.riskCode)
            	if(result.proposalPlan.holder.desc == ""){
            		result.proposalPlan.holder.desc = '请选择职业'
            	}
            	if(result.proposalPlan.insurantProductList[0].insurant.desc == ""){
            		result.proposalPlan.insurantProductList[0].insurant.desc = '请选择职业'
				}
				let mainProduct = result.proposalPlan.insurantProductList[0].productList[0]
				if(products!=undefined && products.length>0){
            		for (var i = 0; i < products.length; i++) {
						//机瑞宝特殊处理
            			if(products[i].isMaster == 1 && products[i].prodCode == "LBT028"){
							mainProduct.drawAge = products[i].getYear
							mainProduct.drawFreq = products[i].getDutyKind
							mainProduct.drawMode = products[i].getYears
						}
						//安鑫福年
						if(products[i].isMaster == 1 && products[i].prodCode == "NPT006"){
							mainProduct.drawFreq = products[i].getDutyKind
							mainProduct.premium = products[i].prem
							mainProduct.amount = products[i].amnt
						}
						//安鑫囍年
						if(products[i].isMaster == 1 && products[i].prodCode == "NPT011"){
							mainProduct.premium = products[i].prem
						}
					  // 金保安康
					  if(products[i].isMaster == 1 && products[i].prodCode == "LBP017"){
							mainProduct.dividend = products[i].bonusGetMode
							if(products[i].autoPayFlag == "0"){
                              mainProduct.automatic = false
							}else{
								mainProduct.automatic = true
							}
						}
						  // 所有险种只要有红利领取方式的全部特殊处理
					  if(products[i].isMaster == 1 && products[i].bonusGetMode != ""){
							mainProduct.dividend = products[i].bonusGetMode
						}
						//福运百年
						if(products[i].isMaster == 1 && products[i].prodCode == "NEP001"){
							mainProduct.dividend = products[i].bonusGetMode
							mainProduct.drawAge = products[i].getYear
							mainProduct.drawMode = products[i].getYears
							mainProduct.drawFreq = products[i].getDutyKind
						}
						//安康百万
						if(products[i].isMaster == 1 && products[i].prodCode == "HMT038"){
                          mainProduct.rank = products[i].rank
						  console.log(products[i])
						}
						//安康百万和康爱无忧
						if(products[i].isMaster == 1 && (products[i].prodCode == "HMT038"||
						products[i].prodCode == "HDT037" )){
						  mainProduct.isAutoXubao = products[i].rnewFlag
					    if(mainProduct.isAutoXubao == -1){
						        mainProduct.isAutoXubao = -1
					     }else if(mainProduct.isAutoXubao == -2){
						       mainProduct.isAutoXubao = -2
					     }
						}
					  //特殊处理增利宝追加保费和部分领取
					  if(products[i].isMaster!="1" &&products[i].prodCode == "NPU012"){
							let addlist = products[i].addList
							let drawlist = products[i].drawList
							 for(let i=0;i<mainProduct.extraList.length;i++){
								if(mainProduct.extraList[i].productCode == "NPU012"){
									mainProduct.extraList[i].addList = addlist
									mainProduct.extraList[i].drawList =  drawlist
						}
						}
					  }
            		}
            	}
				let  orgAgent= {
			          channel: utils.cache.get('personsal')?utils.cache.get('personsal').channel:'02',
			          deviceNo: "572032449254344960",
			          openId: "xxxx",
			          token: "",
			          agentCode: utils.cache.get('personsal')?utils.cache.get('personsal').agentCode:'1100D12336',
			          agentName:utils.cache.get('personsal')?utils.cache.get('personsal').agentName:'李彩伶',
			          mobile:utils.cache.get('personsal')?utils.cache.get('personsal').mobile:''
					}
					console.log(result.proposalPlan)
				let proposalPlan = result.proposalPlan
				proposalPlan.orgAgent = orgAgent 
				utils.cache.set('proposalPlan', proposalPlan)
        		if(orgId.substring(0,4) == '8661'){//重庆机构
        			this.$router.push({name:'questionnaire_page',params:{planId:item.orderId}})
        		}else if(result.substepNo == 1){
            		this.$router.push({name:'product_details_page',params:{
            			planId:item.orderId
            		}})
            	}else if(result.substepNo == 3){
            		this.$router.push({name:'customer_details_page',params:{
            			planId:item.orderId}})
            	}else if(result.substepNo == 8){
            		this.$router.push({name:'inform_page',params:{planId:item.orderId}})
            	}else if(result.substepNo == 9){
            		this.$router.push({name:'inform_app_page',params:{planId:item.orderId}})
            	}else if(result.substepNo == 'CQ'){
            		this.$router.push({name:'questionnaire_page',params:{planId:item.orderId}})
            	}else if(result.substepNo == 'NB'){
            		this.$router.push({name:'questionnaire_page_nb',params:{planId:item.orderId}})
            	}else if(result.substepNo == 'SH'){
            		this.$router.push({name:'questionnaire_page_sh',params:{planId:item.orderId}})
            	}else if(result.substepNo == 7){
            		 let requ = {
			            "policy": {
			                "agentCode": this.agentCode,
			                "activityid": "",
			                "orderCode": item.orderId
			          }
			        }
			        console.log('请求核保请求参数',requ)
			        utils.http.postFast('MOORDERDEAL',requ,(body)=> {
		          		let policy = body.policy
		          		console.log('请求核保返回',policy);
		          		if(policy.resultCode == "0"){
		          			this.$router.push({
								path: '/policy/ElectronicsPolicyPage.vue',
								name: 'electronics_policy_page',
								params: {
									planId: item.orderId,
									applyCode:policy.applyCode
								}
							})
		          		}else{
		          			this.itemApplyCode = policy.applyCode
		          			this.itemOrderId = item.orderId
		          			this.hintContent = policy.applyCode + "\n" +policy.resultMessage + "\n是否进行修改?"
		          			this.$refs.btns.showMOdal()
		          		}
		        	})
            	}
             })
	  	},
	  	//所有保单状态更新
	  	getStatusAll(){
			let arr = []
	  		this.array.forEach(element=>{
				  let applyCodeAll = element;
				  if(element.applyCode != ""){
					  arr.push({"applyCode" : element.applyCode})
				  }
			  })
			let requestParam = {
				"order": {
					"agentCode": this.agentCode,
					"applyCodeList": arr
				}
			}
			console.log(requestParam,'所有保单状态请求参数')
			utils.http.post('MOPOLICYSTATUE',requestParam).then(response =>{
				let orderList = response.data.response.order
				console.log(orderList,'所有保单状态返回')
				for(var i=0;i<this.array.length;i++){
					let applyCode = this.array[i].applyCode
					if(applyCode!=""){
						for(var j=0;j<orderList.length;j++){
							if(orderList[j].prtNo == applyCode){
								this.array[i].status = orderList[j].state
								console.log("修改为最新状态")
							}
						}
					}
				}
			})
	  	},
	  	//详情查询核心
	  	getStatausDetail(item){
	  		let requestParam = {
                "order": {
                    "agentCode": this.agentCode,
                    "applyCodeList": [
                        { "applyCode": item.applyCode}
                        // {"applyCode": "M511387727975988"}/\
                    ]
                }
            }
            console.log('状态请求参数',requestParam)
            utils.http.post('MOPOLICYSTATUE',requestParam).then(response=>{
            	let result = response.data.response.order
            	console.log('核心状态返回',result)
            	if(result[0].state == item.status){
            		this.goDetail(item);
            	}else{
            		item.status = result[0].state;
            	}
            })
	  	},
	  	// 支付查询核心
	  	getStatusPay(item){
	  		let requestParam = {
                "order": {
                    "agentCode": this.agentCode,
                    "applyCodeList": [
                        { "applyCode": item.applyCode}
                        // {"applyCode": "M511387727975988"}/\
                    ]
                }
            }
            console.log('状态请求参数',requestParam)
            utils.http.post('MOPOLICYSTATUE',requestParam).then(response=>{
            	console.log(response,'核心============')
            	let result = response.data.response.order
            	console.log('核心状态返回',result)
            	if(result[0].state == item.status){
            		this.goPay(item);
            	}else{
            		item.status = result[0].state;
            	}
            })
	  	},
	  	//撤单查询核心
	  	getStatusRecall(item){
	  		let requestParam = {
                "order": {
                    "agentCode": this.agentCode,
                    "applyCodeList": [
                        { "applyCode": item.applyCode}
                        // {"applyCode": "M511387727975988"}/\
                    ]
                }
            }
            utils.http.post('MOPOLICYSTATUE',requestParam).then(response=>{
            	let result = response.data.response.order
            	console.log('撤单核心返回',result)
            	if(result[0].state == item.status){
            		this.goRecall(item)
            	}else{
            		item.status = result[0].state;
            	}
            })
	  	},
	  	//点击状态按钮更新 
	  	statusChange(item){
	  		if(item.applyCode != ""){
		  		let requestParam = {
	                "order": {
	                    "agentCode": this.agentCode,
	                    "applyCodeList": [
	                        { "applyCode": item.applyCode}
	                        // {"applyCode": "M511387727975988"}/\
	                    ]
	                }
	            }
	            utils.http.post('MOPOLICYSTATUE',requestParam).then(response=>{
	            	let result = response.data.response.order
	            	console.log('按钮更新状态',result)
	            	if(result[0].state != item.status){
	            		item.status = result[0].state
	            		console.log(result[0].state)
	            	}

	            	if(result[0].problemState != item.problemStatue){
	            		item.problemStatue = result[0].problemState;
	            		console.log(result[0].problemState)
	            	}
	            	//保单状态为1时才能获取转批扣状态
	            	if(item.status == 1){
	            		if(result[0].payState != item.pkState){
	            			item.pkState = result[0].payState
	            			console.log(result[0].payState,'核心转批扣状态返回')
	            		}
	            	}
	            })
	  		}
	  	},
	  	//回执查询核心
	  	getStatusReceipt(item){
	  		let requestParam = {
                "order": {
                    "agentCode": this.agentCode,
                    "applyCodeList": [
                        { "applyCode": item.applyCode}
                        // {"applyCode": "M511387727975988"}/\
                    ]
                }
            }
            utils.http.post('MOPOLICYSTATUE',requestParam).then(response=>{
            	let result = response.data.response.order
            	console.log('回执核心返回',result)
            	if(result[0].state == item.status){
            		this.goReceipt(item)
            	}else{
            		item.status = result[0].state;
            	}
            })
	  	}
	  }
	}
</script>

<style lang='scss' scoped type="text/css">
	@import 'static/css/backlog/page';
	.text{
		width:50%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.manage-main-contents{
		width: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;bottom: 0;
		background: #F5F5F5;
		overflow-y: auto;
	}
	/* 按钮设置 */
	.btn{
		border-radius: 10px;
		border: 0;
		outline: none;
		font-size: 12px;
	}
	.color{background: #F4A200}
	.color1{background: #BABABA}
	.status-p{padding: 5px 20px;margin:0 5px;font-size: 14px;color: #fff;}
	.statu-p{padding:5px 15px;}
	.padd{padding: 2px 5px;margin:0 2px;}
	.line-h{
		line-height: 30px;
		margin: 5px 0;
	}
	/* 保险列表 */
	.bx-list p{
		line-height: 25px;
		/* padding-left: 100px; */
	}
	.dashed{border:1px dashed #A3A3A3;border-right:0;border-left:0;margin:5px 0;padding:5px 0;}
	ul li.ul-li{
		padding:5px 10px;
		background-color: #fff;margin: 10px 0;
	}
	.bgcolor{
		background: #F4A200;
	}
	.textColor{
		color:#F4A200;
	}
	.txtColor{
		color:#fff;
	}
	.status-btn{
		border: 1px solid #28D4D5;
		background-color: #fff;
		color:#28D4D5 ;
		padding: 5px;
		display: inline-block;
		margin: 0 2px;
	}
	/* 弹出框 */
	.popup{
		width: 80%;line-height: 100px;border-radius: 10px;
		padding: 10px;text-align: center;
	}
	.ipt-border{border:1px solid #C8C7C8;border-radius: 5px;line-height: 30px;
			padding-left: 5px;
		}
	.lh{
		line-height:30px;
	}
	/* 消息数量提醒 */
	.warn{
		width: 25px;
		/* padding: 2px 0px; */
		border-radius: 50%;background-color: #f00;
		color: #fff;text-align: center;line-height: 20px;
	}
	.warn-position{position: absolute;top:3px;right: 10px;}
	.warn-position1{position: absolute;top:3px;right:105px;}
</style>
