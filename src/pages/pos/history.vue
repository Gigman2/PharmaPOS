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
                <div class="clearfix"></div>

                <div class="products-box">
                    <vue-custom-scrollbar class="scroll-area products" :settings="settings">
                        <el-table :data="tableData"
                            style="width: 100%">
                            <el-table-column label="Transaction ID">
                                <template slot-scope="scope">
                                    <span>{{'TR-'+scope.row.id}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Total Products" prop="itemTotal"> </el-table-column>
                            <el-table-column label="Amount (Ghc)" prop="grossTotal"> </el-table-column>
                            <el-table-column label="Date" prop="date"> </el-table-column>
                            <el-table-column label=""  width="200">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="viewItem(scope.row)">
                                        <span>view</span>
                                    </el-button>

                                    <el-button size="mini" @click="retrieveItem(scope.row)" type="primary" v-if="scope.row.state == 'holding'">
                                        <span>retrieve</span>
                                    </el-button>
                                    
                                    <el-link class="ml-20" type="success" :underline="false"  v-else-if="scope.row.state == 'complete'" >
                                            {{scope.row.state}}
                                    </el-link>

                                    <el-button  v-else-if="scope.row.state == 'returned'" size="mini" type="warning">
                                        <span>{{scope.row.state}}</span>
                                    </el-button>

                                    <el-button  v-else-if="scope.row.state == 'refunded'" size="mini" type="warning">
                                        <span>{{scope.row.state}}</span>
                                    </el-button>

                                    <el-button  v-else size="mini" type="info">
                                        <span>{{scope.row.state}}</span>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </vue-custom-scrollbar>
                </div>
            </div>
        </div>
        <div class="checkout-box">
           <div class="checkout-invoice">
                <div class="checkout-title pull-left" >Purchase Detail</div>

                <div class="pull-right mt-10 mr-10" v-if="Object.keys(transaction).length === 0 && transaction.constructor === Object">
                    <el-button size="mini">
                        <span>Refund</span>
                    </el-button>

                    <el-button size="mini">
                        <span>Return</span>
                    </el-button>
                </div>

                <div class="pull-right mt-10 mr-10" v-else>
                    <el-button size="mini" @click="showCustomerDialog = true">
                        <span>Add Customer</span>
                    </el-button>

                    <el-button size="mini" type="primary" @click="refundModal">
                        <span>Refund</span>
                    </el-button>

                    <el-button size="mini" type="primary" @click="returnModal">
                        <span>Return</span>
                    </el-button>
                </div>
                <div class="clearfix"></div>

                <vue-custom-scrollbar class="checkout-table-wrapper history">
                    <table class="checkout-table" cellspacing="0" cellpadding="0">
                        <thead class="checkout-headings">
                            <tr>
                                <!-- <th width="30px"></th> -->
                                <th>Name</th>
                                <th>Qty</th>
                                <th width="60px">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="checkout-item-row" v-for="(item, i) in transaction.products" :key="i">
                                <td style="text-align: left">{{item.product.name}}</td>
                                <td>
                                    <span>  
                                        {{(item.packBought == 0 && item.looseBought == 0) ? '--' : ''}}

                                        {{(item.packBought > 0) ? item.packBought+'pck' : ''}}

                                        {{(item.looseBought > 0) ? item.looseBought+'pcs' : ''}}
                                    </span>
                                </td>
                                <td>{{item.total}}</td>
                            </tr>
                        </tbody>
                    </table>
                </vue-custom-scrollbar> 
                <table class="checkout-total">
                    <tbody>
                        <tr>
                            <th align="left">Total </th>
                            <td width="100px" align="right">Ghc {{transaction.grossTotal}}</td>
                        </tr>
                        <tr v-if="transaction.boughtBy">
                            <th align="left">Bought By </th>
                            <td width="200px" align="right">{{(transaction.boughtBy !== undefined) ? transaction.boughtBy.firstname+' '+transaction.boughtBy.lastname : ' -- '}}</td>
                        </tr>
                    </tbody>
                </table>
           </div>
        </div>
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
                <el-button type="primary" @click="showCustomerDialog = false; attachCustomer()" v-if="!activateNewCustomer">Confirm</el-button>
                <el-button type="primary" @click="saveCustomer()" v-else>Save &amp; Attach</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Moment from 'moment'
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    export default {
        components: {
            vueCustomScrollbar
        },
        data() {
            return {
                settings: {
                    maxScrollbarLength: 60
                },
                tableData: [
                ],
                categories: [],
                transaction: {},

                showCustomerDialog: false,
                activateNewCustomer: false,
                newCustomer: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: ''
                },
                customers: [],
                customer: null,
            }
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
            getTransaction(){
                this.$http.get('product/transaction/list')
                .then(res => {
                   this.tableData = res.body.result
                   this.tableData.map(item => {
                       item.date = Moment(item.createdAt).format('MMMM Do YYYY');
                       if(item.products.lengths > 0){
                           item.first = item.products[0]
                       }
                   })
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
            viewItem(item){
                this.transaction = item
            },
            retrieveItem(item){
                let products = [];
                localStorage.setItem('retrievedTransaction', JSON.stringify(item))
                this.$router.push({name: 'pos-home'})
            },
            returnModal(){
                this.$confirm('Are you sure you want to record a returned transaction?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                })
                .then(() => {
                    this.returnTransaction()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Return canceled'
                    });          
                });
            },
            returnTransaction(){
                 this.$http.post('product/transaction/return', {id: this.transaction.id})
                .then(res => {
                    this.getTransaction()
                    this.$notify({
                        title: 'Success',
                        message: "This transaction was returned by customer",
                        type: 'success'
                    });
                }) 
                .catch((err) => {
                    this.$notify({
                        title: 'Success',
                        message: "This transaction can be returned",
                        type: 'error'
                    });
                })
            },
            refundModal(){
                this.$confirm('Are you sure you want to record a refund ?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                })
                .then(() => {
                    this.refundTransaction()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Refund canceled'
                    });          
                });
            },
            refundTransaction(){
                 this.$http.post('product/transaction/refund', {id: this.transaction.id})
                .then(res => {
                    this.getTransaction()
                    this.$notify({
                        title: 'Success',
                        message: "This transaction was returned by customer",
                        type: 'success'
                    });
                }) 
                .catch((err) => {
                    this.$notify({
                        title: 'Success',
                        message: "This transaction can be returned",
                        type: 'error'
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
            attachCustomer(){
                let payload = {
                    id: this.transaction.id,
                    customerId: this.customer
                }
                this.$http.post('sales/customer-attach', payload)
                .then(res => {
                    this.getTransaction()
                    this.$notify({
                        title: 'Success',
                        message: "Customer attached",
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.$notify({
                        title: 'Failed',
                        message: "Error occurred",
                        type: 'error'
                    });
                })
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

                   this.attachCustomer()
                })
                .catch((err) => {
                    this.error = true
                    this.errorMessage = err.body.message
                     this.submitting =  false;
                })
            }
            
        },
        created() {
            this.getCategories()
            this.getTransaction()
            this.getCustomers()
        },
    }
</script>

<style lang="scss">
    .el-button--mini{
        .mini-icon{
            margin-right: 10px;
        }
    }
    .checkout-box .checkout-table-wrapper.history {
        height: calc(100vh - 257px);
        overflow: hidden;
    }
</style>