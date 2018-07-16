import cardTypeList from '../assets/dict/card_type_sunlife.json'
import nationalList from '../assets/dict/national_sunlife.json'
import phoneNumberRuleList from '../assets/dict/phone_number_rule_sunlife.json'
import bankCode from  '../assets/dict/bankCode.json'

const valid = {
	//座机校验
	homePhoneNum(code,num){
		if((code != undefined && code != "")&&(num == undefined || num == "")){
			return "电话号码不能为空。\n"
		}
		if((code == undefined || code == "")&&(num != undefined && num != "")){
			return "电话号码不能为空。\n"
		}
		if(code != undefined && code != ""){
			if(code.length != 3 && code.length != 4){
				return "区号可录入3和4位。\n"
			}
			let reg1 = new RegExp("([\\d])\\1{2}")
			if(reg1.test(code)){
				return "区号位数录入有误，不可录入3位或相同数字。\n"
			}
			let reg2 = new RegExp("([\\d])\\1{3}")
			if(reg2.test(code)){
				return "区号位数录入有误，不可录入4位相同数字。\n"
			}
		}
		if(num != undefined && num != ""){
			if(num.length != 7 && num.length != 8){
				return "电话号可录入7和8位。\n"
			}
			let reg1 = new RegExp("([\\d])\\1{6}")
			if(reg1.test(num)){
				return "电话号码录入有误，不可录入7位或相同数字。\n"
			}
			let reg2 = new RegExp("([\\d])\\1{7}")
			if(reg2.test(num)){
				return "电话号码录入有误，不可录入8位相同数字。\n"
			}
			if(num.substring(0,4) == "1234"){
				return "号码前四位不能是1234"
			}
		}
	},
  //年收入
  salary(salary){
    console.log("年收入")
    console.log(salary)
    let reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
    if(!reg.test(salary)){
      return "年收入必须为正数且小数位数不能大于两位。\n"
    }
  },
  //家庭年收入
  familySalay(salary){
    console.log("家庭年收入")
    let reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
    console.log(salary)
    if(!reg.test(salary)){
      return "家庭年收入必须为正数且小数位数不能大于两位。\n"
    }
  },
  //保费预算
  premBudget(salary){
    console.log("保费预算")
    let reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
    if(!reg.test(salary)){
      // return "投保人保费预算必须为正数且小数位数不能大于两位。\n"
      return "保费预算必须为正数且小数位数不能大于两位。\n"
    }
  },
  //工作单位
  grpName(grpName){
    console.log("工作单位")
    console.log(grpName)
    if(grpName != undefined && grpName != ""){

    }else{
      return "工作单位或就读学校不能为空。\n"
    }

  },

  //职业
  occupation(occupationCode){
    console.log("职业")
    console.log(occupationCode)
    if(occupationCode != undefined && occupationCode != ""){

    }else{
      return "职业类别未录入，请选择职业类别！\n"
    }
  },

  //手机号
  mobilePhone(mobilePhone){
    console.log('手机号')
    console.log(mobilePhone)
    let tel=mobilePhone;
    let ispass = false
    if(phoneNumberRuleList != undefined && phoneNumberRuleList != ""){
      for(let i = 0; i < phoneNumberRuleList.rule.item.length; i++) {
        console.log(phoneNumberRuleList.rule.item[i].text)
        if(mobilePhone.substring(0,3) == phoneNumberRuleList.rule.item[i].text){
          ispass = true
          break
        }
      }
    }
    if(tel==""){
      return "手机号码不能为空。\n"
    }else if(tel.length!=11){
      return "手机号码长度有误,请核对。\n"
    }
    if(!ispass){
      return "手机号码格式有误,请核对。\n"
    }
  },

  //校验银行卡号
  BankCode(code,bankNo){
          console.log(code)
          console.log(bankNo)
          let ispass = false
          if(code !== "" && bankNo !== ""){
            var reg = /^\d{10,20}$/;
            if(!reg.test(bankNo)){
              return '卡号输入有误,请核对。\n'
            }else{
              for(let i=0;i<bankCode.bankCode.length;i++){
                console.log(bankCode.bankCode[i].code)
                if(code == bankCode.bankCode[i].code){
                  for(let j=0;j<bankCode.bankCode[i].ocrCode.length;j++){
                     let length =  bankCode.bankCode[i].ocrCode[j].length
                     console.log(length,'length')
                     let bank = String(bankNo).substring(0,length)
                     console.log(bank)
                     console.log(bankCode.bankCode[i].ocrCode[j])
                     if(bank == bankCode.bankCode[i].ocrCode[j]){
                      ispass = true
                        return ''
                     }
                  }
                }
              }
            }
          }
          if(!ispass){
            return "银行卡号有误,请核对。\n"
          }
        },

  //邮箱
  email(email){
    console.log("邮箱")
    console.log(email)
    if (email != undefined && email != "") {
      let reg= /^[A-Za-z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(!reg.test(email)){
        // return "您的邮箱格式有误，请核实！\n"
        return "邮箱格式有误，请核实！\n"
      }
    }else{
      return "邮箱不能为空。\n"
    }
  },

  //省 市 县 村/街道 镇/社区 详细地址
  contactAddress(province,city,county,postalAddress,street,community){
    console.log("省 市 县 村/街道 镇/社区 详细地址")
    console.log(province)
    console.log(city)
    console.log(county)
    console.log(postalAddress)
    if (province != undefined && province != "" && city != undefined && city != "") {
      if(postalAddress != undefined && postalAddress != "" && county != undefined && county != ""){
        // let reg= /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        // if(!reg.test(postalAddress)||
        //   !reg.test(street)||
        //   !reg.test(community)){
        //   return "详细地址输入有误。\n"
        // }
        let len1 = 0
        let len2 = 0
        if(street!=undefined && street!=""){
          len1 = street.replace(/[^\x00-\xff]/g,"01").length
        }
        if(community!=undefined && community!=""){
          len2 = community.replace(/[^\x00-\xff]/g,"01").length
        }
        let len3 = postalAddress.replace(/[^\x00-\xff]/g,"01").length
        if (len1 + len2 + len3 < 10) {
          return "详细地址不得少于10个字符,2个字符1个汉字。\n"
        }
        if(len1 + len2 + len3 > 150 ){
          return "详细地址不得超过150个字符,2个字符1个汉字。\n"
        }
      }else{
        return "详细地址填写不完整。\n"
      }
    }else{
      return "联系地址填写不完整。\n"
    }
  },
  // 国籍nationality 性别Gender 生日Birthday 证件类型 证件号码 Certificates
  ngbc(nationality,gender,birthday,idType,idNo){
    console.log("国籍 性别 生日 证件类型 证件号码")
    console.log(nationality)
    console.log(gender)
    console.log(birthday)
    console.log(idType)
    console.log(idNo)
    if(gender != undefined && gender != ""){
      if(birthday != undefined && birthday != ""){
        let compareDateTime = new Date(birthday).getTime() - new Date().getTime()
        if(compareDateTime > 0){
          return "出生日期不得晚于当前日期。\n"
        }
        if(nationality != undefined && nationality != ""){
          if(idType != undefined && idType != ""){
            let cardItem = utils.valid.getCardItem(idType)
            let remark = cardItem.remark
            //证件类型与国籍校验
            if (remark != undefined && remark != "") {
              let remarks = remark.split(',')
              var national = ''
              for (var i = 0; i < remarks.length; i++) {
                national += utils.valid.getNationalItem(remarks[i].replace('!','')).text
                if (i != remarks.length - 1) {
                  national += ",";
                }
              }
              let isHaveNo = remark.indexOf("!")
              if (isHaveNo > -1) {//包含!非此国家
                let remarks = remark.split(',')
                for (var i = 0; i < remarks.length; i++) {
                  if(remarks[i] == "!"+nationality){
                    return "证件类型为" + cardItem.text + ",国籍不能为" + national + "\n"
                  }
                }
              }else{
                if(remark.indexOf(nationality) == -1){
                  return "证件类型为" + cardItem.text + ",国籍必须为" + national + "\n"
                }
              }
            }
            //出生证年龄判断
            let age = utils.valid.getAge(birthday)
            if(age >= 3 && idType == "20"){
              // return "客户年龄大于等于3周岁时证件类型不能选择出生证\n"
              return "年龄大于等于3周岁时证件类型不能选择出生证\n"
            }
            //证件号码校验
            if(idNo != undefined && idNo != ""){
              let length = idNo.trim().length
              let minle = cardItem.minle
              //证件号码长度校验
              if(minle != undefined && minle != ""){
                if (minle > length) {
                  return "证件类型为" + cardItem.text
                      + ",证件号码不得小于" + minle + "位。\n"
                }
              }
              let maxle = cardItem.maxle
              if(maxle != undefined && maxle != ""){
                if (maxle < length) {
                  return "证件类型为" + cardItem.text
                      + ",证件号码不得大于" + maxle + "位。\n"
                }
              }
              if(idType == "29"){
                let newIdNo = idNo.replace("x", "X")
                let reg= /^[A-Z0-9]{15}$/;
                if(!reg.test(newIdNo)){
                  return "证件类型为" + cardItem.text + ",证件号码填写有误。\n"
                }
              }
              //身份证和户口本特殊处理,其他证件的国籍和证件号码长度在字典xml中配置
              if(idType == "11" || idType == "12"){
                let newIdNo = idNo.replace("x", "X")
                if (newIdNo.length != 18) {
                  return "证件类型为" + cardItem.text + ",证件号码填写不符合18位校验规则。\n"
                }else if(!utils.valid.checkIdCardAndBirthday(newIdNo,birthday)){
                  return "证件类型为" + cardItem.text + ",证件号码填写与生日不匹配。\n"
                }else if(!utils.valid.checkIdCardAndGender(newIdNo, gender)){
                  return "证件类型为" + cardItem.text + ",证件号码填写与性别不匹配。\n"
                }
                if(!utils.valid.checkIdCard(newIdNo)){
                  return "证件类型为" + cardItem.text + ",证件号码填写不正确。\n"
                }
              }
            }else{
              return "证件号码不能为空。\n"
            }
          }else{
            return "证件类型不能为空。\n"
          }
        }else{
          return "国籍不能为空。\n"
        }
      }else{
        return "出生日期不能为空。\n"
      }
    }else{
      return "性别不能为空。\n"
    }
  },
  //性别Gender 生日Birthday 证件类型 证件号码 Certificates
  ngbc2(gender,birthday,idType,idNo){
    console.log("性别 生日 证件类型 证件号码")
    console.log(gender)
    console.log(birthday)
    console.log(idType)
    console.log(idNo)
    if(gender != undefined && gender != ""){
      if(birthday != undefined && birthday != ""){
        let compareDateTime = new Date(birthday).getTime() - new Date().getTime()
        if(compareDateTime > 0){
          return "出生日期不得晚于当前日期。\n"
        }
        if(idType != undefined && idType != ""){
          let cardItem = utils.valid.getCardItem(idType)
          let remark = cardItem.remark
          //出生证年龄判断
          let age = utils.valid.getAge(birthday)
          if(age >= 3 && idType == "20"){
            // return "客户年龄大于等于3周岁时证件类型不能选择出生证\n"
            return "年龄大于等于3周岁时证件类型不能选择出生证\n"
          }
          //证件号码校验
          if(idNo != undefined && idNo != ""){
            let length = idNo.trim().length
            let minle = cardItem.minle
            //证件号码长度校验
            if(minle != undefined && minle != ""){
              if (minle > length) {
                return "证件类型为" + cardItem.text
                    + ",证件号码不得小于" + minle + "位。\n"
              }
            }
            let maxle = cardItem.maxle
            if(maxle != undefined && maxle != ""){
              if (maxle < length) {
                return "证件类型为" + cardItem.text
                    + ",证件号码不得大于" + maxle + "位。\n"
              }
            }
            //身份证和户口本特殊处理,其他证件的国籍和证件号码长度在字典xml中配置
            if(idType == "11" || idType == "12"){
              let newIdNo = idNo.replace("x", "X")
              if (newIdNo.length != 18) {
                return "证件类型为" + cardItem.text + ",证件号码填写不符合18位校验规则。\n"
              }else if(!utils.valid.checkIdCardAndBirthday(newIdNo,birthday)){
                return "证件类型为" + cardItem.text + ",证件号码填写与生日不匹配。\n"
              }else if(!utils.valid.checkIdCardAndGender(newIdNo, gender)){
                return "证件类型为" + cardItem.text + ",证件号码填写与性别不匹配。\n"
              }
              if(!utils.valid.checkIdCard(newIdNo)){
                return "证件类型为" + cardItem.text + ",证件号码填写不正确。\n"
              }
            }
          }else{
            return "证件号码不能为空。\n"
          }
        }else{
          return "证件类型不能为空。\n"
        }
      }else{
        return "出生日期不能为空。\n"
      }
    }else{
      return "性别不能为空。\n"
    }
  },
  //证件有效期校验
  compareDateTime(date){
    let oldDate = new Date(date).getTime();
    let newDate = new Date().getTime();
    return newDate-oldDate
  },
  // 校验姓名规则
  uname(uname){
    console.log(uname)
    let userName=uname.replace(/\s+/g,"")
    let reg1=/.*\d.*/;
    let reg2= /^[\u4E00-\u9FA5A-Za-z]+$/;
    let reg3= /^[\u4E00-\u9FA5]+$/;
    if(userName == undefined || userName==""){
      // return '请您准确填写真实姓名！\n'
      return '需准确填写真实姓名！\n'
    } else {
      if(reg1.test(userName)){
        return '您的姓名中含有特殊字符、数字或空格，请核对！'
      } else
      if(!reg2.test(userName)){
        return '您的姓名中含有特殊字符、数字或空格，请核对！'
      }
      if(userName.length > 120){
        // return "请核实您的姓名是否准确，请输入小于120个字符！\n"
        return "姓名是否准确，请输入小于120个字符！\n"
      }
    }
  },
  //校验国籍非空
  national(national){
    let country=national;
    if(country==""){
      return '国籍不能为空,需核实！'
    }
  },
  //校验联系地址
  //缺:联系地址输入有误校验
  //   联系地址填写不完整校验
  // contactAddress(contactAddress){
  //   let address=contactAddress;
  //   if(address.length>33){
  //     return "联系地址不得超过33个字！"
  //   }else if(address.length<10){
  //     return "联系地址不得少于10个字符！"
  //   }
  // },
  //邮箱校验
  // emailBox(emailBox){
  //   let email=emailBox;
  //   let reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  //   if(email==""){
  //     return "邮箱不能为空！"
  //   }else if(!reg.test(email)){
  //     return "邮箱输入有误！"
  //   }
  // },
  //校验固定电话号
  areaPhoneNum(areaNum,phoneNum){
    // 区号校验
    let areaCode=areaNum;
    let reg1=/^\d{3,4}$/;
    let reg2=/^([0-9])\1{2}$/;
    let reg3=/^([0-9])\1{3}$/;
    if(!reg1.test(areaCode)){
      return '区号位数录入有误,仅可录入3位或4位数字！'
    }else if(reg2.test(areaCode)){
      return "区号位数录入有误,不可录入3位或相同数字！"
    }else if(reg3.test(areaCode)){
      return '区号位数录入有误,不可录入4位相同数字！'
    }else if(areaCode==""){
      return "区号不能为空！"
    }
    // 电话号校验
    let phone=phoneNum;
    let reg4=/^\d{7,8}$/;
    let reg5=/^([0-9])\1{6}$/;
    let reg6=/^([0-9])\1{7}$/;
    let reg7=/^[1][2][3][4]/;
    if(!reg4.test(phone)){
      return "电话号码位数录入有误,仅可录入7位或8位数字！"
    }else if(reg5.test(phone)){
      return "电话号码录入有误,不可录入7位或相同数字！"
    }else if(reg6.test(phone)){
      return "电话号码录入有误,不可录入8位相同数字！"
    }else if(reg7.test(phone)){
      return "电话号码录入有误,前4位不可录入1234！"
    }else if(phone==""){
      return "电话号码不能为空！"
    }
  },
  
  //证件有效期校验
  idCardValidity(idCard){
    console.log("证件有效期")
    console.log(idCard)
    let iCard=new Date(idCard).getTime();
    let newDate=new Date().getTime();
    if(idCard == undefined || idCard == ""){
      return "证件有效期不能为空"
    }else{
      if(newDate-idCard >= 0){
        return "证件有效期不得早于当前日期"
      }
    }
  },
  // 客户类型(投保人,被保人),证件号码,国籍,证件类型
  // 缺:证件与国籍校验
  //    证件类型为回乡证类，证件号码不得小于8位
  idNum(idNum){
    let birthDate=idNum.substring(6, 10) + "-" + idNum.substring(10, 12) + "-" + idNum.substring(12,14);
    let birth=new Date("birthDate").getTime();
    let newDate=new Date().getTime();
    let reg=/^[1-9](\d{16}|\d{13})[0-9X]$/;
    if((birth-newDate)>0){
      return "出生日期不得晚于当前日期"
    }else if(!reg.test(idNum)){
      return "证件号码填写不正确"
    }else if(idNum==""){
      return "证件号不能为空"
    }
  },
  checkIdCardAndGender(idNo,genderCode){
    var idCard = idNo
    if (idCard == undefined) {
      idCard = ""
    }
    if (genderCode == undefined || genderCode == "")
      return false;
    if (idCard.length == 18) {
      var c17 = idCard.substring(16, 17);
      var c = c17
      if (c % 2 == 1 && "1" == genderCode)
        return true;
      else if (c % 2 == 0 && "2" == genderCode)
        return true;
      else
        return false;
    } else if (idCard.length == 15) {
      var c15 = idCard.substring(14, 15);
      var c = c15
      if (c % 2 == 1 && "1" == genderCode)
        return true;
      else if (c % 2 == 0 && "2" == genderCode)
        return true;
      else
        return false;
    }
    return false;
  },
  checkIdCardAndBirthday(idNo,birthday){
    let idCard = idNo
    if (idCard == undefined) {
      idCard = ""
    }
    if (birthday == undefined || birthday == "")
      return false;
    var str1 =  birthday.replace(new RegExp("-","g"),'')
    var str2;
    if (idCard.length == 18)
      str2 = idCard.substring(6, 14);
    else
      str2 = "19" + idCard.substring(6, 12);
    if (str1 != str2)
      return false;
    return true;
  },
  checkIdCard(idNo){
    var idCard = ""
    idCard = idNo
    if (idCard == undefined) {
      idCard = ""
    }
    idCard = idCard.trim();
    if ("" == idCard)
      return false;
    if (idCard.length != 15 && idCard.length != 18)
      return false;
    if (idCard.length == 15) {
      for (var i = 0; i < idCard.length; i++) {
        if (idCard.charAt(i) < '0' || idCard.charAt(i) > '9')
          return false;
      }
    } else {
      for (var i = 0; i < 18; i++) {
        if (i == 17 && (idCard.charAt(i) == 'x' || idCard.charAt(i) == 'X'))
          break;
        if (idCard.charAt(i) < '0' || idCard.charAt(i) > '9')
          return false;
      }
      var c = utils.valid.getVerifyBit(idCard);
      if (c != null) {
        var ce = idCard.substring(17, 18);
        if (c != ce)
          return false;
      }
    }
    return true;
  },
  getVerifyBit(idNo) {
    var id = ""
    id = idNo
    if(idNo == undefined){
      idNo = ""
    }
    if (id == null || id.length != 18)
      return null;
    var result = null;
    var ai = [];
    for (var i = 0; i < 18; i++) {
      var a = id.substring(i, i + 1);
      ai[i] = 0;
      if ("X" == a.toUpperCase())
        ai[i] = 10;
      else
        ai[i] = a;
    }
    var nNum = ai[0] * 7 + ai[1] * 9 + ai[2] * 10 + ai[3] * 5 + ai[4] * 8 + ai[5] * 4 + ai[6] * 2 + ai[7] * 1
        + ai[8] * 6 + ai[9] * 3 + ai[10] * 7 + ai[11] * 9 + ai[12] * 10 + ai[13] * 5 + ai[14] * 8 + ai[15] * 4
        + ai[16] * 2;
    nNum = nNum % 11;
    switch (nNum) {
    case 0:
      result = "1";
      break;
    case 1:
      result = "0";
      break;
    case 2:
      result = "X";
      break;
    case 3:
      result = "9";
      break;
    case 4:
      result = "8";
      break;
    case 5:
      result = "7";
      break;
    case 6:
      result = "6";
      break;
    case 7:
      result = "5";
      break;
    case 8:
      result = "4";
      break;
    case 9:
      result = "3";
      break;
    case 10:
      result = "2";
      break;
    }
    return result;
  },
  getCardItem(code){
    if(code != undefined && code != ""){
      if (cardTypeList != undefined && cardTypeList !="") {
       for (var i = 0; i < cardTypeList.dict_cardtype.item.length; i++) {
            if(cardTypeList.dict_cardtype.item[i].code == code){
              return cardTypeList.dict_cardtype.item[i]
            }
        }
      }
    }
  },
  getNationalItem(code){
    if(code != undefined && code != ""){
      if (nationalList != undefined && nationalList !="") {
       for (var i = 0; i < nationalList.national.item.length; i++) {
          if(nationalList.national.item[i].code == code){
            return nationalList.national.item[i]
          }
        }
      }
    }
  },
  getAge(value){
    const birthday = new Date(value)
    const now = new Date()
    let age = now.getFullYear()-birthday.getFullYear()-1
    if(now.getMonth()-birthday.getMonth()>0){
      age++
    }else if(now.getMonth()==birthday.getMonth()>0 && now.getDate()-birthday.getDate()>=0){
      age++
    }
    return age
  },
}
export default valid
