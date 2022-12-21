<template>
  <div class="add-category">
    <form @submit.prevent="addCategory">
        <div class="choose-icon" @click="toggleIcons">
            <span class="material-icons">{{categoryIcon}}</span>
            <span class="material-icons">arrow_drop_down</span>
        </div>
        <input type="text" placeholder="Название категории" maxlength="12" v-model="categoryName">
        <button type="submit">Добавить категорию</button>
    </form>
    <div class="error-box">
        <span v-if="error != null">{{error}}</span>
    </div>
    <div class="icons-list" v-if="iconsOpened">
        <div class="icon" v-for="icon in icons" :key="icon" @click="switchIcon(icon)">
            <span class="material-icons">{{icon}}</span>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'addCategory',
    props: {
        icons: Array
    },
    data: () => ({
        iconsOpened: false,
        categoryIcon:  'restaurant',
        categoryName: '',
        error: null,
    }),
    methods: {
        toggleIcons() {
            this.iconsOpened = !this.iconsOpened
        },
        switchIcon(icon) {
            this.categoryIcon = icon
            this.iconsOpened = false
        },
        async addCategory() {
            if (this.categoryName === '') {
                this.error = 'Введите название категории'
                return
            }

            const newCategory = {
                name: this.categoryName,
                img: this.categoryIcon
            }
            console.log(newCategory)
            try {
                await this.$store.dispatch('addCategory', newCategory)
            } catch (e) {}

            this.categoryName = ''
            this.error = null
            this.$emit('updateData')
        }
    }
}
</script>

<style lang="scss" scoped>
.add-category {
  margin: 20px 0;
  position: relative;

  form {
    display: flex;
    align-items: center;

    .choose-icon {
      cursor: pointer;
      user-select: none;
      -ms-user-select: none;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;

      .material-icons {
        font-size: 30px;
      }
    }

    input {
      width: 250px;
      height: 30px;
      border-radius: 5px;
      border: 2px solid rgb(158, 158, 158);
      padding: 5px;
      font-size: 16px;
      margin-left: 10px;
    }

    button {
      width: 170px;
      height: 30px;
      border-radius: 5px;
      background-color: #1ED760;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      margin-left: 10px;

      &:hover {
        background-color: #58e088;
      }
    }
  }
}

.error-box {
  height: 20px;
  padding-top: 5px;
  color: red;
}

.icons-list {
  height: 210px;
  width: 210px;
  background-color: #eee;
  border: 1px solid #000;
  border-radius: 10px;
  box-shadow: 0 7px 14px #2B2B2B;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: 40px;
  left: 0;
  z-index: 1;

  .icon {
    padding: 5px;
    cursor: pointer;

    .material-icons {
      font-size: 40px;
    }
  }
}
</style>