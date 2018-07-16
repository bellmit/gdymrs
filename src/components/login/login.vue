<template>
  	<div class="loginCon">
		<div class="login">
	  		<img style="height:55px;" src="../../../static/img/login/logo.jpg" alt="" class="login_img">
		</div>
	  	<div class="title">
	  		<img src="../../../static/img/login/title.jpg" alt="" class="title_img" style='margin-top:0!important'>
	  	</div>
	    <div class="login-content">
	      	<div class="uName">
	      		<div class="account">
	      			<input  type="text" placeholder="请输入账号" class="accountinput" v-model="input_text" style="margin:0 0 0 15px!important;"/>
	      		</div>
		      	<div class="img_delete new-ctn" @click="clearinput()">
		      		<img src="../../../static/img/login/delete.png" alt="" style='margin:0!important'>
		      	</div>
	        </div>
		  	<div class="uPwd">
			  	<div class="password">
			  		<input type="password" placeholder="请输入密码" class="passwordinput" v-model="input_passWord"  style="margin:0 0 0 15px!important;">
			  	</div>
			  	<div class="img_eyes new-ctn" @click="showHidePassword()">
			  		<img v-show="!isShow" src="../../../static/img/login/close.png" alt="" class="close" style='margin:0!important'>
			  		<img  v-show="isShow" src="../../../static/img/login/open.png" alt="" class="open" style='margin:0!important'>
		  		</div>
		  	</div>
		  	<!-- 记住密码 -->
		  	<div class="rememberPassword">
		  		<input type="checkbox" v-model="checked" class="choose" @change="handleChange()">
		  		<div class="choose_text">
		  			<span style="font-size: 16px;">记住密码</span>
		  		</div>
		  	</div>
		  	<!-- 建议书显示问题:去除注册和忘记密码功能 -->
		  	<div class="valid">
				<div class="phone_number">
				   <a style="font-size: 16px;color:#007ED0;text-decoration: underline;"  @click="phoneRegister()">注册</a>
				</div>
				<div class="pass_word">
					<a style="font-size: 16px;color:#007ED0;text-decoration: underline;"  @click="forgetPassword()">忘记密码</a>
				</div>
		  	</div>
			<div class="button">
				<input type="submit" @click="logIN()" value="登  录" class="login_button">
			</div>
		</div>
		<mt-popup position="center" v-model="isShow" class="phone_valid">
		  	<div class="mobileNumber">
		  		<div class="mNumber_text">手机号码</div>
		  		<div class="mNumber_input">
		  			<input type="text" v-model="input_phone">
		  		</div>
		  	</div>
		  	<div class="valid_number">
		  		<div class="vNumber_text">验证码</div>
		  		<div class="vNumber_input">
		  			<input type="text" v-model="input_validNum">
		  		</div>
		  		<div @click="sendNum()">
		  			<mt-button v-show="validNotShow" :disabled="disabled.sendDisabled">{{time}}秒后重发</mt-button>
		  			<mt-button v-html="timeEnd" v-show="validShow" :disabled="disabled.endDisabled"></mt-button>
		  		</div>
		  	</div>
		  	<div class="line"></div>
		  	<div class="confirmButton">
		  		<div class="confirm_button">
		  			<div style="color:#fff" @click="validPhoneNum()">确定</div>
		  		</div>
		  		<div class="cancle_button" style="color:#fff" @click="handleCancel()">取消</div>
		  	</div>
		</mt-popup>		
		<div class="bgImg">
			<img src="../../../static/img/login/bgImg.jpg" style="display:block;width:100%;position:relative;"/>
			<div class="version" style='position:absolute;top:20%;bottom:0'>
				<p>{{"版本号："+version}}</p>
			</div>
		</div>
		<!-- IOS -->
		<mt-popup v-model="versionStatusIOS" style="width: 80%;height: 216px;border-radius: 20px;" position="center">
			<div class="versionHeader">
				温馨提示	
			</div>
			<div class="versionContent">
				点击确定下载最新版本
			</div>
			<div class="versionFooter">
				<a @click="versionStatusIOS = !versionStatusIOS" v-model="isChanle">取消</a>
				<a id="IOS">确定</a>
			</div>
		</mt-popup>
		<!-- Android -->
		<mt-popup v-model="versionStatusAndroid" style="width: 80%;height: 216px;border-radius: 20px;" position="center">
			<div class="versionHeader">
				温馨提示
			</div>
			<div class="versionContent">
				点击确定下载最新版本
			</div>
			<div class="versionFooter">
				<a @click="versionStatusAndroid = !versionStatusAndroid">取消</a>
				<a id="Android">确定</a>
			</div>
		</mt-popup>
		<alert ref="alert" style="position:absolute;z-index:9999999999999"></alert>
	</div>
</template>

<script>
	import alert from '../policy/common/alert.vue'
	export default {
	    name: "login",
	    components: {alert},
		data(){
	      return{
	      	isChanle:false,
	      	versionStatusIOS:false,
	      	versionStatusAndroid:false,
	        isShow:false,
	        input_text:"",
	        input_passWord:"",
	        checked:false,
	        isChecked:'',
	        validShow:true,
	        validNotShow:false,
	        input_phone:"",
	        input_validNum:"",
	        input_code:'',
	        timer:'',
	        time:60,
	        timeEnd:"发送验证码",
	        disabled:{
	        	sendDisabled:false,
	        	endDisabled:false
	        },
	        opinion:true,
	        version:"" 		
	      }
	    },
	    methods:{
	    	//清除账号输入
	      	clearinput:function(){
	          this.input_text="";
	          this.input_passWord="";
	    	},
		  	// 切换密码显示隐藏
		  	showHidePassword:function(){
		        if($(".passwordinput").attr("type")=='password'){
		            // console.log(1);
		            $(".passwordinput").attr("type","text");
		            $(".close").hide();
		            $(".open").show();
		        }else if($(".passwordinput").attr("type")=='text'){
		            // console.log(2);
		            $(".passwordinput").attr("type","password");
		            $(".close").show();
		            $(".open").hide();
		        }
		    },
			//验证手机号不能为空
			validPhoneNum1:function(){
				var phoneNum = true;
				if(this.input_phone==""){
					this.$refs.alert.showMOdal('手机号码不可为空,请确认！')
					phoneNum = false;
				}else{
					phoneNum = true ;
				}
				return phoneNum
			},
			//验证手机号格式
			validPhoneNum2:function(){
				var phoneNum=true;
				// var reg=/^1[34578]\d{9}$/;
				var reg=/^[\d]{11}$/;
				if(!reg.test(this.input_phone)){
					this.$refs.alert.showMOdal('手机号码格式不正确,请重新输入！')
					phoneNum=false;
				}else{
					phoneNum = true ;
				}
				return phoneNum
			},
			//验证手机验证码不能为空
			validNumText:function(){
				var phoneNum=true;
				if(this.input_validNum==""){
					this.$refs.alert.showMOdal('验证码不能为空！')
					phoneNum=false;
				}else{
					phoneNum=true;
				}
				return phoneNum
			},
			//验证码定时器状态
			ControlTime(){
				this.timer = setInterval(() => {
					if(this.time<=60 && this.time>0){
						this.time--
						this.disabled.sendDisabled = true
					}else if(this.time == 0){
						this.timeEnd = "重新获取"
						this.validShow = true
						this.validNotShow = false
						clearInterval(this.timer)
						this.time = 60
						this.disabled.endDisabled = false
					}
				},1000)
			},
		    //请求验证码事件
		    sendNum(){
				let isSend=true;
				if(isSend==true){
					isSend = this.validPhoneNum1();
				}
				if(isSend==true){
					isSend=this.validPhoneNum2();	
				}
				if(isSend==true){
					this.validNotShow = true
					this.validShow = false
					//请求验证码 
			    	let requ = {
			    		"personsal": {
			  				"mobile": this.input_phone
		                }
			  		}
			  		utils.http.post('MOSENDCODE',requ).then(response => {
						console.log(response);	
	  					let personsal = response.data.response.personsal
						console.log("验证返回",personsal)
				    	if(response.data.header.responseCode=="0"){
				    		console.log("验证码返回成功");
				    		this.ControlTime();
				    	}else if(response.data.header.responseCode!="0"){
				    		console.log("验证码返回失败");
				    		this.validShow = true
				    		this.validNotShow = false
				    	}			
					}).catch(error => {
						console.log("请求失败")
						this.validNotShow = false
						this.validShow = true
					})
				}
			},
			//点击验证手机号注册事件
			phoneRegister:function(){
				this.isShow = !this.isShow;
				this.opinion=true;
			},
			//点击忘记密码事件
			forgetPassword:function(){
				this.isShow = !this.isShow;
				this.opinion=false;
			},
			//点击取消按钮事件
			handleCancel:function(){
				this.isShow = !this.isShow
				// clearInterval(this.timer);
			},
			//点击确定验证手机验证码并跳转到注册页面
			validPhoneNum:function(){
				var validNum=true;
				if(validNum==true){
					validNum=this.validPhoneNum1();
				}
				if(validNum==true){
					validNum=this.validPhoneNum2();
				}
				if(validNum==true){
					validNum=this.validNumText();
				}
				if(validNum==true){
					//验证验证码 
			    	let requ = {
			    		"personsal": {
			  				"mobile": this.input_phone,
			  				"message":this.input_validNum
		                }
			  		}
			  		utils.http.post('MOVALICODE',requ).then(response => {
			  			this.ControlTime();
						console.log(response.data);	
	  					let personsal = response.data.response.personsal
						console.log("验证结果返回",personsal)
				    	if(response.data.header.responseCode=="0"){
				    		if(this.opinion==true){
				    			this.$router.push("/logins/register");
				    		}else if(this.opinion==false){
						    	this.resetPassword();
				    		}
				    	}else if(response.data.header.responseCode!="0"){
				    		let stringIndex=response.data.header.errorMessage.indexOf("at com")
				    		let errorMessage=response.data.header.errorMessage.slice(0,stringIndex)
				    		console.log(errorMessage);
				    		this.$refs.alert.showMOdal(errorMessage)
				    	}			
					}).catch(error => {
						
					
					})
					this.isShow = false;
					clearInterval(this.timer);
				}
			},
			//点击忘记密码并重置密码为初始密码
			resetPassword:function(){
				console.log("请求初始密码")
		    	//发送初始密码请求
		    	let requ = {
		    		"personsal": {
	                    "agentName":this.input_text,
	                    "cerdNum":"" ,
	                    "mobile": this.input_phone
	                }
		  		}
  		  		utils.http.post('MOINITPWD',requ).then(response => {
  					// console.log(response);	
  					let personsal = response.data.response.personsal
					// console.log("初始密码返回",personsal)
			    	if(response.data.header.responseCode=="0"){
			    		this.$refs.alert.showMOdal('密码重置为初始密码')
			    	}else if(response.data.header.responseCode!="0"){
			    		let stringIndex=response.data.header.errorMessage.indexOf("at com")
			    		let errorMessage=response.data.header.errorMessage.slice(0,stringIndex)
			    		console.log(errorMessage);
			    		this.$refs.alert.showMOdal(errorMessage)
			    	}		
  				}).catch(error => {
  					
  				})	
			},
		    //记住密码
		    handleChange:function(){
		    	console.log('是否记住密码',this.checked);
		    },
		    //登录事件
		    logIN(){
		    	utils.cache.removeItem('activeList')
		    	utils.cache.removeItem('agentList')
		    	utils.cache.removeItem('productList')
		    	let isValid=true;
		    	//验证用户密码
		    	if(this.input_passWord==""){
		    		this.$refs.alert.showMOdal('密码不能为空')
		    		isValid=false;
		    	}else if(this.input_passWord.length>30){
		    		this.$refs.alert.showMOdal( '密码请输入30个以内字符')
		    		isValid=false;
		    	}
		    	//验证用户账号
		    	if(this.input_text==""){
		    		this.$refs.alert.showMOdal('账号不能为空')
		    		isValid=false;
		    	}else if(this.input_text.length>30){
		    		this.$refs.alert.showMOdal('账号请输入30个以内字符')
		    		isValid=false;
		    	}
		    	if(this.input_text=="" && this.input_passWord==""){
		    		this.$refs.alert.showMOdal('账号/密码不可为空,请确认！')
		    		isValid=false;
		    	}
		    	if(isValid==true){
			    	//发送登录请求
			    	let requ = {
			    		"personsal": {
			  				"agentCode": this.input_text,
			  				"password": hex_hmac_md5(globalConfig.transfer, this.input_passWord)
		                }
			  		}
	  		  		utils.http.post('MOLOGIN',requ).then(response => {
	  					// console.log("数据",response);	
	  					let personsal = response.data.response.personsal
						console.log("登录返回",personsal)
						//获取主页面所有图片并存缓存
	  		  			let arr = [],productList = [],agentList = [];
						for(let i of personsal.activeList){
							arr = arr.concat(i.remoteUrl)
						}
						//获取热销产品图
						for(let i of personsal.productList){
							productList = productList.concat(i)
						}
						console.log(productList,'11111111')
						//获取代理人头像背景图
						for(let i of personsal.agentList){
							agentList = agentList.concat(i)
						}
						utils.cache.set('activeList',arr)
						utils.cache.set('agentList',agentList)
						utils.cache.set('productList',productList)
				    	if(response.data.header.responseCode=="0"){
				    		if(personsal.channel == '13' //（金融市场部渠道）
				    		|| personsal.channel == '02' //（银保渠道）
				    		){
						  		personsal.edition = '1' //银保版本
						  	}else if(personsal.channel == '01' //（01代理人渠道）
						  	|| personsal.channel == '03' //（03老综金渠道）
						  	|| personsal.channel == '04' //（04综金渠道）
						  	|| personsal.channel == '05' //（04中介渠道）
						  	|| personsal.channel == '06' // (06续期渠道)
						  	|| personsal.channel == '11' //（团险职域渠道）
						  	|| personsal.channel == '00' // 特殊配置
						  	){
						  		personsal.edition = '2' //综金版本
						  	}
				    		utils.cache.set("personsal",personsal)
				    		//账号存缓存
				    		utils.cache.set("agentCode",this.input_text)
				    		//用户工号存缓存
				    		utils.cache.set("agentCodeNum",personsal.agentCode)
				    		//用户权限模块保存
				    		console.log("模块权限返回",personsal.loginMedol)
				    		utils.cache.set("loginMedol",personsal.loginMedol)
				    		//业务人员姓名身份证号
				    		utils.cache.set("agent",personsal.agentName)
				    		utils.cache.set("agentNum",personsal.cerdNum)
				    		//代理人地区存缓冲
				    		utils.cache.set("orgID",personsal.orgId)
				    		//渠道存缓冲
				    		utils.cache.set("channel",personsal.channel)
				    		// console.log(this.checked)
				    		// 密码存缓存
				    		let password = {
				    			"password" : this.input_passWord,
				    			"checked" : this.checked
				    		}
				    		if(this.checked==true){
				    			utils.cache.set("passwordInfo",password);
				    		}else{
				    			utils.cache.removeItem("passwordInfo")
				    		}
				    		//判断IOS/andriod版本
				    		if(personsal.IOS_versionNo != undefined 
				    			&& personsal.IOS_versionNo != "" //ios版本号非空判断
				    			&& personsal.andriod_versionNo != undefined 
				    			&& personsal.andriod_versionNo != ""  //android版本号非空判断
				    			&& personsal.IOS_URL != undefined 
				    			&& personsal.IOS_URL != "" //ios下载地址非空判断
				    			&& personsal.andriod_URL != undefined 
				    			&& personsal.andriod_URL != ""){ //android下载地址非空判断
				    				//获取平台信息
				    				console.log("返回IOS版本",personsal.IOS_versionNo);
		    						let platform =  globalConfig.os
		    						let version =  globalConfig.version
		    						console.log("版本",version);
		    						if(platform == 'android'){
										if (Number(personsal.andriod_versionNo) > Number(version)) {
											this.versionStatusAndroid = true
											$("#Android").attr("href", personsal.andriod_URL)
										}else{
                                            console.log(personsal.andriod_versionNo,version)
											this.$router.push("/home");
										}
		    						   }else if(globalConfig.os == 'ios'){
		    							if (Number(personsal.IOS_versionNo) > Number(version)) {
											this.versionStatusIOS = true
											let IOSbtn = $("#IOS")
											IOSbtn.click(()=>{
												this.versionStatusIOS = false
												console.log('IOS下载')
												var url = personsal.IOS_URL
												var urlObj = {
													"url": url
												}
												var urlStr = JSON.stringify(urlObj)
												// console.log(urlStr);
												var hybrid = 'hybrid://MAApkInfo:401/invokeApkInfo?' + urlStr
												console.log(hybrid)
												//IOS升级
												MAPlugin.hybridCallAction(hybrid, function(callbackSucc) {
													alert(JSON.stringify(callbackSucc))
												}, function(callbackFail) {
													alert(callbackFail)
												});
											})
		    							}else{
		    								this.$router.push("/home");
		    							}
		    						}
				    		}else{
				    			this.$router.push("/home");
				    		}
				    	}else if(response.data.header.responseCode!="0"){
				    		let stringIndex=response.data.header.errorMessage.indexOf("at com")
				    		let errorMessage=response.data.header.errorMessage.slice(0,stringIndex)
				    		console.log(errorMessage);
				    		this.$refs.alert.showMOdal(errorMessage)
				    	}		
	  				}).catch(error => {
	  					
	  				})	
		    	}
		    },
		    //提示框
		    showMsg:function(msg){
		        if(msg!=undefined && msg!=""){
		             this.$refs.alert.showMOdal(msg)
		        }
		    },	  
		},
		mounted(){
			let LoginHeight = document.documentElement.clientHeight+'px';
			$('.loginCon').css('height',LoginHeight).css('overflow','hidden');
			window.onresize = function() {
				let LoginHeight = document.documentElement.clientHeight+'px';
				$('.loginCon').css('height',LoginHeight).css('overflow','hidden');
			}
			//给版本号赋值
			this.version=globalConfig.version;
			console.log("本地版本号",this.version);
			//记住账号
			if(this.input_text==""){
				this.input_text=utils.cache.get("agentCode");
				// console.log(this.input_text);
			}
			//记住密码
			if(!this.checked && utils.cache.get("passwordInfo") != null){
				this.input_passWord=utils.cache.get("passwordInfo").password;
				this.checked=utils.cache.get("passwordInfo").checked;
				// console.log(this.input_passWord)
			}
			/*清除除帐号密码外所有缓存*/
			utils.cache.removeItem("personsal");	
			utils.cache.removeItem("productCode");
			utils.cache.removeItem("planId");	
			utils.cache.removeItem("proposalConfig");	
			utils.cache.removeItem("holderSexFlag");	
			utils.cache.removeItem("insurantSexFlag");	
			utils.cache.removeItem("zhuxianPremium");	
			utils.cache.removeItem("zhuxianMoney");	
			utils.cache.removeItem("totalPremium");
			utils.cache.removeItem("job");
			utils.cache.removeItem("proposalPlan");
			utils.cache.removeItem("productCodeDetail");
			utils.cache.removeItem("signInfo");
			utils.cache.removeItem("orgID");
			utils.cache.removeItem("channel");
			//zhangxin,此数据在电子保单页面使用,用于存储是否查看单证信息,及单证数据
			utils.cache.removeItem("documentInfo");
			//zhangxin,此数据在告知页面使用,用于存储成功保存数据后获取的orderId
			utils.cache.removeItem("policy_orderId");
			//liangxin,此数据用于电子投保单页面单证阅读勾选框,判断勾选状态
			utils.cache.removeItem("readStatus");
		}
	}
</script>

<style>
	.account input{
		border: none;
	}
</style>
<style scoped type="text/css">
	.versionHeader{
		width: 100%;height: 50px;
		text-align: center;
		font:18px/50px"";
		color:#FFF;
		background-color: #0C3073;
		font-weight: bold;
		border-bottom: 3px solid #FEB101;
		border-radius: 20px 20px 0 0;
	}
	.versionContent{
		width: 100%;
		text-align: center;
		line-height: 99px;
	}
	.versionFooter{
		width: 100%;height: 60px;
		border-top: 1px dashed #BBB;
		display: flex;
		justify-content: space-around;
	}
	.versionFooter a{
		display: inline-block;
		width: 80px;height: 41px;
		text-align: center;
		line-height: 41px;
		font-size: 18px;
		margin-top: 10px;
		background-color: #FEB101;
		color: #FFF;
		border-radius: 10px;
	}
	.loginCon{
		width: 100%; 
		height: 100%;
		background-size: 100%;
		background: #F7F6F5;
	}
	.login,.title{
		display: flex;
		align-items: center;
		background: #F7F6F5;
	}
	.login{ 
		display: flex;
		align-items: center;
		height: 20%;
	}
	.title{
		height: 10%;
	}
	.login_img,.title_img{
		width: 100%;	
	}
	.login-content{
		text-align: center;
		width: 100%;
		height:48.5%;
		padding:0 0 0 0;
		background: #F7F6F5;
	}
	.uName,.uPwd{
		width: 67%;height: 35px;
		background: #fff;
		margin: 0px auto;
		border: 2px solid #C6C6C6;
		border-radius: 7px;
		display: flex;
		margin: 15px auto;
	}
	.account,.password{
		width: 80%;height: 100%;
		/* background: yellow; */
	}
	input{
		font-size: 18px;
		width: 100%;height: 100%;
		/* margin-left:10px; */
	}
	.img_delete,.img_eyes{
		width: 20%;height: 100%;
		background: #fff;
	}
	img{
		height:60%;
		margin-top: 15%;
		vertical-align: middle;
	}
	.valid{
		width: 69%;height: 35px;
		/* background: pink; */
		margin: 0px auto;
		display: flex;
		margin: 5px auto;
	}
	.phone_number,.pass_word{
		height: 50px;
		line-height: 50px;
		text-align: left;
	}
	.phone_number{
		width: 60%;
	}
	.pass_word{
		width: 40%;
		text-align: right;
	}
	.button{
		width: 52%;
		height: 25px;
		margin: 15px auto;
		background: #FEB101;
		border-radius: 7px;
	}
	.login_button{
		color: #fff;font-size: 18px;
		border:none;outline:none;
		background: transparent;
	}
	.phone_valid{
		width: 313px;height: 194px;
		background: #fff;
		margin: 0px auto ;
		border-radius: 10px;
		/* display:none; */
	}
	.mobileNumber{
		width: 264px;
		margin: 21px 24px 0px 24px;
		display: flex;
	}
	.mNumber_text{
		width: 75px;height: 34px;
		/* background: green; */
		text-align: left;
		line-height: 34px;
	}
	.mNumber_input{
		width: 187px;height: 34px;
		/* background: yellow; */
		border: 1px solid #CCCCCC;
		border-radius: 7px;
		background: #fff;
	}
	.mNumber_input>input{
		width: 95%;
	}
	.valid_number{
		width: 264px;
		margin: 10px 24px 0px 24px;
		display: flex;
	}
	.valid_number button{
		display: inline-block;
		width: 89px;height: 34px;
		color: #fff;
		border-radius: 7px;
		background:#FF5527;
		margin-left: 11px;
		line-height: 34px;
		text-align: center;
		padding: 0;
		font-size: 14px;
	}
	.vNumber_text{
		width: 73px;height: 34px;
		/* background: yellow; */
		text-align: center;
		line-height: 34px;
	}
	.vNumber_input{
		width: 101px;height: 34px;
		text-align: left;
		border: 1px solid #CCCCCC;
		border-radius: 7px;
		background: #fff;
	}
	.vNumber_input{
		width: 89px;height: 34px;
		text-align: left;
		/* background: yellow; */
	}
	.vNumber_input>input{
		width:90%;
	}
	.send_vNumber,.vNumber_timer{
		width: 89px;height: 34px;
		color: #fff;
		border-radius: 7px;
		background:#FF5527;
		margin-left: 11px;
		line-height: 34px;
		text-align: center;
	}
	.line{
		width: 283px;height: 17px;
		margin: 0px auto ;
		border-bottom: 3px dashed #D4D4D4;
	}
	.confirmButton{
		width: 204px;height: 39px;
		margin: 20px 58px 0px 58px;
		display: flex;
		justify-content: space-between;
		/* background: yellow; */
	}
	.confirm_button,.cancle_button{
		width: 91px;height: 39px;
		border-radius:7px;
		background: #FEB101;
		text-align: center;
		line-height: 39px;
	}
	.rememberPassword{
		width: 69%;
		height:20px;
		margin:0 auto;
		display: flex;
	}
	.choose{
		width: 10%;
		margin-left: 0px;
	}
	.choose_text{
		width: 90%;
		text-align: left;
	}
	.version{
		width:95%;
		position: fixed;
		bottom:5%;
		z-index: 100;
	}
	.version>p{
		font-size: 10px;
		width:100%;
		font-style: italic;text-align: right;
	}
  .new-ctn{
  	display: flex;
  	justify-content:flex-end;
  	align-items: center;
  	text-align: right; 
  	padding-right:5%;
  }
  body{
  	background:#F7F6F5!important;
  }
  .bgImg{
  	position:relative;
  	bottom:0;
  	width:100%;
  	height:16%;
  	background:#F7F6F5;
  	z-index: 0;
  }
  .bgImg>img{
  	height:100%;
  }
</style>
