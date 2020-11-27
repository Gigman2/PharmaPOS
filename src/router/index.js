import Vue from 'vue'
import VueRouter from 'vue-router'

// Layouts
import AccessLayout from '../layout/access.vue'
import POSLayout from '../layout/pos.vue'
import OfficeLayout from '../layout/office.vue'


import Login from '../pages/login.vue'
import POS_Home from '../pages/pos'
import POS_History from '../pages/pos/history.vue'
import POS_Settings from '../pages/pos/settings.vue'

import AccountRoutes from './modules/account'
import DashboardRoutes from './modules/dashboard'
import InventoryRoutes from './modules/inventory'
import ReportRoutes from './modules/report'
import SalesRoutes from './modules/sales'
import SetupRoutes from './modules/setup'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/access/',
    component: AccessLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      }
    ]
  },
  {
    path: '/sell/',
    component: POSLayout,
    children: [
      {
        path: '',
        name: 'pos-home',
        component: POS_Home
      },
      {
        path: 'history',
        name: 'pos-history',
        component: POS_History
      },
      {
        path: 'settings',
        name: 'pos-settings',
        component: POS_Settings
      }
    ]
  },
  {
    path: '/office/',
    component: OfficeLayout,
    children: [
      DashboardRoutes,
      SalesRoutes,
      InventoryRoutes,
      ReportRoutes,
      AccountRoutes,
      SetupRoutes,
    ]
  },

  {
    path: '',
    redirect: {name: 'login'}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
