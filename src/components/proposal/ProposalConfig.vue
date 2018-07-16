<template>
  <div class="add-manage-contents">
   <job v-show="occupationValue.isopen" v-model="occupationValue"></job>
   <img class="productImg" style="display: block; width:100%;" :src="'./static/img/common/'+productCode+'.jpg'" v-if="occupationValue.isopen == false"/>
   <div v-if="occupationValue.isopen == false">
   <div class="message-list-one">
      <div class="title">
        <i class="fa fa-user"></i>
        <span>被保险人信息</span>
      </div>
      <div class="content-proposal">
        <ul>
          <li>
            <p>姓名</p>
            <input v-model="proposalPlan.insurantProductList[0].insurant.name" type="text" placeholder="请输入姓名">
          </li>
          <li style="position: relative">
            <p>性别</p>
            <mt-switch v-model="insurantSexFlag" style="position: absolute;right: 0px;top: 4px;">
              <label style="position: absolute;right: 41px;bottom: -5px;font-size: 14px;color: #FFF;font-weight:bold;">{{proposalPlan.insurantProductList[0].insurant.sex == "1"?'男':''}}</label>
              <label style="position: absolute;right: 15px;bottom: -5px;font-size: 14px;font-weight:bold;color: #FFF;">
              {{proposalPlan.insurantProductList[0].insurant.sex == "2"?'女':''}}</label>
            </mt-switch>
          </li>
          <li>
            <p>出生日期</p>
            <!-- <label style="width:64%;display:inline-block; text-align:right;float: right;padding-right:10px;">{{proposalPlan.insurantProductList[0].insurant.birthday | dateFilterYear}}
              <i class="fa fa-calendar"></i>
            </label> -->
            <date-picker v-model="proposalPlan.insurantProductList[0].insurant.birthday" @change="test" style="width:65%;display:inline-block;text-align:right;float: right;padding-right:10px;"/>
          </li>
          <!-- <li @click="toggle.job = !toggle.job">
            <p>职业</p>
            <label v-html="job.desc"
              style="float: right;padding-right:10px;color:#666;
              width: 65%;height: 43px;text-align: right;
              overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
            </label>
          </li> -->
          <li @click="occupationValue.isopen = !occupationValue.isopen">
            <p>职业</p>
            <span style="float: right;width: 55%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: right;padding-right:10px;">{{job.desc}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="message-list-two">
      <div class="title">
        <i class="fa fa-file-text"></i>
        <span>投保选择</span>
      </div>
      <div class="content-proposal">
        <ul>
          <li>
            <p style="width: auto;float: left;">主险名称</p>
            <p style="width: 70%;text-align: right;
            padding-left:0;padding-right:10px;float: right;
            overflow: hidden;white-space: nowrap;
            text-overflow:ellipsis">{{productDef.productName}}</p>
          </li>
          <li v-for="(item,index) in productDef.attList">
            <p>{{item.attName}}</p>
            <picker v-model="proposalPlan.insurantProductList[0].productList[0][item.attCode]" code="code" :items="item.attValueList" @beforechange="beforeChooseMainItem()" @change="chooseMainItem(item)" v-if="item.attCode != 'amount' && item.attCode != 'premium'" ></picker>
            <input v-if="item.attCode == 'amount' || item.attCode == 'premium'"
            @blur="blurFocus()"
            style="width: 50%;padding-right:30px;padding-top:2px;position: response;"
            name="保险金额"
            placeholder="请输入金额" v-model="proposalPlan.insurantProductList[0].productList[0][item.attCode]"/>
            <b v-if="item.attCode == 'amount' || item.attCode == 'premium'" style="position: absolute;right: 10px;">元</b>
          </li>
          <li v-if="item.attCode=='amount'" v-for="(item,index) in productDef.attList">
            <p>主险保费</p>
            <p style="width: 60%;text-align: right;float: right;padding-right:10px;">{{zhuxianPremium}} 元</p>
          </li>
          <li v-if="item.attCode=='premium'" v-for="(item,index) in productDef.attList">
            <p>保险金额</p>
            <p style="width: 60%;text-align: right;float: right;padding-right:10px;">{{zhuxianMoney}} 元</p>
          </li>
          <li>
            <p>总保险费</p>
            <p style="width: 60%;text-align: right;float: right;padding-right:10px;">{{totalPremium}} 元</p>
          </li>
          <li class="extraList">
            <p>附加险选择</p>
            <!-- <select @change="chooseExtra" v-model="extra" style="width:60%;" class="select selectVal">
              <option value="">请选择附加险</option>
              <option v-for="(item,index) in productDef.extraList" :value="item">{{item.productName}}</option>
            </select> -->
            <picker @change="chooseExtra" 
            v-if="productDef.extraList!=null" 
            v-model="extraProductCode" :items="productDef.extraList" code="productCode" text="productName" default-text="请选择附加险"></picker>
          </li>
        </ul>
      </div>
    </div>

    <mt-popup v-model="toggle.extraEdit" position="center" style="width:100%;height:100%;">
      <mt-header title="已选附加险" style="background:#fafafa;color:#26a2ff;border-top:1px solid #ddd;">
        <mt-button @click="cancelExtra" slot="right">
          <i class="fa fa-fw fa-times"></i>
        </mt-button>
      </mt-header>
      <div class="fujia-content">
        <div v-for="(item,index) in extra.attList" style="overflow: hidden;">
          <p>{{item.attName}}</p>
          <picker v-model="extraEdit[item.attCode]" code="code" :items="item.attValueList" @change="chooseExtraItem(item)" v-if="item.attCode != 'amount' && item.attCode != 'premium' && item.attCode != 'piece'" ></picker>
          <input v-model="extraEdit[item.attCode]" class="amount" style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;"
          v-if="item.attCode == 'amount' || item.attCode == 'piece' || item.attCode == 'premium'">
        </div>
        <!-- <div v-if="extra.productCode == 'NPU012'">
          <p>追加保费起始年限</p>
           <input class="amount" style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;" placeholder="起始年限">
        </div>
         <div v-if="extra.productCode == 'NPU012'">
          <p>追加保费截止年限</p>
           <input class="amount" style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;" placeholder="截止年限">
        </div>
         <div v-if="extra.productCode == 'NPU012'">
          <p>追加保费</p>
           <input class="amount" style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;" placeholder="输入金额">
        </div> -->
        <input type="hidden" v-model="extraEdit.productName">
        <!-- <div class="supplementary">
         <p>追加保费</p>
         <input type="number" class="r_text">年至<input type="text" class="r_text">年期间
        </div> -->
        <p class="make-sure">
          <mt-button class="true-btn" @click="saveExtra">确定</mt-button>
        </p>
      </div>
    </mt-popup>

    <div class="riderList">
      <div class="title" @click="toggle.extraList = !toggle.extraList">
        <i class="fa fa-bars"></i>
        <span>附加险列表</span>
        <i class="fa fa-angle-double-down"
        style="-webkit-transition:all .2s ease-out;padding-left:5px;"
        :style="{'-webkit-transform':toggle.extraList?'rotate(180deg)':''}"></i>
      </div>
      <div class="content-proposal" v-show="toggle.extraList">
        <ul>
          <li v-for="(item,index) in proposalPlan.insurantProductList[0].productList[0].extraList" style="display: flex;padding:10px 0;position: relative;">
            <p style="width: 10%;padding-left:10px;">{{index + 1}}、</p>
            <p @click="chooseExtraList(item.productCode)" style="flex：1;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;width: 75%;">    {{item.productName}}</p>
            <i class="fa fa-trash-o"
            v-show = "item.productCode != productDef.bindCode"
            @click = "deleteExtra(item)"
            :disabled = "item.productCode == productDef.bindCode"
            style="padding-right:10px;color: #FEB101;position: absolute;right: 0;top: 16px;font-size: 30px;"></i>
            <i class="fa fa-trash-o"
            v-show = "item.productCode == productDef.bindCode"
            :disabled = "item.productCode == productDef.bindCode"
            style="padding-right:10px;color: #BBB;position: absolute;right: 0;top: 16px;font-size: 30px;"></i>
          </li>
        </ul>
      </div>
    </div>

    <div class="message-list-three" >
      <div class="title" style="padding-right:10px;">
        <i class="fa fa-user"></i>
        <span>投保人信息</span>
        <input type="checkbox" id="isSame" v-model="isSame" style="position:relative;top:12px;margin-right:5px;">
        <label for="isSame">本人</label>
      </div>
      <div class="content-proposal">
        <ul>
          <li>
            <p>姓名</p>
            <input v-model="proposalPlan.holder.name" placeholder="请输入姓名">
          </li>
          <li style="position: relativsetDate;">
            <p>性别</p>
            <span style="display: block;position: relative">
              <mt-switch v-model="holderSexFlag" style="position: absolute;right: 0px;top: 4px;">
                <label style="position: absolute;right: 41px;bottom: -5px;font-size: 14px;color: #FFF;font-weight:bold;">{{proposalPlan.holder.sex == '1'?'男':''}}</label>
                <label style="position: absolute;right: 15px;bottom: -5px;font-size: 14px;font-weight:bold;color: #FFF;">
                {{proposalPlan.holder.sex == '2'?'女':''}}</label>
              </mt-switch>
            </span>
          </li>
          <li>
            <p>出生日期</p>
            <!-- <label style="width:65%;display:inline-block;text-align:right;float: right;padding-right:10px;">
              {{proposalPlan.holder.birthday | dateFilterYear}}
              <i class="fa fa-calendar"></i>
            </label> -->
            <date-picker v-model="proposalPlan.holder.birthday" @change="test" style="width:65%;display:inline-block;text-align:right;float: right;padding-right:10px;"/>
          </li>
        </ul>
        <mt-popup
          style="width: 100%;height: 100%;overflow-y:auto;"
          v-model="toggle.job"
          position="right">
          <mt-search
            autofocus
            v-model="jobValue">
          </mt-search>
          <div class="job">
            <div class="jobTit" style="border-right:1px solid #BBB;width: 20%;">职业编码</div>
            <div class="jobTit" style="border-right:1px solid #BBB;width: 60%;">职业名称</div>
            <div class="jobTit" style="width: 19%">职业等级</div>
            <div class="jobContent" v-for="item in jobList" @click="chooseJob(item)">
              <div style="border-right:1px solid #BBB;width: 20%;line-height: 40px;">{{item.code}}</div>
              <div style="border-right:1px solid #BBB;width: 60%;margin-top:5px;">{{item.descr}}</div>
              <div style="width: 19%;line-height: 40px;">{{item.level}}</div>
            </div>
          </div>
        </mt-popup>
      </div>
    </div>

    <!-- <div class="message-list-four">
      <div class="title">
        <i class="fa fa-volume-control-phone"></i>
        <span>代理人信息</span>
      </div>
      <div class="content-proposal">
        <ul>
          <li>
            <p>姓名</p>
            <span>{{proposalPlan.orgAgent.agentName}}</span>
          </li>
          <li>
            <p>代理人工号</p>
            <span>{{proposalPlan.orgAgent.agentCode}}</span>
          </li>
          <li>
            <p>联系方式</p>
            <span>{{proposalPlan.orgAgent.mobile}}</span>
          </li>
        </ul>
      </div>
    </div> -->

    <div class="message-list-five">
      <div class="title" @click="toggle.info = !toggle.info">
        <i class="fa fa-question-circle-o"></i>
        <span>投保须知</span>
        <i class="fa fa-angle-double-down"
        style="-webkit-transition:all .2s ease-out;padding-right:5px;"
        :style="{'-webkit-transform':toggle.info?'rotate(180deg)':''}"></i>
      </div>
      <div class="content-proposal" v-show="toggle.info">
        <ul class="content-one" id="toubaoxuzhi">
          <li v-for="item in toubaoxuzhi">
            <span>{{item}}</span>
          </li>
        </ul>
        <div class="content-two">
          <img v-if="imgUrl != ''" :src="imgUrl" style="padding-top: 5px;padding-left:4%;" />
        </div>
      </div>
    </div>

    <mt-popup v-model="toggle.rule" style="width: 80%;max-height:270px;border-radius: 15px;">
    <div class="teshu-header" style="position: relative;">
      <b style="font-size:16px;font-weight: bold;">规则校验</b>
      <i class="fa fa-times-circle-o" slot="right" @click="toggle.rule = false"
      style="font-size:25px;color: #FFF;position: absolute;right: 10px;top: 10px;"></i>
    </div>
    <div class="alert-reasonList">
      <div class="alert-list">
        <div v-for="item in reasonList" 
           style="padding-left:15px;margin-bottom:10px;text-align:left;">{{item.info}}</div>
      </div>
    </div>
  </mt-popup>
  <div class="make-sure">
    <mt-button class="true-btn" @click="goto()" :disabled="localStorage == null">返回</mt-button>
    <mt-button class="true-btn" style="padding: 0;" @click="policy" :disabled="localStorage == null">在线投保</mt-button>
    <mt-button style="padding: 0;width: 40%;" class="true-btn" @click="saveProposal">生成计划书演示</mt-button>
  </div>
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
    <alert ref="showalert"></alert>
  </div>
  </div>
  </div>
</template>
<script>
import product from '../../assets/data/product.json'
import productDef from '../../assets/data/productDef.json'
import occupation from '../../assets/data/occupation.json'
import picker from '../common/Picker.vue'
import datePicker from '../common/DatePicker.vue'
import job from '../common/OccupationSearch.vue'
import { MessageBox } from 'mint-ui'
import alert from '../policy/common/alert.vue'
const temp = {
  amount:0,
  premium:0,
  drawAge:0,
  holder:{
    name:''
  },
  insurant:{
    name:''
  },
  ready:false
}
export default {
  name: 'proposalConfig',
  components:{picker,datePicker,job,alert},
  data() {
    return {
      localStorage:'',
      productDef:{},
      amount:"",
      productCode:utils.cache.get('productCode')?utils.cache.get('productCode'):'',
      holderSexFlag:true,
      insurantSexFlag:true,
      zhuxianPremium:'',
      zhuxianMoney:'',
      totalPremium:'',
      Seach:false,
      occupationValue: {
        isopen: false,
        type: '',
        occItem: ''
      },
      job:{
        code:'',
        desc:'党政机关、企事业单位负责人和行政管理人员',
        level:'1'
      },
      jobs:{
        code:'',
        desc:'党政机关、企事业单位负责人和行政管理人员',
        level:'1'
      },
      jobValue:'',
      jobList:occupation.occupation.item,
      toggle:{
        job:false,
        extraEdit:false,
        extraList:false,
        info:false,
        rule:false,
        coverStatus:false
      },
      extra:{},//产品定义当前附加险
      extraProductCode:'',
      extraEdit:{},
      extraMap:{},//
      agentInfo:{},
      toubaoxuzhi:[],
      reasonList:[],
      imgUrl:'',
      isSame:false,
      proposalPlan:{
        checkType:'2',
        planId:'',
        holder:{
          "name": "",
          "profession": "",
          "sex": "1",
          "birthday": "1980-01-01"
        },
        insurantProductList:[{
          insurant:{
            "birthday": "1980-01-01",
            "level": "1",
            "name": "",
            "profession": "0001001",
            "sex": "1",
            "relationNew":""
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
            "amount": utils.cache.get('productCode')?product[utils.cache.get('productCode')].amount:'',
            "premium": "10000.00",
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
      }
    }
  },
  methods:{
    test(t){
      console.log(t)
    },
    goto(){
      this.go('../list')
    },
    holderChooseJob(type){
     this.occupationValue.isopen = !this.occupationValue.isopen
     this.occupationValue.type = type
    },
    selectJob(item){
      this.jobs.desc = item.descr
    },
    policy(){
      this.proposalPlan.insurantProductList[0].insurant.desc = this.job.desc
      utils.cache.set('proposalPlan',this.proposalPlan)
      utils.cache.set('productCodeDetail',this.proposalPlan.insurantProductList[0].productList[0].productCode)
      if(this.reasonList.length>0){
            this.toggle.rule = true
        }else{
          /*建议书跳转到在线投保传old，从在线投保正常跳转传new*/
            this.go({name:"product_details_page",params:{planId:"new"}})
      }
    },
    blurFocus(){
      this.baofeiTest()
    },
    setDate(flag){
      let dateObj = (flag == 'holder')?this.proposalPlan.holder.birthday:this.proposalPlan.insurantProductList[0].insurant.birthday
      this.$calendar.show({
        year:[1925,2080],
        date:dateObj.substr(0,10),
        onOk:(date)=>{
          const dateArray = date.split('-')
          const fillZero = value => {
            if(value.length == 1){
              value = '0'+value
            }
            return value
          }
          dateObj = dateArray[0] + '-' + fillZero(dateArray[1]) + '-' +fillZero(dateArray[2])
          if(flag == 'holder'){
            this.proposalPlan.holder.birthday = dateObj
          }else {
            this.proposalPlan.insurantProductList[0].insurant.birthday = dateObj
          }
        },
        onCancel:()=>{
          console.log('关闭')
        }
      })
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
    chooseJob:function(item){
      this.jobs.desc = item.descr
      this.toggle.job = false
      this.proposalPlan.insurantProductList[0].insurant.level = item.level
      this.proposalPlan.insurantProductList[0].insurant.profession = item.code
    },
    getProductDef(productCode){
      let requ = {
        "productDef": {
          "agentCode":utils.cache.get('personsal')?utils.cache.get('personsal').agentCode:'1100D12336',
          "productCode": productCode,
          "token": new Date().getTime(),
          "openId": "1"
        }
      }
      utils.http.post('PRODUCTDEFLIST',requ).then(response =>{
        this.productDef = response.data.response.productDefList[0]
        console.log('保单信息为........',this.productDef.attList)
        for(var extra of this.productDef.extraList){
          this.extraMap[extra.productCode] = extra
        }
        let productMain = this.proposalPlan.insurantProductList[0].productList[0]
        if(this.$route.params.planId == 'new'){
          productMain.productCode = this.productDef.productCode
          productMain.productName = this.productDef.productName
          productMain.attList = this.productDef.attList
          for(let item of this.productDef.attList){
            if(item.attValueList.length>0){
              productMain[item.attCode] = item.attValueList[0].code
              productMain[item.attCode+'Name'] = item.attValueList[0].text
            }
          }
          if(this.productDef.bindCode != ''){
            this.toggle.extraList = true
            for(let item of this.productDef.bindExtraList){
              let extra = {
                productCode:item.productCode,
                productName:item.productName,
                checked:'checked',
                disabled:'disabled'
              }
              for(let att of item.attList){
                extra[att.attCode] = att.attValueList[0].code
                extra[att.attCode+'Name'] = att.attValueList[0].text
              }
              let existProduct = false
              for(let item of productMain.extraList){
                if(item.productCode == extra.productCode){
                  existProduct = true
                }
              }
              if(!existProduct){
                productMain.extraList.push(extra)
              }
            }
          }
        }else{
          productMain.attList = this.productDef.attList
        }
        this.baofeiTest()
      })
    },
    extraConfig(item){
      for(var extra of this.productDef.extraList){
        if(extra.productCode == item.productCode){
          this.extra = extra
          this.extraMap[extra.productCode] = extra
          this.toggle.extraEdit = true
          break;
        }
      }
    },
    chooseExtraList(productCode){
      for(let i of this.productDef.extraList){
        if(i.productCode == productCode){
          this.extra = Object.assign({},i)
          this.extraProductCode = productCode
          this.chooseExtra()
          break
        }
      }
    },
    chooseExtra(){
      this.extra = Object.assign({},this.extraMap[this.extraProductCode])
      console.log(this.extra.attList,"...........")
      if(this.extra.productCode === 'HDT042' || this.extra.productCode === 'HDT024'){
        let payPeriod = this.proposalPlan.insurantProductList[0].productList[0].payPeriod
        if(payPeriod.indexOf('term') !== -1){
          this.extra.attList[1].attValueList[0].text = (parseInt(payPeriod.split('_')[1],10)-1)+'年'
        }
        console.log(this.extra.attList[1].attValueList[0].text)
      }
      if(this.extra.productCode === 'HDT024'){
        this.extra.attList[2].attValueList[0].text = this.proposalPlan.insurantProductList[0].productList[0].payPeriodName
      }
      if(this.extra.productCode === 'NPU012'){
        let Initial = {
            attCode:"premium",
            attName:"追加保费起始年限",
            attValueList:Array(0),
            attViewType:"2",
            className:"ProductAttribute"
        }
        let  Deadline = {
            attCode:"premium",
            attName:"追加保费截止年限",
            attValueList:Array(0),
            attViewType:"2",
            className:"ProductAttribute"
        }
        let supplementary = {
            attCode:"premium",
            attName:"追加保费",
            attValueList:Array(0),
            attViewType:"2",
            className:"ProductAttribute"
        }
        this.extra.attList.push(Initial)
        this.extra.attList.push(Deadline)
        this.extra.attList.push(supplementary)
      }
      let exist = false
      for(let item of this.proposalPlan.insurantProductList[0].productList[0].extraList){
        if(item.productCode == this.extra.productCode){
          exist = true
          this.extraEdit = Object.assign({},item)
          this.extraEdit.amount = item.amount
          break
        }
      }
      if(!exist){
        for(let item of this.extra.attList){
          if(['amount','premium','piece'].indexOf(item.attCode) == -1){
            this.extraEdit[item.attCode] = item.attValueList[0].code
            this.extraEdit[item.attCode+'Name'] = item.attValueList[0].text
          }
          this.extraEdit.amount = product[this.extra.productCode].amount
          this.extraEdit.piece = product[this.extra.productCode].piece
          this.extraEdit.premium = product[this.extra.productCode].amount
        }
      }
      this.extraEdit.productName = this.extra.productName
      this.extraEdit.productCode = this.extra.productCode
      this.toggle.extraEdit = true
    },
    beforeChooseMainItem(){
      temp.ready = false
    },
    chooseMainItem(item){
      for(let i of item.attValueList){
        if(this.proposalPlan.insurantProductList[0].productList[0][item.attCode]==i.code){
          this.proposalPlan.insurantProductList[0].productList[0][item.attCode+'Name'] = i.text
          break;
        }
      }
      for(let i in this.proposalPlan.insurantProductList[0].productList[0].extraList){
        let payPeriod = this.proposalPlan.insurantProductList[0].productList[0].payPeriod
        if(this.proposalPlan.insurantProductList[0].productList[0].extraList[i].productCode == "HDT042"){
          if(payPeriod.indexOf('term') !== -1){
            this.proposalPlan.insurantProductList[0].productList[0].extraList[i].payPeriodName = (parseInt(payPeriod.split('_')[1],10)-1)+'年'
          }
        }
        if (this.proposalPlan.insurantProductList[0].productList[0].extraList[i].productCode == "HDT024") {
          if(payPeriod.indexOf('term') !== -1){
            this.proposalPlan.insurantProductList[0].productList[0].extraList[i].payPeriodName = (parseInt(payPeriod.split('_')[1],10)-1)+'年'
          }
        }
      }

      this.baofeiTest(()=>{
        setTimeout(()=>{
          temp.ready = true
        },110)
      })
    },
    chooseExtraItem(item){
      for(let i of item.attValueList){
        if(this.extraEdit[item.attCode]==i.code){
          this.extraEdit[item.attCode+'Name'] = i.text
          break;
        }
      }
    },
    deleteExtra(item){
      let extraList = this.proposalPlan.insurantProductList[0].productList[0].extraList
      for(let i in extraList){
        if(extraList[i].productCode == item.productCode){
          extraList.splice(i,1)
          break
        }
      }
    },
    cancelExtra(){
      this.toggle.extraEdit = false
      this.extra = {}
      this.extraEdit = {}
      let input = $(".extraList").children('.mbsc-control')
      input[0].value = "请选择附加险"
      input[0].style.color = "#666"
      setTimeout(() => {
         window.scrollTo(0, $('img:first').height())
      },1500)
    },
    saveExtra(){
      this.toggle.extraEdit = false
      this.proposalPlan.checkType = '1'
      let existExtra = false
      for(let i=0;i<this.proposalPlan.insurantProductList[0].productList[0].extraList.length;i++){
        let extra = this.proposalPlan.insurantProductList[0].productList[0].extraList[i]
        if(extra.productCode == this.extraEdit.productCode){
          existExtra = true
          for(let i in this.extraEdit){
            extra[i] = this.extraEdit[i]
          }
          extra.checked = 'checked'
          extra.disabled = 'disabled'
          break
        }
      }
      console.log(existExtra)
      if(!existExtra){
        this.proposalPlan.insurantProductList[0].productList[0].extraList.push(Object.assign({checked:'checked',disabled:'disabled'},this.extraEdit))
      }
      this.baofeiTest(()=>{
        this.proposalPlan.checkType = '1'
        console.log(this.reasonList)
        if(this.reasonList.length > 0){
          this.toggle.rule = true
        }
        this.cancelExtra()
      })
      let input = $(".extraList").children('.mbsc-control')
      input[0].value = "请选择附加险"
      input[0].style.color = "#666"
      setTimeout(() => {
         window.scrollTo(0, $('img:first').height())
      },1500)
    },
    baofeiTest(callback){
      if(!this.productDef.attList){
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
      requ.proposalPlan.insurantProductList[0].productList[0].attList = this.productDef.attList
      for(let att of requ.proposalPlan.insurantProductList[0].productList[0].attList){
        att.attValue = requ.proposalPlan.insurantProductList[0].productList[0][att.attCode]
      }

      for(let extra of requ.proposalPlan.insurantProductList[0].productList[0].extraList){
        extra.attList = this.extraMap[extra.productCode].attList
        extra.checked = 'checked'
        extra.disabled = 'disabled'
        console.log(extra.productCode)
        if(!extra.amount){
          extra.amount = product[extra.productCode].amount
        }
        for(let att of extra.attList){
          att.attValue = extra[att.attCode]
        }
      }
      console.log('保费试算request：',requ)
      utils.http.post('PRODUCTPREMIUM',requ).then(response =>{
        if (response == null) {
          return
        }
        let project = response.data.response
        console.log('保费试算response:',project)
        this.showManageData = project.trialPremiumMobile.insurantProductList["0"].plan
        this.toubaoxuzhi = project.trialPremiumMobile.strList
        this.imgUrl = project.trialPremiumMobile.imageURL
        this.pass = project.trialPremiumMobile.insurantProductList["0"].checkResult.pass
          if(this.pass == "true" || this.localGetAddManage != null){
            console.log('保费试算通过')
            this.toggle.rule = false
            this.totalPremium = project.trialPremiumMobile.insurantProductList["0"].plan.totalPremium
            this.proposalPlan.insurantProductList[0].totalPremium = this.totalPremium
            this.proposalPlan.insurantProductList[0].productList[0].premiumDes = project.trialPremiumMobile.insurantProductList["0"].plan.productList[0].premiumDes
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
            this.totalPremium = "0.00"
            /*投保规则校验框*/
            // this.toggle.rule = true
            this.reasonList = project.trialPremiumMobile.insurantProductList["0"].checkResult.reasonList
            console.log('投保规则：',this.reasonList)
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
      },
      /*保存附加险*/
      saveProposal(){
        utils.cache.set('proposalPlan',this.proposalPlan)
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
              let planId = response.data.response.proposalPlan.planId
              utils.cache.set('planId',planId)
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
                  this.go('../demo/'+planId)
                },100)
              },1500)
            })
          }
        }
        this.baofeiTest(callback)
      },
      initProposal(planId){
        let requ = {
          "proposalPlan": {
            "planId": planId,
            "agentCode": utils.cache.get('personsal')?utils.cache.get('personsal').agentCode:'1100D12336'
          }
        }
        utils.http.post('PROPOSALEDIT',requ).then(response=>{
          console.log('获取建议书',response.data.response.proposalPlan)
          this.proposalPlan = response.data.response.proposalPlan
          this.proposalPlan.insurantProductList[0].productList[0].premium = this.proposalPlan.insurantProductList[0].productList[0].premiumDes
          let productCode = this.proposalPlan.insurantProductList[0].productList[0].productCode
          this.productCode = productCode
          console.log(productCode)
          this.getProductDef(productCode)
          this.proposalPlan.insurantProductList[0].productList[0].extraList.sort((a,b) => {
            const codeA = parseInt(a.code)
            const codeB = parseInt(b.code)
            return codeA -codeB
          })
          if(this.proposalPlan.holder.sex == "2"){
            this.holderSexFlag = false
          }else{
            this.holderSexFlag = true
          }
          if(this.proposalPlan.insurantProductList[0].insurant.sex == "2"){
            this.insurantSexFlag = false
          }else{
            this.insurantSexFlag = true
          }
          if(this.proposalPlan.insurantProductList[0].insurant.relationNew == "00"){
            this.isSame = true
          }else{
            this.isSame = false
          }
        })
      }
  },
  watch:{
    holderSexFlag(value){
      if(value){
        this.proposalPlan.holder.sex = '1'
      }else{
        this.proposalPlan.holder.sex = '2'
      }
    },
    insurantSexFlag(value){
      if(value){
        this.proposalPlan.insurantProductList[0].insurant.sex = '1'
      }else{
        this.proposalPlan.insurantProductList[0].insurant.sex = '2'
      }
    },
    jobValue(value){
      if(value){
        this.searchJob()
      }else{
        this.jobList = occupation.occupation.item
      }
    },
    'proposalPlan.holder':{
      handler(val){
        if(val.name == temp.holder.name){
          if(temp.ready){
            this.baofeiTest()
          }
        }
        if(this.isSame){
          this.proposalPlan.insurantProductList[0].insurant.name = this.proposalPlan.holder.name
          this.insurantSexFlag = this.holderSexFlag
          this.proposalPlan.insurantProductList[0].insurant.birthday = this.proposalPlan.holder.birthday
        }
        temp.holder = Object.assign({},val)
      },
      deep:true
    },
    'proposalPlan.insurantProductList':{
      handler(val){
        if(val[0].insurant.name == temp.insurant.name
          && val[0].productList[0].amount == temp.amount
          && val[0].productList[0].premium == temp.premium
          && val[0].productList[0].drawAge == temp.drawAge
         ){
          if(temp.ready){
            this.baofeiTest()
          }
        }
        if(this.isSame){
          this.proposalPlan.holder.name = this.proposalPlan.insurantProductList[0].insurant.name
          this.holderSexFlag = this.insurantSexFlag
          this.proposalPlan.holder.birthday = this.proposalPlan.insurantProductList[0].insurant.birthday
        }

        temp.insurant = Object.assign({},val[0].insurant)
        temp.amount = val[0].productList[0].amount
        temp.premium = val[0].productList[0].premium
        temp.drawAge = val[0].productList[0].drawAge
      },
      deep:true
    },
    'toggle.extraEdit':function(value){
      if(value == true){
        utils.ui.modal.afterOpen()
      }else{
        utils.ui.modal.beforeClose()
      }
    },
    'toggle.rule':function(value){
      if(value == true){
        utils.ui.modal.afterOpen()
      }else{
        utils.ui.modal.beforeClose()
      }
    },
    'toggle.coverStatus':function(value){
      if(value == true){
        utils.ui.modal.afterOpen()
      }else{
        utils.ui.modal.beforeClose()
      }
    },
    'occupationValue.isopen':function(value){
      if(value == true){
        utils.ui.modal.afterOpen()
      }else{
        utils.ui.modal.beforeClose()
      }
    },
    isSame(value){
      if(value){
        this.proposalPlan.holder.name = this.proposalPlan.insurantProductList[0].insurant.name
        this.holderSexFlag = this.insurantSexFlag
        this.proposalPlan.holder.birthday = this.proposalPlan.insurantProductList[0].insurant.birthday
        this.proposalPlan.insurantProductList[0].insurant.relationNew = "00"
      }else{
        this.proposalPlan.holder.name = ''
        this.proposalPlan.insurantProductList[0].insurant.relationNew = ""
        this.holderSexFlag = true
        this.proposalPlan.holder.birthday = '1980-01-01'
        this.proposalPlan.insurantProductList[0].insurant.relationNew = ""
      }
    },
    'occupationValue.isopen':{
        handler(val){
          console.log(val)
          if(!val){
            if(this.occupationValue.occItem != undefined){
              this.job.desc = this.occupationValue.occItem.descr
              this.proposalPlan.insurantProductList[0].insurant.level = this.occupationValue.occItem.level
              this.proposalPlan.insurantProductList[0].insurant.profession = this.occupationValue.occItem.code
            }
          }
        },
        deep: true
      }
  },
  mounted(){
    utils.ui.modal.beforeClose()
    // this.getManageData()
    // let proposalPlan = utils.cache.get('proposalConfig')
    // let holderSexFlag = utils.cache.get('holderSexFlag')
    // let insurantSexFlag = utils.cache.get('insurantSexFlag')
    // let zhuxianPremium = utils.cache.get('zhuxianPremium')
    // let zhuxianMoney = utils.cache.get('zhuxianMoney')
    // let totalPremium = utils.cache.get('totalPremium')
    // let job = utils.cache.get('job')
    // let agentInfo = utils.cache.get('agentInfo')
    // if(proposalPlan)this.proposalPlan = proposalPlan
    // if(holderSexFlag == 'false')this.holderSexFlag = false
    // if(insurantSexFlag == 'false')this.insurantSexFlag = false
    // if(zhuxianPremium)this.zhuxianPremium = zhuxianPremium
    // if(zhuxianMoney)this.zhuxianMoney = zhuxianMoney
    // if(totalPremium)this.totalPremium = totalPremium
    // if(job)this.job = job
    // if(agentInfo)this.agentInfo = agentInfo
    let planId = this.$route.params.planId
    console.log(planId)
    if(planId == 'new'){
      this.getProductDef(this.productCode)
    }else{
    this.initProposal(planId)
    this.localStorage = utils.cache.get('personsal')
    this.proposalPlan = utils.cache.get('proposalPlan') 
      if (this.proposalPlan.insurantProductList[0].insurant.relationNew == "00") {
          this.isSame = true
				} else {
					this.isSame = false
				}
     
    }
  }
}
</script>
<style lang="scss" scoped type="text/css">
.alert-reasonList{
  position: relative;
  max-height:225px;
  min-height:160px;
  overflow-y:auto;
  .alert-list{
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
}
select{
    background:url("../../../static/img/common/jiantou.png") no-repeat scroll right center;
    background-size: 13px 10px;
  }
  .add-manage-contents{
    width: 100%;
    height: 100%;
    // position: absolute;
    // top: 0;left:0;bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .teshu-header{
    height: 48px;line-height: 48px;
    text-align: center;
    background: #0C3073;
    color: #FFF;
    border-radius: 15px 15px 0 0;
    font-weight:bold;
  }
  .fa{
    color: #FEB101;
    font-size:20px;
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
  .title{
    height: 40px;
    line-height:40px;
    border-top:1px solid #A4A3A3;
    overflow: hidden;
    padding-left: 10px;
    background: #F0F0F0;
    display: flex;
    i{
      line-height: 40px;
      color: #FEB101;
      font-size: 25px;
    }
    span{
      line-height: 40px;
      font-weight: bold;
      padding-left: 10px;
      flex:1;
    }
  }
  .message-list-one li,.message-list-two li,.message-list-three li,.message-list-four li,.riderList li{
    float: left;
    width: 100%;height: 42px;
    border-bottom: 1px dashed #A3A2A2;
    line-height: 42px;
  }
  li:last-child{border-bottom: none;}
  .select{
    min-width: 90px;height: 41px;
    border:none;
    float:right;
    margin-right: 10px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .selectTeshu{
    text-align: right;
    option{
      text-indent: right;
    }
  }
  .message-list-one,.message-list-three{
    width: 100%;float: left;
    .content-proposal{
      width: 100%;
      ul{
        width: 100%;height: 100%;
        overflow: hidden;
        li{
          p{
            float: left;
            width: 25%;
            line-height: 40px;
            text-align: left;
            padding-left: 10px;
          }
          input{
            height: 40px;width: 65%;
            text-align: right!important;
            float: right;
            padding-right:10px;
            border:none !important;
          }
        }
      }
    }
  }
  .message-list-two{
    float: left;width: 100%;
    .content-proposal{
      width: 100%;height: 100%;
      ul{
        width: 100%;height: 100%;
        li{
          p{
            float: left;
            width: 30%;
            text-align: left;
            padding-left: 10px;
          }
          input{
            height: 40px;width: 65%;
            text-align: right;
            float: right;
            padding-right:10px;
          }
        }
      }
    }
  }
  .message-list-four{
    float: left;
    width: 100%;height: 169px;
    .content-proposal{
      width: 100%;height: 100%;
      ul{
        width: 100%;height: 100%;
        li{
          p{
            float: left;
            width: 35%;
            text-align: left;
            padding-left: 10px;
          }
          input{
            height: 40px;width: 56%;
            text-align: right;
          }
          span{
            display: inline-block;
            float: right;
            height: 40px;width: 50%;
            text-align: right;
            padding-right: 10px;
          }
        }
      }
    }
  }
  .message-list-five{
    float: left;width: 100%;
    .mint-cell{
      background: #F0F0F0 !important;
    }
    .five-content{
      height: 360px;
    }
    .content-one li:last-child{border-bottom: 1px dashed #A3A2A2;}
    .content-two{
      width: 90%;
      margin: auto;
      li{
        display: flex;
        justify-content:space-around;
        border:1px solid #F0F0F0;
        p{
          width: 50%;
          text-align: center;
        }
      }
      li:nth-child(1){background: #F0F0F0;margin-top: 5px;}
      li:nth-child(4){margin-bottom: 5px;}
      li p:nth-child(1){border-right:2px solid #F0F0F0;}
    }
    .content-proposal{
      width: 100%;
      #toubaoxuzhi{
        li{
          padding: 12px 0 12px 10px;
          border-bottom: 1px dashed #A3A2A2;
        }
      }
    }
  }
  #toubaoxuzhi li:nth-child(1) span{line-height: 20px;}
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
  .bg-img .mint-popup-right{
    width:100%;height: 100%;
    background: #F2F2F2;
    img{
      display: block;
      width:100%;height: 100%;
    }
    .send-name{
      position: absolute;
      bottom: 100px;left: 50%;
      transform:translate(-50%);
      color: #E84E40;
      font-size: 20px;
      font-weight:bold;
    }
  }
  .button{
    width: 85%;
    position: absolute;
    bottom: 8px;
    padding: 0 20px;
    text-align: center;
    div{
      float: left;
      width: 100%;height: 100%;
    }
    .mint-button{
      padding: 0 20px;
    }
    #button-sure{
      background-color: #12294A;
      color: #E51C23;
      width: 70%;
      font-weight:bold;
    }
  }
  .fujia{
    width: 100%;
    padding: 0;
    border-top: 1px solid #BBB;
    div{
      margin-top: 5px;
    }
  }
  .pd-md{
    color: #081234;
    div{
      line-height: 42px;
      width: 100%;height: 42px;
      p{
        width: 35%;
        float: left;
      }
      input{
        text-align: right;
        width: 60%;
      }
    }
  }
  .mint-cell-wrapper{
    padding: 0 !important;
  }
  .fujia-choose{
    margin-top: 5px;
    height: 190px;
    overflow-y: auto;
  }
  .fujia-content{
    div{
      height: 40px;
      padding:0 10px;
      border-bottom: 1px solid #BBB;
      p{
        height: 40px;
        line-height: 40px;
        width: 50%;
        float: left;
      }
    }
  }
  .supplementary{
    display: flex;
    // padding-left:5px !important;
    line-height: 40px;
    // text-align: left;
    justify-content:space-between;
    p{
      flex:0 0 80px;
    }
  }
input.r_text{
    width:10%;
    border-bottom:1px solid black;
}
</style>
<style>
.content-proposal ul li input{
  text-align:right;
  border:none;
  height:40px;
  float: right;
  padding-right: 10px;
}
.fujia-content input{
  display: inline-block;
  width: 30%;height: 40px;
  float: right;
  text-align: right;
}
</style>
