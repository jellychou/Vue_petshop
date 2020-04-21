<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="row justify-content-center text-center text-monospace">
      <div class="col-2 border" style="background-color:#f5f5f5;">
        <h5>step</h5>
        <h4>01</h4>
        <h5>確認購物清單</h5>
      </div>
      <div class="col-2 border mx-2" style="background-color:#f5f5f5;">
        <h5>step</h5>
        <h4>02</h4>
        <h5>填寫購買資料</h5>
      </div>
      <div class="col-2 border bg-dark text-white">
        <h5>step</h5>
        <h4>03</h4>
        <h5>付款/完成訂單</h5>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <form class="col-7" @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in customer.products" :key="item.id">
              <td>{{ item.product.title }}</td>
              <td>{{ item.qty }} / {{ item.product.unit }}</td>
              <td class="text-right">{{ item.final_total | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ customer.total | currency }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="120">Email</th>
              <td>{{ customer.user.email}}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ customer.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ customer.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ customer.user.address}}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!customer.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="customer.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderId: '',
      customer: {}
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
      console.log()
      this.$store.dispatch('getCart')
    },
    getOrderList () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      console.log(vm.orderId)
      vm.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(response => {
        if (response.data.success) {
          console.log(response.data)
          vm.customer = response.data.order
          vm.$store.dispatch('updateLoading', false)
        }
      })
    },
    payOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.$store.dispatch('updateLoading', true)
      this.$http.post(api).then(response => {
        if (response.data.success) {
          console.log(response.data)
          vm.getOrderList()
          vm.$store.dispatch('updateLoading', false)
          setTimeout(() => {
            vm.$router.push('/checkout_success')
          }, 3000)
        }
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrderList()
    this.getCart()
  }
}
</script>

<style>

</style>
