<template>
    <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left" v-if="userPermission && userPermission[3] && userPermission[3].state"> 
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ..." v-model="q" @keyup="search()">
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-table :data="tableData" style="width: 100%" v-if="userPermission && userPermission[3] && userPermission[3].state">
                <el-table-column prop="id" label="ID">
                    <template slot-scope="scope">
                         <div> TR-{{scope.row.id}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="by" label="Employee"> </el-table-column>
                <el-table-column prop="itemTotal" label="Items"> </el-table-column>
                <el-table-column prop="grossTotal" label="Gross Total"> </el-table-column>
                <el-table-column prop="to" label="Customer">
                    <template slot-scope="scope">
                         <div> {{(scope.row.to) ? scope.row.to : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="Purchase Date"> </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="drawer = true; selectedTransaction = scope.row">View</el-button>
                        
                         <el-button size="mini" type="primary" v-if="scope.row.state == 'holding'">On Hold</el-button>
                         <el-link class="ml-20" type="warning" :underline="false" v-else-if="scope.row.state == 'returned'">returned</el-link>
                         <el-link class="ml-20" type="warning" :underline="false" v-else-if="scope.row.state == 'refunded'">refunded</el-link>
                         <el-link class="ml-20" type="success" :underline="false" v-else>complete</el-link>
                    </template>
                </el-table-column>
            </el-table>

            <no-access v-else></no-access>
        </div>

        <el-drawer
            :visible.sync="drawer"
            :direction="'rtl'" size="35%">
            <div class="transaction-breakdown">
                <h2>
                    Invoice No. {{selectedTransaction.id}}
                    <el-button size="mini" class="pull-right" @click="printRequest(selectedTransaction.id)">Print</el-button>
                </h2>
                <div class="drawer-double mt-20">
                    <div class="drawer-item">Issured by <strong>{{selectedTransaction.by}}</strong></div>
                    <div class="drawer-item light">{{selectedTransaction.date}}</div>
                </div>
                <div class="drawer-double mt-20">
                    <div class="drawer-item">Bought by <strong>{{(!selectedTransaction.to) ? 'Guest' : selectedTransaction.to}}</strong></div>
                    <div class="drawer-item">
                        <el-button size="mini" type="primary" v-if="selectedTransaction.state == 'holding'">On Hold</el-button>
                        <el-button size="mini" type="info" v-else-if="selectedTransaction.state == 'returned'">Returned</el-button>
                        <el-button size="mini" type="primary" v-else-if="selectedTransaction.state == 'refunded'">Refunded</el-button>
                        <el-button size="mini" type="primary" v-else>complete</el-button>
                    </div>
                </div>

                <div class="drawer-inner">
                    <div class="checkout-table">
                        <table class="transaction-table" cellspacing="0" cellpadding="0">
                            <thead>
                                <tr>
                                        <th>Name</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                    </tr>
                            </thead>
                            <tbody>
                                    <tr v-for="(item, i) in selectedTransaction.products" :key="i">
                                        <td>{{item.product.name}}</td>
                                        <td>{{item.quantity}}</td>
                                        <td>{{item.unit}}</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="drawer-double mt-10 pl-15 pr-15">
                        <div class="drawer-item"><strong>Total</strong></div>
                        <div class="drawer-item"><strong>{{selectedTransaction.grossTotal}}</strong></div>
                    </div>
                </div>

                <div class="drawer-double mt-20">
                    <div class="drawer-item">Tax (inclusive)</div>
                    <div class="drawer-item">Ghc {{selectedTransaction.tax}}</div>
                </div>

                <div class="drawer-double mt-20">
                    <div class="drawer-item">Discount {{selectedTransaction.discount}}</div>
                    <div class="drawer-item">{{(selectedTransaction.discount / 100) * selectedTransaction.formatTotal}}</div>
                </div>

                <div class="drawer-double mt-20" v-if="parseFloat(selectedTransaction.cashAmount) == selectedTransaction.formatTotal">
                    <div class="drawer-item"><strong>Paid all by cash</strong></div>
                </div>

                <div class="drawer-double mt-20" v-else-if="parseFloat(selectedTransaction.momoAmount) == selectedTransaction.formatTotal">
                    <div class="drawer-item"><strong>Paid all by momo</strong></div>
                </div>

                <div class="drawer-double mt-20" v-else>
                    <div class="drawer-item"><strong>Paid {{selectedTransaction.cashAmount}} by cash</strong></div>
                    <div class="drawer-item"><strong>Paid {{selectedTransaction.momoAmount}} by momo</strong></div>
                </div>

                 <div class="drawer-double mt-10" v-if="selectedTransaction.changeGiven != 0">
                    <div class="drawer-item"><strong>With a change of Ghc {{selectedTransaction.changeGiven}}</strong></div>
                </div>


                <div class="drawer-double mt-50">
                    <div class="drawer-item">
                        <el-button size="small" v-if="userPermission && userPermission[4] && userPermission[4].state">Edit</el-button>
                    </div>
                    <div class="drawer-item"> 
                        <el-button size="small" type="danger" v-if="userPermission && userPermission[5] && userPermission[5].state">Delete</el-button>
                    </div>
                </div>

            </div>
        </el-drawer>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import Moment from 'moment'
    import formatMoney from '@/components/formatmoney.js'
    import { mapGetters } from 'vuex';

    export default {
        components: {
            vueCustomScrollbar,
        },
        data() {
            return {
                tableData:[],
                q: '',
                loading: '',
                drawer: false,
                selectedTransaction: {}
            }
        },
        computed: {
            ...mapGetters({userPermission: 'PERMISSIONS'})
        },
        methods:{
            setData(data){
                data.map(item => {
                    item.date = Moment(item.createdAt).format('D MMM YYYY h:mm a')
                    if(item.soldby){
                        item.by = item.soldby.firstname+' '+item.soldby.lastname
                    }

                    if(item.boughtBy){
                        item.to = item.boughtBy.firstname+' '+item.boughtBy.lastname
                    }
                    item.grossTotal = formatMoney(item.grossTotal,',','.')
                })
                this.tableData = data
            },
            getData(){
                this.$http.get('product/transaction/list')
                .then(res=>{
                    let data = res.body.result
                    this.setData(data)
                })
                .catch(err => {

                })

            },
            search(){
                let q = this.q
                q = q.replace('tr-', '')
                q = q.replace('TR-', '')

                this.$http.get('product/transaction/search', {
                    params: {q: q}
                })
                .then(res => {
                    let data =  res.body.result
                    this.setData(data)
                })
                .catch(err => {
                    
                })
            },
            closeDrawer() {
                this.dialog = false;
            },
            printRequest(id){
                this.$http.post('product/transaction/print', {id})
                .then(res => {
                    this.$notify({
                        title: 'Success',
                        message: "Print job started",
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.$notify({
                        title: 'Error',
                        message: "Unanble to print these transaction",
                        type: 'error'
                    });
                })
            }

        },created() {
            this.getData()
        }
    }
</script>


<style lang="scss" scoped>
    .transaction-table{
        width: 100%;
        max-height: 300px;
        tr > th{
            color: #42b983;
            padding: 10px;
            background-color: rgb(230, 230, 230);
            &:first-child{
                text-align: left;
            }
        }

        tr > td{
            padding: 15px;
            border-top: 1px solid rgb(241, 241, 241);
            &:first-child{
                text-align: left;
            }
        }
    }

   
    .transaction-info{
        width: 100%;
        tr > td{
            text-align: left;
            padding: 15px;
        }
    }

    .leftright-box{
        display: flex;
        justify-content: space-between;
        padding:10px 15px;
        background-color: rgb(236, 236, 236);
        color: #847daa;
        border-top: 1px solid #b2abd844;
    }

    .transaction-breakdown{
        padding: 0 30px;
        h2{
            color: rgb(85, 95, 105);
            font-size: 25px;
        }

        .drawer-double{
            display: flex;
            justify-content: space-between;
            // margin-top: 30px;
            .drawer-item{
                font-size: 17px;
                color: rgb(85, 95, 105);
            }
            .light{
                color: silver;
            }
        }
        .drawer-inner{
            margin-top: 10px;
            padding: 10px;
            background-color: #e6e6e6;
            border-radius: 2px;
            .drawer-double{
                margin-top: 10px;
            }
        }
    }
</style>