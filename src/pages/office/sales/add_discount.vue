<template>
    <div class="dashboard-wrapper mt-15">
        <div class="clearfix"></div>
        <div class="dashboard-content p-20">
            <div class="form-box">
                <el-row>
                    <el-col :span="17">
                        <div class="pull-left">
                            <router-link :to="{name: 'office-sales_discount'}">
                                <i class="fe-arrow-left dashboard-top--icon"></i>
                            </router-link>
                        </div>
                        <div class="form-title mb-40">Discount Information</div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="input-error-box" v-if="error">
                                    <i class="fe-alert-circle"></i>
                                    <span>{{errorMessage}}</span>
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <div class="input-label">Discount Code</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.code.$error }">
                                    <i class="fe-tag"></i>
                                    <input type="text" placeholder="XXXXXXXX" v-model.trim.lazy="$v.code.$model">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="input-label">Discount Percentage</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.percent.$error }">
                                    <i class="fe-percent"></i>
                                    <input type="text" placeholder="99" v-model.trim.lazy="$v.percent.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="input-label">Expires On</div>
                                <div class="input-box-el">
                                    <el-date-picker
                                        v-model="expires"
                                        type="date"
                                        placeholder="YYYY-MM-DD">
                                    </el-date-picker>
                                </div>
                            </el-col>
                             <el-col :span="6" class="mt-25">
                                <div class="input-label"></div>
                                <div class="input-box">
                                    <el-checkbox v-model="customerOnly">Applies to customers Only</el-checkbox>
                                </div>
                            </el-col>
                        </el-row>
                         <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="input-label">Use Limit</div>
                                <div class="input-box">
                                    <i class="fe-minus"></i>
                                    <input type="text" placeholder="0" v-model.trim.lazy="limit">
                                </div>
                            </el-col>

                            <el-col :span="8">
                                <div class="input-label">Use limit Per Customer</div>
                                <div class="input-box">
                                    <i class="fe-minus"></i>
                                    <input type="text" placeholder="infinite / number" v-model.trim.lazy="perCustomerUse">
                                </div>
                            </el-col>
                             <el-col :span="20">
                                <div class="input-label">Description</div>
                                <div class="input-box-el">
                                    <el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" placeholder="e.g Make a purchase worth Ghc 1000 and get 15% discount" v-model="description"></el-input>
                                </div>
                            </el-col>
                             
                        </el-row>
            
                        <div class="btn btn-primary disabled" v-if="$v.$anyError">Add Discount</div>
                        <div class="btn btn-primary disabled" v-else-if="submitting"><loader/></div>
                        <div class="btn btn-primary" @click="submit" v-else>Add Discount</div>
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
   
    export default {
        components: {
            vueCustomScrollbar,
            Loader
        },
        data() {
            return {
                code: "",
                percent: "",
                limit: 0,
                expires: "",
                customerOnly: false,
                perCustomerUse: 0,
                description: "",
                id: null,
                
                submitting: false,
                error: false,
                errorMessage: null
            }
        },
         validations: {
            code: {
                required,
            },
            limit: {
                
            },
            percent: {
                    
            },
            expires: {

            },
        },
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                    code: this.code.toUpperCase(),
                    useLimit: this.limit,
                    discount: this.percent,
                    customerOnly: this.customerOnly,
                    expires: this.expires ,
                    perCustomerUse: this.perCustomerUse, 
                    description: this.description,
                    id: this.id
                }

                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                } else {
                   this.saveDiscount(postdata)
                }
            },
            saveDiscount(payload){
                this.$http.post('sales/discount-add', payload)
                .then(res => {
                    this.submitting = false
                    this.$notify({
                        title: 'Success',
                        message: "Discount created",
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
                this.code = ""
                this.useLimit = ""
                this.discount = ""
                this.customerOnly = ""
                this.expires = ""
                this.perCustomerUse = ""
                this.description = ""

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