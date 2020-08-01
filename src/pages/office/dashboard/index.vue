<template>
    <div class="dashboard-wrapper">
            <div class="card-wrapper">
                <div class="card mini-card">
                    <div class="mini-card-row">
                        <div class="card-col">
                            <div class="card-title">Sales</div>
                            <div class="card-content">24,215.00</div>
                        </div>
                        <div class="card-col">
                            <div class="icon-box">
                                <i class="fe-dollar-sign"></i>
                            </div>
                        </div> 
                    </div>
                    <div class="card-footer">sales over the month 
                        <span>
                            <i class="fe-trending-up green"></i> 210,000
                        </span>
                    </div>
                </div>
                <div class="card mini-card">
                    <div class="mini-card-row">
                        <div class="card-col">
                            <div class="card-title">Stock worth</div>
                            <div class="card-content">244,215.00</div>
                        </div>
                        <div class="card-col">
                            <div class="icon-box">
                                <i class="fe-package"></i>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">products in shortage
                        <span>
                            120
                        </span>
                    </div>
                </div>
                <div class="card mini-card">
                    <div class="mini-card-row">
                        <div class="card-col">
                            <div class="card-title">Account admins</div>
                            <div class="card-content">5</div>
                        </div>
                        <div class="card-col">
                            <div class="icon-box">
                                <i class="fe-users"></i>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">employees 
                        <span>
                            2
                        </span>
                    </div>
                </div>
                <div class="card mini-card">
                    <div class="mini-card-row">
                        <div class="card-col">
                            <div class="card-title">Total sales</div>
                            <div class="card-content">24,215.00</div>
                        </div>
                        <div class="card-col">
                            <div class="icon-box">
                                <i class="fe-clipboard"></i>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">since 31st June 2020
                    </div>
                </div>
            </div>
            <el-row :gutter="20" class="card-wrapper">
                <el-col :span="16">
                    <div class="card graph-card">
                        <div class="card-title pt-15 pb-15 pr-15 pl-15">Sales over the day</div>
                        <div class="card-content pt-15 pb-15 pr-15 pl-15">
                            <line-chart :dataset="salesData"></line-chart>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="card graph-card" >
                        <div class="card-title pt-15 pb-15 pr-10 pl-10">Drug shortage list</div>
                        <div class="card-body">
                            <table  cellspacing="0" cellpadding="0" class="card-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Item</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Marla-2 Forte</td>
                                        <td>3</td>
                                        <td>
                                            <el-button size="mini" round>View</el-button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Marla-2 Forte</td>
                                        <td>3</td>
                                        <td>
                                            <el-button size="mini" round>View</el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </el-col>
            </el-row>
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
                tableData: [{
                    name: 'Tom',
                    left: 1
                }, {
                    name: 'Tom',
                    left: 0
                }] ,
                salesData: {
                    label: "sales",
                    data: [215, 321,127,661,112,311, 222, 257, 231, 211, 133, 480],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'transparent'
                }
            }
        },
    }
</script>


<style lang="scss">
    .card-wrapper{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
    }
    .card{
        background-color: white;
        border-radius: 3px;
        height: 30px;
    }
    .mini-card{
        width: calc(25% - 45px);
        height: 110px;
        padding: 15px;
        font-family:'Open sans';
        .mini-card-row{
            display: flex;
            justify-content: space-between;
        }
        .card-col{
            padding: 10px;
            &::nth-child(1){
                width: 60%;
            }
        }
        .card-title{
            text-align: left;
            font-size: .9em;
            font-weight: bold;
            color: rgb(133, 133, 143)
        }
        .card-content{
            margin: 10px 0 15px 0;
            font-size: 1.4em;
            text-align: left;
            font-weight: bold;;
        }
        .icon-box{
            width: 60px;
            height: 60px;
            background-color: rgb(238, 238, 238);
            border-radius: 50%;
            line-height: 60px;
            font-size: 1.5em;
            color: slategray
        }
        .card-footer{
            font-size: .9em;
            text-align: left;
            span{
                font-weight: bold;
                color: slategrey;
                // float: right;
            }
            i{
                margin-left: 5px;
                &.green{
                    color: rgb(33, 207, 33)
                }
            }
        }
    }
    
    .graph-card{
        min-height: 350px;

        .card-title{
            font-size: 1em;
            text-align: left;
            font-family: 'Open sans';
            font-weight: bold;
            color: rgb(133, 133, 143);
        }
    }
    .card-table{
        width: 100%;
        text-align: left;
        thead{
            background-color: #dadada;
            th{
                padding: 10px;
                color: slategray
            }
        }
        td{
            padding: 10px;
            border-bottom: 1px solid rgba(235, 235, 235, 0.795);
        }
    }
    
</style>