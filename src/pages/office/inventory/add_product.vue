<template>
    <div class="dashboard-wrapper mt-15">
        <div class="clearfix"></div>
        <div class="dashboard-content p-20">
            <div class="form-box">
                <el-row>
                    <el-col :span="13">
                        <div class="pull-left">
                            <i class="fe-arrow-left dashboard-top--icon"></i>
                        </div>
                        <div class="form-title mb-40">Product Information</div>
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
                                    <input type="text" placeholder="Product name here ..." v-model.trim.lazy="$v.firstname.$model">
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
                            <el-col :span="7">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-tag"></i>
                                    <input type="email" placeholder="Barcode ID" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                            <el-col :span="7">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-tag"></i>
                                    <input type="email" placeholder="SKU" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <div class="hoz-line dark"></div>
                        <el-row :gutter="20" class="mt-20">
                             <el-col :span="12">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-square"></i>
                                    <input type="email" placeholder="Supplier" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                             <el-col :span="12">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-square"></i>
                                    <input type="email" placeholder="Manufacturer" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-square"></i>
                                    <input type="email" placeholder="Price" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-square"></i>
                                    <input type="email" placeholder="Quantity" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                             <el-col :span="8">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-square"></i>
                                    <input type="email" placeholder="Shelf ID" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="input-box" :class="{ 'input-box--error': $v.mail.$error }">
                                    <i class="fe-square"></i>
                                    <input type="email" placeholder="Restock limit" v-model.trim.lazy="$v.mail.$model">
                                </div>
                            </el-col>

                        </el-row>
            
                        <div class="btn btn-primary disabled" v-if="$v.$anyError">Add Product</div>
                        <div class="btn btn-primary disabled" v-else-if="submitting"><loader/></div>
                        <div class="btn btn-primary" @click="submit" v-else>Add Product</div>
                    </el-col>
                    <el-col :span="10">
                        <div class="form-title mb-40">Product Image</div>
                        <div class="preview">
                            <label for="avatar">
                                <div class="preview-box">
                                    <img :src="avatarImage" alt="">
                                </div>
                                <el-link class="mt-10" >Upload Image</el-link>
                            </label>
                            <input type="file" accept="image/x-png,image/gif,image/jpeg" id="avatar" class="input-file" @change="uploadAvatar">
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