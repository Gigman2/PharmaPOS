<template>
    <div class="dashboard-wrapper mt-15">
        <div class="clearfix"></div>
        <div class="dashboard-content p-20">
            <div class="form-box">
                <el-row>
                    <el-col :span="13">
                        <div class="pull-left">
                            <router-link :to="{name: 'office-inventory_product'}">
                                <i class="fe-arrow-left dashboard-top--icon"></i>
                            </router-link>
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
                                <div class="input-label">Product Name</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.name.$error }">
                                    <i class="fe-file-plus"></i>
                                    <input type="text" placeholder="Product name here ..." v-model.trim.lazy="$v.name.$model">
                                </div>
                            </el-col>
                            <el-col :span="11">
                                <div class="input-label">Product category</div>
                                <div class="input-box-el" :class="{ 'input-box--error': $v.category.$error }">
                                    <i class="fe-layers"></i>
                                    <el-select v-model.trim.lazy="$v.category.$model" filterable placeholder="Select Category ...">
                                        <el-option v-for="item in categories" :key="item.key" 
                                        :label="item.value" :value="item.key"> </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <div class="input-label">Product Barcode</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.barcode.$error }">
                                    <i class="fe-tag"></i>
                                    <input type="text" placeholder="xxxxxxxxxxxxxxxx" v-model.trim.lazy="$v.barcode.$model">
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="input-label">Product SKU</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.sku.$error }">
                                    <i class="fe-tag"></i>
                                    <input type="text" placeholder="xxxxxxxxxxxxx" v-model.trim.lazy="$v.sku.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <div class="hoz-line dark"></div>
                        <el-row :gutter="20" class="mt-20">
                            <el-col :span="10">
                                <div class="input-label">Product Supplier</div>
                                <div class="input-box-el" :class="{ 'input-box--error': $v.supplier.$error }">
                                    <i class="fe-server"></i>
                                    <el-select v-model.trim.lazy="$v.supplier.$model" filterable placeholder="Select Supplier">
                                        <el-option v-for="item in suppliers" :key="item.key" 
                                        :label="item.value" :value="item.key"> </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                             <el-col :span="14">
                                <div class="input-label">Product Manufacturer</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.manufacturer.$error }">
                                    <i class="fe-database"></i>
                                    <input type="text" placeholder="Manufacturer" v-model.trim.lazy="$v.manufacturer.$model">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="input-label">Price</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.price.$error }">
                                    <i class="fe-square"></i>
                                    <input type="text" placeholder="0.00" v-model.trim.lazy="$v.price.$model">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="input-label">Quantity</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.quantity.$error }">
                                    <i class="fe-square"></i>
                                    <input type="text" placeholder="0" v-model.trim.lazy="$v.quantity.$model">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="input-label">Restock Limit</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.restock.$error }">
                                    <i class="fe-refresh-ccw"></i>
                                    <input type="text" placeholder="0" v-model.trim.lazy="$v.restock.$model">
                                </div>
                            </el-col>
                             <el-col :span="16">
                                <div class="input-label">Shelf ID / Product Position</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.shelf.$error }">
                                    <i class="fe-square"></i>
                                    <input type="text" placeholder="" v-model.trim.lazy="$v.shelf.$model">
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
    import BarcodeScanner from "simple-barcode-scanner";
    import { required, helpers } from 'vuelidate/lib/validators'
    import {mapGetters} from 'vuex'

    import Loader from '@/components/loader.vue'
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    export default {
        components: {
            vueCustomScrollbar,
            Loader
        },
        data() {
            return {
                name: "",
                category: "",
                barcode: "",
                sku: "",
                supplier: "",
                manufacturer: "",
                price: "",
                quantity: "",
                restock: "",
                shelf: "", 
                image: null,
                
                avatarImage: '',
                categories: [],
                suppliers: [],
                submitting: false,
                error: false,
                errorMessage: null
            }
        },
         validations: {
            name: {
                required,
            },
            category: "",
            barcode: {
                required,
                alphaChar:helpers.regex('alphaChar', /^[a-z0-9_-]*$/i),
            },
            sku: {
                alphaChar:helpers.regex('alphaChar', /^[a-z0-9_-]*$/i),
            },
            supplier: {
            },
            manufacturer: {
                
            },
            price: {
                
            },
            quantity: {
                
            },
            restock: {

            },
            shelf: {
                
            }
        },
        computed: {
            ...mapGetters({
                barcode_online: 'BARCODE_ONLINE_STATE',  
                scanner: 'GET_BARCODE'
            }),
        },
        mounted() {
          this.initScanner()  
        },
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                   name: this.name,
                   category: this.category,
                   barcode: this.barcode,
                   sku: this.sku,
                   supplier: this.supplier,
                   manufacturer: this.manufacturer,
                   price: this.price,
                   quantity: this.quantity,
                   restock: this.restock,
                   shelf: this.shelf
                }

                if(this.image != null){
                    postdata.image = this.image
                }

                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                } else {
                   this.saveProduct(postdata)
                }
            },
            uploadAvatar(e){
                let file = e.target.files[0]
                this.avatarImage = URL.createObjectURL(file);
                this.image = file
            },
            saveProduct(payload){
                let formData = new FormData(); 
                const fields = Object.entries(payload);
                for(const index in fields){
                    formData.append(fields[index][0], fields[index][1]);
                }
                this.$http.post('product/new', formData)
                .then(res => {
                    this.submitting = false
                    this.$notify({
                        title: 'Success',
                        message: "Product saved",
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
            getCategories(){
                this.$http.get('product/category/list?type=simple')
                .then(res => {
                    let data =  res.body.result
                    data.map((item, i) => {
                        let unit = {
                            key: item.id,
                            value: item.name
                        }
                        this.categories[i] = unit
                    })
                })  
            },
             getSuppliers(){
                this.$http.get('product/supplier/list?type=simple')
                .then(res => {
                    let data =  res.body.result
                    data.map((item, i) => {
                        let unit = {
                            key: item.id,
                            value: item.name
                        }
                        this.suppliers[i] = unit
                    })
                })
            },
            resetform(){
                this.name = ""
                this.category = ""
                this.barcode = ""
                this.sku = ""
                this.supplier = ""
                this.manufacturer = ""
                this.price = ""
                this.quantity = ""
                this.restock = ""
                this.shelf = ""
                this.avatarImage = ""
                this.avatar = null

                this.$nextTick(() => { this.$v.$reset() })
            },
            initScanner(){
                this.$store.dispatch('GET_BARCODE')
                .then(res => {
                    let barcode_online = this.$store.getters['BARCODE_ONLINE_STATE'];
                    if(barcode_online){
                        let barcode = this.$store.getters['GET_BARCODE']
                        if(barcode){
                            let scanner = BarcodeScanner ();
                            scanner.on((code, event) => {
                                console.log(event)
                                this.barcode = code
                            });
                        }
                    }
                })
            }
        },
        created() {
            this.getCategories()
            this.getSuppliers()
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