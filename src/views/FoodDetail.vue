<template>
    <div class="food-detail">
        <Navbar></Navbar>

        <div class="container mt-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/foods">Foods</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Food Order</li>
                </ol>
            </nav>


            <div class="row mt-5">
                <div class="col-lg-6">
                    <img :src="'../assets/images/'+product.gambar" :alt="product.gambar" class="img-fluid foto" width="550px" height="550px">
                </div>
                <div class="col-lg-6">
                    <h1>
                        <strong>
                            {{ product.nama }}
                        </strong>        
                    </h1>
                    <hr>
                    
                    <form @submit.prevent>
                        <div class="form-group">
                            <label for="jumlah">Jumlah Pesan</label>
                            <input type="number" name="jumlah" id="jumlah" class="form-control" v-model="pesan.jumlah">
                        </div>

                        <div class="form-group">
                            <label for="keterangan">Keterangan</label>
                            <textarea 
                                name="keterangan" 
                                id="keterangan" rows="3" class="form-control" 
                                v-model="pesan.keterangan"
                                placeholder="Keterangan item yang dipesan">
                            </textarea>
                        </div>

                        <div class="form-group">
                            <button class="btn btn-success btn-md" @click="pemesanan()">
                                <b-icon-cart></b-icon-cart>
                                Pesan
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'

export default {
    name: 'FoodDetail',
    components: {
        Navbar
    },

    data(){
        return{
            product: {},
            id: this.$route.params.id,
            pesan: {},
            oldProduct: {}
        }
    },

    mounted(){
        axios.get('http://localhost:3000/products/' + this.id)
        .then((response) => {
            this.product=response.data
        })
        .catch((err) => {
            console.log(err)
        })
    },

    methods:{
        pemesanan(){
            if(this.pesan.jumlah){
                this.pesan.product = this.product;
                
                // cek pesanan sudah ada kode yg sama atau belum
                axios.get("http://localhost:3000/keranjangs?q="+this.product.kode)
                .then((response) => {
                    this.oldProduct = response.data
                    if(this.oldProduct.length==0){
                        this.simpanPesanan(this.pesan)
                    }
                    else{
                        this.updatePesanan()
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
            }
            else{
                console.log('jgn kosong')
            }
        },
        simpanPesanan(data){
            axios.post('http://localhost:3000/keranjangs', data)
            .then(() => {
                this.$toast.success('Sukses Masuk Keranjang', {
                    type: 'success',
                    position: 'top-right',
                    duration: 3000,
                    dismissible: true
                });

                this.$router.push({path: '/keranjang'})
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        updatePesanan(){    
            axios.patch('http://localhost:3000/keranjangs/'+this.oldProduct[0].id, this.pesan)
            .then(() => {
                this.$toast.success('Sukses Update Keranjang',{
                    type: 'success',
                    position: 'top-right',
                    duration: 3000,
                    dismissible: true
                })

                this.$router.push({path: '/keranjang'})

            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
    .foto {
        border-radius: 15px;
    }

    .breadcrumb{
        background-color: transparent;
        padding: 0;
    }

    .breadcrumb-item a{
        text-decoration: none;
    }

    .breadcrumb-item.active {
        font-weight: bold;
        color: black;
    }

    a {
        color: silver;
    }

    a:hover {
        color: black;
    }
</style>