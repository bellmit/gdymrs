export default [{
    name: 'policy',
    path: '/policy',
    component(r) {
      require.ensure([], () => r(require('../components/policy/Policy.vue')), 'policy')
    },
    children:[{
      name: 'product_list_page',
      path: 'list',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/ProductListPage.vue')), 'product_list_page')
      }
    },
    {
      name: 'product_details_page',
      path: 'product/:planId',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/ProductDetailsPage.vue')), 'product_details_page')
      }
    }, {
      name: 'customer_details_page',
      path: 'details/:planId',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/CustomerDetailsPage.vue')), 'customer_details_page')
      }
    }, 
    {
      name: 'electronics_policy_page',
      path: 'electronics/:planId/:applyCode',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/ElectronicsPolicyPage.vue')), 'electronics_policy_page')
      }
    }, {
      name: 'ElectronicsYinBaoPolicyPage',
      path: 'electronicsYinBao/:planId/:applyCode',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/ElectronicsYinBaoPolicyPage.vue')), 'ElectronicsYinBaoPolicyPage')
      }
    }, {
      name: 'electronics_policy_share_page',
      path: 'electronics_share/:planId/:applyCode/:index/:result/:resultmsg',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/ElectronicsPolicySharePage.vue')), 'electronics_policy_share_page')
      }
    },
    {
      name: 'electronics_yinbao_policy_share_page',
      path: 'electronics_yinbao_share/:planId/:applyCode/:index/:result/:resultmsg',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/ElectronicsYinBaoPolicySharePage.vue')), 'electronics_yinbao_policy_share_page')
      }
    },
    {
      name: 'inform_page',
      path: 'inform/:planId',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/InformPage.vue')), 'inform_page')
      }
    },{
      name: 'inform_app_page',
      path: 'inform_app/:planId',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/InformAppPage.vue')), 'inform_app_page')
      }
    },{
      name: 'payment_page',
      path: 'payment',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/PaymentPage.vue')), 'payment_page')
      }
    }, {
      name: 'questionnaire_page',
      path: 'questionnaire/:planId',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/QuestionnairePage.vue')), 'questionnaire_page')
      }
    },{
      name: 'questionnaire_page_nb',
      path: 'questionnaire_nb/:planId',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/QuestionnairePageNB.vue')), 'questionnaire_page_nb')
      }
    },{
      name: 'questionnaire_page_sh',
      path: 'questionnaire_sh/:planId',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/QuestionnairePageSH.vue')), 'questionnaire_page_sh')
      }
    },
    {
      name: 'salesman_report_page',
      path: 'salesman/:planId',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader: false
      },
      component(r) {
        require.ensure([], () => r(require('../components/policy/SalesmanReportPage.vue')), 'salesman_report_page')
      }
    }
 ,
   {
     name: 'audioAndVideoNoNewTypeProductBook',
     path: 'audioAndVideoNoNewTypeProductBook',
     meta: {
       login: false,
       hasFooter: false,
       hasTabs: false,
       hasHeader: false
     },
     component(r) {
       require.ensure([], () => r(require('../components/policy/productBook/audioAndVideoNoNewTypeProductBook.vue')), 'audioAndVideoNoNewTypeProductBook')
   }
 },
 {
    name: 'audioAndVideoDividendTypeProductBook',
    path: 'audioAndVideoDividendTypeProductBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/audioAndVideoDividendTypeProductBook.vue')), 'audioAndVideoDividendTypeProductBook')
   }
 },
 {
    name: 'audioAndVideoLinkTypeProductBook',
    path: 'audioAndVideoLinkTypeProductBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/audioAndVideoLinkTypeProductBook.vue')), 'audioAndVideoLinkTypeProductBook')
   }
  },
  {
    name: 'audioAndVideoUniversalTypeProductBook',
    path: 'audioAndVideoUniversalTypeProductBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/audioAndVideoUniversalTypeProductBook.vue')), 'audioAndVideoUniversalTypeProductBook')
   }
  },
  {
    name: 'olderCustomerInsuranceSpecialBook',
    path: 'olderCustomerInsuranceSpecialBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/olderCustomerInsuranceSpecialBook.vue')), 'olderCustomerInsuranceSpecialBook')
   }
  },
  {
    name: 'shenZhenAlertBook',
    path: 'shenZhenAlertBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/shenZhenAlertBook.vue')),'shenZhenAlertBook')
   }
  },
  {
    name: 'doubleEntryAllTypeProductBook',
    path: 'doubleEntryAllTypeProductBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/doubleEntryAllTypeProductBook.vue')),'doubleEntryAllTypeProductBook')
   }
  },
  {
    name: 'doubleEntryDividendTypeProductBook',
    path: 'doubleEntryDividendTypeProductBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/doubleEntryDividendTypeProductBook.vue')),'doubleEntryDividendTypeProductBook')
   }
  },
  {
    name: 'doubleEntryLinkTypeProductBook',
    path: 'doubleEntryLinkTypeProductBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/doubleEntryLinkTypeProductBook.vue')),'doubleEntryLinkTypeProductBook')
   }
  },
  {
    name: 'doubleEntryUniversalTypeProductBook',
    path: 'doubleEntryUniversalTypeProductBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/doubleEntryUniversalTypeProductBook.vue')),'doubleEntryUniversalTypeProductBook')
   }
  },
  {
    name: 'insuranceSpecialNoteBook',
    path: 'insuranceSpecialNoteBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/insuranceSpecialNoteBook.vue')),'insuranceSpecialNoteBook')
   }
  },
  {
    name: 'dl_self_hold_entry_all',
    path: 'dl_self_hold_entry_all',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/dl_self_hold_entry_all.vue')),'dl_self_hold_entry_all')
   }
  },
  {
    name: 'dl_self_hold_entry_dividend',
    path: 'dl_self_hold_entry_dividend',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/dl_self_hold_entry_dividend.vue')),'dl_self_hold_entry_dividend')
   }
  },
  {
    name: 'dl_self_hold_entry_link',
    path: 'dl_self_hold_entry_link',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/dl_self_hold_entry_link.vue')),'dl_self_hold_entry_link')
   }
  },
  {
    name: 'dl_self_hold_entry_universal',
    path: 'dl_self_hold_entry_universal',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/dl_self_hold_entry_universal.vue')),'dl_self_hold_entry_universal')
   }
  },
  {
    name: 'compensatePrompt',
    path: 'compensatePrompt',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/compensatePrompt.vue')),'compensatePrompt')
   }
  },
  {
    name: 'personalInsuranceBook',
    path: 'personalInsuranceBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/personalInsuranceBook.vue')),'personalInsuranceBook')
   }
  },
  {
    name: 'cqSurveyBook',
    path: 'cqSurveyBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/cqSurveyBook.vue')),'cqSurveyBook')
   }
  },
  {
    name: 'responsibilityConfirm',
    path: 'responsibilityConfirm',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm.vue')),'responsibilityConfirm')
   }
  },
  {
    name: 'responsibilityConfirm_2011801',
    path: 'responsibilityConfirm_2011801',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2011801.vue')),'responsibilityConfirm_2011801')
   }
  },
  {
    name: 'responsibilityConfirm_2012101',
    path: 'responsibilityConfirm_2012101',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2012101.vue')),'responsibilityConfirm_2012101')
   }
  },
  {
    name: 'responsibilityConfirm_2012201',
    path: 'responsibilityConfirm_2012201',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2012201.vue')),'responsibilityConfirm_2012201')
   }
  }, 
  {
    name: 'responsibilityConfirm_2012301',
    path: 'responsibilityConfirm_2012301',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2012301.vue')),'responsibilityConfirm_2012301')
   }
  }, 
  {
    name: 'responsibilityConfirm_2012501',
    path: 'responsibilityConfirm_2012501',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2012501.vue')),'responsibilityConfirm_2012501')
   }
  },
  {
    name: 'responsibilityConfirm_2012801',
    path: 'responsibilityConfirm_2012801',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2012801.vue')),'responsibilityConfirm_2012801')
   }
  },
  {
    name: 'responsibilityConfirm_2012901',
    path: 'responsibilityConfirm_2012901',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2012901.vue')),'responsibilityConfirm_2012901')
   }
  },
  {
    name: 'responsibilityConfirm_2013001',
    path: 'responsibilityConfirm_2013001',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2013001.vue')),'responsibilityConfirm_2013001')
   }
  },
  {
    name: 'responsibilityConfirm_2013101',
    path: 'responsibilityConfirm_2013101',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2013101.vue')),'responsibilityConfirm_2013101')
   }
  }, 
  {
    name: 'responsibilityConfirm_2013201',
    path: 'responsibilityConfirm_2013201',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2013201.vue')),'responsibilityConfirm_2013201')
   }
  },
  {
    name: 'responsibilityConfirm_2013301',
    path: 'responsibilityConfirm_2013301',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2013301.vue')),'responsibilityConfirm_2013301')
   }
  },
  {
    name: 'responsibilityConfirm_2013401',
    path: 'responsibilityConfirm_2013401',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2013401.vue')),'responsibilityConfirm_2013401')
   }
  },
  {
    name: 'responsibilityConfirm_2013501',
    path: 'responsibilityConfirm_2013501',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2013501.vue')),'responsibilityConfirm_2013501')
   }
  },
  {
    name: 'responsibilityConfirm_2013502',
    path: 'responsibilityConfirm_2013502',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2013502.vue')),'responsibilityConfirm_2013502')
   }
  },
  {
    name: 'responsibilityConfirm_2013601',
    path: 'responsibilityConfirm_2013601',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2013601.vue')),'responsibilityConfirm_2013601')
   }
  },
  {
    name: 'responsibilityConfirm_2013701',
    path: 'responsibilityConfirm_2013701',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2013701.vue')),'responsibilityConfirm_2013701')
   }
  },
  {
    name: 'responsibilityConfirm_2013801',
    path: 'responsibilityConfirm_2013801',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2013801.vue')),'responsibilityConfirm_2013801')
   }
  },
  {
    name: 'responsibilityConfirm_2014001',
    path: 'responsibilityConfirm_2014001',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2014001.vue')),'responsibilityConfirm_2014001')
   }
  },
  {
    name: 'responsibilityConfirm_2014301',
    path: 'responsibilityConfirm_2014301',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2014301.vue')),'responsibilityConfirm_2014301')
   }
  },
  {
    name: 'responsibilityConfirm_2014801',
    path: 'responsibilityConfirm_2014801',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/responsibilityConfirm_2014801.vue')),'responsibilityConfirm_2014801')
   }
  },
  {
    name: 'policyPromptBook',
    path: 'policyPromptBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/policyPromptBook.vue')),'policyPromptBook')
   }
  },
  {
    name: 'nbSurveyBook',
    path: 'nbSurveyBook',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader: false
   },
   component(r) {
     require.ensure([], () => r(require('../components/policy/productBook/nbSurveyBook.vue')),'nbSurveyBook')
   }
  },

 ]
}]
