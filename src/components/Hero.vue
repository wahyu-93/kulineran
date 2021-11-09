<template>
    <div class="hero">
        <!-- desktop -->
        <div class="d-none d-md-block">
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="d-flex h-100">
                        <div class="justify-content-center align-self-center">
                            <h3 class="mb-3">
                                <strong>Delicious Food Menu,</strong> <br>
                                in Your Gedget
                            </h3>

                            <p class="mb-3">Ayo Segera Pilih dan Pesan Makanan Favorit Anda</p>
                            <router-link to="/foods" class="btn btn-success btn-md">
                                <b-icon-arrow-right></b-icon-arrow-right>
                                Pesan
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <img src="../assets/images/hero.png" alt="kulineranApp" width="500">
                </div>
            </div>
        </div>

        <!-- mobile -->
        <div class="d-sm-block d-md-none">
            <div class="row mt-4">
                <div class="col-md-6 mb-5">
                    <img src="../assets/images/hero.png" alt="kulineranApp" width="350" class="mx-auto d-block">
                </div>

                <div class="col-md-6">
                    <div class="d-flex h-100">
                        <div class="justify-content-center align-self-center">
                            <h3 class="mb-3">
                                <strong>Delicious Food Menu,</strong> <br>
                                in Your Gedget
                            </h3>

                            <p class="mb-3">Ayo Segera Pilih dan Pesan Makanan Favorit Anda</p>
                            <router-link to="/pesan" class="btn btn-success btn-md">
                                <b-icon-arrow-right></b-icon-arrow-right>
                                Pesan
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Hero'
}
</script>