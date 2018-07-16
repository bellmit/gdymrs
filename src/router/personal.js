export default[{
	name: 'personal',
	path: '/personal',
	component(r) {
		require.ensure([], () => r(require('../components/personal/personal.vue')), 'personal')
	},
	children:[{
		name: 'personalInfo',
		path: 'personalInfo',
		component(r){
			require.ensure([], () => r(require('../components/personal/personalInfo.vue')), 'personalInfo')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	}]
}]