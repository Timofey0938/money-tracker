<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  components: {
    AuthLayout, MainLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout'
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

*, *:before, *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  border: none;
  text-decoration: none;
}

a:visited {
  color: #eee;
}

body {
  font-family: Arial, Helvetica, sans-serif
}

.error {
  color: red;
}

.page {
  width: 600px;
  height: 100%;
  color: #2B2B2B;

  .title {
    text-align: center;
  }
}
</style>
