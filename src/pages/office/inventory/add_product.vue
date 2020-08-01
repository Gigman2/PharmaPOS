<template>
    <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="pull-left">
                <i class="fe-arrow"></i>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content p-20">
            <div class="form-box">
                <el-row>
                    <el-col :span="13">
                        <div class="form-title mb-40">Drug Information</div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="input-error-box" v-if="error">
                                    <i class="fe-alert-circle"></i>
                                    <span>{{errorMessage}}</span>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-box" :class="{ 'input-box--error': $v.firstname.$error }">
                                    <i class="fe-file-plus"></i>
                                    <input type="text" placeholder="Drug name here ..." v-model.trim.lazy="$v.firstname.$model">
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="input-box-el" :class="{ 'input-box--error': $v.lastname.$error }">
                                    <i class="fe-layers"></i>
                                        <el-select v-model="value" filterable placeholder="Category ...">
                                        <el-option
                                        v-for="item in ['Herbal', 'OTC', 'Consumable']"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-tag"></i>
                                    <input type="email" placeholder="Drug Generics" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <div class="hoz-line dark"></div>
                        <el-row :gutter="20" class="mt-20">
                            <el-col :span="14">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-square"></i>
                                    <input type="email" placeholder="Manufacturer" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                            <el-col :span="10   ">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-square"></i>
                                    <input type="email" placeholder="Supplier" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-bold"></i>
                                    <input type="email" placeholder="Batch No" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-clock"></i>
                                    <input type="email" placeholder="Expiry" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <div class="hoz-line dark"></div>
                        <el-row :gutter="20" class="mt-20">
                            <el-col :span="10">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-package"></i>
                                    <input type="email" placeholder="Quantity e.g 25" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                            <el-col :span="6"  offset="5">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-dollar-sign"></i>
                                    <input type="email" placeholder="Price" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class="mt-20">
                            <el-col :span="10" >
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-server"></i>
                                    <input type="email" placeholder="Loose Quanity " v-model.trim.lazy="$v.mail.$model">
                                    <i class="input-suffix">pcs</i>
                                </div>
                            </el-col>
                            <el-col :span="6" offset="5">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-dollar-sign"></i>
                                    <input type="email" placeholder="Loose Price" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                        </el-row>

                        <div class="btn btn-primary disabled" v-if="$v.$anyError">Add user</div>
                        <div class="btn btn-primary disabled" v-else-if="submitting"><loader/></div>
                        <div class="btn btn-primary" @click="submit" v-else>Add Drug</div>
                    </el-col>
                    <el-col :span="10">
                        <div class="form-title mb-40">Drug Overview</div>
                        <div class="product-overview">
                            <div class="product-overview--name">Artemether / lumefantrine</div>
                            <div class="product-overview--double mt-40">
                                <div class="product--sub">
                                    <span class="product--sub--caption">Manufacturer</span>
                                    <span class="product--sub--name">Kinapharma</span>
                                </div>
                                <div class="product--sub">
                                    <span class="product--sub--caption">Category</span>
                                    <span class="product--sub--name">Herbal</span>
                                </div>
                            </div>
                            <div class="product-overview--double mt-20">
                                <div class="product--sub">
                                    <span class="product--sub--caption">Dispensation</span>
                                    <span class="product--sub--name">Strip</span>
                                </div>
                                <div class="product--sub">
                                    <span class="product--sub--caption">Product Type</span>
                                    <span class="product--sub--name">Capsule</span>
                                </div>
                            </div>
                            <div class="product-overview--double mt-20">
                                <div class="product--sub">
                                    <span class="product--sub--caption">Quantity</span>
                                    <span class="product--sub--name">102</span>
                                </div>
                                <div class="product--sub">
                                    <span class="product--sub--caption">Restock at</span>
                                    <span class="product--sub--name">21</span>
                                </div>
                            </div>
                            <div class="product-overview--tags mt-20">
                                <el-tag effect="plain">Paracetamol</el-tag>
                                <el-tag effect="plain">Pain Killers</el-tag>
                            </div>
                            <div class="product-overview--price mt-30">Ghc 0.7 per strip</div>
                        </div>
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
    export default {
        components: {
            vueCustomScrollbar,
            Loader
        },
        data() {
            return {
                firstname: "",
                lastname: "",
                mail: "",
                role: "",
                phone: "",

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
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.mail,
                    role: this.role,
                    phone: this.phone
                }
                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                } else {
                   this.getAccounts(postdata)
                }
            },
            getAccounts(formdata){
                this.$http.post('users/new', formdata)
                .then(res => {
                    this.resetform
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
                this.mail = ""
                this.role = ""
                this.phone = ""
            }
        },
        created() {
            // this.getAccounts()
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