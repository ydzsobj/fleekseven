<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar :title="$t('classlist')"/>
        </div>

        <div>
          <van-row>
              <van-col>
                  <!-- <div id="leftNav">
                       <ul>
                           <li @click="clickCategory(index,item.category_id)" :class="{categoryActice:categoryIndex==index}" v-for="(item , index) in category" :key="index">
                               {{item.name}}
                           </li>
                       </ul>
                  </div> -->
                  <van-sidebar v-model="categoryIndex" id="leftNav">
                    <van-sidebar-item :title="item.name" v-for="(item , index) in category" :key="index" @click.native="clickCategory(index,item.category_id)"/>
                  </van-sidebar>
                 
              </van-col>
              <van-col style="width: calc( 100% - 85px )">

                  <!-- <div class="tabCategorySub">
                      <van-tabs v-model="active" @click="onClickCategorySub">
                          <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                          </van-tab>
                      </van-tabs>
                  </div> -->
                  
                <div id="list-div">
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <van-list
                            v-model="loading"
                            :finished="finished"
                            @load="onLoad"
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
                                    <div class="name">{{item.name}}</div>                                                                        
                                    <!-- <div>{{$store.state.money_sign}}{{ $store.state.lang ==='ind-BA' ? item.price | int : item.price | toDivide}}</div> -->
                                    <div v-if="$store.state.lang==='ind-BA'">{{$store.state.money_sign}}{{item.price |num}}</div>
                                    <div v-else>{{$store.state.money_sign}}{{item.price}}</div>
                                 </div>
                            </div>
        
                        </van-list>
                    </van-pull-refresh>
                </div>
              </van-col>
          </van-row>  
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
                thrott: true
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
        created(){
            
            this.getCategory();
           
        },
        activated(){
            if(this.categorySubId && this.$route.params.categorySubId && this.categorySubId != this.$route.params.categorySubId){
                    this.page=1
                    this.categoryIndex=this.$route.params.index
                    this.categorySubId=this.$route.params.categorySubId
                    this.finished = false
                    this.isLoading= true
                    this.loading = true
                    this.goodList= [] 
                    this.onLoad()
            }
        },
        // watch: {
        //     '$route' () {
        //         if(this.$route.query.categorySubId){
        //             this.page=0
        //             this.categoryIndex=this.$route.query.index
        //             this.categorySubId=this.$route.query.categorySubId ?this.$route.query.categorySubId : this.$route.params.categorySubId
        //             this.finished = false
        //             this.isLoading= false
        //             this.goodList= [] 
        //             // this.categorySubId = this.categorySubId
        //             this.onLoad()
        //         }
        //     }
        // },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById("leftNav").style.height=winHeight -46-50 +'px'
            document.getElementById("list-div").style.height=winHeight -96 +'px'
        },
        methods: {
            onLoad(index) {      //上拉加载
                    this.getGoodList(index)
            },
            onRefresh() {       //下拉刷新
                    this.goodList = []
                    this.finished = false;
                    this.isLoading = true;
                    this.loading = true
                    this.page = 1
                    this.onLoad()
            },
            
            getCategory() {
                axios({
                    url:url.getCateGoryList,
                    method:'get',
                })
                .then(response=>{
                    if(response.data.success && response.data.data ){
                      this.category = response.data.data
                        this.categorySubId = this.$route.params.categorySubId || this.category[0].category_id
                        this.categoryIndex = this.$route.params.index || 0
                        this.onLoad()
                    }else{
                        Toast($t('serveError'))
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
                
            },
            clickCategory(index,categoryId){
                this.error = false
                    this.loading = true
                if(this.thrott){
                    this.thrott= false
                    this.goodList= [] 
                   this.categoryIndex=index
                   this.page=1
                   this.finished = false
                   this.isLoading = true
                   this.categorySubId = categoryId
                   this.onLoad(index)
                }
            },
            getGoodList(index){
              if(this.categorySubId){
                  axios({
                      url:url.getGoodsListByCategorySubID,
                    method:'get',
                    params:{
                        category_id:this.categorySubId,
                        page:this.page
                    }
                })
                .then(response=>{
                 this.page++
                    if(response.data.success  && response.data.data.data.length > 0){
                        if(index > -1){this.goodList = [];this.categoryIndex=index}
                        this.goodList=this.goodList.concat(response.data.data.data)
                        // console.log(index, this.categoryIndex)
                    }else{
                        this.finished = true
                    }
                    this.loading = false
                    this.isLoading = false
                    this.thrott= true
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

          

           
        }
    }
</script>

<style scoped>
    #leftNav{
        background-color: #f8f8f8;
    }
    /* #leftNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    } */
    .categoryActice{
        background-color: #fff;
    }


    .list-item{
        /* display: flex; */
        /* flex-direction: row; */
        width: 50%;
        float: left;    
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
        box-sizing: border-box;
    }
    #list-div{
        overflow: scroll;
        background: #f0f0f0
    }
    .list-item-img{
        /* flex:8; */
    }
    .list-item-text{
        /* flex:16; */
        margin-top:10px;
        margin-left:10px;
    }
    .list-item-text .name{
        overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
    .van-list__finished-text{
        float: left;
    width: 100%;
    }
   
</style>