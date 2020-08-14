<template>
    <div class="main-wrapper">
        <div class="product-box">
            <div class="inner-box">
                <div class="form-box">
                    <div class="input-box">
                        <i class="fe-search"></i>
                        <input type="text" placeholder="Search ...">
                    </div>
                </div>
                <div class="filter-box">
                    <!-- <i class="fe-filter"></i> -->
                    <ul class="filters">
                        <li class="shadow-1 active">
                             <span>All</span>
                            </li>
                        <li class="shadow-1" v-for="(item, i) in categories" :key="i">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="clearfix"></div>

                <div class="products-box">
                    <div class="products-title">Top 25 Sellers</div>
                    <vue-custom-scrollbar class="scroll-area products" :settings="settings">
                        <div class="product-row" v-for="(row, index) in products" :key="index">
                            <el-tooltip class="item" effect="dark" placement="bottom-end"
                                v-for="(item, i) in row" :key="i">
                                <div slot="content">{{item.name}} <br/> {{(item.manufacturer !== 'null')? item.manufacturer : ''}}</div>
                                <div class="product shadow-1" @click="addItem(item)">
                                    <div class="product-image">
                                        <div class="image">
                                            <img :src="bucket+item.image" alt="">
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
                        <i class="fe-user-plus"></i>
                         <i class="fe-tag"></i>
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
                <table class="checkout-subtotal">
                    <tbody>
                        <tr>
                            <th align="left">Tax (0.015%)</th>
                            <td>Ghc {{tax}}</td>
                        </tr>
                    </tbody>
                </table>
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
                <div class="checkout-payout"><span>Pay</span> (Ghc {{grossTotal}})</div>
                <div class="checkout-reset" @click="resetOrder">Reset</div>
           </div>
        </div>

        <!-- <el-dialog
            title="Tips"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>This is a message</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    import {mapGetters} from 'vuex';

    export default {
        components: {
            vueCustomScrollbar
        },
        data() {
            return {
                settings: {
                    maxScrollbarLength: 60
                },
                netTotal: 0,
                grossTotal: 0,
                tax: 0,
                discount: 0,
                categories: [],
                products: [],
                orderProducts: []
            }
        },
        computed: {
            ...mapGetters({bucket: 'GET_BUCKET'})
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
                this.$http.get('product/stock')
                .then(res => {
                    let data =  res.body.result
                    this.products = data;
                    var newData = [];
                    var index = 0;
                    this.products.forEach((element,i )=> {
                        while (i+1 % 5 == 0){
                            index  = index + 1;
                        }
                        if(newData[index] === undefined){
                            newData[index] = []
                        }
                        newData[index].push(element)
                    });
                    this.products = newData
                })
                .catch((err) => {
                    console.log(err)
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to load data",
                        type: 'error'
                    });
                })
            },

            /**
            *     CHECKOUT FUNCTIONS
            **/
            addItem(item){
                var orderProducts = [...this.orderProducts]
                var product = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    left: item.left,
                    quantity: 1,
                    selected: false
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
                    products: []
                }

                this.orderProducts.forEach(item => {
                    let product = {
                        quantity: item.quantity,
                        unit: item.price,
                        total: item.quantity * item.price,
                        productId: item.id
                    }
                    transaction.products.push(product)
                })  
                
                if(type == 'hold'){
                    transaction.state = 'holding';
                    this.createTransaction(transaction)
                }else if(type == 'pay'){
                    transaction.state = 'processing'
                }
            },
            createTransaction(postData){
                this.$http.post('product/transaction/new', postData)
                .then(res => {
                     this.$notify({
                        title: 'Success',
                        message: "Transaction on hold",
                        type: 'success'
                    });
                    this.resetOrder()
                })
            }
        },
        created() {
            let orderProductsInStorage = localStorage.getItem('orderProducts')
            this.orderProducts = (JSON.parse(orderProductsInStorage)) ? JSON.parse(orderProductsInStorage) : [];
            this.getCategories()
            this.getProducts()
        },
    }
</script>

<style lang="scss">
    
</style>