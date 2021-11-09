<template>
    <div class="CardProduct">
        <div class="card card-product">
            <img class="card-img-top" :src="'../assets/images/'+product.gambar" :alt="product.gambar" height="250">
            <div class="card-body">
                <h5 class="card-title">{{ product.nama }}</h5>
                <p class="card-text">Harga: Rp. {{ product.harga.toLocaleString() }}</p>
                <router-link :to="'/food/' + product.id" class="btn btn-success btn-sm">
                    <b-icon-cart></b-icon-cart>
                    Pesan
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardProduct',
    props: ['product']
}
</script>

<style scoped>
    .card-product {
        border-radius: 15px;
    }

    .card-img-top {
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
    }
</style>