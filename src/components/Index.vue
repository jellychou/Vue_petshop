<template>
  <div class="index">
    <Banner />
    <Menu />
    <HotProduct />
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import Menu from '@/components/Menu'
import HotProduct from '@/components/HotProduct'
export default {
  name: 'index',
  components: {
    Banner,
    Menu,
    HotProduct
  }
}
</script>

<style>

</style>
