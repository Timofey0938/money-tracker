<template>
  <div class="page">
    <h1 class="title">Планирование</h1>
    <div class="category-list">
      <div class="category" v-for="category in categories" :key=category.name>
        <div><span class="category-icon material-icons">{{ category.img }}</span></div>
        <div class="category-name">{{ category.name }}</div>
        <div class="no-limit" v-if="category.limit === 0">
          <div class="limit-input" v-if="category.limitSetting">
            <input type="number" v-model="limit" maxlength="5">
            <div class="error" v-if="error != null">{{ error }}</div>
          </div>
          <div v-else>Нет лимита</div>
          <button v-if="category.limitSetting" @click="changeLimit(category)">Подтвердить</button>
          <button v-else @click="showInput(category)">Установить лимит</button>
        </div>
        <div class="limit" v-else>
          <div class="limit-input" v-if="category.limitSetting">
            <input type="number" v-model="limit" maxlength="5">
            <div class="error" v-if="error != null">{{ error }}</div>
          </div>
          <div class="limit-info" v-else>
            <div class="spent">Потрачено: {{ category.spent }} / {{ category.limit }}</div>
            <div v-if="category.limit - category.spent > 0">Осталось: {{ category.limit - category.spent }}  ₽</div>
            <div v-else>Лимит израсходован</div>
            <div class="limit-diagram">
              <div class="spent-diagram" :style="category.style"></div>
            </div>
          </div>
          <button @click="changeLimit(category)" v-if="category.limitSetting">Подтвердить</button>
          <button @click="showInput(category)" v-else>Изменить лимит</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'planning',
  data: () => ({
    categories: [],
    records: [],
    limit: 0,
    error: null
  }),
  methods: {
    showInput(category) {
      let limitIsBeingChanging = false
      this.categories.forEach(category => {
        if (category.limitSetting) {
          limitIsBeingChanging = true
          return
        }
      })

      if (!limitIsBeingChanging) {
        category.limitSetting = true
        this.limit = category.limit
      }
    },
    async changeLimit(category) {
      if (this.limit < 0) {
        this.error = 'Лимит не может быть отрицательным'
        return
      }

      if (this.limit > 999999) {
        this.error = 'Слишком большой лимит'
        return
      }

      category.limit = this.limit
      try {
        await this.$store.dispatch('updateCategory', category)
      } catch (e) {}


      const ratio = category.spent / category.limit
      let color = ''
      let width = ''

      if (ratio < 0.33) {
        category.color = 'background-color: green;'
      } else if (ratio < 0.66) {
        color = 'background-color: yellow;'
      } else if (ratio < 1) {
        color = 'background-color: orange;'
      } else {
        color = 'background-color: red;'
        width = 'width: 180px;'
      }

      if (width != 'width: 180px;') {
        width = `width: ${180 * ratio}px;`
      }

      category.style = width + color
      
      category.limitSetting = false
    }
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.records = await this.$store.dispatch('fetchRecords')
    } catch (e) {}

    this.categories.forEach(category => {
      category.spent = 0
      
      this.records.forEach(record => {
        if (record.categoryName === category.name 
          && new Date(record.date).getMonth() === new Date().getMonth()
          && new Date(record.date).getFullYear() === new Date().getFullYear()) {
          if (record.amount < 0) {
            category.spent += -record.amount
          }
        }
      })

      const ratio = category.spent / category.limit
      let color = ''
      let width = ''

      if (ratio < 0.33) {
        category.color = 'background-color: green;'
      } else if (ratio < 0.66) {
        color = 'background-color: yellow;'
      } else if (ratio < 1) {
        color = 'background-color: orange;'
      } else {
        color = 'background-color: red;'
        width = 'width: 180px;'
      }

      if (width != 'width: 180px;') {
        width = `width: ${180 * ratio}px;`
      }

      category.style = width + color
    })
  }
}
</script>

<style lang="scss" scoped>
.category-list {
  margin-top: 30px;
  height: 350px;
  width: 700px;
  display: flex;
  flex-wrap: wrap;
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
    margin-top: 20px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .category-icon {
      font-size: 80px;
    }

    .category-name {
      font-size: 25px;
      text-align: center;
      width: 180px;
      word-wrap: break-word;
      margin-bottom: 5px;
    }

    .no-limit {
      display: flex;
      flex-direction: column;
      align-items: center;

      .limit-input {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }

    .limit {
      display: flex;
      flex-direction: column;
      align-items: center;

      .limit-diagram {
        height: 20px;
        width: 180px;
        border: 1px solid #000;

        .spent-diagram {
          height: 18px;
          background-color: green;

        }
      }
    }

    input {
      width: 100px;
      height: 30px;
      border-radius: 5px;
      border: 2px solid rgb(158, 158, 158);
      padding: 5px;
      font-size: 16px;
    }

    button {
      margin-top: 5px;
      width: 130px;
      height: 35px;
      border-radius: 5px;
      background-color: #1ED760;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;

      &:hover {
        background-color: #58e088;
      }
    }
  }
}
</style>