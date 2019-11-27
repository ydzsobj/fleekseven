<template>
    <div>
        <van-nav-bar :title="selectTitle" :left-text="$t('back')" left-arrow @click-left="onClickLeft" fixed>
        </van-nav-bar>
        <div class="imgdiv"><img src="../../assets/images/ydzs.png" width="100px"></div>
        <div style="background: #fff">
            <div class="huicolor" v-html="selectContent"></div>
        </div>

        <div><img src="../../assets/images/ourstory.jpg" width="100%"></div>

    </div>
</template>
<script>
export default {
    data() {
       return {
           flootType: null
       }
    },
    methods: {
        onClickLeft () {
            this.$router.go(-1)
        }
    },
    computed: {
        selectContent () {
            if(this.flootType ==1){
                return this.$t('floorPage_aboutus')
            }else if(this.flootType ==2){
                return this.$t('floorPage_shoping')
            }else if(this.flootType ==3){
                return this.$t('floorPage_return')
            }else if(this.flootType ==4){
                return this.$t('floorPage_privacy')
            }else if(this.flootType ==5){
                return this.$t('floorPage_contact_1')+ ` <a href="mailto:${this.$store.state.email}" style="color:#F8770E">${this.$store.state.email}</a> ` + this.$t('floorPage_contact_2') +` <a href="mailto:${this.$store.state.email}" style="color:#F8770E">${this.$store.state.email}</a> ` + this.$t('floorPage_contact_3')
            }
        },
        selectTitle () {
            if(this.flootType ==1){
                return this.$t('mainFooter_About')
            }else if(this.flootType ==2){
                return this.$t('mainFooter_shipping')
            }else if(this.flootType ==3){
                return this.$t('mainFooter_return')
            }else if(this.flootType ==4){
                return this.$t('mainFooter_privacy')
            }else if(this.flootType ==5){
                return this.$t('mainFooter_contact')
            }
        }
    },
    activated(){
         this.flootType = this.$route.query.flootType
    }
    
}
</script>
<style scoped>
  .imgdiv{
      background: #fff;
      text-align: center;
      margin-top: 50px;
  }
  .huicolor{
    color: #969799;
    width: 80%;
    margin: 0 auto;
    font-size: 14px;
    padding-bottom: 15px;
    overflow: hidden;
  } 
</style>