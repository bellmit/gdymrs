<template> 
    <div id="comfirmBook">
        <Headerbtns :title = page_title>
            <div slot="left" class="back">
                <i class="fa fa-angle-left" @click="back()"></i>
            </div>
        </Headerbtns>
        <div  class="manage-contents">
            <div id="firstTab">
                <!-- 条码区 -->
                <div class="img1" style="display:flex;justify-content:space-between;margin-top:1%">
                    <div>
                      <img src="../../../../static/img/policy/logo.png"  style="width:130px;height:50px;">
                    </div>
                    <div>
                        <img src="../../../../static/img/policy/2011801.png"  style="width:130px;height:60px;">
                    </div>
                </div>
            <!--内容-->
            <div class="content"  style="margin:5% 0 100% 0;">
                <h1>光大永明金保安康保险产品计划 2017</h1>
                <h1>免除保险人责任确认书</h1>

                <p class="normal">尊敬的客户，您好!</p>
                <p class="suojinP">感谢您选择光大永明人寿保险有限公司(以下简称“我公司”)的《光大永明金保安康健康保险产品计划 2017》产品，这是对我公司的充分信任和支持，为了让您更充分的了解条款内容， 保障您的合法权益，请仔细阅读主险产品条款中<span style="font-weight: bold">第八条</span>及附加险产品条款中<span style="font-weight: bold">第十一条</span>的相关免 责内容，具体免责内容如下:</p>
                <p class="boldP suojinP">主险:第八条 责任免除</p>
                <p class="suojinP">因下列情形之一导致被保险人身故或高度残疾的，我公司不承担给付身故保险金或高度残 疾保险金的责任:</p>
                <p class="suojinP">1、投保人对被保险人的故意杀害、故意伤害;</p>
                <p class="suojinP">2、被保险人故意犯罪或者抗拒依法采取的刑事强制措施;</p>
                <p class="suojinP">3、被保险人自保险合同成立或者合同效力恢复之日起 2 年内自杀，但被保险人自杀时为
                    无民事行为能力人的除外;</p>
                <p class="suojinP">4、被保险人主动吸食或注射毒品;</p>
                <p class="suojinP">5、被保险人酒后驾驶，无合法有效驾驶证驾驶，或驾驶无有效行驶证的机动车;</p>
                <p class="suojinP">6、战争、军事冲突、暴乱或武装叛乱;</p>
                <p class="suojinP">7、核爆炸、核辐射或核污染。</p>
                <p class="suojinP">因上述情形之一导致被保险人身故或高度残疾时，保险合同及《光大永明附加金保安康多
                    次重大疾病保险》同时终止。除法律及保险合同另有规定外，我公司将于收到下列证明材料后 三十日内向您退还保险合同终止时的现金价值净额和保险合同项下红利累积账户余额，以及《光 大永明附加金保安康多次给付重大疾病保险》终止时的现金价值净额。</p>
                <p class="suojinP">1、保险合同;</p>
                <p class="suojinP">2、您的身份证明。</p>
                <p class="suojinP boldP">附加险:第十一条 责任免除</p>
                <p class="suojinP">在下列情形下被保险人发生事故的，我公司不承担保险责任:</p>
                <p class="suojinP">1、投保人对被保险人的故意杀害、故意伤害或重大过失行为;</p>
                <p class="suojinP">2、被保险人故意犯罪或者抗拒依法采取的刑事强制措施;</p>
                <p class="suojinP">3、被保险人自附加合同成立或者合同效力恢复之日起 2 年内自杀，但被保险人自杀时为无
                    民事行为能力人的除外;</p>
                <p class="suojinP">4、被保险人服用、吸食或注射毒品;</p>
                <p class="suojinP">5、被保险人酒后驾驶、无合法有效驾驶证驾驶或驾驶无有效行驶证的机动车;</p>
                <p class="suojinP">6、被保险人感染艾滋病病毒或患艾滋病，但不包括【名词释义】中所定义的由输血或输液</p>
                <p class="suojinP">7、战争、军事冲突、暴乱或武装叛乱、恐怖袭击;</p>
                <p class="suojinP">8、核爆炸、核辐射或核污染;</p>
                <p class="suojinP">9、遗传性疾病，先天性畸形、变形或染色体异常。</p>
                <p class="suojinP">因上述第 1 项情形导致被保险人患有附加合同所列的轻症疾病或重大疾病的，附加合同及 主合同终止。若您已交足二年以上保险费的，我公司向其他权利人退还附加合同终止时的保险 单现金价值，及主合同终止时的现金价值及主合同项下红利累积账户余额。</p>
                <p class="suojinP">因上述第 2 至第 9 项情形导致被保险人患有附加合同所列的轻症疾病或重大疾病的，附加</P>
                <p style="text-align: center;margin: 20px auto;">第1页,共2页</p>
                <div class="linePage"></div>
                <P style="margin-top: 50px;line-height: 25px;">合同和主合同终止。除法律及附加合同另有规定外，我公司将于收到下列证明材料后 30 日内向 您退还附加合同终止时的保险单现金价值，及主合同终止时的现金价值及主合同项下红利累积账户余额。</p>
                    <p class="suojinP">1、附加合同;</p>
                    <p class="suojinP">2、您的有效身份证件。</p>
                    <br><br>
                    <p class="boldP soujinP" style="margin:50px 0;">请您仔细阅读上述提示内容，并签字确认。</p>
                    <br><br>
                    <p class="soujinP" style="line-height:20px">投保人签字: <img :src="sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">&nbsp;&nbsp;日期: </p>
                </div>
            </div>
            <p style="text-align: center;margin: 20px auto;">第2页,共2页</p>
            <div style="margin: 5% auto;">
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
        name: 'responsibilityConfirm_2011801',
        components: {Headerbtns,Footerbtns,alert},
        props: {},
        data() {
            return {
                page_title: '金保安康健康保险产品计划2017责任免除声明书',
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
                                         name:"2011801",
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
                                        name:"2011801",
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
                                         name:"2011801",
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
                                        name:"2011801",
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
                                     name:"2011801",
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
                                    name:"2011801",
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
                                     name:"2011801",
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
                                    name:"2011801",
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
   .manage-contents{
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
        margin:10px 0 ;
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


































