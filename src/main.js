import { createApp } from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
  apiKey: "AIzaSyA6q7PqLt31FQtPV4gRGLkbdH6y_Of9Oj8",
  authDomain: "ultimate-money-tracker.firebaseapp.com",
  projectId: "ultimate-money-tracker",
  storageBucket: "ultimate-money-tracker.appspot.com",
  messagingSenderId: "446940190135",
  appId: "1:446940190135:web:09e0234a02237892460432",
  measurementId: "G-1LCX1SZ09R"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    .use(store)
    .use(router)
    .mount("#app")
  }
})