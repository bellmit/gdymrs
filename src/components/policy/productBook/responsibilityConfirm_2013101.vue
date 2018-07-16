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
                        <img src="../../../../static/img/policy/2013101.png"  style="width:130px;height:60px;">
                    </div>
                </div>
            <!--内容-->
            <div class="content">
                <h1>光大永明附加投保人豁免保险费重大疾病保险</h1>
                <h1>免除保险人责任确认书</h1>
                <p class="normalP">尊敬的客户，您好!</p>
                <p class="suojinP">感谢您选择光大永明人寿保险有限公司(以下简称“我公司”)的《光大永明附加投保人豁
                    免保险费重大疾病保险》产品，这是对我公司的充分信任和支持，为了让您更充分的了解条款 内容，保障您的合法权益，请仔细阅读产品条款中<b style="font-weight:bold;">第六条</b>的相关免责内容，具体免责内容如下:</p>
                <p class="suojinP boldP">第六条 责任免除</p>
                <p class="suojinP">因下列情形之一导致被保险人发生疾病、达到疾病状态或进行手术的，保险公司不承担给 付重大疾病保险金或保险费返还的责任:</p>
                <p class="suojinP">1、投保人对被保险人的故意杀害、故意伤害;</p>
                <p class="suojinP">2、被保险人故意犯罪、拒捕、斗殴、自杀、自伤身体及服用、吸食或注射毒品;</p>
                <p class="suojinP">3、被保险人酒后驾驶、无合法有效驾驶证驾驶，或驾驶无有效行驶证的机动车;</p>
                <p class="suojinP">4、被保险人感染艾滋病病毒或患艾滋病;</p>
                <p class="suojinP">5、战争、军事冲突、暴乱或武装叛乱;</p>
                <p class="suojinP">6、核爆炸、核辐射或核污染;</p>
                <p class="suojinP">7、遗传性疾病，先天性畸形、变形或染色体异常。</p>
                <p class="suojinP">因上述情形之一导致被保险人发生疾病、达到疾病状态或进行手术的，附加合同终止。</p>
                <p class="suojinP">因下列情形之一导致被保险人身故或高度残疾的，保险公司不承担身故豁免保险费、高度
                    残疾豁免保险费或保险费返还的责任:</p>
                <p class="suojinP">1、投保人对被保险人的故意杀害、故意伤害;</p>
                <p class="suojinP">2、被保险人故意犯罪或者抗拒依法采取的刑事强制措施;</p>
                <p class="suojinP">3、被保险人自附加合同成立或者合同效力恢复之日起 2 年内自杀，但被保险人自杀时为
                    无民事行为能力人的除外;</p>
                <p class="suojinP">4、被保险人主动吸食或注射毒品;</p>
                <p class="suojinP">5、被保险人酒后驾驶，无合法有效驾驶证驾驶，或驾驶无有效行驶证的机动车;</p>
                <p class="suojinP">6、战争、军事冲突、暴乱或武装叛乱;</p>
                <p class="suojinP">7、核爆炸、核辐射或核污染。</p>
                <p class="suojinP">因上述情形之一导致被保险人身故或高度残疾时，附加合同终止。</p>
                <br><br>
                <p class="boldP suojinP">请您仔细阅读上述提示内容，并签字确认。</p>
                <br><br>
                <p class="suojinP">投保人签字:<img :src="sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期:</p>
            </div>
            </div>
            <p style="text-align: center;margin: 100% auto 0 auto;">第1页,共1页</p>
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
        name: 'responsibilityConfirm_2013101',
        components: {Headerbtns,Footerbtns,alert},
        props: {},
        data() {
            return {
                page_title: '附加投保人豁免保险费重大疾病保险责任免除声明书',
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
                                        name:"2013101",
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
                                        name:"2013101",
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
                                        name:"2013101",
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
                                        name:"2013101",
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
                                    name:"2013101",
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
                                    name:"2013101",
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
                                    name:"2013101",
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
                                    name:"2013101",
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
</style>