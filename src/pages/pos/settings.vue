<template>
    <div class="main-wrapper">
        <div class="product-box">
            <div class="settings-title">Product Settings</div>
            <div class="inner-box">
                <div class="products-box">
                    
                </div>
            </div>
        </div>
        <div class="checkout-box">
           <div class="checkout-invoice">
                <div class="checkout-title">Information</div>
                <div class="settings-box">
                    <el-alert
                        title="Sell Settings"
                        type="info"
                        description=""
                        show-icon>
                    </el-alert>

                </div>
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
            }
        },
        methods: {
            
        },
    }
</script>

<style lang="scss">
    .settings-title{
        color: #2c3e50;
        font-family: 'Open sans';
        font-size: 1.3em;
        font-weight: bold;
        padding: 10px;
        padding-top: 0;
    }

    .settings-box{
        padding: 10px;
    }
</style>