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
            <el-table :data="accountData" style="width: 100%">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="saler" label="Saler"> </el-table-column>
                <el-table-column prop="product" label="Items"> </el-table-column>
                <el-table-column prop="price" label="Net Price"> </el-table-column>
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
                accountData:[]
            }
        },
        methods:{
            getData(){
                this.$http.get('sales/list')
                .then(res=>{
                    let data = res.body.result

                    this.accountData = data
                })

            }

        },created() {
            this.getData()
        }
    }
</script>


<style lang="scss">
    
</style>