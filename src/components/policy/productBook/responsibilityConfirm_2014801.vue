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
                   <!--  <div>
                        <img src="../../../../static/img/policy/2014801.png"  style="width:130px;height:60px;">
                    </div> -->
                </div>
           <!--内容-->
           <div class="content">
               <h1>光大永明鑫玺人生年金保险（分红型）产品</h1>
               <h1>免除保险人责任确认书</h1>
               <p class="normal">尊敬的客户，您好!</p>
               <p class="suojinP">感谢您选择我公司的《光大永明鑫玺人生年金保险(分红型)》产品，这是对我们的充分信任和支持，为了让您更充分的了解条款内容，保障您的合法权益，请仔细阅读条款中<b style="font-weight:bolld;">第十条</b>的相关免责内容，具体免责内容如下：</p>
               <p class="boldP suojinP">第十条 责任免除</p>
               <p class="suojinP">一、在下列情形下被保险人身故的，我们不承担给付身故保险金的责任：</p>
               <p class="suojinP">1、您对被保险人的故意杀害、故意伤害；</p>
               <p class="suojinP">2、被保险人故意犯罪或者抗拒依法采取的刑事强制措施；</p>
               <p class="suojinP">3、被保险人自本合同成立或者合同效力恢复之日起2年内自杀，但被保险人自杀时为无民事行为能力人的除外；</p>
               <p class="suojinP">4、被保险人服用、吸食或注射毒品;</p>
               <p class="suojinP">5、被保险人酒后驾驶、无合法有效驾驶证驾驶或驾驶无有效行驶证的机动车；</p>
               <p class="suojinP">6、战争、军事冲突、暴乱或武装叛乱；</p>
               <p class="suojinP">7、核爆炸、核辐射或核污染。</p>
               <p class="suojinP">发生上述第1项情形导致被保险人身故的，本合同终止。若您已交足2年以上保险费的，我们向身故保险金受益人退还本合同终止时的现金价值。
               <p class="suojinP">发生上述第2至7项情形导致被保险人身故的，本合同终止。我们将于收到下列证明材料后30日内向您退还本合同终止时的现金价值。</p>
               <p class="suojinP">1、本合同；</p>
               <p class="suojinP">2、您的有效身份证件。</p>
               <p class="suojinP">二、因被保险人对投保人的故意杀害和故意伤害以及发生上述第一款第2、5、6、7项情形导致投保人身故或本合同所定义的高度残疾的，我们不予豁免保险费。</p>
               <p class="boldP suojinP" style="font-size: 14px;margin-top: 20px">请您仔细阅读上述提示内容，并签字确认。</p>
               <p class="suojinP">投保人签字:<img :src="sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;"> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期:</p>
            </div>
            </div>
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
        name: 'responsibilityConfirm_2014801',
        components: {Headerbtns,Footerbtns,alert},
        props: {},
        data() {
            return {
                page_title: '光大永明鑫玺人生年金保险（分红型）产品免除保险人责任确认书',
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
                                         name:"2014801",
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
                                        name:"2014801",
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
                                         name:"2014801",
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
                                        name:"2014801",
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
                                     name:"2014801",
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
                                    name:"2014801",
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
                                     name:"2014801",
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
                                    name:"2014801",
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
