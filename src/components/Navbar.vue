<template>
  <nav class="nav">
		<span class="logo">accounter</span>
		<div class="account-info" @mouseleave="shrink">
			<span class="amount">{{ total }} ₽</span>
			<div class="profile-info">
				<div class="avatar"></div>
				<div class="drop-down-button" @click="toggle">
					<span class="user-name">{{ userName }}</span>
					<span class="material-icons">arrow_drop_down</span>
				</div>
			</div>
			<div class="drop-down" v-if="extended">
				<!-- <div class="drop-down-item">
					<router-link :to="{ name: 'profile'}" @click.prevent="shrink">Профиль</router-link>
				</div> -->
				<div class="drop-down-item">
					<a @click="logout">Выйти</a>
				</div>
			</div>
		</div>
  </nav>
</template>

<script>
export default {
	name: 'navbar',
	props: {
		total: Number
	},
	data: () => ({
		extended: false
	}),
	computed: {
		userName() {
			return this.$store.getters.info.userName
		}
	},
	methods: {
		toggle() {
			this.extended = !this.extended
		},
		shrink() {
			this.extended = false
		},
		async logout() {
			await this.$store.dispatch('logout')
			this.$router.push({ name: 'login' })
		}
	}
}
</script>

<style lang="scss" scoped>
.nav {
	height: 90px;
	width: 100%;
	background-color: #2B2B2B;
	padding: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 24px;
	color: #eee;
	grid-area: nav;

	.logo {
	text-transform: uppercase;
	font-size: 36px;
	font-weight: 700;
	color: #1ED760;
	font-family: 'Arvo', serif;
	}

	.account-info {
		width: 350px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.profile-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.avatar {
		width: 40px;
		height: 40px;
		margin: 0 15px 0 0;
		border-radius: 50%;
		background-color: #eee;
	}

	.drop-down-button {
		cursor: pointer;
		transition-duration: 0.2s;

		&:hover {
			color: #1ED760;
		}
	}

	.user-name {
		margin: 0 10px 0 0;
	}

	.drop-down {
		width: 200px;
		height: 85px;
		padding: 25px 0 0 0;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 40px;
		right: 0;
		background-color: #2B2B2B;
		box-shadow: 0 5px 15px #2B2B2B;
		z-index: 1;
	}

	.drop-down-item {
		width: 100%;
		height: 60px;
		padding: 15px 40px 30px 40px;
		cursor: pointer;
		transition-duration: 0.2s;

		&:hover {
			background-color: rgb(78, 78, 78);
		}
	}

}
</style>