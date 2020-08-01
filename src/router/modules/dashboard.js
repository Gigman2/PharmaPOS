import NavLayout from '@/components/nav-layout.vue'
import Office_Home from '@/pages/office/dashboard'

export default {
    path: '',
    name: 'office-dashboard-layout',
    component:NavLayout,
    props (route) {
      return {
        title: route.meta.title,
        nav: [
          {
            name: 'Administration Dashboard',
            path: 'office-sales'
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