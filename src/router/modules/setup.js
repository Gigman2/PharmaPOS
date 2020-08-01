import NavLayout from '@/components/nav-layout.vue'
import Office_Setup_Company from '@/pages/office/setup/company.vue'

export default {
  path: 'setup',
  name: 'office-setup-layout',
  component: NavLayout,
  props (route) {
    return {
      title: route.meta.title,
      nav: [
        {
          name: 'Company',
          path: 'office-setup-company'
        },
        {
          name: 'Data Import',
          path: 'office-accounts-role'
        },
        {
          name: 'Hardware',
          path: 'b'
        },
        {
          name: 'Add-on',
          path: 'b'
        }
      ]
    }
  },
  children: [
    {
      path: '',
      name: 'office-setup-company',
      component: Office_Setup_Company,
      meta: {
        title: "Company"
      },
    },
    {
      path: '',
      name: 'office-setup-company',
      component: Office_Setup_Company,
      meta: {
        title: "Data Import"
      },
    }
  ]
}