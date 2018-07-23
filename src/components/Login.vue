<template>
  <div class="mx-auto w-25">
    <h1 class="text-center">Login</h1>
    <b-form @submit="login">
      <b-form-group label="Usuário:"
                    label-for="username">
        <b-form-input id="username"
                      type="text"
                      v-model="form.username"
                      :state="!$v.form.username.$invalid || !$v.form.$dirty"
                      aria-describedby="usernameFeedback"
                      autofocus/>
        <b-form-invalid-feedback id="usernameFeedback">
          Nome de usuário precisa ser preenchido
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Senha:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      :state="!$v.form.password.$invalid || !$v.form.$dirty"
                      aria-describedby="passwordFeedback"/>
        <b-form-invalid-feedback id="passwordFeedback">
          Senha precisa ser preenchida
        </b-form-invalid-feedback>
      </b-form-group>
      
      <b-button type="submit" variant="success">Entrar</b-button>
    </b-form>
    <div class="text-center" v-show="loading">
      <img src="@/assets/loading.gif" />
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    login () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.$store.commit('setErrorFlash', 'Um ou mais campos foram preenchidos com erro')
        return
      }

      this.loading = true
      setTimeout(() => {
        AuthService.login(this.form.username, this.form.password)
        .then(response => {
          this.$store.commit('authenticate', response.data.token)
          this.$router.push({name: 'Dashboard'})
        })
        .catch(error => {
          this.$store.commit('setErrorFlash', 'Usuário ou senha incorretos')
        })
        .finally(() => {
          this.loading = false
        })
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
