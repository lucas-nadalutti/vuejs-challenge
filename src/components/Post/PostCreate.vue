<template>
  <div class="mx-auto w-25">
    <h1 class="text-center">Criar Post</h1>

    <post-form :post="post" :loading="loading"></post-form>
  </div>
</template>

<script>
import axios from 'axios'
import PostService from '@/services/PostService'
import PostForm from '@/components/Post/PostForm'

export default {
  components: { PostForm },
  name: 'PostCreate',
  data () {
    return {
      post: {
        title: '',
        description: ''
      },
      loading: false
    }
  },
  created() {
    this.$root.$on('postFormSubmit', () => {
      this.loading = true
      setTimeout(() => {
        PostService.create(this.post).then(response => {
          this.$router.push({name: 'Dashboard'})
          this.$store.commit('setSuccessFlash', 'Post criado com sucesso')
        })
        .catch(error => {
          this.$store.commit('setErrorFlash', 'Não foi possível criar este post')
        })
        .finally(() => {
          this.loading = false
        })
      }, 1000)
    })
  },
  destroyed() {
    this.$root.$off('postFormSubmit')
  }
}
</script>

<style scoped>

</style>
