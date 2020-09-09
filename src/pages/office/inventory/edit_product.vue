<template>
    <div class="dashboard-wrapper mt-15">
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
                                <div class="input-label">Drug Name</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.name.$error }">
                                    <i class="fe-file-plus"></i>
                                    <input type="text" placeholder="" v-model.trim.lazy="$v.name.$model">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-label">Category </div>
                                <div class="input-box-el" :class="{ 'input-box--error': $v.category.$error }">
                                    <i class="fe-layers"></i>
                                        <el-select v-model="category" filterable placeholder="Select a category ">
                                        <el-option
                                        v-for="item in categories"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-label">Supplier <span class="pull-right">optional</span></div>
                                <div class="input-box-el" :class="{ 'input-box--error': $v.supplier.$error }">
                                    <i class="fe-layers"></i>
                                        <el-select v-model="supplier" filterable placeholder=" Select the supplier">
                                        <el-option
                                        v-for="item in suppliers"
                                         :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="hoz-line dark"></div>
                        <el-row :gutter="20" class="mt-20">
                            <el-col :span="12">
                                <div class="input-label">Manufacturer <span class="pull-right">optional</span></div>
                                <div class="input-box" :class="{ 'input-box--error': $v.manufacturer.$error }">
                                    <i class="fe-square"></i>
                                    <input type="text" placeholder="Manufacturer's name here" v-model.trim.lazy="$v.manufacturer.$model">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-label">Expiry <span class="pull-right">optional</span></div>
                                <div class="input-box-el" :class="{ 'input-box--error': $v.expiry.$error }">
                                    <!-- <i class="fe-clock"></i> -->
                                    <el-date-picker
                                        v-model.trim.lazy="$v.expiry.$model"
                                        type="date"
                                        placeholder="Pick a day">
                                    </el-date-picker>
                                </div>
                            </el-col>
                             <el-col :span="13">
                                <div class="input-label">Barcode  <span class="pull-right">optional</span></div>
                                <div class="input-box" :class="{ 'input-box--error': $v.barcode.$error }">
                                    <i class="fe-tag"></i>
                                    <input type="text" placeholder="xxxxxxxxxxxxxxxxxxx" v-model.trim.lazy="$v.barcode.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <div class="hoz-line dark"></div>
                        <el-row :gutter="20" class="mt-20">
                            <el-col :span="14">
                                <div class="input-label">Pack Quantity </div>
                                <div class="input-box" :class="{ 'input-box--error': $v.quantity.$error }">
                                    <i class="fe-package"></i>
                                    <input type="text" placeholder="Total packs in stock" v-model.trim.lazy="$v.quantity.$model">
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="input-label">Pack Price </div>
                                <div class="input-box" :class="{ 'input-box--error': $v.price.$error }">
                                    <i class="fe-dollar-sign"></i>
                                    <input type="text" placeholder="Price per pack" v-model.trim.lazy="$v.price.$model">
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="pull-left mb-20 mt-10 ">
                                    <el-checkbox v-model="hasl"><strong style="color: #43cea2">Can be sold in pieces</strong></el-checkbox>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" v-if="hasl">
                            <el-col :span="12" >
                                <div class="input-label">Quantity per Pack </div>
                                <div class="input-box" :class="{ 'input-box--error': $v.l_quantity.$error }">
                                    <i class="fe-server"></i>
                                    <input type="text" placeholder="Total pieces in pack " v-model.trim.lazy="$v.l_quantity.$model">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-label">Price Per Piece </div>
                                <div class="input-box" :class="{ 'input-box--error': $v.l_price.$error }">
                                    <i class="fe-dollar-sign"></i>
                                    <input type="text" placeholder="price for each piece" v-model.trim.lazy="$v.l_price.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="14">
                                <div class="input-label">Stock Limit <span class="pull-right">optional</span></div>
                                <div class="input-box" :class="{ 'input-box--error': $v.restock.$error }">
                                    <input type="text" placeholder="level to alert shortage" v-model.trim.lazy="$v.restock.$model">
                                </div>
                            </el-col>
                        </el-row>

                        <el-button type="success" size="medium" icon="el-icon-plus" v-if="$v.$anyError">Add user</el-button>
                        <el-button type="" size="medium" icon="el-icon-plus" v-else-if="submitting"><loader/></el-button>
                        <el-button type="success" size="medium" icon="el-icon-plus" @click="submit" v-else>Add Drug</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
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
                batch: "",
                generics: "",
                expiry:"",
                price: "",
                l_price: "",
                quantity: "",
                l_quantity: "",
                restock: "",
                shelf: "", 
                image: null,
                hasl: false,
                
                itemImage: '',
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
               
            },
            supplier: {
            },
            manufacturer: { 

            },
            expiry: {

            },
            price: {

            },
            l_price: {

            },
            quantity: {

            },
            l_quantity: {

            },
            restock: {

            },
            shelf: {
                
            },
        },
        computed: {
            ...mapGetters({bucket: 'GET_BUCKET'})
        },
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                  name: this.name,
                   category: this.category,
                   barcode: this.barcode,
                   supplier: this.supplier,
                   manufacturer: this.manufacturer,
                   price: this.price,
                   quantity: this.quantity,
                   restock: this.restock,
                   shelf: this.shelf,
                   expiry: this.expiry,
                   lprice: this.l_price,
                   lquantity: this.l_quantity,
                   hasloose: this.hasl,
                   id: this.$route.params.id
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
                this.itemImage = URL.createObjectURL(file);
                this.image = file
            },
            saveProduct(payload){
                let formData = new FormData(); 
                const fields = Object.entries(payload);
                for(const index in fields){
                    if(fields[index][1] != null){
                        formData.append(fields[index][0], fields[index][1]);
                    }
                }
                this.$http.post('product/update', formData)
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
                    this.categories.push({key:'', value: 'Not specified'})
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
                    this.suppliers.push({key:'', value: 'Not Specified'})
                })
            },

            getProduct(){
                this.$http.post('product/single?type=simple', {id: this.$route.params.id})
                .then(res => {
                    let data = res.body.result
                    this.id = data.id
                    this.name = data.name
                    this.category = data.categoryId
                    this.barcode = data.barcode
                    this.sku = data.sku
                    this.supplier = data.supplierId
                    this.manufacturer = data.manufacturer
                    this.expiry = data.expiry
                    this.price = data.price
                    this.quantity = data.quantity
                    this.l_price = data.lprice
                    this.l_quantity = data.lquantity
                    this.restock = data.restock

                    if(data.image != null){
                        this.itemImage = this.bucket+data.image;
                    }
                })
            },
            resetform(){
                this.$nextTick(() => { this.$v.$reset() })
            },
        },
        created() {
            this.getCategories()
            this.getSuppliers()
            this.getProduct()
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