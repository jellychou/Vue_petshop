<template>
  <div class="home">
    <div class="container-lg">
      <Navbar ref="nav" />
      <AlertMessage />
        <router-view @updateNav="(val) => updateNav(val)"></router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AlertMessage from '@/components/AlertMessage'

export default {
  name: 'Home',
  components: {
    Navbar,
    Footer,
    AlertMessage
  },
  methods: {
    updateNav (val) {
      const vm = this
      vm.$refs.nav.updateNavt(val)
    }
  }
}
</script>
