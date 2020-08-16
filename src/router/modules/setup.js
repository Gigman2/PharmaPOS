import NavLayout from '@/layout/nav-layout.vue'

import Office_Setup_Company from '@/pages/office/setup/company.vue'
import Office_Setup_Hardware from '@/pages/office/setup/hardware.vue'

export default {
  path: 'setup',
  component: NavLayout,
  props (route) {
    return {
      title: route.meta.title,
      nav: [
        {
          name: 'Company',
          path: 'office-setup-company'
        },
        // {
        //   name: 'Data Import',
        //   path: 'office-accounts-role'
        // },
        {
          name: 'Hardware',
          path: 'office-setup-hardware'
        },
        // {
        //   name: 'Add-on',
        //   path: 'b'
        // }
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
      path: 'hardware',
      name: 'office-setup-hardware',
      component: Office_Setup_Hardware,
      meta: {
        title: "Hardware"
      },
    }
  ]
}