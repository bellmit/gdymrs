<!--业务员报告书页面-->
<template>
	<div id="content">
		<Headerbtns :title = page_title>
			<div slot="left" class="back" @click="pre">
          		<i class="fa fa-angle-left" ></i>
        	</div>
			<div slot="right" class="back" @click="sheetVisible = !sheetVisible">
				<i class="fa fa-ellipsis-v" style="display: inline-block;width: 100%;height: 100%;line-height: 55px;text-align: center;font-size: 24px"></i>
			</div>
		</Headerbtns>
		<div class="manage-main-contents" >
			<v-touch class="touch-wrapper" @swipeleft="right" @swiperight="left"  v-bind:swipe-options="{ direction:'horizontal', threshold: 50 }">
			<div id="reportBookCtl1" style="width: 90%;" v-show="toggle.content_show">
			    <div align="center" style="font-size: 22px;margin-top: 10px;position: relative;left: 7%"><b id="headerB"></b></div><br/>
				    <div v-show="toggle.conduit_show">
					    <div style="margin-left: 15px; width: 100%; text-indent: 1em;">
					        <b>第一部分</b>
					    </div><br/>
					    <div style="margin-left: 15px; width: 100%; text-indent: 1em;">
					    1.本投保是经由下列途径完成：
					    </div><br/>
					    <div style="margin-left: 15px;text-indent: 2em;">
					        <input type="checkbox" @click="checkApproach('jiashu')" id="jiashu"/>家属
					        <input type="checkbox" @click="checkApproach('qinqi')" id="qinqi"/>亲戚
					        <input type="checkbox" @click="checkApproach('friend')" id="friend"/>朋友介绍
					        <input type="checkbox" @click="checkApproach('zhijie')" id="zhijie"/>直接销售
					        <input type="checkbox" @click="checkApproach('zhudong')" id="zhudong"/>主动投保
					        <input type="checkbox" @click="checkApproach('addPrem')" id="addPrem"/>加保
					        <input type="checkbox" @click="checkApproach('other')" id="approach_other"/>其他方式
					        <input type="text" style="border-bottom: 1px black solid;width: 100px;" 
					        	v-model="policy.policyInfo.approachDes" 
					        	v-show="toggle.approach_other_hide">
					    </div><br/>
					    <div style="margin-left: 15px; width: 100%; text-indent: 1em;">
					        2.投保人的投保目的：（如未选择，默认为“保障”）
					    </div><br/>
					    <div style="margin-left: 15px; width: 100%; text-indent: 2em;">
					        <input type="checkbox" @click="checkPurpose('baozhang')" id="baozhang"/>保障
					        <input type="checkbox" @click="checkPurpose('chuxu')" id="chuxu"/>储蓄
					        <input type="checkbox" @click="checkPurpose('education')" id="education"/>教育金
					        <input type="checkbox" @click="checkPurpose('touzi')" id="touzi"/>投资
					        <input type="checkbox" @click="checkPurpose('other')" id="purpose_other"/>其他
					        <input type="text" style="border-bottom: 1px black solid;width:60px"
					        	v-model="policy.policyInfo.purposeDes" 
					        	v-show="toggle.agentreport_other_hide">
					    </div><br/>
					    <div style="margin-left: 15px; width: 100%; text-indent: 1em;">
					        3.投保人的经济状况：
					    </div><br/>
					    <div style="margin-left: 15px; width: 100%; text-indent: 2em;">
					        年收入：（人民币）
					        <input type="text" onkeyup="value=value.replace(/[^\d]/g,'')" style="border-bottom: 1px black solid;width:60px;font-size:100%" 
					        	v-model="policy.policyInfo.annualIncome" readonly> 万元,
					        来源：
					        <input type="text" maxlength="200" style="border-bottom: 1px black solid;width:53px;font-size:100%" 
					        	v-model="policy.policyInfo.sourceOfIncome">，
					        总资产约 
					        <input type="text" onkeyup="value=value.replace(/[^\d]/g,'')"
					        	style="border-bottom: 1px black solid;width:60px;font-size:100%" v-model="policy.policyInfo.totalAssets"> 万元
					    </div><br/>
					    <div style="margin-left: 15px; width: 100%; text-indent: 1em;">
					        <b>第二部分</b>
					    </div><br/>
				    	</div>
					    <div style="margin-left: 15px; width: 100%; text-indent: 2em;">
					        投保人的投保行为是否受“除投保人、被保险人、受益人以外的人员或机构（即第三方）”的要求或是由其提供资金而发生的：
					    </div><br/>
					    <div style="margin-left: 15px; width: 100%; text-indent: 2em;">
					        <input id="thirdId_1" type="checkbox" @click="checkthirdPtIdentity(1)"/>是
					        <input id="thirdId_0" type="checkbox" @click="checkthirdPtIdentity(0)"/>否
					        <input id="thirdId_2" type="checkbox" @click="checkthirdPtIdentity(2)"/>无法识别，但有理由怀疑存在第三方
					    </div><br/>
					    <div style="margin-left: 15px; width: 100%; text-indent: 1em;">
					        1.若“是”，请填写以下有关第三方的信息：
					    </div><br/>
					    <div style="margin-left: 15px;  text-indent: 2em;">
					        姓名/机构名称：<input type="text" style="border-bottom: 1px black solid; width: 40%;" 
					        			v-model="policy.policyInfo.thirdPtName">
					    </div><br/>
					    <div style="margin-left: 15px; width: 100%; text-indent: 2em;">
					        联系方式：<input maxlength="11" type="text" style="border-bottom: 1px black solid;width: 50%;"  
					        		v-model="policy.policyInfo.thirdPtContact">
					    </div><br/>
					    <div style="margin-left: 15px; width: 100%; text-indent: 2em;">
					        与投保人关系：
					        <select name="" id="relationSelect" style="width: 30%" @change="clickRelation()">
					        	<option v-for="itm in dict.relationList.relation.item" :value="JSON.stringify(itm)">
					        		{{itm.text}}
					        	</option>
					        </select>
					        <div id="otherRelationDiv" v-show="toggle.other_relation_show">
					           其他关系: <input type="text" id="otherRelationInput" 
					           	onkeyup="changeOtherRelation(this.value)" 
					           	style="border-bottom: 1px black solid; width: 50%;"  
					           	v-model="policy.policyInfo.thirdPtRelToApp">
					        </div>
					    </div><br/>
					    <div style="display:flex;margin-left: 15px; width: 100%; text-indent: 2em;">
							<p>地&nbsp;&nbsp;&nbsp;&nbsp;址：</p>
					        <input type="text" style="border-bottom: 1px black solid; width: 65%;" v-model="policy.policyInfo.thirdPtAddr">
					    </div><br/>
					    <div style="margin-left: 15px; width: 100%; text-indent: 1em;">
					        2.若“无法识别，但有理由怀疑存在第三方”，请注明怀疑原因：
					    </div><br/>
				    <div style="display:flex;margin-left: 15px;width: 100%; text-indent: 2em;margin-bottom: 10px;">
				    	<p style="width: 40%;">怀疑原因:</p>
				    	<input type="text" style="border-bottom: 1px black solid;width: 65%;" v-model="policy.policyInfo.thirdPtRemark"> 
				    </div>
			</div>
			</v-touch>
		</div>
		<alert ref="alert"></alert>
		<Footerbtns :is_show=false :disabled="true"
			total_premium="00.00">
			<button class="btnFoote" slot="center" @click="next">
				下一步
			</button>
		</Footerbtns>
		<mt-actionsheet
			:actions="actions"
			v-model="sheetVisible">
		</mt-actionsheet>
		<Modal ref="btn" :title="'温馨提示'" :content="hintContent" 
		@detonate="detonate" @cancel="cancel"></Modal>
	</div>
</template>

<!--js-->
<script>
	import { MessageBox } from 'mint-ui'
	import { Actionsheet } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import Footerbtns from '../policy/common/Footer.vue'
	import Modal from '../policy/common/Modal.vue'
	import relationList from '../../../static/dict/relation_salesman_sunlife.json'
	import picker from '../common/Picker.vue'
	import alert from '../policy/common/alert.vue'
	export default{
		name:'salesman_report_page',
  		components: {Headerbtns,Footerbtns,picker,Modal,Actionsheet,alert},
		data () {
	    return {
			sheetVisible:false,
			actions:[
						{
							name:"刷新页面",
							method:this.winReload
						}
			 ,
			 {
               name:"返回首页",
               method:this.backHome
             }
             ],
	    	page_title:'业务人员报告书',
			optionsValue:'',
			isHaveAppInform:false,
	      	toggle:{
	      		content_show:true,
	    		conduit_show:true,
	    		approach_other_hide:false,
	    		agentreport_other_hide:false,
	    		other_relation_show:false,
	    	},
	    	temp:{
	    		approachArr:[],
	    		purposeArr:[],
	    	},
	    	dict:{
				relationList:relationList,//关系字典
			},
			hintContent:"",
			applyCode:"",
	      	policy:{
	      		deviceNo: "",
				channel: utils.cache.get('personsal').channel,
				substepNo: "7",
				isInsert: "",
				agentCode: utils.cache.get('personsal').agentCode,
				orderCode: this.$route.params.planId,
	      		policyInfo:{
				  approach : "",//途径
				  approachDes : "",//其他途径
				  purpose : "",//目的
				  purposeDes : "",//其他目的
				  annualIncome : "", //年收入
				  conduit : "", //银保综金区别
				  sourceOfIncome : "", //来源
				  thirdPtAddr : "", //联系地址
				  thirdPtContact : "", //联系方式
				  thirdPtIdentity : "",//第二部分是,否,无法识别
				  thirdPtName : "", //机构名称
				  thirdPtRelToApp : "", //其他关系
				  thirdPtRemark : "", //怀疑原因
				  totalAssets : "" //总资产
				},
				channel:"",
	      	},
	      	relToApp:'',//保存投被保人信息
	      	productCode:''//鑫玺人生code
	    }
	  },
	  methods:{
	   left(){
         this.pre()
	    },
	    right(){
		  this.next()
	     },
		  //返回首页
         backHome(){
            this.$router.push("/home");
         },
		  winReload:function(cond){
				window.location.reload();
			},
		   pre(){
			if(this.isHaveAppInform){
				if(this.relToApp == '00' && this.productCode == 'NPP016'){
					this.$router.push({
						name: 'inform_page',
						params: {
							planId: this.$route.params.planId
						}
					})
				}else{
					this.$router.push({
						name: 'inform_app_page',
						params: {
							planId: this.$route.params.planId
						}
					})
				}
			}else{
				this.$router.push({
					name: 'inform_page',
					params: {
						planId: this.$route.params.planId
					}
				})
			}
		},
		getPolicyMsg(productDefList){
			//加载代理人信息
			let agent = utils.cache.get(utils.constants.getAgentKey())
			if (agent!=null) {
				let requ = {
					"policy":{
						"substepNo":"7",
						"orderCode":this.$route.params.planId
					}
				} 
				utils.http.postFast('MOHQPOLICYMSG',requ,(body)=> {
					let policy = body.policy
					this.relToApp = policy.custInfo.insurants.insurant[0].relToApp
					let extra = []
					let productsArr = policy.productInfo.products.product
					this.productCode = productsArr[0].prodCode
					for (var i = 0; i < productsArr.length; i++) {
						if(productsArr[i].isMaster != '1'){
							extra.push(productsArr[i])
						}
					}
					if(productDefList[0].productDefine.hasHealthTold == true 
						|| productDefList[0].productDefine.hasHealthTold == "true"){
							this.isHaveAppInform = true
					}else{
						let extraList = productDefList[0].extraList
						for(var i=0;i<extraList.length;i++){
							for(var j=0;j<extra.length;j++){
								if(extra[j].prodCode == extraList[i].productCode){
									if(extraList[i].productDefine.hasHealthTold == true 
										|| extraList[i].productDefine.hasHealthTold == "true"){
											this.isHaveAppInform = true
											break
									}
								}
							}
						}
					}
					this.policy.policyInfo = policy.policyInfo
					// if(this.policyInfo.approach != undefined && this.policyInfo.approach != ""){
					// 	this.temp.approachArr = this.policyInfo.approach.splice(",")
					// }
					// if(this.policyInfo.purpose != undefined && this.policyInfo.purpose != ""){
					// 	this.temp.purposeArr = this.policyInfo.purpose.splice(",")
					// }
					if (agent.edition == '1'){
						this.toggle.conduit_show = false;
						this.policy.policyInfo.conduit = '1'
						document.getElementById('headerB').innerText = '';
					}else if (agent.edition == '2'){
						this.toggle.conduit_hide = true;
						this.policy.policyInfo.conduit = '2'
					}
					if(this.policy.policyInfo.annualIncome == undefined || this.policy.policyInfo.annualIncome == ""){
						this.policy.policyInfo.annualIncome = policy.custInfo.appnt.salary
					}
					if (this.policy.policyInfo.conduit == undefined || this.policy.policyInfo.conduit == "") {
						this.showMsg("缺少重要参数,请联系管理员!")
					}
					this.initCheckBox()
				})
			}else{
				this.toggle.content_show = false
				this.showMsg('代理人信息获取失败')
			}
		},
		//产品定义接口
		productDef:function(callback){
			let requ1 = {
				"productDef": {
					"agentCode":utils.cache.get('personsal').agentCode,
					"productCode": utils.cache.get('productCode'),
					"token": new Date().getTime(),
					"openId": "1"
				}
			}
			utils.http.postFast('PRODUCTDEFLIST',requ1,(body)=> {
				let productDefList = body.productDefList
				callback(productDefList)
			})
		},
		// 修改
		detonate(){
			this.problemmodify("0")
		},
		// 不修改
		cancel(){
			this.problemmodify("1")
		},
		problemmodify:function(tag){
			let requ = {
				"policy": {
					"agentCode": utils.cache.get('personsal').agentCode,
					"applyCode": this.applyCode,
					"yesOrNo": tag
			 	}
			} 
			utils.http.postFast('MOPROBLEMMODIFY',requ,(body)=> {
          		let policy = body.policy
				  console.log(policy)
				  if(tag == "0"){
					let orgId = utils.cache.get('personsal').orgId
					let substepNo = this.$route.params.substepNo
					console.log(substepNo)
					if (orgId.substring(0, 4) == "8661") { //重庆机构
						this.$router.push({
							name: "questionnaire_page",
							params: {
								planId: this.$route.params.planId
							}
						})
					}else{ //非指定机构进产品详情页面
						this.$router.push({
							name: 'customer_details_page',
							params: {
								planId: this.$route.params.planId
							}
						})
					}
				  }else{//不修改继续操作
	      			if(this.channel == "13" || this.channel == "02"){
	      				this.$router.push({
							name: 'ElectronicsYinBaoPolicyPage',
							params: {
								planId: this.$route.params.planId,
								applyCode:policy.applyCode
							}
						})
	      			}else{
	      				this.$router.push({
							name: 'electronics_policy_page',
							params: {
								planId: this.$route.params.planId,
								applyCode:policy.applyCode
							}
						})
	          		}
				  }
        	})
		},
	  	insure:function(planId){
	        let requ = {
	            "policy": {
	                "agentCode": utils.cache.get('personsal').agentCode,
	                "activityid": "",
	                "orderCode": planId
	          }
	        }
	        utils.http.postFast('MOORDERDEAL',requ,(body)=> {
          		let policy = body.policy
          		if(policy.resultCode == "0"){
          			if(this.channel == "13" || this.channel == "02"){
          				this.$router.push({
							name: 'ElectronicsYinBaoPolicyPage',
							params: {
								planId: planId,
								applyCode:policy.applyCode
							}
						})
          			}else{
          				this.$router.push({
							name: 'electronics_policy_page',
							params: {
								planId: planId,
								applyCode:policy.applyCode
							}
						})
	          		}
          		}else if(policy.resultCode == "1"){
					if(policy.problemFlag == "1"){//问题件
						this.applyCode = policy.applyCode
						this.hintContent = policy.applyCode + "\n" +policy.resultMessage + "\n是否进行修改?"
			 			this.$refs.btn.showMOdal()
					}else{
						this.showMsg(policy.resultMessage)
					}
          		}else{
					this.showMsg(policy.resultMessage)
				}
        	})
      	},
      	toCustomerDetailsPage: function(orderCode) {
			this.$router.push({
				name: 'customer_details_page',
				params: {
					planId: orderCode
				}
			})
		},
	  	next(){
	  		let isPass = this.checkData()
	  		if (isPass) {
	  			let policy = this.policy
	  			let approach = policy.policyInfo.approach
	  			approach = (approach.substring(approach.length-1)==',')?approach.substring(0,approach.length-1):approach;
	  			policy.policyInfo.approach = approach
	  			let purpose = policy.policyInfo.purpose
	  			purpose = (purpose.substring(purpose.length-1)==',')?purpose.substring(0,purpose.length-1):purpose;
	  			policy.policyInfo.purpose = purpose
	  			let requ = {
	  				"policy":policy
	  			}
			    utils.http.postFast('MODISTRIESAVE',requ,(body)=> {
	          		let policy = body.policy
	          		if(policy.resultCode == "0"){
						  this.insure(policy.orderId)
						  this.planId = policy.orderId
	          		}else{
	          			this.showMsg(policy.resultMessage)
	          		}
	        	})
	  		}
	  	},
	  	toElectronicsPolicyPage:function(){
	  		this.$router.push({
		  			name:'electronics_policy_page',
		  			params:{
		  				policyName:this.optionsValue
		  			}
		  		})
	  	},
	  	showMsg:function(msg){
	  		// utils.ui.modal.afterOpen()
	  		// MessageBox({
			// 	title: '提示',
			// 	message: msg
			// }).then(()=>{
            // 	// utils.ui.modal.beforeClose()
			// })
			//   alert(msg)
			if(msg!=undefined && msg!=""){
				this.$refs.alert.showMOdal(msg)
			}
	  	},
	  	//校验数据
	  	checkData:function(){
	  		var result = '';
	  		if (!this.toggle.content_show) {
	  			this.showMsg('代理人信息获取失败')
	  			return false
	  		}
	  		let policyInfo = this.policy.policyInfo
            if (policyInfo.conduit == '2') {
                if (!policyInfo.approach) {
                    this.showMsg('投保途径为必选项,请检查.')
                    return false
                } else {
                    if (this.toggle.approach_other_hide == true && !policyInfo.approachDes) {
                        this.showMsg('当投保路径为其他时,请手动录入.')
                    	return false
                    }
                }
                if (!policyInfo.purpose) {
                    this.showMsg('投保目的为必填项,请检查.')
                    return false
                } else {
                    if (this.toggle.agentreport_other_hide == true && !policyInfo.purposeDes) {
                        this.showMsg('当投保目的为其他时,请手动录入.')
                    	return false
                    }
                }
                if (!policyInfo.annualIncome) {
                    this.showMsg('年收入为必填项,请检查')
                    return false
                } else if (isNaN(policyInfo.annualIncome)) {
                    this.showMsg('年收入必须为数字,请检查')
                    return false
                }
                if (!policyInfo.sourceOfIncome) {
                    this.showMsg('收入来源为必填项,请检查')
                    return false
                } else if (policyInfo.sourceOfIncome.length > 200) {
                    this.showMsg('收入来源不超过200个字,请检查')
                    return false
                }
                if (!policyInfo.totalAssets) {
                    this.showMsg('总资产为必填项,请检查')
                    return false
                } else if (isNaN(policyInfo.totalAssets)) {
                    this.showMsg('总资产必须为数字,请检查')
                    return false
                }
                if(Number(policyInfo.annualIncome) > Number(policyInfo.totalAssets)){
                	this.showMsg('总资产必须大于等于投保人年收入,请检查')
                    return false
                }
            }
            if (!policyInfo.thirdPtIdentity || policyInfo.thirdPtIdentity == '') {
                this.showMsg('请选择是否为三方机构')
                return false
            }
            else {
                if (policyInfo.thirdPtIdentity == '1') {//是
                    if (!policyInfo.thirdPtName) {
                        this.showMsg('当三方机构为是的时候,机构名称为必填项,请检查')
               		 	return false
                    }
                    if (!policyInfo.thirdPtContact) {
                        this.showMsg('当三方机构为是的时候,联系方式为必填项,请检查')
                    	return false
                    } else {
						let msg = utils.valid.mobilePhone(policyInfo.thirdPtContact)
						if(msg !=undefined && msg !=""){
							this.showMsg(msg)
                    		return false
						}
                    }
                    if (!policyInfo.thirdPtRelToApp) {
                        this.showMsg('当三方机构选择是的时候,与投保人关系为必填项,请检查')
               	 		return false
                    }
                    if (!policyInfo.thirdPtAddr) {
                        this.showMsg('当三方机构选择是的时候,地址为必填项,请选择')
                    	return false
                    }
                    if (policyInfo.thirdPtRemark && policyInfo.thirdPtRemark != ''){
                        this.showMsg('当选择是的时候,怀疑原因不能填写')
                    	return false
                    }
                }
                else if (policyInfo.thirdPtIdentity == '0') {//否
                    if (policyInfo.thirdPtRemark && policyInfo.thirdPtRemark != '') {
                        this.showMsg('当三方机构选择否的时候,怀疑理由不能填写,请检查')
                    	return false
                    }
                    if (policyInfo.thirdPtName && policyInfo.thirdPtName != '') {
                        this.showMsg('当三方机构为否的时候,机构名称不能填写,请检查')
                    	return false
                    }
                    if (policyInfo.thirdPtContact && policyInfo.thirdPtContact != '') {
                        this.showMsg('当三方机构为否的时候,联系方式不能填写,请检查')
                    	return false
                    }
                    if (policyInfo.thirdPtRelToApp && policyInfo.thirdPtRelToApp != '') {
                        this.showMsg('当三方机构选择否的时候,与投保人关系不能填写,请检查')
                    	return false
                    }
                    if (policyInfo.thirdPtAddr && policyInfo.thirdPtAddr != '') {
                        this.showMsg('当三方机构选择否的时候,地址不能填写,请选择')
                    	return false
                    }
                }
                else if (policyInfo.thirdPtIdentity == '2') {
                    if (!policyInfo.thirdPtRemark) {
                        this.showMsg('当三方机构选择无法识别的时候,怀疑理由为必填项,请检查')
                    	return false
                    }
                    if ( policyInfo.thirdPtName && policyInfo.thirdPtName != '') {
                        this.showMsg('当三方机构为不确定的时候,机构名称不能填写,请检查')
               	 		return false
                    }
                    if (policyInfo.thirdPtContact && policyInfo.thirdPtContact != '') {
                        this.showMsg('当三方机构为不确定的时候,联系方式不能填写,请检查')
                    	return
                    }
                    if (policyInfo.thirdPtRelToApp && policyInfo.thirdPtRelToApp != '') {
                        this.showMsg('当三方机构选择不确定的时候,与投保人关系不能填写,请检查')
                    	return false
                    }
                    if (policyInfo.thirdPtAddr && policyInfo.thirdPtAddr != '') {
                        this.showMsg('当三方机构选择不确定的时候,地址不能填写,请选择')
                    	return false
                    }
                }
            }
            return true
	  	},
  		//关系选择
	  	checkApproach:function(approach){
	  		var isChecked = ''
	  		if(approach == 'jiashu'){
	  			isChecked = $("#jiashu").is(':checked')
	  			if(isChecked){
	  				this.temp.approachArr.push('0,')
	  			}else{
	  				this.temp.approachArr.splice(utils.common.getArrIndex(this.temp.approachArr,'0,'),1)
	  			}
	  		}else if(approach == 'qinqi'){
	  			isChecked = $("#qinqi").is(':checked')
	  			if(isChecked){
	  				this.temp.approachArr.push('1,')
	  			}else{
	  				this.temp.approachArr.splice(utils.common.getArrIndex(this.temp.approachArr,'1,'),1)
	  			}
	  		}else if(approach == 'friend'){
	  			isChecked = $("#friend").is(':checked')
	  			if(isChecked){
	  				this.temp.approachArr.push('2,')
	  			}else{
	  				this.temp.approachArr.splice(utils.common.getArrIndex(this.temp.approachArr,'2,'),1)
	  			}
	  		}else if(approach == 'zhijie'){
	  			isChecked = $("#zhijie").is(':checked')
	  			if(isChecked){
	  				this.temp.approachArr.push('3,')
	  			}else{
	  				this.temp.approachArr.splice(utils.common.getArrIndex(this.temp.approachArr,'3,'),1)
	  			}
	  		}else if(approach == 'zhudong'){
	  			isChecked = $("#zhudong").is(':checked')
	  			if(isChecked){
	  				this.temp.approachArr.push('4,')
	  			}else{
	  				this.temp.approachArr.splice(utils.common.getArrIndex(this.temp.approachArr,'4,'),1)
	  			}
	  		}else if(approach == 'addPrem'){
	  			isChecked = $("#addPrem").is(':checked')
	  			if(isChecked){
	  				this.temp.approachArr.push('5,')
	  			}else{
	  				this.temp.approachArr.splice(utils.common.getArrIndex(this.temp.approachArr,'5,'),1)
	  			}
	  		}else if(approach == 'other'){
	  			isChecked = $("#approach_other").is(':checked')
	  			if(isChecked){
	  				this.temp.approachArr.push('6,')
	  				this.toggle.approach_other_hide = true
	  			}else{
	  				this.temp.approachArr.splice(utils.common.getArrIndex(this.temp.approachArr,'6,'),1)
	  				this.toggle.approach_other_hide = false
	  				this.policy.policyInfo.approachDes = ''
	  			}
	  		}
	  		var tempStr = ''
	  		for(var i=0;i<this.temp.approachArr.length;i++){
	  			tempStr+=this.temp.approachArr[i]
	  		}
	  		this.policy.policyInfo.approach = tempStr
	  		console.log(this.policy.policyInfo.approach)
	  	},
	  	//目的选择
	  	checkPurpose:function(purpose){
	  		var isChecked = ''
	  		if(purpose == 'baozhang'){
	  			isChecked = $("#baozhang").is(':checked')
	  			if(isChecked){
	  				this.temp.purposeArr.push('0,')
	  			}else{
	  				this.temp.purposeArr.splice(utils.common.getArrIndex(this.temp.purposeArr,'0,'),1)
	  			}
	  		}else if(purpose == 'chuxu'){
	  			isChecked = $("#chuxu").is(':checked')
	  			if(isChecked){
	  				this.temp.purposeArr.push('1,')
	  			}else{
	  				this.temp.purposeArr.splice(utils.common.getArrIndex(this.temp.purposeArr,'1,'),1)
	  			}
	  		}else if(purpose == 'education'){
	  			isChecked = $("#education").is(':checked')
	  			if(isChecked){
	  				this.temp.purposeArr.push('2,')
	  			}else{
	  				this.temp.purposeArr.splice(utils.common.getArrIndex(this.temp.purposeArr,'2,'),1)
	  			}
	  		}else if(purpose == 'touzi'){
	  			isChecked = $("#touzi").is(':checked')
	  			if(isChecked){
	  				this.temp.purposeArr.push('3,')
	  			}else{
	  				this.temp.purposeArr.splice(utils.common.getArrIndex(this.temp.purposeArr,'3,'),1)
	  			}
	  		}else if(purpose == 'other'){
	  			isChecked = $("#purpose_other").is(':checked')
	  			if(isChecked){
	  				this.toggle.agentreport_other_hide = true
	  				this.temp.purposeArr.push('4,')
	  			}else{
	  				this.toggle.agentreport_other_hide = false
	  				this.temp.purposeArr.splice(utils.common.getArrIndex(this.temp.purposeArr,'4,'),1)
	  				this.policy.policyInfo.purposeDes = ''
	  			}
	  		}
	  		var tempStr = ''
	  		for(var i=0;i<this.temp.purposeArr.length;i++){
	  			tempStr+=this.temp.purposeArr[i]
	  		}
	  		this.policy.policyInfo.purpose = tempStr
	  		console.log(this.policy.policyInfo.purpose)
	  	},
	  	//第三方机构确认选择
	  	checkthirdPtIdentity:function(value){
			if(value == 1){
				$("#thirdId_1").prop("checked", true);
         		$("#thirdId_0").prop("checked", false);
         		$("#thirdId_2").prop("checked", false);
         		this.policy.policyInfo.thirdPtIdentity = '1'
			}else if(value == 0){
				$("#thirdId_1").prop("checked", false);
         		$("#thirdId_0").prop("checked", true);
         		$("#thirdId_2").prop("checked", false);
         		this.policy.policyInfo.thirdPtIdentity = '0'
			}else if(value == 2){
				$("#thirdId_1").prop("checked", false);
         		$("#thirdId_0").prop("checked", false);
         		$("#thirdId_2").prop("checked", true);
         		this.policy.policyInfo.thirdPtIdentity = '2'
			}
	  	},
	  	// 关系选择
	  	clickRelation:function(relation){
	  		var relation = $("#relationSelect").val();
	  		relation = JSON.parse(relation)
	  		if(relation.code == '30'){
	  			this.toggle.other_relation_show = true
	  		}else{
	  			this.toggle.other_relation_show = false
	  		}
	  		this.policy.policyInfo.thirdPtRelToApp = relation.text
	  	},
	  	//根据已有数据进行页面初始化
	  	initCheckBox:function(){
	  		if (this.policy.policyInfo != undefined && this.policy.policyInfo!= ""){
	  			let approach = this.policy.policyInfo.approach
  				let purpose = this.policy.policyInfo.purpose
	  			if(approach != undefined && approach != ""){
					if (approach.indexOf('0') > -1){
		                $("#jiashu").prop("checked", true);
		                this.temp.approachArr.push('0,')
		            }
		            if (approach.indexOf('1') > -1){
		                $("#qinqi").prop("checked", true);
		                this.temp.approachArr.push('1,')
		            }
		            if (approach.indexOf('2') > -1){
		                $("#friend").prop("checked", true);
		                this.temp.approachArr.push('2,')
		            }
		            if (approach.indexOf('3') > -1){
		                $("#zhijie").prop("checked", true);
		                this.temp.approachArr.push('3,')
		            }
		            if (approach.indexOf('4') > -1){
		                $("#zhudong").prop("checked", true);
		               this.temp.approachArr.push('4,') 
		            }
		            if (approach.indexOf('5') > -1){
		                $("#addPrem").prop("checked", true);
		                this.temp.approachArr.push('5,')
		            }
		            if (approach.indexOf('6') > -1){
		                $("#approach_other").prop("checked", true);
		                this.temp.approachArr.push('6,')
		                this.toggle.approach_other_hide = true
		            }
				}
				if(purpose != undefined && purpose != ""){
					if (purpose.indexOf('0') > -1){
		                $("#baozhang").prop("checked", true);
		                this.temp.purposeArr.push('0,')
		            }
		            if (purpose.indexOf('1') > -1){
		                $("#chuxu").prop("checked", true);
		                this.temp.purposeArr.push('1,')
		            }
		            if (purpose.indexOf('2') > -1){
		                $("#education").prop("checked", true);
		            	this.temp.purposeArr.push('2,')
		            }
		            if (purpose.indexOf('3') > -1){
		                $("#touzi").prop("checked", true);
		               this.temp.purposeArr.push('3,') 
		            }
		            if (purpose.indexOf('4') > -1){
		                $("#purpose_other").prop("checked", true);
		                this.temp.purposeArr.push('4,')
		                this.toggle.agentreport_other_hide = true
		            }
				}
	  			if(this.policy.policyInfo.thirdPtIdentity != undefined
	  				&& this.policy.policyInfo.thirdPtIdentity != ""){
	  				let thirdPtIdentity = this.policy.policyInfo.thirdPtIdentity
	  				if (thirdPtIdentity == '0'){
						$("#thirdId_0").prop("checked", true);
	  				}else if(thirdPtIdentity == '1'){
						$("#thirdId_1").prop("checked", true);
	  				}else if(thirdPtIdentity == '2'){
	  					$("#thirdId_2").prop("checked", true);
	  				}
	  			}
	  			if(this.policy.policyInfo.thirdPtRelToApp != undefined){
	  				let thirdPtRelToApp = this.policy.policyInfo.thirdPtRelToApp
					if(thirdPtRelToApp != undefined && thirdPtRelToApp != ""){
						let isPass = false
						for (var i = 0; i < this.dict.relationList.relation.item.length; i++) {
							let desc = this.dict.relationList.relation.item[i].text
							if(desc == thirdPtRelToApp){
								$("#relationSelect").get(0).selectedIndex = i;
								isPass = true
								if (thirdPtRelToApp == '其他') {
									this.toggle.other_relation_show = true
								}
							}
						}
						if(!isPass){
							$("#relationSelect").get(0).selectedIndex = this.dict.relationList.relation.item.length-1;
							this.toggle.other_relation_show = true
						}
					}
	  			}
	  		}
	  	},
	  },
	  beforeDestroy: function () {
	    
	  },
	  // updated: function () {
		 //  this.initCheckBox()
	  // },
	  watch:{
		'policy.policyInfo.annualIncome': {
			handler(val) {
				this.policy.policyInfo.annualIncome = val.replace(/[^\d]/g,'')
			},
			deep: true
		},
		'policy.policyInfo.totalAssets':{
			handler(val) {
				this.policy.policyInfo.totalAssets = val.replace(/[^\d]/g,'')
			},
			deep: true
		},
	  },
  	mounted(){
		this.productDef((productDefList)=>{
			console.log(productDefList)
			this.getPolicyMsg(productDefList)
		})
		this.channel=utils.cache.get('channel')
		console.log(this.channel)
		//请空缓存中的单证信息
		utils.cache.removeItem("documentInfo")
	}
}
</script>

<style lang="scss" scoped type="text/css">
	input{
        border: none;
        -moz-border-radius: 0;
		font-size:18px;
		text-align: center;
    }
	.fa{
		color: #03345C;
	}
	.fa-angle-left{
		display: inline-block;
		width: 100%;height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	.manage-main-contents{
		width: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;bottom: 50px;
		overflow-y: auto;
		background: #FFF;
	}
	.btnFoote{
		border:0;
		color:#fff;
		width:100%;
		height: 50px;
		background:#FEB101;
		height:50px
	}

</style>
