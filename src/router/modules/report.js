import NavLayout from '@/layout/nav-layout.vue'
import Office_Report from '@/pages/office/report/index.vue'

export default {
    path: 'reports/',
    name: 'office-reports-layout',
    component: NavLayout,
    props(route) {
      return {
        title: route.meta.title,
        nav: [
          {
            name: 'Sales Report',
            path: 'office-accounts'
          },
          {
            name: 'Inventory Report',
            path: 'office-accounts-role'
          },
          {
            name: 'Employee Report',
            path: 'office-accounts-role'
          },
          {
            name: 'Customer Report',
            path: 'b'
          },
          {
            name: 'Income Statement',
            path: 'b'
          }
        ]
      }
    },
    children: [
        {
          path: '',
          name: 'office-report',
          component: Office_Report
        },
    ]
  }