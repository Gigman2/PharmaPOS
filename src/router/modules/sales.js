import NavLayout from '@/components/nav-layout.vue'
import Office_Sale from '@/pages/office/sales'

export default {
    path: 'transaction/',
    name: 'office-sale-layout',
    component: NavLayout,
    props (route) {
      return {
        title: route.meta.title,
        nav: [
          {
            name: 'Transaction',
            path: 'office-sales'
          },
          {
            name: 'Customer',
            path: 'office-accounts-role'
          },
          {
            name: 'Discount & Promo',
            path: 'office-accounts-role'
          },
        ]
      }
    },
    children: [
        {
          path: '',
          name: 'office-sale',
          component: Office_Sale,
          meta: {
            title: "Sales transaction"
          },
        },
    ]
  }