<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <h3 class="mt-3 mb-3">Daftar <strong>Makanan</strong></h3>

      <div class="input-group mb-3">
        <input 
          type="text" 
          class="form-control" 
          placeholder="Cari Makanan Favorite Anda ..." 
          aria-label="cari" 
          aria-describedby="basic-addon1"
          v-model="search"
          @keyup="searchFood()">

        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <b-icon-search></b-icon-search>
          </span>
        </div>
      </div>

      <div class="row mt3">
        <div class="col-md-4 mb-3" v-for="product in products" :key="product.id">
          <CardProduct :product="product"></CardProduct>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import CardProduct from '@/components/CardProduct.vue'
import axios from 'axios'

export default {
  name: 'Foods',
  components: {
      Navbar,
      CardProduct
  },
  
  data(){
    return {
      products: [],
      search: ''
    }
  },

  mounted(){
    axios.get('http://localhost:3000/products')
    .then((response) => {
      this.setProduct(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },

  methods: {
    setProduct(data){
      this.products = data
    },

    searchFood(){
      axios.get('http://localhost:3000/products?q='+this.search)
      .then((response) => {
        this.setProduct(response.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>
