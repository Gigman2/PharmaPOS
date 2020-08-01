<template>
    <div class="main-wrapper">
        <div class="product-box">
            <div class="inner-box">
                <div class="form-box">
                    <div class="input-box">
                        <i class="fe-search"></i>
                        <input type="text" placeholder="Search ...">
                    </div>
                </div>
                <div class="filter-box">
                    <!-- <i class="fe-filter"></i> -->
                    <ul class="filters">
                        <li class="shadow-1">
                             <div class="filter-icon all"></div>  
                             <span>All</span>
                            </li>
                        <li class="shadow-1">
                            <div class="filter-icon herb"></div>  
                            <span>Herbal</span>
                        </li>
                        <!-- <li class="shadow-1">Herbal</li> -->
                        <li class="shadow-1">
                            <div class="filter-icon otc"></div>  
                            <span>OTC</span>
                        </li>
                        <li class="shadow-1">
                            <div class="filter-icon consumer"></div>  
                            <span>Consumer</span>
                        </li>
                        <li class="shadow-1">
                            <div class="filter-icon consumer"></div>  
                            <span>Consumer</span>
                        </li>
                        <li class="shadow-1">
                            <div class="filter-icon pharm"></div>  
                            <span>Pharmaceutical</span>
                        </li>
                    </ul>
                </div>

                <div class="products-box">
                    <vue-custom-scrollbar class="scroll-area products" :settings="settings">
                        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                            style="width: 100%">
                            <el-table-column label="First Item" prop="id"> </el-table-column>
                            <el-table-column label="Date" prop="date"> </el-table-column>
                            <el-table-column label="Quantity" prop="quantity"> </el-table-column>
                            <el-table-column label="Total Amount" prop="amount"> </el-table-column>
                            <el-table-column label="">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                                        <i class="fe-edit-2 mini-icon"></i> 
                                        <span>Edit</span>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </vue-custom-scrollbar>
                </div>
            </div>
        </div>
        <div class="checkout-box">
           <div class="checkout-invoice">
                <div class="checkout-title">Purchase Detail</div>
                <vue-custom-scrollbar class="checkout-table-wrapper history">
                    <table class="checkout-table" cellspacing="0" cellpadding="0">
                        <thead class="checkout-headings">
                            <tr>
                                <th width="30px"></th>
                                <th>Name</th>
                                <th>QTY</th>
                                <th width="60px">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="checkout-item-row">
                                <td><i class="fe-trash-2"></i></td>
                                <td>Marla-2 forte Guitar</td>
                                <td>
                                    <span>1</span>
                                </td>
                                <td>10.00</td>
                            </tr>
                            <tr class="checkout-item-row">
                                <td><i class="fe-trash-2"></i></td>
                                <td>Rapinol</td>
                                <td>
                                    <span>3</span>
                                </td>
                                <td>2.1</td>
                            </tr>
                            <tr class="checkout-item-row">
                                <td><i class="fe-trash-2"></i></td>
                                <td>Gastric Syrup</td>
                                <td>
                                    <span>1</span>
                                </td>
                                <td>12.00</td>
                            </tr>
                        </tbody>
                    </table>
                </vue-custom-scrollbar>
                <table class="checkout-subtotal">
                    <tbody>
                        <tr>
                            <th align="left">Discount (1%)</th>
                            <td width="100px" align="right">Ghc 0.2</td>
                        </tr>
                        <tr>
                            <th align="left">Sub Total (1%)</th>
                            <td>Ghc 24.1</td>
                        </tr>
                        <tr>
                            <th align="left">Tax (1.5%)</th>
                            <td>Ghc 0.21</td>
                        </tr>
                    </tbody>
                </table>
                <table class="checkout-total">
                    <tbody>
                        <tr>
                            <th align="left">Total </th>
                            <td width="100px" align="right">Ghc 24.5</td>
                        </tr>
                    </tbody>
                </table>
           </div>
        </div>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    export default {
        components: {
            vueCustomScrollbar
        },
        data() {
            return {
                tableData: [
                    {
                        id: 'Rapinol',
                        date: '10 sec',
                        quantity: '1',
                        amount: 'Ghc 20'
                    },
                    {
                        id: 'Kinafama APC',
                        date: '13 min',
                        quantity: '3',
                        amount: 'Ghc 13'
                    },
                    {
                        id: 'Marla-2 Forte',
                        date: '18 min',
                        quantity: '2',
                        amount: 'Ghc 13'
                    }, 
                    {
                        id: 'Tabea Bitters',
                        date: '20 min1',
                        quantity: '3',
                        amount: 'Ghc 13'
                    }
                ],
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
    }
</script>

<style lang="scss">
    .el-button--mini{
        .mini-icon{
            margin-right: 10px;
        }
    }
    .checkout-box .checkout-table-wrapper.history {
        height: calc(100vh - 337px);
        overflow: hidden;
    }
</style>