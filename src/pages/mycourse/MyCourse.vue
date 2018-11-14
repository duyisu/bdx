<template lang="html">
	<div id="myCourse">
		<img @click.prevent="" src="../../common/images/personalcenter/nomycourse.png" >
	</div>
</template>

<script>
 import { changePageTitle } from '@common/js/mUtils'
export default {
    created() {
        if (this.$route.query.title) {

            changePageTitle(this.$route.query.title);

        }
    },
    data(){
    	return {
    		
    	}
    },

}
</script>

<style lang="less">
#myCourse img{
	width:4.98rem;
	height:3.34rem;
	position:fixed;
	left:50%;
	top:30%;
	margin-left:-2.49rem;
}


</style>
