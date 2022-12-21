<template>
	<div class="add-panel">
		<router-link :to="{ name: 'addIncome'}">
			<div class="income addBtn">+</div>
		</router-link>
		<router-link :to="{ name: 'addExpense'}">
			<div class="expense addBtn">-</div>
		</router-link>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.add-panel {
	padding: 20px 0 0 0;
	grid-area: add-panel;
	width: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;

	.addBtn {
		margin: 20px 0 0 0;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		font-size: 24px;
		display: flex;
		align-items: center;
		cursor: pointer;
		box-shadow: 0 0 7px rgb(100, 100, 100);
		transition-duration: 0.4s;

		&:hover {
			box-shadow: 0 0 12px rgb(100, 100, 100);
			width: 56px;
			height: 56px;
		}
	}

	.income {
		background-color: #12e05b;
		padding-left: 23px;
		position: absolute;
		top: 270px;
		left: 0px;

		&:hover {
			padding-left: 21px;
			top: 272px;
			left: 2px;
		}
	}

	.expense {
		background-color: #e22424;
		padding-left: 25px;
		position: absolute;
		top: 360px;
		left: 0px;

		&:hover {
			padding-left: 23px;
			top: 362px;
			left: 2px;
		}
	}
}
</style>