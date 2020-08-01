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
                    <div class="products-title">Top 25 Sellers</div>
                    <vue-custom-scrollbar class="scroll-area products" :settings="settings">
                        <div class="product-row">
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
                                <div class="product-title">Marla-2 Forte Rapinol</div>
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
                            <div class="product shadow-1" >
                                <div class="product-image">
                                <div class="image":style="{ backgroundImage: 'url(' + require('@/assets/images/pills.svg') + ')' }"></div>
                                </div>
                                <div class="product-title">Rapinol</div>
                                <div class="product-price">Ghc 0.7</div>
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
                <div class="checkout-title">Purchase Detail</div>
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
           <div class="checkout-payout">
                <span>Pay</span> (Ghc 24.5)
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
                }
            }
        },
    }
</script>

<style lang="scss">
    
</style>