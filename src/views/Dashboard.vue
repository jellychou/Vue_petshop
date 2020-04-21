<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">毛孩逛逛</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="logOut">Sign out</a>
        </li>
      </ul>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <Sidebar ref="nav"/>
        <AlertMessage />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view @updateNav="(val) => updateNav(val)"></router-view>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar'
import AlertMessage from '@/components/AlertMessage'
export default {
  components: {
    Sidebar,
    AlertMessage
  },
  data () {
    return {
    }
  },
  methods: {
    logOut () {
      const api = `${process.env.VUE_APP_APIPATH}logout`
      console.log(api)
      const vm = this
      this.$http.post(api).then(response => {
        if (response.data.success) {
          console.log(response)
          vm.$router.push('/')
        }
      })
    },
    updateNav (val) {
      const vm = this
      vm.$refs.nav.updateNav(val)
    }
  }
}
</script>

<style>
</style>
