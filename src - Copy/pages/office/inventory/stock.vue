<template>
    <div class="dashboard-wrapper dashboard-table mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ...">
            </div>
             <router-link :to="{name: 'office-inventory_stock^add'}">
                <el-button round type="" size="medium" icon="el-icon-plus" class="pull-right"> Update Stock</el-button>
            </router-link>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10" v-loading="fetching">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="productName" label="Product Name"></el-table-column>
                <el-table-column prop="currentStock" label="Current Stock"> </el-table-column>
                <el-table-column prop="initialStock" label="Initial Number"> </el-table-column>
                <el-table-column prop="supplier" label="Supplier"> </el-table-column>
                <el-table-column prop="left" label="Product Type">
                     <template slot-scope="scope">
                        <div>{{scope.row.product.pack_q === 1 ? 'Only Retail' : 'Wholesale & Retail'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="updated" label="Last Updated"> </el-table-column>
                <el-table-column>
                    <template slot-scope="">
                            
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import lineChart from '@/components/chart/lineChart.vue';
    import Moment from 'moment'

    export default {
        components: {
            vueCustomScrollbar,
            lineChart
        },
        data() {
            return {
                tableData: [],
                fetching: false
            }
        },
        methods: {
            getData(){
                this.fetching = true
                this.$http.get('product/stock/list')
                .then(res => {
                    let data =  res.body.result
                    data.map(i => {
                        i.updated = Moment(i.updatedAt).format('D MMM YYYY - h:mm a')
                        if(i.product){
                            i.shelf = i.product.shelf
                        }
                        if(i.supplier){
                            i.supplier = i.supplier.name
                        }
                    })

                    this.fetching = false
                    this.tableData = data;
                })
                .catch(() => {
                    this.fetching = false
                })
            },
            triggerDelete(i, id) {
                this.$notify({
                    title: 'Failed',
                    message: "Stock entry cannot be deleted",
                    type: 'error'
                });
            }
        },
        created() {
            this.getData()
        },
    }
</script>


<style lang="scss">
    
</style>