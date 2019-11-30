<template>
        <div class="swiperdiv">
            <div>--{{$t('resgoods')}}--</div>
            <swiper :options="swiperOption">
               <swiper-slide v-for="(item,index) in hotGoods " :key="index" >
                   <div class="recommend-item">
                       <img :src="item.image" width="80%" @click="goGoodsPage(item.goodsId)">
                       <div>{{item.name}}</div>
                       <div v-if="$store.state.lang==='ind-BA'">{{$store.state.money_sign}} {{ item.price | num | toThousands}}</div>
                       <div v-else >{{$store.state.money_sign}} {{ item.price }}</div>
                   </div>
               </swiper-slide> 
            </swiper>
        </div>
</template>
<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper , swiperSlide} from 'vue-awesome-swiper'
    import url from '@/serviceAPI.config.js'
    import { num, toDivide, int,toThousands} from '@/filter/moneyFilter.js'

export default {
    components:{swiper,swiperSlide},
    data() {
       return {
            swiperOption:{
                slidesPerView:3
            },
            hotGoods: []
       }
    },
    created(){
        axios({
            url:url.getShopingMallInfo,
            method:'get',
        })
        .then(response=>{
            // console.log(response)
            if(response.status==200){
                // this.category=response.data.data.category;
                // this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
                // this.bannerPicArray= response.data.data.slides;
                // this.recommendGoods = response.data.data.recommend;
                // this.floorData = response.data.data.floorData;
                this.hotGoods = response.data.data.hotGoods;
        
            }
        })
        .catch(error=>{
            // console.log(error)
        })
    },
    filters:{
         toThousands(money){
              return toThousands(money)
           },
        toDivide (money){
            return toDivide(money)
        },
        int (money){
            return int(money)
        },
        num (money) {
            return int(money)
        }
    },
    methods: {
        goGoodsPage(goodsId) {
            this.$router.push({name:'Goods',query:{goodsId}})
        }
    },
    computed: {

    }
    
}
</script>
<style scoped>
   .swiperdiv {
       border-bottom:1px solid #eee;
       background-color: #ffffff;
       font-size: 18px;
       text-align: center;
   }
    .recommend-item{
        width:99%;
        border-right:1px solid #eee;
        font-size:12px;
        text-align: center;
    }

</style>