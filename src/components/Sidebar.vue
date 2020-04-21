<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to='/product_list'
              :class="{'text-dark': selected === 'products'}"
              @click.native="selected = 'products'"
            >
              <font-awesome-icon :icon="['fa', 'box-open']" /> 產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/order_list"
              :class="{'text-dark': selected === 'orders'}"
              @click.native="selected = 'orders'"
            >
              <font-awesome-icon :icon="['fa', 'list-alt']" /> 訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/coupon_list"
              :class="{'text-dark': selected === 'coupons'}"
              @click.native="selected = 'coupons'"
            >
              <font-awesome-icon :icon="['fa', 'ticket-alt']" /> 優惠卷
            </router-link>
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
      selected: 'products'
    }
  },
  methods: {
    updateNav (page) {
      const vm = this
      vm.selected = page
    }
  }
}
</script>

<style>
</style>
