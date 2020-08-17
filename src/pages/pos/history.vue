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
                                    
                                    <el-button  v-else-if="scope.row.state == 'complete'" size="mini" type="success">
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
                <div class="checkout-title">Purchase Detail</div>
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
                                    <span>{{item.quantity}}</span>
                                </td>
                                <td>{{item.unit}}</td>
                            </tr>
                        </tbody>
                    </table>
                </vue-custom-scrollbar>
                <table class="checkout-subtotal">
                    <tbody>
                        <tr>
                            <th align="left">Tax (0.015%)</th>
                            <td>Ghc {{transaction.tax}}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="checkout-total">
                    <tbody>
                        <tr>
                            <th align="left">Total </th>
                            <td width="100px" align="right">Ghc {{transaction.grossTotal}}</td>
                        </tr>
                    </tbody>
                </table>
           </div>
        </div>
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
                transaction: []
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
            }
        },
        created() {
            this.getCategories()
            this.getTransaction()
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