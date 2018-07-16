<!--电子保单页面-->
<template>
	<div id="content">
		<CADialog v-show="caValue.isCAOpen && !caValue.isCACommentOpen" v-model="caValue" @click=""></CADialog>
		<CommentDialog v-show="caValue.isCACommentOpen && !caValue.isCAOpen" v-model="caValue"></CommentDialog>
		<div v-show="contentIsOpen">
		    <Headerbtns :title="'电子投保单'">
		    </Headerbtns>
			<div class="manage-main-contents">
				<!-- 顶部图片 -->
				<!-- <div v-for="item in riskList">
					<img  v-if="item.isMaster == 1 && item.prodCode == 'LBT028'" src="../../../static/img/policy/icon_jiruibao.jpg" alt="" style="width:100%">
					<img  v-if="item.isMaster == 1 && item.prodCode == 'LBT029'" src="../../../static/img/policy/icon_top_cover_LBT029.jpg" alt="" style="width:100%">
					<img  v-if="item.isMaster == 1 && item.prodCode == 'LWT002'" src="../../../static/img/policy/icon_top_cover_LWT002.jpg" alt="" style="width:100%">
					<img  v-if="item.isMaster == 1 && item.prodCode == 'NPP014'" src="../../../static/img/policy/icon_top_cover_NPP014.jpg" alt="" style="width:100%">
					<img  v-if="item.isMaster == 1 && item.prodCode == 'NPP016'" src="../../../static/img/policy/icon_top_cover_NPP016.jpg" alt="" style="width:100%">
					<img  v-if="item.isMaster == 1 && item.prodCode == 'HDT037'" src="../../../static/img/common/HDT037_small.jpg" alt="" style="width:100%">
					<img  v-if="item.isMaster == 1 && item.prodCode == 'LBP017'" src="../../../static/img/common/LBP017_small.jpg" alt="" style="width:100%">
					<img  v-if="item.isMaster == 1 && item.prodCode == 'LBT024'" src="../../../static/img/common/LBT024_small.jpg" alt="" style="width:100%">
					<img  v-if="item.isMaster == 1 && item.prodCode == 'NPT011'" src="../../../static/img/common/NPT011_s.jpg" alt="" style="width:100%">
				</div> -->
				<!--投保人信息 start-->
				<div class="border-radius">
					<div class="appnt">
						<div class="applicant">
							<div class="applicantData">
								<p class="line-h">
									<i class="fa fa-user" aria-hidden="true"></i>
								</p>
								<div class="title">投保人身份信息:</div>
								<p class="line-h">
									<i @click="showContent(1)" id="btn_1" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div class="applicantUser" v-show="toggle.isAppIdInform">
							<div style="padding:0 5%;" class="inform-content">
								<div style="width:50%">
									<p class="user">姓名:&nbsp;{{policy.custInfo.appnt.appntName}}</p>
									<p class="user">婚姻:&nbsp;{{policy.custInfo.appnt.marriage|getMarriageText}}</p>
									<p class="user">证件类型:&nbsp;{{policy.custInfo.appnt.idType|getIdTypeText}}</p>
								</div>
								<div style="width:50%">
									<p class="user">国籍:&nbsp;{{policy.custInfo.appnt.nativePlace|getNationalText}}</p>
									<p class="user">性别:&nbsp;{{policy.custInfo.appnt.appntSex|getSexText}}</p>
									<p class="user">出生日期:&nbsp;{{policy.custInfo.appnt.appntBirthday}}</p>
								</div>
							</div>
							<div style="padding:0 5%;">
								<p>证件号码:{{policy.custInfo.appnt.idNo}}</p>
								<p class="user">证件有效期:&nbsp;{{policy.custInfo.appnt.idExpDate}}</p>
								<p class="user">年收入:&nbsp;{{policy.custInfo.appnt.salary}}万元</p>
							</div>
						</div>
					</div>
				</div>
				<div class="border-radius">
					<div class="appnt">
						<div class="applicant">
							<div class="applicantData">
								<p class="line-h">
									<i class="fa fa-envelope" aria-hidden="true"></i>
								</p>
								<div class="title">投保人联系方式:</div>
								<p class="line-h">
									<i @click="showContent(2)" id="btn_2" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div class="applicantUser" v-show="toggle.isAppContactInform">
							<div class="line">
								<p>联系地址:&nbsp;{{policy.custInfo.appnt.province|getProvinceText}}
									{{policy.custInfo.appnt.city|getCityText}}
									{{policy.custInfo.appnt.county}}
									{{policy.custInfo.appnt.street}}
									{{policy.custInfo.appnt.community}}
									{{policy.custInfo.appnt.postalAddress}}</p>
							</div>
							<div class="line">
								<p class="user">邮政编码:&nbsp;{{policy.custInfo.appnt.zipCode}}</p>
								<p class="user">联系电话:&nbsp;{{policy.custInfo.appnt.mobile}}</p>
								<p class="user"></p>
							</div>
							<div class="line">
								<p>电子邮箱:&nbsp;{{policy.custInfo.appnt.email}}</p>
							</div>
							<div class="line">
							</div>
						</div>
					</div>
				</div>
				<div class="border-radius">
					<div class="appnt">
						<div class="applicant">
							<div class="applicantData">
								<p class="line-h">
									<i class="fa fa-address-card" aria-hidden="true"></i>
								</p>
								<div class="title">投保人职业信息:</div>
								<p class="line-h">
									<i @click="showContent(3)" id="btn_3" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div class="applicantUser" v-show="toggle.isAppOccuInform">
							<div class="line">
								<p>职业类别:&nbsp;{{policy.custInfo.appnt.occupationType}}类</p>
							</div>
							<div class="line">
								<p>职业名称:&nbsp;{{policy.custInfo.appnt.appOccupation}}</p>
							</div>
							<div class="line">
								<p>工作单位:&nbsp;{{policy.custInfo.appnt.grpName}}</p>
							</div>
							<div class="line">
								<p>投保人税收居民身份:&nbsp;{{appntTaxInfo.taxIdentity|getResidentText}}</p>
							</div>
							<div class="line" v-if="appntTaxInfo.taxIdentity != 1">
								<p>出生地:&nbsp;国家&nbsp;{{appntTaxInfo.birthCountry|getNationalText}}&nbsp;省&nbsp;{{appntTaxInfo.birthProvince}}&nbsp;市&nbsp;{{appntTaxInfo.birthCity}}</p>
							</div>
							<div v-for="tmp of appntTaxInfo.taxInfoList.taxInfo" class="info">
								<div class="line">
									<p>税收居民国(地区):&nbsp;{{tmp.taxArea|getNationalText}}</p>
								</div>
								<div class="line">
									<p>居民国(地区)纳税人识别号TIN:&nbsp;{{tmp.tin}}</p>
								</div>
								<div class="line">
									<p>若无法提供纳税人识别号,请选择原因A或B:&nbsp;{{tmp.reasonCheck}}</p>
								</div>
								<div class="line">
									<p>原因:&nbsp;{{tmp.reasonMessage}}</p>
								</div>
							</div>
							<div class="line">
							</div>
						</div>
					</div>
				</div>
				<!--投保人信息 end-->
				<!--被保人信息 start-->
				<div class="border-radius">
					<div class="appnt">
						<div class="recognizee">
							<div class="recognizeeData">
								<p  class="line-h">
									<i class="fa fa-user" aria-hidden="true"></i>
								</p>
								<div class="title">被保人信息:</div>
								<p class="line-h">
									<i @click="showContent(4)" id="btn_4" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div  v-if="relToApp != '00'" v-show="toggle.isInsIdInform" class="recognizeeUser" v-for="tmp of recognizeeList">
							<div style="padding:0 5%;" class="inform-content">
								<div style="width:50%">
									<p class="user">姓名:&nbsp;{{tmp.name}}</p>
									<p class="user">婚姻:&nbsp;{{tmp.marriage}}</p>
									<p class="user">证件类型:&nbsp;{{tmp.idType|getCardText}}</p>	
								</div>
								<div style="width:50%">
									<p class="user">国籍:&nbsp;{{tmp.nativePlace}}</p>
									<p class="user">性别:&nbsp;{{tmp.sex == "1"? "男":""}}{{tmp.sex == "2"? "女":""}}</p>
									<p class="user">出生日期:&nbsp;{{tmp.birthday}}</p>
								</div>
							</div>
							<div style="width:100%;padding:0 5%;">
								<p class="user">证件有效期:&nbsp;{{tmp.idExpDate}}</p>
								<p class="user">证件号码:&nbsp;{{tmp.idNo}}</p>
								<p class="user">与投保人关系:&nbsp;{{tmp.relToApp}}</p>
								<p class="user">年收入:&nbsp;{{tmp.salary}}万元</p>
							</div>
						</div>
					</div>
				</div>
				<div class="border-radius">
					<div class="appnt">
						<div class="recognizee">
							<div class="recognizeeData">
								<p  class="line-h">
									<i class="fa fa-envelope" aria-hidden="true"></i>
								</p>
								<div class="title">被保险人联系方式:</div>
								<p class="line-h">
									<i @click="showContent(5)" id="btn_5" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div  v-if="relToApp != '00'" v-show="toggle.isInsContactInform" class="recognizeeUser" v-for="tmp of recognizeeList">
							<div class="line">
								<p>联系地址:&nbsp;{{tmp.province|getProvinceText}}{{tmp.city|getCityText}}{{tmp.county}}{{tmp.street}}{{tmp.community}}{{tmp.postalAddress}}</p>
							</div>
							<div class="line">
								<p class="user">邮政编码:&nbsp;{{tmp.zipCode}}</p>
								<p class="user">联系电话:&nbsp;{{tmp.mobile}}</p>
								<p class="user"></p>
							</div>
							<!-- <div class="line">
								<p>电子邮箱:&nbsp;{{applicant.email}}</p>
							</div> -->
							<div class="line">
							</div>
						</div>
					</div>
				</div>
				<div class="border-radius">
					<div class="appnt">
						<div class="recognizee">
							<div class="recognizeeData">
								<p  class="line-h">
									<i class="fa fa-address-card" aria-hidden="true"></i>
								</p>
								<div class="title">被保险人职业信息:</div>
								<p class="line-h">
									<i @click="showContent(6)" id="btn_6" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div  v-if="relToApp != '00'" v-show="toggle.isInsOccuInform" class="recognizeeUser" v-for="tmp of recognizeeList">
							<div class="info">
								<p>职业类别:&nbsp;{{tmp.occupationType}}类</p>
							</div>
							<div class="info">
								<p>职业名称:&nbsp;{{tmp.insOccupation}}</p>
							</div>
							<div class="info">
								<p>工作单位:&nbsp;{{tmp.grpName}}</p>
							</div>
							<div class="line">
							</div>
						</div>
					</div>
				</div>
				<!--被保人信息 end-->


				<!-- 身故受益人信息 start -->
				<div class="border-radius">
					<div class="appnt">
						<div class="deathFavoree">
							<div class="deathFavoreeData">
								<p  class="line-h">
									<i class="fa fa-user" aria-hidden="true"></i>
								</p>
								<div class="title">身故受益人:&nbsp;&nbsp;{{deathFav}}</div>
								<p class="line-h">
									<i @click="showContent(7)" id="btn_7" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="toggle.isBfcyIdInform" class="deathFavoreeUser" v-for="tmp of deathFavoreeList">
							<div class="info">{{tmp.belongWith=="0"?"豁免险被保险人受益人:"+ applicant.name  : "被保险人受益人:"+recognizeeList[0].name}}</div>
							<div class="line">
								<p class="user">姓名:&nbsp;{{tmp.bfcyName}}</p>
								<p class="user">性别:&nbsp;{{tmp.bfcySex == "1" ? "男" :"女"}}</p>
								<p class="user">出生日期:&nbsp;{{tmp.bfcyBirthday}}</p>
							</div>
							<div class="line">
								<p class="user">与被保人关系:&nbsp;{{tmp.relToIns|getRelationBef(tmp,tmp.relToIns)}}</p>
								<p class="user">受益顺序:&nbsp;{{tmp.bfcyLevel}}</p>
								<p class="user">受益比例:&nbsp;{{tmp.bfcyRatio}}</p>
							</div>
							<div class="line">
								<p class="user">证件类型:&nbsp;{{tmp.bfcyIdType}}</p>
								<p class="user">证件有效期:&nbsp;{{tmp.bfcyIdExpDate}}</p>
								<p class="user"></p>
							</div>
							<div class="line">
								<p>证件号码:&nbsp;{{tmp.bfcyIdCode}}</p>
							</div>
							<div class="line">
							</div>
						</div>
					</div>
				</div>
				<!-- 身故受益人信息 end -->
				<!-- 产品信息 start -->
				<div v-for="tmp of riskList">
					<div class="border-radius">
						<div class="appnt">
							<div class="recognizee">
								<div class="recognizeeData">
									<p class="tip" style="width:30px;text-align:center">{{tmp.isMaster == 1 ? "主":"附"}}</p>
									<div class="title">&nbsp;&nbsp;{{tmp.isMaster == 1 ? "主险" : "附加险"}}</div>
									<p class="line-h" v-if="tmp.isMaster == 1">
										<i @click="showContent(8)" id="btn_8" class="fa fa-angle-double-down" aria-hidden="true"></i>
									</p>
									<p class="line-h" v-if="tmp.isMaster != 1">
										<i @click="showContent(9)"id="btn_9" class="fa fa-angle-double-down" aria-hidden="true"></i>
									</p>
								</div>
							</div>
							<div v-show="tmp.isMaster == 1 && toggle.isProductInform" class="recognizeeUser">
								<div class="line">
									<p>险种名称:&nbsp;{{tmp.prodName}}</p>
								</div>
								<div class="line">
									<p class="user">保险期间:&nbsp;{{tmp.insureYearName}}</p>
									<p class="user">交费期间:&nbsp;{{tmp.payYearName}}</p>
									<p class="user"></p>
								</div>
								<div class="line">
									<p>交费频率:&nbsp;{{tmp.payIntvName}}</p>
								</div>
								<div class="line">
									<p>基本保险金额(元/份):&nbsp;{{tmp.amnt}}</p>
								</div>
								<div class="line">
									<p>保费(元):&nbsp;{{tmp.prem}}</p>
								</div>
								<div class="line">
								</div>
							</div>
							<div v-show="tmp.isMaster != 1 && toggle.isProduct2Inform" class="recognizeeUser">
								<div class="line">
									<p>险种名称:&nbsp;{{tmp.prodName}}</p>
								</div>
								<div class="line">
									<p class="user">保险期间:&nbsp;{{tmp.insureYearName}}</p>
									<p class="user">交费期间:&nbsp;{{tmp.payYearName}}</p>
									<p class="user"></p>
								</div>
								<div class="line">
									<p>交费频率:&nbsp;{{tmp.payIntvName}}</p>
								</div>
								<div class="line">
									<p>基本保险金额(元/份):&nbsp;{{tmp.amnt}}</p>
								</div>
								<div class="line">
									<p>保费(元):&nbsp;{{tmp.prem}}</p>
								</div>
								<div class="line">
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 产品信息 end -->
				<!-- 首期合计 start -->
				<div class="border-radius">
					<div class="appnt">
						<div class="applicant">
							<div class="applicantData">
								<p class="line-h">
									<i class="fa fa-user" aria-hidden="true"></i>
								</p>
								<div class="title">首期保费合计:&nbsp;{{sumPremL}}元</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 首期合计 end -->
				<!-- 其他信息 start -->
				<div class="border-radius">
					<div class="appnt">
						<div class="applicant">
							<div class="applicantData">
								<p class="tip" style="width:30px;;text-align:center">他</p>
								<div class="title">&nbsp;&nbsp;其他信息:</div>
								<p class="line-h">
									<i @click="showContent(10)" id="btn_10" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div class="applicantUser" v-show="toggle.isOtherInform">
							<div v-for="item in riskList">
								<div style="padding:0 5%;" class="inform-content" v-if="item.isMaster == 1">
									<div style="width:50%">
										<p class="user">自动续保:&nbsp;{{item.rnewFlag == '-1'?'是':(item.rnewFlag == '-2'?'否':'')}}</p>
										<p class="user">生存金领取方式:&nbsp;{{item.getYears=="single" ? "一次性领取" :  " "}}</p>
									</div>
									<div style="width:50%">
										<p class="user">逾期未付:&nbsp;{{item.autoPayFlag== "0" ? "合同终止" : "抵交保费"}}</p>
										<p class="user">分红领取方式:&nbsp;{{item.bonusGetMode|getDividendText}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 其他信息 end -->
				<!-- 银行自动转账授权 start -->
				<div class="border-radius">
					<div class="appnt">
						<div class="bankCard">
							<div class="bankCardData">
								<p  class="line-h">
									<i class="fa fa-credit-card" aria-hidden="true"></i>
								</p>
								<div class="title">&nbsp;银行自动转账授权:</div>
								<p class="line-h">
									<i @click="showContent(11)" id="btn_11" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="toggle.isAppBankInform" class="bankCardInfo">
							<div class="infoName">
								<p>账户姓名:&nbsp;{{bankInfo.bankAccName}}</p>
								<p>开户银行:&nbsp;{{bankInfo.bankCode}}</p>
							</div>
							<div class="info">
								<p>银行账号:&nbsp;{{bankInfo.bankAccNo}}</p>
							</div>
							<div class="infoText">
								<p>1.上述银行账号的账户所有人为投保人本人,账户信息真实可靠。账户所有人授权光大永明人寿保险有限公司(以下简称"本公司")和开户银行从该账户中以转账方式自动扣划投保人所应交纳的各期保险费，并同意本公司将应支付给投保人的各项款项划入该账户。</p>
							</div>
							<div class="infoText">
								<p>2.如因该账户信息错误,账户注销,账户余额不足或其他非本公司原因导致的转账扣费和支付不成功,由此所致投保人交费失败或本公司付费失败的任何责任由投保人本人承担。</p>
							</div>
							<div class="info">
							</div>
						</div>
					</div>
				</div>
				<!-- 银行自动转账授权 end -->
				<!-- 投保人保险单健康告知 start -->
				<div class="border-radius">
					<div class="appnt">
						<div class="health">
							<div class="healthData">
								<p  class="line-h">
									<i class="fa fa-list" aria-hidden="true"></i>
								</p>
								<div class="title">&nbsp;投保人保险单健康告知:</div>
								<p class="line-h">
									<i @click="showContent(12)" id="btn_12" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="toggle.isAppInform" class="healthInfo">
							<div class="info" style="margin:0" v-for="itm in resRemark1">
								<div class="inform_1">
									<p>{{itm.questionNo}}</p>
									<p>{{itm.desc}}</p>
									<p style="position: relative;"
									v-if="itm.code != 'A00001' && itm.code != '100000008'">
										<mt-switch disabled v-model="itm.swh" style="position: absolute;right: -5px;top: 0px;" @change="switchQuestion(itm)">
											<label style="line-height: 20px;position: absolute;right: 41px;bottom: 7px;font-size: 14px;color: #FFF;font-weight:bold;">{{itm.isBuild == "Y"?'是':''}}
											</label>
											<label style="line-height: 20px;position: absolute;right: 15px;bottom: 7px;font-size: 14px;font-weight:bold;color: #fff;">{{itm.isBuild == "N"?'否':''}}
											</label>
										</mt-switch>
									</p>
									<div class="self" v-show="!(itm.code!='A00001')">
										<span>投保人：身高：</span>
										<input type="text" readonly class="input_text" v-model="itm.height">厘米;
										<span>体重：</span>
										<input type="text" readonly class="input_text" v-model="itm.weight">公斤;
									</div>
									<div class="textarea" v-show="itm.swh" v-if="itm.code != 'A00001'">
										<textarea cols="40" rows="5" readonly  placeholder="若“是”，请注明投保险种、保险金额、承保时间及公司。" style="border:1px solid #C4C4C4;" v-model="itm.questionRemark">
										</textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 投保人保险单健康告知 end -->
				<!-- 被保人保险单健康告知 start -->
				<div class="border-radius">
					<div class="appnt">
						<div class="health">
							<div class="healthData">
								<p  class="line-h">
									<i class="fa fa-list" aria-hidden="true"></i>
								</p>
								<div class="title">&nbsp;被保险人保险单健康告知:</div>
								<p class="line-h">
									<i @click="showContent(13)" id="btn_13" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="toggle.isInsInform" class="healthInfo">
							<div class="info"  style="margin:0" v-for="itm in resRemark2">
								<div class="inform_1">
									<p>{{itm.questionNo}}</p>
									<p>{{itm.desc}}</p>
									<p style="position: relative;"
									v-if="itm.code != 'A00001' && itm.code != '100000008'">
										<mt-switch disabled v-model="itm.swh" style="position: absolute;right: -5px;top: 0px;" @change="switchQuestion(itm)">
											<label style="line-height: 20px;position: absolute;right: 41px;bottom: 7px;font-size: 14px;color: #FFF;font-weight:bold;">{{itm.isBuild == "Y"?'是':''}}
											</label>
											<label style="line-height: 20px;position: absolute;right: 15px;bottom: 7px;font-size: 14px;font-weight:bold;color: #fff;">{{itm.isBuild == "N"?'否':''}}
											</label>
										</mt-switch>
									</p>
									<div class="self" v-show="!(itm.code!='A00001')">
										<span>被保险人：身高：</span>
										<input type="text" readonly class="input_text" v-model="itm.height">厘米;
										<span>体重：</span>
										<input type="text" readonly class="input_text" v-model="itm.weight">公斤;
									</div>
									<div class="textarea" v-show="itm.swh" v-if="itm.code == 'A00013'">
										<span style="margin-left:-11%">{{"怀孕日期:"+fetationData}}</span>
									</div>
									<div class="textarea" v-show="itm.swh" v-if="itm.code != 'A00001'">
										<textarea cols="40" rows="5" readonly  placeholder="若“是”，请注明投保险种、保险金额、承保时间及公司。" style="border:1px solid #C4C4C4;" v-model="itm.questionRemark">
										</textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 被保人保险单健康告知 end -->
				<!-- 业务员信息 start -->
				<div class="border-radius">
					<div class="appnt">
						<div class="applicant">
							<div class="applicantData">
								<p class="line-h">
									<i class="fa fa-user" aria-hidden="true"></i>
								</p>
								<div class="title">&nbsp;业务人员/代理人机构信息</div>
								<p class="line-h">
									<i @click="showContent(14)" id="btn_14" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div class="applicantUser" v-show="toggle.isSaleInform">
							<div class="line">
								<p>代理机构名称:&nbsp;{{agent.managename}}</p>
							</div>
							<div class="line">
								<p>代理机构代码:&nbsp;{{agent.managecode}}</p>
							</div>
							<div class="line">
								<p class="user">业务员姓名:&nbsp;{{agent.name}}</p>
								<p class="user">业务员代码:&nbsp;{{agent.agentcode}}</p>
								<p class="user"></p>
							</div>
							<div class="line">
							</div>
						</div>
					</div>
				</div>
				<!-- 业务员信息 end -->
				<!-- 业务员报告书 start -->
				<div class="border-radius">
					<div class="appnt">
						<div class="accountReport">
							<div class="accountReportData">
								<p  class="line-h">
									<i class="fa fa-user" aria-hidden="true"></i>
								</p>
								<div class="title">业务人员报告书</div>
								<p class="line-h">
									<i @click="showContent(15)" id="btn_15" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="toggle.isSaleReport" class="accountReportInfo">
							<div class="info">
								<p>第一部分</p>
							</div>
							<div class="info">
								<p>1.本投保是经由下列途径完成:
									&nbsp;{{policyInfo.approach_1 == true ? "家属":""}}
									&nbsp;{{policyInfo.approach_2 == true ? "亲戚":""}}
									&nbsp;{{policyInfo.approach_3 == true ? "朋友介绍":""}}
									&nbsp;{{policyInfo.approach_4 == true ? "直接销售":""}}
									&nbsp;{{policyInfo.approach_5 == true ? "主动投保":""}}
									&nbsp;{{policyInfo.approach_6 == true ? "加保":""}}
									&nbsp;{{policyInfo.approach_7 == true ? policyInfo.approachDes:""}}
								</p>
							</div>
							<div class="info">
								<p>2.投保人的投保目的:(如未选择,默认为"保障"):
									&nbsp;{{policyInfo.purpose_1 == true ? "保障":""}}
									&nbsp;{{policyInfo.purpose_2 == true ? "储蓄":""}}
									&nbsp;{{policyInfo.purpose_3 == true ? "教育金":""}}
									&nbsp;{{policyInfo.purpose_4 == true ? "投资":""}}
									&nbsp;{{policyInfo.purpose_5 == true ? policyInfo.purposeDes:""}}
								</p>
							</div>
							<div class="info">
								<p>3.投保人的经济状况:</p>
							</div>
							<div class="info">
								<p>年收入:(人民币){{policyInfo.annualIncome}}万元</p>
							</div>
							<div class="info">
								<p>来源:{{policyInfo.sourceOfIncome}}</p>
							</div>
							<div class="info">
								<p>总资产约:{{policyInfo.totalAssets}}万元</p>
							</div>
							<div class="info">
								<p>第二部分:</p>
							</div>
							<div class="info">
								<p>投保人的投保行为是否受"除投保人、被保险人、受益人以外的人员或机构(即第三方)"的要求或是由其提供资金而发生的:
									&nbsp;{{policyInfo.thirdPtIdentity_1 == true ? "是":""}}
									&nbsp;{{policyInfo.thirdPtIdentity_2 == true ? "否":""}}
									&nbsp;{{policyInfo.thirdPtIdentity_3 == true ? "无法识别":""}}
								</p>
							</div>
							<div class="info">
								<p>1.若"是",请填写以下有关第三方的信息:</p>
							</div>
							<div class="info">
								<p>姓名/机构名称:{{policyInfo.thirdPtName}}</p>
							</div>
							<div class="info">
								<p>联系方式:{{policyInfo.thirdPtContact}}</p>
							</div>
							<div class="info">
								<p>与投保人关系:{{policyInfo.thirdPtRelToApp}}</p>
							</div>
							<div class="info">
								<p>地址:{{policyInfo.thirdPtAddr}}</p>
							</div>
							<div class="info">
								<p>2.若"无法识别,但有理由怀疑存在第三方"请注明怀疑原因</p>
							</div>
							<div class="info">
								<p>怀疑原因:{{policyInfo.thirdPtRemark}}</p>
							</div>
							<div class="info">
							</div>
						</div>
					</div>
				</div>
				<!-- 业务员报告书 end -->
				<!-- 投保须知 -->
				<!-- <div class="border-radius">
					<div class="appnt">
						<div class="notice">
							<div class="noticeData">
								<p  class="line-h">
									<i class="fa fa-list" aria-hidden="true"></i>
								</p>
								<div class="title">&nbsp;投保须知:</div>
								<p class="line-h">
									<i @click="showData(7)" id="btn7" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="dataShow.dataShow7" v-model="dataShow.dataShow7" class="noticeInfo">
							<div class="info">
								<p>为切实保障您的各项权益,请在填写投保书前仔细阅读以下须知</p>
							</div>
							<div class="infoText">
								<p>1.您的权益:您有权要求保险代理人出示有效工作证件及身份证,您有权要求保险代理人提供保险条款。为详知您所投保的保险内容,建议您先行浏览所投保的保险条款,特别提示您应注意"免除保险人责任条款"和"犹豫期与合同解除权条款"。</p>
							</div>
							<div class="infoText">
								<p>2.您的义务:对我公司在投保书中所询问的事项,您和被保险人应在投保书中向我们如实告知。您和被保险人的任何隐瞒和遗漏,均有可能影响到我公司的承保决定.一经发现,我公司可以依法解除保险合同,对保险合同解除前发生的保险事故不承担保险责任。</p>
							</div>
							<div class="infoText">
								<p>3.填写要求：请您亲笔填写投保书，并请您和被保险人在投保书上亲笔签字，严禁代签字行为。投保书应由投保人用蓝黑色、黑色墨水的钢笔或签字笔亲自填写，字迹清晰，不应有涂改。在投保人，被保险人/法定监护人签名栏应分别由投保人、被保险人或被保险人的法定监护人本人亲笔签名。</p>
							</div>
							<div class="infoText">
								<p>4.交费须知:我公司已全面实行委托银行划转保险费，保险代理人、保险代理机构以及保险兼业代理机构均无权要求您以现金方式交付保险费用。我司自收到资料之日起开始划转保险费。</p>
							</div>
							<div class="infoText">
								<p>5.您的信息:为维护您的权益，您应真实、完整的填写客户信息栏。如您不提供真实、完整客户信息可能带来的后果将自行承担。如果您的邮寄地址、电话等个人信息发生变化，应及时联系本公司办理变更。客户年龄、邮寄地址和电话等信息的采集，其用途包括但不限于计算保费、核保、寄送保单和客户回访等。</p>
							</div>
							<div class="infoText">
								<p>6.未成年人保险金:如果被保险人是未成年人，其死亡给付保险金额的总和不能超过保险监督管理机构规定的当地最高限额。</p>
							</div>
							<div class="infoText">
								<p>7.正式保险合同生效日:您提交本投保书、交付保险费的行为均为您的投保申请，如果经过我公司审核通过，我公司将签发保险单作为承保凭证，并自保险单上载明的生效日起开始承担保险责任，保险单周年日以该日期为基础计算。</p>
							</div>
							<div class="infoText">
								<p>8.公司声明:保险代理人及其他人的与本投保书或保险合同条款内容不符的说明或承若均无效。任何告知事项均应由您和被保险人完整无误的填写在投保书中，我公司及代理人不接受您和被保险人的任何口头告知事项，所有告知事项均已投保书中的填写为准。</p>
							</div>
							<div class="infoText">
								<p>9.公司承若:我公司将严格保障您个人信息资料的安全性，在未经您同意的情况下，不会将您的信息用于任何第三方机构的销售活动。</p>
							</div>
						</div>
					</div>
				</div> -->
				<!-- 投保人、被保险人/法定监护人声明 -->
				<!-- <div class="border-radius">
					<div class="appnt">
						<div class="statement">
							<div class="statementData">
								<p  class="line-h">
									<i class="fa fa-list" aria-hidden="true"></i>
								</p>
								<div class="title">&nbsp;投保人、被保险人/法定监护人声明:</div>
								<p class="line-h">
									<i @click="showData(8)" id="btn8" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="dataShow.dataShow8" v-model="dataShow.dataShow8" class="statementInfo">
							<div class="infoText">
								<p>1.贵公司及其业务人员已向本人提供所投保产品条款，并对产品条款，尤其是对免除责任条款、合同解除条款进行了详细解释和明确说明。本人在投保前已认真阅读并理解所投保产品的条款、产品说明书、投保提示、投保须知，本人无异议并同意遵守。</p>
							</div>
							<div class="infoText">
								<p>2.本投保书、与投保书有关的各份问卷、体检报告书及对体检医生的各项声明与陈述均确实无误。若不属实，贵公司有权依法解除保险合同，并对解除合同前所发生的保险事故均不承担保险责任。本人未授权保险代理人及其他任何人在任何情况下，对本人的书面告知及声明进行修改。所有告知事项以书面为准，口头告知无效。</p>
							</div>
							<div class="infoText">
								<p>3.本人已明悉:临时保险单的生效条件、保险责任、责任免除、合同解除权和保险金额限制等内容。贵公司应负的保险责任自贵公司签发的正式保险合同上所载明的日期开始。</p>
							</div>
							<div class="infoText">
								<p>4.本人已明悉:在被保险人成年之前，其死亡给付保险金额的总和不能超过保险监督管理机构规定的最高限额。</p>
							</div>
							<div class="infoText">
								<p>5.本人授权贵公司可以从任何单位、组织和个人就有关保险事宜查询、索取与投保人/被保险人有关的资料和证明，同时可将资料或证明提供给相关单位。</p>
							</div>
							<div class="infoText">
								<p>6.本人接受贵公司认可的医疗机构，如果被保险人因疾病或意外住院，愿到贵公司认可的医疗机构就诊（抢救、急救除外），否则贵公司可不承担任何保险金给付责任。</p>
							</div>
							<div class="infoText">
								<p>7.本人已认可贵公司从投保人账户划转需交纳的各期保险费，并将应支付给投保人的款项划入该账户。如因账户问题导致转账扣款或付费失败造成损失由本人承担。</p>
							</div>
							<div class="infoText">
								<p>8.本人已明悉:保险合同有关资料（如联系方式、银行账户等）发生变化时，本人有义务及时通知贵公司，否则造成的损失由本人承担。</p>
							</div>
							<div class="infoText">
								<p>9.本人已明悉:选择了自动续保情况下，按合同条款中自动续保所需满足的条件，如贵公司审核后同意续保，收取保险费后保险合同持续有效;如贵公司审核后不同意续保，不再收取保险费，保险合同满期终止。如本人决定终止自动续保，应向贵公司申请。</p>
							</div>
							<div class="infoText">
								<p>10.本人已明悉:选择了保险费自动垫交，在宽限期结束时若仍未交纳续期保险费，贵公司将以保险合同的现金价值净值自动垫交保险合同及附加合同的续期保险费，保险合同继续有效，若现金价值净值不足以垫交全部到期保险费，则按当时本合同现金价值净值折算可垫交的天数，自动垫交部分续期保险费。当现金价值净值为零时，本合同效力中止;如果您选择了合同中止,在宽限期结束时若您仍未交纳续期保险费,本合同效力中止。</p>
							</div>
							<div class="infoText">
								<p>11.分红保险的分红利益、万能保险保证利益之上的收益与投资连接保险投资账户收益并不确定，请您详阅投保提示书第六条。按法规要求，请投保人用正楷亲笔抄写：“本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性”。</p>
							</div>
							<div class="infoSign1">
								<p>投保人签名:</p>
								<p>
									<!-- <button>签名</button>
								</p>
							</div>
							<!-- <div class="infoSign1Area">
								<p class="signImg">
									<img id="xss_20" src="">
								</p>
							</div> 
							<div class="infoSign2">
								<p>被保险人/法定监护人签名:</p>
								<p>
									<!-- <button>签名</button> 
								</p>
							</div>
							<!-- <div class="infoSign1Area">
								<p class="signImg">
									<img id="xss_21" src="">
								</p>
							</div> 
							<div class="info">
								<p>投保申请日期:</p>
							</div>
						</div>
					</div>
				</div> -->
				<!-- 保险业务人员声明 -->
				<div  style="margin-bottom:20%;" class="border-radius">
					<div class="appnt">
							<div class="insureAccount" >
							<div class="insureAccountData">
								<p>
									<i class="fa fa-list" aria-hidden="true"></i>
								</p>
								<div class="title">保险业务人员声明:</div>
								<p>
									<i @click="showData(11)" id="btn11" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="dataShow.dataShow11" v-model="dataShow.dataShow11" class="insureAccountInfo">
							<div class="info">
								<p>本人确已面晤投保人、被保险人，对其所投保险种的条款、费率，尤其是产品说明书、投资账户收取的各项费用（投资连结保险、分红保险、万能型保险适用）、责任免除事项、合同解除权等规定及临时保险单的各项内容均已据实向投保人说明，并见证由投保人、被保险人或被保险人的法定监护人亲自在投保书上签名。除投保书中所填写内容外，投保人及被保险人没有向本人口头或以其他方式告知任何其他事项。如有不是见证或讲解，本人愿负法律责任。</p>
							</div>
							<div class="infoSign1">
								<p>直属代理人/经纪代理人签名:</p>
							</div>
							<div class="info"  v-show="isProdCode">
								<p>风险提示语抄录</p>
							</div>
							<div class="infoSign1Area" v-show="isProdCode">
								<p class="signImg" @click="opensCA(30)">
									<img style="width:100%;height:100%;" id="xss_30" :src="
									wrting">
								</p>
							</div>
							<div class="infoSign2">
								<p>业务人员签字</p>
								<p v-show="isApp == 24">投保人签字</p>
								<p v-show="isApp == 25">被保险人签字<br>(法定监护人)</p>
							</div>
							<div class="infoSign3" style="height:80px">
								<a style="display:block;height: 70px;width:30%;background: #E1DCD4;">
									<img style="width:100%;height:100%;" id="xss_23" :src="wrting">
								</a>
								<a v-show="isApp == 24" :href="href.sign24" style="display:block;height: 70px;width:30%;background: #E1DCD4;">
									<img style="width:100%;height:100%;" id="xss_24" :src="wrting">
								</a>
								<a v-show="isApp == 25" :href="href.sign25" style="display:block;height: 70px;width:30%;background: #E1DCD4;">
									<img style="width:100%;height:100%;" id="xss_25" :src="wrting">
								</a>
							</div>
							<div class="infoBox">
								<p>
									<input type="checkbox" v-model="readStatus">
								</p>
								<p>
									<span>投保人已阅读并确认</span>
									<span>
										<b class="specialDef" v-if="tmp.isRead" style="color:#78C543" v-for="tmp of definesLists" @click="jumpToTeShuDanZheng(tmp.fileName)">{{"《"+tmp.name+"》"}}</b>
										<b class="specialDef" v-if="!tmp.isRead" style="color:#FFA600" v-for="tmp of definesLists" @click="jumpToTeShuDanZheng(tmp.fileName)">{{"《"+tmp.name+"》"}}</b>	
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<alert ref="alert"></alert>
			<Footerbtns :is_show=false :disabled="true" total_premium="10000.00">
				<button class="btnFoote" slot="center" @click="push">
					确定
				</button>
			</Footerbtns>
		</div>
	</div>
</template>

<!--js-->
<script>
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import Footerbtns from '../policy/common/Footer.vue'
	import CADialog from '../common/CADialog.vue'
	import CommentDialog from '../common/CommentDialog.vue'
	import alert from '../policy/common/alert.vue'
	import Home from '../common/ca_sign.vue'
	import cardTypeList from '../../assets/dict/card_type_sunlife.json'
	import nationalList from '../../assets/dict/national_sunlife.json'
	import marriageList from '../../../static/dict/marriage_sunlife.json'
	import residentList from '../../../static/dict/resident_sunlife.json'
	import bankList from '../../../static/dict/bank_sunlife.json'
	import relationList from '../../../static/dict/relation_benefit.json'
	import benefitList from '../../../static/dict/relation_benefit.json'
	import cityList from '../../../static/dict/city_sunlife.json'
	import provinceList from '../../../static/dict/province_sunlife.json'
	import list_defineList from '../../../static/dict/list_defineT.json'
	import dividendList from '../../../static/dict/dividend_sunlife.json'

	export default{
		name:'electronics_policy_share_page',
  		components: {Headerbtns,Footerbtns,CADialog,Home,CommentDialog,alert},
		data () {
		    return {
				resRemark2:"",
				resRemark1:"",
				fetationData:"",//健康告知中13项怀孕日期
				readStatus:false,//阅读按钮状态
				sumPremL:"",//首期保险费合计
				appntTaxInfo:{
					taxInfoList:{
						taxInfo:[]
					}
				},
				toggle:{
					isAppIdInform:true,
					isAppContactInform:true,
					isAppOccuInform:true,
					isInsIdInform:true,
					isInsContactInform:true,
					isInsOccuInform:true,
					isBfcyIdInform:true,
					isProductInform:true,
					isProduct2Inform:true,
					isAppBankInform:true,
					isSaleReport:true,
					isAppInform:true,
					isInsInform:true,
					isSaleInform:true,
					isOtherInform:true,
				},
				isApp:this.$route.params.index,
				href:{
					sign23:"http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ==",
					sign24:"http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ==",
					sign25:"http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ=="
				},
				current_total_premium: '10000.00',
				wrting:'data:image/jpeg;base64,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',
		    	//签字信息
		    	signImgs:{
			    	"applicant_signt": "",//投保人签字
			    	"insure_signt": "",//被保险人签字
			    	"agent_signt": "",//代理人签字
			    	"checker_signt": "",
			    	"cecintent_signt": "",
			    	"counter_signt":""
		    	},
		    	//健康告知
		    	dict:{
		    		informList:[],
		    	},
		    	policy:{
					agent:{},
					custInfo:{
						appnt:{}
					},
					
		    	},
		    	temp:{
		    		insured:{}
		    	},
				name:"",
		    	dataShow:{
		    		dataShow1:true,
		    		dataShow2:true,
		    		dataShow3:true,
		    		dataShow4:true,
		    		dataShow5:true,
		    		dataShow6:true,
		    		dataShow7:false,
		    		dataShow8:false,
		    		dataShow9:true,
		    		dataShow10:true,
		    		dataShow11:true
		    	},
		    	riskShow:false,
		       	caValue:{
			      	isCAOpen:false,
			      	isCACommentOpen:false,
			      	image:""
		      	},
		      	//投保人信息
		      	applicant:{
		      		name:'',
		      		gender:'',
		      		birth:'',
		      		country:'',
		      		idType:'',
		      		idTime:'',
		      		idNumber:'',
		      		marriage:'',
		      		mobileTel:'',
		      		phone:'',
		      		homePhoneCode:'',
		      		email:'',
		      		area:'',
		      		province:'',
		      		city:'',
		      		county:'',
		      		emsCode:'',
		      		workArea:'',
		      		workTel:'',
		      		companyPhoneCode:'',
		      		profession:'',
		      		professionType:'',
		      		professionNum:'',
		      		yearIncome:'',
		      		taxIdentity:'',
		      		taxArea:'',
		      		tin:'',
		      		reasonCheck:'',
		      		reasonMessage:''
		      	},
		      	//被保人信息
		      	relToApp:'',//与被保险人关系
		      	recognizeeList:[
		      		{
			      		name:'',
			      		relation:'',
			      		sex:'',
			      		birthday:'',
			      		nativePlace:'',
			      		idType:'',
			      		idExpDate:'',
			      		idNo:'',
			      		marriage:'',
			      		mobile:'',
			      		homePhone:'',
			      		postalAddress:'',
			      		zipCode:'',
			      		companyAddress:'',
			      		companyPhone:'',
			      		insOccupation:'',
			      		occupationType:'',
			      		occupationCode:'',
			      		salary:''
		      		}
		      	],
		      	//身故受益人
		      	deathFav:"",
		      	deathFavoreeList:[
		      		{
		      			name:'',
		      			sex:'',
		      			birthday:'',
		      			nativePlace:'',
		      			idType:'',
		      			idExpDate:'',
		      			idNo:'',
		      			marriage:'',
		      			mobile:'',
		      			homePhone:'',
		      			postalAddress:'',
		      			zipCode:'',
		      			companyAddress:'',
		      			companyPhone:'',
		      			insOccupation:'',
		      			occupationType:'',
		      			occupationCode:'',
		      			salary:''
		      		}
		      	],
		      	//险种信息
		      	riskList:[
		      		{
		      			prodName:'',
		      			insureYear:'',
		      			payYear:''	,
		      			amnt:'',
		      			prem:'',
		      			firstPrem:'',
		      			payIntv:'',
		      			rnewFlag:'',
		      			liveGetMode:'',
		      			autoPayFlag:'',

		      			minPlanPrem :'',
		      			planSumPremL :'',
		      			invAccTimeOption:'',
		      			insuAccNo:'',
		      			investRate:''
		      		},
		      	],
				//银行自动转账授权
				bankInfo:{
					//投保人银行信息
					bankAccName:'',
					bankAccNo:'',
					bankCode:''
					//被保人银行信息没返回
				},
				/*代理人信息*/
				agent:{
					name:'',
					agentCode:'',
					agentCom:'',
					agentComCode:''
				},
				/*业务员姓名*/
				counterman:{
					bank:'',//银行代理
					countermanName:'',//代理机构名称
					countermanNameCode:'',//柜员姓名和代码
					countermanCode:'',//代理机构代码
					name:'',//业务员姓名
					code:'',//业务员代码
					idNumber:''
				},
				resRemark:'',//告知书
				policyInfo:{
				  approach : "",//途径
				  approach_1:false,
				  approach_2:false,
				  approach_3:false,
				  approach_4:false,
				  approach_5:false,
				  approach_6:false,
				  approach_7:false,
				  approachDes : "",//其他途径
				  purpose : "",//目的
				  purpose_1:false,
				  purpose_2:false,
				  purpose_3:false,
				  purpose_4:false,
				  purpose_5:false,
				  purposeDes : "",//其他目的
				  annualIncome : "", //年收入
				  conduit : "", //银保综金区别
				  sourceOfIncome : "", //来源
				  thirdPtAddr : "", //联系地址
				  thirdPtContact : "", //联系方式
				  thirdPtIdentity : "",//第二部分是,否,无法识别
				  thirdPtIdentity_1:false,
				  thirdPtIdentity_2:false,
				  thirdPtIdentity_3:false,
				  thirdPtName : "", //机构名称
				  thirdPtRelToApp : "", //其他关系
				  thirdPtRemark : "", //怀疑原因
				  totalAssets : "" //总资产
				},
				saveName:[],//特殊单证传服务端
				definesLists:[],//特殊单证数组
				listDefine:"",//特殊单证
				defineList:{ //特殊单证
					"specialBookCode":"",
					"typeArea":"",
					"typeProduct":"",
					"minShowAge":"",
					"insureMinShowAge":"",
					"showChannel":"",
					"firstIsNotB":"",
					 "counterMustShow":"",//银保时的柜员必须显示
					"productCode":"",
					"minPremium":"",
					"timeLimit":"",
					"buyMyself":""
				},
				prodCode:"",//产品code
				isProdCode:"",
				policyResult:"",
	    	}
	  	},
	  	//CA签字
		beforeMount:function(){
	  	    //初始化CA签字
	  	    initAnySign('999999');
	  	    //添加签字对象
	  	    var res1 = addSignatureObj(26,'张张','1407241994');
    		if(!res1) {
    			this.showMsg("addSignatureObj error");
    		}
	  	    var res2 = addSignatureObj(21,'张张','1407241994');
    		if(!res2) {
    			this.showMsg("addSignatureObj error");
    		}
	  	    var res3 = addSignatureObj(22,'张张','1407241994');
    		if(!res3) {
    			this.showMsg("addSignatureObj error");
    		}
	  	    var res4 = addSignatureObj(23,'张张','1407241994');
    		if(!res4) {
    			this.showMsg("addSignatureObj error");
    		}
	  	    var res5 = addSignatureObj(24,'张张','1407241994');
    		if(!res5) {
    			this.showMsg("addSignatureObj error");
    		}
	  	    var res6 = addSignatureObj(25,'张张','1407241994');
    		if(!res6) {
    			this.showMsg("addSignatureObj error");
    		}
	  	    var res7 = addCommentObj(30,'李四','1207241994');
	  	    if(!res7) {
	  	    	this.showMsg("addCommentObj error");
	  	    }
    		//CA签字提交配置
    		commitConfig()
	  	  	if(this.bankImage!=undefined && this.bankImage.positive!=undefined){
	  			var positive = document.getElementById('bankPositive');
	  			// var positive = $(".img1")
				positive.style.display = 'inline-block';
				positive.src = "data:image/jpeg;base64," + this.bankImage.positive
	  	  	}
	  	  	if(this.bankImage!=undefined && this.bankImage.negative!=undefined){
	  			var negative = document.getElementById('bankNegative');
				negative.style.display = 'inline-block';
				negative.src = "data:image/jpeg;base64," + this.bankImage.negative;
	  	  	}
		},
		computed:{
		  	caInfo(){
		  		console.log("检测变化==>",this.caValue)
		  		return this.caValue.image
		  	},
		  	contentIsOpen(){
		  		console.log(this.caValue.isCAOpen)
		  		console.log(this.caValue.isCACommentOpen)
		        if(this.caValue.isCAOpen || this.caValue.isCACommentOpen){
		          return false
		        }else{
		          return true
		        }
      		},
		},
	  	watch:{
	  	  	caInfo(val, oldval){
	  	  		if(val != undefined){
					this.imageUpload(val.context_id,val.value)
	  	  		}
	  	  	},
	  	  	readStatus:function(){
	  	  		if(this.readStatus==false){
	  	  			utils.cache.removeItem("readStatus")	
	  	  		}
	  	  	}
	  	},
	  	mounted(){
	  		//请求保单数据并赋值
	    	let requ = {
	    		"policy": {
                    "substepNo": "",
                    "orderCode": this.$route.params.planId,
                }
	  		}
	  		utils.http.post('MOHQPOLICYMSG',requ).then(response => {
				let result = response.data.response
				this.policy = result.policy
				this.policyResult= result.policy
				this.appntTaxInfo = result.policy.custInfo.appnt.appntTaxInfo
				console.log("检查税收居民身份问题",this.appntTaxInfo)
				this.counterman.name = result.policy.agentInfo.name
	  			this.counterman.idNumber = result.policy.agentInfo.idno
				// console.log("数据返回",result);
				this.relToApp = result.policy.custInfo.insurants.insurant[0].relToApp
				this.tempPolicy = result.policy
				this.applyCode=result.policy.applyCode
				// 3.险种信息
				let productInfoPolicy = []
				let extra=[]
				let policy=[]
				productInfoPolicy =response.data.response.policy.productInfo.products.product
				for(let i in productInfoPolicy){
					if(productInfoPolicy[i].isMaster == "1" && productInfoPolicy[i].isMaster != ""){
						policy.push(productInfoPolicy[i])
					}else{
						extra.push(productInfoPolicy[i])
					}
				}
				this.riskList = policy.concat(extra)
				this.sumPremL=response.data.response.policy.productInfo.sumPremL
				//4.银行自动转账授权
				//投保人银行信息
				let productInfo=response.data.response.policy.productInfo;
				this.bankInfo.bankAccName=productInfo.bankAccName;
				this.bankInfo.bankAccNo=productInfo.bankAccNo;
				this.bankInfo.bankCode=this.getBankList(productInfo.bankCode);
				this.resRemark = response.data.response.policy.question.resQuestion.resRemark
				//取被保人怀孕日期
				this.fetationData = response.data.response.policy.question.resQuestion.fetationDate
				for(let i in this.resRemark){
					this.resRemark[i].swh = (this.resRemark[i].swh == "false")?false:true
				}
				this.resRemark.sort((a,b) => {
					const codeA = parseInt(a.questionNo)
					const codeB = parseInt(b.questionNo)
					return codeA - codeB
				})
				let appntInfrom = []
				let insureInfrom = []
				//健康告知分为投保人被保人
				for(var i=0;i<this.resRemark.length;i++){
					let item = this.resRemark[i]
					if(item.resCustCode == "0"){//投保人告知
						appntInfrom.push(item)
					}else if(item.resCustCode == "1"){//被保人告知
						insureInfrom.push(item)
					}
				}
				//告知
			  	var compare = function (obj1, obj2) {
					if(obj1.code == "100000008"){
						obj1.code = "A00011"
					}
					if(obj2.code == "100000008"){
						obj2.code = "A00011"
					}
				    var val1 = obj1.code;
				    var val2 = obj2.code;
				    if (val1 < val2) {
				        return -1;
				    } else if (val1 > val2) {
				        return 1;
				    } else {
				        return 0;
				    }
				}
				let appntInfrom2 = appntInfrom.sort(compare)
				for(var i=0;i<appntInfrom2.length;i++){
					if(appntInfrom2[i].code == "A00011"){
						appntInfrom2[i].code = "100000008"
					}
				}
				this.resRemark1=appntInfrom2
				let insureInfrom2 = insureInfrom.sort(compare)
				for(var i=0;i<insureInfrom2.length;i++){
					if(insureInfrom2[i].code == "A00011"){
						insureInfrom2[i].code = "100000008"
					}
				}
				this.resRemark2=insureInfrom2
				/*5.业务员信息*/
				let _policyInfo = response.data.response.policy.policyInfo
				console.log('.....................业务员信息',_policyInfo)
				let arr = _policyInfo.approach.split(",")
				for(let i = 0;i<arr.length;i++){
                if(arr[i] == 0){
					this.policyInfo.approach_1 = true
				  }
				if(arr[i] == 1){
					this.policyInfo.approach_2 = true
				}
				if(arr[i] == 2){
					this.policyInfo.approach_3 = true
				}
				if(arr[i] == 3){
					this.policyInfo.approach_4 = true
				}
				if(arr[i] == 4){
					this.policyInfo.approach_5 = true
				}
				if(arr[i] == 5){
					this.policyInfo.approach_6 = true
				}
				if(arr[i] == 6){
					this.policyInfo.approach_7 = true
					this.policyInfo.approachDes=_policyInfo.approachDes
				}
				}
				let arr2 = _policyInfo.purpose.split(",")
				for(let i =0;i<arr2.length;i++){
                 if( arr2[i]== 0){
					this.policyInfo.purpose_1 = true
				 }
				if(arr2[i] == 1){
					this.policyInfo.purpose_2 = true
				}
				if(arr2[i] == 2){
					this.policyInfo.purpose_3 = true
				}
				if(arr2[i] == 3){
					this.policyInfo.purpose_4 = true
				}
				if(arr2[i] == 4){
				 	this.policyInfo.purpose_5 = true
				 	this.policyInfo.purposeDes=_policyInfo.purposeDes
				 }
				}				
				this.policyInfo.annualIncome = _policyInfo.annualIncome
				this.policyInfo.sourceOfIncome = _policyInfo.sourceOfIncome
				this.policyInfo.totalAssets = _policyInfo.totalAssets
				if(_policyInfo.thirdPtIdentity == "1"){
					this.policyInfo.thirdPtIdentity_1 = true
				}
				if(_policyInfo.thirdPtIdentity == "0"){
					this.policyInfo.thirdPtIdentity_2 = true
				}
				if(_policyInfo.thirdPtIdentity == "2"){
					this.policyInfo.thirdPtIdentity_3 = true
				}
				this.policyInfo.thirdPtName = _policyInfo.thirdPtName
				this.policyInfo.thirdPtContact = _policyInfo.thirdPtContact
				this.policyInfo.thirdPtRelToApp = _policyInfo.thirdPtRelToApp
				this.policyInfo.thirdPtAddr = _policyInfo.thirdPtAddr
				this.policyInfo.thirdPtRemark = _policyInfo.thirdPtRemark
				//1-1.投保人基本信息
				let applicant=response.data.response.policy.custInfo.appnt;

				// console.log(applicant);
				//投保人姓名
				this.applicant.name=applicant.appntName;
				//投保人性别
				this.applicant.gender=applicant.appntSex;
				if(this.applicant.gender=="1"){
					this.applicant.gender="男";
				}else if(this.applicant.gender=="2"){
					this.applicant.gender="女";
				}
				//投保人出生日期
				this.applicant.birth=applicant.appntBirthday;
				//投保人国籍
				this.applicant.country=this.getNationalItem(applicant.nativePlace);
				//投保人证件类型
				this.applicant.idType=this.getCardItem(applicant.idType);
				//投保人证件有效期
				this.applicant.idTime=applicant.idExpDate;
				//投保人证件号码
				this.applicant.idNumber=applicant.idNo
				//投保人婚姻状况
				this.applicant.marriage=this.getMarriage(applicant.marriage)
				//投保人移动电话
				this.applicant.mobileTel=applicant.mobile
				//投保人家庭电话区号
				this.applicant.homePhoneCode=applicant.homePhoneCode
				//投保人家庭号码
				this.applicant.phone=applicant.homePhone
				//家庭区号
				this.applicant.phoneCode=applicant.homePhoneCode
				//投保人电子邮箱
				this.applicant.email=applicant.email
				//投保人所在省
				this.applicant.province=this.getProvince(applicant.province)
				//投保人所在市区
				this.applicant.city=this.getCity(applicant.city)
				//所在县
				this.applicant.county=applicant.county
				//所在镇
				this.applicant.street=applicant.street
				//所在
				this.applicant.community=applicant.community
				//投保人邮政编码
				this.applicant.emsCode=applicant.zipCode
				//投保人工作地址
				this.applicant.workArea=applicant.grpName
				//投保人单位电话区号
				this.applicant.companyPhoneCode=applicant.companyPhoneCode
				//投保人单位电话
				this.applicant.workTel=applicant.companyPhone
				this.applicant.workTelCode=applicant.companyPhoneCode
				//投保人职业companyPhoneCode
				this.applicant.profession=applicant.appOccupation
				//投保人职业类别
				this.applicant.professionType=applicant.occupationType
				//投保人职业编号
				this.applicant.professionNum=applicant.occupationCode
				//投保人年收入
				this.applicant.yearIncome=applicant.salary
				// 2.被保人基本信息
				this.recognizeeList=response.data.response.policy.custInfo.insurants.insurant
				this.recognizeeList.map((item,index)=>{
					this.name = item.name
					item.relToApp = this.getRelation(item,item.relToApp)
					//被保人国籍
					item.nativePlace=this.getNationalItem(item.nativePlace)
					//被保人证件类型
					// item.idType=this.getCardItem(item.idType)
					//被保人婚姻状况
					 item.marriage=this.getMarriage(item.marriage)
				 })

				// 被保人银行信息(没有返回被保人的银行信息)
				// 3.身故受益人基本信息
				this.deathFavoreeList=response.data.response.policy.custInfo.bnfInfo.beneficiaries.beneficiary;
				// alert(1111111);
				let fav=response.data.response.policy.custInfo.bnfInfo.bnfType
				if(fav==0){
					this.deathFav="法定"
					this.dataShow.dataShow3=false;
				}else{
					this.deathFav="指定"
					this.dataShow.dataShow3=true;
				}
				var compare = function (obj1, obj2) {
	                var val1 = obj1.bfcyLevelNum;
	                var val2 = obj2.bfcyLevelNum;  
	                return val1-val2    
              } 
              this.deathFavoreeList.sort(compare)
				this.deathFavoreeList.map((item,index)=>{
                      item.bfcyIdType=this.getCardItem(item.bfcyIdType)
				})
				this.deathFavoreeList.map((item)=>{
                      item.relToIns=this.getBenefit(item,item.relToIns)
				})
				//告知
	      		let productsArr = response.data.response.policy.productInfo.products.product
	          	for (var i = 0; i < productsArr.length; i++) {
	            	if(productsArr[i].isMaster == '1'){
	              	this.page_title = productsArr[i].prodName
	            	}
	          	}
	      		this.policy.question = policy.question
			  	var compare = function (obj1, obj2) {
				    var val1 = obj1.questionNo;
				    var val2 = obj2.questionNo;
				    if (val1 < val2) {
				        return -1;
				    } else if (val1 > val2) {
				        return 1;
				    } else {
				        return 0;
				    }
				}
				let than = this
				let idCards = response.data.response.policy.custInfo.idCards
				if(idCards!=undefined && idCards.length>0){
					for(var i=0;i<idCards.length;i++){
						(function(i){
							if(idCards[i].imageName == "23"){
								//业务人员
								var image = document.getElementById('xss_23')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								image.onload =function() {
									var data = than.getBase64Image(image)
									than.signImgs.agent_signt = data
								}
							}else if(idCards[i].imageName == "24"){
								//投保人
								var image = document.getElementById('xss_24')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								image.onload =function() {
									var data = than.getBase64Image(image)
									than.signImgs.applicant_signt = data
								}
							}else if(idCards[i].imageName == "25"){
								//被保人
								var image = document.getElementById('xss_25')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								image.onload =function() {
									var data = than.getBase64Image(image)
									than.signImgs.insure_signt = data
								}
							}else if(idCards[i].imageName == "30"){
								var image = document.getElementById('xss_30')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								image.onload =function() {
									var data = than.getBase64Image(image)
									than.signImgs.cecintent_signt = data
								}
							}
						})(i)
					}
				}
				let sign23Str = response.data.response.policy.agentInfo.name
					+"-"+ response.data.response.policy.agentInfo.idno 
					+"-"+ "11"
					+"-"+ this.$route.params.planId  
					+"-"+ this.$route.params.applyCode  
					+"-"+ 23
					+"-"+ 1
				let sign24Str = response.data.response.policy.custInfo.appnt.appntName 
					+"-"+ response.data.response.policy.custInfo.appnt.idNo  
					+"-"+ response.data.response.policy.custInfo.appnt.idType
					+"-"+ this.$route.params.planId  
					+"-"+ this.$route.params.applyCode  
					+"-"+ 24
					+"-"+ 1
				let sign24Str2 = response.data.response.policy.custInfo.appnt.appntName 
					+"-"+ response.data.response.policy.custInfo.appnt.idNo  
					+"-"+ response.data.response.policy.custInfo.appnt.idType
					+"-"+ this.$route.params.planId  
					+"-"+ this.$route.params.applyCode  
					+"-"+ 25
					+"-"+ 1
				let sign25Str = response.data.response.policy.custInfo.insurants.insurant[0].name 
					+"-"+ response.data.response.policy.custInfo.insurants.insurant[0].idNo  
					+"-"+ response.data.response.policy.custInfo.insurants.insurant[0].idType
					+"-"+ this.$route.params.planId  
					+"-"+ this.$route.params.applyCode  
					+"-"+ 25
					+"-"+ 1
				console.log("签字地址============>")
				console.log(sign23Str)
				console.log(sign24Str)
				console.log(sign25Str)
				let host = window.globalConfig.rootUrl.split('/')[2]
				this.href.sign23 = "http://" + host + "/com.ifp.ipartner/faceid/" + window.Base64.encode(sign23Str)
				this.href.sign24 = "http://" + host + "/com.ifp.ipartner/faceid/" + window.Base64.encode(sign24Str)
				if(this.ageFilter(response.data.response.policy.custInfo.insurants.insurant[0].birthday)<18){
					this.href.sign25 = "http://" + host + "/com.ifp.ipartner/faceid/" + window.Base64.encode(sign24Str2)
				}else{
					this.href.sign25 = "http://" + host + "/com.ifp.ipartner/faceid/" + window.Base64.encode(sign25Str)
				}
				for (var i = 0; i < this.dict.informList.length; i++) {
					for (var j = 0; j < this.resRemark.length; j++) {
						let resRemark = this.resRemark[j]
						if(this.dict.informList[i].code == resRemark.code){
							if(this.dict.informList[i].code == "A00001"){
								this.dict.informList[i].height = resRemark.height
								this.dict.informList[i].weight = resRemark.weight
							}
							this.dict.informList[i].questionRemark = resRemark.questionRemark
							this.dict.informList[i].isBuild = resRemark.isBuild
							this.dict.informList[i].resCustCode = resRemark.resCustCode
							if("Y" == resRemark.isBuild){
								this.dict.informList[i].swh = true
							}else if("N" == resRemark.isBuild){
								this.dict.informList[i].swh = false
							}
						}
					}
				}
				if(this.$route.params.result != -1){
					//成功打开签字框
					if(this.$route.params.result == 0){
						if(this.$route.params.index != -1){
							this.openCA(this.$route.params.index)
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
				//代理人展业证号
				this.agent = response.data.response.policy.agentInfo
				this.agent.agentQuafno=response.data.response.policy.agentInfo.quafno
				console.log("代理人展业证号",this.agent.agentQuafno)
				//根据产品不同显示风险提示语
				if(productInfoPolicy!=undefined && productInfoPolicy.length>0){
			        for (var i = 0; i < productInfoPolicy.length; i++) {
						// console.log("产品列表/////////////",productInfoPolicy[i])
			            if(productInfoPolicy[i].isMaster == 1){
			                this.prodCode = productInfoPolicy[i].prodCode
			            }
			        }
			    }
				console.log("产品code",this.prodCode)
				this.productDef(this.prodCode,(productDefList)=>{
					console.log("信息获取成功")
					console.log(productDefList)
					for(var i=0;i<productDefList.length;i++){
						let typeAll=productDefList[i].productDefine.typeAll.slice(0, 4)
						console.log(typeAll)
						if(typeAll == "1020" || typeAll == "1030" || typeAll == "1040"){
							this.isProdCode = true
						}else{
							this.isProdCode = false
						}
						//犹豫期
						this.hesitationPeriod=productDefList[i].productDefine.hesitationPeriod
						//特殊单证判断
						// this.defineList.specialBookCode=productDefList[i].productDefine.specialBooks
						this.defineList.productCode=productDefList[i].productDefine.code
						this.defineList.minPremium=productDefList[i].productDefine.minPremium
						this.defineList.timeLimit=productDefList[i].productDefine.timeLimit
						var productType=productDefList[i].productDefine.typeAll.slice(0,4)
						if (productType=="1020") {// desc="分红寿险" 
							this.defineList.typeProduct= "01";
						} else if (productType=="1030") {//desc="投资连接保险"
							this.defineList.typeProduct= "02";
						} else if (productType=="1040") {//desc="万能保险"
							this.defineList.typeProduct = "03";
						}else{
							this.defineList.typeProduct = "04";
						}
						console.log(this.defineList.typeProduct)
						this.getTeshuDanZheng()
					}
				})
				//阅读状态读缓存
				this.readStatus= utils.cache.get("readStatus")
			}).catch(error => {
				this.showMsg(error)
			})
		  },
		filters:{
			getRelationBef(code,item){
			  if(code != undefined && code != ""){
				if(code == "30"){
					return item.relToInsDesc
				}
			    if (relationList != undefined && relationList !="") {
			     for (var i = 0; i < relationList.relation.item.length; i++) {
			          if(relationList.relation.item[i].code == code){
			            return relationList.relation.item[i].text
			          }
				  }
				  return "其他"
			    }
			  }
			},
			getCardText(code){
			  if(code != undefined && code != ""){
			    if (cardTypeList != undefined && cardTypeList !="") {
			     for (var i = 0; i < cardTypeList.dict_cardtype.item.length; i++) {
			          if(cardTypeList.dict_cardtype.item[i].code == code){
			            return cardTypeList.dict_cardtype.item[i].text
			          }
			      }
			    }
			  }
			},
			getDividendText(code){
				for(let i =0;i<dividendList.dividend.item.length;i++){
					if(code == dividendList.dividend.item[i].code){
						return dividendList.dividend.item[i].text
					}
				}
			},
			getSexText(code){
				if(code == 1){
					return "男"
				}else if(code == 2){
					return "女"
				}
			},
			getNationalText(code){
				for(let i =0;i<nationalList.national.item.length;i++){
					if(code == nationalList.national.item[i].code){
						return nationalList.national.item[i].text
					}
				}
			},
			getMarriageText(code){
				for(let i =0;i<marriageList.marriage.item.length;i++){
					if(code == marriageList.marriage.item[i].code){
						return marriageList.marriage.item[i].text
					}
				}
			},
			getIdTypeText(code){
				for(let i =0;i<cardTypeList.dict_cardtype.item.length;i++){
					if(code == cardTypeList.dict_cardtype.item[i].code){
						return cardTypeList.dict_cardtype.item[i].text
					}
				}
			},
			getResidentText(code){
				if(code != undefined && code != ""){
					if (residentList != undefined && residentList !="") {
						for (var i = 0; i < residentList.resident.item.length; i++) {
							if(residentList.resident.item[i].code == code){
								return residentList.resident.item[i].text
							}
						}
					}
			  	}
			},
			getProvinceText(code){
				for(let i =0;i<provinceList.province.item.length;i++){
					if(code == provinceList.province.item[i].code){
						return provinceList.province.item[i].text
					}
				}
			},
			getCityText(code){
				for(let i =0;i<cityList.city.item.length;i++){
					if(code == cityList.city.item[i].code){
						return cityList.city.item[i].text
					}
				}
			},
			//过滤豁免期间为指定数据显示 201803151854
			getExempt(code,policy){
				if(code == "豁免期间"){
					for(var i=0;i<policy.length;i++){
						if(policy[i].isMaster == "1"){
							if(policy[i].payYear.indexOf("term_")!=-1){
								return (policy[i].payYear.replace("term_", "")-1)+"年期"
							}
						}
					}
				}else{
					return code
				}
			}
		},
		methods:{
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
			showContent(index){
				if(index == 1){
					this.toggle.isAppIdInform = !this.toggle.isAppIdInform
					if(this.toggle.isAppIdInform==false){
						$('#btn_1').css('transform','rotate(180deg)');
					}else if(this.toggle.isAppIdInform==true){
						$('#btn_1').css('transform','rotate(360deg)');
					}
				}else if(index == 2){
					this.toggle.isAppContactInform = !this.toggle.isAppContactInform
					if(this.toggle.isAppContactInform==false){
						$('#btn_2').css('transform','rotate(180deg)');
					}else if(this.toggle.isAppContactInform==true){
						$('#btn_2').css('transform','rotate(360deg)');
					}
				}else if(index == 3){
					this.toggle.isAppOccuInform = !this.toggle.isAppOccuInform
					if(this.toggle.isAppOccuInform==false){
						$('#btn_3').css('transform','rotate(180deg)');
					}else if(this.toggle.isAppOccuInform==true){
						$('#btn_3').css('transform','rotate(360deg)');
					}
				}else if(index == 4){
					this.toggle.isInsIdInform = !this.toggle.isInsIdInform
					if(this.toggle.isInsIdInform==false){
						$('#btn_4').css('transform','rotate(180deg)');
					}else if(this.toggle.isInsIdInform==true){
						$('#btn_4').css('transform','rotate(360deg)');
					}
				}else if(index == 5){
					this.toggle.isInsContactInform = !this.toggle.isInsContactInform
					if(this.toggle.isInsContactInform==false){
						$('#btn_5').css('transform','rotate(180deg)');
					}else if(this.toggle.isInsContactInform==true){
						$('#btn_5').css('transform','rotate(360deg)');
					}
				}else if(index == 6){
					this.toggle.isInsOccuInform = !this.toggle.isInsOccuInform
					if(this.toggle.isInsOccuInform==false){
						$('#btn_6').css('transform','rotate(180deg)');
					}else if(this.toggle.isInsOccuInform==true){
						$('#btn_6').css('transform','rotate(360deg)');
					}
				}else if(index == 7){
					this.toggle.isBfcyIdInform = !this.toggle.isBfcyIdInform
					if(this.toggle.isBfcyIdInform==false){
						$('#btn_7').css('transform','rotate(180deg)');
					}else if(this.toggle.isBfcyIdInform==true){
						$('#btn_7').css('transform','rotate(360deg)');
					}
				}else if(index == 8){
					this.toggle.isProductInform = !this.toggle.isProductInform
					if(this.toggle.isProductInform==false){
						$('#btn_8').css('transform','rotate(180deg)');
					}else if(this.toggle.isProductInform==true){
						$('#btn_8').css('transform','rotate(360deg)');
					}
				}else if(index == 9){
					this.toggle.isProduct2Inform = !this.toggle.isProduct2Inform
					if(this.toggle.isProduct2Inform==false){
						$('#btn_9').css('transform','rotate(180deg)');
					}else if(this.toggle.isProduct2Inform==true){
						$('#btn_9').css('transform','rotate(360deg)');
					}
				}else if(index == 10){
					this.toggle.isOtherInform = !this.toggle.isOtherInform
					if(this.toggle.isOtherInform==false){
						$('#btn_10').css('transform','rotate(180deg)');
					}else if(this.toggle.isOtherInform==true){
						$('#btn_10').css('transform','rotate(360deg)');
					}
				}else if(index == 11){
					this.toggle.isAppBankInform = !this.toggle.isAppBankInform
					if(this.toggle.isAppBankInform==false){
						$('#btn_11').css('transform','rotate(180deg)');
					}else if(this.toggle.isAppBankInform==true){
						$('#btn_11').css('transform','rotate(360deg)');
					}
				}else if(index == 12){
					this.toggle.isAppInform = !this.toggle.isAppInform
					if(this.toggle.isAppInform==false){
						$('#btn_12').css('transform','rotate(180deg)');
					}else if(this.toggle.isAppInform==true){
						$('#btn_12').css('transform','rotate(360deg)');
					}
				}else if(index == 13){
					this.toggle.isInsInform = !this.toggle.isInsInform
					if(this.toggle.isInsInform==false){
						$('#btn_13').css('transform','rotate(180deg)');
					}else if(this.toggle.isInsInform==true){
						$('#btn_13').css('transform','rotate(360deg)');
					}
				}else if(index == 14){
					this.toggle.isSaleInform = !this.toggle.isSaleInform
					if(this.toggle.isSaleInform==false){
						$('#btn_14').css('transform','rotate(180deg)');
					}else if(this.toggle.isSaleInform==true){
						$('#btn_14').css('transform','rotate(360deg)');
					}
				}else if(index == 15){
					this.toggle.isSaleReport = !this.toggle.isSaleReport
					if(this.toggle.isSaleReport==false){
						$('#btn_15').css('transform','rotate(180deg)');
					}else if(this.toggle.isSaleReport==true){
						$('#btn_15').css('transform','rotate(360deg)');
					}
				}
			},
			getTeshuDanZheng() {
				console.log("过滤单证信息start")
				//代理人地区取缓冲
				var areaType = this.agent.manageCom.slice(0, 4)
				if(areaType == "8612") { //天津分公司
					this.defineList.typeArea = "01";
				} else if(areaType == "8611") { //北京分公司
					this.defineList.typeArea = "02";
				} else if(areaType == "8631") { //上海分公司
					this.defineList.typeArea = "03";
				} else if(areaType == "8661") { //重庆分公司
					this.defineList.typeArea = "04";
				} else if(areaType == "8651") { //广东分公司
					this.defineList.typeArea = "05";
				} else if(areaType == "8635") { //宁波分公司
					this.defineList.typeArea = "06";
				} else if(areaType == "8622") { //大连分公司
					this.defineList.typeArea = "07";
				}
				console.log("代理人地区", this.defineList.typeArea)
				//渠道
				this.defineList.showChannel = this.agent.branchtype
				console.log("渠道", this.defineList.showChannel)
				//投保人最小显示年龄
				var applicantAge = this.getAge(this.applicant.birth)
				console.log("投保人年龄",applicantAge)
				//被保险人最小显示年龄
				let insureAge=""
				for(var i=0;i<this.recognizeeList.length;i++){
					insureAge=this.getAge(this.recognizeeList[i].birthday)
				}
				console.log("被保险人最小显示年龄",insureAge)
				//必须不是银保B开头的代理人
				//------------------------------缺少银保判断-----------------
				var firstIsNotB = this.agent.agentcode
				if(firstIsNotB != "B" && (this.defineList.showChannel != "13" || this.defineList.showChannel != "02")) {
					this.defineList.firstIsNotB = true
				} else {
					this.defineList.firstIsNotB = false
				}
				console.log("不是银保的B开头的代理人", this.defineList.firstIsNotB)
				//自保件判断
				var agentNum = this.agent.idno
				if(this.applicant.idNumber == agentNum) {
					this.defineList.buyMyself = "01"
				} else {
					this.defineList.buyMyself = "02"
				}
				console.log("自保件判断", this.defineList.buyMyself)
				//特殊单证显示
				console.log("特殊单证json", list_defineList.list_define)
				var list = list_defineList.list_define.lists.list
				var defines = []
				for(var i = 0; i < list.length; i++) {
					// console.log(list[i] , '----------');
					// console.log('-----------------:' + this.defineList.typeArea);
					//地区判断
					//	console.log('地区'+this.defineList.typeArea + '----------');
					if((this.defineList.typeArea == list[i].typeArea || list[i].typeArea == '00') && (list[i].typeProduct.indexOf(this.defineList.typeProduct) > -1 || list[i].typeProduct == '00')) {
						defines.push(list[i]);
						console.log("add 1")
					}

					//最小显示年龄判断
					if(applicantAge < list[i].minShowAge || insureAge < list[i].insureMinShowAge) {
						var policyProduct = ""
						for(var j = 0; j < this.riskList.length; j++) {
							if(this.riskList[j].isMaster == "1"); {
								policyProduct = this.riskList[j];
							}
						}

						if(list[i].counterMustShow && this.defineList.counterMustShow) {

						} else if(list[i].typeArea == '05' && policyProduct.payYear != "single") {

						} else if(this.isInArray(defines, list[i])) {
							defines.splice(this.whereInArray(defines, list[i]));
						}
					}
					//	判断主险长期险种
					if((list[i].limit == '01' && this.defineList.timeLimit == '01') || (list[i].limit == '02' && this.defineList.timeLimit != '01') || list[i].limit == '00') {} else {
						if(this.isInArray(defines, list[i])) {
							defines.splice(this.whereInArray(defines, list[i]));
							console.log("%c 主险长期险不符", 'color:green', list[i])
						}
					}
					//	判断银保B开头
					if(list[i].firstIsNotB && !this.defineList.firstIsNotB) {
						if(this.isInArray(defines, list[i])) {
							defines.splice(this.whereInArray(defines, list[i]));
							console.log("%c 银保B开头不符", 'color:green', list[i])
							continue;
						}
					}
					//	判断渠道
					if(list[i].showChannel != '00') {
						if(list[i].showChannel == '03') { //银保的
							if(this.defineList.showChannel != "13" && this.defineList.showChannel != "02") {
								if(this.isInArray(defines, list[i])) {
									defines.splice(this.whereInArray(defines, list[i]));
									console.log("%c 渠道不符", 'color:green', list[i])
									continue;
								}
							}
						}
					}
					//	判断产品号和最小保费
					if(list[i].productCode) {
						var isContainProduct = false;
						for(var j = 0; j < this.riskList.length; j++) {
							if(list[i].productCode.indexOf(this.riskList[j].prodCode) > -1){
								isContainProduct = true;
								break;
							}
						}
						if(!isContainProduct || list[i].minPremium < this.riskList[0].minPlanPrem) {
							if(this.isInArray(defines, list[i])) {
								defines.splice(this.whereInArray(defines, list[i]));
								console.log("%c 产品号和最小保费不符", 'color:green', list[i])
								continue;
							}
						}
					}
					//	判断自保件
					if(list[i].buyMyself != '00') {
						if(this.defineList.buyMyself == '02' && list[i].buyMyself == '01') {
							if(this.isInArray(defines, list[i])) {
								defines.splice(this.whereInArray(defines, list[i]));
								console.log("%c 自保件不符1", 'color:green', list[i])
								continue;
							}
						} else if(this.defineList.buyMyself == '01' && list[i].buyMyself == '02') {
							if(this.isInArray(defines, list[i])) {
								defines.splice(this.whereInArray(defines, list[i]));
								console.log("%c 自保件不符2", 'color:green', list[i])
								continue;
							}
						}
					}
				}
				console.log("过滤")
				console.log(defines)
				this.definesLists=defines
				for(var i=0;i<this.definesLists.length;i++){
					this.saveName.push(this.definesLists[i].saveName)
					// console.log(this.saveName)
				}
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
			//健康告知开关
		  	switchQuestion:function(itm){
		  		if (itm.isBuild == "Y") {
		  			itm.questionRemark=""
					itm.isBuild = "N"
		  		}else if(itm.isBuild == "N"){
					itm.isBuild = "Y"
		  		}
		  	},
			//CA签字
			openCA(signNum){
				this.caValue.isCAOpen = !this.caValue.isCAOpen
				this.caValue.image = ""
				showPopupDialog(signNum);
			},
			opensCA(signNums){
				this.caValue.isCACommentOpen = !this.caValue.isCACommentOpen
	  			this.caValue.image = ""
	  			showCommentDialog(30)
			},
			imageUpload:function(context_id,image){
				if(image!=undefined && image!=""){
					let requ = {
	  				"upload": {
	  					"agentCode":"",
	  					"applyCode":this.$route.params.applyCode,
	  					"orderId":this.$route.params.planId,
	  					"policyCode":"",
						"deviceNo":"",
						"imageList":[{
							"imageType":context_id,
							"imageName":"签字照片",
							"imageByte":image.substring(22,image.length)
						}]
	                }
				  }
				  if(requ.upload.imageList[0].imageByte!=undefined && requ.upload.imageList[0].imageByte!=""){
					utils.http.postFast('MOUPLOAD',requ,(body)=>{
						if(body.resultMessage == "上传影像成功！"){
								if(context_id == "23"){
									//业务人员
									document.getElementById('xss_23').src = ""
									document.getElementById('xss_23').src = image
									this.signImgs.agent_signt=image
								}else if(context_id == "24"){
									//投保人
									document.getElementById('xss_24').src = ""
									document.getElementById('xss_24').src = image
									this.signImgs.applicant_signt=image
								}else if(context_id == "25"){
									//被保人
									document.getElementById('xss_25').src = ""
									document.getElementById('xss_25').src = image
									this.signImgs.insure_signt=image
								}else if(context_id == "30"){
									document.getElementById('xss_30').src = ""
									document.getElementById('xss_30').src = image
									this.signImgs.cecintent_signt = image
								}
							}
						})
					}
				}
			},
			//信息显示隐藏
			showData(index){
				if(index=="1"){
					this.dataShow.dataShow1 =!this.dataShow.dataShow1;
					if(this.dataShow.dataShow1==false){
						$('#btn1').css('transform','rotate(180deg)');
					}else if(this.dataShow.dataShow1==true){
						$('#btn1').css('transform','rotate(360deg)');
					}
				}else if(index=="2"){
					this.dataShow.dataShow2 =!this.dataShow.dataShow2;
					if(this.dataShow.dataShow2==false){
						$('#btn2').css('transform','rotate(180deg)');
					}else if(this.dataShow.dataShow2==true){
						$('#btn2').css('transform','rotate(360deg)');
					}
				}else if(index=="3"){
					this.dataShow.dataShow3 =!this.dataShow.dataShow3;
					if(this.dataShow.dataShow3==false){
						$('#btn3').css('transform','rotate(180deg)');
					}else if(this.dataShow.dataShow3==true){
						$('#btn3').css('transform','rotate(360deg)');
					}
				}else if(index=="4"){
					this.dataShow.dataShow4 =!this.dataShow.dataShow4;
					if(this.dataShow.dataShow4==false){
						$('#btn4').css('transform','rotate(180deg)');
					}else if(this.dataShow.dataShow4==true){
						$('#btn4').css('transform','rotate(360deg)');
					}
				}else if(index=="5"){
					this.dataShow.dataShow5 =!this.dataShow.dataShow5;
					if(this.dataShow.dataShow5==false){
						$('#btn5').css('transform','rotate(180deg)');
					}else if(this.dataShow.dataShow5==true){
						$('#btn5').css('transform','rotate(360deg)');
					}
				}else if(index=="6"){
					this.dataShow.dataShow6 =!this.dataShow.dataShow6;
					if(this.dataShow.dataShow6==false){
						$('#btn6').css('transform','rotate(180deg)');
					}else if(this.dataShow.dataShow6==true){
						$('#btn6').css('transform','rotate(360deg)');
					}
				}else if(index=="7"){
					this.dataShow.dataShow7 =!this.dataShow.dataShow7;
					if(this.dataShow.dataShow7==false){
						$('#btn7').css('transform','rotate(180deg)');
					}else if(this.dataShow.dataShow7==true){
						$('#btn7').css('transform','rotate(360deg)');
					}
				}else if(index=="8"){
					this.dataShow.dataShow8 =!this.dataShow.dataShow8;
					if(this.dataShow.dataShow8==false){
						$('#btn8').css('transform','rotate(180deg)');
					}else if(this.dataShow.dataShow8==true){
						$('#btn8').css('transform','rotate(360deg)');
					}
				}else if(index=="9"){
					this.dataShow.dataShow9 =!this.dataShow.dataShow9;
					if(this.dataShow.dataShow9==false){
						$('#btn9').css('transform','rotate(180deg)');
					}else if(this.dataShow.dataShow9==true){
						$('#btn9').css('transform','rotate(360deg)');
					}
				}else if(index=="10"){
					this.dataShow.dataShow10 =!this.dataShow.dataShow10
					;
					if(this.dataShow.dataShow10==false){
						$('#btn10').css('transform','rotate(180deg)');
					}else if(this.dataShow.dataShow10==true){
						$('#btn10').css('transform','rotate(360deg)');
					}
				}else if(index=="11"){
					this.dataShow.dataShow11 =!this.dataShow.dataShow11;
					if(this.dataShow.dataShow11==false){
						$('#btn11').css('transform','rotate(180deg)');
					}else if(this.dataShow.dataShow11==true){
						$('#btn11').css('transform','rotate(360deg)');
					}
				}
			},
			//获取国籍
			getNationalItem(code){
			  if(code != undefined && code != ""){
			    if (nationalList != undefined && nationalList !="") {
			     for (var i = 0; i < nationalList.national.item.length; i++) {
			        if(nationalList.national.item[i].code == code){
			          return nationalList.national.item[i].text
			        }
			      }
			    }
			  }
			},
			//获取联系地址省份
			getProvinceItem(code){
			  if(code != undefined && code != ""){
			    if (provinceList != undefined && provinceList !="") {
			     for (var i = 0; i < provinceList.province.item.length; i++) {
			        if(provinceList.province.item[i].code == code){
			          return provinceList.province.item[i].text
			        }
			      }
			    }
			  }
			},
			//获取联系地址市
			getCityItem(code){
			  if(code != undefined && code != ""){
			    if (cityList != undefined && cityList !="") {
			     for (var i = 0; i < cityList.city.item.length; i++) {
			        if(cityList.city.item[i].code == code){
			          return cityList.city.item[i].text
			        }
			      }
			    }
			  }
			},
			//获取证件类型
			getCardItem(code){
			  if(code != undefined && code != ""){
			    if (cardTypeList != undefined && cardTypeList !="") {
			     for (var i = 0; i < cardTypeList.dict_cardtype.item.length; i++) {
			          if(cardTypeList.dict_cardtype.item[i].code == code){
			            return cardTypeList.dict_cardtype.item[i].text
			          }
			      }
			    }
			  }
			},
			//获取受益人与被保险人的关系
			getBenefit(code){
				if(code != undefined && code != ""){
			    if (benefitList != undefined && benefitList !="") {
			     for (var i = 0; i < benefitList.relation.item.length; i++) {
			          if(benefitList.relation.item[i].code == code){
			            return benefitList.relation.item[i].text
			          }
			      }
			    }
			  }
			},
			//投被保人关系
			getRelation(item,code){
			  if(code != undefined && code != ""){
				if(code == "30"){
					return item.relToAppDesc
				}
			    if (relationList != undefined && relationList !="") {
			     for (var i = 0; i < relationList.relation.item.length; i++) {
			          if(relationList.relation.item[i].code == code){
			            return relationList.relation.item[i].text
			          }
				  }
				  return "其他"
			    }
			  }
			},
			//获取婚姻状况
			getMarriage(code){
			  if(code != undefined && code != ""){
			    if (marriageList != undefined && marriageList !="") {
			     for (var i = 0; i < marriageList.marriage.item.length; i++) {
			          if(marriageList.marriage.item[i].code == code){
			            return marriageList.marriage.item[i].text
			          }
			      }
			    }
			  }
			},
			//获取税收居民身份
			getResidentList(code){
			  if(code != undefined && code != ""){
			    if (residentList != undefined && residentList !="") {
			     for (var i = 0; i < residentList.resident.item.length; i++) {
			          if(residentList.resident.item[i].code == code){
			            return residentList.resident.item[i].text
			          }
			      }
			    }
			  }
			},
			//获取开户银行
			getBankList(code){
			  if(code != undefined && code != ""){
			    if (bankList != undefined && bankList !="") {
			     for (var i = 0; i < bankList.bank.item.length; i++) {
			          if(bankList.bank.item[i].code == code){
			            return bankList.bank.item[i].text
			          }
			      }
			    }
			  }
			},
			//获取省份
			getProvince(code){
				if(code != undefined && code != ""){
			    if (provinceList != undefined && provinceList !="") {
			     for (var i = 0; i < provinceList.province.item.length; i++) {
			          if(provinceList.province.item[i].code == code){
			            return provinceList.province.item[i].text
			          }
			      }
			    }
			  }
			},
			//提示框
			showMsg(msg){
			    if(msg!=undefined && msg!=""){
			         this.$refs.alert.showMOdal(msg)
			    }
			},
			//获取市区
			getCity(code){
					if(code != undefined && code != ""){
				    if (cityList != undefined && cityList !="") {
				     for (var i = 0; i < cityList.city.item.length; i++) {
				          if(cityList.city.item[i].code == code){
				            return cityList.city.item[i].text
				          }
				      }
				    }
				  }
				},
			//跳转至影像上传页面
			push(){
				this.$refs.alert.showMOdal("签字完成后请告知代理人!")
				if(this.readStatus==true){
					//阅读状态存缓存
					utils.cache.set('readStatus',this.readStatus)
				}
			},
			//请求产品定义接口
	    	productDef(productCode,callback){	
		        let requ1 = {
		            "productDef": {
		                "agentCode":'',
		                "productCode": productCode,
		                "token": new Date().getTime(),
		                "openId": "1"
		            }
		        }
		        utils.http.postFast('PRODUCTDEFLIST',requ1,(body)=> {
		            let productDefList = body.productDefList
		            callback(productDefList)
		        })
		    },
			//获取投保人被保人年龄
			getAge(value){
				const birthday = new Date(value)
				const now = new Date()
				let age = now.getFullYear()-birthday.getFullYear()-1
				if(now.getMonth()-birthday.getMonth()>0){
				  age++
				}else if(now.getMonth()==birthday.getMonth()>0 && now.getDate()-birthday.getDate()>=0){
				  age++
				}
				return age
			},
			isInArray(arr,value){
			    for(var i = 0; i < arr.length; i++){
			        if(value === arr[i]){
			            return true;
			        }
			    }
			    return false;
			},
			whereInArray(arr,value){
				for(var i = 0; i < arr.length; i++){
				    if(value === arr[i]){
				        return i;
				    }
				}
			},
			//跳转到特殊单证页面
			jumpToTeShuDanZheng(name){
				let mainCode = ""
				for(var i=0;i<this.riskList.length;i++){
					if(this.riskList[i].isMaster == 1){
						mainCode = this.riskList[i].prodCode
					}
				}
  				this.$router.push({
					name: name,
					params: {
						planId: this.$route.params.planId,
						applyCode: this.$route.params.applyCode,
						index:this.$route.params.index,
						result:this.$route.params.result,
						resultmsg:this.$route.params.resultmsg,
						signImgs: JSON.stringify(this.signImgs.applicant_signt),
						signImgsAgent:JSON.stringify(this.signImgs.agent_signt),
						applicant:this.applicant.name,
						policyResult:this.policyResult,
						hesitationPeriod:this.hesitationPeriod,
						agentQuafno:this.agent.agentQuafno,	
						typeProduct:this.defineList.typeProduct,
						share:true,
						productCode:mainCode,
						agentCode:this.agent.agentcode,
						channel:this.defineList.showChannel,
						agentName:this.agent.name
					}
				})
			},
	  	}
	}
</script>

<style scoped type="text/css" lang="scss">
	.tip{height: 25px;border-radius: 50%;background: #FEB101;color: #fff;display:inline-block;
		text-align: center;line-height: 25px;font-weight: bold;margin:5px 0,}
	.appnt{width: 98%;margin-left:2%;opacity: 999;background: #fff;
	border-radius: 13px;}
	.border-radius{width: 95%;background: #FEB101;border-radius: 13px;margin:8px auto;}
	.line-h{line-height: 35px;}
	.other{
		display: inline-block;
		border-bottom: 1px solid #000;
		text-align: center;
		width: 100px;
	}
	.input_text{
		text-align: center;
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
	#content{
		width: 100%;
		position: absolute;

	}
	.manage-main-contents{
		/* margin-bottom: 50px; */
		width: 100%;
		position: absolute;
		top: 50px;
		overflow-y: auto;
		overflow-x: hidden;
		background:#F5F5F5;
		font-size: 12px;
	}
	.applicant,.recognizee,.deathFavoree,.insurance,.bankCard,.health,.notice,.statement,.account,.accountReport,.insureAccount{
		width: 95%;
		height: 35px;
		/* margin-bottom: 5px; */
		margin: 0 10px;
		/* background:#F5F5F5; */
		/* border-top:1px solid #C5C2BC; */
		border-bottom:1px dashed #B2B2B2;
	}
	.applicantData,.recognizeeData,.deathFavoreeData,.insuranceData,.bankCardData,.healthData,.noticeData,.statementData,.accountData,.accountReportData,.insureAccountData{
		width: 90%;
		height: 35px;
		margin: 0px auto;
		display: flex;
		flex: wrap;
		line-height: 35px;

	}
	.applicantData>p,.recognizeeData>p,.deathFavoreeData>p,.insuranceData>p,.bankCardData>p,.healthData>p,.noticeData>p,.statementData>p,.accountData>p,.accountReportData>p,.insureAccountData>p{
		width: 10%;
	}
	.applicantData>p>i,.recognizeeData>p>i,.deathFavoreeData>p>i,.insuranceData>p>i,.bankCardData>p>i,.healthData>p>i,.noticeData>p>i,.statementData>p>i,.accountData>p>i,.accountReportData>p>i,.insureAccountData>p>i{
		color: #FEB101;
		font-size: 25px;
		vertical-align: middle;
	}
	.applicantData>div,.insuranceData>div,.bankCardData>div,.healthData>div,.noticeData>div,.accountData>div,.accountReportData>div,.insureAccountData>div{
		width: 90%;
		font-weight: bold;
	}
	.applicantUser>.line,.recognizeeUser>.line,.deathFavoreeUser>.line{
		width: 90%;
		/* padding-top: 5px; */
		margin: 0px auto;
		display: flex;
		flex: wrap;
		justify-content: space-between;
	}
	.applicantUser>.info,.applicantUser>.infoCountry,.applicantUser>.infoWork,.insuranceInfo>.info,.insuranceInfo>.infoTime,.insuranceInfo>.infoText,.insuranceInfo>.infoScale,.bankCardInfo>.info,
	.bankCardInfo>.infoName,.bankCardInfo>.infoText,.noticeInfo>.info,.noticeInfo>.infoText,.statementData>.info,.statementInfo>.infoText,.statementInfo>.infoSign1,.statementInfo>.infoSign2,.statementInfo>.info,.accountInfo>.info,.accountReportInfo>.info,.insureAccountInfo>.info,.insureAccountInfo>.infoSign1,.insureAccountInfo>.infoSign2,.insureAccountInfo>.infoSign3,.insureAccountInfo>.infoBox,.healthInfo>.info,.statementInfo>.infoSign1Area,.insureAccountInfo>.infoSign1Area,.recognizeeUser>.info,.recognizeeUser>.infoCountry,.recognizeeUser>.infoWork,.deathFavoreeUser>.info,.deathFavoreeUser>.infoCountry,.deathFavoreeUser>.infoWork{
		width: 90%;
	 	margin: 5px auto;
	}
	.applicantUser>.infoCountry,.applicantUser>.infoWork,.insuranceInfo>.infoTime,.bankCardInfo>.infoName,.statementInfo>.infoSign1,.statementInfo>.infoSign2,.insureAccountInfo>.infoSign1,.insureAccountInfo>.infoSign2,.insureAccountInfo>.infoSign3,.insureAccountInfo>.infoBox,.recognizeeUser>.infoCountry,.recognizeeUser>.infoWork{
		display: flex;
		flex: wrap;
		justify-content: space-between;
	}
	.applicantUser>.infoCountry>p:nth-child(1),.insuranceInfo>.infoTime>p:nth-child(1),.bankCardInfo>.infoName>p:nth-child(1),.recognizeeUser>.infoCountry>p:nth-child(1),.recognizeeUser>.infoWork>p:nth-child(1){
		width: 40%;
	}
	.applicantUser>.infoCountry>p:nth-child(2),.insuranceInfo>.infoTime>p:nth-child(2),.bankCardInfo>.infoName>p:nth-child(2),.recognizeeUser>.infoCountry>p:nth-child(2),.recognizeeUser>.infoWork>p:nth-child(2){
		width: 60%;
	}
	.applicantUser>.infoWork>p:nth-child(1),.statementInfo>.infoSign1>p:nth-child(1),.statementInfo>.infoSign2>p:nth-child(2){
		width: 50%;
	}
	.applicantUser>.infoWork>p:nth-child(2),.statementInfo>.infoSign1>p:nth-child(2),.statementInfo>.infoSign2>p:nth-child(1){
		width: 65%;
	}
	.statementInfo>.infoSign1Area>p,.insureAccountInfo>.infoSign1Area>p{
		width: 100%;
		height: 100px;
		background: #DDDBD7;
	}
	.recognizeeData>div,.deathFavoreeData>div{
		width: 90%;
		font-weight: bold;
	}
	.insuranceInfo>.infoText{
		border-bottom: 1px dashed #C5C2BC;
	}
	.insuranceInfo>.infoText>p,.bankCardInfo>.infoText>p{
		margin-bottom: 10px;
		color:#FFAB00 ;
	}
	.insuranceInfo>.infoScale{
		margin-top: 15px;
	}
	.bankCardInfo>div:nth-child(5),.accountInfo>div:nth-child(5){
		border-bottom: 1px dashed #C5C2BC;
	}
	.noticeInfo>.info>p{
		color:#FEB101 ;
	}
	.statementData>div{
		width: 90%;
		overflow:hidden;
		font-weight: bold;
	}
	.accountInfo>div:nth-child(5)>p{
		margin-bottom: 10px;
	}
	.accountReportInfo>.info:nth-child(1)>p,.insureAccountInfo>.info:nth-child(1)>p{
		font-weight: bold;
	}
	.accountReportInfo>.info:nth-child(8)>p{
		font-weight: bold;
		margin-top: 25px;
	}
	.insureAccountInfo>.infoSign1>p:nth-child(1){
		width: 75%;
	}
	.insureAccountInfo>.infoSign1>p:nth-child(2){
		width: 25%;
	}
	.insureAccountInfo>.infoSign2>p:nth-child(1),.insureAccountInfo>.infoSign2>p:nth-child(2),.insureAccountInfo>.infoSign2>p:nth-child(3),.insureAccountInfo>.infoSign3>p:nth-child(1),.insureAccountInfo>.infoSign3>p:nth-child(2),.insureAccountInfo>.infoSign3>p:nth-child(3){
		text-align: center;
		width: 25%;
		/*height: 25%;*/
	}
	.insureAccountInfo>.infoBox>p:nth-child(1){
		width: 10%;
	}
	.insureAccountInfo>.infoBox>p:nth-child(2){
		width: 90%;
		margin-bottom: 60px;
	}
	.insureAccountInfo>.infoBox>p:nth-child(2)>span:nth-child(2){
		color:#FEB101 ;
	}
	.insuranceInfo>.info:nth-child(19)>p{
		margin-bottom: 30px;
	}
	.insureAccountInfo>.infoSign3>p{
		height: 70px;
		background: #E1DCD4;
		/* background-image: url('../../../static/img/backlog/qianzi.jpg');
		background-size: cover;  */
	}
	.insureAccountInfo>div:nth-child(3){
		/* margin:0px 25px; */
	}
	.insureAccountInfo>div:nth-child(4)>p{
		width:100% ;
		height: 165px;
		background: #E1DCD4;
		/* background-image: url('../../../static/img/backlog/qianzi.jpg');
		background-size: cover;  */
	}
	.signImg{
		text-align: center;
	}
	.signImg>img{
		width: 100%;
		height: 100%;
	}
	.inform-content{
		display: flex;flex: wrap;justify-content: space-between;
	}
	.inform_1{
		width: 100%;
		/* background:pink; */
		padding: 15px 10px;
		border-bottom: 1px dashed #999;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.textarea{
		width: 100%;
		/* background: green; */
		text-align:center;
		margin-top:10px;
	}
	.inform_1 p:nth-child(1){
		width: 45px;
		height: 45px;
		// background: #FEB101;
		border-radius: 25px;
		text-align: center;
		line-height: 45px;
		color: #000;
	}
	.inform_1 p:nth-child(2){
		flex:1;
		padding-left:15px;
		font-size: 14px;
		line-height: 15px;
	}
	.inform_1 p:nth-child(3){
		float: right;
		width: 70px;
	}
	.self{
		width: 75%;
	}
	.self>input{
		width: 15%;
		padding: 0 5px;
		border-bottom: 1px solid #FEB101;
	}
	p{
		line-height: 30px;
	}
	.btnFoote{
		border:0;
		color:#fff;
		width: 100%;
		/* height: 50px; */
		/* line-height: 50px; */
		background:#FEB101;
		height: 50px;
	}
</style>
