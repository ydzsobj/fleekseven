<template>
    <div>
        <div class="main-div">
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
        <van-tabbar class="left50" v-model="active" @change="changeTabbar(active)" v-show="this.$route.name==='ShoppingMall' || this.$route.name==='CategoryList'">
            <van-tabbar-item icon="shop">{{ $t('home') }}</van-tabbar-item>
            <van-tabbar-item icon="records">{{ $t('list') }}</van-tabbar-item>
            <van-tabbar-item icon="cart" :info="cartNum">{{ $t('shopCart') }}</van-tabbar-item>
            <!-- <van-tabbar-item icon="contact">会员中心</van-tabbar-item> -->
        </van-tabbar>
    </div>
</template>

<script>
    import axios from 'axios'
    import checkoutLang from '@/lang.js'
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'
    export default {
       data() {
           return {
               active: 0,
               nowPath:'',  //当前路径
               cartNum: ''
           }
       }, 
        watch: {
            '$route' () {
               this.cartNumFun()
            }
        },
       created(){
           this.changeTabBarActive()
           this.getlang()
            this.cartNumFun()
       },
       mounted(){
       },
       updated(){
           this.changeTabBarActive()
       },
       methods: {
            getlang() {
                axios({
                    url:url.getLang,
                    method:'get',
                    params:{}
                })
                .then(response=>{
                    if(response.status== 200 && response.data.data){
                      this.$i18n.locale= response.data.data.config.lang
                      checkoutLang(response.data.data.config.lang)
                       this.$store.state.money_sign = response.data.data.config.money_sign
                       this.$store.state.lang = response.data.data.config.lang
                       this.$store.state.email = response.data.data.config.email
                       this.$store.state.phone = response.data.data.config.phone
                       this.$store.state.global_address = response.data.data.global_configs.global_address

                       var head = document.getElementsByTagName('head');
                       //title
                       document.title= response.data.data.global_configs.global_title
                       var meta = document.createElement('meta')
                       meta.setAttribute('property', 'og:title')
                       meta.content = response.data.data.global_configs.global_title
                       head[0].appendChild(meta)
                       //kewords
                       var meta1 = document.createElement('meta')
                       meta1.setAttribute('name', 'Keywords')
                       meta1.content = response.data.data.global_configs.global_keywords
                       head[0].appendChild(meta1) 
                       //description
                       var meta2 = document.createElement('meta')
                       meta2.setAttribute('name', 'description')
                       meta2.content = response.data.data.global_configs.global_description
                       head[0].appendChild(meta2) 
                       var meta3 = document.createElement('meta')
                       meta3.setAttribute('name', 'og:description')
                       meta3.content = response.data.data.global_configs.global_description
                       head[0].appendChild(meta3)
                    }else{
                        Toast(this.$t('serveError'))
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            },
           changeTabBarActive(){
               this.nowPath = this.$route.name
               if(this.nowPath=='Cart'){
                   this.active=2
               }else if(this.nowPath=='ShoppingMall'){
                   this.active=0
               }else if(this.nowPath=='CategoryList'){
                   this.active=1
               }else if(this.nowPath=='Member'){
                   this.active=3
               }
           },
           changeTabbar(active) {
               console.log(active)
               switch(active){
                   case 0:
                        this.$router.push({name:'ShoppingMall'})
                        break;
                   case 1:
                        this.$router.push({name:'CategoryList'})
                        break;
                   case 2:
                        this.$router.push({name:'Cart'})
                        break;
                    case 3:
                        this.$router.push({name:'Member'})
                        break;

                
               }
           },
           cartNumFun() {
                this.cartNum = localStorage.cartInfo ? (JSON.parse(localStorage.cartInfo).length===0?'':JSON.parse(localStorage.cartInfo).length) : ''
           }
       }
    }
</script>

<style scoped>

</style>