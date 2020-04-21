<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <table class="table mt-5">
      <thead>
        <td>購買時間</td>
        <td>Email</td>
        <td>購買款項</td>
        <td>應付金額</td>
        <td>是否付款</td>
        <!-- <td>編輯</td> -->
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id" >
          <td>{{ new Date(item.create_at*1000).toLocaleDateString() }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul v-for="val in item.products" :key="val.id">
              <li>{{ val.product.title }} - {{ val.qty }}{{ val.product.unit }}</li>
            </ul>
          </td>
          <td>{{ item.total | currency }}</td>
          <td v-if="item.is_paid" class="text-success">已付款</td>
          <td v-else>尚未付款</td>
          <!-- <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <button
                type="button"
                class="btn btn-outline-dark"
                @click="deModal(item.id)"
              >編輯</button>
            </div>
          </td> -->
        </tr>
      </tbody>
    </table>
    <div class="row justify-content-center">
      <div class="col-3">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{'disabled': !pagination.has_pre}">
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                @click.prevent="getOrder(pagination.current_page - 1)"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              class="page-item"
              v-for="page in pagination.total_pages"
              :key="page"
              :class="{'active': pagination.current_page === page}"
            >
              <a class="page-link" href="#" @click.prevent="getOrder(page)">{{ page }}</a>
            </li>
            <li class="page-item"></li>
            <li class="page-item" :class="{'disabled': !pagination.has_next}">
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                @click.prevent="getOrder(pagination.current_page + 1)"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- editModal -->
    <!-- <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>編輯訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center">
              <div class="col-8">
                <div class="form-group">
                  <label for="title">購買款項</label>
                  <input type="text" class="form-control" id="title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="emial">Email</label>
                    <input type="email" class="form-control" id="email">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="create_at">購買時間</label>
                    <input type="date" class="form-control" id="create_at" v-model="this.create_at">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="total">應付金額</label>
                    <input type="number" class="form-control" id="total" v-model="tempOrder.total">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="tempOrder.is_paid" :true-value="1"
                    :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否付款
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      orders: {},
      pagination: {},
      data: {
        create_at: '',
        is_paid: false,
        message: '',
        payment_method: '',
        products: [],
        total: 100,
        user: {}
      },
      tempOrder: {}
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    getOrder (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(reponse => {
        if (reponse.data.success) {
          console.log(reponse.data.orders)
          vm.orders = reponse.data.orders
          vm.pagination = reponse.data.pagination
          vm.$store.dispatch('updateLoading', false)
        }
      })
    },
    openModal (item) {
      $('#orderModal').modal('show')
      this.tempOrder = Object.assign({}, item)
      console.log(this.tempOrder)
    }
  },
  created () {
    this.getOrder()
    this.$emit('updateNav', 'orders')
  }
}
</script>

<style>

</style>
