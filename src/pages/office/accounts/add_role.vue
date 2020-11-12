<template>
     <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="pull-left">
                <router-link :to="{name: 'office-accounts-role'}">
                    <i class="fe-arrow-left back-icon pull-left"></i>
                </router-link>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content p-20">
            <div class="form-box">
                <el-row>
                    <el-col :span="18">
                        <div class="form-title mb-40">Add role and permissions</div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="input-error-box" v-if="error">
                                    <i class="fe-alert-circle"></i>
                                    <span>{{errorMessage}}</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-label mt-20">Role name</div>
                                <div class="input-box">
                                    <i class="fe-hexagon"></i>
                                    <input type="text" placeholder="" v-model="role">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24" class="mb-20">
                                <div class="resource-input">
                                    <div class="resource-group-wrapper" v-for="(group, index) in resources" :key='index'>
                                        <h4 class="group-title text-left">{{index}} <span class="fe-arrow-down pull-right mr-20"></span></h4>
                                        <div class="resource-container"  v-for="(item, i) in group" :key="i">
                                            <div class="resource-name">{{item.name}}</div>
                                            <div class="resource-state">
                                                <el-switch
                                                    v-model="item.state"
                                                    active-color="#13ce66"
                                                    inactive-color="#ff4949">
                                                </el-switch>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>

                        <div class="btn btn-primary disabled" v-if="submitting"><loader/></div>
                        <div class="btn btn-primary" @click="saveRole" v-else>Save</div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, email } from 'vuelidate/lib/validators'
    import Loader from '@/components/loader.vue'
    export default {
        components: {
            Loader
        },
        data() {
            return {
                resources: [],
                role: "",

                roleId: null,
                submitting: false,
                error: false,
                errorMessage: null,
                mode: 'add'
            }
        },
        methods: { 
            getResources(){
                this.$http.get('users/resources')
                .then(res => {
                    let resources = res.body.result
                    let groupedResources = {}
                    resources.forEach(item => {
                        let group = item.group[0].toUpperCase() +  item.group.slice(1)
                        if(!groupedResources.hasOwnProperty(group)){
                            groupedResources[group] = []
                        }
                        groupedResources[group].push(item)
                    })
                    this.resources = groupedResources
                })
                .catch((err) => {
                    this.error = true
                    if(err.body){
                        this.errorMessage = err.body.message
                    }
                    else{
                        console.log(err)
                    }
                })
            },
            getResourcesAndPermissions(){
                this.$http.post('users/role-resources', {roleId: this.roleId})
                .then(res => {
                    let resources = res.body.result
                    let groupedResources = {}
                    resources.forEach(item => {
                        let group = item.group[0].toUpperCase() +  item.group.slice(1)
                        if(!groupedResources.hasOwnProperty(group)){
                            groupedResources[group] = []
                        }
                        groupedResources[group].push(item)
                    })
                    this.resources = groupedResources
                    
                })
                .catch((err) => {
                    this.error = true
                    if(err.body){
                        this.errorMessage = err.body.message
                    }
                    else{
                        console.log(err)
                    }
                })
            },
            saveRole(){
                this.error = false
                this.errorMessage = ""
                if(this.role == ''){
                    this.error = true
                    this.errorMessage = "Role is required"
                    return; 
                }
                this.submitting = true
                let postData = {};
                postData.name = this.role
                if(this.mode == 'edit'){
                    postData.roleId = this.roleId
                }

                postData.resource = this.resources
                this.$http.post('users/save-role',postData)
                .then(res => {
                    this.submitting = false
                   
                    if(this.mode == 'add'){
                        this.role = ''
                        this.getResources()
                    }
                    
                    this.$notify({
                        title: 'Success',
                        message: (this.mode == 'add') ? 'New role created' : 'Role updated successfully',
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.submitting = false
                })
            }
        },
        created() {
            let selectRole = JSON.parse(localStorage.getItem('selectedRole'));
            if(selectRole != null){
                this.mode = 'edit'
                this.roleId = selectRole.id;
                this.role = selectRole.name
            }
            if(this.mode == 'add'){
                this.getResources()
            }else{
                this.getResourcesAndPermissions()
            }
        },
    }
</script>


<style lang="scss" scoped>

    .form-box{
        .input-box{
            width: 100% !important;
        }
        .input-error-box{
            width: 100% !important;
        }
        .input-file{
            display: none;
        }
    }
    .avatar-box{
        width: 150px;
        height: 150px;
        background-color: #f0f0f0;
        margin: 0 auto;
        border-radius: 5px;
        cursor: pointer;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    .form-title{
        font-size: 1.25em;
        font-family: 'Open sans';
        font-weight: bold;
        color: slategray;
    }


    .group-title{
        padding-bottom: 10px;
        border-bottom: 1px solid silver;   
    }
    .resource-container{
        display: flex;
        justify-content: space-between;
        padding: 15px 10px;
        border-radius: 3px;
        &:hover{
            background-color: rgb(221, 221, 221);
        }
    }
    
</style>