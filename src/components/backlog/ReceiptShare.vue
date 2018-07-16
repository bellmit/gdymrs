<template>
	<div class="margin-top" style="font-size:12px">
		<CADialog v-show="caValue.isCAOpen" v-model="caValue" @click=""></CADialog>
		<div v-show="!caValue.isCAOpen">
			<Headerbtns :title="'保险合同签收单'">
			<!-- <router-link to="/backlog" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link> -->
			</Headerbtns>
			<div class="manage-main-contents">
				<p class="text-mar">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本人于今日收到贵公司送达的人寿保险合同，保险单号码为：{{policyCode}} , 经核实该保险单合同所列各项内容均准确无误，本人予以签收。
				</p>
				<p style="text-align:right;padding:0 15px;font-size:12px;" v-if="caValue.date != undefined && caValue.date != ''">申请日期：{{caValue.date | dateFilter2}}</p>
				<div class="sign">
					<p>投保人签字</p><br>
					<a :href="href.sign24" >
						<img style="width:200px;height:120px;" id="xss_24" :src="wrting" class="qxImg">
					</a>
				</div>
				<button class="footer" @click="receipt">提交</button>
			</div>
		</div>
		<alert ref="showalert"></alert>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import CADialog from '../common/CADialog'
	import Headerbtns from '../policy/common/Header.vue'
	import alert from '../policy/common/alert.vue'
	export default {
	  name: 'receiptShare',
	  components: {Headerbtns,CADialog,alert},
	  data(){
	  	return {
	  		caValue:{
		  			isCAOpen:false,
		  			image:"",
		  			date:""
		  		},
		  	signImgs:{
		  		agent_signt:''
		  	},
	  		href:{
	  			sign24:"http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ=="
	  		},
		  	wrting:'data:image/jpeg;base64,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',
		  	policyCode:"",
		  	agentCode:"",
		  	appntName:"",
		  	appntIdno:"",
		  	appntIdType:"",
		  	applyCode:""
	  	}
	  },
  	  beforeMount(){
  	  		initAnySign('999999');
    	    var res;
    	    // 添加签字对象
    	    res = addSignatureObj(24,"zhangxin","123123123");
    		if(!res) {
    			alert("addSignatureObj error");
    		}
    		//提交配置
    		commitConfig()
  	  },
  	  mounted(){
  	  		this.getMsg();
  	  },
	  computed:{
		  	caInfo(){
		  		return this.caValue.image
		  	}
	  },
	  watch:{
	  	caInfo(val, oldval){
	  		if(val != undefined){
	  			this.imageUpload(val.context_id,val.value)
	  		}
	  	},
  	  	'caValue.date': {
  	  		handler(val,oldval) {
	  			if(val != oldval){
	  				this.date = val
	  			}
  	  		},
  	  		deep: true
  	  	},
	  },
  	  methods:{
  	  	getMsg(){
	  		let requestParam = {
                "policy": {
                    "substepNo": "",
                    "orderCode":this.$route.params.orderId
                }
            }
            utils.http.post("MOHQPOLICYMSG",requestParam).then(response=>{
            	let result = response.data.response.policy
            	let idCards = result.custInfo.idCards
            	console.log(idCards,'idcards')
            	if(idCards!=undefined && idCards.length>0){
            		for(var i=0;i<idCards.length;i++){
            			if(idCards[i].imageName == "24HZ"){
            				//投保人
            				var image = document.getElementById('xss_24')
            				image.setAttribute('crossOrigin', 'anonymous');
            				image.src = ""
            				image.src = idCards[i].reaPath
            				let than = this
            				image.onload =function() {
            					var data = than.getBase64Image(image)
            					than.caValue.image = data
            				}
            			}
            		}
            	}
            	console.log(result,'===================')
				this.appntName = result.custInfo.appnt.appntName
	  			this.appntIdno = result.custInfo.appnt.idNo
	  			this.appntIdType = result.custInfo.appnt.idType
	  			this.policyCode = result.policyCode
	  			this.agentCode = result.agentInfo.agentcode
	  			this.applyCode = result.applyCode
	  			console.log(this.appntIdType)
	  			let sign24Str = this.appntName
	  			  +"-"+ this.appntIdno
	  			  +"-"+ this.appntIdType
	  			  +"-"+ this.$route.params.orderId
	  			  +"-"+ this.$route.params.applyCode
	  			  +"-"+ 24 +"-"+ 3 
	  			console.log(sign24Str,'---------')
	  			let host = window.globalConfig.rootUrl.split('/')[2]
	  			this.href.sign24 = "http://" + host + "/com.ifp.ipartner/faceid/" + window.Base64.encode(sign24Str)
	  			if(this.$route.params.result != -1){//识别成功失败标识0成功1失败
	  				//成功打开签字框
	  				if(this.$route.params.result == 0){
	  					if(this.$route.params.index != -1){//根据回传的签字标识打开对应的签字框
	  						this.openCADialog(this.$route.params.index)
	  					}
	  				}else{//失败进行提示
	  					var resultmsg = this.$route.params.resultmsg
	  					if(resultmsg != -1){
	  						Toast({
	  							message: resultmsg,
	  							duration: 2000
	  						});
	  					}
	  				}
	  			}
            })
  	  	},
  	  	getBase64Image:function(img) {
  	  		var canvas = document.createElement("canvas");
  	  		canvas.width = img.width;
  	  		canvas.height = img.height;
  	  		var ctx = canvas.getContext("2d");
  	  		ctx.drawImage(img, 0, 0, img.width, img.height);
  	  		var dataURL = canvas.toDataURL("image/png");
  	  		return dataURL
  	  		// return dataURL.replace("data:image/png;base64,", "");
  	  	},
  	  	imageUpload:function(context_id,image){
  	  		if(image!=undefined && image!=""){
  	  			let requ = {
  	  			"upload": {
  	  				"agentCode":"",
  	  				"applyCode":this.$route.params.applyCode,
  	  				"orderId":this.$route.params.orderId,
  	  				"policyCode":"",
  	  				"deviceNo":"",
  	  				"imageList":[{
  	  					"imageType":context_id+'HZ',
  	  					"imageName":"签字照片",
  	  					"imageByte":image.substring(22,image.length)
  	  				}]
  	  	}
  	  		  }
  	  		  if(requ.upload.imageList[0].imageByte!=undefined && requ.upload.imageList[0].imageByte!=""){
  	  			utils.http.postFast('MOUPLOAD',requ,(body)=>{
  	  				if(body.resultMessage == "上传影像成功！"){
  	  						if(context_id == "24"){
  	  							//业务人员
  	  							document.getElementById('xss_24').src = ""
  	  							document.getElementById('xss_24').src = image
  	  							this.caValue.image=image
  	  						}
  	  					}
  	  				})
  	  			}
  	  		}
  	  	},
	  	faceTest(){
  			MAPlugin.hybridCallAction('hybrid://MAFaceIdentify:401/invokeFaceIdentify?',(callbackSucc)=>{
        		this.ficeDistinguish(callbackSucc)
	        }, (callbackFail)=>{
	    		this.$refs.showalert.showMOdal(callbackFail)
	        });
	  	},
	  	//进行人脸识别接口调用方法
    	ficeDistinguish:function(image){
    		let requ = {
				"policy": {
					"agentCode":this.agentCode,
					"name":this.appntName,
					"cardId":this.appntIdno,
					"functionCode":"RECEIPT",
					"imageByte":image,
	   				"applyCode":this.applyCode,
	   				"policyCode":this.policyCode,
	   				"idType":this.appntIdType
            	}
	  		}
	    	console.log(JSON.stringify(requ))
	        utils.http.postFast('FACEIDKSHL',requ,(body)=>{
	        	if(body.policy.resultCode == '0'){
	        		console.log(body.policy.resultMsg);
	        		this.openCADialog();
	        	}else{
		    		this.$refs.showalert.showMOdal(body.policy.resultMsg)
	        	}
	        })
    	},
  	  	openCADialog(num){
  	  		this.caValue.isCAOpen = !this.caValue.isCAOpen
  	  		this.caValue.iamge = ""
  	  		showPopupDialog(num)
  	  	},
  	  	receipt(){
  	  		console.log('签字',this.caValue.image)
  	  		if(this.caValue.image == undefined || this.caValue.image == ""){
	    		this.$refs.showalert.showMOdal('投保人签字不能为空！')
  	  		}else{
  	  			let requestParam = {
	                "policy": {
	                    "agentCode": this.agentCode,
	                    "policyCode": this.policyCode,					
						"applicant_signt":this.caValue.image.substring(22)
	                }
	            }
	            console.log('提交参数',requestParam)
	            utils.http.postFast('MORECEIPT',requestParam,(body)=>{
	            	let policy = body.policy
	            	if(policy.resultCode == 0){
			    		this.$refs.showalert.showMOdal('回执成功,请关闭页面！')
			    		$('.footer').prop('disabled',true)
			    		$('.footer').css({'opacity':0.5})
	            	}else{
	            		this.$refs.showalert.showMOdal(policy.resultMessage)
	            	}
	            })
  	  		}
  	  	}
  	  }
	}
</script>

<style lang='scss' scoped type="text/css">
	@import 'static/css/backlog/page';
	.manage-main-contents{
		width: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;bottom: 0;
	}
	.text-mar{
		margin: 25%  15px 10% 15px;
	}
	.sign{margin:30% auto;text-align: center}
</style>