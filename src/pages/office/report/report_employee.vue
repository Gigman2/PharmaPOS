<template>
    <div class="dashboard-wrapper dashboard-table mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left mr-20">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ..." v-model="q" @keyup="getReport">
            </div>
            <div class="pull-right">
                <el-button round type="success" size="medium" icon="el-icon-document" @click="download('excel')">Export</el-button>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-table :data="result" style="width: 100%" class="report-table">
                <el-table-column prop="name" label="Name"></el-table-column>
                <el-table-column prop="role" label="Role"></el-table-column>
                <el-table-column prop="totalSales" label="Sales Made"> </el-table-column>
                <el-table-column prop="averageCheckin" label="Average checkin"></el-table-column>
                <el-table-column prop="averageCheckout" label="Average checkout"> </el-table-column>
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
                let postData = {}
                if(this.q != ''){
                    postData.name = this.q
                }
                this.$http.post('users/report', postData)
                .then(res=>{
                    let data = res.body.result
                    data.map(item => {
                        item.name = item.firstname+' '+item.lastname
                        item.totalSales = formatMoney(item.totalSales, ',', '.')
                    })
                    this.result = data
                })
            },
            getThisMonth(){
                let from =  Moment().format('YYYY-MM-DD');
                let to = Moment().subtract(30, 'days').format('YYYY-MM-DD');
                this.getReport({from, to})
            },
            download(file){
                let title = { 
                    name:'Name',
                    added:'Role', 
                    totalSales: 'Sales Made',
                    averageCheckin: 'Average Checkin',
                    averageCheckout:'Average Checkout',
                }
                let data = this.result;
                this.$http.post('data/download',
                    {   name:'Employee Report ', title, data, 
                        from: Moment(this.from).format('Do MMM YYYY'),  
                        to: Moment(this.to).format('Do MMM YYYY')
                    }
                ).then(res => {
                    window.open('http://localhost:4000/api/data/download?file='+res.body.file);
                    this.$router.push({name: this.$route.name})
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