    <template>
    <div class="dashboard-wrapper mt-15">
        <div class="clearfix"></div>
        <div class="dashboard-content p-20">
            <div class="form-box" v-loading="loading">
                <el-row>
                    <el-col :span="13">
                        <div class="pull-left">
                            <router-link :to="{name: 'office-inventory_product'}">
                                <i class="fe-arrow-left dashboard-top--icon"></i>
                            </router-link>
                        </div>
                        <div class="form-title mb-40">New Stock Information</div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="input-error-box" v-if="error">
                                    <i class="fe-alert-circle"></i>
                                    <span>{{errorMessage}}</span>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-label">Pick Product</div>
                                <div class="input-box-el" :class="{ 'input-box--error': $v.product.$error }">
                                    <i class="fe-file-plus"></i>
                                   <el-select v-model.trim.lazy="$v.product.$model" filterable placeholder="Product name ... " @change="productChange">
                                        <el-option v-for="(item, i) in products" :key="item.key.id" :label="item.value" :value="i"> 
                                           <span style="float: left">{{ item.value }}</span>
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                        <!-- <div class="hoz-line dark"></div> -->
                        <el-row :gutter="20">
                            <el-col :span="10">
                                <div class="input-label">Product Supplier</div>
                                <div class="input-box-el" :class="{ 'input-box--error': $v.supplier.$error }">
                                    <i class="fe-server"></i>
                                    <el-select v-model.trim.lazy="$v.supplier.$model" filterable placeholder="Select Supplier">
                                        <el-option v-for="(item) in suppliers" :key="item.key" 
                                        :label="item.value" :value="item.key"> </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="7">
                                <div class="input-label">Update Price</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.price.$error }">
                                    <i class="fe-square"></i>
                                    <input type="text" placeholder="0.00" v-model.trim.lazy="$v.price.$model">
                                </div>
                            </el-col>
                            <el-col :span="7">
                                <div class="input-label">Quantity</div>
                                <div class="input-box" :class="{ 'input-box--error': $v.quantity.$error }">
                                    <i class="fe-square"></i>
                                    <input type="text" placeholder="0" v-model.trim.lazy="$v.quantity.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
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
                        <div class="btn btn-primary" @click="submit" v-else>Update Stock</div>
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
                product: "",
                supplier: "",
                price: "",
                quantity: "",
                restock: "",
                shelf: "", 
   
                suppliers: [],
                products: [],
                submitting: false,
                loading: false,
                error: false,
                errorMessage: null
            }
        },
        validations: {
            product: {
                required,
            },
            supplier: {
                
            },
            price: {
                
            },
            quantity: {
                required,
            },
            restock: {

            },
            shelf: {
                
            }
        },
        computed: {
            // ...mapGetters({
            //     barcode_online: 'BARCODE_ONLINE_STATE',  
            //     scanner: 'GET_BARCODE'
            // }),
        },
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                    productName: this.products[this.product].key.name,
                    productId: this.products[this.product].key.id,
                    supplierId: this.supplier,
                    initialStock: this.products[this.product].key.left,
                    currentStock: Number(this.products[this.product].key.left) + Number(this.quantity),
                    price: this.price,
                    quantity: this.quantity,
                    restock: this.restock,
                    shelf: this.shelf
                }

                postdata.left = postdata.currentStock
                
                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                } else {
                   this.updateProduct(postdata)
                }
            },
            updateProduct(payload){
                this.$http.post('product/stock/add', payload)
                .then(res => {
                    this.submitting = false
                    this.$notify({
                        title: 'Success',
                        message: "Product Stock updated",
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
            getSuppliers(){
                this.loading = true
                this.$http.get('product/supplier/list?type=simple')
                .then(res => {
                    this.loading = false
                    let data =  res.body.result
                    data.map((item, i) => {
                        let unit = {
                            key: item.id,
                            value: item.name
                        }
                        this.suppliers[i] = unit
                    })
                })
                .catch(err => {
                    this.loading = false
                })
            },
            getProducts(){
                this.loading = true
                this.$http.get('product/list')
                .then(res => {
                    let data =  res.body.result
                    data.map((item, i) => {
                        let unit = {
                            key: item,
                            value: item.name
                        }
                        this.products[i] = unit
                    })
                })
                .catch(err => {
                    this.loading = false
                })
            },
            productChange(){
                this.supplier = this.products[this.product].key.supplierId
                this.price = this.products[this.product].key.price
                this.restock = this.products[this.product].key.restock
                this.shelf = this.products[this.product].key.shelf
            },
            resetform(){
                this.name = ""
                this.supplier = ""
                this.price = ""
                this.quantity = ""
                this.restock = ""
                this.shelf = ""
                this.product = ""

                this.$nextTick(() => { this.$v.$reset() })
            },
        },
        created() {
            this.getProducts()
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