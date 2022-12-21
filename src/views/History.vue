<template>
  <div class="page">
    <h1 class="title">История</h1>
    <div class="record-list">
      <div class="record" v-for="record in records" :key="record.category">
        <div class="record-category">
          <span class="material-icons">{{ record.categoryIcon }}</span>
        <div class="category-name">{{ record.categoryName }}</div>
        </div>
        <span class="record-date">{{ record.date }}</span>
        <span class="record-comment">{{ record.comment }}</span>
        <div class="record-amount" 
            :class="{
              'red': record.amount < 0,
              'green': record.amount > 0
        }">
          <span class="material-icons">{{ record.accountIcon }} &nbsp;</span>
          {{ Math.abs(record.amount) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'history',
  data: () => ({
    records: [],
    amountClass: 'green'
  }),
  async mounted() {
    try {
      this.records = await this.$store.dispatch('fetchRecords')
      this.records.sort((prev, next) => new Date(next.date) - new Date(prev.date))
    } catch (e) {}
  }
}
</script>

<style lang="scss" scoped>
.page {
  margin-left: -50px;
  width: 750px;

  .record-list {
    margin-top: 20px;
    height: 300px;
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

    .record {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .record-category {
        display: flex;
        align-items: center;
        width: 250px;

        .material-icons {
          font-size: 40px;
        }

        .category-name {
          margin-left: 10px;
          font-size: 25px;
          max-width: 200px;
          word-wrap: break-word;
        }
      }

      .record-date {
        margin-left: 20px;
      }

      .record-comment {
        width: 250px;
        margin-left: 20px;
        word-wrap: break-word;
      }

      .record-amount {
        margin-left: 20px;
        display: flex;
        align-items: center;
      }
    }
  }
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>