<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary text-white" @click="openModel(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-2">
      <thead>
        <td>名稱</td>
        <td>優惠碼</td>
        <td>折扣百分比</td>
        <td>到期日</td>
        <td>是否啟用</td>
        <td>編輯</td>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <button
                type="button"
                class="btn btn-outline-dark"
                @click="openModel(false, item)"
              >編輯</button>
              <button type="button" class="btn btn-outline-danger" @click="cancelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row justify-content-center">
      <div class="col-3 mx-auto">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" :class="{'disabled': !pagination.has_pre}">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page === page}">
                <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{'disabled': !pagination.has_next}">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
        </nav>
      </div>
    </div>
    <!-- delProductModal -->
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">刪除產品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ cancelList.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="cancelCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增優惠券</span>
              <span v-else>編輯優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="title">標題</label>
                <input type="title" class="form-control" v-model="tempCoupon.title" id="title" />
              </div>
              <div class="form-group">
                <label for="coupon">優惠碼</label>
                <input type="coupon" class="form-control" v-model="tempCoupon.code" id="coupon" />
              </div>
              <div class="form-group">
                <label for="date">到期日</label>
                <input type="date" class="form-control" v-model="tempCoupon.due_date" id="date" />
              </div>
              <div class="form-group">
                <label for="percent">折扣百分比</label>
                <input
                  type="percent"
                  class="form-control"
                  v-model="tempCoupon.percent"
                  id="percent"
                />
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempCoupon.is_enabled"
                    id="is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary text-white" @click="updateCoupon" v-if="isNew">儲存優惠券</button>
            <button type="button" class="btn btn-primary text-white" @click="updateCoupon" v-else>更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      coupons: {},
      isNew: false,
      tempCoupon: {},
      cancelList: {},
      pagination: {}
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    getCoupons (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      console.log(api)
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(response => {
        console.log(response)
        if (response.data.success) {
          vm.coupons = response.data.coupons
          vm.pagination = response.data.pagination
          vm.$store.dispatch('updateLoading', false)
        }
      })
    },
    openModel (isNew, item) {
      $('#couponModal').modal('show')
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.tempCoupon = Object.assign({}, item)
        this.isNew = false
      }
    },
    cancelModal (item) {
      console.log(item)
      $('#delCouponModal').modal('show')
      this.cancelList = Object.assign({}, item)
      console.log(this.cancelList)
    },
    cancelCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.cancelList.id}`
      vm.$store.dispatch('updateLoading', true)
      this.$http.delete(api).then(response => {
        console.log(response)
        if (response.data.success) {
          $('#delCouponModal').modal('hide')
          vm.$store.dispatch('updateLoading', false)
          vm.getCoupons()
        }
      })
    },
    updateCoupon () {
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/`
      let httpMethod = 'post'
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        if (response.data.success) {
          console.log(response.data)
          $('#couponModal').modal('hide')
          vm.$store.dispatch('updateLoading', false)
          vm.getCoupons()
        }
      })
    }
  },
  created () {
    this.getCoupons()
    this.$emit('updateNav', 'coupons')
  }
}
</script>

<style>
</style>
