<template>
	<div>
		<CADialog v-show="caValue.isCAOpen" v-model="caValue" @click=""></CADialog>
		<div  v-show="!caValue.isCAOpen">
			<Headerbtns :title="'投保要约更正申请书'">
				<!-- <i class="fa fa-angle-left" @click="go('/backlog')" replace slot="left"></i> -->
				<i class="fa fa-angle-left" @click="back" replace slot="left"></i>
				<i class="fa fa-ellipsis-v back" style="line-height: 55px;font-size: 24px" slot="right" @click="sheetVisible = !sheetVisible" v-clipboard:success="onCopy"
				v-clipboard:error="onError" v-clipboard:copy="shareLink"></i>
				<!-- <i class="fa fa-ellipsis-v back" style="line-height: 55px;font-size: 24px" slot="right" @click="share" v-clipboard:success="onCopy"
				v-clipboard:error="onError" v-clipboard:copy="shareLink"></i> -->
			</Headerbtns>
			<div class="manage-main-contents" style="font-size:12px">
				<p><i class="fa fa-check-circle"></i>  撤件</p>
				<p class="pad-lf">撤件原因：</p>
				<textarea v-model="calCellCause" class="container"  name="" placeholder="请输入变更原因"></textarea>
				<p style="border:1px dashed #000;margin:5%"></p>
				<p class="pad-lf">客户声明:</p>
				<div class="container" >
					<span style="line-height:20px;font-size:12px">&nbsp;&nbsp;&nbsp;本人已阅知、理解公司的相关提示与要求，递此申请书向公司申请办理以上事项，并同意公司以此申请办理相关事宜，申请书与投保书不一致地方，以本申请书为准，同时保证填写内容真实有效。</span><br>
					<p style="text-align:right;padding-top:10px;font-size:12px" v-if="caValue.date != undefined && caValue.date != ''">申请日期：{{caValue.date | dateFilter2}}</p>
				</div>
				<div class="sign">
					<p>投保人签字</p><br>
					<img style="width:200px;height:100px;" id="xss_20" src="../../../static/img/backlog/qianzi.jpg" class="qxImg"@click="faceTest">
				</div>
				<button class="btnn" @click="goRecall">提 交</button>
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
	import alert from '../policy/common/alert.vue'
	import Headerbtns from '../policy/common/Header.vue'
	export default {
	  name: 'recall',
	  components: {Headerbtns,CADialog,alert},
	  data(){
	  	return{
	  		caValue:{
		  			isCAOpen:false,
		  			image:"",
		  			date:""
		  		},
		  	agentCode:"",
		  	applyCode:this.$route.params.applyCode,
		  	orderId:this.$route.params.orderId,
		  	appntName:'',
		  	appntidNo:'',
		  	shareLink:'',
		  	calCellCause:'',//变更信息
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
	  	this.getMsg();
	  	initAnySign('999999');
  	    var res;
  	    // 添加签字对象
  	    res = addSignatureObj(24,"zhangxin","123123123");
  		if(!res) {
  			alert("addSignatureObj error");
  		}
  		//提交配置
  		commitConfig()
  		let host = window.globalConfig.rootUrl.split('/')[2]
  		this.shareLink = "http://" + host + "/com.ifp.ipartner/proposalShare/index.html#/recallShare/"+this.orderId+"/"+this.applyCode+"/-1/-1/-1"
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
	  				// document.getElementById('xss_20').src = val.value
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
  					"applyCode":this.applyCode,
  					"orderId":this.orderId,
  					"policyCode":"",
					"deviceNo":"",
					"imageList":[{
						"imageType":context_id+'CJ',
						"imageName":"签字照片",
						"imageByte":image.substring(22,image.length)
					}]
                }
			  }
			  if(requ.upload.imageList[0].imageByte!=undefined && requ.upload.imageList[0].imageByte!=""){
				utils.http.postFast('MOUPLOAD',requ,(body)=>{
					if(body.resultMessage == "上传影像成功！"){
							if(context_id == 24){
					  			document.getElementById('xss_20').src = ""
					  			document.getElementById('xss_20').src = image
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
	                  "orderCode": this.orderId
	              }
	          }
            utils.http.postFast('MOHQPOLICYMSG',requestParam,(body)=>{
            	let result = body.policy
            	this.appntName = result.custInfo.appnt.appntName
            	this.agentCode = result.agentInfo.agentcode
            	this.appntidNo = result.custInfo.appnt.idNo
            	let idCards = result.custInfo.idCards
            	console.log(idCards,'idcards')
            	if(idCards!=undefined && idCards.length>0){
            		for(var i=0;i<idCards.length;i++){
            			if(idCards[i].imageName == "24CJ"){
            				//投保人
            				var image = document.getElementById('xss_20')
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
  	  		utils.cache.removeItem('recallInfo')
			Wechat.share({
				message: {
					title: "投保要约更正申请书",
					description:"投保要约更正申请书",
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
	  	openCADialog(){
	  		this.caValue.isCAOpen = !this.caValue.isCAOpen
	  		this.caValue.iamge = ""
	  		showPopupDialog(24)
	  	},
	  	faceTest(){
  			MAPlugin.hybridCallAction('hybrid://MAFaceIdentify:401/invokeFaceIdentify?',(callbackSucc)=>{
        		this.ficeDistinguish(callbackSucc)
	        }, (callbackFail)=>{
	    		this.$refs.showalert.showMOdal(callbackFail)
	        });
	  	},
	  	// 进行人脸识别接口调用方法
    	ficeDistinguish:function(image){
    		let requ = {
				"policy": {
					"agentCode":this.agentCode,
					"name":this.appntName,
					"cardId":this.appntidNo,
					"functionCode":"RECALL",
					"imageByte":image,
	   				"applyCode":this.applyCode,
	   				"policyCode":""
            	}
	  		}
	    	console.log('人脸识别请求参数',JSON.stringify(requ))
	        utils.http.postFast('FACEIDKSHL',requ,(body)=>{
	        	if(body.policy.resultCode == '0'){
	        		console.log(body.policy.resultMsg);
	        		this.openCADialog();
	        	}else{
		    		this.$refs.showalert.showMOdal(body.policy.resultMsg)
	        	}
	        })
    	},
	  	//提交撤件
	  	goRecall(){
	  		console.log(this.caValue.image)
	  		if(this.calCellCause == undefined || this.calCellCause == ""){
	    		this.$refs.showalert.showMOdal('请填写撤件原因！')
	  		}else if(this.caValue.image == undefined || this.caValue.image == ""){
	    		this.$refs.showalert.showMOdal('投保人签字不能为空！')
  	  		}else{
		  		let requestParam = {
	                "policy": {
	                    "agentCode": this.agentCode,
	                    "applyCode": this.applyCode,					
						"applicant_signt":this.caValue.image.substring(22),
						// "isCalCell":"",//（预留）
						"appntName":this.appntName,//投保人姓名	
						"calCellCause":this.calCellCause//撤件原因
						}
	            	}
	            	console.log('撤单参数',requestParam)
	            utils.http.postFast('MOPRTCANCLE',requestParam,(body)=>{
	            	let result = body.policy
	            	console.log('撤单返回',result)
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

<style lang='scss' scoped type="text/css" >
	@import 'static/css/backlog/page';
	.manage-main-contents{
		width: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;bottom: 0;
		overflow-y: auto;padding: 15px 5% 0 5%;
	}
	.container{
		margin: 0 auto ;width:90%;padding: 10px 5px;font-size: 16px;
	}
	textarea{
		width:90%;height:100px;display:block;margin-top:10px;font-size:16px;border: 1px solid #000;
	}
	.pad-lf{
		padding-left: 18px;line-height: 28px;
	}
	.sign{margin-top:10%;text-align: center}
</style>