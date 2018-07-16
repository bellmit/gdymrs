<!-- 保单详情页面-->
<template>
		<div>
		<CustomerSearch v-show="customerValue.isopen" v-model="customerValue"  @click="">
          </CustomerSearch>
		 <IDCardScanning v-show="cardScanningValue.isopen" v-model="cardScanningValue" @click="">
         </IDCardScanning>
		<Search v-show="occupationValue.isopen" v-model="occupationValue"></Search>
		<v-touch class="touch-wrapper" @swipeleft="right" @swiperight="left"  v-bind:swipe-options="{ direction:'horizontal', threshold: 50 }">
		<div class="manage-main-contents-items"  v-show="contentIsOpen">
			<!-- 被保人信息 -->
			<Headerbtns :title = "page_title" v-if="occupationValue.isopen == false">
			<div slot="left" class="back" @click="detailBack" style=''>
				<i class="fa fa-angle-left" ></i>
			</div>
			<div slot="right" class="back" @click="sheetVisible = !sheetVisible">
				<i class="fa fa-ellipsis-v" style="display: inline-block;width: 100%;height: 100%;line-height: 55px;text-align: center;font-size: 24px"></i>
			</div>
		  </Headerbtns>
			<div class="detail-content_1">
				<div class="title">
					<p>被保人信息</p>
				</div>
				<div class="contents">
					<ul>
						<li class="appant-name">
                        <p>姓名</p>
						 <p class="appant-name-customerSearch">
							<input v-model="proposalPlan.insurantProductList[0].insurant.name" type="text" placeholder="请输入姓名">
							<i class="fa fa-search color" @click="customerSearch(global_constant.constant.TAG_SEARCH_CUS_INSURE)"></i>
						 </p>
						  <div  style="flex:0 0 35px">
                             <i class="fa fa-camera-retro color" @click="cardScanning(global_constant.constant.TAG_SEARCH_CUS_INSURE)" style="    margin-left: 5px;"></i>
                          </div>
                        </li>
						<li>
							<p>出生日期</p>
							<date-picker v-model="proposalPlan.insurantProductList[0].insurant.birthday" @change="test" style="width:65%;display:inline-block;text-align:right;float: right;padding-right:10px;"/>
						</li>
						<li>
							<p>性别</p>
							<span style="position:relative;">
								<mt-switch v-model="insurantSexFlag" style="position: absolute;right: 0px;top: 4px;">
									<label style="position: absolute;right: 41px;bottom: -5px;font-size: 14px;color: #FFF;font-weight:bold;">
										{{proposalPlan.insurantProductList[0].insurant.sex == "1"?'男':''}}
									</label>
									<label style="position: absolute;right: 15px;bottom: -5px;font-size: 14px;font-weight:bold;color: #FFF;">
										{{proposalPlan.insurantProductList[0].insurant.sex == "2"?'女':''}}
									</label>
								</mt-switch>
							</span>
						</li>
						<li @click="insurantChooseJob('insurant')" v-if="ageHolder > '6'">
							<p>职业</p>
							<span style="float: right;width: 70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: right;">
							{{proposalPlan.insurantProductList[0].insurant.desc}}</span>
						</li>
						<li v-if=" ageHolder <= '6'">
							<p>职业</p>
							<input type="text" @blur="blurFocus()" v-model="proposalPlan.insurantProductList[0].insurant.desc" placeholder="请输入职业" 
							style="float: right;width: 70%;height: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: right;padding-right: 10px;border:none;">
						</li>
					</ul>
				</div>
			</div>
	        <!-- 投标人信息 -->
	        <div class="detail-content_1">
	        	<div class="title">
					<p>投保人信息</p>
					<div class="item_title_relation" style="display:flex;padding-left:0;padding-right:10px;">
						<!-- <input type="checkbox" id="isSame" v-model="isSame" style="position:relative;top:15px;margin-right:5px;">
        				<label for="isSame">本人</label> -->
        				<div v-if="loadPicker" class="picker" style="width:50%;padding-left: 100px;overflow:hidden">
        				    <picker v-model="relation" :items="dict.relationBenefitList" 
        				code="code" text="text" style="background:#f5f5f5 !important" @change="change()"></picker>
        				</div>
        				<div v-if="relationaaa != '' && relationaaa != undefined" style="min-width:25%;text-align:right;padding:0 5px;">
        					<span v-if="relationaaa != ''">({{relationaaa}})</span></div>
						<div style="width:10%;text-align:right;padding-right:15px;">
					  		<i class="fa fa-angle-down color" style="font-size:20px;"></i>
						</div>
					</div>
				</div>
				<div class="contents">
					<ul>
						<li  class="appant-name">
                          <p>姓名</p>
						   <p class="appant-name-customerSearch">
							<input  v-model="proposalPlan.holder.name" type="text" placeholder="请输入姓名">
							<i class="fa fa-search color" @click="customerSearch(global_constant.constant.TAG_SEARCH_CUS_APPLICANT)"></i>
						  </p>
						  <div style="flex:0 0 35px"><i class="fa fa-camera-retro color" @click="cardScanning(global_constant.constant.TAG_SEARCH_CUS_APPLICANT)" style="margin-left: 5px;"></i></div>
                          </li>
						 <li>
							<p>出生日期</p>
							<date-picker v-model="proposalPlan.holder.birthday" @change="test_1" style="width:65%;display:inline-block;text-align:right;float: right;padding-right:10px;"/>
						 </li>
						<li>
							<p>性别</p>
							<span style="position:relative;">
								<mt-switch v-model="holderSexFlag" style="position: absolute;right: 0px;top: 4px;">
									<label style="position: absolute;right: 41px;bottom: -5px;font-size: 14px;color: #FFF;font-weight:bold;">
										{{proposalPlan.holder.sex == 1?'男':''}}
									</label>
									<label style="position: absolute;right: 15px;bottom: -5px;font-size: 14px;font-weight:bold;color: #FFF">
										{{proposalPlan.holder.sex == 2?'女':''}}
									</label>
								</mt-switch>
							</span>
						</li>
						<li @click="holderChooseJob('holder')">
							<p>职业</p>
							<span style="float: right;width: 70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: right;">{{proposalPlan.holder.desc}}</span>
						</li>
					</ul>
				</div>
	        </div>
	        <!-- 险种信息 -->
	        <div class="detail-content_2">
				<div class="title">
					<p>险种信息</p>
				</div>
				<div class="contents">
					<ul class="poicyInfo">
						<li>
							<p>主险名称</p>
							<span style="font-size: 12px;width: 65%;text-align: right;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{productDef.productName}}</span>
						</li>
						<li v-for="(item,index) in productDef.attList" class="proposalPlan-detail">
							<p>{{item.attName}}</p>
							<div class="select-icon"  v-if="item.attCode != 'amount' && item.attCode != 'premium'">
							     <div>	<picker v-model="proposalPlan.insurantProductList[0].productList[0][item.attCode]" code="code" :items="item.attValueList" @beforechange="beforeChooseMainItem()" @change="chooseMainItem(item)" ></picker></div>
								 <div> <i class="fa fa-angle-down color"></i></div>
							</div>
							<input v-if="item.attCode == 'amount' || item.attCode == 'premium'"
				            @blur="blurFocus()"
				            style="width: 85%;padding-top:2px;"
				            name="保险金额"
				            placeholder="请输入金额" v-model="proposalPlan.insurantProductList[0].productList[0][item.attCode]"/>
				            <p v-if="item.attCode == 'amount' || item.attCode == 'premium'" style="line-height: 40px;margin-right:10px;">元</p>
						</li>
						<li v-if="productCode == 'HMT038' || productCode == 'HDT037'" class="isAuto">
            				<p>是否自动续保<<br />/p>
							<div class="select-icon">
							     <div>	<picker v-model="proposalPlan.insurantProductList[0].productList[0].isAutoXubao" 
								 :values="proposalPlan.insurantProductList[0].productList[0].isAutoXubao"
								 code="code" :items="XubaoattValueList" ></picker></div>
								 <div> <i class="fa fa-angle-down color"></i></div>
							</div>
          				</li>
						<li v-if="productDef.dividend !=''"  class="isAuto">
            				<p>红利领取方式</p>
            				<div class="select-icon">
            					<div><picker v-model="proposalPlan.insurantProductList[0].productList[0].dividend" code="code" :items="productDef.dividend"></picker></div>
            					<div> <i class="fa fa-angle-down color"></i></div>
							</div>
          				</li>
						<li v-if="productCode == 'LBP017'">
            				<p>是否设定可自垫</p>
            				<input type="checkbox" style="width:15px;margin-right:10px" v-model="proposalPlan.insurantProductList[0].productList[0].automatic"/>
          				</li>
						<li v-if="item.attCode=='amount'" v-for="(item,index) in productDef.attList">
            				<p>主险保费</p>
            				<p style="width: 60%;text-align: right;float: right;padding-right:10px;">{{zhuxianPremium}} 元</p>
          				</li>
          	<li v-if="item.attCode=='premium'" v-for="(item,index) in productDef.attList">
            				<p>保险金额</p>
            				<p style="width: 60%;text-align: right;float: right;padding-right:10px;">{{zhuxianMoney}} 元</p>
          				</li>
					</ul>
				</div>
			</div>
			<!-- 可选计划 -->
			<div class="detail-content_2">
				<div class="title">
					<p>可选计划</p>
					<div class="kexuanPlan">
						<picker @change="chooseExtra" v-if="productDef.extraList!=null"
						 v-model="extraProductCode"
						:items="productDef.extraList"
						code="productCode"
						 text="productName" default-text="请选择附加险"></picker>
					</div>
				</div>
			</div>
			<!-- 附加险弹出框 -->
			<mt-popup v-model="toggle.extraEdit" position="center" style="width:100%;height:100%;">
			    <mt-header title="已选附加险" style="background:#fafafa;color:#26a2ff;border-top:1px solid #ddd;">
			        <mt-button @click="cancelExtra" slot="right">
			          <i class="fa fa-fw fa-times color"></i>
			        </mt-button>
			    </mt-header>
      		<div class="fujia-content">
			       	 <div v-for="(item,index) in extra.attList" style="overflow: hidden;">
			          <p>{{item.attName}}</p>
			          <picker v-model="extraEdit[item.attCode]" code="code" :items="item.attValueList" @change="chooseExtraItem(item)" v-if="item.attCode != 'amount' && item.attCode != 'premium' && item.attCode != 'piece'" ></picker>
			          <input v-model="extraEdit[item.attCode]" class="amount" style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;"
			          v-if="item.attCode == 'amount' || item.attCode == 'piece' || item.attCode == 'premium'">
			        </div>
        			<input type="hidden" v-model="extraEdit.productName"  style="overflow: hidden;">
					 <div v-for="(item,index) in addList"  class="supplementarycalls" v-if="extra.productCode == 'NPU012'">
                      <span style="float:right" v-show="addList.length>1" @click="removEextra(index)"><i class="fa fa-times color"></i></span>
               	    <div >
                    <p>追加保费起始年限</p>
                      <input class="amount" type="number"
					               style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;" placeholder="起始年限" v-model="item.addBegin">
                   </div>
                    <div  >
                     <p>追加保费截止年限</p>
                       <input class="amount" type="number"
					                 style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;" placeholder="截止年限" v-model="item.addEnd">
                    </div>
                   <div >
                  <p>追加保费</p>
                    <input class="amount" type="number"
					           style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;" placeholder="输入金额" v-model="item.addPre">
                  </div>
                  <div style="height:1px;background:#BBB"></div>
                 </div>
               <div style="border:none;height:40px;line-height:40px;text-align:center;color:#FDB205;border-bottom: 1px solid #BBB;border-top:none" @click="addExtraList" v-if="extra.productCode == 'NPU012'">添加追加保费</div>
               <div v-for="(item,index) in drawList"  class="supplementarycalls" v-if="extra.productCode == 'NPU012'">
                 <span style="float:right" v-show="drawList.length>1" @click="removdrawList(index)"><i class="fa fa-times color"></i></span>
             	<div >
                    <p>领取起始年限</p>
                      <input class="amount" type="number"
					               style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;" placeholder="起始年限" v-model="item.drawBegin">
                   </div>
                    <div   >
                     <p>领取截止年限</p>
                       <input class="amount" type="number"
					                 style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;" placeholder="截止年限" v-model="item.drawEnd">
                    </div>
                   <div >
                  <p>领取保费</p>
                    <input class="amount" type="number"
					       style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;" placeholder="输入金额" v-model="item.drawPre">
                  </div>
                   <div style="height:1px;background:#BBB"></div>
                </div>
              <div v-if="extra.productCode == 'NPU012'" style="border:none;height:40px;line-height:40px;text-align:center;color:#FDB205" @click="adddrawList">添加部分保费</div>
        			<p class="make-sure">
          				<mt-button class="true-btn" @click="saveExtra">确定</mt-button>
        			</p>
      			</div>
    		</mt-popup>
			<!-- 附加险列表 -->
			<div class="detail-content_2" v-show="proposalPlan.insurantProductList[0].productList[0].extraList.length>0">
				<div class="title">
					<p>可选计划列表</p>
				</div>
				<div class="contents">
  					<ul>
      					<li v-for="(item,index) in proposalPlan.insurantProductList[0].productList[0].extraList" style="position: relative;">
      						<p>{{index + 1}}、</p>
      						<p @click="chooseExtraList(item.productCode)" style="flex：1;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;width: 75%;">{{item.productName}}</p>
      						<i class="fa fa-trash-o"
				            v-show = "item.productCode != productDef.bindCode"
				            @click = "deleteExtra(item)"
				            :disabled = "item.productCode == productDef.bindCode"
				            style="padding-right:10px;color: #FEB101;position: absolute;right: 0;top: 5px;font-size: 30px;"></i>
				            <i class="fa fa-trash-o"
				            v-show = "item.productCode == productDef.bindCode"
				            :disabled = "item.productCode == productDef.bindCode"
				            style="padding-right:10px;color: #BBB;position: absolute;right: 0;top: 5px;font-size: 30px;"></i>
      					</li>
  					</ul>
  				</div>
			</div>
			<!-- 产品介绍 -->
			<div class="detail-content_3" v-if="productJieShao.length>0">
				<div class="title">
					<p>产品介绍</p>
				</div>
				<div class="contents">
					<div v-for="item in productJieShao">
						<h1>{{item.title}}</h1>
						<p>{{item.message}}</p>
					</div>
				</div>
			</div>
			<!-- 理赔流程 -->
			<div class="detail-content_4">
				<div class="title">
					<p>产品说明</p>
				</div>
				<!-- <div class="contents">
					<img src="../../../static/img/policy/lipei.jpg">
				</div> -->
			</div>
			<!-- 险种条款 -->
			<div class="detail-content_5">
				<p  style="font-size:15px;margin-top:10px" @click="productDefTkStatus()">
					<u >《{{productDef.productName}}产品条款》</u>
				</p>
			</div>
			<div class="detail-content_5">
				<p v-for="(item,index) in proposalPlan.insurantProductList[0].productList[0].extraList" @click="tkStatus(item)" style="font-size:15px;">
					<u >《{{item.productName}}产品条款》</u>
				</p>
			</div>
			<Footerbtns :is_show=true :total_premium="totalPremium" v-if="occupationValue.isopen == false">
			<div slot="right" @click="stepSave" >
				立即投保
			</div>
			<div slot="center" @click="saveProposal">
               生成计划书演示
			</div>
		</Footerbtns>
		</div>
		</v-touch>
		<mt-popup v-model="toggles.tkStatu" position="right" style="width: 100%;height: 100%;overflow-y:auto;background: #FFF1D4;">
                <div v-for="(item,index) in make.productContent_1">
              <img @click="toggles.tkStatu = !toggles.tkStatu" :src="item.fileurl" style="display: block;width: 100%;">
             </div>
        </mt-popup>
		<mt-popup v-model="toggle.rule" style="width: 80%;height:atuo;border-radius: 15px; pointer-events:none;">
    		<div class="teshu-header" style="position: relative;">
      			<b style="font-size:16px;font-weight: bold;">规则校验</b>
      			<i class="fa fa-times-circle-o" slot="right" @click="toggle.rule = false"
      			style="font-size:25px;color: #FFF;position: absolute;right: 10px;top: 10px;"></i>
    		</div>
    		<div  class="alert-reasonList">
      			<div v-for="item in reasonList" style="margin-bottom:8px;">{{item.info}}</div>
			</div>
		</mt-popup>
		<mt-actionsheet
			:actions="actions"
			v-model="sheetVisible">
		</mt-actionsheet>
         <div class="bg-img">
         <mt-popup v-model="toggle.coverStatus" position="right">
      <img src="../../../static/img/manage/cover.jpg"/>
      <p class="send-name">
        <span
        style="border-right: 2px solid #FFF;color: #FFF;
        padding-right: 10px;">敬呈</span>
        <span style="padding-left: 10px;color: #FFF;">{{proposalPlan.holder.name}}</span>
        <span style="padding-left: 5px;color:#FFF;">{{proposalPlan.holder.sex == 2?'女士':'先生'}}</span>
      </p>
    </mt-popup>
     </div>
      <Alert ref="showalert"></Alert>
      <prompt ref="btn" @detonate="detonate" :number=" promptNumber"></prompt>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui'
	import { Actionsheet } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import CustomerSearch from '../common/CustomerSearch.vue'
	import  Alert from '../policy/common/alert.vue'
 	import Footerbtns from '../policy/common/Footers.vue'
	import product from '../../assets/data/product.json'
	import productDef from '../../assets/data/productDef.json'
	import occupation from '../../assets/data/occupation.json'
	import datePicker from '../common/DatePicker.vue'
	import IDCardScanning from '../common/IDCardScanning.vue'
	import picker from '../common/Picker.vue'
	import Search from '../common/OccupationSearch.vue'
	import cardTypeList from '../../assets/dict/card_type_sunlife.json'
	import proposalPlans from '../../assets/data/proposalPlan.json'
	import global_constant from '../../assets/data/global_constant.json'
	import relationBenefitList from '../../../static/dict/relation_benefit.json'
	import prompt from '../policy/common/prompt.vue'
	const temp = {
		amount: 0,
		premium: 0,
		drawAge: 0,
		premPrm:"",
		premYearStart:"",
        premYearEnd:"",
		itemList:'',
		productList:[

		],
		holder: {
			name: ''
		},
		insurant: {
			name: ''
		},
		job: {
			desc: ''
		},
		ready: false
	}
	export default{
		name:'policy_list',
		  components: {Headerbtns,
		  Footerbtns,datePicker,
		  CustomerSearch,
		  picker,Search,
		  IDCardScanning,
		  Actionsheet,Alert,prompt},
		data () {
	    	return {
	    		promptNumber:0,
	    		relation:'',//保存投被保人关系
	    		relationaaa:'',//
	    		loadPicker:true,
		    	dict:{
	         	 	relationBenefitList:""
		    	},
				sheetVisible:false,
				autoXubaoCount:1,
				isTestHealtb:false,
				autoXubao:"",
				count:false,/*用来控制健康险和健康附加险的保险期间校验*/
				count2:false,
				dict:{
                   cardTypeList:cardTypeList
		        },
				global_constant:global_constant,
				XubaoattValueList:[{
                  text:"是",
				  code:"-1"
				},
				{
                   text:"否",
				   code:"-2"
				}],
			    customerValue:{
                  isopen:false,
                  type:'',
                  cusItem:{}
				},
				cardScanningValue:{
                  isopen:false,
                  type:'',
                  cusItem:{}
                },
				actions:[
							{
								name:"刷新页面",
								method:this.winReload
							},
							{
                            name:"返回首页",
                            method:this.backHome
                            }
				],
				planId:'',
				switch:false,
				fujialist:[],
				page_title:'基本信息',
		    	productCode:utils.cache.get('productCodeDetail'),
		    	productJieShao:'',//产品介绍
				optionsValue:'',
				message:"请选择职业",
		      	ageHolder:'',//被保险人年龄
				productDef:{},
				extraproductDef:[],
				productList:[],
		      	holderSexFlag:true,
      			insurantSexFlag:true,
      			zhuxianPremium:'',
      			zhuxianMoney:'',
		      	jobList:occupation.occupation.item,
		      	jobListHolder:occupation.occupation.item,
		      	jobValue:'',
		      	jobValueHolder:'',
				toggles:{
                  jobVisible:false,
                  tkStatu:false,
                  smsStatus:false,
                  otherStatus:false,
                },
				make:{
                   product:"",
                   productContent_1:[],
                   productContent_2:[]
                },
		      	occupationValue:{
		      		isopen:false,
		      		type:'',
		      		occItem:''
		      	},
		      	toggle:{
		      		job:false,
		      		jobHolder:false,
		      		extraEdit:false,
        			extraList:false,
					rule:false,
					info:false,
					coverStatus:false
				  },
		      	job:{
			        code:'0001001',
			        desc:'党政机关、企事业单位负责人和行政管理人员',
			        level:'1'
			    },
			    jobHolder:{
			    	code:'0001001',
			        desc:'党政机关、企事业单位负责人和行政管理人员',
			        level:'1'
			    },
			    isSame:false,
			    totalPremium:'',
			    totalAmount:'',
			    reasonList:[],
			    extra:{},//产品定义当前附加险
      			extraProductCode:'',
      			extraEdit:{},
			    extraMap:{},
				addList:[
                   {
          	       addBegin:"",
		           addEnd:"",
                   addPre:"",
				   code:0,
				   userDefine1:"add"
                }
               ],
              drawList:[
              {
              code:0,
              drawBegin:"",
              drawEnd:"",
			  drawPre:"",
			  userDefine1:"draw"
              }
              ],
			 proposalPlan:{
			        checkType:'2',
			        planId:'',
			        holder:{
			          "name": "",
			          "desc":"",
			          "level":"1",
			          "profession": "0001001",
			          "sex": "1",
					  "birthday": "1980-01-01",
					  "idType": "",
					  "idNo": "",
					  "idExpDate": "",
			        },
			        insurantProductList:[{
			          insurant:{
			            "birthday": "1980-01-01",
			            "desc":"",
			          	"level":"1",
			            "name": "",
			            "profession": "0001001",
			            "sex": "1",
			            "relationNew":"",
						"idType": "",
					    "idNo": "",
					    "idExpDate": "",
			          },
			          productList:[{
						"productCode": '',
						"dividend":"",
						'isAutoXubao':"-2",
			            "productName": '',
			            "payMode": "",
			            "drawFreq":"",
						"automatic":false,
			            "drawAge":"",
			            "payModeName": "",
			            "payPeriod": "",
			            "payPeriodName": "",
			            "policyPeriod": "",
			            "policyPeriodName": "",
			            "amount": utils.cache.get('productCode')?product[utils.cache.get('productCode')].amount:'',
			            "premium": "10000.00",
						"premiumDes":'',
						"premPrm":"10.00",
						"premYearStart":"",
						"premYearEnd":"",
			            "rank": "",
			            "piece": "",
			            "extraList":[

						]
			          }]
			        }],
			        "orgAgent": {
			          "channel": utils.cache.get('personsal')?utils.cache.get('personsal').channel:'02',
			          "deviceNo": "572032449254344960",
			          "openId": "xxxx",
			          "token": "",
			          "agentCode": utils.cache.get('personsal')?utils.cache.get('personsal').agentCode:'1100D12336',
			          "agentName":utils.cache.get('personsal')?utils.cache.get('personsal').agentName:'李彩伶',
			          "mobile":utils.cache.get('personsal')?utils.cache.get('personsal').mobile:''
			        }
      			}
	    	}
	  	},
		beforeDestroy () {
          utils.cache.set('proposalPlan',this.proposalPlan)
		 },
	  	mounted(){
	  		this.dict.relationBenefitList=relationBenefitList.relation.item
	  		console.log("----issame-",this.isSame)
			this.sexJob()
			this.computeHeaderHeight()
			  let planId = this.$route.params.planId
			  // planId 为new 先获取OrderCode
			  if(planId == "new"){
				  this.getOrderCode()
			  }
			let adressCQ = this.$route.params.adressCQ
			if (planId == 'new' || adressCQ == "CQ") {
				if(adressCQ == "CQ"){
                   this.getPolicyMsg()
				}
				this.getProductDef(this.productCode)
        this.proposalPlan.insurantProductList[0].insurant.desc = this.job.desc
			   this.proposalPlan.holder.desc = this.jobHolder.desc 
			}else{
				this.proposalPlan = utils.cache.get('proposalPlan')
				let productCode = this.proposalPlan.insurantProductList[0].productList[0].productCode
				this.getProductDef(productCode)
				let holderSex = this.proposalPlan.holder.sex
				let insurantSex = this.proposalPlan.insurantProductList[0].insurant.sex
				if (holderSex == "2") {
					this.holderSexFlag = false
				}else{
					this.holderSexFlag = true
				}
				if(insurantSex == "2"){
					this.insurantSexFlag = false
				}else{
					this.insurantSexFlag = true
				}
				this.job.desc = this.proposalPlan.insurantProductList[0].insurant.desc

				this.proposalPlan.insurantProductList[0].insurant.desc = this.job.desc
				this.proposalPlan.holder.desc = this.proposalPlan.holder.desc
				this.relation = this.proposalPlan.insurantProductList[0].insurant.relationNew
				this.relationaaa = this.proposalPlan.insurantProductList[0].insurant.relToAppDesc
				console.log('111111111111111111111',this.relationaaa)
				if (this.proposalPlan.insurantProductList[0].insurant.relationNew == "00"||
				 this.proposalPlan.insurantProductList[0].insurant.relToApp == "00"
				 ) {
					this.isSame = true
				} else {
					this.isSame = false
				}
				let extraList = this.proposalPlan.insurantProductList[0].productList[0].extraList
				for(let i =0;i<extraList.length;i++){
					if(extraList[i].productCode == "NPU012"){
						this.addList = extraList[i].addList
						this.drawList = extraList[i].drawList
					}
				}
			}
	  	},
	 watch:{
		 //监听OCR人脸识别组件的变化
		cardScannIsOpen(val, oldval){
        if(!val){
          if(this.cardScanningValue.cusItem != undefined && this.cardScanningValue.cusItem.name != undefined){
            if(this.cardScanningValue.type == global_constant.constant.TAG_SEARCH_CUS_INSURE){
              this.proposalPlan.insurantProductList[0].insurant.name = this.cardScanningValue.cusItem.name
              this.proposalPlan.insurantProductList[0].insurant.sex = this.cardScanningValue.cusItem.gender
              this.proposalPlan.insurantProductList[0].insurant.birthday = this.cardScanningValue.cusItem.birthday
              this.proposalPlan.insurantProductList[0].insurant.idType = "11"
              this.proposalPlan.insurantProductList[0].insurant.idNo = this.cardScanningValue.cusItem.id_card_number
              this.proposalPlan.insurantProductList[0].insurant.idExpDate = this.cardScanningValue.cusItem.valid_date
              if(this.proposalPlan.insurantProductList[0].insurant.sex == "1"){
                this.insurantSexFlag = true
              }else if(this.proposalPlan.insurantProductList[0].insurant.sex == "2"){
                this.insurantSexFlag = false
              }
            }else if(this.cardScanningValue.type == global_constant.constant.TAG_SEARCH_CUS_APPLICANT){
              this.proposalPlan.holder.name = this.cardScanningValue.cusItem.name
              this.proposalPlan.holder.sex = this.cardScanningValue.cusItem.gender
              this.proposalPlan.holder.birthday = this.cardScanningValue.cusItem.birthday
              this.proposalPlan.holder.idType = "11"
              this.proposalPlan.holder.idNo = this.cardScanningValue.cusItem.id_card_number//证件号码
              this.proposalPlan.holder.idExpDate = this.cardScanningValue.cusItem.valid_date//有效期
              if(this.proposalPlan.holder.sex == "1"){
                this.holderSexFlag = true
              }else if(this.policy.custInfo.appnt.appntSex == "2"){
                this.holderSexFlag = false
              }
            }
          }
        }
       },
	     customerIsOpen(val, oldval){
          if(!val){
          if(this.customerValue.cusItem != undefined && this.customerValue.cusItem.customerName != undefined){
            if(this.customerValue.type == global_constant.constant.TAG_SEARCH_CUS_INSURE){
				console.log(this.customerValue.cusItem)
              this.proposalPlan.insurantProductList[0].insurant.name = this.customerValue.cusItem.customerName
			  this.proposalPlan.insurantProductList[0].insurant.sex = this.customerValue.cusItem.sex
				let insurantSex = this.proposalPlan.insurantProductList[0].insurant.sex
				if(insurantSex == "2"){
					this.insurantSexFlag = false
				}else{
					this.insurantSexFlag = true
				}
              this.proposalPlan.insurantProductList[0].insurant.birthday = this.customerValue.cusItem.birthday
			}else if(this.customerValue.type == global_constant.constant.TAG_SEARCH_CUS_APPLICANT){
              this.proposalPlan.holder.name = this.customerValue.cusItem.customerName
			  this.proposalPlan.holder.sex = this.customerValue.cusItem.sex
			  let holderSex = this.proposalPlan.holder.sex
			  if (holderSex == "2") {
					this.holderSexFlag = false
				}else{
					this.holderSexFlag = true
				}
              this.proposalPlan.holder.birthday = this.customerValue.cusItem.birthday
              }
             }
		   }
          }, 
	  	 jobValue(value){
		      if(value){
		        this.searchJob()
		      }else{
		        this.jobList = occupation.occupation.item
		      }
		    },
		    jobValueHolder(value){
				if (value) {
					this.searchJobHolder()
				} else {
					this.jobListHolder = occupation.occupation.item
				}
		    },
	  		'toggle.job':function(value){
		      if(value == true){
		        utils.ui.modal.afterOpen()
		      }else{
		        utils.ui.modal.beforeClose()
		      }
		    },
			holderSexFlag(value) {
				if (value) {
					this.proposalPlan.holder.sex = '1'
				} else {
					this.proposalPlan.holder.sex = '2'
				}
			},
			insurantSexFlag(value) {
				if (value) {
					this.proposalPlan.insurantProductList[0].insurant.sex = '1'
				} else {
					this.proposalPlan.insurantProductList[0].insurant.sex = '2'
				}
			},
			'proposalPlan.holder': {
				handler(val) {
						if (val.name == temp.holder.name) {
						if (temp.ready) {
							this.baofeiTest()
						}
					}
					if (this.isSame) {
						this.proposalPlan.insurantProductList[0].insurant.name = this.proposalPlan.holder.name
						this.insurantSexFlag = this.holderSexFlag
					}
					temp.holder = Object.assign({}, val)
				},
			  deep: true
			},
			'proposalPlan.insurantProductList': {
				handler(val) {
					if (val[0].insurant.name == temp.insurant.name &&
						val[0].productList[0].amount == temp.amount &&
						val[0].productList[0].premium == temp.premium &&
						val[0].productList[0].premPrm == temp.premPrm &&
						val[0].productList[0].premYearStart == temp.premYearStart &&
						val[0].productList[0].premYearEnd == temp.premYearEnd
						// && val[0].productList[0].drawAge == temp.drawAge
					) {
						if (temp.ready) {
							this.baofeiTest()
						}
					}
					if (this.isSame) {
						this.proposalPlan.holder.name = this.proposalPlan.insurantProductList[0].insurant.name
						this.holderSexFlag = this.insurantSexFlag
						this.proposalPlan.holder.birthday = this.proposalPlan.insurantProductList[0].insurant.birthday
						this.proposalPlan.holder.desc = this.proposalPlan.insurantProductList[0].insurant.desc
						this.proposalPlan.holder.level = this.proposalPlan.insurantProductList[0].insurant.level
						this.proposalPlan.holder.profession = this.proposalPlan.insurantProductList[0].insurant.profession
					}

					temp.insurant = Object.assign({}, val[0].insurant)
					temp.amount = val[0].productList[0].amount
					temp.premium = val[0].productList[0].premium
					temp.drawAge = val[0].productList[0].drawAge
					temp.premPrm = val[0].productList[0].premPrm
					temp.premYearStart = val[0].productList[0].premYearStart
					temp.premYearEnd = val[0].productList[0].premYearEnd
				},
				deep: true
			},
			isSame(value) {
				if (value) {
					this.proposalPlan.holder.name = this.proposalPlan.insurantProductList[0].insurant.name
					this.proposalPlan.holder.idType = this.proposalPlan.insurantProductList[0].insurant.idType
					this.proposalPlan.holder.idNo = this.proposalPlan.insurantProductList[0].insurant.idNo
					this.proposalPlan.holder.idExpDate = this.proposalPlan.insurantProductList[0].insurant.idExpDate
					this.holderSexFlag = this.insurantSexFlag
					this.proposalPlan.holder.birthday = this.proposalPlan.insurantProductList[0].insurant.birthday
					this.proposalPlan.holder.desc = this.proposalPlan.insurantProductList[0].insurant.desc
					this.proposalPlan.holder.level = this.proposalPlan.insurantProductList[0].insurant.level
					this.proposalPlan.holder.profession = this.proposalPlan.insurantProductList[0].insurant.profession
					this.proposalPlan.insurantProductList[0].insurant.relationNew = "00"
					this.proposalPlan.insurantProductList[0].insurant.relToApp == "00"
				} else {
					this.proposalPlan.holder.name = ''
					this.holderSexFlag = true
					this.proposalPlan.insurantProductList[0].insurant.relationNew = this.relation
					this.proposalPlan.insurantProductList[0].insurant.relToApp ==  this.relation
					this.proposalPlan.holder.birthday = '1980-01-01'
					this.proposalPlan.holder.desc = '请选择职业'
				}
			},
			'occupationValue.isopen':{
				handler(val){
					if(!val){
						if(this.occupationValue.occItem != undefined){
							if(this.occupationValue.type == "holder"){
								if(this.occupationValue.occItem.code == "-1111111"){
									this.proposalPlan.holder.desc = ""
									this.proposalPlan.holder.level = ""
									this.proposalPlan.holder.profession = ""
								}else{
                                  this.proposalPlan.holder.desc = this.occupationValue.occItem.descr
								  this.proposalPlan.holder.level = this.occupationValue.occItem.level
								  this.proposalPlan.holder.profession = this.occupationValue.occItem.code
								}
							}else if(this.occupationValue.type == "insurant"){

								if(this.occupationValue.occItem.code == "-1111111"){
									this.proposalPlan.insurantProductList[0].insurant.desc = ""
									this.proposalPlan.insurantProductList[0].insurant.level = ""
									this.proposalPlan.insurantProductList[0].insurant.profession = ""
								}else{
                                    this.proposalPlan.insurantProductList[0].insurant.desc = this.occupationValue.occItem.descr
								    this.proposalPlan.insurantProductList[0].insurant.level = this.occupationValue.occItem.level
								    this.proposalPlan.insurantProductList[0].insurant.profession = this.occupationValue.occItem.code
								}
							}
						}
					}
				},
				deep: true
			}
		  },
		computed:{
			 cardScannIsOpen(){
                 return this.cardScanningValue.isopen
             },
			insurantDesc(){
                return this.proposalPlan.insurantProductList[0].insurant.desc 
			},
			contentIsOpen(){
             if(this.customerValue.isopen ||this.occupationValue.isopen||this.cardScanningValue.isopen){
               return false
             }else{
              return true
             }
		  },
	      customerIsOpen(){
            return this.customerValue.isopen
		  }
		},
	  methods:{  
	  	cancels(){
	  	},
	  	detonate(index,value){
	  	   this.toggle.hintInsurant = false
	  	   console.log(this.relation,'this.relation')
	  	  console.log("序号:"+index,"/结果:"+value)
	  	  this.relationaaa = value
	  	  this.proposalPlan.insurantProductList[0].insurant.relToAppDesc = value
	  	  // this.proposalPlan.insurantProductList[0].insurant.relToApp = "30"
	  	  console.log(this.proposalPlan,'this.proposalPlanthis.proposalPlanthis.proposalPlanthis.proposalPlan')
	  	  // this.relToAppDesc = false 
	  	},
	  	change(){
	  		console.log(this.relation,'proposalPlanproposalPlanproposalPlanproposalPlanproposalPlan')
	  		this.proposalPlan.insurantProductList[0].insurant.relToApp = this.relation
	  		this.proposalPlan.insurantProductList[0].insurant.relationNew = this.relation
	  		if(this.relation == '00'){
	  			this.isSame = true
	  			this.relationaaa = ''
	  		}else if(this.relation == '30'){
	  			 this.promptNumber = 1
	  			this.$refs.btn.showMOdal()
	  		}else{
	  			this.isSame = false
	  			this.relationaaa = ''
	  		}
	  	},
	  	productDate(){
	  		if(this.count){
					let MainDate = this.proposalPlan.insurantProductList[0].productList[0].policyPeriodName
					this.fujialist.forEach( (item) => {
						//如果不是指定的三种附加险
						if(item.productCode!== 'HDT024' && item.productCode!== 'HMT009' && item.productCode!== 'HDT012' && item.productCode!== 'HDT042'){
							console.log(item)
						//加校验 必须和主险的保险期间一致
						if(item.payPeriodName!=='同主险' && item.payPeriodName!==MainDate){
							console.log(item)
							this.count2 = true
							}else{
								this.count2 = false
							}
						}
					})
				}
	  	},
		getOrderCode(){
			let requ = {
				"policy":{substepNo: "getOrderId"}
			}
			console.log("获取OrderCode")
			utils.http.postFast('MODISTRIESAVE',requ,(body)=> {
				console.log(body)
				let policy = body.policy
				this.planId = policy.orderId
				utils.cache.set('orderCode',this.planId)
				console.log("order ========================> :"+this.planId)
			})
		},
		cardScanning(tag,index){
          this.cardScanningValue.isopen = !this.cardScanningValue.isopen
          this.cardScanningValue.type = tag
          this.cardScanningValue.index = index
        },	  
		backHome(){
              this.$router.push("/home");
		  },
		 right(){
			 this.stepSave()
		 },
		 left(){
			 this.detailBack()
		 }, 
        addExtraList(){
           let item = {}
           item.addBegin=""
		   item.addEnd=""
		   item.addPre = ""
		   item.userDefine1="add"
           item.code = this.number
           this.number ++
           this.addList.push(item)
    },
    adddrawList(){
       let item = {}
       item.drawBegin=""
	   item.drawEnd=""
	   item.drawPre = ""
	   item.userDefine1="draw"
       item.code = this.num
       this.num ++
       this.drawList.push(item)
    },
    removEextra(index){
      this.addList.splice(index,1)
    },
    removdrawList(index){
      this.drawList.splice(index,1)
    },		  
	    customerSearch(tag,index){
		  this.customerValue.isopen = !this.customerValue.isopen
          this.customerValue.type = tag
          this.customerValue.index = index
          if(tag == global_constant.constant.TAG_SEARCH_CUS_BNF) {

          }
        },
		 getPolicyMsg(){
          let requ = {
            "policy":{
              "substepNo":"3",
              "orderCode": this.$route.params.planId
            }
           }
             let that = this
            utils.http.postFast('MOHQPOLICYMSG',requ,(body)=> {
			 let policy = body.policy
			 console.log(policy,'policy')
			this.proposalPlan.insurantProductList[0].insurant.name = (policy.custInfo.insurants.insurant[0].name == ""?"":policy.custInfo.insurants.insurant[0].name)
			this.proposalPlan.insurantProductList[0].insurant.birthday = (policy.custInfo.insurants.insurant[0].birthday == ""? "1980-01-01":policy.custInfo.insurants.insurant[0].birthday)
			this.proposalPlan.insurantProductList[0].insurant.sex = (policy.custInfo.insurants.insurant[0].sex == "0"?"1": policy.custInfo.insurants.insurant[0].sex)
			this.proposalPlan.insurantProductList[0].insurant.desc =(policy.custInfo.insurants.insurant[0].insOccupation == ""?"党政机关、企事业单位负责人和行政管理人员":policy.custInfo.insurants.insurant[0].insOccupation)
			let isSex = (policy.custInfo.insurants.insurant[0].relToApp == ""?"":policy.custInfo.insurants.insurant[0].relToApp)
			if(isSex == "00"){
				this.isSame = true
			}else{
				this.isSame = false
			}
			this.proposalPlan.holder.name = (policy.custInfo.appnt.appntName == ""?"":policy.custInfo.appnt.appntName)
			this.proposalPlan.holder.birthday = (policy.custInfo.appnt.appntBirthday == ""?"1980-01-01":policy.custInfo.appnt.appntBirthday)
			this.proposalPlan.holder.sex = (policy.custInfo.appnt.appntSex == "0"?"1":policy.custInfo.appnt.appntSex)
			this.proposalPlan.holder.desc = (policy.custInfo.appnt.appOccupation == ""?"党政机关、企事业单位负责人和行政管理人员":policy.custInfo.appnt.appOccupation)
           })
         },
		 computeHeaderHeight(){
            var _header = $(".manage-main-contents-items")
			var u = navigator.userAgent;
		  	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		  	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		  	if(isAndroid){
		  		_header.css({"marginTop":"48px"})
		  	}else if(isiOS){
		  		_header.css({"marginTop":"68px"})

		  	}
			  },
			showModals(message){
               this.$refs.showalert.showMOdal(message)
			  },
			ageFilter(value){
                const birthday = new Date(value)
                const now = new Date()
                let age = now.getFullYear()-birthday.getFullYear()-1
                if(now.getMonth()-birthday.getMonth()>0){
                  age++
                }else if((now.getMonth()-birthday.getMonth())==0&&(now.getDate()-birthday.getDate())==0){
                 age++
               }
               return age
			},
			computeAge(value){
              const birthday = new Date(value)
              const now = new Date()
              let age = now.getFullYear()-birthday.getFullYear()-1
              if(age >60){
				  return true
			  }
			},
			winReload(cond){
				window.location.reload();
			},
			saveProposal(){
				this.productDate()
				let payModeName = this.proposalPlan.insurantProductList[0].productList[0].payModeName
				let payPeriodName = this.proposalPlan.insurantProductList[0].productList[0].payPeriodName
				if(payModeName !== "趸交"){
					if(payPeriodName == "趸交"){
						this.showModals(this.productDef.productName+"缴费方式为月交或者年交时,交费期间不可为趸交")
						return
					}
				}
				if(payPeriodName !== "趸交"){
					if(payModeName == "趸交"){
						this.showModals(this.productDef.productName+"交费期间为趸交时,缴费方式不可为月交或者年交")
						return
					}
				}
				if(!this.testProductDetail()){
					return
				}
               this.proposalPlan.checkType = '1'
              let callback = () => {
              if(this.reasonList.length>0){
                this.toggle.rule = true
              }else{
            // this.toggle.coverStatus = true
            let requ = JSON.parse(JSON.stringify({
              proposalPlan:this.proposalPlan
            }))
            for(var i in requ.proposalPlan.insurantProductList[0].productList[0].extraList){
              requ.proposalPlan.insurantProductList[0].productList[0].extraList[i].code = (parseInt(i) + 1).toString()
            }
            requ.proposalPlan.holder.birthday += 'T00:00:00.000Z'
            requ.proposalPlan.insurantProductList[0].insurant.birthday += 'T00:00:00.000Z'
            console.log(requ.proposalPlan.insurantProductList[0].insurant)
            console.log('保存建议书request',requ)
            utils.http.post('PROPOSALSAVE',requ).then(response=>{
              this.proposalPlan.checkType = '2'
              console.log('保存建议书response',response)
			  this.planId = response.data.response.proposalPlan.planId
			  utils.cache.set('planId',this.planId)
              utils.cache.set('proposalConfig',this.proposalPlan)
              utils.cache.set('holderSexFlag',this.holderSexFlag)
              utils.cache.set('insurantSexFlag',this.insurantSexFlag)
              utils.cache.set('zhuxianPremium',this.zhuxianPremium)
              utils.cache.set('zhuxianMoney',this.zhuxianMoney)
              utils.cache.set('totalPremium',this.totalPremium)
              utils.cache.set('job',this.job)
              // utils.cache.set('agentInfo',this.agentInfo)
              this.toggle.coverStatus = true
			  			let timer = ""
            	timer = setTimeout(()=>{
                this.toggle.coverStatus = false
                setTimeout(()=>{
				  				this.$router.push({
					  			name:"proposalDemo",
					  			params:{
						  		planId:this.planId
					  		}
				  		})
            },100)
          },1500)
        })
      }
    }
    this.baofeiTest(callback)
  },
	  	 detailBack(){
	  			let orgId = utils.cache.get('personsal').orgId
				if (orgId.substring(0, 4) == "8661") { //重庆机构
					if(this.customerValue.isopen == true){
					   this.customerValue.isopen = false
				  }else{
                       this.$router.push({
						name: "questionnaire_page",
						params: {
							planId: this.$route.params.planId
						}
					})
					   }
				}else{
					if(this.customerValue.isopen == true){
					   this.customerValue.isopen = false	
					}else{
             	this.$router.push({name: 'product_list_page'})
					}
				}
	  		},
	  		test(t){
		      console.log(t)
		      this.sexJob()
			},
			testProductDetail(){
				let age = this.ageFilter(this.proposalPlan.insurantProductList[0].insurant.birthday)
				if(this.proposalPlan.insurantProductList[0].insurant.name == ""){
					this.showModals("被保人名字不能为空")
					return
				}else if(this.proposalPlan.holder.name == ""){
					this.showModals("投保人名字不能为空")
                    return
				}else if(this.proposalPlan.insurantProductList[0].insurant.birthday ==""){
					this.showModals("被保人的生日不能为空")
                    return
				}else if(this.proposalPlan.holder.birthday == ""){
					this.showModals("投保人的生日不能为空")
					return
				}else if(this.insurantDesc == "" &&age>6){
					this.showModals("被保人的职业不能为空")
					return
				}else if(this.proposalPlan.holder.desc ==""){
					this.showModals("投保人保人的职业不能为空")
					return
				}else{
					console.log(this.count2)
					if(this.count2){
						this.showModals("该附加险为健康险应与主险的保险期间一致")
					return
					}
				}
				return true
			},
		    test_1(t){
		    	console.log(t)
		    },
		    blurFocus(){
		    	this.baofeiTest()
			},
			productDefTkStatus(){
				  this.make.productContent_1 = []
                  for(let i in  proposalPlans.proposalPlan.item){
                       if(this.productCode == proposalPlans.proposalPlan.item[i].productCode){
                            if(proposalPlans.proposalPlan.item[i].proposalType == "1"){
                              this.make.productContent_1.push(proposalPlans.proposalPlan.item[i])
						   }
                    }
                }
              this.make.productContent_1.sort((a,b) => {
                const codeA = parseInt(a.code)
                const codeB = parseInt(b.code)
                return codeA -codeB
              })
            if(this.make.productContent_1.length > 0){
               this.toggles.tkStatu = true
               console.log(this.make.productContent_1)
            }else{
             this.toggles.tkStatu = false
              utils.ui.modal.afterOpen()
              MessageBox({
               title: '提示',
                message: '当前险种没有产品条款！'
              }).then(()=>{
              utils.ui.modal.beforeClose()
               })
             }
			},
			tkStatus(item){
             this.make.productContent_1 = []
                  for(let i in  proposalPlans.proposalPlan.item){
                       if(item.productCode == proposalPlans.proposalPlan.item[i].productCode){
						   if(proposalPlans.proposalPlan.item[i].proposalType == "1"){
                              this.make.productContent_1.push(proposalPlans.proposalPlan.item[i])
						   }
                    }
                }
              this.make.productContent_1.sort((a,b) => {
                const codeA = parseInt(a.code)
                const codeB = parseInt(b.code)
                return codeA -codeB
              })
            if(this.make.productContent_1.length > 0){
               this.toggles.tkStatu = true
               console.log(this.make.productContent_1)
            }else{
             this.toggles.tkStatu = false
              utils.ui.modal.afterOpen()
              MessageBox({
               title: '提示',
                message: '当前险种没有产品条款！'
              }).then(()=>{
              utils.ui.modal.beforeClose()
               })
             }
			},
		    sexJob(){
		    	/*被保险人的年龄*/
		    	let ageHolder = ""
		    	/*被保险人的年龄处理*/
		    	let age = this.proposalPlan.insurantProductList[0].insurant.birthday
		    	let ageYear = age.split('-')[0]
		    	let ageMonth = age.split('-')[1]
		    	let ageDay = age.split('-')[2]
		    	/*现在的时间处理*/
		    	let nowDate = new Date()
		  		let nowYear = nowDate.getFullYear()
		  		let nowMonth = nowDate.getMonth() + 1
		  		let nowDay = nowDate.getDate()
		  		let trueAge = nowYear - ageYear
		  		if(nowMonth > ageMonth){
		  			ageHolder = trueAge
		  		}else{
		  			if(nowMonth == ageMonth){
		  				if(nowDay >= ageDay){
		  					ageHolder = trueAge
		  				}else{
		  					ageHolder = trueAge - 1
		  				}
		  			}else{
		  				ageHolder = trueAge
		  			}
		  		}
		  		this.ageHolder = ageHolder
		  		console.log(ageHolder)
		  		if(this.ageHolder <= '6'){
		  			this.proposalPlan.insurantProductList[0].insurant.desc = ""
		  			this.proposalPlan.insurantProductList[0].insurant.level = ""
		  			this.proposalPlan.insurantProductList[0].insurant.profession = ""

		  		}
		    },
		    insurantChooseJob(type){
		    	this.occupationValue.isopen = !this.occupationValue.isopen
		    	this.occupationValue.type = type
			},
			holderChooseJob(type){
             console.log(type)
             this.occupationValue.isopen = !this.occupationValue.isopen
             this.occupationValue.type = type
            },
	  		toQuestionnaireQage:function(){
				  this.proposalPlan.checkType = '1'
	  			let callback = () => {
	  				if(this.reasonList.length>0){
	  					this.toggle.rule = true
	  				}else{
	  					utils.cache.set('proposalPlan',this.proposalPlan)
	  					let orgId = utils.cache.get('personsal').orgId
						if (orgId.substring(0, 4) == "8635") { //宁波机构
							this.$router.push({
								name: 'questionnaire_page_nb',
								params: {
									planId: this.planId
								}
							})
						} else if (orgId.substring(0, 4) == "8631" && this.computeAge(this.proposalPlan.holder.birthday) ) { //上海机构
							this.$router.push({
								name: 'questionnaire_page_sh',
								params: {
									planId: this.planId
								}
							})
						} else { //非指定机构进入客户详情页面
							this.$router.push({
								name: 'customer_details_page',
								params: {
									planId: this.planId
								}
							})
						}
	  				}
	  			}
	  			this.baofeiTest(callback)
	  		},
	  		searchJob(){
		      let newArray = []
		      let _this = this
		      this.jobList.map(i => {
		        if(i.code.indexOf(this.jobValue) != -1 || i.descr.indexOf(this.jobValue) != -1){
		          newArray.push(i)
		        }
		      })
		      this.jobList = newArray
		    },
		    searchJobHolder(){
				let newArray = []
				let _this = this
				this.jobListHolder.map(i => {
					if (i.code.indexOf(this.jobValueHolder) != -1 || i.descr.indexOf(this.jobValueHolder) != -1) {
						newArray.push(i)
					}
				})
				this.jobListHolder = newArray
			},
			getDividendText(list){
				let arr = []
               for(let i = 0;i<list.length;i++){
				if(list[i] == "1"){
                   let item = {}
				   item.code = list[i]
				   item.text = "累积生息"
				   arr.push(item)
				 }else if(list[i] == "2"){
                   let item = {}
				   item.code = list[i]
				   item.text = "抵交保费"
				   arr.push(item)
				 }else if (list[i] == "3"){
					let item = {}
				   item.code = list[i]
				   item.text = "现金领取"
				   arr.push(item)
				 }else if(list[i] == "4"){
                   let item = {}
				   item.code = list[i]
				   item.text = "现金红利"
				   arr.push(item)
				 }else if(list[i] == "5"){
					let item = {}
				   item.code = list[i]
				   item.text = "增额交清"
				   arr.push(item)
				 } else if(list[i] == "6"){
				   let item = {}
				   item.code = list[i]
				   item.text = "进入万能账户累计"
				   arr.push(item)
				 }
			   }
			   return arr
			},
		    getProductDef(productCode){
				let personsal = utils.cache.get('personsal')||{}
		    	let requ = {
			        "productDef": {
			          "agentCode":utils.cache.get('personsal')?utils.cache.get('personsal').agentCode:'1100D12336',
			          "productCode": productCode,
			          "token": new Date().getTime(),
					  "openId": "1",
					  "channel":utils.cache.get('channel')
			        }
				}
				console.log(requ)
			    utils.http.post('PRODUCTDEFLIST',requ).then(response => {
					this.itemList = response.data.response.productDefList[0]
					this.productDef = response.data.response.productDefList[0]
					let  prodCode =  response.data.response.productDefList[0].productCode
					if((prodCode == "HMT038"||prodCode == "HDT037")&&response.data.response.productDefList[0].productDefine.autoXubao == "true"){
						this.proposalPlan.insurantProductList[0].productList[0].isAutoXubao = "-2"
						this.isTestHealtb = true
					}
					this.extraproductDef = response.data.response.productDefList[0].extraList
					this.productDef.dividend = response.data.response.productDefList[0].productDefine.dividend
					this.productDef.dividend = this.productDef.dividend.split(",")
					this.productDef.dividend = this.getDividendText(this.productDef.dividend)
					console.log(this.productDef.dividend)
					for (var extra of this.productDef.extraList) {
						this.extraMap[extra.productCode] = extra
					}
					let productMain = this.proposalPlan.insurantProductList[0].productList[0]
			    	if(this.$route.params.planId == 'new' || this.$route.params.adressCQ == 'CQ'){
						productMain.productCode = this.productDef.productCode
						productMain.productName = this.productDef.productName
						productMain.attList = this.productDef.attList
						for (let item of this.productDef.attList) {
							if (item.attValueList.length > 0) {
								productMain[item.attCode] = item.attValueList[0].code
								productMain[item.attCode + 'Name'] = item.attValueList[0].text
							}
						}
						if (this.productDef.bindCode != '') {
							this.toggle.extraList = true
							for (let item of this.productDef.bindExtraList) {
								let extra = {
									productCode: item.productCode,
									productName: item.productName,
									checked: 'checked',
									disabled: 'disabled'
								}
								for (let att of item.attList) {
									extra[att.attCode] = att.attValueList[0].code
									extra[att.attCode + 'Name'] = att.attValueList[0].text
								}
								let existProduct = false
								for (let item of productMain.extraList) {
									if (item.productCode == extra.productCode) {
										existProduct = true
									}
								}
								if (!existProduct) {
									productMain.extraList.push(extra)
								}
							}
						}
					}else{
						productMain.attList = this.productDef.attList
					}
					let  proposalPlan= utils.cache.get('proposalPlan')
					if(proposalPlan != null && this.$route.params.planId !='new'){
					  this.proposalPlan = utils.cache.get('proposalPlan')
					}
					 this.baofeiTest()
			    })
		    },
			beforeChooseMainItem() {
				temp.ready = false
			},
		    chooseMainItem(item){
				for (let i of item.attValueList) {
					if (this.proposalPlan.insurantProductList[0].productList[0][item.attCode] == i.code) {
						console.log('选择的内容为...........',i.text)
						this.proposalPlan.insurantProductList[0].productList[0][item.attCode + 'Name'] = i.text
						break;
					}
				}
				this.baofeiTest(() => {
					setTimeout(() => {
						temp.ready = true
					}, 110)
				})
		    },
			chooseExtraList(productCode) {
				for (let i of this.productDef.extraList) {
					if (i.productCode == productCode) {
						this.extra = Object.assign({}, i)
						this.extraProductCode = productCode
						this.chooseExtra()
						break
					}
				}
			},
			chooseExtra() {
				this.extra = Object.assign({},this.extraMap[this.extraProductCode])
				if (this.extra.productCode === 'HDT042' || this.extra.productCode === 'HDT024') {
					let payPeriod = this.proposalPlan.insurantProductList[0].productList[0].payPeriod
					if (payPeriod.indexOf('term') !== -1) {
						this.extra.attList[1].attValueList[0].text = (parseInt(payPeriod.split('_')[1], 10) - 1) + '年'
					}
				}
				if (this.extra.productCode === 'HMT039') {
					this.extra.attList[0].attName = "交费方式"
				}
				if (this.extra.productCode === 'HDT024') {
					let text = this.proposalPlan.insurantProductList[0].productList[0].payPeriodName
					if(text == "趸交"){
                       this.extra.attList[1].attValueList[0].text = this.proposalPlan.insurantProductList[0].productList[0].payPeriodName
					}else{
						let num = (parseInt(text)-1)+"年"
						this.extra.attList[1].attValueList[0].text = num
					}
					this.extra.attList[2].attValueList[0].text = this.proposalPlan.insurantProductList[0].productList[0].payPeriodName
					this.extra.attList[0].attValueList[0].text = "年交"
				}
				let exist = false
				for (let item of this.proposalPlan.insurantProductList[0].productList[0].extraList) {
					if (item.productCode == this.extra.productCode) {
						exist = true
						this.extraEdit = Object.assign({}, item)
						this.extraEdit.amount = item.amount
						break
					}
				}
				if (!exist) {
					for (let item of this.extra.attList) {
						if (['amount', 'premium', 'piece'].indexOf(item.attCode) == -1) {
							this.extraEdit[item.attCode] = item.attValueList[0].code
							this.extraEdit[item.attCode + 'Name'] = item.attValueList[0].text
						}
						console.log(this.extra.productCode)
						this.extraEdit.amount = product[this.extra.productCode].amount
						this.extraEdit.piece = product[this.extra.productCode].piece
						this.extraEdit.premium = product[this.extra.productCode].amount
					}
				}
				this.extraEdit.productName = this.extra.productName
				this.extraEdit.productCode = this.extra.productCode
				this.toggle.extraEdit = true
			},
			cancelExtra() {
				this.toggle.extraEdit = false
				this.extra = {}
				this.extraEdit = {}
				let input = $(".kexuanPlan").children('.mbsc-control')
				input[0].value = "请选择附加险"
				input[0].style.color = "#666"
			},
			saveExtra() {
			  if(this.addList.length>1){
                    for(let i =0;i<this.addList.length-1;i++){
                 let prev = this.addList[i].addEnd
                 let next = this.addList[i+1].addBegin
                if(prev>next){
				  this.showModals("新追加追加保费的起始年限必须大于上一次的截止年限")
                  return
              }
             }
          }
           if(this.drawList.length>1){
             for(let i =0;i<this.drawList.length-1;i++){
                let prev = this.drawList[i].drawEnd
                let next = this.drawList[i+1].drawBegin
               if(prev>next){
				   this.showModals("新增的部分领取保费的起始年限必须大于上一次的截止年限")
                   return
                 }
                }
               }
				this.toggle.extraEdit = false
				this.proposalPlan.checkType = '1'
				let existExtra = false
				console.log(this.extraEdit)
				for (let i = 0; i < this.proposalPlan.insurantProductList[0].productList[0].extraList.length; i++) {
					let extra = this.proposalPlan.insurantProductList[0].productList[0].extraList[i]
					if (extra.productCode == this.extraEdit.productCode) {
						existExtra = true
						for (let i in this.extraEdit) {
							extra[i] = this.extraEdit[i]
						}
						extra.checked = 'checked'
						extra.disabled = 'disabled'
						break
					}
				}
				if (!existExtra) {
					this.proposalPlan.insurantProductList[0].productList[0].extraList.push(Object.assign({
						checked: 'checked',
						disabled: 'disabled'
					}, this.extraEdit))
				}
				let input = $(".kexuanPlan").children('.mbsc-control')
				input[0].value = "请选择附加险"
				input[0].style.color = "#666"
				this.baofeiTest(() => {
					this.proposalPlan.checkType = '1'
					if (this.reasonList.length > 0) {
						this.toggle.rule = true
					}
					this.cancelExtra()
				})
			},
			chooseExtraItem(item) {
				for (let i of item.attValueList) {
					if (this.extraEdit[item.attCode] == i.code) {
						this.extraEdit[item.attCode + 'Name'] = i.text
						break;
					}
				}
			},
			deleteExtra(item) {
				let extraList = this.proposalPlan.insurantProductList[0].productList[0].extraList
				for (let i in extraList) {
					if (extraList[i].productCode == item.productCode) {
						extraList.splice(i, 1)
						break
					}
				}
			},
			//健康险规则校验
			testHealtb(){
				this.count = false
				console.log(this.fujialist)
				if(this.fujialist.length>0&&this.extraproductDef.length>0){
          for(let a=0;a<this.fujialist.length;a++){
					  for(let i=0;i<this.extraproductDef.length;i++){
             if(this.fujialist[a].productCode == this.extraproductDef[i].productCode){
						if(this.extraproductDef[i].productDefine.typeOne == "20"){
							this.count = true;
					 	}
					}
				}
			}
		}
		else{
					return false
				}
			},
		    baofeiTest(callback){
				console.log(this.proposalPlan)
		      if(!this.productDef.attList){
		        return
		      }
		      let requ = JSON.parse(JSON.stringify({
		        proposalPlan:this.proposalPlan
			  }))
			 if(this.proposalPlan.insurantProductList[0].insurant.birthday == ""){
                return this.showModals("被保人出生日期不录入,会导致无法计算保费请输入")
             }
		      requ.proposalPlan.holder.birthday += 'T00:00:00.000Z'
			  requ.proposalPlan.insurantProductList[0].insurant.birthday += 'T00:00:00.000Z'
		      requ.proposalPlan.orgAgent = {
		        "channel": utils.cache.get('personsal')?utils.cache.get('personsal').channel:'02',
		        "deviceNo": "572032449254344960",
		        "loginCode": "",
		        "openId": "xxxx",
		        "token": "",
		        "agentCode": utils.cache.get('personsal')?utils.cache.get('personsal').agentCode:'1100D12336',
		        "agentName":utils.cache.get('personsal')?utils.cache.get('personsal').agentName:'李彩伶',
		        "mobile":utils.cache.get('personsal')?utils.cache.get('personsal').mobile:''
		      }
		      requ.proposalPlan.insurantProductList[0].productList[0].attList = this.productDef.attList
		      for(let att of requ.proposalPlan.insurantProductList[0].productList[0].attList){
		        att.attValue = requ.proposalPlan.insurantProductList[0].productList[0][att.attCode]
		      }
		      for(let extra of requ.proposalPlan.insurantProductList[0].productList[0].extraList){
		        extra.attList = this.extraMap[extra.productCode].attList
				console.log(extra,"....................")
				extra.checked = 'checked'
		        extra.disabled = 'disabled'
		        if(!extra.amount){
		          extra.amount = product[extra.productCode].amount
		        }
		        for(let att of extra.attList){
		          att.attValue = extra[att.attCode]
		        }
			  }
			    let extraList = requ.proposalPlan.insurantProductList[0].productList[0].extraList
            if(extraList!=undefined&&extraList.length>0){
             for (let i = 0; i < extraList.length; i++) {
               const element = extraList[i];
               if(element.productCode == "NPU012"){
               requ.proposalPlan.insurantProductList[0].productList[0].extraList[i].addList = this.addList
               requ.proposalPlan.insurantProductList[0].productList[0].extraList[i].drawList = this.drawList
              }
             }
		   }
			this.fujialist = requ.proposalPlan.insurantProductList[0].productList[0].extraList
			let isPass = this.testHealtb()
			if(isPass){
         return
			}else{
               utils.http.post('PRODUCTPREMIUM',requ).then(response =>{
			   if (response == null) {
		          return
		       }
		        let project = response.data.response
		        console.log('保费试算response:',project)
		        this.showManageData = project.trialPremiumMobile.insurantProductList["0"].plan
		        this.toubaoxuzhi = project.trialPremiumMobile.strList
		        this.imgUrl = project.trialPremiumMobile.imageURL
		        /*产品介绍*/
				this.productJieShao = project.trialPremiumMobile.coverageItemList
				for(let i =0;i<this.productJieShao.length;i++){
					let index = this.productJieShao[i].message.indexOf("**")
					if(index != -1){
            this.productJieShao[i].message = this.productJieShao[i].message.replace("**","")
					}
				}
		        this.pass = project.trialPremiumMobile.insurantProductList["0"].checkResult.pass
		          
		          if(this.pass == "true"){
		            console.log('保费试算通过')
								this.toggle.rule = false
		            this.totalPremium = project.trialPremiumMobile.insurantProductList["0"].plan.totalPremium
		            this.totalAmount = project.trialPremiumMobile.insurantProductList["0"].plan.totalAmount
		            this.proposalPlan.insurantProductList[0].totalPremium = this.totalPremium
					/*主线保费*/
		            this.proposalPlan.insurantProductList[0].productList[0].premiumDes = project.trialPremiumMobile.insurantProductList["0"].plan.productList[0].premiumDes
					/*主线保额*/
		            this.proposalPlan.insurantProductList[0].productList[0].amount = project.trialPremiumMobile.insurantProductList["0"].plan.productList[0].amount
		            for(let i in project.trialPremiumMobile.insurantProductList["0"].plan.productList[0].extraList){
		              this.proposalPlan.insurantProductList[0].productList[0].extraList[i].premiumDes = project.trialPremiumMobile.insurantProductList["0"].plan.productList[0].extraList[i].premiumDes
		              this.proposalPlan.insurantProductList[0].productList[0].extraList[i].amount = project.trialPremiumMobile.insurantProductList["0"].plan.productList[0].extraList[i].amount
					}

		            for(var i in this.productDef.attList){
		              if(this.productDef.attList[i].attCode == "amount"){
		                this.zhuxianPremium = project.trialPremiumMobile.insurantProductList["0"].plan.productList["0"].premiumDes
		              }else if(this.productDef.attList[i].attCode == "premium"){
		                this.zhuxianMoney = project.trialPremiumMobile.insurantProductList["0"].plan.productList["0"].amount
		              }
					}
		            this.reasonList = []
		          }else if(this.pass == "false"){
		            this.totalPremium = "0"
		            /*投保规则校验框*/
		            // this.toggle.rule = true
		            this.reasonList = project.trialPremiumMobile.insurantProductList["0"].checkResult.reasonList
					console.log('投保规则：',this.reasonList)
					let message = ""
					for (var i = 0; i < this.reasonList.length; i++) {
						message += this.reasonList[i].info
					}
					console.log('保费试算问题===>'+message)
				  }

		          for(let i in this.productDef.attList){
		            if(this.productDef.attList[i].attCode == "premium"){
		              this.proposalPlan.insurantProductList["0"].productList["0"].amount = this.zhuxianMoney
		            }
				  }
		          this.extra = {}
		          if(callback){
		            callback()
		          }
		          setTimeout(()=>{
		            temp.ready = true
		          },100)
				})
			  }
		    },
		    stepSave(){
		    	this.productDate()
					let payModeName = this.proposalPlan.insurantProductList[0].productList[0].payModeName
					let payPeriodName = this.proposalPlan.insurantProductList[0].productList[0].payPeriodName
            if(payModeName !== "趸交"){
              if(payPeriodName == "趸交"){
						  this.showModals(this.productDef.productName+"缴费方式为月交或者年交时,交费期间不可为趸交")
					    return
					  	}
            }
            if(payPeriodName !== "趸交"){
              if(payModeName == "趸交"){
						  this.showModals(this.productDef.productName+"交费期间为趸交时,缴费方式不可为月交或者年交")
					    return
					  }
				   }
				let age = this.ageFilter(this.proposalPlan.holder.birthday)
				if(age>=60||age<18){
					this.showModals("投保人年龄必须位于18~59周岁!")
					return
				}
				if(!this.testProductDetail()){
					return
				}
				if(this.productDef.dividend.length>0&&this.proposalPlan.insurantProductList[0].productList[0].dividend == ""){
					this.showModals("红利领取方式不能为空请选择!")
					return
				}
				this.productDate()
				this.proposalPlan.insurantProductList[0].productList[0].extraList = this.fujialist
				 utils.cache.set('proposalPlan',this.proposalPlan)
				if(this.proposalPlan.holder.desc == undefined){
				   this.toggle.rule = true
				   let item = {}
				   item.info = '请选择投保人职业'
				   this.reasonList[0] = item
				   return
				}
				let mainPolicyArr = []
				let extraPolicyArr = []
				let policy = []
				let mainPolicy = {}
				let extraPolicy = {}
				let isAuto = ""
				if(this.proposalPlan.insurantProductList[0].productList[0].automatic == false){
                   isAuto = "0"
				}else if(this.proposalPlan.insurantProductList[0].productList[0].automatic == true){
					isAuto = "1"
				}
				let prodCode = utils.cache.get('productCode')
				//判断主险是安康百万自动续保
				let rankProdName = ""
				let isNOAutoXubao = ""
				if(prodCode == "HMT038" || prodCode == 'HDT037'){
					if(this.proposalPlan.insurantProductList[0].productList[0].isAutoXubao == "-1"){
						 isNOAutoXubao = "-1"
					}else if(this.proposalPlan.insurantProductList[0].productList[0].isAutoXubao == "-2"){
						 isNOAutoXubao = "-2"
					}
				}else{
					   isNOAutoXubao  = ""
				}
				//判断主险是安康百万核心传值特殊处理一下
				if(prodCode == "HMT038"&&this.proposalPlan.insurantProductList[0].productList[0].rank!=''){
					if(this.proposalPlan.insurantProductList[0].productList[0].rank == 'plan_3'){
						if( this.proposalPlan.insurantProductList[0].productList[0].productName !="光大永明安康百万医疗保险计划三"){
                              this.proposalPlan.insurantProductList[0].productList[0].productName =  "光大永明安康百万医疗保险计划三"
						}
					}else if(this.proposalPlan.insurantProductList[0].productList[0].rank == 'plan_4'){
					  if( this.proposalPlan.insurantProductList[0].productList[0].productName !="光大永明安康百万医疗保险计划四"){
                              this.proposalPlan.insurantProductList[0].productList[0].productName = "光大永明安康百万医疗保险计划四"
						}
					}
				}
                 mainPolicy = {	
					"isMaster": "1",
					"prodInsSeq": "1",
					"rank":this.proposalPlan.insurantProductList[0].productList[0].rank,
					"prodName": this.proposalPlan.insurantProductList[0].productList[0].productName,
					"prodCode": this.proposalPlan.insurantProductList[0].productList[0].productCode,
					"payYear": this.proposalPlan.insurantProductList[0].productList[0].payPeriod || "",
					"payYearName":this.proposalPlan.insurantProductList[0].productList[0].payPeriodName || "",
					"insureYear": this.proposalPlan.insurantProductList[0].productList[0].policyPeriod || "",
					"insureYearName":this.proposalPlan.insurantProductList[0].productList[0].policyPeriodName || "",
					"amnt": this.proposalPlan.insurantProductList[0].productList[0].amount,
					"prem": this.proposalPlan.insurantProductList[0].productList[0].premiumDes,
					"bonusGetMode": this.proposalPlan.insurantProductList[0].productList[0].dividend,
					"rnewFlag": isNOAutoXubao,
					"getYear": this.proposalPlan.insurantProductList[0].productList[0].drawAge || "",
					"getDutyKind": this.proposalPlan.insurantProductList[0].productList[0].drawFreq || "",
					"getDutyKindName":this.proposalPlan.insurantProductList[0].productList[0].drawFreqName || "",
					"getYears": this.proposalPlan.insurantProductList[0].productList[0].drawMode || "",
					"getYearsMQ": "",
					"autoPayFlag": isAuto,
					"isAutoXubao":this.proposalPlan.insurantProductList[0].productList[0].isAutoXubao == false?isNOAutoXubao:this.proposalPlan.insurantProductList[0].productList[0].isAutoXubao,
					"payIntv": this.proposalPlan.insurantProductList[0].productList[0].payMode || "",
					"payIntvName":this.proposalPlan.insurantProductList[0].productList[0].payModeName || "",
				}
				console.log(mainPolicy)
				mainPolicyArr.push(mainPolicy)
				let extraRank = ''
				for (let i in this.proposalPlan.insurantProductList[0].productList[0].extraList) {
					if(this.proposalPlan.insurantProductList[0].productList[0].extraList[i].productCode == 'HMT039'){
						if(this.proposalPlan.insurantProductList[0].productList[0].extraList[i].rank == "plan_3"){
						   extraRank = '百万安康计划三'
						}else if(this.proposalPlan.insurantProductList[0].productList[0].extraList[i].rank == "plan_4"){
                           extraRank = '百万安康计划四'
						}
					}
					let index = parseInt(i) + 2
					extraPolicy = {
						"isMaster": index,
						"code":i,
						"prodInsSeq": index.toString(),
						"prodName":this.proposalPlan.insurantProductList[0].productList[0].extraList[i].productName+""+extraRank,
						"prodCode": this.proposalPlan.insurantProductList[0].productList[0].extraList[i].productCode,
						"payYear": this.proposalPlan.insurantProductList[0].productList[0].extraList[i].payPeriod || "",
						"payYearName":this.proposalPlan.insurantProductList[0].productList[0].extraList[i].payPeriodName || "",
						"insureYear": this.proposalPlan.insurantProductList[0].productList[0].extraList[i].policyPeriod || "",
						"insureYearName":this.proposalPlan.insurantProductList[0].productList[0].extraList[i].policyPeriodName || "",
						"minPlanPrem": this.proposalPlan.insurantProductList[0].productList[0].extraList[i].premiumDes,
						"amnt": this.proposalPlan.insurantProductList[0].productList[0].extraList[i].amount,
						"prem": this.proposalPlan.insurantProductList[0].productList[0].extraList[i].premiumDes,
						"bonusGetMode": "",
						"rnewFlag":"",
						"addList":this.addList,
						"drawList":this.drawList,
						"getYear": "",
						"getYearsMQ": "",
						"rank":this.proposalPlan.insurantProductList[0].productList[0].extraList[i].rank || "",
						"getDutyKind": this.proposalPlan.insurantProductList[0].productList[0].extraList[i].drawFreq || "",
						"getYears": "",
						"getYearsMQ": "",
						"autoPayFlag": "",
						"piece":this.proposalPlan.insurantProductList[0].productList[0].extraList[i].piece||"" ,
						"piece":"",
						"piece":this.proposalPlan.insurantProductList[0].productList[0].extraList[i].piece || "",
						"payIntv": this.proposalPlan.insurantProductList[0].productList[0].extraList[i].payMode || "",
						"payIntvName":this.proposalPlan.insurantProductList[0].productList[0].extraList[i].payModeName || ""
					}
					extraPolicyArr.push(extraPolicy)
				}
				policy = mainPolicyArr.concat(extraPolicyArr)
		    	let requ = {
					"policy": {
						"deviceNo": "",
						"channel": utils.cache.get('personsal').channel,
						"substepNo": "1",
						"isInsert": "",
						"agentCode": utils.cache.get('personsal').agentCode,
						"orderCode": this.planId||this.$route.params.planId,
						"policyInfo": {
							"agentCom": "",
							"approach": "",
							"purpose": "",
							"approachDes": "",
							"purposeDes": "",
							"annualIncome": "",
							"sourceOfIncome": "",
							"totalAssets": ""
						},
						"custInfo": {
							"appnt": {
								"appntName": this.proposalPlan.holder.name,
								"appntSex": this.proposalPlan.holder.sex,
								"appntBirthday": this.proposalPlan.holder.birthday,
								"appntStature": "",
								'desc':this.proposalPlan.holder.desc,
								"appntAvoirdupois": "",
								"nativePlace": "",
								"idType": this.proposalPlan.holder.idType,
								"idNo": this.proposalPlan.holder.idNo,
								"idExpDate": this.proposalPlan.holder.idExpDate,
								"marriage": "",
								"province": "",
								"city": "",
								"county": "",
								"street": "",
								"community": "",
								"postalAddress": "",
								"zipCode": "",
								"homePhone": "",
								"homePhoneCode": "",
								"mobile": "",
								"email": "",
								"grpName": "",
								"companyPhone": "",
								"companyPhoneCode": "",
								"appOccupation": this.proposalPlan.holder.desc,
								"occupationType": this.proposalPlan.holder.level,
								"occupationCode": this.proposalPlan.holder.profession,
								"salary": "",
								"appntCopy": "",
								"appntSign": "",
								"residentType": "",
								"familySalay": "",
								"premBudget": "",
								"appResFlag": "",
								"appntTaxInfo": {
									"taxIdentity": "",
									"birthCountry": "",
									"birthProvince": "",
									"birthCity": "",
									"taxInfoList": {
										"taxInfo": [{
											"taxArea": "",
											"tin": "",
											"reasonCheck": "",
											"reasonMessage": ""
										}]
									}
								}
							},
							"insurants": {
								"insCount": "",
								"insurant": [{
									"insSeq": "",
									"name": this.proposalPlan.insurantProductList[0].insurant.name,
									"sex": this.proposalPlan.insurantProductList[0].insurant.sex,
									"birthday": this.proposalPlan.insurantProductList[0].insurant.birthday,
									"stature": "",
									'desc':this.proposalPlan.insurantProductList[0].insurant.desc,
									"avoirdupois": "",
									"nativePlace": "",
									"idType":this.proposalPlan.insurantProductList[0].insurant.idType,
									"idNo":this.proposalPlan.insurantProductList[0].insurant.idNo,
									"idExpDate":this.proposalPlan.insurantProductList[0].insurant.idExpDate,
									"marriage": "",
									"smokeFlag": "",
									"province": "",
									"city": "",
									"county": "",
									"street": "",
									"community": "",
									"postalAddress": "",
									"zipCode": "",
									"homePhone": "",
									"homePhoneCode": "",
									"mobile": "",
									"email": "",
									"grpName": "",
									"companyPhone": "",
									"companyPhoneCode": "",
									"insOccupation": this.proposalPlan.insurantProductList[0].insurant.desc,
									"occupationType": this.proposalPlan.insurantProductList[0].insurant.level,
									"occupationCode": this.proposalPlan.insurantProductList[0].insurant.profession,
									"relToApp": this.proposalPlan.insurantProductList[0].insurant.relationNew||"",
									"salary": "",
									"insSign": "",
									"insResFlag": "",
									"insurantTaxInfo": {
										"taxIdentity": "",
										"birthCountry": "",
										"birthProvince": "",
										"birthCity": "",
										"taxInfoList": {
											"taxInfo": [{
												"taxArea": "",
												"tin": "",
												"reasonCheck": "",
												"reasonMessage": ""
											}]
										}
									}
								}]
							},
							"bnfInfo": {
								"bnfType": "",
								"bfcyRemark": "",
								"beneficiaries": {
									"bnfCount": "",
									"beneficiary": []
								}
							}
						},
						"productInfo": {
							"newPayMode": "",
							"sumPremL": this.totalPremium, //首期保险费合计（小写）
							"sumAmntL": this.totalAmount,
							"bankCode": "",
							"bankAccNo": "",
							"bankAccName": "",
							"products": {
								"prodCount": policy.length.toString(),
								"product": policy
							}
						},
						"question": {
							"resQuestion": {
								"fetationDate": "",
								"resRemark": [{
									"resCustCode": "",
									"questionNo": "",
									"questionRemark": ""
								}, {
									"resCustCode": "",
									"questionNo": "",
									"questionRemark": ""
								}]
							}
						},
						"docType": ""
					}
		    	}
		    	for(let i in requ.policy.productInfo.products.product){
					if(requ.policy.productInfo.products.product[i].isMaster == "1"){
						if(requ.policy.productInfo.products.product[i].getDutyKindName == "趸领"){
							requ.policy.productInfo.products.product[i].getDutyKindName = "0"
						}else if(requ.policy.productInfo.products.product[i].getDutyKindName == "月领"){
							requ.policy.productInfo.products.product[i].getDutyKindName = "1"
						}else if(requ.policy.productInfo.products.product[i].getDutyKindName == "年领"){
							requ.policy.productInfo.products.product[i].getDutyKindName = "12"
						}
					}
				}
		    	if(requ.policy.orderCode == "new"){
		    		requ.policy.orderCode = ""
		    	}
		    	if(requ.policy.custInfo.appnt.appOccupation == ""){
		    		requ.policy.custInfo.appnt.occupationCode = ""
		    		requ.policy.custInfo.appnt.occupationType = ""
		    	}
		    	if(requ.policy.custInfo.insurants.insurant[0].insOccupation == ""){
		    		requ.policy.custInfo.insurants.insurant[0].occupationCode = ""
		    		requ.policy.custInfo.insurants.insurant[0].occupationType = ""
				}
				console.log(requ)
		    	utils.http.post('MODISTRIESAVE',requ).then(response => {
		    		this.planId = response.data.response.policy.orderId
		    		if(response.data.response.policy.resultCode == "0"){
		    			 this.toQuestionnaireQage()
		    		}
		    	})
		     }
	  	}
	}
</script>
<style lang="scss" scoped type="text/css">
.nationality{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
.alert-reasonList{
  max-height:225px;
  min-height:50px;
  padding-top:15px;
  padding-left:8px;
  min-height: 100px;
  max-height: 180px;
  overflow-y:auto;
  z-index: 2000;
}
	select{
		background:url("../../../static/img/common/jiantou.png") no-repeat scroll right center;
		background-size: 13px 10px
	}
	.detail-img{
		img{
			display: block;
			width: 100%;
		}
	}
	.detail-content_1{
		margin-bottom: 10px;
	}
	.detail-content_1,.detail-content_2,.detail-content_3,.detail-content_4{
		border-top: 1px solid #BBB;
		background: #F5F5F5;
		.title{
			width: 100%;
			height: 40px;
			line-height: 40px;
			border-bottom: 1px solid #BBB;
			p{
				float:left;
				height: 100%;
				line-height: 40px;
				padding-left: 10px;
				color: #FFAC00;
			}
		}
		.contents{
			width: 100%;
			background: #FFF;
			li{
				width: 100%;
				height: 40px;
				line-height: 40px;
				overflow: hidden;
				border-bottom: 1px dashed #BBB;
				p{
					float:left;
					height: 100%;
					line-height: 40px;
					padding-left: 10px;

				}
				 input{
                      height: 40px;
					  width: 80%;
                      text-align: right!important;
                      float: right;
                      border:none !important;
                }
				span{
					float:right;
					display: inline-block;
					height: 100%;
					line-height: 40px;
					padding-right:10px;
					i{
						line-height: 40px;
						color: #FFAC00;
					}
					select{
						width: 80px;height: 30px;
						margin-top:5px;
						border: none;
					}
					input{
						height: 30px;
						border: none;
						text-align: right;
						margin-top:5px;
					}
				}
			}
		}
	}
	.detail-content_2,.detail-content_3{
		margin-bottom:10px;
		.kexuanPlan{
			float:right;
			height: 100%;
			line-height: 48px;
			padding-right:10px;
			span{
				padding-left:10px;
			}
		}
	}
	.detail-content_3{
		.contents{
			div{
				h1{
					padding: 10px 0;
					width: 100%;
					text-align: center;
					font-weight: bold;
					color: #FFAC00;
				}
				p{
					width: 90%;
					padding: 0 5%;
					text-align: justify;
					line-height: 20px;
				}
			}
		}
	}
	.detail-content_4{
		.contents{
			width: 100%;
			background: #FFF;
			img{
				display: block;
				width: 90%;
				margin:auto;
				padding-top: 10px;
			}
		}
	}
	.detail-content_5{
		width: 100%;
		p{
			width: 100%;
			text-align: center;
			color: #FEBF32;
			u{
				display: block;
				padding-bottom: 10px;
			}
		}
	}
	.mint-msgbox{
		background: red !important;
	}
	.product-title{
		display: inline-block;
		float:left;
		width: 102px;
		line-height: 32px;
		text-align: right;
		margin-right: 10px;
	}
	.back{
			display: block;
			height: 100%;width: 100%;
			position: relative;
			img{
				position: absolute;
				top: 50%;left: 50%;
				margin-top: -10px;
				margin-left: -20px;
			}
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
	#manage-content .mint-header{
		font-size: 18px;
		color: #E51C23;
		background: #12294A;
		font-weight: bold;
	}
	input{
		display: inline-block;
		float: left;
		border:1px solid #BBBBBB;
		border-radius:5px;
	}
	.manage-main-contents-items{
		width: 100%;
		font-size: 12px;
		padding-bottom: 50px;
		background: #FFF;
		// overflow-y: auto;
		// overflow-x: hidden;
	}
	.job{
	    position: absolute;
	    top: 52px;
	    height: 40px;width: 100%;
	    z-index: 1;
	    border-bottom: 1px solid #BBB;
	    .jobTit{
	      float: left;
	      line-height: 40px;
	      text-align:center;
	    }
	    .jobContent{
	      float: left;
	      width: 100%;height: 40px;
	      border-bottom: 1px solid #BBB;
	      div{
	        float: left;height: 100%;
	        text-align:center;
	      }
	    }
	}
	.fujia-content{
	    div{
	    //   height: 40px;
	      padding:0 10px;
	      border-bottom: 1px solid #BBB;
	      p{
	        height: 40px;
	        line-height: 40px;
	        width: 50%;
	        float: left;
	      }
	      input{
	      	border:none;
	      }
	    }
	}
	.make-sure{
	    float: left;
	    width: 100%;height: 105px;
	    line-height: 105px;
	    display:flex;
	    justify-content:space-around;
	    .true-btn{
	      width: 25%;height: 40px;
	      background: #FEB101;
	      color: #FFF;
	      font:18px/40px '';
	      display: inline-block;
	      transform: translateY(85%);
	    }
  	}
  	.teshu-header{
	    height: 48px;line-height: 48px;
	    text-align: center;
	    background: #0C3073;
	    color: #FFF;
	    border-radius: 15px 15px 0 0;
	    font-weight:bold;
	  }
.bg-img .mint-popup-right{
    width:100%;height: 100%;
    background: #F2F2F2;
    img{
      display: block;
      width:100%;height: 100%;
    }
}
.supplementarycalls{
    padding: 0 !important;
    div{
          padding: 0 10px;
          height: 40px;
          border-bottom: 1px solid #BBB;
    }
  }
</style>
<style >
.kexuanPlan input{
  display: inline-block;
  text-align:right;
  border:none;
  height:100%;
  float: right;
  background: #F5F5F5;
}
.poicyInfo input{
  display: inline-block;
  text-align:right;
  border:none;
  height:100%;
  float: right;
  padding-right: 10px;
}
.fujia-content input{
	float: right;
	width: 30%;
	display: inline-block;
	height: 38px;
	line-height: 40px;
	text-align: right;
}
.appant-name{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40px;
	line-height: 40px;
}
.appant-name>div{
	height: 40px;
	line-height: 40px;
}
.appant-name-customerSearch{
	width: 70%;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.fa-search{
    color: #FEB101 !important;
    font-size: 18px;
}
.proposalPlan-detail{
	display: flex;
	justify-content: space-between;
}
.select-icon{
	line-height: 40px;
	height: 100%;
	margin-right: 10px;
	display: flex;
	align-items: center;
}
.color{
		font-size: 18px;
		color:#FEB101 !important;
}
#maincontent{
	position: relative !important;
}
.mint-popup {
    overflow-y: auto;
}
.isAuto{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.item_title_relation{
  height: 40px;
  line-height: 40px;
  background: #F0F0F0;
  border-bottom: 1px solid #DADADA;
  border-top: 1px solid #DADADA;
  display: flex;
  color: #FEB101;
  align-items: center;
  color:#757575;
  border:none;
  justify-content: space-between;
  overflow:hidden;
  .mbsc-control-ev{
    background: #F0F0F0 !important;
  }
}
</style>
