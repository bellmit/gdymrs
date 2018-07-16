<template>
	<div class="margin-top" style="font-size:12px">
		<CADialog v-show="caValue.isCAOpen" v-model="caValue" @click=""></CADialog>
		<div v-show="!caValue.isCAOpen">
			<Headerbtns :title="'保险合同签收单'">
				<i class="fa fa-angle-left" @click="go('/backlog')" replace slot="left"></i>
				<i class="fa fa-ellipsis-v back" style="line-height: 55px;font-size: 24px" slot="right" @click="sheetVisible = !sheetVisible" v-clipboard:success="onCopy"
						v-clipboard:error="onError" v-clipboard:copy="shareLink"></i>
			</Headerbtns>
			<div class="manage-main-contents">
				<p class="text-mar">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本人于今日收到贵公司送达的人寿保险合同，保险单号码为：{{policyCode}} , 经核实该保险单合同所列各项内容均准确无误，本人予以签收。
				</p>
				<p style="text-align:right;padding:0 15px;font-size:12px;" v-if="caValue.date != undefined && caValue.date != ''">申请日期：{{caValue.date | dateFilter2}}</p>
				<div class="sign">
					<p>投保人签字</p><br>
					<img style="width:140px;height:120px;" id="xss_24"  src="../../../static/img/backlog/qianzi.jpg" class="qxImg" @click="faceTest">
				</div>
				<div class="footer" @click="receipt">提交</div>
			</div>
			<alert ref="showalert"></alert>
			<mt-actionsheet
						:actions="actions"
						v-model="sheetVisible">
			</mt-actionsheet>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import { Actionsheet } from 'mint-ui'
	import CADialog from '../common/CADialog'
	import Headerbtns from '../policy/common/Header.vue'
	import alert from '../policy/common/alert.vue'
	export default {
	  name: 'receipt',
	  components: {Headerbtns,CADialog,alert},
	  data(){
	  	return {
	  		caValue:{
		  			isCAOpen:false,
		  			image:"",
		  			date:""
		  		},
		  		shareLink:'',
		  		agentCode:'',
		  		policyCode:'',
		  		appnt:{
		  			appntName:'',
		  			appntIdno:''
		  		},
			  	sheetVisible:false,
			  	actions:[
						{
							name:"刷新页面",
							method:this.load
						},
						{
							name:"提取签字",
							method:this.load
						},
						{
	                            name:"分享链接",
	                            method:this.share
	                            }
				],
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
    		this.getMsg();
    		let host = window.globalConfig.rootUrl.split('/')[2]
    		this.shareLink = "http://" + host + "/com.ifp.ipartner/proposalShare/index.html#/receiptShare/"+this.$route.params.orderId+"/"+this.$route.params.applyCode+"/-1/-1/-1"
  	  },
	  computed:{
		  	caInfo(){
		  		return this.caValue.image
		  	}
	  },
	  watch:{
	  	caInfo(val, oldval){
	  		if(val != null){
		  		if(val.value != null){
	  				this.imageUpload(val.context_id,val.value)
	  				// document.getElementById('xss_24').src = val.value
		  		}
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
  	  	load(){
  	  		window.location.reload();
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
							if(context_id == 24){
					  			document.getElementById('xss_24').src = ""
					  			document.getElementById('xss_24').src = image
					  			this.caValue.image = image
			  	  			}
						}
					})
				}
			}
		},
  	  	getMsg(){
			let requestParam = {
	              "policy": {
	                  "substepNo": "",
	                  "orderCode": this.$route.params.orderId
	              }
	          }
	          utils.http.postFast('MOHQPOLICYMSG',requestParam,(body)=>{
	          	let result = body.policy
	          	this.policyCode = result.policyCode
	          	this.agentCode = result.agentInfo.agentcode
	          	this.appnt.appntName = result.custInfo.appnt.appntName
	          	this.appnt.appntIdno = result.custInfo.appnt.idNo
	          	console.log(result,'===========')
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
  	  	toast:function(msg){
  	  		Toast({
  	  			message: msg,
  	  			duration: 1500
  	  		});
  	  	},
  	  	share:function(){
			Wechat.share({
				message: {
					title: "保险合同签收单",
					description:"保险合同签收单",
					thumb: "www/static/img/common/0.png",
					mediaTagName:'链接',
					media: {
						type: Wechat.Type.WEBPAGE,
						webpageUrl:this.shareLink 
					}
				},
			scene: Wechat.Scene.SESSION    // share to Timeline
			}, function () {
				utils.ui.modal.afterOpen()
				MessageBox({
					title: '提示',
					message: '分享成功'
				}).then(()=>{
				utils.ui.modal.beforeClose()
				})
			}, function (reason) {
				utils.ui.modal.afterOpen()
				MessageBox({
					title: '提示',
					message: reason
				}).then(()=>{
				utils.ui.modal.beforeClose()
				})
			});
  	  	},
  	  	onCopy:function(e){
  	  	//     this.toast('分享链接已拷贝!');
  	  	 },
        onError:function(e){
            this.toast('分享链接拷贝失败');
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
					"name":this.appnt.appntName,
					"cardId":this.appnt.appntIdno,
					"functionCode":"RECEIPT",
					"imageByte":image,
	   				"applyCode":this.$route.params.applyCode,
	   				"policyCode":this.policyCode
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
  	  	openCADialog(){
  	  		this.caValue.isCAOpen = !this.caValue.isCAOpen
  	  		this.caValue.iamge = ""
  	  		showPopupDialog(24)
  	  	},
  	  	receipt(){
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
	            	let result = body.policy
	            	console.log('提交回执返回',result)
	            	if(result.resultCode == 0){
			    		this.$refs.showalert.showMOdal(result.resultMessage)
			    		setTimeout(()=>{
			    			this.$router.push('/backlog')
			    		},1000)
	            	}else if(result.resultCode != 0){
			    		this.$refs.showalert.showMOdal(result.resultMessage)
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