<template>
    <div>
       <div class="nav">
           <span @click="onClickLeft"> <van-icon name="arrow-left" />{{ $t('back') }}</span>
       </div>
       <div class="tu">
         <div class="tuleft">
             <span>{{ $t('ordersuccessful') }}</span>
         </div>
          <div class="turight">
          </div>
       </div>
        <van-card
            v-for="item in cartInfo"
           :key="item.selectedSkuComb.id"
           :title="item.title"
           :desc="showDesc(item)"
           :num="item.selectedNum"
           :thumb="showImage(item.skuAttrText)"
         >
            <div slot="tags" class="redcolor">
                <span v-if="$store.state.lang==='ind-BA'" >{{moneySign}}{{item.selectedSkuComb.price | int}}</span>
                <span v-else >{{moneySign}}{{item.selectedSkuComb.price | toDivide}}</span>
            </div>
        </van-card>

          <van-cell>
                <span class="redcolorpirce" v-if="$store.state.lang==='ind-BA'" >{{moneySign}}{{orderResponse.price*100 | int}}</span>
                <span class="redcolorpirce" v-else >{{moneySign}}{{orderResponse.price*100 | toDivide}}</span>
          </van-cell>

        <van-row style="background-color: #ffffff;font-size: 14px;line-height: 20px;word-break:break-word">
           <van-row>
              <van-col span="2"><van-icon name="user-circle-o" style="margin: 2px 0 0 10px"/></van-col>
              <van-col span="22">
                   <div>{{orderResponse.receiver_name}} &nbsp;&nbsp;<span class="huicolor">{{orderResponse.receiver_phone}}</span> &nbsp;&nbsp;<span class="huicolor">{{orderResponse.receiver_email}}</span></div>
              </van-col>
           </van-row>
           <van-row>
               <van-col span="2"><van-icon name="location-o" style="margin: 2px 0 0 10px"/></van-col>
               <van-col span="22">
                   <div>{{orderResponse.address}}</div>
                   <div>{{orderResponse.short_address}}&nbsp;&nbsp;{{orderResponse.postcode}}</div>
                </van-col>
           </van-row>
            <van-row v-if="orderResponse.leave_word">
               <van-col span="2"><van-icon name="comment-o" style="margin: 2px 0 0 10px"/></van-col>
               <van-col span="22">
                   <div>{{orderResponse.leave_word}} </div>
                </van-col>
           </van-row>
       </van-row>

        <van-row style="background-color: #fafafa;">
         <van-col span="1"></van-col>
         <van-col span="23" style="font-size: 14px;line-height: 6px;">
             <p>{{ $t('orderNumber') }} {{orderResponse.sn}} </p>
             <p>{{ $t('orderTime') }} {{orderResponse.created_at}} </p>
          </van-col>
       </van-row>
       <res-goods></res-goods>
    </div>
</template>
<script>
    import { toMoney, toDivide, int} from '@/filter/moneyFilter.js'
    import resGoods from '../component/resGoods'
export default {
    components:{resGoods},
    data () {
        return {
            cartInfo:'',
            orderResponse: null
        }
    },
    computed: {
            moneySign(){
               return this.$store.state.money_sign
           }
    },
    methods: {
        onClickLeft (){
          this.$router.go(-2)
        },
        showDesc(item){
            return item.skuAttrText.map(ele=>{return ele.name}).join('/')+'   '+(item.messages.message_0||'')
        },
        showImage(skuAttrText) {
            let img=''
            skuAttrText.forEach(element => {
                if(element.imgUrl){img= element.imgUrl }
            })
            return img
        }
    },
    filters:{
        toDivide (money){
            return toDivide(money)
        },
        int (money){
            return int(money)
        }
    },
    created(){
        this.cartInfo = this.$route.params.orderData
        this.orderResponse = this.$route.params.orderResponse
    }
    
}
</script>
<style scoped>
.nav{
    background-color: #ef3470;
    color: #fafafa;
    font-size: 16px;
    padding-left: 10px;
    padding-top: 5px;
}
.tu {
    background-color: #ef3470;
    color: #fafafa;
    height: 5rem
}
.tu div{
    float: left;
    width: 50%;
    height: 100%
}
.tu .turight{
    background-image: url('../../assets/images/taobao.webp');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
}
.tuleft{
    display: flex;
    justify-content: center;
    align-items: center;
}
.redcolor{
    color:#ef3470
}
.redcolorpirce{
    color:#ef3470;
    float: right;
}
.huicolor{
  color: #969799;
  font-size: 12px

} 
    
</style>