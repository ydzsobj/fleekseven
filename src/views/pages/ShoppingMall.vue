<template>
    <div style="background-color: #f0f0f0;">
        <!-- <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" width="80%" class="location-icon"/>
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input" />
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div> -->
        <van-nav-bar @click-left="onClickNavLeft" left-arrow :fixed="bar_fixed" :z-index=3 class="left50" >
            <van-icon name="wap-nav" slot="left" />
            <img src="../../assets/images/ydzstou.png" slot="title" style="max-height:40px">
            <van-icon name="search" slot="right" @click="onSeek" />
        </van-nav-bar>
        <div style="height:46px"></div>
        <van-sidebar v-model="activeKey" id="navLeft" v-show="navLeft_show">
            <van-sidebar-item :title="cate.mallCategoryName" v-for="(cate,index) in category" :key="index"  @click="golistPage(cate.mallCategoryId,index)" />
        </van-sidebar>
        <van-overlay
        :show="show"
        @click="show = false,navLeft_show=false"
        />
        <!--swiper area-->
        <div class="swiper-area">
            <van-swipe :autoplay="1000" @change="onChange">
                <van-swipe-item v-for="( banner ,index) in bannerPicArray" :key="index" >
                    <img v-lazy="banner.image" width="100%" @click="goGoodsPage(banner.good_id)"/>
                </van-swipe-item>
                <div class="custom-indicator" slot="indicator">
                    {{ current + 1 }}/{{bannerPicArray.length}}
                </div>
            </van-swipe>
            <div class="swiper-span"></div>
        </div>  
        <!--type bar-->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index"  @click="golistPage(cate.mallCategoryId,index)">
                <img :src="cate.image_url" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>  
        <!--adbanner area-->
        <!-- <div>
            <img v-lazy="adBanner" width="100%" />
        </div> -->
        <!--Recommend goods area-->
        <!-- <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                   <swiper-slide v-for="(item,index) in recommendGoods " :key="index" >
                       <div class="recommend-item">
                           <img :src="item.image" width="80%">
                           <div>{{item.goodsName}}</div>
                           <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice  | moneyFilter}})</div>
                       </div>
                   </swiper-slide> 
                </swiper>
            </div>
        </div> -->
        <floor-component v-for="(item, index) in floorData" :floorData="item.floor " :floorTitle="item.name" :key="index"></floor-component>
        <!-- <div class="STPRY">
            <div></div>
            <span>
                OUR STORY
            </span>
        </div>
        <div class="new-sale-big tu" style="margin-bottom:10px">
            <img src="../../assets/images/ourstory.jpg" style="width: 100%;">
        </div> -->
        <div class="hot-area">
            <div class="hot-title">{{ $t('hotgoods') }}</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <!-- <van-row gutter="20"> -->
                        <van-col span="12" v-for="(item , index) in hotGoods" :key="index">
                                <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :mallPrice="item.mallPrice">

                                </goods-info>
                        </van-col>
                    <!-- </van-row> -->
                </van-list>
            </div>
        </div>
        <mainFooter></mainFooter>
        
    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper , swiperSlide} from 'vue-awesome-swiper'
 
    import floorComponent from '../component/floorComponent'
    import mainFooter from '../component/mainFooter'
    import { toMoney , int,num} from '@/filter/moneyFilter.js'
    import goodsInfo from '../component/goodsInfoComponent'
    import url from '@/serviceAPI.config.js'
   
    export default {
        data() {
            return {
                bar_fixed:true,
                navLeft_show:false,
                activeKey:9999999,
                show:false,
                swiperOption:{
                    slidesPerView:3
                },
                msg: 'Shopping Mall',
                locationIcon: require('../../assets/images/location.png'),
                bannerPicArray:[],
                category:[],
                adBanner:'',
                recommendGoods:[],
                floorData:[],
                floor1:[],
                floor2:[],
                floor3:[],
                floorName:{},
                hotGoods:[],  //热卖商品
                nav_img:[require('../../assets/images/cartempty.png')],
                current: 0
              
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            },
            int(money){
                return int(money)
            },
            num(money){
                return num(money)
            }
        },
        components:{swiper,swiperSlide,floorComponent,goodsInfo,mainFooter},
        created(){
            axios({
                url:url.getShopingMallInfo,
                method:'get',
            })
            .then(response=>{
                console.log(response)
                if(response.status==200){
                    this.category=response.data.data.category;
                    // this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
                    this.bannerPicArray= response.data.data.slides;
                    // this.recommendGoods = response.data.data.recommend;
                    this.floorData = response.data.data.floorData;
                    this.hotGoods = response.data.data.hotGoods;
            
                }
            })
            .catch(error=>{
                console.log(error)
            })
        },
        methods:{
            golistPage(id,index) {
                this.show=false
                this.navLeft_show=false
                this.$router.push({name:'CategoryList',params:{categorySubId:id,index:index}})
            },
            goGoodsPage(id) {
                console.log(id)
                this.$router.push({name:'Goods',query:{goodsId:id}})
            },
            onClickNavLeft(){
                this.show=!this.show
                this.navLeft_show=!this.navLeft_show
            },
            onChange(index) {
                this.current = index;
            },
            onSeek(){
                this.$router.push({name:'seek'})
            }
        },
        mounted(){
            console.log(location.href)
            let winHeight = document.documentElement.clientHeight
            document.getElementById("navLeft").style.height=winHeight -46 +'px'
        }
       
    }
</script>

<style scoped>
    .van-sidebar-item--select {
        border-color: #f8f8f8;
        background-color: #f8f8f8;
        color: #7d7e80;
    }
    .van-nav-bar .van-icon {
        font-size: 26px;
        color:#ef3470
    }
    .hot-title{
        color:#ef3470
    }
    #navLeft{
        position: fixed;
        top: 46px;
        left: 0;
        z-index: 3;
        background: #f8f8f8;
        overflow-y: auto;
    }
    .van-overlay{
        z-index: 2!important;
    }
    .STPRY {
        height: 20px;
        margin-bottom: 6px;
        margin-top: 6px;
        line-height: 20px;
        position: relative;
        text-align: center;
        color:#e2b2b2
    }
    .STPRY div {
        position: absolute;
        top: 9px;
        border-top: 2px solid #e2b2b2;
        width: 80%;
        left: 10%;
    }
    .STPRY span {
        background: #f9e7ea;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .search-bar{
        height:2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-input{
        width:100%;
        height: 1.3rem;
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-bottom:1px solid #fff !important;
        background-color: #e5017d;
        color:#fff;
    }
    .location-icon{
        padding-top:.2rem;
        padding-left:.3rem;
    }
    .swiper-area{
        position: relative;
        clear:both;
        max-height:600px;
        overflow: hidden;
    }
    .custom-indicator{
        position: absolute;
        right: 5px;
        bottom: 25px;
        padding: 2px 5px;
        color: #fff;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
    }
    .van-swipe{
        max-height:600px;
    }

    .type-bar{
        background-color: #fff;
        /* margin:0 .3rem .3rem .3rem; */
        /* border-radius: .3rem; */
        font-size:14px;
        display:flex;
        flex-direction:row;
        flex-wrap:nowrap;
    }
    .type-bar div{
        padding:.3rem;
        font-size:12px;
        text-align: center;
        flex:1;
    }
    .type-bar div span{
        display: inline-block
    }
    .type-bar div img{
        border-radius: 50%;
    }
    .recommend-area{
        background-color: #fff;
        margin-top:.3rem;
    }
    .recommend-title{
        border-bottom:1px solid #eee;
        font-size:14px;
        padding:.2rem;
        color:#e5017d;
    }
    .recommend-body{
        border-bottom:1px solid #eee;
    }
    .recommend-item{
        width:99%;
        border-right:1px solid #eee;
        font-size:12px;
        text-align: center;
    }
    .hot-area{
        text-align: center;
        font-size:14px;
        /* height: 1.8rem; */
        line-height:1.8rem;
        padding-bottom: 20px
    }
    .hot-goods{
        /* height: 130rem; */
        overflow: hidden;
        /* background-color: #fff; */
        padding: 0 8px;
    }
    .hot-goods>div>div:nth-child(2n) {
        padding-left: 2px;
        margin-bottom: 6px
    }
    .hot-goods>div>div:nth-child(odd) {
        margin-bottom: 6px;
        padding-right: 2px;
    }
    .swiper-span {
    width: 100%;
    height: 20px;
    position: absolute;
    bottom: -2px;
    background-color: #fff;
    z-index: 1;
    border-radius: 50% 50% 0px 0px;
}



</style>
