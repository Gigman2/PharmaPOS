<template>
    <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left"> 
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ...">
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
                <el-table-column prop="employee" label="Employee"> </el-table-column>
                <el-table-column prop="itemTotal" label="Items"> </el-table-column>
                <el-table-column prop="grossTotal" label="Gross Total"> </el-table-column>
                <el-table-column prop="price" label="Customer"> </el-table-column>
                <el-table-column>
                    <el-template>
                            <el-button size="mini">Complete</el-button>
                    </el-template>
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
                tableData:[]
            }
        },
        methods:{
            getData(){
                this.$http.get('product/transaction/list')
                .then(res=>{
                    this.tableData = res.body.result
                })

            }

        },created() {
            this.getData()
        }
    }
</script>


<style lang="scss">
    
</style>