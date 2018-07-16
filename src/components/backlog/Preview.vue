<template>
	<div>
		<body style="font-size:12px">
			<h2 style="margin-top:20%;text-align:center;font-size:18px">银行账户变更确认书</h2><br>	
		    <div style="width: 90%;margin-left: 5%;line-height:20px;">
		        <p style="text-align: right">单证类型:3012301</p>
		        <h2 style="margin-top: 15px;">光大永明人寿保险有限公司</h2>
		        <p>尊敬的<span class="counterName">{{payChangeInfo.custInfo.appnt.appntName}}</span><span class="counterSex">{{payChangeInfo.custInfo.appnt.appntSex == 1 ? '先生' : '女士'}}</span>：</p>
		        <p style="text-indent: 2em;margin-top: 5px">
		        本公司根据您的转账授权从您提供的 <span class="bankName">{{payChangeInfo.productInfo.newBankCode | bankFilter}} </span>的银行账号 <span class="bankCode">{{payChangeInfo.productInfo.newBankAccNo}}</span> 中划转首期保险费,请您核实:
		        <p>投保书号：<span class="policyCode">{{payChangeInfo.applyCode}}</span></p>
		        <p>投保人姓名：<span class="counterName">{{payChangeInfo.custInfo.appnt.appntName}}</span></p>
		        <p style="">证件类型：<span class="cerdTypeName">{{payChangeInfo.custInfo.appnt.idType | Notype}}</span></p>  <p>证件号码：<span class="policyCode">{{payChangeInfo.custInfo.appnt.idNo}}</span></p>
		        <p style="width: 100%;display: inline-block">开户银行：<span class="bankName">{{payChangeInfo.productInfo.newBankCode  | bankFilter}}</span></p>  <p style="width: 100%;display: inline-block">账户姓名：<span class="counterName">{{payChangeInfo.productInfo.bankAccName}}</span></p>
		        <p>结算账户号码：<span class="bankCode">{{payChangeInfo.productInfo.newBankAccNo}}</span></p>
		        <p style="text-indent: 2em">如您已详细阅读本确认书,对其内容已全部了解且同意并亲笔签名确认,我公司将其作为投保事项的补充说明。</p>
		        <!-- <img id="xss_20" style="width:240px;height:140px;" class="qxImg" src="../../../static/img/backlog/qianzi.jpg" alt=""> -->
		    </div>
		    <button @click="back()" class="footer">确定</button>
		</body>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	export default {
	  name: 'preview',
	  components: {Headerbtns},
	  data(){
	  	return{
	  		payChangeInfo:JSON.parse(this.$route.params.payChangeInfo),
	  	}
	  },
	  mounted(){
	  	console.log(this.payChangeInfo)
	  }
	}
</script>

<style lang='scss' scoped type="text/css">
	@import 'static/css/backlog/page';
	/* .btn{
		display: block;
		padding: 5px 10px;border-radius: 5px;
		margin: 20px auto;
	} */
	
</style>