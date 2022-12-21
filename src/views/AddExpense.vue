<template>
  <div class="page">
    <h1 class="title">Добавить расход</h1>
    <form @submit.prevent="addExpense">
      <div class="choose-category" @click="toggleCategories">
          <span class="material-icons">{{categoryIcon}}</span>
          <span class="category-name">{{categoryName}}</span>
          <span class="material-icons">arrow_drop_down</span>
        </div>
        <div class="category-list" v-if="categoriesOpened">
          <div class="category" 
              v-for="category in categories" 
              :key="category" 
              @click="switchCategory(category)"
          >
            <span class="material-icons">{{category.img}}</span>
            <span class="category-name">{{category.name}}</span>
          </div>
        </div>
      <div class="row">
        <input type="number" class="amount-input" placeholder="Сумма" maxlength="6" v-model="amount">
        <div class="choose-account" @click="toggleAccounts">
          <span class="material-icons">{{accountIcon}}</span>
          <span class="account-name">{{accountName}}</span>
          <span class="material-icons">arrow_drop_down</span>
        </div>
        <div class="account-list" v-if="accountsOpened">
          <div class="account" 
              v-for="account in accounts" 
              :key="account.name" 
              @click="switchAccount(account)"
          >
            <span class="material-icons">{{account.img}}</span>
            <span class="account-name">{{account.name}}</span>
          </div>
        </div>
      </div>
      <input type="text" class="comment-input" placeholder="Комментарий" maxlength="32" v-model="comment">
      <input type="date" class="date-input" v-model="date">
      <span class="error" v-if="error != null">{{error}}</span>
      <button type="submit">Добавить</button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import formatDate from '../utils/formatDate'

export default {
  name: 'addExpense',
  data: () => ({
    categories: [],
    categoriesOpened: false,
    categoryIcon: 'home',
    categoryName: 'Категория',
    accounts: [
      {name: 'Наличные', img: 'account_balance_wallet'},
      {name: 'Карта', img: 'credit_card'}
    ],
    accountsOpened: false,
    accountIcon: 'credit_card',
    accountName: 'Карта',
    amount: 0,
    comment: '',
    date: new Date().toDateString(),
    error: null
  }),
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    toggleCategories() {
      this.categoriesOpened = !this.categoriesOpened
    },
    switchCategory(category) {
      this.categoryIcon = category.img
      this.categoryName = category.name
      this.categoriesOpened = false
    },
    toggleAccounts() {
      this.accountsOpened = !this.accountsOpened
    },
    switchAccount(account) {
      this.accountIcon = account.img
      this.accountName = account.name
      this.accountsOpened = false
    },
    async addExpense() {
      if (this.categoryName === 'Категория') {
        this.error = 'Выберите категорию'
        return
      }

      if (this.amount < 0) {
        this.error = 'Сумма не может быть отрицательной'
        return
      }

      if (this.amount > 999999) {
        this.error = 'Слишком большая сумма'
        return
      }

      if (this.accountName === 'Карта') {
        if (this.amount > this.info.card) {
          this.error = 'Недостаточно средств на счете'
          return
        }
      } else {
        if (this.amount > this.info.cash) {
          this.error = 'Недостаточно средств на счете'
          return
        }
      }

      if (this.amount == 0) {
        this.error = 'Укажите сумму'
        return
      }
      
      if (this.date > formatDate(new Date())) {
        this.error = 'Вы не можете вносить записи на будущее'
        return
      }

      const expenseData = {
        categoryIcon: this.categoryIcon,
        categoryName: this.categoryName,
        accountName: this.accountName,
        accountIcon: this.accountIcon,
        amount: -this.amount,
        comment: this.comment,
        date: this.date
      }

      try {
        await this.$store.dispatch('addRecord', expenseData)
        const total = parseInt(this.info.total) - parseInt(this.amount)
        if (this.accountName === 'Карта') {
          const card = parseInt(this.info.card) - parseInt(this.amount)
          await this.$store.dispatch('updateInfo', {total, card})
        } else {
          const cash = parseInt(this.info.cash) - parseInt(this.amount)
          await this.$store.dispatch('updateInfo', {total, cash})
        }
      } catch (e) {}

      this.categoryIcon = 'home'
      this.categoryName = 'Категория'
      this.amount = 0
      this.comment = ''
      this.error = null

      this.$emit('updateTotal')
    }
  },
  async mounted() {
    this.date = formatDate(new Date())
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
    } catch (e) {}
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    position: relative;

    .choose-category {
      display: flex;
      align-items: center;
      cursor: pointer;

      .material-icons {
        font-size: 30px;
      }

      .category-name {
        margin-left: 5px;
        font-size: 20px;
      }
    }

    .category-list {
      height: 300px;
      width: 290px;
      background-color: #eee;
      border: 1px solid #000;
      border-radius: 10px;
      box-shadow: 0 7px 14px #2B2B2B;
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 45px;
      left: 0;
      z-index: 1;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 10px;
        background-color: #f9f9fd;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgb(109, 109, 109);
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
        border-radius: 10px;
        border: 1px solid #2B2B2B;;
        background-color: #f9f9fd;
      }

      .category {
        padding: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:hover {
          background-color: rgb(212, 212, 212);
        }

        .material-icons {
          font-size: 30px;
        }

        .category-name {
          font-size: 20px;
          margin-left: 10px;
        }
      }
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      width: 400px;

      .amount-input {
        height: 35px;
        width: 100px;
      }

      .choose-account {
        display: flex;
        align-items: center;
        cursor: pointer;

        .material-icons {
          font-size: 30px;
        }

        .account-name {
          margin-left: 5px;
          font-size: 20px;
        }
      }

      .account-list {
        height: 80px;
        width: 160px;
        background-color: #eee;
        border: 1px solid #000;
        border-radius: 10px;
        box-shadow: 0 7px 14px #2B2B2B;
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 80px;
        right: 0;
        z-index: 1;

        .account {
          padding: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;

          &:hover {
            background-color: rgb(212, 212, 212);
            border-radius: 10px;
          }

          .material-icons {
            font-size: 30px;
          }

          .account-name {
            font-size: 20px;
            margin-left: 10px;
          }
        }
      }
    }

    input {
      border-radius: 5px;
      border: 2px solid rgb(158, 158, 158);
      padding: 5px;
      font-size: 16px;
    }

    .comment-input {
      height: 45px;
      width: 400px;
      margin-top: 10px;
    }

    .date-input {
      height: 45px;
      margin-top: 10px;
    }

    button {
      width: 400px;
      height: 60px;
      border-radius: 5px;
      background-color: #1ED760;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 15px;

      &:hover {
        background-color: #58e088;
      }
    }
  }
}
</style>