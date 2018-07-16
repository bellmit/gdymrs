<!--告知页面-->
<template>
	<div id="content">
		<Headerbtns :title = "page_title">
			<div slot="left" class="back" @click="go('../details/'+$route.params.planId)">
          		<i class="fa fa-angle-left"></i>
        	</div>
			<div slot="right" class="back" @click="sheetVisible = !sheetVisible">
				<i class="fa fa-ellipsis-v" style="display: inline-block;width: 100%;height: 100%;line-height: 55px;text-align: center;font-size: 24px"></i>
			</div>
		</Headerbtns>
		<div class="manage-main-contents">
			<v-touch class="touch-wrapper" @swipeleft="right" @swiperight="left"  v-bind:swipe-options="{ direction:'horizontal', threshold: 50 }">
			<div class="inform-subtittle">
				<p>被保险人是否具有以下情况?</p>
			</div>
			<div v-for="itm in dict.informList" v-show="toggle.content_show" style="color:#45403F">
				<div class="inform_1">
					<div class="inform-content" v-show="temp.cusType == itm.resCustCode">
						<p style="width: 40px;height: 40px;line-height: 40px">{{itm.questionNo}}</p>
						<p>{{itm.desc}}</p>
						<p style="position: relative;" 
						v-show="itm.code!='100000008' && itm.code!='A00001'">
							<mt-switch v-model="itm.swh" style="position: absolute;right: -5px;top: 0px;" @change="switchQuestion(itm)">
								<label style="position: absolute;right: 41px;bottom: 7px;font-size: 14px;color: #FBFBFB;font-weight:bold;">{{itm.isBuild == "Y"?'是':''}}
								</label>
								<label style="position: absolute;right: 15px;bottom: 7px;font-size: 14px;font-weight:bold;color: #FBFBFB;">{{itm.isBuild == "N"?'否':''}}
								</label>
							</mt-switch>
						</p>
						<div class="self" style="line-height: 23px;" v-show="!(itm.code!='A00001')" >
							<span>被保险人:身高:</span>
							<input type="text" class="input_text" v-model="itm.height">厘米,
							<br/>
							<span>体重:</span>
							<input type="text" class="input_text" v-model="itm.weight">公斤;
						</div>
					</div>
					<div class="textarea" v-show="itm.swh && itm.code!='A00001'" >
						<p style="display:flex;" v-show="itm.swh && itm.code=='A00013'">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;怀孕日期:&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<date-picker v-model="policy.question.resQuestion.fetationDate"></date-picker>
						</p>	
						<textarea cols="40" rows="5"  placeholder="请详细描述具体情况。" style="border:1px solid #C4C4C4;" v-model="itm.questionRemark">
						</textarea>
					</div>
				</div>
			</div>
			<div class="inform-tittle" style="text-align: center;">
				<p>
					<input type="checkbox" v-model="policy.question.resQuestion.isAgree">
					<span>被保险人已充分了解告知内容</span>
				</p>
			</div>
			</v-touch>
		</div>
		<mt-actionsheet
			:actions="actions"
			v-model="sheetVisible">
		</mt-actionsheet>
		<alert ref="alert"></alert>
		<Footerbtns :is_show=false :disabled="true"
			total_premium="10000.00">
			<button class="btnFoote" slot="center" @click="next" 
			:disabled="!policy.question.resQuestion.isAgree">
				下一步
			</button>
		</Footerbtns>
	</div>
</template>

<!--js-->
<script>
import { MessageBox } from 'mint-ui'
import { Actionsheet } from 'mint-ui'
import { Toast } from 'mint-ui'
import Headerbtns from '../policy/common/Header.vue'
import Footerbtns from '../policy/common/Footer.vue'
import datePicker from '../common/DatePicker.vue'
import alert from '../policy/common/alert.vue'
import utils from "../../utils";
import policy from "../../router/policy";
//import informList_ZJ from'../../../static/dict/policy_inform_zj.json'
//import informList_YB from'../../../static/dict/policy_inform_yb.json'

export default{
	name:'inform_page',
	components: {Headerbtns,Footerbtns,Actionsheet,datePicker,alert},
	data () {
   	 return {
		sheetVisible:false,
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
		page_title:'健康告知(被保险人)',
		isHaveAppInform:false,
    	dict:{
    		informList:[],
    	},
    	toggle:{
			content_show:true
    	},
    	temp:{
			cusType:1,
			insured:{}
    	},
    	informList_YB:[
			    {
			        "code": "A00001",
			        "swh":false,
			        "isBuild":"Y",
			        "questionRemark":"",
			        "questionNo":"1",
			        "resCustCode":"",
			        "weight":"",
			        "height":""
			    },
			    {
			        "code": "A00002",
			        "desc": "是否有吸烟超过10支/天或饮酒（相当于白酒）超过50克/天？",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"2",
			        "resCustCode":""
			    },
			    {
			        "code": "A00027",
			        "desc": "是否有其他寿险公司已生效或正在申请的保险单？是否有寿险公司理赔经历？是否曾被拒保延期、附加条件承保、限额承保、或未接受以上承保条件而撤销投保申请？",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"3",
			        "resCustCode":""
			    },
			    {
			        "code": "A00005",
			        "desc": "是否曾从事过滑翔飞行、私人飞行、驾驶航空机具、潜水、滑水、滑雪、登山、跳伞、马术、特技表演及赛车活动？或现在正准备参加以上活动？",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"4",
			        "resCustCode":""
			    },
			    {
			        "code": "A00007",
			        "desc": "近一年是否有出国工作或居住计划？",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"5",
			        "resCustCode":""
			    },
			    {
			        "code": "A00028",
			        "desc": "两年内是否曾体检而结果异常？是否接受或被建议用药、手术、住院等治疗（不包括感冒、流感、怀孕、分娩）？",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"6",
			        "resCustCode":""
			    },
			    {
			        "code": "A00010",
			        "desc": "是否患先天性或遗传相关因素疾病？",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"7",
			        "resCustCode":""
			    },
			    {
			        "code": "100000008",
			        "desc": "您是否曾经或正在有下列症状、或患有下列疾病：",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_a",
			        "desc": "脑、神经系统及精神方面疾病，如：帕金森氏病/综合征、阿尔兹海默氏症、重症肌无力、多发性硬化、反复头痛或眩晕、癫痫、脑血管畸形、脑梗塞、脑出血、短暂性脑缺血发作、脑血管意外、脑瘤、脑部需要或已经手术治疗的疾病、脊髓疾病、智力障碍、精神分裂症、神经官能症、抑郁症、神经衰弱、情感障碍、人格障碍、进食障碍；",
			    	"swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8-a",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_b",
			        "desc": "心血管的疾病，如：高血压（收缩压140mmHg以上或舒张压90mmHg以上）、冠心病、心肌梗塞、心绞痛、心律失常、先天性心脏病、风湿性心脏病、心内膜炎、心肌病、甲亢性心脏病、室壁瘤、动脉瘤、心力衰竭，被建议进一步检查或治疗的心慌及胸闷、胸痛、原因不明的晕厥、心脏杂音，或被建议进行心导管等心血管介入治疗；",
			   		"swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8-b",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_c",
			        "desc": "呼吸系统疾病，如：反复咳嗽咳痰、咯血、气喘、呼吸困难、慢性支气管炎、肺气肿、肺心病、哮喘、支气管扩张、肺结核、尘肺、间质性肺病、肺纤维化、胸腔积液、呼吸衰竭；",
			    	"swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8-c",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_d",
			        "desc": "消化系统疾病, 如: 肝区疼痛、肝功能异常、黄疸、便血、食道静脉曲张、胃和/或十二指肠溃疡、胰腺炎、胰腺假性囊肿、肝炎、乙肝病毒携带、肝囊肿、多囊肝、肝硬化、肝血管瘤、肝内胆管炎、胆结石、胆囊息肉、脾肿大、慢性或溃疡性结肠炎、肠息肉、腹部外伤或手术史",
			    	"swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8-d",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_e",
			        "desc": "泌尿系统疾病, 如: 尿糖阳性、血尿、蛋白尿、反复尿路感染、尿路畸形、肾移植、肾积水、肾囊肿、多囊肾、肾结石、尿毒症、肾病综合症、肾脏功能异常、急慢性肾炎、前列腺疾病、泌尿系统外伤或手术史；",
			   		"swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8-e",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_f",
			        "desc": "骨骼、肌肉、结缔组织的疾病, 如: 关节红肿或酸痛、类风湿关节炎、强直性脊柱炎、椎间盘突出、股骨头坏死、骨关节炎、肌营养不良症、肌肉萎缩、系统性红斑性狼疮、干燥综合症；",
			   		"swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8-f",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_g",
			        "desc": "内分泌、血液系统疾病, 如: 血糖升高、糖尿病、痛风、高尿酸血症、高脂血症、甲状腺或甲状旁腺疾病、脑垂体功能亢进、肾上腺功能亢进或低下、贫血、脾功能亢进、白血病、淋巴瘤、血友病、再生障碍性贫血、紫癜、原因不明的发热、原因不明皮肤和粘膜及齿龈出血；",
			    	"swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8-g",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_h",
			        "desc": "五官科疾病, 如: 原因不明的声音嘶哑、听力下降、耳鸣、复视、视力下降、美尼尔病、白内障、青光眼、视神经病变，视网膜出血或剥离；",
			    	"swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8-h",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_i",
			        "desc": "曾经或当前患有恶性肿瘤、原因不明的发热、体重明显变化（一年内增加或减少超过5公斤) 、原因不明的淋巴结肿大、未证实为良性或恶性之肿瘤、肿块、息肉、囊肿、赘生物、结节、黑痣增大；",
			    	"swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8-i",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_j",
			        "desc": "五官、脊柱、胸廓、四肢、手足畸形或残疾；",
				    "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8-j",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_k",
			        "desc": "职业病、酒精中毒、吸毒、药物成瘾、化学品滥用、患艾滋病或感染艾滋病病毒？",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8-k",
			        "resCustCode":""
			    },
			    {
			        "code": "A00012",
			        "desc": "您的父母、兄弟姐妹中有两人或以上在60岁以前因病去世?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"9",
			        "resCustCode":""
			    },
			    {
			        "code": "A00013",
			        "desc": "女性告知：是否怀孕？是否曾患子宫、卵巢等妇科疾病？是否曾有异常出血或下腹部手术（剖腹产除外）、放射性治疗等？若已怀孕，请填写怀孕日期：       年       月      日",
			        "visible": "GENDERCODE|eq|2",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"10",
			        "resCustCode":""
			    },
			    {
			        "code": "A00014",
			        "desc": "被保险人年龄在6 周岁及以下时，请告知：a：被保险人出生时是否早产小于34 周或体重低于2 公斤？b.是否难产或有窒息史?",
			        "visible": "AGE|le|6",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11",
			        "resCustCode":""
			    }
			],
	    informList_ZJ:[
			    {
			        "code": "A00001",
			        "swh":false,
			        "isBuild":"Y",
			        "questionRemark":"",
			        "questionNo":"1",
			        "resCustCode":"",
			        "weight":"",
			        "height":""
			    },
			    {
			        "code": "A00002",
			        "desc": "是否有吸烟超过10 支/天或饮酒（相当于白酒）超过50 克/天?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"2",
			        "resCustCode":""
			    },
			    {
			        "code": "A00003",
			        "desc": "是否有其他寿险公司已生效或正在申请的保险单?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"3",
			        "resCustCode":""
			    },
			    {
			        "code": "A00004",
			        "desc": "是否有寿险公司理赔经历?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"4",
			        "resCustCode":""
			    },
			    {
			        "code": "A00005",
			        "desc": "是否曾从事过滑翔飞行、私人飞行、驾驶航空机具、潜水、滑水、滑雪、登山、跳伞、马术、特技表演及赛车活动?或现在正准备参加以上活动?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"5",
			        "resCustCode":""
			    },
			    {
			        "code": "A00006",
			        "desc": "是否曾被拒保延期,附加条件承保、限额承保,或未接受以上承保条件而撤销投保申请?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"6",
			        "resCustCode":""
			    },
			    {
			        "code": "A00007",
			        "desc": "近一年是否有出国工作或居住计划?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"7",
			        "resCustCode":""
			    },
			    {
			        "code": "A00008",
			        "desc": "两年内是否曾体检而结果异常?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"8",
			        "resCustCode":""
			    },
			    {
			        "code": "A00009",
			        "desc": "是否接受或被建议用药、手术、住院等治疗(不包括感冒、流感、怀孕、分娩)?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"9",
			        "resCustCode":""
			    },
			    {
			        "code": "A00010",
			        "desc": "是否患先天性或遗传相关因素疾病?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"10",
			        "resCustCode":""
			    },
			    {
			        "code": "100000008",
			        "desc": "是否目前患有或过去曾经患过下列症状,疾病或手术史:",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_a",
			        "desc": "脑、神经系统及精神方面疾病,如:帕金森氏病/综合征、阿尔兹海默氏症、重症肌无力、多发性硬化、反复头痛或眩晕、癫痫、脑血管畸形、脑梗塞、脑出血、短暂性脑缺血发作、脑血管意外、脑瘤、脑部需要或已经手术治疗的疾病、脊髓疾病、智力障碍、精神分裂症、神经官能症、抑郁症、神经衰弱、情感障碍、人格障碍、进食障碍;",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11-a",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_b",
			        "desc": "心血管的疾病，如：高血压（收缩压140mmHg以上或舒张压90mmHg 以上）、冠心病、心肌梗塞、心绞痛、心律失常、先天性心脏病、风湿性心脏病、心内膜炎、心肌病、甲亢性心脏病、室壁瘤、动脉瘤、心力衰竭，被建议进一步检查或治疗的心慌及胸闷、胸痛、原因不明的晕厥、心脏杂音、或被建议进行心导管等心血管介入治疗；",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11-b",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_c",
			        "desc": "呼吸系统疾病，如：反复咳嗽咳痰、咯血、气喘、呼吸困难、慢性支气管炎、肺气肿、肺心病、哮喘、支气管扩张、肺结核、尘肺、间质性肺病、肺纤维化、胸腔积液、呼吸衰竭；",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11-c",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_d",
			        "desc": "消化系统疾病,如:肝区疼痛、肝功能异常、黄疸、便血、食道静脉曲张、胃和/或十二指肠溃疡、胰腺炎、胰腺假性囊肿、肝炎、乙肝病毒携带、肝囊肿、多囊肝、肝硬化、肝血管瘤、肝内胆管炎、胆结石、胆囊息肉、脾肿大、慢性或溃疡性结肠炎、肠息肉、腹部外伤或手术史；",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11-d",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_e",
			        "desc": "泌尿系统疾病,如:尿糖阳性、血尿、蛋白尿、反复尿路感染、尿路畸形、肾移植、肾积水、肾囊肿、多囊肾、肾结石、尿毒症、肾病综合症、肾脏功能异常、急慢性肾炎、前列腺疾病、泌尿系统外伤或手术史；",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11-e",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_f",
			        "desc": "骨骼，肌肉，结缔组织的疾病，如：关节红肿或酸痛、类风湿关节炎、强直性脊柱炎、椎间盘突出、股骨头坏死、骨关节炎、肌营养不良症、肌肉萎缩、系统性红斑性狼疮、干燥综合症;",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11-f",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_g",
			        "desc": "内分泌,血液系统疾病,如:血糖升高、糖尿病、痛风、高尿酸血症、高脂血症、甲状腺或甲状旁腺疾病、脑垂体功能亢进、肾上腺功能亢进或低下、贫血、脾功能亢进、白血病、淋巴瘤、血友病、再生障碍性贫血、紫癜、原因不明的发热、原因不明皮肤和粘膜及齿龈出血；",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11-g",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_h",
			        "desc": "五官科疾病，如：原因不明的声音嘶哑、听力下降、耳鸣、复视、视力下降、美尼尔病、白内障、青光眼、视神经病变、视网膜出血或剥离；",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11-h",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_i",
			        "desc": "曾经或当前患有恶性肿瘤、原因不明的发热、体重明显变化(一年内增加或减少超过5 公斤)、原因不明的淋巴结肿大、未证实为良性或恶性之肿瘤、肿块、息肉、囊肿、赘生物、结节、黑痣增大；",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11-i",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_j",
			        "desc": "五官、脊柱、胸廓、四肢、手足畸形或残疾;",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11-j",
			        "resCustCode":""
			    },
			    {
			        "code": "A00011_k",
			        "desc": "职业病、酒精中毒、吸毒、药物成瘾、化学品滥用、患艾滋病或感染艾滋病病毒?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"11-k",
			        "resCustCode":""
			    },
			    {
			        "code": "A00012",
			        "desc": "您的父母、兄弟姐妹中有两人或以上在60 岁以前因病去世?",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"12",
			        "resCustCode":""
			    },
			    {
			        "code": "A00013",
			        "desc": "女性告知:是否怀孕?是否曾患子宫、卵巢等妇科疾病?是否曾有异常出血或下腹部手术(剖腹产除外)、放射性治疗等?若已怀孕,请填写怀孕日期:",
			        "target": "com.android.policy.page.inform.item.InformNewPregnant",
			        "visible": "GENDERCODE|eq|2",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"13",
			        "resCustCode":""
			    },
			    {
			        "code": "A00014",
			        "desc": "a.被保险人出生时是否早产小于34 周或体重低于2 公斤? b.是否难产或有窒息史?",
			        "visible": "AGE|le|6",
			        "swh":false,
			        "isBuild":"N",
			        "questionRemark":"",
			        "questionNo":"14",
			        "resCustCode":""
			    }
			],
	    policy:{
      		deviceNo: "",
			channel: utils.cache.get('personsal').channel,
			substepNo: "8",
			isInsert: "1",//1不存在豁免险,0存在豁免险
			agentCode: utils.cache.get('personsal').agentCode,
			orderCode: this.$route.params.planId,
	        question: {
		        resQuestion: {
		            fetationDate: "",
		            isAgree:false,
		            resRemark: []
		        }
			},
			productInfo:{}
		},
		tempResQuestion:[],
    	current_total_premium:'100000.00',
      	optionsValue:'',
      	relToApp:'',//投被保人关系
      	productCode:''//鑫玺人生code
    }
  },
  methods:{
	  left(){
         this.go('../details/'+this.$route.params.planId)
	  },
	  right(){
		 this.next()
	  },
	  backHome(){
       this.$router.push("/home");
       },
	  winReload:function(cond){
			window.location.reload();
		},
	  getPolicyMsg(productDefList){
		//此次接口为获取被保人客户信息准备
		let requ = {
			"policy":{
				"substepNo":"8",
				"orderCode": this.$route.params.planId
			}
		} 
		utils.http.postFast('MOHQPOLICYMSG',requ,(body)=> {
			let policy = body.policy
			//根据产品修改页面标题
			let extra = []
			let productsArr = policy.productInfo.products.product
			console.log(policy,'policy111111111111111111')
			this.relToApp = policy.custInfo.insurants.insurant[0].relToApp
			this.productCode = productsArr[0].prodCode
			for (var i = 0; i < productsArr.length; i++) {
				if(productsArr[i].isMaster != '1'){
					extra.push(productsArr[i])
				}
			}
			if(productDefList[0].productDefine.hasHealthTold == true 
				|| productDefList[0].productDefine.hasHealthTold == true||productDefList[0].productDefine.hasHealthTold == "true"){
					this.isHaveAppInform = true
					this.policy.isInsert = '0'
			}else{
				let extraList = productDefList[0].extraList
				for(var i=0;i<extraList.length;i++){
					for(var j=0;j<extra.length;j++){
						if(extra[j].prodCode == extraList[i].productCode){
							if(extraList[i].productDefine.hasHealthTold == true 
								|| extraList[i].productDefine.hasHealthTold == "true"){
									this.isHaveAppInform = true
									this.policy.isInsert = '0'
									break
							}
						}
					}
				}
			}
			//提取客户信息
			this.temp.insured.gender = policy.custInfo.insurants.insurant[0].sex
			this.temp.insured.birthday = policy.custInfo.insurants.insurant[0].birthday
			//加载代理人信息
			let agent = utils.cache.get(utils.constants.getAgentKey())
			this.policy.agent = agent
			if (this.policy.agent!=null) {
				if (this.policy.agent.edition == '1'){//银保
					this.dict.informList = utils.common.filtersInformList2('1',this.temp.insured,this.informList_YB,this.informList_ZJ)
				}else if (this.policy.agent.edition == '2'){//综经
					this.dict.informList = utils.common.filtersInformList2('2',this.temp.insured,this.informList_YB,this.informList_ZJ)
				}
				//根据客户类型为告知项赋resCustCode
				for (var i = 0; i < this.dict.informList.length; i++) {
					if(this.temp.cusType == 1){
						this.dict.informList[i].resCustCode = "1"
					}
				}
				let tempResRemark = []
				if(policy.question.resQuestion.resRemark != undefined && policy.question.resQuestion.resRemark.length > 0){
					let resRemark = policy.question.resQuestion.resRemark
					for(var i=0;i<resRemark.length;i++){
						if(resRemark[i].resCustCode == "1"){
							tempResRemark.push(resRemark[i])
						}else if(resRemark[i].resCustCode == "0"){
							this.tempResQuestion.push(resRemark[i])
						}
					}
				}else{
					// console.log(this.dict.informList)
				}
				if(tempResRemark!=undefined && tempResRemark.length > 0){
					policy.question.resQuestion.resRemark = []
					policy.question.resQuestion.resRemark = tempResRemark
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
					for (var i = 0; i < this.dict.informList.length; i++) {
						for (var j = 0; j < policy.question.resQuestion.resRemark.length; j++) {
							let resRemark = policy.question.resQuestion.resRemark[j]
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
				}else{
					console.log(this.dict.informList)
				}
			}
		})
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
  	toSalesmanReportPage:function(){
  		let isPass = this.checkData()
  		if (isPass) {
  			this.$router.push({
	  			name:'salesman_report_page',
	  			params:{
	  				policyName:this.optionsValue
	  			}
	  		})
  		}
  	},
  	next:function(){
  		let isPass = this.checkData()
  		if (isPass) {
  			let policy = this.policy
  			let resRemark = policy.question.resQuestion.resRemark
  			for (var i = 0; i < resRemark.length; i++) {
		  	  	if(resRemark[i].code == "A00001"){
		  	  		let weight = resRemark[i].weight
		  	  		let height = resRemark[i].height
		  	  		if (weight != "" || height !="") {
		  	  			resRemark[i].questionRemark = height+"/"+weight
		  	  		}
		  	  	}
	  			if(resRemark[i].desc != undefined){
	  				// resRemark[i].desc = ""
	  			}
			  }
			if(this.tempResQuestion!=undefined && this.tempResQuestion.length>0){
				for (let i = 0; i < this.tempResQuestion.length; i++) {
					if(this.tempResQuestion[i].swh == "false"){
						this.tempResQuestion[i].swh = false
					}else{
						this.tempResQuestion[i].swh = true
					}
					policy.question.resQuestion.resRemark.push(this.tempResQuestion[i])
				}
			}
			if(this.isHaveAppInform){
				policy.isInsert = '0'
			}else{
				policy.isInsert = '1'
			}
  			let requ = {
  				"policy":policy
  			} 
		    utils.http.postFast('MODISTRIESAVE',requ,(body)=> {
          		console.log(body)
          		let policy = body.policy
          		if(policy.resultCode == "0"){
					  utils.cache.set("policy_orderId",policy.orderId)
					  let isSame = utils.cache.get('isSame')
					  console.log(this.isHaveAppInform)
					  if(this.isHaveAppInform){
					  	//鑫玺人生投被保人是同一人时next业务人员报告书页面
					  	if(this.relToApp == '00' && this.productCode == 'NPP016'){
					  		  this.$router.push({
					  			name:'salesman_report_page',
					  			params:{
					  				policyName:this.optionsValue
					  			}
					  		})
					  	}else{
					  		this.$router.push({
								name:'inform_app_page',
								params:{
									policyName:this.optionsValue,
									planId:policy.orderId
								}
							})
					  	}
					  }else {
						  this.$router.push({
							name:'salesman_report_page',
							params:{
								policyName:this.optionsValue
							}
						})
					  }
          		}else if(policy.resultCode != "0"){
          			this.showMsg(policy.resultMessage)
          		}
        	})
  		}
  	},
  	checkData:function(){
  		this.policy.question.resQuestion.resRemark = this.dict.informList
  		let resRemark = this.policy.question.resQuestion.resRemark;
  		for (var i = 0; i < resRemark.length; i++) {
  			if(resRemark[i].code == "A00001"){
  				if(resRemark[i].height == null || resRemark[i].height ==""){
					this.showMsg('请录入身高')
					return false
  				}else{
  					if(isNaN(resRemark[i].height)){
						this.showMsg('身高只能录入数值')
						return false
	  				}else{
						if(resRemark[i].height >=300 ){
							this.showMsg('必须小于300，身高单位：cm')
							return false
	  					}
	  				}
  				}
  				if(resRemark[i].weight == null || resRemark[i].weight ==""){
					this.showMsg('请录入体重')
					return false
  				}else{
  					if (isNaN(resRemark[i].weight)) {
  						this.showMsg('体重只能录入数值')
  						return false
	  				}else{
	  					if(resRemark[i].weight >=500 ){
							this.showMsg('体重必须小于500，体重单位：KG')
							return false
	  					}
	  				}
  				}
			  }
			
  			if(resRemark[i].isBuild == "Y" && resRemark[i].code != "A00001"){
  				if(resRemark[i].questionRemark == ""){
  					this.showMsg('请完善告知内容')
  					return false
				}
			    // 怀孕日期不做校验
				// if(resRemark[i].code == "A00013"){
				// 	if(this.policy.question.resQuestion.fetationDate!=undefined && 
				// 		this.policy.question.resQuestion.fetationDate!=""){
				// 		let compareDateTime = new Date(this.policy.question.resQuestion.fetationDate).getTime() - new Date().getTime()
				// 		if(compareDateTime > 0){
				// 			this.showMsg("怀孕日期不得晚于当前日期。")
				// 			return false 
				// 		}
				// 	}else{
				// 		this.showMsg("请填写怀孕日期。")
				// 		return false 
				// 	}  
				// }
  			}
  		}
  		return true
  	},
  	showMsg:function(msg){
		if(msg!=undefined && msg!=""){
			this.$refs.alert.showMOdal(msg)
		}
  	},
  	switchQuestion:function(itm){
  		if (itm.isBuild == "Y") {
  			itm.questionRemark=""
			itm.isBuild = "N"
			if(itm.code == 'A00013'){
				this.policy.question.resQuestion.fetationDate=""
			}
  		}else if(itm.isBuild == "N"){
			itm.isBuild = "Y"
  		}
  	},
  },
  beforeDestroy: function () {
  	 
  },
  watch:{
	'policy.question.resQuestion.isAgree': {
		handler(val) {
			if(val){
	  			$(".btnFoote").attr({'disabled':false})
	  			$(".btnFoote").css({'opacity':1})
	  		}else{
	  			$(".btnFoote").css({'opacity':0.5})
	  			$(".btnFoote").attr({'disabled':true})
	  		}
		},
		deep: true
	},
  },
  mounted(){
	  $(".btnFoote").css({'opacity':0.5})
  },
  beforeMount(){
	$(".btnFoote").css({'opacity':0.5})
	//根据产品定义接口处理当前产品是否显示投保人告知
	this.productDef((productDefList)=>{
		this.getPolicyMsg(productDefList)
	})
  },
}
</script>

<style lang="scss" scoped type="text/css">
.inform-subtittle{
	width: 100%;
	height: 50px;
	line-height: 50px;
	background: #f8f8f8;
	color: #FDC554;
	border-bottom:1px solid #D9D9D9;
	padding-left:20px; 
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
.manage-main-contents{
	width: 100%;
	position: absolute;
	left: 0;right: 0;top: 48px;bottom: 50px;
	overflow-y: auto;
	overflow-x: hidden;
	background: #FFF;
	.inform-tittle{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #ffffff;
		margin-bottom: 30px;
		p{
			padding-left: 25px;
			color: #FFB30E;
		}
	}
	.inform_1{
		width: 95%;
		padding: 20px 10px;
		border-bottom: 1px dashed #999;
		.inform-content{
			display: flex;
		}
		.textarea{
			text-align:center;
			margin-top:10px;
			textarea{
				padding-top:10px;
				padding-bottom:10px;
				padding-right: 10px;
				margin-top:10px;
			}
		}
	}
	.inform_1 .inform-content p:nth-child(1){
		// background: #FEB101;
		border-radius: 20px;
		text-align: center;
		color: #000;}
	.inform_1 .inform-content p:nth-child(2){flex:1;padding-left:15px;font-size: 14px;line-height: 1.3;}
	.inform_1 .inform-content p:nth-child(3){float: right;width: 70px;}
}
.self{
	width:85%;
	height:20px;
	text-align:left;
	font-size:14px;
}
.input_text{
	width:20%;
	text-align: center;
	border-bottom:1px solid #ccc;
}
.btnFoote{
	border:0;
	color:#fff;
	width:100%;
	height: 50px;
	background:#FEB101;
	height:50px
}
.footer-center{
	background: transparent!important;
}
</style>
