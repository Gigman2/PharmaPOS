<template>
    <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ...">
            </div>
            <router-link :to="{ name: 'office-accounts_add',}">
                <div class="btn btn-primary pull-right"><i class="fe-user"></i> New Account</div>
            </router-link>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-table :data="accountData" style="width: 100%">
                <el-table-column prop="name" label="Full Name"></el-table-column>
                <el-table-column prop="role" label="Role"> </el-table-column>
                <el-table-column prop="email" label="Email"> </el-table-column>
                <el-table-column prop="phone" label="Phone"> </el-table-column>
                <el-table-column prop="login" label="Last Login"> </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                            <el-button size="mini" @click="triggerEdit(scope.row.id)">Edit</el-button>
                            <el-button size="mini" type="danger" @click="deleteModal(scope.$index, scope.row.id)">Delete</el-button>
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
                accountData: [
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
                        let role = ''
                        if(i.userrole !== undefined && i.userrole !== null){
                            role = i.userrole.name
                        }
                        i.role = role
                    })

                    this.accountData = data;
                })
                .catch(err => {
                    console.log(err)
                })
            },
            triggerEdit(id){
                this.$router.push({name: 'office-accounts_user^edit', params: {id}})
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
                    if(this.accountData[index].role == 'tech'){
                        this.$notify({
                            title: 'Warning',
                            message: "Can't delete tech account",
                            type: 'warning'
                        });
                    }else{
                        if(totalAdmins == 1 && this.accountData[index].role == 'admin'){
                            this.$notify({
                                title: 'Warning',
                                message: "Can't delete last admin account",
                                type: 'warning'
                            });
                        }else{
                            this.deleteAccount(index, id)
                        }
                    }
                    
                }else{
                    this.$notify({
                        title: 'Warning',
                        message: "Can't delete only account",
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
            },
            deleteModal(i, id) {
                this.$confirm('This will permanently delete the user. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                })
                .then(() => {
                    this.triggerDelete(i, id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });          
                });
            }
        },
        created() {
            this.getAccounts()
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