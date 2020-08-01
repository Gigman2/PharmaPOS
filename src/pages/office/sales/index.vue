<template>
    <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ...">
            </div>
            <router-link :to="{name: 'office-product_add'}">
                <div class="btn btn-primary pull-right"><i class="fe-plus"></i> Add Drug</div>
            </router-link>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-table :data="accountData" style="width: 100%">
                <el-table-column prop="name" label="Drug Name"></el-table-column>
                <el-table-column prop="role" label="Category"> </el-table-column>
                <el-table-column prop="email" label="In Stock"> </el-table-column>
                <el-table-column prop="phone" label="Price"> </el-table-column>
                <el-table-column prop="login" label="Generic"> </el-table-column>
                <el-table-column>
                    <el-template>
                            <el-button size="mini">View</el-button>
                            <el-button size="mini">Edit</el-button>
                            <el-button size="mini" danger>Delete</el-button>
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