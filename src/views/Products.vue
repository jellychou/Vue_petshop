<template>
  <div class="products">
    <Loading :active.sync="isLoading"></Loading>
    <div class="main-content mb-3">
      <div class="w-100 bg-info mt-3 mb-5" style="height:50px">
        <MarqueeText :duration="10" :repeat="30" class="pt-2">
          <img src="../assets/images/iconfinder_announcement_2199113.png"  alt="bullhorn" style="height:30px;width:30px;">
          號外號外~歡迎新加入會員，全面商品大特價，加緊腳步錯過可惜唷！
          號外號外~歡迎新加入會員，全面商品大特價，加緊腳步錯過可惜唷！
          號外號外~歡迎新加入會員，全面商品大特價，加緊腳步錯過可惜唷！
        </MarqueeText>
      </div>
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="list-group sticky-top" style="top: 100px;">
            <a class="list-group-item list-group-item-action" href="#" v-for="item in categories" :key="item" :class="{ 'active': item === searchText}" @click.prevent="searchText = item">
              <font-awesome-icon :icon="['fa', 'bone']" aria-hidden="true"/> {{ item }}
            </a>
            <a href="#" class="list-group-item list-group-item-action" :class="{ 'active': searchText === ''}" @click.prevent="searchText = ''">全部顯示</a>
          </div>
        </div>
        <!-- 子頁面 -->
        <div class="col-md-9">
          <div class="d-flex mb-4">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  v-model="searchText"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="searchText = ''">
                    <font-awesome-icon :icon="['fa', 'times']" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- content -->
          <div class="tab-pane" id="list-gift">
            <div class="row align-items-stretch">
              <!-- 禮品 -->
              <div class="col-md-4 mb-4" v-for="item in filterData" :key="item.id">
              <div class="card border-0 shadow-sm">
                <div
                  style="height: 150px; background-size: cover; background-position: center"
                  :style="{ backgroundImage: `url(${ item.imageUrl })` }"
                ></div>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2 mt-1">{{ item.category.split('_')[0] }}</span>
                  <h5 class="card-title">
                    <h5 class="text-dark">{{ item.title }}</h5>
                  </h5>
                  <div class="row">
                    <div class="col-6">
                      <del class="h6 text-secondary text-monospace" v-if="item.price !== item.origin_price">$ {{ item.origin_price }}</del>
                    </div>
                    <div class="col-6">
                      <div class="h4 text-danger text-right text-monospace" v-if="item.price !== item.origin_price"> ${{ item.price }}</div>
                      <div class="h4 text-monospace text-right" v-if="item.price == item.origin_price"> ${{ item.origin_price }}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="card-footer text-muted p-0">
                    <div class="row justify-content-center mx-auto no-gutters clickPoint"  @click.prevent="addtoCart(item.id)">
                      <div class="col-12 text-center my-1 text-dark">
                        加入購物車<font-awesome-icon :icon="['fa', 'shopping-cart']"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
export default {
  name: 'products',
  data () {
    return {
      products: {},
      categories: [],
      searchText: '',
      isGetUnique: false,
      searchItem: ''
    }
  },
  components: {
    MarqueeText
  },
  computed: {
    filterData () {
      const vm = this
      if (vm.searchText && vm.products.length) {
        return vm.products.filter((item) => {
          const cateResult = item.category.toLowerCase().includes(vm.searchText.toLowerCase())
          const titleResult = item.title.toLowerCase().includes(vm.searchText.toLowerCase())
          return cateResult || titleResult
        })
      }
      return vm.products
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      console.log(api)
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(response => {
        console.log(response)
        vm.products = response.data.products
        if (!vm.isGetUnique) {
          vm.getUnique()
        }
        vm.isGetUnique = true
        vm.$store.dispatch('updateLoading', false)
      })
    },
    getUnique () {
      const vm = this
      const categories = new Set()
      vm.products.forEach((item) => {
        console.log(item.category)
        vm.temSplit = item.category.split('')
        if (!vm.temSplit.includes('_')) {
          categories.add(item.category)
        }
      })
      vm.categories = Array.from(categories)
    },
    addtoCart (id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty })
    }
  },
  created () {
    this.getProducts()
  },
  mounted () {
    this.searchItem = this.$route.params.category
    if (this.searchItem !== '' && this.searchItem !== undefined) {
      this.searchText = this.searchItem
    } else {
      this.searchText = ''
    }
    this.$emit('updateNav', 'products')
  }
}
</script>

 <style scoped>
 .clickPoint {
   cursor: pointer;
 }
 </style>
