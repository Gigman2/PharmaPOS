import NavLayout from '@/layout/nav-layout.vue'
import Office_Account from '@/pages/office/accounts/index.vue'
import Office_Account_Add from '@/pages/office/accounts/add.vue'
import Office_Account_Edit from '@/pages/office/accounts/edit.vue'
import Office_Account_Role from '@/pages/office/accounts/roles.vue'
import Office_Account_Setting from '@/pages/office/accounts/settings.vue'


export default {
  path: 'accounts',
  component: NavLayout,
  props (route) {
    return {
      title: route.meta.title,
      nav: [
        {
          name: 'Users',
          path: 'office-accounts'
        },
        // {
        //   name: 'Role',
        //   path: 'office-accounts-role'
        // },
        {
          name: 'Settings',
          path: 'office-accounts-settings'
        }
      ]
    }
  },
  children: [
    {
      path: '',
      name: 'office-accounts',
      component: Office_Account,
      meta: {
        title: "Accounts"
      },
    },
    {
      path: 'add',
      name: 'office-accounts_add',
      component: Office_Account_Add,
      meta: {
        title: "Add Account" 
      },
    },
    {
      path: 'roles',
      name: 'office-accounts-role',
      component: Office_Account_Role,
      meta: {
        title: "Account Roles" 
      },
    },
    {
      path: 'settings',
      name: 'office-accounts-settings',
      component: Office_Account_Setting,
      meta: {
        title: "Account Settings" 
      },
    },
    {
      path: ':id',
      name: 'office-accounts_edit',
      component: Office_Account_Edit,
      meta: {
        title: "Edit Account" 
      },
    },
  ]
}