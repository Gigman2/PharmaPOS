<template>
    <div class="main-wrapper">
        <div class="product-box">
            <div class="inner-box">
                <div class="form-box">
                    <div class="input-box">
                        <i class="fe-search"></i>
                        <input type="text" placeholder="Search ..." v-model="q" @keyup="search()">
                    </div>
                </div>
                <div class="filter-box">
                    <!-- <i class="fe-filter"></i> -->
                    <ul class="filters">
                        <li class="shadow-1 active" @click="filerByCategory('all', $event)">
                             <span>All</span>
                        </li>
                        <li class="shadow-1" v-for="(item, i) in categories" :key="i" 
                           @click="filerByCategory(item, $event)">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="clearfix"></div>

                <div class="products-box">
                    <div class="products-title">Products</div>
                    <vue-custom-scrollbar class="scroll-area products" :settings="settings" v-loading="loading">
                        <div class="product-row" v-for="(row, index) in products" :key="index">
                            <el-tooltip class="item" effect="dark" placement="bottom-end"
                                v-for="(item, i) in row" :key="i">
                                <div slot="content">{{item.name}} <br/> {{(item.manufacturer !== 'null')? item.manufacturer : ''}}</div>
                                <div class="product shadow-1" v-if="item.left > item.restock" @click="addItem(item)">
                                    <div class="product-image">
                                        <div class="image">
                                            <img :src="bucket+item.image" alt="" v-if="item.image">
                                            <img src="@/assets/images/pills.svg" alt="" style="width: 75%; margin-top: 10px" v-else>
                                        </div>
                                    </div>
                                    <div class="product-title">{{item.name}}</div>
                                    <div class="product-price">Ghc {{item.price}}.00</div>
                                </div>
                                <div class="product shadow-1 disabled outstock" v-else-if="item.left <= 0">
                                    <div class="product-image">
                                        <div class="image">
                                            <img :src="bucket+item.image" alt="" v-if="item.image">
                                            <img src="@/assets/images/pills.svg" alt="" style="width: 75%; margin-top: 10px" v-else>
                                        </div>
                                    </div>
                                    <div class="product-title">{{item.name}}</div>
                                    <div class="product-price">Ghc {{item.price}}.00</div>
                                </div>
                                <div class="product shadow-1 shortage" @click="showDrugDialog = true;" v-else>
                                    <div class="product-image">
                                        <div class="image">
                                            <img :src="bucket+item.image" alt="" v-if="item.image">
                                            <img src="@/assets/images/pills.svg" alt="" style="width: 75%; margin-top: 10px" v-else>
                                        </div>
                                    </div>
                                    <div class="product-title">{{item.name}}</div>
                                    <div class="product-price">Ghc {{item.price}}.00</div>
                                </div>
                            </el-tooltip>
                        </div>
                    </vue-custom-scrollbar>
                </div>
            </div>
        </div> 
        <div class="checkout-box">
           <div class="checkout-invoice">
                <div class="checkout-title">
                    <div class="pull-left checkout-title--title">Purchase Detail</div>
                    <div class="pull-right checkout-title--actions">
                        <span @click="checkout('hold')">Hold</span>
                        <i class="fe-user-plus" v-if="customer === null" @click="showCustomerDialog = true"></i>
                        <i class="fe-user-minus" v-else @click="customer = null"></i>
                        <!-- <i class="fe-tag" v-if="discount == 0" @click="showDiscountDialog = true"></i>
                        <span  v-else>{{discount}} <em class="fe-percent"></em></span> -->
                        <i class="fe-slash " @click="resetOrder"></i>
                    </div>
                </div>
                <div class="clearfix"></div>
                <vue-custom-scrollbar class="checkout-table-wrapper">
                    <table class="checkout-table" cellspacing="0" cellpadding="0">
                        <thead class="checkout-headings">
                            <tr>
                                <th width="30px"></th>
                                <th>Name</th>
                                <th>QTY</th>
                                <th width="60px">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="checkout-item-row" :class="{'selected': item.selected}"
                                v-for="(item, e) in orderProducts" :key="e">
                                <td><i class="fe-trash-2 delete" @click="deleteItem(e)"></i></td>
                                <td width="45%">{{item.name}}</td>
                                <td>
                                    <div class="circle-outline" @click="counter('minus', e)">
                                        <span class="dripicons-minus"></span>
                                    </div>
                                    <span>{{item.quantity}}</span>
                                    <div class="circle-outline" @click="counter('add', e)">
                                        <span class="dripicons-plus"></span>
                                    </div>
                                </td>
                                <td>{{item.price}}.00</td>
                            </tr>
                        </tbody>
                    </table>
                </vue-custom-scrollbar>
                <!-- <table class="checkout-subtotal">
                    <tbody>
                        <tr>
                            <th align="left">Tax (0.015%)</th>
                            <td>Ghc {{tax}}</td>
                        </tr>
                    </tbody>
                </table> -->
                <table class="checkout-total">
                    <tbody>
                        <tr>
                            <th align="left">Total </th>
                            <td width="100px" align="right">Ghc{{grossTotal}}.00</td>
                        </tr>
                    </tbody>
                </table>
           </div>
           <div class="checkout-pay-section">
                <div class="checkout-payout disabled" v-if="Number(grossTotal) < 1" ><span>Pay</span> (Ghc {{grossTotal}})</div>
                <div class="checkout-payout" v-else @click="showPaymentDialog = true" ><span>Pay</span> (Ghc {{grossTotal}})</div>
                <div class="checkout-reset" @click="resetOrder">Reset</div>
           </div>
        </div>

        <el-dialog
            title="Add Drug"
            :visible.sync="showDrugDialog"
            width="30%">
            <div class="form-box">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="input-label">Pack Quantity</div>
                        <div class="input-box">
                            <input type="text" placeholder="Pack Quantity" v-model="pack">
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="input-label">Loose Quantity</div>
                        <div class="input-box">
                            <input type="text" placeholder="Pack Quantity" v-model="loose">
                        </div>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDrugDialog = false">Cancel</el-button>
                <el-button type="primary" @click="showDrugDialog = false">Confirm</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="Attach Customer"
            :visible.sync="showCustomerDialog"
            width="30%">
            <div class="form-box">
                <el-row :gutter="20">
                    <el-col :span="24" v-if="!activateNewCustomer">
                        <div class="input-box-el">
                            <i class="fe-user-plus"></i>
                            <el-select v-model="customer" filterable placeholder="Select customer">
                                <el-option
                                v-for="item in customers"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                    <span style="float: left">{{ item.name }}</span>
                                </el-option>
                            </el-select>
                        </div>
                        <div class="pull-left">
                            <el-link icon="el-icon-plus" @click="activateNewCustomer = true">Add new customer</el-link>
                        </div>
                    </el-col>
                    <el-col :span="24" v-else>                        
                        <div class="input-box">
                            <i class="fe-user"></i>
                            <input type="text" placeholder="First Name here ..." v-model.trim.lazy="newCustomer.firstname">
                        </div>
                        <div class="input-box">
                            <i class="fe-user"></i>
                            <input type="text" placeholder="Last Name here ..." v-model.trim.lazy="newCustomer.lastname">
                        </div>
                         <div class="input-box">
                            <i class="fe-phone"></i>
                            <input type="text" placeholder="Phone Number here ..." v-model.trim.lazy="newCustomer.phone">
                        </div>
                        <div class="pull-left">
                            <el-link icon="el-icon-plus" @click="activateNewCustomer = false">Existing customer</el-link>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showCustomerDialog = false">Cancel</el-button>
                <el-button type="primary" @click="showCustomerDialog = false" v-if="!activateNewCustomer">Confirm</el-button>
                <el-button type="primary" @click="saveCustomer()" v-else>Save &amp; Attach</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="Add Discount"
            :visible.sync="showDiscountDialog"
            width="30%">
            <div class="form-box">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="input-box">
                            <i class="fe-user-plus"></i>
                            <input type="text" placeholder="Discount Code" v-model="discountCode">
                        </div>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDiscountDialog = false">Cancel</el-button>
                <el-button type="primary" @click="showDiscountDialog = false">Confirm</el-button>
            </span>
        </el-dialog>
        
        <el-dialog
            title="Split Payment"
            :visible.sync="showPaymentDialog"
            width="30%">
            <div class="form-box">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="payment-title">Cash</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="input-box" :class="{ 'input-box--error': $v.cash.$error }">
                            <i class="">Ghc</i>
                            <input type="text" placeholder="0.00" v-model.trim.lazy="$v.cash.$model" @blur="splitPayment('cash')" @change="splitPayment('cash')">
                        </div>
                    </el-col>
                     <el-col :span="12">
                        <div class="payment-title">Mobile Money</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="input-box" :class="{ 'input-box--error': $v.momo.$error }">
                            <i class="">Ghc</i>
                            <input type="text" placeholder="0.00" v-model.trim.lazy="$v.momo.$model" @blur="splitPayment('momo')" @change="splitPayment('momo')">
                        </div>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button style="float: left" @click="quickPay(); showPaymentDialog = false">Quick Pay</el-button>
                
                <el-button @click="showPaymentDialog = false">Cancel</el-button>
                <el-button type="primary" v-if="(Number(cash) + Number(momo)) == grossTotal"
                 @click="checkout('pay'); showPaymentDialog = false">Checkout</el-button>
                <el-button v-else type="primary" disabled>Checkout</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import BarcodeScanner from "simple-barcode-scanner";
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    import {mapGetters} from 'vuex';
    import { required, helpers, decimal } from 'vuelidate/lib/validators'

    export default {
        components: {
            vueCustomScrollbar
        },
        data() {
            return {
                settings: {
                    maxScrollbarLength: 60
                },

                showCustomerDialog: false,
                showDiscountDialog: false,
                showPaymentDialog: false,
                activateNewCustomer: false,
                
                newCustomer: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: ''
                },

                cash: 0,
                momo: 0,
                
                q: '',
                id: null,
                barcodeScanned: '',
                netTotal: 0,
                grossTotal: 0,
                tax: 0,
                categories: [],
                products: [],
                orderProducts: [],
                customers: [],
                customer: null,

                discount: 0,
                discountCode: '',
                discountId: null,

                loading: true,
            }
        },
        validations: {
            cash: {
                required,
                decimal
            },
            momo: {
                decimal
            }
        },
        computed: {
            ...mapGetters({
                bucket: 'GET_BUCKET',
                barcode_online: 'BARCODE_ONLINE_STATE',  
                scanner: 'GET_BARCODE'
            }),
        },
        mounted() {
            this.initScanner()  
        },
        methods: {
            getCategories(){
                this.$http.get('product/category/list?type=simple')
                .then(res => {
                    let data =  res.body.result
                    this.categories = data
                })
                .catch(err => {
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to load data",
                        type: 'error'
                    });
                })

            },
            getProducts(){
                this.loading = true
                this.$http.get('product/list')
                .then(res => {
                    let data =  res.body.result
                    this.products = data;
                    var newData = [];
                    var index = 0;
                    this.products.forEach((element,i )=> {
                        if((i+1)% 6 == 0){
                            index  = index + 1;
                            console.log(index)
                        }
                        if(newData[index] === undefined){
                            newData[index] = []
                        }
                        newData[index].push(element)
                    });
                    this.products = newData
                    this.loading = false
                })
                .catch((err) => {
                    this.loading = false
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to load data",
                        type: 'error'
                    });
                })
            },
            productSearch(query){
                this.loading = true
                this.$http.get('product/search', {
                    params: query
                })
                .then(res => {
                    let data =  res.body.result
                    this.products = data;
                    var newData = [];
                    var index = 0;
                    this.products.forEach((element,i )=> {
                        if((i+1)% 6 == 0){
                            index  = index + 1;
                        }
                        if(newData[index] === undefined){
                            newData[index] = []
                        }
                        newData[index].push(element)
                    });
                    this.products = newData
                    if(query.barcode && data !== undefined){
                        this.addItem(data[0])
                    }
                    this.loading = false
                })
                .catch((err) => {
                    this.loading = false
                    this.$notify({
                        title: 'Not found',
                        message: "Product not found",
                        type: 'warning'
                    });
                })
            },
            getCustomers(){
                this.$http.get('sales/customer-list')
                .then(res => {
                    let data =  res.body.result
                    data.map(item => {
                        item.name = item.firstname+' '+item.lastname
                    })
                    this.customers = data
                })
                .catch(err => {
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to load data",
                        type: 'error'
                    });
                })

            },
            filerByCategory(i, e){
                let element = e.target
                if(e.target.tagName == 'SPAN'){
                    element = element.parentElement
                } 
                let filters = element.parentElement.children
                filters.forEach(item => {
                    item.classList.remove('active')
                })

                element.classList.add('active');
                if(i == 'all'){
                    this.getProducts()
                }else{
                    this.productSearch({categoryId: i.id})
                }
                
            },
            /**************************************
            *     CHECKOUT FUNCTIONS
            ***************************************/
            addItem(item){
                var orderProducts = [...this.orderProducts]
                var product = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    left: item.left,
                    quantity: 1,
                    selected: false,
                    saleId: null
                }

                product.index = orderProducts.length
                let existIndex = orderProducts.find(item => product.id === item.id)
                if(existIndex !== undefined){
                    let index = existIndex.index
                    orderProducts[index].selected = true
                        setTimeout(() => {
                        orderProducts[index].selected = false
                    }, 3000);
                    return;
                }
                orderProducts.push(product)
                this.orderProducts = orderProducts

                localStorage.setItem('orderProducts', JSON.stringify(orderProducts))
                this.updatePrice()
            },
            deleteItem(i){
                this.orderProducts.splice(i, 1);
                this.updatePrice()
            },
            counter(type, i){
                let quantity = this.orderProducts[i].quantity;
                if(type == 'add'){
                    if(quantity < this.orderProducts[i].left){
                        quantity++
                    }
                }else if(type == 'minus'){
                    if(quantity > 1){
                        quantity--
                    }
                }
                this.orderProducts[i].quantity = quantity
                this.updatePrice()
            },
            updatePrice(){
                let grosstotal = 0;
                let tax = 0.015 
                this.orderProducts.forEach((item, i) => {
                    let itemtotal = 0;
                    itemtotal =  (item.price * item.quantity)
                    grosstotal = grosstotal + itemtotal
                })

                this.tax = (grosstotal * tax).toFixed(2);
                this.netTotal = grosstotal - this.tax
                this.grossTotal = grosstotal
            },
            resetOrder(){ 
                this.orderProducts = []
                this.customer = null
                this.discount = null
                this.cash = 0;
                this.momo = 0;
                this.updatePrice()
                localStorage.removeItem('orderProducts')
            },
            checkout(type){
                let transaction = {
                    grossTotal: this.grossTotal,
                    netTotal:  this.netTotal, 
                    itemTotal: this.orderProducts.length,
                    discount: this.discount,
                    tax: this.tax,
                    customerId: this.customer,
                    discountId: this.discountId,
                    products: [],
                    cashAmount: this.cash,
                    momoAmount: this.momo,
                    id : this.id
                }
                if(this.orderProducts.length > 0){
                    this.orderProducts.forEach(item => {
                        let product = {
                            quantity: item.quantity,
                            unit: item.price,
                            total: item.quantity * item.price,
                            productId: item.id,
                            id: item.saleId
                        }
                        transaction.products.push(product)
                    })  
                    
                    if(type == 'hold'){
                        transaction.state = 'holding';
                        this.createTransaction(transaction)
                    }else if(type == 'pay'){
                        transaction.state = 'processing'
                        this.createTransaction(transaction)
                    }
                }
            },
            createTransaction(postData){
                this.$http.post('product/transaction/save', postData)
                .then(res => {
                    if(postData.state == 'holding'){
                        this.$notify({
                            title: 'Success',
                            message: "Transaction on hold",
                            type: 'success'
                        });
                    }
                    this.resetOrder()
                    this.getProducts()
                })
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
                                event.preventDefault()
                                if(code != ''){
                                    if(this.barcodeScanned != code){
                                        this.barcodeScanned = code
                                        this.productSearch({barcode: code})
                                        setTimeout(()=> {
                                            this.barcodeScanned = ''
                                        }, 3000)
                                    }
                                    this.allActive = false
                                }
                            });
                        }
                    }
                })
            },
            search(){
                if(this.q != ''){
                    this.productSearch({name: this.q})
                }else{
                    this.getProducts()
                }
            },
            splitPayment(type){
                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                }else{
                    if(type == 'cash'){
                        if(parseFloat(this.cash) < this.grossTotal){
                            this.momo = parseFloat(this.grossTotal) - parseFloat(this.cash)   
                        }
                    }else{
                        if(parseFloat(this.momo) < this.grossTotal){
                            this.cash = parseFloat(this.grossTotal) - parseFloat(this.momo) 
                        }
                    }
                }
            },
            setRetrieved(data){
                this.id = data.id
                this.cash = data.cashAmount
                this.momo = data.momoAmount
                this.customer = data.customerId

                data.products.forEach(item => {
                    let product = {
                        name: item.product.name,
                        quantity: item.quantity,
                        price: item.total,
                        id: item.product.id,
                        selected: false,
                        saleId: item.id
                    }
                    product.index = this.orderProducts.length
                    this.orderProducts.push(product)
                    this.updatePrice()
                })
            },
            quickPay(){
                this.cash = this.grossTotal
                this.checkout('pay')
            },
            saveCustomer(){
                let payload = {
                    firstname: this.newCustomer.firstname,
                    lastname: this.newCustomer.lastname,
                    phone: this.newCustomer.phone,
                    id: null
                }
                this.$http.post('sales/customer-save', payload)
                .then(res => {
                    this.submitting = false
                    this.$notify({
                        title: 'Success',
                        message: "Customer added",
                        type: 'success'
                    });
                    this.customer = res.body.result.id
                    this.activateNewCustomer = false
                    this.showCustomerDialog =  false
                    this.newCustomer.firstname = ''
                    this.newCustomer.lastname = ''
                    this.newCustomer.phone = ''

                    this.resetform()
                })
                .catch((err) => {
                    this.error = true
                    this.errorMessage = err.body.message
                     this.submitting =  false;
                })
            }
        },
        created() {
            let retrievedTransaction = JSON.parse(localStorage.getItem('retrievedTransaction'))
            let orderProductsInStorage;
            if(retrievedTransaction != undefined){
                this.setRetrieved(retrievedTransaction)
                localStorage.removeItem('retrievedTransaction')
            } else{
                orderProductsInStorage = JSON.parse(localStorage.getItem('orderProducts'))
                if(orderProductsInStorage !== null){
                    orderProductsInStorage.forEach(item => {
                        this.addItem(item)
                    })
                }
            }
            this.getCategories()
            this.getProducts()
            this.getCustomers()
        },
    }
</script>

<style lang="scss">
    .payment-title{
        vertical-align: middle;
        float: left;
        font-weight: bold;
        line-height: 40px;
    }
</style>