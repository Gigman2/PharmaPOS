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
                                <div class="product shadow-1" v-if="item.quantity > item.restock" @click="addItem(item)">
                                    <div class="product-image">
                                        <div class="image">
                                            <img :src="bucket+item.image" alt="" v-if="item.image">
                                            <img src="@/assets/images/pills.svg" alt="" style="width: 75%; margin-top: 10px" v-else>
                                        </div>
                                    </div>
                                    <div class="product-title">{{item.name}}</div>
                                    <div class="product-price">Ghc {{item.displayPrice}}</div>
                                </div>
                                <div class="product shadow-1 disabled outstock" v-else-if="item.left <= 0">
                                    <div class="product-image">
                                        <div class="image">
                                            <img :src="bucket+item.image" alt="" v-if="item.image">
                                            <img src="@/assets/images/pills.svg" alt="" style="width: 75%; margin-top: 10px" v-else>
                                        </div>
                                    </div>
                                    <div class="product-title">{{item.name}}</div>
                                    <div class="product-price">Ghc {{item.displayPrice}}</div>
                                </div>
                                <div class="product shadow-1 shortage"  @click="addItem(item)" v-else>
                                    <div class="product-image">
                                        <div class="image">
                                            <img :src="bucket+item.image" alt="" v-if="item.image">
                                            <img src="@/assets/images/pills.svg" alt="" style="width: 75%; margin-top: 10px" v-else>
                                        </div>
                                    </div>
                                    <div class="product-title">{{item.name}}</div>
                                    <div class="product-price">Ghc {{item.displayPrice}}</div>
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
                        <el-tooltip class="item" effect="dark" placement="bottom-end">
                            <div slot="content">Puts the transaction on hold</div>
                            <span @click="checkout('hold')">Hold</span>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" placement="bottom-end"  v-if="customer === null">
                            <div slot="content">Attach a customer to transaction</div>
                            <div class="d-inline">
                                <i class="fe-user-plus" @click="showCustomerDialog = true"></i>
                            </div>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" placement="bottom-end"  v-else>
                            <div slot="content">remove attach customer from transaction</div>

                           <div class="d-inline">
                                <i class="fe-user-minus" @click="customer = null"></i>
                           </div>
                        </el-tooltip>

                        <!-- <el-tooltip class="item" effect="dark" placement="bottom-end">
                            <div slot="content">apply discount</div>

                            <div class="d-inline">
                                <i class="fe-tag" v-if="discount == 0" @click="showDiscountDialog = true"></i>
                            <span  v-else>{{discount}} <em class="fe-percent"></em></span>
                            </div>
                        </el-tooltip> -->

                        
                        <el-tooltip class="item" effect="dark" placement="bottom-end">
                            <div slot="content">clear transaction</div>

                           <div class="d-inline">
                                <i class="fe-slash " @click="resetOrder"></i>
                           </div>
                        </el-tooltip>
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
                                    <span class="pointer" @click="openDrugModal(e, item)">
                                        {{(item.pack == 0 && item.loose == 0) ? '--' : ''}}

                                        {{(item.pack > 0) ? item.pack+'pck' : ''}}

                                        {{(item.loose > 0) ? item.loose+'pcs' : ''}}
                                    </span>
                                </td>
                                <td>{{item.totalprice}}</td>
                            </tr>
                        </tbody>
                    </table>
                </vue-custom-scrollbar>
                <table class="checkout-total">
                    <tbody>
                        <tr>
                            <th align="left">Total </th>
                            <td width="100px" align="right">Ghc{{grossTotal}}</td>
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
            :title="selectedProduct.name"
            :visible.sync="showDrugDialog"
            width="30%">
            <div class="form-box">
                <el-row :gutter="20">
                    <el-col :span="24"  v-if="selectedProduct.hasloose != false">
                        <div class="drug-purchase-type">
                            <div class="purchase-image">
                                <img src="@/assets/images/medicine.svg" alt="">
                            </div>
                            <div class="purchase-content">
                                <div class="purchase-content__heading">Indicate number of pieces</div>
                                <div class="purchase-content__counter">
                                    <div class="counter" @click="counter('add', selectedIndex, 'loose')"><span class="fe-plus"></span></div>
                                    <div class="count">{{selectedProduct.loose}}</div>
                                     <div class="counter" @click="counter('minus', selectedIndex, 'loose')"><span class="fe-minus"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="drug-purchase-type">
                            <div class="purchase-image">
                                <img src="@/assets/images/pharmacy.svg" alt="">
                            </div>
                            <div class="purchase-content">
                                <div class="purchase-content__heading">Indicate number of packs</div>
                                <div class="purchase-content__counter">
                                    <div class="counter" @click="counter('add', selectedIndex, 'pack')"><span class="fe-plus"></span></div>
                                    <div class="count">{{selectedProduct.pack}}</div>
                                    <div class="counter" @click="counter('minus', selectedIndex, 'pack')"><span class="fe-minus"></span></div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showDrugDialog = false">Done</el-button>
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
    import formatMoney from '@/components/formatmoney.js'

    export default {
        components: {
            vueCustomScrollbar
        },
        data() {
            return {
                settings: {
                    maxScrollbarLength: 60
                },

                selectedProduct: {},
                selectedIndex: null,

                showCustomerDialog: false,
                showDiscountDialog: false,
                showPaymentDialog: false,
                showDrugDialog: false,
                activateNewCustomer: false,
                
                newCustomer: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: ''
                },

                cash: 0,
                momo: 0,

                pack: 0,
                loose: 0,
                
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
                        element.displayPrice = formatMoney((element.hasloose) ? element.lprice : element.price, ',', '.')
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
                        element.displayPrice = formatMoney((element.hasloose) ? element.lprice : element.price, ',', '.')
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

                console.log(item)
                if(!item.pack){
                    item.pack = 0
                }

                if(!item.loose){
                    item.loose = 0
                }
                var product = {
                    id: item.id,
                    name: item.name,
                    totalprice: item.totalprice,
                    price: item.price,
                    lprice: item.lprice,
                    lquantity: item.lquantity,
                    left: item.left,
                    quantity: item.quantity,
                    pack: item.pack,
                    loose: item.loose,
                    selected: false,
                    saleId: null,
                    hasloose: item.hasloose
                }

                console.log(product)

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
                this.openDrugModal(orderProducts.length - 1, product)
                localStorage.setItem('orderProducts', JSON.stringify(orderProducts))
                this.updateProductTotalPrice(product.index)
                this.updateTotalPrice()
            },
            openDrugModal(i, item){
                this.selectedProduct = item
                this.selectedIndex = i
                this.showDrugDialog = true
            },
            deleteItem(i){
                this.orderProducts.splice(i, 1);
                this.updateTotalPrice()
            },
            counter(type, i, packaging){
                let quantity = this.orderProducts[i][packaging];
                if(type == 'add'){
                    if(packaging == 'pack'){
                        if(quantity < this.orderProducts[i].quantity){
                            quantity++
                        }
                    }else if(packaging == 'loose'){
                        if(quantity < (Number(this.orderProducts[i].lquantity) * Number(this.orderProducts[i].quantity))){
                            quantity++
                        }
                    }
                }else if(type == 'minus'){
                    if(quantity > 0){
                        quantity--
                    }
                }
                this.orderProducts[i][packaging] = quantity
                localStorage.setItem('orderProducts', JSON.stringify(this.orderProducts))
                this.updateProductTotalPrice(i)
                this.updateTotalPrice()
            },
            updateProductTotalPrice(i){
                let loose = this.orderProducts[i].loose
                let pack = this.orderProducts[i].pack
                let lprice = this.orderProducts[i].lprice
                let price = this.orderProducts[i].price

                let looseTotalPrice = 0;
                if(lprice != '' && !isNaN(lprice)){
                    looseTotalPrice = parseInt(loose) * parseFloat(lprice)
                } 

                let packTotalPrice = 0;
                if(price != '' && !isNaN(price)){
                    packTotalPrice = parseInt(pack) * parseFloat(price) 
                }

                let totalPrice = looseTotalPrice + packTotalPrice;
                this.orderProducts[i].totalprice = formatMoney(totalPrice, ',', '.')
            },
            updateTotalPrice(){
                let grosstotal = 0;
                let tax = 0.015 
                this.orderProducts.forEach((item, i) => {
                    let itemtotal = 0;
                    itemtotal =  parseFloat(item.totalprice)
                    grosstotal = grosstotal + itemtotal
                })

                this.tax = (grosstotal * tax).toFixed(2);
                this.netTotal = grosstotal - this.tax
                this.grossTotal = formatMoney(grosstotal, ',', '.')
            },
            resetOrder(){ 
                this.orderProducts = []
                this.customer = null
                this.discount = null
                this.cash = 0;
                this.momo = 0;
                this.updateTotalPrice()
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
                            packBought: item.pack,
                            looseBought: item.loose,
                            packPrice: item.price,
                            loosePrice: item.lprice,
                            total: item.totalprice,
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
                    if(postData.state == 'processing'){
                        this.$notify({
                            title: 'Success',
                            message: "Checkout successful",
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
                console.log(data)
                this.id = data.id
                this.cash = data.cashAmount
                this.momo = data.momoAmount
                this.customer = data.customerId

                data.products.forEach(item => {
                    let product = {
                        name: item.product.name,
                        loose: item.looseBought,
                        pack: item.packBought,
                        totalprice: item.total,
                        price: item.product.price,
                        lprice: item.product.lprice,
                        lquantity: item.product.lquantity,
                        quantity: item.product.quantity,
                        left: item.product.left,
                        id: item.product.id,
                        selected: false,
                        saleId: item.id,
                        hasloose: item.product.hasloose
                    }
                    product.index = this.orderProducts.length
                    this.orderProducts.push(product)
                    this.updateTotalPrice()
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
                        this.showDrugDialog = false
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
    .drug-purchase-type{
        .purchase-image{
            width: 80px;
            height: 80px;
            background-color: rgb(238, 238, 238);
            border-radius: 3px;
            padding: 10px;
            margin-bottom: 20px;
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            img{
                width: 100%;
                color: silver;
            }
        }
        .purchase-content{
            width: calc(100% - 102px);
            display: inline-block;
            text-align: left;
            margin-left: 20px;
            &__heading{
                color: rgb(183, 188, 192);
            }
            &__counter{
                padding-top: 17px;
                .count{
                    display: inline-block;
                    line-height: 45px;
                    text-align: center;
                    width: calc(100% - 91px);
                    font-size: 30px;
                    color: rgb(148, 148, 148)
                }
                .counter{
                    width: 45px;
                    height: 45px;
                    border-radius: 2px;
                    background-color: rgb(233, 233, 233);
                    display: inline-block;
                    text-align: center;
                    line-height: 55px;
                    cursor: pointer;
                    &:first-child{
                        float: right;
                    }
                    &:last-child{
                        float: left;
                    }
                    span{
                        font-size: 25px;
                        color: rgb(148, 148, 148);
                    }
                }
            }
        }
    }
</style>