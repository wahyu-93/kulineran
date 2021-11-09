<template>
    <div>
        <b-navbar toggleable="lg" type="light">
            <div class="container">
                <b-navbar-brand href="#">Kulineran</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item>
                            <router-link class="nav-link" to="/">
                                Home
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link class="nav-link" to="/foods">
                                Foods
                            </router-link>
                        </b-nav-item>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <router-link class="nav-link" to="/keranjang">
                            Keranjang
                            <b-icon-bag></b-icon-bag>
                            <span class="ml-1">
                                <div class="badge badge-success">{{ updateKeranjang ? updateKeranjang.length : keranjang.length }}</div>
                            </span>
                        </router-link>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'Navbar',
    data(){
        return{
            keranjang: []
        }
    },
    props: ['updateKeranjang'],
    mounted(){
        axios.get('http://localhost:3000/keranjangs')
        .then((response) => {
            this.keranjang = response.data
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
</script>