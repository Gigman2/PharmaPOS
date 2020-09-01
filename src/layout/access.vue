<template>
    <div class="access bg bg-image">
        <div class="bg-overlay">
             <router-view/>

             <div class="footer">
                 <div class="hoz-line"></div>
                 <div class="footer-text">Developed by <a href="https://sluxify.com">Sluxify</a></div>
             </div>
        </div>
    </div>
</template>
<style lang="scss">
    .access{
        position: relative;
        &.bg-image{
            background-size: cover;
        }
        .bg-overlay{
            background: #43cea2;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #185b9dd2, #43cea2);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #185b9dcc, #43cea2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            width: 100%;
            min-height: 100%;
            display: table;
            position: relative;
        }

        .form-box{
            width: 400px;
            height: 350px;
            background-color: white;
            margin: 0 auto;
            position: absolute;
            top: 50%;
            left: 50%;
            // height: 30%;
            // width: 50%;
            margin: -14% 0 0 -15%;
            border-radius: 5px;
        }
        .hoz-line{
            margin-bottom: 10px;
            background-color: rgba(255, 255, 255, 0.212);
        }
    }
</style>