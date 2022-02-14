import dotenv from 'dotenv'
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import VueResource from 'vue-resource';
import VuePageTransition from 'vue-page-transition'
import noAccess from './components/noAccess.vue'
import Vuelidate from 'vuelidate'

import './element-variables.scss'
import './spacing.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import permission from './permissions'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })
Vue.use(VueResource);
Vue.use(Vuelidate);
Vue.use(VuePageTransition)
let isLoggedIn;
if(localStorage.getItem('access_token') != ''){
  store.commit('SET_SESSION');
  isLoggedIn = store.getters['ISLOGGED'] 
}

Vue.http.options.root = 'http://localhost:4002/api/';
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', store.getters['TOKEN'])
  next(res => {                                                                                                                                                                                                                                                                                                                    
      if (res.status === 401 || res.status === 403) {
        store.commit('LOGOUT')
        router.push({name: 'login'});
      }
  })
})

router.beforeEach((to, from, next) => {
  isLoggedIn = store.getters['ISLOGGED'] 
  var userPermission = store.getters['PERMISSIONS']

  var role = store.getters['ROLE'] 

  if(to.name === null){
    return next({name: 'login'})
  }

  if(to.name != 'login'){
    if(!isLoggedIn){
      return next({name: 'login'})
    }else{
      permission.check()
    }
  }

  if(to.name == 'login'){
    if(role == 'employee'){
      return  next({name: 'pos-home'})
    }else if(role == 'admin'){
      return  next({name: 'office-dashboard'})
    }
  }

  next(vm => vm.setData(err, post))
})

Vue.component('no-access', noAccess)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
