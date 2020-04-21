<template>
  <div>
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
          <img src="../assets/images/charlota-blunarova-vSDdtWQhkS0-unsplash.jpg" class="d-block w-100 imgStyle" alt="...">
      </div>
      <div class="bgStyle">
        <div class="row justify-content-center">
            <div class="">
              <div class="col-12 my-7 d-flex align-items-center">
              <router-link class="btn btn-dark btn-lg mt-7 btn-block px-7 py-4" to="/">繼續選購</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
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
  }
}
</script>

<style scoped>
.imgStyle {
  background-size: cover;
  object-fit: cover;
  height: 480px;
}
.bgStyle {
  background-color:#d3d3d3;
  height: 480px;
  opacity: 0.5;
  z-index: 1;
  position: relative;
  top: 0;
  right: 0;
}
</style>
