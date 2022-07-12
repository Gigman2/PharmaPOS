<template>
    <div class="dashboard-wrapper mt-15">
        <div class="dashboard-top">
            <div class="search-box pull-left">
                <i class="fe-search"></i>
                <input type="text" placeholder="Search ..." v-model="q" @keyup="search()">
            </div>
            <router-link :to="{name: 'office-sales_discount^add'}">
                <div class="btn btn-primary pull-right"><i class="fe-plus"></i> new discount </div>
            </router-link>
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-table :data="result" style="width: 100%">
                <el-table-column prop="code" label="Discount Code"> </el-table-column>
                 <el-table-column label="Discount %"> 
                    <template slot-scope="scope">
                        <div>{{scope.row.discount}} %</div>
                    </template>
                </el-table-column>
                <el-table-column prop="timesUsed" label="Times Used"> </el-table-column>
                <el-table-column prop="useLimit" label="Use Limit"> </el-table-column>
                <el-table-column prop="expiry" label="Expires On"> </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                            <el-button size="mini" @click="drawer = true; selectedDiscount = scope.row">View</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-drawer
            title=""
            :visible.sync="drawer"
            :direction="'rtl'" size="35%">
            <div class="discount-breakdown" v-if="selectedDiscount !== null">
                <h2>{{selectedDiscount.code}}</h2>
                <div class="drawer-double">
                    <div class="drawer-item"><strong>{{selectedDiscount.discount}}%</strong> discount</div>
                    <div class="drawer-item">Expires {{selectedDiscount.expiresFromNow}}</div>
                </div>
                <div class="drawer-double">
                    <div class="drawer-item"><span class="b g">{{selectedDiscount.timesUsed}}</span> have been used out of <span class="b">{{selectedDiscount.useLimit}}</span></div>
                    <div class="drawer-item"><span class="b">{{selectedDiscount.useLimit - selectedDiscount.timesUsed}}</span> left</div>
                </div>
                <div class="drawer-quote" v-if="selectedDiscount.customerOnly">
                    <div class="drawer-item l">Discount only applies to customers</div>
                     <div class="drawer-sub">Customer can use code {{selectedDiscount.useLimit}} time</div>
                </div>
                <div class="drawer-quote n" v-else>
                    <div class="drawer-item l">Discount is for everyone</div>
                     <div class="drawer-sub">Customer can use code {{(selectedDiscount.perCustomerUse == 1) ? 'only once' : selectedDiscount.perCustomerUse+' times' }} time</div>
                </div>

                <div class="drawer-content">{{selectedDiscount.description}}</div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import Moment from 'moment';

    export default {
        components: {
            vueCustomScrollbar,
        },
        data() {
            return {
                result: [],
                q:'',
                drawer: false,
                selectedDiscount: null
            }
        },
        methods: {
            getDiscounts(){
                this.$http.get('sales/discount-promo-list')
                .then(res => {
                    let data =  res.body.result
                    data.map(item => {
                        item.expiry = Moment(item.expires).format('Do MMM YYYY')
                        item.expiresFromNow = Moment(item.expires).fromNow()
                    })
                    this.result = data
                })
                .catch(err => {
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to load data",
                        type: 'error'
                    });
                })

            },
            search(){
                let q = this.q

                this.$http.get('sales/discount-search', {
                    params: {q: q}
                })
                .then(res => {
                    let data =  res.body.result
                     data.map(item => {
                        item.expires = Moment(item.expires).format('Do MMM YYYY')
                        item.expiresFromNow = Moment(item.expires).fromNow()
                    })
                    this.result = data
                })
            },
        },
        created(){
            this.getDiscounts()
        }
    }
</script>


<style lang="scss">
    .discount-breakdown{
        padding: 0 30px;
        h2{
            color: rgb(85, 95, 105);
            letter-spacing: .2em;
            font-size: 30px;
        }

        .drawer-double{
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            .drawer-item{
                font-size: 19px;
                color: rgb(85, 95, 105);
            }
        }
        .drawer-quote{
            margin-top: 30px;
            padding: 20px;
            border-left: 5px solid rgb(228, 206, 9);
            text-align: left;
            background-color: rgb(245, 245, 245);
            &.n{
                border-color: slategray;
                .l,.g{
                    color: slategray;
                }
            }
            .drawer-item{
                font-size: 19px;
            }

            .drawer-sub{
                margin-top: 10px;
                font-size: 16px;
                color: rgb(133, 133, 133);
            }

        }
        .b{
            font-weight: bold;
        }
        .g{
            color: rgb(100, 170, 100)
        }
        .l{
            color: rgb(228, 206, 9)
        }
        .drawer-content{
            margin-top: 20px;
            color: silver;
            text-align: left;
        }
    }
</style>