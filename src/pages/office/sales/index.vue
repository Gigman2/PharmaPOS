<template>
    <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left"> 
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ..." v-model="q" @keyup="search()">
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-table :data="tableData" style="width: 100%">
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
                         <el-link class="ml-20" type="success" :underline="false" v-else>complete</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-drawer
            title="Transaction breakdown"
            :visible.sync="drawer"
            :direction="'rtl'" size="35%">
            <div class="transaction-breakdown">
                <table class="transaction-info mb-10">
                    <tr>
                        <td>
                            <div>
                                Status:  
                                <el-link class="ml-20" type="primary" :underline="false" v-if="selectedTransaction.state == 'holding'">Holding</el-link>
                                <el-link class="ml-20" type="success" :underline="false" v-else>Complete</el-link>
                            </div>
                        </td>
                        <td>
                            <div>Date: 
                                <span> <el-link class="ml-20" type="info" :underline="false">{{selectedTransaction.createdAt}}</el-link></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <div>
                                Employee:  
                                <el-link class="ml-20" type="info" :underline="false" >{{selectedTransaction.by}}</el-link>
                            </div>
                        </td>
                        <td>
                            <div>Customer: 
                                <span> <el-link class="ml-20" type="info" :underline="false">{{(selectedTransaction.to)? selectedTransaction.to: '--'}}</el-link></span>
                            </div>
                        </td>
                    </tr>
                </table>
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
                <div class="leftright-box">
                    <div class="left-box"><strong>Total</strong></div>
                    <div class="right-box"><strong>Ghc {{selectedTransaction.grossTotal}}</strong></div>
                </div>
                <!-- <div class="leftright-box">
                    <div class="left-box">Tax(15%)</div>
                    <div class="right-box">Ghc 100.00</div>
                </div> -->
                <!-- <div class="leftright-box">
                    <div class="left-box">Discount(20%)</div>
                    <div class="right-box">Ghc 100.00</div>
                </div> -->
                <div class="leftright-box">
                    <div class="left-box">Cash: <strong>Ghc {{selectedTransaction.cashAmount}}</strong></div>
                    <div class="right-box">Mobile Money:  <strong>Ghc {{selectedTransaction.momoAmount}}</strong></div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import lineChart from '@/components/chart/lineChart.vue'
    import Moment from 'moment'
    import formatMoney from '@/components/formatmoney.js'

    export default {
        components: {
            vueCustomScrollbar,
            lineChart
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
            },
            closeDrawer() {
                this.dialog = false;
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
            color: #6751de;
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
        .leftright-box:first-child{
            border-top: none;;
        }
    }
</style>