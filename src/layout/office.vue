<template>
    <div class="office">
        <div class="topbar shadow-1">
            <div class="brand">SluxiPOS</div>
            <div class="actions">
                <ul class="action-menu">
                    <li class="mt-10" @click="lock"> <i class="fe-power"></i> Logout</li>
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
        <div class="wrapper">
            <div class="sidebar">
                <ul class="sidebar-navs">
                    <li>
                        <router-link :to="{name: 'office-dashboard'}">
                            <div class="sidebar-item" :class="{'active': $route.name == 'office-dashboard'}">
                                <div class="sidebar-icon">
                                    <i class="fe-monitor"></i>
                                </div>
                                Dashboard
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'office-sale'}">
                            <div class="sidebar-item" :class="{'active': $route.name == 'office-sale'}">
                                <div class="sidebar-icon">
                                    <i class="fe-trending-up"></i>
                                </div>
                                Sales
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'office-inventory'}">
                            <div class="sidebar-item" :class="{'active': $route.name == 'office-inventory'}">
                                <div class="sidebar-icon">
                                    <i class="fe-clipboard"></i>
                                </div>
                                Inventory   
                            </div>
                        </router-link>
                    </li>
                    <li>
                       <router-link :to="{name: 'office-report'}">
                            <div class="sidebar-item" :class="{'active': $route.name == 'office-report'}">
                                <div class="sidebar-icon">
                                    <i class="fe-bar-chart"></i>
                                </div>
                                Reports
                            </div>
                       </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'office-accounts'}">
                            <div class="sidebar-item" :class="{'active': $route.name == 'office-accounts'}">
                                <div class="sidebar-icon">
                                    <i class="fe-users"></i>
                                </div>
                                Accounts
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'office-setup-company'}">
                            <div class="sidebar-item" :class="{'active': $route.name == 'office-setup-company'}">
                                <div class="sidebar-icon">
                                    <i class="fe-settings"></i>
                                </div>
                                Setup
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <router-view/>
        </div>
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
            ...mapGetters({user: 'USER', fullname: 'FULLNAME', avatar:'AVATAR'})
        },
        methods: {
            lock(){
                this.$store.commit('LOGOUT');
                this.$router.push({name: 'login'})
            }
        },
    }
</script>

<style lang="scss">
    .office{
        position: relative;

        .wrapper{
            height: calc(100vh - 60px);
            overflow: hidden;
        }

        .topbar{
            width: 100%;
            height: 60px;
            background-color: #125b96;
            .actions{
                float: right;
                ul{
                    li{
                        list-style: none;
                        float: left;
                        margin-right: 20px;
                        margin-top: 0px;
                        color: white;
                        cursor: pointer;
                        padding-bottom: 7px;
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
                    margin-top: -5px;
                    .avatar{
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: rgb(224, 224, 224);
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 10px;
                        overflow: hidden;
                        img{
                            width: 100%;
                        }
                    }
                    .position{
                        font-size: .8em;
                        margin-left: 30px;
                        margin-top: -10px;
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
            color: white;
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

        .sidebar{
            width: 100px;
            height: 100vh;
            display: inline-block;
            background-color: white;
            vertical-align: top;
            .sidebar-navs{
                padding: 0;
                margin: 0;
                li{
                    list-style: none;
                }
                a{
                    text-decoration: none;
                }
                .sidebar-item{
                    border-top: 1px solid #e4e4e483;
                    cursor: pointer;
                    padding: 20px 0 10px 0;
                    box-sizing: border-box;
                    width: 100%;
                    height: calc(100vh * 0.152);
                    color: #1f8db6;
                    font-size: .9em;
                    &.active{
                        background-color: #e7ecf3;
                        box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
                    }

                }
                .sidebar-icon{
                    padding-bottom: 20px;
                    i{
                        font-size: 2em;
                    }   
                }
            }
        }
        
        .main-content{
            width: calc(100% - 100px);
            height: calc(100vh - 85px);
            display: inline-block;
        }

        .dashboard-wrapper{
            padding: 20px;
        }

        .dashboard-title{
            text-align: left;
            font-family: 'Open sans';
            font-size:1.5em;
            font-weight: bold;
            color: silver
        }

    }

    .main-wrapper{
        padding: 20px;
        height: calc(100vh - 100px);
    }

    .dashboard-table{
        min-height: 90%;
    }

</style>