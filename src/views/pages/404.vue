<template>
    <div class="backgrou">
        <van-nav-bar :left-text="$t('back')" left-arrow @click-left="onClickLeft"  @click-right="onClickRight" fixed>
            <van-icon name="shop" slot="right" size="20" />
        </van-nav-bar>
        <div class="font">
             404
        </div>
        <res-goods></res-goods>
    </div>
</template>
<script>
import resGoods from '../component/resGoods'

export default {
    components:{resGoods},
    data() {
       return {
       }
    },
    methods: {
        onClickLeft () {
            this.$router.push({name:'ShoppingMall'})
        },
        onClickRight (){
            this.$router.push({name:'ShoppingMall'})
        }
    },
    computed: {

    }
    
}
</script>
<style scoped>
   .backgrou{
       background-color: #ffffff;
       text-align: center
   }
   .font{
       font-size: 100px;
       color: #969799;
       margin-top: 100px

   }

</style>