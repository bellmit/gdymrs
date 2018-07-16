<template>
	<div style="background-color:#F1F1F1;">
		<Headerbtns :title="'待办事项'">
			<router-link to="/" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
	    <div   class="margin-top">
	    	<div style="text-align:right;padding:8px 15px 8px 0">
	    		<button id="d1" class="btn  bgcolor txtColor status-p"  @click="unsucProductList">未完成</button>
	    		<!-- <p class="warn warn-position1">{{unsuccOrder.length}}</p> -->
	    		<button id="d2" class="btn txtColor status-p" @click="sucProductList" >已完成</button>
	    		<!-- <p class="warn warn-position">{{succOrder.length}}</p> -->
	    	</div>
	    	<!-- 查询列表 -->
	    	<!-- <ul>
	    		<li class="line-bottom f-flex">
	    			<span>投保单号</span>
	    			<input class="rig" type="text" placeholder="请输入想要查询的投保单号">
	    		</li>
	    		<li class="line-bottom f-flex">
	    			<span>主险名称</span>
	    			<div>
	    				<input class="rig" type="text" placeholder="请选择主险名称">
	    				<i class="fa fa-caret-down" aria-hidden="true"></i>
	    			</div>
	    		</li>
	    		<li class="line-bottom f-flex">
	    			<span>投保人姓名</span>
	    			<input  class="rig" type="text" placeholder="请输入投保人姓名">
	    		</li>
	    	</ul> -->
	    	<ul style="padding:10px;background-color:#fff">
	    		<li class="line-h">
	    			<span>投保单号&nbsp;&nbsp;&nbsp;</span>   
	    			<input class="ipt-border" style="width:auto" v-model='iptVal' type="text" placeholder="请输入想要查询的投保单号" >
	    		</li>
	    		<li  class="line-h">
	    			<span>主险名称&nbsp;&nbsp;&nbsp;</span>   
	    			<div  class="ipt-border" style="display:inline-block;width:auto;padding-right:10px;">
	    				<input type="text" v-model='iptVal1' placeholder="请选择主险名称">
    					<i class="fa fa-angle-down rt-ft" aria-hidden="true" style="line-height:30px;"></i>
	    			</div>
	    		</li>
	    		<li class="line-h">
	    			<span>投保人姓名</span>
	    				<input class="ipt-border" v-model='iptVal2' type="text" style="max-width:30%">
	    				<button class="btn bgcolor txtColor status-p" >查询</button>
	    				<button class="btn bgcolor txtColor status-p" @click="clear">重置</button>
	    		</li>
	    	</ul>
	    	<!-- 未完成列表 -->
	    	<ul class="mar-btm" v-show="unSucList">
	    		<li class="ul-li" v-for="(item,index) in unsuccOrder" :key="index" >
	    			<div class="f-flex lh">
		    			<span>{{item.applyCode}}</span>
		    			<div>
			    			<button class="clear btn status-btn statu-p" >
			    			{{item.status | statusFilter}}
			    			</button>
		    			</div>
	    			</div>
	    			<div class="bx-list">
	    				<img style="float:left;vertical-align:middle;" src="../../assets/img/home/tab2.jpg" alt="">
		    				<p style="padding-top:10px;">投保险种：{{item.riskCode}}</p>
		    				<p>投保人：{{item.holderName}}</p>
		    				<p>被保人：{{item.insuredName}}</p>
	    			</div>
	    			<br>
	    			<i class="fa fa-clock-o" aria-hidden="true"></i>
	    			<span>{{item.orderDate}}</span>
	    			<span class="textColor rt-ft "
					v-if="item.status == 80||81||82||83||84">&nbsp;&nbsp;继续填写</span>
	    			<span @click="goDetail(item)" class="textColor rt-ft" v-if="item.status != 80||81||82||83||84">&nbsp;&nbsp;查看</span>
	    			<span @click="go('Pay')" class="textColor rt-ft" v-if="item.status == 1">支付</span>
	    		</li>
	    	</ul>
	    	<!-- 已完成列表 -->
	    	<ul style="margin-bottom:20px;" v-show="sucList">
	    		<li class="ul-li" v-for="(item,index) in  succOrder" :key="index" @click="go(item)">
	    			<div class="f-flex lh">
		    			<span>{{item.applyCode}}</span>
		    			<div>
			    			<button class="btn clear status-btn statu-p">
			    			{{item.status | statusFilter}}
			    			<!-- {{item.status == 0 ? '人核':(item.status == 1 ? '核保成功': (item.status == 2 ? '支付成功': (item.status == 3 ? '承保成功': (item.status == 84 ? '核保失败': (item.status == 80 ? '投保初始化状态' : (item.status == 81 ? '投保校验失败' : (item.status == 82 ? '投保校验成功' : (item.status == 83 ? '试算失败': (item.status == 90 ? '未复核' : (item.status == 91 ? '复核中':(item.status == 92 ? '问题件下发' : '问题件待处理')))))))))))}} -->
			    			</button>
		    			</div>
	    			</div>
	    			<div class="bx-list">
	    				<img style="float:left;" src="../../assets/img/home/tab2.jpg" alt="">
		    				<p style="padding-top:10px;">投保险种：{{item.riskCode}}</p>
		    				<p>投保人：{{item.holderName}}</p>
		    				<p>被保人：{{item.insuredName}}</p>
	    			</div>
	    			<br>
	    			<i class="fa fa-clock-o" aria-hidden="true"></i>
	    			<span>{{item.orderDate}}</span>
	    			<span  @click="goDetail(item)"  class="textColor rt-ft">查看</span>
	    			<span  @click="go('/Receipt')" class="textColor rt-ft">回执&nbsp;&nbsp;</span>
	    			<button class="ss-btn"></button>
	    		</li>
	    	</ul>
	    	<!-- 如果当前状态不可撤单 弹出框 -->
	    	<mt-popup position="center" v-model="show" class="phone_valid popup">
	    	  	<div class="mobileNumber">
	    	  		<div class="mNumber_text">请检查您当前状态</div>
	    	  	</div>
	    	</mt-popup>	
	    </div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../common/Header.vue'
	export default {
	  name: 'backlog',
	  components: {Headerbtns},
	  data(){
	  	return {
	  		sucList:false,
	  		unSucList:true,
	  		show:false,//控制弹框
	  		succOrder:"",
	  		unsuccOrder:"",
	  		policyCode:"",//发送参数  保单号
	  		resStatus:{},
	  		iptVal:'',
	  		iptVal1:'',
	  		iptVal2:''
	  	}
	  },
	  mounted(){
	  	this.getUnsuccOrderList();
	  }, 
	  methods:{
	  	goDetail(item) {
	  		this.$router.push({name:'orderDetail',params:{orderCode:item.applyCode,policyCode:this.policyCode}});
	  	},
	  	// 获取已完成订单列表
	  	getSuccOrderList(){
	  		let requ = {
  			"order": {
                "agentCode": "1100D12336",
			    "docType": "2",
			    "applyCode": "",
			    "productCode": "",
			    "holderName": ""
                }
  			}
  			utils.http.post('MOPOLICYLIST',requ).then(response => {
  				console.log('获取已完成订单列表',response.data.response.order)
  				this.succOrder = response.data.response.order;
  				this.policyCode = this.succOrder[0].policyCode;
  			}).catch(error => {
  				MessageBox({
  					title:'提示',
  					message:'系统异常,请联系管理员!'
  				})
  			})
	  	},
	  	// 获取未完成订单列表
	  	getUnsuccOrderList(){
	  		let requ = {
  			"order": {
                "agentCode": "1100D12336",
			    "docType": "1",
			    "applyCode": "",
			    "productCode": "",
			    "holderName": ""
                }
  			}
  			utils.http.post('MOPOLICYLIST',requ).then(response => {
  				console.log('获取未完成订单列表',response.data.response.order)
  				this.unsuccOrder = response.data.response.order;
  				console.log(this.unsuccOrder)
  			}).catch(error => {
  				MessageBox({
  					title:'提示',
  					message:'系统异常,请联系管理员!'
  				})
  			})
	  	},
	  	// 未完成列表按钮
	  	unsucProductList(){
	  		this.unSucList = true
	  		this.sucList = false
	  		$('#d1').addClass('bgcolor').siblings().removeClass('bgcolor');
	  		this.unsuccOrder = null;
	  		this.getUnsuccOrderList();
	  	},
	  	// 已完成列表按钮
	  	sucProductList(){
	  		this.unSucList = false
	  		this.sucList = true
	  		$('#d2').addClass('bgcolor').siblings().removeClass('bgcolor');
	  		this.succOrder = null;
	  		this.getSuccOrderList();
	  	},
	  	// 点击重置清空文本框
	  	clear(){
	  		this.iptVal='';
	  		this.iptVal1='';
	  		this.iptVal2='';
	  	},
	  	// 保单状态
	  	getStatus(item){
	  		let requestParam = {
                "order": {
                    "agentCode": "1100D12336",
                    "applyCodeList": [
                        { "applyCode": item.applyCode},
                        {"applyCode": "M511387727975988"}
                    ]
                }
            }
            utils.http.post('MOPOLICYSTATUE',requestParam).then(response=>{
            // 	this.resStatus = {
            //     "agentCode": "",
            //     "order": [
            //         {
            //             "contNo": "120004680288",
            //             "prtNo": "M120167539361488",
            //             "state": "3",
            //             "reason": "",
            //             "otherCode": "Y",
            //             "otherMessage": "",
            //             "payState": " ",
            //             "payMessage": " ",
            //             "acceptDate": "2017-05-11",
            //             "valiDate": "2017-05-12",
            //             "customGetPolDate": "2017-05-11"
            //         },
            //         {
            //             "contNo": "510002674288",
            //             "prtNo": "M511387727975988",
            //             "state": "",
            //             "reason": "",
            //             "otherCode": "Y",
            //             "otherMessage": "",
            //             "payState": " ",
            //             "payMessage": " ",
            //             "acceptDate": "2017-03-23",
            //             "valiDate": "2017-03-24",
            //             "customGetPolDate": "2017-03-23"
            //         }
            //     ]
            // }
            	let result = response
            	console.log('核心状态返回',result)
            })
	  	}
	  }
	}
</script>

<style lang='scss' scoped type="text/css">
	@import 'src/assets/css/page';
	/* 按钮设置 */
	.btn{
		border-radius: 10px;
		border: 0;
		/* padding: 5px 15px; */
	}
	.status-p{padding: 5px 20px;}
	.statu-p{padding:5px;}
	.line-h{
		line-height: 40px;
	}
	/* 保险列表 */
	.bx-list p{
		line-height: 25px;
		padding-left: 100px;
	}
	ul li.ul-li{
		padding:10px;
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
		width: 20px;height: 20px;
		border-radius: 50%;background-color: #f00;
		color: #fff;text-align: center;line-height: 20px;
	}
	.warn-position{position: absolute;top:70px;right: 10px;}
	.warn-position1{position: absolute;top:70px;right:95px;}
</style>