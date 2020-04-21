<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
      <div class="row justify-content-center text-center text-monospace">
        <div class="col-2 border" style="background-color:#f5f5f5;">
          <h5>step</h5>
          <h4>01</h4>
          <h5>確認購物清單</h5>
        </div>
        <div class="col-2 border mx-2 bg-dark text-white" >
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
      <div class="row justify-content-center mt-3">
        <div class="col-8">
          <form @submit.prevent="creatOrder">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input
                type="email"
                class="form-control"
                id="useremail"
                name="email"
                placeholder="請輸入 Email"
                v-model="form.user.email"
                v-validate="'required|email'"
                :class="{ 'is-invalid': errors.has('email') }"
              />
              <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
            </div>

            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="username"
                placeholder="請輸入姓名"
                v-model="form.user.name"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('name') }"
              />
              <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
            </div>
            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                type="tel"
                class="form-control"
                id="usertel"
                name="tel"
                placeholder="請輸入電話"
                v-model="form.user.tel"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('tel') }"
              />
              <span class="text-danger" v-if="errors.has('tel')">請輸入正確電話</span>
            </div>
            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                type="text"
                class="form-control"
                name="address"
                id="useraddress"
                placeholder="請輸入地址"
                v-model="form.user.address"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('address') }"
              />
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="comment">留言</label>
              <textarea
                name
                id="comment"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-danger" to="/customer_order/customer_checkout">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
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
    creatOrder () {
      const vm = this
      const order = vm.form
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.$store.dispatch('updateLoading', true)
      this.$validator.validate().then(result => {
        console.log(result)
        if (result) {
          this.$http.post(api, { data: order }).then(response => {
            console.log('訂單已建立', response.data)
            if (response.data.success) {
              vm.$store.dispatch('updateLoading', false)
              this.$router.push({ name: 'customer_checkout', params: { orderId: response.data.orderId } })
            }
          })
        } else {
          console.log('訂單錯誤')
          vm.$store.dispatch('updateLoading', false)
        }
      })
    },
    getCart () {
      this.$store.dispatch('getCart')
    },
    removeCart (id) {
      this.$store.dispatch('removeCart', id)
    }
  }
}
</script>

<style>

</style>
