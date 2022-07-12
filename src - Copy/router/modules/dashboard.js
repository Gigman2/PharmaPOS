import NavLayout from '@/layout/nav-layout.vue'
import Office_Home from '@/pages/office/dashboard'

export default {
    path: '',
    component:NavLayout,
    props (route) {
      return {
        title: route.meta.title,
        nav: [
          {
            name: 'Administration Dashboard',
            path: 'office-dashboard'
          },
        ]
      }
    },
    children: [
        {
            path: '',
            name: 'office-dashboard',
            component: Office_Home,
            meta: {
              title: "Dashboard"
            },
        }
    ]
  }