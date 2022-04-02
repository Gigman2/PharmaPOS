<template>
    <div class="dashboard-wrapper dashboard-table mt-15">
        <div class="dashboard-top">
            <el-date-picker class="pull-left mr-20"
                v-model="date_filter"
                type="daterange"
                align="left"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                :picker-options="pickerOptions"
                @change="getReport">
            </el-date-picker>
            <div class="pull-right">
                <h3>{{total}}</h3>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10" v-loading="fetching">
            <el-table :data="result" style="width: 100%">
                <el-table-column prop="lastTransaction" label="Last Transaction"></el-table-column>
                <el-table-column prop="employee" label="Last Checkout By"></el-table-column>
                <el-table-column prop="closing_cash" label="Closing Cash"> </el-table-column>
                <el-table-column prop="stockWorth" label="Stock Worth"> </el-table-column>
                <el-table-column prop="customers" label="Customers"> </el-table-column>
                <el-table-column prop="cash" label="Cash"> </el-table-column>
                <el-table-column prop="momo" label="Momo"> </el-table-column>
            </el-table>
        </div>

        <iframe id="my_iframe" style="display:none;" ref="d_frame"></iframe>
    </div>
</template>

<script> 
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import Moment from 'moment'
    import formatMoney from '@/components/formatmoney.js'
    export default {
        components: {
            vueCustomScrollbar,
        },
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: 'Last week',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Last month',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Last 3 months',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    },
                     {
                        text: 'Last 6 months',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                date_filter: '',
                to: '',
                from: '',
                result: [],
                total: 0,
                fetching: false
            }
        },
        methods: {
            getReport(payload){
                this.fetching = true
                var postData = {
                    'from': Moment(payload[0]).format('YYYY-MM-DD'),
                    'to': Moment(payload[1]).format('YYYY-MM-DD')
                }
                this.from = payload[0];
                this.to = payload[1];
                this.$http.post('sales/report', postData)
                .then(res=>{
                    let data = res.body.result
                    data.map(item => {
                        this.total = this.total + (item.grossTotal).toFixed(2)
                        item.lastTransaction = Moment(item.lastTransaction).format('Do MMM YYYY')
                        item.closing_cash = formatMoney(item.closing_cash, ',', '.')
                        item.stockWorth = formatMoney(item.stockWorth, ',', '.')
                        item.cash = formatMoney(item.cash, ',', '.')
                        item.momo = formatMoney(item.momo, ',', '.')
                    })
                    this.fetching = false
                    this.result = data
                })
                .catch(err => {
                    this.fetching = false
                })
            },
            getThisMonth(){
                let payload = [Moment().subtract(6,'days').format('YYYY-MM-DD'), Moment().add(1, 'day').format('YYYY-MM-DD')]
                this.from = payload[0];
                this.to = payload[1];
                this.getReport(payload)
            },
            download(file){
                let title = { 
                    lastTransaction:'Last Transaction',
                    employee: 'Last Checkout By', 
                    closing_cash: 'Closing Cash',
                    stockWorth: 'Stock Worth',
                    customers:'Customers',
                    cash:'Cash',
                    momo:'Momo'
                }
                let data = this.result;
                this.$http.post('data/download',
                    {   name:'Sales Report ', title, data, 
                    }
                ).then(res => {
                    window.open('http://localhost:4000/api/data/download?file='+res.body.file);
                    this.$router.push({name: this.$route.name})
                })
                .catch(err => {
                    if(err.body.message){
                        this.$notify({
                            title: 'Alert!',
                            message: err.body.message,
                            type: 'error'
                        });
                    }
                })
            }
        },
        created() {
            this.getThisMonth()
        },
    }
</script>


<style lang="scss">
    
</style>