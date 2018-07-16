<!--客户详情页面-->
<template>
	<div id="content">
    <OccupationSearch v-show="occupationValue.isopen && !customerValue.isopen && !cardScanningValue.isopen" v-model="occupationValue" @click="">
    </OccupationSearch>
    <CustomerSearch v-show="customerValue.isopen && !occupationValue.isopen && !cardScanningValue.isopen" v-model="customerValue" @click="">
    </CustomerSearch>
    <IDCardScanning v-show="cardScanningValue.isopen && !customerValue.isopen && !occupationValue.isopen" v-model="cardScanningValue" @click="">
    </IDCardScanning>
    <SelectArea v-show="SelectArea.isOpen&&obj.isOpen" @selectadress="selectActions" 
     v-model="obj" @cancel="cancels"></SelectArea>
      <SelectArea v-show="SelectArea.isOpens&&obj.isOpen"  
      @selectPolicy="selectMutation" v-model="obj" @cancel="cancels" ></SelectArea>
    <div v-show="contentIsOpen">
      <Headerbtns :title = "page_title">
        <div slot="left" class="back" @click="pre">
          <i class="fa fa-angle-left" ></i>
        </div>
        <div slot="right" class="back" @click="sheetVisible = !sheetVisible">
          <i class="fa fa-ellipsis-v" style="display: inline-block;width: 100%;height: 100%;line-height: 55px;text-align: center;font-size: 24px"></i>
        </div>
      </Headerbtns>
      <div class="main-contents">
         <v-touch class="touch-wrapper" @swipeleft="right" @swiperight="left"  v-bind:swipe-options="{ direction:'horizontal', threshold: 50 }">
        <div class="item-list">
          <div class="item_title">
            <p class="left">
              <span>投保人信息</span>
            </p>
            <p class="right">
              <i class="fa fa-angle-double-up color" @click="toggle.applicantInfoOpen = !toggle.applicantInfoOpen" :style="{'-webkit-transform':toggle.applicantInfoOpen?'rotate(180deg)':''}"></i>
            </p>
          </div>
          <div class="content" v-show="toggle.applicantInfoOpen">
            <ul>
              <!--姓名-->
              <li class="nationality">
                <p class="left">姓名</p>
                <p class="right">
                  <input v-model="policy.custInfo.appnt.appntName" type="text" name="policyholdername" placeholder=""/>
                  <i class="fa fa-search color" @click="customerSearch(global_constant.constant.TAG_SEARCH_CUS_APPLICANT)"></i>
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <!--证件类型-->
              <li class="nationality">
                <p style="width:38%">证件类型</p>
                  <div style="width:69%;" class="picker">
                      <picker   
                      v-model="policy.custInfo.appnt.idType" 
                      :items="dict.cardTypeList.dict_cardtype.item"
                      :values="policy.custInfo.appnt.idType"
                       code="code"
                       ref="cardwapper"
                        text="text">
                       </picker> 
                  </div>
                  <div  style="flex:0 0 38px">
                    <i class="fa fa-angle-down color" aria-hidden="true" style="font-size: 20px;margin: 13px 5px 0px 10px;"></i>
                   <!-- <i class="fa fa-camera-retro color" @click="cardScanning(global_constant.constant.TAG_SEARCH_CUS_APPLICANT)" style="    margin-left: 5px;"></i> -->
                 </div>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <!--证件号码-->
              <li class="nationality">
                <p class="left">证件号码</p>
                <p class="right">
                  <input v-model="policy.custInfo.appnt.idNo" type="text" name="policyholdername" placeholder="请输入证件号码">
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <!--证件有效期-->
              <li  class="validity">
                <div >证件有效止期</div>
                <div >
                  <p>
                    <input class="checkbox"
                      v-model="appntIsCheckeds"
                      @change="handleChangeValidity(1)"
                    type="checkbox"/>
                    <span>长期有效</span>
                  </p>
                  <p  v-show="!appntIsCheckeds">
                    <!-- @change="changePicker" -->
                     <date-picker 
                    v-model="policy.custInfo.appnt.idExpDate">
                  </date-picker>
                  </p>
                </div>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <!--性别-->
              <li class="nationality">
                <p class="left">性别</p>
                <p class="right">
                  <mt-switch
                  @change="handleChange(1)"
                  v-model="toggle.appntSexChoice" style="position: relative;top: 5px;right: -10px;">
                  <label style="font-size: 14px;color:#000;font-weight:bold;
                position: absolute;left:5px;bottom: 4px;">
                    <span style="position: relative ;top:9px;left:1px;color:#fff">
                       {{policy.custInfo.appnt.appntSex == "1"?'男':''}}
                    </span>
                  </label>
                  <label style="font-size: 14px;color: #000;font-weight:bold;
                position: absolute;left:35px;bottom: 4px;">
                    <span style="position: relative ;top:9px;right:2px;color:#fff">
                     {{policy.custInfo.appnt.appntSex == "2"?'女':''}}
                      </span>
                  </label>
              </mt-switch>
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">出生日期</p>
                  <p class="right">
                    <date-picker v-model="policy.custInfo.appnt.appntBirthday"></date-picker>
                  </p>
              </li>
              <div style="background-color: #FFFFFF">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p>国籍</p>
                    <div style="direction:rtl;text-align:right;width:65%">
                      <picker :values="policy.custInfo.appnt.nativePlace" v-model="policy.custInfo.appnt.nativePlace" :items="dict.nationalList.national.item" code="code" text="text">
                      </picker>
                    </div>
                  <div>
                    <i class="fa fa-angle-down color" aria-hidden="true" style="font-size:20px;margin: 13px 0px 0px -27px;"></i>
                  </div>
              </li>
              <div style="background-color:#FFFFFF">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p >婚姻</p>
                    <div  style="direction:rtl;width:65%;text-align:right">
                      <picker :values="policy.custInfo.appnt.marriage" v-model="policy.custInfo.appnt.marriage" :items="dict.marriageList.marriage.item" code="code" text="text">
                      </picker>
                    </div>
                  <div >
                   <i class="fa fa-angle-down color" aria-hidden="true" style="font-size:20px;margin: 13px 0px 0px -27px;"></i>
                </div>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li id="adress"  @click="SelectAdress" >
                <div style="width:23%">联系地址</div>
                 <div v-show="policy.custInfo.appnt.province&&policy.custInfo.appnt.city&&policy.custInfo.appnt.county != null" style="width:90%;text-align:right;margin-right: -3px;">{{policy.custInfo.appnt.province|getProvinceText}}{{policy.custInfo.appnt.city|getCityText}}{{policy.custInfo.appnt.county}}</div>
                <div class="adress_text">
                  <i class="fa fa-angle-down color" style="font-size:20px;margin: 13px -5px 0px -27px;"></i>
                </div>
            </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
               <li class="nationality">
                <p class="left">镇/街道</p>
                <p class="right">
                  <input type="text" maxlength="150" v-model="policy.custInfo.appnt.street" placeholder="**街道" />
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
               <li class="nationality">
                <p class="left">村/社区</p>
                <p class="right">
                  <input type="text" maxlength="50" v-model="policy.custInfo.appnt.community" placeholder="**小区" />
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                 <p class="left">详细地址</p>
                <p class="right">
                  <input type="text" maxlength="200" v-model="policy.custInfo.appnt.postalAddress" placeholder="1号楼一单元101室" />
                  <i class="fa fa-microphone" aria-hidden="true" @click="speechRec(1)"></i>
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">邮政编码</p>
                <p class="right">
                  <input type="text" maxlength="6" v-model="policy.custInfo.appnt.zipCode" placeholder="请输入邮政编码" />
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">电子邮箱</p>
                <p class="right">
                  <input type="text" 
                  v-model="policy.custInfo.appnt.email" placeholder="用于接收电子保单" />
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">手机号码</p>
                <p class="right">
                  <input type="text" maxlength="11" v-model="policy.custInfo.appnt.mobile" placeholder="请录入投保人手机号码" />
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">职业</p>
                <p class="right over" style="text-align:right;" @click="occupationSearch(global_constant.constant.TAG_SEARCH_OCC_APPLICANT)" >
                  <span >{{policy.custInfo.appnt.appOccupation}}<i class="fa fa-angle-down color"></i></span>
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left ">工作单位/就读学校</p>
                <p class="right">
                  <input type="text"  v-model="policy.custInfo.appnt.grpName" placeholder="请输入工作单位/就读学校"/>
                </p>
             </li>
             <div style="background: #FFFFFF;">
               <hr class="dotted_line"></hr>
             </div>
             <li class="nationality" v-if="edition == '2'">
                 <p class="left">年收入</p>
                 <p class="right">
                  <input type="number" v-model="policy.custInfo.appnt.salary" placeholder="请输入投保人的年收入"/>
                  <b style="color:#FDB510;">万元</b>
                </p>
             </li>
               <div style="background: #FFFFFF;" v-if="edition == '2'">
               <hr class="dotted_line" v-if="edition == '2'"></hr>
             </div>
             <li class="nationality" v-if="edition == '1'">
                <p>居民类型</p>
                    <div  style="direction:rtl;width:60%;text-align:right">
                      <picker :values="policy.custInfo.appnt.residentType" v-model="policy.custInfo.appnt.residentType" :items="dict.liveList.live.item" code="code" text="text">
                      </picker>
                    </div>
                  <div >
                    <i class="toRight fa fa-chevron-right lh color" aria-hidden="true"></i>
                </div>
              </li>
              <div style="background: #FFFFFF;" v-if="edition == '1'">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality" v-if="edition == '1'">
                 <p class="left">投保人年收入</p>
                 <p class="right">
                  <input type="number"  v-model="policy.custInfo.appnt.salary" placeholder="请输入投保人的年收入"/>
                  <b style="color:#FDB510;">万元</b>
                </p>
             </li>
               <div style="background: #FFFFFF;" v-if="edition == '1'">
               <hr class="dotted_line" v-if="edition == '1'"></hr>
             </div>
             <li class="nationality" v-if="edition == '1'">
                 <p class="left">家庭年收入</p>
                 <p class="right">
                  <input type="number"  v-model="policy.custInfo.appnt.familySalay" placeholder="请输入家庭年收入"/>
                  <b style="color:#FDB510;">万元</b>
                </p>
             </li>
               <div style="background: #FFFFFF;" v-if="edition == '1'">
               <hr class="dotted_line" v-if="edition == '1'"></hr>
             </div>
              <li class="nationality" v-if="edition == '1'">
                 <p class="left">投保人保费预算</p>
                 <p class="right">
                  <input type="number"  v-model="policy.custInfo.appnt.premBudget" placeholder="请输入投保人保费预算"/>
                  <b style="color:#FDB510;">万元</b>
                </p>
             </li>
               <div style="background: #FFFFFF;" v-if="edition == '1'">
               <hr class="dotted_line" v-if="edition == '1'"></hr>
             </div>
            </ul>
          </div>
          <div class="split"></div>
          <div class="item_title_person nationality" style="overflow:hidden;">
            <p  style="color:#FDB102;padding-left:10px;">
              <span>个人税收居民身份声明</span>
            </p>
            <p> <i class="fa fa-question-circle-o"
              style="color:#FDB102;font-size:24px;"
               @click="showHint"></i></p>
               <p  style="text-align: right;padding-right: 20px;">
              <i class="fa fa-angle-double-up" @click="toggle.revenueInfoOpen = !toggle.revenueInfoOpen" :style="{'-webkit-transform':toggle.revenueInfoOpen?'rotate(180deg)':''}" style="color: #FEB101;font-size: 25px;"></i>
               </p>
          </div>
          <div class="radio-content" v-show="toggle.revenueInfoOpen">
             <ul>
               <li class="radio-item">
                 <p  @change="handleCheck">
                   <input type="radio" name="inmate"
                   class="inmate"
                   v-model="inmateType"
                    value="china"
                   />仅为中国居民
                   </p>
                  <p   @change="handleCheck"
									style="flex: 0 0 120px;">
                    <input type="radio"
                    class="inmate"
                    v-model="inmateType"
                    value="chinas"
                    name="inmate"/>
                    仅为非居民</p>
               </li>
                 <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
               <li class="radio-item">
                 <p  @change="handleCheck"
								 style="overflow:hidden;
								 text-overflow:ellipsis;
						 		white-space: nowrap;">
                   <input type="radio"
                   v-model="inmateType"
                    class="inmate"
                    value="chinese"
                    name="inmate"/>
                   既是中国税收居民又是其他国家税收居民
                   </p>
               </li>
                 <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                 <div v-show="showDetail">
              <li class="radio-item "  style="display:flex">
                 <p>
                   <span>出生地:</span>
                 </p>
                 <p  >
                  <picker
                  	v-model="policy.custInfo.appnt.appntTaxInfo.birthCountry"
                    :values="policy.custInfo.appnt.appntTaxInfo.birthCountry"
                  	:items="dict.nationalList.national.item"
                    :default-text="'请输入国籍'"
                    code="code" text="text">
                  </picker>
                 </p>
               </li >
                <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                </div>
                <li class="radio-item " >
                   <p>
                   <span>省份:</span>
                 </p>
                   <p >
                     <input type="text"
                     	v-model="policy.custInfo.appnt.appntTaxInfo.birthProvince"
                     	placeholder="请输入省份">
                   </p>
               </li>
                 <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                <li class="radio-item" >
                  <p>
                   <span>市区:</span>
                 </p>
                 <p  >
                     <input type="text"
                     	v-model="policy.custInfo.appnt.appntTaxInfo.birthCity"
                     	placeholder="请输入市区">
                   </p>
               </li>
                 </div>
             </ul>
             <ul v-show="showDetail">
                 <div v-for="(item,index) in policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo">
                    <li
                    style="background: #F0F0F0;
                    border-bottom: 1px solid #94918C;
                    border-top: 1px solid #94918C;
                    display:flex;
										justify-content: space-between;
                    height:42px;
                    line-height:42px;
                    padding-left:15px;">
                  <p>
                   	 税收信息
                  </p>
                  <p style="text-align:right;">
                    <i class="fa fa-close" style="margin-right:30px;color: #FEB101;line-height: 40px;font-size: 18px;"
                    v-show="policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.length > 1"
                    @click="removeRevenue(index)"></i>
                  </p>
                </li>
                    <li class="radio-item">
                 <p style="flex: 0 0 140px">
                   <span>税收居民国(地区):</span>
                 </p>
                 <p>
                  <picker 
                    :values="item.taxArea"
                  	v-model="item.taxArea"
                  	:items="dict.nationalList.national.item"
                    :default-text="'税收居民国'"
                    code="code" text="text">
                  </picker>
                 </p>
               </li>
                 <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                <li class="radio-item">
                  <p style="flex: 0 0 140px">
										  <span>纳税人识别号TIN:</span>
									</p>
									<p>
										<input type="text"
										 v-model="item.tin"
										 placeholder="请输入"/>
									</p>
               </li>
                 <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                <li class="radio-text">
                  <span>若无法提供纳税人识别号,请选择原因A或者B</span>
               </li>
                 <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                <li class="radio-list" style="display:flex">
                  <p style="padding-left:4%" @change="handleCheckAB(1,index)">
                  	<input type="checkbox" 
                      :id="index+'checkboxA'"
                      value="A"
                      />A</p>
                  <p style="padding-left:10%" @change="handleCheckAB(2,index)">
                  	<input type="checkbox" 
                      :id="index+'checkboxB'"
                      value="B"
                      />B</p>
                  <p style="padding-left:10%">
                  	<input type="text"
                      maxlength="150"
                  		v-model="item.reasonMessage"
						          placeholder="请输入原因">
                  </p>
               </li>
                 </div>
                 <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                <li v-show="policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.length < 5"
             style="text-align: center;color: #FFB829; background: #FFFFFF;height:50px;line-height:50px;"
             @click="addRevenue">+添加纳税信息</li>
               <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                <li class="radio-depict" >
                   ★原因A:居民国(地区)不发放纳税人识别号
               </li>
                 <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
               <li class="radio-depict">
                   ★原因B:账户持有人未能取得纳税人识别号
               </li>
                 <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
             </ul>
          </div>
          <div class="item_title">
            <p class="left"><span>被保险人信息</span></p>
            <p class="right">
              <i class="fa fa-angle-double-up" :style="{'-webkit-transform':toggle.insuredInfoOpen?'rotate(180deg)':''}" @click="toggle.insuredInfoOpen = !toggle.insuredInfoOpen"></i>
            </p>
          </div>
          <div class="content" >
            <ul>
             <!--姓名-->
            
              <!--证件类型-->
              <li class="nationality">
                <p class="left" style="width:41%;">投保人与被保险人关系</p>
                <div  style="width:49%;display:flex;height:100%;align-items: center" >
                <div v-if="loadPicker&&relToAppDesc" class="picker" style="width:50%">
                  <picker 
                  @change="changeInsurantRelToApp"
                :values="policy.custInfo.insurants.insurant[0].relToApp" 
                 v-model="policy.custInfo.insurants.insurant[0].relToApp" 
                :items="dict.relationBenefitList.relation.item" 
                code="code" text="text">
                </picker>
                </div>
               <div v-if="relToAppDesc&&policy.custInfo.insurants.insurant[0].relToApp =='30'" style="width:50%;text-align:right">({{policy.custInfo.insurants.insurant[0].relToAppDesc}})</div >
              </div>
              <div style="width:10%;text-align:right;padding-right:15px;">
                <i class="fa fa-angle-down color" style="font-size:20px;"></i>
              </div>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
            </ul>
            <ul v-show="toggle.insuredInfoOpen && !toggle.hintInsurant">
              <li class="nationality">
                <p class="left">姓名</p>
                <p class="right">
                  <input v-model="policy.custInfo.insurants.insurant[0].name" type="text" name="policyholdername" placeholder="">
                  <i class="fa fa-search" @click="customerSearch(global_constant.constant.TAG_SEARCH_CUS_INSURE)"></i>
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p style="width:38%">证件类型</p>
                  <div style="width:69%"  class="picker">
                     <picker v-if="loadPicker"
                     v-model="policy.custInfo.insurants.insurant[0].idType"
                     :items="dict.cardTypeList.dict_cardtype.item"
                     :values="policy.custInfo.insurants.insurant[0].idType"
                     code="code" text="text"></picker>
                  </div>
                 <div  style="flex:0 0 34px">
                  <i class="fa fa-angle-down color" style="font-size:20px;margin: 10px 0px 0px 5px;"></i>
                   <!-- <i class="fa fa-camera-retro color" @click="cardScanning(global_constant.constant.TAG_SEARCH_CUS_INSURE)" style="    margin-left: 10px;"></i> -->
                 </div>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <!--证件号码-->
              <li class="nationality">
                <p class="left">证件号码</p>
                <p class="right">
                  <input v-model="policy.custInfo.insurants.insurant[0].idNo" type="text" name="policyholdername" placeholder="请输入证件号码">
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <!--证件有效期-->
                <li  class="validity">
                <div >证件有效止期</div>
                <div >
                    <p>
                  <input class="checkbox"
                    v-model="insuredIsCheckeds"
                    @change="handleChangeValidity(0)"
                   type="checkbox"/>
                  <span>长期有效</span>
                </p>
                  <p  v-show="!insuredIsCheckeds">
                    <!-- @change="changePickers" -->
                     <date-picker 
                      v-model="policy.custInfo.insurants.insurant[0].idExpDate">
                  </date-picker>
                  </p>
                </div>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <!--性别-->
              <li class="nationality">
                <p class="left">性别</p>
                <p class="right">
                  <mt-switch  @change="handleChange(0)"
                  v-model="toggle.insuredSexChoice" style="position: relative;top: 5px;right: -10px;">
                  <label style="font-size: 14px;color:#000;font-weight:bold;
                position: absolute;left:5px;bottom: 4px;">
                    <span style="position: relative ;top:9px;left:1px;color:#fff">
                       {{policy.custInfo.insurants.insurant[0].sex == "1"?'男':''}}
                    </span>
                  </label>
                  <label style="font-size: 14px;color: #000;font-weight:bold;
                position: absolute;left:35px;bottom: 4px;">
                    <span style="position: relative ;top:9px;right:2px;color:#fff">
                     {{policy.custInfo.insurants.insurant[0].sex == "2"?'女':''}}
                      </span>
                  </label>
              </mt-switch>
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">出生日期</p>
                <p class="right">
                  <date-picker
                    v-model="policy.custInfo.insurants.insurant[0].birthday">
                  </date-picker>
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">国籍</p>
                  <div style="width:60%;text-align:right">
                    <div style="direction:rtl;">
                      <picker 
                          :values="policy.custInfo.insurants.insurant[0].nativePlace" 
                          v-model="policy.custInfo.insurants.insurant[0].nativePlace"
                          :items="dict.nationalList.national.item"
                          code="code" text="text">
                      </picker>
                    </div>
                  </div>
                  <div>
                     <i class="fa fa-angle-down color" aria-hidden="true" style="font-size:20px;margin: 13px 0px 0px -27px;"></i>
                  </div>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">婚姻</p>
                  <div style="width:60%;text-align:right">
                    <div style="direction:rtl;display:inline-block;width: 83%;">
                      <picker :values="policy.custInfo.insurants.insurant[0].marriage" v-model="policy.custInfo.insurants.insurant[0].marriage" :items="dict.marriageList.marriage.item" code="code" text="text">
                      </picker>
                    </div>
                  </div>
                   <div>
                      <i class="fa fa-angle-down color" aria-hidden="true" style="font-size:20px;margin: 13px 0px 0px -27px;"></i>
                   </div>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li id="adress" @click="selectInsurants">
                <div style="width:20%">联系地址</div>
                 <div v-show="policy.custInfo.insurants.insurant[0].province&&policy.custInfo.insurants.insurant[0].city&&policy.custInfo.insurants.insurant[0].county != null" style="width:70%;text-align:right;">{{policy.custInfo.insurants.insurant[0].province|getProvinceText}}{{policy.custInfo.insurants.insurant[0].city|getCityText}}{{policy.custInfo.insurants.insurant[0].county}}</div>
                  <div class="adress_text">
                    <i class="fa fa-angle-down color" style="font-size:20px;margin: 13px -5px 0px -27px;"></i>
                  </div>
                </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
               <li class="nationality">
                <p class="left">镇/街道</p>
                <p class="right">
                  <input type="text" maxlength="150" v-model="policy.custInfo.insurants.insurant[0].street" placeholder="**街道" />
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
               <li class="nationality">
                <p class="left">村/社区</p>
                <p class="right">
                  <input type="text" maxlength="50" v-model="policy.custInfo.insurants.insurant[0].community" placeholder="**小区" />
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
                <li class="nationality">
                <p class="left">详细地址</p>
                <p class="right">
                  <input type="text" maxlength="200" v-model="policy.custInfo.insurants.insurant[0].postalAddress" placeholder="1号楼一单元101室" />
                  <i class="fa fa-microphone" aria-hidden="true" @click="speechRec(2)"></i>
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
               <li class="nationality">
                <p class="left">邮政编码</p>
                <p class="right">
                  <input type="text" maxlength="6" v-model="policy.custInfo.insurants.insurant[0].zipCode" placeholder="请输入邮政编码" />
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality" v-if="edition == '1'">
                <p class="left">电子邮箱</p>
                <p class="right">
                  <input type="text" v-model="policy.custInfo.insurants.insurant[0].email" placeholder="请输入电子邮箱" />
                </p>
              </li>
              <div style="background: #FFFFFF;" v-if="edition == '1'">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">手机号码</p>
                <p class="right">
                  <input id="insMobileBtn" v-model="policy.custInfo.insurants.insurant[0].mobile" maxlength="11" type="text" placeholder="请录入被保险人手机号码" />
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">职业</p>
                <p class="right over" style="text-align:right;" @click="occupationSearch(global_constant.constant.TAG_SEARCH_OCC_INSURE)" >
                  <span >{{policy.custInfo.insurants.insurant[0].insOccupation}}<i class="fa fa-angle-down color"></i></span>
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">工作单位/就读学校</p>
                <p class="right" style="width:57%;text-align:right;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                  <input id="insGrpNameBtn" type="text" v-model="policy.custInfo.insurants.insurant[0].grpName" placeholder="请输入工作单位/就读学校"  />
                </p>
              </li>
              <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
              </div>
              <li class="nationality">
                <p class="left">年收入</p>
                <p class="right" style="text-align: right;">
                  <input type="number" v-model="policy.custInfo.insurants.insurant[0].salary" placeholder="请输入被保险人的年收入" style="width:75%" />
                  <b style="color:#FDB510;">万元</b>
                </p>
              </li>
            </ul>
          </div>
          <!-- <div style="background: #FFFFFF;">
                <hr class="dotted_line"></hr>
            </div> -->
          
          <div class="split"></div>
          <div class="item_title_person" style="line-height:40x;">
            <p class="left" style="flex:0 0 250px">
              <span>身故受益人信息</span>
              <span style="color: #999;">是否为法定受益人</span>
            </p>
            <p class="right" >
              <mt-switch @change="handleChangeBnfType" v-model="toggle.bnfType" style="position: relative;top: 5px;right: -10px;">
                  <label style="color:#000;font-weight:bold;
                position: absolute;left:5px;bottom: 4px;">
                    <span style="font-size: 12px;position: relative ;top:9px;left:0px;color:#fff">是</span>
                  </label>
                  <label style="font-size: 12px;color: #000;font-weight:bold;
                position: absolute;left:35px;bottom: 4px;">
                    <span style="position: relative ;top:9px;left:0px;color:#fff">否</span>
                  </label>
              </mt-switch>
            </p>
          </div>
          <div class="split"></div>
          <!-- 添加指定受益人开始 -->
          <div class="bnfInfo-wrapper" v-if="!toggle.bnfType">
               <ul v-for="(item,index) in policy.custInfo.bnfInfo.beneficiaries.beneficiary">
                <li  class="designated-recipient">
                  <p style="width:40%">
                    指定受益人
                  </p>
                  <div  class="item_title_relation">
                    <div style="flex:0 0 80px">被保人</div>
                       <div    style="overflow:hidden">
                          <picker 
                              :values="item.belongWith"
                              v-model="item.belongWith"
                              :default-text="'请选择关系'"
                              :items="dict.belongWithList" 
                              code="code" text="text">
                            </picker>
                          </div>
                  </div>
                  <p style="text-align:right;width:5%"
                  class="right">
                    <i v-if="policy.custInfo.bnfInfo.beneficiaries.bnfCount >1" 
                      class="fa fa-close" style="margin-right:30px;" @click="removeBnf(index)"></i>
                    <!-- <i class="fa fa-angle-double-down" :style="{'-webkit-transform':item.isShow?'rotate(180deg)':''}" @click="item.isShow = !item.isShow"></i> -->
                  </p>
                </li> 
                <!-- <div v-show="item.isShow"> -->
                  <li style="display:flex;justify-content: space-between;">
                    <p  style="width:30%">与被保险人关系</p>
                    <div  style="width:50%;over-flow:hidden">
                      <div style="display:flex;height:100%;">
                            <div v-if="item.is_show"  style="width:50%" class="picker">
                              <picker 
                              @change="relToIns(item,index)"
                              v-model="item.relToIns"
                              :default-text="'请选择关系'"
                              :items="dict.relationBenefitList.relation.item" code="code" text="text"></picker>
                            </div>
                            <div  style="width:50%;text-align:right" v-if="item.is_show &&item.relToInsDesc!=''&&item.relToIns == '30'">({{item.relToInsDesc}}) <span style="font-size:0;">{{is_show_number}}</span></div>
                        </div>
                      </div>
                      <div>
                          <i  class="toRight fa fa-chevron-right color" aria-hidden="true"></i>
                    </div>
                  </li>
                  <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                  <li class="nationality">
                    <p class="left">姓名</p>
                    <p class="right">
                      <input v-model="item.bfcyName" type="text" name="policyholdername" placeholder="">
                      <i class="fa fa-search color" @click="customerSearch(global_constant.constant.TAG_SEARCH_CUS_BNF,index)"></i>
                    </p>
                  </li>
                  <div style="background:#FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                    <li style="display:flex;justify-content: space-between;">
                        <p style="width:20%">证件类型</p>
                      <div style="width:69%;"  class="picker">
                      <picker style="overflow:hidden;"
                       v-model="item.bfcyIdType" :items="dict.cardTypeList.dict_cardtype.item"code="code":values="item.bfcyIdType"text="text"></picker>
                    </div>
                 <div  style="flex:0 0 62px;">
                  <i class="fa fa-angle-down color" aria-hidden="true" style="font-size: 20px;margin: 13px 5px 0px 10px;"></i>
                   <i class="fa fa-camera-retro color" style="font-size:18px;" @click="cardScanning(global_constant.constant.TAG_SEARCH_CUS_BNF,index)"></i>
                 </div>
                 </li>
                  <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                  <li class="nationality">
                    <p class="left">证件号码</p>
                    <input v-model="item.bfcyIdCode" type="text" name="policyholdername" placeholder="请输入证件号码" style="width:70%;text-align:right;padding-right:15px">
                  </li>
                  <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                <li  class="validity">
                <div>证件有效止期</div>
                <div>
                    <p>
                  <input class="checkbox"
                    v-model="item.bfcyIsLong"
                    @change="bfcyChanges(item,index)"
                  type="checkbox"/>
                  <span>长期有效</span>
                </p >
                <p v-show="!item.bfcyIsLong">
                  <date-picker 
                    v-model="item.bfcyIdExpDate">
                  </date-picker>
                  </p>
                </div>
              </li>
                  <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                  <li class="nationality">
                      <p class="left">性别</p>
                     <p class="right">
                  <mt-switch v-model="item.sexChoice"
                             @change="handleChange(2,index)"
                             style="position: relative;top: 5px;right: -10px;">
                    <label style="position: absolute;
                    right: 43px;bottom: -5px;
                    font-size: 14px;color: #FFF;font-weight:bold;">
                     <span> {{item.bfcySex == "1"?'男':''}}</span>
                    </label>
                    <label style="position: absolute;right: 15px;bottom: -5px;
                    font-size: 14px;font-weight:bold;color: #fff;">
                      <span>{{item.bfcySex == "2"?'女':''}}</span>
                    </label>
                  </mt-switch>
                </p>
                  </li>
                  <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                  <li class="nationality">
                    <p class="left">出生日期</p>
                      <p class="right">
                        <date-picker v-model="item.bfcyBirthday"></date-picker>
                      </p>
                  </li>
                <div style="background-color: #FFFFFF;" v-if="false">
                  <hr class="dotted_line"></hr>
                </div>
                <li v-if="false">
                  <p class="left" style="width:22%">手机号码</p>
                  <input style="width:70%;text-align:right;" v-model="item.phone" maxlength="11" type="text" name="policyholdername" placeholder="
                  请输入手机号码">
                </li>
                <div style="background: #FFFFFF;" v-if="false">
                  <hr class="dotted_line"></hr>
                </div>
               <li id="adress-copy" v-if="false">
                <div>联系地址</div>
                <div class="adress-wrapper">
                  <p class="adress_1" >
                    <span style="text-align:center;padding-right:30px;">省</span>
                    <picker 
                        style="float:right"
                        :values="item.province"
                        v-model="item.province" 
                        :items="dict.provinceList.province.item"
                        code="code" text="text">
                      <i class="fa fa-chevron-down color"></i>
                    </picker>
                  </p>
                  <p class="adress_1" v-if="false">
                    <span style="text-align:center;padding-right:30px;">市</span>
                    <picker 
                        :values="item.city"
                        v-model="item.city" 
                        :items="temp.currentInsuredCiytList.city.item" 
                        code="code" text="text">
                    </picker>
                    <i class="fa fa-chevron-down color">市</i>
                  </p>
                </div>
                <p class="adress_2" v-if="false">
                  <span>详细地址</span>
                  <input v-model="item.postalAddress" type="text" placeholder="请输入详细地址">
                </p>
              </li>
              <div style="background: #FFFFFF;" v-if="false">
                <hr class="dotted_line"></hr>
              </div>
                 <li v-if="false">
                <p class="left">职业</p>
                <p class="right over" style="text-align:right;" >
                  <span @click="occupationSearch(global_constant.constant.TAG_SEARCH_OCC_INSURE)">{{policy.custInfo.insurants.insurant[0].insOccupation}}<i class="fa fa-chevron-right color"></i></span>
                </p>
                </li>
                  <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                  <li class="nationality">
                    <p class="left" style="width:22%">受益顺序</p>
                    <input style="width:70%;text-align:right;padding-right:15px" v-model="item.bfcyLevel" type="text" name="policyholdername" placeholder="
                    请填写受益顺序">
                  </li>
                  <div style="background: #FFFFFF;">
                    <hr class="dotted_line"></hr>
                  </div>
                  <li class="nationality">
                    <p class="left" style="width:22%">受益比例</p>
                    <input style="width:70%;text-align:right;padding-right:15px" v-model="item.bfcyRatio" type="text" name="policyholdername" placeholder="请填写受益比例">
                  </li>
                <!-- </div> -->
                <div style="background: #FFFFFF;">
                  <hr class="dotted_line"></hr>
                </div>
              </ul>
            <li v-show="policy.custInfo.bnfInfo.beneficiaries.bnfCount < 12"
            style="text-align: center;color: #FFB829; background: #FFFFFF;height:50px;line-height:50px;"
            @click="addBnfInfo">+添加指定受益人
            </li>
          </div>
          <!-- 添加指定受益人结束 -->
          <div class="split"></div>
          <div class="item_title_person">
            <p class="left">
              <span>险种信息</span>
            </p>
            <p class="right" style="text-align: right;padding-right: 20px;">
              <i class="fa fa-angle-double-up" @click="toggle.productInfoOpen = !toggle.productInfoOpen" :style="{'-webkit-transform':toggle.productInfoOpen?'rotate(180deg)':''}" style="color: #FEB101;font-size: 25px;"></i>
            </p>
          </div>
          <div class="content" v-show="toggle.productInfoOpen">
            <ul v-for="(item,index) in temp.policy.productInfo.products.product">
              <li>
                <p class="left" style="width:100%;margin-right:20px;overflow:hidden">{{item.prodName}}</p>
              </li>
              <div style="background: #FFFFFF; ">
                <hr class="dotted_line "></hr>
              </div>
              <li class="nationality">
                <p class="left" >交费方式</p>
                <p class="right">
                  {{item.payIntvName}}
                </p>
              </li>
              <div style="background: #FFFFFF; ">
                <hr class="dotted_line "></hr>
              </div>
              <li class="nationality">
                <p class="left" >保险期间</p>
                <p class="right">
                  {{item.insureYearName}}
                </p>
              </li>
              <div style="background: #FFFFFF; ">
                <hr class="dotted_line "></hr>
              </div>
              <li class="nationality">
                <p class="left" >交费期间</p>
                <p class="right">
                  {{item.payYearName|getExempt(temp.policy.productInfo.products.product,item.payYearName)}}
                </p>
              </li>
              <div style="background: #FFFFFF; ">
                <hr class="dotted_line "></hr>
              </div>
              <li class="nationality">
                <p class="left" >基本保险金额</p>
                <p class="right">
                  {{item.amnt}}
                </p>
              </li>
              <div style="background: #FFFFFF; ">
                <hr class="dotted_line "></hr>
              </div>
            </ul>
          </div>
          <div class="split"></div>
          <div class="item_title_person">
            <p class="left" >
              <span>支付信息</span>
            </p>
            <p class="right" style="text-align: right;padding-right: 10px;">
            </p>
          </div>
          <div class="content " >
            <ul>
              <li class="nationality">
                <p class="left" style="flex: 0 0 75px;margin-right:20px;">账号姓名</p>
                <p class="right">
                  <input v-model="policy.productInfo.bankAccName" type="text " name="policyholdername " placeholder=" " readonly>
                </p>
              </li>
              <div style="background: #FFFFFF; ">
                <hr class="dotted_line "></hr>
              </div>
              <li  class="nationality">
                <p style="flex: 0 0 75px;">转账银行</p>
                <div  style="text-align:right;padding-right:10px">
                    <div style="display:inline-block;width: 80%;padding-left:5px;line-height:30px;direction:rtl;">
                     <picker 
                        :values="policy.productInfo.bankCode" 
                        v-model="policy.productInfo.bankCode" 
                        :items="dict.bankList.bank.item" 
                        code="code" text="text">
                     </picker>
                    </div>
                   <i class="fa fa-angle-down color" style="font-size:20px;margin: 13px 0px 0px 5px;"></i>&nbsp;
                </div>
              </li>
              <div style="background: #FFFFFF; ">
                <hr class="dotted_line "></hr>
              </div>
              <li class="nationality">
                <p  style="flex: 0 0 75px;">授权卡号</p>
                <p >
                  <input v-model="policy.productInfo.bankAccNo"
                   style="text-align:right;padding-right:10px;"
                  type="text " name="policyholdername " placeholder="请输入银行卡号" maxlength="20" >
                </p>
              </li>
              <div style="background: #FFFFFF; ">
                <hr class="dotted_line "></hr>
              </div>
              <li style="text-align: center;color: #FFB829; background: #F0F0F0;">温馨提示 : 该银行的支付限额为{{policy.productInfo.bankRemark}}万元!</li>
            </ul>
          </div>
        </div>
         </v-touch> 
      </div>
      <prompt ref="btn" @detonate="detonate" :number=" promptNumber"></prompt>
      <prompt ref="btns" @detonates="detonates" :number=" promptNumber"></prompt>
      <alert ref="alert"></alert>
      <mt-actionsheet
				:actions="actions"
				v-model="sheetVisible">
			</mt-actionsheet>
      <Footerbtns :is_show=true :total_premium=current_total_premium>
        <div slot="right" @click="next">
          下一步
        </div>
      </Footerbtns>
    </div>
	</div>
  
</template>

<!--js-->
<script>
	import { MessageBox } from 'mint-ui'
  import { Actionsheet } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import Footerbtns from '../policy/common/Footer.vue'
  import OccupationSearch from '../common/OccupationSearch.vue'
  import CustomerSearch from '../common/CustomerSearch.vue'
  import datePicker from '../common/DatePicker.vue'
  import picker from '../common/Picker.vue'
  import IDCardScanning from '../common/IDCardScanning.vue'
  import prompt from '../policy/common/prompt.vue'
  import SelectArea from '../policy/common/SelectArea.vue'
  import alert from '../policy/common/alert.vue'

	import '../policy/css/customer_details_page.css'
	import '../../../static/css/policy/content.css'

	import cardTypeList from '../../assets/dict/card_type_sunlife.json'
	import nationalList from '../../assets/dict/national_sunlife.json'
	import relationList from '../../assets/dict/relation_sunlife.json'
  import relationBenefitList from '../../../static/dict/relation_benefit.json'
  import global_constant from '../../assets/data/global_constant.json'
  import provinceList from '../../../static/dict/province_sunlife.json'
  import cityList from '../../../static/dict/city_sunlife.json'
  import bankList from '../../../static/dict/bank_sunlife.json'
  import residentList from '../../../static/dict/resident_sunlife.json'
  import marriageList from '../../../static/dict/marriage_sunlife.json'
  import liveList from '../../../static/dict/live_sunlife.json'
	export default{
		name:'policy_list',
  		components: {Headerbtns,Footerbtns,OccupationSearch,CustomerSearch,
        datePicker,picker,IDCardScanning,prompt,Actionsheet,SelectArea,alert},
  		props: {
		},
		data () {
	    return {
        bfcySortNum:0,
        edition: utils.cache.get('personsal').edition,
        is_show_number:0,
        isHaveAppInform:false,
        sheetVisible:false,
        relToInsDesc:true,
        isPicker:true,
        close:{},
        relToAppDesc:true,
        promptNumber:0,
        obj:{
                isOpen:false,
                 selectNumber:0,
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
        isChecked:null,
        loadPicker:true,
        showDetail:false,
        inmateType:"china",
        SelectArea:{
          isOpen:false,
          isOpens:false,
          isToggle:false,
          isToggles:false
        },
        isShowPicker:true,
        isCheckeds:null,
        appntIsCheckeds:false,
        insuredIsCheckeds:false,
        // showCheckeds:true,
        isShowPickers:true,
        isCheckedl:null,
        // showCheckedl:true,
        isShowPickerl:true,
        global_constant:global_constant,
        loading:false,
        optionsValue:'',
        loadComplete:false,//数据获取完毕
        loadFinish:false,
        yes_or_no:false,
        occupationValue:{
          isopen:false,
          type:'',
          occItem:''
        },
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
	    	toggle:{
          hintInsurant:false,//是否隐藏被保人信息
          appntSexChoice:true,//投保人性别
          insuredSexChoice:true,//被保人性别
          insuredInfoOpen:true,//被保人信息视图是否显示
          revenueInfoOpen:true,
	    		applicantInfoOpen:true,//投保人信息视图是否显示
	    		productInfoOpen:true,//险种信息视图是否显示
          bnfType:true,//是否为法定受益人
	    	},
	    	dict:{
	    		belongWithList:[],
	    		nationalList:nationalList,
	    		cardTypeList:cardTypeList,
	    		relationList:relationList,
          relationBenefitList:relationBenefitList,
          provinceList:provinceList,
          cityList:cityList,
          bankList:bankList,
          residentList:residentList,
          marriageList:marriageList,
          liveList:liveList,
	    	},
        temp:{
          currentInsuredCiytList:{
            city:{
              item:[]
            }
          },
          currentAppntCiytList:{
            city:{
              item:[]
            }
          },
          policy:{
            productInfo:{
              prodCount:"",
              products:{
                product:[
                  {
                    isMaster:"",//主附加险标识
                    prodInsSeq:"",//被保险人序号
                    prodName:"",//险种名称
                    prodCode:"",//险种code
                    payYear:"",//交费期限
                    payYearFlag:"",//交费期限标识A-岁；Y-年
                    insureYear:"",//保险期间
                    insureYearFlag:"",//保险期间标识A-岁；Y-年
                    minPlanPrem:"",//最低保费
                    amnt:"",//保额
                    prem:"",//保费
                  }
                ]
              }
            }
          }
        },
	    	page_title:'详细信息',
	    	quota:'10000.00',
	    	current_next_step_name:'下一步',
	    	current_total_premium:'???',
	    	policy:{
          deviceNo: "",
          channel: utils.cache.get('personsal').channel,
          substepNo: "3",
          isInsert: "",
          agentCode: utils.cache.get('personsal').agentCode,
          orderCode: this.$route.params.planId,
          custInfo:{
            appnt:{
              appntName: "", //姓名
              idType: "11", //证件类型
              idNo: "", //证件号码
              idExpDate: "", //证件有效期
              nativePlace: "CHN", //国籍
              marriage:"",//婚姻
              appntSex: "1", //性别
              appntBirthday: "", //生日
              province: null,//省
              city: null,//市
              county:null,//区县
              street:"",
              community:"",
              postalAddress: "", //详细地址
              zipCode:"",//邮政编码
              email: "", //邮件
              mobile: "", //手机号
              appOccupation: "",//职业描述
              occupationType: "",//职业等级
              occupationCode: "",//职业code
              grpName: "", //工作单位
              salary: "",//年收入
              appntSign: "",//投保人签字备用
              appResFlag: "",//告知事项询问结果
              zipCode: "",//邮编
              familySalay: "",//家庭年收入
              premBudget: "",//保费预算
              appntCopy: "1",//投保人抄录内容--备用
              residentType: "",//居住类型
              appntTaxInfo: {
                  taxIdentity: "1", //税收居民身份
                  birthCountry: "", //出生地国家
                  birthProvince: "", //出生地省
                  birthCity: "", //出生地市
                  taxInfoList: {
                      taxInfo: [
                          {
                              taxArea: "", //税收居民国(地区)
                              tin: "", //居民国(地区)纳税人编号
                              reasonCheck: "", //无法提供纳税人编号原因
                              reasonMessage: "" //原因描述
                          }
                      ]
                  }
              }
            },
            insurants:{
              insCount:"1",
              insurant:[{
                insSeq: "1",
                name: "", //姓名
                idType: "11", //证件类型
                idNo: "", //证件号码
                idExpDate: "", //证件有效期
                nativePlace: "CHN", //国籍
                marriage:"",//婚姻
                sex: "0", //性别
                county:"",//区县
                street:"",
                community:"",
                birthday: "", //生日
                province: "", //省
                city: "", //市
                postalAddress: "", //详细地址
                zipCode:"",//邮政编码
                email: "", //邮箱
                mobile: "", //手机号
                insOccupation: "", // 职业描述
                occupationType: "", //职业等级
                occupationCode: "", //职业code
                relToApp: "", //与投保人关系
                grpName: "", //工作单位
                salary: "",//年收入
                insSign: "",//被保人签字--备用
                insResFlag: "",//告知事项询问结果
                insurantTaxInfo: {
                    taxIdentity: "1",
                    birthCountry: "",
                    birthProvince: "",
                    birthCity: "",
                    taxInfoList: {
                        taxInfo: [
                            {
                                taxArea: "",
                                tin: "",
                                reasonCheck: "",
                                reasonMessage: ""
                            }
                        ]
                    }
                  }
                }
              ]
            },
            bnfInfo:{//受益人节点
              bnfType: "0",//受益人类型,0-法定；1-指定
              bfcyRemark: "",//备注信息
              beneficiaries: {
                  bnfCount: "0",//受益人个数
                  beneficiary: [

                  ]
              }
            },
          revenueInfo:{
             bnfType: "0",//受益人类型,0-法定；1-指定
              bfcyRemark: "",//备注信息
              beneficiaries: {
                  bnfCount: "0",//税收人个数
                  beneficiary: []
              }
            },
          },
	    		relation:{
	    			code:"",//关系code
	    			desc:""//关系描述
	    		},
          productInfo:{
            newPayMode:"",//首期交费方式
            sumPremL:"",//首期保险费合计（小写）
            planSumPremL :"",//续期计划保险费合计（小写）金额
            payIntv:"",//交费频率
            bankCode:"",//银行代码
            bankAccNo:"",//银行账号（投保人）
            bankAccName:"",//银行扣款户名
            bankRemark:"",//银行限额
            bonusGetMode:"",//红利领取方式
            rnewFlag:"",//自动续保
            getYear:"",//年金领取年龄
            getDutyKind:"",//年金领取频率
            getYears:"",//年金领取方式
            getYearsMQ:"",//满期金领取方式
            autoPayFlag:"",//逾期未付选择权
          },
	    	},
        proposalPlan:{
          checkType:'2',
          planId:'',
          holder:{
            "name": "",
            "desc":"",
            "level":"",
            "profession": "",
            "sex": "0",
            "birthday": ""
          },
          insurantProductList:[{
            insurant:{
              "birthday": "",
              "desc":"",
              "level":"",
              "name": "",
              "profession": "",
              "sex": "0"
            },
            productList:[{
              "productCode": '',
              "productName": '',
              "payMode": "",
              "drawFreq":"",
              "drawAge":"",
              "payModeName": "",
              "payPeriod": "",
              "payPeriodName": "",
              "policyPeriod": "",
              "policyPeriodName": "",
              "amount": "",
              "premium": "5000.00",
              "premiumDes":'',
              "rank": "",
              "piece": "",
              extraList:[]
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
        },
        huomian:''
	    }
	  },
	  beforeMount(){
      this.getProductDef((productDefList)=>{
        console.log(productDefList)
        this.getPolicyMsg(productDefList)
      })
	  },
    beforeDestroy () {
      if(this.proposalPlan.insurantProductList.length>0){
        if(this.proposalPlan.insurantProductList.productList>0){
          if(this.proposalPlan.insurantProductList.productList[0].productCode!=""){
            utils.cache.set('proposalPlan',this.proposalPlan)
          }
        }
      }
    },
	  mounted(){
	  	window.localStorage.removeItem('addManage')
	  	window.localStorage.removeItem('editList')
    },
    computed:{
      computeaAppntAdress(){
        if(this.policy.custInfo.appnt.province == null ||this.policy.custInfo.appnt.city == null || this.policy.custInfo.appnt.county == null ){
          return true
        }else{
          return false
        }
      },
      occupationIsOpen(){
        return this.occupationValue.isopen
      },
      customerIsOpen(){
        return this.customerValue.isopen
      },
      cardScannIsOpen(){
        return this.cardScanningValue.isopen
      },
      contentIsOpen(){
        if(this.occupationValue.isopen || this.customerValue.isopen || this.cardScanningValue.isopen||this.SelectArea.isOpen||this.SelectArea.isOpens){
          return false
        }else{
          return true
        }
      },
      payBankCode(){
        return this.policy.productInfo.bankCode
      },
      toggleBnfType(){
        return this.toggle.bnfType
      },
      appntProvince(){
        return this.policy.custInfo.appnt.province
      },
      relToApp(){
        return this.policy.custInfo.insurants.insurant[0].relToApp
      },
      //监听被保人姓名
      insurantName(){
        return this.policy.custInfo.insurants.insurant[0].name
      },
      //监听被保险人证件类型
      insurantIdType(){
        return this.policy.custInfo.insurants.insurant[0].idType
      },
      //监听被保险人证件号码
      insurantIdNo(){
        return this.policy.custInfo.insurants.insurant[0].idNo
      },
      //监听被保险人证件有效期
      insurantIdExpDate(){
        return this.policy.custInfo.insurants.insurant[0].idExpDate
      },
      //监听被保险人性别
      insurantSex(){
        return this.policy.custInfo.insurants.insurant[0].sex
      },
      //监听被保险人生日
      insurantBirthday(){
        return this.policy.custInfo.insurants.insurant[0].birthday
      },
      //监听被保险人省份
      insurantProvince(){
        return this.policy.custInfo.insurants.insurant[0].province
      },
    },
    watch:{
      insurantName(val, oldval){
        if(val != oldval){
          let beneficiary = this.policy.custInfo.bnfInfo.beneficiaries.beneficiary
          if(beneficiary != undefined && beneficiary > 0){
            for (var i = 0; i < beneficiary.length; i++) {
              if(beneficiary[i].relToIns == "00"){
                beneficiary[i].relToIns.bfcyName = val
              }
            }
          }
          if(this.dict.belongWithList!=undefined && this.dict.belongWithList.length>0){
            for(var i=0;i<this.dict.belongWithList.length;i++){
              if(this.dict.belongWithList[i].code == "1"){
                this.dict.belongWithList.splice(i, 1)
              }
            }
            let belong = {
              code:"1",
              text:val
            }
            if(val!=""){
              this.dict.belongWithList.push(belong)
            }
          }else{
            let belong = {
              code:"1",
              text:val
            }
            if(val != ""){
              this.dict.belongWithList.push(belong)
            }
          }
        }
      },
      insurantIdType(val, oldval){
        if(val != oldval){
          //监听证件类型 出生证或户口本时有效期计算带出
          if(this.policy.custInfo.insurants.insurant[0].birthday!=undefined||this.policy.custInfo.insurants.insurant[0].birthday!=""){
            let tempDate = new Date(this.policy.custInfo.insurants.insurant[0].birthday)
            let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
            let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
            if(val == "20"){//出生证 3周岁
              this.policy.custInfo.insurants.insurant[0].idExpDate = tempDate.getFullYear() + 3 + '-' + tempMonth + '-' + tempDay;
            }else if(val == "12"){//户口本 16周岁
              this.policy.custInfo.insurants.insurant[0].idExpDate = tempDate.getFullYear() + 16 + '-' + tempMonth + '-' + tempDay;
            }
            let beneficiary = this.policy.custInfo.bnfInfo.beneficiaries.beneficiary
            if(beneficiary != undefined && beneficiary > 0){
              for (var i = 0; i < beneficiary.length; i++) {
                if(beneficiary[i].relToIns == "00"){
                  beneficiary[i].relToIns.bfcyIdType = val
                }
              }
            }
          }
        }
      },
      insurantIdNo(val, oldval){
        if(val != oldval){
          this.policy.custInfo.insurants.insurant[0].idNo = val.replace(/[x]/g,'X')
          let beneficiary = this.policy.custInfo.bnfInfo.beneficiaries.beneficiary
          if(beneficiary != undefined && beneficiary > 0){
            for (var i = 0; i < beneficiary.length; i++) {
              if(beneficiary[i].relToIns == "00"){
                beneficiary[i].relToIns.bfcyIdCode = val
              }
            }
          }
        }
      },
      insurantIdExpDate(val, oldval){
        if(val != oldval){
          let beneficiary = this.policy.custInfo.bnfInfo.beneficiaries.beneficiary
          if(beneficiary != undefined && beneficiary > 0){
            for (var i = 0; i < beneficiary.length; i++) {
              if(beneficiary[i].relToIns == "00"){
                beneficiary[i].relToIns.bfcyIdExpDate = val
              }
            }
          }
        }
      },
      insurantSex(val, oldval){
        if(val != oldval){
          if(val == '1'){
              this.toggle.insuredSexChoice = true
          }else if(val == '2'){
              this.toggle.insuredSexChoice = false
          }
          this.proposalPlan.insurantProductList[0].insurant.sex = this.policy.custInfo.insurants.insurant[0].sex
          //投保人性别
          if(this.loadFinish){
            this.baofeiTest()
          }
          let beneficiary = this.policy.custInfo.bnfInfo.beneficiaries.beneficiary
          if(beneficiary != undefined && beneficiary > 0){
            for (var i = 0; i < beneficiary.length; i++) {
              if(beneficiary[i].relToIns == "00"){
                beneficiary[i].relToIns.bfcySex = val
              }
            }
          }
        }
      },
      'policy.custInfo.appnt.appntTaxInfo.taxIdentity': {
        handler(val,oldval) {

        },
        deep: true
      },
      insurantBirthday(val, oldval){
        if(val != oldval){
          let tempAge = this.ageFilter(val)
          if(tempAge < 7){
            this.policy.custInfo.insurants.insurant[0].grpName = ""
            $('#insGrpNameBtn').attr("readOnly",true);
          }else{
            $('#insGrpNameBtn').attr("readOnly",false);
          }
          if(tempAge < 18){
            this.policy.custInfo.insurants.insurant[0].mobile = ""
             $('#insMobileBtn').attr("readOnly",true);
          }else{
             $('#insMobileBtn').attr("readOnly",false);
          }
          this.proposalPlan.insurantProductList[0].insurant.birthday = val
          //本人情况要为投保人节点赋值进行计算
          if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
          	this.proposalPlan.holder.birthday = val
          }
          this.proposalPlan.insurantProductList[0].insurant.birthday = val
          //投保人生日
          if(this.loadFinish){
            this.baofeiTest()
          }
          let tempDate = new Date(val)
          let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
          let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
          if(this.policy.custInfo.insurants.insurant[0].idType == "20"){//出生证 3周岁
            this.policy.custInfo.insurants.insurant[0].idExpDate = tempDate.getFullYear() + 3 + '-' + tempMonth + '-' + tempDay;
          }else if(this.policy.custInfo.insurants.insurant[0].idType == "12"){//户口本 16周岁
            this.policy.custInfo.insurants.insurant[0].idExpDate = tempDate.getFullYear() + 16 + '-' + tempMonth + '-' + tempDay;
          }
        }
      },
      relToApp(val, oldval){
          this.proposalPlan.insurantProductList[0].insurant.relationNew = val
          if(val == "00"){
            //当投被保人关系为本人时将投保人信息赋值到被保人信息,并隐藏被保人部分
            this.toggle.hintInsurant = true
            this.policy.custInfo.insurants.insurant[0].name=this.policy.custInfo.appnt.appntName
            this.policy.custInfo.insurants.insurant[0].idType=this.policy.custInfo.appnt.idType
            this.policy.custInfo.insurants.insurant[0].idNo=this.policy.custInfo.appnt.idNo
            this.policy.custInfo.insurants.insurant[0].idExpDate=this.policy.custInfo.appnt.idExpDate
            this.policy.custInfo.insurants.insurant[0].nativePlace=this.policy.custInfo.appnt.nativePlace
            this.policy.custInfo.insurants.insurant[0].marriage=this.policy.custInfo.appnt.marriage
            this.policy.custInfo.insurants.insurant[0].sex=this.policy.custInfo.appnt.appntSex
            this.policy.custInfo.insurants.insurant[0].birthday=this.policy.custInfo.appnt.appntBirthday
            this.policy.custInfo.insurants.insurant[0].province=this.policy.custInfo.appnt.province
            this.policy.custInfo.insurants.insurant[0].city=this.policy.custInfo.appnt.city
            this.policy.custInfo.insurants.insurant[0].county=this.policy.custInfo.appnt.county
            this.policy.custInfo.insurants.insurant[0].street=this.policy.custInfo.appnt.street
            this.policy.custInfo.insurants.insurant[0].community=this.policy.custInfo.appnt.community
            this.policy.custInfo.insurants.insurant[0].postalAddress=this.policy.custInfo.appnt.postalAddress
            this.policy.custInfo.insurants.insurant[0].zipCode=this.policy.custInfo.appnt.zipCode
            this.policy.custInfo.insurants.insurant[0].email=this.policy.custInfo.appnt.email
            this.policy.custInfo.insurants.insurant[0].mobile=this.policy.custInfo.appnt.mobile
            this.policy.custInfo.insurants.insurant[0].insOccupation=this.policy.custInfo.appnt.appOccupation
            this.policy.custInfo.insurants.insurant[0].occupationType=this.policy.custInfo.appnt.occupationType
            this.policy.custInfo.insurants.insurant[0].occupationCode=this.policy.custInfo.appnt.occupationCode
            this.policy.custInfo.insurants.insurant[0].grpName=this.policy.custInfo.appnt.grpName
            this.policy.custInfo.insurants.insurant[0].salary=this.policy.custInfo.appnt.salary
          }else if(val == "30"){
             
          }else{
            if(!this.loadComplete){
              this.toggle.hintInsurant = false
              this.policy.custInfo.insurants.insurant[0].name=""
              this.policy.custInfo.insurants.insurant[0].idType="11"
              this.policy.custInfo.insurants.insurant[0].idNo=""
              this.policy.custInfo.insurants.insurant[0].idExpDate=""
              this.policy.custInfo.insurants.insurant[0].nativePlace="CHN"
              this.policy.custInfo.insurants.insurant[0].marriage=""
              this.policy.custInfo.insurants.insurant[0].sex="1"
              this.policy.custInfo.insurants.insurant[0].birthday=""
              this.policy.custInfo.insurants.insurant[0].province=""
              this.policy.custInfo.insurants.insurant[0].city=""
              this.policy.custInfo.insurants.insurant[0].county=""
              this.policy.custInfo.insurants.insurant[0].street=""
              this.policy.custInfo.insurants.insurant[0].community=""
              this.policy.custInfo.insurants.insurant[0].postalAddress=""
              this.policy.custInfo.insurants.insurant[0].zipCode=""
              this.policy.custInfo.insurants.insurant[0].email=""
              this.policy.custInfo.insurants.insurant[0].mobile=""
              this.policy.custInfo.insurants.insurant[0].insOccupation=""
              this.policy.custInfo.insurants.insurant[0].occupationType=""
              this.policy.custInfo.insurants.insurant[0].occupationCode=""
              this.policy.custInfo.insurants.insurant[0].grpName=""
              this.policy.custInfo.insurants.insurant[0].salary=""
            }
          }
          this.loadComplete = !this.loadComplete
      },
      appntProvince(val, oldval){
        if(val != oldval){
          this.temp.currentAppntCiytList.city.item = []
          for(var i=0;i<this.dict.cityList.city.item.length;i++){
            var provinveCode = val.substring(0,2)
            var cityCode = this.dict.cityList.city.item[i].code.substring(0,2)
            if(provinveCode == cityCode){
              this.temp.currentAppntCiytList.city.item.push(this.dict.cityList.city.item[i])
            }
          }
        }
      },
      toggleBnfType(val, oldval){
        if (val != oldval) {
          if(val){
            this.policy.custInfo.bnfInfo.bnfType="0"
            this.policy.custInfo.bnfInfo.beneficiaries.bnfCount = "0"
            this.policy.custInfo.bnfInfo.beneficiaries.beneficiary=[]
          }else{
            this.policy.custInfo.bnfInfo.bnfType="1"
            if (this.policy.custInfo.bnfInfo.beneficiaries.beneficiary.length == 0) {
              this.addBnfInfo()
            }else{
              console.log(this.policy.custInfo.bnfInfo.beneficiaries.beneficiary)
            }
          }
        }
      },
      payBankCode(val, oldval){
        for(var i = 0; i<this.dict.bankList.bank.item.length; i++) {
          let thisBank = this.dict.bankList.bank.item[i]
          if (val == thisBank.code) {
              this.policy.productInfo.bankRemark = this.dict.bankList.bank.item[i].remark
              let thisBankRemark = this.dict.bankList.bank.item[i].remark*10000
              console.log(thisBankRemark)
              if(thisBankRemark < this.policy.productInfo.sumPremL){
                console.log("银行限额:"+thisBankRemark)
              }
          }
        }
      },
      occupationIsOpen(val, oldval){
        if(!val){
          if(this.occupationValue.occItem!=undefined){
            if(this.occupationValue.type == global_constant.constant.TAG_SEARCH_OCC_INSURE){
              if(this.occupationValue.occItem.code == "-1111111"){
                this.policy.custInfo.insurants.insurant[0].occupationCode = ""
                this.policy.custInfo.insurants.insurant[0].insOccupation = ""
                this.policy.custInfo.insurants.insurant[0].occupationType = ""
                //试算节点赋值
                this.proposalPlan.insurantProductList[0].insurant.profession = ""
                this.proposalPlan.insurantProductList[0].insurant.level = ""
                this.proposalPlan.insurantProductList[0].insurant.desc = ""
                //进行试算
                if(this.loadFinish){
                  this.baofeiTest()
                }
              }else{
                this.policy.custInfo.insurants.insurant[0].occupationCode = this.occupationValue.occItem.code
                this.policy.custInfo.insurants.insurant[0].insOccupation = this.occupationValue.occItem.descr
                this.policy.custInfo.insurants.insurant[0].occupationType = this.occupationValue.occItem.level
                //试算节点赋值
                this.proposalPlan.insurantProductList[0].insurant.profession = this.occupationValue.occItem.code
                this.proposalPlan.insurantProductList[0].insurant.level = this.occupationValue.occItem.level
                this.proposalPlan.insurantProductList[0].insurant.desc = this.occupationValue.occItem.descr
                //进行试算
                if(this.loadFinish){
                  this.baofeiTest()
                }
              }
            }else if(this.occupationValue.type == global_constant.constant.TAG_SEARCH_OCC_APPLICANT){
              if(this.occupationValue.occItem.code == "-1111111"){
                this.policy.custInfo.appnt.occupationCode = ""
                this.policy.custInfo.appnt.appOccupation = ""
                this.policy.custInfo.appnt.occupationType = ""
                //试算节点赋值
                this.proposalPlan.holder.profession = ""
                this.proposalPlan.holder.level = ""
                this.proposalPlan.holder.desc = ""
                //进行试算
                if(this.loadFinish){
                  // this.baofeiTest()
                }
              }else{
                this.policy.custInfo.appnt.occupationCode = this.occupationValue.occItem.code
                this.policy.custInfo.appnt.appOccupation = this.occupationValue.occItem.descr
                this.policy.custInfo.appnt.occupationType = this.occupationValue.occItem.level
                //试算节点赋值
                this.proposalPlan.holder.profession = this.occupationValue.occItem.code
                this.proposalPlan.holder.level = this.occupationValue.occItem.level
                this.proposalPlan.holder.desc = this.occupationValue.occItem.descr
                //进行试算
                if(this.loadFinish){
                  // this.baofeiTest()
                }
              }
            }
          }
        }
      },
      customerIsOpen(val, oldval){
        if(!val){
          if(this.customerValue.cusItem != undefined && this.customerValue.cusItem.customerName != undefined){
            if(this.customerValue.type == global_constant.constant.TAG_SEARCH_CUS_INSURE){
              this.policy.custInfo.insurants.insurant[0].name = this.customerValue.cusItem.customerName
              this.policy.custInfo.insurants.insurant[0].sex = this.customerValue.cusItem.sex
              this.policy.custInfo.insurants.insurant[0].birthday = this.customerValue.cusItem.birthday
              this.policy.custInfo.insurants.insurant[0].idType = this.customerValue.cusItem.code
              this.policy.custInfo.insurants.insurant[0].idNo = this.customerValue.cusItem.idNo
              this.policy.custInfo.insurants.insurant[0].mobile = this.customerValue.cusItem.phoneNumber
              if(this.customerValue.cusItem.sex == "1"){
              	this.toggle.insuredSexChoice = true
              }else if(this.customerValue.cusItem.sex == "2"){
              	this.toggle.insuredSexChoice = false
              }
            }else if(this.customerValue.type == global_constant.constant.TAG_SEARCH_CUS_APPLICANT){
              this.policy.custInfo.appnt.appntName = this.customerValue.cusItem.customerName
              this.policy.custInfo.appnt.appntSex = this.customerValue.cusItem.sex
              this.policy.custInfo.appnt.appntBirthday = this.customerValue.cusItem.birthday
              this.policy.custInfo.appnt.idType = this.customerValue.cusItem.code
              // this.$refs.cardwapper.onInit(val,this.customerValue.cusItem.code)
              this.policy.custInfo.appnt.idNo = this.customerValue.cusItem.idNo
              this.policy.custInfo.appnt.mobile = this.customerValue.cusItem.phoneNumber
              if(this.customerValue.cusItem.sex == "1"){
              	this.toggle.appntSexChoice = true
              }else if(this.customerValue.cusItem.sex == "2"){
              	this.toggle.appntSexChoice = false
              }
            }else if(this.customerValue.type == global_constant.constant.TAG_SEARCH_CUS_BNF){
              let beneficiary = this.policy.custInfo.bnfInfo.beneficiaries.beneficiary[this.customerValue.index]
              beneficiary.bfcyName = this.customerValue.cusItem.customerName
              beneficiary.bfcySex = this.customerValue.cusItem.sex
              if(this.customerValue.cusItem.sex == "1"){
              	beneficiary.sexChoice = true
              }else if(this.customerValue.cusItem.sex == "2"){
              	beneficiary.sexChoice = false
              }
              beneficiary.bfcyIdType = this.customerValue.cusItem.code
              beneficiary.bfcyBirthday = this.customerValue.cusItem.birthday
              beneficiary.bfcyIdCode = this.customerValue.cusItem.idNo
            }
          }
        }
      },
      cardScannIsOpen(val, oldval){
        if(!val){
          if(this.cardScanningValue.cusItem != undefined && this.cardScanningValue.cusItem.name != undefined){
            if(this.cardScanningValue.type == global_constant.constant.TAG_SEARCH_CUS_INSURE){
              this.policy.custInfo.insurants.insurant[0].name = this.cardScanningValue.cusItem.name
              this.policy.custInfo.insurants.insurant[0].sex = this.cardScanningValue.cusItem.gender
              this.policy.custInfo.insurants.insurant[0].birthday = this.cardScanningValue.cusItem.birthday
              this.policy.custInfo.insurants.insurant[0].idType = "11"
              this.policy.custInfo.insurants.insurant[0].idNo = this.cardScanningValue.cusItem.id_card_number
              this.policy.custInfo.insurants.insurant[0].idExpDate = this.cardScanningValue.cusItem.valid_date
              if(this.policy.custInfo.insurants.insurant[0].sex == "1"){
                this.toggle.insuredSexChoice = true
              }else if(this.policy.custInfo.insurants.insurant[0].sex == "2"){
                this.toggle.insuredSexChoice = false
              }
              if(this.policy.custInfo.insurants.insurant[0].idExpDate == "2200-12-31"){
                this.insuredIsCheckeds = true
              }else{
                this.insuredIsCheckeds = false
              }
            }else if(this.cardScanningValue.type == global_constant.constant.TAG_SEARCH_CUS_APPLICANT){
              this.policy.custInfo.appnt.appntName = this.cardScanningValue.cusItem.name
              this.policy.custInfo.appnt.appntSex = this.cardScanningValue.cusItem.gender
              this.policy.custInfo.appnt.appntBirthday = this.cardScanningValue.cusItem.birthday
              this.policy.custInfo.appnt.idType = "11"
              this.policy.custInfo.appnt.idNo = this.cardScanningValue.cusItem.id_card_number
              this.policy.custInfo.appnt.idExpDate = this.cardScanningValue.cusItem.valid_date
              if(this.policy.custInfo.appnt.appntSex == "1"){
                this.toggle.appntSexChoice = true
              }else if(this.policy.custInfo.appnt.appntSex == "2"){
                this.toggle.appntSexChoice = false
              }
              if(this.policy.custInfo.appnt.idExpDate == "2200-12-31"){
                this.appntIsCheckeds = true
              }else{
                this.appntIsCheckeds = false
              }
            }else if(this.cardScanningValue.type == global_constant.constant.TAG_SEARCH_CUS_BNF){
              let beneficiary = this.policy.custInfo.bnfInfo.beneficiaries.beneficiary[this.cardScanningValue.index]
              beneficiary.bfcyName = this.cardScanningValue.cusItem.name
              beneficiary.bfcySex = this.cardScanningValue.cusItem.gender
              if(this.cardScanningValue.cusItem.sex == "1"){
              	beneficiary.sexChoice = true
              }else if(this.cardScanningValue.cusItem.sex == "2"){
              	beneficiary.sexChoice = false
              }
              beneficiary.bfcyIdType = "11"
              beneficiary.bfcyBirthday = this.cardScanningValue.cusItem.birthday
              beneficiary.bfcyIdCode = this.cardScanningValue.cusItem.id_card_number
              beneficiary.bfcyIdExpDate = this.cardScanningValue.cusItem.valid_date
            }
          }
        }
      },
      'policy.custInfo.appnt.appntName': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].name=val
            }
            this.policy.productInfo.bankAccName = val
            if(this.isHaveAppInform){
              if(this.dict.belongWithList!=undefined && this.dict.belongWithList.length>0){
                for(var i=0;i<this.dict.belongWithList.length;i++){
                  if(this.dict.belongWithList[i].code == "0"){
                    this.dict.belongWithList.splice(i, 1) 
                  }
                }
                let belong = {
                  code:"0",
                  text:'豁免被保险人'+ val
                }
                for(let i of this.huomian){
                  if(val!="" && i.prodCode == 'HDT042' || i.prodCode == 'HDT044'){
                    this.dict.belongWithList.push(belong)
                  }
                }
                // if(val!=""){
                //   this.dict.belongWithList.push(belong)
                // }
              }else{
                let belong = {
                  code:"0",
                  text:'豁免被保险人'+ val
                }
                for(let i of this.huomian){
                  if(val!="" && i.prodCode == 'HDT042' || i.prodCode == 'HDT044'){
                    this.dict.belongWithList.push(belong)
                  }
                }
                // if(val != ""){
                //   this.dict.belongWithList.push(belong)
                // }
              }
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.idType': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].idType=val
            }
            //监听证件类型 出生证或户口本时有效期计算带出
            // var date = new Date(this.policy.custInfo.appnt.appntBirthday)
            // let month = date.getMonth() + 1
            if(this.policy.custInfo.appnt.appntBirthday!=undefined || this.policy.custInfo.appnt.appntBirthday!=""){
              let tempDate = new Date(this.policy.custInfo.appnt.appntBirthday)
              let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
              let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
              if(val == "20"){//出生证 3周岁
                this.policy.custInfo.appnt.idExpDate = tempDate.getFullYear() + 3 + '-' + tempMonth + '-' + tempDay;
              }else if(val == "12"){//户口本 16周岁
                this.policy.custInfo.appnt.idExpDate = tempDate.getFullYear() + 16 + '-' + tempMonth + '-' + tempDay;
              }
            }

          }
        },
        deep: true
      },
      'policy.custInfo.appnt.idNo': {
        handler(val,oldval) {
          if (val!=oldval) {
            this.policy.custInfo.appnt.idNo = val.replace(/[x]/g,'X')
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].idNo=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.idExpDate': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].idExpDate=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.nativePlace': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].nativePlace=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.marriage': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].marriage=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.appntSex': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].sex=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.appntBirthday': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].birthday=val
            }else{
            	this.proposalPlan.holder.birthday = val
            	if(this.loadFinish){
                  this.baofeiTest()
                }
            }
            let tempDate = new Date(val)
            let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
            let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
            if(this.policy.custInfo.appnt.idType == "20"){//出生证 3周岁
            	this.policy.custInfo.appnt.idExpDate = tempDate.getFullYear() + 3 + '-' + tempMonth + '-' + tempDay;
            }else if(this.policy.custInfo.appnt.idType == "12"){//户口本 16周岁
            	this.policy.custInfo.appnt.idExpDate = tempDate.getFullYear() + 16 + '-' + tempMonth + '-' + tempDay;
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.province': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].province=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.city': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].city=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.county': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].county=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.street': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].street=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.community': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].community=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.postalAddress': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].postalAddress=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.zipCode': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].zipCode=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.email': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].email=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.mobile': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].mobile=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.appOccupation': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].insOccupation=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.occupationType': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].occupationType=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.occupationCode': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].occupationCode=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.grpName': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].grpName=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.appnt.salary': {
        handler(val,oldval) {
          if (val!=oldval) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp == "00"){
              this.policy.custInfo.insurants.insurant[0].salary=val
            }
          }
        },
        deep: true
      },
      'policy.custInfo.bnfInfo.beneficiaries.beneficiary':{
        handler(val,oldval) {
          for(var i=0;i<val.length;i++){
            this.policy.custInfo.bnfInfo.beneficiaries.beneficiary[i].bfcyIdCode = val[i].bfcyIdCode.replace(/[x]/g,'X')
            let newBeneficiary = val[i]
            let newIdType = newBeneficiary.bfcyIdType
            let newBirthday = newBeneficiary.bfcyBirthday
            let newIdExpDate = newBeneficiary.bfcyIdExpDate
            if(newBirthday!=undefined && newBirthday!=""){
              let tempDate = new Date(newBirthday)
              let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
              let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
              if(newIdType!=undefined && newIdType!=""){
                if(newIdType == "20"){//出生证 3周岁
                  newIdExpDate = tempDate.getFullYear() + 3 + '-' + tempMonth + '-' + tempDay;
                }else if(newIdType == "12"){//户口本 16周岁
                  newIdExpDate = tempDate.getFullYear() + 16 + '-' + tempMonth + '-' + tempDay;
                } 
                this.policy.custInfo.bnfInfo.beneficiaries.beneficiary[i].bfcyIdExpDate = newIdExpDate
              }
            }
            if(newIdType!=undefined && newIdType!=""){
              if(newBirthday!=undefined && newBirthday!=""){
                let tempDate = new Date(newBirthday)
                let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
                let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
                if(newIdType == "20"){//出生证 3周岁
                  newIdExpDate = tempDate.getFullYear() + 3 + '-' + tempMonth + '-' + tempDay;
                }else if(newIdType == "12"){//户口本 16周岁
                  newIdExpDate = tempDate.getFullYear() + 16 + '-' + tempMonth + '-' + tempDay;
                }
                this.policy.custInfo.bnfInfo.beneficiaries.beneficiary[i].bfcyIdExpDate = newIdExpDate
              }
            }
          }
        },
        deep: true
      },
    },
    filters:{
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
      left(){
         this.pre() 
      },
      right(){
         this.next()
      },
      speechRec(index){
        MAPlugin.hybridCallAction('hybrid://MASpeech:401/invokeSpeech?0', (callbackSucc)=>{
            if(index == "1"){
              this.policy.custInfo.appnt.postalAddress = callbackSucc.result
            }else if(index == "2"){
              this.policy.custInfo.insurants.insurant[0].postalAddress = callbackSucc.result
            }
        }, (callbackFail)=>{
					 this.showMsg(callbackFail)
				});
      },
      handleChangerelToInsDesc(index){
        this.policy.custInfo.bnfInfo.beneficiaries.beneficiary[index].is_show = true
        this.is_show_number++
      },
      handlerelToAppDesc(){
         this.relToAppDesc = true
      },
      changeInsurantRelToApp(){
        if(this.policy.custInfo.insurants.insurant[0].relToApp == "30"){
              this.promptNumber = 1
             this.$refs.btn.showMOdal()
        }
      },
      backHome(){
          this.$router.push("/home");
        },
        getPolicyMsg(productDefList){
          this.proposalPlan = utils.cache.get('proposalPlan')
          let requ = {
            "policy":{
              "substepNo":"3",
              "orderCode": this.$route.params.planId
            }
          }
          let that = this
          utils.http.postFast('MOHQPOLICYMSG',requ,(body)=> {
            let policy = body.policy
            console.log('policy ' , policy)
            this.huomian = policy.productInfo.products.product
            this.policy.custInfo.insurants = policy.custInfo.insurants
            this.policy.custInfo.insurants.insurant[0].province = this.policy.custInfo.insurants.insurant[0].province
            this.policy.custInfo.insurants.insurant[0].city = this.policy.custInfo.insurants.insurant[0].city
            this.policy.custInfo.insurants.insurant[0].relToAppDesc = policy.custInfo.insurants.insurant[0].relToAppDesc
            // this.relToAppDesc =(this.policy.custInfo.insurants.insurant[0].relToAppDesc ==""?true:false)
            this.policy.custInfo.appnt =  policy.custInfo.appnt
            this.policy.custInfo.appnt.province = this.policy.custInfo.appnt.province
            this.policy.custInfo.appnt.city = this.policy.custInfo.appnt.city
              if(this.policy.custInfo.appnt.appntSex == "1"){
                this.toggle.appntSexChoice = true
              }else if(this.policy.custInfo.appnt.appntSex == "2"){
                this.toggle.appntSexChoice = false
              }
              if(this.policy.custInfo.appnt.idExpDate == "2200-12-31"){
                this.appntIsCheckeds = true
              }else{
                this.appntIsCheckeds = false
              }
              if(this.policy.custInfo.appnt.appntTaxInfo.taxIdentity == "1"){
                this.showDetail = false
                this.inmateType = "china"
              }else if(this.policy.custInfo.appnt.appntTaxInfo.taxIdentity == "2"){
                this.showDetail = true
                this.inmateType = "chinas"
              }else if(this.policy.custInfo.appnt.appntTaxInfo.taxIdentity == "3"){
                this.showDetail = true
                this.inmateType = "chinese"
              }
              let taxInfos = this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo
              if(taxInfos!=undefined&&taxInfos.length>0){
                for (let index = 0; index < taxInfos.length; index++) {
                  if(taxInfos[index].reasonCheck == "A"){
                    $("#"+index+"checkboxA").prop("checked", true);
                    $("#"+index+"checkboxB").prop("checked", false);
                  }else if(taxInfos[index].reasonCheck == "B"){
                    $("#"+index+"checkboxA").prop("checked", false);
                    $("#"+index+"checkboxB").prop("checked", true);
                  }
                }
              }
              if(this.policy.custInfo.insurants.insurant[0].sex == "1"){
                this.toggle.insuredSexChoice = true
              }else if(this.policy.custInfo.insurants.insurant[0].sex == "2"){
                this.toggle.insuredSexChoice = false
              }
              if(this.policy.custInfo.insurants.insurant[0].idExpDate == "2200-12-31"){
                this.insuredIsCheckeds = true
              }else{
                this.insuredIsCheckeds = false
              }
              this.policy.custInfo.bnfInfo = policy.custInfo.bnfInfo
              let beneficiarys = this.policy.custInfo.bnfInfo.beneficiaries.beneficiary
              if (beneficiarys != undefined && beneficiarys.length > 0) {
                for (var i = 0; i < beneficiarys.length; i++) {
                  let sex = beneficiarys[i].bfcySex
                  if(sex == "1"){
                    beneficiarys[i].sexChoice = true
                  }else if(sex == "2"){
                    beneficiarys[i].sexChoice = false
                  }
                }
              }
              this.policy.productInfo  = policy.productInfo
              this.temp.policy.productInfo  = policy.productInfo
              let beneficiary = this.policy.custInfo.bnfInfo.beneficiaries.beneficiary
              for (var i = 0; i < beneficiary.length; i++) {
                   beneficiary[i].isShow = true
                   beneficiary[i].is_show = true
                if(beneficiary[i].bfcyIdExpDate == "2200-12-31"){
                  beneficiary[i].bfcyIsLong = true
                }else{
                  beneficiary[i].bfcyIsLong = false
                }
              }
              //初始化法指受益人选项
              if(this.policy.custInfo.bnfInfo.bnfType == "0"){//法定
                this.toggle.bnfType = true
              }else if(this.policy.custInfo.bnfInfo.bnfType == "1"){//指定
                this.toggle.bnfType = false
              }
              var compare = function (obj1, obj2) { 
                var val1 = obj1.bfcyLevelNum;
                var val2 = obj2.bfcyLevelNum;  
                return val1-val2         
              } 
              this.policy.custInfo.bnfInfo.beneficiaries.beneficiary.sort(compare)
              console.log("受益人数组",this.policy.custInfo.bnfInfo.beneficiaries.beneficiary)
              var compare1 = function (obj1, obj2) {
                var val1 = obj1.isMaster;
                var val2 = obj2.isMaster;
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }            
              } 
              this.policy.productInfo.products.product.sort(compare1)
              let extra = []
              let productsArr = policy.productInfo.products.product
              for (var i = 0; i < productsArr.length; i++) {
                // if(productsArr[i].isMaster == '1'){
                //   this.page_title = productsArr[i].prodName
                // }
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

              // this.current_total_premium = policy.productInfo.sumPremL
              // let belong = {
              //   code:"1",
              //   text:'被保险人'+this.policy.custInfo.insurants.insurant[0].name
              // }
              // this.dict.belongWithList.push(belong)
              // let isHuomian = false
              // if(isHuomian){
              //   belong = {
              //     code:"0",
              //     text:'豁免被保险人'+this.policy.custInfo.appnt.appntName
              // }
              //   this.dict.belongWithList.push(belong)
              // }
              this.loadComplete = true
              this.loadFinish = true
          })
        },
        //产品定义接口
        getProductDef(callback){
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
        cancels(val){
         console.log(val)
          this.obj.isOpen = false
          if(val.selectNumber == 0){
            this.SelectArea.isOpen = false
          }else if(val.selectNumber == 1){
             this.SelectArea.isOpens = false
          }
        },
        detonate(index,value){
           this.toggle.hintInsurant = false
          console.log("序号:"+index,"/结果:"+value)
          this.policy.custInfo.insurants.insurant[0].relToAppDesc = value
          this.policy.custInfo.insurants.insurant[0].relToApp = "30"
          // this.relToAppDesc = false 
        },
        detonates(index,value){
          console.log("序号:"+index,"/结果:"+value)
          this.policy.custInfo.bnfInfo.beneficiaries.beneficiary[index].relToIns = "30"
          this.policy.custInfo.bnfInfo.beneficiaries.beneficiary[index].relToInsDesc =value
          // this.policy.custInfo.bnfInfo.beneficiaries.beneficiary[index].is_show = false
          let obj = {}
          obj.text= value
          obj.code = "100"
          this.dict.relationBenefitList.relation.item.push(obj)
        },
        // getProvinceText(code){
        //     for(let i =0;i<provinceList.province.item.length;i++){
        //       if(code == provinceList.province.item[i].code){
        //         return provinceList.province.item[i].text
        //       }
        //     }
        // },
        // getCityText(code){
        //   for(let i =0;i<cityList.city.item.length;i++){
        //       if(code == cityList.city.item[i].code){
        //         return cityList.city.item[i].text
        //       }
        //     }
        // },
        SelectAdress(){
           this.obj.selectNumber = 0 
           this.SelectArea.isOpen = true
           this.obj.isOpen = true
        },
        selectInsurants(){
           this.obj.selectNumber = 1
           this.SelectArea.isOpens = true
           this.obj.isOpen = true
        },
        selectActions(obj){
            this.SelectArea.isOpen = false
            this.SelectArea.isToggle = true
            this.policy.custInfo.appnt.province = obj.province
            this.policy.custInfo.appnt.city = obj.city
            this.policy.custInfo.appnt.county = obj.county
        },
        selectMutation(obj){
          this.SelectArea.isOpens = false
          this.SelectArea.isToggles = true
          this.policy.custInfo.insurants.insurant[0].province = obj.province
          this.policy.custInfo.insurants.insurant[0].city = obj.city
          this.policy.custInfo.insurants.insurant[0].county = obj.county
        },
        winReload:function(cond){
          window.location.reload();
        },
        test(v){
          this.$refs.btn.showMOdal(2)
        },
        computeAge(value){
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
      pre(){
          let orgId = utils.cache.get('personsal').orgId
          let substepNo = this.$route.params.substepNo
          let ago = this.computeAge(this.policy.custInfo.appnt.appntBirthday)
          console.log(substepNo)
          if (orgId.substring(0, 4) == "8635") { //宁波机构
            this.$router.push({
              name: 'questionnaire_page_nb',
              params: {
                planId: this.$route.params.planId
              }
            })
          } else if (orgId.substring(0, 4) == "8631" && ago>60) { //上海机构
            this.$router.push({
              name: 'questionnaire_page_sh',
              params: {
                planId: this.$route.params.planId
              }
            })
          }else { //非指定机构进产品详情页面
            //保存投被人信息带到基本信息页面  
           this.proposalPlan.holder.name = this.policy.custInfo.appnt.appntName
           this.proposalPlan.holder.sex = this.policy.custInfo.appnt.appntSex
           this.proposalPlan.holder.birthday = this.policy.custInfo.appnt.appntBirthday
           this.proposalPlan.holder.desc = this.policy.custInfo.appnt.appOccupation
           this.proposalPlan.holder.profession  = this.policy.custInfo.appnt.occupationCode
           this.proposalPlan.holder.level  = this.policy.custInfo.appnt.occupationType
           this.proposalPlan.insurantProductList[0].insurant.name = this.policy.custInfo.insurants.insurant[0].name
           this.proposalPlan.insurantProductList[0].insurant.birthday = this.policy.custInfo.insurants.insurant[0].birthday
           this.proposalPlan.insurantProductList[0].insurant.sex = this.policy.custInfo.insurants.insurant[0].sex
           this.proposalPlan.insurantProductList[0].insurant.desc = this.policy.custInfo.insurants.insurant[0].insOccupation
           this.proposalPlan.insurantProductList[0].insurant.profession = this.policy.custInfo.insurants.insurant[0].occupationCode
           this.proposalPlan.insurantProductList[0].insurant.level=   this.policy.custInfo.insurants.insurant[0].occupationType
           this.proposalPlan.insurantProductList[0].insurant.relationNew = this.policy.custInfo.insurants.insurant[0].relToApp
           this.proposalPlan.insurantProductList[0].insurant.relToApp = this.policy.custInfo.insurants.insurant[0].relToApp
            utils.cache.set('proposalPlan',this.proposalPlan)
            this.$router.push({
              name: 'product_details_page',
              params: {
                planId: this.$route.params.planId
              }
            })
          }
        },
        //受益人操作关系事件后,为本人关系时,将被保人复制到受益人上
        relToIns(item,index){
          if(item.relToIns == "00"){
            item.bfcyName = this.policy.custInfo.insurants.insurant[0].name
            item.bfcyIdType = this.policy.custInfo.insurants.insurant[0].idType
            item.bfcyIdCode = this.policy.custInfo.insurants.insurant[0].idNo
            item.bfcyIdExpDate = this.policy.custInfo.insurants.insurant[0].idExpDate
            item.bfcySex = this.policy.custInfo.insurants.insurant[0].sex
            item.bfcyBirthday = this.policy.custInfo.insurants.insurant[0].birthday
            if (item.bfcySex == "1") {
              item.sexChoice = true
            }else if(item.bfcySex == "2"){
              item.sexChoice = false
            }
          }else if(item.relToIns == "30"){
              this.promptNumber = 2
              this.$refs.btns.showMOdal(index)
          }
          else{
            item.bfcyName = ""
            item.bfcyIdType = "11"
            item.bfcyIdCode = ""
            item.bfcyIdExpDate = ""
            item.bfcySex = ""
            item.bfcyBirthday = ""
            item.bfcySex = "1"
            item.sexChoice = true
          }
        },
        //受益人选择为某个被保人
        clickRelation(index){
          let beneficiary = this.policy.custInfo.bnfInfo.beneficiaries.beneficiary[index]
          var relation = $("#relationSelect").val();
          if(relation != "-1"){
            beneficiary.belongWith = relation
          }
        },
        handleChanges(){
          let check = this.isChecked
          if(check){
            this.isShowPicker = false
          }else{
            this.isShowPicker = true
          }
        },
        bfcyChanges(item,index){
          console.log(item.bfcyIsLong)
          if(item.bfcyIsLong){
            item.bfcyIdExpDate = "2200-12-31"
          }
          console.log("=====================>"+index)
        },
	      handleChangeBnfType(){

        },
        handleChangess(){
          let check = this.isCheckeds
          if(check){
            this.isShowPickers = false
            this.policy.custInfo.appnt.idExpDate = "2200-12-31"
          }else{
            this.isShowPickers = true
          }
        },
        //证件有效期长期监听
        handleChangeValidity(index){
          if(index == "1"){//投保人有效期
            if(this.appntIsCheckeds){
              this.policy.custInfo.appnt.idExpDate = "2200-12-31"
            }
          }else if(index == "0"){//被保人有效期
            if(this.insuredIsCheckeds){
              this.policy.custInfo.insurants.insurant[0].idExpDate = "2200-12-31"
            }
          }
        },
        handleChange(tag,index){
          if(tag == "0"){
            //被保人性别
            if(this.toggle.insuredSexChoice == true){
              this.policy.custInfo.insurants.insurant[0].sex = "1"
            }else  if(this.toggle.insuredSexChoice == false){
              this.policy.custInfo.insurants.insurant[0].sex = "2"
            }
            this.proposalPlan.insurantProductList[0].insurant.sex = this.policy.custInfo.insurants.insurant[0].sex
            if(this.loadFinish){
              this.baofeiTest()
            }
          }else if(tag == "1"){
            //投保人性别
            if(this.toggle.appntSexChoice == true){
              this.policy.custInfo.appnt.appntSex = "1"
            }else  if(this.toggle.appntSexChoice == false){
              this.policy.custInfo.appnt.appntSex = "2"
            }
            this.proposalPlan.holder.sex = this.policy.custInfo.appnt.appntSex
            if(this.loadFinish){
              // this.baofeiTest()
            }
          }else if(tag == "2"){
            let beneficiary = this.policy.custInfo.bnfInfo.beneficiaries.beneficiary[index]
            if(beneficiary.sexChoice == true){
              beneficiary.bfcySex = "1"
            }else if(beneficiary.sexChoice == false){
              beneficiary.bfcySex = "2"
            }
          }
        },
        handleCheckAB(tag,index){
          if(tag == 1){
            var isChecked = ''
            isChecked = $("#"+index+"checkboxA").is(':checked')
            if(isChecked){
              $("#"+index+"checkboxA").prop("checked", true);
              $("#"+index+"checkboxB").prop("checked", false);
              this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo[index].reasonCheck = "A"
            }else{
              $("#"+index+"checkboxA").prop("checked", false);
              this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo[index].reasonCheck = ""
            }
          }else if(tag == 2){
            var isChecked = ''
            isChecked = $("#"+index+"checkboxB").is(':checked')
            if(isChecked){
              $("#"+index+"checkboxA").prop("checked", false);
              $("#"+index+"checkboxB").prop("checked", true);
              this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo[index].reasonCheck = "B"
            }else{
              $("#"+index+"checkboxB").prop("checked", false);
              this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo[index].reasonCheck = ""
            }
          }
          console.log("税收识别选项===>"+index +"---"+ this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo[index].reasonCheck)
        },
        handleCheck(){
            let type = this.inmateType
            if(type === "china"){
              this.policy.custInfo.appnt.appntTaxInfo.taxIdentity = "1"
              this.showDetail = false
            }else if(type === "chinas"){
              this.policy.custInfo.appnt.appntTaxInfo.taxIdentity = "2"
              this.showDetail = true
              this.addRevenue(1)
            }else if (type === "chinese") {
              this.policy.custInfo.appnt.appntTaxInfo.taxIdentity = "3"
              this.showDetail = true
              this.addRevenue(2)
            }
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
        next:function(){
          let age = this.ageFilter(this.policy.custInfo.appnt.appntBirthday)
          if(age>=60||age<18){
            this.showMsg("投保人年龄必须位于18~59周岁!")
            return
          }
          let isPass = this.checkData()
          if (isPass) {
            this.baofeiTest((body)=>{
              let insurantProduct = body.insurantProductList[0]
              let isPass = insurantProduct.checkResult.isPass
              let pass = insurantProduct.checkResult.pass
              if(isPass=="true" && pass=="true"){
                let requ = {
                  "policy":this.policy
                }
                console.log("保存保单信息")
                console.log(this.policy)
                utils.http.postFast('MODISTRIESAVE',requ,(body)=> {
                    console.log(body)
                    let policy = body.policy
                    if(policy.resultCode == "0"){
                      this.$router.push({
                        name:'inform_page',
                        params:{
                          planId:policy.orderId
                        }
                      })
                    }else if(policy.resultCode != "0"){
                      this.showMsg(policy.resultMessage)
                    }
                })
              }else{
                let reasonList = insurantProduct.checkResult.reasonList
                let message = ""
                for (var i = 0; i < reasonList.length; i++) {
                  message += reasonList[i].info
                }
                this.current_total_premium = "???"
                this.showMsg(message)
              }
            },(error)=>{
              this.current_total_premium = "???"
            })
          }
        },
        checkData(){
          let isPass = true
          isPass = this.checkCustAppntData()
          if (isPass) {
            if(this.policy.custInfo.insurants.insurant[0].relToApp != "00"){
              isPass = this.checkCustInsurantData()
            }
          }
          if(isPass){
            isPass = this.checkBnfData()
          }
          if(isPass){
            isPass = this.checkAppntTaxInfo()
          }
          if(isPass){
            isPass = this.checkPayAppntData()
          }
          return isPass
        },
        appntTaxInfoCheck(appntTaxInfo){
          for(var i=0;i<appntTaxInfo.taxInfoList.taxInfo.length;i++){
            let oldTaxInfo = appntTaxInfo.taxInfoList.taxInfo[i]
            for(var j=i+1;j<appntTaxInfo.taxInfoList.taxInfo.length;j++){
                let nextTaxInfo = appntTaxInfo.taxInfoList.taxInfo[j]
                if(oldTaxInfo.taxArea != undefined && oldTaxInfo.taxArea != ""){
                  if(nextTaxInfo.taxArea != undefined && nextTaxInfo.taxArea != ""){
                    if(oldTaxInfo.taxArea == nextTaxInfo.taxArea){
                      return "投保人税收居民国（地区）填写错误，请正确填写。\n"
                    }
                  }
                }
                if(oldTaxInfo.tin != undefined && oldTaxInfo.tin != ""){
                  if(nextTaxInfo.tin != undefined && nextTaxInfo.tin != ""){
                    if(oldTaxInfo.tin == nextTaxInfo.tin){
                      return "纳税人识别号填写重复，请正确填写。\n"
                    }
                  }
                }
            }
          }
        },
        //校验税收声明部分
        checkAppntTaxInfo:function(){
          let appntTaxInfo = this.policy.custInfo.appnt.appntTaxInfo
          let isHaveCHN = false
          console.log(appntTaxInfo)
          let idType = this.policy.custInfo.appnt.idType
          if(appntTaxInfo.taxIdentity == "1"){
            if(idType != "11" && idType != "12"){
                this.showMsg("投保人税收居民身份选择有误，请核实。\n")
                return false
            }
          }else if(appntTaxInfo.taxIdentity == "2"){
            if(idType == "11" || idType == "12"){
                this.showMsg("投保人税收居民身份选择有误，请核实。\n")
                return false
            }
            if((appntTaxInfo.birthCountry == undefined || appntTaxInfo.birthCountry == "")
                &&(appntTaxInfo.birthProvince == undefined || appntTaxInfo.birthProvince == "")
                &&(appntTaxInfo.birthCity == undefined || appntTaxInfo.birthCity == "")){
                this.showMsg("投保人出生地未填写，请正确填写。\n")
                return false
            }
            if(appntTaxInfo.birthCountry == undefined || appntTaxInfo.birthCountry == ""){
                this.showMsg("投保人出生地未填写，请正确填写。\n")
                return false
            }
            if((appntTaxInfo.birthProvince == undefined || appntTaxInfo.birthProvince == "")
                &&(appntTaxInfo.birthCity == undefined || appntTaxInfo.birthCity == "")){
                this.showMsg("投保人出生地未填写不完整，请核实。\n")
                return false
            }
            let msg = this.appntTaxInfoCheck(appntTaxInfo)
            if(msg!=undefined && msg !=""){
              this.showMsg(msg+"\n")
              return false
            }
            for(var i=0;i<appntTaxInfo.taxInfoList.taxInfo.length;i++){
              let taxInfo = appntTaxInfo.taxInfoList.taxInfo[i]
              if(taxInfo.taxArea == undefined || taxInfo.taxArea == ""){
                  this.showMsg("投保人税收居民国（地区）未填写，请正确填写。\n")
                  return false
              }
              if(taxInfo.taxArea == "CHN"){
                  this.showMsg("投保人税收居民国（地区）应为非中国 。\n")
                  return false
              }
              if((taxInfo.tin == undefined || taxInfo.tin == "")
                && taxInfo.reasonCheck != "A"
                && taxInfo.reasonCheck != "B"){
                  this.showMsg("若无法提供纳税人识别号，请选择原因A或B”字段可填写。\n")
                  return false
              }
              if(taxInfo.tin != "" && taxInfo.reasonMessage != ""){
                  this.showMsg("投保人居民国（地区）纳税人识别号和原因不可同时填写，请确认。\n")
                  return false
              }
              if(taxInfo.tin != "" && taxInfo.reasonCheck != ""){
                  this.showMsg("投保人居民国（地区）纳税人识别号和原因不可同时填写，请确认。\n")
                  return false
              }
              //识别号不为空
              if(taxInfo.tin != ""){
                //校验非字母+数字
                var reg = /^[0-9a-zA-Z]*$/g;
                if(!reg.test(taxInfo.tin)){
                   this.showMsg("投保人居民国（地区）纳税人识别号只能填写字母和数字，请确认。\n")
                  return false
                }
              }
              //未取得纳税号原因不为空
              if(taxInfo.reasonCheck != "" && taxInfo.reasonCheck == "A" && (taxInfo.reasonMessage != undefined && taxInfo.reasonMessage != "")){
                  this.showMsg("原因A ，投保人可不用填写解释具体原因。\n")
                  return false
              }
              //未取得纳税号原因不为空
              if(taxInfo.reasonCheck != "" && taxInfo.reasonCheck == "B" && (taxInfo.reasonMessage == undefined || taxInfo.reasonMessage == "")){
                  this.showMsg("原因B 账户持有人未能取得纳税人识别号，请投保人解释具体原因。\n")
                  return false
              }
            }
          }else if(appntTaxInfo.taxIdentity == "3"){
            if((appntTaxInfo.birthCountry == undefined || appntTaxInfo.birthCountry == "")
                &&(appntTaxInfo.birthProvince == undefined || appntTaxInfo.birthProvince == "")
                &&(appntTaxInfo.birthCity == undefined || appntTaxInfo.birthCity == "")){
                this.showMsg("投保人出生地未填写，请正确填写。\n")
                return false
            }
            if(appntTaxInfo.birthCountry == undefined || appntTaxInfo.birthCountry == ""){
                this.showMsg("投保人出生地未填写，请正确填写。\n")
                return false
            }
            if((appntTaxInfo.birthProvince == undefined || appntTaxInfo.birthProvince == "")
                &&(appntTaxInfo.birthCity == undefined || appntTaxInfo.birthCity == "")){
                this.showMsg("投保人出生地未填写不完整，请核实。\n")
                return false
            }
            if(appntTaxInfo.taxInfoList.taxInfo == undefined || appntTaxInfo.taxInfoList.taxInfo == 0){
                this.showMsg("投保人税收居民身份勾选项未填写。\n")
                return false
            }
            if(appntTaxInfo.taxInfoList.taxInfo.length < 2 ){
                this.showMsg("投保人税收居民国及其相关信息须至少填写两项且含中国 。\n")
                return false
            }
            let msg = this.appntTaxInfoCheck(appntTaxInfo)
            if(msg!=undefined && msg !=""){
              this.showMsg(msg+"\n")
              return false
            }
            for(var i=0;i<appntTaxInfo.taxInfoList.taxInfo.length;i++){
              let taxInfo = appntTaxInfo.taxInfoList.taxInfo[i]
              if(taxInfo.taxArea == undefined || taxInfo.taxArea == ""){
                  this.showMsg("投保人税收居民国（地区）未填写，请正确填写。\n")
                  return false
              }
              if(taxInfo.taxArea == "CHN"){
                  isHaveCHN = true
              }
              if((taxInfo.tin == undefined || taxInfo.tin == "")
                && taxInfo.reasonCheck != "A"
                && taxInfo.reasonCheck != "B"){
                  this.showMsg("若无法提供纳税人识别号，请选择原因A或B”字段可填写。\n")
                  return false
              }
              if(taxInfo.tin != "" && taxInfo.reasonMessage != ""){
                  this.showMsg("投保人居民国（地区）纳税人识别号和原因不可同时填写，请确认。\n")
                  return false
              }
              if(taxInfo.tin != "" && taxInfo.reasonCheck != ""){
                  this.showMsg("投保人居民国（地区）纳税人识别号和原因不可同时填写，请确认。\n")
                  return false
              }
              //识别号不为空
              if(taxInfo.tin != ""){
                //校验非字母+数字
              }
              //未取得纳税号原因不为空
              if(taxInfo.reasonCheck != "" && taxInfo.reasonCheck == "A" && (taxInfo.reasonMessage != undefined && taxInfo.reasonMessage != "")){
                  this.showMsg("原因A ，投保人可不用填写解释具体原因。\n")
                  return false
              }
              //未取得纳税号原因不为空
              if(taxInfo.reasonCheck != "" && taxInfo.reasonCheck == "B" && (taxInfo.reasonMessage == undefined || taxInfo.reasonMessage == "")){
                  this.showMsg("原因B 账户持有人未能取得纳税人识别号，请投保人解释具体原因。\n")
                  return false
              }
            }
            if(!isHaveCHN){
              this.showMsg("投保人税收居民国及其相关信息须至少填写两项且含中国 。\n")
              return false
            }
          }
            return true
        },
        //校验受益人信息
        checkBnfData:function(){
          let products = this.policy.productInfo.products.product
          let isHDT042orHDT044 = false
          for(var i=0;i<products.length;i++){
            if(products[i].prodCode == "HDT024" || products[i].prodCode == "HDT042"){
              isHDT042orHDT044 = true
              break
            }
          }
          let bnfType = this.policy.custInfo.bnfInfo.bnfType
          if(bnfType != undefined && bnfType == "1"){
            //存在受益人
            if(isHDT042orHDT044){
              if(this.policy.custInfo.bnfInfo == undefined ||
                this.policy.custInfo.bnfInfo.beneficiaries==undefined || 
                this.policy.custInfo.bnfInfo.beneficiaries.beneficiary == undefined ||
                this.policy.custInfo.bnfInfo.beneficiaries.beneficiary.length < 2){
                this.showMsg("投保产品包含光大永明附加投保人豁免保险费重大疾病保险,光大永明附加投保人豁免保险费终身重大疾病保险,受益人至少录入两位!")
                return false
              } 
            }
            let beneficiaries = this.policy.custInfo.bnfInfo.beneficiaries
            if(beneficiaries != undefined){
              //存在受益人
              let beneficiary = beneficiaries.beneficiary
              let insuredBeneficiary = []
              let applicantBeneficiary = []
              for(var i=0;i<beneficiary.length;i++){
                if(beneficiary[i].belongWith == "1"){
                  insuredBeneficiary.push(beneficiary[i])
                }else{
                  applicantBeneficiary.push(beneficiary[i])
                }
              }
              let isOk = false
              if(insuredBeneficiary!=undefined && insuredBeneficiary.length>0){
                 if(insuredBeneficiary.length > 6){
                    this.showMsg("受益人总人数不超过6位!")
                    return false
                 }
                 let msg = this.checkBnfDetail(insuredBeneficiary)
                 if (msg != undefined && msg != "") {
                    this.showMsg(msg)
                    return false
                 }else{
                   isOk = true
                 }
                 msg = this.checkBnfCusInfo(insuredBeneficiary)
                 if (msg != undefined && msg != "") {
                    this.showMsg(msg)
                    return false
                 }else{
                   isOk = true
                 }
              }
              if(applicantBeneficiary!=undefined && applicantBeneficiary.length>0){
                 if(applicantBeneficiary.length > 6){
                    this.showMsg("受益人总人数不超过6位!")
                    return false
                 }
                 let msg = this.checkBnfDetail(applicantBeneficiary)
                 if (msg != undefined && msg != "") {
                    this.showMsg(msg)
                    return false
                 }else{
                   isOk = true
                 }
                 msg = this.checkBnfCusInfo(applicantBeneficiary)
                 if (msg != undefined && msg != "") {
                    this.showMsg(msg)
                    return false
                 }else{
                   isOk = true
                 }
              }
              let msg = this.checkBnfBelongWith(beneficiary)
              if(msg != undefined && msg != "") {
                this.showMsg(msg)
                return false
              }else{
                isOk = true
              }
              return isOk
            }else{
              this.showMsg("已选择指定受益人,请填写受益人信息！\n")
              return false
            }
          }else{
            return true
          }
        },
        checkBnfDetail(beneficiary){
          for (var i = 0; i < beneficiary.length; i++) {
            let prefix = "受益人" + beneficiary[i].bfcyName
            let msg = utils.valid.uname(beneficiary[i].bfcyName)
            if (msg != undefined && msg != "") {
              // this.showMsg(msg)
              return prefix + msg
            }
            msg = utils.valid.ngbc2(beneficiary[i].bfcySex,beneficiary[i].bfcyBirthday,beneficiary[i].bfcyIdType,beneficiary[i].bfcyIdCode)
            if (msg != undefined && msg != "") {
              // this.showMsg(msg)
              return prefix + msg
            }
            //证件有效期
            msg = utils.valid.idCardValidity(beneficiary[i].bfcyIdExpDate)
            if (msg != undefined && msg != "") {
              // this.showMsg(msg)
              return prefix + msg
            }else{
              if(beneficiary[i].bfcyIdType == "20"){//出生证
                let tempDate = new Date(beneficiary[i].bfcyBirthday)
                let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
                let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
                let tempBir = tempDate.getFullYear() + 3 + '-' + tempMonth + '-' + tempDay;
                if(beneficiary[i].bfcyIdExpDate != tempBir){
                  // this.showMsg("受益人证件有效期应为" + tempBir)
                  return prefix + "受益人证件有效期应为" + tempBir
                }
              }else if(beneficiary[i].bfcyIdType == "12"){//户口本
                let tempDate = new Date(beneficiary[i].bfcyBirthday)
                let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
                let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
                let tempBir = tempDate.getFullYear() + 16 + '-' + tempMonth + '-' + tempDay;
                if(beneficiary[i].bfcyIdExpDate != tempBir){
                  // this.showMsg("受益人证件有效期应为" + tempBir)
                  return prefix + "受益人证件有效期应为" + tempBir
                }
              }
            }
            if(beneficiary[i].relToIns == undefined || beneficiary[i].relToIns == ""){
              // this.showMsg("与被保人关系不能为空,请填写！")
              return prefix + "与被保人关系不能为空,请填写！"
            }
            if(beneficiary[i].bfcyLevel == undefined || beneficiary[i].bfcyLevel == ""){
              // this.showMsg("受益顺序不能为空,请填写！")
              return prefix + "受益顺序不能为空,请填写！"
            }
            if(beneficiary[i].bfcyLevel > 5 || beneficiary[i].bfcyLevel < 1){
              // this.showMsg("受益顺序只能填写1~5数字,请填写！")
              return prefix + "受益顺序只能填写1~5数字,请填写！"
            }
            if(isNaN(beneficiary[i].bfcyLevel)){
              // this.showMsg("受益顺序只能填写数字,请填写！")
              return prefix + "受益顺序只能填写数字,请填写！"
            }
            if(beneficiary[i].bfcyRatio == undefined || beneficiary[i].bfcyRatio == ""){
              // this.showMsg("受益比例不能为空,请填写！")
              return prefix + "受益比例不能为空,请填写！"
            }
            if(beneficiary[i].bfcyRatio > 100 || beneficiary[i].bfcyRatio < 1){
              // this.showMsg("受益比例只能填写1~100数字,请填写！")
              return prefix + "受益比例只能填写1~100数字,请填写！"
            }
            if(isNaN(beneficiary[i].bfcyRatio)){
              // this.showMsg("受益比例只能填写数字,请填写！")
              return prefix + "受益比例只能填写数字,请填写！"
            }
            if(i == 0){
              if(beneficiary[i].bfcyLevel != "1"){
                // this.showMsg("受益顺序请从1开始,请填写！")
                return prefix + "受益顺序请从1开始,请填写！"
              }
            }else{
              let bfcyLevels = Number(beneficiary[i].bfcyLevel) - Number(beneficiary[i-1].bfcyLevel)
              if(bfcyLevels != 1 && bfcyLevels != 0){
                // this.showMsg("受益顺序请从从1开始，连续数字,请填写！")
                return prefix + "受益顺序请从从1开始，连续数字,请填写！"
              }
            }
          }
          var maxNum = 5
          var dataArr = beneficiary
          var benefitArrs = [];
          for(var i=1; i<=maxNum; i++){
              var benefitArr = [];
              benefitArrs.push(benefitArr);
          }
          //赋值
          for(var benefitNum in dataArr){
              var benefit = dataArr[benefitNum];
              benefitArrs[benefit.bfcyLevel-1].push(benefit)
          }
          console.log("benefitArrs")
          console.log(benefitArrs)
          //校验顺序添加
          for(var num in benefitArrs){
              var benefitArr = benefitArrs[num];
              var benefit;
              var allPercentage = 0;//总比率
              if (benefitArr.length<=5){
                  for (var num1=0;num1<benefitArr.length;num1++){
                      benefit = benefitArr[num1];
                      if (benefit.bfcyRatio > 100){
                        // this.showMsg('第'+benefit.bfcyLevel+'受益人:'+benefit.bfcyName+'的收益比例不得超过100')
                          return '第'+benefit.bfcyLevel+'受益人:'+benefit.bfcyName+'的收益比例不得超过100'
                      }else if(benefit.bfcyRatio <= 0){
                          // this.showMsg('第'+benefit.bfcyLevel+'受益人:'+benefit.bfcyName+'的收益比例不得小于等于0')
                          return '第'+benefit.bfcyLevel+'受益人:'+benefit.bfcyName+'的收益比例不得小于等于0'
                      }else {
                          allPercentage += Number(benefit.bfcyRatio);
                      }
                      if (num1 == benefitArr.length - 1){
                          if (allPercentage != 100){
                              // this.showMsg('第'+benefit.bfcyLevel+'受益人总比率需为100%!')
                              return '第'+benefit.bfcyLevel+'受益人总比率需为100%!'
                          }
                      }
                  }
              }else if (benefitArr.length > 5){
                // this.showMsg('第一序位受益人不得超过5人')
                  return '第一序位受益人不得超过5人'
              }
          }
        },
        checkBnfBelongWith(beneficiary){
          let products = this.policy.productInfo.products.product
          let isHDT042orHDT044 = false
          let isHDT042 = false
          let isHDT024 = false
          for(var i=0;i<products.length;i++){
            if(products[i].prodCode == "HDT024" || products[i].prodCode == "HDT042"){
              isHDT042orHDT044 = true
              break
            }
          }
          for(var i=0;i<products.length;i++){
            if(products[i].prodCode == "HDT024"){
              isHDT024 = true
              break
            }
          }
          for(var i=0;i<products.length;i++){
            if(products[i].prodCode == "HDT042"){
              isHDT042 = true
              break
            }
          }
          let isApp = false
          let isIns = false
          if(isHDT042){
            for(var i=0;i<beneficiary.length;i++){
              let oldBenef = beneficiary[i]
              if(oldBenef.belongWith == "0"){
                isApp = true
              }
              if(oldBenef.belongWith == "1"){
                isIns = true
              }
            }
            if(!isApp){
              return "选择附加投保人豁免保险费终身重大疾病时，被保险人受益人与豁免险被保险人受益人需同时法定或同时指定。"
            }
            if(!isIns){
              return "选择附加投保人豁免保险费终身重大疾病时，被保险人受益人与豁免险被保险人受益人需同时法定或同时指定。"
            }
          }
        },
        checkBnfCusInfo(beneficiary){
          for(var i=0;i<beneficiary.length;i++){
            let oldBenef = beneficiary[i]
            for(var j=i+1;j<beneficiary.length;j++){
              let nextBenef = beneficiary[j]
              if(oldBenef!=undefined&&nextBenef!=undefined){
                if(oldBenef.bfcyName == nextBenef.bfcyName){
                    if(oldBenef.bfcySex == nextBenef.bfcySex){
                      if(oldBenef.bfcyBirthday == nextBenef.bfcyBirthday){
                        if(oldBenef.bfcyIdType == nextBenef.bfcyIdType){
                          if(oldBenef.bfcyIdCode == nextBenef.bfcyIdCode){
                            return "请勿重复添加受益人!"
                          }
                        }
                      }
                    }
                  }
                }
              }
          }
          console.log("===================受益人重复通过==========================")
        },
        //校验投保人银行信息
        checkPayAppntData(){
          let bankCode = this.policy.productInfo.bankCode
          if(bankCode == undefined || bankCode == ""){
            this.showMsg("付款银行不能为空,请选择！\n")
            return false
          }
          let bankAccNo = this.policy.productInfo.bankAccNo
          let msg = utils.valid.BankCode(bankCode,bankAccNo)
          if (msg != undefined && msg != "") {
            this.showMsg(msg)
            return false
          }
          return true
        },
        //被保人信息校验
        checkCustInsurantData:function(){
          //获取被保人信息
          let insurant = this.policy.custInfo.insurants.insurant[0]
          let prefix = "被保险人"+insurant.name
          //校验姓名
          let msg = utils.valid.uname(insurant.name)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //校验国籍,性别,生日,证件类型,证件号码
          msg = utils.valid.ngbc(insurant.nativePlace,insurant.sex,insurant.birthday,insurant.idType,insurant.idNo)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }else{
            if(insurant.idType == "20"){//出生证
              // var date = new Date(insurant.birthday)
              // let tempBir = date.getFullYear() + 3 +"-"+date.getMonth()+1+"-"+date.getDate()
              let tempDate = new Date(insurant.birthday)
              let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
              let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
              let tempBir = tempDate.getFullYear() + 3 + '-' + tempMonth + '-' + tempDay;
              if(insurant.idExpDate != tempBir){
                this.showMsg(prefix + "证件有效期应为" + tempBir)
                return false
              }
            }else if(insurant.idType == "12"){//户口本
              // var date = new Date(insurant.birthday)
              // let tempBir = date.getFullYear() + 16 +"-"+date.getMonth()+1+"-"+date.getDate()
              let tempDate = new Date(insurant.birthday)
              let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
              let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
              let tempBir = tempDate.getFullYear() + 16 + '-' + tempMonth + '-' + tempDay;
              if(insurant.idExpDate != tempBir){
                this.showMsg(prefix + "证件有效期应为" + tempBir)
                return false
              }
            }
          }
          //证件有效期
          msg = utils.valid.idCardValidity(insurant.idExpDate)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //婚姻
          let marriage = insurant.marriage
          if(marriage == undefined || marriage == ""){
            this.showMsg(prefix + "婚姻不能为空！\n")
            return false
          }
          //省,市,联系地址
          msg = utils.valid.contactAddress(insurant.province,insurant.city,insurant.county,insurant.postalAddress,insurant.street,insurant.community)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //邮政编码
          let zipCode = insurant.zipCode
          if(zipCode == undefined || zipCode == ""){
            this.showMsg(prefix + "邮政编码不能为空！\n")
            return false
          }
          if(isNaN(zipCode)){
            this.showMsg(prefix + "邮政编码只能填写数字！\n")
            return false
          }
          if(zipCode == "000000"){
            this.showMsg(prefix + "邮政编码不能为000000！\n")
            return false
          }
          if(this.edition == '1'){
            //邮箱
            msg = utils.valid.email(insurant.email)
            if (msg != undefined && msg != "") {
              this.showMsg(prefix + msg)
              return false
            }
          }
          if(this.ageFilter(insurant.birthday) < 18){
            if(insurant.mobile != undefined && insurant.mobile!=""){
              this.showMsg(prefix + "年龄小于18周岁,手机号不可填写!")
              return false
            }
          }else{
            //手机号
            msg = utils.valid.mobilePhone(insurant.mobile)
            if (msg != undefined && msg != "") {
              this.showMsg(prefix + msg)
              return false
            }
          }
          //家庭电话
          msg = utils.valid.homePhoneNum(insurant.homePhoneCode,insurant.homePhone)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //公司电话
          msg = utils.valid.homePhoneNum(insurant.companyPhoneCode,insurant.companyPhone)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //职业 被保大于6周岁职业必填
          if(this.ageFilter(insurant.birthday) > 6){
            msg = utils.valid.occupation(insurant.occupationCode)
            if (msg != undefined && msg != "") {
              this.showMsg(prefix + msg)
              return false
            }
          }
          if(this.ageFilter(insurant.birthday) < 7){
            if(insurant.grpName!=undefined && insurant.grpName!=""){
              this.showMsg(prefix + "年龄小于7周岁,工作单位或就读学校不可填写!")
              return false
            }
          }else if(this.ageFilter(insurant.birthday) >= 7){
            //工作单位
            msg = utils.valid.grpName(insurant.grpName)
            if (msg != undefined && msg != "") {
              this.showMsg(prefix + msg)
              return false
            }
          }
          
          //小于18岁且为学生
          // if(this.ageFilter(insurant.birthday) < 18 && insurant.occupationCode == "1001004"){
          // }else{
          //   msg = utils.valid.salary(insurant.salary)
          //   if (msg != undefined && msg != "") {
          //     this.showMsg(msg)
          //     return false
          //   }
          // }
          //大于18且不等于学生
          if(this.ageFilter(insurant.birthday) > 18 && insurant.occupationCode != "1001004"){
            msg = utils.valid.salary(insurant.salary)
            if (msg != undefined && msg != "") {
              this.showMsg(prefix + msg)
              return false
            }
          }
          let relToApp = this.policy.custInfo.insurants.insurant[0].relToApp
          if(relToApp == undefined || relToApp == ""){
            this.showMsg("投保人与被保险人关系不能为空！\n")
            return false
          }
          return true
        },
        //投保人信息校验
        checkCustAppntData:function(){
          //获取被保人信息
          let appnt = this.policy.custInfo.appnt
          let prefix = "投保人"+appnt.appntName
          //校验姓名
          let msg = utils.valid.uname(appnt.appntName)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //校验国籍,性别,生日,证件类型,证件号码
          msg = utils.valid.ngbc(appnt.nativePlace,appnt.appntSex,appnt.appntBirthday,appnt.idType,appnt.idNo)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          if(appnt.idType == "12" || appnt.idType == "20"){
            this.showMsg(prefix + "不允许选择户口本或出生证！\n")
            return false
          }
          if(this.ageFilter(appnt.appntBirthday) < 18){
            this.showMsg(prefix + "年龄不能小于18周岁！\n")
            return false
          }
          //证件有效期
          msg = utils.valid.idCardValidity(appnt.idExpDate)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }else{
            if(appnt.idType == "20"){//出生证
              let tempDate = new Date(appnt.appntBirthday)
              let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
              let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
              let tempBir = tempDate.getFullYear() + 3 + '-' + tempMonth + '-' + tempDay;
              if(appnt.idExpDate != tempBir){
                this.showMsg(prefix + "证件有效期应为" + tempBir)
                return false
              }
            }else if(appnt.idType == "12"){//户口本
              let tempDate = new Date(appnt.appntBirthday)
              let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
              let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
              let tempBir = tempDate.getFullYear() + 16 + '-' + tempMonth + '-' + tempDay;
              if(appnt.idExpDate != tempBir){
                this.showMsg(prefix + "证件有效期应为" + tempBir)
                return false
              }
            }
          }
          //婚姻
          let marriage = appnt.marriage
          if(marriage == undefined || marriage == ""){
            this.showMsg(prefix + "婚姻不能为空！\n")
            return false
          }
          //省,市,联系地址
          msg = utils.valid.contactAddress(appnt.province,appnt.city,appnt.county,appnt.postalAddress,appnt.street,appnt.community)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //邮政编码
          let zipCode = appnt.zipCode
          if(zipCode == undefined || zipCode === ""){
            this.showMsg(prefix + "邮政编码不能为空！\n")
            return false
          }
          if(isNaN(zipCode)){
            this.showMsg(prefix + "邮政编码只能填写数字！\n")
            return false
          }
          if(zipCode == "000000"){
            this.showMsg(prefix + "邮政编码不能为000000！\n")
            return false
          }
          //邮箱
          msg = utils.valid.email(appnt.email)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //手机号
          msg = utils.valid.mobilePhone(appnt.mobile)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //家庭电话
          msg = utils.valid.homePhoneNum(appnt.homePhoneCode,appnt.homePhone)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //公司电话
          msg = utils.valid.homePhoneNum(appnt.companyPhoneCode,appnt.companyPhone)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //职业
          msg = utils.valid.occupation(appnt.occupationCode)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //工作单位
          msg = utils.valid.grpName(appnt.grpName)
          if (msg != undefined && msg != "") {
            this.showMsg(prefix + msg)
            return false
          }
          //银保版本特有字段校验
          if(this.edition == "1"){
            //婚姻
            let residentType = appnt.residentType
            if(residentType == undefined || residentType == ""){
              this.showMsg(prefix + "居民类型不能为空！\n")
              return false
            }
            //年收入
            msg = utils.valid.salary(appnt.salary)
            if (msg != undefined && msg != "") {
              this.showMsg(prefix + msg)
              return false
            }
            //家庭年收入
            msg = utils.valid.familySalay(appnt.familySalay)
            if (msg != undefined && msg != "") {
              this.showMsg(prefix + msg)
              return false
            }
            //保费预算
            msg = utils.valid.premBudget(appnt.premBudget)
            if (msg != undefined && msg != "") {
              this.showMsg(prefix + msg)
              return false
            }
          }else{
            //年收入
            msg = utils.valid.salary(appnt.salary)
            if (msg != undefined && msg != "") {
              this.showMsg(prefix + msg)
              return false
            }
          }
          return true
        },
        showMsg:function(msg){
          if(msg != undefined && msg != ""){
            this.$refs.alert.showMOdal(msg)
          }
        },
        showHint(){
          this.$refs.alert.showMOdal("1、中国税收居民是指在中国境内有住所,或者无住所而在境内住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内居住365日。临时离境的,不扣减日数。临时离境,是指在一次纳税年度中一次不超过30日或者多次累计不超过90日的离境。<br/>2、非居民是指中国税收居民以外的个人。<br/>3、其他国家(地区)税收居民身份认定规则及纳税人识别号相关信息请参见国家税务总局网站http://www.chinatax.gov.cn/aeoi_index.html。")
        },
        //添加受益人
        addBnfInfo(){
          this.policy.custInfo.bnfInfo.beneficiaries.bnfCount++
          this.bfcySortNum++
          let bnfInfo = {
            bfcyLevel:"",//受益顺序
            bfcyName:"",//姓名
            sexChoice:true,
            bfcySex:"1",//性别
            bfcyBirthday:"",//生日
            bfcyIdType:"11",//证件类型
            bfcyIdCode:"",//证件号码
            phone:"",//手机号码
            postalAddress:"",//详细地址
            city:"",//市区
            province:"",//省份
            //职业
            bfcyIdExpDate:"",//证件有效期
            relToIns:"",//与被保人关系
            bfcyRatio:"",//受益比例
            belongWith:"1",//隶属第几被保人
            bfcyNativePlace:"CHN",//国籍
            isShow:true,
            is_show:true,
            bfcyLevelNum:this.bfcySortNum
          }
          this.policy.custInfo.bnfInfo.beneficiaries.beneficiary.push(bnfInfo)
          console.log("受益人排序++",bnfInfo.bfcyLevelNum)
          console.log("添加受益人数组",bnfInfo)
        },
        addRevenue(index){
          if(index == "1"){
            this.policy.custInfo.appnt.appntTaxInfo.birthCountry = ""
            this.policy.custInfo.appnt.appntTaxInfo.birthProvince = ""
            this.policy.custInfo.appnt.appntTaxInfo.birthCity = ""
            this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo = []
            this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.push({reasonCheck:"",reasonMessage:"",taxArea:"",tin:""})
          }else if(index == "2"){
            this.policy.custInfo.appnt.appntTaxInfo.birthCountry = ""
            this.policy.custInfo.appnt.appntTaxInfo.birthProvince = ""
            this.policy.custInfo.appnt.appntTaxInfo.birthCity = ""
            this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo = []
            this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.push({reasonCheck:"",reasonMessage:"",taxArea:"",tin:""})
            this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.push({reasonCheck:"",reasonMessage:"",taxArea:"",tin:""})
          }else{
            this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.push({reasonCheck:"",reasonMessage:"",taxArea:"",tin:""})
          }
        },
        //移除受益人
        removeBnf:function(index){
          this.policy.custInfo.bnfInfo.beneficiaries.bnfCount--
          this.policy.custInfo.bnfInfo.beneficiaries.beneficiary.splice(index, 1);
        },
        //删除税收信息
        removeRevenue(index){
          this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.splice(index, 1);
        },
        //增加投保人税收声明原因
        addAppntTaxInfo(){
          let taxInfo = {
                taxArea: "", //税收居民国(地区)
                tin: "", //居民国(地区)纳税人编号
                reasonCheck: "", //无法提供纳税人编号原因
                reasonMessage: "" //原因描述
              }
          this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.push(taxInfo)
        },
        //移除投保人税收声明原因
        removeAppntTaxInfo(index){
          this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.splice(index, 1);
        },
        //客户查询组件操作
        customerSearch:function(tag,index){
          this.customerValue.isopen = !this.customerValue.isopen
          this.customerValue.type = tag
          this.customerValue.index = index
          if(tag == global_constant.constant.TAG_SEARCH_CUS_BNF){

          }
        },
        //职业查询组件操作
        occupationSearch:function(tag,index){
          this.occupationValue.isopen = !this.occupationValue.isopen
          this.occupationValue.type = tag
          this.occupationValue.index = index
        },
        //身份证识别组件操作
        cardScanning:function(tag,index){
          this.cardScanningValue.isopen = !this.cardScanningValue.isopen
          this.cardScanningValue.type = tag
          this.cardScanningValue.index = index
        },
        photograph:function(tag){
          console.log(tag)
        },
        cameraTakePicture:function(mySourceType) {
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: mySourceType
        })
        },
        textclick:function(){
          var insuredIdType = $("#insuredIdType").val();
          console.log(insuredIdType)
        },
        toInformPage:function(){
          let pass = this.checkData()
          if (pass) {
            this.$router.push({
              path:'/policy/inform_page.vue',
              name:'inform_page',
              params:{
                policyName:this.optionsValue
              }
            })
          }
        },
        //保费试算
        baofeiTest(callback,callback2){
          if(this.proposalPlan.holder.birthday == undefined || this.proposalPlan.holder.birthday==""){
            this.showMsg("请填写投保人出生日期！\n")
            return
          }
          if(this.proposalPlan.insurantProductList[0].insurant.birthday == undefined || this.proposalPlan.insurantProductList[0].insurant.birthday ==""){
            this.showMsg("请填写被保险人出生日期！\n")
            return
          }
          let requ = JSON.parse(JSON.stringify({
            proposalPlan:this.proposalPlan
          }))
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
          let product = requ.proposalPlan.insurantProductList[0].productList[0]
          if(product.attList!=undefined && product.attList.length>0){
            for(var i=0;i<product.attList.length;i++){
              if(product.attList[i].attCode == "payMode"){
                product.attList[i].attValue = product.payMode
              }
              if(product.attList[i].attCode == "payPeriod"){
                product.attList[i].attValue = product.payPeriod
              }
              if(product.attList[i].attCode == "policyPeriod"){
                product.attList[i].attValue = product.policyPeriod
              }
              if(product.attList[i].attCode == "drawAge"){
                product.attList[i].attValue = product.drawAge
              }
              if(product.attList[i].attCode == "drawMode"){
                product.attList[i].attValue = product.drawMode
              }
              if(product.attList[i].attCode == "drawFreq"){
                product.attList[i].attValue = product.drawFreq
              }
              if(product.attList[i].attCode == "amount"){
                product.attList[i].attValue = product.amount
              }
              if(product.attList[i].attCode == "piece"){
                product.attList[i].attValue = product.piece
              }
              if(product.attList[i].attCode == "premium"){
                product.attList[i].attValue = product.premium
              }
              if(product.attList[i].attCode == "rank"){
                product.attList[i].attValue = product.rank
              }
            }
          }
          console.log('保费试算request：',requ)
          utils.http.postFast('PRODUCTPREMIUM',requ,(body)=>{
            console.log('保费试算response:',body.trialPremiumMobile)
            if(callback != undefined){
              callback(body.trialPremiumMobile)
            }
            let insurantProduct = body.trialPremiumMobile.insurantProductList[0]
            let isPass = insurantProduct.checkResult.isPass
            let pass = insurantProduct.checkResult.pass
            if(isPass=="true" && pass=="true"){
              this.current_total_premium = insurantProduct.plan.totalPremium
              let productList = insurantProduct.plan.productList
              let products = {
                totalPremium:"",
                totalAmount:"",
                main:{
                  premiumDes:"",
                  productCode:"",
                  amount:""
                },
                extras:[]
              }
              products.totalPremium = insurantProduct.plan.totalPremium
              products.totalAmount = insurantProduct.plan.totalAmount
              for(var i=0;i<productList.length;i++){
                products.main.productCode = productList[i].productCode
                products.main.premiumDes = productList[i].premiumDes
                products.main.amount = productList[i].amount
                let extraList = productList[i].extraList
                for(var j=0;j<extraList.length;j++){
                  let product = {}
                  product.productCode = extraList[j].productCode
                  product.premiumDes = extraList[j].premiumDes
                  product.amount = extraList[j].amount
                  products.extras.push(product)
                }
              }
              this.policy.productInfo.sumAmntL = products.totalAmount
              this.policy.productInfo.sumPremL = products.totalPremium
              let tempProducts = this.policy.productInfo.products.product
              for(var i=0;i<tempProducts.length;i++){
                if(tempProducts[i].isMaster == "1"){
                  if(tempProducts[i].prodCode == products.main.productCode){
                    tempProducts[i].prem = products.main.premiumDes
                    tempProducts[i].amnt = products.main.amount
                  }
                }else{
                  for(var j=0;j<products.extras.length;j++){
                    let extras = products.extras[j]
                    if(tempProducts[i].prodCode == extras.productCode){
                      tempProducts[i].prem = extras.premiumDes
                      tempProducts[i].amnt = extras.amount
                    }
                  }
                }
              }
              console.log("更新产品试算结果")
              console.log(this.policy.productInfo)
            }else{
              let reasonList = insurantProduct.checkResult.reasonList
              let message = ""
              for (var i = 0; i < reasonList.length; i++) {
                message += reasonList[i].info
              }
              this.current_total_premium = "???"
              if(callback2!=undefined){
                callback2(message)
              }
              console.log('保费试算问题===>'+message)
            }
          })
        }
      }
   }
</script>

<style>
  .insurantCard input{
    text-align: right;
    padding-right: 10px;
  }
  .radio-content{
    background: #ffffff;
    font-size: 12px;
  }
  .mint-cell{
  min-height: 42px!important;
  }
  .radio-item{
    min-height: 42px;
    line-height: 42px;
		padding-left: 15px;
    display: flex;
    justify-content: space-between;
  }
  .radio-list{
    display: flex;
     min-height: 42px;
    line-height: 42px;
  }
  .radio-text{
    min-height: 42px;
    line-height: 42px;
    padding-left:13px;
		overflow: hidden;
		white-space:nowrap;
		text-overflow: ellipsis;
  }
  .radio-depict{
    min-height: 42px;
    line-height: 42px;
    padding-left:13px;
  }
  .inputText{
    width: 20%;
  }
  .select-recognizee{
    padding:7px  15px;
    background-color: #F0F0F0;
    height: 60%;
  }
  .nationality{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<style lang="scss" scoped type="text/css">
/*职业溢出设置*/
.validity{
  display: flex;
  justify-content:space-between;
}
.validity>div>p{
  display: inline-block;
  padding-right: 15px;
}
 .fa-angle-down{
        color:#FFAB00;
        font-size:25px; 
 }
.dotted_line {
        margin-left: 8px;
        margin-right: 8px;
        border-top:1px dashed #A3A2A2;
      }
  #adress{
    width: 100%;
    height: 45px;
    line-height: 45px;
    display: flex;
    justify-content: space-between;
    padding-right:15px;
    text-align:left;
    padding-left:20px; 
    .adress_text{
      width: 10%;
      text-align: right;
      padding-right:40px; 
    } 
    // .adress-wrapper{
    //   display: flex;
    //   height:50px;
    //   padding-left:20%;
    //   line-height: 50px;
    // }
    .adress_1{
      display: flex;
      width:50%;
      span{
        width: 30%;
      }
      #selectedProvince{
        padding-right: 0;
        width: 50%;
        direction:rtl;
        padding-right: 10px;

      }
      .fa-chevron-down {
        line-height: 40px;
      }
    }
    .adress_2{
      span{
        display: inline-block;
        width: 30%;
        height: 100%;
        line-height: 42px;
        text-align: left;
      }
      input{
        display: inline-block;
        width: 53%;
        height:42px;
        text-align: right;
        background-size: 13%;
        padding-right: 5px;
      }
      #selectedProvince{
        padding-right: 0;
        width: 39%;
        direction:rtl;
        padding-right: 10px;
      }
    }
    .tin{
        height: 80px;
        width: 100%;
        span{
          display: block;
          height: 40px;
          line-height: 40px;
          text-align: left;
          padding-left: 10px;
        }
        input{
          display: block;
          width: 100%;
          height: 40px;
          padding-left: 10px;
        }
      }
    .resaon{
      height: 110px;width: 100%;
      span{
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 10px;
      }
      textarea{
        margin-left:10px;
      }
    }
    .itobtn{
      display: block;
      width: 100%;
      height: 42px;
      display: flex;
      justify-content:space-around;
      button{
        background: #FFAC00;
        color:#FFF;
      }
    }
  }
	.workunit{
		min-width: 100px;
		overflow:hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
   #adress-copy{
    width: 100%;
    height: 135px;
    .adress-wrapper{
      display: flex;
      height:50px;
      padding-left:20%;
      line-height: 50px;
    }
    .adress_1{
      display: flex;
      width:40%;
      span{
        width: 30%;
      }
      #selectedProvince{
        padding-right: 0;
        width: 50%;
        direction:rtl;
        padding-right: 10px;

      }
      .fa-chevron-down {
        line-height: 40px;
      }
    }
    .adress_2{
      span{
        display: inline-block;
        width: 30%;
        height: 100%;
        line-height: 42px;
        text-align: left;
      }
      input{
        display: inline-block;
        width: 50%;
        height:42px;
        text-align: right;
        background: url('../../../static/img/policy/speak.png')no-repeat right center;
        background-size: 13%;
        padding-right: 30px;
      }
      #selectedProvince{
        padding-right: 0;
        width: 39%;
        direction:rtl;
        padding-right: 10px;
      }
    }
    .tin{
        height: 80px;width: 100%;
        span{
          display: block;
          height: 40px;
          line-height: 40px;
          text-align: left;
          padding-left: 10px;
        }
        input{
          display: block;
          width: 100%;height: 40px;
          padding-left: 10px;
        }
      }
    .resaon{
      height: 110px;width: 100%;
      span{
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 10px;
      }
      textarea{
        margin-left:10px;
      }
    }
    .itobtn{
      display: block;
      width: 100%;
      height: 42px;
      display: flex;
      justify-content:space-around;
      button{
        background: #FFAC00;
        color:#FFF;
      }
    }
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
.split{
  height:10px;
  background: #FFF;
}
  .item_title_person{
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 42px;
    border-bottom: 1px solid #DADADA;
    border-top: 1px solid #DADADA;
    background: #F0F0F0;
    .left{
      height:100%;
      line-height: 40px;
      padding-left:10px;
      color: #FEB101;
    }
    .right{
      height: 100%;
      line-height: 40px;
      overflow: hidden;
      position: relative;
      .toRight {
        position: absolute;
        right:0;
        top: 0;
      }
    }
  }
  .toRight{
    display: inline-block;
    line-height: 45px;
     padding-right:15px;
  }
  .over{
    width:50%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
  }
  .color{color:#FFAB00;}
  .flex{
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
  }
	select{
		border: none!important;
	}
  .item_title{
		  height: 40px;
	    line-height: 40px;
	    background: #F0F0F0;
	    border-bottom: 1px solid #DADADA;
      border-top: 1px solid #DADADA;
      padding-left: 15px;
      padding-right: 20px;
      display: flex;
      justify-content: space-between;
		.left{
			// float:left;
			i{
				color: #FEB101;
				font-size: 20px;
			}
			span{
        color: #FEB101;
        font-weight:500;
			}
		}
		.right{
			// float: right;
		  text-align: right;
			.fa-angle-right{
				margin-left: 10px;
			}
			select{
				width: 100px;
				height: 30px;
				margin-top:5px;
			}
			i{
				color: #FEB101;
				font-size: 20px;
			}
			.fa-angle-double-up{
        font-size: 25px;
			}
		}
	}

	.item-list {
    width: 100%;
		.content{
			width: 100%;
      font-size:12px!important; 
			ul{
        width: 100%;
        height: 100%;
				overflow: hidden;
				li{
					height: 45px;
					padding-left: 20px;
					line-height: 45px;
					background: #FFFFFF;
					.fa-angle-right{
						padding-left: 10px;
					}
					.left{
						height: 100%;
						/*padding-left: 10px;*/
					}
					.right{
						padding-right: 15px;
						height: 100%;
						text-align: center;
						i{
							color: #FEB101;
							line-height: 40px;
							font-size: 18px;
						}

						select{
							width: 100px;
							height: 30px;
							margin-top:5px;
						}

						input{
							line-height: 32px;
							padding-right: 5px;
							text-align: right;
						}
						.fa-calendar{
							padding-left: 10px;
						}
					}
				}
			}
		}
	}
.mumber-type{
  display: flex;
}
.designated-recipient{
    display:flex;
    justify-content: space-between;
    background-color: #F0F0F0!important;
    border-bottom: 1px solid #DADADA;
    border-top: 1px solid #DADADA;
}
.fa-angle-double-down{
  font-size: 25px !important;
}
.inmate{
  position: relative;
  top:3px;
}
#content{
  font-size: 12px!important;
  width: 100%;
  height: 100vh;
}
.bnfInfo-wrapper p,.bnfInfo-wrapper div,.bnfInfo-wrapper input{
	font-size:.7rem!important;
}
.bnfInfo-wrapper{
  width: 100%;
  font-size: 12px;
  ul{
     width: 100%;
     height: 100%;
     overflow: hidden;
    li{
    height: 45px;
    padding-left: 20px;
    line-height: 45px;
    background: #FFFFFF;
    input{
       text-align: right;
       padding-right: 5px;
     }
    .right 
    {
      padding-right:15px;
      height: 100%;
      text-align: center;
      i{
      color: #FEB101;
      line-height: 40px;
      font-size: 18px;
     }
    }
   }
  }
}
</style>
