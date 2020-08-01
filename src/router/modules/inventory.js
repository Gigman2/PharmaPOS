import NavLayout from '@/components/nav-layout.vue'
import Office_Product from '@/pages/office/inventory/products'
import Office_Product_Add from '@/pages/office/inventory/add_product.vue'

export default {
    path: 'inventory/',
    name: 'office-inventory-layout',
    component: NavLayout,
    props (route) {
      return {
        title: route.meta.title,
        nav: [
          {
            name: 'Products',
            path: 'office-inventory'
          },
          {
            name: 'Stock Control',
            path: 'office-accounts-role'
          },
          {
            name: 'Category',
            path: 'b'
          },
          {
            name: 'Variant',
            path: 'b'
          },
          {
            name: 'Supplier',
            path: 'b'
          }
        ]
      }
    },
    children: [
        {
          path: '',
          name: 'office-inventory',
          component: Office_Product,
          meta: {
            title: "Drugs"
          },
        },
        {
          path: 'add',
          name: 'office-inventory_add',
          component: Office_Product_Add,
          meta: {
            title: "Add Drug"
          },
        },
    ]
  }