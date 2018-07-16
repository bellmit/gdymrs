export default [{
	name: 'proposal',
	path: '/proposal',
	component(r) {
		require.ensure([], () => r(require('../components/proposal/Proposal.vue')), 'proposal')
	},
	children:[
		{
		name: 'proposalList',
		path: 'list',
		component(r){
			require.ensure([], () => r(require('../components/proposal/ProposalList.vue')), 'proposalList')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
	{
		name: 'addProduct',
		path: 'addProduct',
		component(r){
			require.ensure([], () => r(require('../components/proposal/AddProduct.vue')), 'addProduct')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
	{
		name: 'proposalConfig',
		path: 'config/:planId',
		component(r){
			require.ensure([], () => r(require('../components/proposal/ProposalConfig.vue')), 'proposalConfig')
		},
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'proposalDemo',
		path: 'demo/:planId',
		component(r){
			require.ensure([], () => r(require('../components/proposal/ProposalDemo.vue')), 'proposalDemo')
		},
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'proposalShare',
		path: 'share/:planId',
		component(r){
			require.ensure([], () => r(require('../components/proposal/ProposalShare.vue')), 'proposalDemoShare')
		},
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		}
	}]
}]