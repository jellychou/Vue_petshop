<template>
  <div class="item">
    <ul class="nav nav-pills nav-justified mt-1 mb-2">
      <li class="nav-item mt-1">
        <router-link href="#" class="nav-link h5" to="/products">
          <font-awesome-icon :icon="['fa', 'paw']" />全部商品
        </router-link>
      </li>
      <li class="nav-item mt-1" v-for="item in categories" :key="item">
        <a class="nav-link h5 text-monospace" href="#" @click.prevent="gotoProduct(item)">
          <font-awesome-icon :icon="['fa', 'paw']" /> {{ item }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'item',
  data () {
    return {
      categories: {},
      products: {},
      searchText: '',
      temSplit: ''
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
        vm.products = response.data.products
        console.log(response)
        vm.getUnique()
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
    gotoProduct (item) {
      console.log(item)
      const vm = this
      vm.searchText = item
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
li:hover {
  background-color: #faebd7;
  cursor: pointer;
}
</style>
