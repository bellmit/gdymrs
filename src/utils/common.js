import utils from "./index";
import informList_ZJ from'../../static/dict/policy_inform_zj.json'
import informList_YB from'../../static/dict/policy_inform_yb.json'

const common = {
	getArrIndex:(array,str)=>{
		let index = ''
		for(var i=0;i<array.length;i++){
  			let item = array[i]
  			if (item == str) {
  				index = i
  				break
  			}
  		}
		return index
	},
  //获取登陆代理人缓存信息key值
  getAgentKey:()=>{
    return 'personsal'
  },
  //获取当前代理人所销售保险产品列表的缓存信息key值
  getProductsKey: () => {
    return 'tag_products'
  },
  getAge:(birthdays)=> {
    const birthday = new Date(birthdays)
    const now = new Date()
    let age = now.getFullYear()-birthday.getFullYear()-1
    if(now.getMonth()-birthday.getMonth()>0){
      age++
    }else if(now.getMonth()==birthday.getMonth()>0 && now.getDate()-birthday.getDate()>=0){
      age++
    }
    return age;
  },
  filtersInformList:(edition,insured)=>{
    let informList = []
    let tempInformList = []
    if (edition == '1') {//银保
        informList = informList_YB
    }else if (edition == '2') {//综金
        informList = informList_ZJ
    }
    for (var i = 0; i < informList.length; i++) {
      let visible = informList[i].visible
      if (visible != undefined) {
        console.log(visible)
        let visibleArr = visible.split('|')
        var expression = visibleArr[1]
        if (visibleArr[0] == 'GENDERCODE') {
          if (expression == 'eq') {
            if (insured.gender == visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          }
        }
        if (visibleArr[0] == 'AGE') {
          let age = utils.common.getAge(insured.birthday)
          if (expression == 'eq') {
            if (age == visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'gt') {//gt大于
            if (age > visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'lt') {//lt小于
            if (age < visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'ge') {//ge大于等于
            if (age >= visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'le') {//le小于等于
            if (age <= visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          }
        }
      } else {
        tempInformList.push(informList[i])
      }
    }
    return tempInformList;
  },
  filtersInformList2:(edition,insured,informList_YB_1,informList_ZJ_1)=>{
    let informList = []
    let tempInformList = []
    if (edition == '1') {//银保
        informList = informList_YB_1
    }else if (edition == '2') {//综金
        informList = informList_ZJ_1
    }
    for (var i = 0; i < informList.length; i++) {
      let visible = informList[i].visible
      if (visible != undefined) {
        console.log(visible)
        let visibleArr = visible.split('|')
        var expression = visibleArr[1]
        if (visibleArr[0] == 'GENDERCODE') {
          if (expression == 'eq') {
            if (insured.gender == visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          }
        }
        if (visibleArr[0] == 'AGE') {
          let age = utils.common.getAge(insured.birthday)
          if (expression == 'eq') {
            if (age == visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'gt') {//gt大于
            if (age > visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'lt') {//lt小于
            if (age < visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'ge') {//ge大于等于
            if (age >= visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'le') {//le小于等于
            if (age <= visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          }
        }
      } else {
        tempInformList.push(informList[i])
      }
    }
    return tempInformList;
  }
}
export default common
