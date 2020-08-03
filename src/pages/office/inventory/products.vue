<template>
    <div class="dashboard-wrapper dashboard-table mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ...">
            </div>
            <router-link :to="{name: 'office-inventory_product^add'}">
                <div class="btn btn-primary pull-right"><i class="fe-plus"></i> Add Product</div>
            </router-link>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-table :data="result" style="width: 100%">
                <el-table-column prop="name" label="Product Name"></el-table-column>
                <el-table-column prop="category" label="Category"> </el-table-column>
                <el-table-column prop="barcode" label="Barcode ID"> </el-table-column>
                <el-table-column prop="quantity" label="In Stock"> </el-table-column>
                <el-table-column prop="price" label="Price (Ghc)"> </el-table-column>
                <el-table-column>
                    <template>
                            <el-button size="mini">Edit</el-button>
                            <el-button size="mini" type="danger">Delete</el-button>
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
                result: []
            }
        },
        methods: {
            getData(){
                this.$http.get('product/list')
                .then(res => {
                    let data =  res.body.result
                    // data.map(i => {
                    //     i.name = i.firstname+' '+i.lastname
                    //     i.login = 'never'
                    //     if(i.lastLogin){
                    //         i.login = moment(i.lastLogin).format('MMMM Do YYYY, H:mm')
                    //     }
                    // })

                    this.result = data;
                })
                .catch(() => {

                })
            }
        },
        created() {
            this.getData()
        },
    }
</script>


<style lang="scss">
    
</style>