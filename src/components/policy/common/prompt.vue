<template>
  <div v-show="show">
  <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2005;">
      <div class="mint-msgbox" style="">
          <div class="mint-msgbox-header">
              <div class="mint-msgbox-title">请输入关系</div>
        </div> 
    <div class="mint-msgbox-content">
        <div class="mint-msgbox-message">
        </div> 
             <div class="mint-msgbox-input">
                 <input placeholder="" type="text" @blur="handleBlur($event)"> 
                 <div class="mint-msgbox-errormsg" style="visibility: hidden;">
                 </div>
            </div>
        </div> 
         <div class="mint-msgbox-btns">
                <button class="mint-msgbox-btn mint-msgbox-cancel " @click="cancelClick">
                     取消</button>
                    <button class="mint-msgbox-btn mint-msgbox-confirm " @click="handleClick">
                     确定</button>
                    </div>
            </div>
    </div>
    <div class="v-modal" style="z-index: 2000;"></div>
   </div>
</template>
<script>
export default{
  name:"prompt",
  props: {
   	title: {
				type: String,
				default: '提示'
			},
      number:{
        type: Number,
				default: 0
      }
  },
  data(){
    return{
       show:false,
       value:"",
       index:"",
    }
  },
  methods:{
    showMOdal(index){
       this.index = index
       console.log("序号:"+this.index)
       this.show = true
    },
    handleBlur(e){
      this.value = e.target.value
    },
    handleClick(){
      if(this.value==undefined || this.value == ""){
        alert("请输入关系!")
        return
      }
      this.show = false
      if(this.number == 1){
         this.$emit('detonate',this.index,this.value)
      }else if(this.number == 2){
         this.$emit('detonates',this.index,this.value)
      }
    },
    cancelClick(){
      this.show = false
    }
  }
}
</script>
<style type="text/css" scoped >
.mint-msgbox-input input{
  padding: 0;
  margin-left: 10%;
  height: 35px;
  width: 80%!important;
}
.mint-msgbox-content{
	padding: 0 !important;
	max-height: 270px !important;
	min-height: 90px!important;
	overflow-y: auto;
	border-top:3px solid #FEB101!important;
	background-size: 100%;
	display: inline;
	/* justify-content:center; */
	/* align-items:center; */
}
</style>
