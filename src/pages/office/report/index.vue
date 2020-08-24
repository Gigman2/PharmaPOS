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
            <el-button class="pull-left" type="primary" icon="el-icon-search" @click="getReport">Search</el-button>
            <!-- <div class="pull-right">
                <el-button type="success" size="small" icon="el-icon-document">Excel</el-button>
                <el-button type="danger" size="small" icon="el-icon-document">PDF</el-button>
            </div> -->
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
                result: []
            }
        },
        methods: {
            getReport(payload){
                var postData = {
                    'from': Moment(payload[0]).subtract(1, 'days').format('YYYY-MM-DD'),
                    'to': Moment(payload[1]).add(1, 'days').format('YYYY-MM-DD')
                }
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
                let payload = [Moment().format('YYYY-MM-DD'), Moment().add(1, 'days').format('YYYY-MM-DD')]
                this.getReport(payload)
            }
        },
        created() {
            this.getThisMonth()
        },
    }
</script>


<style lang="scss">
    
</style>