<template>
	<div>
		<div class="nav-lists" id="content_div">
			<div class="div-a">
				<div id="container1" style="height: 100%;width:100%"></div>
			</div>
			<div class="div-b">
				<div id="container2" style="height: 100%;width:100%"></div>
			</div> 
			<div class="div-a">
				<div id="container3" style="height: 100%;width:100%"></div>
			</div>
			<div class="div-b">
				<div id="container4" style="height: 100%;width:100%"></div>
			</div> 
			<div id="main" style="width: 600px;height:400px;"></div>
 		 <li @click = "boxScroll">
            <p><img src="../../../static/img/home/tab1.jpg" height="47" width="47"></p>
            <p>底部</p>
          </li>
          <li @click = "go('/testca')">
            <p><img src="../../../static/img/home/tab1.jpg" height="47" width="47"></p>
            <p>CA签字</p>
          </li>
          <li @click = "go('/testcamera')">
            <p><img src="../../../static/img/home/tab2.jpg" height="47" width="47"></p>
            <p>Cordova相机</p>
          </li>
          <li @click = "go('/testfile')">
            <p><img src="../../../static/img/home/tab3.jpg" height="47" width="47"></p>
            <p>Cordova文件操作</p>
          </li>
          <li @click = "go('/testlocationocr')">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>本地人脸识别</p>
          </li>
           <li @click = "test">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>本地人脸识别</p>
          </li>
          <li style="margin-top: 30px">
            <a href="http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ==" style="width: 30px;height: 30px;color: #0f0f0f">测试</a>
          </li>
          <li @click = "versionSet">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>版本传值</p>
          </li>
					<li @click = "fenxiang">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>分享测试</p>
          </li>
					<li @click = "fenxiang2">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>分享测试2</p>
          </li>
					<li @click = "duibi">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>对比</p>
          </li>
					<img style="width:50%;height:50%;" id="xss_30">
					<img style="width:50%;height:50%;" id="xss_31">
					<li @click = "jiami">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>加密</p>
          </li>
					<li @click = "jiemi">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>解密</p>
          </li>
					<li @click = "scanner">
            <p><img src="../../../static/img/home/tab1.jpg" height="47" width="47"></p>
            <p>二维码识别</p>
          </li>
					<li @click = "shibie">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>语音识别</p>
          </li>
          <img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI////////////////////////////////////////////////////2wBDAVVaWnhpeOuCguv/////////////////////////////////////////////////////////////////////////wAARCACUAPgDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAwEAACAgECAwcDBQADAQAAAAAAAQIDERIxBCFBEzJRUmFxgRSRoSIzNEKxI2LR8P/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Awi7BGkBUaXsRGkABQABQAHMAIcycygCcxzKAJzHMoAnMFAEI02jQAhQApj1Jj1KAJj1Jg0QDO+RgvVgDOBgpAJgFAGEaREjSQFRoiKAKAAKAAAARAUhABSFAFIQAG0ll7BNNZWzAAAAATVHVpzz8Cq0AAICRnGedLzgoGerA/s/YpBkFIBAUFGUaQRdubIMXNqttPBqrLri3vg5XWRlDCeWbqshpjHPPYo1bZ2cU8ZycvqZeVF4raK9TukktgOEL5Smo4XM9B55/yonoAHChuVk3l4OlstNcmZ4aOK8+IHN32amkk8PwHa2+X8GuH/cmdwjzdrd5X9jpROU09XQ6vY4cLtIDrKcYvEngz21fmOd6zdBPrg39ND1CpZZXODjqMUWRjFqUvZG3RWk3z5epmuuuyOUnv4gdO3r834Cvg3hPf0J9PX4P7nK2Ea5w09QPScF/Lf8A90NXWTjJKKyseBw1z7XVj9XhgD2OSju0vcnaQ80fucVCVy/X+nHoYtqVaT1ZbAsGoXPTJaX6nftYeZHKHDZinJtNhcPDLWp5QHWMlJtxeSmYQVfJN8zZBkFIBAUAEGsrHiC9QPPbVGEMrOcnSuqCUZddycT+38iM4zSr8VzZRlvtr0l3Uek4VSqrXey+rwb7evzfgDne3C6M8Gq79c1HTj5NO6prDefg0lFLUkkseAHHipbR+TtX+3H2PJNublPpnB66+5H2QR5o2dnOXLOWb+pfl/J1hVGDbXPPic+KXdCs/Uy8qNcJtI74XgSEIwzpWMgScIt62ua2OP1X/T8nofdZ5+GcVGWprfqBJcS2mtO/qYrtdcWks8z1SlDS/wBUdvE48NKKi9TS59QJ9TPyo3W1cszisrY6OyGO9H7nLhe7IDueWDzxWfVnonLTBvwR44KWtad2uQHuPMv+a/P9YjXKytw561+TMabenL5A9UpKMW30PPQnOyVjOUoPXpzqZ6nimnl0/wBA0+8vYpiuTmlJrBsggAAgAAEsbjBtdDQA8k9bjqnt0PTVXGKTS543McT3F7naPdXsUeaVUY3KLzpZ1+nh6/cnERzFSW8TUbourW+m4HG6uMZRjDOWemKxFLwWDhRF2WOyXwekDzXQUKUl4mpxnKENDxy8RxX7a9zrDuR9gPP2Nvm/Jxeeryeq+zC0R7zOVsNFcF16gSFc55xJcvFmvp7PMvuaszVbrXdlud4tSSaeUwD2Z5Kae0TecYPY9meOq11ppLOQOj4VY734OdNKsTbeMG3xMvKjnVa600lnIHX6VeZ/YcLtIz9TPyo1wn9vgC8S3iMF1ZlrTxEF4I7ygpSi3/U42fyYfAHZRSk2lze5zvu0LTHvf4L5yhFaVv1M0089c9+iAtFWla5bsxa3baoR2Ru+3StMe8zPCuPPzAd0lFJLoA917ggEKQCAoAhQZnnTLTnOAMcT3V7nZbI8um2ySUk8eqOt0pxaUNmB0nOMF+p/B4nzy0npydoUSk9Vj/8AT0KMVHThY8CjNU4SilHljodDzz4bnmD+GWmNqk9beF4gOK/bXuWdqrrit5YHExcoJRTfM12cZRjqWyA50VtvtJ7vYcV/T3PQcb4Snp0rOCDrKKlFp7M8yVlNmlc09vU9QAGK6lWnjLz4mwA6Hn4TaR6Djw9coatSxkDsYhXGvOnPM2AIee3+RD4/09JxshKVsJJcluB1OV1yjyjzl/huyLlBqLwznVQo8582BKKnnXPfoS+txfaQ+T0kKOVdisS8U+Z1OcKowk2ur+x0IIAAIAAIUheoFKQoApCgAAAAAAAAAAAAAAAAAAAIUAAAAAAEYJLb5RQIAAIAAIUhQKAAKUhQAAAAAAAAAAAAAAAAAAAAAAAABCkAPmAAIAQAAAIAAKUhQKAAKAAAAAApAAAAAAAAAAAAAAAAABCkAEKQAQpAAAAgAApQABQAKAABQABAAAAAoAAgAAAAAAAAAAEAAEAAgAAAAD//2Q=="/>
        </ul>
      </div>
	</div>
</template>

<script>import { MessageBox } from 'mint-ui';
export default {
	name: 'test',
	data() {
		return {
			str1:"",
			str2:"",
			status:false
		}
	},
	beforeMount() {

	},
	mounted() {
		createBarGraph(document.getElementById('container1'),0,300,2,'期交件数',
			//v1:数量轴单位 v2:数量轴间隔
			{name:'(件)',interval:50},
			//类目轴数据
			['维持','实际'],
			//数量轴柱状图数据
			[120, 170])
		createBarGraph(document.getElementById('container2'),0,300,2,'承保标准保费',
			//v1:数量轴单位 v2:数量轴间隔
			{name:'(万元)',interval:50},
			//类目轴数据
			['晋升','维持','实际'],
			//数量轴柱状图数据
			[53.2, 34.0, 89.3])
		createBarGraph(document.getElementById('container3'),0,300,2,'回访成功率',
			//v1:数量轴单位 v2:数量轴间隔
			{name:'(%)',interval:20},
			//类目轴数据
			['晋升','维持','实际'],
			//数量轴柱状图数据
			[53.2, 34.0, 89.3])
		createBarGraph(document.getElementById('container4'),0,300,2,'13个月综合继续率',
			//v1:数量轴单位 v2:数量轴间隔
			{name:'(%)',interval:20},
			//类目轴数据
			['晋升','维持','实际'],
			//数量轴柱状图数据
			[53.2, 34.0, 89.3])
		createBarLineBlend(document.getElementById('main'),0,400,1,'收入分布图',
					//v1:最小刻度 v2:最大刻度 v3:间隔 v4:轴标外边距 v5:刻度标签默认朝外
					[{min: 0,max: 20000,interval: 2000,axisLabel:{margin: 4,inside:false,}}],
					//类目轴数据
					['2018年1月','2018年2月','2018年3月','2018年4月','2018年5月','2018年6月','2018年7月','2018年8月','2018年9月','2018年10月','2018年11月','2018年12月'],
					//数量轴柱状图数据
					[4000, 3000, 1000, 5000, 12000, 8000, 4000, 6000, 7000, 3000, 15000, 13000],
					//数量轴折线1数据
					[3000, 2000, 800, 4000, 11000, 4000, 2000, 5000, 4000, 2000, 13000, 12000],
					//数量轴折线2数据
					[2300, 2800, 980, 4300, 8000, 4000, 2000, 3000, 5000, 3000, 12000, 12000],
					//数量轴折线3数据
					[3000, 3000, 1000, 4000, 4000, 8000, 4000, 6000, 7000, 3000, 15000, 13000])
	},
	methods: {
		scanner(){
			cordova.plugins.barcodeScanner.scan(
					function (result) {
							alert("We got a barcode\n" +
										"Result: " + result.text + "\n" +
										"Format: " + result.format + "\n" +
										"Cancelled: " + result.cancelled);
					},
					function (error) {
							alert("Scanning failed: " + error);
					},
					{
							preferFrontCamera : true, // iOS and Android
							showFlipCameraButton : true, // iOS and Android
							showTorchButton : true, // iOS and Android
							torchOn: true, // Android, launch with the torch switched on (if available)
							saveHistory: true, // Android, save scan history (default false)
							prompt : "Place a barcode inside the scan area", // Android
							resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
							formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
							orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
							disableAnimations : true, // iOS
							disableSuccessBeep: false // iOS and Android
					}
			);
		},
		boxScroll(){
			// window.scrollTo(0, document.getElementById("content_div").scrollHeight)
			if("" == 0){
				window.alert("ok")
			}else{
				window.alert("no")
			}
		},
		shibie(){
				MAPlugin.hybridCallAction('hybrid://MASpeech:401/invokeSpeech?0', function(callbackSucc){
				    alert(JSON.stringify(callbackSucc))
				}, function(callbackFail){
					 alert(callbackFail)
				});
		},
		jiami(){
			let data = {
				"personsal":{
					"mobile":"18938852265"
				}
			}
			console.log(DES3.encrypt('', JSON.stringify(data)).replace(/\s/g, ""))
		},
		jiemi(){
			let data = "IS/937f4QoG3us1GPLtGGRFZ0JHxb0xT1sYdQtF5/uw5leCLUwAGAA=="
			console.log(DES3.decrypt('', data))
		},
		duibi(){
			console.log(this.str1)
			console.log(this.str2)
			alert(this.str1 == this.str2)
		},
		getBase64Image:function(img) {
				var canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				var ctx = canvas.getContext("2d");
				// ctx.clearRect(0,0,img.width,img.height);  
				ctx.drawImage(img, 0, 0, img.width, img.height);
				var dataURL = canvas.toDataURL("image/png");
				return dataURL
		},
		fenxiang2:function(){
			let than = this
			var image = document.getElementById('xss_31')
			image.setAttribute('crossOrigin', 'anonymous');
			image.src = "http://mitphone.sunlife-everbright.com:8010/com.ifp.ipartner/imageURL?uuid=0f167ae7a2364431b5d1a96e481c2344"
			image.onload =function() {
				than.str1 = than.getBase64Image(image)
				console.log(than.str1)
			}
			setTimeout(()=>{
				image = document.getElementById('xss_30')
				image.setAttribute('crossOrigin', 'anonymous');
				image.src = "http://mitphone.sunlife-everbright.com:8010/com.ifp.ipartner/imageURL?uuid=c054cbbf279341668ad48103cd5b9eda"
				image.onload =function() {
					than.str2 = than.getBase64Image(image)
					console.log(than.str2)
				}
			},2000)
		},
		fenxiang:function(){
			let than = this
			var image = document.getElementById('xss_30')
			image.setAttribute('crossOrigin', 'anonymous');
			image.src = "http://mitphone.sunlife-everbright.com:8010/com.ifp.ipartner/imageURL?uuid=c054cbbf279341668ad48103cd5b9eda"
			image.onload =function() {
				than.str2 = than.getBase64Image(image)
				console.log(than.str2)
			}
		},
		versionSet:function(){
			var url = "itms-services://?action=download-manifest&url=https://yidongzhanyebj-1254235118.cosbj.myqcloud.com/gd/uploadFile/2018/1/31/iOSGuangda_1.1.plist"
			var urlObj = {"url": url}
			var urlStr = JSON.stringify(urlObj)
			var hybrid = 'hybrid://MAApkInfo:401/invokeApkInfo?' + urlStr
			console.log(hybrid)
			MAPlugin.hybridCallAction(hybrid, function(callbackSucc){
			    alert(JSON.stringify(callbackSucc))
			}, function(callbackFail){
				alert(callbackFail)
			});
		},
		test: function() {
			var str = "<a href='http://www.baidu.com' style='width: 30px;height: 30px;color: #0f0f0f'>点击下载最新版本</a>" 
			MessageBox({
				title: '提示',
				message: str,
				confirmButtonText:'关闭',
			});
		},
		post: function() {
			$.ajax({
				url: "https://api.megvii.com/faceid/lite/get_token",
				type: "POST",
				contentType: "application/json;charset=utf-8",
				heade: 'Access-Control-Allow-Origin',
				data: JSON.stringify({
					'api_key': 'IeEEeq3LZHL9ljmJ78s9WXv378D69MmC',
					'api_secret': 'GuoJYQ3ehoJIaUCogZY9DmuaYLxIh6cV',
					'return_url': 'https:www.baidu.com',
					'notify_url': 'https:www.baidu.com',
					'biz_no': '12019219271832813',
					'comparison_type': '1',
					'idcard_mode': '0',
					'idcard_name': '张鑫',
					'idcard_number': '140724199403250073'
				}),
				dataType: "text",
				success: function(result) {
					console.log(result)
				},
				error: function(msg) {
					console.log(msg)
				}
			})

		}
	},
}</script>

<style>
.div-a{ float:left;width:49%;border:1px solid #F00} 
.div-b{ float:left;width:49%;border:1px solid #000} 
</style>
