<template>
    <div class="dashboard-wrapper dashboard-table mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ...">
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-table :data="accountData" style="width: 100%">
                <el-table-column prop="name" label="Name"></el-table-column>
                <el-table-column prop="role" label="Products"> </el-table-column>
                <el-table-column>
                    <template>
                            <el-button size="mini">View</el-button>
                            <el-button size="mini">Edit</el-button>
                            <el-button size="mini" danger>Delete</el-button>
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
            return {}
        },
    }
</script>


<style lang="scss">
    
</style>