<template>
	<div class="videoUpload-content">
	    <Headerbtns :title="'影像资料上传'">
		  	<!-- <router-link to="/" replace slot="left" class="back">
		  		<i class="fa fa-angle-left"></i>
		  	</router-link> -->
		  	<i class="fa fa-angle-left back" slot="left" @click="back()"></i>
	    </Headerbtns>
	    <div class="videoContent">
	    	<!-- 投保人 -->
		 	<div class="applicante">
				 <ItemTitle title="投保人资料上传"></ItemTitle>
				 <div style="margin:0 5%;">
					 <div style="color: #000;margin-top: 5%;">请上传{{applicants.name}}{{applicants.idType}}证明材料:
					 </div>
					 <div class="videoData">
						<p v-for="(item,index) in applicants.imgs"  >
						<img  class="smallImage" :src="item.src" ref="smallImage"  @click="handleShow(index)">
                         <span class="remove-image" @click="removeImage(applicants.imgs,index)" v-if="item.open">X</span>
                         <span style="font-size:0">{{count}}</span>
						</p>
						<mt-popup position="center" class="phone_valid popup"
					   v-model="show"
					   style="width:70%;border:1px solid #eee;position: fixed;
                          background: #fff;top:80%;left: 50%;">
						<button class="photo" @click="getNewPhotos(index)">从相册选择</button>
						<hr>
						<button class="photo" @click="capturePhoto(index)">拍照</button>
					   </mt-popup>
						<p class="add" v-show="count>applicantscount" @click="handleShow(20)">
							<img src="../../../static/img/videoUpload/add.png">
						</p>
					 </div>
           <div v-if="app_again_up" @click="again_up(1010)" style="color: #f00;margin-top: 2%;margin-bottom: 2%;text-align: center;">重新上传</div>
				</div>
		 	</div>
		 	<!-- 被保人 -->
	 	 	<div class="recognizeee" v-show="showRecognizee">
	 		  <ItemTitle title="被保人资料上传"></ItemTitle>
			   <div style="margin:0 5%;">
				   <div v-for="(item,index) in relation" >
					<div>
						<div style="color: #000;margin-top: 5%;">请上传{{item.name}}{{item.idType | getCardItem}}证明材料:</div>
							<div class="videoData">
								<p v-for="(items,i) in item.imgs" >
									<img :src="items.src"  class="smallImages" @click="appliconhandleShow(i)">
									 <span class="remove-image" @click="removeRelationImages(relation,index,i,1)" v-if="items.open">X</span>
									<span style="font-size:0">{{relationCount}}</span>
								</p>
								 <mt-popup position="center" class="phone_valid popup"
					                  v-model="appliconShow"
					              style="width:70%;border:1px solid #eee;position: fixed;
                                     background: #fff;top:80%;left: 50%;">
						          <button class="photo" @click="getNewrecognizee(index,i)">从相册选择</button>
						             <hr>
						         <button class="photo" @click="recognizeePhoto(index,i)">拍照</button>
					            </mt-popup>
								<p class="add" v-show="item.checked"  @click="appliconhandleShow(20)">
									<img src="../../../static/img/videoUpload/add.png">
								</p>
							</div>
              <div v-if="ins_again_up" @click="again_up(1020)" style="color: #f00;margin-top: 2%;margin-bottom: 2%;text-align: center;">重新上传</div>
						</div>
					</div>
			   </div>
	 	 	</div>
	   		<!-- 受益人 -->
	    	<div class="favoreeDatae" v-show="showbeneficiary">
	    		<ItemTitle title="受益人资料上传"></ItemTitle>
				<div style="margin:0 5%;">
					<div  v-for="(item,index) in deathFavoree" 	>
						<div style="color: #000;margin-top: 5%;">请上传受益人{{item.bfcyName}}{{item.bfcyIdType}}证明材料:</div>
							<div class="videoData">
								<p v-for="(list,i) in item.imgs" >
									<img :src="list.src" :id='"lagdarImage-"+index+"-"+i' class="lagdarImage" @click="handledeathFavoreeshow('lagdarImage-'+index+'-'+i,index,i)">
									 <span class="remove-image" @click="removeRelationImages(deathFavoree,index,i,2)" v-if="list.open">X</span>
									<span style="font-size:0">{{beneficiaryCount}}</span>
								</p>
								<p class="add" v-show="item.checked"
									@click="handledeathFavoreeshow('',index,20)">
									<img src="../../../static/img/videoUpload/add.png">
								</p>
							</div>
              <div v-if="item.bnf_again_up" @click="again_up(1030+'_'+index)" style="color: #f00;margin-top: 2%;margin-bottom: 2%;text-align: center;">重新上传</div>
						</div>
				</div>
	    	</div>
			<mt-popup position="center" class="phone_valid popup"
			v-model="deathFavoreeshow"
			style="width:70%;border:1px solid #eee;position: fixed;
            background: #fff;top:80%;left: 50%;">
			<button class="photo" @click="getNewbeneficiary(index,i)">从相册选择</button>
			<hr>
			<button class="photo" @click="beneficiaryPhoto(index,i)">拍照</button>
			</mt-popup>
	    	<!-- 银行卡 -->
			<div class="cardDatae">
				<ItemTitle title="银行卡资料上传"></ItemTitle>
				<div  style="margin:0 5%;">
					<div style="color: #000;margin-top: 5%;">请上传银行卡的影像资料:</div>
					<div class="bankData">
						<p v-for="(item,index) in add3.imgs" >
							<img :src="item.src" class="smallImage"  @click="handleBankShow(index)">
							 <span class="remove-image" @click="removeImage(add3.imgs,index)" v-if="item.open">X</span>
						</p>
						<mt-popup position="center" class="phone_valid popup"
					      v-model="bankShow"
					    style="width:70%;border:1px solid #eee;position: fixed;
                          background: #fff;top:80%;left: 50%;">
						<button class="photo" @click="getNewbank(index)">从相册选择</button>
						<hr>
						<button class="photo" @click="bankPhoto(index)">拍照</button>
					   </mt-popup>
						<p class="add" v-show="bankCount>0" @click="handleBankShow(20)">
							<img src="../../../static/img/videoUpload/add.png">
						</p>
					</div>
				</div>
			</div>
	    </div>
		<Alert ref="btn"></Alert>
		<!-- 提交 -->
	      <div class="button-wrapper"  @click="request()">
		    	提&nbsp;&nbsp;&nbsp;交
		    </div>
	</div>
</template>
<script>
import Vue from "vue";
import { MessageBox } from "mint-ui";
import Headerbtns from "../common/Header.vue";
import ItemTitle from "../common/ItemTitle.vue";
import cardTypeList from "../../assets/dict/card_type_sunlife.json";
import index from "vue";
import Alert from "../policy/common/alert.vue";
export default {
  name: "videoUpload",
  components: { Headerbtns, MessageBox, ItemTitle, Alert},
  data() {
    return {
      app_again_up:false,
      ins_again_up:false,
      tempTotalImg:{
        'relation':'',
        'app':{
          'only':'',
          'max':'',
          'min':'',
          'imgs':[]
          },
        'ins':{
          'only':'',
          'max':'',
          'min':'',
          'imgs':[]
          },
        'bnfs':[]
      },
      obj1: {
        src: require("../../assets/icon_zj_zm.jpg"),
        open: false
      },
      obj2: {
        src: require("../../assets/icon_zj_fm.jpg"),
        open: false
      },
      bankShow: false,
      index: null,
      i: null,
      prohibit1: false,
      prohibit2: false,
      prohibit3: false,
      caromRecognizee: true,
      caromFavoreeData: true,
      caromBank: true,
      count: 0,
      deathFavoreeshow: false,
      show: false,
      appliconShow: false,
      recognizeeShow: false,
      recognizeeCount: 0,
      relationCount: 0,
      beneficiaryCount: 0,
      bankCount: 0,
      numbera:1010,
      numberb:1020,
      numberc:1030,
      numberd:1050,
      add: [],
      add1: [],
      add3: {
        imgs: []
      },
      // 关系
      contect: {
        self: "1",
        other: "2",
        mate: "3",
        gradSon: "4",
        gradGirl: "5",
        motherSon: "6",
        motherGirl: "7"
      },
      // 投保人
      applicant: {
        idCard: {
          type: "1",
          pages: "2",
          imgs: []
        },
        bankCard: {
          type: "2",
          pages: "4",
          imgs: []
        }
      },
      // 被保人
      recognizee: {
        idCard: {
          type: "1",
          pages: "2",
          imgs: []
        },
        bankCard: {
          type: "2",
          pages: "4",
          imgs: []
        }
      },
      // 受益人
      favoreeData: {
        idCard: {
          type: "1",
          pages: "2",
          imgs: []
        }
      },
      // 银行卡
      card: {
        bankCard: {
          type: "2",
          pages: "4",
          imgs: []
        }
      },
      //签字信息deathFavoree
      sign: "",
      relation: this.$route.params.relation,
      deathFavoree: this.$route.params.deathFavoree,
      applicants: this.$route.params.applicant,
      recognizees: this.$route.params.recognizee,
      planId: this.$route.params.planId,
      applyCode: this.$route.params.applyCode,
      saveName: this.$route.params.saveName,
      loadSign: true,
      relToApp: "",
      applicantlist: [],
      applicantlist_1: [],
      applicantlist_2: [],
      applicantlist_3: [],
      channel: utils.cache.get("personsal").channel,
      imageByte: this.$route.params.imageByte
    };
  },
  created() {
    this.getProduct();
    this.deathFavoree = this.getImage(this.deathFavoree);
    this.relation = this.getImageRelation(this.relation);
    Vue.set(this.applicants, "imgs", []);
    this.applicants = this.getImages(this.applicants);
    Vue.set(this.recognizee, "imgs", []);
    this.add3 = this.getImages(this.add3);
  },
  mounted() {
    if (this.contect.self == "1") {
      this.favoreeShow = true;
    }

    //接收投保书页面
    this.sign = JSON.parse(this.$route.params.signImgs);
    this.sign.applicant_signt = this.sign.applicant_signt.replace(
      "data:image/png;base64,",
      ""
    );
    this.sign.insure_signt = this.sign.insure_signt.replace(
      "data:image/png;base64,",
      ""
    );
    this.sign.agent_signt = this.sign.agent_signt.replace(
      "data:image/png;base64,",
      ""
    );
    this.sign.cecintent_signt = this.sign.cecintent_signt.replace(
      "data:image/png;base64,",
      ""
    );
    this.sign.counter_signt = this.sign.counter_signt.replace(
      "data:image/png;base64,",
      ""
    );
    console.log(this.applicants);
  },
  computed: {
    showRecognizee() {
      return this.relToApp == "00" ? false : true;
    },
    showbeneficiary() {
      if (this.deathFavoree.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    applicantscount() {
      if (
        this.applicants.idType == "身份证" ||
        this.applicants.idType == "中国护照"
      ) {
        return 1;
      } else {
        return 0;
      }
    }
  },
  filters: {
    getCardItem(code) {
      if (code != undefined && code != "") {
        if (cardTypeList != undefined && cardTypeList != "") {
          for (var i = 0; i < cardTypeList.dict_cardtype.item.length; i++) {
            if (cardTypeList.dict_cardtype.item[i].code == code) {
              return cardTypeList.dict_cardtype.item[i].text;
            }
          }
        }
      }
    }
  },
  methods: {
    //识别是否后重新上传
    again_up(index){
      console.log(index)
      if(index == '1010'){
        this.newUpload('',1010,this.tempTotalImg.app.imgs)
      }else if(index == '1020'){
        this.newUpload('',1020,this.tempTotalImg.ins.imgs)
      }else if(index.indexOf('1030')>-1){
        if(this.tempTotalImg.bnfs.length>0){
          for(let i=0;i<this.tempTotalImg.bnfs.length;i++){
            if(this.tempTotalImg.bnfs[i].index-1 == index.split('_')[1]){
              this.newUpload('',1030+'_'+index.split('_')[1],this.tempTotalImg.bnfs[i].imgs)
            }
          }
        }
      }
    },
    //拆分受益人数据数组
    splitBnfData(){
      let tempBnfs = []
        if (this.deathFavoree.length > 0 && this.applicantlist_3.length > 0) {
          let tempBnf = {}
          for (let i = 0; i < this.applicantlist_3.length; i++) {
            let item = this.applicantlist_3[i];
            let index = item.imageName.split('-')[1]
            let name = item.imageName
            let path = item.reaPath
            if(tempBnfs.length>0){
              let isHave = false
              for(var j=0;j<tempBnfs.length;j++){
                if(tempBnfs[j].index == index){
                  tempBnfs[j].images.push({'name':name,'path':path})
                  isHave = true
                }
              }
              if(!isHave){
                tempBnfs.push({'index':index,'images':[{'name':name,'path':path}]})
              }
            }else{
              tempBnfs.push({'index':index,'images':[{'name':name,'path':path}]})
            }
          }
          var compare = function (obj1, obj2) {
              var val1 = obj1.index;
              var val2 = obj2.index;
              if (val1 < val2) {
                  return -1;
              } else if (val1 > val2) {
                  return 1;
              } else {
                  return 0;
              }
            }
          return tempBnfs.sort(compare)
        }
    },
    //v1:docu 需失败时置空图片使用
    //v2:上传所用的imagetype
    //v3:image图片集合
    newUpload(docImages,context_id,images){
      let imageList = []
      if(images != undefined && images.length > 0){
        for(var i=0;i<images.length;i++){
          if(images[i]!=undefined && images[i]!=""){
            images[i] = images[i].replace("data:image/png;base64,","");
            images[i] = images[i].replace("data:image/jpeg;base64,","");
            imageList.push({
              	"imageType":context_id,
							  "imageName":"证件照",
							  "imageByte":images[i]
            })
          }
        }
      }
      if(imageList!=undefined && imageList.length>0){
        let requ = {
	  				"upload": {
	  					"agentCode":"",
	  					"applyCode":this.$route.params.applyCode,
	  					"orderId":this.$route.params.planId,
	  					"policyCode":"",
						"deviceNo":"",
						"imageList":imageList
	        }
				}
        if(requ.upload.imageList[0].imageByte!=undefined && requ.upload.imageList[0].imageByte!=""){
          utils.http.postFast('MOUPLOAD',requ,(body)=>{
            if(body.resultMessage == "上传影像成功！"){
              console.log('带出影像上传成功 ===> '+context_id)
              if(context_id == '1010'){
                this.app_again_up = false
              }else if(context_id == '1020'){
                this.ins_again_up = false
              }else if(context_id.indexOf('1030')>-1){
                let index = context_id.split('_')[1]
                for(let i=0;i<this.deathFavoree.length;i++){
                  if(this.deathFavoree[i].bfcyLevelNum-1 == index){
                    let temp = this.deathFavoree[i]
                    temp.bnf_again_up = false
                    this.deathFavoree.splice(i,1,temp)
                  }
                }
              }
            }else{
              if(context_id == '1010'){
                this.app_again_up = true
              }else if(context_id == '1020'){
                this.ins_again_up = true
              }else if(context_id.indexOf('1030')>-1){
                let index = context_id.split('_')[1]
                for(let i=0;i<this.deathFavoree.length;i++){
                  if(this.deathFavoree[i].bfcyLevelNum-1 == index){
                    console.log('受益人失败'+index+'-'+this.deathFavoree[i].bfcyLevelNum)
                    let temp = this.deathFavoree[i]
                    temp.bnf_again_up = true
                    this.deathFavoree.splice(i,1,temp)
                  }
                }
              }
            }
          }
        )}
      }
    },
    showAlert(msg) {
      this.$refs.btn.showMOdal(msg);
    },
    //删除被保人和受益人的方法
    removeRelationImages(arr, index, i, number) {
      console.log(arr[index]);
      if (window.confirm("您确定要删除此照片吗?")) {
        arr[index].imgs.splice(i, 1);
        if (number == 1) {
          this.relationCount--;
        } else {
          this.beneficiaryCount--;
        }
      }
    },
    //删除投保人影像和银行卡影像的方法
    removeImage(arr, index) {
      if (window.confirm("您确定要删除此照片吗?")) {
        arr.splice(index, 1);
      }
    },
    //投保人本地相册上传
    getNewPhotos(index) {
      this.show = false;
      getNewPhoto(
        pictureSource.SAVEDPHOTOALBUM,
        imageData => {
          let count = this.count;
          if (count === 0) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            this.applicants.imgs[index] = {};
            this.applicants.imgs[index].src = imageUrl;
            this.applicants.imgs[index].open = true;
            this.count++;
            this.addItem(imageUrl);
          } else if (count == 1) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.index == 20) {
              this.addNextImage(imageUrl);
            } else {
              this.applicants.imgs[index] = {};
              this.applicants.imgs[index].open = true;
              this.applicants.imgs[index].src = imageUrl;
              this.count++;
            }
            this.count++;
            this.addItem(imageUrl);
          } else if (count > 1) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.index == 20) {
              this.addNextImage(imageUrl);
            } else {
              this.applicants.imgs[index] = {};
              this.applicants.imgs[index].open = true;
              this.applicants.imgs[index].src = imageUrl;
              this.addItem(imageUrl);
            }
            this.count++;
          }
        },
        message => {
          // alert(message)
        }
      );
    },
    //被保人本地相册上传
    getNewrecognizee(index, i) {
      this.appliconShow = false;
      getNewPhoto(
        pictureSource.SAVEDPHOTOALBUM,
        imageData => {
          let count = this.relation[index].count;
          if (count == 0) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            this.relation[index].imgs[i] = {};
            this.relation[index].imgs[i].src = imageUrl;
            this.relation[index].imgs[i].open = true;
            this.relation[index].count++;
            this.relationCount++;
            this.addItem1(imageUrl);
          } else if (count == 1) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            this.relation[index].count++;
            this.relationCount++;
            if (this.relation[index].imgs[i] == undefined) {
              this.addNextImage1(index, imageUrl);
            } else {
              this.relation[index].imgs[i] = {};
              this.relation[index].imgs[i].src = imageUrl;
              this.relation[index].imgs[i].open = true;
            }
            this.addItem1(imageUrl);
          } else if (count > 1) {
            this.relationCount++;
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.relation[index].imgs[i] == undefined) {
              this.addNextImage1(index, imageUrl);
            } else {
              this.relation[index].imgs[i] = {};
              this.relation[index].imgs[i].src = imageUrl;
              this.relation[index].imgs[i].open = true;
              this.addItem1(imageUrl);
            }
          }
          if (
            this.relation[index].idType == "11" ||
            this.relation[index].idType == "17"
          ) {
            if (count == 1) {
              this.relation[index].checked = true;
            }
          } else {
            if (count == 0) {
              this.relation[index].checked = true;
            }
          }
        },
        message => {
          // alert(message)
        }
      );
    },
    //受益人本地相册上传
    getNewbeneficiary(index, i) {
      this.deathFavoreeshow = false;
      getNewPhoto(
        pictureSource.SAVEDPHOTOALBUM,
        imageData => {
          let count = this.deathFavoree[index].count;
          if (count === 0) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            this.deathFavoree[index].imgs[i] = {};
            this.deathFavoree[index].imgs[i].src = imageUrl;
            this.deathFavoree[index].imgs[i].open = true;
            this.beneficiaryCount++;
            this.deathFavoree[index].count++;
            this.addItem2(imageUrl);
          } else if (count === 1) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.deathFavoree[index].imgs[i] == undefined) {
              this.addNextImage2(index, imageUrl);
            } else {
              this.deathFavoree[index].imgs[i] = {};
              this.deathFavoree[index].imgs[i].open = true;
              this.deathFavoree[index].imgs[i].src = imageUrl;
            }
            this.beneficiaryCount++;
            this.deathFavoree[index].count++;
            this.addItem2(imageUrl);
          } else if (count > 1) {
            this.beneficiaryCount++;
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.deathFavoree[index].imgs[i] == undefined) {
              this.addNextImage2(index, imageUrl);
            } else {
              this.deathFavoree[index].imgs[i] = {};
              this.deathFavoree[index].imgs[i].open = true;
              this.deathFavoree[index].imgs[i].src = imageUrl;
              this.addItem2(imageUrl);
            }
          }
          if (
            this.deathFavoree[index].bfcyIdType == "身份证" ||
            this.deathFavoree[index].bfcyIdType == "中国护照"
          ) {
            if (count == 1) {
              this.deathFavoree[index].checked = true;
            }
          } else {
            if (count == 0) {
              this.deathFavoree[index].checked = true;
            }
          }
        },
        message => {
          // alert(message)
        }
      );
    },
    //银行卡本地相册
    getNewbank(index) {
      this.bankShow = false;
      getNewPhoto(
        pictureSource.SAVEDPHOTOALBUM,
        imageData => {
          let count = this.bankCount;
          if (count === 0) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            this.add3.imgs[index] = {};
            this.add3.imgs[index].src = imageUrl;
            this.add3.imgs[index].open = true;
            this.bankCount++;
            this.addItem3(imageUrl);
          } else {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.index == 20) {
              this.addNextImage3(imageUrl);
            } else {
              this.add3.imgs[index] = {};
              this.add3.imgs[index].open = true;
              this.add3.imgs[index].src = imageUrl;
              this.addItem3(imageUrl);
            }
          }
        },
        message => {
          // alert(message)
        }
      );
    },
    handleShow(index) {
      if (this.prohibit1 == true) {
        return;
      }
      this.show = true;
      this.index = index;
    },
    appliconhandleShow(i) {
      if (this.prohibit2 == true) {
        return;
      }
      this.i = i;
      this.appliconShow = true;
    },
    handledeathFavoreeshow(index, i) {
      // if (this.prohibit3 == true) {
      //   return;
      // }
      this.i = i;
      this.index = index;
      this.deathFavoreeshow = true;
    },
    handledeathFavoreeshow(docuId,index, i) {
      console.log(docuId+"-"+index +"-"+i)
      for (let i = 0; i < this.applicantlist_3.length; i++) {
          let item = this.applicantlist_3[i];
          // 分割后数组 0下标:客户类别(3为受益人) 1下标:受益人位置(1开始) 2下标:正反面标识 
          console.log(item.imageName.split('-')[1])
          let tempId = ""
          //正面为0 反面为1
          if(item.imageName.split('-')[2] == "Front"){
            tempId = "lagdarImage-" + (item.imageName.split('-')[1]-1)+"-"+0
          }else if(item.imageName.split('-')[2] == "Back"){
            tempId = "lagdarImage-" + (item.imageName.split('-')[1]-1)+"-"+1
          }
          if(tempId == docuId){
            return
          }
      }
      this.i = i;
      this.index = index;
      this.deathFavoreeshow = true;
    },
    handleBankShow(index) {
      this.index = index;
      this.bankShow = true;
    },
    back() {
      if (this.channel == "13" || this.channel == "02") {
        this.$router.push({
          name: "ElectronicsYinBaoPolicyPage",
          params: {
            // planId: this.$route.params.planId,
            // applyCode:policy.applyCode
            loadSign: this.loadSign
          }
        });
      } else {
        this.$router.push({
          name: "electronics_policy_page",
          params: {
            // planId: this.$route.params.planId,
            // applyCode:policy.applyCode
            loadSign: this.loadSign
          }
        });
      }
    },
    //保单信息
    getProduct() {
      let requ = {
        policy: {
          substepNo: "",
          orderCode: this.$route.params.planId
        }
      };
      utils.http.postFast("MOHQPOLICYMSG", requ, body => {
        let policy = body.policy;
        console.log("保单详情的内容为...................", policy);
        this.relToApp = policy.custInfo.insurants.insurant[0].relToApp;
        //初始化配置文件记录图片数量限制等
        if(policy.custInfo.appnt.idType == '11' 
            || policy.custInfo.appnt.idType == '17'){
          this.tempTotalImg.app.only = '2'
          this.tempTotalImg.app.max = '2'
          this.tempTotalImg.app.min = '2'
        }else{
          this.tempTotalImg.app.only = '0'
          this.tempTotalImg.app.max = '0'
          this.tempTotalImg.app.min = '1'
        }
        if(policy.custInfo.insurants.insurant[0].idType == '11' 
            || policy.custInfo.insurants.insurant[0].idType == '17'){
          this.tempTotalImg.relation = policy.custInfo.insurants.insurant[0].relToApp;
          this.tempTotalImg.app.only = '2'
          this.tempTotalImg.app.max = '2'
          this.tempTotalImg.app.min = '2'
        }else{
          this.tempTotalImg.app.only = '0'
          this.tempTotalImg.app.max = '0'
          this.tempTotalImg.app.min = '1'
        }
        if(policy.custInfo.bnfInfo!=undefined 
            && policy.custInfo.bnfInfo.beneficiaries!=undefined 
            && policy.custInfo.bnfInfo.beneficiaries.beneficiary !=undefined
            && policy.custInfo.bnfInfo.beneficiaries.beneficiary.length>0){
            for(let i=0;i<policy.custInfo.bnfInfo.beneficiaries.beneficiary.length;i++){
              let beneficiary = policy.custInfo.bnfInfo.beneficiaries.beneficiary[i]
              if(beneficiary.bfcyIdType == '11' || beneficiary.bfcyIdType == '17'){
                this.tempTotalImg.bnfs.push({
                  'index' : beneficiary.bfcyLevelNum,
                  'only' : '2',
                  'max' : '2',
                  'min' : '2',
                  'imgs' : []
                })
              }else{
                this.tempTotalImg.bnfs.push({
                  'index' : beneficiary.bfcyLevelNum,
                  'only' : '0',
                  'max' : '0',
                  'min' : '1',
                  'imgs' : []
                })
              }
               
            }
        }
        console.log('===应校验数据===>',this.tempTotalImg)
        this.applicantlist = policy.custInfo.idCards;
        if (this.applicantlist.length > 0) {
          this.applicantlist.forEach(item => {
            let urlType = item.imageName.slice(0, 1);
            let Front = item.imageName.indexOf("Front");
            let Back = item.imageName.indexOf("Back");
            if (urlType == 1 && (Front != -1 || Back != -1)) {
              this.applicantlist_1.push(item);
            } else if (urlType == 2 && (Front != -1 || Back != -1)) {
              //如果当前投被保人关系为本人,被保人影像存在,赋将被保人中的影像值到投保人中
              if(this.relToApp == '00'){
                this.applicantlist_1.push(item);
              }else{
                this.applicantlist_2.push(item);
              }
            } else if (urlType == 3 && (Front != -1 || Back != -1)) {
              this.applicantlist_3.push(item);
            }
          });
          if (this.applicantlist_1.length > 1) {
            this.prohibit1 = true;
            let image = document.getElementsByClassName("smallImage")[0];
            image.setAttribute("crossOrigin", "anonymous");
            image.src = "";
            image.src = this.applicantlist_1[0].reaPath;
            let that = this;
            let img_app_1 = ''
            image.onload = function() {
              var data = that.getBase64Image(image);
              that.applicant.idCard.imgs.push(data);
              img_app_1 = data
            };
            let images = document.getElementsByClassName("smallImage")[1];
            images.setAttribute("crossOrigin", "anonymous");
            images.src = "";
            images.src = this.applicantlist_1[1].reaPath;
            let img_app_2 = ''
            images.onload = function() {
              var data = that.getBase64Image(images);
              that.applicant.idCard.imgs.push(data);
              img_app_2 = data
            };
            //赋值完成上传投保人识别影像
            setTimeout(
              ()=>{
                //缓存投保人照片
                this.tempTotalImg.app.imgs.push(img_app_1)
                this.tempTotalImg.app.imgs.push(img_app_2)
                this.newUpload([image,images],1010,[img_app_1,img_app_2])
              }
            ,1000)
          }
          if (this.applicantlist_2.length > 1) {
            this.prohibit2 = true;
            let image = document.getElementsByClassName("smallImages")[0];
            image.setAttribute("crossOrigin", "anonymous");
            image.src = "";
            image.src = this.applicantlist_2[0].reaPath;
            let that = this;
            let img_ins_1 = ''
            image.onload = function() {
              var data = that.getBase64Image(image);
              that.recognizee.idCard.imgs.unshift(data);
              img_ins_1 = data
            };
            let images = document.getElementsByClassName("smallImages")[1];
            images.setAttribute("crossOrigin", "anonymous");
            images.src = "";
            images.src = this.applicantlist_2[1].reaPath;
            let img_ins_2 = ''
            images.onload = function() {
              var data = that.getBase64Image(images);
              that.recognizee.idCard.imgs.unshift(data);
              img_ins_2 = data
            };
            //赋值完成上传被保人识别影像
            setTimeout(
              ()=>{
                //缓存被保人照片
                this.tempTotalImg.ins.imgs.push(img_ins_1)
                this.tempTotalImg.ins.imgs.push(img_ins_2)
                this.newUpload([image,images],1020,[img_ins_1,img_ins_2])
              }
            ,1000)
          }
          if(this.splitBnfData().length>0){
            for(let i=0;i<this.splitBnfData().length;i++){
              let images = this.splitBnfData()[i].images
              //存放当前受益人的iamge视图
              let tempDocu = []
              //存放当前受益人的图片资源
              let tempImages = []
              for(let j=0;j<images.length;j++){
                console.log(images[j].name.split('-')[1])
                let tempId = ""
                //正面为0 反面为1
                if(images[j].name.split('-')[2] == "Front"){
                  tempId = "lagdarImage-" + (images[j].name.split('-')[1]-1)+"-"+0
                }else if(images[j].name.split('-')[2] == "Back"){
                  tempId = "lagdarImage-" + (images[j].name.split('-')[1]-1)+"-"+1
                }
                console.log(tempId)
                let image = document.getElementById(tempId)
                image.setAttribute("crossOrigin", "anonymous");
                image.src = "";
                image.src = images[j].path;
                let that = this;
                image.onload = function() {
                  let data = that.getBase64Image(image);
                  that.recognizee.idCard.imgs.unshift(data);
                  tempImages.push(data)
                  tempDocu.push(image)
                };
              }
              //当前受益人赋值完成上传当前受益人识别影像
              setTimeout(
                ()=>{
                  //缓存受益人图片
                  for(let j=0;j<this.tempTotalImg.bnfs.length;j++){
                    if(this.tempTotalImg.bnfs[j].index-1 == i){
                      for(let k=0;k<tempImages.length;k++){
                        this.tempTotalImg.bnfs[j].imgs.push(tempImages[k])
                      }
                    }
                  }
                  this.newUpload(tempDocu,1030+"_"+i,tempImages)
                }
              ,1000)
            }
          }
        }
      });
    },
    getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL;
    },
    toPay(policy) {
      //核保成功后跳转至支付页面进行支付
      this.$router.push({
        path: "/backlog/Pay.vue",
        name: "pay",
        params: {
          orderId: this.$route.params.planId,
          applyCode: this.$route.params.applyCode,
          agentCode: utils.cache.get("personsal").agentCode,
          //此节点在获取保单信息后处理
          holderName: "张三",
          idCard: "6666888899990000"
        }
      });
    },
    //受益人添加图片属性
    getImage(list) {
      if (list.length > 0) {
        list.map((item, index) => {
          if (item.bfcyIdType == "身份证" || item.bfcyIdType == "中国护照") {
            item.checked = false;
            item.count = 0;
            item.imgs = [];
            item.imgs.push(this.obj1);
            item.imgs.push(this.obj2);
          } else {
            item.count = 0;
            item.checked = false;
            item.imgs = [];
            item.imgs.push(this.obj1);
          }
        });
      }
      return list;
    },
    getImageRelation(list) {
      if (list.length > 0) {
        list.map((item, index) => {
          if (item.idType == "11" || item.idType == "17") {
            item.checked = false;
            item.count = 0;
            item.imgs = [];
            item.imgs.push(this.obj1);
            item.imgs.push(this.obj2);
          } else {
            item.count = 0;
            item.checked = false;
            item.imgs = [];
            item.imgs.push(this.obj1);
          }
        });
      }
      return list;
    },
    //投保人添加图片属性显示并显示上传图片的弹框
    getImages(list) {
      if (list !== undefined) {
        list.imgs = [];
        if (list.idType == "身份证" || list.idType == "中国护照") {
          list.imgs.push(this.obj1);
          list.imgs.push(this.obj2);
        } else {
          list.imgs.push(this.obj1);
        }
      }
      return list;
    },
    //进行核保请求
    underwriting() {
      let requ = {
        policy: {
          agentCode: utils.cache.get("personsal").agentCode,
          activityid: "0",
          orderCode: this.$route.params.planId,
          applyCode: this.$route.params.applyCode,
          applicant_signt: this.sign.applicant_signt,
          insure_signt: this.sign.insure_signt,
          agent_signt: this.sign.agent_signt,
          checker_signt: this.sign.checker_signt,
          cecintent_signt: this.sign.cecintent_signt,
          counter_signt: this.sign.counter_signt,
          dzType: this.$route.params.document.dzType,
          dzInfo: this.$route.params.document.dzInfo,
          docTypeInfo: this.$route.params.document.docTypeInfo
        }
      };
      utils.http.postFast("MOUNDERWRITE", requ, body => {
        let policy = body.policy;
        if (policy.resultCode == "0") {
          //正常投保
          this.toPay(policy);
        } else if (policy.resultCode == "1" && policy.status == "0") {
          //进人核
          this.$router.push({ name: "humanNucleus" });
        } else if (policy.resultCode == "100") {
          //100为问题件,直接提示用户
          let this1 = this;
          MessageBox.alert("该问题件已成功提交,请到待办事项查看处理!").then(
            () => {
              this1.$router.push("/home");
            }
          );
        } else {
          MessageBox({
            title: "提示",
            message:
              "投保单号:" +
              policy.applyCode +
              "\n" +
              "保单状态:" +
              policy.status +
              "\n" +
              "错误原因:" +
              policy.resultMessage
          });
        }
      });
    },
    //发送请求
    request() {
      if(this.app_again_up == true){
        this.showAlert('投保人存在影像上传失败,请重新上传!')
        return
      }
      if(this.ins_again_up == true){
        this.showAlert('被保险人存在影像上传失败,请重新上传!')
        return
      }
      for(let i=0;i<this.deathFavoree.length;i++){
        if(this.deathFavoree[i].bnf_again_up == true){
          this.showAlert('受益人人存在影像上传失败,请重新上传!')
          return
        }
      }
      //如果投保人与被保人是本人
      if (
        this.relation[0].relToApp == "本人" &&
        this.deathFavoree.length == 0
      ) {
        //验证投保人影像
        let result = this.testIdtype(
          this.applicants,
          this.applicant.idCard.imgs
        );
        if (!result) {
          return;
        }
        //验证银行卡影像
        let result2 = this.testBank(this.card.bankCard.imgs);
        if (result && result2) {
          this.next();
        }
      } else if (this.relation[0].relToApp == "本人") {
        //验证投保人影像
        let result = this.testIdtype(
          this.applicants,
          this.applicant.idCard.imgs
        );
        if (!result) {
          return;
        }
        //验证受益人影像
        let result1 = this.testdeathFavoree(this.deathFavoree);
        if (!result1) {
          return;
        }
        //验证银行卡影像
        let result2 = this.testBank(this.card.bankCard.imgs);
        if (result && result1 && result2) {
           this.next();
        }
      } else if (this.deathFavoree.length === 0) {
        //验证投保人上传影像
        let result1 = this.testIdtype(
          this.applicants,
          this.applicant.idCard.imgs
        );
        if (!result1) {
          return;
        }
        //验证被保人上传影像
        let result2 = this.testrelation(this.relation);
        if (!result2) {
          return;
        }
        //验证银行卡信息
        let result3 = this.testBank(this.card.bankCard.imgs);
        if (result1 && result2 && result3) {
           this.next();
        }
      } else {
        //验证投保人上传影像
        let result = this.testIdtype(
          this.applicants,
          this.applicant.idCard.imgs
        );
        if (!result) {
          return;
        }
        //验证被保人上传影像
        let result1 = this.testrelation(this.relation);
        if (!result1) {
          return;
        }
        //验证受益人上传影像
        let result2 = this.testdeathFavoree(this.deathFavoree);
        if (!result2) {
          return;
        }
        //验证银行卡信息
        let result3 = this.testBank(this.card.bankCard.imgs);
        if (result && result1 && result2 && result3) {
           this.next();
        }
    }
	},
	//处理影像件数据变成服务器需要的格式
    filtersData(type,data) {
       console.log(this.mumbera)
		let imageList = []
      if (this.applicant.idCard.imgs.length > 0 && type =="1") {
          data = data.replace("data:image/png;base64,","");
          data = data.replace("data:image/jpeg;base64,","");
          let item = {};
         
          item.imageType = this.numbera;
          this.numbera++
          item.imageName = "投保人证件照";
          item.imageByte = data;
          imageList.push(item);
      }
      //被保人证件影像
      if (this.recognizee.idCard.imgs.length > 0&& type =="2") {
         data = data.replace("data:image/png;base64,","");
         data = data.replace("data:image/jpeg;base64,","");
          let item = {};
          item.imageType = this.numberb;
          this.numberb++
          item.imageName = "被保人证件照";
          item.imageByte = data;
          imageList.push(item);
      }
      //受益人影像
      if (this.favoreeData.idCard.imgs.length > 0&& type =="3") {
          data = data.replace("data:image/png;base64,", "");
          data = data.replace("data:image/jpeg;base64,", "");
          // 受益人证件影像
          let item = {};
          item.imageType = this.numberc;
          this.numberc++
          item.imageName = "受益人证件照";
          item.imageByte = data;
          imageList.push(item);
      }
      //银行卡影像  this.card.bankCard.imgs
      if (this.card.bankCard.imgs.length > 0&& type =="4") {
          data= data.replace("data:image/png;base64,", "");
          data = data.replace("data:image/jpeg;base64,", "");
          let item = {};
          item.imageType = this.numberd;
          this.numberd++
          item.imageName = "银行卡证件照";
          item.imageByte = data;
          imageList.push(item)
      }
	   return  imageList
    },
    getUpload(type,data) {
      let imageList = [];
      //投保人证件影像
     imageList = this.filtersData(type,data)
	   let requ = {
        upload: {
          agentCode: utils.cache.get("agentCode"),
          applyCode: this.applyCode,
          deviceNo: null,
          imageList: imageList,
          orderId: this.planId,
          policyCode: null
        }
      };
      utils.http
        .post("MOUPLOAD", requ)
        .then(response => {
          let personsal = response.data.response.personsal;
          if (response.data.header.responseCode == "0") {
            //影像件上传成功后进行核保调用
            console.log(response.data.response.resultMessage)
          } else if (response.data.header.responseCode != "0") {
            this.showAlert("提交失败,请重新提交!");
          }
        })
        .catch(error => {
          alert(message);
        });
    },
    next(){
       let imageList = [];
     //人脸识别影像
      if (this.imageByte != undefined && this.imageByte != "") {
        imageList.push(this.imageByte);
       }
        this.underwriting();
    },
    //投保人信息上传
    capturePhoto(index) {
      this.show = false;
      capturePhotoCallback(
        imageData => {
          let count = this.count;
          if (count === 0) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            this.applicants.imgs[index] = {};
            this.applicants.imgs[index].src = imageUrl;
            this.applicants.imgs[index].open = true;
            this.count++;
            this.addItem(imageUrl);
          } else if (count == 1) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.index == 20) {
              this.addNextImage(imageUrl);
            } else {
              this.applicants.imgs[index] = {};
              this.applicants.imgs[index].open = true;
              this.applicants.imgs[index].src = imageUrl;
            }
            this.count++
            this.addItem(imageUrl);
          } else if (count > 1) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.index == 20) {
              this.addNextImage(imageUrl);
            } else {
              this.applicants.imgs[index] = {};
              this.applicants.imgs[index].open = true;
              this.applicants.imgs[index].src = imageUrl;
               this.addItem(imageUrl);
            }
             this.count++;
          }
        },
        message => {
          // alert(message)
        }
      );
    },
    //被保人资料上传
    recognizeePhoto(index, i) {
      this.appliconShow = false;
      capturePhotoCallback(
        imageData => {
          let count = this.relation[index].count;
          if (count == 0) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            this.relation[index].imgs[i] = {};
            this.relation[index].imgs[i].src = imageUrl;
            this.relation[index].imgs[i].open = true;
            this.relation[index].checked = true;
            this.relation[index].count++;
            this.relationCount++;
            this.addItem1(imageUrl);
          } else if (count == 1) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            this.relation[index].count++;
            this.relationCount++;
            if (this.relation[index].imgs[i] == undefined) {
              this.addNextImage1(index, imageUrl);
            } else {
              this.relation[index].imgs[i] = {};
              this.relation[index].imgs[i].src = imageUrl;
              this.relation[index].imgs[i].open = true;
            }
            this.addItem1(imageUrl);
          } else if (count > 1) {
            this.relationCount++;
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.relation[index].imgs[i] == undefined) {
              this.addNextImage1(index, imageUrl);
            } else {
              this.relation[index].imgs[i] = {};
              this.relation[index].imgs[i].open = true;
              this.relation[index].imgs[i].src = imageUrl;
               this.addItem1(imageUrl);
            }
          }
          if (
            this.relation[index].idType == "11" ||
            this.relation[index].idType == "17"
          ) {
            if (count == 1) {
              this.relation[index].checked = true;
            }
          } else {
            if (count == 0) {
              this.relation[index].checked = true;
            }
          }
        },
        message => {
          // alert(message)
        }
      );
    },
    addItem(item) {
      this.applicant.idCard.imgs.push(item);
      this.getUpload("1",item)
      this.count++
    },
    addNextImage(data) {
      let arr = {};
      arr.src = data;
      arr.open = true;
      this.applicants.imgs.push(arr);
      this.applicant.idCard.imgs.unshift(data);
      this.getUpload("1",data)
    },
    addItem1(item) {
      this.recognizee.idCard.imgs.unshift(item);
      this.getUpload("2",item)
    },
    addNextImage1(index, data) {
      let arr = {};
      arr.src = data;
      arr.open = true;
      this.relation[index].imgs.push(arr);
      this.recognizee.idCard.imgs.unshift(data);
      this.getUpload("2",data)
    },
    //受益人信息上传
    beneficiaryPhoto(index, i) {
      this.deathFavoreeshow = false;
      capturePhotoCallback(
        imageData => {
          let count = this.deathFavoree[index].count;
          if (count === 0) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            this.deathFavoree[index].imgs[i] = {};
            this.deathFavoree[index].imgs[i].src = imageUrl;
            this.deathFavoree[index].imgs[i].open = true;
            this.beneficiaryCount++;
            this.deathFavoree[index].count++;
            this.addItem2(imageUrl);
          } else if (count === 1) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.deathFavoree[index].imgs[i] == undefined) {
              this.addNextImage2(index, imageUrl);
            } else {
              this.deathFavoree[index].imgs[i] = {};
              this.deathFavoree[index].imgs[i].open = true;
              this.deathFavoree[index].imgs[i].src = imageUrl;
            }
            this.beneficiaryCount++;
            this.deathFavoree[index].count++;
            this.addItem2(imageUrl);
          } else if (count > 1) {
            this.beneficiaryCount++;
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.deathFavoree[index].imgs[i] == undefined) {
              this.addNextImage2(index, imageUrl);
            } else {
              this.deathFavoree[index].imgs[i] = {};
              this.deathFavoree[index].imgs[i].open = true;
              this.deathFavoree[index].imgs[i].src = imageUrl;
              this.addItem2(imageUrl);
            }
          }
          if (
            this.deathFavoree[index].bfcyIdType == "身份证" ||
            this.deathFavoree[index].bfcyIdType == "中国护照"
          ) {
            if (count == 1) {
              this.deathFavoree[index].checked = true;
            }
          } else {
            if (count == 0) {
              this.deathFavoree[index].checked = true;
            }
          }
        },
        message => {
          // alert(message)
        }
      );
    },
    addItem2(item) {
      let arr = {};
      arr.src = item;
      this.favoreeData.idCard.imgs.unshift(item);
      this.getUpload("3",item)
    },
    addNextImage2(index, data) {
      this.beneficiaryCount++;
      let arr = {};
      arr.src = data;
      arr.open = true;
      this.deathFavoree[index].imgs.push(arr);
      this.favoreeData.idCard.imgs.unshift(data);
      this.getUpload("3",data)
    },
    //银行卡上传
    bankPhoto(index) {
      this.bankShow = false;
      capturePhotoCallback(
        imageData => {
          let count = this.bankCount;
          if (count === 0) {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            this.add3.imgs[index] = {};
            this.add3.imgs[index].src = imageUrl;
            this.add3.imgs[index].open = true;
            this.bankCount++;
            this.addItem3(imageUrl);
          } else {
            let imageUrl = "data:image/jpeg;base64," + imageData;
            if (this.index == 20) {
              this.addNextImage3(imageUrl);
            } else {
              this.add3.imgs[index] = {};
              this.add3.imgs[index].open = true;
              this.add3.imgs[index].src = imageUrl;
              this.addItem3(imageUrl);
            }
          }
        },
        message => {
          // alert(message)
        }
      );
    },
    addItem3(item) {
      this.card.bankCard.imgs.unshift(item);
       this.getUpload("4",item)
    },
    addNextImage3(data) {
      let arr = {};
      arr.src = data;
      arr.open = true;
      this.add3.imgs.push(arr);
      this.card.bankCard.imgs.unshift(data);
       this.getUpload("4",data)
    },
    //投保人上传图片验证
    testIdtype(mumber, idImg) {
      if (idImg.length > 0) {
        if (
          mumber.idType == "身份证" &&
          this.applicant.idCard.imgs.length < 2
        ) {
          MessageBox({
            title: "提示",
            message: "投保人身份证必须上传两张证件影像件"
          });
          return false;
        } else if (
          mumber.idType == "中国护照" &&
          this.applicant.idCard.imgs.length < 2
        ) {
          MessageBox({
            title: "提示",
            message: "投保人证件选择中国护照投保人必须上传两张证件影像件"
          });
          return false;
        } else {
          return true;
        }
      } else {
        MessageBox({
          title: "提示",
          message: "投保人最少上传一张证件影像件"
        });
        return false;
      }
    },
    //验证银行卡信息
    testBank(idImg) {
      if (idImg.length === 0) {
        MessageBox({
          title: "提示",
          message: "银行卡最少上传一张证件影像件"
        });
        return false;
      } else {
        return true;
      }
    },
    //验证收益人信息
    testdeathFavoree(orderlist) {
      if (orderlist.length > 0) {
        for (let i = 0; i < orderlist.length; i++) {
          let item = orderlist[i];
          if (item.imgs.length > 0) {
            if (item.bfcyIdType == "身份证" && item.imgs.length < 2) {
              MessageBox({
                title: "提示",
                message: "受益人身份证必须上传两张证件影像件"
              });
              return false;
            } else if (item.bfcyIdType == "中国护照" && item.imgs.length < 2) {
              MessageBox({
                title: "提示",
                message: "受益人证件选择中国护照必须上传两张证件影像件"
              });
              return false;
            } else if (item.imgs.length == 0) {
              MessageBox({
                title: "提示",
                message: "受益人最少上传一张证件影像件"
              });
              return false;
            } else {
              return true;
            }
          }
        }
      } else {
        return false;
      }
    },
    //验证被保人信息的函数
    testrelation(orderlist) {
      if (orderlist.length > 0) {
        for (let i = 0; i < orderlist.length; i++) {
          let item = orderlist[i];
          if (item.imgs.length > 0) {
            if (
              item.idType == "身份证" &&
              this.recognizee.idCard.imgs.length < 2
            ) {
              MessageBox({
                title: "提示",
                message: "被保人身份证必须上传两张证件影像件"
              });
              return false;
            } else if (
              item.idType == "中国护照" &&
              this.recognizee.idCard.imgs.length < 2
            ) {
              MessageBox({
                title: "提示",
                message: "被保人证件选择中国护照必须上传两张证件影像件"
              });
              return false;
            } else if (this.recognizee.idCard.imgs.length == 0) {
              MessageBox({
                title: "提示",
                message: "被保人最少上传一张证件影像件"
              });
              return false;
            } else {
              return true;
            }
          }
        }
      } else {
        return false;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.image-modal {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
.smallImage {
  width: 100%;
  height: 100%;
}
.smallImages {
  width: 100%;
  height: 100%;
}
.lagdarImage {
  width: 100%;
  height: 100%;
}
.back {
  display: block;
  height: 100%;
  width: 100%;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10px;
    margin-left: -20px;
  }
}
.fa {
  color: #03345c;
}
.fa-angle-left {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 48px;
  text-align: center;
  font-size: 30px;
}
.videoContent {
  width: 100%;
  height: 80%;
  margin: 70px auto;
}
.favoreeDatae div:nth-child(1),
.cardDatae > div:nth-child(1),
.applicante > div:nth-child(1),
.recognizeee > div:nth-child(1) {
  color: #2754f2;
  // margin-top: 10%;
}
.favoreeDatae div:nth-child(2),
.cardDatae > div:nth-child(2),
.applicante > div:nth-child(2),
.recognizeee > div:nth-child(2) {
  margin: 5% 0;
}
.videoData,
.bankData {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.videoData > p,
.bankData > p {
  width: 45%;
  height: 120px;
  font-size: 12px;
  color: #ffcaa2;
  background: #ffcaa2;
  text-align: center;
  margin: 20px 0;
  position: relative;
}
.add > img {
  width: 80%;
  height: 85%;
  margin: 10px auto;
}
.button-wrapper {
  position: fixed;
  bottom: 0;
  //  font-weight: bold;
  font-size: 18px;
  text-align: center;
  background: #f4a200;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #fff;
}
.photo {
  display: block;
  width: 100%;
  line-height: 45px;
  border: 0;
  background: #fff;
}
.remove-image {
  position: absolute;
  top: 0;
  right: 0;
  height: 20px;
  width: 20px;
  background-color: #dad6d7;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  color: #fff;
}
</style>
