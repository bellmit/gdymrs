<template>
	<div>
		<input type="text" v-model="inputphone" class="input">
		<button @click="validPhoneNum()">?֤</button>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	export default {
		name:"valid",
		data(){
			return{
				inputphone:""
			}
		},
		methods:{
			validPhoneNum:function(){
				let birthThree=new Date();
				console.log(birthThree);
				var reg= /^[4,8]00\d{5}$/;
				if(!reg.test(this.inputphone)){
					MessageBox({
						title: '?ʾ',
						message: '??????ʽ???ȷ,???????'
					});
				}else{
					let date="142226199102023149";
					let bithDate=date.substring(6, 10) + "-" + date.substring(10, 12) + "-" + date.substring(12,14);
					console.log(bithDate);
				}
			}
		}
	}
</script>
<style>
	.input{
		border: 1px solid #ccc;
	}
</style>