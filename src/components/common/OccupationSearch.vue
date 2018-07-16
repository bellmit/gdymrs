<!--
	职业查询页面
-->
<template>
	<div>
    <Headerbtns :title = page_title>
        <i class="fa fa-angle-left" @click="cancel" replace slot="left"></i>
    </Headerbtns>   
    <div id="maincontent" class="manage-main-contents">
      <div style="background-color:#E5E3E4;padding:10px 15px;">
        <div  style="border:1px solid #CAC9C9;border-radius:5px;background-color:#fff;height:35px;line-height:35px;padding:0 5px;">
          <input type="text" style="width:80%;" placeholder="" v-model="searchParameter">
          <i @click="search" class="fa fa-search logo" aria-hidden="true" style="font-size: 20px;line-height:35px"></i>
        </div>
      </div>
      <ul class="list">
        <li>
          <div class="" v-show="!toggle.isSearch" v-for="itm in dict.occupationList.occupation.itemOne">
            <p @click="itm.isopen = !itm.isopen">
              {{itm.descr}}
              <i class="fa fa-angle-double-up logo lh" aria-hidden="true" style="line-height: 20px;
    font-size: 25px;-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':itm.isopen?'rotate(180deg)':''}"></i>
            </p>
            <div class="line-bottom" v-show="itm.isopen">
                <div v-for="itmtwo in itm.itemTwo">
                  <!-- <p style="margin: 0 10px;"></p> -->
                  <p v-for="itmThree in itmtwo.itemThree" @click="selectedItem(itmThree)">
                    {{itmThree.descr}}
                  </p>
                </div>
            </div>
          </div>
          <div class="line-bottom" v-show="toggle.isSearch">
                <p style="height:0px;padding:0px"></p>
                <p v-for="itm in temp.occupationList.occupation.item" @click="selectedItem(itm)">
                  {{itm.descr}}
                </p>
          </div>
        </li>
      </ul>
    </div>
    <alert ref="alert"></alert>
	</div>
</template>

<!--js-->
<script>
	import { MessageBox } from 'mint-ui'
  import Headerbtns from '../../../src/components/policy/common/Header'
  import occupationList from '../../../static/dict/occupation_sunlife.json'
  import alert from '../policy/common/alert.vue'

	export default{
		name:'occupation_search',
    components: {Headerbtns,alert},
    props: ['value'],
		data () {
	    return {
        dict:{
          occupationList:occupationList
        },
        temp:{
          occupationList:{
            occupation:{
              item:[]
            }
          }
        },
        toggle:{
          isSearch:false,//是否为查询
        },
	    	page_title:'职业查询',
        searchParameter:'',
	    }
	  },
	  beforeMount(){

	  },
	  mounted(){

	  },
	  methods:{
      showMsg:function(msg){
        if(msg!=undefined && msg!=""){
          this.$refs.alert.showMOdal(msg)
        }
      },
      search:function(){
        //对传入的查询条件进行字符串过滤
        this.searchParameter = this.searchParameter.replace(/\s+/g,"")
        if(this.searchParameter != undefined && this.searchParameter != ""){
          //每次有查询条件时查询初始化次数组
          this.temp.occupationList.occupation.item = []
          //大类
          var i
          let itemOneList = this.dict.occupationList.occupation.itemOne
          for (i = 0; i < itemOneList.length; i++) {
            //中类
            let itemTwoList = itemOneList[i].itemTwo
            if (itemTwoList!=null && itemTwoList.length>0) {
              for (var j = 0; j < itemTwoList.length; j++) {
                //小类
                let itemThree = itemTwoList[j].itemThree
                if (itemThree!=null && itemThree.length>0) {
                  for (var k = 0; k < itemThree.length; k++) {
                    //字符包含输入字符时插入数组
                    if (itemThree[k].descr.indexOf(this.searchParameter)>-1) {
                      this.toggle.isSearch = true
                      this.temp.occupationList.occupation.item.push(itemThree[k])
                    }
                  }
                }
              }
            }
          }
          //检查数组是否存在内容不存在说明查询为空,予以提示
          let tempList = this.temp.occupationList.occupation.item
          if (tempList == undefined || tempList.length == 0) {
            this.showMsg("未查询到相关职业")
          }
        }else{
          this.toggle.isSearch = false
          this.temp.occupationList.occupation.item = []
        }
      },
      //选中职业事件
      selectedItem:function (item) {
        this.value.isopen = !this.value.isopen
        this.value.occItem = item
        this.$emit("selected",item)
      },
      //取消选中事件
      cancel:function () {
        this.value.isopen = !this.value.isopen
        this.value.occItem = undefined
        console.log("取消选择职业===>",this.value)
      }
	  }
	}
</script>

<style lang="scss" scoped type="text/css">
.manage-main-contents{
  width: 100%;
  position: absolute;
  left: 0;right: 0;top: 48px;bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #FFF;
}
.list{
  
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
.logo{
  float:right;
  color:#FDAA00;
}
.lh{line-height:20px;}
/*列表*/
ul>li>div>p:nth-child(1){

  color: #FFAC00;
  background-color:#F8F8F8;
  border:1px solid #C8C8C8;
  padding:10px;
  line-height: 20px;
}
.line-bottom p{
  padding:10px;
  margin: 0 15px;
  border-bottom:1px dashed #A9A6A2;
  line-height: 20px;
}
// .line-bottom p:last-child{
//   border-bottom:0;
// }
</style>
