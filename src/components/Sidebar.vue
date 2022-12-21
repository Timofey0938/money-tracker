<template>
  <aside 
    class="sidebar" 
    :class="{'hover': isHover}"
    @mouseover="setHover" 
    @mouseleave="unsetHover"
    @click="unsetHover"
    >
		<router-link
			v-for="item in menu"
			:key="item.name"
			:to="item.component"
		>
			<div class="item">
				<span class="material-icons">{{ item.icon }}</span>
				<span class="item-name" v-if="isVisible">{{ item.name }}</span>
			</div>
			
		</router-link>
  </aside>
</template>

<script>
export default {
	data: () => ({
		menu: [
			{ name: 'Счета', icon: 'view_list', component: {name: 'accounts'} },
			{ name: 'Категории', icon: 'category', component: {name: 'categories' } },
			{ name: 'История', icon: 'history', component: {name: 'history' } },
			{ name: 'Аналитика', icon: 'donut_small', component: {name: 'analitics' } },
			{ name: 'Планирование', icon: 'rate_review', component: {name: 'planning' } }
		],
		isHover: false,
		isVisible: false
	}),
	methods: {
		setHover() {
			this.isHover = true;

		},
		unsetHover() {
			this.isHover = false;
		}
	},
	watch: {
		isHover() {
			if (this.isHover) {
				setTimeout(() => {
					if (this.isHover) {
						this.isVisible = true
					}
				}, 800);
			} else {
				this.isVisible = false
			}
				
		}
	}
}
</script>

<style lang="scss" scoped>
.sidebar {
	height: 100%;
	width: 70px;
	background-color: rgb(61, 61, 61);
	border-right: 2px solid #2B2B2B;
	grid-area: sidebar;
	transition-duration: 0.4s;
	transition-timing-function: ease-out;
	z-index: 1;

	.item {
		width: 100%;
		height: 70px;
		padding: 15px;
		border-bottom: 2px solid #2B2B2B;
		cursor: pointer;
		display: flex;

		&:hover {
			background-color: #2B2B2B;
			transition-duration: 0.2s;
		}

		.material-icons {
			font-size: 36px; 
			color: #eee;
			flex: 0 0 70px;
		}

		.item-name {
			font-size: 24px;
			font-family: Arial, Helvetica, sans-serif;
			color: #eee;
		}
	}
}

.item:hover .material-icons{
    color: #1ED760;
    transition-duration: 0.2s;
}

.hover {
    width: 300px;
    transition-delay: 0.5s;
}
</style>