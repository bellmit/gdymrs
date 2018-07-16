 import axios from 'axios'
import cache from './cache'
import format from './format'
import store from '../vuex/store'
import { MessageBox } from 'mint-ui'

let instance = axios.create({
  method: 'post',
  timeout: 50000,
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': ''
    }
  }
})

function showError() {
  store.commit('SHOWLOADING', {
    showLoding: false
  })
  store.commit('TOGGLE_TOAST', {
    toast: true,
    toastMsg: '网络异常,请检查网络'
  })
};

/*请求拦截器----request*/
instance.interceptors.request.use(function(config) {
  store.commit('SHOWLOADING', {
    showLoding: true
  })
  let params = {
    "packageList": {
      "packages": {
        "header": {
            "requestType": config.url,
            "comId": globalConfig.comId,
            "from": globalConfig.from,
            "sendTime": new Date().format('yyyy-MM-dd HH:mm:ss'),
            "orderSerial": "orderId",
            "comSerial": "comSerial"
        },
        request: DES3.encrypt('', JSON.stringify(config.data)).replace(/\s/g, "")
      }
    }
  }
  let paramStr = JSON.stringify(params)
  let sign = hex_hmac_md5(globalConfig.transfer, paramStr)
  config.url = globalConfig.rootUrl  + sign + '&com_id=' + globalConfig.comId
  config.data = paramStr
  return config
}, error => {
  store.commit('TOGGLE_TOAST', {
    toast: true,
    toastMsg: '发送请求失败！'
  })
  /*return Promise.reject({
    // isLogicError: false,
    errorMessage: "网络异常,请检查网络"
  })*/
  /*store.commit('SHOWLOADING', {
    showTimeout: true
  })*/
  utils.ui.modal.afterOpen()
  MessageBox({
    title: '提示',
    message: '网络异常,请检查网络！'
  }).then(() => {
    utils.ui.modal.beforeClose()
  })
})

/*返回拦截器----response*/
instance.interceptors.response.use(function(response) {
  store.commit('HIDELOADING', {
    loading: true
  })
  try {
    // response.data.packageList.packages.response = JSON.parse(DES3.decrypt('', response.data.packageList.packages.response).replace(/(\\)*"/g, '"').replace(/"{/g, '{').replace(/}"/g, '}'))
    response.data.packageList.packages.response = JSON.parse(DES3.decrypt('', response.data.packageList.packages.response))
    console.log("%c 返回数据>>>>>>>>>>>>>>>>>>>>>>>>>>>>", 'color:green', JSON.parse(JSON.stringify(response)))
  } catch (e) {
    utils.ui.modal.afterOpen()
    MessageBox({
      title:'提示',
      message:'系统异常，请稍后重试！'
    }).then(() => {
      utils.ui.modal.beforeClose()
    })
  return
  }
  response.data = response.data.packageList.packages;
  return response
}, error => {
  store.commit('HIDELOADING', {
    loading: true
  })

  let errMsg = ''+error
  console.log(errMsg)
  console.log(error)
  if(errMsg.indexOf('timeout') != -1 || errMsg.indexOf('Network') != -1){
    utils.ui.modal.afterOpen()
    MessageBox({
      title: '提示',
      message: '网络超时,请检查网络！'
    }).then(() => {
      utils.ui.modal.beforeClose()
    })
  }else if(errMsg.indexOf('404') != -1 || errMsg.indexOf('500') != -1 || errMsg.indexOf('503') != -1){
    utils.ui.modal.afterOpen()
    MessageBox({
      title: '提示',
      message: '系统繁忙，请稍后重试！'
    }).then(() => {
      utils.ui.modal.beforeClose()
    })
  }
})
export default {
  axios: axios,
  post(service, params) {
    console.log("%c 请求数据>>>>>>>", 'color:green', JSON.parse(JSON.stringify(params)))
    return instance.post(service, params)
  },
  postFast(service ,params,success){
    utils.http.post(service,params).then(response => {
      let data = response.data.response
      let projectHead = response.data.header
      console.log("%c 数据>>>>>>>", 'color:green', data)
      if(projectHead.responseCode != 0){
        MessageBox({
          title: '提示',
          message: projectHead.errorMessage
        });
      }else if(projectHead.responseCode == 0){
        
        //此处返回为response部分
        success(data)
      }
    }).catch(error => {
      console.log('系统异常，请联系管理员!' + error)
      // alert('系统异常，请联系管理员!')
	  	// MessageBox({
      //   title: '提示',
      //   message: '系统异常，请联系管理员!'
      // });
    })
  }
}
