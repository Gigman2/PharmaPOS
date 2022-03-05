<template>
    <div class="main-content">
        <div class="dashboard-navbar">
            <ul class="navs">
                <li v-for="(item, index) in nav" 
                    :key="'nav'+index">
                    <router-link :to="{name: item.path}">
                        <div class="nav" :class="{'active': (item.path == baseRoute())}">
                            {{item.name}}
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="dashboard-main">
            <div class="dashboard-title">{{title}}</div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar';

    export default {
        props: [
            'title',
            'nav'
        ],
        components: {
            vueCustomScrollbar,
        },
        methods: {
            baseRoute(){
                let route = this.$route.name.split('^')
                return route[0]
            }
        },
    }
</script>

<style lang="scss">
    .dashboard-content{
        a{text-decoration: none;}
    }
    .dashboard-top{
        &--icon{
            color: silver;
            font-size: 1.4em;
            text-decoration: none;
        }
    }
    .dashboard-navbar{
        height: 55px;
        background-color: rgb(252, 252, 252);
        box-shadow: 5px 0px 3px 1px #e2e2e2;
    }
    .dashboard-navbar .navs{
        margin: 0;
        padding: 0;
        list-style: none;
        float: left;
        color: slategray;
        margin-left: 20px;
    }
    .dashboard-navbar .navs li{
        display: inline-block;
        a {
            text-decoration: none;
            color: slategray
        }
        .active{
            background-color: #e7ecf3;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
            color: rgb(140, 147, 155);
        }
        &:last-child .nav{
            border-right: none;
        }
    }
    .dashboard-navbar .navs .nav{
        display: inline-block;
        line-height: 55px;
        font-family: 'Open sans';
        padding: 0 50px;
        border-right: 1px solid rgb(235, 235, 235);
        cursor: pointer;
        font-size: 14px;
    }

    .dashboard-title{
        padding: 10px 20px 0  20px;
    }
    .dashboard-wrapper{
        margin: 20px;
        width: calc(100% - 40px);
        background-color: white;
        border-radius: 5px;
        padding: 15px;
        box-sizing: border-box;
        // height: 100%;
    }
    .dashboard-main{
        max-height: 95%;
        overflow-y: scroll;
    }
</style>
