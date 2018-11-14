<template lang="html">
    <div class="use_vip">
        <h2 class="title">如何使用权益</h2>
        <img src="../../common/images/opencard/use.png" alt="">
    </div>

</template>
<script>
    export default{
        data(){
            return{
                tab:[
                    {
                        txt:'挂号特权'
                    },{
                        txt:'门诊特权'
                    },{
                        txt:'其他特权'
                    }
                ],
                state:0
            }
        },
        methods:{
            tabBtn(index){
                this.state = index;
            }
        }

    }
</script>
<style lang='less'>
    .use_vip{
        margin-top:.72rem;
        .title{
            font-size:.32rem;
            color:#333;
            text-align:center;
            margin-bottom:.60rem;
        }
        img{
            display: block;
            width: 5.8rem;
            margin: 0 auto;
        }
        
        
    }
</style>