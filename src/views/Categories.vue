<template>
  <div class="page category-page">
    <h1 class="title">Категории</h1>
    <addCategory :icons="icons" @updateData="updateCategories" />
    <div class="category-list">
      <div class="category" v-for="category in categories" :key="category.name">
        <div class="category-info">
          <span class="material-icons" 
                :class="{'hover': category.edit}"
                @click="toggleIcons"
          >{{ category.img }}</span>
          <div class="icons-list" v-if="iconsOpened && category.edit">
            <div class="icon" v-for="icon in icons" :key="icon" @click="editIcon(category, icon)">
              <span class="material-icons">{{icon}}</span>
            </div>
          </div>
          <div class="input-div" v-if="category.edit">
            <input type="text" maxlength="12" v-model="editedName">
            <div class="error-message" v-if="error != null">{{error}}</div>
          </div>
          <span class="category-name" v-else>{{ category.name }}</span>
        </div>
        <div class="category-actions">
          <span class="material-icons" @click="saveCategory(category)"  v-if="category.edit">save</span>
          <span class="material-icons" @click="editCategory(category)" v-else>edit</span>
          <span class="material-icons" @click="deleteCategory(category)">delete</span>
        </div>
      </div>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import addCategory from '../components/AddCategory.vue'

export default {
  name: 'categories',
  components: {
    addCategory
  },
  data: () => ({
    categories: [],
    icons: [
      'restaurant',
      'medical_services',
      'flight',
      'directions_bus',
      'icecream',
      'attractions',
      'card_giftcard',
      'school',
      'phone_android',
      'checkroom',
      'home',
      'directions_car',
      'lunch_dining'
    ],
    iconsOpened: false,
    categoryIcon:  'restaurant',
    categoryName: '',
    error: null,
    editedName: '',
    editing: false
  }),
  methods: {
    toggleIcons() {
      this.iconsOpened = !this.iconsOpened
    },
    editCategory(category) {
      if (this.editing) {
        return
      }
      category.edit = true
      this.editedName = category.name
      this.editing = true
    },
    editIcon(category, icon) {
      category.img = icon
    },
    async saveCategory(category) {
      if (this.editedName === '') {
        this.error = 'Введите название категории'
        return
      }

      const updatedCategory = {
        name: this.editedName,
        img: category.img,
        limit: category.limit,
        id: category.id
      }
      try {
        await this.$store.dispatch('updateCategory', updatedCategory)
      } catch (e) {}

      category.name = this.editedName
      this.editedName = ''
      this.editingIconsOpened = false
      delete category.edit
      this.error = null
      this.editing = false
    },
    async deleteCategory(category) {
      console.log('delete')
      try {
        await this.$store.dispatch('deleteCategory', category.id)
      } catch (e) {}
      this.updateCategories()
    },
    async updateCategories() {
      this.categories = await this.$store.dispatch('fetchCategories')
    }
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
    } catch (e) {}
  }
}
</script>

<style lang="scss" scoped>
.category-page {
  width: 530px;
  display: flex;
  flex-flow: column;

  footer {
    height: 20px;
  }

  .hover {
    cursor: pointer;
  }

  .error-message {
    color: red;
  }
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

.category-list {
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
    width: 494px;
    position: relative;

    .category-info {
      display: flex;
      align-items: center;

      .material-icons {
        font-size: 40px;
        color: #2B2B2B;
      }

      .category-name {
        font-size: 25px;
        margin-left: 10px;
      }

      .input-div {
        margin-left: 10px;

        input {
          width: 250px;
          height: 30px;
          border-radius: 5px;
          border: 2px solid rgb(158, 158, 158);
          padding: 5px;
          font-size: 16px;
        }

        .error-box {
          height: 20px;
          padding-top: 5px;
          color: red;
        }
      }
    }

    .category-actions {

      .material-icons {
        font-size: 25px;
        color: rgb(82, 82, 82);
        margin-left: 10px;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          color: rgb(117, 117, 117);
        }
      }
    }
  }
}
</style>