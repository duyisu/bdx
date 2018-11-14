<template lang="html">
    <p class="price">
        <span>
            <i>￥{{ priceData.normal_price }}</i>
            <em class="not-vip"><img src="../../assets/img/not-vip.png" alt=""></em>
        </span>
        <i class="split-line"></i>
        <span>
            <i>￥{{ priceData.vip_price }}</i>
            <em class="vip"><img src="../../assets/img/vip.png" alt=""></em>
        </span>
    </p>
</template>
<script>
    export default{
        props:{
            priceData:{
                type:Object,
                default:{}
            }
        }
       
    }
</script>
<style lang='less'> 
.price{
    padding-top:.24rem;
    border-top:.02rem solid #f2f2f2;
    span{
        display: inline-block;
    }
    .split-line{
        margin: 0 .07rem;
        display: inline-block;
        width: .03rem;
        height: .29rem;
        border-radius: .01rem;
        background-color: #f2f2f2;
        vertical-align:middle;
    }
}
.price span i{
    font-size:0.28rem;
    color: #898989;
    font-weight: bold;
    display: inline-block;
    vertical-align:middle;
}
.price span em{
    font-size:.22rem;
    display: inline-block;
    margin-left:0rem;
    vertical-align:middle;
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
}
.price span em.not-vip{
    width: 1.05rem;
    height: .46rem;
}
.price span em.vip{
    width: .81rem;
    height: .46rem;
}
</style>