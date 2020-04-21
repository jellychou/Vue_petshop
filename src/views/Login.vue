<template>
  <div >
    <!-- <Loading :active.sync="isLoading"></Loading> -->
    <form class="form-signin mt-7 border bg-primary" @submit.prevent="signIn" style="opacity:0.95">
      <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt width="72" height="72" />
      <h1 class="h3 mb-3 font-weight-normal text-center">
        MANAGER LOGIN
        <font-awesome-icon icon="unlock-alt" />
      </h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        v-model="user.username"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-light btn-block" type="submit">Sign in</button>
      <p class="mt-3 mb-3 text-muted">
        &copy; 2017-2019
        <router-link class="ml-3 text-danger" href="#" to="/">
          back to the Home
          <font-awesome-icon :icon="['fa', 'arrow-right']" />
        </router-link>
      </p>
    </form>
    <!-- <div class="col-md-10">
      <div class="row no-gutters justify-content-center">
          <div class="col-md-6 bg-dark log-in">
              <h3 class="h1 text-white text-center pt-md-4 d-md-block d-none">會員登入</h3>
              <div class="bg-dark p-5 pt-md-5">
                  <div class="input-group mb-md-4 mb-4 justify-content-center">
                      <label for="username"
                          class="fas fa-user text-dark bg-molsgrass mb-0 p-5 border-0 pl-3"></label>
                      <input type="text" id="username" class="form-input bg-molsgrass pr-9 border-0 pl-3"
                          placeholder=" 電子信箱/手機號碼">
                  </div>
                  <div class="input-group justify-content-center">
                      <label for="password"
                          class="fas fa-key text-dark bg-molsgrass mb-0 p-5 pt-2 border-0"></label>
                      <input type="text" id="password" class="form-input bg-molsgrass pr-9 border-0 pl-3"
                          placeholder=" 請輸入使用者密碼">
                  </div>
                  <div class="custom-control custom-checkbox ml-md-2 mt-md-4 ml-5 mt-3">
                      <input type="checkbox" class="custom-control-input" id="customCheck1">
                      <label class="custom-control-label text-white" for="customCheck1">記住我</label>
                  </div>
              </div>
              <button class="btn btn-bling w-100 text-dark mt-md-2 py-3">
                  <h5>登入帳號</h5>
              </button>
          </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_APIPATH}admin/signin`
      console.log(api)
      const vm = this
      this.$http.post(api, vm.user).then(response => {
        console.log(response.data.message)
        if (response.data.success) {
          vm.$router.push('/product_list')
        }
      })
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.bgImg {
  background-image: url("../assets/images/38181-O1ODW2.jpg");
  height: 100%;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
