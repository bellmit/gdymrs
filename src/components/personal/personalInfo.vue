<!--
	个人中心
-->
<template>
	<div>
        <Headerbtns :title = "page_title">
            <div slot="left" class="back" @click="pre">
                <i class="fa fa-angle-left" ></i>
            </div>
        </Headerbtns>
        <div class="manage-main-contents">
            
        </div>
        <alert ref="alert"></alert>
        <tabBar :isHome="false" :serviceInfo="true" :productManualInfo="true" :me="false"></tabBar>
	</div>
</template>

<!--js-->
<script>

import { MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui';
import Headerbtns from '../../../src/components/policy/common/Header'
import alert from '../policy/common/alert.vue'
import picker from '../common/Picker.vue'
import serviceList from '../../../static/dict/service_info_sunlife.json'
import imgList from '../../../static/dict/img_sunlife.json'
import tabBar from '../common/TabBar.vue'

export default{
    name:'personalInfo',
    components: {Headerbtns,alert,picker,tabBar},
    props: ['value'],
    data () {
        return {
            page_title:'个人中心',
            toggle:{},
            dict:{},
            selectResult:"1",
            link:","
        }
    },
    watch:{

    },
    beforeMount(){
        
    },
    mounted(){

   },
   beforeDestroy(){

    },
    methods:{
        handleLoad(){

        },
        pre(){
            Indicator.close();
            this.$router.push({
                name:"home"
            })
        },
        showMsg:function(msg){
            if(msg!=undefined && msg!=""){
                this.$refs.alert.showMOdal(msg)
            }
        },
    }
}
</script>

<style lang="scss" scoped type="text/css">
.manage-main-contents{
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 48px;
  bottom: 0px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #FFF;
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
  font-size: 35px;
}
</style>
