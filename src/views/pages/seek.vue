<template>
    <div style="background:#fff">
        <van-nav-bar  left-arrow @click-left="onClickLeft" :right-text="$t('seek')" @click-right="onClickRight" :fixed="bar_fixed" :z-index=3 class="left50 nav" >
            <!-- <van-icon name="wap-nav" slot="left" /> -->
            <!-- <img src="../../assets/images/ydzs.png" slot="title" style="max-height:40px"> -->
            <div slot="title">
                <van-field
                    v-model="keywords"
                    clearable
                    left-icon="search"
                    size="large"
                    :placeholder="$t('searchProducts')"
                /></div>
            <!-- <van-icon name="search" slot="right" @click="onSeek" /> -->
        </van-nav-bar>
        <div id="list-div">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="getList"
                    :error.sync="error"
                    :error-text="$t('errorText')"
                    :offset="10"
                    :finished-text="$t('outfloor')"
                >
                    <!-- :immediate-check="false" -->
                    <div class="list-item" @click="goGoodsInfo(item.goodsId)" v-for="(item,index) in goodList" :key="index">
                        <div class="list-item-img">
                            <img :src="item.image" 
                            width="100%"
                            :onerror="errorImg"                                    
                                /> 
                        </div>
                        <div class="list-item-text">
                            <div>{{item.name}}</div>                                                                        
                            <!-- <div>{{$store.state.money_sign}}{{ $store.state.lang ==='ind-BA' ? item.price | int : item.price | toDivide}}</div> -->
                            <div class="goods-price" v-if="$store.state.lang==='ind-BA'">{{$store.state.money_sign}}{{item.price |num}} <s> {{$store.state.money_sign}}{{item.mallPrice |num}}</s></div>
                            <div class="goods-price" v-else>{{$store.state.money_sign}}{{item.price}} <s> {{$store.state.money_sign}}{{item.mallPrice}}</s></div>
                            </div>
                    </div>

                </van-list>
            </van-pull-refresh>
        </div>
        <div class="order-no-box" v-show="errOrder">
            <img src="../../assets/images/nothing_ioc.png" alt="">
            <h3>{{$t('seekErr')}} '{{keywordsText}}'!</h3>
            <p>{{$t('seekErr_1')}}</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {toMoney ,toDivide, int,num} from '@/filter/moneyFilter.js'
export default {
    data() {
        return {
            errOrder:false,
            keywords:'',
            keywordsText:'',
            goodList:[],
            bar_fixed:true,
            error: false,
            loading: false,   //是否处于加载状态
            finished: false,  //是否已加载完所有数据
            isLoading: false,   //是否处于下拉刷新状态
            category: [],
            categoryIndex:0,
            active:0,    //激活标签的值
            page:1,        //商品列表的页数
            goodList:[],   //商品列表信息
            categorySubId:null, //商品子类ID
            errorImg:'this.src="'+require('@/assets/images/errorimg.png')+'"',
            thrott: true,
            index_errOrder:0
        }
    },
    filters:{
            moneyFilter(money){
                return toMoney(money)
            },
            toDivide(money){
                return toDivide(money)
            },
            int(money){
                return int(money)
            },
            num(money){
                return num(money)
            }
        },
    methods:{
        onClickLeft () {
            this.$router.go(-1)
        },
        onClickRight () {
            this.goodList = []
            this.finished = false;
            this.isLoading = true;
            this.loading = true
            this.page = 1
            this.getList()
        },
        onRefresh() {       //下拉刷新
            this.goodList = []
            this.finished = false;
            this.isLoading = true;
            this.loading = true
            this.page = 1
            this.getList()
        },
        getList(){
            this.index_errOrder++
            if(this.index_errOrder === 1){
                this.isLoading = false;this.loading = false; return false
            } else{
                axios({
                      url:url.getGoodsListByCategorySubID,
                    method:'get',
                    params:{
                        keywords:this.keywords,
                        page:this.page
                    }
                })
                .then(response=>{
                    if(this.page ==1 && response.data.data.data.length == 0 && this.index_errOrder !==1){
                        this.finished = false;this.loading = false; this.errOrder=true;this.keywordsText=this.keywords
                    }else{

                        this.page++
                        if(response.data.success  && response.data.data.data.length > 0){
                            this.errOrder=false
                            this.goodList=this.goodList.concat(response.data.data.data)
                        }else{
                            this.finished = true
                        }
                        this.loading = false
                        this.isLoading = false
                        this.thrott= true
                    }
                })
                .catch(error=>{
                    this.isLoading = false
                    this.loading = false
                    this.error = true
                    this.thrott= true
                    console.log(error)
                })
            }

            
        },
            //跳转到商品详细页
            goGoodsInfo(id){
                this.$router.push({name:'Goods',query:{goodsId:id}})
            }
    },
    mounted(){
        let winHeight = document.documentElement.clientHeight
        document.getElementById("list-div").style.paddingTop= 46 +'px'
    }
}
</script>
<style scoped>
    .van-nav-bar .van-icon {
        font-size: 26px;
        color:#ef3470
    }
    .van-nav-bar__title {
        max-width: 66%;
    }
    .van-cell--large{
        margin: 8px 0 8px 0;
    padding: 4px 10px;
    }
    .nav{
        background-color: #f0f0f0
    }
    .order-no-box>img {
        width: 45%;
        margin: 10px auto;
        display: block;
    }
    .order-no-box>h3 {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        margin: 10px 0px;
    }
    .order-no-box>p {
        text-align: center;
        font-size: 12px;
    }
    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
    .goods-price{
        padding-bottom: 6px;
        color:#ef3470
    }
    .goods-price s{
        color:rgba(14, 1, 1)
    }
   
</style>