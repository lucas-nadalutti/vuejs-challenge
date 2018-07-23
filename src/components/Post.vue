<template>
  <div>
    <h1 class="text-center">Avisos</h1>
    
    <div class="text-center" v-show="loading">
      <img src="@/assets/loading.gif" />
    </div>
    
    <b-card-group columns class="post-group">
      <b-card
        v-for="post in posts"
        :key="post.id"
        class="mb-2"
        >
        <h4>{{ post.title }}</h4>
        <p class="card-text">
          {{ post.description}}
        </p>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import PostService from '@/services/PostService'

export default {
  name: 'Post',
  data () {
    return {
      posts: [],
      loading: false
    }
  },
  mounted() {
    this.loading = true
    setTimeout(() => {
        PostService.list()
          .then(response => {
            this.posts = response.data
          })
          .catch(error => {
            this.$store.commit('setErrorFlash', 'Não foi possível buscar a lista de avisos')
          })
          .finally(() => {
            this.loading = false
          })
    }, 1000)
  }
}
</script>

<style scoped>
  .post-group {
    color: #28a745;
  }
</style>
