<template>
	<div id="app">
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<loading :show="$store.state.addPatient.loading" text=""></loading>
		<toast v-model="$store.state.addPatient.showToast" type="text" :time="800" :position="position">{{ $store.state.addPatient.msg }}</toast>
		<FloatMenu></FloatMenu>
    </div>
</template>

<script>
import { Loading,Toast } from 'vux';
import FloatMenu from '@components/floatMenu/FloatMenu';
import 'owl.carousel';
import { getStore,setStore,changePageTitle,setCookie,saveCookie} from '@common/js/mUtils';

	export default {
		data(){
			return {
				position:'middle'
			}
		},
		components:{
			Loading,
			Toast,
			FloatMenu
		},
		mounted(){
		},
		created(){
			
		}
		
	}
</script>

<style lang="less">
  	@import './common/styles/common';
  	@import 'owl.carousel/dist/assets/owl.carousel.css';
  	@import 'vue-photo-preview/dist/skin.css';
  	body,#app{height: 100%;-webkit-overflow-scrolling: touch;}
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
	.abs-center{
	    position:absolute;
	    left:50%;
	    top:40%;
	    transform:translateX(-50%) translateY(-50%);
	  }
</style>
