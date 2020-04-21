<template>
  <div class="coupons">
    <div class="border-top">
          <div class="py-6">
            <div class="rounded" @click="show = !show">
              <div class="coupon ml-7 rounded bg-primary">
                <div class="text-center py-6" style="border-bottom-style: dashed;">
                  <h3>VIP會員限定折價券</h3>
                  <span class="text-white">
                    <font-awesome-icon :icon="['fa', 'angle-double-left']" />
                    點擊領取折價券
                    <font-awesome-icon :icon="['fa', 'angle-double-right']" />
                    </span>
                </div>
                <p class="text-center mt-2">Coupon By Jellu Chou</p>
                <div class="triangleLeft"></div>
                <div class="triangleRight"></div>
              </div>
              <div class="bg-warning card" :class="{ 'trans': show , 'noTrans': !show }">
                <div class="borderDash">
                  <h4 class="text-center bg-dark m-2 py-3 rounded-top text-white" style="position:relative;">
                    輸入以下代碼<br/>即可立即使用優惠哦
                  </h4>
                  <div class="triangleBottom"></div>
                  <h1 class="text-center mt-6 mb-4 text-monospace">AAA2020
                  </h1>
                </div>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'coupons',
  data () {
    return {
      show: false,
      transfrom: ''
    }
  },
  computed: {
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
    }
  },
  created () {
    this.$emit('updateNav', 'coupons')
  }
}
</script>
<style scoped>
.bgStyle {
    background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
}
.triangleLeft{
    position: absolute;
    top: 206px;
    left: 0px;
    width: 0;
    height: 0;
    border-width: 30px;
    border-style: solid;
    border-color: transparent transparent transparent #ffffff;
}
.triangleRight{
    position: absolute;
    top: 206px;
    right: 0px;
    width: 0;
    height: 0;
    border-width: 30px;
    border-style: solid;
    border-color: transparent #fdf5e6 transparent transparent;
}
.triangleBottom {
  position: absolute;
    top: 107px;
    right: 50px;
    width: 0;
    height: 0;
    border-width: 30px;
    border-style: solid;
    border-color: #cd853f transparent transparent transparent;
}
.coupon {
  position: relative;
  z-index: 2;
  height: 350px;
  width: 550px;
  cursor: pointer;
}
.card {
  margin-top: 20px;
  height: 300px;
  width: 480px;
  position: absolute;
  background-color: #fdf5e6;
  top: 160px;
  left: 370px;
  z-index: -1;
}
.trans {
  transition: all 3s 0s;
  transform: translateX(340px);
  /* animation: cubic-bezier(0.165, 0.84, 0.44, 1); */
}
.noTrans {
  transition: all 3s 0s;
  transform: translateX(0px);
}
.borderDash {
  border-radius: 10px;
  border-style: dashed;
  margin: 10px;
}
</style>
