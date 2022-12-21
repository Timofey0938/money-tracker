<template>
  <nav class="nav">
		<span class="logo">accounter</span>
		<router-link class="button" :to="componentName">{{ button }}</router-link>
  </nav>
</template>

<script>
export default {
	name: 'AuthNavbar',
	props: {
		button: String
	},
	computed: {
		componentName() {
			if (this.button === 'Зарегистрироваться') {
				return { name: 'signup'}
			} else {
				return { name: 'login'}
			}
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

	.logo {
	text-transform: uppercase;
	font-size: 36px;
	font-weight: 700;
	color: #1ED760;
	font-family: 'Arvo', serif;
	}

	.button {
		font-size: 24px;
		font-weight: 700;
		color: #eee;
		text-decoration: underline;
		cursor: pointer;

		&:hover {
			color: #1ED760;
		}
	}
}
</style>