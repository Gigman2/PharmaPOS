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
                <el-button type="success" size="small" icon="el-icon-document" @click="download('excel')">Excel</el-button>
                <!-- <el-button type="danger" size="small" icon="el-icon-document">PDF</el-button> -->
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
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
                result: []
            }
        },
        methods: {
            getReport(payload){
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
                        item.lastTransaction = Moment(item.lastTransaction).format('Do MMM YYYY')
                        item.closing_cash = formatMoney(item.closing_cash, ',', '.')
                        item.stockWorth = formatMoney(item.stockWorth, ',', '.')
                        item.cash = formatMoney(item.cash, ',', '.')
                        item.momo = formatMoney(item.momo, ',', '.')
                    })
                    this.result = data
                })
            },
            getThisMonth(){
                let payload = [Moment().subtract(6,'days').format('YYYY-MM-DD'), Moment().format('YYYY-MM-DD')]
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
                this.$http.post('sales/report/download?file=excel',
                    {   name:'Sales Report ', title, data, 
                        from: Moment(this.from).format('Do MMM YYYY'),  
                        to: Moment(this.to).format('Do MMM YYYY')
                    }
                ).then(res => {
                    console.log(res)
                    // var headers = res.headers();
                    // var blob = new Blob([res.data],{type:headers['content-type']});
                    // var link = document.createElement('a');
                    // link.href = window.URL.createObjectURL(blob);
                    // link.download = "Filename";
                    // link.click();
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