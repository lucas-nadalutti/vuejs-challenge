<template>
  <div class="mx-auto w-75">
    <h1 class="text-center">Dashboard</h1>

    <div>
      <b-button variant="success" class="mb-3 float-right" :to="{name: 'PostCreate'}">
        <i class="fa fa-plus"></i> Adicionar Aviso
      </b-button>
    </div>
  
    <b-table id="dashboard-table" striped hover :items="posts" :fields="fields">
      <template slot="buttons" slot-scope="data">
        <router-link :to="{name: 'PostEdit', params: {id: data.item.id, post: data.item}}" class="action-button"><i class="fa fa-edit"></i></router-link>

        <a href="javascript:void(0)" v-b-modal.confirmDelete @click="postToDelete = data.item" class="action-button">
          <i class="fa fa-bomb"></i>
        </a>
      </template>

    </b-table>

    <b-modal  id="confirmDelete"
              title="Confirmar Ação"
              centered
              @ok="deletePost(postToDelete)"
              ok-title="Sim"
              cancel-title="Não"
              ok-variant="danger"
              cancel-variant="primary">
      <p v-if="postToDelete">Tem certeza de que deseja apagar o post {{ postToDelete.id }}?</p>
    </b-modal>

    <div class="text-center" v-show="loading">
      <img src="@/assets/loading.gif" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import PostService from '@/services/PostService'

export default {
  name: 'Dashboard',
  data() {
    return {
      posts: [],
      loading: false,
      fields: [
        {key: 'id', label: 'ID', sortable: true},
        {key: 'title', label: 'Título', sortable: true},
        {key: 'description', label: 'Descrição', sortable: true},
        {key: 'buttons', label: 'Ações'}
      ],
      postToDelete: null
    }
  },
  methods: {
    deletePost(post) {
      this.loading = true
      setTimeout(() => {
        PostService.delete(post.id)
          .then(response => {
            this.posts = _.filter(this.posts, (p) => { return p.id != post.id })
            this.$store.commit('setSuccessFlash', 'Post apagado com sucesso')
          })
          .catch(error => {
            this.$store.commit('setErrorFlash', 'Não foi possível apagar este post')
          })
          .finally(() => {
            this.loading = false
            this.postToDelete = null
          })
      }, 1000)
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
  #dashboard-table {
    color: #28a745;
  }
  .action-button {
    color: #28a745;
  }
</style>
