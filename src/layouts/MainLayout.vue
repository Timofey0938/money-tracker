<template>
	<div class="main-layout">
		<Navbar :total="total" />            
		<Sidebar />
		<div class="content">
			<router-view @updateTotal="updateTotal" />
		</div>
		<AddPanel />
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import AddPanel from '@/components/AddPanel'

export default {
	name: 'MainLayout',
	components: {
		Navbar, Sidebar, AddPanel
	},
	data: () => ({
		total: 0
	}),
	 computed: {
		...mapGetters(['info'])
	},
	methods: {
		async setTotal() {
			await this.$store.dispatch('fetchInfo')
			this.total = this.info.total
		},
		updateTotal() {
			this.setTotal()
		}
	},
	async mounted() {
		if (!Object.keys(this.$store.getters.info).length) {
			await this.$store.dispatch('fetchInfo')
			this.setTotal()
		}
	}
}
</script>

<style lang="scss" scoped>
.main-layout {
	width: 100vw;
	height: 100vh;
	background-color: #eee;
	display: grid;
	grid-template-columns: 70px 1fr 100px;
	grid-template-rows: 90px 1fr;
	grid-template-areas: 
	"nav nav nav"
	"sidebar content add-panel";

	.content {
		grid-area: content;
		padding: 40px 100px 0 300px;
	}
}
</style>