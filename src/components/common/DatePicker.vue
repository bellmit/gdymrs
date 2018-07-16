<template>
	<p ref="picker" class="manage-data-begin">
		<label class="begin">
			{{value}}
		</label>
		<i class="fa fa-calendar"></i>
	</p>
</template>

<script>
import '../../../static/lib/mobiscroll/css/mobiscroll.custom-3.0.0-beta6.min.css'
import '../../../static/lib/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js'
export default {
  name: 'datePicker',
  props: ['value'],
  data() {
    return {
      instance:null,
      inputValue:''
    }
  },
  methods: {
    initPicker(){
      let _this = this
      let instance = this.instance
      let picker = this.$refs.picker
      console.log()
      var options = {
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'bottom',
        buttons: [{
          text: '取消',
          handler: 'cancel',
          icon: 'close'
        }, {
          text: '确定',
          handler: 'set',
          icon: 'checkmark'
        }],
        endYear: (new Date()).getFullYear() + 100,
        dateFormat: 'yy-mm-dd',
        onInit: function(event, inst) {
          instance = inst;
        },
        onSet(value, inst){
          _this.inputValue = value.valueText;
          _this.$emit('input', _this.inputValue)
          _this.$emit('change', _this.inputValue)
        },
        onClear: function() {
          _this.value = '';
        }
      };
      instance = $(picker).mobiscroll();
      instance.date(options);
    }
  },
  mounted(){
    this.initPicker()
  }
}
</script>
<style type="text/css" scoped>
.begin{
  font-size:.7rem;
}
.fa-calendar{
    /*position: absolute;
    top: 5px;
    right: 3px;*/
    color: #FEC134;
}
</style>