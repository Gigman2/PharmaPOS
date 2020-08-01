<template>
    <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ...">
            </div>
            <router-link :to="{name: 'office-accounts_add'}">
                <div class="btn btn-primary pull-right"><i class="fe-user"></i> New Account</div>
            </router-link>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-table :data="obj" style="width: 100%">
                <el-table-column prop="name" label="Account Role"></el-table-column>
                <el-table-column prop="permissions" label="Permissions"> </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                            <el-button size="mini" @click="triggerEdit(scope.row.id)">Edit</el-button>
                            <el-button size="mini" type="danger" @click="triggerDelete(scope.$index, scope.row.id)">Delete</el-button>
                    </template>
                </el-table-column>
        </el-table>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapGetters } from 'vuex';
    
    export default {
        data() {
            return {
                obj: [
                    {
                        name: 'Admin',
                        permissions: 'all'
                    },
                    {
                        name: 'Employee',
                        permissions: 'sales'
                    }
                ]
            }
        },
        components: {
            ...mapGetters({user: 'USER', roler: 'ROLE'})
        },
        methods: {
            getAccounts(){
                this.$http.get('users/list')
                .then(res => {
                    let data =  res.body.result
                    data.map(i => {
                        i.name = i.firstname+' '+i.lastname
                        i.login = 'never'
                        if(i.lastLogin){
                            i.login = moment(i.lastLogin).format('MMMM Do YYYY, H:mm')
                        }
                    })

                    this.accountData = data;
                })
                .catch(() => {

                })
            },
            triggerEdit(id){
                this.$router.push({name: 'office-accounts_edit', params: {id}})
            },
            async triggerDelete(index, id){
                if(this.accountData.length > 1){
                    let totalAdmins = 0;
                    await Promise.all(
                        this.accountData.map(item => {
                            if(item.role == 'admin'){
                                totalAdmins = totalAdmins + 1;
                            }
                        })
                    )

                    if(totalAdmins == 1 && this.accountData[index].role == 'admin'){
                        this.$notify({
                            title: 'Warning',
                            message: "Can't delete last admin account",
                            type: 'warning'
                        });
                    }else{
                        this.deleteAccount(index, id)
                    }
                }else{
                    this.$notify({
                        title: 'Warning',
                        message: "Can't delete ony account",
                        type: 'warning'
                    });
                }
            },
            deleteAccount(i, id){
                this.$http.post('users/remove', {id})
                .then(res => {
                     this.accountData.splice(i, 1);
                    this.$notify({
                        title: 'Success',
                        message: "account deleted",
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to delete account",
                        type: 'error'
                    });
                })
            }
        },
        created() {
        },
    }
</script>


<style lang="scss">
    .search-box{
        padding: 10px 15px;
        width: 50%;
        background-color: rgb(230, 230, 230);
        border-radius: 5px;
        text-align: left;
        i{
            margin-right: 20px;
        }
        input{
            border: none;
            background-color: transparent;
            outline: none;
            width: calc(100% - 70px)
        }
    }
    
</style>