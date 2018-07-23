<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="success">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand :to="{name: 'Post'}">
        <img src="./assets/logo.png" width="50" height="50"/>
        <span>LaPoste</span>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item :to="{name: 'Dashboard'}" v-show="$store.state.authenticated">
            Dashboard
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{name: 'Login'}" v-show="!$store.state.authenticated">
            Login
          </b-nav-item>
          <b-nav-item @click="signOut" v-show="$store.state.authenticated">
            Sair
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    
    <b-alert :variant="$store.state.flash.type" :show="!!$store.state.flash.message">
      {{ $store.state.flash.message }}
    </b-alert>

    <div class="p-3">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    signOut() {
      this.$store.commit('signOut')
      this.$router.push({name: 'Post'})
    }
  }
}
</script>

<style>

  h1 {
    color: #28a745;
  }

</style>
