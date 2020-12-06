<template>
    <div class="dashboard-wrapper dashboard-table mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ..." v-model="q"  @keyup="searchData()">
            </div>
            <div class="table-buttons pull-right">
                <el-button type="" size="medium" icon="el-icon-plus"  @click="$router.push({name: 'office-inventory_product^add'})" class="pull-right"> Add Product</el-button>
                <!-- <el-button round type="success" size="medium" icon="el-icon-document" @click="download('excel')" class="pull-left"> Export Data</el-button> -->
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10" v-loading="fetching">
            <el-table :data="result" style="width: 100%">
                <el-table-column label="Product Name" width="350">
                    <template slot-scope="scope">
                        <div :class="{'table-cell-warning': scope.row.expiration == 'expiring', 'table-cell-danger': scope.row.expiration == 'expired'}">{{scope.row.name}} {{(scope.row.variant)? scope.row.variant: ''}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="variant" label="Strength"> </el-table-column>
                <el-table-column prop="category" label="Category"> </el-table-column>
                <el-table-column prop="left" label="Quantity Left"> </el-table-column>
                <el-table-column prop="dispensation" label="Dispensation"> </el-table-column>
                <el-table-column prop="price" label="Price" width="100px"> </el-table-column>
                <el-table-column width="220px">
                    <template slot-scope="scope">
                            <el-button size="mini" @click="triggerAdd(scope.row.id)">Add</el-button>
                            <el-button size="mini" @click="triggerEdit(scope.row.id)">Edit</el-button>
                            <el-button size="mini" type="danger" @click="deleteModal(scope.$index, scope.row.id)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import lineChart from '@/components/chart/lineChart.vue'
    import categoryVue from './category.vue';
    import formatMoney from '@/components/formatmoney.js'
    import Moment from 'moment'
    import Fuse from 'fuse.js'

    export default {
        components: {
            vueCustomScrollbar,
            lineChart
        },
        data() {
            return {
                result: [],
                q:'',
                fetching: false
            }
        },
        methods: {
            getData(){
                this.fetching = true
                this.$http.get('product/list')
                .then(res => {
                    let data =  res.body.result
                    data.map(i => {
                        let expiry = Moment(i.expiry).format('YYYY-MM-DD')
                        let now = Moment().format('YYYY-MM-DD')

                        let expired = Moment().isAfter(expiry)
                        i.expiry = Moment(i.expiry).format('Do MMM YYYY')
                        
                        if(expired){
                            i.expiration = 'expired'
                        }else{
                            var exirationDifference = Moment(expiry).diff(now, 'days');
                            if(exirationDifference <= 90){
                                i.expiration = 'expiring'
                            }else{
                                i.expiration = 'ok'
                            }
                        }
                        if(i.category){
                            i.category = i.category.name
                        }
                        i.price = formatMoney(i.price,',','.')
                        i.lprice = formatMoney(i.lprice,',','.')
                    })

                    // localStorage.setItem('products', data)
                    this.result = data;
                    this.fetching = false
                })
                .catch(() => {
                    this.fetching = false
                })
            },
            getAllProducts(){
                this.$http.get('product/list?size=all')
                .then(res => {
                    let data =  res.body.result
                    data.map(i => {
                        let expiry = Moment(i.expiry).format('YYYY-MM-DD')
                        let now = Moment().format('YYYY-MM-DD')

                        let expired = Moment().isAfter(expiry)
                        i.expiry = Moment(i.expiry).format('Do MMM YYYY')
                        
                        if(expired){
                            i.expiration = 'expired'
                        }else{
                            var exirationDifference = Moment(expiry).diff(now, 'days');
                            if(exirationDifference <= 90){
                                i.expiration = 'expiring'
                            }else{
                                i.expiration = 'ok'
                            }
                        }
                        if(i.category){
                            i.category = i.category.name
                        }
                        i.price = formatMoney(i.price,',','.')
                        i.lprice = formatMoney(i.lprice,',','.')
                    })

                    localStorage.setItem('products', JSON.stringify(data))
                })
                .catch(err => {
                })
            },
            searchData(){
                let q = this.q
                q = q.trim()
                if(q != ''  && q.length >= 3){
                    this.fetching = true
                    let products = JSON.parse(localStorage.getItem('products'))

                    const fuse = new Fuse(products, {
                        keys: ['name']
                    })

                    let result = fuse.search(q, {limit: 100})

                    let fused = result.map(item => {
                        let product = item.item;
                        return product
                    })
                
                    this.result = fused
                    this.fetching = false
                }

                if(q == ''){
                    this.getData()
                }
            },
            triggerAdd(id){
                this.$router.push({name: 'office-inventory_stock^add-id', params: {id}})
            },
            triggerEdit(id){
                this.$router.push({name: 'office-inventory_product^edit', params: {id}})
            },
            triggerDelete(i, id){
                this.$http.post('product/remove', {id})
                .then(res => {
                     this.result.splice(i, 1);
                    this.$notify({
                        title: 'Success',
                        message: "account deleted",
                        type: 'success'
                    });
                })
                .catch(err => {
                    console.log(err)
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to delete account",
                        type: 'error'
                    });
                })
            },
            deleteModal(i, id) {
                this.$confirm('This will permanently delete the product. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                })
                .then(() => {
                    this.triggerDelete(i, id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });          
                });
            },
            download(file){
                let title = { 
                    name:'Product Name',
                    category: 'Category', 
                    barcode: 'Barcode ID',
                    left: 'In Stock',
                    price:'Price (Ghc)',
                }
                let data = this.result;
                this.$http.post('data/download',
                    {   name:'Products', title, data, 
                    }
                ).then(res => {
                    window.open('http://localhost:4000/api/data/download?file='+res.body.file);
                    this.$router.push({name: this.$route.name})
                })
            }
        },
        created() {
            this.getData()
            this.getAllProducts()
        },
    }
</script>


<style lang="scss" scoped>
    .table-buttons{
        width: 300px;
    }
    .el-table__body td{
        padding: 0 !important;
    }
</style>