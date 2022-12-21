<template>
  <div class="page">
    <h1 class="title">Счета</h1>
    <div class="account" v-for="account in accounts" :key="account.name">
      <div class="main-block">
        <span class="material-icons">{{ account.img }}</span>
        <div class="account-info">
          <span class="account-name">{{ account.name }}</span>
          <input type="number" v-if="account.editing" v-model="amount">
          <span class="account-amount" v-else>{{ account.amount }}</span>
          <div class="error" v-if="error != null && account.editing">{{ error }}</div>
        </div>
      </div>
      <span class="edit material-icons" @click="editAccount(account)"  v-if="account.editing">save</span>
      <span class="edit material-icons" @click="showInput(account)" v-else>edit</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'accounts',
  data: () => ({
    accounts: [
      {
        name: 'Карта',
        amount: 0,
        img: 'credit_card'
      },
      {
        name: 'Наличные',
        amount: 0,
        img: 'account_balance_wallet'
      }
    ],
    amount: 0,
    error: null
  }),
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    showInput(account) {
      let accountEditing = false
      this.accounts.forEach(account => {
        if (account.editing) {
          accountEditing = true
        }
      })

      if (accountEditing) {
        return
      }

      account.editing = true
      this.amount = account.amount
    },
    async editAccount(account) {
      if (this.amount < 0) {
        this.error = 'Сумма на счете не может быть отрицательной'
        return
      }

      if (this.amount > 999999) {
        this.error = 'Слишком большая сумма'
        return
      }

      try {
        if (account.name === 'Карта') {
          const total = parseInt(this.info.cash) + parseInt(this.amount)
          await this.$store.dispatch('updateInfo', {total, card: parseInt(this.amount)})
        } else {
          const total = parseInt(this.info.card) + parseInt(this.amount)
          await this.$store.dispatch('updateInfo', {total, cash: parseInt(this.amount)})
        }
      } catch (e) {}

      account.amount = this.amount
      delete account.editing
      this.error = null

      this.$emit('updateTotal')
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch('fetchInfo')
      const info = this.$store.getters.info
      this.accounts[0].amount = info.card
      this.accounts[1].amount = info.cash
    } catch (e) { }
  }
}
</script>

<style lang="scss" scoped>
.account {
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .main-block {
    display: flex;

    .material-icons {
      font-size: 70px;
    }

    .account-info {
      display: flex;
      flex-direction: column;
      padding: 10px 0 0 0;
      margin: 0 0 0 10px;

      .account-name {
        font-size: 20px;
        font-weight: 500;
        margin: 0 0 5px 0;
      }

      input {
        width: 250px;
        height: 30px;
        border-radius: 5px;
        border: 2px solid rgb(158, 158, 158);
        padding: 5px;
        font-size: 16px;
      }

      .account-amount {
        font-size: 18px;
        font-weight: 700;
      }
    }
  }

  .edit {
    font-size: 30px;
    cursor: pointer;

    &:hover {
      color: rgb(117, 117, 117);
    }
  }
}
</style>