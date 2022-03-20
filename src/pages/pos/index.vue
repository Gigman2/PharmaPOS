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
                            <input type="text" placeholder="Search ..." v-model="q" @keyup="search()" ref="search">
                        </div>
                        <div class="filter-btn" @click="showFilter = true">Filter</div>
                    </div>
                    <div class="clearfix"></div>

                    <div class="products-box">
                        <div class="products-title">Recent Products</div>
                        <div class="products grid" v-loading="loading" v-if="layout == 'grid'">
                            <div class="product-row recent">
                                <el-tooltip class="item" effect="dark" placement="bottom-end"
                                    v-for="(item, f) in recentProducts" :key="'a'+f">
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
                            <div class="product-row">
                                <el-tooltip class="item" effect="dark" placement="bottom-end"
                                    v-for="(item, i) in products" :key="'b'+i">
                                    <div slot="content">{{item.name}}</div>
                                    <div class="product shadow-1" v-if="item.left > 0" @click="addItem(item, false)"
                                         :class="{'shortage': item.left <= item.restock && item.left > 0}">
                                        <div class="expiration-box"  
                                                :class="{'red': item.expiration == 'expired',
                                                'orange': item.expiration == 'expiring'}"
                                                
                                                v-if="item.expiration">{{item.expiration}}
                                        </div>
                                        <div class="product-image">
                                            <div class="image">
                                                <img :src="bucket+item.image" alt="" v-if="item.image">
                                                <img :src="(item.dispensation == 'single') ? '/assets/images/plastic-bottle.png' : (item.dispensation == 'tab') ? '/assets/images/plastic-bottle.png' : '/assets/images/plastic-bottle.png'" 
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
                                               <img :src="(item.dispensation == 'single') ? '/assets/images/plastic-bottle.png' : (item.dispensation == 'tab') ? '/assets/images/plastic-bottle.png' : '/assets/images/plastic-bottle.png'" 
                                                    alt="" style="width: 65%; margin-top: 10px" v-else
                                                >
                                            </div>
                                        </div>
                                        <div class="product-title">{{item.name}}</div>
                                        <div class="product-price">Ghc {{item.displayPrice}}</div>
                                    </div>
                                </el-tooltip>
                            </div>
                        </div>

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
                                                    <img src="@/assets/images/plastic-bottle.png" alt="">
                                                </div>
                                                <div class="category-item__content">All</div>
                                                <div class="category-item__products"></div>
                                            </div>
                                            <div class="category-item" v-for="(item, i) in categories" :key="i"
                                            @click="filerByCategory(item, $event)">
                                                <div class="category-item__icon">
                                                    <img src="@/assets/images/plastic-bottle.png" alt="">
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
                        <div class="checkout-table-wrapper">
                            <table class="checkout-table" cellspacing="0" cellpadding="0">
                                <thead class="checkout-headings">
                                    <tr>
                                        <th width="30px"></th> 
                                        <th>Name</th>
                                        <th>W/sale</th>
                                        <th>S/sale</th>
                                        <th width="60px">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="checkout-item-row" :class="{'selected': item.selected}"
                                        v-for="(item, e) in orderProducts" :key="e">
                                        <td><i class="fe-trash-2 delete" @click="deleteItem(e)"></i></td>
                                        <td width="45%">
                                            <span class="pointer"  @click="openDrugModal(e, item)">{{item.name}}</span>
                                        </td>
                                        <td>
                                            <div class="right">
                                                <div class="font-bold">{{item.wprice}}</div>
                                                <div class="font-small">{{item.quantity}} pcks</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="pull-right">
                                                <div class="font-bold">{{item.price}}</div>
                                                <div class="font-small">{{item.retail}} pcs</div>
                                            </span>
                                        </td>
                                        <td @click="openDrugModal(e, item)"><div  class="font-bold">{{item.formattedTotal}}</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <table class="checkout-total">
                            <tbody>
                                <tr>
                                    <th align="left">Total </th>
                                    <td width="100px" align="right">Ghc{{formattedGrossTotal}}</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <div class="checkout-pay-section">
                        <div class="checkout-payout disabled" v-if="Number(grossTotal) < 0" ><span>Pay</span> (Ghc {{formattedGrossTotal}})</div>
                        <div class="checkout-payout" v-else @click="showPaymentDialog = true" ><span>Pay</span> (Ghc {{formattedGrossTotal}})</div>
                        <div class="checkout-reset" @click="resetOrder">Reset</div>
                </div>
            </div>
        </div>

        <!-- <no-access v-else></no-access> -->

        <el-dialog
            :title="selectedProduct.name"
            :visible.sync="showDrugDialog"
            width="30%">
            <div class="form-box">
                <el-row :gutter="20">
                    <el-col :span="24" v-if="selectedProduct.pack_q > 1">
                        <div class="drug-purchase-type">
                            <div class="purchase-image">
                                <img src="@/assets/images/beer.png" alt="">
                            </div>
                            <div class="purchase-content">
                                <div class="purchase-content__heading">Indicate number of pieces</div>
                                <div class="purchase-content__counter">
                                    <div class="counter" @click="counter('add', selectedIndex, 'wholesale')"><span class="fe-plus"></span></div>
                                    <div class="count">
                                        <input v-model="countWholesale" @keyup="counter(null, selectedIndex, 'wholesale')" ref="countWholesale" >
                                    </div>
                                    <div class="counter" @click="counter('minus', selectedIndex, 'wholesale')"><span class="fe-minus"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </el-col>

                     <el-col :span="24">
                        <div class="drug-purchase-type">
                            <div class="purchase-image">
                                <img src="@/assets/images/plastic-bottle.png" alt="">
                            </div>
                            <div class="purchase-content">
                                <div class="purchase-content__heading">Indicate quantity to purchase</div>
                                <div class="purchase-content__counter">
                                    <div class="counter" @click="counter('add', selectedIndex,'retail')"><span class="fe-plus"></span></div>
                                    <div class="count">
                                        <input v-model="countRetail" @keyup="counter(null, selectedIndex, 'retail')" ref="countRetail" >
                                    </div>
                                    <div class="counter" @click="counter('minus', selectedIndex, 'retail')">
                                        <span class="fe-minus"></span>
                                    </div>
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
                <div  v-if="!manualCheckout">
                    <el-button style="float: right" @click="quickPay(); showPaymentDialog = false">Quick Pay</el-button>

                    <el-button style="float: left" @click="showPaymentDialog = false">Cancel</el-button>
                </div>

                <div  v-if="manualCheckout">
                    <el-button style="float: right" type="primary" v-if="cash == 0 || cash == ''">
                        <span>Checkout</span>
                    </el-button>

                    <el-button style="float: right" type="primary" @click="checkout('pay'); showPaymentDialog = false">
                        <span>Checkout</span>
                    </el-button>

                    <el-button style="float: left" @click="showPaymentDialog = false">Cancel</el-button>
                </div>

                <div class="clearfix"></div>
                

                
                <!-- <el-button v-else type="primary" disabled>Checkout</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import BarcodeScanner from "simple-barcode-scanner";
    import Moment from 'moment'
    import Fuse from 'fuse.js'
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    import axios from 'axios'

    import {mapGetters} from 'vuex';
    import { required, decimal } from 'vuelidate/lib/validators'
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

                cash: '',
                momo: '',
                change: '',


                pack: 0,
                retail: 0,
                countWholesale: 0,
                countRetail: 0,

                q: '',
                id: null,
                barcodeScanned: '',
                netTotal: 0,
                grossTotal: 0,
                formattedGrossTotal: 0,
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
                manualCheckout: false,
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
            })
        },
        mounted() {
            this.initScanner()  
            window.addEventListener('keyup', event => {
                if (event.keyCode === 187) { 
                    this.keyPressToCount('add')
                }

                if (event.keyCode === 189) { 
                    this.keyPressToCount('minus')
                }

                if (event.keyCode === 13) { 
                    this.closeModal()
                }
            })
        },
        methods: {
             /**************************************
            *     FETCH FUNCTIONS & SEARCH
            ***************************************/
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
            async getAllProducts(){
                await this.$http.get('product/list?size=all')
                .then(async res => {
                    let data =  res.body.result
                    data.map(i => {
                        i.displayPrice = formatMoney(i.price, 2, '.',',')
                        if(i.expiry != null){
                            let expiry = Moment(i.expiry).format('YYYY-MM-DD')
                            let now = Moment().format('YYYY-MM-DD')
                            
                            let expired = Moment().isAfter(expiry)
                            if(expired){
                                i.expiration = 'expired'
                            }else{
                                var expirationDifference = Moment(expiry).diff(now, 'days');
                                if(expirationDifference <= 90){
                                    i.expiration = 'expiring'
                                }else{
                                    i.expiration = 'good'
                                }
                            }
                        }else{
                            i.expiry = '--'
                        }
                    })
                    localStorage.setItem('products', JSON.stringify(data))
                    return 'done';
                })
                .catch(err => {
                    reject('failed')
                })
            },
            getProducts(){
                this.loading = true
                this.$http.get('product/list-top-best')
                .then(res => {
                    let data =  res.body.result
                    if(data){
                        let dataKeys = Object.values(data)
                        this.results = dataKeys.map(e => {
                        var e = e.filter(function (el) {
                            return el != null;
                        });
                        
                        e.map(i => {
                            i.displayPrice = formatMoney( i.price, 2, '.',',')
                            
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

                            return e
                        })
                        
                        if(this.layout == 'list'){
                            let flattenProducts = this.results.flat()
                            this.listdata = flattenProducts
                        }
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

            nameSearch(query){
                this.loading = true
                let products = JSON.parse(localStorage.getItem('products'))

                console.log(products)
                const fuse = new Fuse(products, {
                    keys: ['name']
                })

                let result = fuse.search(query.name, {limit: 100})

                this.setProducts(result)
            },
            setProducts(result){
                this.recentProducts = []
                let products = result.map(item => {
                    let product = item.item;
                    return product
                })
            
                this.products = products
                this.loading = false

                if(this.layout == 'list'){
                    let flattenProducts = products.flat()
                    this.listdata = flattenProducts
                }
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
                        i.displayPrice = formatMoney( i.price, 2, '.',',')

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
            async resetPurchasedLeft(){
                let q = this.q
                q = q.trim();

                await this.getAllProducts()
                .then(e => {
                    console.log(e)
                    if(q != ''){
                        this.nameSearch({name: q})
                    }else{
                        this.getProducts()
                    }
                })               
            },

            initScanner(){
                if(process.env.VUE_APP_PLATFORM === 'local'){
                    this.$store.dispatch('GET_BARCODE')
                    .then(res => {
                        let barcode_online = this.$store.getters['BARCODE_ONLINE_STATE'];
                        if(barcode_online){
                            let barcode = this.$store.getters['GET_BARCODE']
                            if(barcode){
                                // this.$refs.search.blur()
                                let scanner = BarcodeScanner ();
                                scanner.on((code, event) => {
                                    event.preventDefault()
                                    // this.$refs.search.blur()
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
                }
            },
            search(){
                let q = this.q
                q = q.trim();
                if(q != '' && q.length >= 3){
                    this.nameSearch({name: this.q})
                }else{
                    this.getProducts()
                }
            },

            /**************************************
            *     ITEM ORDER FUNCTIONS
            ***************************************/
            addItem(item, retrieved){
                this.countRetail = 0;
                this.countWholesale = 0;
                var orderProducts = [...this.orderProducts]

                var product = {
                    id: item.id,
                    name: item.name,
                    totalprice: item.totalprice,
                    price: item.price,
                    wprice: item.wprice,
                    left: item.left,
                    quantity: 0,
                    pack_l: item.pack_l,
                    pack_q: item.pack_q,
                    retail: item.retail,
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

                this.updateProductTotalPrice(0)
                this.updateTotalPrice()
            },
            deleteItem(i){
                this.orderProducts.splice(i, 1);
                this.updateTotalPrice()
            },
            openDrugModal(i, item){
                this.selectedProduct = item
                this.selectedIndex = i
                this.showDrugDialog = true
                this.$nextTick(() => {
                    if(this.$refs.countRetail){
                        if(this.countRetail == 0){
                            this.countRetail = ''
                        }
                        this.$refs.countRetail.focus()
                    }
                })
            },
            resetOrder(){ 
                this.orderProducts = []
                this.customer = null
                this.discount = null
                this.cash = '';
                this.momo = '';
                this.change = '';
                this.countWholesale = 0;
                this.countRetail = 0;
                this.manualCheckout = false
                this.updateTotalPrice()
                localStorage.removeItem('orderProducts')
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
                        price: item.price,
                        wprice: item.wprice,
                        retail: item.retail,
                        selected: false,
                        saleId: this.id,
                        quantity: item.quantity,
                    }

                    this.orderProducts.unshift(product)
                    this.updateTotalPrice()
                })
            },
            counter(type, i, _package){
                let packaging =  _package ;
                if(isNaN(this.countWholesale)){
                    this.countWholesale = this.orderProducts[i].quantity ;
                }

                if(isNaN(this.countRetail)){
                    this.countRetail = this.orderProducts[i].retail ;
                }

                let pack_q = this.orderProducts[i].pack_q;
                let packTotal = (pack_q * this.orderProducts[i].left) + this.orderProducts[i].pack_l;
                if(packaging == 'wholesale'){
                    if(this.countWholesale > this.orderProducts[i].left){
                        this.countWholesale = this.orderProducts[i].left
                    }

                    if(this.countRetail > packTotal - (this.countWholesale * pack_q)){
                        this.countRetail = packTotal -  (this.countWholesale * pack_q)
                    }
                    
                }
                if(packaging == 'retail'){
                    if(this.countRetail > packTotal){
                        this.countRetail = packTotal
                    }
                }
                let wQuantity = this.countWholesale
                let rQuantity = this.countRetail


                if(type == 'add'){
                    if(packaging == 'wholesale'){
                        if(wQuantity < this.orderProducts[i].left){
                            wQuantity++
                        }
                    }
                     if(packaging == 'retail'){
                        if(rQuantity < (pack_q * (this.orderProducts[i].left - wQuantity)) + this.orderProducts[i].pack_l){
                            rQuantity++
                        }
                    }
                }else if(type == 'minus'){
                    if(packaging == 'wholesale'){
                        if(wQuantity > 0){
                            wQuantity--
                        }
                    }
                    
                    if(packaging == 'retail'){
                        if(rQuantity > 0){
                            rQuantity--
                        }
                     }

                }

                this.countWholesale = wQuantity
                this.countRetail = rQuantity
                this.orderProducts[i]['retail'] = rQuantity
                this.orderProducts[i]['quantity'] = wQuantity

                
                localStorage.setItem('orderProducts', JSON.stringify(this.orderProducts))
                this.updateProductTotalPrice(i)
                this.updateTotalPrice()
            },
            updateProductTotalPrice(i){
                let retail = this.orderProducts[i].retail || 0,
                    quantity = this.orderProducts[i].quantity || 0, 
                    price = this.orderProducts[i].price || 0,
                    wprice = this.orderProducts[i].wprice || 0;

                let productTotalPrice = 0;
               if(quantity != 0){
                    productTotalPrice = parseInt(quantity) * parseFloat(wprice) 
                }
                if(retail != 0){
                    productTotalPrice = productTotalPrice + (parseInt(retail) * parseFloat(price)) 
                }

                let totalPrice = productTotalPrice;
                this.orderProducts[i].totalprice = totalPrice
                this.orderProducts[i].formattedTotal = formatMoney(totalPrice, '.',',')
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
                this.grossTotal = grosstotal
                this.formattedGrossTotal = formatMoney(grosstotal, '.',',')
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

            /**************************************
            *     CHECKOUT FUNCTIONS
            ***************************************/
            checkout(type){
                if(this.cash == 0 && this.momo == 0){
                    this.cash = this.grossTotal
                }

                let transaction = {
                    grossTotal: this.grossTotal,
                    netTotal:  this.netTotal,
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
                            retail: item.retail.length > 0 ? Number(item.retail) : 0,
                            price: item.price.length > 0 ? Number(item.price) : 0,
                            wprice:  item.wprice.length > 0 ? Number(item.wprice) : 0,
                            total: item.totalprice,
                            productId: item.id,
                            id: item.saleId || undefined
                        }

                        if(product.quantity > 0){
                            transaction.products.push(product)
                        }
                    })

                    transaction.itemTotal = transaction.products.length
                    if(this.printReceipt){
                        transaction.print = true
                        
                    }else{
                        transaction.print = false
                    }
                    console.log(transaction)
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
                        if(postData.state == 'processing' && res.data.issuePrint){

                            if(process.env.VUE_APP_PLATFORM === 'local'){
                                axios.post('/print',{...res.result})
                                .then(printRes => {
                                    this.$notify({
                                        title: 'Printing',
                                        message: "Printing transaction receipt",
                                        type: 'success'
                                    })
                                })
                            }
                            
                            this.$notify({
                                title: 'Success',
                                message: "Checkout successful",
                                type: 'success'
                            });
                        }
                        this.resetOrder()
                        this.resetPurchasedLeft()
                    })
                    .catch(err => {
                        this.checkingout = false
                    })
                }
            },
            splitPayment(type){
                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                }else{
                    this.manualCheckout = true;

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
            quickPay(){
                this.cash = this.grossTotal
                this.checkout('pay')
            },

            /**************************************
            *     LAYOUT FUNCTIONS
            ***************************************/
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

                    this.layout = 'list';
                    this.loading = false
                }else{
                    this.loading = true
                    this.layout = 'grid';
                    this.loading = false
                }
            },
            styleRows({row}){
                if (row.recent == true) {
                    return 'row recent-row';
                } 

                if(row.left <= 0){
                    return 'disabled'
                }
                return 'row';
            },
            closeModal(){
                if(this.showDrugDialog == true){
                    this.showDrugDialog = false
                }
            },

            /**************************************
            *     KEYBOARD FUNCTIONS
            ***************************************/
           keyPressToCount(type){
               let index = this.selectedIndex;
                if(this.showDrugDialog){
                    this.$refs.countfield.blur()
                    this.counter(type, index, 'retail')
                }
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
            
            this.getAllProducts()
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