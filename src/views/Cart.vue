<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
      <div class="row justify-content-center text-center text-monospace">
        <div class="col-2 border bg-dark text-white">
          <h5>step</h5>
          <h4>01</h4>
          <h5>確認購物清單</h5>
        </div>
        <div class="col-2 border mx-2" style="background-color:#f5f5f5;">
          <h5>step</h5>
          <h4>02</h4>
          <h5>填寫購買資料</h5>
        </div>
        <div class="col-2 border" style="background-color:#f5f5f5;">
          <h5>step</h5>
          <h4>03</h4>
          <h5>付款/完成訂單</h5>
        </div>
      </div>
      <div class="row justify-content-center mt-4">
        <div class="col-12">
        <table class="table">
          <thead style="font-weight:bold;">
            <td width="50"></td>
            <td>商品名稱</td>
            <td>數量</td>
            <td width="100">單價</td>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="text-center">
                <a href="#" class="text-muted"  @click.prevent="removeCart(item.id)">
                  <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-danger mt-3" size="lg"/>
                </a>
              </td>
              <td>
                <img :src="item.product.imageUrl" alt="" style="height:60px;width:60px;">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套優惠券</div>
              </td>
              <td>
                {{ item.qty }} / {{ item.product.unit }}
              </td>
              <td class="text-right">
                {{ item.product.origin_price | currency }}
              </td>
            </tr>
          </tbody>
          <tfoot style="background-color:#f5f5f5;">
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total | currency }}</td>
            </tr>
            <tr v-if="cart.total !== cart.final_total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total | currency }}</td>
            </tr>
          </tfoot>
        </table>
        <small id="emailHelp" class="form-text text-danger">{{ couponName }}</small>
        <div class="input-group input-group-sm mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="請輸入優惠碼"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            v-model="coupon_code"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              @click="addCoupon"
            >套用優惠碼</button>
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="col-3">
            <router-link class="btn btn-block btn-primary text-white" to="/products">
              <font-awesome-icon :icon="['fa', 'arrow-left']" />
              繼續購買
            </router-link>
          </div>
          <div class="col-3">
            <router-link class="btn btn-block btn-danger" to="/customer_list">下一步,填寫購買資料
              <font-awesome-icon :icon="['fa', 'arrow-right']" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      coupon_code: '',
      couponName: ''
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
    getCart () {
      this.$store.dispatch('getCart')
    },
    removeCart (id) {
      this.$store.dispatch('removeCart', id)
    },
    addCoupon (code) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const vm = this
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true)
      this.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          vm.couponName = response.data.message
          console.log(response)
          vm.getCart()
        } else {
          alert('優惠碼使用錯誤！')
          vm.coupon_code = ''
        }
        vm.$store.dispatch('updateLoading', false)
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style>

</style>
