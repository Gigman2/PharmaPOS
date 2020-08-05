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
                <el-table-column prop="name" label="Discount ID"> </el-table-column>
                <el-table-column prop="email" label="Code"> </el-table-column>
                <el-table-column prop="phone" label="Times Used"> </el-table-column>
                <el-table-column prop="purchase" label="Use Limit"> </el-table-column>
                <el-table-column prop="purchase" label="Discount %"> </el-table-column>
                <el-table-column>
                    <el-template>
                            <el-button size="mini">Delete</el-button>
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
            return {}
        },
    }
</script>


<style lang="scss">
    
</style>