<template>
    <div class="dashboard-wrapper mt-15">
        <div class="clearfix"></div>
        <div class="dashboard-content p-20">
            <div class="form-box">
                <el-row>
                    <el-col :span="13">
                        <div class="pull-left">
                            <router-link :to="{name: 'office-sales_customer'}">
                                <i class="fe-arrow-left dashboard-top--icon"></i>
                            </router-link>
                        </div>
                        <div class="form-title mb-40">Customer Information</div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="input-error-box" v-if="error">
                                    <i class="fe-alert-circle"></i>
                                    <span>{{errorMessage}}</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-box" :class="{ 'input-box--error': $v.firstname.$error }">
                                    <i class="fe-user"></i>
                                    <input type="text" placeholder="First Name here ..." v-model.trim.lazy="$v.firstname.$model">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-box" :class="{ 'input-box--error': $v.lastname.$error }">
                                    <i class="fe-user"></i>
                                    <input type="text" placeholder="Last Name here ..." v-model.trim.lazy="$v.lastname.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class="mt-20">
                            <el-col :span="10">
                                <div class="input-box-el" :class="{ 'input-box--error': $v.country.$error }">
                                    <i class="fe-map-pin"></i>
                                    <el-select v-model.trim.lazy="$v.country.$model" filterable placeholder="Select country">
                                        <el-option
                                        v-for="item in countries"
                                        :key="item.country"
                                        :label="item.country"
                                        :value="item.country">
                                            <span style="float: left">{{ item.country }}</span>
                                             <span style="float: right; color: #8492a6; font-size: 13px">{{ item.abbreviation }}</span>
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <div class="input-box" :class="{ 'input-box--error': $v.email.$error }">
                                    <i class="fe-mail"></i>
                                    <input type="text" placeholder="Email " v-model.trim.lazy="$v.email.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class="mt-20">
                            <el-col :span="10">
                                <div class="input-box-el" :class="{ 'input-box--error': $v.phone_code.$error }">
                                    <i class="fe-plus"></i>
                                    <el-select v-model.trim.lazy="$v.phone_code.$model" filterable placeholder="Select country">
                                        <el-option
                                        v-for="item in callCode"
                                        :key="item.country"
                                        :label="item.calling_code"
                                        :value="item.calling_code">
                                            <span style="float: left">{{ item.country }}</span>
                                             <span style="float: right; color: #8492a6; font-size: 13px">+{{ item.calling_code }}</span>
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <div class="input-box" :class="{ 'input-box--error': $v.phone.$error }">
                                    <i class="fe-phone"></i>
                                    <input type="text" placeholder="Phone Number " v-model.trim.lazy="$v.phone.$model">
                                </div>
                            </el-col>
                        </el-row>
            
                        <div class="btn btn-primary disabled" v-if="$v.$anyError">Add Customer</div>
                        <div class="btn btn-primary disabled" v-else-if="submitting"><loader/></div>
                        <div class="btn btn-primary" @click="submit" v-else>Add Customer</div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, helpers } from 'vuelidate/lib/validators'
    import Loader from '@/components/loader.vue'
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import Countries    from   "country-json/src/country-by-abbreviation.json"
    import Call_Code from "country-json/src/country-by-calling-code.json"

    export default {
        components: {
            vueCustomScrollbar,
            Loader
        },
        data() {
            return {
                firstname: "",
                lastname: "",
                country: "",
                email: "",
                phone: "",
                phone_code: "233",
                id: null,
                
                countries: Countries,
                callCode: Call_Code,
                submitting: false,
                error: false,
                errorMessage: null
            }
        },
         validations: {
            firstname: {
                required,
            },
            lastname: {
                required,
            },
            country: {
                required    
            },
            email: {

            },
            phone: {
                
            },
            phone_code: {

            }
        },
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                   firstname: this.firstname,
                   lastname: this.lastname,
                   email: this.email,
                   country: this.country,
                   id: this.id
                }

                var phone = this.phone
                if(phone !== '' && phone.startsWith(0)){
                    phone = phone.substr(1)
                }

                postdata.phone = this.phone_code.concat('', phone)



                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                } else {
                   this.saveCustomer(postdata)
                }
            },
            saveCustomer(payload){
                this.$http.post('sales/customer-save', payload)
                .then(res => {
                    this.submitting = false
                    this.$notify({
                        title: 'Success',
                        message: "Customer added",
                        type: 'success'
                    });
                    this.resetform()
                })
                .catch((err) => {
                    this.error = true
                    this.errorMessage = err.body.message
                     this.submitting =  false;
                })
            },
            resetform(){
                this.firstname = ""
                this.lastname = ""
                this.email = ""
                this.phone = ""
                this.country = ""

                this.$nextTick(() => { this.$v.$reset() })
            }
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
    }
    .avatar-box{
        width: 150px;
        height: 150px;
        background-color: #f0f0f0;
        margin: 0 auto;
        border-radius: 5px;
    }
    .form-title{
        font-size: 1.25em;
        font-family: 'Open sans';
        font-weight: bold;
        color: slategray;
    }
    .hoz-line{
        margin-top: 0;
    }

    .preview{
        input[type=file]{
            display: none;
        }
    }

    .preview-box{
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

    .product-overview{
        padding: 0 30px;
        &--name{
            text-align: center;
            font-size: 1.8em;
        }
        &--double{
            display: flex;
            justify-content: space-between;
        }
        &--tags{
            text-align: left;
            .el-tag{
                margin-right: 10px;
            }
        }
        &--price{
            font-size: 1.2em;
            font-weight: bold;
        }
    }

    .product{
        &--sub{
            &--caption{
                color: silver;
                margin-right: 10px;
                font-size: 1em;
            }
            &--name{
                font-size: 1.15em;
            }
        }
    }
    
</style>