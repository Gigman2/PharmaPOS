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
            <div class="search-box pull-left mr-20">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ..." v-model="q" @keyup="getReport">
            </div>
           <div class="pull-right">
                <el-button round type="success" size="medium" icon="el-icon-document" @click="download('excel')">Export</el-button>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10" v-loading="fetching">
            <el-table :data="result" style="width: 100%" class="report-table">
                <el-table-column prop="name" label="Product Name"></el-table-column>
                <el-table-column prop="price" label="Price"></el-table-column>
                <el-table-column prop="firstStock.initialStock" label="Starting Stock"> </el-table-column>
                <el-table-column prop="left" label="Closing Stock" width="120px">
                    <template slot-scope="scope">
                        <div class="danger" v-if="scope.row.left <= 0">{{scope.row.left }}</div>
                        <div class="warning" v-else-if="scope.row.left <= scope.row.restock">{{scope.row.left}}</div>
                        <div class="" v-else>{{scope.row.left}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="timesrestocked" label="Times Restock"> </el-table-column>
                <el-table-column prop="quantitysold" label="Quantity Sold"> </el-table-column>
                <el-table-column prop="supplier" label="Current Supplier"> </el-table-column>
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
                    }]
                },
                date_filter: '',
                result: [],
                q: ''
            }
        },
        methods: {
            getReport(payload){
                this.fetching = true
                var postData = {
                    'from': Moment(payload[0]).subtract(1, 'days').format('YYYY-MM-DD'),
                    'to': Moment(payload[1]).add(1, 'days').format('YYYY-MM-DD')
                }
                if(this.q != ''){
                    postData.name = this.q
                }
                this.$http.post('product/report', postData)
                .then(res=>{
                    let data = res.body.result
                    data.map(item => {
                        item.lastTransaction = Moment(item.lastTransaction).format('Do MMM YYYY')
                        if(item.supplier[0] !== undefined){
                            item.supplier = item.supplier[0].name
                        }else{
                            item.supplier = '--'
                        }
                        if(item.firstStock){
                            item.initialStock = item.firstStock.initialStock
                        }
                        item.price = formatMoney(item.price, ',','.')
                        item.quantitysold = formatMoney(item.quantitysold, ',','.')
                    })
                    this.result = data
                    this.fetching = false
                })
                .catch(err => {
                    this.fetching = false
                })
            },
            getThisMonth(){
                let payload = [Moment().subtract(30, 'days').format('YYYY-MM-DD'), Moment().format('YYYY-MM-DD')]
                this.getReport(payload)
            },
             download(file){
               let title = { 
                    name:'Product Name',
                    price: 'Price', 
                    initialStock: 'Starting Stock',
                    left: 'Closing Stock',
                    timesrestocked:'Times Restock',
                    quantitysold:'Quantity Sold',
                    supplier:'Current Supplier'
                }
                let data = this.result;
                this.$http.post('data/download',
                    {   name:'Inventory Report ', title, data, 
                        from: Moment(this.from).format('Do MMM YYYY'),  
                        to: Moment(this.to).format('Do MMM YYYY')
                    }
                ).then(res => {
                    let file = res.body.file
                    window.open('http://localhost:4000/api/data/download?file='+res.body.file);
                    this.$router.push({name: 'office-report_sales'})
                })
            }
        },
        created() {
            this.getThisMonth()
        },
    }
</script>


<style lang="scss" scoped>
    .search-box{
        width: 300px;
        background-color: white;
        border: 1px solid #DCDFE6;
        i{
            color: #DCDFE6;
        }
    }

    .doc-button{
        cursor: pointer;
        width: 30px;
        display: inline-block;
        margin-left: 10px;
        img{
            width: 100%;
        }
    }
</style>