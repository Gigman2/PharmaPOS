<template>
     <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content p-20">
            <div class="form-box">
                <el-row>
                    <el-col :span="13">
                        <div class="form-title mb-40">Account Settings</div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="input-error-box" v-if="error">
                                    <i class="fe-alert-circle"></i>
                                    <span>{{errorMessage}}</span>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <div class="input-label">Enter current Password</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.old.$error }">
                                    <i class="fe-unlock"></i>
                                    <input type="password" placeholder="  *****************  " v-model.trim.lazy="$v.old.$model">
                                    <!-- <i class="fe-eye input-suffix" @click="viewPassword('old')"></i> -->
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="input-label">Enter new Password</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.new.$error }">
                                    <i class="fe-lock"></i>
                                    <input type="password" placeholder="  *****************  " v-model.trim.lazy="$v.new.$model">
                                    <!-- <i class="fe-eye input-suffix"></i> -->
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-label">Confirm Password</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.c_new.$error }">
                                    <i class="fe-lock"></i>
                                    <input type="password" placeholder="  ***************** " v-model.trim.lazy="$v.c_new.$model">
                                    <!-- <i class="fe-eye input-suffix"></i> -->
                                </div>
                            </el-col>
                        </el-row>

                        <div class="btn btn-primary disabled" v-if="$v.$anyError">Update settings</div>
                        <div class="btn btn-primary disabled" v-else-if="submitting"><loader/></div>
                        <div class="btn btn-primary" @click="submit" v-else>Update settings</div>
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
                old: "",
                new: "",
                c_new: "",
                
                avatarImage: '',
                submitting: false,
                error: false,
                errorMessage: null
            }
        },
        validations: {
            old: {
                required
            },
            new: {
                required
            },
            c_new: {
                required
            },
        },
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                    old: this.old,
                    password: this.new,
                    c_password: this.c_new
                }

                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                } else {
                   this.updatePassword(postdata)
                }
            },
            updatePassword(payload){
                this.$http.post('users/set-password', payload)
                .then(res => {
                    this.submitting = false
                    this.$notify({
                        title: 'Success',
                        message: 'Account password updated',
                        type: 'success'
                    });
                    this.resetform()
                })
                .catch((err) => {
                    console.log(err)
                    this.error = true
                    this.errorMessage = err.body.message
                     this.submitting =  false;
                })
            },
            resetform(){
                this.old = ""
                this.new = ""
                this.c_new = ""

                this.$nextTick(() => { this.$v.$reset() })
            },
        },
        created() {
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
    .input-suffix{
        cursor: pointer;
    }
    
</style>