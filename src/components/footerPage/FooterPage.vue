<template lang="html">
    <div class="footer">
        <ul class="clearfix item-wrap">
            <li v-for='(item,index) in footList' class="item" @click='linkTo(index)' :class="{active : index == footIndex}"><i :class='item.log'></i><span>{{item.name}}</span></li>
        </ul>
    </div>
</template>
<script>

    export default{
        props:{
          footIndex:{
             type:String,
             default:"0"
          }
        },
        mounted(){
          this.addName();
        },
        data(){
            return{
                footList:[{
                    name:'首页',log:'i1'
                },{
                    name:'问诊',log:'i2'
                },{
                    name:'挂号',log:'i3'
                },{
                    name:'我的',log:'i4'
                }],
                selected:0
            }
        },
        methods:{
            addName(){
              
              //$('.footer .item-wrap .item:nth-child('+this.footIndex+')').addClass('active');
            },
            linkTo(index){
               //this.selected = index;
               var that = this.footList[index].log;
                if(index == 0){
                    this.$router.push({
                       path:'/hospitalHome',
                       query:{
                        index:'0'
                       }
                    });
                }else if(index == 1){
                    this.$router.push({
                       path:'/askDoctor',
                       query:{
                        index:'1'
                       }
                    });
                }else if(index == 2){
                    this.$router.push({
                       path:'/departmentlist',
                       query:{
                        index:'2'
                       }
                    });
                }else if(index == 3){
                    this.$router.push({
                       path:'/personalcenter',
                       query:{
                         index:'3'
                       }
                    });
                }

            }
        }
    }
</script>
<style lang='less'>
    @import '../../common/styles/mixin';
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 1.2rem;
        width: 100%;
        border-top:2px solid #f5f5f5;
        background: #fff;
        z-index: 999;
        .item-wrap{
            padding:0 .8rem;
            padding-top: .12rem;
            .item:hover .i1{background-image: url('../../assets/img/foot1_on.png');}
            .item:hover .i2{background-image: url('../../assets/img/foot2_on.png');}
            .item:hover .i3{background-image: url('../../assets/img/foot3_on.png');}
            .item:hover .i4{background-image: url('../../assets/img/foot4_on.png');}
            .item:hover span{color:#40cbb7}
            .item{
               float: left;
               margin-left: 1.2rem;
               i{
                 display: block;
                 width: .5rem;
                 height: .5rem;
                 margin-bottom: 0.17rem;
                 background-repeat: no-repeat;
                 background-size: 100% 100%;
                 img{
                    display: block;
                    max-width:100%;
                    max-height:100%;
                 }
                
               }
               .i1{background-image: url('../../assets/img/foot1.png');}
               
               .i2{background-image: url('../../assets/img/foot2.png');}
               .i3{background-image: url('../../assets/img/foot3.png');}
               .i4{background-image: url('../../assets/img/foot4.png');}
               span{
                color:#898989;
                display: block;
                font-size:.24rem;
                line-height:.24rem;
               }
            }
            .item.active{
               .i1{background-image: url('../../assets/img/foot1_on.png');}
               .i2{background-image: url('../../assets/img/foot2_on.png');}
               .i3{background-image: url('../../assets/img/foot3_on.png');}
               .i4{background-image: url('../../assets/img/foot4_on.png');}
               span{
                color:#40cbb7;
               }
            }
            .item:first-child{
               margin-left: 0;
            }
        }
        
    }
</style>