<template>
	<div style="background:#F5F5F5;">
		<Headerbtns :title="'保单详情'">
			<router-link to="/" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<ul class="margin-top mar-btm">
			<li>
				<div  @click="expand = !expand" v-for="item in insuInfo">
					<p  @click="toggleContent"><i class="fa fa-user logo-color" aria-hidden="true"></i>  &nbsp;&nbsp;被保人信息<i class="fa fa-angle-double-up rt-ft logo-color" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand?'rotate(180deg)':''}"></i></p>
					<div v-show="!contentShow" style="height: 5px;background: #FEB101;"></div>
					<div v-show="contentShow" @click="expand = !expand" class="border">
						<div class="bd-btm f-flex">
							<span>{{item.insuName}}</span>
							<span>{{item.insuSex == 1 ? '女':'男'}}</span>
							<span>{{item.insuBirthday}}</span>
						</div>
						<p>证件类型：{{item.insuIDType}}</p>
						<p>证件号码：{{item.insuIDNo}}</p>
						<p>职业代码：{{item.insuProfession}}</p>
						<p>手机号码：{{item.insuMoblie}}</p>
					</div>
				</div>
				<div  @click="expand1 = !expand1">
					<p @click="toggleContent1"><i class="fa fa-user logo-color" aria-hidden="true"></i> &nbsp;&nbsp; 投保人信息<i class="fa fa-angle-double-up rt-ft logo-color" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand1?'rotate(180deg)':''}"></i></p>
					<div v-show="!contentShow1" style="height: 5px;background: #FEB101;"></div>
					<div v-show="contentShow1" @click="expand = !expand" class="border">
						<div class="bd-btm f-flex">
							<span>{{appntInfo.appntName}}</span>
							<span>{{appntInfo.appntSex == 1 ? '女':'男'}}</span>
							<span>{{appntInfo.appntBirthday}}</span>
						</div>
						<p>证件类型：{{appntInfo.appntIDType}}</p>
						<p>证件号码：{{appntInfo.appntIDNo}}</p>
						<p>职业代码：{{appntInfo.appntProfession}}</p>
						<p>手机号码：{{appntInfo.appntMobile}}</p>
					</div>
				</div>
				<div @click="expand2 = !expand2" v-for="item in riskInfo">
					<p @click="toggleContent2"><i class="fa fa-file-text-o logo-color" aria-hidden="true"></i> &nbsp;&nbsp;险种信息<i class="fa fa-angle-double-up rt-ft logo-color" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand2?'rotate(180deg)':''}"></i></p>
					<div v-show="!contentShow2" style="height: 5px;background: #FEB101;"></div>
					<div v-show="contentShow2" @click="expand = !expand" class="border">
						<p>险种名称：{{item.riskName}}</p>
						<p>交费期间：{{item.cValiDate}}</p>
						<p>保险期间：{{item.endDat}}</p>
						<p>交费频次：{{item.payIntv}}</p>
						<p>基本保险金额(元/份)：{{item.amnt}}</p>
						<p>保费(元)：{{item.prem}}</p>
					</div>
				</div>
				<div v-for="item in bnfInfo">
					<p><i class="fa fa-user logo-color" aria-hidden="true"></i> &nbsp;&nbsp;身故受益人：{{item.bnfNam}}</p>
				</div>
				<div @click="expand3 = !expand3">
					<p  @click="toggleContent3">
						<i class="fa fa-credit-card logo-color" aria-hidden="true"></i>&nbsp;&nbsp;缴费信息
						<i class="fa fa-angle-double-up rt-ft logo-color" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand3?'rotate(180deg)':''}"></i>
					</p>
					<div v-show="!contentShow3" style="height: 5px;background: #FEB101;"></div>
					<div v-show="contentShow3" @click="expand = !expand" class="border"style="border-bottom:0">
						<p>缴费方式：{{orderDetail.payMode == 3 ? '银行转账':(orderDetail.payMode == 1 ? '现金':(orderDetail.payMode == 2 ? '支票':(orderDetail.payMode == 4 ? '网银':'内部转账')))}}</p>
						<p>付款银行：{{orderDetail.bankName}}</p>
						<p>户名：{{orderDetail.bankAccName}}</p>
						<p>账号：{{orderDetail.bankAccNo}}</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../common/Header.vue'
	export default {
	  name: 'look',
	  components: {Headerbtns},
	  props:{
			open:{
				type:Boolean,
				default:false
			}
	  	},
	  data(){
	  	return {
	  		orderDetail:"",//保单详情
	  		insuInfo:null,//被保人信息
	  		riskInfo:null,//险种信息
	  		bnfInfo:null,//受益人
	  		appntInfo:"",//投保人信息
	  		contentShow:true,
	  		contentShow1:true,
	  		contentShow2:true,
	  		contentShow3:true,
	  		expand: this.open,
	  		expand1: this.open,
	  		expand2: this.open,
	  		expand3: this.open
	  	}
	  },
	  methods:{
	  	// 控制列表显示 隐藏
	  	toggleContent:function(){
			this.contentShow = !this.contentShow;
		},
	  	toggleContent1:function(){
			this.contentShow1 = !this.contentShow1;
		},
	  	toggleContent2:function(){
			this.contentShow2 = !this.contentShow2;
		},
	  	toggleContent3:function(){
			this.contentShow3 = !this.contentShow3;
		},
		// 获取保单列表详情
		policyDetail(){
		  	let requestParam = {
	                "order": {
	                    "agentCode": "",
	                    "applyCode": this.$route.params.orderCode,
	                    "policyCode":this.$route.params.policyCode
	                }
	            }
	         utils.http.postFast('MOPOLICYDETAIL',requestParam,(body)=>{
	         	this.orderDetail = body.order;
	         	this.insuInfo = this.orderDetail.insuInfo;
	         	this.riskInfo = this.orderDetail.riskInfo;
	         	this.bnfInfo = this.orderDetail.bnfInfo;
	         	this.appntInfo = this.orderDetail.appntInfo;
	         	console.log('保单详情数据请求',this.orderDetail);
	         })
		}
	  },
	  mounted(){
	  	this.policyDetail();
	  }
	}
</script>

<style lang='scss' scoped type="text/css" >
	@import 'src/assets/css/page';
	.padd{padding:2%;}
	li>div>p{
		font-size: 16px;
		padding:10px 20px;
	}
	li>div>div{
		padding:3px 25px;
		line-height: 25px;
	}
	.logo-color{color: #FFB101;}
	.border{
		border-top: 1px solid #E4E4E4;
		border-bottom: 1px solid #E4E4E4;
		background: #fff;width: 100%;
	}
	.bd-btm{
		border-bottom: 1px dashed #A2A2A2;line-height: 30px;
	}
</style>