<template>
    <div class="main-wrapper">
        <div class="product-box">
            <div class="settings-title">Hello {{firstname}} !</div>
            <div class="inner-box">
                <div class="products-box">
                    <vue-custom-scrollbar class="settings">
                        <div class="form-box">
                            <el-row :gutter="20">
                                <el-col :span="24">
                                    <div class="input-error-box" v-if="error">
                                        <i class="fe-alert-circle"></i>
                                        <span>{{errorMessage}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="input-label ml-20">Firstname </div>
                                    <div class="input-box disabled">
                                        <i class="fe-user"></i>
                                        <input type="text" placeholder="First name here ..." v-model.lazy="firstname" readonly>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="input-label ml-20">Lastname </div>
                                    <div class="input-box disabled">
                                        <i class="fe-user"></i>
                                        <input type="text" placeholder="Last name here ..." v-model.lazy="lastname" readonly>
                                    </div>
                                </el-col>
                            </el-row>

                            <div class="horizontal-line"></div>

                            <el-row :gutter="20" class="mt-20">
                                <el-col :span="12">
                                    <div class="input-label ml-20">Username </div>
                                    <div class="input-box" :class="{ 'input-box--error': $v.username.$error }">
                                        <i class="fe-user"></i>
                                        <input type="text" placeholder="Username" v-model.lazy="username">
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row :gutter="20" class="mt-20">
                                <el-col :span="12">
                                    <div class="input-label ml-20">Email address </div>
                                    <div class="input-box" :class="{ 'input-box--error': $v.email.$error }">
                                        <i class="fe-mail"></i>
                                        <input type="text" placeholder="johndoe@gmail.com" v-model.lazy="email">
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="input-label ml-20">Phonenumber </div>
                                    <div class="input-box" :class="{ 'input-box--error': $v.phone.$error }">
                                        <i class="fe-phone"></i>
                                        <input type="text" placeholder="020 xxxxxxxxx" v-model.lazy="phone">
                                    </div>
                                </el-col>
                            </el-row>
                            <div class="mb-30" >
                                <div class="btn btn-primary disabled" v-if="$v.$anyError">Update Account</div>
                                <div class="btn btn-primary disabled" v-else-if="submitting"><loader/></div>
                                <div class="btn btn-primary" @click="submit" v-else>Update Account</div>
                            </div>
                            <div class="horizontal-line"></div>
                            <el-row :gutter="20" class="mt-20">
                                <el-col :span="24">
                                    <div class="input-label ml-20">Current Password </div>
                                    <div class="input-box">
                                        <i class="fe-unlock"></i>
                                        <input type="password" placeholder="****************" v-model="old_pass">
                                    </div>
                                </el-col>
                                <el-col :span="24">
                                    <div class="input-label ml-20">New Password </div>
                                    <div class="input-box">
                                        <i class="fe-lock"></i>
                                        <input type="password" placeholder="****************" v-model="password">
                                    </div>
                                </el-col>
                                <el-col :span="24">
                                    <div class="input-label ml-20">Confirm New Password </div>
                                    <div class="input-box">
                                        <i class="fe-lock"></i>
                                        <input type="password" placeholder="****************" v-model="c_pass">
                                    </div>
                                </el-col>
                            </el-row>

                            <div class="mb-30" >
                                <div class="btn btn-primary disabled" v-if="submitting"><loader/></div>
                                <div class="btn btn-primary" @click="updatePassword" v-else>Update Password</div>
                            </div>

                        </div>
                    </vue-custom-scrollbar>
                </div>
            </div>
        </div>
        <div class="checkout-box">
           <div class="checkout-invoice p-10">
                <!-- <div class="settings-title">Profile Information</div> -->
                <div class="settings-box">
                    
                </div>
           </div>   
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import { required, helpers } from 'vuelidate/lib/validators'
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    export default {
        components: {
            vueCustomScrollbar
        },
        data() {
            return {
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                phone: "",
                phone_code: "233",
                id: null,
                

                old_pass: "",
                c_pass: "",
                password: "",
                submitting: false,
                error: false,
                errorMessage: null
            }
        },
        validations: {
            username: {
                required    
            },
            email: {

            },
            phone: {
                
            },
            phone_code: {

            }
        },
        computed: {
            ...mapGetters({user: 'USER', fullname: 'FULLNAME', avatar:'AVATAR', userPermission: 'PERMISSIONS'})
        },
        mounted(){
            this.setField()
        },
        methods: {
            setField(){
                this.firstname = this.user.firstname
                this.lastname = this.user.lastname

                this.username = this.user.username
                this.email = this.user.email
                this.phone = this.user.phone
            },
            getAccount(){
                this.$http.post('users/single', {})
                .then(res => {
                    let account = res.body.result
                    localStorage.setItem('user', JSON.stringify(res.data.result))
                    this.$store.commit('SET_SESSION')
                })
                .catch(err => {

                })
            },
            submit(){
                let postdata = {
                    username: this.username,
                    email: this.email,
                    phone: this.phone
                }

                this.editAccounts(postdata)
            },
            editAccounts(payload){
                this.submitting = true
                let formData = new FormData(); 
                const fields = Object.entries(payload);
                for(const index in fields){
                    formData.append(fields[index][0], fields[index][1]);
                }
                this.$http.put('users/update', formData)
                .then(res => {
                    this.submitting = false
                    this.$notify({
                        title: 'Success',
                        message: 'User account has been updated',
                        type: 'success'
                    });
                    this.getAccount();
                })
                .catch((err) => {
                    this.error = true
                    this.errorMessage = err.body.message
                    this.submitting =  false;
                })
            },
            updatePassword(){
                let payload = {
                    old: this.old_pass,
                    password: this.password,
                    c_password: this.c_pass
                }
                let error = false
                if(this.old_pass != ""){
                    if(this.password == ''){
                        error = true
                        this.$notify({
                            title: 'Alert',
                            message: 'New password cant be empty',
                            type: 'error'
                        });
                    }

                    if(this.password != this.c_pass){
                        error = true
                        this.$notify({
                            title: 'Alert',
                            message: 'New password and confirm password dont match',
                            type: 'error'
                        });
                    }
                }else{
                    error = true
                    this.$notify({
                        title: 'Alert',
                        message: 'Enter current password',
                        type: 'error'
                    });
                }
                if(!error){
                    this.$http.post('users/set-password', payload)
                    .then(res => {
                        this.submitting = false
                        this.$notify({
                            title: 'Success',
                            message: 'Account password updated',
                            type: 'success'
                        });
                        this.old_pass = ''
                        this.password = ''
                        this.c_pass = ''
                    })
                    .catch((err) => {
                        console.log(err)
                        this.error = true
                        this.submitting =  false;
                    })
                }
            },
        },
        created() {
            this.getAccount()
        },
    }
</script>

<style lang="scss">
    .settings-title{
        color: #2c3e50;
        font-family: 'Open sans';
        font-size: 1.3em;
        font-weight: bold;
        padding: 10px;
        padding-top: 0;
    }

    .settings-box{
        padding: 10px;
    }

    .products-box{
        .settings{
            height: 500px;
            overflow: hidden;
        }
    }

    .input-box{
        width: calc(100% - 40px) !important;
    }
</style>