<template>
  <div class="mt-1">
    <div>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide caption="" img-src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" class="imgStyle"></b-carousel-slide>
        <b-carousel-slide caption="" img-src="https://images.unsplash.com/photo-1477868433719-7c5f2731b310?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80" class="imgStyle"></b-carousel-slide>
        <b-carousel-slide caption="" img-src="https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" class="imgStyle"></b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.imgStyle {
  object-fit: cover;
  height: 500px;
  width: 100%;
}
</style>
