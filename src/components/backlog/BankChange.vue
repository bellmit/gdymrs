<template>
	<div style="font-size:12px">
		<CADialog v-show="caValue.isCAOpen" v-model="caValue" ></CADialog>
		<div v-show="!caValue.isCAOpen">
			<Headerbtns :title="'银行变更确认'">
			   <span replace slot="left" class="back" @click="goPay"><i class="fa fa-angle-left"></i></span>
			   <i class="fa fa-ellipsis-v back" style="line-height: 55px;font-size: 24px" slot="right" @click="sheetVisible = !sheetVisible" v-clipboard:success="onCopy"
			   		v-clipboard:error="onError" v-clipboard:copy="shareLink"></i>
			</Headerbtns>
			<div class="manage-main-contents">
				<ul>
					<li class="line-bottom f-flex">
						<span>支付保费</span>
						<span>{{payChangeInfo.productInfo.sumPremL}}</span>
					</li>
					<li class="line-bottom f-flex">
						<span>投保人</span>
						<span>{{payChangeInfo.custInfo.appnt.appntName}}</span>
					</li>
					<li class="line-bottom f-flex" v-for="item in payChangeInfo.custInfo.insurants.insurant">
						<span>被保险人</span>
						<span>{{item.name}}</span>
					</li>
					<li class="line-bottom f-flex"  v-if="item.isMaster == 1" v-for="item in payChangeInfo.productInfo.products.product">
						<span>投保险种</span>
						<span>{{item.prodName}}</span>
					</li>
					<li class="line-bottom f-flex">
						<span>付款银行</span>
						<div>
							<span>
								<div style="width: 100%;height: 30px;border-radius: 8px;padding:0 5px;border: 1px solid #E7A545;line-height:30px;">
								  <picker v-model="payChangeInfo.productInfo.newBankCode" :items="dict.bankList.bank.item" code="code" text="text"></picker>
								  <i class="fa fa-angle-down rt-ft" aria-hidden="true" style="line-height:30px;"></i>
								</div>
							</span>
						</div>
					<li class="line-bottom f-flex">
						<span>付款卡号</span>
						<input type="text" v-model="payChangeInfo.productInfo.newBankAccNo" placeholder="请输入银行卡号" style="text-align:rigth;" 
						>
					</li>
				</ul>
				<div style="text-align:center;margin-top:20px;">
					<p>投保人签字</p>
					<img id="xss_20" style="width:150px;height:140px;" class="qxImg" src="../../../static/img/backlog/qianzi.jpg" alt="" @click="faceTest">
					<p>上传银行卡影像</p>
					<p style="margin:10px auto">
						<img ref="bankPositive" id="bankPositive" @click="select(1)" class="qxImg img1" src="../../../static/img/backlog/yhk1.jpg" style="width:140px;height:100px;">
						<img ref="bankNegative" id="bankNegative" @click="select(2)" src="../../../static/img/backlog/yhk2.jpg" alt="" style="width:140px;height:100px;">
					</p>
					<mt-popup position="center" v-model="Show" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                     background: #fff;top:80%;left: 50%;">
						<button class="photo" @click="getNewPhotos(1)">从相册选择</button>
						<hr>
						<button class="photo" @click="capturePhoto(1)">拍照</button>
					</mt-popup>
					<mt-popup position="center" v-model="Show1" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                  background: #fff;top:80%;left: 50%;">
						<button class="photo" @click="getNewPhotos(2)">从相册选择</button><hr>
						<button class="photo" @click="capturePhoto(2)">拍照</button>
					</mt-popup>
					<p><input type="checkbox" style="border:#F4A200" @change="btnStatus" v-model="check">  投保人已预览并确认<a style="color:#F4A200"  @click="goPreview">《银行变更确认书内容》</a></p>
					<input type='button' class="btnFoote" @click="payRequest" value='立即付款'/>
				</div>
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
	import alert from '../policy/common/alert.vue'
	import Headerbtns from '../policy/common/Header.vue'
	import picker from '../common/Picker.vue'
	import CADialog from '../common/CADialog'
	import camera from '../../../static/js/cordova_camera.js'
	import bankList from "../../../static/dict/bank_sunlife.json"
	export default {
	  name: 'bankChange',
	  components: {Headerbtns,picker,CADialog,alert},
	  data(){
	  	return {
	  		Show:false,
	  		Show1:false,
	  		caValue:{
	  			isCAOpen:false,
	  			image:""
	  		},
	  		bankImage:{
	  			positive:"",
	  			negative:""
	  		},
	  		check:false,
	  		dict:{
	  			bankList:bankList,
	  		},
	  		payChangeInfo:{
	  			applyCode:"", 			
	  			productInfo:{
	  				sumPremL:"",//支付保费
	  				products:"",
	  				bankAccName:"",
	  				products:{
	  					product:[]
	  				},
	  				newBankAccNo:"",//新卡号
	  				newBankCode:"",//银行字典code
	  			},
	  			custInfo:{
	  				appnt:{
	  					appntName:"",
	  					idNo:"",
	  					idType:"",
	  					appntSex:"",
	  				},
	  				insurants:{
	  					insurant:[]
	  				}
	  			}
	  		},
	  		btn:true,
	  		shareLink:'',
	  		agentCode:this.$route.params.agentCode,
	  		orderId:this.$route.params.orderId,
	  		applyCode:this.$route.params.applyCode,
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

  	  	let payChangeInfo = utils.cache.get("bankinfo")
  	  	let bankImg = utils.cache.get("bankImg")
  	  	if (bankImg != null) {
  	  		this.bankImage = bankImg;
  	  	}

  	  	let bankcaImage = utils.cache.get("bankcaimage")
  	  	if(bankcaImage != null){
  	  		this.caValue.image = bankcaImage
  	  	}
  	  	console.log(this.caValue.image,'11111111')
  	  	if (payChangeInfo != null) {
  	  		this.payChangeInfo = payChangeInfo
  			for (var i = 0; i < this.dict.bankList.bank.item.length; i++) {
  				let code = this.dict.bankList.bank.item[i].code
  				let newCode = this.payChangeInfo.productInfo.newBankCode
  				if(code == newCode){
  					// $("#insuredIdType").get(0).selectedIndex = i;
  				}
  			}
  	  	}else{
  		  	this.getMsg();

  	  	}
  	  	let host = window.globalConfig.rootUrl.split('/')[2]
  	  	this.shareLink = "http://" + host + "/com.ifp.ipartner/proposalShare/index.html#/bankChangeShare/"+this.$route.params.orderId+"/"+this.$route.params.applyCode+"/-1/-1/-1"
	  },
	  computed:{
	  	caInfo(){
	  		if(this.caValue.image != null){
	  			return this.caValue.image
	  		}	
	  	}
	  },
	  watch:{
	  	caInfo(val, oldval){
	  		if(val != null){
		  		if(val.value != null){
		  			// document.getElementById('xss_20').src = ""
	  				// document.getElementById('xss_20').src = val.value
	  				this.imageUpload(val.context_id,val.value)
		  		}
	  		}
	  	}
	  },
	  mounted(){
		  	$(".btnFoote").css({'opacity':0.5})
	  	    //初始化CA签字
	  	    initAnySign('999999');
  	        //添加签字对象
  	        var res = addSignatureObj(24,"zhangsan","123456");
  	    	if(!res) {
  	    		alert("addSignatureObj error");
  	    	}
  	    	//提交配置
  	    	commitConfig()
	  	    console.log(this.caValue.image)
	  	  	if(this.bankImage!== "" && this.bankImage.positive!== ""){
	  			let positive = this.$refs.bankPositive
	  			 positive.style.display = 'inline-block'
				positive.src = "data:image/jpeg;base64," + this.bankImage.positive
	  	  	}
	  	  	if(this.bankImage!== "" && this.bankImage.negative!== ""){
	  			let  negative = this.$refs.bankNegative
				negative.style.display = 'inline-block';
				negative.src = "data:image/jpeg;base64," + this.bankImage.negative;
	  	  	}
	  	  	if(this.caValue.image !== "" && this.caValue.image !== null){
	  	  		let image = document.getElementById('xss_20')
	  	  		image.style.display = 'inline-block';
	  	  		image.src = this.caValue.image
	  	  		console.log(this.caValue.image,'image')
	  	  	}
	  },
	  methods:{
	  	load(){
	  		window.location.reload();
	  	},
	  	//调取本地相册
	  		getNewPhotos(index){
	  			if(index == 1){
	  				this.Show = false

	  			}else if(index == 2){
	  				this.Show1 = false
	  			}
	  	  		getNewPhoto(pictureSource.SAVEDPHOTOALBUM,(imageData)=>{
	  	  			if (index == "1") {
			  			let positive = this.$refs.bankPositive;
			  			positive.style.display = 'inline-block'
						positive.src = "data:image/jpeg;base64," + imageData
						this.bankImage.positive = imageData
					}else if (index == "2") {
						let negative = this.$refs.bankNegative
						negative.style.display = 'inline-block';
						negative.src = "data:image/jpeg;base64," + imageData;
						this.bankImage.negative = imageData
	  	  			}
	  	  		},(message)=>{
	  	  			// alert(message)
	  	  		})
	  		},
			imageUpload:function(context_id,image){
				if(image!=undefined && image!=""){
					let requ = {
	  				"upload": {
	  					"agentCode":this.agentCode,
	  					"applyCode":this.applyCode,
	  					"orderId":this.orderId,
	  					"policyCode":"",
						"deviceNo":"",
						"imageList":[{
							"imageType":context_id+'BG',
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
									document.getElementById('xss_20').src = ""
									document.getElementById('xss_20').src = image
									this.caValue.image = image
								}
							}
						})
					}
				}
			},
  	  	  	toast:function(msg){
  	  	  		Toast({
  	  	  			message: msg,
  	  	  			duration: 1500
  	  	  		});
  	  	  	},
  	  	  	share:function(){
  	  	  		utils.cache.removeItem("bankinfo")
  	  	  		utils.cache.removeItem("bankImg")
  	  	  		utils.cache.removeItem("bankcaimage")
  				Wechat.share({
  					message: {
  						title: "银行变更确认",
  						description:"银行变更确认",
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
	  		//返回到支付
	  		goPay(){
	  			this.$router.push({name:'pay',params:{agentCode:this.agentCode,orderId:this.orderId,applyCode:this.applyCode}})
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
						"name":this.$route.params.holderName,
						"cardId":this.$route.params.idCard,
						"functionCode":"BANKCHANGE",
						"imageByte":image,
		   				"applyCode":this.applyCode,
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
		  	// 勾选复选框才能支付
		  	btnStatus(){
		  		if(this.check == true){
		  			$(".btnFoote").css({'opacity':1})
		  		}else{
		  			$(".btnFoote").css({'opacity':0.5})
		  		}
		  	},
		  	// 获取银行变更页面信息
		  	getMsg(){
		  		let getPayInfo = {
	                "policy": {
	                    "substepNo": "",
	                    "orderCode": this.orderId
	                }
	            }
	            console.log('获取银行变更页面请求参数',getPayInfo)
	            utils.http.post('MOHQPOLICYMSG',getPayInfo).then(response =>{
	            	this.payChangeInfo = response.data.response.policy
	            	console.log('获取银行变更页面信息',this.payChangeInfo)
	            	let idCards = this.payChangeInfo.custInfo.idCards
	            	console.log(idCards,'idcards')
	            	if(idCards!=undefined && idCards.length>0){
	            		for(var i=0;i<idCards.length;i++){
	            			if(idCards[i].imageName == "24BG"){
	            				//投保人
	            				var image = document.getElementById('xss_20')
	            				image.setAttribute('crossOrigin', 'anonymous')
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
		  	// 跳转银行变更预览页面
		  	goPreview(){
		  		utils.cache.set("bankinfo",this.payChangeInfo)
		  		utils.cache.set("bankImg",this.bankImage)
		  		utils.cache.set("bankcaimage",this.caValue.image)
		  		this.btn = false;
		  		this.$router.push({name:'preview',params:{payChangeInfo:JSON.stringify(this.payChangeInfo)}});
		  	},
		  	// 支付请求
		  	payRequest(){
		  		if(this.check){
		  			let productInfos = this.payChangeInfo.productInfo;
	            if(productInfos.newBankCode == null ||	productInfos.newBankCode == ""){
		    		this.$refs.showalert.showMOdal('请选择银行类型!')
	            }else if(productInfos.newBankAccNo == null ||
	            	productInfos.newBankAccNo == ""){
		    		this.$refs.showalert.showMOdal('银行卡号不能为空!')
	            }else{
	            	let msg = utils.valid.BankCode(productInfos.newBankCode,productInfos.newBankAccNo)
		  			if (msg != undefined && msg != "") {
		  			  this.$refs.showalert.showMOdal(msg)
		  			}
		  			if(msg == "" || msg == null){
			             if(this.caValue.image === null || this.caValue.image == ""){
				    		this.$refs.showalert.showMOdal('投保人签字不能为空!');
			            }else if(this.bankImage.positive == null && this.bankImage.negative == null
			            	){
				    		this.$refs.showalert.showMOdal('银行卡照片至少上传一张!')
			            }else if(this.bankImage.positive == "" &&
			            	this.bankImage.negative == ""){
				    		this.$refs.showalert.showMOdal('银行卡照片至少上传一张！')
			            }else{
            		  		let requ = {
            	                "policy": {
            	                    "agentCode": this.agentCode,
            	                    "applyCode": this.applyCode,
            						"activityid":"Y",
            						"bankNo": this.payChangeInfo.productInfo.newBankAccNo,
            						"bankCode":this.payChangeInfo.productInfo.newBankCode,
            						"applicant_signt":this.caValue.image.substring(22),
            						"bankImageFront": this.bankImage.positive,
            						"bankImageBack": this.bankImage.negative
            	                }
            	            }
            	            console.log(requ,'支付请求参数')
	            	  		utils.http.postFast('MOPAYACCEPT',requ,(body)=>{
	                        	let result = body.policy
	                        	let policyCode = result.policyCode;//传到支付也的保单号
	                        	if(result.resultCode == 0){
	            		    		this.$refs.showalert.showMOdal(result.resultMessage)
	            		    		this.$router.push({name:'insureResult',params:{isShow:true,policyCode:policyCode,agentCode:this.agentCode}})
	                        	}else if(result.resultCode != 0){
	            		    		this.$refs.showalert.showMOdal(result.resultMessage)
	            		    		this.$router.push({name:'insureResult',params:{isShow:false,policyCode:policyCode,agentCode:this.agentCode,resultMessage:result.resultMessage}})
	                        	}
	                        })
			            }
		  			}
	            }
		  		}else return false;
		  		
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
		  	select(params){
		  		if(params == 1){
		  			this.Show = true;
		  			this.Show1 = false;
		  		}else{
		  			this.Show1 = true;
		  			this.Show = false;
		  		}
		  	},
		  	//调用相机获取图片
	  	  	capturePhoto:function(tag) {
	  	  		this.Show = false
	  	  		this.Show1 = false
	  	  		capturePhotoCallback((imageData)=>{
	  	  			if (tag == "1") {
			  			let positive = this.$refs.bankPositive;
			  			positive.style.display = 'inline-block'
						positive.src = "data:image/jpeg;base64," + imageData
						this.bankImage.positive = imageData
					}else if (tag == "2") {
						let negative = this.$refs.bankNegative
						negative.style.display = 'inline-block';
						negative.src = "data:image/jpeg;base64," + imageData;
						this.bankImage.negative = imageData
	  	  			}

	  	  		},(message)=>{
	  	  			// alert(message)
	  	  		})
	  	  	}
	  }
	}
</script>

<style lang='scss' scoped type="text/css" >
	@import 'static/css/backlog/page';
	.text{
		width:50%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
	}
	.manage-main-contents{
		width: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;bottom: 0;
	}
	.btnFoote{color: #fff;background:#F4A200;border-radius: 5px;
		padding:10px 30px;border:0;display: block;
		margin:5% auto; 
		}
	.photo{
		display: block;
		width: 100%;
		line-height:45px; 
		border:0;background: #fff;
	}
</style>