<template>
    <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ...">
            </div>
            <router-link :to="{name: 'office-accounts_role^add'}">
                <div class="btn btn-primary pull-right"><i class="fe-user"></i> New Role</div>
            </router-link>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-table :data="roles" style="width: 100%">
                <el-table-column prop="name" label="Account Role" width="200"></el-table-column>
                <el-table-column label="Assigned Accounts" :resizable="true"> 
                    <template slot-scope="scope">
                        <div>
                            <el-tag type="info" size="small"
                                v-for="(a, i) in scope.row.accounts" :key="i"
                                class="mr-5 mt-5">{{a.firstname+" "+a.lastname}}
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="200">
                    <template slot-scope="scope"  v-if="scope.row.deletable == false">
                            <el-button size="mini" @click="triggerEdit(scope.row)">Edit</el-button>
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
                roles: [],
            }
        },
        components: {
            ...mapGetters({user: 'USER', roler: 'ROLE'})
        },
        methods: {
            getRole(){
                this.$http.get('users/roles')
                .then(res => {
                    let data =  res.body.result
                    data.map(i => {
                        i.name = i.name[0].toUpperCase() +  i.name.slice(1)
                    })
                    this.roles = data
                })
                .catch(() => {

                })
            },
            triggerEdit(i){
                let selectedRole = i
                localStorage.setItem('selectedRole', JSON.stringify(selectedRole))
                this.$router.push({name: 'office-accounts_role^add'})
            },
            triggerDelete(i, id){
                this.$confirm('This will permanently delete the role. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                })
                .then(() => {
                    this.delete(i, id)
                }).catch(() => { 
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });          
                });
            },
            delete(){
                this.$http.post('users/remove', {id})
                .then(res => {

                })
                .catch(err => {
                    
                })
            }
        },
        created() {
            this.getRole()
            localStorage.setItem('selectedRole', null)
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