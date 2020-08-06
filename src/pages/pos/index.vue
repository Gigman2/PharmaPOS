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
                        <li class="shadow-1 active">
                             <span>All</span>
                            </li>
                        <li class="shadow-1" v-for="(item, i) in categories" :key="i">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="clearfix"></div>

                <div class="products-box">
                    <div class="products-title">Top 25 Sellers</div>
                    <vue-custom-scrollbar class="scroll-area products" :settings="settings">
                        <div class="product-row">
                            <div class="product shadow-1" v-for="(item, i) in products" :key="i">
                                <div class="product-image">
                                <!-- <div class="image"></div> -->
                                </div>
                                <div class="product-title">{{item.name}}</div>
                                <div class="product-price">Ghc {{item.price}}.00</div>
                            </div>
                        </div>

                        <div class="product-row">
                            <div class="product shadow-1" >
                                <div class="product-image">
                                <div class="image" :style="{ backgroundImage: 'url(' + require('@/assets/images/pills.svg') + ')' }"></div>
                                </div>
                                <div class="product-title">Rapinol</div>
                                <div class="product-price">Ghc 0.7</div>
                            </div>
                            <div class="product shadow-1">
                                <div class="product-image">
                                <div class="image" :style="{ backgroundImage: 'url(' + require('@/assets/images/doctor.svg') + ')' }"></div>
                                </div>
                                <div class="product-title">Marla-2 Forte</div>
                                <div class="product-price">Ghc 100.00</div>
                            </div>

                            <div class="product shadow-1" >
                                <div class="product-image">
                                <div class="image" :style="{ backgroundImage: 'url(' + require('@/assets/images/drugs.svg') + ')' }"></div>
                                </div>
                                <div class="product-title">Maalox Antacid</div>
                                <div class="product-price">Ghc 100.00</div>
                            </div>
                            <div class="product shadow-1">
                                <div class="product-image">
                                <div class="image"></div>
                                </div>
                                <div class="product-title">Tabea Herbal Mixture</div>
                                <div class="product-price">Ghc 100.00</div>
                            </div>
                             <div class="product shadow-1">
                                <div class="product-image">
                                <div class="image" :style="{ backgroundImage: 'url(' + require('@/assets/images/doctor.svg') + ')' }"></div>
                                </div>
                                <div class="product-title">Marla-2 Forte</div>
                                <div class="product-price">Ghc 100.00</div>
                            </div>

                        </div>

                        <div class="product-row">
                            <div class="product shadow-1" >
                                <div class="product-image">
                                <div class="image":style="{ backgroundImage: 'url(' + require('@/assets/images/pills.svg') + ')' }"></div>
                                </div>
                                <div class="product-title">Rapinol</div>
                                <div class="product-price">Ghc 0.7</div>
                            </div>
                            <div class="product shadow-1">
                                <div class="product-image">
                                <div class="image" :style="{ backgroundImage: 'url(' + require('@/assets/images/doctor.svg') + ')' }"></div>
                                </div>
                                <div class="product-title">Marla-2 Forte</div>
                                <div class="product-price">Ghc 100.00</div>
                            </div>

                            <div class="product shadow-1" >
                                <div class="product-image">
                                <div class="image" :style="{ backgroundImage: 'url(' + require('@/assets/images/drugs.svg') + ')' }"></div>
                                </div>
                                <div class="product-title">Maalox Antacid</div>
                                <div class="product-price">Ghc 100.00</div>
                            </div>
                        </div>
                    </vue-custom-scrollbar>
                </div>
            </div>
        </div> 
        <div class="checkout-box">
           <div class="checkout-invoice">
                <div class="checkout-title">
                    <div class="pull-left checkout-title--title">Purchase Detail</div>
                    <div class="pull-right checkout-title--actions">
                        <span>Hold</span>
                        <i class="fe-user-plus"></i>
                        <i class="fe-slash "></i>
                    </div>
                </div>
                <div class="clearfix"></div>
                <vue-custom-scrollbar class="checkout-table-wrapper">
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
                                    <div class="circle-outline">
                                        <span class="dripicons-minus"></span>
                                    </div>
                                    <span>1</span>
                                    <div class="circle-outline">
                                        <span class="dripicons-plus"></span>
                                    </div>
                                </td>
                                <td>10.00</td>
                            </tr>
                            <tr class="checkout-item-row">
                                <td><i class="fe-trash-2"></i></td>
                                <td>Rapinol</td>
                                <td>
                                    <div class="circle-outline">
                                        <span class="dripicons-minus"></span>
                                    </div>
                                    <span>3</span>
                                    <div class="circle-outline">
                                        <span class="dripicons-plus"></span>
                                    </div>
                                </td>
                                <td>2.1</td>
                            </tr>
                            <tr class="checkout-item-row">
                                <td><i class="fe-trash-2"></i></td>
                                <td>Gastric Syrup</td>
                                <td>
                                    <div class="circle-outline">
                                        <span class="dripicons-minus"></span>
                                    </div>
                                    <span>1</span>
                                    <div class="circle-outline">
                                        <span class="dripicons-plus"></span>
                                    </div>
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
           <div class="checkout-pay-section">
                <div class="checkout-payout"><span>Pay</span> (Ghc 24.5)</div>
                <div class="checkout-reset">Reset</div>
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
                settings: {
                    maxScrollbarLength: 60
                },
                categories: [],
                products: []
            }
        },
        methods: {
            getCategories(){
                this.$http.get('product/category/list?type=simple')
                .then(res => {
                    let data =  res.body.result
                    this.categories = data
                })
                .catch(err => {
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to load data",
                        type: 'error'
                    });
                })

            },
            getProducts(){
                this.$http.get('product/stock')
                .then(res => {
                    let data =  res.body.result
                    this.products = data;
                })
                .catch(() => {
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to load data",
                        type: 'error'
                    });
                })
            }
        },
        created() {
            this.getCategories()
            this.getProducts()
        },
    }
</script>

<style lang="scss">
    
</style>