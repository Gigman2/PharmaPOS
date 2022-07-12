import NavLayout from '@/layout/nav-layout.vue'
import Office_Report from '@/pages/office/report/index.vue'
import Office_Report_Inventory from '@/pages/office/report/report_inventory.vue'
import Office_Report_Employee from '@/pages/office/report/report_employee.vue'
import Office_Report_Customer from '@/pages/office/report/report_customer.vue'
import Office_Report_Supplier from '@/pages/office/report/report_supplier.vue'

export default {
    path: 'reports/',
    component: NavLayout,
    props(route) {
      return {
        title: route.meta.title,
        nav: [
          {
            name: 'Sales Report',
            path: 'office-report_sales'
          },
          {
            name: 'Inventory Report',
            path: 'office-report_inventory'
          },
          {
            name: 'Employee Report',
            path: 'office-report_employee'
          },
          {
            name: 'Customer Report',
            path: 'office-report_customer'
          },
          {
            name: 'Suppliers Report',
            path: 'office-report_supplier'
          }
        ]
      }
    },
    children: [
        {
          path: '',
          name: 'office-report_sales',
          component:  Office_Report,
          meta: {
            title: "Sales Report"
          },
        },
        {
          path: 'inventory',
          name: 'office-report_inventory',
          component: Office_Report_Inventory,
          meta: {
            title: "Inventory Report"
          },
        },
        {
          path: 'employee',
          name: 'office-report_employee',
          component: Office_Report_Employee,
          meta: {
            title: "Employee Report"
          },
        },
        {
          path: 'customer',
          name: 'office-report_customer',
          component: Office_Report_Customer,
          meta: {
            title: "Customer Report"
          },
        },
        {
          path: 'supplier',
          name: 'office-report_supplier',
          component: Office_Report_Supplier,
          meta: {
            title: "Supplier Report"
          },
        },
    ]
  }