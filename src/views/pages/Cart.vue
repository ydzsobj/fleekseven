<template>
    <div>
        <div class="navbar-div" v-if="isBuyCartAttr != 'buy'">
            <van-nav-bar :title="isBuy ? $t('account'): $t('shopCart')" :left-text="$t('back')" left-arrow @click-left="onClickLeft">
              <!-- <van-icon name="search" slot="right" /> -->
              <van-button size="small" round  slot="right"  type="danger" @click="clearCart" v-if="!isBuy">
                 {{ this.$t('clearCart') }}
              </van-button>
            </van-nav-bar>
        </div>
        <div v-if="cartInfo.length===0 && isBuyCartAttr != 'buy'" style="height: 200px;display: flex;justify-content: center;flex-direction: column;align-items: center; background-color: #fff">
            <van-row>
                 <img src="../../assets/images/cartempty.png" alt="" style="width:100px;height:100px">
            </van-row>
            <van-row>
                {{$t('cartnull')}}
            </van-row>
            <van-row>
                    <van-button size="small" type="default" icon="arrow-left" @click.native="onClickLeft">{{$t('back')}}</van-button>
            </van-row>
        </div>

        <van-checkbox-group class="card-goods" v-model="checkedGoods" v-if="isBuyCartAttr != 'buy'">
          <van-checkbox
            :disabled ="true"
            class="card-goods__item"
            v-for="item in cartInfo"
            :key="item.selectedSkuComb.id"
            :name="item.selectedSkuComb.id"
          >
            <van-card
              style="background-color:#fff"
              :title="item.title"
              :desc="showDesc(item)"
              :thumb="showImage(item.skuAttrText)"
            >
               <div slot="tags" class="redcolor">
                   <span v-if="$store.state.lang==='ind-BA'">{{$store.state.money_sign}}{{item.selectedSkuComb.price | int}}</span>
                   <span v-else>{{$store.state.money_sign}}{{item.selectedSkuComb.price | toDivide}}</span>
               </div>
               <div slot="num">
                    <van-button v-if="!isBuy" size="mini" style="vertical-align: bottom;margin-right: 5px;" icon="delete" round type="danger" @click.stop ="clearCartOne(item.selectedSkuComb.id)"></van-button>
                   <van-stepper style="display: inline-block;" v-model="item.selectedNum" integer @click.native.stop @plus="checkedGo(item.selectedSkuComb.id)" @minus="checkedGo(item.selectedSkuComb.id)" @focus="checkedGo(item.selectedSkuComb.id)"/>
               </div>
           </van-card>
          </van-checkbox>
        </van-checkbox-group>
        <van-row style="padding: 5px 10px">
             <van-col>
                 <van-radio-group v-model="radio">
                   <van-radio name="1">
                     <span style="font-size: 14px">{{ $t('payOnDelivery') }}</span> <img style="height: 30px;vertical-align: bottom; padding-left: 10px;" src="../../assets/images/cash.jpg" alt="">
                   </van-radio>
                   <!-- <van-radio name="2">
                     单选框 2
                     <img
                       slot="icon"
                       slot-scope="props"
                       :src="props.checked ? icon.active : icon.inactive"
                     >
                   </van-radio> -->
                 </van-radio-group>
             </van-col>
        </van-row>
        <van-cell-group style="margin-bottom: 80px">
          <van-field
            v-model="name"
            required
            clearable
            :label="$t('name')"
            :placeholder="$t('nameholder')"
            :error-message="errName"
            @input="fbinput"
          />
        
          <van-field
            v-model="telephone"
            :label="$t('phoneNumber')"
            clearable
            clickable
            :placeholder="$t('phoneNumberholder')"
            type="number"
            required
            :error-message="errTelephone"
            @input="fbinput"
          />
            <van-field
            v-model="telephone2"
            :label="$t('phoneNumber2')"
            clearable
            clickable
            :placeholder="$t('phoneNumberholder2')"
            type="number"
            required
            :error-message="errTelephone"
            @input="fbinput"
          />
          <van-field
            v-model="email"
            :label="$t('email')"
            type="email"
            clearable
            clickable
            :placeholder="$t('emailholder')"
            @input="fbinput"
          />
          <van-field
            readonly
            @focus="focusProvin"
            v-model="short_address"
            :label="$t('province')"
            clearable
            clickable
            :placeholder="$t('provinceholder')"
            required
            :error-message="errShort_address"
            @input="fbinput"
          />
          <van-field
            v-if="$store.state.lang === 'ind-BA'"
            required
            :label="$t('zipCode')"
            clearable
            clickable
          > 
               <select slot="input" style="width: 100%;border: none;" @change="selectChange" ref="zipselect" :class="{'huicolor' : optionsArrt.length===0}">
                   <option value="" v-if="optionsArrt.length===0">
                       {{$t('zipCodeholder1')}}
                   </option>
                   <option v-for="(item, index) in optionsArrt" :key="index" :value="item">{{item}}</option>
               </select>
          </van-field>
          <van-field
            v-else
            v-model="zipCode"
            :label="$t('zipCode')"
            clearable
            clickable
            :placeholder="$t('zipCodeholder')"
            type="number"
            @input="fbinput"
           />
            <van-field
              v-model="address"
              :label="$t('address')"
              clearable
              clickable
              :placeholder="$t('addressholder')"
              required
              :error-message="errAddress"
              @input="fbinput"
            />
            <van-field
            v-model="message"
            :label="$t('message')"
            clearable
            clickable
            type="textarea"
            maxlength="200"
            :placeholder="$t('messageholder')"
            @input="fbinput"
          />
            <van-field
              v-model="coupoCode"
              :label="$t('coupoCode')"
              clearable
              clickable
              :placeholder="$t('coupoCodeholder')"
              @input="fbinput"
            >
                <van-button slot="button" size="small" type="primary" @click.native="coupoCodeSend">{{$t('coupoCodeSend')}}</van-button>
            </van-field>
        </van-cell-group>
        <van-submit-bar
          class="left50"
         :loading="submitloading"
         :currency="$store.state.money_sign"
          :price="totalMoneyCoupon"
          :decimal-length="decimalLength"
          :disabled="(checkedGoods.length <= 0 && isBuyCartAttr != 'buy')|| submitloading"
          :button-text="$t('account')"
          :label="$t('total')"
          @submit="onSubmit"
        >
           <div v-if="total_off" slot="tip"> {{$t('couponmoney')}}
                <span v-if="$store.state.lang==='ind-BA'" style="float: right;">-{{$store.state.money_sign}}{{total_off| int}}</span>
                <span v-else style="float: right;">-{{$store.state.money_sign}}{{total_off| toDivide}}</span>
            </div>
        </van-submit-bar>
        <van-overlay
         z-index="101"
         :show="areaShow"
          @click="areaShow = false"
        />
        <transition name="fade">
          <van-area class="area left50" :area-list="areaList" v-show="areaShow" @confirm="confirm" @cancel="cancel" :confirm-button-text="$t('confirm')" :cancel-button-text="$t('cancel')"/>
        </transition>
    </div>
    
</template>

<script>
    import axios from 'axios'
    import {Toast} from 'vant'
    import url from '@/serviceAPI.config.js'
    import { toMoney, toDivide, toThousands,int} from '@/filter/moneyFilter.js'
    import obj from '@/province/ndnxy.js'
    import objFlb from '@/province/flb.js'
    export default {
       props: {
           isBuyCartAttr: String,
           fatherSkuData: {
               type: Function,
               default: null
           }
       },
       data() {
           return {
               couponid: null,
               total_off: null,
               decimalLength: 0,
               areaShow: false,
               fbinputFalg: true,
               submitloading: false,
               radio: '1',
               cartInfo: [] ,
               isEmpty: false ,
               checkedGoods: [],
               malldata: [],
               malldataOrder:[],
               countPrice: null,
               isBuy: false,
               coupoCode: '',
               name: '',
               telephone: '',
               telephone2: '',
               address: '',
               short_address:'',
               email: '',
               zipCode: '',
               message: '',
               errName:'',
               errTelephone:'',
               errAddress: '',
               errShort_address: '',
               optionsArrt: []
           }
          
       }, 
       created(){
        //    console.log('ddd',this.$store.state.fix, 'cc',JSON.parse(localStorage.fix || "0"))
           let storefix = this.$store.state.fix
           let locafix = JSON.parse(localStorage.fix || "0")-0
           if(!storefix){
            //    console.log('cartinitfix')
             try {
                fbq('init', locafix); 
                fbq('track', 'PageView');
              } catch (error) {}
           }

       },
       activated(){
           this.getCartInfo() 
           this.submitloading= false //每次进来 防止有loading
       },
    //    mounted() {console.log(this.cartInfo)},
       computed:{
           totalMoney(){
               this.malldata = []
               this.malldataOrder = []
               this.countPrice = null
               this.checkedGoods.forEach(element => {
                   this.cartInfo.forEach(ele => {
                       let obj = {} 
                       if(ele.selectedSkuComb.id === element){
                          obj.good_id = ele.goodsId
                          obj.sku_id = ele.selectedSkuComb.id //如果=goodsId说明是无规格没有sku
                          obj.messages = ele.messages.message_0
                          obj.price = ele.selectedSkuComb.price
                          obj.sku_nums = ele.selectedNum
                          this.malldata.push(obj)     //这个数据发给后台
                          this.malldataOrder.push(ele)     //这个数据发给ordersuccess页面
                          this.countPrice += obj.price * obj.sku_nums
                       }
                   });
               });
            //    console.log(this.malldata,this.countPrice)
               return this.countPrice
           },
           totalMoneyCoupon(){
            //    console.log(this.totalMoney - this.total_off)
               let num = this.totalMoney - this.total_off
                 if(this.$store.state.lang === 'ind-BA' && (num/100).toString().indexOf('.')>0){
                     this.decimalLength = 2
                 }else if(this.$store.state.lang === 'ind-BA' && (num/100).toString().indexOf('.') === -1){
                     this.decimalLength = 0
                 }   //印尼地区每次价格变动都会看有没有小数点，有小数就保留两位，否则还是保留整数
               return num
           },
           areaList(){
               if(this.$store.state.lang === 'ind-BA'){
                    this.decimalLength = 0
                    return obj
                }else if (this.$store.state.lang === 'en-PHP'){
                    this.decimalLength = 2
                    return objFlb
                }else{
                    this.decimalLength = 2
                    return obj
                }
               }
       },
       watch: {
          malldata: {
              handler(){
                this.couponid = null;  // 数量变化先把优惠码id清空
                this.total_off = null; // 数量变化先把优惠清空了
                this.coupoCodeSend() //如果购物车数量价格变化，发送优惠码和购物车数据去后台
              },
              deep: true
          }
       },
       filters:{
           toThousands(money){
              return toThousands()
           },
           moneyFilter(money){
               return toMoney(money)
           },
           toDivide (money){
               return toDivide(money)
           },
           int(money){
               return int(money)
           }
       },
       methods: {
           onClickLeft () {
               this.$router.go(-1)
           },
            //得到购物车数据的方法
            getCartInfo(skuDatas) { 
                // console.log('laofan',skuDatas)
                // let skuData = this.$route.params.skuData ? this.$route.params.skuData : this.$route.query.skuData

                //  this.isBuy = skuData ? true : false //立即购买还是购物车
                if(this.isBuyCartAttr === 'buy'){
                    // console.log(skuDatas)
                    if(skuDatas){
                        this.cartInfo=[]
                        this.cartInfo.push(skuDatas)
                        this.checkedGoods=[]
                        this.checkedGoods.push(skuDatas.selectedSkuComb.id)
                    }else{
                        let datas = this.fatherSkuData()
                        // console.log(datas)
                        if(datas.selectedSkuComb){
                           this.cartInfo=[]
                           this.cartInfo.push(datas)
                           this.checkedGoods=[]
                           this.checkedGoods.push(datas.selectedSkuComb.id)
                        }else{
                           this.cartInfo=[]
                           this.checkedGoods=[]
                        }


                    }
                }else{
                   if(localStorage.cartInfo){
                    this.cartInfo=JSON.parse(localStorage.cartInfo || "[]")
                    this.checkedGoods = []
                    //默认全部选中
                    this.cartInfo.forEach(element => {
                       this.checkedGoods.push(element.selectedSkuComb.id)
                    });
                   } 
                //    console.log('checkedGoods',this.checkedGoods)
                //    console.log(this.cartInfo)
                   this.isEmpty=this.cartInfo.length>0 ?true : false
                }
            
            },
            clearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo=[]
                this.checkedGoods=[]
            },
            onSubmit(){
               this.errName=''
               this.errTelephone=''
               this.errAddress=''
               this.errShort_address=''
               let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
               let regTele = null
               if(this.$store.state.lang === 'ind-BA'){
                   regTele= /^[0-9]{11,12}$/; //印尼电话号码要求11,12位
               }else if(this.$store.state.lang === 'en-PHP'){
                   regTele= /\d/;
               }else{
                   regTele= /\d/;
               }

               if(this.isBuyCartAttr === 'buy' && this.fatherSkuData() && !this.fatherSkuData().selectedSkuComb){
                Toast(this.$t('selectGoodsFirst')); Toast(this.$t('selectGoodsFirst')); return  //判断如果是skubuy模式且sku规格没选就提示请选择
               }else if(this.name === ''){
                   this.errName = this.$t('nameerr');return
               }else if (this.telephone===''){
                   this.errTelephone = this.$t('errTelephone');return
               }else if (!regTele.test(this.telephone)){
                   this.errTelephone = this.$t('errTelephone2');return
               }else if (this.telephone !=this.telephone2){
                   this.errTelephone = this.$t('errTelephone3');return
               }else if (this.short_address===''){
                   this.errShort_address = this.$t('errShort_address');return
               }else if(this.address===''){
                   this.errAddress = this.$t('errAddress');return
               }else if (this.email!='' && !reg.test(this.email)){
                  Toast(this.$t('errEmail'));Toast(this.$t('errEmail'));return
               }
                // console.log(this.malldata,this.countPrice)
                this.submitloading=true
                let data = {}
                data.cart_data = this.malldata
                data.total_off = this.total_off
                data.receiver_name = this.name
                data.receiver_phone = this.telephone
                data.receiver_email = this.email
                data.address =  this.short_address
                data.short_address = this.address
                data.postcode = this.zipCode
                data.leave_word = this.message
                data.coupon_code_id = this.couponid
                    axios({
                        url:url.sendOrderInfo,
                        method:'post',
                        data: data
                    })
                    .then(response=>{
                        // console.log(response)
                        if(response.status== 200 && response.data.success){
                            //如果不是直接购买，下单成功后删除对应购物车商品
                            if(this.isBuyCartAttr != 'buy'){
                            let cartInfo1=JSON.parse(localStorage.cartInfo || "[]")
                            //筛选购物车去掉已经买过的留下还没买的
                            let newCart = cartInfo1.filter(value => {
                                if (this.checkedGoods.every(function(val){return val != value.selectedSkuComb.id})){ return value}
                                })
                            localStorage.cartInfo =  JSON.stringify(newCart)       
                            }

                            try{ fbq('track', 'Purchase', {value: int(this.countPrice), currency:'USD'}) ;console.log('Purchase')}catch(e){}
                            this.$router.push({name:'order',params:{orderData: this.malldataOrder,orderResponse: response.data.data}})
                        }else{
                            Toast(this.$t('serveError'));Toast(this.$t('serveError'))
                            this.submitloading=false
                        }
                    })
            },
            showImage(skuAttrText) {
                let img=''
                skuAttrText.forEach(element => {
                    if(element.imgUrl){img= element.imgUrl }
                })
                return img
            },
            showDesc(item){
                return item.skuAttrText.map(ele=>{return ele.name}).join('/')+'   '+item.messages.message_0
            },
            clearCartOne(id){
                for(let i=0;i<this.cartInfo.length;i++){
                    if(this.cartInfo[i].selectedSkuComb.id === id){
                        this.cartInfo.splice(i,1);break
                    }
                }
                // checkedGoods 也需要去除
                for(let i=0;i<this.checkedGoods.length;i++){
                    if(this.checkedGoods[i] == id){
                        this.checkedGoods.splice(i,1);break
                    }
                }
                // console.log(this.checkedGoods)
                let cartIn = JSON.parse(localStorage.cartInfo || "[]")
                for(let i=0;i<cartIn.length;i++){
                    if(cartIn[i].selectedSkuComb.id === id){
                        cartIn.splice(i,1);break
                    }
                }
                localStorage.cartInfo = JSON.stringify(cartIn)
            },
            fbinput(e) {
                if(this.fbinputFalg){
                    this.fbinputFalg = false
                    try{fbq('track', "AddPaymentInfo");} catch(e){}
                }else{
                    return false
                }
            },
            focusProvin(){
              this.areaShow = true
            },
            confirm(list){
                this.areaShow = false
                // console.log(list)
                this.short_address = list[0].name + '/' + list[1].name + '/' +list[2].name
                this.optionsArrt = this.areaList.post[list[2].code] || []  //对应省市区的 邮政编码数组赋值
                if( this.areaList.post[list[2].code] ){  this.zipCode= this.optionsArrt[0] }
               
                this.fbinput()
            },
            cancel(){
                this.areaShow = false
            },
            checkedGo(skuid){
            //   console.log(skuid,this.checkedGoods.every((e)=>{return e!=skuid}),this.checkedGoods)
              if(this.checkedGoods.every((e)=>{return e!=skuid})){
                  this.checkedGoods.push(skuid)
              }
            },
            selectChange(){
            //    console.log('ddd',this.$refs.zipselect.value)
               this.zipCode = this.$refs.zipselect.value
            },
            coupoCodeSend(){
              if(this.coupoCode.length>0){
                  axios({
                      url:url.sendCoupon,
                      method:'post',
                      data: {
                         cart_data: this.malldata,
                         coupon_code: this.coupoCode
                      }
                  })
                  .then(response=>{
                      
                      if(response.status== 200 && response.data.success){
                        //  console.log(response.data.data)
                         if(response.data.data.total_off===0){
                            Toast(this.$t('couponUn'));Toast(this.$t('couponUn')) 
                         }else{
                            this.total_off = response.data.data.total_off
                            this.couponid= response.data.data.coupon_code_id
                         }
                      }else{
                          Toast(this.$t('couponerr'));Toast(this.$t('couponerr'))
                      }
                  }).catch(err=>{
                      Toast(this.$t('serveError'));Toast(this.$t('serveError'))
                  })
              }
            }
        },
    }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .3s
}
.fade-enter, .fade-leave-to {
  transform: translatey(300px);
}
.area{
    z-index: 101;
    position: fixed;
    width: 100%;
    bottom: 0;
}
.van-button--mini{
    min-width: 36px;
    font-size: 14px;
}
>>> .van-picker-column{
    font-size: 10px;
}
.cart-title{
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align:right;
}

.cart-list{
    background-color: #fff;
}
.pang-row{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
}

.pang-img{
    flex:6;
}
.pang-text{
    flex:14;
    padding-left:10px;
}
.pang-control{
    padding-top:10px;
}
.pang-goods-price{
    flex:4;
    text-align: right;
}
.allPrice{
    color:red;
}
.redcolor{
    color:#f44
}
.totalMoeny{
    text-align: right;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
}
.card-goods {
  padding: 10px 0;
  background-color: #fff;
}
.card-goods .card-goods__item {
  position: relative;
  background-color: #fff;
}
.card-goods .card-goods__item >>> .van-checkbox__label {
      width: 100%;
      height: auto; 
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }
.card-goods .card-goods__item >>> .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
      display: none;     
       /* 选中复选框全部隐藏 需要的话以后再显示*/
    }
.card-goods .card-goods__item >>> .van-card__price {
      color: #f44;
    }
.huicolor{
      color: #969799
    } 
.navbar-div >>> .van-nav-bar__title{
    font-size: 16px
}
</style>