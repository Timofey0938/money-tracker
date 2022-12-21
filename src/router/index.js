import { createRouter, createWebHistory } from "vue-router"
import login from "../views/Login.vue"

const routes = [
  {
    path: "/",
    name: "start",
    meta: {
      layout: 'auth',
      button: 'Зарегистрироваться'
    },
    component: login
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: 'auth',
      button: 'Зарегистрироваться'
    },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/signup",
    name: "signup",
    meta: {
      layout: 'auth',
      button: 'Войти'
    },
    component: () => import("../views/Signup.vue")
  },
  {
    path: "/accounts",
    name: "accounts",
    meta: { layout: 'main' },
    component: () => import("../views/Accounts.vue")
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: 'main' },
    component: () => import("../views/Categories.vue")
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: 'main' },
    component: () => import("../views/History.vue")
  },
  {
    path: "/analitics",
    name: "analitics",
    meta: { layout: 'main' },
    component: () => import("../views/Analitics.vue")
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: 'main' },
    component: () => import("../views/Planning.vue")
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: 'main' },
    component: () => import("../views/Profile.vue")
  },
  {
    path: "/addincome",
    name: "addIncome",
    meta: { layout: 'main' },
    component: () => import("../views/AddIncome.vue")
  },
  {
    path: "/addexpense",
    name: "addExpense",
    meta: { layout: 'main' },
    component: () => import("../views/AddExpense.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
