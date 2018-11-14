<template lang="html">
    <div class="vipPrivilege">
        <img v-if='card_type=="8" && int!="1"' src="../../common/images/opencard/personal_rule.png" alt=""><img v-if='card_type=="9" && int!="1"' src="../../common/images/opencard/family_rule.png" alt="">
        <img v-if='int=="1"' src="../../common/images/opencard/member_rule.jpg" alt="">
    </div>
</template>
<script>
    export default{
        mounted(){
            this.card_type = this.$route.query.card_type;
            this.int = this.$route.query.int;
        },
        data(){
            return{
                card_type:'',
                int:''
            }
        }
    }
</script>
<style lang="less">
.vipPrivilege{
    
    display: block;
    width: 100%;
    background: #fff;
    z-index: 999;
    img{
        display: block;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }
}
</style>