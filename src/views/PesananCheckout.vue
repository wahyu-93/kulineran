<template>
    <div class="pesanan-checkout">
        <Navbar></Navbar>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col text-center">
                    <img src="/assets/images/menunggu.png" alt="Gagal Upload" width="300">
                    <h2><strong>Sukses!!!</strong></h2>
                    <p>
                        Pesanan Anda Segera Diproses <br>
                        Selamat Menunggu
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'PesananCheckout',
    components: {
        Navbar
    }
}
</script>