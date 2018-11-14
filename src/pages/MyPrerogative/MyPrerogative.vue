<template lang="html">
    <div class="MyPrerogative">
        <img  v-if='type == 8' src="../../common/images/opencard/personallegal.jpg" alt="" >
        <img v-if='type == 9' src="../../common/images/opencard/familylegal.jpg" alt="" >
    </div>
</template>
<script>
    export default{
        mounted(){
            this.type = this.$route.query.type
        },
        data(){
            return{
                type:''
            }
        }
    }
</script>
<style lang='less'>
    .MyPrerogative{
        width: 100%;
        padding-top: .3rem;
        img{
            display: block;
            width: 100%;
            height: auto;
        }
    }
</style>