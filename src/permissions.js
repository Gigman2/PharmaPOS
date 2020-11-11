import Vue from 'vue'
import store from './store'

const  permission =  {
    check: () => {
        Vue.http.get('users/user-permission')
        .then(res => {
            let result = res.body.result,
            permissions = {}
                
            result.map(item => {
                delete item.createdAt
                delete item.updatedAt
                delete item.roleId
                delete item.userId
                if(item.state == '1'){
                    item.state = true
                }else{
                    item.state = false
                }

                permissions[item.resourceId] = item
            })


            localStorage.setItem('account_permissions', JSON.stringify(permissions))
            store.commit('SET_PERMISSION')
        })
    }
}

export default permission