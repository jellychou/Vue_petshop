<template>
  <div class="hotProduct">
    <Loading :active.sync="isLoading"></Loading>
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" data-interval="3000" data-pause="hover">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div>
            <p class="text-center bg-warning m-0 py-2 mb-1" style="text-shadow:2px 2px 2px #ffd700;">
              <img src="../assets/images/iconfinder_dashboard__Favorite_2876976.png" alt="hit" style="height:30px;width:30px;">本週主打
            </p>
            <div class="row no-gutters">
              <div class="col-4" v-for="item in productsHit" :key="item.id">
                <div class="card">
                  <a href="#" @click="gotoProduct(item)">
                    <img :src="item.imageUrl" class="card-img-top bg-cover imgStyle" alt="...">
                  </a>
                  <div class="card-body pb-0 px-2">
                    <span class="badge badge-secondary float-right ml-2 mt-1">{{ item.category.split('_')[0] }}</span>
                    <h5 class="card-title text-dark">{{ item.title }}</h5>
                    <div class="row">
                        <div class="col-12">
                          <del class="h6 text-secondary text-monospace">$ {{ item.origin_price }} 元</del>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="row">
                        <div class="col-12">
                          <div class="h5 text-danger text-monospace">$ {{ item.price }} 元</div>
                        </div>
                      </div>
                      <div class="btn" @click="addtoCart(item.id)">
                        <font-awesome-icon class="text-primary" :icon="['fa', 'shopping-cart']"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div>
            <p class="text-center bg-warning m-0 py-2 mb-1" style="text-shadow:2px 2px 2px #ffd700;">
              <img src="../assets/images/iconfinder_new_product_1954197.png" alt="news" style="height:35px;width:35px;">新品快報
            </p>
            <div class="row no-gutters">
              <div class="col-4" v-for="item in productsNews" :key="item.id">
                <div class="card">
                  <a href="#" @click="gotoProduct(item)">
                    <img :src="item.imageUrl" class="card-img-top bg-cover imgStyle" alt="...">
                  </a>
                  <div class="card-body pb-0 px-2">
                    <span class="badge badge-secondary float-right ml-2 mt-1">{{ item.category.split('_')[0] }}</span>
                    <h5 class="card-title text-dark">{{ item.title }}</h5>
                    <div class="row">
                        <div class="col-12">
                          <del class="h6 text-secondary text-monospace">$ {{ item.origin_price }} 元</del>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="row">
                        <div class="col-12">
                          <div class="h5 text-danger text-monospace">$ {{ item.price }} 元</div>
                        </div>
                      </div>
                      <div class="btn" @click="addtoCart(item.id)">
                        <font-awesome-icon class="text-primary" :icon="['fa', 'shopping-cart']"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
           <div>
            <p class="text-center bg-warning m-0 py-2 mb-1" style="text-shadow:2px 2px 2px #ffd700;">
                <img src="../assets/images/iconfinder_fire_1075486.png" alt="hot" style="height:30px;width:30px;">
                熱銷商品
                </p>
            <div class="row no-gutters">
              <div class="col-4" v-for="item in productsHot" :key="item.id">
                <div class="card">
                  <a href="#" @click="gotoProduct(item)">
                    <img :src="item.imageUrl" class="card-img-top bg-cover imgStyle" alt="...">
                  </a>
                  <div class="card-body pb-0 px-2">
                    <span class="badge badge-secondary float-right ml-2 mt-1">{{ item.category.split('_')[0] }}</span>
                    <h5 class="card-title text-dark">{{ item.title }}</h5>
                  <div class="row">
                    <div class="col-12">
                      <del class="h6 text-secondary text-monospace">$ {{ item.origin_price}} 元</del>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div class="row">
                      <div class="col-12">
                        <div class="h5 text-danger text-monospace">$ {{ item.price }} 元</div>
                      </div>
                    </div>
                    <div class="btn" @click.prevent="addtoCart(item.id)">
                      <font-awesome-icon class="text-primary" :icon="['fa', 'shopping-cart']"/>
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
import $ from 'jquery'
export default {
  name: 'hotProduct',
  data () {
    return {
      products: {},
      productsHot: [],
      productsNews: [],
      productsHit: [],
      item: '',
      searchText: ''
    }
  },
  computed: {
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
        $('.carousel').carousel()
        console.log(response.data.products)
        vm.products = response.data.products
        vm.products.forEach(val => {
          vm.item = val.category.split('_')[1]
          if (vm.item === 'hot') {
            vm.productsHot.push(val)
          } else if (vm.item === 'news') {
            vm.productsNews.push(val)
          } else if (vm.item === 'hit') {
            vm.productsHit.push(val)
          }
        })
        vm.$store.dispatch('updateLoading', false)
      })
    },
    addtoCart (id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty })
    },
    gotoProduct (item) {
      console.log(item)
      const vm = this
      vm.searchText = item.category.split('_')[0]
      this.$router.push({ name: 'products', params: { category: vm.searchText } })
    }
  },
  created () {
    const vm = this
    vm.getProducts()
  }
}
</script>

<style scoped>
.imgStyle {
  object-fit: cover;
  height: 240px;
}

img:hover {
  opacity: 0.8;
}

</style>
