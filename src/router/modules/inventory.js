import NavLayout from '@/layout/nav-layout.vue'
import Office_Product from '@/pages/office/inventory/products'
import Office_Product_Add from '@/pages/office/inventory/add_product.vue'
import Office_Product_Stock from '@/pages/office/inventory/stock.vue'

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
            path: 'office-inventory_stock'
          },
          {
            name: 'Category',
            path: 'office-inventory_category'
          },
          {
            name: 'Suppliers',
            path: 'office-inventory_supplier'
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
            title: "Products"
          },
        },
        {
          path: 'add',
          name: 'office-inventory_add',
          component: Office_Product_Add,
          meta: {
            title: "Add Product"
          },
        },
        {
          path: 'stock',
          name: 'office-inventory_stock',
          component: Office_Product_Stock,
          meta: {
            title: "Stock Control"
          },
        },
        {
          path: 'supplier',
          name: 'office-inventory_supplier',
          component: Office_Product_Stock,
          meta: {
            title: "Suppliers"
          },
        },
        {
          path: 'category',
          name: 'office-inventory_category',
          component: Office_Product_Stock,
          meta: {
            title: "Categories"
          },
        },
    ]
  }