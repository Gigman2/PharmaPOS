<template>
    <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="pull-left">
                <router-link :to="{name: 'office-accounts'}">
                    <i class="fe-arrow-left back-icon pull-left"></i>
                </router-link>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content p-20">
            <div class="form-box">
                <el-row>
                    <el-col :span="13">
                        <div class="form-title mb-40">User Account Information</div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="input-error-box" v-if="error">
                                    <i class="fe-alert-circle"></i>
                                    <span>{{errorMessage}}</span>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-label">Username</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.username.$error }">
                                    <i class="fe-hexagon"></i>
                                    <input type="text" placeholder="" v-model.trim.lazy="$v.username.$model">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-label">Firstname</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.firstname.$error }">
                                    <i class="fe-user"></i>
                                    <input type="text" placeholder="Firstname here ..." v-model.trim.lazy="$v.firstname.$model">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-label">Lastname</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.lastname.$error }">
                                    <i class="fe-user"></i>
                                    <input type="text" placeholder="Lastname here ..." v-model.trim.lazy="$v.lastname.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <div class="input-label">Email</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-mail"></i>
                                    <input type="email" placeholder="Email here ..." v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="10">
                                <div class="input-label">Account role</div>
                                <div class="input-box-el" :class="{ 'input-box--error': $v.mail.$error }">
                                    <!-- <i class="fe-mail"></i> -->
                                    <el-select v-model.trim.lazy="$v.role.$model" placeholder="Role here ...">
                                        <el-option class="text-left"
                                        v-for="item in roles"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <div class="input-label">Email</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-phone"></i>
                                    <input type="text" placeholder="Phone number here ..." v-model.trim.lazy="$v.phone.$model">
                                </div>
                            </el-col>
                        </el-row>

                        <div class="btn btn-primary disabled" v-if="$v.$anyError">Add user</div>
                        <div class="btn btn-primary disabled" v-else-if="submitting"><loader/></div>
                        <div class="btn btn-primary" @click="submit" v-else>Add user</div>
                    </el-col>
                    <el-col :span="10">
                        <div class="form-title mb-40">User Avatar</div>
                        <label for="avatar">
                            <div class="avatar-box">
                                <img :src="avatarImage" alt="">
                            </div>
                            <el-link class="mt-10" >Upload Image</el-link>
                        </label>
                        <input type="file" accept="image/x-png,image/gif,image/jpeg" id="avatar" class="input-file" @change="uploadAvatar">
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, email } from 'vuelidate/lib/validators'
    import Loader from '@/components/loader.vue'
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import { mapGetters } from 'vuex';
    
    export default {
        components: {
            vueCustomScrollbar,
            Loader
        },
        data() {
            return {
                username: "",
                firstname: "",
                lastname: "",
                mail: "",
                role: "",
                phone: "",
                avatar: null,
                
                account:{},
                roles: [],
                
                avatarImage: '',
                submitting: false,
                error: false,
                errorMessage: null
            }
        },
         validations: {
            username: {
                required
            },
            firstname: {
                required,
            },
            lastname: {
                required,
            },
            mail: {
                required,
                email
            },
            role: {
                required,
            },
            phone: {
                 
            }
        },
        computed: {
            ...mapGetters({bucket: 'GET_BUCKET'})
        },
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                    username: this.username,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.mail,
                    roleId: this.role,
                    phone: this.phone,
                    id: this.$route.params.id
                }

                if(this.avatar != null){
                    postdata.avatar = this.avatar
                }

                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                } else {
                   this.editAccounts(postdata)
                }
            },
            editAccounts(payload){
                this.$http.put('users/update', payload)
                .then(res => {
                    this.submitting = false
                    this.$notify({
                        title: 'Success',
                        message: 'User account has been updated',
                        type: 'success'
                    });
                })
                .catch((err) => {
                    this.error = true
                    this.errorMessage = err.body.message
                    this.submitting =  false;
                })
            },
            getAccount(){
                this.$http.post('users/single', {id: this.$route.params.id})
                .then(res => {
                    let account = res.body.result
                    this.username = account.username
                    this.firstname = account.firstname
                    this.lastname = account.lastname
                    this.mail = account.email
                    this.role = account.role
                    this.phone = account.phone
                    this.avatar = null;

                    if(account.userrole !== undefined){
                        this.role = account.userrole.id
                    }

                    if(account.avatar != null){
                        this.avatarImage = this.bucket+account.avatar;
                    }
                })
            },
            uploadAvatar(e){
                let file = e.target.files[0]
                this.avatarImage = URL.createObjectURL(file);
                this.avatar = file
            },
            getRole(){
                this.$http.get('users/roles')
                .then(res => {
                    let roles = [];
                    let data =  res.body.result

                    data.forEach(item => {
                        let u = {
                            key: item.id,
                            value: item.name[0].toUpperCase() +  item.name.slice(1)
                        }
                        roles.push(u)
                    })
                    this.roles = roles
                })
                .catch(() => {

                })
            },
        },
        created() {
            this.getAccount()
            this.getRole()
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
    
</style>