<template>
    <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ...">
            </div>
            <router-link :to="{name: 'office-sales_customer^add'}">
                <div class="btn btn-primary pull-right"><i class="fe-plus"></i> Add Customer</div>
            </router-link>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="ID"> </el-table-column>
                <el-table-column prop="name" label="Full Name"> </el-table-column>
                <el-table-column prop="email" label="Email"> </el-table-column>
                <el-table-column prop="phone" label="Phone"> </el-table-column>
                <el-table-column label="Last Purchase"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.lastPurchase === null"> Never</div>
                        <div v-else>{{scope.row.lastPurchase}}</div>
                    </template>
                </el-table-column>
                <el-table-column  label="Actions">
                    <template>
                        <el-button size="mini">Edit</el-button>
                        <el-button size="mini" type="danger">Remove</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import lineChart from '@/components/chart/lineChart.vue'

    export default {
        components: {
            vueCustomScrollbar,
            lineChart
        },
        data() {
            return {
                tableData: [],
            }
        },
        methods: {
            getCustomers(){
                this.$http.get('sales/customer-list')
                .then(res => {
                    let data =  res.body.result
                    data.map(item => {
                        item.name = item.firstname+' '+item.lastname
                    })
                    this.tableData = data
                })
                .catch(err => {
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to load data",
                        type: 'error'
                    });
                })

            },
        },
        created() {
            this.getCustomers()
        },
    }
</script>


<style lang="scss">
    
</style>