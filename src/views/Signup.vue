<template>
  <div class="wrapper">
    <form class="form" @submit.prevent="signup">
      <input type="text"
             placeholder="Имя пользователя"
             autocomplete="off"
             v-model.trim="userName">
      <small class="error">{{ userNameError }}</small>
      <input type="text"
             placeholder="Email"
             autocomplete="off"
             v-model.trim="email">
      <small class="error">{{ emailError }}</small>
      <input type="password" 
             placeholder="Пароль"
             autocomplete="off"
             v-model.trim="password">
      <small class="error">{{ passwordError }}</small>
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'

export default {
    name: 'signup',
    data: () => ({
    v$: useValidate(),
    userName: '',
    email: '',
    password: '',
    userNameError: '',
    emailError: '',
    passwordError: ''
  }),
  methods: {
    async signup() {
      this.v$.$validate()

      this.userNameError = ''
      this.emailError = ''
      this.passwordError = ''

      if (this.v$.$error)
      {
        if (this.v$.userName.required.$invalid) { 
          this.userNameError = 'Введите имя пользователя'
        } else if (this.v$.userName.minLength.$invalid) {
          this.userNameError = 'Имя пользователя не может быть короче 3 символов'
        } else if (this.v$.userName.maxLength.$invalid) {
          this.userNameError = 'Имя пользователя не может быть длинее 10 символов'
        }

        if (this.v$.email.required.$invalid) { 
          this.emailError = 'Введите email'
        } else if (this.v$.email.email.$invalid) {
          this.emailError = 'Некорректный email'
        }

        if (this.v$.password.required.$invalid) { 
          this.passwordError = 'Введите пароль'
        } else if (this.v$.password.minLength.$invalid) {
          this.passwordError = 'Пароль не может быть короче 6 символов'
        }

        return
      } 

      const formData = {
        userName: this.userName,
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('signup', formData)
        this.$router.push('/accounts')
      } catch (e) {}
    }
  },
  validations() {
    return {
      userName: { required, minLength: minLength(3), maxLength: maxLength(10) },
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;

  .form {
  width: 500px;
  height: 350px;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0px 0px 15px rgb(133, 133, 133);
  border-radius: 10px;
  padding: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input {
    width: 400px;
    height: 50px;
    border-radius: 5px;
    border: 2px solid rgb(158, 158, 158);
    padding: 5px;
    font-size: 18px;
  }

  button {
    width: 250px;
    height: 50px;
    border-radius: 5px;
    background-color: #1ED760;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      background-color: #58e088;
    }
  }

  ::-webkit-input-placeholder {font-size: 18px;}
  ::-moz-placeholder          {font-size: 18px;}
  :-moz-placeholder           {font-size: 18px;}
  :-ms-input-placeholder      {font-size: 18px;}
  }
}
</style>