<template>
    <div class="dashboard-wrapper">
            <div class="card-wrapper"  v-if="userPermission && userPermission[1] && userPermission[1].state">
                <div class="card mini-card">
                    <div class="mini-card-row"> 
                        <div class="card-col">
                            <div class="card-title">Sales today</div>
                            <div class="card-content">{{sales.grossTotal}}</div>
                        </div>
                        <div class="card-col">
                            <div class="icon-box">
                                <i class="fe-dollar-sign"></i>
                            </div>
                        </div> 
                    </div>
                    <!-- <div class="card-footer">net sales today
                        <span>
                            <i class="fe-trending-up green"></i>
                            {{sales.netTotal}}
                        </span>
                    </div> -->
                </div>
                <div class="card mini-card">
                    <div class="mini-card-row">
                        <div class="card-col">
                            <div class="card-title">Stock worth</div>
                            <div class="card-content">{{salesWorth.stockWorth}}</div>
                        </div>
                        <div class="card-col">
                            <div class="icon-box">
                                <i class="fe-package"></i>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card-footer">Products in shortage
                        <span>
                            {{salesWorth.shortage}}
                        </span>
                    </div> -->
                </div>
                <div class="card mini-card">
                    <div class="mini-card-row">
                        <div class="card-col">
                            <div class="card-title">Accounts</div>
                            <div class="card-content">{{account.all}}</div>
                        </div>
                        <div class="card-col">
                            <div class="icon-box">
                                <i class="fe-users"></i>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card-footer">employees 
                        <span>
                            {{account.employees}}
                        </span>
                    </div> -->
                </div>
                <div class="card mini-card">
                    <div class="mini-card-row">
                        <div class="card-col">
                            <div class="card-title">Sales this months</div>
                            <div class="card-content">{{monthlySales}}</div>
                        </div>
                        <div class="card-col">
                            <div class="icon-box">
                                <i class="fe-clipboard"></i>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card-footer">since 31st June 2020
                    </div> -->
                </div>
            </div>
            <el-row :gutter="20" class="card-wrapper">
                <el-col :span="24">
                    <div class="card graph-card">
                        <div class="card-title pt-15 pb-15 pr-15 pl-15">Sales over the day</div>
                        <div class="card-content pt-15 pb-15 pr-15 pl-15">
                            <line-chart :dataset="salesData" :label="graphLabel"></line-chart>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="card-wrapper">
                 <el-col :span="12">
                    <div class="card dash-card" >
                        <div class="card-title pt-15 pb-15 pr-10 pl-10">Products expiring</div>
                        <div class="card-body">
                            <table  cellspacing="0" cellpadding="0" class="card-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th width="100">State</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, i) in salesWorth.expiring" :key="i">
                                        <td>{{item.name}}</td>
                                        <td class="text-right">
                                            <span class="text-red" v-if="item.expiresin == 0">expired</span>
                                            <span class="text-orange" v-else >{{item.expiresin}}</span>
                                        </td>
                                        <td>
                                            <!-- <el-button size="mini" round @click="$router.push({name: 'office-inventory_product'})">View</el-button> -->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="card dash-card" >
                        <div class="card-title pt-15 pb-15 pr-10 pl-10">Products out of stock</div>
                        <div class="card-body">
                            <table  cellspacing="0" cellpadding="0" class="card-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Left</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, i) in salesWorth.products" :key="i">
                                        <td>{{item.name}}</td>
                                        <td>{{item.left}}</td>
                                        <td>
                                            <el-button size="mini" round @click="$router.push({name: 'office-inventory_stock^add-id', params: {id: item.id}})">Add</el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
</template>

<script>
    import Moment from 'moment' 
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import lineChart from '@/components/chart/lineChart.vue'
    import formatMoney from '@/components/formatmoney.js'
    import {mapGetters} from 'vuex'
    
    export default {
        components: {
            vueCustomScrollbar,
            lineChart
        },
        data() {
            return {
                sales: '',
                salesWorth: '',
                account: '',
                monthlySales:'',
                salesData: {
                    label: "sales",
                    data: [],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'transparent'
                },
                graphLabel: [],
                expiring: []
            }
        },
        computed: {
            ...mapGetters({userPermission: 'PERMISSIONS'})
        },
        methods: {
            getSales(){
                this.$http.get('dashboard/sales')
                .then(res => {
                    let sales =  res.body.result
                    sales.grossTotal = formatMoney(sales.grossTotal, ',', '.')
                    sales.netTotal = formatMoney(sales.netTotal, ',', '.')
                    this.sales = sales
                })
                .catch(err => {
                    console.log(err)
                })

            },
            getSalesMonthly(){
                this.$http.get('dashboard/sales-monthly')
                .then(res => {
                    this.monthlySales =  res.body.result
                    this.monthlySales = formatMoney(this.monthlySales, 2, '.', ',')
                })
                .catch(err => {
                    console.log(err)
                })

            },
            getSalesGraph(){
                this.$http.get('dashboard/sales-graph')
                .then(res => {
                    let data =  res.body.result
                    this.prepareGraphData(data)
                })
                .catch(err => {
                    console.log(err)
                })

            },
            getWorthSales(){
                this.$http.get('dashboard/stock-worth')
                .then(res => {
                    let salesWorth =  res.body.result
                    salesWorth =  res.body.result

                    salesWorth.stockWorth = formatMoney(salesWorth.stockWorth, 2, '.', ',')
                    this.salesWorth = salesWorth

                    let expiry = salesWorth.expiring

                    expiry.map(item => {
                        let now = Moment().format('YYYY-MM-DD')
                        let expired = Moment().isAfter(item.expiry)

                        if(expired){
                            item.expiresin = '0'
                        }else{
                            item.expiresin = Moment(item.expiry).fromNow();
                            item.expiresin = item.expiresin.replace("in ", "")
                        }
                    })
                    this.expiring = expiry

                })
                .catch(err => {
                    console.log(err)
                })

            },
            getAccountAdmin(){
                this.$http.get('dashboard/account-admins')
                .then(res => {
                    this.account =  res.body.result
                })
                .catch(err => {
                    console.log(err)
                })

            },
            prepareGraphLabel(){
                let daysInWeek = [];
                var curr = new Date;

                daysInWeek = Array(7).fill().map((_, i) => 
                    {
                        if(curr.getDay()+i > 6){
                            return curr.getDay()+i - 7
                        }else{
                            return curr.getDay()+i
                        }
                    }
                );
                var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                this.graphLabel = [];
                daysInWeek.forEach(day => {
                    this.graphLabel.push(days[day])
                })

            },
            prepareGraphData(data){
                this.salesData.data = Array(7).fill().map((_, i) => 0);
                data.forEach((item, i) => {
                    this.salesData.data[i] = item.total
                })
            }
        },
        created() {
            this.prepareGraphLabel()
            this.getSales()
            this.getSalesMonthly()
            this.getWorthSales()
            this.getAccountAdmin()
            this.getSalesGraph()
        },
    }
</script>


<style lang="scss">
    .card-wrapper{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
    }
    .card{
        background-color: white;
        border-radius: 3px;
        height: 30px;
    }
    .mini-card{
        width: calc(25% - 45px);
        height: 110px;
        padding: 15px;
        font-family:'Open sans';
        .mini-card-row{
            display: flex;
            justify-content: space-between;
        }
        .card-col{
            padding: 10px;
            &::nth-child(1){
                width: 60%;
            }
        }
        .card-title{
            text-align: left;
            font-size: .9em;
            font-weight: bold;
            color: rgb(133, 133, 143)
        }
        .card-content{
            margin: 10px 0 15px 0;
            font-size: 1.4em;
            text-align: left;
            font-weight: bold;;
        }
        .icon-box{
            width: 60px;
            height: 60px;
            background-color: rgb(238, 238, 238);
            border-radius: 50%;
            line-height: 60px;
            font-size: 1.5em;
            color: slategray
        }
        .card-footer{
            font-size: .9em;
            text-align: left;
            span{
                font-weight: bold;
                color: slategrey;
                // float: right;
            }
            i{
                margin-left: 5px;
                &.green{
                    color: rgb(33, 207, 33)
                }
            }
        }
    }
    
    .graph-card{
        min-height: 350px;

        .card-title{
            font-size: 1em;
            text-align: left;
            font-family: 'Open sans';
            font-weight: bold;
            color: rgb(133, 133, 143);
        }
    }
    .card-table{
        width: 100%;
        text-align: left;
        thead{
            background-color: #dadada;
            th{
                padding: 10px;
                color: slategray
            }
        }
        td{
            padding: 10px;
            border-bottom: 1px solid rgba(235, 235, 235, 0.795);
        }
    }
    .dash-card{ 
        height: 500px;
        .card-title{
            text-align: left;
            color: slategray;
            font-weight: bold;
        }
        .card-body{
            height: 450px;
            overflow: scroll;
        }
        table{
            thead{
                background-color: #dddddd;
                th{
                    color: #000;
                }
            }
        }
    }

    .text-red{
        color: rgb(250, 94, 94);
        text-transform: capitalize;
    }

    .text-orange{
        color: rgb(143, 15, 104);
        text-transform: capitalize;
    }
</style>