<template>
    <div class="goods-info" @click="goGoodsPage()">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="100%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <!-- <div class="goods-price">{{$store.state.money_sign}}{{goodsPrice  }}</div> -->
        <div class="goods-price" v-if="$store.state.lang==='ind-BA'">{{$store.state.money_sign}}{{goodsPrice |num|toThousands}} <s> {{$store.state.money_sign}}{{mallPrice |num|toThousands}}</s></div>
        <div class="goods-price" v-else>{{$store.state.money_sign}}{{goodsPrice}} <s> {{$store.state.money_sign}}{{mallPrice}}</s></div>
        <div class="goods-btn">{{$t('buyNow')}}</div>
    </div>
</template>

<script>
    import {toMoney,num,toThousands}  from '@/filter/moneyFilter.js'
    export default {
        props:['goodsImage','goodsName','goodsPrice','goodsId','mallPrice'],
        filters:{
            moneyFilter(money){
                return toMoney(money)
            },
            num(money){
                return num(money)
            },
            toThousands(money){
              return toThousands(money)
           }
        },
        methods: {
            goGoodsPage() {
                this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
            }
        },
    }
</script>

<style scoped>
    .goods-info{
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        line-height: 14px
    }
 .goods-name{
        padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap; 
       padding: 6px;
    }
    .goods-price{
        padding-bottom: 6px;
        color:#a70808
    }
    .goods-price s{
        color:rgba(14, 1, 1)
    }
    .goods-btn{
        background: #ef3470;
    border-radius: .05rem;
    text-align: center;
    color: #fff;
    font-size: .24rem;
    padding: .36rem 0;
    }
</style>