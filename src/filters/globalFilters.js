import Vue from 'vue'
import utils from '../utils/index';
import format from '../utils/format';

/**
 * 全局公共过滤器 使用:{{'0' |commonFilter('relationFilter') }}
 * value 值
 * type 类型 对应码表(codeData)中的参数
 * default1 默认值
 */

Vue.filter('commonFilter', (value, type, default1) => {
  return allMap[type][value] || default1 || '——'
});

 //时间戳过滤(过滤到时分秒)
Vue.filter('dateFilter', (value) => {
  let tempDate = new Date(value)
  let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
  let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
  let tempHours = tempDate.getHours() < 10 ? '0' + tempDate.getHours() : tempDate.getHours();
  let tempMinutes = tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes();
  let tempSeconds = tempDate.getSeconds() < 10 ? '0' + tempDate.getSeconds() : tempDate.getSeconds();
  return tempDate.getFullYear() + '-' + tempMonth + '-' + tempDay + ' ' + tempHours + ':' + tempMinutes + ':' + tempSeconds;
});

 //时间戳过滤(过滤到时分秒)
Vue.filter('dateFilter2', (value) => {
  let tempDate = new Date(value)
  let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
  let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
  return tempDate.getFullYear() + '-' + tempMonth + '-' + tempDay;
});

const fillZero = value => {
  if(value.length == 1){
    value = '0' + value
  }
  return value
}

//时间过滤戳(过滤到年月日)
Vue.filter('dateFilterYear',(value) => {
  const dateArray = value.split('-')
  value = dateArray[0] + '-' + fillZero(dateArray[1]) + '-' + fillZero(dateArray[2])
  return value
})

//待办保单详情状态过滤
Vue.filter('policyState',(params)=>{
  let state = '';
  if(params == 1){
    state = '拒保'
  }else if(params == 2){
    state = '延期'
  }else if(params == 4){
    state = '次标体承保'
  }else if(params == 5){
    state = '核保未通过'
  }else if(params == 9){
    state = '标准承保'
  }else if(params == 8){
    state = '优标体'
  }else if(params == 'a'){
    state = '撤保'
  }
  return state;
});
// 证件类型过滤
Vue.filter('Notype',(value) =>{
  let Notype;
  if(value == 11){
    Notype = '居民身份证'
  }else if(value == 12){
    Notype = '居民户口薄'
  }else if(value == 13){
    Notype = '驾驶证'
  }else if(value == 14){
    Notype = '军官证'
  }else if(value == 15){
    Notype = '士兵证'
  }else if(value == 16){
    Notype = '军官离退休证'
  }else if(value == 17){
    Notype = '中国护照'
  }else if(value == 18){
    Notype = '学生证'
  }else if(value == 19){
    Notype = '工作证'
  }else if(value == 20){
    Notype = '出生证'
  }else if(value == 21){
    Notype = '无证件'
  }else if(value == 22){
    Notype = '警官证'
  }else if(value == 23){
    Notype = '台湾居民来往大陆同行证'
  }else if(value == 24){
    Notype = '外国护照'
  }else if(value == 25){
    Notype = '旅行证'
  }else if(value == 26){
    Notype = '港澳居民来往内地通行证'
  }else if(value == 27){
    Notype = '居留证件'
  }else if(value == 28){
    Notype = '其他'
  }
  return Notype
})
//保单状态过滤器
Vue.filter('statusFilter',(value)=>{
  let status;
  if(value == 0){
    status = '人核'
  }else if(value == 1){
    status = '核保成功'
  }else if(value == 2){
    status = '支付成功'
  }else if(value == 3){
    status = '承保成功'
  }else if(value == 4){
    status = '已回执'
  }else if(value == 5){
    status = '延期'
  }else if(value == 6){
    status = '已撤件'
  }else if(value == 7){
    status = '拒保'
  }else if(value == -1){
    status = '问题件'
  }else if(value == 84){
    status = '核保失败'
  }else if(value == 80){
    status = '投保初始化状态'
  }else if(value == 81){
    status = '投保校验失败'
  }else if(value == 82){
    status = '投保校验成功'
  }else if(value == 83){
    status = '试算失败'
  }else if(value == 90){
    status = '未复核'
  }else if(value == 91){
    status = '复核完成'
  }else if(value == 92){
    status = '待回复'
  }else if(value == 93){
    status = '已回复'
  }
  return status;
})
// 根据编号过滤银行
Vue.filter('bankFilter',(value)=>{
  let bankNo;
  if(value == 102){
    bankNo = "中国工商银行"
  }else if(value == 103){
    bankNo = "中国农业银行"
  }else if(value == 104){
    bankNo = "中国银行"
  }else if(value == 105){
    bankNo = "中国建设银行"
  }else if(value == 301){
    bankNo = "交通银行"
  }else if(value == 335){
    bankNo = "中信实业银行"
  }else if(value == 305){
    bankNo = "中国民生银行"
  }else if(value == 306){
    bankNo = "广东发展银行"
  }else if(value == 308){
    bankNo = "招商银行"
  }else if(value == 309){
    bankNo = "兴业银行"
  }else if(value == 310){
    bankNo = "上海浦东发展银行"
  }else if(value == 325){
    bankNo = "宁波银行"
  }else if(value == 307){
    bankNo = "深圳发展银行"
  }else if(value == 330){
    bankNo = "中国平安银行"
  }
  return bankNo;
})


Vue.filter('ageFilter',(value) => {
  var today = new Date();
  var birthDate = new Date(value);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
})