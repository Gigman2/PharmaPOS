import NavLayout from '@/layout/nav-layout.vue'
import Office_Product from '@/pages/office/inventory/products'
import Office_Product_Add from '@/pages/office/inventory/add_product.vue'
import Office_Product_Edit from '@/pages/office/inventory/edit_product.vue'
import Office_Product_Stock from '@/pages/office/inventory/stock.vue'
import Office_Product_Supplier from '@/pages/office/inventory/supplier.vue'
import Office_Product_Category from '@/pages/office/inventory/category.vue'
import Office_Product_Stock_Add from '@/pages/office/inventory/add_stock.vue'

export default {
    path: 'inventory/',
    component: NavLayout,
    props (route) {
      return {
        title: route.meta.title,
        nav: [
          {
            name: 'Products',
            path: 'office-inventory_product'
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
          name: 'office-inventory_product',
          component: Office_Product,
          meta: {
            title: "Products"
          },
        },
        {
          path: 'add',
          name: 'office-inventory_product^add',
          component: Office_Product_Add,
          meta: {
            title: "Add Product"
          },
        },
        {
          path: ':id/edit',  
          name: 'office-inventory_product^edit',
          component: Office_Product_Edit,
          meta: {
            title: "Edit Product"
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
          path: 'stock/add',
          name: 'office-inventory_stock^add',
          component: Office_Product_Stock_Add,
          meta: {
            title: "Add Stock"
          },
        },
        {
          path: 'stock/add/:id',
          name: 'office-inventory_stock^add-id',
          component: Office_Product_Stock_Add,
          meta: {
            title: "Add Stock"
          },
        },
        {
          path: 'supplier',
          name: 'office-inventory_supplier',
          component: Office_Product_Supplier,
          meta: {
            title: "Suppliers"
          },
        },
        {
          path: 'category',
          name: 'office-inventory_category',
          component: Office_Product_Category,
          meta: {
            title: "Categories"
          },
        },
    ]
  }