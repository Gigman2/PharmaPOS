import NavLayout from '@/layout/nav-layout.vue'
import Office_Sale from '@/pages/office/sales'
import Office_Customer from '@/pages/office/sales/customer'
import Office_Discount from '@/pages/office/sales/discount'

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
            path: 'office-sales_transaction'
          },
          {
            name: 'Customer',
            path: 'office-sales_customer'
          },
          {
            name: 'Discount & Promo',
            path: 'office-sales_discount'
          },
        ]
      }
    },
    children: [
        {
          path: '',
          name: 'office-sales_transaction',
          component: Office_Sale,
          meta: {
            title: "Sales transaction"
          },
        },
        {
          path: 'customers',
          name: 'office-sales_customer',
          component: Office_Customer,
          meta: {
            title: "Customers"
          },
        },
        {
          path: 'discount',
          name: 'office-sales_discount',
          component: Office_Discount,
          meta: {
            title: "Discounts"
          },
        },
    ]
  }