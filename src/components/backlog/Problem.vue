<template>
	<div style="font-size:12px">
		<CADialog v-show="caValue.isCAOpen" v-model="caValue" ></CADialog>
		<Headerbtns :title="'问题件回复'">
			<i class="fa fa-angle-left" @click="go('/backlog')"replace slot="left"></i>
			<i class="fa fa-ellipsis-v back" style="line-height: 55px;font-size: 24px" slot="right" @click="sheetVisible = !sheetVisible" v-clipboard:success="onCopy"
					v-clipboard:error="onError" v-clipboard:copy="shareLink"></i>
		</Headerbtns>
		<div class="manage-main-contents">
			<div v-show="show1">
				<div style="padding:5%">
					<p class="fontColor">投保审核通知书（非打印合同类）</p>
					<p class="textCenter">审核事项</p>
					<p class="border">尊敬的 {{appnt.appntName}} {{appnt.appntSex  == 2 ? '女士':'先生'}} :<br>
					&nbsp;本公司根据您所提交的投保申请，经详细审核后，需要您对以下问题进行确认并在客户说明栏中回复：<br>
					  {{questcontent1}}
					</p>
					<p class="textCenter">回复内容</p>
					<div class="border">
						&nbsp;本人已收悉贵公司的《投保审核通知书》，对其内容已全部了解，对审核事项
						做以下回复说明，将其作为投保事项的补充说明并确保提交资料真实有效。
						具体回复内容如下：<br><br>
						<textarea class="textarea" v-model="content1"></textarea>
						<input type="checkbox"id="d1">本人由于以下原因，要求撤销此次投保申请<br>
						<input type="radio" id="d2" value="1" name="radio">经济原因
						<input type="radio" id="d3" value="1" name="radio">险种不理想
						<input type="radio" id="d4" value="1" name="radio">服务不理想
						<input type="radio" id="d5" value="1" name="radio">其他
					</div>
					<span style="color:#F4A200">提示：1.本通知书是投保人、被保险人或法定监护人做相应变更、补充说明或确认之用，需经投保人
					、被保险人或法定监护人本人签字认可后方能生效，并作为投保书的组成部分。<br>
					2.如某一事项与原投保书有不一致之处，一律以本通知书为准。</span>
				</div>
				<p class="pstyle"></p>
			</div> 
			<div v-show="show2">
				<div style="padding:5%">
					<p class="fontColor">投保审核通知书（打印合同类）</p>
					<p class="textCenter">审核申请</p>
					<p class="border">尊敬的 {{appnt.appntName}} {{appnt.appntSex  == 2 ? '女士':'先生'}} :<br>
					&nbsp;本公司根据您所提交的投保申请，经详细审核后，需要您对以下问题进行确认并在客户说明栏中回复：<br>
						{{questcontent2}}
					</p>
					<p class="textCenter">回复内容</p>
					<div class="border">
						&nbsp;本人已收悉贵公司的《投保审核通知书》，对其内容已全部了解，对审核事项
						做以下回复说明，将其作为投保事项的补充说明并确保提交资料真实有效。
						具体回复内容如下：<br><br>
						<textarea class="textarea" v-model="content2"></textarea>
						<input type="checkbox"id="dd1">本人由于以下原因，要求撤销此次投保申请<br>
						<input type="radio" id="dd2" value="1" name="radio">经济原因
						<input type="radio" id="dd3" value="1" name="radio">险种不理想
						<input type="radio" id="dd4" value="1" name="radio">服务不理想
						<input type="radio" id="dd5" value="1" name="radio">其他
					</div>
					<span style="color:#F4A200">提示：1.本通知书是投保人、被保险人或法定监护人做相应变更、补充说明或确认之用，需经投保人
					、被保险人或法定监护人本人签字认可后方能生效，并作为投保书的组成部分。<br>
					2.如某一事项与原投保书有不一致之处，一律以本通知书为准。</span>
				</div>
				<p class="pstyle"></p>
			</div> 
			<div v-show="show3">
				<div style="padding:5%">
					<p class="fontColor">业务员通知书（非打印合同类）</p>
					<p class="textCenter">审核事项</p>
					<p class="border">尊敬的 {{agent.agentName}}  {{agent.agentSex  == 2 ? '女士':'先生'}} :<br>
					  本公司根据您所提交的投保申请及业务人员报告书，经详细审核后，需要您对以下问题进行确认并在业务人员说明栏中进行补充更正：<br> {{questcontent3}}</p>
					<p class="textCenter">回复内容</p>
					<div class="border">
						&nbsp;本人已收悉公司的《业务员通知书》，对其内容已全部了解，现对审核事项做以下回复说明并保证回复说明真实有效。
						&nbsp;具体回复内容如下：<br><br>
						<textarea class="textarea" v-model="content3"></textarea>
					</div>
					<span style="color:#F4A200">提示：1.本通知书是业务员做相应变更、补充说明或确认之用，需经业务员签字认可后方能生效。<br>
					2.如某一事项与原投保书有不一致之处，一律以本通知书为准。<br>
					3.本通知书应自首次打印之日起三日内返回公司,未按时返回的将影响该投保书的新契约处理进度。</span>
				</div>
				<p class="pstyle"></p>
			</div>
			<div v-show="show4">
				<div style="padding:5%">
					<p class="fontColor">业务员通知书（打印合同类）</p>
					<p class="textCenter">审核事项</p>
					<p class="border">尊敬的 {{agent.agentName}}  {{agent.agentSex  == 2 ? '女士':'先生'}} :<br>
					  本公司根据您所提交的投保申请及业务人员报告书，经详细审核后，需要您对以下问题进行确认并在业务人员说明栏中进行补充更正：<br>
						{{questcontent4}}
					  </p>
					<p class=" textCenter">回复内容</p>
					<div class="border">
						&nbsp;本人已收悉公司的《业务员通知书》，对其内容已全部了解，现对审核事项做以下回复说明并保证回复说明真实有效。
						&nbsp;具体回复内容如下：<br><br>
						<textarea class="textarea" v-model="content4"></textarea>
					</div>
					<span style="color:#F4A200">提示：1.本通知书是业务员做相应变更、补充说明或确认之用，需经业务员签字认可后方能生效。<br>
					2.如某一事项与原投保书有不一致之处，一律以本通知书为准。<br>
					3.本通知书应自首次打印之日起三日内返回公司,未按时返回的将影响该投保书的新契约处理进度。</span>
				</div>
				<p class="pstyle"></p>
			</div>  
			<div class="f-flex" style="padding:5%">
				<div v-show="show1" class="display" @click="select(1)">
					<p class="textCenter">投保审核(非打印)</p>
					<img  v-show="imgList_1.length>0" 
					v-for=" item in imgList_1"
					:src="item.src" style="width:140px;height:100px;">
					<img id="accessory1" 
					:src="imageUrl" style="width:140px;height:100px;">
				</div>
				<div v-show="show2"  class="display" @click="select(2)">
					<p class="textCenter">投保审核(打印类)</p>
					<img  v-show="imgList_2.length>0" 
					v-for=" item in imgList_2"
					:src="item.src" style="width:140px;height:100px;"/>
					<img  id="accessory2" :src="imageUrl" style="width:140px;height:100px;">
				</div>
				<div v-show="show3" class="display" @click="select(3)">
					<p class="textCenter">业务员(非打印)</p>
					<img  v-show="imgList_3.length>0" 
					v-for=" item in imgList_3"
					:src="item.src" style="width:140px;height:100px;"/>
					<img id="accessory3" :src="imageUrl" style="width:140px;height:100px;">
				</div>
				<div v-show="show4" class="display" @click="select(4)">
					<p class="textCenter">业务员(打类印)</p>
					<img  v-show="imgList_4.length>0" 
					v-for=" item in imgList_4"
					:src="item.src" style="width:140px;height:100px;"/>
					<img id="accessory4" :src="imageUrl"  
					style="width:140px;height:100px;">
				</div>
				<mt-popup position="center" v-model="Show1" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo" @click="getNewPhotos(1)">从相册选择</button>
					<hr>
					<button class="photo" @click="capturePhoto(1)">拍照</button>
				</mt-popup>
				<mt-popup position="center" v-model="Show2" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo" @click="getNewPhotos(2)">从相册选择</button>
					<hr>
					<button class="photo" @click="capturePhoto(2)">拍照</button>
				</mt-popup>
				<mt-popup position="center" v-model="Show3" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo" @click="getNewPhotos(3)">从相册选择</button>
					<hr>
					<button class="photo" @click="capturePhoto(3)">拍照</button>
				</mt-popup>
				<mt-popup position="center" v-model="Show4" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo" @click="getNewPhotos(4)">从相册选择</button>
					<hr>
					<button class="photo" @click="capturePhoto(4)">拍照</button>
				</mt-popup>
			</div>
			<div class="f-flex"  style="padding:5%">
				<div v-show="appntSignShow"  >
					<p class="textCenter">投保人签字</p>
					<img style="width:110px;height:100px;" id="xss_24" src="../../../static/img/backlog/qianzi.jpg" @click="faceTest(24)">
					
				</div>
				<div v-show="appntSignShow">
					<p class="textCenter">被保人签字</p>
					<img style="width:110px;height:100px;" id="xss_25" src="../../../static/img/backlog/qianzi.jpg" @click="faceTest(25)">
				</div>
				<div v-show="agentSignShow" class="display">
					<p class="textCenter">代理人签字</p>
					<img style="width:110px;height:100px;" id="xss_23" src="../../../static/img/backlog/qianzi.jpg" @click="faceTest(23)">
				</div>
			</div>
			<button class="btnn" @click="submitProblem">提交</button>
		</div>
		<alert ref="showalert"></alert> 
		<mt-actionsheet
					:actions="actions"
					v-model="sheetVisible">
		</mt-actionsheet>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import { Actionsheet } from 'mint-ui'
	import alert from '../policy/common/alert.vue'
	import CADialog from '../common/CADialog'
	import Headerbtns from '../policy/common/Header.vue'
	import camera from '../../../static/js/cordova_camera.js'
	export default {
	  name: 'problem',
	  components: {Headerbtns,CADialog,alert},
	  data(){
	  	return{
	  		Show1:false,
	  		Show2:false,
	  		Show3:false,
	  		Show4:false,
	  		appntSignShow:false,
	  		agentSignShow:false,
	  		caValue:{
		  			isCAOpen:false,
		  			image:"",
		  			date:""
		  		},
		  	signImg:{
		  		appntSign:'',
		  		appntSign1:'',
		  		insSign:'',
		  		insSign1:'',
		  		agentSign:'',
		  		agentSign1:''
			  },
			  imageUrl:require("../../../static/img/backlog/1519724768(1).jpg"),
			  imgList_1:[
		
			  ],
			  imgList_2:[
			
			  ],
			  imgList_3:[
				
			  ],
			  imgList_4:[
				
			  ],
		  	accessory:{
		  		accessory1:'',
		  		accessory2:'',
		  		accessory3:'',
		  		accessory4:''
		  	},
		  	show1:false,
		  	show2:false,
		  	show3:false,
		  	show4:false,
		  	shareLink:'',
		  	applyCode:this.$route.params.applyCode,
		  	appnt:{
		  		appntName:'',
		  		appntSex:'',
		  		idNo:'',
		  		idType:''
		  	},
		  	insurant:{
		  		name:'',
		  		idNo:'',
		  		idType:''
		  	},
		  	agent:{
		  		agentCode:'',
		  		agentName:'',
		  		idNo:'',
		  		agentSex:''
		  	},
		  	content1:'',//回复内容
		  	content2:'',
		  	content3:'',
		  	content4:'',
		  	subType:'',//打印非打印
		  	requestParam:'',
		  	problem:{
		  		TB_3010101_N:'',
		  		TB_3010101_Y:'',
		  		TB_3010201_N:'',
		  		TB_3010201_Y:''
		  	},
		  	prtSeq1:'',
		  	prtSeq2:'',
		  	prtSeq3:'',
		  	prtSeq4:'',
		  	questcontent1:'',
		  	questcontent2:'',
		  	questcontent3:'',
		  	questcontent4:'',
		  	birthday:'',
		  	nowYear:'',
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
	  mounted(){
	  		this.getMsg();
		  	initAnySign('999999');
	  	    // 添加签字对象
	  	    var res = addSignatureObj(24,"zhangxin","123123123");
	  		if(!res) {
	  			alert("addSignatureObj error");
	  		}
		    var res1 = addSignatureObj(25,"zhangxin","123123123");
			if(!res) {
				alert("addSignatureObj error");
			}
		    var res2 = addSignatureObj(23,"zhangxin","123123123");
			if(!res) {
				alert("addSignatureObj error");
			}
	  	    var res3 = addSignatureObj(241,"zhangxin","123123123");
	  		if(!res) {
	  			alert("addSignatureObj error");
	  		}
		    var res4 = addSignatureObj(251,"zhangxin","123123123");
			if(!res) {
				alert("addSignatureObj error");
			}
		    var res5 = addSignatureObj(231,"zhangxin","123123123");
			if(!res) {
				alert("addSignatureObj error");
			}
	  		//提交配置
	  		commitConfig()
	  		let host = window.globalConfig.rootUrl.split('/')[2]
	  		this.shareLink = "http://" + host + "/com.ifp.ipartner/proposalShare/index.html#/problemShare/"+this.$route.params.orderId+"/"+this.applyCode+"/-1/-1/-1"
	  },
  	  computed:{
  	  	caInfo(){
  	  		return this.caValue.image
  	  	}
  	  },
  	  watch:{
		  	caInfo(val, oldval){
  	  			console.log(val.context_id,val.value,'=================')
		  		if(val != null){
			  		if(val.value != null){
		  				this.imageUpload(val.context_id,val.value)
			  		}
	  	  		// 	if(val.context_id == 24){
			  			// document.getElementById('xss_24').src = ""
			  			// document.getElementById('xss_24').src = val.value
			  			// this.signImg.appntSign = val.value
	  	  		// 	}
	  	  			
	  	  		// 	if(val.context_id == 25){
	  	  		// 		document.getElementById('xss_25').src = ""
	  	  		// 		document.getElementById('xss_25').src = val.value
	  	  		// 		this.signImg.insSign = val.value
	  	  		// 	}
	  	  		
	  	  		// 	if(val.context_id == 23){
	  	  		// 		document.getElementById('xss_23').src = ""
	  	  		// 		document.getElementById('xss_23').src = val.value
	  	  		// 		this.signImg.agentSign = val.value
	  	  		// 	}
		  		}
		  	}
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
  					"orderId":this.$route.params.orderId,
  					"policyCode":"",
					"deviceNo":"",
					"imageList":[{
						"imageType":context_id+'1',
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
					  			this.signImg.appntSign = image
			  	  			}else if(context_id == 25){
  			  	  				document.getElementById('xss_25').src = ""
  			  	  				document.getElementById('xss_25').src = image
  			  	  				this.signImg.insSign = image
  			  	  			}else if(context_id == 23){
  			  	  				document.getElementById('xss_23').src = ""
  			  	  				document.getElementById('xss_23').src = image
  			  	  				this.signImg.agentSign = image
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
  	  		utils.cache.removeItem("content1")
  	  		utils.cache.removeItem("content2")
  	  		utils.cache.removeItem("content3")
  	  		utils.cache.removeItem("content4")
			Wechat.share({
				message: {
					title: "问题件回复",
					description:"问题件回复",
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
	  	//获取subType判断显示
	  	getMsg(){
	  		let requestParam = {
	                "policy": {
	                    "substepNo": "",
	                    "orderCode": this.$route.params.orderId
	                }
	            }
	        utils.http.postFast('MOHQPOLICYMSG',requestParam,(body)=>{
	        	this.subType = body.policy.problemInfo
	        	//代理人
	        	this.agent.agentCode = body.policy.agentInfo.agentcode
	        	this.agent.agentName = body.policy.agentInfo.name
	        	this.agent.agentSex = body.policy.agentInfo.sex
	        	this.agent.idNo = body.policy.agentInfo.idno
	        	//投保人
	        	this.appnt.appntName = body.policy.custInfo.appnt.appntName
	        	this.appnt.appntSex = body.policy.custInfo.appnt.appntSex
	        	this.appnt.idNo = body.policy.custInfo.appnt.idNo
	        	this.appnt.idType = body.policy.custInfo.appnt.idType
	        	//被保人
	        	this.insurant.name = body.policy.custInfo.insurants.insurant[0].name
	        	this.insurant.idNo = body.policy.custInfo.insurants.insurant[0].idNo
	        	this.insurant.idType = body.policy.custInfo.insurants.insurant[0].idType
	        	console.log(this.insurant.name)
	        	console.log(this.appnt.appntName)
	        	console.log(this.agent.agentName)
	        	console.log(body.policy)
				for (let i = 0; i < this.subType.length; i++) {
					if(this.subType[i].subType == '3010101_N'){
						this.show1 = true
						this.appntSignShow = true
						this.questcontent1 = this.subType[i].questcontent
						this.prtSeq1 = this.subType[i].prtSeq
					}
					if(this.subType[i].subType == '3010101_Y'){
						this.show2 = true
						this.appntSignShow = true
						this.questcontent2 = this.subType[i].questcontent
						this.prtSeq2 = this.subType[i].prtSeq
					}
					if(this.subType[i].subType == '3010201_N'){
						this.show3 = true
						this.agentSignShow = true
						this.questcontent3 = this.subType[i].questcontent
						this.prtSeq3 = this.subType[i].prtSeq
					}
					if(this.subType[i].subType == '3010201_Y'){
						this.show4 = true
						this.agentSignShow = true
						this.questcontent4 = this.subType[i].questcontent
						this.prtSeq4 = this.subType[i].prtSeq
					}
					
				}
				let idCards = body.policy.custInfo.idCards
				console.log(idCards,'idcards')
				if(idCards!=undefined && idCards.length>0){
					for(let i=0;i<idCards.length;i++){
							if(idCards[i].imageName == "231"){
								//业务人员
								var image = document.getElementById('xss_23')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								let than = this
								image.onload =function() {
									var data = than.getBase64Image(image)
									than.signImg.agentSign = data
								}
							}else if(idCards[i].imageName == "241"){
								//投保人
								var image = document.getElementById('xss_24')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								let than = this
								image.onload =function() {
									var data = than.getBase64Image(image)
									than.signImg.appntSign = data
								}
							}else if(idCards[i].imageName == "251"){
								//被保人
								var image = document.getElementById('xss_25')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								let than = this
								image.onload =function() {
									var data = than.getBase64Image(image)
									than.signImg.insSign = data
								}
							}
					}
				}
	        })
	  	},
	  	openCADialog(signNum){
	  			this.caValue.isCAOpen = !this.caValue.isCAOpen
	  			this.caValue.iamge = ""
	  			showPopupDialog(signNum)
	  	},
	  	faceTest(signNum){
	  		let cust = undefined
	  		if(signNum == 24){
	  			//投保人
	  			cust = {
	  				name:this.appnt.appntName,
	  				idNo:this.appnt.idNo,
	  				idType:this.appnt.idType
	  			}
	  		}else if(signNum == 25){
	  			//被保人
	  			this.birthday = this.insurant.idNo.substring(6,10)
	  			this.nowYear =new Date().getFullYear();
	  			if(this.nowYear - this.birthday >= 18){
		  			cust = {
		  				name:this.insurant.name,
		  				idNo:this.insurant.idNo,
		  				idType:this.insurant.idType
		  			}
	  			}else{
	  				//投保人
		  			cust = {
		  				name:this.appnt.appntName,
		  				idNo:this.appnt.idNo,
		  				idType:this.appnt.idType
		  			}
	  			}
	  		}else if(signNum == 23){
	  			//代理人
	  			cust = {
	  				name:this.agent.agentName,
	  				idNo:this.agent.idNo,
	  				idType:11
	  			}
	  		}
  			MAPlugin.hybridCallAction('hybrid://MAFaceIdentify:401/invokeFaceIdentify?',(callbackSucc)=>{
        		this.ficeDistinguish(signNum,callbackSucc,cust)
	        }, (callbackFail)=>{
	    		this.$refs.showalert.showMOdal(callbackFail)
	        });
	  	},
	  	// 进行人脸识别接口调用方法
    	ficeDistinguish:function(signNum,callbackSucc,cust){
    		let requ = {
				"policy": {
					"agentCode":"",
					"name":cust.name,
					"cardId":cust.idNo,
					"functionCode":"RECALL",
					"imageByte":callbackSucc,
	   				"applyCode":this.applyCode,
	   				"policyCode":"",
	   				"idType":cust.idType
            	}
	  		}
	    	console.log('人脸识别请求参数',JSON.stringify(requ))
	        utils.http.postFast('FACEIDKSHL',requ,(body)=>{
	        	if(body.policy.resultCode == '0'){
	        		console.log(body.policy.resultMsg);
	        		this.openCADialog(signNum);
	        	}else{
		    		this.$refs.showalert.showMOdal(body.policy.resultMsg)
	        	}
	        })
    	},
    	//选项显示
    	select(tag){
    		if(tag == 1){
  				this.Show1 = true
  			}else if(tag == 2){
  				this.Show2 = true
  			}else if(tag == 3){
  				this.Show3 = true
  			}else{
  				this.Show4 = true
  			}
    	},
    	//调用相机拍照
    	capturePhoto(tag){
    		if(tag == 1){
    			this.Show1 = false
    		}else if(tag == 2){
    			this.Show2 = false
    		}else if(tag == 3){
    			this.Show3 = false
    		}else{
    			this.Show4 = false
    		}
    		capturePhotoCallback((imageData)=>{
    			if(tag == "1"){
					let item = {}
					item.src = "data:image/png;base64," +imageData
    				this.imgList_1.push(item)
    				alert(item)
    			}else if(tag == "2"){
				    let item = {}
					item.src = "data:image/png;base64," +imageData
    				this.imgList_2.push(item)
    			}else if(tag == "3"){
					let item = {}
					item.src = "data:image/png;base64," +imageData
    				this.imgList_3.push(item)
    			}else{
				    let item = {}
					item.src = "data:image/png;base64," +imageData
    				this.imgList_4.push(item)
    			}
    		},(message)=>{
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
    	//调本地相册
  		getNewPhotos(tag){
  			if(tag == 1){
  				this.Show1 = false
  			}else if(tag == 2){
  				this.Show2 = false
  			}else if(tag == 3){
  				this.Show3 = false
  			}else{
  				this.Show4 = false
  			}
  	  		getNewPhoto(pictureSource.SAVEDPHOTOALBUM,(imageData)=>{
  	  			if(tag == "1"){
					let item = {}
					item.src = "data:image/jpeg;base64," +imageData
    				this.imgList_1.push(item)
    				alert(item)
    			}else if(tag == "2"){
				    let item = {}
					item.src = "data:image/jpeg;base64," +imageData
    				this.imgList_2.push(item)
    			}else if(tag == "3"){
					let item = {}
					item.src = "data:image/jpeg;base64," +imageData
    				this.imgList_3.push(item)
    			}else{
				    let item = {}
					item.src = "data:image/jpeg;base64," +imageData
    				this.imgList_4.push(item)
    			}
  	  		},(message)=>{
  	  			// alert(message)
  	  		})
  		},
    	//提交问题件
    	submitProblem(){
			console.log(this.signImg.agentSign.substring(22),'=============')
    		let ispass = true
    		console.log(this.show1+"/"+this.show2+"/"+this.show3+"/"+this.show4)
			this.TB_3010101_N = {
	                        "AGENT_SIGNT":"",
	                        "APPLICANT_SIGNT":this.signImg.appntSign.substring(22),
	                        "INSURE_SIGNT":this.signImg.insSign.substring(22),
	                        "agentCode":this.agent.agentCode,
	                        "agentName":this.agent.agentName,
	                        "applicantName":this.appnt.appntName,
	                        "applyCode":this.applyCode,
	                        "insuredName":this.insurant.name,
	                        "noticeCode":this.prtSeq1,
	                        "orgName":"第三营销服务部",
	                        "printDate":"",
	                        "questContent":this.questcontent1,
	                        "reasonNum":'',
	                        "replyContent":this.content1
						}
			this.TB_3010101_Y = {
	                        "AGENT_SIGNT":"",
	                        "APPLICANT_SIGNT":this.signImg.appntSign.substring(22),
	                        "INSURE_SIGNT":this.signImg.insSign.substring(22),
	                        "agentCode":this.agent.agentCode,
	                        "agentName":this.agent.agentName,
	                        "applicantName":this.appnt.appntName,
	                        "applyCode":this.applyCode,
	                        "insuredName":this.insurant.name,
	                        "noticeCode":this.prtSeq2,
	                        "orgName":"第三营销服务部",
	                        "printDate":"",
	                        "questContent":this.questcontent2,
	                        "reasonNum":'',
	                        "replyContent":this.content2
						}
			this.TB_3010201_N = {
	                        "AGENT_SIGNT":this.signImg.agentSign.substring(22),
	                        "APPLICANT_SIGNT":'',
	                        "INSURE_SIGNT":'',
	                        "agentCode":this.agent.agentCode,
	                        "agentName":this.agent.agentName,
	                        "applicantName":this.appnt.appntName,
	                        "applyCode":this.applyCode,
	                        "insuredName":this.insurant.name,
	                        "noticeCode":this.prtSeq3,
	                        "orgName":"第三营销服务部",
	                        "printDate":"",
	                        "questContent":this.questcontent3,
	                        "reasonNum":'',
	                        "replyContent":this.content3
						}
			this.TB_3010201_Y = {
	                        "AGENT_SIGNT":this.signImg.agentSign.substring(22),
	                        "APPLICANT_SIGNT":'',
	                        "INSURE_SIGNT":'',
	                       "agentCode":this.agent.agentCode,
	                       "agentName":this.agent.agentName,
	                        "applicantName":this.appnt.appntName,
	                        "applyCode":this.applyCode,
	                        "insuredName":this.insurant.name,
	                        "noticeCode":this.prtSeq4,
	                        "orgName":"第三营销服务部",
	                        "printDate":"",
	                        "questContent":this.questcontent4,
	                        "reasonNum":'',
	                        "replyContent":this.content4
						}
			this.requestParam = {
	                "policy":{
	     //                "TB_3010101_N": this.TB_3010101_N,
						// "TB_3010101_Y": this.TB_3010101_Y,
						// "TB_3010201_N":this.TB_3010201_N,
						// "TB_3010201_Y":this.TB_3010201_Y,
	                    "applyCode":this.applyCode,
	                    "dzType":"",
        			    "extPages":[]
	                }
			}
			if(this.show1 == true && ispass){
				ispass = this.business1()
				var a1=$('#d1').prop('checked')
				var a2=$('#d2').prop('checked')
				var a3=$('#d3').prop('checked')
				var a4=$('#d4').prop('checked')
				var a5=$('#d5').prop('checked')
				console.log(a1,a2,a3,a4,a5)
				if(a1 && ispass){
					if(!a2 && !a3 && !a4 && !a5){
						this.$refs.showalert.showMOdal('请选择撤销原因！')
						return false
					}
				}
				if(a2 || a3 || a4 ||a5){
					if(!a1){
						this.$refs.showalert.showMOdal('请勾选撤销申请！')
						return false
					}
				}
				if(a1){
					if(a2){
						this.TB_3010101_N.reasonNum += '1'
					}
					if(a3){
						this.TB_3010101_N.reasonNum += '2'
					}
					if(a4){
						this.TB_3010101_N.reasonNum += '3'
					}
					if(a5){
						this.TB_3010101_N.reasonNum += '4'
					}
				}
				this.requestParam.policy.TB_3010101_N = this.TB_3010101_N
				this.requestParam.policy.dzType += '3010101_N,'
				if(this.imgList_1 != ""){
					for(let i of this.imgList_1){
						let src = i.src.split(',')
						this.requestParam.policy.extPages.push({"imageName":"3010101_N",
					  	"imageByte":src[1]
					     })
					}
				}

			}
			if(this.show2 == true && ispass){
				ispass = this.business2()
				var aa1=$('#dd1').prop('checked')
				var aa2=$('#dd2').prop('checked')
				var aa3=$('#dd3').prop('checked')
				var aa4=$('#dd4').prop('checked')
				var aa5=$('#dd5').prop('checked')
				console.log(aa1,aa2,aa3,aa4,aa5)
				if(aa1 && ispass){
					if(!aa2 && !aa3 && !aa4 && !aa5){
						this.$refs.showalert.showMOdal('请选择撤销原因！')
						return false
					}
				}
				if(aa2 || aa3 || aa4 ||aa5){
					if(!aa1){
						this.$refs.showalert.showMOdal('请勾选撤销申请！')
						return false
					}
				}
				if(aa1){
					if(aa2){
						this.TB_3010101_Y.reasonNum += '1'
					}
					if(aa3){
						this.TB_3010101_Y.reasonNum += '2'
					}
					if(aa4){
						this.TB_3010101_Y.reasonNum += '3'
					}
					if(aa5){
						this.TB_3010101_Y.reasonNum += '4'
					}
				}
				this.requestParam.policy.TB_3010101_Y = this.TB_3010101_Y
				this.requestParam.policy.dzType += '3010101_Y,'
				if(this.imgList_2 != ""){
					for(let i of this.imgList_2){
						let src = i.src.split(',')
						this.requestParam.policy.extPages.push({"imageName":"3010101_Y",
					  	"imageByte":src[1]
					     })
					}
				}
			}  
			if(this.show3 == true && ispass){
				ispass = this.agent1();
				this.requestParam.policy.TB_3010201_N = this.TB_3010201_N
				this.requestParam.policy.dzType += '3010201_N,'
				if(this.imgList_3 != ""){
					for(let i of this.imgList_3){
						let src = i.src.split(',')
						this.requestParam.policy.extPages.push({"imageName":"3010201_N",
					  	"imageByte":src[1]
					     })
					}
				}
			}
			if(this.show4 == true && ispass){
				ispass = this.agent2();
				this.requestParam.policy.TB_3010201_Y = this.TB_3010201_Y
				this.requestParam.policy.dzType += '3010201_Y,'
				if(this.imgList_4 != ""){
					for(let i of this.imgList_4){
						let src = i.src.split(',')
						this.requestParam.policy.extPages.push({"imageName":"3010201_Y",
					  	"imageByte":src[1]
					     })
					}
				}
			}
			if(ispass){
				this.requestParam.policy.dzType = this.requestParam.policy.dzType.substring(0,this.requestParam.policy.dzType.length-1)
				let requ = this.requestParam
            	console.log(requ,'请求参数')
            	utils.http.postFast('MOPROBLEMREPLY',requ,(body)=>{
            		let result = body.policy
            		console.log(result,'问题件请求返回')
            		if(result.resultCode == 0){
	            		this.$refs.showalert.showMOdal(result.resultMessage);
	            		setTimeout(()=>{
			    			this.$router.push('/backlog')
	            		},1000)
            		}else{
            			this.$refs.showalert.showMOdal(result.resultMessage)
            		}
            	})
			}
	  	},
	  	//投保流程N
	  	business1(){
	  		console.log("this.content1"+this.content1)
	  		console.log("this.appntSign"+this.signImg.appntSign)
	  		console.log("this.insSign"+this.signImg.insSign)
			if(this.content1 == "" || this.content1 == null){
				this.$refs.showalert.showMOdal('回复内容不能为空')
				return false
			}
			if(this.signImg.appntSign == "" || this.signImg.appntSign == null){
				this.$refs.showalert.showMOdal('投保人签字不能为空！')
				return false
	    	}
	    	if(this.signImg.insSign == "" || this.signImg.insSign == null){
				this.$refs.showalert.showMOdal('被保人签字不能为空！')
				return false
			}
			return true
	  	},
	  	//投保流程Y
	  	business2(){
	  		console.log("this.content2"+this.content2)
			if(this.content2 == "" || this.content2 == null){
	    		this.$refs.showalert.showMOdal('回复内容不能为空！')
	    		return false
			}
			if(this.signImg.appntSign == "" || this.signImg.appntSign == null){
				this.$refs.showalert.showMOdal('投保人签字不能为空！')
	    		return false
	    	}
	    	if(this.signImg.insSign == "" || this.signImg.insSign == null){
				this.$refs.showalert.showMOdal('被保人签字不能为空！')
				return false
			}
	    	return true
	  	},
	  	//代理人N
	  	agent1(){
	  		console.log("this.content3"+this.content3)
	  		console.log("this.agentSign"+this.signImg.agentSign)
			if(this.content3 == "" || this.content3 == null){
       			this.$refs.showalert.showMOdal('回复内容不能为空！')
	    		return false
    		}
    		if(this.signImg.agentSign == "" || this.signImg.agentSign == null){
        		this.$refs.showalert.showMOdal('代理人签字不能为空！')
	    		return false
    		}
    		return true
	  	},
	  	//代理人y
	  	agent2(){
	  		console.log("this.content4"+this.content4)
			if(this.content4 == "" || this.content4 == null){
        		this.$refs.showalert.showMOdal('回复内容不能为空！')
				return false
    		}
    		if(this.signImg.agentSign== "" || this.signImg.agentSign == null){
        		this.$refs.showalert.showMOdal('代理人签字不能为空！')
	    		return false		
    		}
    		return true
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
		overflow-y: auto;
		/* padding:5%; */
	}
	.textCenter{
		 text-align: center;
	}
	.display{display: inline-block}
	.pstyle{ width:100%;height:10px;border:1px solid #CECECE;background:#EAEAEA;margin:15px 0}
	.fontColor{color: #F4A200;padding:5px 0;font-size: 16px}
	.border{border:1px dashed #000;border-left: 0;border-right: 0;padding: 10px 0;margin:10px 0;line-height: 20px}
	.textarea{border:1px solid #C6C6C7;width:100%;height:50px;padding: 5px}
	.photo{
		display: block;
		width: 100%;
		line-height:45px; 
		border:0;background: #fff;
	}
</style>