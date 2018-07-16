<template>
	<div class="main-contents">
		<Headerbtns :title="page_title">
        <div slot="left" class="back" @click="cancel">
          <i class="fa fa-angle-left" ></i>
        </div>
      </Headerbtns>
      <div class="select-title" v-show="isProvince">
         {{province}}
      </div>
       <div class="select-city" v-show="city.text != null">
         {{city.text}}
      </div>
       <div class="select-county" v-show="selectCitys == false ">
           <mt-field label="所在区/县" placeholder="**区" v-model="county"></mt-field>
       </div>
        <ul v-show="selectCitys" style="margin-top:10px">
            <li v-for="item in itemlist"  class="list-item" @click="selectCity(item)">{{item.text}}</li>
        </ul>
      <div class="select-province"  v-show="isSame">
           <div>
               <p  @click="handleClick()">{{province}}</p>
           </div>
      </div>
       <div class="select-province_list" v-if="province == null"
          v-for="item in province_list" @click="selectCity(item)">
         {{item.text}} 
      </div>
       <div class="btn-wrapper" v-show="city.text != null" @click="selectClick()">确定</div>
	<Alert ref="btn"></Alert>
    </div>
</template>

<script>
    import Headerbtns from './Header.vue'
    import picker from '../../common/Picker.vue'
    import Alert from './alert.vue' 
    import provinceList from '../../../../static/dict/province_sunlife.json'
    import cityList from '../../../../static/dict/city_sunlife.json'
    import orgProvince from '../../../../static/dict/org_province_sunlife.json'
	export default{
		name:"selectArea",
		components:{
            Headerbtns,picker,Alert
		},
        props:{
           provinces:{
               type:String,
               default:null
           },
           value:{
                type:Object,
                default:{}
           }
        },
		data(){
			return{
              page_title:"选择所在区",
              province:null,
              province_list:null,
              isProvince:false,
              city:{
                  text:null,
                  code:""
              },
              provinces_code:"",
              province_code:"",
              provincescode:0,
              isSame:true,
              provinceLists:provinceList.province.item,
              cityLsits:cityList.city.item,
              itemlist:[],
              selectCitys:true,
              county:null,
              content:{
                  province:"",
                  city:"",
                  county:""
              }
			}
		},
		mounted(){
		  console.log(this.provinceLists)
		},
        beforeDestory(){
            
        },
        created(){
             let code =utils.cache.get('personsal').orgId
             let orgcode = code.slice(0,4)
             this.province = this.getOrgProvince(orgcode)
             this.province_code = this.getOrgProvinceCode(orgcode)
             this.provinces_code =this.province_code
        },
        methods:{
            handleClick(){
                if(this.province != null){
                    this.isSame = false
                }
               for(let i=0;i<this.cityLsits.length;i++){
                    this.province_code = this.province_code.substring(0,2)
                    var cityCode = this.cityLsits[i].code.substring(0,2)
                 if(this.province_code == cityCode){
                    this.itemlist.push(this.cityLsits[i])
                   }
               }
               this.isProvince = true
            },
            getProvinceText(){
               for(let i =0;i<this.provinceLists.length;i++){
                    if(this.province == this.provinceLists[i].code){
                        return this.provinceLists[i].text
                    }
                }
            },
            selectCity(item){
               this.city.text = item.text
               this.city.code = item.code
               this.selectCitys = false
            },
            selectClick(){ 
                // this.province = null
                if(this.county == null||this.county == ""){
                    this.$refs.btn.showMOdal("请选择所在地区的县或区")
                    return
                }
                if(this.county.length>20){
                    this.$refs.btn.showMOdal("输入的所在地区的县或区的内容长度不得超过20个字")
                    return
                }
              this.content.province = this.provinces_code
              this.content.city = this.city.code
              this.content.county = this.county
              if(this.value.selectNumber == 0){
                this.$emit("selectadress",this.content)
                 this.isSame = true
                 this.isProvince = false
                 this.city.text = null 
                 this.selectCitys = true
                 this.itemlist = []
              }else if(this.value.selectNumber == 1){
                this.$emit("selectPolicy",this.content)
                 this.isSame = true
                 this.isProvince = false
                 this.city.text = null 
                 this.selectCitys = true
                 this.itemlist = []
              }
            },
            cancel () {
                 this.isSame = true
                 this.isProvince = false
                 this.city.text = null 
                 this.selectCitys = true
                 this.itemlist = []
                this.$emit("cancel",this.value)
            },
            getOrgProvince(orgcode){
                let arr = null
               for(let i=0;i<orgProvince.province.item.length;i++){
                  if(orgcode == orgProvince.province.item[i].orgCode){
                      arr = orgProvince.province.item[i].proname
                      return arr
                  }
               }
               if(arr == null){
                    this.province_list = this.provinceLists
                    this.isSame = false
               }
            },
            getOrgProvinceCode(orgcode){
               for(let i=0;i<orgProvince.province.item.length;i++){
                  if(orgcode == orgProvince.province.item[i].orgCode){
                      return orgProvince.province.item[i].proCode
                  }
               }
            }
        },
        watch:{
           provinces(){
               this.province = this.getProvinceText(this.province)
           }
        }
	}
</script>
	
<style type="text/css" lang="scss" scoped>
.fa-angle-left {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 48px;
    text-align: center;
    font-size: 30px;
}
.select-title{
     height: 55px;
     line-height: 55px;
     margin-top:10px;
     text-align: center;
     background: #DDDDDD;
     color: #000000;
     font-size:24px; 
}
.select-province{
    margin-top:10px;
    text-align: center;
    height: 57px;
    line-height: 57px;
    border-top:1px solid #E5E5E5;  
    border-bottom:1px solid #E5E5E5;  
}
select{
    border:none; 
    color: #000000;
}
.list-item{
    height: 60px;
    line-height: 60px;
    border-bottom:1px solid #E4E4E4; 
    text-align: center;
    color:#4B4B4B;  
}
.select-city{
     height: 55px;
     line-height: 55px;
     margin-top:10px;
     text-align: center;
     background: #DDDDDD;
     color: #000000;
     font-size:24px; 
}
.mint-cell{
    height: 60px;
}
.btn-wrapper{
    position: relative;
    left: 35%;
    top:20px;
    bottom: 0; 
    width:120px;
    height: 40px;
    margin-bottom:20px;
    text-align: center;
    line-height: 40px;
    border-radius:5px;
    color: #ffffff; 
    background:#FFAC00;
}
.content{
  width: 100%;
  overflow-y: auto;
  position: absolute;
  left: 0;right: 0;top: 48px;
  background: #F5F5F5;
}
.main-contents{
    background-color: #ffffff!important;
}
.select-province_list{
    text-align: center;
    line-height: 57px;
    height: 57px;
    border-top: 1px solid #E5E5E5;
}
</style>