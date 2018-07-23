<template>
  <div>
    <b-form @submit="submitForm">
      <b-form-group label="Título:"
                    label-for="title">
        <b-form-input id="title"
                      type="text"
                      v-model="post.title"
                      :state="!$v.post.title.$invalid || !$v.post.$dirty"
                      aria-describedby="titleFeedback"
                      autofocus />
        <b-form-invalid-feedback id="titleFeedback">
          Título precisa ter entre 3 e 15 caracteres
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Descrição:"
                    label-for="description">
        <b-form-textarea id="description"
                      type="text"
                      v-model="post.description"
                      :state="!$v.post.description.$invalid || !$v.post.$dirty"
                      aria-describedby="descriptionFeedback"
                      :rows="3">
        </b-form-textarea>
        <b-form-invalid-feedback id="titleFeedback">
          Descrição precisa ter entre 3 e 15 caracteres
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button :to="{name: 'Dashboard'}" variant="primary">Voltar</b-button>
      <b-button type="submit" variant="success">Salvar</b-button>
    </b-form>
    <div class="text-center" v-show="loading">
      <img src="@/assets/loading.gif" />
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'


export default {
  name: 'PostForm',
  props: ['post', 'loading'],
  data () {
    return {}
  },
  validations: {
    post: {
      title: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15)
      },
      description: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15)
      }
    }
  },
  methods: {
    submitForm () {
      this.$v.post.$touch()
      if (this.$v.post.$invalid) {
        this.$store.commit('setErrorFlash', 'Um ou mais campos foram preenchidos com erro')
      }
      else {
        this.$store.commit('resetFlash')
        this.$root.$emit('postFormSubmit', this.post)        
      }
    }
  }
}
</script>

<style scoped>

</style>
