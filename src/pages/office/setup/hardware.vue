<template>
    <div class="dashboard-wrapper dashboard-table mt-15">
        <div class="dashboard-top">
           
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="shadow-1 hardware">
                        <div class="hardware-icon">
                            <img src="@/assets/images/pos.png" alt="">
                        </div>
                        <div class="hardware-name">
                            <span class="fe-rotate-ccw reload pull-right" @click="getPrinter()"></span>
                            <div class="type">Printer</div> 
                            <div class="name">{{printer.name}}</div>
                        </div>
                        <el-row :gutter="20" class="mt-30">
                            <el-col :span="8">
                                <div>Status: <div :class="{'offline': !printer_online, 'online': printer_online,}"></div></div>
                            </el-col>

                            <el-col :span="8">
                                <div>Port: <span>{{printer.portName}}</span></div>
                            </el-col>

                            <el-col :span="8">
                                <div>Jobs: {{(printer.jobs) ? printer.jobs.length : 0}}<span></span></div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>

                 <el-col :span="8">
                    <div class="shadow-1 hardware">
                        <div class="hardware-icon">
                            <img src="@/assets/images/drawer.jpg" alt="">
                        </div>
                        <div class="hardware-name">
                            <div class="type">Cash Drawer</div> 
                            <!-- <div class="name">POS-58</div> -->
                        </div>
                        <el-row :gutter="20" class="mt-30">
                            <el-col :span="8">
                                <div>Status: <div class="offline"></div></div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>

                 <el-col :span="8">
                    <div class="shadow-1 hardware">
                        <div class="hardware-icon">
                            <img src="@/assets/images/scanner.jpg" alt="">
                        </div>
                        <div class="hardware-name">
                             <span class="fe-rotate-ccw reload pull-right" @click="getScanner()"></span>
                            <div class="type">Barcode Scanner</div> 
                            <div class="name">{{(canner) ? scanner.product : ''}}</div></div>
                        <el-row :gutter="20" class="mt-30">
                            <el-col :span="7">
                                <div>Status: <div :class="{'offline': !barcode_online, 'online': barcode_online,}"></div></div>
                            </el-col>

                            <el-col :span="9">
                                <div>Product: <span>{{scanner.productId}}</span></div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import Loader from '@/components/loader.vue'
    import {mapGetters} from 'vuex';

    export default {
        components: {
            vueCustomScrollbar,
            Loader,

        },
        data() {
            return {
                submitting: false,
                error: false,
                errorMessage: null,
                uploadedImage:'',
            }
        },
        computed: {
            ...mapGetters({
                bucket: 'GET_BUCKET', 
                barcode_online: 'BARCODE_ONLINE_STATE',  
                printer_online: 'PRINTER_ONLINE_STATE',
                printer: 'GET_PRINTER',
                scanner: 'GET_BARCODE'})
        },
        methods: {
            getPrinter(){
                this.$store.dispatch('GET_PRINTER')
            },
            getScanner(){
                this.$store.dispatch('GET_BARCODE')
            },
        },
        created() {
            console.log('Env data is', process.env.VUE_APP_PLATFORM)
            if(process.env.VUE_APP_PLATFORM === 'local'){
                this.getPrinter()
                this.getScanner()
            }
        },
    }
</script>


<style lang="scss">
    .reload{
        cursor: pointer;
    }
    .hardware{
        border-radius: 3px;
        padding: 15px;
        .hardware-icon{
            width: 100px;
            height: 100px;
            // background-color: silver;
            display: inline-block;
            margin-right: 20px;
            vertical-align: middle;
            img{
                width: 100%;
            }
        }
        .hardware-name{
            vertical-align: middle;
            display: inline-block;
            width: calc(100% - 130px);
            font-size: 19px;
            text-align: left;
            font-weight: bold;
            
            .name{
                margin-top: 5px;
                font-size: 22px;
                color: silver;
            }
        }

        .offline{
            display: inline-block;
            width: 15px;
            height: 15px;
            background-color: red;
            vertical-align: sub;
            border-radius: 3px;
        }

        .online{
            display: inline-block;
            width: 15px;
            height: 15px;
            background-color: rgb(34, 190, 34);
            vertical-align: sub;
            border-radius: 3px;
        }
    }
</style>