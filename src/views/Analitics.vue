<template>
  <div class="page">
    <h1 class="title">Аналитика</h1>
    <div class="general-statistic">
      <div class="info">
        <div>Заработано: <span class="income">{{monthIncome}}</span> ₽</div>
        <div>Потрачено: <span class="expense">{{monthExpense}}</span> ₽</div>
        <div class="mt-20">Расходы по категориям:</div>
      </div>
      <div class="selectors">
        <div>
          <select class="select" v-model="currentMonth" @change="update">
            <option value="0" :selected="currentMonth === '0'">Январь</option>
            <option value="1" :selected="currentMonth === '1'">Февраль</option>
            <option value="2" :selected="currentMonth === '2'">Март</option>
            <option value="3" :selected="currentMonth === '3'">Апрель</option>
            <option value="4" :selected="currentMonth === '4'">Май</option>
            <option value="5" :selected="currentMonth === '5'">Июнь</option>
            <option value="6" :selected="currentMonth === '6'">Июль</option>
            <option value="7" :selected="currentMonth === '7'">Август</option>
            <option value="8" :selected="currentMonth === '8'">Сентябрь</option>
            <option value="9" :selected="currentMonth === '9'">Октябрь</option>
            <option value="10" :selected="currentMonth === '10'">Ноябрь</option>
            <option value="11" :selected="currentMonth === '11'">Декабрь</option>
          </select>
        </div>
        <div>
          <select class="select" v-model="currentYear" @change="update">
            <option value="2021" :selected="currentYear === '2021'">2021</option>
            <option value="2020" :selected="currentYear === '2020'">2020</option>
            <option value="2019" :selected="currentYear === '2019'">2019</option>
            <option value="2018" :selected="currentYear === '2018'">2018</option>
          </select>
        </div>
      </div>
    </div>
    <div class="category-list">
      <div class="category" v-for="category in categories" :key="category.name">
        <div class="category-info">
          <span class="material-icons">{{ category.img }}</span>
          <span class="category-name">{{ category.name }}</span>
          <div class="diagram">
            <div class="percent-diagram" :style="category.width"></div>
            <div class="percent">{{category.percent}}%</div>
          </div>
        </div>
        <div class="category-amount">{{ category.amount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'analitics',
  data: () => ({
    currentMonth: '',
    currentYear: '',
    monthIncome: 0,
    monthExpense: 0,
    categories: []
  }),
  methods: {
    update() {
      this.monthIncome = 0
      this.monthExpense = 0

      this.categories.forEach(category => {
        category.amount = 0
        
        this.records.forEach(record => {
          if (record.categoryName === category.name 
            && new Date(record.date).getMonth() === +this.currentMonth
            && new Date(record.date).getFullYear() === +this.currentYear) {
            if (record.amount < 0) {
              category.amount += -record.amount
            }
          }
        })
      })

      this.records.forEach(record => {
        if (new Date(record.date).getMonth() === +this.currentMonth 
        && new Date(record.date).getFullYear() === +this.currentYear) {
          if (record.amount > 0) {
            this.monthIncome += +record.amount
          } else {
            this.monthExpense += -record.amount
          }
        }
      })

      this.categories.forEach(category => {
        if (this.monthExpense === 0 || category.amount === 0) {
          category.percent = 0
        } else {
          category.percent = Math.floor((+category.amount / this.monthExpense * 100) * 10) / 10
        }
        category.width = `width: ${Math.ceil(category.percent) * 2.5}px`
      })

      this.categories.sort((prev, next) => next.percent - prev.percent)
    }
  },
  async mounted() {
    this.currentMonth = new Date().getMonth()
    this.currentYear = new Date().getFullYear()
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.records = await this.$store.dispatch('fetchRecords')
    } catch (e) {}
    this.update()
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 700px;

  .general-statistic {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .info {
      font-size: 25px;

      .income {
        color: green;
      }

      .expense {
        color: red;
      }

      .mt-20 {
        margin-top: 20px;
      }
    }

    .selectors {
      text-align: right;

      .select {
        height: 40px;
        border-radius: 5px;
        border: 2px solid rgb(158, 158, 158);
        margin-bottom: 5px;
        font-size: 20px;
      }
    }
  }

  .category-list {
    height: 250px;
    flex-basis: 300px;
    flex-shrink: 1;
    flex-grow: 1;
    overflow-y: scroll;
    overflow-x: hidden;

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
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      width: 650px;
      position: relative;

      .category-info {
        display: flex;
        align-items: center;

        .material-icons {
          font-size: 40px;
          color: #2B2B2B;
        }

        .category-name {
          width: 200px;
          word-wrap: break-word;
          font-size: 25px;
          margin-left: 10px;
        }

        .diagram {
          display: flex;
          align-items: center;

          .percent-diagram {
            margin-left: 20px;
            height: 40px;
            background-color: rgb(59, 175, 55);
          }

          .percent {
            font-size: 18px;
            margin-left: 5px;
          }
        }
      }

      .category-amount {
          font-size: 20px;
        }
    }
  }
}
</style>