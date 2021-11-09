<template>
    <div class="keranjang">
        <Navbar :updateKeranjang="jmlKeranjang"></Navbar>
        <div class="container mt-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/foods">Foods</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Keranjang</li>
                </ol>
            </nav>

            <h3 class="mb-3">Keranjang <strong>Saya</strong></h3>

            <!-- table -->
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Foto</th>
                            <th>Makanan</th>
                            <th>Keterangan</th>
                            <th>Jumlah</th>
                            <th>Harga</th>
                            <th>Total Harga</th>
                            <th>Hapus</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <img :src="'../assets/images/'+keranjang.product.gambar" alt="gagal upload" width="250px" class="rounded mx-auto d-block">
                            </td>
                            <td>{{ keranjang.product.nama }}</td>
                            <td>{{ keranjang.keterangan }}</td>
                            <td>{{ keranjang.jumlah }}</td>
                            <td align="right">Rp. {{ keranjang.product.harga.toLocaleString() }}</td>
                            <td align="right"><strong>Rp. {{ (keranjang.product.harga * keranjang.jumlah).toLocaleString() }}</strong></td>
                            <td align="center" class="text-danger" title="Hapus Item">
                                <b-icon-trash @click="hapusPesanan(keranjang.id)"></b-icon-trash>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="6" align=right><strong>Total Harga</strong></td>
                            <td align="right"><strong>Rp. {{ totalHarga.toLocaleString() }}</strong></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>  

            <!-- form checkout -->
            <div class="row justify-content-end">
                <div class="col-md-4 kotak-identitas" v-if="keranjangs.length">
                    <form @submit.prevent>
                        <div class="form-group">
                            <label for="nama">Nama</label>
                            <input type="text" name="nama" id="nama" v-model="pesanan.nama" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="noMeja">Meja</label>
                            <input type="text" name="noMeja" id="noMeja" v-model="pesanan.noMeja" class="form-control">
                        </div>

                        <div class="form-group">
                            <button class="btn btn-success btn-md" @click="checkOut()">
                                <b-icon-cart></b-icon-cart>
                                Checkout Pesanan
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
    name: 'Keranjang',
    components: {
        Navbar
    },
    data(){
        return{
            keranjangs:{},
            jmlKeranjang: 0,
            pesanan:{}
        }
    },
    methods:{
        setKeranjangs(data){
            this.keranjangs = data
        },
        hapusPesanan(id){
            axios.delete("http://localhost:3000/keranjangs/"+id)
            .then(() => {
                this.$toast.error("Item Pesanan Dihapus",{
                    type: 'error',
                    position: 'top-right',
                    duration: 3000,
                    dismissible: true
                })

                this.getKeranjang()
            })
        },
        getKeranjang(){
            axios.get("http://localhost:3000/keranjangs")
            .then((response) => {
                this.setKeranjangs(response.data)
                this.jmlKeranjang = response.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        checkOut(){
            if(this.pesanan.nama && this.pesanan.noMeja){
                this.pesanan.keranjang = this.keranjangs
                axios.post("http://localhost:3000/pesanans",this.pesanan)
                .then(() => {
                    this.$toast.success("Berhasil Check Out Pesanan",{
                        type: 'success',
                        position: 'top-right',
                        duration: 3000,
                        dismissible: true
                    })
                    
                    this.keranjangs.map((item) => {
                        axios.delete("http://localhost:3000/keranjangs/"+item.id)
                        .catch((err) => {
                            console.log(err)
                        })    
                    })

                    this.$router.push({path: '/pesanan-checkout'})
                })
            }
            else {
                this.$toast.error('Nama dan No. Mejas Diisi',{
                    type: 'error',
                    position: 'top-right',
                    duration: 3000,
                    dismissible: true
                })
            }
        }
    },
    computed:{
        totalHarga(){
            if(this.keranjangs.length){
                return this.keranjangs.reduce(function(items, data){
                    return items + (data.product.harga * data.jumlah)
                },0)
            }
            else {
                return 0
            }
        }
    },
    mounted(){
        this.getKeranjang()
    }
}
</script>

<style scoped>
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

    .kotak-identitas {
        background-color:#F0FFFF;
        border-radius: 20px;
        padding: 20px;
    }
</style>