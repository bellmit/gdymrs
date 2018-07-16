<template> 
    <div id="comfirmBook">
        <Headerbtns :title = page_title>
            <div slot="left" class="back">
                <i class="fa fa-angle-left" @click="back()"></i>
            </div>
        </Headerbtns>
        <div class="manage-contents">
            <div id="firstTab">
                <!-- 条码区 -->
                <div class="img1" style="display:flex;justify-content:space-between;margin-top:1%">
                    <div>
                      <img src="../../../../static/img/policy/logo.png"  style="width:130px;height:50px;">
                    </div>
                    <div>
                        <img src="../../../../static/img/policy/2013502.png"  style="width:130px;height:60px;">
                    </div>
                </div>
            <!--内容-->
            <div class="content">
                <h1>光大永明关爱永逸保险计划(2018 版)产品</h1>
                <h1>免除保险人责任确认书</h1>
                <p class="normalP">尊敬的客户，您好!</p>
                <p class="suojinP">感谢您选择我公司的《光大永明关爱永逸保险计划(2018 版)》产品，这是对我们的充分
                    信任和支持，为了让您更充分的了解条款内容，保障您的合法权益，请仔细阅读条款中的<b style="font-weight:bold">第十条、第十一条、第十八条、第二十二条</b>的相关免责内容，具体免责内容如下:</p>
                <p class="suojinP boldP">第十条 责任免除:</p>
                <p class="suojinP">在下列情形下被保险人身故或高度残疾的，我们不承担保险责任(主险):</p>
                <p class="suojinP">1. 您对被保险人的故意杀害、故意伤害;</p>
                <p class="suojinP">2. 被保险人故意犯罪或者抗拒依法采取的刑事强制措施;</p>
                <p class="suojinP">3. 被保险人自本合同成立或者合同效力恢复之日起 2 年内自杀，但被保险人自杀时为无民事行为能力人的除外;</p>
                <p class="suojinP">4. 被保险人服用、吸食或注射毒品;</p>
                <p class="suojinP">5. 被保险人酒后驾驶、无合法有效驾驶证驾驶或驾驶无有效行驶证的机动车;</p>
                <p class="suojinP">6. 战争、军事冲突、暴乱或武装叛乱、恐怖袭击;</p>
                <p class="suojinP">7. 核爆炸、核辐射或核污染;</p>
                <p class="suojinP">发生上述第 1 项情形导致被保险人身故或高度残疾的，本合同终止。若您已交足二年以上保险费的，我们向其他权利人退还本合同终止时的现金价值。</p>
                <p class="suojinP">发生上述第 2 至 7 项情形导致被保险人身故或高度残疾的，本合同终止。我们将于收到下列证明材料后 30 日内向您退还本合同终止时的现金价值。</p>
                <p class="suojinP">1. 本合同;</p>
                <p class="suojinP">2. 您的有效身份证件。</p>
                <p class="suojinP">在下列情形下被保险人患有本附加合同约定的轻症疾病或重大疾病的，我们不承担保险责任(附加险):</p>
                <p class="suojinP">1.您对被保险人的故意杀害、故意伤害;</p>
                <p class="suojinP">2.被保险人故意犯罪或者抗拒依法采取的刑事强制措施;</p>
                <p class="suojinP">3.被保险人自本附加成立或者效力恢复之日起 2 年内自杀，但被保险人自杀时为无民事行为
                    能力人的除外;</p>
                <p class="suojinP">4.被保险人服用、吸食或注射毒品;</p>
                <p class="suojinP">5.被保险人酒后驾驶、无合法有效驾驶证驾驶或驾驶无有效行驶证的机动车;</p>
                <p class="suojinP">6.战争、军事冲突、暴乱或武装叛乱、恐怖袭击;</p>
                <p class="suojinP">7.核爆炸、核辐射或核污染;</p>
                <p class="suojinP">8.被保险人感染艾滋病病毒或患艾滋病，但不包括【名词释义】中所定义的第 31 种由输血或输液导致的人类免疫缺陷病毒感染、第 32 种因职业关系导致的人类免疫缺陷病毒(HIV)感染</p>
                <p style="text-align: center;margin: 20px auto;">第1页,共3页</p>
                <div class="linePage"></div>
                <!-- 条码区 -->
                <div class="img1" style="display:flex;justify-content:space-between;margin-top:3%">
                    <div>
                      <img src="../../../../static/img/policy/logo.png"  style="width:130px;height:50px;">
                    </div>
                    <div>
                        <!-- <img src="../../../../static/img/policy/2013502.png"  style="width:130px;height:60px;"> -->
                    </div>
                </div>
                <p style="margin-top: 20px;line-height: 25px;">和第 94 种因器官移植导致的人类免疫缺陷病毒(HIV)感染;</p>
                <p class="suojinP">9.遗传性疾病、先天性畸形、变形或染色体异常;</p>
                <p class="suojinP">10.被保险人在本附加合同生效日之前已患有本附加合同所列的重大疾病。</p>
                <p class="suojinP">发生上述第 1 项情形导致被保险人患有本附加合同约定的轻症疾病或重大疾病的，本附加合同终止。若您已交足二年以上保险费的，我们向其他权利人退还本附加合同终止时的现金价值。</p>
                <p class="suojinP">发生上述第 2-10 项情形导致被保险人患有本附加合同约定的轻症疾病或重大疾病的，本附加合同终止。我们将于收到下列证明材料后 30 日内向您退还本附加合同终止时的现金价值。</p>
                <p class="suojinP">1. 本附加合同;</p>
                <p class="suojinP">2. 您的有效身份证件。</p>
                <br>
                <p class="boldP">第十一条 保险事故通知</p>
                <p class="suojinP">您、被保险人或受益人应于知道保险事故发生之日起 3 日内通知我们，否则由于通知延误，导致必要证据丧失或事故性质、原因、损失程度难以确定的，我们对无法确定的部分不承担赔偿 或者给付保险金的责任;同时，因此致使我们增加的勘查、检验等费用应从给付的保险金中扣除， 但因不可抗力导致延误的除外。</p>
                <br>
                <p class="boldP">第十八条 明确说明和如实告知义务</p>
                <p class="suojinP">订立本合同时，我们应向您说明本合同的内容。</p>
                <p class="suojinP">对保险条款中免除我们责任的条款，我们在订立合同时应当在投保单、保险单或者其他保险凭证上作出足以引起您注意的提示，并对该条款的内容以书面或者口头形式向您作出明确说明， 未作提示或者明确说明的，该条款不产生效力。</p>
                <p class="suojinP">我们就您和被保险人的有关情况提出询问，您应当如实告知。</p>
                <p class="suojinP">如果您故意或者因重大过失未履行前款规定的如实告知义务，足以影响我们决定是否同意承 保或者提高保险费率的，我们有权解除本合同。</p>
                <p class="suojinP">前款规定的合同解除权，自我们知道有解除事由之日起，超过 30 日不行使而消灭。自合同 成立之日起超过 2 年的，我们不得解除合同;发生保险事故的，我们应当承担赔偿或者给付保险 金的责任。</p>
                <p class="suojinP">如果您故意不履行如实告知义务，对于本合同解除前发生的保险事故，我们不承担给付保险 金的责任，并不退还保险费。</p>
                <p class="suojinP">如果您因重大过失未履行如实告知义务，对保险事故的发生有严重影响的，对于本合同解除 前发生的保险事故，我们不承担给付保险金的责任，但应当退还保险费。</p>
                <p class="suojinP">我们在合同订立时已经知道您未如实告知的情况的，我们不得解除合同;发生保险事故的， 我们承担给付保险金的责任。</p>
                <br>
                <p class="boldP">第二十二条 年龄计算及错误处理</p>
                <p class="suojinP">被保险人的投保年龄为以法定证件载明的出生日期为基础计算的周岁年龄。您在申请投保时，应将被保险人的真实年龄在投保书上填明，若发生错误按下列规定办理:</p>
                <p class="suojinP">一、 您申报的被保险人年龄不真实，且真实投保年龄不符合本合同约定的投保年龄限制的，我们可以解除本合同，并向您退还解除保险合同时保险单的现金价值。但自本合同生效日起超过 2 年的，我们不得解除本合同，依照本条第二、第三款办理。</p>
                <p style="text-align: center;margin: 20px auto;">第2页,共3页</p>
                <div class="linePage"></div>
                <!-- 条码区 -->
                <div class="img1" style="display:flex;justify-content:space-between;margin-top:3%">
                    <div>
                      <img src="../../../../static/img/policy/logo.png"  style="width:130px;height:50px;">
                    </div>
                    <div>
                        <!-- <img src="../../../../static/img/policy/2013502.png"  style="width:130px;height:60px;"> -->
                    </div>
                </div>
                <p class="suojinP" style="margin-top:20px;">二、 您申报的被保险人年龄不真实，致使您实交保险费少于应交保险费的，我们在审核更 正后，有权要求您依照法律及公司投保规则的规定，补齐保险费、参加体检及配合其他业务流程 要求;若补交保险费前已发生保险事故，我们按照实交保险费与应交保险费的比例给付保险金。</p>
                <p class="suojinP">三、您申报的被保险人年龄不真实，致使您实交保险费多于应交保险费的，我们将在审核更 正后，将多收的保险费无息退还您。</p>
                <br><br>
                <p class="boldP soujinP">请您仔细阅读上述提示内容，并签字确认。</p>
                <br><br>
                <p class="soujinP">投保人签字:<img :src="sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期:</p> 
            </div>
            </div>
            <p style="text-align: center;margin: 100% auto 0 auto;">第3页,共3页</p>
            <div style="margin:5% 0 5% 0;">
                <input type="checkbox" v-model="isAgree">&nbsp;&nbsp;本人{{appntName}}已认真阅读投保特别提示，且全面知晓理解相关内容，并予以确认。
            </div>
            
        </div>
        <alert ref="alert"></alert>
        <Footerbtns :is_show=false 
            total_premium="10000.00">
            <button class="btnFoote" slot="center" :disabled="!isAgree" @click="jumpToBack()">
                下一步
            </button>
        </Footerbtns>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import Headerbtns from '../../common/Header.vue'
    import Footerbtns from '../../policy/common/Footer.vue'
    import alert from '../common/alert.vue'  

    export default{
        name: 'responsibilityConfirm_2013502',
        components: {Headerbtns,Footerbtns,alert},
        props: {},
        data() {
            return {
                page_title: '光大永明关爱永逸保险计划(2018 版)产品 免除保险人责任确认书',
                current_total_premium: '10000.00',
                isAgree:false,
                isShare:this.$route.params.share,
                channel:"",
                sign:JSON.parse(this.$route.params.signImgs),
                appntName:this.$route.params.applicant,
                planId:this.$route.params.planId,
                applyCode:this.$route.params.applyCode,

            }
        },
        watch:{
            'isAgree': {
                handler(val) {
                    if(val){
                        $(".btnFoote").attr({'disabled':false})
                        $(".btnFoote").css({'color':'#fff'})
                    }else{
                        $(".btnFoote").css({'color':'silver'})
                        $(".btnFoote").attr({'disabled':true})
                    }
                },
                deep: true
            },
        },
        beforeMount(){
            $(".btnFoote").css({'color':'silver'})
        },
        mounted(){
            $(".btnFoote").css({'color':'silver'})
            this.channel=this.$route.params.channel
            console.log(this.channel)
        },
        methods:{
            jumpToBack(){
                if(this.isAgree){
                    console.log(this.isAgree)
                    if(!this.isShare){
                        if(this.channel == "13" || this.channel == "02"){
                             this.$router.push({
                                 path: '/policy/ElectronicsYinBaoPolicyPage.vue',
                                 name: 'ElectronicsYinBaoPolicyPage',
                                 params: {
                                     planId:this.planId,
                                     applyCode:this.applyCode,
                                     sendInfo:{
                                         name:"2013502",
                                         isRed:"0", 
                                         content:""
                                     }
                                 }
                             })
                         }else{
                             this.$router.push({
                                 path: '/policy/ElectronicsPolicyPage.vue',
                                 name: 'electronics_policy_page',
                                 params: {
                                     planId:this.planId,
                                     applyCode:this.applyCode,
                                     sendInfo:{
                                        name:"2013502",
                                        isRed:"0",  
                                        content:"" 
                                     }
                                     
                                 }
                             })
                         }
                    }else{
                        if(this.channel == "13" || this.channel == "02"){
                             this.$router.push({
                                 path: '/policy/ElectronicsYinBaoPolicySharePage.vue',
                                 name: 'electronics_yinbao_policy_share_page',
                                 params: {
                                     planId:this.planId,
                                     applyCode:this.applyCode,
                                     index:this.$route.params.index,
                                     result:"-1",
                                     resultmsg:this.$route.params.resultmsg,
                                     sendInfo:{
                                         name:"2013502",
                                         isRed:"0", 
                                         content:""
                                     }
                                 }
                             })
                         }else{
                             this.$router.push({
                                 path: '/policy/ElectronicsPolicySharePage.vue',
                                 name: 'electronics_policy_share_page',
                                 params: {
                                     planId:this.planId,
                                     applyCode:this.applyCode,
                                     index:this.$route.params.index,
                                     result:"-1",
                                     resultmsg:this.$route.params.resultmsg,
                                     sendInfo:{
                                        name:"2013502",
                                        isRed:"0",  
                                        content:"" 
                                     }
                                     
                                 }
                             })
                         }
                    }
                   
                }else{
                    this.showMsg("请确认勾选按钮!")
                }
                
            },
            back(){
                if(!this.isShare){
                    if(this.channel == "13" || this.channel == "02"){
                         this.$router.push({
                             path: '/policy/ElectronicsYinBaoPolicyPage.vue',
                             name: 'ElectronicsYinBaoPolicyPage',
                             params: {
                                 planId:this.planId,
                                 applyCode:this.applyCode,
                                 sendInfo:{
                                     name:"2013502",
                                     isRed:"1", 
                                     content:""
                                 }
                             }
                         })
                     }else{
                         this.$router.push({
                             path: '/policy/ElectronicsPolicyPage.vue',
                             name: 'electronics_policy_page',
                             params: {
                                 planId:this.planId,
                                 applyCode:this.applyCode,
                                 sendInfo:{
                                    name:"2013502",
                                    isRed:"1",  
                                    content:"" 
                                 }
                                 
                             }
                         })
                     }
                }else{
                    if(this.channel == "13" || this.channel == "02"){
                         this.$router.push({
                             path: '/policy/ElectronicsYinBaoPolicySharePage.vue',
                             name: 'electronics_yinbao_policy_share_page',
                             params: {
                                 planId:this.planId,
                                 applyCode:this.applyCode,
                                 index:this.$route.params.index,
                                 result:"-1",
                                 resultmsg:this.$route.params.resultmsg,
                                 sendInfo:{
                                     name:"2013502",
                                     isRed:"1", 
                                     content:""
                                 }
                             }
                         })
                     }else{
                         this.$router.push({
                             path: '/policy/ElectronicsPolicySharePage.vue',
                             name: 'electronics_policy_share_page',
                             params: {
                                 planId:this.planId,
                                 applyCode:this.applyCode,
                                 index:this.$route.params.index,
                                 result:"-1",
                                 resultmsg:this.$route.params.resultmsg,
                                 sendInfo:{
                                    name:"2013502",
                                    isRed:"1",  
                                    content:"" 
                                 }
                                 
                             }
                         })
                     }
                }
                
            },
            showMsg:function(msg){
                    if(msg!=undefined && msg!=""){
                        this.$refs.alert.showMOdal(msg)
                    }
            },
        }
    }
</script>

<style>
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
    .header{
        float: right;
        display: block;
        width: 120px;height: 60px;
        background: url("../../../../static/img/policy/logo.png")no-repeat right center;
        background-size: 100% 70%;
    }
    .clear{
        content:"";
        clear:both;
        display:block
    }
    .manage-contents{
        position: absolute;
        padding: 0 5%;
        left: 0;right: 0;top: 48px;bottom: 50px;
        overflow-y: auto;
        overflow-x: hidden;
        background: #FFF;
        margin-top: 7%; 
    }
    /* .content{
        margin-top: 30%;
    } */
    h1{
        text-align: center;
        font-weight:bold;
        margin:20px 0 ;
    }
    .btnFoote{
        border:0;
        color:#fff;
        width:100%;
        height: 50px;
        background:#FEB101;
        height:50px
    }
    .suojinP{
        text-indent: 2em;
        margin-top: 5px;
        margin-bottom: 5px;
        line-height: 25px;
    }
    .boldP{
        font-weight: bold;
    }
    .linePage{
        height: 10px;
        background:#D6D4CF;
        margin: 0 -30px;
    }
</style>
