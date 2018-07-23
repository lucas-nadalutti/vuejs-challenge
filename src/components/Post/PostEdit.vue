<template>
  <div class="mx-auto w-25">
    <h1 class="text-center">Editar Post</h1>

    <post-form :post="post" :loading="loading"></post-form>
  </div>
</template>

<script>
import PostService from '@/services/PostService'
import PostForm from '@/components/Post/PostForm'

export default {
  components: { 'post-form': PostForm },
  name: 'PostEdit',
  data () {
    return {
      postId: null,
      post: {},
      loading: false
    }
  },
  created() {
    this.postId = this.$route.params.id
    this.post = this.$route.params.post

    this.$root.$on('postFormSubmit', () => {
      this.loading = true
      setTimeout(() => {
        PostService.edit(this.postId, this.post).then(response => {
          this.$router.push({name: 'Dashboard'})
          this.$store.commit('setSuccessFlash', 'Post alterado com sucesso')
        })
        .catch(error => {
          this.$store.commit('setErrorFlash', 'Não foi possível salvar este post')
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
