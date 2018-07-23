import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Post from '@/components/Post'
import Login from '@/components/Login'
import Dashboard from '@/components/Post/Dashboard'
import PostCreate from '@/components/Post/PostCreate'
import PostEdit from '@/components/Post/PostEdit'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Post',
            component: Post,
            meta: {
                authRequired: false            
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                authRequired: false            
            }
        },
        {
          path: '/post',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
              authRequired: true            
          }
        },
        {
          path: '/post/new',
          name: 'PostCreate',
          component: PostCreate,
          meta: {
              authRequired: true            
          }
        },
        {
          path: '/post/edit/:id',
          name: 'PostEdit',
          component: PostEdit,
          meta: {
              authRequired: true            
          }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.authRequired && !store.state.authenticated) {
        store.commit('setErrorFlash', 'Você não tem permissão para acessar esta página')
        next({'name': 'Login'})
    }
    else {

        store.commit('resetFlash')
        next()
    }
})

 export default router
