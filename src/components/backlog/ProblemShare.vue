<template>
	<div style="font-size:12px">
		<CADialog v-show="caValue.isCAOpen" v-model="caValue" ></CADialog>
		<Headerbtns :title="'问题件回复'">
			<!-- <router-link to="/backlog" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link> -->
		</Headerbtns>
		<div class="manage-main-contents">
			<div v-show="show1">
				<div style="padding:5%">
					<p class="fontColor">投保审核通知书（非打印合同类）</p>
					<p class="textCenter">审核事项</p>
					<p class="border">尊敬的 {{appnt.appntName}} {{appnt.appntSex  == 2 ? '女士':'先生'}}：<br>
					&nbsp;本公司根据您所提交的投保申请，经详细审核后，需要您对以下问题进行确认并在客户说明栏中回复：<br>{{questcontent1}}</p>
					<p class="textCenter">回复内容</p>
					<div class="border">
						&nbsp;本人已收悉贵公司的《投保审核通知书》，对其内容已全部了解，对审核事项
						做以下回复说明，将其作为投保事项的补充说明并确保提交资料真实有效。
						具体回复内容如下：<br><br>
						<textarea class="textarea" v-model="content1"></textarea>
						<input type="checkbox"id="d1">本人由于以下原因，要求撤销此次投保申请<br>
						<input type="radio" id="d2"  value="1" name="radio">经济原因
						<input type="radio" id="d3"  value="1" name="radio">险种不理想
						<input type="radio" id="d4"  value="1" name="radio">服务不理想
						<input type="radio" id="d5"  value="1" name="radio">其他
					</div>
					<span class="tip">提示：1.本通知书是投保人、被保险人或法定监护人做相应变更、补充说明或确认之用，需经投保人
					、被保险人或法定监护人本人签字认可后方能生效，并作为投保书的组成部分。<br>
					2.如某一事项与原投保书有不一致之处，一律以本通知书为准。</span>
				</div>
				<p class="pstyle"></p>
			</div> 
			<div v-show="show2">
				<div style="padding:5%">
					<p class="fontColor">投保审核通知书（打印合同类）</p>
					<p class="textCenter">审核事项</p>
					<p class="border">尊敬的 {{appnt.appntName}} {{appnt.appntSex  == 2 ? '女士':'先生'}}：<br>
					&nbsp;本公司根据您所提交的投保申请，经详细审核后，需要您对以下问题进行确认并在客户说明栏中回复：<br>{{questcontent2}}</p>
					<p class="textCenter">回复内容</p>
					<div class="border">
						&nbsp;本人已收悉贵公司的《投保审核通知书》，对其内容已全部了解，对审核事项
						做以下回复说明，将其作为投保事项的补充说明并确保提交资料真实有效。
						具体回复内容如下：<br><br>
						<textarea class="textarea" v-model="content2"></textarea>
						<input type="checkbox"id="dd1">
						本人由于以下原因，要求撤销此次投保申请<br>
						<input type="radio" id="dd2" value="1" name="radio">经济原因
						<input type="radio" id="dd3" value="1" name="radio">险种不理想
						<input type="radio" id="dd4" value="1" name="radio">服务不理想
						<input type="radio" id="dd5" value="1" name="radio">其他
					</div>
					<span class="tip">提示：1.本通知书是投保人、被保险人或法定监护人做相应变更、补充说明或确认之用，需经投保人
					、被保险人或法定监护人本人签字认可后方能生效，并作为投保书的组成部分。<br>
					2.如某一事项与原投保书有不一致之处，一律以本通知书为准。</span>
				</div>
				<p class="pstyle"></p>
			</div> 
			<div v-show="show3">
				<div style="padding:5%">
					<p class="fontColor">业务员通知书（非打印合同类）</p>
					<p class="textCenter">审核事项</p>
					<p class="border">尊敬的 {{agent.agentName}} {{agent.agentSex == 2 ? '女士':'先生'}}：<br>
					  本公司根据您所提交的投保申请及业务人员报告书，经详细审核后，需要您对以下问题进行确认并在业务人员说明栏中进行补充更正：<br>{{questcontent3}}</p>
					<p class="textCenter">回复内容</p>
					<div class="border">
						&nbsp;本人已收悉公司的《业务员通知书》，对其内容已全部了解，现对审核事项做以下回复说明并保证回复说明真实有效。<br>
						&nbsp;具体回复内容如下：<br><br>
						<textarea class="textarea" v-model="content3"></textarea>
					</div>
					<span class="tip">提示：1.本通知书是业务员做相应变更、补充说明或确认之用，需经业务员签字认可后方能生效。<br>
					2.如某一事项与原投保书有不一致之处，一律以本通知书为准。<br>
					3.本通知书应自首次打印之日起三日内返回公司,未按时返回的将影响该投保书的新契约处理进度。</span>
				</div>
				<p class="pstyle"></p>
			</div>
			<div v-show="show4">
				<div style="padding:5%">
					<p class="fontColor">业务员通知书（打印合同类）</p>
					<p class="textCenter">审核事项</p>
					<p class="border">尊敬的 {{agent.agentName}} {{agent.agentSex == 2 ? '女士':'先生'}}：<br>
					  本公司根据您所提交的投保申请及业务人员报告书，经详细审核后，需要您对以下问题进行确认并在业务人员说明栏中进行补充更正：<br>{{questcontent4}}</p>
					<p class="textCenter">回复内容</p>
					<div class="border">
						&nbsp;本人已收悉公司的《业务员通知书》，对其内容已全部了解，现对审核事项做以下回复说明并保证回复说明真实有效。<br>
						&nbsp;具体回复内容如下：<br><br>
						<textarea class="textarea" v-model="content4"></textarea>
					</div>
					<span class="tip">提示：1.本通知书是业务员做相应变更、补充说明或确认之用，需经业务员签字认可后方能生效。<br>
					2.如某一事项与原投保书有不一致之处，一律以本通知书为准。<br>
					3.本通知书应自首次打印之日起三日内返回公司,未按时返回的将影响该投保书的新契约处理进度。</span>
				</div>
				<p class="pstyle"></p>
			</div>  
			<div class="f-flex" style="padding:5%">
				<div v-show="show1" class="photo" @click="select(1)">
					<p class="textCenter">投保审核(非打印)</p>
					<img  v-show="imgList_1.length>0" 
					v-for=" item in imgList_1"
					:src="item.src" style="width:140px;height:100px;">
					<img  
					:src="imageUrl" style="width:140px;height:100px;">
					<!-- <input type="file"  value="拍照"
					class="change" id="accessory"
					capture="camera"
                    accept="image/*"
					 @change="getUrl($event)"
					/>  -->
				</div>
				<div v-show="show2" class="photo display" @click="select(2)">
					<p class="textCenter">投保审核(打印类)</p>
					<img  v-show="imgList_2.length>0" 
					v-for=" item in imgList_2"
					:src="item.src" style="width:140px;height:100px;"/>
					<img id="accessory1" :src="imageUrl" style="width:140px;height:100px;">
					<!-- <input type="file"  value="拍照"
					class="change" id="accessory1"
					capture="camera"
                    accept="image/*" 
					 @change="getUrl1($event)"
					/>  -->
				</div>
				<div v-show="show3" class="photo" @click="select(3)">
					<p class="textCenter">业务员(非打印)</p>
					<img  v-show="imgList_3.length>0" 
					v-for=" item in imgList_3"
					:src="item.src" style="width:140px;height:100px;"/>
					<img id="accessory2" :src="imageUrl" style="width:140px;height:100px;">
					<!-- <input type="file"  value="拍照"
					class="change" id="accessory2"
					capture="camera"
                    accept="image/*"
					 @change="getUrl2($event)"> -->
				</div>
				<div v-show="show4" class="photo" @click="select(4)">
					<p class="textCenter">业务员(打类印)</p>
					<img  v-show="imgList_4.length>0" 
					v-for=" item in imgList_4"
					:src="item.src" style="width:140px;height:100px;"/>
					<img :src="imageUrl"  id="accessory3"
					style="width:140px;height:100px;">
					<!-- <input type="file"  value="拍照"
					class="change" id="accessory3"
					capture="camera"
                    accept="image/*" 
					 @change="getUrl3($event)"> -->
				</div>
				<mt-popup position="center" v-model="Show1" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo">
						<input type="file"  value="从相册选择"
						class="change" 
						multiple="multiple" 
						 @change="getUrl($event)"
						/>  从相册选择
					</button>
					<hr>
					<button class="photo">
                         <input type="file"  value="拍照"
                         capture="camera"
                         accept="image/*"
                         class="change" 
                          @change="getUrl($event)"/> 拍照
					</button>
				</mt-popup>
				<mt-popup position="center" v-model="Show2" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo">
						<input type="file"  value="从相册选择"
						class="change" 
						multiple="multiple" 
						 @change="getUrl1($event)"
						/>  从相册选择
					</button>
					<hr>
					<button class="photo">
                         <input type="file"  value="拍照"
                         capture="camera"
                         accept="image/*"
                         class="change" 
                          @change="getUrl1($event)"/> 拍照
					</button>
				</mt-popup>
				<mt-popup position="center" v-model="Show3" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo">
						<input type="file"  value="从相册选择"
						class="change" 
						multiple="multiple" 
						 @change="getUrl2($event)"
						/>  从相册选择
					</button>
					<hr>
					<button class="photo">
                         <input type="file"  value="拍照"
                         capture="camera"
                         accept="image/*"
                         class="change" 
                          @change="getUrl2($event)"/> 拍照
					</button>
				</mt-popup>
				<mt-popup position="center" v-model="Show4" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo">
						<input type="file"  value="从相册选择"
						class="change" 
						multiple="multiple" 
						 @change="getUrl3($event)"
						/>  从相册选择
					</button>
					<hr>
					<button class="photo">
                         <input type="file"  value="拍照"
                         capture="camera"
                         accept="image/*"
                         class="change" 
                          @change="getUrl3($event)"/> 拍照
					</button>
				</mt-popup>
			</div>
			<div class="f-flex" style="padding:5%">
				<div v-show="appntSignShow">
					<p class="textCenter">投保人签字</p>
					<a :href="href.sign24" >
						<img style="width:110px;height:100px;" id="xss_24" :src="wrting" class="qxImg" @click="info">
					</a>
				</div>
				<div v-show="appntSignShow">
					<p class="textCenter">被保人签字</p>
					<a :href="href.sign25" >
						<img style="width:110px;height:100px;" id="xss_25" :src="wrting" class="qxImg"  @click="info">
					</a>
				</div>
				<div v-show="agentSignShow">
					<p class="textCenter">代理人签字</p>
					<a :href="href.sign23" >
						<img style="width:110px;height:100px;" id="xss_23" :src="wrting" class="qxImg" @click="info">
					</a>
				</div>
			</div>
			<button class="btnn" @click="submitProblem">提交</button>
		</div>
		<alert ref="showalert"></alert> 
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import alert from '../policy/common/alert.vue'
	import CADialog from '../common/CADialog'
	import Headerbtns from '../policy/common/Header.vue'
	import camera from '../../../static/js/cordova_camera.js'
	export default {
	  name: 'problemShare',
	  components: {Headerbtns,CADialog,alert},
	  data(){
	  	return{
	  		Show1:false,
	  		Show2:false,
	  		Show3:false,
	  		Show4:false,
	  		agentSignShow:false,
	  		appntSignShow:false,
	  		href:{
	  			sign23:"http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ==",
	  			sign24:"http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ==",
	  			sign25:"http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ=="
	  		},
	  		signImgs:{
	  			agent_signt:''
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
	  		wrting:'data:image/jpeg;base64,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',
	  		caValue:{
		  			isCAOpen:false,
		  			image:"",
		  			date:""
		  		},
		  	signImg:{
		  		appntSign:'',
		  		insSign:'',
		  		agentSign:'',
		  	},
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
		  	agentCode:"",
		  	applyCode:this.$route.params.applyCode,
		  	orderId:this.$route.params.orderId,
		  	appnt:{
		  		appntName:'',
		  		appntSex:''
		  	},
		  	agent:{
		  		agentCode:'',
		  		agentName:'',
		  		agentSex:''
		  	},
		  	insurants:{
		  		insurantName:'',
		  		insurantSex:''
		  	},
		  	accessory:{
		  		accessory1:'',
		  		accessory2:'',
		  		accessory3:'',
		  		accessory4:''
		  	},
		  	content1:'',//回复内容
		  	content2:'',
		  	content3:'',
		  	content4:'',
		  	requestParam:'',
		  	TB_3010101_N:'',
		  	TB_3010101_Y:'',
		  	TB_3010201_N:'',
		  	TB_3010201_Y:'',
		  	prtSeq1:'',
		  	prtSeq2:'',
		  	prtSeq3:'',
		  	prtSeq4:'',
		  	subType:'',//打印非打印
		  	questcontent1:'',
		  	questcontent2:'',
		  	questcontent3:'',
		  	questcontent4:'',
		  	birthday:'',
		  	nowYear:''
	  	}
	  },
	  beforeMount(){
		  	let content1 = utils.cache.get("content1")
		  	let content2 = utils.cache.get("content2")
		  	let content3 = utils.cache.get("content3")
		  	let content4 = utils.cache.get("content4")
		  	console.log(content1,'===========')
		  	if (content1 != null) {
		  		this.content1 = content1;
		  	}
		  	if (content2 != null) {
		  		this.content2 = content2;
		  	}
		  	if (content3 != null) {
		  		this.content3 = content3;
		  	}
		  	if (content4 != null) {
		  		this.content4 = content4;
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
	  		//提交配置
	  		commitConfig()
	  },
  	  computed:{
  	  	caInfo(){
  	  		return this.caValue.image
  	  	}
  	  },
  	  watch:{
  	  	caInfo(val, oldval){
  	  		console.log(val.context_id,'=================')
  	  		if(val != undefined){
	  			this.imageUpload(val.context_id,val.value)
	  			console.log(val.context_id,val.value)
	  		}
  	  	}
  	  },
	  methods:{
	  	info(){
	  		utils.cache.set("content1",this.content1)
	  		utils.cache.set("content2",this.content2)
	  		utils.cache.set("content3",this.content3)
	  		utils.cache.set("content4",this.content4)
	  	},
	  	getUrl(e){
	  		this.Show1 = false
	            var imgs=document.getElementById('accessory');
	                var reader=new FileReader();
	                reader.readAsDataURL(e.target.files[0]);
	                let that = this
	                reader.onload=function(e){
					      	// console.log(e.target.result.substring(23))
	                    // var url = e.target.result
	                    // imgs.src=e.target.result;
    					let item = {}
    					item.src = e.target.result
        				that.imgList_1.push(item)
	            }
	  	},
  	  	getUrl1(e){
  	  		this.Show2 = false
  	            var imgs=document.getElementById('accessory1');
  	                var reader=new FileReader();
  	                reader.readAsDataURL(e.target.files[0]);
  	                let that = this
  	                reader.onload=function(e){
  					      	// console.log(e.target.result.substring(23))
	  	              //   var url=e.target.result;
		                // imgs.src=url;
	 					let item = {}
	 					item.src = e.target.result
	     				that.imgList_2.push(item)
  	            }
  	  	},
  	  	getUrl2(e){
  	  		this.Show3 = false
  	            var imgs=document.getElementById('accessory2');
  	                var reader=new FileReader();
  	                reader.readAsDataURL(e.target.files[0]);
  	                let that = this
  	                reader.onload=function(e){
  					      	// console.log(e.target.result.substring(23))
	  	                // var url=e.target.result;
	  	                // imgs.src=url;
	   					let item = {}
	   					item.src = e.target.result
	       				that.imgList_3.push(item)
  	            }
  	            console.log(this.imgList_3)
  	  	},
  	  	getUrl3(e){
  	  		this.Show4 = false
  	            var imgs=document.getElementById('accessory3');
  	                var reader=new FileReader();
  	                reader.readAsDataURL(e.target.files[0]);
  	                let that = this
  	                reader.onload=function(e){
  					      	// console.log(e.target.result.substring(23))
  	                 //    var url=e.target.result;
	  	                // imgs.src=url;
	   					let item = {}
	   					item.src = e.target.result
	       				that.imgList_4.push(item)
  	            }
  	            console.log(this.imgList_4)
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
	  					"imageType":context_id+'1',
	  					"imageName":"签字照片",
	  					"imageByte":image.substring(22,image.length)
	  				}]
	  	}
	  		  }
	  		  console.log(requ,'签字参数')
	  		  if(requ.upload.imageList[0].imageByte!=undefined && requ.upload.imageList[0].imageByte!=""){
	  			utils.http.postFast('MOUPLOAD',requ,(body)=>{
	  				console.log(body.resultMessage)
	  				if(body.resultMessage == "上传影像成功！"){
	  						if(context_id == 24){
	  							document.getElementById('xss_24').src = ""
	  							document.getElementById('xss_24').src = image
	  							this.signImg.appntSign=image
	  						}else if(context_id == 25){
	  							document.getElementById('xss_25').src = ""
	  							document.getElementById('xss_25').src = image
	  							this.signImg.insSign = image
	  						}else if(val.context_id == 23){
				  				document.getElementById('xss_23').src = ""
				  				document.getElementById('xss_23').src = image
				  				this.signImg.agentSign = image
				  			}
	  					}
	  				})
	  			}
	  		}
	  	},
	  	//获取subType判断显示
	  	getMsg(){
	  		let requestParam = {
	                "policy": {
	                    "substepNo": "",
	                    "orderCode": this.orderId
	                }
	            }
	        utils.http.postFast('MOHQPOLICYMSG',requestParam,(body)=>{
	        	this.subType = body.policy.problemInfo
	        	console.log(this.subType,'=============')
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
            	let result = body.policy
            	console.log(result,'----------')
            	this.agent.agentName = result.agentInfo.name
            	this.agent.agentSex = result.agentInfo.sex
            	this.appnt.appntName = result.custInfo.appnt.appntName
            	this.appnt.appntSex = result.custInfo.appnt.appntSex
            	this.insurants.insurantName = result.custInfo.insurants.insurant[0].name
            	this.insurants.insurantSex = result.custInfo.insurants.insurant[0].sex
            	console.log(this.insurants.insurantName)
            	console.log(this.insurants.insurantSex)
            	let idCards = result.custInfo.idCards
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
	  			let host = window.globalConfig.rootUrl.split('/')[2]
	  			let sign23Str = this.agent.agentName 
		  			+"-"+ result.agentInfo.idno
		  			+"-"+ 11
		  			+"-"+ this.orderId 
		  			+"-"+ this.applyCode  
		  			+"-"+ 23 
		  			+"-"+ 4
	  			let sign25Str = result.custInfo.insurants.insurant[0].name 
	  				+"-"+ result.custInfo.insurants.insurant[0].idNo
	  				+"-"+ result.custInfo.insurants.insurant[0].idType
	  				+"-"+ this.orderId
	  				+"-"+ this.applyCode
	  				+"-"+ 25 +"-"+4
	  			let sign24Str =  this.appnt.appntName
	  				+"-"+ result.custInfo.appnt.idNo
	  				+"-"+ result.custInfo.appnt.idType
	  				+"-"+ this.orderId  
	  				+"-"+ this.applyCode 
	  				+"-"+ 24 +"-"+ 4
	  			let sign26Str =  this.appnt.appntName
	  				+"-"+ result.custInfo.appnt.idNo
	  				+"-"+ result.custInfo.appnt.idType
	  				+"-"+ this.orderId  
	  				+"-"+ this.applyCode 
	  				+"-"+ 25 +"-"+ 4
	  				console.log(sign23Str)
	  				console.log(sign24Str)
	  				console.log(sign25Str)
	  			this.href.sign24 = "http://" + host + "/com.ifp.ipartner/faceid/" + window.Base64.encode(sign24Str)
	  			this.href.sign23 = "http://" + host + "/com.ifp.ipartner/faceid/" + window.Base64.encode(sign23Str)
	  			this.birthday = result.custInfo.insurants.insurant[0].idNo.substring(6,10)
	  			this.nowYear =new Date().getFullYear();
	  			console.log(this.nowYear-this.birthday)
	  			if(this.nowYear-this.birthday>=18){
	  				this.href.sign25 = "http://" + host + "/com.ifp.ipartner/faceid/" + window.Base64.encode(sign25Str)
	  			}else{
	  				this.href.sign25 = "http://" + host + "/com.ifp.ipartner/faceid/" + window.Base64.encode(sign26Str)
	  			}

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
	  	openCADialog(num){
  			this.caValue.isCAOpen = !this.caValue.isCAOpen
  			this.caValue.iamge = ""
  			showPopupDialog(num)
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
					"name":"",
					"cardId":"",
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
    	//
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
    	//提交问题件
    	submitProblem(){
    		console.log(this.imgList_3)
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
	                        "insuredName":this.insurants.insurantName,
	                        "noticeCode":"",
	                        "orgName":"第三营销服务部",
	                        "printDate":"",
	                        "questContent":this.questcontent1,
	                        "reasonNum":"",
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
	                        "insuredName":this.insurants.insurantName,
	                        "noticeCode":"",
	                        "orgName":"第三营销服务部",
	                        "printDate":"",
	                        "questContent":this.questcontent2,
	                        "reasonNum":"",
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
	                        "insuredName":this.insurants.insurantName,
	                        "noticeCode":"",
	                        "orgName":"第三营销服务部",
	                        "printDate":"",
	                        "questContent":this.questcontent3,
	                        "reasonNum":"",
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
	                        "insuredName":this.insurants.insurantName,
	                        "noticeCode":"",
	                        "orgName":"第三营销服务部",
	                        "printDate":"",
	                        "questContent":this.questcontent4,
	                        "reasonNum":'',
	                        "replyContent":this.content4
	                        // "extPages":[{"imageName":"",
                         //   				"imageByte":this.imgList_4
                         //   			}]
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
				
				this.TB_3010101_N.noticeCode += this.prtSeq1
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
				this.TB_3010101_Y.noticeCode += this.prtSeq2
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
				this.TB_3010201_N.noticeCode += this.prtSeq3
				this.requestParam.policy.TB_3010201_N = this.TB_3010201_N
				this.requestParam.policy.dzType += '3010201_N,'
				if(this.imgList_3 != ""){
					for(let i of this.imgList_3){
						let src = i.src.split(',')
						// img_str_3.push(src[1])
						this.requestParam.policy.extPages.push({"imageName":"3010201_N",
						  	"imageByte":src[1]
						     })
					}
					// this.requestParam.policy.extPages.push({"imageName":"3010201_N","imageType":'3010201_N附件',
					// 		  	"imageByte":img_str_3
					// 		     })
					
				}
			}
			if(this.show4 == true && ispass){
				ispass = this.agent2();
				this.TB_3010201_Y.noticeCode += this.prtSeq4
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
	            		this.$refs.showalert.showMOdal('回复成功,请关闭页面!')
	            		$('.btnn').prop('disabled',true)
	            		$('.btnn').css({'opacity':0.5})
            		}else{
            			this.$refs.showalert.showMOdal(result.resultMessage)
            		}
            	})
			}
	  	},
	  	business1(){
	  		console.log("this.content1"+this.content1)
	  		console.log("this.appntSign"+this.signImg.appntSign)
	  		console.log("this.insSign"+this.signImg.insSign)
	  		
			if(this.content1 === "" || this.content1 === null){
				this.$refs.showalert.showMOdal('回复内容不能为空!')
				return false
			}
			if(this.signImg.appntSign === "" || this.signImg.appntSign === null){
				this.$refs.showalert.showMOdal('投保人签字不能为空！')
				return false
	    	}
	    	if(this.signImg.insSign === "" || this.signImg.insSign === null){
				this.$refs.showalert.showMOdal('被保人签字不能为空！')
				return false
	    	}
	    	
			return true
	  	},
	  	business2(){
	  		console.log("this.content2"+this.content2)
	  		console.log("this.appntSign1"+this.signImg.appntSign1)
	  		console.log("this.insSign1"+this.signImg.insSign1)
			if(this.content2 === "" || this.content2 === null){
	    		this.$refs.showalert.showMOdal('回复内容不能为空！')
	    		return false
			}
			if(this.signImg.appntSign === "" || this.signImg.appntSign === null){
				this.$refs.showalert.showMOdal('投保人签字不能为空！')
	    		return false
	    	}
	    	if(this.signImg.insSign === "" || this.signImg.insSign === null){
				this.$refs.showalert.showMOdal('被保人签字不能为空！')
				return false
			}
	    	return true
	  	},
	  	agent1(){
	  		console.log("this.content3"+this.content3)
	  		console.log("this.agentSign"+this.signImg.agentSign)
			if(this.content3 === "" || this.content3 === null){
       			this.$refs.showalert.showMOdal('回复内容不能为空！')
	    		return false
    		}
    		if(this.signImg.agentSign === "" || this.signImg.agentSign === null){
        		this.$refs.showalert.showMOdal('代理人签字不能为空！')
	    		return false
    		}
    		return true
	  	},
	  	agent2(){
	  		console.log("this.content4"+this.content4)
	  		console.log("this.agentSign1"+this.signImg.agentSign1)
			if(this.content4 == "" || this.content4 == null){
        		this.$refs.showalert.showMOdal('回复内容不能为空！')
				return false
    		}
    		if(this.signImg.agentSign=== "" || this.signImg.agentSign === null){
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
	.photo{
		display: block;
		position: relative;
		width: 100%;
		line-height:40px; 
		border:0;background: #fff;
	}
	.manage-main-contents{
		width: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;bottom: 0;
		overflow-y: auto;
		/* padding:5%; */
	}
	.tip{color: #F4A200;line-height: 15px}
	.button{position:relative;border:none;padding:0;}
	.change{
	    opacity: 0;
	    position: absolute;
	    overflow: hidden;
	    right: 0;
	    top: 0;
	    width: 100%;
	    height: 100%
	}
	.textCenter{
		text-align: center;
	}
	.display{display: inline-block}
	.pstyle{ width:100%;height:10px;border:1px solid #CECECE;background:#EAEAEA;margin:15px 0}
	.fontColor{color: #F4A200;padding:5px 0;font-size: 18px}
	.border{border:1px dashed #000;border-left: 0;border-right: 0;padding: 10px 0;margin:10px 0;line-height: 20px}
	.content{
		border: 1px solid #000;margin: 5px auto;padding: 5px;
	}
	.textarea{border:1px solid #C6C6C7;width:100%;height:50px;padding: 5px}
</style>