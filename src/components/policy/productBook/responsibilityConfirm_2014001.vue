<template> 
    <div id="comfirmBook">
        <Headerbtns :title = page_title>
            <div slot="left" class="back">
                <i class="fa fa-angle-left" @click="back()"></i>
            </div>
        </Headerbtns>
        <div class="manageContent">
            <div id="firstTab">
                <!-- 条码区 -->
                <div class="img1" style="display:flex;justify-content:space-between;margin-top:1%">
                    <div>
                      <img src="../../../../static/img/policy/logo.png"  style="width:130px;height:50px;">
                    </div>
                    <div>
                        <img src="../../../../static/img/policy/2014001.png"  style="width:130px;height:60px;">
                    </div>
                </div>
                <!--内容-->
                <div class="content">
                    <h1>光大永明吉瑞宝重疾保险产品计划</h1>
                    <h1>免除保险人责任确认书</h1>
                    <p class="normalP">尊敬的客户，您好!</p>
                    <p class="suojinP">感谢您选择光大永明人寿保险有限公司(以下简称“我公司”)的《光大永明吉瑞宝重疾保
                        险产品计划》产品，这是对我公司的充分信任和支持，为了让您更充分的了解条款内容，保障 您的合法权益，请仔细阅读主险产品条款中<b style="font-weight:bold">第十条</b>及附加险产品条款中<b style="font-weight:bold">第十条</b>的相关免责内容， 具体免责内容如下:</p>
                    <p class="suojinP boldP">主险:第十条 责任免除</p>
                    <p class="suojinP">因下列情形之一导致被保险人身故或高度残疾的，我公司不承担保险责任:</p>
                    <p class="suojinP">1、投保人对被保险人的故意杀害、故意伤害;</p>
                    <p class="suojinP">2、被保险人故意犯罪或者抗拒依法采取的刑事强制措施;</p>
                    <p class="suojinP">3、被保险人自保险合同成立或者合同效力恢复之日起 2 年内自杀，但被保险人自杀时为无
                        民事行为能力人的除外;</p>
                    <p class="suojinP">4、被保险人服用、吸食或注射毒品;</p>
                    <p class="suojinP">5、被保险人酒后驾驶、无合法有效驾驶证驾驶或驾驶无有效行驶证的机动车;</p>
                    <p class="suojinP">6、战争、军事冲突、暴乱或武装叛乱、恐怖袭击;</p>
                    <p class="suojinP">7、核爆炸、核辐射或核污染;</p>
                    <p class="suojinP">发生上述第 1 项情形导致被保险人身故或高度残疾的，保险合同终止。若您已交足二年以
                        上保险费的，我公司向其他权利人退还保险合同终止时的现金价值。</p>
                    <p class="suojinP">发生上述第 2 至 7 项情形导致被保险人身故或高度残疾的，保险合同终止。我公司将于收
                        到下列证明材料后 30 日内向您退还保险合同终止时的现金价值。</p>
                    <p class="suojinP">1、保险合同;</p>
                    <p class="suojinP">2、您的有效身份证件。</p>
                    <p class="suojinP">特别提示和说明:本条所述“现金价值”是指保险合同及附加合同“光大永明附加吉瑞宝 重大疾病保险”的现金价值之和。</p>
                    <p class="suojinP boldP">附加险:第十条 责任免除</p>
                    <p class="suojinP">在下列情形下被保险人患有附加合同所列的轻症疾病、重大疾病、少儿特定疾病或达到疾 病终末期阶段的，我公司不承担保险责任:</p>
                    <p class="suojinP">1、投保人对被保险人的故意杀害、故意伤害;</p>
                    <p class="suojinP">2、被保险人故意犯罪或者抗拒依法采取的刑事强制措施;</p>
                    <p class="suojinP">3、被保险人自附加合同成立或者效力恢复之日起 2 年内自杀，但被保险人自杀时为无民事
                        行为能力人的除外;</p>
                    <p class="suojinP">4、被保险人服用、吸食或注射毒品;</p>
                    <p class="suojinP">5、被保险人酒后驾驶、无合法有效驾驶证驾驶或驾驶无有效行驶证的机动车;</p>
                    <p class="suojinP">6、战争、军事冲突、暴乱或武装叛乱、恐怖袭击;</p>
                    <p class="suojinP">7、核爆炸、核辐射或核污染;</p>
                    <p class="suojinP">8、被保险人感染艾滋病病毒或患艾滋病，但不包括附加险产品条款【名词释义】中所列的
                        第 31 种(由输血或输液导致的人类免疫缺陷病毒感染)、第 32 种(因职业关系和因器官移植导致 的人类免疫缺陷病毒(HIV)感染)、第 94 种(因器官移植导致的人类免疫缺陷病毒(HIV)感染);</p>
                    <p class="suojinP">9、遗传性疾病、先天性畸形、变形或染色体异常;</p>
                    <p class="suojinP">10、被保险人在附加合同生效(或最后复效)之前已患有附加合同所列的轻症疾病、重大疾</p>
                    <p style="text-align: center;margin: 20px auto;">第1页,共2页</p>
                    <div class="linePage"></div>
                    <p style="margin-top: 50px;line-height: 25px;">病、少儿特定疾病或进入疾病终末期阶段的。</p>
                    <p class="suojinP">发生上述第 1 项情形导致被保险人患有附加合同所列的轻症疾病、重大疾病、少儿特定疾
                        病或进入疾病终末期阶段的，附加合同及主合同终止。若您已交足二年以上保险费的，我公司 向其他权利人退还附加合同终止时的现金价值。</p>
                    <p class="suojinP">发生上述第 2-10 项情形导致被保险人患有附加合同所列的轻症疾病、重大疾病、少儿特定 疾病或进入疾病终末期阶段的，附加合同及主合同终止。我公司将于收到下列证明材料后 30 日 内向您退还附加合同终止时的现金价值。</p>
                    <p class="suojinP">1、附加合同;</p>
                    <p class="suojinP">2、您的有效身份证件。</p>
                    <p class="suojinP">特别提示和说明:本条所述“现金价值”是指附加合同及主合同“光大永明吉瑞宝两全保
                        险”的现金价值之和。</p>
                    <br><br>
                    <p class="boldP soujinP">请您仔细阅读上述提示内容，并签字确认。</p>
                    <br><br>
                    <p class="soujinP">投保人签字:<img :src="sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期:</p>
                </div>
            </div>
            <p style="text-align: center;margin: 100% auto 0 auto;">第2页,共2页</p>
            <div style="margin:10% 0 5% 0;font-size:12px;">
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
        name: 'responsibilityConfirm_2014001',
        components: {Headerbtns,Footerbtns,alert},
        props: {},
        data() {
            return {
                page_title: '吉瑞宝重疾保险产品计划责任免除声明书',
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
                                         name:"2014001",
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
                                        name:"2014001",
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
                                         name:"2014001",
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
                                        name:"2014001",
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
                                     name:"2014001",
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
                                    name:"2014001",
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
                                     name:"2014001",
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
                                    name:"2014001",
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
    .clear{
        content:"";
        clear:both;
        display:block
    }
    .manageContent{
        position: absolute;
        padding: 0 5%;
        left: 0;right: 0;top: 48px;bottom: 50px;
        overflow-y: auto;
        overflow-x: hidden;
        background: #FFF;
        margin-top: 7%; 
        font-size: 12px;
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