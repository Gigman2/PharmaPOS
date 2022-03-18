<template>
    <div class="pos">
        <div class="topbar shadow-1">
            <div class="brand">SluxiPOS</div>

            <div class="actions">
                <ul class="action-menu">
                    <li v-if="$route.name == 'pos-home' || $route.name == 'pos-history'"> <router-link :to="{name: 'pos-settings'}"><i class="fe-settings"></i>Settings</router-link></li>
                    <li v-if="$route.name == 'pos-settings' && userPermission && userPermission[2] && userPermission[2].state"> <router-link :to="{name: 'pos-home'}"><i class="fe-monitor"></i>Sell</router-link></li>
                    
                    <li v-if="$route.name == 'pos-home' && userPermission && userPermission[39] && userPermission[39].state" > <router-link :to="{name: 'pos-history'}"><i class="fe-archive"></i>History</router-link></li>
                    <li v-if="$route.name == 'pos-history' && userPermission && userPermission[2] && userPermission[2].state" > <router-link :to="{name: 'pos-home'}"><i class="fe-monitor"></i>Sell</router-link></li>
                 
                    <li @click="lock"> <i class="fe-lock"></i> Lock</li>
                    <li v-if="userPermission && userPermission[38] && userPermission[38].state"> <router-link :to="{name: 'office-dashboard'}"><i class="fe-trending-up"></i> Office</router-link></li>

                    <li>
                        <div class="user-account">
                            <div class="avatar">
                                <img :src="avatar" alt="">
                            </div>
                            <span>{{fullname}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <vue-page-transition name="fade-in-right"> -->
            <router-view/>
        <!-- </vue-page-transition> -->

        <div class="footer">
            <div class="footer-text">Developed by <a href="https://sluxify.com">Sluxify</a></div>
        </div>
    </div> 
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        data(){
            return {

            }
        },
        computed: {
            ...mapGetters({user: 'USER', fullname: 'FULLNAME', avatar:'AVATAR', userPermission: 'PERMISSIONS'})
        },
        methods: {
            lock(){
                this.$http.get('users/logout')
                .then()
                .catch(err => {
                    console.log(err)
                })
                this.$store.commit('LOGOUT');
                this.$router.push({name: 'login'})
            }
        },
    }
</script>

<style lang="scss">
    .pos{
        position: relative;

        .topbar{
            width: 100%;
            height: 60px;
            background-color: #ffffff;
            .actions{
                float: right;
                ul{
                    li{
                        list-style: none;
                        float: left;
                        margin-right: 20px;
                        margin-top: 5px;
                        color: #536982;
                        cursor: pointer;
                        padding-bottom: 7px;
                        a{
                            color: #536982;
                            text-decoration: none;
                        }
                        &.active{
                            border-bottom: 2px solid #8c95a0;
                        }
                    }
                    i{
                        margin-right: 5px;
                        font-size: 1.2em;
                    }
                }

                .user-account{
                    margin-right: 30px;
                    margin-top: -7px;
                    .avatar{
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        background-color: rgb(224, 224, 224);
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 10px;
                        overflow: hidden;
                        img{width: 100%;}
                    }
                }
            }
        }

        .brand{
            text-align: left;
            margin-left: 20px;
            line-height: 60px;
            font-family: Do_Hyeon;
            font-size: 1.6em;
            letter-spacing: 1.1px;
            color: #000;
            float: left;
        }

        .shadow-1{
            &:hover{
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            }
        }

        .footer, .footer a{
            color: rgb(185, 185, 185) !important;
        }


    }

    .main-wrapper{
        padding: 20px;
        height: calc(100vh - 100px);
    }

    .product-box,.checkout-box{
        border-radius: 5px;
        display: inline-block;
        vertical-align: top;
        // overflow-y: scroll;
    }
    .product-box{
        width: calc(65% - 21px);
        height: calc(100vh - 130px);
        background-color: white;
        margin-right: 20px;
        padding-top: 15px;

    }
    .checkout-box{
        width: 35%;
        height: calc(100vh - 110px);
        background-color: transparent;
    }
    .checkout-invoice{
        background-color: white;
        border-radius: 5px;
        margin-bottom: 20px;
    }
    // .inner-box{
    //     // overflow-y: scroll;
    // }
    .form-box{
        .input-box{
            margin-bottom: 20px;
            input{
               background-color: rgb(240, 240, 240);
            }
        }
    }
    .search-input{
        margin-right: auto !important;
        width: calc(100% - 200px);
        margin-left: 20px;
        display: inline-block;
        i{
            position: absolute;
            top: 11px;
            left: 15px;
            font-size: 1.1em;
            color: rgb(137, 147, 155);
        }
        input{
            background-color: rgb(219, 219, 219);
            width: 100%;
            padding: 13px;
            border: none;
            outline: none;
            box-sizing: border-box;
            border-radius: 5px;
            padding-left: 20px;
            color:#2c3e50;
            &::placeholder{
                color: rgb(137, 147, 155);
            }
        }
    }

    .view-selectors{
        width: 30px;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        img{
            width: 30px;
        }
    }

    .filter-btn{
        display: inline-block;
        width: 90px;
        margin-left: 10px;
        background-color: #000;
        padding: 10px;
        color: white;
        font-size: 16px;
        border-radius: 3px;
        cursor: pointer;
    }

    .filter-box{
        .filter-icon{
            width: 22px;
            height: 22px;
            display: inline-block;
            margin-right: 5px;
            vertical-align: bottom;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                width: 20px;
                height: 20px;
            }
            // line-height: 60px;
        }
    }
    .filters{
        // display: inline-block;
        margin: 0;
        margin-top: 10px;
        float: left;
        li{
            list-style: none;
            float: left;
            padding: 7px 12px;
            margin-right: 15px;
            background-color: white;
            border-radius: 3px;
            color: #000;
            cursor: pointer;
            border: 2px solid #000;
            font-weight: bold;
            margin-bottom: 5px;
            &.active{
                background-color: #000;
                color: white;
            }
        }
    }
    .products-box{
        padding: 15px 20px 0 20px;
        .products-title{
            text-align: left;
            font-family: 'Open sans';
            font-size: 1.3em;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.671);
            margin-left: 10px;
        }
        .products{
            padding-top: 15px;
            height: calc(100vh - 270px);
            // overflow: hidden;
            overflow-y: scroll;
            .product-row{
                width: 100%;
                height: auto;
                overflow: hidden;
                &.recent{
                    background-color:#f4fffa;
                    border-radius: 5px;
                    padding: 15px 0 0 0;
                    margin-bottom: 10px;
                }
                .product{
                    background-color: white;
                }
            }
            .product{
                width: calc(20% - 46px);
                min-height: 135px;
                height: auto;
                border-radius: 4px;
                padding: 10px;
                margin: 20px 10px;
                margin-top: 3px;
                float: left;
                cursor: pointer;
                position: relative;
                // box-sizing: b;
                &.disabled{
                    cursor: not-allowed;
                }
                &.outstock{
                    border: 3px solid rgb(233, 95, 95);
                    border-top: none;
                    border-bottom: none;
                }
                &.shortage{
                    border: 3px solid rgb(243, 165, 47);
                    border-top: none;
                    border-bottom: none;
                }

                .product-image{
                    width: 80%;
                    height: 65px;
                    margin: 0 auto 30px auto;
                    .image  {
                        width: 100%;
                        background-repeat: no-repeat;
                        background-size: contain;
                        img{
                            width: 100%;
                        }
                    }
                }
                .product-title{
                    margin-top: 5px;
                    font-family: 'Open Sans';   
                    font-size:calc(70% + 0.3vw);
                    height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .product-price{
                    margin-top: 3px;
                    font-family: 'Open sans';
                    font-weight: bold;
                }
            }
        }
    }

    .checkout-box{
        .checkout-title{
            padding: 10px;
            text-align: left;
            line-height: 30px;
            overflow: hidden;
            &--title{
                color: rgba(0, 0, 0, 0.671);;
                font-family: 'Open sans';
                font-size: 1.3em;
                font-weight: bold;
            }
            &--actions{
                font-weight: bold;
                color: silver;
                span{
                    margin: 0 20px;
                    cursor: pointer;
                    font-size: 1.2em;
                }
                i{
                    cursor: pointer;
                    margin: 0 15px;
                    font-size: 1.4em;
                }
            }
            
        }

        .checkout-headings{
            padding: 10px;
            background-color: #000;
        }

        .checkout-table-wrapper{
            height: calc(100vh - 332px);
            overflow: hidden;
        }
        .checkout-table{
            text-align: left;
            width: 100%;
            min-height: 150px;
            background-color: white;
            th{
                padding: 10px;
                font-size: 1em;
                color: #fff;
                font-weight: normal;
                &::nth-child(2){
                    text-align: center;
                }
            }

            .selected{
                td{
                    background-color: rgba(220, 198, 240, 0.829);
                }
            }

            td{
                padding: 10px 10px;
                border-bottom: 1px solid rgb(238, 238, 238);
                &:nth-child(1){
                    text-align: center;
                }

                .circle-outline{
                    display: inline-block;
                    padding: 5px;
                    box-sizing: border-box;
                }

                i{
                    color: #c5c5c5;
                    &.delete{
                        cursor: pointer;
                    }
                }

                .circle-outline{
                    border: 2px solid #000;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    line-height: 20px;
                    cursor: pointer;
                    span{
                        color: rgb(146, 146, 146)
                    }
                }
                &>span{
                    margin: 0 10px;
                }
            }
        }

        .checkout-subtotal{
            width: 100%;
            background-color: rgba(218, 218, 218, 0.726);
            color: #89939b;
            td{
                padding: 10px;
                padding-right: 25px;
                text-align: right;
            }
            th{
                padding-left: 15px;
            }
        }

        .checkout-total{
            width: 100%;
            td{
                padding:15px 10px;
                padding-right: 25px;
                text-align: right;
                color: #000;
                font-weight: bold;
            }
            th{
                padding-left: 15px;
            }
        }

        .checkout-payout{
            background-color: #000;
            border-radius: 5px;
            padding: 15px 10px;
            font-family: 'Open sans';
            color: white;
            font-size: 1em;
            cursor: pointer;
            width: 60%;
            display: inline-block;
            &.disabled{
                background-color: #a5d8c8;
                cursor: not-allowed;
            }
            span{
                font-weight: bold;
            }
        }

        .checkout-reset{
            width: calc(25%);
            display: inline-block;
            font-family: 'Open sans';
            border: 2px solid #000;
            padding: 12px 10px;
            border-radius: 5px;
            margin-left: 10px;
            color: #000;
            font-weight: bold;
            background-color: white;
            cursor: pointer;
        }
    }
</style>