<template>
    <div class="footer4">
        <!-- <div class="new-sale-big">
            <img src="../../assets/images/zlt.jpg" style="width: 100%;">
        </div> -->
        <div class="baozhang">
            <div class="buy-logo"><img src="../../assets/images/buy-logo.png"></div>
            <div class="buy-p">
            <h3>{{$t('mainFooter_1')}}</h3>
                <p><em></em>{{$t('mainFooter_1_1')}} </p>
                <p><em></em>{{$t('mainFooter_1_2')}}</p>
            </div>
        </div>
        <div class="footmenu">
            <div class="footmenu-list">
                <ul class="f-list">
                    <li>
                        <a href="javascript:void(0);" @click="go(1)">{{$t('mainFooter_About')}}</a>
                        <a href="javascript:void(0);" @click="go(2)">{{$t('mainFooter_shipping')}}</a>
                        <a href="javascript:void(0);" @click="go(3)">{{$t('mainFooter_return')}}</a>
                        <a href="javascript:void(0);" @click="go(4)">{{$t('mainFooter_privacy')}}</a>
                        <a href="javascript:void(0);" @click="go(5)">{{$t('mainFooter_contact')}}</a>
                    </li>
                    <li>© 2019 <a href="/" title="">{{href}}</a>{{$t('mainFooter_2')}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            href:''
        }
    },
    methods:{
            go(type) {
                this.$router.push({name:'flootPage',params:{flootType:type}})
            }
    },
    mounted(){
        this.href=location.host
    }
}
</script>

<style >
 .footer4{
        padding-bottom: 50px;
    }
    .baozhang {
        text-align: center;
        margin-bottom: 8px;
        padding-top: 10px;
        margin-top: 15px;
        border-top: 1px dashed #ddd;
    }
    .buy-logo {
        width: 35px;
        margin: 0 auto;
    }
    .buy-logo img {
        max-width: 100%;
    }
    .baozhang h3 {
        font-size: 16px;
        font-weight: bold;
        color: #444;
        margin: 0 0 4px 0;
    }
    .baozhang p {
        font-size: 12px;
        margin: 0;
        line-height: 18px;
        color: #777;
    }
    .footmenu {
        overflow: hidden;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
    }
    .footmenu-list {
        background: #e5e5e5;
        padding-bottom: 45px;
        padding-top: 3px;
    }
    .f-list {
        overflow: hidden;
        padding-top: 5px;
    }
    .f-list li:nth-child(1) {
        overflow: hidden;
    }
    .f-list li {
        width: 100%;
        text-align: center;
        color: #999;
        font-size: 12px;
        line-height: 13px;
    }
    .f-list li:nth-child(1) a {
        color: #444;
        font-size: 12px;
        display: block;
        width: 20%;
        margin-bottom: 10px;
        float: left;
    }
</style>