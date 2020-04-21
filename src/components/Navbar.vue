<template>
  <div class="sticky-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" href="#" to="/" @click.native="selected = 'home'" :class="{'text-dark': selected === ''}">
              <img
                src="../assets/images/iconfinder_dog_4591896.png"
                alt="headImg"
                style="height:40px;width:40px;"
              />
              首頁
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mt-2" href="#" to="/products" @click.native="selected = 'products'" :class="{'text-dark': selected === 'products'}">商品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mt-2" href="#" to="/coupons" @click.native="selected = 'coupons'" :class="{'text-dark': selected === 'coupons'}">優惠券</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" >
          <li class="nav-item" style="position: relative;">
            <div class="dropdown ml-auto mt-1">
              <button class="btn btn-sm btn-cart nav-link" data-toggle="dropdown" data-flip="false" @click="getCart()">
                <font-awesome-icon :icon="['fa', 'shopping-bag']"  size="2x"/>
                <span class="badge badge-pill badge-danger badgeStyle">{{ cart.carts.length }}</span>
                <span class="sr-only">unread messages</span>
              </button>
              <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px"
                data-offset="400">
                <h5 class="text-center">購物車清單</h5>
                <table class="table table-sm">
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td class="align-middle text-center">
                        <a href="#" class="text-muted" @click.prevent="removeCart(item.id)">
                          <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-danger" />
                        </a>
                      </td>
                      <td width="120" class="align-middle">{{ item.product.title }}</td>
                      <td width="60" class="align-middle text-monospace">{{ item.qty }}/{{ item.product.unit }}</td>
                      <td class="align-middle text-right text-monospace">${{ item.product.price }}</td>
                    </tr>
                  </tbody>
                </table>
                <button class="btn btn-primary btn-block text-white" @click.prevent="goOrder">
                  <font-awesome-icon :icon="['fa','cart-arrow-down']"/>結帳去
                </button>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <div class="dropdown ml-auto mt-1">
              <button class="btn btn-sm btn-cart nav-link" data-toggle="dropdown" data-flip="false" @click="getCart()">
                <font-awesome-icon :icon="['fa', 'user-circle']" size="2x" />
              </button>
              <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px"
                data-offset="400">
                <form class="px-4 py-3" @submit.prevent="signIn">
                  <div class="form-group">
                    <label for="exampleDropdownFormEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" v-model="user.username" required autofocus>
                  </div>
                  <div class="form-group">
                    <label for="exampleDropdownFormPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" v-model="user.password" required autofocus>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="dropdownCheck">
                      <label class="form-check-label" for="dropdownCheck">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block text-white">Sign in</button>
                </form>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: 'home',
      // cart: {},
      user: {
        username: '',
        password: ''
      }
      // cartId: ''
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    cart () {
      return this.$store.state.cart
    }
  },
  methods: {
    updateNavt (page) {
      const vm = this
      vm.selected = page
    },
    getCart () {
      this.$store.dispatch('getCart')
    },
    removeCart (id) {
      this.$store.dispatch('removeCart', id)
    },
    signIn () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}admin/signin`
      console.log(api)
      this.$http.post(api, vm.user).then(response => {
        console.log(response.data.message)
        if (response.data.success) {
          vm.$router.push('/product_list')
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    goOrder () {
      const vm = this
      if (vm.cart.carts.length) {
        vm.$router.push('/cart')
      } else {
        alert('請加入商品至購物車！')
      }
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style scoped>
.badgeStyle {
  height: 17px;
  width: 23px;
  position: absolute;
  top: 32px;
  right: 0px;
}
</style>
