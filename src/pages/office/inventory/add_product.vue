<template>
    <div class="dashboard-wrapper mt-15">
        <div class="clearfix"></div>
        <div class="dashboard-top">
            <div class="table-buttons pull-right">
                <el-button type="success" size="medium" @click="openImportDialog = true" class="pull-right"> Import Data</el-button>
            </div>
        </div>
        <div class="dashboard-content p-20">
            <div class="form-box" v-loading="importing" >
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
                                    <input type="text" placeholder="" v-model.trim.lazy="$v.name.$model">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="input-label">Category</div>
                                <div class="input-box-el" :class="{ 'input-box--error': $v.category.$error }">
                                    <i class="fe-layers"></i>
                                        <el-select v-model="category" filterable placeholder="Select a category ">
                                        <el-option class="text-left"
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
                            <el-col :span="11">
                                <div class="input-label">Product Variant  <span class="pull-right">optional</span></div>
                                <div class="input-box" :class="{ 'input-box--error': $v.variant.$error }">
                                    <i class="fe-sm"></i>
                                    <input type="text" placeholder="200ml" v-model.trim.lazy="$v.variant.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <div class="hoz-line dark"></div>
                        <el-row :gutter="20" class="mt-20">
                            <el-col :span="8">
                                <div class="input-label">In Stock</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.quantity.$error }">
                                    <i class="fe-package"></i>
                                    <input type="text" placeholder="Total in stock " v-model.trim.lazy="$v.quantity.$model">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="input-label">Wholesale Price <span class="pull-right">optional</span></div>
                                <div class="input-box" :class="{ 'input-box--error': $v.wprice.$error }">
                                    <i class="fe-dollar-sign"></i>
                                    <input type="text" placeholder="How much do you sell it as wholesale" v-model.trim.lazy="$v.wprice.$model">
                                </div>
                            </el-col>
                             <el-col :span="8">
                                <div class="input-label">Quantity in each package   <span class="pull-right">optional</span></div>
                                <div class="input-box" :class="{ 'input-box--error': $v.pack_q.$error }">
                                    <i class="fe-package"></i>
                                    <input type="text" placeholder="Quantity in pack if any" v-model.trim.lazy="$v.pack_q.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <div class="hoz-line dark"></div>
                        <el-row :gutter="20" class="mt-10">
                             <el-col :span="8">
                                <div class="input-label">Retailing Quantity</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.pack_l.$error }">
                                    <i class="fe-package"></i>
                                    <input type="text" placeholder="Quantity in pack if any" v-model.trim.lazy="$v.pack_l.$model">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="input-label">Cost Price </div>
                                <div class="input-box" :class="{ 'input-box--error': $v.cprice.$error }">
                                    <i class="fe-dollar-sign"></i>
                                    <input type="text" placeholder="Cost price here" v-model.trim.lazy="$v.cprice.$model">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="input-label">Selling Price </div>
                                <div class="input-box" :class="{ 'input-box--error': $v.price.$error }">
                                    <i class="fe-dollar-sign"></i>
                                    <input type="text" placeholder="Enter price here" v-model.trim.lazy="$v.price.$model">
                                </div>
                            </el-col>
                            
                        </el-row>

                         <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="input-label">Stock Limit <span class="pull-right">optional</span></div>
                                <div class="input-box" :class="{ 'input-box--error': $v.restock.$error }">
                                    <input type="text" placeholder="level to alert shortage" v-model.trim.lazy="$v.restock.$model">
                                </div>
                            </el-col>

                             <el-col :span="16">
                                <div class="input-label">Shelf Number <span class="pull-right">optional</span></div>
                                <div class="input-box" :class="{ 'input-box--error': $v.shelf.$error }">
                                    <input type="text" placeholder="Place to add item" v-model.trim.lazy="$v.shelf.$model">
                                </div>
                            </el-col>
                        </el-row>

                        <el-button type="success" size="medium" icon="el-icon-plus" v-if="$v.$anyError">Add Product</el-button>
                        <el-button type="" size="medium" icon="el-icon-plus" v-else-if="submitting"><loader/></el-button>
                        <el-button type="success" size="medium" icon="el-icon-plus" @click="submit" v-else>Add Product</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>

        <el-dialog
            title="Import Products From Excel"
            :visible.sync="openImportDialog"
            width="30%">
            <div  class="form-box">
                <div class="text-left">
                    <div class="input-label-el mb-5">Rows to skip</div>
                    <div class="input-box">
                        <i class="fe-x-circle"></i>
                        <input type="text" placeholder="" v-model.trim.lazy="row">
                    </div>
                </div>

                <div class="text-left">
                   <div class="input-box-file">
                        <input id="logo" type="file" class="hidden" @change="uploadFile">
                        <label for="logo">
                            <div class="file-button">
                                <i class="fe-file"></i>
                                Load file
                            </div>
                        </label>
                        <div class="file-name">{{filename}}</div>
                    </div>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="openImportDialog = false">Cancel</el-button>
                <el-button type="primary" @click="openImportDialog = false; importFile()">Confirm</el-button>
            </span>
        </el-dialog>
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
                batch: "",
                generics: "",
                expiry:"",
                cprice: "",
                price: "",
                quantity: "",
                wprice: "",
                pack_q: "",
                pack_l: "",
                variant: "",
                restock: "",
                shelf: "", 
                dispensation: "single",
                image: null,
                
                file: '',
                row: '',
                fileType: '',
                mode: 'add',

                avatarImage: '',
                filename: '',
                categories: [],
                suppliers: [],

                importing: false,
                openImportDialog: false,
                submitting: false,
                error: false,
                errorMessage: null
            }
        },
        validations: {
            name: {
                required,
            },
            category: {},
            barcode: {},
            supplier: {},
            manufacturer: {},
            expiry: {},
            cprice: {},
            wprice: {},
            price: {},
            quantity: {},
            pack_q: {},
            pack_l: {},
            restock: {},
            shelf: {},
            variant: {}
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
                   manufacturer: this.manufacturer,
                   price: this.price,
                   cprice: this.cprice,
                   quantity: this.quantity,
                   restock: this.restock,
                   shelf: this.shelf,
                   variant: this.variant,
                }       
                                 
                if(this.pack_q){ 
                    postdata.pack_q = this.pack_q 
                }

                if(this.pack_l){ 
                    postdata.pack_l = this.pack_l 
                }

                if(this.wprice){ 
                    postdata.wprice = this.wprice 
                }

                if(this.supplier){
                    postdata.supplier = this.supplier
                }

                if(this.expiry){
                    postdata.expiry = this.expiry
                }
                
                if(this.mode == 'edit'){
                   postdata.left = postdata.quantity
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
            uploadFile(e){
                let file = e.target.files[0]
                this.filename = file.name
                this.file = file
            },
            saveProduct(payload){
                let formData = new FormData(); 
                const fields = Object.entries(payload);
                for(const index in fields){
                    formData.append(fields[index][0], fields[index][1]);
                }
                let url = 'product/new'
                if(this.mode == 'edit'){
                    formData.append('id', this.$route.params.id)
                    url = 'product/update'
                }

                this.$http.post(url, formData)
                .then(res => {
                    this.submitting = false
                    this.$notify({
                        title: 'Success',
                        message: "Product saved",
                        type: 'success'
                    });

                    if(this.mode == 'add'){
                        this.resetform()
                    }
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
                    this.cprice = data.cprice
                    this.wprice = data.wprice
                    this.quantity = data.left
                    this.restock = data.restock
                    this.variant = data.variant,
                    this.shelf = data.shelf

                    if(data.image != null){
                        this.itemImage = this.bucket+data.image;
                    }
                })
            },
            resetform(){
                this.name = ''
                this.category = ''
                this.barcode = ''
                this.supplier = ''
                this.manufacturer = ''
                this.price = ''
                this.cprice = ''
                this.wprice = ''
                this.quantity = ''
                this.pack_q = ''
                this.restock = ''
                this.shelf = ''
                this.expiry = ''
                this.variant = ''
                
                this.$nextTick(() => { this.$v.$reset() })
            },
            initScanner(){
                if(process.env.VUE_APP_PLATFORM === 'local'){
                    this.$store.dispatch('GET_BARCODE')
                    .then(res => {
                        let barcode_online = this.$store.getters['BARCODE_ONLINE_STATE'];
                        console.log(barcode_online)
                        if(barcode_online){
                            let barcode = this.$store.getters['GET_BARCODE']
                            if(barcode){
                                let scanner = BarcodeScanner ();
                                scanner.on((code, event) => {
                                    this.barcode = code
                                });
                            }
                        }
                    }) 
                }  
            },
            importFile(){
                let postData = {
                    row: this.row,
                    file: this.file,
                    type: this.fileType
                }

                this.row = '';
                this.file = ''
                this.fileType = ''
                this.importing = true

                let formData = new FormData(); 
                const fields = Object.entries(postData);
                for(const index in fields){
                    formData.append(fields[index][0], fields[index][1]);
                }

                this.$http.post('data/import', formData)
                .then(res => {
                    this.importing = false
                    this.filename = ""
                    this.file = ""
                     this.$notify({
                        title: 'Success',
                        message: "File Imported and saved",
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.importing = false
                     this.filename = ""
                    this.file = ""
                     this.$notify({
                        title: 'Success',
                        message: "Import could'nt complete",
                        type: 'error'
                    });
                })
            }
        },
        created() {
            if(!this.$route.params.id){
                this.mode = 'add'
            }else{
                this.mode = 'edit'
                this.getProduct()
            }

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

    .input-box-file{
        border: 1px solid #dadada;
        .file-button{
            background-color: #42b983;
            width: 90px;
            padding: 0 10px;
            border-radius: 5px;
            margin-right: 10px;
        }
    }
    
</style>