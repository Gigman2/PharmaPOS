<template>
    <div class="main-wrapper">
        <div v-if="userPermission && userPermission[2] && userPermission[2].state">
            <div class="product-box">
                <div class="inner-box">
                    <div class="form-box">
                        <div class="view-selectors">
                            <img src="@/assets/images/list.svg" alt="" v-if="layout == 'grid'" @click="switchLayout('grid')">
                            <img src="@/assets/images/grid.svg" alt="" v-else  @click="switchLayout('list')">

                        </div>
                        <div class="search-input">
                            <!-- <i class="fe-search"></i> -->
                            <input type="text" placeholder="Search ..." v-model="q" @keyup="search()">
                        </div>
                        <div class="filter-btn" @click="showFilter = true">Filter</div>
                    </div>
                    <div class="clearfix"></div>

                    <div class="products-box">
                        <div class="products-title">Recent Products</div>
                        <vue-custom-scrollbar class="scroll-area products grid" :settings="settings" v-loading="loading" v-if="layout == 'grid'">
                            <div class="product-row recent" v-for="(row, e) in recentProducts" :key="e">
                                <el-tooltip class="item" effect="dark" placement="bottom-end"
                                    v-for="(item, f) in row" :key="f">
                                    <div slot="content">{{item.name}} <br/> {{(item.manufacturer !== 'null')? item.manufacturer : ''}}</div>
                                    <div class="product shadow-1" v-if="item.left > item.restock" @click="addItem(item, false)"
                                        :class="{'shortage': item.left <= item.restock && item.left > 0}">
                                        <div class="expiration-box"  
                                                :class="{'red': item.expiration == 'expired',
                                                'orange': item.expiration == 'expiring'}"
                                                
                                                v-if="item.expiration">{{item.expiration}}
                                        </div>
                                        <div class="product-image">
                                            <div class="image">
                                                <img :src="bucket+item.image" alt="" v-if="item.image">
                                                <img :src="(item.dispensation == 'single') ? '/assets/images/drugs.svg' : (item.dispensation == 'tab') ? '/assets/images/capsule.svg' : '/assets/images/medicine.svg'" 
                                                    alt="" style="width: 65%; margin-top: 10px" v-else
                                                >
                                            </div>
                                        </div>
                                        <div class="product-title">{{item.name}}</div>
                                        <div class="product-price">Ghc {{item.displayPrice}}</div>
                                    </div>
                                    <div class="product shadow-1 disabled outstock" v-else-if="item.left <= 0">
                                        <div class="expiration-box"  
                                                :class="{'red': item.expiration == 'expired',
                                                'orange': item.expiration == 'expiring'}"
                                                
                                                v-if="item.expiration">{{item.expiration}}
                                        </div>
                                        <div class="product-image">
                                            <div class="image">
                                                <img :src="bucket+item.image" alt="" v-if="item.image">
                                                <img :src="(item.dispensation == 'single') ? '/assets/images/drugs.svg' : (item.dispensation == 'tab') ? '/assets/images/capsule.svg' : '/assets/images/medicine.svg'" 
                                                    alt="" style="width: 65%; margin-top: 10px" v-else
                                                >
                                            </div>
                                        </div>
                                        <div class="product-title">{{item.name}}</div>
                                        <div class="product-price">Ghc {{item.displayPrice}}</div>
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="product-row" v-for="(row, index) in products" :key="index">
                                <el-tooltip class="item" effect="dark" placement="bottom-end"
                                    v-for="(item, i) in row" :key="i">
                                    <div slot="content">{{item.name}} <br/> {{(item.manufacturer !== 'null')? item.manufacturer : ''}}</div>
                                    <div class="product shadow-1" v-if="item.left > item.restock" @click="addItem(item, false)"
                                         :class="{'shortage': item.left <= item.restock && item.left > 0}">
                                        <div class="expiration-box"  
                                                :class="{'red': item.expiration == 'expired',
                                                'orange': item.expiration == 'expiring'}"
                                                
                                                v-if="item.expiration">{{item.expiration}}
                                        </div>
                                        <div class="product-image">
                                            <div class="image">
                                                <img :src="bucket+item.image" alt="" v-if="item.image">
                                                <img :src="(item.dispensation == 'single') ? '/assets/images/drugs.svg' : (item.dispensation == 'tab') ? '/assets/images/capsule.svg' : '/assets/images/medicine.svg'" 
                                                    alt="" style="width: 65%; margin-top: 10px" v-else
                                                >
                                            </div>
                                        </div>
                                        <div class="product-title">{{item.name}}</div>
                                        <div class="product-price">Ghc {{item.displayPrice}}</div>
                                    </div>
                                    <div class="product shadow-1 disabled outstock" v-else-if="item.left <= 0">
                                        <div class="expiration-box"  
                                                :class="{'red': item.expiration == 'expired',
                                                'orange': item.expiration == 'expiring'}"
                                                
                                                v-if="item.expiration">{{item.expiration}}
                                        </div>
                                        <div class="product-image">
                                            <div class="image">
                                                <img :src="bucket+item.image" alt="" v-if="item.image">
                                               <img :src="(item.dispensation == 'single') ? '/assets/images/drugs.svg' : (item.dispensation == 'tab') ? '/assets/images/capsule.svg' : '/assets/images/medicine.svg'" 
                                                    alt="" style="width: 65%; margin-top: 10px" v-else
                                                >
                                            </div>
                                        </div>
                                        <div class="product-title">{{item.name}}</div>
                                        <div class="product-price">Ghc {{item.displayPrice}}</div>
                                    </div>
                                </el-tooltip>
                            </div>
                        </vue-custom-scrollbar>

                        <div class="products list" v-else-if="layout == 'list'">
                              <el-table :data="listdata" height="600" style="width: 100%"
                                 :row-class-name="styleRows"
                              >
                                <el-table-column
                                prop="name"
                                label="Name"
                                width="250"
                                >
                                    <template slot-scope="scope">
                                        <div @click="(scope.row.left > 0) ? addItem(scope.row, false) : '' " >{{scope.row.name}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="price"
                                label="Price">
                                    <template slot-scope="scope">
                                        <div @click="(scope.row.left > 0) ? addItem(scope.row, false) : '' ">{{scope.row.price}}</div>
                                    </template>
                                </el-table-column>
                                 <el-table-column
                                prop="expiration"
                                label="Expired">
                                    <template slot-scope="scope">
                                        <div @click="(scope.row.left > 0) ? addItem(scope.row, false) : '' " 
                                            :class="{
                                                'text-red': scope.row.expiration == 'expired', 
                                                'text-green': scope.row.expiration == 'good',
                                                'text-purple': scope.row.expiration == 'expiring'
                                            }">{{scope.row.expiration}}</div>
                                    </template>
                                </el-table-column>
                                 <el-table-column
                                prop="left"
                                label="Left" width="50">
                                    <template slot-scope="scope">
                                        <div @click="(scope.row.left > 0) ? addItem(scope.row, false) : '' " :class="{'text-red': scope.row.left <= 0}">{{scope.row.left}}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <el-drawer
                                title=""
                                :visible.sync="showFilter"
                                direction="rtl">
                                <div class="filter-container">
                                    <div class="title">Filter by categories</div>
                                    <div class="body">
                                        <div class="category-container">
                                            <div class="category-item" @click="filerByCategory('all', $event)">
                                                <div class="category-item__icon">
                                                    <img src="@/assets/images/pills.svg" alt="">
                                                </div>
                                                <div class="category-item__content">All</div>
                                                <div class="category-item__products"></div>
                                            </div>
                                            <div class="category-item" v-for="(item, i) in categories" :key="i"
                                            @click="filerByCategory(item, $event)">
                                                <div class="category-item__icon">
                                                    <img src="@/assets/images/pills.svg" alt="">
                                                </div>
                                                <div class="category-item__content">{{item.name}}</div>
                                                <div class="category-item__products">{{item.products.length}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-drawer>
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
                                        <th>Rate</th>
                                        <th>QTY</th>
                                        <th width="60px">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="checkout-item-row" :class="{'selected': item.selected}"
                                        v-for="(item, e) in orderProducts" :key="e">
                                        <td><i class="fe-trash-2 delete" @click="deleteItem(e)"></i></td>
                                        <td width="45%">
                                            <span class="pointer"  @click="openDrugModal(e, item)">{{item.name}}</span>
                                        </td>
                                        <td>{{item.price}}</td>
                                        <td>
                                            <span class="pointer" @click="openDrugModal(e, item)">
                                                {{(item.dispensation == 'single') ? item.quantity :item.pack}}
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
                        <div class="checkout-payout disabled" v-if="Number(grossTotal) < 0" ><span>Pay</span> (Ghc {{grossTotal}})</div>
                        <div class="checkout-payout" v-else @click="showPaymentDialog = true" ><span>Pay</span> (Ghc {{grossTotal}})</div>
                        <div class="checkout-reset" @click="resetOrder">Reset</div>
                </div>
            </div>
        </div>

        <no-access v-else></no-access>

        <el-dialog
            :title="selectedProduct.name"
            :visible.sync="showDrugDialog"
            width="30%">
            <div class="form-box">
                <el-row :gutter="20">
                     <el-col :span="24">
                        <div class="drug-purchase-type">
                            <div class="purchase-image">
                                <img src="@/assets/images/drugs.svg" alt="" v-if="selectedProduct.dispensation == 'single'">
                                <img src="@/assets/images/medicine.svg" alt="" v-if="selectedProduct.dispensation == 'strip'">
                                <img src="@/assets/images/capsule.svg" alt="" v-else-if="selectedProduct.dispensation == 'tab'">
                            </div>
                            <div class="purchase-content">
                                <div class="purchase-content__heading">Indicate quantity to purchase</div>
                                <div class="purchase-content__counter">
                                    <div class="counter" @click="counter('add', selectedIndex)"><span class="fe-plus"></span></div>
                                    <div class="count">
                                        <input v-model="countInput" @keyup="counter(null, selectedIndex)">
                                    </div>
                                    <div class="counter" @click="counter('minus', selectedIndex)"><span class="fe-minus"></span></div>
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
                    <el-col :span="12" v-if="split">
                        <div class="payment-title">Mobile Money</div>
                    </el-col>
                    <el-col :span="12" v-if="split">
                        <div class="input-box" :class="{ 'input-box--error': $v.momo.$error }">
                            <i class="">Ghc</i>
                            <input type="text" placeholder="0.00" v-model.trim.lazy="$v.momo.$model" @blur="splitPayment('momo')" @change="splitPayment('momo')">
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <el-link type="primary" class="pull-left mb-10" @click="split = true" v-if="!split">
                            <strong>split payment</strong>
                        </el-link>
                        <el-link type="primary" class="pull-left mb-10" @click="split = false" v-else>
                            <strong>unsplit payment</strong>
                        </el-link>
                        <div class="clearfix"></div>
                       <div class="horizontal"></div>
                    </el-col>
                </el-row>
                 <el-row :gutter="20" class="mt-20">
                    <el-col :span="12">
                        <div class="payment-title">Change</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="input-box">
                            <i class="">Ghc</i>
                            <input type="text" placeholder="0.00" v-model="change" readonly>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="alert-box" v-if="parseFloat(change) < 0 ">
                            The amount paid is lower than the total transaction
                        </div>
                    </el-col>
                </el-row>
                 <el-row>
                    <el-col :span="24">
                        <div class="pull-left mt-10">
                            <span class="">Print receipt</span>
                            <el-switch v-model="printReceipt" class="ml-5"></el-switch>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button style="float: left" @click="quickPay(); showPaymentDialog = false">Quick Pay</el-button>
                
                <el-button @click="showPaymentDialog = false">Cancel</el-button>
                <el-button type="primary" @click="checkout('pay'); showPaymentDialog = false">Checkout</el-button>
                <!-- <el-button v-else type="primary" disabled>Checkout</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import BarcodeScanner from "simple-barcode-scanner";
    import Moment from 'moment'
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
                split: false,

                newCustomer: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: ''
                },

                cash: 0,
                momo: 0,
                change: 0,


                pack: 0,
                loose: 0,
                countInput: 0,
                
                q: '',
                id: null,
                barcodeScanned: '',
                netTotal: 0,
                grossTotal: 0,
                tax: 0,
                categories: [],

                results: [],
                listdata: [],
                products: [],
                recentProducts: [],
                orderProducts: [],
                customers: [],
                customer: null,
                printReceipt: false,
                layout: 'grid',

                discount: 0,
                discountCode: '',
                discountId: null,
                checkingout: false,

                firstEntry: false,
                loading: true,
                showFilter: false
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
        watch: {
            results: function(val){
                if(val.length > 0){
                    this.recentProducts = val[0] 
                }
                if(val.length > 1){
                    this.products = val[1] 
                }
            }
        },
        computed: {
            ...mapGetters({
                bucket: 'GET_BUCKET',
                barcode_online: 'BARCODE_ONLINE_STATE',  
                scanner: 'GET_BARCODE',
                userPermission: 'PERMISSIONS',
            }),
        },
        mounted() {
            this.initScanner()  
        },
        methods: {
            getCategories(){
                this.$http.get('product/category/list')
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
                this.$http.get('product/list-top-best')
                .then(res => {
                    let data =  res.body.result
                    let dataKeys = Object.values(data)
                    this.results = dataKeys.map(e => {
                        var e = e.filter(function (el) {
                            return el != null;
                        });
                        
                         e.map(i => {
                             if(i.expiry != null){
                                let expiry = Moment(i.expiry).format('YYYY-MM-DD')
                                let now = Moment().format('YYYY-MM-DD')
                                
                                let expired = Moment().isAfter(expiry)
                                if(expired){
                                    i.expiration = 'expired'
                                }else{
                                    var exirationDifference = Moment(expiry).diff(now, 'days');
                                    if(exirationDifference <= 90){
                                        i.expiration = 'expiring'
                                    }else{
                                        i.expiration = 'good'
                                    }
                                }
                            }else{
                                i.expiry = '--'
                            }
                        })

                        var newData = [];
                        var index = 0;
                        e.forEach((element, a)=> {
                            element.displayPrice = formatMoney((element.hasloose) ? element.lprice : element.price, ',', '.')
                            let modIndex = (a > 4) ? a+ 1 : a;
                            if(modIndex % 0 == 0){
                                index  = index + 1; 
                            }
                            if(newData[index] === undefined){
                                newData[index] = []
                            }
                            newData[index].push(element)
                        });

                        e = newData

                        return e
                    })
                    
                    if(this.layout == 'list'){
                        this.switchLayout('grid')
                    }
                    this.loading = false
                })
                .catch((err) => {
                    console.log(err)
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
                    if(data.length > 0){
                        this.recentProducts = []
                    }

                    this.products = data;

                    this.products.map(i => {
                            if(i.expiry != null){
                            let expiry = Moment(i.expiry).format('YYYY-MM-DD')
                            let now = Moment().format('YYYY-MM-DD')
                            
                            let expired = Moment().isAfter(expiry)
                            if(expired){
                                i.expiration = 'expired'
                            }else{
                                var exirationDifference = Moment(expiry).diff(now, 'days');
                                if(exirationDifference <= 90){
                                    i.expiration = 'expiring'
                                }else{
                                    i.expiration = 'good'
                                }
                            }
                        }else{
                            i.expiry = '--'
                        }
                    })
                    
                    var newData = [];
                    var index = 0;
                    this.products.forEach((element,i )=> {
                        element.displayPrice = formatMoney((element.hasloose) ? element.lprice : element.price, ',', '.')
                        let modIndex = (i > 4) ? i+ 1 : i;
                        if(modIndex % 0 == 0){
                            index  = index + 1; 
                        }
                        if(newData[index] === undefined){
                            newData[index] = []
                        }
                        newData[index].push(element)
                    });
                    this.products = newData
                    
                    if(query.barcode && data !== undefined){
                        this.addItem(data[0], false)
                    }

                    if(this.layout == 'list'){
                        this.switchLayout('grid')
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
                 
                this.loading = true;
                if(i == 'all'){
                    this.getProducts()
                }else{
                    this.productSearch({categoryId: i.id})
                }
                
            },
            /**************************************
            *     CHECKOUT FUNCTIONS
            ***************************************/
            addItem(item, retrieved){
                this.countInput = 0;
                var orderProducts = [...this.orderProducts]

                var product = {
                    id: item.id,
                    name: item.name,
                    totalprice: item.totalprice,
                    price: item.price,
                    left: item.left,
                    quantity: 0,
                    pack_l: item.pack_l,
                    pack_q: item.pack_q,
                    dispensation: item.dispensation,
                    pack: item.pack,
                    selected: false,
                    saleId: null
                }
                if(retrieved){
                    product.quantity = item.quantity
                }

                let existIndex
                for (let index = 0; index < orderProducts.length; index++) {
                    if (orderProducts[index].id === product.id) {
                        existIndex = index;
                        console.log(existIndex)
                        break;
                    }
                }

                if(existIndex !== undefined){
                    orderProducts[existIndex].selected = true
                        setTimeout(() => {
                        orderProducts[existIndex].selected = false
                    }, 3000);
                    return;
                }

                orderProducts.unshift(product)
                this.orderProducts = orderProducts
                this.openDrugModal(0, product)

                localStorage.setItem('orderProducts', JSON.stringify(orderProducts))
                this.updateProductTotalPrice(0)
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
            counter(type, i){
                let packaging =  (this.orderProducts[i].dispensation == 'single') ? 'quantity' : 'pack' ;
                if(isNaN(this.countInput)){
                    this.countInput = (this.orderProducts[i].dispensation == 'single') ? this.orderProducts[i].quantity : this.orderProducts[i].pack ;
                }

                if(packaging == 'quantity' ){
                    if(this.countInput > this.orderProducts[i].left){
                        this.countInput = this.orderProducts[i].left
                    }
                }else{
                    let packTotal = (this.orderProducts[i].pack_q * this.orderProducts[i].left) + this.orderProducts[i].pack_l;
                    if(this.countInput > packTotal){
                        this.countInput = packTotal
                    }
                }
                let quantity = this.countInput

                if(type == 'add'){
                    if(this.orderProducts[i].dispensation == 'single'){
                        if(quantity < this.orderProducts[i].left){
                            quantity++
                        }
                    }else if(this.orderProducts[i].dispensation == 'tab' || this.orderProducts[i].dispensation == 'strip'){
                        if(quantity < (this.orderProducts[i].pack_q * this.orderProducts[i].left) + this.orderProducts[i].pack_l){
                            quantity++
                        }
                    }
                }else if(type == 'minus'){
                    if(quantity > 0){
                        quantity--
                    }
                }

                this.countInput = quantity
                this.orderProducts[i][packaging] = quantity
                
                localStorage.setItem('orderProducts', JSON.stringify(this.orderProducts))
                this.updateProductTotalPrice(i)
                this.updateTotalPrice()
            },

            updateProductTotalPrice(i){
                let pack = this.orderProducts[i].pack,
                    quantity = this.orderProducts[i].quantity, 
                    dispensation = this.orderProducts[i].dispensation,
                    price = this.orderProducts[i].price;

                let productTotalPrice = 0;
                if(price != '' && !isNaN(price) && price != null){
                    if(dispensation == 'single'){
                        productTotalPrice = parseInt(quantity) * parseFloat(price) 
                    }else{
                        productTotalPrice = parseInt(pack) * parseFloat(price) 
                    }
                }

                let totalPrice = productTotalPrice;
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
                this.change = 0;
                this.countInput = 0;
                this.updateTotalPrice()
                localStorage.removeItem('orderProducts')
            },
            checkout(type){
                if(this.cash == 0 && this.momo == 0){
                    this.cash = this.grossTotal
                }

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
                    changeGiven: this.change,
                    id : this.id
                }
                if(this.orderProducts.length > 0){
                    this.orderProducts.forEach(item => {
                        let product = {
                            dispensation: item.dispensation,
                            quantity: item.quantity,
                            price: item.price,
                            total: item.totalprice,
                            productId: item.id,
                            id: item.saleId
                        }

                        if(product.dispensation != 'single'){
                            product.quantity = Number(item.pack)
                        }
                        if(product.quantity > 0){
                            transaction.products.push(product)
                        }
                    })  

                    if(this.printReceipt){
                        transaction.print = true
                        
                    }else{
                        transaction.print = false
                    }
                    
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
                if(this.checkingout == false){
                    this.checkingout = true
                    this.$http.post('product/transaction/save', postData)
                    .then(res => {
                        this.checkingout = false
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
                    .catch(err => {
                        this.checkingout = false
                    })
                }
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
                    if(this.firstEntry !== false){
                        this.firstEntry = true
                    }
                    if(this.firstEntry ===  true){
                        this.firstEntry = false
                        if(type == 'cash'){
                            if(this.split){
                                if(parseFloat(this.cash) < this.grossTotal){
                                    this.momo = parseFloat(this.grossTotal) - parseFloat(this.cash)   
                                }
                            }
                        }else{
                            if(parseFloat(this.momo) < this.grossTotal){
                                this.cash = parseFloat(this.grossTotal) - parseFloat(this.momo) 
                            }
                        }
                    }

                    if(isNaN(parseFloat(this.momo))){
                        this.momo = 0
                    }

                    if(isNaN(parseFloat(this.cash))){
                        this.momo = 0
                    }
                    this.change = ((parseFloat(this.cash) + parseFloat(this.momo)) - this.grossTotal).toFixed(2)
                }
            },
            setRetrieved(data){
                this.id = data.id   
                this.cash = data.cashAmount
                this.momo = data.momoAmount
                this.customer = data.customerId

                data.products.forEach(item => {
                    let product = {
                        id: item.product.id,
                        name: item.product.name,
                        totalprice: item.total,
                        left: item.product.left,
                        pack_q: item.product.pack_q,
                        price: item.product.price,
                        selected: false,
                        dispensation: item.dispensation,
                        saleId: this.id,
                    }

                    if(item.dispensation == 'single'){
                        product.quantity = item.quantity
                    }else if(item.dispensation == 'tab' || item.dispensation == 'strip'){
                        product.pack = item.quantity
                    }

                    this.orderProducts.unshift(product)
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
            },
            switchLayout(currentLayout){
                this.loading = true
                if(currentLayout == 'grid'){
                    let products = this.products
                    let recent = this.recentProducts;

                    let flattenProducts = products.flat()
                    let flattenRecent = recent.flat()
                    flattenRecent.map(item => {
                        return item.recent = true
                    })

                    this.listdata = flattenRecent.concat(flattenProducts);
                    // this.listdata.unshift(flattenRecent);

                    this.layout = 'list';
                    this.loading = false
                }else{
                    this.loading = true
                    var newData = [];
                    var index = 0;
                    this.layout = 'grid';
                    this.loading = false
                }

                // localStorage.setItem('layout', this.layout)

            },
            styleRows({row}){
                if (row.recent == true) {
                    return 'row recent-row';
                } 

                if(row.left <= 0){
                    return 'disabled'
                }
                return 'row';
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
                        this.addItem(item, true)
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
            width: 66px;
            height: 66px;
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
                padding-top: 7px;
                .count{
                    display: inline-block;
                    line-height: 45px;
                    text-align: center;
                    width: calc(100% - 91px);
                    font-size: 30px;
                    color: rgb(148, 148, 148);
                    input{
                        vertical-align: bottom;
                        height: 40px;
                        width: 100px;
                        outline: none;
                        text-align: center;
                        font-size: 30px;
                        border: none;
                        background-color: #e9e9e9;
                    }
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
     .expiration-box{
        position: absolute;
        left: 10%;
        transform: translateX(50%);
        border-radius: 3px;
        padding: 2px 5px;
        font-size: 14px;
        color: white;
        &.red{
            background-color: rgb(238, 58, 58);
        }
        &.orange{
            background-color: rgb(238, 154, 58);
        }
    }

        .filter-container{
        .title{
            font-weight: bold;
            font-size: 19px ;
        }

        .body{
            text-align: left;
            padding: 20px;
            .category-container{
                height: 80vh;
                overflow-y: scroll;
            }
            .category-item{
                width: 100%;
                border-bottom: 1px solid rgb(243, 243, 243);
                padding-bottom: 5px;
                cursor: pointer;
                &__icon{
                    width: 25px;
                    display: inline-block;
                    vertical-align: middle;
                    img{
                        width: 100%;
                    }
                }

                &__content{
                    display: inline-block;
                    margin-left: 20px;
                    vertical-align: middle;
                    width: 70%;
                }

                &__products{
                    display: inline-block;
                }
            }
        }
    }
    .alert-box{
        padding: 10px;
        background-color: rgba(255, 0, 0, 0.164);
        border-radius: 5px;
        color: rgb(218, 49, 49);
    }
    .el-table .recent-row {
        background: #f4fffa;

    }

    .el-table .row {
        cursor: pointer;
    }

    .el-table .disabled {
        cursor: not-allowed !important;
        background-color: rgb(240, 240, 240);
    }
</style>